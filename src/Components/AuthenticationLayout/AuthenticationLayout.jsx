import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from './AuthenticationLayout.module.css'

export default function AuthenticationLayout() {
  return (
    <>

      <header className='flex flex-col lg:flex-row  h-screen'>

        <section className={`left-part basis-[40%]  flex items-center p-3 rounded-b-4xl lg:rounded-b-none  ${styles.bgGradient}`} >

          <div className=' w-full '>
            <p className={` text-6xl md:text-6xl xl:text-8xl italic font-bold text-white text-center ${styles.textGradient} mb-20 `}>
              Your people. Your world. One community
            </p>
            <p className={`text-white text-2xl md:text-4xl xl:text-5xl italic font-bold text-center ${styles.textGradient}`}>
              Turning moments into memories.
            </p>
          </div>

        </section>

        <section className="right-part basis-[60%] bg-background ">
          <Outlet />
        </section>
      </header>


    </>
  )
}
