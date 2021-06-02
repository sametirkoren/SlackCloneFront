import React from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

export const MessageForm = () => {
    return (
        <Segment>
            <Input fluid name="message" style={{marginBottom:'0.7em'}} label={<Button icon={'add'}/>} labelPosition="left" placeholder="Mesajınızı Yazınız">
            </Input>

            <Button.Group icon widths="2">
                <Button
                    color="pink"
                    content="Cevap Ekle"
                    labelPosition="left"
                    icon="edit"
                />

                <Button
                    color="grey"
                    content=" Medya Yükle"
                    labelPosition="right"
                    icon="cloud upload"
                />
            </Button.Group>
        </Segment>
    )
}
