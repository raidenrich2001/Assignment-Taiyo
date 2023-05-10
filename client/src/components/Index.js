import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Index() {
  return (
    <div className='flex'>
       <Sidebar></Sidebar>
       <Outlet></Outlet>
    </div>
  )
}
