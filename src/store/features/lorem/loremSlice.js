
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'




 export  const fetchProductList = createAsyncThunk(
    'lorem/fetchProductList',async(args,{rejectWithValue})=>{
      try{
  const response =  await  axios.get("https://jsonplaceholder.typicode.com/todos")
  return response.data
    }catch(error){
       rejectWithValue(error.response)
    } 
     
    })


    
const studentSlice = createSlice({
name:'productData',
initialState:{
  data:[],
  isSuccess:false,
  loading:false,
  error:''
},

reducers:{},
extraReducers:{
[fetchProductList.pending]:(state,{payload})=>{
  state.loading = true;
},[fetchProductList.fulfilled]:(state,{payload})=>{
  state.loading = false;
  state.data = payload;
  state.isSuccess = true;
},[fetchProductList.pending]:(state,{payload})=>{
  state.message = payload;
  state.loading = false;
  state.isSuccess = false;

}

}

})
// export const {  setProductItems } = studentSlice.actions;

export  default studentSlice.reducer;