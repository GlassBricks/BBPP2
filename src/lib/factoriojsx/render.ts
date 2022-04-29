import { isEmpty, shallowCopy } from "../util"
import Events from "../Events"
import { PlayerData } from "../player-data"
import { bind, Func, funcRef, Functions, isCallable } from "../references"
import { PRecord } from "../util-types"
import * as propTypes from "./propTypes.json"
import {
  ClassComponentSpec,
  ElementSpec,
  FCSpec,
  FragmentSpec,
  FullSpec,
  GuiEvent,
  GuiEventHandler,
  Spec,
} from "./spec"
import { isObservable, MutableObservableValue, Observer, Subscription } from "../observable"

type GuiEventName = Extract<keyof typeof defines.events, `on_gui_${string}`>

interface ElementInstance {
  readonly element: GuiElementMembers
  readonly playerIndex: PlayerIndex
  readonly index: GuiElementIndex
  readonly subscriptions: MutableLuaMap<string | number, Subscription>

  readonly events: PRecord<GuiEventName, Func<any>>
  readonly data: unknown
}

export interface ElementInteractor {
  addSubscription(subscription: Subscription): void
}

// sinks
function setValueSink(
  this: {
    readonly element: { readonly valid: boolean } & Record<string, any>
    readonly key: string
  },
  value: any,
) {
  const { element } = this
  if (!element.valid) {
    destroy(element as any)
    return
  }
  element[this.key] = value
}

function callMethodSink(
  this: {
    readonly element: { readonly valid: boolean } & Record<string, (this: void, arg: any) => any>
    readonly key: string
  },
  value: any,
) {
  const { element } = this
  if (!element.valid) {
    destroy(element as any)
    return
  }
  element[this.key](value)
}

function setSliderMinSink(this: SliderGuiElement, value: number) {
  if (!this.valid) {
    destroy(this as any)
    return
  }
  this.set_slider_minimum_maximum(value, this.get_slider_maximum())
}

function setSliderMaxSink(this: SliderGuiElement, value: number) {
  if (!this.valid) {
    destroy(this as any)
    return
  }
  this.set_slider_minimum_maximum(this.get_slider_minimum(), value)
}

function notifySink(this: { key: string; state: MutableObservableValue<unknown> }, event: GuiEvent) {
  const key = this.key
  this.state.set((event as any)[key] || event.element![key])
}

function removeSubscription(this: { subscriptions: ElementInstance["subscriptions"]; key: string }) {
  const { subscriptions, key } = this
  const subscription = subscriptions.get(key)
  if (subscription) {
    subscription.unsubscribe()
    subscriptions.delete(key)
  }
}

Functions.registerAll({
  setValueSink,
  callMethodSink,
  setSliderMinSink,
  setSliderMaxSink,
  notifySink,
  removeSubscription,
})

const Elements = PlayerData<Record<GuiElementIndex, ElementInstance>>("gui:Elements", () => ({}))

const type = _G.type

export function render<T extends GuiElementType>(
  parent: BaseGuiElement,
  spec: ElementSpec & { type: T },
): Extract<LuaGuiElement, { type: T }>
export function render(parent: BaseGuiElement, element: Spec): LuaGuiElement
export function render(parent: BaseGuiElement, element: FragmentSpec): LuaGuiElement[]
export function render(parent: BaseGuiElement, element: FullSpec): LuaGuiElement | LuaGuiElement[]
export function render(parent: BaseGuiElement, element: FullSpec): LuaGuiElement | LuaGuiElement[] {
  const elemType = element.type
  const elemTypeType = type(elemType)
  if (elemTypeType === "string") {
    return renderElement(parent, element as ElementSpec | FragmentSpec)
  }
  if (elemTypeType === "table") {
    return renderClassComponent(parent, element as ClassComponentSpec<any>)
  }
  if (elemTypeType === "function") {
    return renderFunctionComponent(parent, element as FCSpec<any>)
  }
  error("Unknown element spec: " + serpent.block(element))
}

function renderFragment(parent: BaseGuiElement, spec: FragmentSpec): LuaGuiElement[] {
  const children = spec.children
  if (!children) return []
  return children.map((x) => render(parent, x))
}

