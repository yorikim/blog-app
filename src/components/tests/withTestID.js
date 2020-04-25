import React from 'react';
import { View } from "react-native";

const withTestID = Component => ({ testID, ...props }) => {
  return (
    <View style={{ flex: 1, }} testID={testID}>
      <Component {...props} />
    </View>
  );
};

export default withTestID;
