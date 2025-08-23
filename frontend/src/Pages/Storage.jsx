import { useEffect, useState } from 'react';
import stor from '../Css/stor.module.css';
function Storage(){

    const[size, setSize] = useState("0 Mb");
    const[datas, getDatas] = useState([]);

    function GetStorage(){
        fetch(`http:///localhost:8080/private/api/v1/storage`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(async(res) => {
            let data = await res.text();
            if(res.ok){
                setSize(data);
            }
        }).catch((err) => console.log(err));
    }

    function ListFiles(){
        fetch(`http://localhost:8080/private/api/v1/data`,{
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                return res.json();
            }
        }).then((data) => {
            getDatas(data);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        GetStorage();
        ListFiles();
    },[]);
        let remSpace = parseFloat(size.replace("Mb" , ""));
        let space = parseInt(remSpace);
    
    return(
        <div className={stor.main}>
            <h2>Cloud File Storage</h2>
            <div className={stor.bars}>
                <div className={stor.space}>
                    <label>Total Space : 100 MB</label>
                </div>
                <div className={stor.bar}>
                    <div className={stor.progress} style={{transform : `translateX(${space - 100}%)`}}>
                    </div>
                </div>
                <div className={stor.cont}>
                    <label>Used Space :  {size}</label>
                    <label>Available Space : {100 - remSpace}</label>
                </div>
            </div>
            <div className={stor.deti}>
                <h2>Space Occupies By Type</h2>
                <table className={stor.table}>
                    <thead className={stor.thead}>
                        <tr className={stor.tr}>
                            <th className={stor.name}>
                                <label className={stor.title}>TYPE</label>
                            </th>
                            <th className={stor.size}>
                                <label className={stor.title}>SIZE</label>
                            </th>
                            <th className={stor.date}>
                                <label className={stor.title}>COUNT</label>
                            </th>
                        </tr>
                        </thead>
                        <tbody className={stor.tbody}>
                            {datas.map((data) => (
                                <tr className={stor.trs} key={data.id}>
                                    <th className={stor.names}>
                                        <label className={stor.titles}>{data.type}</label>
                                    </th>
                                    <th className={stor.sizes}>
                                        <label className={stor.title}>{data.size}</label>
                                    </th>
                                    <th className={stor.dates}>
                                        <label className={stor.title}>{data.count}</label>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
}
export default Storage;