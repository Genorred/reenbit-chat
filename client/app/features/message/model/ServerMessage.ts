import {CHAT_MESSAGE_TYPES} from "~/features/message/consts/ChatMessageTypes";
import type {MessageI} from "~/features/message/model/Message";

export interface ServerMessage {
    type: CHAT_MESSAGE_TYPES;
    payload: MessageI
}