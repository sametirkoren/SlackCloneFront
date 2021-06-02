import React from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import { MessageForm } from './MessageForm'
import { MessagesHeader } from './MessagesHeader'

export const Messages = () => {
    return (
        <React.Fragment>
            <MessagesHeader/>
            <Segment>
                <Comment.Group>

                </Comment.Group>
            </Segment>
            <MessageForm/>
        </React.Fragment>
    )
}

export default Messages;