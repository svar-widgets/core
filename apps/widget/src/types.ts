import type { Component } from "svelte";
import type { TPosition } from "@svar-ui/lib-dom";

export type TID = string | number;

// an item of the options list of select-like controls
export interface IOption {
	id: TID;
	label?: string;
}

export interface ITabOption extends IOption {
	title?: string;
	tooltip?: string;
	icon?: string;
}

export interface DropdownOptions {
	inline?: boolean;
	position?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	autoFit?: boolean;
	css?: string;
	width?: string;
	trackScroll?: boolean;
	virtualized?: boolean;
}

export type TButtonType =
	| ""
	| "primary"
	| "secondary"
	| "danger"
	| "link"
	| "primary block"
	| "secondary block"
	| "danger block"
	| "link block";

export type TCalendarButton = "clear" | "today" | "done";

export type TDateFormat = string | ((value: Date) => string);

export interface IDateRange {
	start: Date;
	end?: Date | null;
}

export interface IUser {
	id: string | number;
	name?: string;
	avatar?: string;
	color?: string;
}

export type TPositionNoFit = Exclude<
	TPosition,
	"bottom-fit" | "top-fit" | "center-fit"
>;

export type TooltipResolver = (
	element: HTMLElement,
	event: MouseEvent
) => Record<string, any> | string | null;

export type TTooltipContent = Component<any>;

// a message shown by showNotice() of the "wx-helpers" context
export interface INotice {
	id?: TID;
	text?: string;
	type?: string;
	expire?: number;
	remove?: () => void;
}

// a dialog shown by showModal() of the "wx-helpers" context
export interface IModalMessage {
	title?: string;
	message?: string;
	buttons?: boolean | string[];
}

export interface IModalEvent {
	button?: string;
	event: MouseEvent;
}

export interface IHelpers {
	showNotice: (msg: INotice) => void;
	showModal: (msg: IModalMessage) => Promise<unknown>;
}

export type TPortalMount = (handler: () => void) => void;

// the parts of the raw locale (ILocale.getRaw()) that core components read
export interface ICalendarTerms {
	monthFull: string[];
	monthShort: string[];
	dayFull: string[];
	dayShort: string[];
	hours: string;
	minutes: string;
	done: string;
	clear: string;
	today: string;
	am?: string[];
	pm?: string[];
	weekStart?: number;
	clockFormat?: number;
}

export interface ICoreTerms {
	calendar: ICalendarTerms;
	formats: {
		timeFormat: TDateFormat;
		dateFormat: TDateFormat;
		monthYearFormat: string;
		yearFormat: string;
	};
}
