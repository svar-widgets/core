### 1.3.0

-   [update] improved popup positioning strategies

### 1.2.3

-   [fix] closing menu and popup when clicking on disabled control

### 1.2.1

-   [fix] regression in popup closing in some cases

### 1.2.0

-   [add] common logic for click-outside tracking for popup and side-area
-   [add] counter widget added
-   [update] css styles corrected ( wx prefixes, names of top classes for each widget, error state )
-   [update] uploader removed ( @wx/svelte-uploader )
-   [update] date formats used from locale
-   [fix] change event in DatePicker / Calendar

### 1.1.4

-   [fix] compatibility with svelte-kit ( typescript )

### 1.1.3

-   [fix] input in editable datepicker trigger immediate value reset

### 1.1.2

-   [fix] partial combobox clearing after clicking the "clean" button

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
