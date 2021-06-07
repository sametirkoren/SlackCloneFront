import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IMediaFormValues, IMessage, IMessageFormValues } from "../models/messages";
import { RootStore } from "./rootStore";
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr'


export default class MessageStore {
    @observable messages : IMessage[] = []
    @observable isModalVisible: boolean = false
    @observable.ref hubConnection : HubConnection | null = null
    @observable userPosts : { [name:string] : {avatar : string , count : number} } = {}
    rootStore : RootStore

    constructor(rootStore : RootStore){
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5000/chat',{
            accessTokenFactory:() => this.rootStore.commonStore.token!
        })
        .configureLogging(LogLevel.Information)
        .build()

        this.hubConnection.start().catch((error) => console.log("Bağlantı hatası" , error))

        this.hubConnection.on('ReceiveMessage',(message : IMessage) => {
            runInAction(() => {
                this.messages.push(message)
                this.rootStore.channelStore.addNotification(message.channelId , message)
            })
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection?.stop()
    }

    @action sendMessage = async (message: IMessageFormValues) => {
        try{
            await this.hubConnection!.invoke('SendMessage',message)
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    @action loadMessages = async (channelId: string) => {
        try {
            this.messages = []
            if(channelId !== undefined) {
                const result = await this.rootStore.channelStore.detail(channelId);
                runInAction((() => {
                    result?.messages?.forEach((message) => this.messages.push(message))
                    this.countUserPosts(result?.messages)
                }))
            }
          
        } catch (error) {
            throw error;
        }
    }

    @action uploadImage = async(values : IMediaFormValues) => {
        try{
                const result = await agent.Messages.sendMedia(values)
                
        }
        catch(error){
            throw error
        }
    }

    @action showModal = (show: boolean) => {
        this.isModalVisible = show;
    }

    @action countUserPosts = (messages : IMessage[] | undefined) => {
        let userPosts = messages?.reduce((acc:any,message) => {
            if(message.sender.userName in acc){
                acc[message.sender.userName].count +=1
            }else{
                acc[message.sender.userName] = {
                    avatar : message.sender.avatar,
                    count : 1
                }
            }
            return acc
        },{});
        this.userPosts = userPosts;
    }
}