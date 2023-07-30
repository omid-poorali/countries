import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";
import { createRef } from "react";

const DropdownId = 'root'

describe("Dropdown component tests", () => {

    it("should not render options before clicking", () => {
        render(<Dropdown options={[{ label: "label", value: "value" }]} />);
        expect(screen.queryByText("label")).toBeNull();
    });


    it("should render options after clicking", () => {
        render(<Dropdown options={[{ label: "label", value: "value" }]} />);
        fireEvent.click(screen.getByRole("textbox"));
        expect(screen.queryByText("label")).toBeInTheDocument();
    });

    it("should not render options after blur", () => {
        render(<Dropdown options={[{ label: "label", value: "value" }]} />);
        fireEvent.blur(screen.getByRole("textbox"));
        expect(screen.queryByText("label")).toBeNull();
    });

    it("should call onChange after clicking option",()=>{
        const handleChange = jest.fn();
        render(<Dropdown onChange={handleChange} options={[{ label: "label", value: "value" }]} />);
        fireEvent.click(screen.getByRole("textbox"));
        expect(screen.queryByText("label")).toBeInTheDocument();
        fireEvent.mouseDown(screen.getByText("label"));
        expect(handleChange).toBeCalled()
    });


    it("should not render child elements", () => {
        const testMessage = 'Test Message';
        render(<Dropdown>{testMessage}</Dropdown>)
        expect(screen.queryByText(testMessage)).toBeNull()
    });

    it("should have my-class property value", () => {
        const className = 'my-class';
        render(<Dropdown className={className} />)
        expect(screen.getByTestId(DropdownId).classList.contains(className)).toBe(true)
    });


    it("should have style property", () => {
        const style = { color: 'red' };
        render(<Dropdown style={style} />)
        expect(screen.getByTestId(DropdownId).style.color).toBe(style.color)
    });


    it("should fire the onClick prop", async () => {
        const handleClick = jest.fn();

        render(
            <Dropdown
                onClick={handleClick}
            />
        );

        fireEvent.click(screen.getByRole("textbox"));
        expect(handleClick.mock.calls.length).toBe(1);
    });

    it("should be able to access the native input", () => {
        const inputRef: any = createRef();
        render(<Dropdown ref={inputRef} />);
        const input = screen.getByRole("textbox");
        expect(inputRef.current).toEqual(input);
    });
});
