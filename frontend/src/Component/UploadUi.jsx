import { useState } from 'react';
import up from '../Css/up.module.css';
function UploadUi(){

    const[name, setNames] = useState('Upload your files max 10 Mb');

    function setName(e){
        if(e.target.files[0] != null){
            setNames(e.target.files[0].name);
        }
    }

    return(
        <div className={up.main}>
            <div className={up.head}>
                <img alt='icons' src='/upload.png' className={up.icons} />
                <label className={up.label}>Upload Files</label>
            </div>
            <div className={up.upload}>
                <input type='file' multiple={false} id='file' className={up.files} onChange={(e) => {setName(e)}} />
                <label htmlFor='file' className={up.name}>
                    {name}
                </label>
            </div>
            <input type='button' value={"Upload"} className={up.btn} />
        </div>
    )
}
export default UploadUi;