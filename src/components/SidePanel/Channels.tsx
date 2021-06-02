import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react';
import {IChannel} from '../../models/channels';
import { ChannelForm } from './ChannelForm';
import { ChannelItem } from './ChannelItem';

import agent from '../../api/agent'


const Channels = () => {
    const [channels , setChannels] = useState<IChannel[]>([]);
    const [selectedModal , setModal] = useState(false);
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    useEffect(() => {
        agent.Channels.list()
        .then((response) => {
            setChannels(response)
        })
    },[])
    
    const displayChannels = (channels : IChannel[]) => {
        return (
            channels.length > 0 &&
            channels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel}/>
            )
        ))
    }

    const handleCreateChannel = (channel : IChannel) => {
        agent.Channels.create(channel).then(() =>  setChannels([...channels,channel]))
       
    }
       
        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom : '2em'}}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/> Kanallar
                        </span> {' '}
                        ({channels.length}) <Icon name="add" onClick={openModal}/>
                    </Menu.Item>

                    {displayChannels(channels)}
                </Menu.Menu>

                <ChannelForm selectedModal={selectedModal} createChannel={handleCreateChannel} closeModal={closeModal}/>
         
         
         
            </React.Fragment>
        )
    }
   

export default Channels;