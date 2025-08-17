import { Outlet } from 'react-router-dom';
import NavBar from '../Component/nav';
import hom from '../Css/home.module.css';
function Home(){
    const url = new URLSearchParams(window.location.search);
    const name = url.get('name');
    const age = url.get('age');
    console.log(name,age);
    return(
        <div className={hom.main}>
            <div className={hom.head}>
                <div className={hom.le}>
                    <img alt='icons' src='/sharing.png' className={hom.logo} />
                    <label className={hom.title}>Cloud Share</label>
                </div>
                <div className={hom.ri}>
                    <div className={hom.name}>
                        <img alt='icon' className={hom.icon} src='/users.png' />
                        <label className={hom.name}>Naveen</label>
                    </div>
                </div>
            </div>
            <div className={hom.cont}>
                <div className={hom.left}>
                    <NavBar />
                </div>
                <div className={hom.right}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Home;