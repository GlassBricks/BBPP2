// this could maybe be moved to shared lib in the future

import { bound, Classes } from "../../lib"
import { Component, ElemProps, FactorioJsx, render, Spec, Tracker } from "../../lib/factoriojsx"
import { State } from "../../lib/observable"

@Classes.register()
export class If extends Component {
  then!: () => Spec | undefined
  else?: () => Spec | undefined
  element!: FlowGuiElementMembers

  render(
    props: {
      condition: State<boolean>
      then: () => Spec | undefined
      else?: () => Spec | undefined
    } & ElemProps<"flow">,
    tracker: Tracker,
  ): Spec {
    this.then = props.then
    this.else = props.else
    return (
      <flow
        {...props}
        onCreate={(element) => {
          this.element = element
          this.onChange(props.condition.value)
          const unsubscribe = props.condition.subscribe(this.onChange)
          tracker.onDestroy(unsubscribe)
        }}
      />
    )
  }

  lastValue: boolean | undefined
  @bound
  private onChange(value?: boolean, end?: boolean) {
    if (end) return
    if (value === this.lastValue) return
    this.lastValue = value
    this.element.clear()
    const spec = value ? this.then() : this.else?.()
    if (spec) {
      render(this.element, spec)
    }
  }
}
