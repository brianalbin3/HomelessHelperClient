import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import { AuthContextConsumer } from '../contexts/authContext';

import Login from './Login';

type PrivateRouteState = {}
type PrivateRouteProps = { options?: any, component?: any, children?: any, path?: any }

class PrivateRoute extends React.Component<PrivateRouteProps, PrivateRouteState> {

    render() {
      const { options, component, children } = this.props;

      return (
        <AuthContextConsumer>
          {

          (context) => { return context.isLoggedIn ? (
            <Route path={this.props.path} {...options} component={ context.isLoggedIn ? component : Login}>{children}</Route> )
            : (<Redirect to="/login"/>)
          }
          
          }
        </AuthContextConsumer>
      );
    }
}

export default PrivateRoute;