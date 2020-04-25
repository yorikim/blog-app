import React, { useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import * as UsersActions from "../actions/users";
import { connect } from "react-redux";
import Profile from "../components/Profile";
import { Container, Content } from "native-base";

const ProfileScreen = ({ email, getCurrentUser, signOut }) => {
  useFocusEffect(
    useCallback(() => {
      getCurrentUser();
    }, [])
  );

  return (
    <Container>
      <Content>
        <Profile
          email={email}
          signOut={signOut}
        />
      </Content>
    </Container>
  )
}

const mapStateToProps = state => ({
  ...state.users
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...UsersActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
