import Area from "./common/Area.svelte";
import Buttons from "./common/Buttons.svelte";
import Calendar from "./common/Calendar.svelte";
import Month from "./common/Month.svelte";
import RangeCalendar from "./common/RangeCalendar.svelte";
import Checkbox from "./common/Checkbox.svelte";
import ColorSelect from "./common/ColorSelect.svelte";
import ColorPicker from "./common/ColorPicker.svelte";
import Combo from "./common/Combo.svelte";
import DatePicker from "./common/DatePicker.svelte";
import DateRangePicker from "./common/DateRangePicker.svelte";
import Locales from "./common/Locales.svelte";
import Messages from "./common/Messages.svelte";
import TwoState from "./common/TwoState.svelte";
import Text from "./common/Text.svelte";
import MultiCombo from "./common/MultiCombo.svelte";
import Popup from "./common/Popup.svelte";
import Radio from "./common/Radio.svelte";
import RichSelect from "./common/RichSelect.svelte";
import Select from "./common/Select.svelte";
import Slider from "./common/Slider.svelte";
import Tabs from "./common/Tabs.svelte";
import Switch from "./common/Switch.svelte";
import Pager from "./common/Pager.svelte";
import Timepicker from "./common/Timepicker.svelte";
import Field from "./common/Field.svelte";
import Segmented from "./common/Segmented.svelte";
import Upload from "./uploader/Upload.svelte";

export const links = [
	["/area/:skin", "Area", Area],
	["/button/:skin", "Button", Buttons],
	["/calendar/:skin", "Calendar", Calendar],
	["/month/:skin", "Month", Month],
	["/checkbox/:skin", "Checkbox", Checkbox],
	["/colorpicker/:skin", "ColorPicker", ColorPicker],
	["/colorselect/:skin", "ColorSelect", ColorSelect],
	["/combo/:skin", "Combo", Combo],
	["/datepicker/:skin", "DatePicker", DatePicker],
	["/daterangepicker/:skin", "DateRangePicker", DateRangePicker],
	["/field/:skin", "Field", Field],
	["/locales/:skin", "Locales", Locales],
	["/messages/:skin", "Messages", Messages],
	["/multicombo/:skin", "MultiCombo", MultiCombo],
	["/range/:skin", "Range", RangeCalendar],
	["/pager/:skin", "Pager", Pager],
	["/popup/:skin", "Popup", Popup],
	["/radio/:skin", "Radio", Radio],
	["/richselect/:skin", "Rich Select", RichSelect],
	["/segmented/:skin", "Segmented", Segmented],
	["/select/:skin", "Select", Select],
	["/slider/:skin", "Slider", Slider],
	["/switch/:skin", "Switch", Switch],
	["/tabs/:skin", "Tabs", Tabs],
	["/inputs/:skin", "Text Inputs", Text],
	["/timepicker/:skin", "Timepicker", Timepicker],
	["/twostate/:skin", "Two State", TwoState],
	["/uploader/:skin", "Upload", Upload],
];
