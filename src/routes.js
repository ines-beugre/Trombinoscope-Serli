import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import { Home } from './Home/Home';
import history from './history';
import { Trombinoscope } from './trombiComponents/Trombinoscope';
import { Person } from './trombiComponents/Person';
import { CreateOrUpdate } from './trombiComponents/CreateOrUpdate';
import { List } from './trombiComponents/List';


export const makeMainRoutes = () => {
  return (
    <Router history={history} component={ App }>
      <div>
        <Route path="/" component = { App } />
        {/*<Route path="/home" compoment = { Home } />*/}

        {/* <Route path="/" render={props => <App auth={auth} {...props} />} /> */}
        {/* <Redirect to="/trombinoscope" /> */}
        <Route path="/home" component = { Home } />

        <Route path="/trombinoscope" component = { Trombinoscope } />
        <Route path="/person/:email" component = { Person } />
        <Route path="/update/:email" component=  { CreateOrUpdate } />
        <Route path="/list" component= { List } />
        <Route path="/create" component={(props) => { return <CreateOrUpdate maxLength={30} {...props}/>} }/>

      </div>
    </Router>
  );
};