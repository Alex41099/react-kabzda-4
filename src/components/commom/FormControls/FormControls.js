import React from "react";
import styles from "./FormControls.module.css"
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";


export const Textarea = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;

    return (
        <div>
            <textarea className={hasError ? styles.formControl : ""} {...input} {...props}/>
            {hasError && <div className={styles.formControlSpan}>{error}</div>}
        </div>
    )
}


export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div>
            <input className={hasError ? styles.formControl : ""} {...input} {...props}/>
            {hasError && <div className={styles.formControlSpan}>{meta.error}</div>}
        </div>
    )
}


export const createField = (component, name, placeholder, validate, type = "", text="") => {
    return (
        <div>
            <Field component={component}
                   name={name}
                   placeholder={placeholder}
                   validate={validate}
                   type={type}
                   />{text}
        </div>
    )
}