'use client'

import React, { KeyboardEvent, useRef, useState, useEffect, useMemo } from "react";
import { useControlled, useOutsideRefClick, useCombineRefs } from "@/hooks";
import ArrowDown from 'components/Icons/ArrowDown';
import clsx from "clsx";
import classes from "./Dropdown.module.scss";

export type Option = {
	label: string;
	value: any;
};

type CustomProps = {
	fullWidth?: boolean;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	options?: Array<Option>;
	value?: any;
	defaultValue?: any;
	onChange?: (_event: { event: React.MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>, option?: Option, value: any }) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps>

export const Dropdown = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		fullWidth = false,
		className,
		disabled = false,
		placeholder = "",
		options = [],
		value: propValue,
		defaultValue,
		onChange,
		onFocus,
		onBlur,
		onKeyDown,
		...rest
	} = props;


	const rootRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const combinedInputRef = useCombineRefs([inputRef, forwardedRef]);

	const [isOpen, setIsOpen] = useState<boolean>(false);


	useOutsideRefClick(() => {
		handleClose();
	}, rootRef);

	useEffect(() => {
		const handleKeyEvent = (event: globalThis.KeyboardEvent) => {
			if (isOpen) {
				if (event.key === "ArrowUp" || event.key === "ArrowDown") {
					event.preventDefault();
				}
			}
		};

		// Bind the event listener
		document.body.addEventListener("keydown", handleKeyEvent);
		document.body.addEventListener("keyup", handleKeyEvent);
		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener("keydown", handleKeyEvent);
			document.body.removeEventListener("keyup", handleKeyEvent);
		};
	}, [isOpen]);



	const [value, setValue] = useControlled<any>({
		controlled: propValue,
		default: defaultValue,
		initialValue: null,
	});


	const selectedOptionIndex = useMemo((): number => {
		for (let i = 0; i < options.length; i++) {
			if (options[i].value === value) {
				return i;
			}
		}

		return -1;
	}, [options, value]);



	const handleOpen = () => {
		if (!disabled) {
			setIsOpen(true);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
	};


	const handleOptionClick = (event: React.MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>, option: Option) => {
		onChange?.({ event, option, value: option.value });
		setValue(option.value);
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		onFocus?.(event);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur?.(event);
		handleClose();
	};



	const rootClassName = clsx(classes.root, {
		'fullWidth': fullWidth,
	}, className);



	const triggerClassName = clsx(classes.trigger, {
		'disabled': disabled
	});


	const optionsClassName = classes.options;
	const optionClassName = classes.option;

	const renderOptions = () => {
		if (options.length > 0) {
			return (
				<ul
					role='listbox'
					className={optionsClassName}>
					{React.Children.toArray(options.map((option: Option, index: number) => (
						<li
							className={optionClassName}
							onMouseDown={(event: React.MouseEvent<HTMLLIElement>) => handleOptionClick(event, option)}>
							{option.label}
						</li>
					)))}
				</ul>
			);
		}

		return null;
	};

	return (
		<div
			ref={rootRef}
			className={rootClassName}>

			<input
				autoComplete='off'
				onClick={handleOpen}
				readOnly
				ref={combinedInputRef}
				disabled={disabled}
				value={options?.[selectedOptionIndex]?.label ?? placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...rest} />

			<span
				// @ts-ignore
				// eslint-disable-next-line react/no-unknown-property
				active={isOpen ? "true" : "false"}
				onClick={event => {
					event.stopPropagation();
					if (isOpen) {
						handleClose();
					} else {
						handleOpen();
					}
				}}
				className={triggerClassName}>
				<ArrowDown />
			</span>

			{isOpen && renderOptions()}
		</div>
	);
});

Dropdown.displayName = "Dropdown";
