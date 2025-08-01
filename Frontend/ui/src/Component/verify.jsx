import ver from '../Css/verify.module.css';
function VerifyUi(){
    return(
        <div className={ver.main}>
            <div className={ver.head}>
                <img src='/communication.png' alt='icon' className={ver.logo} />
                <label className={ver.txt}>Chats App</label>
            </div>
            <div className={ver.cont}>
                <div className={ver.det}>
                    <h3 className={ver.label}>OTP Verification</h3>
                    <img alt='icon' src='/email.png' className={ver.icon}/>
                    <label>Please Enter the OTP (One Time Password) sent your registred email id to complete the verfication process</label>
                    <label className={ver.err}></label>
                    <input type='text' max={"6"} placeholder='Enter the OTP code here' className={ver.otp} />
                    <input type='button' value={"Verify"} className={ver.btn} />
                </div>
            </div>
        </div>
    )
}
export default VerifyUi;