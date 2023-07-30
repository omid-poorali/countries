import { render, screen } from "@testing-library/react";
import { CountryCard } from "./CountryCard";


describe("CountryCard component tests", () => {

    it("should have its property values", () => {

        render(<CountryCard name="name" capital="capital" flag="/" population={5} region="region" />);
        expect(screen.getByRole("heading", { level: 2, name: "name" })).toBeInTheDocument();
        expect(screen.getByText("capital")).toBeInTheDocument();
        expect(screen.getByText("region")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});
