import React, { useEffect, useState } from 'react'
import './LocationForm.css'
import 'bootstrap/dist/css/bootstrap.css'

const LocationForm = ({nextPage, handleSubmit, handleChange, values}) => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [fetchUrl, setFetchUrl] = useState('https://test.paplilabs.com/login_api/country/');

  useEffect(()=> {
    fetch(fetchUrl)
    .then(res => res.json())
    .then(resJson => {
      setCountryList(countryList => [...countryList, ...resJson.results]);
      if(resJson.next!=null)
        setFetchUrl(resJson.next);
    })
  }, [fetchUrl]);

  useEffect(() => {
    let fetchUrl = "https://test.paplilabs.com/login_api/state/" + values.countryCode + "/";
    fetch(fetchUrl)
    .then(res => res.json())
    .then(resJson => {
      setStateList(resJson);
    })
  },[values.countryCode]);

  return (
    <div>
      <div className='header-text'>
        <h2>Allow us to get your location so we can set up a map for you.</h2>
      </div>      
      <div className='form-container'>
        <div className='input-container'>
          <label>Country</label>
          <select id="country-select-loc" 
            onChange={e => {handleChange('locCountry')(e)} }
          >
            <option value="" selected disabled hidden>Select Country</option>
            {countryList.map(country => (
              <option value={country.code+"@"+country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className='input-container'>
          <label>State</label>
          <select id="country-select-loc" 
            onChange={handleChange('locState')} 
            value={values.locState}
          >
            <option value="" selected disabled hidden>Select State</option>
            {stateList.map(state => (
              <option value={state.region}>
                {state.region}
              </option>
            ))}
          </select>
        </div>
        <div className='input-container'>
          <label for="float-input">Pin Code</label>
          <input
            id="float-input"
            type="text" 
            placeholder="Input Text" 
            value={values.locPinCode} 
            onChange={handleChange('locPinCode')}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className='continue-button'><b>Submit</b></button>  
    </div>
  )
}

export default LocationForm