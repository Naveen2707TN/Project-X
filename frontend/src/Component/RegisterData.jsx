import reg from '../Css/reg.module.css';
import {useState} from 'react'
function RegisterData(){

    const[show, showPass] = useState(true);
    
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
                            <input type='email' placeholder='Enter the user name' className={reg.email} />
                        </div>
                        <div className={reg.email_div}>
                            <img alt='icons' src='/gmail.png' className={reg.icon} />
                            <input type='email' placeholder='Enter your email id' className={reg.email} />
                        </div>
                        <div className={reg.pass_div}>
                            <img alt='icons' src='/password.png' className={reg.icon} />
                            <input type={show ? "password" : "text"} placeholder='Create your password' className={reg.pass} />
                            <div className={reg.pass_sh}>
                                <img alt='icon' src={show ? "/view.png" : "/hide.png"} className={reg.sh} onClick={(e) => {ShowHide()}} />
                            </div>
                        </div>
                        <label className={reg.err}></label>
                        <div className={reg.btns}>
                            <input type='button' value={"Sign In"} className={reg.btn} />
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