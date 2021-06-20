import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IMediaFormValues, IMessage, IMessageFormValues, ITypingNotification, ITypingNotificationFormValues } from "../models/messages";
import { RootStore } from "./rootStore";
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr'


export default class MessageStore {
    @observable messages : IMessage[] = []
    @observable isModalVisible: boolean = false
    @observable.ref hubConnection : HubConnection | null = null
    @observable userPosts : { [name:string] : {avatar : string , count : number} } = {}
    @observable typingNotifications : ITypingNotification[] = []
    rootStore : RootStore

    constructor(rootStore : RootStore){
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder().withUrl('https://slackclone.sametirkoren.com.tr/chat',{
            accessTokenFactory:() => this.rootStore.commonStore.token!
        })
        .configureLogging(LogLevel.Information)
        .build()

        this.hubConnection.start().catch((error) => console.log("Bağlantı hatası" , error))
        
        this.hubConnection.on('ReceiveMessage', (message: IMessage) => {
            runInAction(() => {
              this.messages.push(message)
              this.rootStore.channelStore.addNotification(message.channelId, message)
            })
          })
          this.hubConnection.on(
            'ReceiveTypingNotification',
            (typingNotification: ITypingNotification) => {
              runInAction(() => {
                
                this.typingNotifications.push(typingNotification)
              })
            },
          )

          this.hubConnection.on(
            'ReceiveDeleteTypingNotification',
            (typingNotification: ITypingNotification) => {
              runInAction(() => {
                this.typingNotifications = this.typingNotifications.filter(
                  (x) => x.sender.id !== typingNotification.sender.id,
                )
              })
            },
          )
    }

    @action stopHubConnection = () => {
      this.hubConnection?.stop()
    }
  
    @action sendMessage = async (message: IMessageFormValues) => {
      try {
        await this.hubConnection?.invoke('SendMessage', message)
  
        await this.deleteTypingNotification()
      } catch (error) {
        throw error
      }
    }
  
    @action loadMessages = async (channelId: string) => {
      try {
        this.messages = []
        if (channelId !== undefined) {
          const result = await this.rootStore.channelStore.detail(channelId)
         
          runInAction(() => {
            result?.messages?.forEach((message) => this.messages.push(message))
            this.countUserPosts(result?.messages)
          })
        }
      } catch (err) {
        throw err
      }
    }
  
    @action uploadImage = async (values: IMediaFormValues) => {
      try {
        await agent.Messages.sendMedia(values)
      } catch (error) {
        throw error
      }
    }
  
    @action showModal = (show: boolean) => {
      this.isModalVisible = show
    }
  
    @action countUserPosts = (messages: IMessage[] | undefined) => {
      let userPosts = messages?.reduce((acc: any, message) => {
        if (message.sender.userName in acc) {
          acc[message.sender.userName].count += 1
        } else {
          acc[message.sender.userName] = {
            avatar: message.sender.avatar,
            count: 1,
          }
        }
  
        return acc
      }, {})
  
      this.userPosts = userPosts
    }
  
    @action sendTypingNotification = async (channelId: string) => {
      try {
        if (this.rootStore.userStore.isTyping) return
  
        let typingNotification: ITypingNotificationFormValues = {
          channelId: channelId,
        }
  
        this.rootStore.userStore.isTyping = true
        await this.hubConnection?.invoke(
          'SendTypingNotification',
          typingNotification,
        )
      } catch (err) {
        throw err
      }
    }
  
    @action deleteTypingNotification = async () => {
      try {
        this.rootStore.userStore.isTyping = false
  
        await this.hubConnection?.invoke('DeleteTypingNotification')
      } catch (err) {
        throw err
      }
    }
}