import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RgisterPage';
import EventsPage from './pages/EvantsPage';
import EventDetailsPage from './pages/EvantDetailsPage';
import DashboardPage from './pages/DashboardPage';
import AddEventPage from './pages/AddEventPage';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/new' element={<AdminRoute><AddEventPage /></AdminRoute>} />
        <Route path='/events/:id' element={<EventDetailsPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;