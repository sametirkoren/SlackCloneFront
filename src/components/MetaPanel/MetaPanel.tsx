import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import {Accordion, Header, Icon, List, Segment , Image} from 'semantic-ui-react'
import { ChannelType } from '../../models/channels'
import { RootStoreContext } from '../../stores/rootStore'
export const MetaPanel = () => {
    const [activeIndex,setActiveIndex] = useState(0)
    const rootStore = useContext(RootStoreContext)
    const {activeChannel , isChannelLoaded} = rootStore.channelStore
    const {userPosts} = rootStore.messageStore
    const setCurrentIndex = (event:any,props:any)=>{
        const {index }=props;
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }


    const displayTopPosters = (posts:{[name : string] : {avatar:string;count:number}}) => {
        return Object.entries(posts).sort((a,b) => b[1].count - a[1].count).map(([key,val],i) => (
            <List.Item key={i}>
                <Image avatar src={val.avatar}/>
                <List.Content>
                    <List.Header as="a">{key}</List.Header>
                    <List.Description>{formatCount(val.count)}</List.Description>
                </List.Content>
            </List.Item>
        ))
        .slice(0,2)
    }

    const formatCount = (num : number) => 
        num > 1 || num === 0 ? `${num} posts` : `${num} post` 
    
    if(activeChannel?.channelType !== ChannelType.Channel) return null
    return (
        <Segment loading={!isChannelLoaded}>
            <Header as="h3" attached="top">
                Hakkında # {activeChannel && activeChannel.name}
            </Header>
            <Accordion styled attached="true">
                <Accordion.Title index={0} onClick={setCurrentIndex} active={activeIndex==0}>
                    <Icon name="dropdown" />
                    <Icon name="info" />
                    Kanal Detayları
                </Accordion.Title>
                <Accordion.Content active={activeIndex ==0}>
                {activeChannel && activeChannel.description}
                </Accordion.Content>


                <Accordion.Title index={1} onClick={setCurrentIndex} active={activeIndex==1}>
                    <Icon name="dropdown" />
                    <Icon name="user circle" />
                    En Çok Yazanlar
                </Accordion.Title>
                <Accordion.Content  style={{textAlign:"center"}} active={activeIndex ==1}>
                    {userPosts && displayTopPosters(userPosts)}
                </Accordion.Content>

            </Accordion>
        </Segment>
    )
}

export default observer(MetaPanel);
