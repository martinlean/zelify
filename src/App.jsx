import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import SellerDashboard from './components/SellerDashboard';
import MemberArea from './components/MemberArea';
import './App.css';

function App() {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/member" element={<MemberArea />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
