import { useState } from 'react';
import log from '../Css/login.module.css';
function LoginUi(){

    const[email, getEmail] = useState('');
    const[pass, getPass] = useState('');
    const[err, setErr] = useState('');

    function Login(){
        fetch('http://localhost:8080/api/public/log',{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "email" : email,
                "pass" : pass
            })
        }).then( async (res) => {
            let data = await res.text();
            if(res.ok){

            }else{
                setErr(data);
            }
        })
    }

    return(
        <div className={log.main}>
            <div className={log.left}>
                <div className={log.head}>
                    <img src='/communication.png' alt='icon' className={log.ico} />
                    <label className={log.lab}>Chats App</label>
                </div>
                <div className={log.mid}>
                    <div className={log.h}>
                        <h3 className={log.labe}>Welcome Back! Please Sign In to Continue.</h3>
                    </div>
                    <div className={log.from}>
                        <div className={log.email_div}>
                            <img src='/gmail.png' alt='icons' className={log.icons} />
                            <input type='email' placeholder='Enter your email id ' className={log.email} onChange={(e) => {getEmail(e.target.value)}} />
                        </div>
                        <div className={log.pass_div}>
                            <img src='/password.png' alt='icons' className={log.icons} />
                            <input type='password' placeholder='Enter your password ' className={log.pass} onChange={(e) => {getPass(e.target.value)}}/>
                        </div>
                        <label className={log.err}>{err}</label>
                        <div className='btn'>
                            <input type='button' value={"Sign In"} className={log.btns} onClick={(e) => {Login()}} />
                        </div>
                    </div>
                </div>
                <div className={log.bottom}>
                    <label>i don't have a account already ?</label>
                    <a href='/' className={log.log}>Sign Up</a>
                </div>
            </div>
            <div className={log.right}>
                <img src='/det.png' alt='icon' className={log.icon} />
            </div>
        </div>
    );
}
export default LoginUi;