import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    index("pages/home/Home.tsx"),

    route('auth', 'pages/auth/Auth.tsx'),

    layout('widgets/sideBar/SideBar.tsx', [
        route('chats', 'pages/chats/Chats.tsx', [
            route(':chatId', 'widgets/chatSheet/ChatSheet.tsx'),
        ]),
    ]),
] satisfies RouteConfig;
