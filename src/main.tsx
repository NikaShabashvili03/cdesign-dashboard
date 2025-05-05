import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ToasterProvider from './providers/ToasterProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ToasterProvider/>
      <App />
    </BrowserRouter>
)
