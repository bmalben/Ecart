import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishList } from '../Redux/slice/wishListSlice'
import Header from '../Components/Header'
import { addToCart } from '../Redux/slice/cartSlice'


function View() {

  const{cart}=useSelector((state)=>state.cartReducer);


  const {id}=useParams()//A hook from React Router that returns an object of key/value pairs of URL parameters.returns An object containing the parsed URL parameters.
  // console.log(id);

  const{loading}=useSelector((state)=>state.productReducer)

  const [product,setProduct]=useState({})
  const{wishlist}=useSelector((state)=>state.wishlistReducer);
  const dispatch=useDispatch()

  useEffect(()=>{
    const products=JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
  },[])
  console.log(product);

  const handleWishlist=(products)=>{
    const existingProduct=wishlist.find(item=>item?.id==products?.id)
    if(existingProduct){
      alert("product already exists...")
    }else{
      dispatch(addToWishList(products))
    }
  }

  const handleCart=(products)=>{
    const existingProduct=cart?.find(item=>item.id==products.id)
    if(existingProduct){
      dispatch(addToCart(products))
      alert("Item Added Again")
    }else{
      dispatch(addToCart(products))
      // alert("Item Added...")
    }
  }
  
  
  

  return (
    <>
    <Header/>
      <div className='mt-5'>
        {
          loading?
          <div className="text-center mt-5 mb-5">
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />
          </div>:
          <div className='container row justify-content-center' style={{marginTop:'100px',marginBottom:'100px'}}>
          <div className="col-lg-4 ms-5">
            <img src={product.thumbnail} style={{width:'100%' ,height:'500px'}} alt="" />
          </div>
          <div className="col-lg-6">
            <p>Pid: {product.id}</p>
            <h1>{product.title}</h1>
            <h5 className="fw-bolder">Price: <span style={{color:'red'}}>${product.price}</span></h5>
            <p>{product.description}
            </p>
            <div className="d-flex justify-content-between mt-4 iconbtn">
            <Button variant="primary" style={{borderRadius:'24px'}} className='heart' onClick={()=>handleWishlist(product)}><i className="fa fa-heart" aria-hidden="true"></i></Button>
            <Button variant="primary" style={{borderRadius:'24px'}} className='cart' onClick={()=>handleCart(product)}><i className="fa fa-cart-shopping" aria-hidden="true"></i></Button>
            </div>
          </div>
        </div>}
      </div>
    </>
  )
}

export default View
