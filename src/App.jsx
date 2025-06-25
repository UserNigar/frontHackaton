import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './components/pages/Home/Home'

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

  }

  
])
const App = () => {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App