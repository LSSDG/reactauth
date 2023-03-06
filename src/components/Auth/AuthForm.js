import { useState, useRef ,useContext} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import {useNavigate} from 'react-router-dom'

const AuthForm = () => {
  const history=useNavigate();
  const authCtx=useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const email=emailRef.current.value;
    const password = passwordRef.current.value;
    let url;
    if(isLogin){
      //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMYil6nWWFVCaTbSl585thunSXzBXKtZQ';
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMYil6nWWFVCaTbSl585thunSXzBXKtZQ';
    }
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
          email:email,password:password,returnSecureToken:true
        })
    }).then(res=>{
      if(res.ok){
        return res.json();
      }else{
        return res.json().then(data=>{
          let errorMessage = 'Authentication failed';
          
          throw new Error(errorMessage);
        })
      }
    }).then(data=>{
      authCtx.login(data.idToken);
      history.replace('/')
    }).catch(err=>{
      alert(err.message);
    });

  }

  return(
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account' }
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
