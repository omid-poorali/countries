'use client'

import React, { KeyboardEvent, useRef, useState, useMemo } from "react";
import { useControlled, useOutsideRefClick, mergeRefs } from "@/hooks";
import ArrowDown from '@/components/Icons/ArrowDown';
import clsx from "clsx";
import classes from "./Dropdown.module.scss";

export type Option = {
	label: string;
	value: string;
};

type CustomProps = {
	fullWidth?: boolean;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	options?: Array<Option>;
	value?: string;
	defaultValue?: string;
	onChange?: (_event: { event: React.MouseEvent<HTMLElement>, option?: Option, value: string }) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<"input">, keyof CustomProps>

export const Dropdown = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		children,
		fullWidth = false,
		style,
		className,
		disabled = false,
		placeholder = "",
		options = [],
		value: propValue,
		defaultValue,
		onChange,
		onBlur,
		...rest
	} = props;


	const rootRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const combinedInputRef = mergeRefs([inputRef, forwardedRef]);

	const [isOpen, setIsOpen] = useState<boolean>(false);


	useOutsideRefClick(() => {
		handleClose();
	}, rootRef);


	const [value, setValue] = useControlled<string>({
		controlled: propValue,
		default: defaultValue
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


	const handleOptionClick = (event: React.MouseEvent<HTMLElement>, option: Option) => {
		onChange?.({ event, option, value: option.value });
		setValue(option.value);
	};


	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur?.(event);
		handleClose();
	};

	const rootClassName = clsx(classes.root, {
		[classes.fullWidth]: fullWidth,
	}, className);

	const triggerClassName = classes.trigger;
	const optionsClassName = classes.options;
	const optionClassName = classes.option;

	const renderOptions = () => {
		if (options.length > 0) {
			return (
				<ul
					className={optionsClassName}>
					{React.Children.toArray(options.map((option: Option) => (
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
			data-testid="root"
			ref={rootRef}
			style={style}
			className={rootClassName}>

			<input
				autoComplete='off'
				onClick={handleOpen}
				readOnly
				ref={combinedInputRef}
				disabled={disabled}
				value={options?.[selectedOptionIndex]?.label ?? placeholder}
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
