import React from 'react';
import classes from './CountryCard.module.scss';
import clsx from 'clsx';
import Image from 'next/image'

type CustomProps = {
	className?: string | undefined;
	name: string;
	capital: string;
	population: number;
	region: string;
	flag: string;
}

type CountryCardProps = CustomProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof CustomProps>;


export const CountryCard = React.forwardRef<HTMLDivElement, CountryCardProps>((props, ref) => {
	const {
		className,
		children,
		name,
		capital,
		population,
		region,
		flag,
		...rest
	} = props;


	return (
		<div
			ref={ref}
			className={clsx(classes.root, className)}
			{...rest}>
			<div className={classes.flag}>
				<Image
					src={flag}
					quality={100}
					fill
					sizes="100vw"
					style={{
						objectFit: 'fill'
					}}
					alt={name}
				/>

			</div>
			<div className={classes.wrapper}>
				<h2>{name}</h2>

				<div className={classes.property}>
					<h3>Population:</h3>
					<span>{population}</span>
				</div>
				<div className={classes.property}>
					<h3>Region:</h3>
					<span>{region}</span>
				</div>
				<div className={classes.property}>
					<h3>Capital:</h3>
					<span>{capital}</span>
				</div>
			</div>

		</div>
	)
})

CountryCard.displayName = 'CountryCard';