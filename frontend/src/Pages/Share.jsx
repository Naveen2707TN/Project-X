import { useEffect, useState } from 'react';
import sh from '../Css/sha.module.css';
import { useNavigate } from 'react-router-dom';
function Share(){

    const url = new URLSearchParams(window.location.search);
    const token = url.get('Token');
    const[data, setData] = useState({});
    const nnav = useNavigate();
    function FetchData(){
        console.log(token);
        fetch(`http://localhost:8080/public/api/v1/verify?Token=${token}`,{
            method: "GET"
        }).then( async (res) => {
            console.log(data);
            if(res.ok){
                return res.json();
            }
        }).then((data) => {
            setData(data);
            if(data === null){
                nnav('/err');
            }
        })
        .then((err) => {console.log(err)}).catch((err) => console.error(err));
    }

    function Download(){
        fetch(`http://localhost:8080/public/api/download?token=${token}`,{
        }).then(async (response) => {
            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const disposition = response.headers.get("Content-Disposition");

            let fileName = "downloaded-file";
            if (disposition && disposition.includes("filename=")) {
                const matches = /filename="?(.+)"?/.exec(disposition);
                if (matches != null && matches[1]) fileName = matches[1];
            }

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);

            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(link.href);
        })
        .catch(err => {
            console.error(err);
            alert("Download failed");
        });
    }

    useEffect(() => {
        FetchData();
    },[]);
    
    return(
        <div className={sh.main}>
            <div className={sh.head}>
                <img alt='x-icon' src='/sharing.png' className={sh.icon} />
                <label className={sh.title}>Cloud Share</label>
            </div>
            <div className={sh.mains}>
                <label className={sh.sha}>Share by : {data.email}</label>
                <div className={sh.file}>
                    <img alt='icon' className={sh.ico} src='/file.png'/>
                    <label className={sh.name}>{data.fileName}</label>
                    <label className={sh.name}>{data.fileSize}</label>
                    <button className={sh.dwnlo} onClick={(e) => {Download()}}>Download File</button>
                </div>
            </div>
        </div>
    )
}
export default Share;