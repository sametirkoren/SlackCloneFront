
import React, {  useContext, useEffect, useState } from 'react'
import {  Icon, Menu } from 'semantic-ui-react';
import {IChannel} from '../../models/channels';

import  ChannelItem  from './ChannelItem';
import {observer} from 'mobx-react-lite'

import {RootStoreContext} from '../../stores/rootStore';
import ChannelForm from './ChannelForm';


const Channels = () => {
    const rootStore = useContext(RootStoreContext);
    const {storeChannels ,loadChannels , showModal , setActiveChannel , getCurrentChannel} = rootStore.channelStore;
    const {loadMessages} = rootStore.messageStore;
    useEffect(() => {
       loadChannels()
    },[loadChannels])
    
    const displayChannels = (channels : IChannel[]) => {
        return (
            channels.length > 0 &&
            channels.map((channel) => (
                <ChannelItem changeChannel={changeChannel} key={channel.id} channel={channel}/>
            )
        ))
    }

    const changeChannel = (channel : IChannel) => {
        setActiveChannel(channel)
        loadMessages(getCurrentChannel()?.id!)
        
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