import {useState} from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../Layout';
import {login} from '../../api/apiAuth';
import {showError, showLoading} from '../../utils/messages';
import { authenticate } from '../../utils/auth'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
    });

    const { email, password, loading, error, redirect, disabled } = values;

    const handleChange = event => {
        setValues({
            ...values,
            error:false,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event =>{
        event.preventDefault();
        setValues({
            ...values,
            loading:true,
            error:false,
            disabled:true,
        }) 
        login({email,password})
            .then(response => {
                authenticate(response.data.token, ()=>{
                    setValues({
                        email: '',
                        password: '',
                        error:false,
                        loading:false,
                        disabled:false,
                        redirect:true,
                    })
                })
            })
            .catch( err => {
                let errMsg = ""
                if(err.response){
                    errMsg = err.response.data;
                }
                else{
                    errMsg = "Something Went Wrong"
                }
                setValues({
                    ...values,
                    loading:false,
                    disabled:false,
                    error:errMsg
                })
            })
        
    }

    const signInForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>
    );

    const redirectUser = ()=> {
        if(redirect) return <Redirect to="/" />
    }
    return(
        <Layout title="Login" className="container col-md-8">
            {redirectUser()}
            {showLoading(loading)}
            {showError(error,error)}
            <h3>Login Here</h3>
            <hr />
            {signInForm()}
            <hr />

        </Layout>
    )
}

export default Login;