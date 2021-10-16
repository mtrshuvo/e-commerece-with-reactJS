import {useState} from 'react'
import {Link} from 'react-router-dom'
import {showError, showLoading, showSuccess} from '../../utils/messages';
import Layout from '../Layout';
import {createCategory} from '../../api/apiAdmin'
import { userInfo } from '../../utils/auth';

const CreateCategory = () => {
    const [values, setValues] = useState({
        name: "",
        error:false,
        success:false,
        loading:false,

    })
const {name, error, loading, success} = values;
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
            error:false
        })
    }
    const handleSubmit = event =>{
        event.preventDefault();
        setValues({
            ...values,
            loading:true,
            error:false,
            success:false
        })
        let {token} = userInfo();
        createCategory(token, {name: name})
        .then(response =>{
            setValues({
                ...values,
                name:"",
                loading:false,
                success:true,
                error:false
            })
        })
        .catch(err => {
            let errMsg = "";
            if(err.response){
                errMsg = err.response.data;
            }
            else{
                errMsg = "Something Went Wrong"; 
            }

            setValues({
                ...values,
                error:errMsg,
                loading:false,
                success:false
            })
        })

    }

    const categoryCreationForm = ()=> {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text"
                    name="name"
                    autoFocus
                    required
                    className="form-control" 
                    placeholder="Add new Category" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create Category</button>
            </form>
        )
    }
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Go To Dashboard</Link>
        </div>
    )

    return(
       <Layout title="Add Category"  description="Ready to add a new category?">
           <div className="col-md-8 offset-md-2">
               {showLoading(loading)}
               {showError(error,error)}
               {showSuccess(success,"Created Successfully")}
               {categoryCreationForm()}
               {goBack()}

           </div>
       </Layout>
    )
}

export default CreateCategory;