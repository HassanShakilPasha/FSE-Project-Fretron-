import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../utils/storage';

export default function Login({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('login');
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'transporter',
  });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.email.trim() || !form.password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (mode === 'signup') {
      if (!form.name.trim()) {
        setError('Name is required for signup.');
        return;
      }

      const signupResult = await registerUser(form);
      if (!signupResult.ok) {
        setError(signupResult.message);
        return;
      }

      const loginResult = await loginUser({ email: form.email, password: form.password });
      if (loginResult.ok) {
        onAuthSuccess(loginResult.user);
        navigate('/dashboard');
      }

      return;
    }

    const loginResult = await loginUser({ email: form.email, password: form.password });
    if (!loginResult.ok) {
      setError(loginResult.message);
      return;
    }

    setSuccess('Login successful. Redirecting...');
    onAuthSuccess(loginResult.user);
    navigate('/dashboard');
  }

  return (
    <div className='Login'>
      <div className='authShell'>
        <div className='authBrand'>
          <div className='Logo'>
            <h1>Fretron</h1>
          </div>

          <div className='Middle'>
            <h2>Reliable Logistics, Better Capacity</h2>
            <p>
              Manage routes, connect with businesses, and keep your cargo space running at full value.
            </p>
          </div>
        </div>

        <div className='authPanel'>
          <div className='authPanelHeader'>
            <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p>
              {mode === 'login' ? 'Log in to your account to continue' : 'Sign up to start posting routes'}
            </p>
          </div>

          <form className='form' onSubmit={handleSubmit}>
            <h4>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </h4>

            {mode === 'signup' && (
              <div className='row'>
                <label htmlFor='name' id='label-email'>Full Name</label>
                <input name='name' type='text' id='name' placeholder='Enter your name' value={form.name} onChange={updateField} />
              </div>
            )}

            <div className='row'>
              <label htmlFor='email' id="label-email">Email</label>
              <input name='email' type='email' id='email' placeholder='Enter your email' value={form.email} onChange={updateField} />
            </div>
            <div className='row'>
              <label htmlFor='password' id="label-password">Password</label>
              <input name='password' type="password" id='password' placeholder='********' value={form.password} onChange={updateField} />
            </div>
            {mode === 'signup' && (
              <div className='row'>
                <label htmlFor='role' id='label-password'>Role</label>
                <select id='role' name='role' value={form.role} onChange={updateField}>
                  <option value='transporter'>Transporter</option>
                  <option value='business'>Business</option>
                </select>
              </div>
            )}

            {error && <p className='statusMsg errorMsg'>{error}</p>}
            {success && <p className='statusMsg successMsg'>{success}</p>}

            <div className='row'>
              {mode === 'login' && <a id='Forgot' href="#">Forgot Password?</a>}
            </div>

            <div className='row'>
              <button id="Create" type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
            </div>

            <div className='row'>
              <p id="signup">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button type='button' className='switchMode' onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
 