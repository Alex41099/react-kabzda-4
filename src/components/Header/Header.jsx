import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://th.bing.com/th/id/R.f0e30503dc21c5cec2a83d76156f43f5?rik=7zYRvp6q7Ebpgg&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f06%2fTelecom_logo.png&ehk=sIIEOMbWCXs%2fXnvymRKTeYxCuYNuVey7HPw4Ni0le68%3d&risl=&pid=ImgRaw&r=0" />
            {props.isTrue? // Если юзер вошел то выводи его имя и кнопку Log out при клике на которого сработает callback!
                <span>{props.login} - <button onClick={props.logout}>Log out</button></span>
                : <NavLink to={"/login"}><span>Login</span></NavLink>}
        </header>
    );
};

export default Header;

