import React from "react";
import preloader from "../../../accets/img/34338d26023e5515f6cc8969aa027bca.webp"
import styles from "./Preloader.module.css"


let Preloader = (props) => {
    return (
        <div>
            <img className={styles.Preloader} src={preloader}/>
        </div>
    )
}

export default Preloader;