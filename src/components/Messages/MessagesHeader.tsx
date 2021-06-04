import { observer } from 'mobx-react-lite'
import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { ChannelType, IChannel } from '../../models/channels'
import { IUser } from '../../models/users'
import { SearchInput } from './SearchInput'

interface IProps{
    currentChannel : IChannel | null
    currentUser : IUser | null
    handleStar : () => void
}

const MessagesHeader : React.FC<IProps>= ({currentChannel,currentUser , handleStar}) => {
    const isPrivateChannel = () => currentChannel?.channelType === ChannelType.Room
    const isChannelStarred = currentChannel?.channelType === ChannelType.Starred 
    return (
        <Segment clearing>
            { isPrivateChannel() ?  <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                <span>
                    {'@' + (currentUser?.userName == currentChannel?.name ? currentChannel?.description : currentChannel?.name)}
                
                </span>
                <Header.Subheader>2 Kullanıcı</Header.Subheader>
            </Header> : 
            <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                <span>
                    {currentChannel?.name}
                    <Icon name={isChannelStarred ? 'star' : 'star outline'} color={isChannelStarred ? "yellow" : "black"} onClick={handleStar}/>
                </span>
                <Header.Subheader>2 Kullanıcı</Header.Subheader>
            </Header>}
          <SearchInput/>
        </Segment>
    )
}

export default observer(MessagesHeader)