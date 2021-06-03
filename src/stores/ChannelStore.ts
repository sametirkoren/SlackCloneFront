import {action,  computed,  makeObservable, observable, runInAction, toJS} from 'mobx'

import agent from '../api/agent'
import { IChannel } from '../models/channels'
import { RootStore } from './rootStore'





export default class ChannelStore{
    @observable storeChannels : IChannel[] = []
    @observable isModalVisible : boolean = false
    @observable activeChannel : IChannel | null = null
    @observable isChannelLoaded : boolean = false
    rootStore : RootStore
    constructor(rootStore : RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
        
    }


    @action loadChannels = async () => {
       try{
           this.storeChannels = [];
            var response = await agent.Channels.list()
            runInAction(() => {
                response.forEach((channel) => this.storeChannels.push(channel))
                this.isChannelLoaded = true
                }
            
            )
      
           
       }
       catch(err){
            console.log(err);
       }
    }

    @action showModal = (show:boolean) => {
        this.isModalVisible = show
    }

    @action setActiveChannel = (channel : IChannel) => {
        this.activeChannel = channel;
    }

    @action  getCurrentChannel = () =>  {
        return toJS(this.activeChannel ?? this.storeChannels[0])
    }

    @action detail = async(channelId:string): Promise<IChannel | undefined> => {
        try {
            return await agent.Channels.detail(channelId)
        } catch (error) {
            throw error;
        }
    }

    @action createChannel = async (channel : IChannel) => {
       try{
        await agent.Channels.create(channel)
        runInAction(() =>  this.storeChannels.push(channel) )
   
       }
       catch(err){
         console.log(err);

       }
    }
}
