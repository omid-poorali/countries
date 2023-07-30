import { renderHook } from "@testing-library/react";
import { useQueryParam } from "./useQueryParam";

const replace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return ({
      replace
    });
  },
  useSearchParams() {
    return ({
      get: () => "value",
      toString: () => ""
    });
  },
  usePathname() {
    return "";
  },
}));


test("it should get the value of search param", () => {
  const { result } = renderHook(() => useQueryParam("key"))
  expect(result.current[0]).toEqual('value');
});

test("it should call the replace method after changing value", () => {
  const { result } = renderHook(() => useQueryParam("key"));
  result.current[1]("newValue");
  expect(replace).toHaveBeenCalledTimes(1);
});