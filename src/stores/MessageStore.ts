import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IMessage, IMessageFormValues } from "../models/messages";
import { RootStore } from "./rootStore";


export default class MessageStore {
    @observable messages : IMessage[] = []

    rootStore : RootStore

    constructor(rootStore : RootStore){
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action sendMessage = async (message: IMessageFormValues) => {
        try{
            const result = await agent.Messages.send(message)
            console.log(result);
            runInAction(() => {
                this.messages.push(result)
            })
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    @action loadMessages = async (channelId: string) => {
        try {
            this.messages = []
            const result = await this.rootStore.channelStore.detail(channelId);
            runInAction((() => {
                result?.messages?.forEach((message) => this.messages.push(message))
            }))
        } catch (error) {
            throw error;
        }
    }
}