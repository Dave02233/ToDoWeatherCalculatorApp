import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Forecast from './openMeteo/Forecast'
import NotFound from './NotFound'

const router = createBrowserRouter([
  { path: '/', 
    element: <App />
  },
  { path: 'forecast/:id', 
    element: <App />,
    children: [
      { path: '/forecast/:id',
        element: <Forecast />
      }
    ] 
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
