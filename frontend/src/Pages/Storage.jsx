import { useEffect, useState } from 'react';
import stor from '../Css/stor.module.css';
function Storage(){

    const[perc, setPerc] = useState(10);

    useEffect(() => {
            setPerc(20);
    },[])
    return(
        <div className={stor.main}>
            <h2>Cloud File Storage</h2>
            <div className={stor.bars}>
                <div className={stor.space}>
                    <label>Total Space : 100 MB</label>
                </div>
                <div className={stor.bar}>
                    <div className={stor.progress} style={{transform : `translateX(${perc - 100}%)`}}>
                    </div>
                </div>
                <div className={stor.cont}>
                    <label>Used Space :  10 Mb</label>
                    <label>Available Space : 90 Mb</label>
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
                            <tr className={stor.trs}>
                                <th className={stor.names}>
                                    <label className={stor.titles}>Application/JSON</label>
                                </th>
                                <th className={stor.sizes}>
                                    <label className={stor.title}>10MB</label>
                                </th>
                                <th className={stor.dates}>
                                    <label className={stor.title}>3</label>
                                </th>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    )
}
export default Storage;