import Basic from "./cases/Basic.svelte";
import TextArea from "./cases/TextArea.svelte";
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
import Counter from "./cases/Counter.svelte";
import MultiCombo from "./cases/MultiCombo.svelte";
import Popup from "./cases/Popup.svelte";
import Radio from "./cases/Radio.svelte";
import RichSelect from "./cases/RichSelect.svelte";
import Select from "./cases/Select.svelte";
import Slider from "./cases/Slider.svelte";
import Tabs from "./cases/Tabs.svelte";
import Switch from "./cases/Switch.svelte";
import Pager from "./cases/Pager.svelte";
import TimePicker from "./cases/TimePicker.svelte";
import Field from "./cases/Field.svelte";
import Segmented from "./cases/Segmented.svelte";
import Icon from "./cases/Icon.svelte";
import SideArea from "./cases/SideArea.svelte";
import Fullscreen from "./cases/Fullscreen.svelte";
import ModalArea from "./cases/ModalArea.svelte";

export const links = [
	["/base/:skin", "Basic UI", Basic, "Basic"],
	["/button/:skin", "Button", Buttons, "Buttons"],
	["/calendar/:skin", "Calendar", Calendar, "Calendar"],
	["/month/:skin", "Month", Month, "Month"],
	["/checkbox/:skin", "Checkbox", Checkbox, "Checkbox"],
	["/colorpicker/:skin", "ColorPicker", ColorPicker, "ColorPicker"],
	["/colorselect/:skin", "ColorSelect", ColorSelect, "ColorSelect"],
	["/combo/:skin", "Combo", Combo, "Combo"],
	["/datepicker/:skin", "DatePicker", DatePicker, "DatePicker"],
	[
		"/daterangepicker/:skin",
		"DateRangePicker",
		DateRangePicker,
		"DateRangePicker",
	],
	["/field/:skin", "Field", Field, "Field"],
	["/fullscreen/:skin", "Fullscreen", Fullscreen, "Fullscreen"],
	["/locales/:skin", "Locales", Locales, "Locales"],
	["/messages/:skin", "Messages", Messages, "Messages"],
	["/multicombo/:skin", "MultiCombo", MultiCombo, "MultiCombo"],
	["/range/:skin", "Range", RangeCalendar, "RangeCalendar"],
	["/pager/:skin", "Pager", Pager, "Pager"],
	["/popup/:skin", "Popup", Popup, "Popup"],
	["/radio/:skin", "Radio", Radio, "Radio"],
	["/richselect/:skin", "Rich Select", RichSelect, "RichSelect"],
	["/segmented/:skin", "Segmented", Segmented, "Segmented"],
	["/select/:skin", "Select", Select, "Select"],
	["/slider/:skin", "Slider", Slider, "Slider"],
	["/switch/:skin", "Switch", Switch, "Switch"],
	["/tabs/:skin", "Tabs", Tabs, "Tabs"],
	["/inputs/:skin", "Text Inputs", Text, "Text"],
	["/textarea/:skin", "TextArea", TextArea, "TextArea"],
	["/counter/:skin", "Counter Input", Counter, "Counter"],
	["/timepicker/:skin", "TimePicker", TimePicker, "TimePicker"],
	["/twostate/:skin", "Two State", TwoState, "TwoState"],
	["/icon/:skin", "Icon", Icon, "Icon"],
	["/sidearea/:skin", "Side Area", SideArea, "SideArea"],
	["/modalarea/:skin", "Modal Area", ModalArea, "ModalArea"],
];
