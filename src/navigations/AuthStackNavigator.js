import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../scenes/AuthScreen';
import ProfileScreen from '../scenes/ProfileScreen';
import { bindActionCreators } from "redux";
import * as TokensActions from "../actions/tokens";

const Stack = createStackNavigator();

const AuthStackScreen = ({getToken, token}) => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator>
      {!!token ? (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen}/>
        </>
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => ({
  ...state.tokens
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...TokensActions
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthStackScreen);
