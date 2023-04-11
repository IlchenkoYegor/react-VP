import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const forUnAuthorized = ({ isAuthorized, children }) => {
  if (isAuthorized) {
    return <Navigate to={"/"}></Navigate>;
  }
  return { ...children };
};

const mapStateToProps = (state) => ({
  isAuthorized: state.security.validToken,
});

forUnAuthorized.propTypes = {
  isAuthorized: PropTypes.bool,
};

export default connect(mapStateToProps, null)(forUnAuthorized);
