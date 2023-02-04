import { Component } from "react"
import PropTypes from "prop-types"
import { Navigate, Route } from "react-router-dom"
import { RedirectFunction } from "react-router-dom"
import { connect } from "react-redux"


const SecureRoute = ({isAuthorized, children}) =>{
    if(isAuthorized){
        return <Navigate to={"/"}></Navigate>
    }
    return {...children};
}

const mapStateToProps = state => ({
    isAuthorized: state.security.validToken
})

SecureRoute.propTypes ={
    isAuthorized: PropTypes.bool
}

export default connect(mapStateToProps,null)(SecureRoute);

