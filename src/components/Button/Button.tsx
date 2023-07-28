'use client'

import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

type CustomProps = {
	className?: string;
} & React.ComponentPropsWithoutRef<'a'>;

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'a'>, keyof CustomProps>;

export const Button = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLAnchorElement>) => {
	const {
		className,
		...rest
	} = props;


	return (
		<a
			ref={forwardedRef}
			className={clsx(classes.root, className)}
			{...rest}
		/>

	);
});

Button.displayName = "Button";
