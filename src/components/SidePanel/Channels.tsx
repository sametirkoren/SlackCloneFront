
import React, {  useContext, useEffect, useState } from 'react'
import {  Icon, Menu } from 'semantic-ui-react';
import {ChannelType, IChannel} from '../../models/channels';

import  ChannelItem  from './ChannelItem';
import {observer} from 'mobx-react-lite'

import {RootStoreContext} from '../../stores/rootStore';
import ChannelForm from './ChannelForm';


const Channels = () => {
    const [selectedChannelId,setSelectedChannelId] = useState<string | null> (null)

    const rootStore = useContext(RootStoreContext);
    const {storeChannels ,loadChannels , showModal , setActiveChannel , getCurrentChannel} = rootStore.channelStore;
    const {loadMessages} = rootStore.messageStore;
    useEffect(() => {
       loadChannels(ChannelType.Channel)
    },[loadChannels,setActiveChannel])
    
    const displayChannels = (channels : IChannel[]) => {
        return (
            channels.length > 0 &&
            channels.map((channel) => (
                <ChannelItem changeChannel={changeChannel} key={channel.id} channel={channel} active={selectedChannelId == channel.id}/>
            )
        ))
    }

    const changeChannel = (channel : IChannel) => {
        setActiveChannel(channel)
        let currentChannelId = getCurrentChannel()?.id!

        loadMessages(currentChannelId)
        setSelectedChannelId(currentChannelId)
        
    }

  
       
        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom : '2em'}}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/> Kanallar
                        </span> {' '}
                        ({storeChannels.length}) <Icon name="add" onClick={()=> showModal(true)}/>
                    </Menu.Item>
                   
                    {displayChannels(storeChannels)}
                </Menu.Menu>

                <ChannelForm  />
         
         
         
            </React.Fragment>
        )
    }
   

export default observer(Channels);