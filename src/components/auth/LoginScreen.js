import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

 const dispatch = useDispatch();
// hook de redux useSelector nos da el stado
 const { loading   } = useSelector( state => state.ui );

const [formValues, handleInputChange, reset] = useForm({
  email: '',
  password: ''
  
})


const {email, password} = formValues;

// esta funcion es para el submit
const handleLogin = (e) => {
  e.preventDefault();
  // console.log(email, password)
  dispatch(startLoginEmailPassword(email,password))
}

// evento autenticacion con google
const handleGoogleLogin = () =>{
  dispatch(startGoogleLogin())
}

  return (
    <div>
       <h3 className="auth__tittle">Login</h3>
       <form  onSubmit={handleLogin}
       className="animate__animated animate__fadeIn animate_faster" >
         <input 
          className="auth__input"
          name="email"
          type="text" 
          placeholder='email'
          autoComplete='off'
          value={email}  onChange={handleInputChange}
         
           />

         <input className="auth__input"
          name="password"
          type="text" placeholder='password'
          value={password}
          onChange={handleInputChange}
         
         />

         <button 
         className="btn btn-primary btn-block"
         type="submit"
         disabled={ loading }>
           Login
        </button>
        
        <div className="auth__social-networks">
            <p>Login with social networks</p>
            <div className="google-btn" onClick={handleGoogleLogin} >
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">Create new Account</Link>
       </form>
    </div>
  )
}
