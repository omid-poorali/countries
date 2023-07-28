'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

type CustomProps = {
	children?: React.ReactNode;
	className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>;

export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLButtonElement>) => {
	const {
		children,
		className,
		...rest
	} = props;


	return (
		<button
			ref={forwardedRef}
			className={clsx(classes.root, className)}
			{...rest}
		>
			{children}
		</button>
	);
});

Button.displayName = "Button";
