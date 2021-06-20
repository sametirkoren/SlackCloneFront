import React, { useContext, useEffect, useState } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import { MessageForm } from './MessageForm'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../stores/rootStore'
import { IMessage, ITypingNotification } from '../../models/messages'
import Message from './Message'
import Typing from './Typing'
interface ISearchFormState {
  searchTerm?: string
  searchLoading: boolean
}

export const Messages = () => {
  const searchFormInitialState: ISearchFormState = {
    searchTerm: '',
    searchLoading: false,
  }
  let messageEnd: any
  const [searchState, setSearchState] = useState<ISearchFormState>(
    searchFormInitialState,
  )
  const [messageState, setMessageState] = useState<IMessage[]>([])
  const [numUniqueUsers, setNumUniqueUsers] = useState(0)

  const rootStore = useContext(RootStoreContext)
  const { messages, loadMessages, typingNotifications } = rootStore.messageStore
  const {
    getCurrentChannel,
    isChannelLoaded,
    activeChannel,
    setChannelStarred,
  } = rootStore.channelStore
  const { user } = rootStore.userStore

  const handleSearchMessages = () => {
    if (searchState.searchTerm === '') {
      setMessageState([])
      setSearchState({ searchLoading: true })
      return
    }

    const channelMessages = [...messages]

    const regex = new RegExp(searchState.searchTerm!, 'gi')
    const searchResult = channelMessages.reduce((acc: IMessage[], message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.sender.userName.match(regex)
      ) {
        acc.push(message)
      }
      return acc
    }, [])

    setMessageState(searchResult)
    setSearchState({ searchLoading: false })
  }
  const handleSearchChange = (event: any) => {
    setSearchState({
      searchTerm: event.target.value,
      searchLoading: true,
    })
  }

  const countUniqueUsers = (messages: IMessage[]) => {
    const uniqueUsers = messages.reduce((acc: string[], message) => {
      if (!acc.includes(message.sender.userName)) {
        acc.push(message.sender.userName)
      }
      return acc
    }, [])

    return uniqueUsers.length
  }
  useEffect(() => {
    if (searchState.searchLoading) {
      handleSearchMessages()
    }

    if (messageEnd) {
      scrollToBottom()
    }
    setNumUniqueUsers(
      countUniqueUsers(messageState.length > 0 ? messageState : messages),
    )
  }, [handleSearchMessages, handleSearchChange])

  const scrollToBottom = () => {
    messageEnd.scrollIntoView({ behavior: 'smooth' })
  }

  const displayMessages = (message: IMessage[]) => {
    return (
      message.length > 0 &&
      message.map((message) => {
        if (message.channelId !== activeChannel?.id) return
        return (
          <Message
            key={message.createdAt.toString()}
            message={message}
            currentUser={user}
          ></Message>
        )
      })
    )
  }

  const displayTypingUsers = (typingNotifications: ITypingNotification[]) =>
    typingNotifications.length > 0 &&
    typingNotifications.map((typing) => {
      if (typing.channel.id !== activeChannel?.id) return
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.2em',
          }}
          key={typing.sender.id}
        >
          <span className="user__typing">
            {typing.sender.userName} is typing
          </span>{' '}
          <Typing />
        </div>
      )
    })

  const handleStar = () => {
    setChannelStarred(activeChannel!)
  }
  return (
    <React.Fragment>
      {/* Header */}
      <MessagesHeader
        currentChannel={getCurrentChannel()}
        currentUser={user}
        handleStar={handleStar}
        handleSearchChange={handleSearchChange}
        numUniqueUsers={numUniqueUsers}
      />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messageState.length > 0 ? messageState : messages)}
          {displayTypingUsers(typingNotifications)}
          <div ref={(node) => (messageEnd = node)}></div>
        </Comment.Group>
      </Segment>
      <MessageForm />
    </React.Fragment>
  )
}

export default observer(Messages)
