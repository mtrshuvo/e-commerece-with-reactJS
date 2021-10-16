import { useEffect, useState } from "react";

const Radio = ({prices, handleFilters}) => {

    const handleChange = e =>{
        handleFilters(e.target.value)
    }

    return(
        prices.map( price => (<div className="col-6" key={price.id}>
            <input className="mr-2"
            type="radio"
            value={price.id}
            name="price_filter"
            onChange={handleChange}
            />
            <label className="form-check-label mr-4">{price.name}</label>

        </div>)
        )
    )
}

export default Radio;