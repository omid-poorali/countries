import { Button } from '@/components';
import classes from './Error.module.scss';

type PropsType = {
    title?: string;
    buttonText?: string;
    onClick?: () => void;
}

export const Error = (props: PropsType) => {
    const {
        onClick,
        buttonText = "Try again",
        title = "Something went wrong!"
    } = props;

    return (
        <div className={classes.root}>
            <h2>{title}</h2>
            <Button className={classes.button} onClick={onClick}>{buttonText}</Button>
        </div>
    )
}