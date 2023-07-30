import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

const LoadingRootId = 'root'

describe("Loading component tests", () => {

    it("should have my-class property value", () => {
        const className = 'my-class';
        render(<Loading className={className} />)
        expect(screen.getByTestId(LoadingRootId).classList.contains(className)).toBe(true)
    });


    it("should have style property", () => {
        const style = { color: 'red' };
        render(<Loading style={style} />)
        expect(screen.getByTestId(LoadingRootId).style.color).toBe(style.color)
    });

});
