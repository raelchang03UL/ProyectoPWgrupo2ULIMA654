import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PantallaGeneral from './PantallaGeneral'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <PantallaGeneral />
  </StrictMode>,
)
