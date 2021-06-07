import { IMessage } from "./messages";
import { IUser } from "./users";


export enum ChannelType {
    Channel = 1,
    Room = 2,
    Starred = 3
}
export interface IChannel{
    id : string ,
    name : string ,
    description  : string,
    messages? : IMessage[],
    channelType : ChannelType
}

export interface IChannelNotification {
    id : string,
    newMessages : number,
    sender : IUser
}