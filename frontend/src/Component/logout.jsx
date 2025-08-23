import { useNavigate } from 'react-router-dom';
import out from '../Css/out.module.css';
function Logout(){

    const navigate = useNavigate();

    function yes(){
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        navigate('/');
    }

    function no(){
        navigate('/home');
    }

    return(
        <div className= {out.main}>
            <div className={out.cont}>
                <p className={out.p}>Are you sure you need to Logout now ?</p>
                <div className={out.opt}>
                    <button className={out.yes} onClick={(e) => {yes()}}>Yes</button>
                    <button className={out.no} onClick={(e) => {no()}} >No</button>
                </div>
            </div>
        </div>
    )
}
export default Logout;