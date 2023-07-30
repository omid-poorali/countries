import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component tests", () => {
    it("should have button role with given text", () => {
        render(<Button>Button</Button>);
        const button = screen.getByRole('button', { name:'Button'});
        expect(button).toBeInTheDocument();
    });


    it("should have given className value property", () => {
        const className = 'my-class';
        render(<Button data-testid="button" className={className} />)
        expect(screen.getByTestId("button").classList.contains(className)).toBe(true)
    });


    it("should have given style  property", () => {
        const style = { color: 'red' };
        render(<Button data-testid="button" style={style} />)
        expect(screen.getByTestId("button").style.color).toBe(style.color)
    });

    it("should call onClick after clicking", async () => {
        const onClick = jest.fn();
        render(<Button data-testid="button" onClick={onClick} />)
        fireEvent.click(screen.getByTestId("button"))
        expect(onClick).toHaveBeenCalled();
    });


});