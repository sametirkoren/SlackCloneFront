import { IUser } from "./users";

export interface IMessage{
    content : string,
    createdAt : Date,
    sender : IUser
}

export interface IMessageFormValues{
    content :string,
    channelId  : string
}