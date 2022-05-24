import type { Structs } from "./api_types";

interface Options {
    method?: "get" | "post",
    body?: string,
    headers?: Record<string, string>
}
//@ts-ignore -
export async function do_req<T = keyof Structs>(fetch: any, path: string, options: Options): Promise<Structs[T]> {
    let res = await fetch(`https://ascella.wtf/v2/ascella/${path}`, options) as Response;
    if (res.ok) {
        return await res.json();
    } else {
        throw Error(await res.text())
    }

}