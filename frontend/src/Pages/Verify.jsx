import { useEffect, useRef, useState } from 'react';
import ver from '../Css/verify.module.css';
import {useNavigate} from 'react-router-dom';
function Verify(){

    const refs = useRef();
    const[time, setTime] = useState(300000);
    const navigate = useNavigate();

    useEffect(()=> {
        refs.current.focus();
        setTimeout(() => {
            setTime(time - 1000);
        }, 1000)
    },[time]);

    if(time === 0){
        navigate("/sign-up");
        return 0;
    }

    function GetTimes(MilliSeconds){
        let Seconds_milli = parseInt(Math.floor(MilliSeconds / 1000));
        let Minutes_sec = parseInt(Math.floor(Seconds_milli / 60));

        let Seconds = parseInt(Seconds_milli % 60);
        let Minutes = parseInt(Minutes_sec % 60);
        let format = Seconds < 10 ? "0" + Seconds : Seconds;
        return `${Minutes} : ${format}`;
    }

    const getTime = time <= 60000; 
    console.log(getTime);
    return(
        <div className={ver.main}>
            <div className={ver.head}>
                <img alt='icons' src='/sharing.png' className={ver.logo} />
                <label className={ver.title}>Cloud Share</label>
            </div>
            <div className={ver.bot}>
                <div className={ver.cont}>
                    <h2>Verification</h2>
                    <img alt='icons' src='/email.png' className={ver.icon} />
                    <p>we have a sent a otp to your email id. start with navexxxxxxx@gmail.com</p>
                    <label className={ver.err}></label>
                    <div className={ver.otp}>
                        <input type='text' placeholder='Enter the Otp Code is here' className={ver.otps} ref={refs} />
                        <div className={ver.time}>
                            <label className={ver.ti}>Remaing Time : </label>
                            <label className={ver.times} style={{color: getTime ? "rgb(246, 83, 83)": "black"}}>{GetTimes(time)}</label>
                        </div>
                    </div>
                    <input type='button' value={"Verify"} className={ver.btn} />
                </div>
            </div>
        </div>
    )
}
export default Verify;