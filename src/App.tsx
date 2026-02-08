import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import { ShopSignUP } from './pages/ShopSignUP';
import { AdminSignUp } from './pages/AdminSignUp';
import { Admin } from './pages/Admin';
import { ShopDashboard } from './pages/ShopDashboard';
import { UserDashboard } from './pages/UserDashboard';
import ShopPage from './pages/ShopPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shopsignup" element={<ShopSignUP />} />
        <Route path="/adminsignup" element={<AdminSignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shopdashboard" element={<ShopDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/shoppage" element={<ShopPage/>}/>
        <Route path="/userpage" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
