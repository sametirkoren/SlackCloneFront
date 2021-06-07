import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import {Icon, Menu} from "semantic-ui-react"
import { ChannelType, IChannel } from '../../models/channels'
import { RootStoreContext } from '../../stores/rootStore'
import ChannelItem from './ChannelItem'
const Starred = () => {

    const rootStore = useContext(RootStoreContext)
    const {starredChannels , setActiveChannel , getCurrentChannel,loadChannels} = rootStore.channelStore;
    const {loadMessages} = rootStore.messageStore;
    const [selectedChannelId,setSelectedChannelId] = useState<string | null> (null)


    useEffect(() => {
        loadChannels(ChannelType.Starred)
    }, [loadChannels])
 
    const changeChannel = (channel : IChannel) => {
        setActiveChannel(channel)
        let currentChannelId = getCurrentChannel()?.id!

        loadMessages(currentChannelId)
        setSelectedChannelId(currentChannelId)
        
    }

    const displayChannels = (channels : IChannel[]) => 
    
        channels.length > 0 && channels.map((channel) => {
            {console.log(channel.name)}
            return(<ChannelItem key={channel.id} channel={channel} changeChannel={changeChannel} active={selectedChannelId == channel.id}/>)
        })
  
    return (
        <>
         <Menu.Menu>
                    <Menu.Item >
                        <span>
                            <Icon name="exchange" /> Favoriler
                        </span>{' '}     ({starredChannels.length}) {' '}
                    { ' '}
                    </Menu.Item>
                    {displayChannels(starredChannels)}
            </Menu.Menu> 
        </>
    )
}

export default observer(Starred)