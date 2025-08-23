import { useEffect, useState } from 'react';
import files from '../Css/files.module.css';
import Share from '../Component/Share';
import { useOutletContext } from 'react-router-dom';
function Files(){

    const[data, setData] = useState([]);
    const[check, setCheck] = useState(false);
    const[userid, getid] = useState();
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

    function FetchData(){
        fetch(`http://localhost:8080/private/api/v1/list-files`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if(res.ok){
                return res.json();
            }
        }).then((data) => {
            setData(data);
        }).catch((err) => console.error(err));
    }

    useEffect(() => {
        FetchData();
    },[]);

    function status(){
        setCheck(!check);
    }

    function Download(id){
        fetch(`http://localhost:8080/private/api/v1/download?id=${id}`,{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
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


    function Delete(id){
        fetch(`http://localhost:8080/private/api/v1/delete?id=${id}`,{
            method: "Delete",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                Credits();
                setData((prev => prev.filter(i => i.id !== id)))
                alert('data deleted');
            }
        }).catch((err) => console.log(err));
    }

    return(
        <div className={files.main}>
            <div className={files.head}>
                <div className={files.left}>
                    <img alt='icons' src='/folder.png' className={files.icon} />
                    <img alt='arrow' src='/arrow.png' className={files.arrow} />
                    <label className={files.name_ui}>Naveen</label>
                </div>
                <div className={files.right}>
                    
                </div>
                {check && <Share bool = {check} onClose= {(e) => setCheck(false)} id = {userid} />}
            </div>
            <div className={files.cont}>
                <table className={files.table}>
                    <thead className={files.thead}>
                        <tr className={files.tr}>
                            <th className={files.name}>
                                <label className={files.title}>NAME</label>
                            </th>
                            <th className={files.size}>
                                <label className={files.title}>SIZE</label>
                            </th>
                            <th className={files.date}>
                                <label className={files.title}>CREATED AT</label>
                            </th>
                            <th className={files.share}>
                                <label className={files.title}>SHARE</label>
                            </th>
                            <th className={files.act}>
                                <label className={files.title}>ACTION</label>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={files.tbody}>
                        {
                            data.map((datas) => (
                                <tr className={files.trs} key={datas.id}>
                                    <th className={files.names}>
                                        <label className={files.titles}>{datas.fileName}</label>
                                    </th>
                                    <th className={files.sizes}>
                                        <label className={files.title}>{datas.fileSize}</label>
                                    </th>
                                    <th className={files.dates}>
                                        <label className={files.title}>{datas.date}</label>
                                    </th>
                                    <th className={files.shares}>
                                        <img alt='share' src='/share.png' className={files.share_icon} onClick={(e) => {status(); getid(datas.id)}} />
                                    </th>
                                    <th className={files.acts}>
                                        <img alt='share' src='/web.png' className={files.trash_icon} onClick={(e) => {Download(datas.id)}} />
                                        <img alt='share' src='/trash.png' className={files.trash_icon} onClick={(e) => {Delete(datas.id)}} />
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Files;