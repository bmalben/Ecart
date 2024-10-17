import { createSlice } from "@reduxjs/toolkit";




const wishListSlice=createSlice({
    name:'wishlist',
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishList:(state,action)=>{
            state.wishlist.push(action.payload)
        },
        removeFromWishList:(state,action)=>{
            state.wishlist=state.wishlist.filter(item=>item.id!==action.payload)
        }
    }
})

export const {addToWishList,removeFromWishList}=wishListSlice.actions;
export default wishListSlice.reducer