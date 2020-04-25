import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native";

import HomeScreen from '../scenes/HomeScreen';
import PostScreen from '../scenes/PostScreen';
import PostFormScreen from '../scenes/PostFormScreen';
import { bindActionCreators } from "redux";
import * as TokensActions from "../actions/tokens";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const HomeStackScreen = ({ getToken, token }) => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              testID="addPostButton"
              onPress={() => {
                const path = token ? 'PostForm' : 'Auth';
                navigation.navigate(path, { postId: null });
              }}
              title="+"
            />
          )
        })}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('Home')}
              title="<"
            />
          )
        })}
      />
      <Stack.Screen
        name="PostForm"
        component={PostFormScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('Home')}
              title="<"
            />
          )
        })}
      />
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
)(HomeStackScreen);
