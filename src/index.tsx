import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Redirect, Route, Router, Switch} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NotFound from './components/NotFound';
import {createBrowserHistory} from 'history';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { LoadingComponent } from './components/LoadingComponent';


export const history = createBrowserHistory();

const PrivateRoute = ({component, isAuthenticated, ...rest}: any) => {
  var jwt =  (localStorage.getItem("jwt"))
 
  const routeComponent = (props: any) => (
    
      jwt !==null
          ? React.createElement(component, props)
          : <Redirect to={{pathname: '/login'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};
ReactDOM.render(
    <React.Fragment>
      <ToastContainer position="bottom-right"/>
      <Router history={history}>
      <Switch>
        <PrivateRoute isAuthenticated={""}  exact  path="/" component={App}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route  exact component={NotFound}/>
        <Route exact path="/loading" component={LoadingComponent}/>
      </Switch>
    </Router>
    </React.Fragment>
   ,

   
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
