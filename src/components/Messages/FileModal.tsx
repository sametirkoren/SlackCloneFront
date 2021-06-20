import React, { useContext, useState} from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../stores/rootStore'

interface IProps {
  uploadFile: (file: Blob | null) => void
}


export const FileModal: React.FC<IProps> = ({ uploadFile}) => {
  const rootStore = useContext(RootStoreContext)
  const { sendMessage, isModalVisible, showModal } = rootStore.messageStore
  const [image, setImage] = useState<Blob | null>(null)
   const addFile = (event: any) => {
     const file = event.target.files[0]
     setImage(file)
   }
  
  const sendFile = () => {
    uploadFile(image)
    showModal(false)
    clearFile()
  }

  const clearFile = () => setImage(null)
  return (
    <Modal basic open={isModalVisible} onClose={() => showModal(false)}>
      <Modal.Header>Resim Seçiniz :</Modal.Header>
      <Modal.Content>
        <Input fluid label="File types: jpg, png" name="file" type="file"
          onChange={addFile}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile} >
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={() => showModal(false)}>
          <Icon name="remove" /> Cancel
        </Button>

      </Modal.Actions>
    </Modal>
  )
}

export default observer(FileModal)