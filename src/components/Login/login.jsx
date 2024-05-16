import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../commom/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login,Logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from "../../components/commom/FormControls/FormControls.module.css"

const LoginForm = ({handleSubmit, error, ...props}) => {
    const maxLength20 = maxLengthCreator(30)

    return (
        <form onSubmit={handleSubmit}>

            {createField(Input, "email" , "Email", [required, maxLength20])}
            {createField(Input, "password" , "Password", [required, maxLength20], "password", )}
            {createField(Input, "rememberMe" , null, [required], "checkbox", "remember Me")}

            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && <span>{createField(Input, "captcha" , "anti-bot", [required])}</span>}

            {error && <div className={styles.formControlSpan}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login", destroyOnUnmount: false})(LoginForm)

const Login = (props) => {

    if (props.isTrue) return <Redirect to={"/profile"}/>

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
    </div>
}

const MapStateToProps = (state) => ({
    isTrue: state.auth.isTrue,
    captcha: state.auth.captcha,
})

export default connect(MapStateToProps, {login, Logout})(Login);