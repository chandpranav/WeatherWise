import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import SignUp from './SignUp';
import LogIn from './LogIn';
import WeatherApp from './WeatherApp'; 
import Account from './Account'; // Import the new AccountPage
import { UserProvider } from './UserContext'; // Import the UserProvider
import './styles/style.css';

function App() {
  return (
    <UserProvider> {/* Wrap the application in UserProvider */}
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} /> {/* Add Account Page route */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
