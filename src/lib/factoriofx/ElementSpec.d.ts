import { MaybeSource } from "../callbags"

export interface ChooseElemButtonElementSpec {
  type: "choose-elem-button"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  elem_type: ChooseElemButtonType
  elem_filters?: MaybeSource<ChooseElemButtonFilters[this["elem_type"]] | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  elem_value?: MaybeSource<(this["elem_type"] extends "signal" ? SignalID : string) | undefined>
  locked?: MaybeSource<boolean>
}

export interface DropDownElementSpec {
  type: "drop-down"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  items?: MaybeSource<LocalisedString[]>
  selected_index?: MaybeSource<uint>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface EmptyWidgetElementSpec {
  type: "empty-widget"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
}

export interface EntityPreviewElementSpec {
  type: "entity-preview"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  entity?: MaybeSource<LuaEntity | undefined>
}

export interface ListBoxElementSpec {
  type: "list-box"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  items?: MaybeSource<LocalisedString[]>
  selected_index?: MaybeSource<uint>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface ScrollPaneElementSpec {
  type: "scroll-pane"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  horizontal_scroll_policy?: MaybeSource<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  vertical_scroll_policy?: MaybeSource<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  location?: MaybeSource<GuiLocation | undefined>
}

export interface SpriteButtonElementSpec {
  type: "sprite-button"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  sprite?: MaybeSource<SpritePath>
  hovered_sprite?: MaybeSource<SpritePath>
  clicked_sprite?: MaybeSource<SpritePath>
  number?: MaybeSource<double | undefined>
  show_percent_for_small_numbers?: MaybeSource<boolean>
  mouse_button_filter?: MaybeSource<MouseButtonFlags>
  location?: MaybeSource<GuiLocation | undefined>
  resize_to_sprite?: MaybeSource<boolean>
}

export interface TabbedPaneElementSpec {
  type: "tabbed-pane"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  selected_tab_index?: MaybeSource<uint | undefined>
}

export interface TextBoxElementSpec {
  type: "text-box"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  text?: MaybeSource<string>
  clear_and_focus_on_right_click?: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
  selectable?: MaybeSource<boolean>
  word_wrap?: MaybeSource<boolean>
  read_only?: MaybeSource<boolean>
}

export interface ButtonElementSpec {
  type: "button"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  mouse_button_filter?: MaybeSource<MouseButtonFlags>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface CameraElementSpec {
  type: "camera"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  position: MaybeSource<Position>
  surface_index?: MaybeSource<uint>
  zoom?: MaybeSource<double>
  location?: MaybeSource<GuiLocation | undefined>
  entity?: MaybeSource<LuaEntity | undefined>
}

export interface CheckboxElementSpec {
  type: "checkbox"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  state: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface FlowElementSpec {
  type: "flow"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  direction?: "horizontal" | "vertical"
  location?: MaybeSource<GuiLocation | undefined>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
}

export interface FrameElementSpec {
  type: "frame"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  direction?: "horizontal" | "vertical"
  location?: MaybeSource<GuiLocation | undefined>
  auto_center?: MaybeSource<boolean>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
}

export interface LabelElementSpec {
  type: "label"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
}

export interface LineElementSpec {
  type: "line"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  direction?: "horizontal" | "vertical"
  location?: MaybeSource<GuiLocation | undefined>
}

export interface MinimapElementSpec {
  type: "minimap"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  position?: MaybeSource<Position>
  surface_index?: MaybeSource<uint>
  chart_player_index?: uint
  force?: MaybeSource<string | undefined>
  zoom?: MaybeSource<double>
  location?: MaybeSource<GuiLocation | undefined>
  minimap_player_index?: MaybeSource<uint>
  entity?: MaybeSource<LuaEntity | undefined>
}

export interface ProgressbarElementSpec {
  type: "progressbar"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  value?: MaybeSource<double>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface RadiobuttonElementSpec {
  type: "radiobutton"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  state: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface SliderElementSpec {
  type: "slider"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  minimum_value?: double
  maximum_value?: double
  value?: double
  value_step?: double
  discrete_slider?: boolean
  discrete_values?: boolean
  location?: MaybeSource<GuiLocation | undefined>
  slider_value?: MaybeSource<double>
}

export interface SpriteElementSpec {
  type: "sprite"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  sprite?: MaybeSource<SpritePath>
  resize_to_sprite?: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface SwitchElementSpec {
  type: "switch"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  switch_state?: MaybeSource<string>
  allow_none_state?: MaybeSource<boolean>
  left_label_caption?: MaybeSource<LocalisedString>
  left_label_tooltip?: MaybeSource<LocalisedString>
  right_label_caption?: MaybeSource<LocalisedString>
  right_label_tooltip?: MaybeSource<LocalisedString>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface TabElementSpec {
  type: "tab"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  badge_text?: MaybeSource<LocalisedString>
  location?: MaybeSource<GuiLocation | undefined>
}

export interface TableElementSpec {
  type: "table"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  column_count: uint
  draw_vertical_lines?: MaybeSource<boolean>
  draw_horizontal_lines?: MaybeSource<boolean>
  draw_horizontal_line_after_headers?: MaybeSource<boolean>
  vertical_centering?: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
}

export interface TextfieldElementSpec {
  type: "textfield"
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: MaybeSource<Tags>
  anchor?: MaybeSource<GuiAnchor | undefined>
  text?: MaybeSource<string>
  numeric?: MaybeSource<boolean>
  allow_decimal?: MaybeSource<boolean>
  allow_negative?: MaybeSource<boolean>
  is_password?: MaybeSource<boolean>
  lose_focus_on_confirm?: MaybeSource<boolean>
  clear_and_focus_on_right_click?: MaybeSource<boolean>
  location?: MaybeSource<GuiLocation | undefined>
}

export type ElementSpec =
  | ChooseElemButtonElementSpec
  | DropDownElementSpec
  | EmptyWidgetElementSpec
  | EntityPreviewElementSpec
  | ListBoxElementSpec
  | ScrollPaneElementSpec
  | SpriteButtonElementSpec
  | TabbedPaneElementSpec
  | TextBoxElementSpec
  | ButtonElementSpec
  | CameraElementSpec
  | CheckboxElementSpec
  | FlowElementSpec
  | FrameElementSpec
  | LabelElementSpec
  | LineElementSpec
  | MinimapElementSpec
  | ProgressbarElementSpec
  | RadiobuttonElementSpec
  | SliderElementSpec
  | SpriteElementSpec
  | SwitchElementSpec
  | TabElementSpec
  | TableElementSpec
  | TextfieldElementSpec
