import Area from "./cases/Area.svelte";
import Buttons from "./cases/Buttons.svelte";
import Calendar from "./cases/Calendar.svelte";
import Month from "./cases/Month.svelte";
import RangeCalendar from "./cases/RangeCalendar.svelte";
import Checkbox from "./cases/Checkbox.svelte";
import ColorSelect from "./cases/ColorSelect.svelte";
import ColorPicker from "./cases/ColorPicker.svelte";
import Combo from "./cases/Combo.svelte";
import DatePicker from "./cases/DatePicker.svelte";
import DateRangePicker from "./cases/DateRangePicker.svelte";
import Locales from "./cases/Locales.svelte";
import Messages from "./cases/Messages.svelte";
import TwoState from "./cases/TwoState.svelte";
import Text from "./cases/Text.svelte";
import MultiCombo from "./cases/MultiCombo.svelte";
import Popup from "./cases/Popup.svelte";
import Radio from "./cases/Radio.svelte";
import RichSelect from "./cases/RichSelect.svelte";
import Select from "./cases/Select.svelte";
import Slider from "./cases/Slider.svelte";
import Tabs from "./cases/Tabs.svelte";
import Switch from "./cases/Switch.svelte";
import Pager from "./cases/Pager.svelte";
import Timepicker from "./cases/Timepicker.svelte";
import Field from "./cases/Field.svelte";
import Segmented from "./cases/Segmented.svelte";
import Upload from "./cases/Upload.svelte";
import Icon from "./cases/Icon.svelte";
import SideArea from "./cases/SideArea.svelte";
import ModalArea from "./cases/ModalArea.svelte";

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
	["/icon/:skin", "Icon", Icon],
	["/sidearea/:skin", "Side Area", SideArea],
	["/modalarea/:skin", "Modal Area", ModalArea],
];
