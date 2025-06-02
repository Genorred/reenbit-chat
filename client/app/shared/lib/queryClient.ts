import { QueryClient } from "@tanstack/react-query";
import {$authHost} from "~/shared/lib/http";

const defaultQueryFn = async ({ queryKey }) => {
    const { data } = await $authHost.get(
        `https://jsonplaceholder.typicode.com${queryKey[0]}`,
    )
    return data
}

// provide the default query function to your app with defaultOptions
// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             queryFn: defaultQueryFn,
//         },
//     },
// })
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            queryFn: defaultQueryFn,
        },
    },
})