import axios, { AxiosResponse } from 'axios'
import { IChannel } from '../models/channels';
import {history} from '../index'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(undefined,(error) => {
    if(error.message == 'Network Error' && !error.response){
        toast.error('Ağ Hatası - API\'nin çalıştığından emin olun.')
        return;
    }
    const {status} = error.response;
    if(status === 404) history.push('/notfound')

    if(status === 500) toast.error("Sunucu Hatası - Terminali Kontrol Et");
})

const responseBody = (response : AxiosResponse) => response.data;


const request = {
    get : (url : string) => axios.get(url).then(responseBody),
    post : (url : string , body : {}) => axios.post(url,body).then(responseBody),
    put : (url : string , body : {}) => axios.put(url,body).then(responseBody),
    delete : (url:string) => axios.delete(url).then(responseBody)
}


const Channels = {
    list : ()  : Promise<IChannel[]> => request.get('/channels'),
    create : (channel : IChannel) => request.post('/channels',channel),
}

export default {
    Channels
}