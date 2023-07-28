'use client'

import React, { KeyboardEvent, useRef, useState, useEffect } from "react";
import { useControlled, useFindOptionIndex, useOutsideRefClick, useCombineRefs } from "../../hooks";
import CloseIcon from 'components/Icons/MoonFilled';
import * as utils from '../../utils';
import clsx from "clsx";
import classes from "./Dropdown.module.scss";
import { InputBase } from "..";

export type Option = {
	label: string;
	value: any;
	extra?: any;
};

type CustomProps = {
	fullWidth?: boolean;
	className?: string;
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
	const activeOptionRef = useRef<HTMLLIElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [activeOption, setActiveOption] = useState<number>(0);

	useEffect(() => {
		if (activeOptionRef.current && rootRef.current) {
			if (!utils.Dom.isElementVisible(activeOptionRef.current, rootRef.current)) {
				activeOptionRef.current.scrollIntoView({ block: "nearest" });
			}
		}
	}, [activeOption, activeOptionRef, rootRef]);

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

	const selectedOptionIndex = useFindOptionIndex([options, value]);

	const handleOpen = () => {
		if (!disabled) {
			setIsOpen(true);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setActiveOption(0);
	};

	const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
		onChange?.({ event, value: null });
		setValue(null);
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

	const handleKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (options.length > 0 && isOpen) {
				event.preventDefault();
				handleOptionClick(event, options[activeOption]);
			} else {
				handleClose();
			}
		} else if (event.key === "ArrowDown") {
			if (activeOption === options.length - 1) {
				return;
			}

			if (isOpen) {
				setActiveOption(activeOption + 1);
			} else {
				handleOpen();
			}
		} else if (event.key === "ArrowUp") {
			if (activeOption === 0) {
				return;
			}

			setActiveOption(activeOption - 1);
		}

		onKeyDown?.(event);
	};


	const handleOptionRef = (option: (HTMLLIElement | null), index: number) => {
		if (activeOption === index) {
			// @ts-ignore
			activeOptionRef.current = option;
		}
	};

	const rootClassName = clsx(classes.root, {
		'fullWidth': fullWidth,
	}, className);



	const triggerClassName = clsx("puiDropdown-trigger", {
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
							// @ts-ignore
							active={index === activeOption ? "true" : "false"}
							ref={optionRef => handleOptionRef(optionRef, index)}
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

			<InputBase
				autoComplete='off'
				fullWidth
				onClick={handleOpen}
				readOnly
				ref={combinedInputRef}
				disabled={disabled}
				value={options[selectedOptionIndex].label}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyboardEvent}
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
				<CloseIcon />
			</span>

			{isOpen && renderOptions()}
		</div>
	);
});

Dropdown.displayName = "Dropdown";
