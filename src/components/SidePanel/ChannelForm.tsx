import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react'
import { IChannel } from '../../models/channels'
import {v4 as uuid} from 'uuid';

interface IProps{
    selectedModal : boolean,
    closeModal : () => void,
    createChannel : (channel : IChannel) => void
}



export const ChannelForm : React.FC<IProps> = ({selectedModal,closeModal,createChannel}) => {

    const initialChannel = {
        id : '',
        name : '',
        description : ''
    }

    const [channel , setChannel] = useState<IChannel>(initialChannel)

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setChannel({...channel, [event.target.name] :  event.target.value})
    }

    const handleSubmit = () => {
        let newChannel = {
            ...channel,
            id : uuid()
        }
        createChannel(newChannel);
        closeModal();
    }

    return (
        <>
                <Modal basic open={selectedModal}>
                <Modal.Header>Kanal Ekle</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input fluid label="Kanal Adı" name="name" onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label="Açıklama" name="description" onChange={handleInputChange}/>
                        </Form.Field>
                    </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button basic color='green' inverted  onClick={() => handleSubmit()} >
                            <Icon name='checkmark'/> Ekle
                        </Button>

                        <Button basic color='red' inverted  onClick={closeModal}>
                            <Icon name='remove'/> İptal
                        </Button>
                    </Modal.Actions>
               
            </Modal>   
        </>
    )
}
