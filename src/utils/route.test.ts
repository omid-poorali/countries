import { generatePath } from './route';

test("generate route with one param", () => {
    const path = "/country/:alpha"

    expect(generatePath(path, { alpha: "a1" })).toBe("/country/a1")
});