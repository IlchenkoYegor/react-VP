import React from "react";

const AuthContext = React.createContext({auth: {authorized: false,
role: 'guest'}, stateHook: (roleg) => {}})

export default AuthContext;