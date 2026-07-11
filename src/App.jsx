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
      <div className="min-h-screen bg-[#F3F4F6] p-8 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <Navbar />
          <main className="flex-1">
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
          </main>
          <footer className="bg-[#111111] text-white text-center py-6 text-sm font-medium">
            &copy; {new Date().getFullYear()} UdrCrafts®. All rights reserved.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
