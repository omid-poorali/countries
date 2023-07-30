'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './InputText.module.scss';

type CustomProps = {
	fullWidth?: boolean;
	startAdornment?: React.ReactNode;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

export const InputText = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		children,
		fullWidth = false,
		className,
		style,
		startAdornment,
		...rest
	} = props;

	const rootClassName = clsx(classes.root, {
		[classes.fullWidth]: fullWidth
	}, className);

	const startAdornmentClassName = classes.startAdornment;

	const inputClassName = clsx(classes.input, {
		[classes.inputStyleForStartAdornment]: startAdornment,
	});


	return (
		<div data-testid="root" style={style} className={rootClassName}>
			{startAdornment && (<span className={startAdornmentClassName}>{startAdornment}</span>)}
			<input
				className={inputClassName}
				ref={forwardedRef}
				{...rest}
				type='text' />
		</div>
	);
});

InputText.displayName = "InputText";

