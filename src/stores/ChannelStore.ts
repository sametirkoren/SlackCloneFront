import {action,  makeObservable, observable, runInAction} from 'mobx'

import agent from '../api/agent'
import { IChannel } from '../models/channels'
import { RootStore } from './rootStore'





export default class ChannelStore{
    @observable storeChannels : IChannel[] = []
    @observable isModalVisible : boolean = false
    rootStore : RootStore
    constructor(rootStore : RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
        
    }


    @action loadChannels = async () => {
       try{
            var response = await agent.Channels.list()
            runInAction(() => response.forEach((channel) => this.storeChannels.push(channel)) )
           
       }
       catch(err){
            console.log(err);
       }
    }

    @action showModal = (show:boolean) => {
        this.isModalVisible = show
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
