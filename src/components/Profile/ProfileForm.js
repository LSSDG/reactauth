import classes from './ProfileForm.module.css';
import {useRef,useContext} from 'react';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordnNewRef=useRef();
  const authCtx = useContext(AuthContext)
  const submitHandler = (e)=>{
    e.preventDefault();

    const enteredNewPassword = passwordnNewRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMYil6nWWFVCaTbSl585thunSXzBXKtZQ',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      })
    }).then(res=>{
      
    })
  }



  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordnNewRef} minLength="7"/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
