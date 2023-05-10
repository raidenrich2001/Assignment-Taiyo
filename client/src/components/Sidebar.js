import React from 'react';
import {AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { BiBarChartSquare } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/store';
export default function Sidebar() {
    const toggle = useSelector((state) => state.Sidebar.toggle);
    const dispatch = useDispatch();

  return (

    <nav className={`h-screen ${toggle ? 'w-1/6' : 'w-1/12'} transition-all duration-300 font-mono shadow-lg z-10 xl:block lg:block md:block sm:hidden xs:hidden 2xs:hidden`}>
        <div>
            <h1 className='text-3xl text-center py-6 italic border bg-slate-200'>Taiyo</h1>
            <div className='px-6 '>
                <Link to='/' className='hover:bg-slate-100 py-4 cursor-pointer'>
                    {toggle ? <div className='hover:bg-slate-100 py-4 cursor-pointer flex items-center'><span><IoMdContact className='pr-2 w-full'></IoMdContact></span>Contacts</div> :<div className='hover:bg-slate-100 py-4 cursor-pointer flex justify-center items-center'> <IoMdContact className='pr-2 w-2/5 h-2/5'></IoMdContact> </div>}
                </Link>
                <Link to='/charts' className='hover:bg-slate-100 py-4 cursor-pointer' >
                    {toggle ?<div className='hover:bg-slate-100 py-4 cursor-pointer flex items-center'><span><BiBarChartSquare className='pr-2 w-full'></BiBarChartSquare></span>Charts & Maps</div> : <div className='hover:bg-slate-100 py-4 cursor-pointer flex justify-center items-center'><BiBarChartSquare className='pr-2 w-2/5 h-2/5'></BiBarChartSquare> </div>}
                </Link>
            </div>
            <div className='flex justify-center py-4'>
                {toggle ? <AiFillLeftCircle className='w-10 h-10' onClick={() => dispatch(actions.setToggle())}></AiFillLeftCircle> : <AiFillRightCircle className='w-10 h-10' onClick={() => dispatch(actions.setToggle())}></AiFillRightCircle>}
            </div>
        </div>
    </nav>

  )
}
