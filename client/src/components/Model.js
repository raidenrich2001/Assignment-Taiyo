import Modal from 'react-modal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/store';
import {AiOutlineClose} from 'react-icons/ai';

export default function Model(props) {
    const Modals = useSelector(state => state.Contacts.modals);
    const Firstname = useSelector((state) => state.Contacts.firstname);
    const Lastname = useSelector((state) => state.Contacts.lastname);
    const Status = useSelector((state) => state.Contacts.status);
    const showtemp = useSelector(state => state.Contacts.showtemp);
    const dispatch = useDispatch();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            border:'none'
        },
    };

    function handleSubmit() {
        let array = {
            index:showtemp.index,
            firstname: Firstname,
            lastname: Lastname,
            status: Status
        }
        dispatch(actions.setEditContact(array));
        dispatch(actions.setModals());
    }
    return (
        <Modal
            isOpen={Modals}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => dispatch(actions.setModals())}
            style={customStyles}
            contentLabel="Example Modal">
            <button className='flex justify-end w-full' onClick={() => dispatch(actions.setModals())}><AiOutlineClose></AiOutlineClose></button>

            <div className='flex justify-center text-slate-700 py-6 '>
                <div className='p-7'>
                    <div className='py-1 border border-b-slate-300 text-center'>
                        <h2>Edit This Contact</h2>
                    </div>
                    <div className='pb-3 pt-1'>
                        <label className='pr-10 text-md'>First Name</label>
                        <input type='text' className='border py-1.5 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full' defaultValue={showtemp.firstname} onChange={(e) => dispatch(actions.setFirstname(e.target.value))}></input>
                    </div>
                    <div className='pb-3'>
                        <label className='pr-10 text-md'>Last Name</label>
                        <input type='text' className='border py-1.5 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full' defaultValue={showtemp.lastname} onChange={(e) => dispatch(actions.setLastname(e.target.value))}></input>
                    </div>
                    <div className='pb-3'>
                        <label className='pr-10 text-md'>Status</label>
                        <select type='select' className='border py-1.5 border-slate-300 focus:border focus:border-yellow-500 focus:ring-yellow-500 rounded-sm w-full ' defaultValue={showtemp.status} onChange={(e) => dispatch(actions.setStatus(e.target.value))}>
                            <option value='Active'>Active</option>
                            <option value='InActive'>InActive</option>
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button className='px-5 py-1 bg-green-300 hover:bg-green-400 rounded-sm shadow-md' onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
