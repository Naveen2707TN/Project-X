import {useState } from 'react';
import ver from '../Css/verify.module.css';
function VerifyUi(){

    const[otp, getOTP]= useState('');
    const[err, setErr] = useState('');

    function VerifyUser(){
        fetch(`http://localhost:8080/api/public/v1/verify?Code=${otp}`,{
            headers:{
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then( async (res) => {
            let data = await res.text();
            if(res.ok){

            }else{
                setErr(data);
            }
        }).catch((errs) => console.warn(err));
    }

    return(
        <div className={ver.main}>
            <div className={ver.head}>
                <img src='/communication.png' alt='icon' className={ver.logo} />
                <label className={ver.txt}>Chats App</label>
            </div>
            <div className={ver.cont}>
                <div className={ver.det}>
                    <h3 className={ver.label}>OTP Verification</h3>
                    <img alt='icon' src='/email.png' className={ver.icon}/>
                    <label>Please Enter the OTP (One Time Password) sent your registred email id to complete the verfication process</label>
                    <label className={ver.err}></label>
                    <input type='text' max={"6"} placeholder='Enter the OTP code here' className={ver.otp} onChange={(e) => {getOTP(e.target.value)}} />
                    <input type='button' value={"Verify"} className={ver.btn} onClick={(e) => {VerifyUser()}}/>
                </div>
            </div>
        </div>
    )
}
export default VerifyUi;