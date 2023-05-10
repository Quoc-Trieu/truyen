import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login';
import Doc from '../pages/Doc/Doc';

const PublicRoutes = () => {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Doc />} />
      </Routes>
  )
}

export default PublicRoutes;
