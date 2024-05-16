import React, {useEffect, useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../commom/Preloader/Preloader";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from "../../../accets/img/user-icon-on-transparent-background-free-png.webp";
import styles from "../../Users/Users.module.css";
import ProfileDataFormReduxForm, {ProfileDataForm} from "./ProfileDataForm";
import {createField, Input} from "../../commom/FormControls/FormControls";
import {disabledEditAC, editProfile} from "../../../redux/profile-reducer";


const ProfileInfo = ({profile, savePhotoSunck, ...props}) => {

    let [editMode, setEditMode] = useState(props.isBool)
    let [localProfile, setLocalProfile] = useState(profile)

    useEffect(() => {
        setEditMode(props.isBool)
    }, [props.isBool])

    useEffect(() => {
        setLocalProfile(profile)
    }, [profile])

    if (!profile) {
        return <Preloader />
    }


    const UpdatePhoto = (e) => {
        if (e.target.files.length) {
            savePhotoSunck(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        if (formData.lookingForAJob != localProfile.lookingForAJob
            || formData.lookingForAJobDescription != localProfile.lookingForAJobDescription
            || formData.aboutMe != localProfile.aboutMe
            || formData.fullName != localProfile.fullName

            || formData.contacts.github != localProfile.contacts.github
            || formData.contacts.vk != localProfile.contacts.vk
            || formData.contacts.facebook != localProfile.contacts.facebook
            || formData.contacts.instagram != localProfile.contacts.instagram
            || formData.contacts.twitter != localProfile.contacts.twitter
            || formData.contacts.website != localProfile.contacts.website
            || formData.contacts.youtube != localProfile.contacts.youtube
            || formData.contacts.mainLink != localProfile.contacts.mainLink )
        {
            props.saveProfile(formData)
            props.editProfile(editMode)
        }
        else {
            if ( Object.keys(formData.contacts).map(key => {
                    return key == localProfile.key

                    && formData.lookingForAJobDescription == localProfile.lookingForAJobDescription
                    && formData.aboutMe == localProfile.aboutMe
                    && formData.fullName == localProfile.fullName})
            )
                props.editProfile(false)
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large? profile.photos.large: userPhoto}
                     className={styles.userPhoto}/><br/>
                <div>{props.isOwner? undefined: <input type={"file"} onChange={UpdatePhoto}/>}</div><br/>
                <div>
                    <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}
                                           isOwner={props.isOwner} authorizedUserId={props.authorizedUserId}/>
                </div><br/>

                {props.isBool? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}
                                                        setEditMode={() => setEditMode(true)}
                                                         editProfile={props.editProfile} isBool={props.isBool}
                                                        disabledEdit={props.disabledEdit}/>
                    : <ProfileData profile={profile} isOwner={props.isOwner}
                                   onChangeEditMode={() => props.editProfile(true)}/>}

            </div>
        </div>
    )
}


const ProfileData = ({profile, isOwner, onChangeEditMode}) => {
    return (
        <>
            {isOwner? null :<div>
                <button onClick={onChangeEditMode}>Edit</button>
            </div>}
            <div>
                <b>Ищу ли я работу:</b> {profile.lookingForAJob? "Да":"Нет"}
                {profile.lookingForAJob? <div><b>какую работу я ищу
                    :</b>{profile.lookingForAJobDescription}</div>: null}
            </div><br/>
            <div>
                <b>Обо мне:</b> {profile.aboutMe? profile.aboutMe: "Не заполнено"}
            </div><br/>
            <div>
                <b>Имя:</b> {profile.fullName? profile.fullName: "Не указан"}
            </div><br/>
            <div>
                <b>Контакты:</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactKey={profile.contacts[key]}
                                value={key}/>

                // Чтобы проитерировать через объект как крутой чувак 10001% можно заюзать Object.entries. В этом коде я юзаю react-hook-form (там нужно каждый инпут регистрировать, и для регистрации нам и понадобится "ключ")
                // const contactList = Object.entries(profile.contacts).map(function(contact) {
                //     let key = contact[0];
            })}
            </div>
        </>
    )
}


const Contact = ({contactTitle, contactKey}) => {
    return <div><small>{contactTitle}:</small> {contactKey}</div>
}

export default ProfileInfo;

