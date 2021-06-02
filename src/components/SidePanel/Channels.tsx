
import React, {  useContext, useEffect, useState } from 'react'
import {  Icon, Menu } from 'semantic-ui-react';
import {IChannel} from '../../models/channels';

import { ChannelItem } from './ChannelItem';
import {observer} from 'mobx-react-lite'

import ChannelStore from '../../stores/ChannelStore';
import ChannelForm from './ChannelForm';


const Channels = () => {
    const channelStore = useContext(ChannelStore);
    const {storeChannels} = channelStore;

    useEffect(() => {
       channelStore.loadChannels()
    },[channelStore])
    
    const displayChannels = (channels : IChannel[]) => {
        return (
            channels.length > 0 &&
            channels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel}/>
            )
        ))
    }

  
       
        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom : '2em'}}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/> Kanallar
                        </span> {' '}
                        ({storeChannels.length}) <Icon name="add" onClick={()=> channelStore.showModal(true)}/>
                    </Menu.Item>
                   
                    {displayChannels(storeChannels)}
                </Menu.Menu>

                <ChannelForm  />
         
         
         
            </React.Fragment>
        )
    }
   

export default observer(Channels);