import React from 'react'
import Header from '../HeaderArea/Header'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout