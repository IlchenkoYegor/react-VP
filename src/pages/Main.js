import React from "react";
import { connect } from "react-redux";
import AuthorizedMainPage from "../components/main/AuthorizedMainPage";
import { default as UnauthorizedMainPage } from "../components/main/UnauthorizedMainPage";
{
  /*style={{ width: "50em" }}*/
}
function Main({ security }) {
  // eslint-disable-next-line no-unused-vars
  const { validToken, user } = security;
  if (validToken) {
    return <AuthorizedMainPage />;
  } else {
    return <UnauthorizedMainPage />;
  }
}

const mapStateToProps = (state) => {
  return {
    security: state.security,
  };
};

export default connect(mapStateToProps, null)(Main);
