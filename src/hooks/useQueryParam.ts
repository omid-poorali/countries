import { useRouter, useSearchParams, usePathname } from "next/navigation";

type UseQueryParam = [string, (value: string) => void];

export function useQueryParam(key: string): UseQueryParam {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const value = searchParams.get(key) ?? "";


    const setValue = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`);
    }

    return [value, setValue];
}