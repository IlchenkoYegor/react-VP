import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ requeredRole, role, children }) => {
  if (!role.includes(requeredRole) && !role.includes("ADMIN")) {
    return <Navigate to={"/"}></Navigate>;
  }
  return <>{children}</>;
};

const mapStateToProps = (state) => {
  if (state.security.validToken) {
    return {
      role: [...state.security.user.authorities],
    };
  } else {
    return {
      role: [],
    };
  }
};

SecureRoute.propTypes = {
  role: PropTypes.array,
};

export default connect(mapStateToProps, null)(SecureRoute);
