import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Segment,Comment } from 'semantic-ui-react'
import { IMessage } from '../../models/messages'
import { RootStoreContext } from '../../stores/rootStore'
import Message from './Message'
import  MessageForm  from './MessageForm'
import  MessagesHeader  from './MessagesHeader'


interface ISearchFormState{
    searchTerm?:string
    searchLoading:boolean
}

 const Messages = () => {
     const searchFormInitialState : ISearchFormState = {
         searchTerm : '',
         searchLoading : false
     }

     const [searchState,setSearchState] = useState<ISearchFormState>(searchFormInitialState);


     const [messageState , setMessageState] = useState<IMessage[]>([])

    const rootStore = useContext(RootStoreContext)
    const {messages , loadMessages} = rootStore.messageStore
    const {getCurrentChannel , isChannelLoaded , setChannelStarred  ,activeChannel} = rootStore.channelStore;
    const {user} = rootStore.userStore;
    
     const handleSearchMessages = () => {
         if(searchState.searchTerm === ''){
             setMessageState([])
             setSearchState({searchLoading:true})
             return
         }
         const channelMessages = [...messages]
         const regex = new RegExp(searchState.searchTerm! , 'gi')
         const searchResult = channelMessages.reduce(
             (acc:IMessage[], message) => {
                if(message.content && message.content.match(regex) || message.sender.userName.match(regex)){
                    acc.push(message)
                }
                return acc
             },[]
         )

         setMessageState(searchResult)
         setSearchState({searchLoading:false})

         
     }

    const handleSearchChange = (event:any) => {
        setSearchState({searchTerm:event.target.value , searchLoading:true})
    }
    useEffect(() => {
       console.log(searchState)
       if(searchState.searchLoading){
           handleSearchMessages()
       }
    }, [handleSearchChange,handleSearchMessages])
    
   


    const displayMessages = (message: IMessage[]) => {
        return (message.length > 0 && 
            
            message.map((message) => (
             
                <Message currentUser={user} key={message.createdAt.toString()} message={message}></Message>
            )))
    }
    const handleStar = () => {
        setChannelStarred(activeChannel!)
    }
    return (
        <React.Fragment>
            <MessagesHeader currentChannel={activeChannel} currentUser={user} handleStar={handleStar} handleSearchChange={handleSearchChange}/>
            <Segment>
                <Comment.Group>
                    {displayMessages(messageState.length > 0 ? messageState : messages)}
                </Comment.Group>
            </Segment>
            <MessageForm/>
        </React.Fragment>
    )
}

export default observer(Messages);