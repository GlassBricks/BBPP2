// This file was auto-generated by scripts/gen-gui-specs.ts. Do not edit directly!

import { MaybeSinkSource, MaybeSource } from "../callbags"
import { Element } from "./spec"

export interface BaseElementSpec {
  type: GuiElementType
  name?: MaybeSource<string>
  caption?: MaybeSource<LocalisedString>
  tooltip?: MaybeSource<LocalisedString>
  enabled?: MaybeSource<boolean>
  visible?: MaybeSource<boolean>
  ignored_by_interaction?: MaybeSource<boolean>
  style?: string
  tags?: Tags
  anchor?: MaybeSource<GuiAnchor | undefined>
  location?: MaybeSource<GuiLocation | undefined>
  children?: Element[]
}

export interface ChooseElemButtonElementSpec extends BaseElementSpec {
  type: "choose-elem-button"
  elem_type: ChooseElemButtonType
  elem_filters?: MaybeSource<ChooseElemButtonFilters[this["elem_type"]] | undefined>
  elem_value?: MaybeSinkSource<(this["elem_type"] extends "signal" ? SignalID : string) | undefined>
  locked?: MaybeSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: ChooseElemButtonGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface DropDownElementSpec extends BaseElementSpec {
  type: "drop-down"
  items?: MaybeSource<LocalisedString[]>
  selected_index?: MaybeSinkSource<uint>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: DropDownGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface EmptyWidgetElementSpec extends BaseElementSpec {
  type: "empty-widget"
  drag_target?: MaybeSource<LuaGuiElement | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: EmptyWidgetGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface EntityPreviewElementSpec extends BaseElementSpec {
  type: "entity-preview"
  entity?: MaybeSource<LuaEntity | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: EntityPreviewGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface ListBoxElementSpec extends BaseElementSpec {
  type: "list-box"
  items?: MaybeSource<LocalisedString[]>
  selected_index?: MaybeSinkSource<uint>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: ListBoxGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface ScrollPaneElementSpec extends BaseElementSpec {
  type: "scroll-pane"
  horizontal_scroll_policy?: MaybeSource<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  vertical_scroll_policy?: MaybeSource<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: ScrollPaneGuiElementMembers) => void
  styleMod?: ScrollPaneStyleMod
}

export interface SpriteButtonElementSpec extends BaseElementSpec {
  type: "sprite-button"
  sprite?: MaybeSource<SpritePath>
  hovered_sprite?: MaybeSource<SpritePath>
  clicked_sprite?: MaybeSource<SpritePath>
  number?: MaybeSource<double | undefined>
  show_percent_for_small_numbers?: MaybeSource<boolean>
  mouse_button_filter?: MaybeSource<MouseButtonFlags>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: SpriteButtonGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface TabbedPaneElementSpec extends BaseElementSpec {
  type: "tabbed-pane"
  selected_tab_index?: MaybeSinkSource<uint | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: TabbedPaneGuiElementMembers) => void
  styleMod?: TabbedPaneStyleMod
}

export interface TextBoxElementSpec extends BaseElementSpec {
  type: "text-box"
  text?: MaybeSinkSource<string>
  clear_and_focus_on_right_click?: MaybeSource<boolean>
  selectable?: MaybeSource<boolean>
  word_wrap?: MaybeSource<boolean>
  read_only?: MaybeSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_confirmed?: (event: OnGuiConfirmedEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: TextBoxGuiElementMembers) => void
  styleMod?: TextBoxStyleMod
}

export interface ButtonElementSpec extends BaseElementSpec {
  type: "button"
  mouse_button_filter?: MaybeSource<MouseButtonFlags>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: ButtonGuiElementMembers) => void
  styleMod?: ButtonStyleMod
}

export interface CameraElementSpec extends BaseElementSpec {
  type: "camera"
  position: MaybeSource<MapPosition>
  surface_index?: MaybeSource<SurfaceIndex>
  zoom?: MaybeSource<double>
  entity?: MaybeSource<LuaEntity | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: CameraGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface CheckboxElementSpec extends BaseElementSpec {
  type: "checkbox"
  state: MaybeSinkSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: CheckboxGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface FlowElementSpec extends BaseElementSpec {
  type: "flow"
  direction?: "horizontal" | "vertical"
  drag_target?: MaybeSource<LuaGuiElement | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: FlowGuiElementMembers) => void
  styleMod?: FlowStyleMod
}

export interface FrameElementSpec extends BaseElementSpec {
  type: "frame"
  direction?: "horizontal" | "vertical"
  auto_center?: MaybeSource<boolean>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_location_changed?: (event: OnGuiLocationChangedEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: FrameGuiElementMembers) => void
  styleMod?: FrameStyleMod
}

export interface LabelElementSpec extends BaseElementSpec {
  type: "label"
  drag_target?: MaybeSource<LuaGuiElement | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: LabelGuiElementMembers) => void
  styleMod?: LabelStyleMod
}

export interface LineElementSpec extends BaseElementSpec {
  type: "line"
  direction?: "horizontal" | "vertical"
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: LineGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface MinimapElementSpec extends BaseElementSpec {
  type: "minimap"
  position?: MaybeSource<MapPosition>
  surface_index?: MaybeSource<SurfaceIndex>
  chart_player_index?: uint
  force?: MaybeSource<string | undefined>
  zoom?: MaybeSource<double>
  minimap_player_index?: MaybeSource<uint>
  entity?: MaybeSource<LuaEntity | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: MinimapGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface ProgressBarElementSpec extends BaseElementSpec {
  type: "progressbar"
  value?: MaybeSource<double>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: ProgressBarGuiElementMembers) => void
  styleMod?: ProgressBarStyleMod
}

export interface RadioButtonElementSpec extends BaseElementSpec {
  type: "radiobutton"
  state: MaybeSinkSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: RadioButtonGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface SliderElementSpec extends BaseElementSpec {
  type: "slider"
  minimum_value?: MaybeSource<double>
  maximum_value?: MaybeSource<double>
  value_step?: MaybeSource<double>
  discrete_slider?: MaybeSource<double>
  discrete_values?: boolean
  slider_value?: MaybeSinkSource<double>
  discrete_value?: MaybeSource<double>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: SliderGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface SpriteElementSpec extends BaseElementSpec {
  type: "sprite"
  sprite?: MaybeSource<SpritePath>
  resize_to_sprite?: MaybeSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: SpriteGuiElementMembers) => void
  styleMod?: SpriteStyleMod
}

export interface SwitchElementSpec extends BaseElementSpec {
  type: "switch"
  switch_state?: MaybeSinkSource<string>
  allow_none_state?: MaybeSource<boolean>
  left_label_caption?: MaybeSource<LocalisedString>
  left_label_tooltip?: MaybeSource<LocalisedString>
  right_label_caption?: MaybeSource<LocalisedString>
  right_label_tooltip?: MaybeSource<LocalisedString>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: SwitchGuiElementMembers) => void
  styleMod?: BaseStyleMod
}

export interface TabElementSpec extends BaseElementSpec {
  type: "tab"
  badge_text?: MaybeSource<LocalisedString>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: TabGuiElementMembers) => void
  styleMod?: TabStyleMod
}

export interface TableElementSpec extends BaseElementSpec {
  type: "table"
  column_count: uint
  draw_vertical_lines?: MaybeSource<boolean>
  draw_horizontal_lines?: MaybeSource<boolean>
  draw_horizontal_line_after_headers?: MaybeSource<boolean>
  vertical_centering?: MaybeSource<boolean>
  drag_target?: MaybeSource<LuaGuiElement | undefined>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: TableGuiElementMembers) => void
  styleMod?: TableStyleMod
}

export interface TextFieldElementSpec extends BaseElementSpec {
  type: "textfield"
  text?: MaybeSinkSource<string>
  numeric?: MaybeSource<boolean>
  allow_decimal?: MaybeSource<boolean>
  allow_negative?: MaybeSource<boolean>
  is_password?: MaybeSource<boolean>
  lose_focus_on_confirm?: MaybeSource<boolean>
  clear_and_focus_on_right_click?: MaybeSource<boolean>
  on_gui_click?: (event: OnGuiClickEvent) => void
  on_gui_confirmed?: (event: OnGuiConfirmedEvent) => void
  on_gui_opened?: (event: OnGuiOpenedEvent) => void
  on_gui_closed?: (event: OnGuiClosedEvent) => void
  onCreate?: (element: TextFieldGuiElementMembers) => void
  styleMod?: TextFieldStyleMod
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
  | ProgressBarElementSpec
  | RadioButtonElementSpec
  | SliderElementSpec
  | SpriteElementSpec
  | SwitchElementSpec
  | TabElementSpec
  | TableElementSpec
  | TextFieldElementSpec

export interface BaseStyleMod {
  minimal_width?: MaybeSource<int>
  maximal_width?: MaybeSource<int>
  minimal_height?: MaybeSource<int>
  maximal_height?: MaybeSource<int>
  natural_width?: MaybeSource<int>
  natural_height?: MaybeSource<int>
  top_padding?: MaybeSource<int>
  right_padding?: MaybeSource<int>
  bottom_padding?: MaybeSource<int>
  left_padding?: MaybeSource<int>
  top_margin?: MaybeSource<int>
  right_margin?: MaybeSource<int>
  bottom_margin?: MaybeSource<int>
  left_margin?: MaybeSource<int>
  horizontal_align?: MaybeSource<"left" | "center" | "right">
  vertical_align?: MaybeSource<"top" | "center" | "bottom">
  font_color?: MaybeSource<Color>
  font?: MaybeSource<string>
  horizontally_stretchable?: MaybeSource<boolean>
  vertically_stretchable?: MaybeSource<boolean>
  horizontally_squashable?: MaybeSource<boolean>
  vertically_squashable?: MaybeSource<boolean>
  width?: MaybeSource<int>
  height?: MaybeSource<int>
  size?: MaybeSource<int | SizeArray>
  padding?: MaybeSource<int | StyleValuesArray>
  margin?: MaybeSource<int | StyleValuesArray>
}

export interface ScrollPaneStyleMod extends BaseStyleMod {
  extra_top_padding_when_activated?: MaybeSource<int>
  extra_bottom_padding_when_activated?: MaybeSource<int>
  extra_left_padding_when_activated?: MaybeSource<int>
  extra_right_padding_when_activated?: MaybeSource<int>
  extra_top_margin_when_activated?: MaybeSource<int>
  extra_bottom_margin_when_activated?: MaybeSource<int>
  extra_left_margin_when_activated?: MaybeSource<int>
  extra_right_margin_when_activated?: MaybeSource<int>
  extra_padding_when_activated?: MaybeSource<int | StyleValuesArray>
  extra_margin_when_activated?: MaybeSource<int | StyleValuesArray>
}

export interface TabbedPaneStyleMod extends BaseStyleMod {
  vertical_spacing?: MaybeSource<int>
}

export interface TextBoxStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeSource<defines.rich_text_setting>
}

export interface ButtonStyleMod extends BaseStyleMod {
  hovered_font_color?: MaybeSource<Color>
  clicked_font_color?: MaybeSource<Color>
  disabled_font_color?: MaybeSource<Color>
  pie_progress_color?: MaybeSource<Color>
  clicked_vertical_offset?: MaybeSource<int>
  selected_font_color?: MaybeSource<Color>
  selected_hovered_font_color?: MaybeSource<Color>
  selected_clicked_font_color?: MaybeSource<Color>
  strikethrough_color?: MaybeSource<Color>
}

export interface FlowStyleMod extends BaseStyleMod {
  horizontal_spacing?: MaybeSource<int>
  vertical_spacing?: MaybeSource<int>
}

export interface FrameStyleMod extends BaseStyleMod {
  use_header_filler?: MaybeSource<boolean>
}

export interface LabelStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeSource<defines.rich_text_setting>
  single_line?: MaybeSource<boolean>
}

export interface ProgressBarStyleMod extends BaseStyleMod {
  bar_width?: MaybeSource<uint>
  color?: MaybeSource<Color>
}

export interface SpriteStyleMod extends BaseStyleMod {
  stretch_image_to_widget_size?: MaybeSource<boolean>
}

export interface TabStyleMod extends BaseStyleMod {
  disabled_font_color?: MaybeSource<Color>
  badge_font?: MaybeSource<string>
  badge_horizontal_spacing?: MaybeSource<int>
  default_badge_font_color?: MaybeSource<Color>
  selected_badge_font_color?: MaybeSource<Color>
  disabled_badge_font_color?: MaybeSource<Color>
}

export interface TableStyleMod extends BaseStyleMod {
  top_cell_padding?: MaybeSource<int>
  right_cell_padding?: MaybeSource<int>
  bottom_cell_padding?: MaybeSource<int>
  left_cell_padding?: MaybeSource<int>
  horizontal_spacing?: MaybeSource<int>
  vertical_spacing?: MaybeSource<int>
  cell_padding?: MaybeSource<int>
}

export interface TextFieldStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeSource<defines.rich_text_setting>
}
