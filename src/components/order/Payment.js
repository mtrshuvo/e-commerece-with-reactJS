
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {userInfo} from "../../utils/auth";
import {initPayment} from "../../api/apiOrder";

export default function Payment() {
    const [sessionSuccess, setSessionSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");

    useEffect(() => {
        initPayment(userInfo().token)
        .then(res => {
            console.log(res);
            if (res.data.status === "SUCCESS"){
                console.log(res.data.GatewayPageURL);
                setSessionSuccess(true);
                setRedirectUrl(res.data.GatewayPageURL);
                setFailed(false);
            }
        }).catch(err=> {
            console.log(err);
            setFailed(true);
            setSessionSuccess(false);
        })
    },[]);

    return (
        <div>
            {sessionSuccess? window.location = redirectUrl: "Payment is Processing DO NOT CLOSE THE TAB"}
            {failed? (<>
            <p>Failed to start payment sessions...</p>
            <Link to="/cart">Go TO Cart</Link>
            </>):""}
        </div>
    )
}
