import reg from '../Css/register.module.css';
function RegisterUi(){
    return(
        <div className={reg.main}>
            <div className={reg.left}>
                <div className={reg.head}>
                    <img src='/communication.png' alt='icon' className={reg.ico} />
                    <label className={reg.lab}>Chats App</label>
                </div>
                <div className={reg.mid}>
                    <div className={reg.h}>
                        <h3 className={reg.labe}>Welcome! Create Your Account to Get Started.</h3>
                    </div>
                    <div className={reg.from}>
                        <div className={reg.name_div}>
                            <img src='/user.png' alt='icons' className={reg.icons} />
                            <input type='text' placeholder='Enter the user name ' className={reg.name} />
                        </div>
                        <div className={reg.email_div}>
                            <img src='/gmail.png' alt='icons' className={reg.icons} />
                            <input type='email' placeholder='Enter the email id ' className={reg.email} />
                        </div>
                        <div className={reg.pass_div}>
                            <img src='/password.png' alt='icons' className={reg.icons} />
                            <input type='password' placeholder='Create your password ' className={reg.pass} />
                        </div>
                        <label className={reg.err}></label>
                        <div className='btn'>
                            <input type='button' value={"Sign Up"} className={reg.btns} />
                        </div>
                    </div>
                </div>
                <div className={reg.bottom}>
                    <label>i have a account already ?</label>
                    <a href='/login' className={reg.log}>Sign In</a>
                </div>
            </div>
            <div className={reg.right}>
                <img src='/det.png' alt='icon' className={reg.icon} />
            </div>
        </div>
    );
}
export default RegisterUi;