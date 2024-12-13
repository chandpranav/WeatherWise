import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import WeatherApp from './WeatherApp'; 
import './styles/style.css';

const SignIn = () => <div className="page">Sign In Page</div>;
const SignUp = () => <div className="page">Sign Up Page</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
