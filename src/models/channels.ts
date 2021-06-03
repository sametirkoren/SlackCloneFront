import { IMessage } from "./messages";

export interface IChannel{
    id : string ,
    name : string ,
    description  : string,
    messages? : IMessage[]
}