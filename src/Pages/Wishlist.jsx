import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeFromWishList } from '../Redux/slice/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';
import Header from '../Components/Header';


function Wishlist() {

  // event.preventDefault();
  const dispatch=useDispatch()
  const{wishlist}=useSelector((state)=>state.wishlistReducer);

  const handlCart=(products)=>{
    dispatch(removeFromWishList(products.id))
    dispatch(addToCart(products))
  }

  return (
    <>
    <Header/>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <Row className='mt-3 mb-3 container'>
        {
          wishlist?.length>0?wishlist.map(products=>(
            <Col className='mt-2' sm={12} md={6} lg={4} xl={3} >
        <Card style={{ width: '18rem' }}>
        <Link to={`/view/${products.id}`}><Card.Img variant="top" src={products.thumbnail} style={{width:'100%'}} /></Link>
        <Card.Body>
          <Card.Title>{products.title.slice(0,20)}</Card.Title>
          <Card.Text>
          {products.description.slice(0,30)}
          </Card.Text>
          <div className='d-flex justify-content-between iconbtn'>
            <Button variant="primary" style={{borderRadius:'24px'}} className='heart' onClick={()=>dispatch(removeFromWishList(products.id))}><i className="fa fa-trash" aria-hidden="true"></i></Button>
            <Button variant="primary" style={{borderRadius:'24px'}} className='cart' onClick={()=>(handlCart(products))}><i className="fa fa-cart-shopping" aria-hidden="true"></i></Button>
          </div>
        </Card.Body>
      </Card>
      </Col>
    )):<div className="mt-5" style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
    <img src="https://moein.video/wp-content/uploads/2021/12/Shopping-Cart-GIF-Royalty-Free-Animated-Icon-350px-after-effects-project.gif" alt="" />
    <h1 className='text-danger'>Your Wishlist Is Empty</h1>
  </div>  
      }
      </Row>
      </div>
    </>
  )
}

export default Wishlist
