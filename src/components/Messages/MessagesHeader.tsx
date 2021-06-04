import { observer } from 'mobx-react-lite'
import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { IChannel } from '../../models/channels'
import { SearchInput } from './SearchInput'

interface IProps{
    currentChannel : IChannel | null
}

const MessagesHeader : React.FC<IProps>= ({currentChannel}) => {
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                <span>
                    {currentChannel?.name}
                <Icon name={'star outline'} color="black"/>
                </span>
                <Header.Subheader>2 Kullanıcı</Header.Subheader>
            </Header>
          <SearchInput/>
        </Segment>
    )
}

export default observer(MessagesHeader)