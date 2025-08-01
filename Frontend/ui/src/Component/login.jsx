import log from '../Css/login.module.css';
function LoginUi(){
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
                            <input type='email' placeholder='Enter your email id ' className={log.email} />
                        </div>
                        <div className={log.pass_div}>
                            <img src='/password.png' alt='icons' className={log.icons} />
                            <input type='password' placeholder='Enter your password ' className={log.pass} />
                        </div>
                        <label className={log.err}></label>
                        <div className='btn'>
                            <input type='button' value={"Sign In"} className={log.btns} />
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