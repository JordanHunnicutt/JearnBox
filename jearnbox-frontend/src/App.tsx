import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JoinGamePage } from './components/JoinGamePage/JoinGamePage';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { InGamePage } from './components/InGamePage/InGamePage';
import { store } from './Store';
import { Provider } from 'react-redux';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinGamePage}/>
      </Switch>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
