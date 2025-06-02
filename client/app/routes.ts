import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    route('sign-in', 'pages/auth/SignIn.tsx'),
    route('sign-up', 'pages/auth/SignUp.tsx'),
    route('verify-email', 'pages/auth/VerifyEmail.tsx'),

    route('chats', 'widgets/sideBar/SideBar.tsx', [
        index("pages/chats/Chats.tsx"),
        route(':chatId', 'widgets/chatSheet/ChatSheet.tsx'),
    ]),
] satisfies RouteConfig;
