import load from '../Css/load.module.css';
function Load(){
    return(
        <div className={load.main}>
            <div className={load.loader}>
                <div className={load.spin}>
                </div>
                <label>Please wait . . .</label>
            </div>
        </div>
    )
}
export default Load;