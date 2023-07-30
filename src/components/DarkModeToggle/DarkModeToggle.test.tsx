import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "./DarkModeToggle";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe("DarkModeToggle component tests", () => {

    it("should render a button", () => {

        render(<DarkModeToggle />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

    });

    it("should change data-theme attribute", () => {
        render(<DarkModeToggle />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

});