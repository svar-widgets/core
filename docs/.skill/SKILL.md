Use when building, configuring, styling, or modifying SVAR Svelte Core / @wx/svelte-core widgets, themes, locale, forms, popups, selectors, calendars, buttons, and display components

This is an index file. Open the focused widget file that matches the component you are using. Each child file is standalone and contain all critical info needed for that widget.

## Package

```js
import {
	TextArea,
	Button,
	Checkbox,
	CheckboxGroup,
	ColorSelect,
	ColorBoard,
	ColorPicker,
	Combo,
	DatePicker,
	DateRangePicker,
	Fullscreen,
	Avatar,
	Icon,
	MultiCombo,
	Popup,
	Dropdown,
	Pager,
	RadioButton,
	RadioButtonGroup,
	RichSelect,
	Segmented,
	Select,
	Slider,
	Switch,
	Tabs,
	Text,
	Counter,
	Globals,
	Field,
	Calendar,
	Month,
	RangeCalendar,
	TimePicker,
	TwoState,
	Modal,
	ModalArea,
	SideArea,
	Portal,
	Willow,
	WillowDark,
	Locale,
	locale,
	popupContainer,
	SuggestDropdown,
	en,
} from "@wx/svelte-core";
```

## Widget Index

-   `button.md` - `Button`
-   `twostate.md` - `TwoState`
-   `icon.md` - `Icon`
-   `checkbox.md` - `Checkbox`, `CheckboxGroup`
-   `radio.md` - `RadioButton`, `RadioButtonGroup`
-   `switch.md` - `Switch`
-   `segmented.md` - `Segmented`
-   `tabs.md` - `Tabs`
-   `field.md` - `Field`
-   `text.md` - `Text`
-   `textarea.md` - `TextArea`
-   `counter.md` - `Counter`
-   `slider.md` - `Slider`
-   `select.md` - `Select`
-   `combo.md` - `Combo`
-   `multicombo.md` - `MultiCombo`
-   `richselect.md` - `RichSelect`
-   `suggest-dropdown.md` - `SuggestDropdown`
-   `dropdown.md` - `Dropdown`
-   `popup.md` - `Popup`
-   `portal.md` - `Portal`, `popupContainer`
-   `colorselect.md` - `ColorSelect`
-   `colorboard.md` - `ColorBoard`
-   `colorpicker.md` - `ColorPicker`
-   `calendar.md` - `Calendar`
-   `month.md` - `Month`
-   `rangecalendar.md` - `RangeCalendar`
-   `datepicker.md` - `DatePicker`
-   `daterangepicker.md` - `DateRangePicker`
-   `timepicker.md` - `TimePicker`
-   `avatar.md` - `Avatar`
-   `pager.md` - `Pager`
-   `fullscreen.md` - `Fullscreen`
-   `modal.md` - `Modal`
-   `modalarea.md` - `ModalArea`
-   `sidearea.md` - `SideArea`
-   `globals.md` - `Globals`, `showNotice`, `showModal`
-   `themes.md` - `Willow`, `WillowDark`, theme CSS variables
-   `locale.md` - `Locale`, `locale`, `en`, bundled locale imports

## Shared Contracts

-   Most controls expose bindable `value` and an `onchange` callback. Event payloads differ by widget and are documented in each file.
-   Option-based widgets generally use `{ id, label }` options and emit selected ids as values.
-   Dropdown-backed widgets share `DropdownOptions` for position, align, width, inline mode, scroll tracking, and virtualization.
