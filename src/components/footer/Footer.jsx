import React from 'react'
import style from './Footer.module.scss'

const Footer = () => {
    return (
       <div className={style.main}>
           <div className={style.container}>
               <div className={style.links}>
                   <a href="/">Home</a>
                   <a href="/about">About</a>
                   <a href="/contact">Contact</a>
                   <a href="/privacy">Privacy Policy</a>
               </div>
               <div className={style.social}>
                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
               </div>
               <div className={style.copyright}>
                   <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
               </div>
           </div>
       </div>
    )
}

export default Footer