'use client'

import React, { useEffect, useState } from 'react';
import { Enums } from '@/constants';
import MoonFilled from '@/components/Icons/MoonFilled';
import MoonOutline from '@/components/Icons/MoonOutline';
import classes from './DarkModeToggle.module.scss';
import clsx from 'clsx';

type CustomProps = {
	className?: string | undefined;
}

type ButtonProps = CustomProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CustomProps>;


export const DarkModeToggle = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		className,
		children,
		...rest
	} = props;


	const [theme, setTheme] = useState<Enums.Theme>()

	const toggleTheme = () => {
		if (theme == Enums.Theme.LIGHT) {
			setTheme(Enums.Theme.DARK)
		}
		else setTheme(Enums.Theme.LIGHT)
	}


	const maybeTheme = () => {
		const themeLocalStorage = localStorage.getItem('theme')
		const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? Enums.Theme.DARK : Enums.Theme.LIGHT

		return (themeLocalStorage ?? themeSystem) as Enums.Theme
	}

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme ?? maybeTheme());
		localStorage.setItem('theme', (theme ?? maybeTheme()))
		setTheme(theme ?? maybeTheme())

		const useSetTheme = (e: MediaQueryListEvent) => { setTheme(e.matches ? Enums.Theme.DARK : Enums.Theme.LIGHT) }

		const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)')

		watchSysTheme.addEventListener('change', useSetTheme)

		return () => watchSysTheme.removeEventListener('change', useSetTheme);
	}, [theme])


	return (
		<button
			ref={ref}
			className={clsx(classes.root, className)}
			aria-label="Dark mode toggle"
			onClick={toggleTheme}
			{...rest}>
			{theme === Enums.Theme.DARK ? <MoonFilled /> : <MoonOutline />} Dark Mode
		</button>
	)
})

DarkModeToggle.displayName = 'DarkModeToggle';