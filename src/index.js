import React from 'react'
import { Provider } from 'react-redux'
import store from './utils/store'
import Navigations from "./navigations";
import { Root } from 'native-base'

const Index = () => {
  return (
    <Root>
      <Provider store={store}>
        <Navigations/>
      </Provider>
    </Root>
  );
}

export default Index;
