import React, { Component } from 'react'
import EmailForm from './EmailForm';
import LocationForm from './LocationForm';
import NameForm from './NameForm';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import PhoneForm from './PhoneForm';

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      phoneNumber: '',
      email: '',
      password: '',
      emailSubscription: false,
      firstName: '',
      lastName: '',
      locState: '',
      locCountry: '',
      countryCode: '',
      locPinCode: '',
      callingCode: '91',
      cordinateX: '',
      cordinateY: ''
    }
  }

  // Go back to the previous page
  prevPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  }

  // Go to the next page
  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  }

  handleChange = input => e => {
    if(input==="locCountry"){
      this.setState({ ["locCountry"]: e.target.value.split('@')[1] });
      this.setState({ ["countryCode"]: e.target.value.split('@')[0] });
    }
    else
      this.setState({ [input]: e.target.value });
  }

  getCoordinates = () => {
    let address = this.locState + " " + this.locCountry + " " + this.locPinCode;
    let API_KEY = '';
    try{
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=' + API_KEY)
      .then(res => res.json())
      .then(resJson => {
        const latitude = resJson.results.geometry.location.lat();
        const longitude = resJson.results.geometry.location.lng();
        console.log({latitude, longitude});
        this.setState({cordinateX: latitude});
        this.setState({cordinateY: longitude});
      })
    }
    catch{
      this.setState({cordinateX: 28.604088});
      this.setState({cordinateY: 77.214902});
    }
  }

  handleSubmit = () => {
    this.getCoordinates();
    let req = {
      "email": this.state.email,
      "password":  this.state.password,
      "profile": {
          "first_name": this.state.firstName,
          "last_name": this.state.lastName,
          "phone_number": this.state.phoneNumber,
          "country": this.state.locCountry,
          "state": this.state.locState,
          "user_type": "G",
          "cordinate_X": this.state.cordinateX,
          "cordinate_Y": this.state.cordinateY,
          "pin_code": this.state.locPinCode
      },
      "device": {
          "platform": "ANR",
          "dev_id": "fOJF2n04Q62MHy2i9rAGLs:APA91bHBUYJVPMk8_eKOSm15xcN6Istx4WenBTB1g_fFZ4qnC50VSTds4-a0R3ThGnqBlqTtDcsqdXCydxLGT-PJowMZ8Me3O1-NtzCNKiYmwJrEYliWsPv_RpG-ExcZpycKW9xUlXAB"
      }
    };
    try{
      fetch('https://test.paplilabs.com/login_api/signup/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(req)
      })
      .then(res => res.json())
      .then(resJson => {
        Object.keys(resJson.profile).forEach(function(key) {
          alert(key+": "+resJson.profile[key][0]);      
        });
      })
    }
    catch{
      alert("Oh no could not complete sign up request");
    }
    // this.setState({ page: 1 });
  }

  render() {
    const {page} = this.state;
    const {phoneNumber, email, password, emailSubscription, firstName, lastName, locState, 
      locCountry, countryCode, locPinCode, callingCode} = this.state;
    const values = {phoneNumber, email, password, emailSubscription, firstName, lastName, locState, 
      locCountry, countryCode, locPinCode, callingCode};
    switch(page){
      case 1:
        return (
        <div>
          <NavBar 
            prevPage = {this.prevPage}
            page = {page}
          />
          <PhoneForm
            nextPage = {this.nextPage}
            handleChange = {this.handleChange}
            values = {values}          
          />
          <Footer />
        </div>)
      case 2:
        return (
        <div>
          <NavBar 
            prevPage = {this.prevPage}
            page = {page}
          />
          <EmailForm 
            nextPage = {this.nextPage}
            handleChange = {this.handleChange}
            values = {values}
          />
          <Footer />
        </div>) 
      case 3:
        return (
        <div>
          <NavBar 
            prevPage = {this.prevPage}
            page = {page}
          />
          <NameForm 
            nextPage = {this.nextPage}
            handleChange = {this.handleChange}
            values = {values}
          />
          <Footer />
        </div>) 
      case 4:
        return (
        <div>
          <NavBar 
            prevPage = {this.prevPage}
            page = {page}
          />
          <LocationForm 
            nextPage = {this.nextPage}
            handleSubmit = {this.handleSubmit}
            handleChange = {this.handleChange}
            values = {values}
          />
          <Footer />
        </div>) 
      default:
    }
  }
}
