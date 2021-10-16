import {useState, useEffect} from 'react'
import Layout from '../Layout';
import Card from './Card';
import CheckBox from '../home/CheckBox';
import Radio from './Radio';
import {prices} from '../../utils/prices';
import {showError, showSuccess} from '../../utils/messages'
import {getProducts, getFilteredProducts, getCategories} from '../../api/apiProduct'
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../../api/apiOrder';

const Home = (props)=>{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [order, setOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("createdAt");
    const [limit, setLimit] = useState(30)
    const [skip, setSkip] = useState(0)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({category: [], price: []});

    useEffect(()=>{
        getProducts(sortBy, order, limit)
        .then(response => {
            setProducts(response.data)
        })
        .catch(err =>{
            setError("Failed to load products")
        });

        getCategories().then(response => {
            setCategories(response.data)
        })
        .catch(err =>{
            setError("Failed to load Categories")
        })

        
    },[])

    const handleFilters = (myFilters, filtersBy) => {
        const newFilters = {...filters};
        if (filtersBy === 'category'){
            newFilters[filtersBy] = myFilters;
        }
        if (filtersBy === 'price'){
            const data = prices;
            let arr = [];
            for (let i in data){
                if(data[i].id === parseInt(myFilters)){
                    arr = data[i].arr;
                }
            }
            newFilters[filtersBy] = arr;
        }
        setFilters(newFilters);
        getFilteredProducts(skip,sortBy, order, limit, newFilters)
        .then(response => setProducts(response.data))
        .catch(err => setError("Failed to load !!!"))
    }

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

   const showFilters = () => {
        return(
            <>
            <div className= "row">
                <div className='col-sm-3'>
                    <h5>Filter By Categories</h5>
                    <ul>
                    <CheckBox 
                        categories={categories}
                        handleFilters={ myFilters =>
                            handleFilters(myFilters, 'category')
                        } />
                    </ul>
                </div>
                <div className="col-sm-5">
                <h5>Filter By Prices</h5>
                    <div className="row">
                        <Radio 
                            prices={prices}
                            handleFilters={ myFilters =>
                                handleFilters(myFilters, 'price')
                            } />
                    </div>
                </div>
            </div>
            </> )
   }

    return(
        <Layout title="Home Page" className="container-fluid">
            <div style={{width: "100%"}} >
                {showError(error, error)}
                {showSuccess(success, "Added to cart")}
            </div>
            <div className="container">
            {showFilters()}
            </div>
            <div className="row">
                {products && products.map(product =><Card product={product}
                handleCart={handleCart(product)} key={product._id} />)}
            </div>
        </Layout>
    )
}

export default Home;