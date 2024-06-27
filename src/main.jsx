import ReactDOM from 'react-dom/client'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import DashboardCard from './components/DashboardCard/DashboardCard.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'
import { Auth0Provider } from '@auth0/auth0-react';



const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<Layout />}>

      <Route path='' element={<Home />} />

      <Route path='about' element={<About />} />

      <Route path='contact' element={<Contact />} />

      <Route path='Dashboard' element={<DashboardCard />} />
      

      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-tvm6z6b75ruv3pqm.us.auth0.com"
    clientId="HBXlFcSW5FkeaJOGVrXjwvR4Bt0i0Z6U"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router} />
    </Auth0Provider>,
)
