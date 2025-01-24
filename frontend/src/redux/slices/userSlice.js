import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSidebarExpanded: true,
  name: localStorage.getItem('name') || '',
  email: 'admin@gmail.com',
  activeButton: 'Posts',
  activeReportButton:'posts',
  retailerModalIsOpen:false,
  addBillModalIsOpen:false,
  payBillModalIsOpen:false,
  addExpensesModalIsOpen:false,
  addStockInStoreModalIsOpen:false, 
  addCreditModalIsOpen:false,
  payCreditAmountModalIsOpen:false

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    expandSidebar(state) {
      state.isSidebarExpanded = true;
    },
    unexpandSidebar(state) {
      state.isSidebarExpanded = false;
    },
    updateProfile(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setActiveButton(state, action) {
      state.activeButton = action.payload;
    },
    setActiveReportButton(state, action) {
      state.activeReportButton = action.payload;
    },
    setRetailerModalIsOpen(state , action){
      state.retailerModalIsOpen = action.payload;
    },
    setAddBillModalIsOpen(state , action){
      state.addBillModalIsOpen = action.payload;
    },
    setPayBillModalIsOpen(state , action){
      state.payBillModalIsOpen = action.payload;
    },
    setAddExpensesModalIsOpen(state , action){
      state.addExpensesModalIsOpen = action.payload;
    },
    setAddStorkInStore(state , action){
      state.addStockInStoreModalIsOpen = action.payload;
    },
    setAddCreditModalIsOpen(state , action){
      state.addCreditModalIsOpen = action.payload;
    },
    setPayCreditModalIsOpen(state , action){
      state.payCreditAmountModalIsOpen = action.payload;
    },
  },
});

export const { 
  startLoading, 
  stopLoading, 
  expandSidebar, 
  unexpandSidebar, 
  updateProfile, 
  setActiveButton ,
  setActiveReportButton , 
  setRetailerModalIsOpen , 
  setAddBillModalIsOpen , 
  setPayBillModalIsOpen,
  setAddExpensesModalIsOpen,
  setAddStorkInStore,
  setAddCreditModalIsOpen,
  setPayCreditModalIsOpen
} = userSlice.actions;

export function setSideBarOpened() {
  return async () => {
    dispatch(userSlice.actions.expandSidebar());
  };
}

export function setSideBarClosed() {
  return async () => {
    dispatch(userSlice.actions.unexpandSidebar());
  };
}

export const updateProfileAsync = (profile) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(updateProfile(profile));
    }, 1000);
  };
};

export default userSlice.reducer;