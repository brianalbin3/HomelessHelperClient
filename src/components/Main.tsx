import React from 'react';


import Header from './Header';

interface MainProps {
  children: any; /* ReactChild | ReactChildren; */
}

interface MainState {}

class Main extends React.Component <MainProps, MainState > {

  render() {
    return (
      /*
      TODO: Add to below div
display: flex;
flex-direction: column;
height: 100%;
      */
      <div>
        <Header/>
        <main>{this.props.children}</main> 
      </div>
    );
    // TODO: add flex: 1 to main
  }
}

export default Main;