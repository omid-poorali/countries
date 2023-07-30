'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './InputBase.module.scss';

type CustomProps = {
	fullWidth?: boolean;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

export const InputBase = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		children,
		fullWidth = false,
		className,
		style,
		...rest
	} = props;

	const rootClassName = clsx(classes.root, {
		[classes.fullWidth]: fullWidth
	}, className);

	return (
		<div data-testid="root" style={style} className={rootClassName}>
			<input
				ref={forwardedRef}
				{...rest} />
		</div>
	);
});

InputBase.displayName = "InputBase";

