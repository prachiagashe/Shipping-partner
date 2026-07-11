import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Welcome } from './pages/Welcome';
import { BecomePartner } from './pages/BecomePartner';
import { Registration } from './pages/Registration';
import { UploadDocuments } from './pages/UploadDocuments';
import { CreateAccount } from './pages/CreateAccount';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/upload-documents" element={<UploadDocuments />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <footer className="app-footer">
            &copy; {new Date().getFullYear()} Shipping Partner. All rights reserved.
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
