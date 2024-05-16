import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../commom/FormControls/FormControls";
import styles from "../../commom/FormControls/FormControls.module.css";


export const ProfileDataForm = ({handleSubmit, profile, ...props}) => {
    let [number, setNumber] = useState(0)
    let [bool, setBool] = useState(false)
    let [focus, setFocus] = useState(false)


    const onInputChange = (e) => {
        let numb = e.currentTarget.value.length
        setNumber(numb)
        setFocus(true)
        if (e.currentTarget.value.length == 10) {
            setBool(true)
        }
        else {
            setBool(false)
        }
    }

    const blur = () => {
        setFocus(false)
        setBool(false)
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button disabled={props.disabledEdit? true: false}>Save</button>
                <br/><br/>

                <b>Ищу ли я работу:</b> {createField(Input, "lookingForAJob", "Ищу ли я работу?", [], "checkbox")}

                {profile.lookingForAJob ?
                    <div><b>Какую работу я ищу: {createField(Input, "lookingForAJobDescription",
                        null, [], null, null,)}</b></div>
                    : null}
            </div>
            <br/>

            <div>
                <b>Обо мне:</b><Field maxLength={10} onBlur={blur} onFocus={onInputChange} onChange={onInputChange}
                                      component={Input} name={"aboutMe"}/>
                {focus && <span>{number} / 10</span>}{bool && <div>Достигнут лимит символов в 10!</div>}
                {/*{createField(Input, "aboutMe", null, [])}*/}
            </div>
            <br/>

            <div>
                <b>Имя:</b>{createField(Input, "fullName", null, [])}
            </div>
            <br/>

            <div>
                {props.error? props.error: null}
            </div>
            <div>
                <b>Контакты:</b>: {Object.keys(profile.contacts).map(key => {
                // return <Contact key={key} contactTitle={key} contactKey={profile.contacts[key]}/>
                return <b>{key}: {createField(Input, `contacts.${key}`, key, [])}</b>
                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile", destroyOnUnmount: false})(ProfileDataForm)

export default ProfileDataFormReduxForm

