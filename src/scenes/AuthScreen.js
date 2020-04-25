import React from 'react';
import AuthForm from "../components/AuthForm";
import { bindActionCreators } from "redux";
import * as UsersActions from "../actions/users";
import { connect } from "react-redux";
import { Container, Content } from "native-base";

const AuthScreen = ({ signUp, signIn, isLoading }) => {
  return (
    <Container>
      <Content>
        <AuthForm
          isLoading={isLoading}
          signUp={signUp}
          signIn={signIn}
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
)(AuthScreen);
