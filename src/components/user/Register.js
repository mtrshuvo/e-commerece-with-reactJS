import { useState } from 'react';
import {Link} from 'react-router-dom'
import Layout from '../Layout';
import {showError, showLoading} from '../../utils/messages';
import { register } from '../../api/apiAuth'

const Register = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error: false,
        loading:false,
        disabled:false,
        success:false,
    });
    const {name, email, password, error, disabled, loading, success} = values;

    const handleChange = event => {
        setValues({
            ...values,
            error:false,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error:false,
            loading:true,
            disabled:true
        })

        register({name, email, password})
            .then(response => {
                setValues({
                    name:'',
                    email:'',
                    password:'',
                    loading:false,
                    disabled:false,
                    success:true,
                })
            })
            .catch(err => {
                let errmsg = "";
                if(err.response){
                    errmsg = err.response.data;
                }
                else {
                    errmsg = "Something Went Wrong";
                }
                setValues({
                    ...values,
                    error:errmsg,
                    disabled:false,
                    loading:false
                })
            })

    }

    const signUpForm = ()=> (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input className="form-control" type="text" name="name" value={name}
                onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input className="form-control" type="email" name="email" value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input className="form-control" type="password" name="password" value={password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={disabled}>Create Account</button>
        </form>
    )

    //success message show
    const showSuccess = ()=> {
        if(success) return (
            <div className="alert alert-success">Account Created Successfully. <Link to="/login">Login</Link> </div>
        )
    }
    return(
        <Layout title="Register" className="container col-md-8">
            {showSuccess()}
            {showLoading(loading)}
            {showError(error,error)}
            <h3>Register Here</h3>
            <hr />
            {signUpForm()}
            <hr />
        </Layout>
    )
}

export default Register;