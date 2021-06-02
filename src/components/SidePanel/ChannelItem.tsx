import React from 'react'
import { Menu } from 'semantic-ui-react'
import { IChannel } from '../../models/channels'

interface IProps{
    channel : IChannel
}
export const ChannelItem : React.FC<IProps>= ({channel}) => {
    return (
        <Menu.Item
            key={channel.id}
            onClick={() => console.log(channel)}
            name={channel.name}
            style={{opacity : 0.7}}
        >
            # {channel.name}
        </Menu.Item>
    )
}
