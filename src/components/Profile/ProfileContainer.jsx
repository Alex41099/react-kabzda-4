import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    editProfile,
    getStatus,
    getUserProfile,
    savePhotoSunck,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC (High Order Component)/withAuthRedirect";
import Preloader from "../commom/Preloader/Preloader";


class ProfileContainer extends React.Component {

    refreshProfile () {
        let userid = this.props.match.params.userid;
        if (!userid) {
            userid = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userid)
        this.props.getStatus(userid)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userid != prevProps.match.params.userid ) {
            this.refreshProfile()
        }
    }

    render() {
        return this.props.isFetching? <Profile {...this.props} profile={this.props.profile}
                        isTrue={this.props.isTrue}

                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={this.props.match.params.userid}
                        savePhotoSunck={this.props.savePhotoSunck}
                        saveProfile={this.props.saveProfile}
                        authorizedUserId={this.props.authorizedUserId}
                        editProfileForm={this.props.editProfileForm}
                        isBool={this.props.isBool}
                        editProfile={this.props.editProfile}
                        disabledEdit={this.props.disabledEdit}
                        loaderUsersProfile={this.props.loaderUsersProfile}

        />: <Preloader/>
    }
}

let MapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
    editProfileForm: state.profilePage.editProfileForm,
    isBool: state.profilePage.isBool,
    disabledEdit: state.profilePage.disabledEdit,
    loaderUsersProfile: state.profilePage.loaderUsersProfile,
    isFetching: state.profilePage.isFetching,
})

export default compose(
    connect(MapStateToProps, {getUserProfile, getStatus, updateStatus, savePhotoSunck, saveProfile, editProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);