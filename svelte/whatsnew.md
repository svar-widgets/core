## 2.3.1

### Fixes

-   Incorrect location of d.ts files

## 2.3.0

### New features

-   TypeScript definitions

### Fixes

-   Slider always has stable `previous` parameter and numeric `value` in the `onchange` event
-   DateRangepicker allows to select start date only
-   Segmented and Tabs set native tooltip only with option `title`

## Version 2.2.1

### Fixes

-   Correct weekStart number in locales
-   Adjust popups for Salesforce

## Version 2.2.0

### Updates

-   Calendar, DatePicker: ability to set "clear" and "today" buttons separately
-   DateRange, DateRangePicker: ability to set "clear", "today" and "done" buttons separately
-   Pager: disabling left/right buttons near data edges

### Fixes

-   Default locale is not applied to controls without wrapping them into Locale
-   Pager labels are not localized
-   Pager `onChange` event does not fire on `pageSize` changes
-   Combo breakes if its options do not contain current value
-   TwoState button styling in pressed state
-   MultiCombo does not have visible focus

### Breaking changes

-   RangeCalendar, DateRangePicker: `done` property is removed in favour of the `buttons` array

## Version 2.1.1

### Fixes

-   Minutes are displayed incorrectly in TimePicker

## Version 2.1.0

### New features

-   Month and year formats for locales to adjust Calendar header
-   `textOptions` property for Combo, RichSelect and MultiCombo

### Fixes

-   Dropdown lists of Combo, RichSelect and MultiCombo do not scroll during keys navigation
-   Typos in locales
-   Popup positioning close to screen edges
-   Done button in Calendar does not invoke value change
-   Parts in RangeCalendar are not synchronized

## 2.0.1

### New features

-   Svelte 5 support

### Breaking changes

-   Area renamed to TextArea
-   Timepicker renamed to TimePicker
-   Sidearea: close event renamed to `cancel`
-   ColorBoard: `change` event has extra `input` parameter
-   Modal boxes: cancel and ok properties renamed to `cancel` and `confirm` events
-   Controls with options define them as `id, label`
-   Dropdown controls have `change` event with `value` instead of `selected`

### Updates

-   ColorBoard: `change` event has extra input parameter

## 1.3.1

### Fixes

-   Locale object lacks language marker
-   Incorrect change event parameter in Tabbar
-   Required fields do not have marks in labels
-   Disabled Richselect throws an error on click/keydown
-   Current month of Calendar does not update correctly

## 1.3.0

### Updates

-   Improved popup positioning strategies

### Fixes

-   Incorrect styling of right selection marker in Calendar
-   Impossible to track input changes in Textarea

## 1.2.3

### Fixes

-   Closing menu and popup when clicking on disabled control

## 1.2.1

### Fixes

-   Regression in popup closing in some cases

## 1.2.0

### New features

-   Common logic for click-outside tracking for popup and side-area
-   Counter widget added

### Updates

-   Css styles corrected ( wx prefixes, names of top classes for each widget, error state )
-   Uploader removed ( moves to `@wx/svelte-uploader` )
-   Date formats are stored in locale

### Fixes

-   `change` event in DatePicker / Calendar

## 1.1.4

### Fixes

-   Compatibility with svelte-kit ( typescript )

## 1.1.3

### Fixes

-   Input in editable datepicker trigger immediate value reset

## 1.1.2

### Fixes

-   Partial combobox clearing after clicking the "clean" button

#### 1.0.0-rc34

-   on:select event for datepicker

#### 1.0.0-rc25

-   combo/multicombo/richselect and numeric string as item's IDs

#### 1.0.0-rc24

-   fix in input focus after widget was already destroyed

#### 1.0.0-rc23

-   styling of tabbar and messages

#### 1.0.0-rc22

-   color of border in Willow theme corrected

#### 1.0.0-rc21

-   fix for mutable "current" prop in Calendar/Range

#### 1.0.0-rc20

-   Month view as separate widget

#### 1.0.0-rc19

-   regression in date highlighting in the calendar widget

#### 1.0.0-rc18

-   incorrect date navigation in daterangepicker

#### 1.0.0-rc17

-   fix portal content cleaning

#### 1.0.0-rc16

-   tabbar triggers change event

#### 1.0.0-rc15

-   change in css naming scheme
-   css includes default font
-   locale helpers is exported

#### 1.0.0-rc14

-   export locale helper
-   richselect doesn't wrap text by default
-   themes includes necessary fonts
-   fixed navigation in the calendar
-   checkbox in multicombo is optional now
-   fix incorrect selection in the calendar when value has time part
-   timepicker expects Date as value
-   datepicker allows to disable buttons in the Calendar

#### 1.0.0-rc11

[fix] incorrect handling of Enter key in Modal, SVAR-580
