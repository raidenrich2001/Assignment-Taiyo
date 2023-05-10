import {configureStore, createSlice} from '@reduxjs/toolkit';

const Sidebar =  createSlice({
    name : 'Sidebar',
    initialState: {toggle : true, showMenu : false},
    reducers : {
        setToggle(state,action) {
            state.toggle = !state.toggle
        },
        setShowMenu(state,action) {
            state.showMenu = !state.showMenu
        }
    },
});
const Contacts =  createSlice({
    name : 'Contacts',
    initialState: {firstname:'',lastname:'',status:'Active',data:[], viewcontacts: false, modals: false, showtemp:{firstname:'',lastname:'',status:''}},
    reducers : {
        setFirstname(state,action){
            state.firstname = action.payload
        },
        setLastname(state,action){
            state.lastname = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setData(state,action){
            const { firstname, lastname, status } = state;
            state.data.push({ firstname, lastname, status });
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.status = action.payload.status;
         },
        setViewContacts(state,action){
            state.viewcontacts = !state.viewcontacts
        },
        setModals(state,action){
            state.modals = !state.modals
            
        },
        setShowTemp(state,action){
            state.showtemp = {...state.data[action.payload],index : action.payload}
        },
        setDeleteContact(state, action) {
            state.data.splice(action.payload, 1);
        },
        setEditContact(state,action) {
            const { index, firstname, lastname, status } = action.payload;
            state.data[index].firstname = firstname;
            state.data[index].lastname = lastname;
            state.data[index].status = status;
        }
    },
});

const ChartsAndMapState =  createSlice({
    name : 'ChartsAndMapState',
    initialState: {graphData: {} ,totalData: {} , countriesData: [],show: 'showMap',showtotal: false},
    reducers : {
        setGraphData(state,action){
            state.graphData = action.payload
        },
        setCoutriesData(state,action){
            state.countriesData = action.payload
        },
        setTotalData(state,action){
            state.totalData = action.payload
        },
        setShow(state,action){
            state.show = action.payload
        },
        setShowTotal(state,action){
            state.showtotal = !state.showtotal
        }
    },
});

export const actions = {
    ...Contacts.actions,
    ...ChartsAndMapState.actions,
    ...Sidebar.actions
}

const store = configureStore({
    reducer: {
        Contacts: Contacts.reducer,
        ChartsAndMapState: ChartsAndMapState.reducer,
        Sidebar: Sidebar.reducer
    }
});

export default store;