'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

type CustomProps = {
	className?: string;
	icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'a'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'a'>, keyof CustomProps>;

export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLAnchorElement>) => {
	const {
		className,
		icon,
		children,
		...rest
	} = props;


	return (
		<a
			role='button'
			ref={forwardedRef}
			className={clsx(classes.root, className)}
			{...rest}>
			{icon}{children}
		</a>

	);
});

Button.displayName = "Button";
