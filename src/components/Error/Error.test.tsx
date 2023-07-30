import { fireEvent, render, screen } from "@testing-library/react";
import { Error } from "./Error";


describe("Error component tests", () => {

    it("should have h2 tag with special text and a button", () => {

        const handleClick = jest.fn();

        render(<Error title="title" buttonText="button" onClick={handleClick} />);
        expect(screen.getByRole("heading", { level: 2, name: "title" })).toBeInTheDocument();
        expect(screen.getByRole("button").textContent?.includes("button")).toBe(true);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toBeCalled();

    });


});
