import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import NewAppointment from './pages/NewAppointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/new-appointment" element={<NewAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
