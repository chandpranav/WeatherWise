import React from 'react';
import './styles/signin.css'

function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
