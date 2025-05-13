import React, { createContext, useState, useEffect } from 'react';
import AccessTokenService from '../helper/AccessTokenService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading, true means authenticated, false means not authenticated

  useEffect(() => {
    const validateToken = async () => {
      try {
        const isValid = await AccessTokenService._TokenValidation();
        setIsAuthenticated(isValid);
      } catch (error) {
        // Handle error (e.g., token validation failed)
        setIsAuthenticated(false); // or handle specific error cases
      }
    };
    
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
