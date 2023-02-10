import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login';

const PublicRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
      </Routes>
  )
}

export default PublicRoutes;
