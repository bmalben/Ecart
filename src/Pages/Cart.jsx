import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice';
import Header from '../Components/Header';
// import { Button } from 'react-bootstrap';

function Cart() {
  const dispatch=useDispatch()
  const{cart}=useSelector((state)=>state.cartReducer);

  const[total,setTotal]=useState(0)
  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalprice).reduce((x,y)=>x+y))
    }else{
      setTotal(0)
    }
  },[cart])


  return (
   <>
   <Header/>
      <div className='container' style={{marginTop:'100px',marginBottom:'100px'}}>
        {
          cart?.length>0?
          <div className="row mt-3">
          <div className="col-lg-8">
            <table className="table shadow" style={{textAlign:'center'}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart?.map((product,index)=>(
                    <tr>
                  <td>{index+1}</td>
                  <td>{product?.title}</td>
                  <td><img src={product?.thumbnail} style={{width:'300px' ,height:'300px'}} alt="" /></td>
                  <td><input className='text-center' type="text" readOnly value={product?.quantity} width={"25px"} /></td>
                  <td>$<span className='text-danger'>{product?.totalprice}</span></td>
                  <td><button className='btn m-o p-0' style={{borderRadius:'10px'}} onClick={()=>dispatch(removeFromCart(product?.id))}><i className="fa fa-trash text-danger"></i></button></td>
                </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <button className='btn btn-outline-danger' style={{borderRadius:'10px'}} onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
              <Link to={'/'} className='btn btn-outline-success' style={{borderRadius:'10px'}}>Shop More</Link>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <div className="container border rounded shadow mt-5 p-5 w-100 d-flex" style={{flexDirection:'column',alignItems:'center'}}>
              <h1>Summary</h1>
              <h6 className='text-success'>Products: {cart?.length}</h6>
              <h5>Total: <span className="text-danger fw-bolder">${total}</span></h5>
            </div>
            <div className="d-grid">
            <button className="btn btn-success m-3 rounded">Checkout</button>
            </div>
          </div>
        </div>:
        <div className="mt-5" style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <img src="https://moein.video/wp-content/uploads/2021/12/Shopping-Cart-GIF-Royalty-Free-Animated-Icon-350px-after-effects-project.gif" alt="" />
        <h1 className='text-danger'>Your Cart Is Empty</h1>
      </div>  
        }
      </div>
   </>
  )
}

export default Cart
