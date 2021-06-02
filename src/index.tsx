import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

ReactDOM.render(
    <BrowserRouter>
      <Route  exact path="/" component={App}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </BrowserRouter>
   ,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
