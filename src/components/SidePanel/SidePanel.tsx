import { observer } from 'mobx-react-lite';
import React from 'react'
import { Menu } from 'semantic-ui-react';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import { Starred } from './Starred';
import UserPanel from './UserPanel';


const SidePanel = () => {
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
            <DirectMessages/>
        </Menu>
    )
}


export default observer(SidePanel);