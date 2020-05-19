/*** [IMPORT] ***/
import jwtDecode from 'jwt-decode'

/*** [CLASS] UserService ***/
class UserService {
   static getEmail() {
      // [INIT] GET EMAIL! // Check For Token // Define Decode //
      let token = ''
      let decoded = {}

      if (localStorage.usertoken != null) {
         token = localStorage.usertoken
         decoded = jwtDecode(token)
      }
      else {
         decoded = {
            email: ''
         }
      }

      // [RETURN] //
      return decoded.email
   }
}

/*** [EXPORT] ***/
export default UserService