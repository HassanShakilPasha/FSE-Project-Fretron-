import React from 'react';
import './Login.css';


export default function Login() {
  return (
    <div className='Login'>
        <div className='Logo'>
          <h1>Fretron</h1>
        </div>  

        <div className='Middle'>
          <h2>
            Welcome Back 
          </h2>

          <p>
            Log in to your account to continue
          </p>
        </div>


        <div className='form'>
          <h4>
            Login
          </h4>

          <div className='row'>
            <label htmlFor='email' id="label-email">Email</label>
            <input type='email' id='email' placeholder='Enter your email' />
          </div>

          <div className='row'>
            <label htmlFor='password' id="label-password">Password</label>
            <input type="password" id='password' placeholder='********' />
          </div>

          <div className='row'>
            <a id= 'Forgot' href="#">Forgot Password?</a>
          </div>

          <div className='row'>
            <button id="Create" type="submit">Login</button>
          </div>

          <div className='row'>
            <p id="signup"> 
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </div>

        
    </div>

    
  )
}
 