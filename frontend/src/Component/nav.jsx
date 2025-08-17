import {NavLink} from 'react-router-dom'
import nav from '../Css/nav.module.css';
function NavBar(){
    return(
        <div className={nav.main}>
            <NavLink to={"/home"} className={nav.NavLink}>
                <div className={nav.ui}>
                    <div className={nav.left}>
                        <img alt='icons' src='/dashboard.png' className={nav.icon} />
                    </div>
                    <div className={nav.right}>
                        <label className={nav.name}>Dashboard</label>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"/home/upload"} className={nav.NavLink}>
                <div className={nav.ui}>
                    <div className={nav.left}>
                        <img alt='icons' src='/upload.png' className={nav.icon} />
                    </div>
                    <div className={nav.right}>
                        <label className={nav.name}>Upload</label>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"/home/files"} className={nav.NavLink}>
                <div className={nav.ui}>
                    <div className={nav.left}>
                        <img alt='icons' src='/folder.png' className={nav.icon} />
                    </div>
                    <div className={nav.right}>
                        <label className={nav.name}>Files</label>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"/home/settings"} className={nav.NavLink}>
                <div className={nav.ui}>
                    <div className={nav.left}>
                        <img alt='icons' src='/Setting.png' className={nav.icon} />
                    </div>
                    <div className={nav.right}>
                        <label className={nav.name}>Settings</label>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"/home"} className={nav.NavLink}>
                <div className={nav.ui}>
                    <div className={nav.left}>
                        <img alt='icons' src='/logout.png' className={nav.icon} />
                    </div>
                    <div className={nav.right}>
                        <label className={nav.name}>Logout</label>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
export default NavBar;