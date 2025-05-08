import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ToasterProvider from './providers/ToasterProvider.tsx'
import './i18n';
import ModalProvider from './providers/ModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ModalProvider/>
      <ToasterProvider/>
      <App />
    </BrowserRouter>
)
