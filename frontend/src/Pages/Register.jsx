import RegisterData from '../Component/RegisterData';
import reg from '../Css/register.module.css';
function Register(){
    return(
        <div className={reg.main}>
            <div className={reg.left}>
                <RegisterData />
            </div>
            <div className={reg.right}>
                <img src='/det.png' alt='icons' className={reg.img} />
            </div>
        </div>
    )
}
export default Register;