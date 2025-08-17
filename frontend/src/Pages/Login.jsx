import LoginData from '../Component/LoginData';
import login from '../Css/Login.module.css';
function LoginUi(){
    return(
        <div className={login.main}>
            <div className={login.left}>
                <LoginData />
            </div>
            <div className={login.right}>
                <img src='/det.png' alt='icons' className={login.img} />
            </div>
        </div>
    )
}
export default LoginUi;