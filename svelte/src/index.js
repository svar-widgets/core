export { default as TextArea } from "./components/TextArea.svelte";
export { default as Button } from "./components/Button.svelte";
export { default as Checkbox } from "./components/Checkbox.svelte";
export { default as CheckboxGroup } from "./components/CheckboxGroup.svelte";
export { default as ColorSelect } from "./components/ColorSelect.svelte";
export { default as ColorBoard } from "./components/ColorBoard.svelte";
export { default as ColorPicker } from "./components/ColorPicker.svelte";
export { default as Combo } from "./components/Combo.svelte";
export { default as DatePicker } from "./components/DatePicker.svelte";
export { default as DateRangePicker } from "./components/DateRangePicker.svelte";
export { default as Icon } from "./components/Icon.svelte";
export { default as MultiCombo } from "./components/MultiCombo.svelte";
export { default as Popup } from "./components/Popup.svelte";
export { default as Dropdown } from "./components/Dropdown.svelte";
export { default as Pager } from "./components/Pager.svelte";
export { default as RadioButton } from "./components/RadioButton.svelte";
export { default as RadioButtonGroup } from "./components/RadioButtonGroup.svelte";
export { default as RichSelect } from "./components/RichSelect.svelte";
export { default as Segmented } from "./components/Segmented.svelte";
export { default as Select } from "./components/Select.svelte";
export { default as Slider } from "./components/Slider.svelte";
export { default as Switch } from "./components/Switch.svelte";
export { default as Tabs } from "./components/Tabs.svelte";
export { default as Text } from "./components/Text.svelte";
export { default as Counter } from "./components/Counter.svelte";
export { default as Globals } from "./components/Globals.svelte";
export { default as Field } from "./components/Field.svelte";
export { default as Calendar } from "./components/Calendar.svelte";
export { default as Month } from "./components/calendar/Month.svelte";
export { default as RangeCalendar } from "./components/RangeCalendar.svelte";
export { default as TimePicker } from "./components/TimePicker.svelte";
export { default as TwoState } from "./components/TwoState.svelte";
export { default as Modal } from "./components/Modal.svelte";
export { default as ModalArea } from "./components/ModalArea.svelte";
export { default as SideArea } from "./components/SideArea.svelte";
export { default as Portal } from "./components/Portal.svelte";

export { default as Material } from "./themes/Material.svelte";
export { default as Willow } from "./themes/Willow.svelte";
export { default as WillowDark } from "./themes/WillowDark.svelte";

export { default as Locale } from "./Locale.svelte";
export { locale } from "@svar-ui/lib-dom";

export { popupContainer } from "./components/helpers";
export { default as SuggestDropdown } from "./components/helpers/SuggestDropdown.svelte";

export { en } from "@svar-ui/core-locales";

import { setEnv } from "@svar-ui/lib-dom";
import { env } from "@svar-ui/lib-svelte";
setEnv(env);
