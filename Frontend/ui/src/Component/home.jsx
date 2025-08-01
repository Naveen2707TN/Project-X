import home from '../Css/home.module.css';
function HomeUi(){
    return(
        <div className={home.main}>
            <div className={home.head}>
                <div className={home.hl}>
                    <img src='/communcation.png'alt='icon' className={home.logo} />
                </div>
            </div>
            <div className={home.cross}>

            </div>
            <div className={home.cont}>
                <div className={home.det}>
                    <div className={home.left}>

                    </div>
                    <div className={home.right}>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeUi;