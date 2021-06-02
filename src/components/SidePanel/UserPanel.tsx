import React from 'react'
import { Dropdown, Grid, Header, Icon } from 'semantic-ui-react';

export const UserPanel = () => {
    const dropdownOptions = () => [
        {
            key : 'user',
            text : (
                <span>Logged as : <strong>User</strong></span>
            ),
            disabled : true
        },

        {
            key : 'avatar',
            text : (
                <span>Change avatar</span>
            ),
            disabled : true
        },
    ]
    return (
        <Grid style={{background : '#4c3c4c' , margin:0}}>
            <Grid.Row style={{padding : '1.2rem' , margin : 0}}>
                <Header inverted floated="left" as="h2">
                    <Icon name="code"/>
                    <Header.Content>Slack Clone</Header.Content>
                </Header>
            </Grid.Row>
            <Header style={{padding : '0.25em'}} as="h4" inverted>
                <Dropdown trigger={<span>User</span>} options={dropdownOptions()}></Dropdown>
            </Header>
        </Grid>
    )
}

export default UserPanel;