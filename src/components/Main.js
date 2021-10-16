import {Switch, Route} from 'react-router-dom';
import AdminRoute from './privateRoute/AdminRoute';
import AdminDashBoard from './admin/AdminDashBoard';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import PrivateRoute from './privateRoute/PrivateRoute';
import Dashboard from './user/Dashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import ProductDetails from './home/ProductDetails';
import Cart from './order/Cart';
import ShippingAddress from './order/ShippingAddress';
import Checkout from './order/Checkout';
import Payment from './order/Payment';

const Main = () => {
    return (<div>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/cart">
                <Cart />
            </PrivateRoute>
            <PrivateRoute exact path="/shipping">
                <ShippingAddress />
            </PrivateRoute>
            <PrivateRoute exact path="/checkout">
                <Checkout />
            </PrivateRoute>
            <PrivateRoute exact path="/payment">
                <Payment />
            </PrivateRoute>
            <Route path="/product/:id" exact component={ProductDetails} />
            <PrivateRoute exact path="/user/dashboard">
                <Dashboard />
            </PrivateRoute>
            <AdminRoute exact path="/admin/dashboard">
                <AdminDashBoard />
            </AdminRoute>
            <AdminRoute exact path="/create/category">
                <CreateCategory />
            </AdminRoute>
            <AdminRoute exact path="/create/product">
                <CreateProduct />
            </AdminRoute>
        </Switch>
    </div>)
}

export default Main;