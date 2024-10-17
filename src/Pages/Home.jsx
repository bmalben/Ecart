import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/slice/productSlice'
import { addToWishList } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'
import Header from '../Components/Header'


function Home() {

  const dispatch=useDispatch()
  const{loading,products,error}=useSelector((state)=>state.productReducer);
  const{wishlist}=useSelector((state)=>state.wishlistReducer);
  const{cart}=useSelector((state)=>state.cartReducer);
  // console.log(loading);
  // console.log(products);
  // console.log(error);

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

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
      <Header insideHome={true}/>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}> 
  
        {
          loading?
          <div className="text-center mt-5 mb-5">
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />{" "}
            <Spinner animation="grow" variant="dark" />
          </div>:
  
  
          <Row className='mt-3 mb-3 container'>
          {
            products?.length>0?products.map((products,index)=>(
  
              <Col className='mt-2 mb-2' key={index} sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: '18rem',height:'450px' }}>
            <Link to={`/view/${products.id}`}><Card.Img variant="top" src={products.thumbnail} style={{width:'100%'}} /></Link>
            <Card.Body>
              <Card.Title>{products.title.slice(0,20)}</Card.Title>
              <Card.Text>
                {products.description.slice(0,30)}
              </Card.Text>
              <div className='d-flex justify-content-between iconbtn'>
                <Button variant="primary" style={{borderRadius:'24px'}} className='heart' onClick={()=>handleWishlist(products)}><i className="fa fa-heart" aria-hidden="true"></i></Button>
                <Button variant="primary" style={{borderRadius:'24px'}} className='cart'  onClick={()=>handleCart(products)}><i className="fa fa-cart-shopping" aria-hidden="true"></i></Button>
              </div>
            </Card.Body>
          </Card>
          </Col>
            )): <div className="fw-bolder mt-5 mb-5">
              <p className="text-danger">Nothing To Display</p>
            </div>
          }
        </Row>
        }
      </div>
    </>
  )
}

export default Home
