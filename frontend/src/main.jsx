import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Terms from "./Terms.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Terms />
  </StrictMode>,
)
