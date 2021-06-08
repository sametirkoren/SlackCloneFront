import React, { useContext, useEffect } from 'react';
import './App.css';
import {Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import SidePanel from './components/SidePanel/SidePanel';
import ColorPanel from './components/ColorPanel/ColorPanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from './stores/rootStore';
import { LoadingComponent } from './components/LoadingComponent';
function App() {
  const rootStore = useContext(RootStoreContext)
  const {setLoading , loading , token} = rootStore.commonStore;
  const {getUser} = rootStore.userStore
  const {createHubConnection, stopHubConnection} = rootStore.messageStore;
  const {isChannelLoaded , storeChannels} = rootStore.channelStore;

  useEffect(() => {
    createHubConnection()
    if (token) {
      getUser().finally(() => setLoading())
    }
    else{ 
      setLoading()
    }

    return()=>{
      stopHubConnection()
    }
    console.log(`is loading : ${loading}`)
  }, [getUser, setLoading, token, loading])
  if(!loading) return <LoadingComponent content="Loading app..." />

  return (
   <Grid columns="equal" className="app">
     <ColorPanel/>
     <SidePanel/>
     <Grid.Column style={{marginLeft:320}}>
      {isChannelLoaded && storeChannels.length > 0 && <Messages/> }
     </Grid.Column>
    <Grid.Column width={4}>
    {isChannelLoaded && storeChannels.length > 0 &&  <MetaPanel/>}
    </Grid.Column>
   
   </Grid>
  );
}

export default observer(App);
