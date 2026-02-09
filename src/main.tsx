import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import "./App.css";
import "./index.css";
// Automatically import all CSS in src/css
import.meta.glob("./css/*.css", { eager: true });


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <App />
  </StrictMode>,
)
