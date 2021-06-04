export interface IUser{
    id : string,
    userName : string;
    email :string;
    token : string;
    avatar? : string,
    isOnline? : boolean
}


export interface IUserFormValues{
    userName : string;
    email : string;
    password : string;
    avatar? : string

}