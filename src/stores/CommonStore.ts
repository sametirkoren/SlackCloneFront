import { action, makeObservable, observable ,reaction } from "mobx";
import { RootStore } from "./rootStore";





export default class CommonStore{
    rootStore : RootStore
    @observable token: string | null  = window.localStorage.getItem('jwt')
    @observable loading = false
    constructor(rootStore : RootStore){
        makeObservable(this)
        this.rootStore = rootStore;

        reaction(
            () => this.token, 
            (token) => {
              if (token) {
                window.localStorage.setItem('jwt', token!)
              } else {
                window.localStorage.removeItem('jwt')
              }
            }
          )
    }

    
    @action setLoading = () => {
        this.loading = true
      }
    
      @action setToken = (token: string | null) => {
        this.token = token
      
      }
}