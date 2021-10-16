import { useEffect, useState } from "react";


const CheckBox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);
    const checkedId = [...checked];

    const handleCheck = id => ()=>{
        const foundId = checked.indexOf(id);
        if(foundId === -1){
            checkedId.push(id);
        }
        else{
            checkedId.splice(foundId,1);
        }
        setChecked(checkedId);
        handleFilters(checkedId);
    }
    // useEffect(()=>{
    // },[checked])

    return categories.map(category => (<li className="list-unstyled" key={category._id}>
        <input type="checkbox"
         onChange={handleCheck(category._id)}
         value={checked.indexOf(category._id === -1)}
          className="form-check-input" />
        <label className="form-check-label">{category.name}</label>
    </li>))
}

export default CheckBox;