function renderElement(parent: BaseGuiElement, spec: ElementSpec | FragmentSpec): LuaGuiElement | LuaGuiElement[] {
  if (spec.type === "fragment") {
    // error("Cannot render fragments directly. Try wrapping them in another element.")
    return renderFragment(parent, spec)
  }

  const guiSpec: Record<string, any> = {}
  const elemProps = new LuaTable<string | [string], unknown>()
  const events: ElementInstance["events"] = {}

  // eslint-disable-next-line prefer-const
  for (let [key, value] of pairs(spec)) {
    const propProperties = propTypes[key]
    if (!propProperties) continue
    if (typeof value === "function") value = funcRef(value as any)
    if (propProperties === "event") {
      if (!isCallable(value)) error("Gui event handlers must be a function")
      events[key as GuiEventName] = value as unknown as GuiEventHandler
      continue
    }
    const isSpecProp = propProperties[0]
    const isElemProp: string | boolean | null = propProperties[1]
    const event = propProperties[2] as GuiEventName | null
    if (!isSpecProp || isObservable(value)) {
      if (!isElemProp) error(`${key} cannot be a source value`)
      if (typeof isElemProp === "string") elemProps.set([isElemProp], value)
      else elemProps.set(key, value)
      if (event) {
        events[event] = bind(notifySink, {
          key,
          state: value as MutableObservableValue<any>,
        })
      }
    } else if (isSpecProp) {
      guiSpec[key] = value
    }
  }

  const element = parent.add(guiSpec as GuiSpec)
  const subscriptions: ElementInstance["subscriptions"] = new LuaMap()

  for (const [key, value] of pairs(elemProps)) {
    if (isObservable(value)) {
      let observer: Observer<unknown>["next"]
      let name: string
      if (typeof key !== "object") {
        observer = bind(setValueSink, { element, key })
        name = key
      } else {
        name = key[0]
        if (name === "slider_minimum") {
          observer = bind(setSliderMinSink, element as SliderGuiElement)
        } else if (name === "slider_maximum") {
          observer = bind(setSliderMaxSink, element as SliderGuiElement)
        } else {
          observer = bind(callMethodSink, { element: element as any, key: name })
        }
      }
      subscriptions.set(
        name,
        value.subscribe({
          next: observer,
          end: bind(removeSubscription, { subscriptions, key: name }),
        }),
      )
    } else if (typeof key !== "object") {
      // simple value
      ;(element as any)[key] = value
    } else {
      // setter value
      ;((element as any)[key[0]] as (this: void, value: unknown) => void)(value)
    }
  }

  const styleMod = spec.styleMod
  if (styleMod) {
    const style = element.style
    for (const [key, value] of pairs(styleMod)) {
      if (isObservable(value)) {
        subscriptions.set(
          key,
          value.subscribe({
            next: bind(setValueSink, { element: style, key }),
            end: bind(removeSubscription, { subscriptions, key }),
          }),
        )
      } else {
        ;(style as any)[key] = value
      }
    }
  }

  const children = spec.children
  if (children) {
    for (const child of children) render(element, child)
  }

  // setup tabbed pane
  if (spec.type === "tabbed-pane") {
    // alternate indexes tab-content
    const children = element.children
    for (const i of $range(1, children.length, 2)) {
      const tab = children[i - 1]
      const content = children[i]
      ;(element as TabbedPaneGuiElement).add_tab(tab, content)
    }
  }

  const onCreate = spec.onCreate
  if (onCreate) {
    const subscriptionsAsArray = subscriptions as unknown as Subscription[]
    const interactor: ElementInteractor = {
      addSubscription(subscription: Subscription) {
        subscriptionsAsArray.push(subscription)
      },
    }
    onCreate(element as any, interactor)
  }

  if (!isEmpty(subscriptions) || !isEmpty(events)) {
    Elements[element.player_index][element.index] = {
      element,
      events,
      subscriptions,
      playerIndex: element.player_index,
      index: element.index,
      data: spec.data,
    }
  }

  return element
}

function renderFunctionComponent<T>(parent: BaseGuiElement, spec: FCSpec<T>) {
  return render(parent, spec.type(spec.props))
}

function renderClassComponent<T>(parent: BaseGuiElement, spec: ClassComponentSpec<T>) {
  const instance = new spec.type()
  return render(parent, instance.render(spec.props))
}

function getInstance(element: BaseGuiElement): ElementInstance | undefined {
  if (!element.valid) return undefined
  return Elements[element.player_index][element.index]
}

export function destroy(element: BaseGuiElement | undefined, destroyElement = true): void {
  if (!element) return
  // is lua gui element
  const instance = getInstance(element)
  if (!instance) {
    if (!element.valid) return
    for (const child of element.children) {
      destroy(child, false)
    }
    if (destroyElement) {
      element.destroy()
    }
    return
  }

  const { subscriptions, playerIndex, index } = instance
  if (element.valid) {
    for (const child of element.children) {
      destroy(child, false)
    }
  }
  for (const [, subscription] of shallowCopy(subscriptions)) {
    subscription.unsubscribe()
  }
  if (destroyElement && element.valid) {
    element.destroy()
  }
  Elements[playerIndex][index] = undefined!
}

// -- gui events --
const guiEventNames: Record<GuiEventName, true> = {
  on_gui_click: true,
  on_gui_opened: true,
  on_gui_closed: true,
  on_gui_checked_state_changed: true,
  on_gui_selected_tab_changed: true,
  on_gui_elem_changed: true,
  on_gui_value_changed: true,
  on_gui_selection_state_changed: true,
  on_gui_switch_state_changed: true,
  on_gui_location_changed: true,
  on_gui_confirmed: true,
  on_gui_text_changed: true,
}

for (const [name] of pairs(guiEventNames)) {
  const id = defines.events[name]
  Events.on(id, (e) => {
    const element = e.element
    if (!element) return
    const instance = getInstance(element)
    if (!instance) return
    const event = instance.events[name]
    if (event) {
      event(e, instance.data)
    }
  })
}

export function cleanGuiInstances(): number {
  let count = 0
  for (const [, byPlayer] of pairs(Elements.table)) {
    for (const [, instance] of pairs(byPlayer)) {
      const element = instance.element
      if (element.valid) {
        destroy(element)
        count++
      }
    }
  }
  return count
}

if (script.active_mods.debugadapter) {
  commands.add_command("clean-gui-instances", "", () => {
    const count = cleanGuiInstances()
    if (count > 0) {
      game.print(`found ${count} invalid gui elements`)
    } else {
      game.print("No improperly destroyed GUI elements found")
    }
  })
}
