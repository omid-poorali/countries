import { hasAllCharsWithOrder } from './string';

test("it should return true if chars are in the string at order", () => {
    expect(hasAllCharsWithOrder("germany","germany")).toBe(true);
    expect(hasAllCharsWithOrder("germany","ger")).toBe(true);
    expect(hasAllCharsWithOrder("germany","grmany")).toBe(true);
    expect(hasAllCharsWithOrder("germany","gry")).toBe(true);
})