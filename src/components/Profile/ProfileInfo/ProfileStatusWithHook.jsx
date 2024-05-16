import React, {useEffect, useState} from "react";


const ProfileStatusWithHook = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let [editModeMaxLength, setEditModeMaxLength] = useState(false)

    let [number, setNumber] = useState(0)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        if (e.currentTarget.value.length > 10)
            setEditModeMaxLength(true)
        else {
            let numb = e.currentTarget.value.length
            setNumber(numb)

            setStatus(e.currentTarget.value)
            setEditModeMaxLength(false)
        }
    }

    let daf = false

    if (props.isOwner == props.authorizedUserId || !props.isOwner) daf = true

    return (
        <>
            {!editMode &&
                <div onDoubleClick={daf? activateEditMode: undefined}>
                    <b>Статус: </b><span>{status || "Нет статуса"}</span>
                </div>}

            {editMode &&
                <div>
                    <input onChange={onStatusChange} onFocus={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}/> {editModeMaxLength ? <div>Максимум 10 символов</div> : null}
                    <span>{number && number} / 10</span>
                </div>}
        </>
    )
}

export default ProfileStatusWithHook;