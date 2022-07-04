import React from 'react'

const NameForm = ({nextPage, handleChange, values}) => {
  return (
    <div>
      <div className='header-text'>
        <h2>Alright, let's set this up! Tell us a bit about yourself.</h2>
      </div>      
      <div className='form-container'>
        <div className='input-container'>
          <label for="float-input">First Name</label>
          <input
            id="float-input"
            type="text" 
            placeholder="Input Text" 
            value={values.firstName} 
            onChange={handleChange('firstName')}
            required
          />
        </div>
        <div className='input-container'>
          <label for="float-input">Last Name</label>
          <input
            id="float-input"
            type="text" 
            placeholder="Input Text" 
            value={values.lastName} 
            onChange={handleChange('lastName')}
            required
          />
        </div>
      </div>
      <button onClick={nextPage} className='continue-button'><b>Continue</b></button>  
    </div>
  )
}

export default NameForm