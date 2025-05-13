import { useContext } from 'react';
import { Alert } from 'react-native';
import loginData from '../../common/auth/loginData.json';
import { AuthContext } from '../../../App';

const _LoginService = (email, pin,setIsAuthenticated,setUserRole) => {
//   const { setIsAuthenticated } = useContext(AuthContext);

  const user = loginData.find(u => u.email === email && u.pin === pin);
  if (user) {
    setIsAuthenticated(true);
    setUserRole(user.role);
    return { success: true, role: user.role }; // Let caller navigate
  } else {
    Alert.alert('Login Failed', 'Invalid email or PIN');
    return { success: false };
  }
};

export default _LoginService;
