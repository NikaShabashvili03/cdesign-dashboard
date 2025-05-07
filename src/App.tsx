import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import CustomOutlet from './components/CustomOutlet';
import RenovationSingle from './pages/RenovationSingle';
import LanguageWrapper from './components/language/LanguageWrapper';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      <Route path="/:lng" element={<LanguageWrapper />}>
        <Route path="login" element={<LoginPage />} />

        <Route element={<CustomOutlet />}>
          <Route index element={<Dashboard />} />
          <Route path="renovation/:track" element={<RenovationSingle />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
