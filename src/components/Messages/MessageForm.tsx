import React, { useContext } from 'react'
import { Button, Form, Input, Segment } from 'semantic-ui-react'
import {Form as FinalForm , Field} from 'react-final-form'
import { IMessageFormValues } from '../../models/messages'
import TextInput from '../Common/Form/TextInput'
import { RootStoreContext } from '../../stores/rootStore'
import { FORM_ERROR } from 'final-form'
import { observer } from 'mobx-react-lite'
 const MessageForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {sendMessage} = rootStore.messageStore;
    const  {getCurrentChannel} = rootStore.channelStore;
    const handleSubmitForm = async (values : IMessageFormValues) => {
        
        values.channelId = getCurrentChannel()?.id!
        await sendMessage(values).catch((error) => ({[FORM_ERROR] : error}))
    }
    return (
        <FinalForm
            onSubmit={handleSubmitForm}
            render={({handleSubmit, form,invalid, dirtySinceLastSubmit, pristine }) => (
                <Form >
                     <Segment>
                     <Field fluid name="content" style={{marginBottom:'0.7em'}}  IconLabel  labelPosition="left" placeholder="Mesaj Yazınız" component={TextInput} />
             
    
                <Button.Group icon widths="2">
                    <Button
                        color="pink"
                        content="Cevap Ekle"
                        labelPosition="left"
                        icon="edit"
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        onClick={() => handleSubmit()!.then(() => form.reset())}
                    />
    
                    <Button
                        color="grey"
                        content=" Medya Yükle"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>
            </Segment>
                </Form>
               
            )}
        
        >

      
       
        </FinalForm>
    )
}
export default observer(MessageForm)