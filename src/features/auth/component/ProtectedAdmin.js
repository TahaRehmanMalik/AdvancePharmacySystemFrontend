import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from "../../user/userSlice";
function ProtectedAdmin({children}){
const user=useSelector(selectLoggedInUser);
const userInfo=useSelector(selectUserInfo);
 if(!user)
 {
   return<Navigate to='/login' replace={true}></Navigate>
 }
 if(user&& userInfo.role!=='admin')
 {
  return<Navigate to='/' replace={true}></Navigate>
 }
 return children
    
}
export default ProtectedAdmin;