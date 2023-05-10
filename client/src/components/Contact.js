import React from 'react';
import { actions } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import Model from './Model';
import { Link } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { BiBarChartSquare } from "react-icons/bi";

export default function Contact() {
    const dispatch = useDispatch();
    const Firstname = useSelector((state) => state.Contacts.firstname)
    const Lastname = useSelector((state) => state.Contacts.lastname)
    const Status = useSelector((state) => state.Contacts.status)
    const data = useSelector((state) => state.Contacts.data)
    const viewContacts = useSelector((state) => state.Contacts.viewcontacts)
    const toggle = useSelector((state) => state.Sidebar.toggle);
    const showMenu = useSelector(state => state.Sidebar.showMenu);

    function handleSubmit() {
        let array = {
            firstname: Firstname,
            lastname: Lastname,
            status: Status
        }
        dispatch(actions.setData(array));
    }
    return (
        <div className={`${toggle ? 'w-5/6 2xl:w-5/6 xl:w-5/6 lg:w-5/6 md:w-5/6 sm:w-full xs:w-full 2xs:w-full' : 'w-11/12'} h-screen bg-slate-50 font-mono `}>
            <div className='flex py-3 border border-b-slate-300 bg-slate-100 space-x-3'>
                <div className='2xl:hidden xl:hidden lg:hidden md:hidden sm:pl-5 xs:pl-5 2xs:pl-5' onClick={() => dispatch(actions.setShowMenu())}><AiOutlineMenu className='w-full h-full'></AiOutlineMenu></div>
                <div className={`z-50 ${showMenu ? '' : 'hidden'} w-2/3 2xl:hidden xl:hidden lg:hidden md:hidden absolute top-12  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black`}>
                    <ul class="py-4 w-full text-sm text-white ">
                        <Link to='/' className='hover:bg-slate-100  hover:text-black cursor-pointer'>
                            <div className='hover:bg-slate-100 hover:text-black cursor-pointer flex items-center px-4 py-2'><span><IoMdContact className='pr-2 w-full'></IoMdContact></span>Contacts</div>
                        </Link>
                        <Link to='/charts' className='hover:bg-slate-100 hover:text-black cursor-pointer'>
                            <div className='hover:bg-slate-100 hover:text-black cursor-pointer flex items-center px-4 py-2'><span><BiBarChartSquare className='pr-2 w-full'></BiBarChartSquare></span>Charts & Maps</div>
                        </Link>

                    </ul>
                </div>
                <h2 className='text-xl'>Contact-details</h2>
            </div>
            <div className='flex justify-center text-slate-700  2xl:py-5 xl:py-5 lg:py-5 md:py-5 sm:py-5 xs:py-5 2xs:py-5 2xl:px-10 xl:px-10 lg:px-9 md:px-7 sm:px-7 xs:px-7 2xs:px-4 '>
                <div className='p-7 rounded-sm shadow-sm border bg-white'>
                    <div className='py-1 border border-b-slate-300 text-center'>
                        <h2>Create New Contact</h2>
                    </div>
                    <div className='pb-2 pt-1'>
                        <label className='pr-10 text-md'>First Name</label>
                        <input type='text' className='border py-1 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full' value={Firstname} onChange={(e) => dispatch(actions.setFirstname(e.target.value))}></input>
                    </div>
                    <div className='pb-2'>
                        <label className='pr-10 text-md'>Last Name</label>
                        <input type='text' className='border py-1 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full' value={Lastname} onChange={(e) => dispatch(actions.setLastname(e.target.value))}></input>
                    </div>
                    <div className='pb-2'>
                        <label className='pr-10 text-md'>Status</label>
                        <select type='select' className='border py-1 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full ' value={Status} onChange={(e) => dispatch(actions.setStatus(e.target.value))}>
                            <option value='Active'>Active</option>
                            <option value='InActive'>InActive</option>
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button className='px-5 py-1 bg-yellow-300 hover:bg-yellow-200 rounded-sm shadow-md' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            <div className='w-full 2xl:px-10 xl:px-10 lg:px-9 md:px-7 sm:px-7 xs:px-7 2xs:px-4'>
                <div>
                    <div className='text-center pb-3'>
                        <button className='px-5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-sm shadow-md' onClick={() => dispatch(actions.setViewContacts())}>View Contact</button>
                    </div>

                    <div className="flex flex-col border rounded-sm bg-white shadow-sm max-h-72">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div>
                                    <table className="min-w-full text-left font-light">
                                        <thead className="border-b bg-white h-full dark:border-neutral-300 text-center sticky top-0">
                                            <tr>
                                                <th className="px-6 py-2">#</th>
                                                <th className="px-6 py-2">First Name</th>
                                                <th className="px-6 py-2">Last Name</th>
                                                <th className="px-6 py-2">Status</th>
                                                <th className="px-6 py-2">Edit</th>
                                                <th className="px-6 py-2">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {viewContacts && (
                                                data.length ? (
                                                    data.map((datas, index) => (
                                                        <tr key={index} className="border-b dark:border-neutral-300 text-sm">
                                                            <td className="px-6 py-3 font-medium">{index + 1}</td>
                                                            <td className="px-6 py-3">{datas.firstname}</td>
                                                            <td className="px-6 py-3">{datas.lastname}</td>
                                                            <td className="px-6 py-3">{datas.status}</td>
                                                            <td className="px-6 py-3"><AiOutlineEdit className='w-full h-6 text-center' onClick={() => { dispatch(actions.setModals()); dispatch(actions.setShowTemp(index)) }}></AiOutlineEdit></td>
                                                            <td className="px-6 py-3"><MdOutlineDeleteOutline className='w-full h-6 text-center' onClick={() => dispatch(actions.setDeleteContact(index))}></MdOutlineDeleteOutline></td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan='7' className="py-2 h-24">No Contacts were Created</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Model></Model>
        </div>
    )
}
