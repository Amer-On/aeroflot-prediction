import React, {useContext, useState} from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const value = {isAuthenticated, setIsAuthenticated};

    return (
        <AuthContext.Provider value={value}>
                {children}
        </AuthContext.Provider>
    );
}

