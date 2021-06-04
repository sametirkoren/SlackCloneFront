import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { IUser } from '../../models/users';
import {RootStoreContext} from '../../stores/rootStore';
const DirectMessages = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadUsers , users,user} = rootStore.userStore
    const {changePrivateChannel , getCurrentChannel} = rootStore.channelStore;
    const {loadMessages} = rootStore.messageStore

    const getNumberOfUsers = (users:IUser[]) => 
        users.filter((x) => x.id !== user!.id).length

    const changeChannel = async (user : IUser) => {
        await changePrivateChannel(toJS(user).id)
        loadMessages(getCurrentChannel()?.id!)
    }
    useEffect(() => {
        loadUsers()
    }, [loadUsers,changePrivateChannel])

    const isUserOnline = (user : IUser) => user.isOnline
    return (
        <Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="mail" /> Özel Mesajlar
                </span> {" "} ({getNumberOfUsers(users)})
            </Menu.Item>
            {users.filter((x) => x.id !== user!.id).map((user) => (
                <Menu.Item key={user.userName} style={{opacity : 0.7, fontStyle : 'italic'}} onClick={() => changeChannel(user)}>
                    <Icon name="circle" color={isUserOnline(user) ? 'green' : 'red'} />@{''}
                    {user.userName}
                </Menu.Item>
            ))}
        </Menu.Menu>
    )
}

export default observer(DirectMessages)