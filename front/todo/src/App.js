import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddTodoPage from './pages/AddTodoPage/AddTodoPage';
import SiginPage from './pages/Signinpage/Signinpage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div  >
        <Router>
          <div>
            <Switch>


              <Route path="/" component={HomePage} exact />
              <Route path="/home" component={HomePage}  exact />
              <Route path="/todo/add" component={AddTodoPage} exact  />
              <Route path="/auth" component={SiginPage} exact  />
              

              
              
              <Route path="*" component={notfounderror}   />
              

              


            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}


function  notfounderror(){
  return (<h1>404 NOT FOUND</h1>);
}

