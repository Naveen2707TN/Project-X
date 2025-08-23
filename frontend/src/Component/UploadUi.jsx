import { useState } from 'react';
import up from '../Css/up.module.css';
import Load from './load';
import { useOutletContext } from 'react-router-dom';
function UploadUi(){

    const[name, setNames] = useState('Upload your files max 10 Mb');
    const[file, filename] = useState();
    const[bool, checkbool] = useState(false);
    const{cred, setcred} = useOutletContext();

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
            }
        }).then((data) => setcred(data)
        ).catch((err) => console.log(err));
    }
    
    const formdata = new FormData();
    function Upload(){
        checkbool(true);
        formdata.append("file",file);
        fetch(`http://localhost:8080/private/api/v1/upload`,{
            method: "POST",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
            body: formdata
        }).then((res) => {
            if(res.ok){
                Credits();
                checkbool(false);
                alert("file uploaded");
            }else{
                checkbool(false);
                alert("failed to upload");
            }
        }).catch((err) => console.log(err));
    }

    function setName(e){
        if(e.target.files[0].size < 10485760 ){
            if(e.target.files[0] != null){
                setNames(e.target.files[0].name);
                filename(e.target.files[0]);
            }
        }else{
            setNames("file size is above 10 mb ");
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
            {bool && <Load />}
            <input type='button' value={"Upload"} className={up.btn}  onClick={(e) => {Upload()}}/>
        </div>
    )
}
export default UploadUi;