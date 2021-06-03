import React from 'react'
import { IMessage } from '../../models/messages'
import {Comment} from 'semantic-ui-react'
import moment from 'moment'
import { observer } from 'mobx-react-lite'

interface IProps{
    message : IMessage
}
const Message  : React.FC<IProps>= ({message}) => {
   
    return (
      <Comment>
           <Comment.Avatar src={message.sender?.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'} />
            <Comment.Content className="message__self">
                <Comment.Author as="a">{message.sender?.userName}</Comment.Author>
                <Comment.Metadata>{moment(message.createdAt).fromNow()}</Comment.Metadata>
                <Comment.Text>{message.content}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
}

export default observer(Message)
