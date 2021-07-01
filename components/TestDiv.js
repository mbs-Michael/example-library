import React from "react";
import style from "../styles/module.module.css"

const TestDiv = ({ children }) => (
    <div className={style.testDiv}>
        {children}
    </div>
);

export default TestDiv;