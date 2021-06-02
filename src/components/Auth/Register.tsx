import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

 const Register = () => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth : 450}}>
                <Header as="h1" icon color="pink" textAlign="center">
                    <Icon name="user plus" color="pink"/>
                    SlackClone
                </Header>

                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Kullanıcı Adı"
                            type="text"
                        />

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

                        <Form.Input
                            fluid
                            name="passwordConfirm"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="Şifre Tekrarı"
                            type="password"
                        />

                        <Button color="pink" fluid size="large">
                            Kayıt Ol
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Hesabın var mı ? <Link to="/login">Giriş Yap</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register;