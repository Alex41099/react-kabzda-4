import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import Header from "./Header";
import {getAuthUserData, Logout, setAuthUserData} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    // Вот здесь в ComponentDidMount оно было ее убираем! Далее

    render() {
        return <Header login={this.props.login} isTrue={this.props.isTrue} logout={this.props.Logout}/>
    }
}

let MapStateToProps = (state) => ({
    login: state.auth.login,
    isTrue: state.auth.isTrue,
})

let WithUrlDataContainerComponent = withRouter(HeaderContainer)

export default connect(MapStateToProps, {getAuthUserData, Logout})(WithUrlDataContainerComponent);
