import React from 'react';
import s from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

const Nav = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                {props.isTrue? <NavLink to="/profile" className={s.a}>Profile</NavLink>: undefined}
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" className={s.a}>Dialogs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" className={s.a}>Users</NavLink>
            </div>
            <div className={s.item}>
                {props.isTrue? undefined : <NavLink to="/login" className={s.a}>Login</NavLink>}
            </div>
            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}

const MapStateToProps = (state) => ({
    isTrue: state.auth.isTrue,
})

export default compose(
    connect(MapStateToProps, {})
)(Nav);

