import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import { IMessage } from '../../models/messages'
import { RootStoreContext } from '../../stores/rootStore'
import Message from './Message'
import  MessageForm  from './MessageForm'
import  MessagesHeader  from './MessagesHeader'
 const Messages = () => {
    const rootStore = useContext(RootStoreContext)
    const {messages , loadMessages} = rootStore.messageStore
    const {getCurrentChannel , isChannelLoaded } = rootStore.channelStore;
    const {user} = rootStore.userStore;

    useEffect(() => {
        if(isChannelLoaded)
            loadMessages(getCurrentChannel()?.id!)
    }, [loadMessages,getCurrentChannel ,isChannelLoaded])
    console.log(user);
    const displayMessages = (message: IMessage[]) => {
        return (messages.length > 0 && 
            
            messages.map((message) => (
             
                <Message currentUser={user} key={message.createdAt.toString()} message={message}></Message>
            )))
    }
    return (
        <React.Fragment>
            <MessagesHeader currentChannel={getCurrentChannel()} currentUser={user}/>
            <Segment>
                <Comment.Group>
                    {displayMessages(messages)}
                </Comment.Group>
            </Segment>
            <MessageForm/>
        </React.Fragment>
    )
}

export default observer(Messages);