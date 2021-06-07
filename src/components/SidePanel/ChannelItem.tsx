import { observer } from 'mobx-react-lite'
import React from 'react'
import { Label, Menu } from 'semantic-ui-react'
import { IChannel } from '../../models/channels'

interface IProps{
    channel : IChannel
    changeChannel : (channel : IChannel) => void
    active : boolean,
    getNotificationCount : (channel:IChannel) => number | undefined
}
 const ChannelItem : React.FC<IProps>= ({channel , changeChannel , active , getNotificationCount }) => {
     
    return (
        <Menu.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            name={channel.name}
            style={{opacity : 0.7}}
            active = {active}
        >
            {getNotificationCount(channel) && (<Label color="red">{getNotificationCount(channel)}</Label>)}
            # {channel.name}
        </Menu.Item>
    )
}
export default observer(ChannelItem)