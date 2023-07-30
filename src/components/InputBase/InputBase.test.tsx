import { render, screen, act, fireEvent } from "@testing-library/react";
import { InputBase } from "./InputBase";
import { createRef } from "react";

const inputBaseId = 'root'

describe("InputBase component tests", () => {

    it("should not render child elements", () => {
        const testMessage = 'Test Message';
        render(<InputBase>{testMessage}</InputBase>)
        expect(screen.queryByText(testMessage)).toBeNull()
    });

    it("should have my-class property value", () => {
        const className = 'my-class';
        render(<InputBase className={className} />)
        expect(screen.getByTestId(inputBaseId).classList.contains(className)).toBe(true)
    });


    it("should have style property", () => {
        const style = { color: 'red' };
        render(<InputBase style={style} />)
        expect(screen.getByTestId(inputBaseId).style.color).toBe(style.color)
    });


    it("should not respond the focus event when disabled", () => {
        const handleFocus = jest.fn();
        render(<InputBase disabled onFocus={handleFocus} />);

        const input = screen.getByRole("textbox");
        act(() => {
            input.focus();
        });
        expect(handleFocus).not.toBeCalled();
    });

    it("should fire event callbacks", () => {
        const handleChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        const handleKeyUp = jest.fn();
        const handleKeyDown = jest.fn();
        render(
            <InputBase
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            />
        );

        const input = screen.getByRole("textbox");

        act(() => {
            input.focus();
        });
        expect(handleFocus.mock.calls.length).toBe(1);

        fireEvent.keyDown(input, { key: "a" });
        expect(handleKeyDown.mock.calls.length).toBe(1);

        fireEvent.change(input, { target: { value: "a" } });
        expect(handleChange.mock.calls.length).toBe(1);

        fireEvent.keyUp(input, { key: "a" });
        expect(handleKeyUp.mock.calls.length).toBe(1);

        act(() => {
            input.blur();
        });
        expect(handleBlur.mock.calls.length).toBe(1);
    });

    it("should fire the onClick prop", async () => {
        const handleClick = jest.fn();

        render(
            <InputBase
                onClick={handleClick}
            />
        );

        fireEvent.click(screen.getByRole("textbox"));
        expect(handleClick.mock.calls.length).toBe(1);
    });

    it("should be able to access the native input", () => {
        const inputRef: any = createRef();
        render(<InputBase ref={inputRef} />);
        const input = screen.getByRole("textbox");
        expect(inputRef.current).toEqual(input);
    });
});
