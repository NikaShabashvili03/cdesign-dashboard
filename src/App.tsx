import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import CustomOutlet from './components/CustomOutlet'
import RenovationSingle from './pages/RenovationSingle'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<CustomOutlet/>}>
        <Route index path={'/'} element={<Dashboard/>}/>
        <Route path={'/renovation/:track'} element={<RenovationSingle/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
