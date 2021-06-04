import { IMessage } from "./messages";


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