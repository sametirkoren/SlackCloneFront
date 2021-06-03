import { action, computed, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/users";
import { RootStore } from "./rootStore";
import {history} from '../index'
export default class UserStore{
    @observable user : IUser | null = null;
    rootStore : RootStore

    constructor(rootStore : RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
        
    }

    @computed get IsLoggedIn(){
        return !!this.user;
    }

    @action login = async (values: IUserFormValues ) => {
        try {
            var user = await agent.User.login(values)
            runInAction(() => {
                this.user = user;
                history.push("/");
                this.rootStore.commonStore.setToken(user.token);
            })
           
        } catch (error) {
            throw error;
            
        }
    }
    @action logout = () => {
        this.rootStore.commonStore.setToken(null)
        this.user = null
        history.push("/login");

    }
}