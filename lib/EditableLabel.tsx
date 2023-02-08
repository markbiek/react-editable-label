import React, { useState, useEffect, useRef } from 'react';

interface EditableLabelProps {
	initialValue: string;
	save: SaveFunction;
	labelClass?: string;
	inputClass?: string;
	inputName?: string;
	inputId?: string;
	disableKeys?: boolean;
}

type SaveFunction = (value: string) => void;

const EditableLabel = ({
	initialValue,
	save,
	disableKeys,
	inputClass,
	labelClass,
	inputName,
	inputId,
}: EditableLabelProps) => {
	const [view, setView] = useState<string>('label');
	const [value, setValue] = useState<string>(initialValue);
	const [previous, setPrevious] = useState<string>(initialValue);
	const textInput = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (view === 'text') {
			textInput?.current?.focus();
		}
	}, [view, textInput]);

	const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (disableKeys === true) {
			return;
		}

		if (e.key === 'Escape') {
			setValue(previous);
			setView('label');
		} else if (e.key === 'Enter') {
			const value = (e.target as HTMLInputElement).value;

			setValue(value);
			setPrevious(value);
			setView('label');

			save(value);
		}
	};

	const renderLabel = () => {
		return (
			<span
				className={labelClass !== undefined ? labelClass : ''}
				onClick={() => {
					setView('text');
				}}
			>
				{value}
			</span>
		);
	};

	const renderInput = () => {
		return (
			<div>
				<input
					type='text'
					value={value}
					ref={textInput}
					className={inputClass !== undefined ? inputClass : ''}
					id={inputId !== undefined ? inputId : ''}
					name={inputName !== undefined ? inputName : ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setValue(e.target.value);
					}}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						setView('label');
						setPrevious(e.target.value);

						save(e.target.value);
					}}
					onKeyUp={keyUp}
				/>
			</div>
		);
	};

	return view === 'label' ? renderLabel() : renderInput();
};

export default EditableLabel;
