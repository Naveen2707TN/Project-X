import files from '../Css/files.module.css';
function Files(){
    return(
        <div className={files.main}>
            <div className={files.head}>
                <div className={files.left}>
                    <img alt='icons' src='/folder.png' className={files.icon} />
                    <img alt='arrow' src='/arrow.png' className={files.arrow} />
                    <label className={files.name}>Naveen</label>
                </div>
                <div className={files.right}>
                    <div className={files.search}>
                        <div className={files.sear}>
                            <img alt='x-iocn' src='/magnifier.png' className={files.sicon} />
                            <input type='text' placeholder='Search' className={files.se} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Files;