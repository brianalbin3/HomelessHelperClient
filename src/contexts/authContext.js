import React, { Component } from "react";
import * as auth from '../api/auth';

const { Provider, Consumer } = React.createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: auth.hasLoginCookie()
  };

  login = () => {
    this.setState({ isLoggedIn: true})
  };

  logout = () => {
    this.setState({ isLoggedIn: false})
  };

  render() {
    return (
      <Provider value={{ isLoggedIn: this.state.isLoggedIn, login: this.login, logout: this.logout }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { AuthContextProvider, Consumer as AuthContextConsumer };
