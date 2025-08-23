import { useEffect, useRef, useState } from 'react';
import log from '../Css/log.module.css';
import Load from './load';
import { useNavigate } from 'react-router-dom';
function LoginData(){

    const[show, showPass] = useState(false);
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[err, getErr] = useState('');
    const[check, isCheck] = useState(false);

    const refs = useRef(); 
    const navigate = useNavigate();

    function checkUser(){
        let data = localStorage.getItem('token');
        if(data != null){
            navigate('/home');
        }
    }

    function ResetPassword(){
        console.log("null");
        isCheck(true);
        if(!email){
            isCheck(false);
            console.log('executing');
            getErr("email requried to forget password !");
        }else{
            fetch(`http://localhost:8080/public/api/v1/rest-link?email=${email}`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
            }).then( async (res) => {
                let data = await res.text();
                if(res.ok){
                    isCheck(false);
                    getErr("we have send a reset password link to your mail");
                }else{
                    isCheck(false);
                    getErr(data);
                }
            }).catch((err) => console.log(err));
            
        }
    }

    function LoginUser(){
        isCheck(true);
        fetch(`http://localhost:8080/public/api/v1/log`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "email" : email,
                "pass" : pass
            })
        }).then( async (res) => {
            let data = await res.text();
            if(res.ok){
                isCheck(false);
                localStorage.setItem("token", data);
                navigate("/home");
            }else{
                isCheck(false);
                getErr(data);
            }
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        refs.current.focus();
        checkUser();
    },[])

    function ShowHide(){
        showPass(!show);
    }

    return(
        <div className={log.main}>
            <title>Sign In</title>
            <div className={log.head}>
                <img alt='logo' src='/sharing.png' className={log.logo} />
                <label className={log.title}>Cloud Share</label>
            </div>
            <div className={log.mid}>
                <h2>Welcone back ! <br></br> Please Login to Continue </h2>
                <div className={log.form}>
                    <div className={log.email_div}>
                        <img alt='icons' src='/gmail.png' className={log.icon} />
                        <input type='email' placeholder='Enter your email id' className={log.email} ref={refs} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className={log.pass_div}>
                        <img alt='icons' src='/password.png' className={log.icon} />
                        <input type={show ? "text" : "password"} placeholder='Enter your password' className={log.pass} onChange={(e) => {setPass(e.target.value)}} />
                        <div className={log.pass_sh}>
                            <img alt='icon' src={show ? "/view.png" : "/hide.png"} className={log.sh} onClick={(e) => {ShowHide()}} />
                        </div>
                    </div>
                    {check && <Load />}
                    <label className={log.err}>{err}</label>
                    <div className={log.btns}>
                        <label className={log.for} onClick={(e) => {ResetPassword()}}>Forget Password ?</label>
                        <input type='button' value={"Sign In"} className={log.btn} onClick={(e) => {LoginUser()}} />
                    </div>
                </div>
            </div>
            <div className={log.bot}>
                <label className={log.det}>I don't have a account already ? </label>
                <a href='/sign-up'>Sign Up</a>
            </div>
        </div>
    )
}
export default LoginData;