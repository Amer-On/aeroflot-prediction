import React, {useContext, useState} from "react";

const AuthContext = React.createContext({
    isAuthenticated: undefined,
    setIsAuthenticated: () => {}
});

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const value = {isAuthenticated, setIsAuthenticated};

    return (
        <AuthContext.Provider value={value}>
                {children}
        </AuthContext.Provider>
    );
}

