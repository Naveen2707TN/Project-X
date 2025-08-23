import { useState } from 'react';
import res from '../Css/reset.module.css';
import { useNavigate } from 'react-router-dom';
function Reset(){

    const[show, setShow] = useState(true);
    const[shows, setShows] = useState(true);
    const[pass, setPass] = useState('');
    const[err, getErr] = useState('');
    const[newpas, setNewpass] = useState('');
    const url = new URLSearchParams(window.location.search);
    const token = url.get('token');
    const navigate = useNavigate();

    function showPass(){
        setShow(!show);
    }

    function showPasss(){
        setShows(!shows);
    }

    function ResetPassword(){
        console.log(token)
        fetch(`http://localhost:8080/public/api/v1/verify-user`,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "token" : token,
                "pass" : pass,
                "newPass" : newpas
            })
        }).then( async(res) => {
            let data = res.text();
            if(res.ok){
                navigate('/');
            }else{
                getErr(data);
            }
        }).catch((err) => console.log(err));
    }

    return(
        <div className={res.main}>
            <h2>Reset Password</h2>
            <div className={res.inp}>
                <div className={res.pass}>
                    <img alt='icon' src='/reset-password.png' className={res.icon} />
                    <input type={shows ? 'password' : "text"} placeholder='Enter the new password here' className={res.passw} onChange={(e) => {setPass(e.target.value)}} />
                    <div className={res.sh}>
                        <img alt='x-icon' className={res.ico} src={shows ? '/hide.png' : "/view.png"} onClick={(e) => {showPasss()}} />
                    </div>
                </div>
                <div className={res.pass}>
                    <img alt='icon' src='/reset-password.png' className={res.icon} />
                    <input type={show ? 'password' : "text"} placeholder='Confirm the new password here' className={res.passw} onChange={(e) => {setNewpass(e.target.value)}} />
                    <div className={res.sh}>
                        <img alt='x-icon' className={res.ico} src={show ? '/hide.png' : "/view.png"} onClick={(e) => {showPass()}} />
                    </div>
                </div>
                <label>{err}</label>
                <div className={res.btns}>
                    <input type='button' value={"Reset Password"} className={res.btn} onClick={(e) => {ResetPassword()}}/>
                </div>
            </div>
        </div>
    )
}
export default Reset;