import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Menu from './Option/Menu'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menu />
  </StrictMode>,
)
