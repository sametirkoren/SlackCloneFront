import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { SearchInput } from './SearchInput'

export const MessagesHeader = () => {
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                <span>Kanal
                <Icon name={'star outline'} color="black"/>
                </span>
                <Header.Subheader>2 Kullanıcı</Header.Subheader>
            </Header>
          <SearchInput/>
        </Segment>
    )
}
