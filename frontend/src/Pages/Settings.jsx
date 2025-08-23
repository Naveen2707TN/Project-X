import { useEffect, useState } from "react";
import set from "../Css/set.module.css";
import { useNavigate } from "react-router-dom";
import Load from "../Component/load";

function Settings() {

    const[data, getData] = useState({});
    const[size, setSize] = useState('0 Mb');
    const navigate = useNavigate();
    const[bool, checkBool] = useState(false);

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

    const space = parseFloat(size.replace("Mb","").trim());
    const rem = 100 - space;

    function GetData(){
        fetch(`http://localhost:8080/private/api/v1/users`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                return res.json();
            }
        }).then((data) => getData(data)
        ).catch((err) => console.log(err));
    }

    function ResetPass(){
        checkBool(true);
        fetch(`http://localhost:8080/private/api/v1/reset-acc`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                checkBool(false);
                alert("mail send");
            }
        }).catch((err) => {console.log(err)});
    }

    function Delete(){
        fetch(`http://localhost:8080/private/api/v1/delete-acc`,{
            method: "DELETE",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.ok){
                localStorage.removeItem('token');
                localStorage.removeItem('data');
                navigate('/');
            }
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        GetData();
        GetStorage();
    },[])

  return (
    <div className={set.main}>
        {bool && <Load />}
        <div className={set.mains}>
            <div className={set.left}>
                <div className={set.box1}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2 >User Profile</h2>
                        </div>
                        <div className={set.conta}>
                            <div className={set.r1}>
                                <div className={set.name}>
                                    <label>user name : {data.name}</label>
                                </div>
                                <div className={set.name}>
                                    <label>email id : {data.email}</label>
                                </div>
                                <div className={set.name}>
                                    <label>Craeted At : {data.created}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={set.box2}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2>Security</h2>
                        </div>
                        <div className={set.cont}>
                            <div className={set.dets}>
                                <label>Last Login : {data.login}</label>
                            </div>
                            <div className={set.pass}>
                                <label className={set.namesp}>Rest Password : </label>
                                <button className={set.res} onClick={(e) => {ResetPass()}}>Reset</button>
                            </div>
                            <div className={set.pass}>
                                <label className={set.namesp}>Delete Account : </label>
                                <button className={set.del} onClick={(e) => {Delete()}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={set.right}>
                <div className={set.box3}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2>Storage</h2>
                        </div>
                        <div className={set.cont}>
                            <label>Toatal Space : 100 Mb</label>
                            <label>Available Space : {rem} Mb</label>
                            <label>Used Space : {space} Mb</label>
                        </div>
                    </div>
                </div>

                <div className={set.box4}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2>Credits</h2>
                        </div>
                        <div className={set.cont}>
                            <label>Toatal Credits : 05</label>
                            <label> Spend Credits : 0{5 - data.credits}</label>
                            <label>Availabile Credits : 0{data.credits}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Settings;
