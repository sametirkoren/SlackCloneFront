import { action, computed, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/users";
import { RootStore } from "./rootStore";
import {history} from '../index'
import md5 from "md5";
export default class UserStore{
    @observable user : IUser | null = null;
    @observable users : IUser[] = []
    @observable isTyping : boolean = false
    rootStore : RootStore

    constructor(rootStore : RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
        
    }

    @computed get IsLoggedIn(){
        return !!this.user;
    }
    
    @action loadUsers = async () => {
       
        try {
            this.users = [];
            const response = await agent.User.list()
            runInAction(() => {
                response.forEach((user) => this.users.push(user))
            })
        } catch(error){
            throw error;
        }
    }

    @action login = async (values: IUserFormValues ) => {
        try {
            var user = await agent.User.login(values)
            runInAction(() => {
                this.user = user;
                localStorage.setItem("jwt",user.token);
                this.rootStore.commonStore.setToken(user.token);
                history.push("/");
            })
           
        } catch (error) {
            throw error;
            
        }
    }

    @action register = async (values: IUserFormValues ) => {
        try {
            values.avatar =  `http://gravatar.com/avatar/${md5(values.email)}?d=identicon`
            var user = await agent.User.register(values)
            runInAction(() => {
                this.user = user;
          
                this.rootStore.commonStore.setToken(user.token);
                history.push("/");
            })
           
        } catch (error) {
            throw error;
            
        }
    }

    @action getUser = async () => {
        try {
          const user = await agent.User.current()
          runInAction(() => {
            this.user = user
          }
          )
        } catch (error) {
          throw error
        }
      }
    @action logout = async (id:string) => {
        try {
            await agent.User.logout(id)

            runInAction(() => {
                this.rootStore.commonStore.setToken(null)
                this.user = null
                history.push("/login");
            })
          
        } catch (error) {
            throw error;
        }
       

    }
}