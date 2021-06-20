import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { combineValidators, isRequired, matchesField } from 'revalidate';
import { Button, Form, Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react';
import { IUserFormValues } from '../../models/users';
import { RootStoreContext } from '../../stores/rootStore';
import {Form as FinalForm,Field}  from 'react-final-form';
import TextInput from '../Common/Form/TextInput';

 const Register = () => {
     const rootStore = useContext(RootStoreContext)
     const {register} = rootStore.userStore;

     const handleSubmitForm = async(values: IUserFormValues) => {
         return register(values).catch((error) => ({[FORM_ERROR]:error}))
     }

     const validate = combineValidators({
         username:isRequired('UserName'),
         email : isRequired('Email'),
         password : isRequired('Password'),
         passwordConfirmation : matchesField(
             'password',
             'password Confirmation'
         )({
             message : 'Şifreler Uyuşmuyor'
         })
     })
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth : 450}}>
                <Header as="h1" icon color="pink" textAlign="center">
                    <Icon name="user plus" color="pink"/>
                    SlackClone
                </Header>
                <FinalForm
                    onSubmit={handleSubmitForm}
                    validate={validate}
                    render={({handleSubmit , submitting , submitError,invalid , dirtyFieldsSinceLastSubmit,pristine}) => (
                        <Form size="large" onSubmit={handleSubmit} error>
                        <Segment stacked>
                            <Field
                                fluid
                                name="username"
                                placeholder="Kullanıcı Adı"
                                type="text"
                                icon="user icon"
                                component= {TextInput}
                               
                            />

                            <Field
                                fluid
                                name="email"
                                placeholder="Email Adresi"
                                type="text"
                                icon="mail icon"
                                component= {TextInput}
                               
                            />
    
                        <Field
                                name="password"
                                placeholder="Şifre"
                                type="password"
                                icon="lock icon"
                                component={TextInput}
                            />
                              <Field
                                name="passwordConfirmation"
                                placeholder="Şifre Tekrarı"
                                type="password"
                                icon="lock icon"
                                component={TextInput}
                                />
                           {submitError && (<Label color="red" basic content={submitError.statusText}/>) }
                       
    
                            <Button color="pink" fluid size="large" disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}>
                                Kayıt Ol
                            </Button>
                        </Segment>
                    </Form>

                    )}
                >


                </FinalForm>
                <Message
                    info
                    header='Hatırlatma !'
                    
                    list = {['Şifre minimum 6 karakter olmalıdır.','Şifrenizde en az 1 tane büyük harf olmalıdır.','Şifrenizde en az 1 tane küçük harf olmalıdır.']}
                />
                <Message>
                    Hesabın var mı ? <Link to="/login">Giriş Yap</Link>
                </Message>
              
            </Grid.Column>
        </Grid>
    )
}
export default Register;