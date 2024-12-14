import React from 'react';
import './styles/signin.css'

function LogIn() {
  return (
    <div>
      <h2>Log In</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
