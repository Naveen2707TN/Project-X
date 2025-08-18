import files from '../Css/files.module.css';
function Files(){
    return(
        <div className={files.main}>
            <div className={files.head}>
                <div className={files.left}>
                    <img alt='icons' src='/folder.png' className={files.icon} />
                    <img alt='arrow' src='/arrow.png' className={files.arrow} />
                    <label className={files.name_ui}>Naveen</label>
                </div>
                <div className={files.right}>
                    <div className={files.search}>
                        <div className={files.sear}>
                            <img alt='x-iocn' src='/magnifier.png' className={files.sicon} />
                            <input type='text' placeholder='Search' className={files.se} />
                        </div>
                    </div>
                </div>
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
                        <tr className={files.trs}>
                            <th className={files.names}>
                                <label className={files.titles}>NAME</label>
                            </th>
                            <th className={files.sizes}>
                                <label className={files.title}>SIZE</label>
                            </th>
                            <th className={files.dates}>
                                <label className={files.title}>CREATED AT</label>
                            </th>
                            <th className={files.shares}>
                                <img alt='share' src='/share.png' className={files.share_icon} />
                            </th>
                            <th className={files.acts}>
                                <img alt='share' src='/web.png' className={files.trash_icon} />
                                <img alt='share' src='/trash.png' className={files.trash_icon} />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Files;