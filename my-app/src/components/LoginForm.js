import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css"
import axios from "axios";

//icons
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
const baseURL = "http://localhost:3000/login";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function createPost(event) {
    event.preventDefault(); 
    axios.post(baseURL, {
        "email":email,
        "password":password,
        }
      )
      .then((response) => {
        console.log(response.data);
        if(response.data.user.token){
          localStorage.setItem("token", response.data.user.token)
          //navigate('/home')
        }
      })
      .catch((error) => {
        setError("Failed to log in. Please check your credentials.");
      });
    }
  

  return (
    <div className='loginPage'>
      
        <img alt="computer"src={require("../images/login.jpg")} className='loginHeroImage'/>

      <div className='formDivLogin'>
        <div className='innerFormDivLogin'>
          <h2 className='siteNameLogin'>ConnectIT</h2>
          <h1 className='welcomeMessageLogin'>Welcome back</h1>
          <h3 className='loginInstruction'>Log in to to your account</h3>
          <form onSubmit={createPost}>
            <div className='inputGroup'>
              <label className='formLabel' htmlFor='emailInput'>Email</label>
              <input className='formInput' id="emailInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='inputGroup'>
              <label className='formLabel' htmlFor='passwordInput'>Password</label>
              <input className='formInput' id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className='loginButton' type="submit">Login</button>
          </form>
          {error && <p>{error}</p>}
          <p className='smPrompt'><span className='smText'>or log in with</span></p>
          <div className='socialMediaLogin'>
            <GoogleIcon className="socialMediaButton" />
            <LinkedInIcon className="socialMediaButton" />
            <FacebookIcon className="socialMediaButton" />
            <AppleIcon className="socialMediaButton" />
          </div>

          {error && <p>{error}</p>}
      {/* ... (rest of the component) ... */}
          <Link to="../register">
            <button className='newUserSignup'>New user? Create an account</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;