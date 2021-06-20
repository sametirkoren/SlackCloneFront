import React from 'react'
import { Comment, Image } from 'semantic-ui-react'
import { IMessage, MessageType } from '../../models/messages'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import { IUser } from '../../models/users'

interface IProps{
  message: IMessage
  currentUser: IUser | null
}
const isImage = (message: IMessage) => {
  return message.messageType === MessageType.Media
}

const isOwnMessage = (message: IMessage, user: IUser | null) => {
  return message.sender.email === user!.email ? 'message__self' : ''
}

const Message: React.FC<IProps> = ({ message, currentUser }) => {
  return (
    <Comment>
      <Comment.Avatar
        src={message.sender?.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'}
      />
      <Comment.Content className={isOwnMessage(message, currentUser)}>
        <Comment.Author as="a">{ message.sender?.userName}</Comment.Author>
        <Comment.Metadata>{moment(message.createdAt).fromNow()}</Comment.Metadata>
        {isImage(message) ? (
          <Image src={message.content} className="message__image" />
        ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
        </Comment.Content>
    </Comment>
  )
}

export default observer(Message)