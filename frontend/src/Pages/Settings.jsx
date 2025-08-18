import set from "../Css/set.module.css";

function Settings() {
  return (
    <div className={set.main}>
        <div className={set.mains}>
            <div className={set.left}>
                <div className={set.box1}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2 >User Profile</h2>
                        </div>
                        <div className={set.conta}>
                            <div className={set.l1}>
                                <div className={set.pro}>
                                    <img alt="x-icon" src="/users.png" className={set.img} />
                                    <img alt="x-edit" src="/edit.png" className={set.edit} />
                                </div>
                            </div>
                            <div className={set.r1}>
                                <div className={set.name}>
                                    <label>user name : Naveen</label>
                                    <img alt="x-edit" src="/edit.png" className={set.edits} />
                                </div>
                                <div className={set.name}>
                                    <label>email id : naveenvishnu1007@gmail.com</label>
                                </div>
                                <div className={set.name}>
                                    <label>Craeted At : 27-07-2004</label>
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
                                <label>Last Login : 28-08-2021</label>
                            </div>
                            <div className={set.pass}>
                                <label className={set.namesp}>Rest Password : </label>
                                <button className={set.res}>Reset</button>
                            </div>
                            <div className={set.pass}>
                                <label className={set.namesp}>Delete Account : </label>
                                <button className={set.del}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={set.right}>
                <div className={set.box1}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2>Storage</h2>
                        </div>
                        <div className={set.cont}>
                            <label>Toatal Space : 100 Mb</label>
                            <label>Available Space : 20 Mb</label>
                            <label>Used Space : 80 Mb</label>
                        </div>
                    </div>
                </div>

                <div className={set.box2}>
                    <div className={set.card1}>
                        <div className={set.header}>
                            <h2>Credits</h2>
                        </div>
                        <div className={set.cont}>
                            <label>Toatal Creits : 05</label>
                            <label> Spend Creits : 03</label>
                            <label>Availabile Creits : 02</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Settings;
