'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './InputBase.module.scss';

type CustomProps = {
	fullWidth?: boolean;
	className?: string;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

export const InputBase = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		fullWidth = false,
		className,
		disabled = false,
		...rest
	} = props;

	const inputClassName = clsx(classes.root, {
		[classes.fullWidth]: fullWidth,
		[classes.disabled]: disabled,
	}, className);

	return (
		<input
			ref={forwardedRef}
			className={inputClassName}
			disabled={disabled}
			{...rest} />
	);
});

InputBase.displayName = "InputBase";

