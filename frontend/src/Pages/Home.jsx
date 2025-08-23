import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../Component/nav';
import hom from '../Css/home.module.css';
import { useEffect, useState } from 'react';
function Home(){
    const url = new URLSearchParams(window.location.search);
    const name = url.get('name');
    const age = url.get('age');
    console.log(name,age);

    const[cred, setcred] = useState({});
    const navigate = useNavigate();
    function Credits(){
        fetch(`http://localhost:8080/private/api/v1/users`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                localStorage.removeItem('data');
                return res.json();
            }else{
                localStorage.removeItem('token');
                localStorage.removeItem('data');
                navigate('/');
            }
        }).then((data) => setcred(data)
        ).catch((err) => console.log(err));
    }

    function CheckValid(){
        let value = localStorage.getItem('token');
        if(value === null){
            navigate('/');
        }
    }

    useEffect(() => {
        Credits();
        CheckValid();
    },[])

    return(
        <div className={hom.main}>
            <div className={hom.head}>
                <div className={hom.le}>
                    <img alt='icons' src='/sharing.png' className={hom.logo} />
                    <label className={hom.title}>Cloud Share</label>
                </div>
                <div className={hom.ri}>
                    <div className={hom.names}>
                        <img alt='icon' className={hom.icon} src='/credits.png' />
                        <label className={hom.name}>Credits : 0{cred.credits}</label>
                    </div>
                    <div className={hom.names}>
                        <img alt='icon' className={hom.icon} src='/users.png' />
                        <label className={hom.name}>{cred.name}</label>
                    </div>
                </div>
            </div>
            <div className={hom.cont}>
                <div className={hom.left}>
                    <NavBar />
                </div>
                <div className={hom.right}>
                    <Outlet context={{cred, setcred}} />
                </div>
            </div>
        </div>
    )
}
export default Home;