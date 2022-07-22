import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'

import store, { history } from '../redux'

import Startup from './startup'

import Main from '../components/main'
import Cart from '../components/cart'
import Logs from '../components/logs'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Redirect to="/channels" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <Redirect to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <Route exact path="/" component={() => <Main />} />
            <Route exact path="/cart" component={() => <Cart />} />
            <Route exact path="/logs" component={() => <Logs />} />
            <OnlyAnonymousRoute exact path="/anonymous" component={() => <Main />} />
            <PrivateRoute exact path="/private" component={() => <Main />} />
          </Switch>
          <Link to="/logs">
            <footer className="flex fixed bottom-0 bg-gray-200 w-full h-8 justify-center items-center font-semibold">Logs</footer>
          </Link>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
