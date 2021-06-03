import React, { useContext, useState } from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'


export const FileModal : React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const {sendMessage , isModalVisible , showModal} = rootStore.messageStore
    const [image,setImage] = useState<Blob | null>(null)
    const addFile = (event : any) => {
        const file = event.target.files[0]
        setImage(file)
    }
    const sendFile = () => {
        console.log(image)
    }
    return (
        <Modal basic open={isModalVisible} onClose={() => showModal(false)}>
            <Modal.Header>Bir Resim Seçiniz</Modal.Header>
            <Modal.Content>
                <Input fluid label="Resim Türü : jpg, png" name="file" type="file" onChange={addFile}/>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={sendFile}>
                    <Icon name="checkmark"/> Gönder
                </Button>
                <Button color="red" inverted onClick={() => showModal(false)}>
                    <Icon name="remove"/> İptal
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default FileModal