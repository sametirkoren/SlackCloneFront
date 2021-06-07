import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Grid, Header, Icon, Message , Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

 const UserPanel = () => {
    const rootStore = useContext(RootStoreContext)
    const {user , logout , IsLoggedIn} = rootStore.userStore;
 
    const dropdownOptions = () => [


        {
            key : 'user',
            text : (
                <span>Logged as : <strong>{user?.email}</strong></span>
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


        {
            key : 'signout',
            text : (
               <span onClick={() => logout(user?.id!)}>Çıkış Yap</span>
            )
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
                {IsLoggedIn && user ? 
                (
                      <Dropdown trigger={<span>
                          <Image src={user.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'} spaced="right" avatar />
                          {user?.userName
                          }</span>} options={dropdownOptions()}></Dropdown>
                ) : ( 
                    <Message>
                    Hesabın Yok Mu ?   <Link to="/register">Kayıt Ol</Link>
                    </Message> 
                    )
                }
              
              
            </Header>
        </Grid>
    )
}

export default observer(UserPanel);