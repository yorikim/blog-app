import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "native-base";

import HomeStackScreen from "./HomeStackNavigator";
import AuthStackScreen from "./AuthStackNavigator";

const Tab = createBottomTabNavigator();
const getIconName = routeName => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Auth':
      return 'person'
  }
}

export default function () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarTestID: `${route.name.toLowerCase()}Tab`,
        tabBarIcon: () => <Icon name={getIconName(route.name)}/>
      })}
    >
      <Tab.Screen
        tabBarTestID="homeTab"
        name="Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        tabBarTestID="authTab"
        name="Auth"
        component={AuthStackScreen}
      />
    </Tab.Navigator>
  )
};
