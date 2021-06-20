import React, { useContext, useState, useRef } from 'react'
import { Button, Input, Segment, Form } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { IMediaFormValues, IMessageFormValues } from '../../models/messages'
import TextInput from '../Common/Form/TextInput'
import { RootStoreContext } from '../../stores/rootStore'
import { FORM_ERROR } from 'final-form'
import { observer } from 'mobx-react-lite'
import FileModal from './FileModal'
import { OnChange } from 'react-final-form-listeners'
import { Picker, emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
export const MessageForm = () => {
  const rootStore = useContext(RootStoreContext)
  const {
    sendMessage,
    showModal,
    uploadImage,
    sendTypingNotification,
    deleteTypingNotification,
  } = rootStore.messageStore
  const { getCurrentChannel } = rootStore.channelStore
  let formRef: any
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false)
  const textInputRef = useRef(null)
  const inputElement = textInputRef.current
  const handleSubmitForm = async (values: IMessageFormValues) => {
    values.channelId = getCurrentChannel()?.id!
    await sendMessage(values).catch((error) => ({ [FORM_ERROR]: error }))
  }

  const handleTogglePicker = () => {
    setEmojiPicker(!emojiPicker)
  }
  const setFocus = (el: HTMLElement) => {
    el.focus()
  }
  const handleAddEmoji = (emoji: any) => {
    formRef('content', emoji.colons)
    setEmojiPicker(false)
    if (inputElement !== undefined) setFocus(inputElement!)
  }

  const colonToUnicode = (message: any) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x: any) => {
      x = x.replace(/:/g, '')
      let emoji: any = emojiIndex.emojis[x]
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native
        if (typeof unicode !== 'undefined') {
          return unicode
        }
      }
      x = ':' + x + ':'
      return x
    })
  }

  const uploadFile = async (image: Blob | null) => {
    const media: IMediaFormValues = {
      file: image!,
      channelId: getCurrentChannel()?.id,
    }
    await uploadImage(media).catch((error) => ({ [FORM_ERROR]: error }))
  }
  return (
    <FinalForm
      onSubmit={handleSubmitForm}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          const { formState } = state

          changeValue(state, field, () =>
            colonToUnicode(
              `${
                formState.values['content'] === undefined
                  ? ''
                  : formState.values['content']
              } ${value}`,
            ),
          )
        },
      }}
      render={({
        handleSubmit,
        form,
        invalid,
        dirtySinceLastSubmit,
        pristine,
      }) => {
        if (!formRef) formRef = form.mutators.setValue
        return (
          <Form>
            <Segment>
              {emojiPicker && (
                <Picker
                  set="apple"
                  title="Emoji Seçiniz"
                  emoji="point_up"
                  onSelect={handleAddEmoji}
                />
              )}
              <Field
                fluid
                name="content"
                style={{ marginBottom: '0.7em' }}
                IconLabel
                labelPosition="left"
                placeholder="Mesaj Yazınız"
                component={TextInput}
                handleTogglePicker={handleTogglePicker}
                inputRef={textInputRef}
                emojiPicker={emojiPicker}
              />
              <OnChange name="content">
                {(value: any) => {
                  if (value !== '')
                    sendTypingNotification(getCurrentChannel()?.id)
                  else deleteTypingNotification()
                }}
              </OnChange>
              <Button.Group icon widths="2">
                <Button
                  color="orange"
                  content="Cevap Ekle"
                  labelPosition="left"
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  icon="edit"
                  onClick={() => handleSubmit()!.then(() => form.reset())}
                />
                <Button
                  color="teal"
                  content="Resim Yükle"
                  labelPosition="right"
                  onClick={() => showModal(true)}
                  icon="cloud upload"
                />
              </Button.Group>
              <FileModal uploadFile={uploadFile} />
            </Segment>
          </Form>
        )
      }}
    >
      {' '}
    </FinalForm>
  )
}

export default observer(MessageForm)
