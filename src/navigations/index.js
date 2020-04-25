import React, { useEffect, useRef, useState } from 'react';
import AppNavigator from './AppNavigator';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { Linking } from "expo";

const prefix = Linking.makeUrl('/');

export default function () {
  const ref = useRef();
  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      Home: {
        initialRouteName: 'Home',
        screens: {
          Post: {
            path: 'posts/:postId',
            parse: {
              postId: Number,
            },
          },
          Home: 'home',
        },
      },
    }
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    getInitialState()
      .catch(() => {
      })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <AppNavigator/>
    </NavigationContainer>
  )
}
