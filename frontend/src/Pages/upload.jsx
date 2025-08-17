import UploadUi from "../Component/UploadUi";
import upload from '../Css/upload.module.css';
function Upload(){
    return(
        <div className={upload.main}>
            <UploadUi />
        </div>
    )
}
export default Upload;