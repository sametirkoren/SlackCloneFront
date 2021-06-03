export interface IUser{
    userName : string;
    email :string;
    token : string;
    avatar? : string
}


export interface IUserFormValues{
    userName : string;
    email : string;
    password : string;
    avatar? : string

}