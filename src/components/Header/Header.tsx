import { DarkModeToggle } from "@/components"
import classes from './Header.module.scss';

export const Header = () => {
    return (
        <header className={classes.root}>
            <h1 className={classes.title}>Where in the world?</h1>
            <DarkModeToggle />
        </header>
    )
}