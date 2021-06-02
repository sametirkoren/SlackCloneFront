import React, { Component } from 'react'
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react';

class Channels extends Component  {
    state = {
        channels : [],
        modal:false,
    }
    openModal = () => this.setState({modal:true})
    closeModal = () => this.setState({modal:false})

    render(){
        const {channels , modal} = this.state;
        console.log(modal);
        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom : '2em'}}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/> Kanallar
                        </span> {' '}
                        ({channels.length}) <Icon name="add" onClick={this.openModal}/>
                    </Menu.Item>
                </Menu.Menu>
            <Modal basic open={modal}>
                <Modal.Header>Kanal Ekle</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input fluid label="Kanal Adı" name="channelName"/>
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label="Açıklama" name="channelDescription"/>
                        </Form.Field>
                    </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button basic color='green' inverted onClick={this.openModal} >
                            <Icon name='checkmark'/> Ekle
                        </Button>

                        <Button basic color='red' inverted  onClick={this.closeModal}>
                            <Icon name='remove'/> İptal
                        </Button>
                    </Modal.Actions>
               
            </Modal>
            </React.Fragment>
        )
    }
   
}
export default Channels;