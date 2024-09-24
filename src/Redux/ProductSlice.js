import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const AllItems = createAsyncThunk("all",
    async()=>{
        const res = await axios.get("https://fakestoreapi.com/products")
        console.log(res?.data);  
        return res?.data
    }
)

const initialState = {
    isLoading:false,
    isError:false,
    AllProds:[],
    cart: JSON.parse( localStorage.getItem("cart"))  || [],
    TotalPrice: JSON.parse( localStorage.getItem("price"))  || 0
}

const ProductSlice = createSlice({
    name:"prods",
    initialState,
    reducers:{
        addToCart:(state,{payload})=>{
            const newprod={
              id:payload.id,
              title:payload.title,
              price:payload.price,
              image:payload.image,
              quantity:1,
              updatePrice:payload.price,
            }
            const ind = state.cart.findIndex((item)=> item.id == payload.id)
            console.log(ind);
            if(ind == -1){
              state.cart.push(newprod)
            }
            else{
              state.cart = state.cart.map((item,index)=>{
                if(index == ind){
                  item.quantity+= 1
                  item.updatePrice = item.price* item.quantity
                  return item
                }
                else{
                  return item
                }
    
              })
            }
            
           
            state.TotalPrice+=payload.price
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("price",JSON.stringify(state.TotalPrice))
            },
            increment:(state,{payload})=>{
                state.cart=state.cart.map((item)=>{
                  if(item.id==payload){
                    item.quantity+=1;
                    item.updatePrice=item.price*item.quantity
                  
                    return item
                  }else{
                   return  item
                  }
                })
                state.TotalPrice=state.cart.reduce((accum,item)=>{
                  return accum+item.updatePrice
                },0)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("price",JSON.stringify(state.TotalPrice))
              },
              decrement:(state,{payload})=>{
                state.cart=state.cart.map((item)=>{
                  if(item.id==payload){
                    item.quantity-=1;
                    item.updatePrice=item.price*item.quantity
                  
                    return item
                  }else{
                   return  item
                  }
                })
                state.TotalPrice=state.cart.reduce((accum,item)=>{
                  return accum+item.updatePrice
                },0)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("price",JSON.stringify(state.TotalPrice))
              },

              deleteItem:(state,{payload})=>{
                state.cart=state.cart.filter((item)=>{
                  return item.id!==payload
                })
                state.TotalPrice=state.cart.reduce((accum,item)=>{
                  return accum+item.updatePrice
                },0)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                 localStorage.setItem("price",JSON.stringify(state.TotalPrice))
              }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(AllItems.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(AllItems.fulfilled,(state,{payload})=>{
            state.isLoading= false
            state.AllProds = payload
        })
        .addCase(AllItems.rejected,(state)=>{
            state.isLoading= false
            state.isError= true

        })
    }
})

export const {addToCart,increment,decrement,deleteItem} = ProductSlice.actions

export default ProductSlice.reducer