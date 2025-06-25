import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './components/pages/Home/Home'
import Register from './components/pages/Register/Register'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
      path:"/",
      element:<Home/>
      },
    ]

  },
  {
    path:"/register",
    element:<Register/>
  }

  
])
const App = () => {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App