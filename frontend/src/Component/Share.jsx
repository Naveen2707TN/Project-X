import { useEffect, useState } from 'react';
import sha from '../Css/Share.module.css'
import QRCode from 'react-qr-code';
function Share({ bool, onClose, id }) {

  const[link, generateLink] = useState('please wait link will generate');
  const[duration, setDuration] = useState(12);

  function FetchData(value){
    console.log(value);
    fetch(`http://localhost:8080/private/api/v1/share?id=${id}&hours=${duration}`,{
      method: "GET",
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem(`token`)}`
      }
    }).then((res) => {
      if(res.ok){
        return res.text();
      }
    }).then((data) => {
      generateLink(data);
    }).catch((err) => console.log(err));
  }

  function handlechange(e){
    const value = parseInt(e.target.value);
    setDuration(value);
    FetchData(value);
  }

  useEffect(() => {
    FetchData(duration);
  },[]);

  return (
    <div className={sha.main} style={{ display: bool ? "flex" : "none" }}>
      <div className={sha.mains}>
        <button className={sha.btn} onClick={onClose}>
          Close
        </button>
        <div className={sha.head}>
          <h2 className={sha.h2}>Share</h2>
        </div>
        <div className={sha.options}>
          <div className={sha.opt}>
            <div className={sha.left}>
              <div className={sha.title}>
                <h2 className={sha.h2}>Set Time</h2> 
              </div>
              <div className={sha.ti}>
                <input type="radio" name="duration" className={sha.val} value="12" checked={duration === 12} onChange={handlechange} /> 12 hours
                <input type="radio" name="duration" className={sha.val} value="24" checked={duration === 24} onChange={handlechange}  /> 24 hours
                <input type="radio" name="duration" className={sha.val} value="48" checked={duration === 48} onChange={handlechange}  /> 48 hour
              </div>
            </div>
            <div className={sha.right}>
              <QRCode width={200} bgColor='white' fgColor='black' value={link} />
            </div>
          </div>
          <div className={sha.link}>
            <div className={sha.lin}>
              <label className={sha.links}>{link}</label>
              <button className={sha.copy} onClick={(e) => {navigator.clipboard.writeText(link)}}>Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;