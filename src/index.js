import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import {Register, Login, App} from "./containers";

import { Provider} from 'react-redux';
import { createStore, applyMiddleware} from 're\dux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const root = document.getElementById('root');

//ReactDOM.render(<App/>, root);
ReactDOM.render(
        <Provider store={store}>
            <Router>
              <div>
                  <Route path="/" component={App}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
              </div>
            </Router>
        </Provider>
        , root);
