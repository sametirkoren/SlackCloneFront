import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react';
import {Form as FinalForm,Field}  from 'react-final-form';
import TextInput from '../Common/Form/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { IUserFormValues } from '../../models/users';
import { FORM_ERROR } from 'final-form';
import {combineValidators, isRequired} from "revalidate";
 const Login = () => {
     const validate = combineValidators({
         email : isRequired('Email'),
         password : isRequired('Password')
     })
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
     const handleSubmitForm = async(values : IUserFormValues) => {
        return login(values).catch((error) => ({[FORM_ERROR]:error}))
         
     }
    return (
       <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth:450}}>
                <Header as="h1" icon color="pink" textAlign="center">
                    <Icon name="user" color="pink"/>
                    SlackClone
                </Header>
                <FinalForm  
                 onSubmit = {handleSubmitForm}
                 validate={validate}
                 render = {({handleSubmit , submitting  , form , submitError}) => (
                    <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked> 
                    <Field name="email" component={TextInput} placeholder="E-posta Adresi" type="text" icon="mail icon"/>
                    <Field name="password" component={TextInput} placeholder="Şifre" type="password" icon="lock icon"/>
                       

                       
                        <Button color="pink" fluid size="large" disabled={submitting}>Giriş Yap</Button>
                        {submitError && (<Label color="red" basic content={submitError.statusText}/>) }
                       
                    </Segment>
                </Form>
                 )}
                >
               
                </FinalForm>
                <Message>
                    Hesabın yok mu ? <Link to="/register">Kayıt Ol</Link>
                </Message>
              
            </Grid.Column>
       </Grid>
    )
}

export default Login;