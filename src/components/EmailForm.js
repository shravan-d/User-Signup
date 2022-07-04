import { React, useState } from 'react'
import './EmailForm.css'
import 'bootstrap/dist/css/bootstrap.css'
import password from '../media/password.png'

let errorMessage = {text: ""};

const hasNumber = (val) => /\d/.test(val);
const hasCapital = (val) => /[A-Z]/.test(val);
const hasLower = (val) => /[a-z]/.test(val);
const hasSpecial = (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val);

const emailValidation = (values) => {
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errorMessage.text = "Invalid E-mail";
    return true;
  }
  fetch('https://test.paplilabs.com/login_api/validateEmail/', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      "email": values.email
    })
  })
  .then(res => res.json())
  .then(resJson => {
    if(resJson.success!=="True"){
      errorMessage.text = "Invalid E-mail";
      return true;
    }
  });
  fetch('https://test.paplilabs.com/user/validateEmail/', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      "email": values.email
    })
  })
  .then(res => res.json())
  .then(resJson => {
    if(resJson.user_exist==="True"){
      errorMessage.text = "This E-mail has already been registered with us.";
      return true;
    }
  });
  if(!(hasCapital(values.password)&&hasNumber(values.password)&&hasSpecial(values.password)&&hasLower(values.password))){
    errorMessage.text = "Please choose a password that passes all checks.";
    return true;
  }
  errorMessage.text = "";
}

const EmailForm = ({nextPage, handleChange, values}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <div>
      <div className='header-text'>
        <h2>Welcome!</h2>
        <h4>Let's get you started with a free Account.</h4>
      </div>      
      <p>We suggest using the <b>email address you use at work</b></p>
      <div className='form-container'>
        <div className='input-container'>
          <label for="float-input">Email</label>
          <input
            id="float-input"
            type="text" 
            placeholder="Input Text" 
            value={values.email} 
            onChange={handleChange('email')}
          />
        </div>
        <div className='input-container'>
          <label for="float-input">Password</label>
          <input
            id="float-input"
            type={showPassword?"text":"password"} 
            placeholder="Input Text" 
            value={values.password} 
            onChange={handleChange('password')}
          />
          <img className='togglePassword' src={password} alt="" onClick={() => setshowPassword((!showPassword))}></img>
        </div>
        <div className='check-password-container'>
          <div className='row'>
            <span className='col' id={hasCapital(values.password)?'password-check-active':'password-check'}>Capital Letter</span>
            <span className='col' id={hasLower(values.password)?'password-check-active':'password-check'}>Lowercase Letter</span>
          </div>
          <div className='row'>
            <span className='col' id={hasSpecial(values.password)?'password-check-active':'password-check'}>Special Char</span>
            <span className='col' id={hasNumber(values.password)?'password-check-active':'password-check'}>Numbers</span> 
          </div>
        </div>
      </div>
      <input
          type="checkbox"
          value={values.emailSubscription}
          onChange={handleChange('emailSubscription')}
        /><span className="subscription-note">It's okay to send me emails about Novae Avenue<br/></span>
      <div className='button-container' >
        <button onClick={nextPage} className='continue-button' disabled={emailValidation(values)}><b>Continue</b></button>
        <div id='error-message' className={emailValidation(values)?"d-block":"d-none"}>{errorMessage.text}</div>
      </div>
    </div>
  )
}

export default EmailForm