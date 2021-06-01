import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import SidePanel from './components/SidePanel/SidePanel';
import ColorPanel from './components/ColorPanel/ColorPanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';
function App() {
  return (
   <Grid columns="equal" className="app">
     <ColorPanel/>
     <SidePanel/>
     <Grid.Column style={{marginLeft:320}}>
      <Messages/>
     </Grid.Column>
    <Grid.Column width={4}>
       <MetaPanel/>
    </Grid.Column>
   
   </Grid>
  );
}

export default App;
