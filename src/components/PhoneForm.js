import React, { useEffect, useState } from 'react'
import './PhoneForm.css'
import 'bootstrap/dist/css/bootstrap.css'

let errorMessage = {text: ""};

const numberValidation = function(values) {
  if(values.phoneNumber.length !== 10||!(/^-{0,1}\d*\.{0,1}\d+$/.test(values.phoneNumber))){
    errorMessage.text = "Number should be of 10 digits";
    return true;
  }
  let temp = "+" + values.callingCode + values.phoneNumber;
  fetch('https://test.paplilabs.com/login_api/validatePhNum/', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      "phone_number": temp
    })
  })
  .then(res => res.json())
  .then(resJson => {
    if(resJson.user_exist==="True"){
      errorMessage.text = "User already exists";
      return true;
    }
  });
  errorMessage.text = "";
}

const PhoneForm = ({nextPage, handleChange, values}) => {
  const [countryCodes, setCountryCodes] = useState([]);
  const [fetchUrl, setFetchUrl] = useState('https://test.paplilabs.com/login_api/callingCode/');

  useEffect(() => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then(resJson => {
      setCountryCodes(countryCodes => [...countryCodes, ...resJson.results]);
      if(resJson.next!=null)
        setFetchUrl(resJson.next);
    })
  }, [fetchUrl]);
  
  return (
    <div>
      <div className='header-text'>
        <h2>Welcome!</h2>
        <h4>Let's get you started with a free Account.</h4>
      </div>
      <div className='form-container'>
        <p>Let's get started by entering your <b>phone number</b></p>
        <div className='input-container'>
          
            <select id='country-select' onChange={handleChange('callingCode')} value={values.callingCode}>
              {countryCodes.map(country => (
                <option hidden value={country.calling_code}>
                  <img src={country.flag}/>
                </option>
              ))}
              {countryCodes.map(country => (
                <option value={country.calling_code}>
                  {country.name} | +{country.calling_code}
                </option>
              ))}
            </select>
            <span id="country-code">+{values.callingCode}</span>
          
          <input id="input-num"
            type="text" 
            placeholder="88007 99012" 
            value={values.phoneNumber} 
            onChange={handleChange('phoneNumber')}
          />
        </div>
      </div>
      <div className='button-container' >
        <div id='error-message' className={numberValidation(values)?"d-block":"d-none"}>{errorMessage.text}</div>
        <button onClick={nextPage} className='continue-button' disabled={numberValidation(values)}><b>Continue</b></button>
      </div>
      <div className='text-footer'><p>By continuing you’re agreeing to our customers terms of service, privacy policy and cookie policy.</p></div>
    </div>
  )
}

export default PhoneForm