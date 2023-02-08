declare module 'react-editable-label';

export declare interface EditableLabelProps {
	initialValue: string;
	save: SaveFunction;
	labelClass?: string;
	inputClass?: string;
	inputName?: string;
	inputId?: string;
	disableKeys?: boolean;
}

export declare type SaveFunction = (value: string) => void;
