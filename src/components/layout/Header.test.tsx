import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

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

describe("Header component tests", () => {

    it("should have h1 tag with special text and darkMode button", () => {

        render(<Header />);
        expect(screen.getByRole("heading", { level: 1, name: "Where in the world?" })).toBeInTheDocument();
        expect(screen.getByRole("button").textContent?.includes("Dark Mode")).toBe(true);

    });


});
