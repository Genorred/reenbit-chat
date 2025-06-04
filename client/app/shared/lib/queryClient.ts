import {QueryClient} from "@tanstack/react-query";

// const defaultQueryFn = async (value: any[]) => {
//
// }

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
            // queryFn: defaultQueryFn,
        },
    },
})