import { configure } from "mobx";
import { createContext } from "react";
import ChannelStore from "./ChannelStore";
import CommonStore from "./CommonStore";

import UserStore from './UserStore';
configure({enforceActions: 'always'})
export class RootStore{
    channelStore : ChannelStore
    userStore : UserStore
    commonStore : CommonStore


    constructor(){
        this.channelStore = new ChannelStore(this)
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())