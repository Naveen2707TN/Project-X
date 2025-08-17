import { useState } from 'react';
import log from '../Css/log.module.css';
function LoginData(){

    const[show, showPass] = useState(true);

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
                        <input type='email' placeholder='Enter your email id' className={log.email} />
                    </div>
                    <div className={log.pass_div}>
                        <img alt='icons' src='/password.png' className={log.icon} />
                        <input type={show ? "password" : "text"} placeholder='Enter your password' className={log.pass} />
                        <div className={log.pass_sh}>
                            <img alt='icon' src={show ? "/view.png" : "/hide.png"} className={log.sh} onClick={(e) => {ShowHide()}} />
                        </div>
                    </div>
                    <label className={log.err}></label>
                    <div className={log.btns}>
                        <label className={log.for}>Forget Password ?</label>
                        <input type='button' value={"Sign In"} className={log.btn} />
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