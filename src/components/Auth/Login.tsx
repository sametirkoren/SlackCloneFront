import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

 const Login = () => {
    return (
       <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth:450}}>
                <Header as="h1" icon color="pink" textAlign="center">
                    <Icon name="user" color="pink"/>
                    SlackClone
                </Header>
                <Form size="large">
                    <Segment stacked> 
                        <Form.Input 
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Adresi"
                            type="email"
                        />

                        <Form.Input 
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Şifre"
                            type="password"
                        />
                        <Button color="pink" fluid size="large">Giriş Yap</Button>
                    </Segment>
                </Form>
                <Message>
                    Hesabın yok mu ? <Link to="/register">Kayıt Ol</Link>
                </Message>
            </Grid.Column>
       </Grid>
    )
}

export default Login;