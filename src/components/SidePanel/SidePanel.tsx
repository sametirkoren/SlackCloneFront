import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import  Starred  from './Starred';
import UserPanel from './UserPanel';



const SidePanel = () => {
    const rootStore = useContext(RootStoreContext)
  const {isChannelLoaded , storeChannels} = rootStore.channelStore;

    return (
        <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{background:'#4c3c4c' , fontSize:'1.2rem'}}
        >
            <UserPanel/>
            <Starred/>
            <Channels/>
            {isChannelLoaded && storeChannels.length > 0 && <DirectMessages/>}
        </Menu>
    )
}


export default observer(SidePanel);