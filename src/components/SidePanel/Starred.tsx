import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Icon, Menu} from "semantic-ui-react"
import { IChannel } from '../../models/channels'
import { RootStoreContext } from '../../stores/rootStore'
import ChannelItem from './ChannelItem'
const Starred = () => {

    const rootStore = useContext(RootStoreContext)
    const {starredChannels , setActiveChannel , getCurrentChannel} = rootStore.channelStore;
    const {loadMessages} = rootStore.messageStore;

    const displayChannels = (channels: IChannel[]) => {
        channels.length > 0 && channels.map((channel) => (<ChannelItem key={channel.id} channel={channel} changeChannel={changeChannel}))
    }
    return (
        <>
         <Menu.Menu>
                    <Menu.Item style={{paddingBottom : '2em'}}>
                        <span>
                            <Icon name="exchange" /> Favoriler
                        </span>{' '} ({0}) {' '}
                    </Menu.Item>
            </Menu.Menu> 
        </>
    )
}

export default observer(Starred)