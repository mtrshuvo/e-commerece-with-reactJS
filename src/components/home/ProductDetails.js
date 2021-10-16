import Layout from "../Layout";
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {showSuccess, showError} from '../../utils/messages'
import {getProductById} from '../../api/apiProduct'
import { API } from "../../utils/config";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";


const ProductDetails = (props) => {
    const [product, setProducts] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        const id = props.match.params.id;
        getProductById(id)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products"))
    },[])
    const handleCart = product => () =>{
        if(isAuthenticated()){
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            const {token} = userInfo();
            addToCart(token, cartItem)
            .then(response => setSuccess(true))
            .catch(err => {
                if(err.response) setError(err.response.data);
                else setError("Failed to add cart item")
            })

        }
        else{
            setSuccess(false);
            setError("Please Login First");
        }

    }


    return(
        <Layout title="Product Details" cl>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link href="#">Product</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, 'Item Added to Cart!')}
                {showError(error, error)}
            </div>
            <div className="row container">
                <div className="col-6">
                    <img src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    width="100%"  />
                </div>
                
            <div className="col-6">
                <h3>{product.name}</h3>
                <span style={{fontSize:20}}>&#2547;</span>{product.price}
                <p>
                {product.quantity ? 
                (<span className="badge badge-pill badge-primary">In Stock</span>)
                :(<span class="badge badge-pill badge-danger">Out of Stock</span>)}
                </p>
                <p>{product.description}</p>
                {product.quantity ? <>&nbsp;<button className="btn btn-outline-primary btn-md" onClick={handleCart(product)}>Add to Cart</button></> : ""}
            </div>
        </div>
        </Layout>
    )
}

export default ProductDetails;