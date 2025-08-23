import reg from '../Css/reg.module.css';
import {useRef, useState} from 'react'
import Load from './load';
import { useNavigate } from 'react-router-dom';
function RegisterData(){

    const[show, showPass] = useState(false);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[err, getErr] = useState('');
    const[check, isCheck] = useState(false);

    const navigate = useNavigate();
    const refs = useRef(); 

    function LoginUser(){
        isCheck(true);
        fetch(`http://localhost:8080/public/api/v1/reg`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "name" : name,
                "email" : email,
                "pass" : pass
            })
        }).then( async (res) => {
            let data = await res.text();
            if(res.ok){
                isCheck(false);
                localStorage.setItem("data", data);
                navigate("/verify")
            }else{
                isCheck(false);
                getErr(data);
            }
        }).catch((err) => console.log(err));
    }
    
    function ShowHide(){
        showPass(!show);
   }
    
    return(
        <div className={reg.main}>
            <title>Sign In</title>
            <div className={reg.head}>
                <img alt='rego' src='/sharing.png' className={reg.logo} />
                <label className={reg.title}>Cloud Share</label>
            </div>
            <div className={reg.mid}>
                <h2>Welcone User ! <br></br> Create a Account to Start </h2>
                    <div className={reg.form}>
                        <div className={reg.email_div}>
                            <img alt='icons' src='/users.png' className={reg.icon} />
                            <input type='text' placeholder='Enter the user name' className={reg.email} onChange={(e) => {setName(e.target.value)}} ref={refs} />
                        </div>
                        <div className={reg.email_div}>
                            <img alt='icons' src='/gmail.png' className={reg.icon} />
                            <input type='email' placeholder='Enter your email id' className={reg.email} onChange={(e) => {setEmail(e.target.value)}} />
                        </div>
                        <div className={reg.pass_div}>
                            <img alt='icons' src='/password.png' className={reg.icon} />
                            <input type={show ? "text" : "password"} placeholder='Create your password' className={reg.pass} onChange={(e) => {setPass(e.target.value)}} />
                            <div className={reg.pass_sh}>
                                <img alt='icon' src={show ? "/view.png" : "/hide.png"} className={reg.sh} onClick={(e) => {ShowHide()}} />
                            </div>
                        </div>
                        {check && <Load />}
                        <label className={reg.err}>{err}</label>
                        <div className={reg.btns}>
                            <input type='button' value={"Sign In"} className={reg.btn} onClick={(e) => {LoginUser()}}/>
                        </div>
                    </div>
                </div>
            <div className={reg.bot}>
                <label className={reg.det}>I have a account already ? </label>
                <a href='/' className={reg.a}>Sign In</a>
            </div>
        </div>
    )
}
export default RegisterData;