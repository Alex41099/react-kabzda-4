import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


let MapStateToPropsForRedirect = (state) => ({
    isTrue: state.auth.isTrue,
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isTrue) return <Redirect to={"/login"}/>

            return <Component {...this.props}/>

        }
    }

    let ConnectedAuthRedirectComponent = connect(MapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}

