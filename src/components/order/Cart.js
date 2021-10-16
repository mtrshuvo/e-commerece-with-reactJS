import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteCartItem, getCartItems } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import CartItem from './CartItem';
import {updateCartItem} from '../../api/apiOrder'
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(false);

    const loadCart = () => {
        const {token} = userInfo();
        getCartItems(token).then(response => setCartItems(response.data))
        .catch(err => {})
    }
    useEffect(()=> {
        loadCart();
    },[]);

    const increase = item => ()=>{
        if (item.count === 5) return
        const cartItem = {
            ...item,
            count: item.count + 1
        }
        updateCartItem(userInfo().token, cartItem)
        .then(response => loadCart())
        .catch(err => { })
    }
    const decrease = item => ()=>{
        if (item.count === 1) return
        const cartItem = {
            ...item,
            count: item.count - 1
        }
        updateCartItem(userInfo().token, cartItem)
        .then(response => {loadCart()})
        .catch(err => { })
    }

    const getTotal = ()=>{
        const arr = cartItems.map(item => item.price * item.count);
        return arr.reduce((a,b) => {return a+b},0);
    }

    const removeItem = item => () =>{
        if(!window.confirm("Confirm to delete?")) return;
        deleteCartItem(userInfo().token,item)
        .then(response => loadCart())
        .catch(err => {})
    }

    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link href="#">Order</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item,i)=>(<CartItem
                        increase={increase(item)} 
                        decrease={decrease(item)} 
                        removeItem={removeItem(item)} 
                        item={item} serial={i+1} 
                        key={item._id} />))}
                        {cartItems.length > 0 ? (<>
                            <tr>
                            <th scope="row" />
                            <td colSpan={3} style={{fontWeight:"bold"}}>Total</td>
                            <td align="right" style={{fontWeight:"bold"}}>৳{getTotal()} </td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right">
                                <Link to="/"><button className="btn btn-warning mr-4">Continue Shoping</button></Link>
                                <Link to="/shipping" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                        </tr>
                        </>): <div style={{width:"100%",fontWeight:"bolder"}}>Nothing Here.</div>}
                        
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Cart;