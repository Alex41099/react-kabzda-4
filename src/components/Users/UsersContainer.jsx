import React from "react";
import {connect} from "react-redux";
import {setCurrentPage, getUsers, unfollowThunk, followThunk} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../commom/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersReselect, getUsersSelector,
} from "../../redux/auth-selector";


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (currentPage) => {
        this.props.getUsers(currentPage)
    }

    render() {
        return <>
            {this.props.isFetching? <Preloader/> : <Users totalUsersCount={this.props.totalUsersCount}
                                                          pageSize={this.props.pageSize}
                                                          currentPage={this.props.currentPage}
                                                          onPageChanged={this.onPageChanged}
                                                          users={this.props.users}
                                                          followingInProgress={this.props.followingInProgress}
                                                          toggleFollowingProgress={this.props.toggleFollowingProgress}

                                                          followThunk={this.props.followThunk}
                                                          unfollowThunk={this.props.unfollowThunk}
                                                          isTrue={this.props.isTrue}
            /> }
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersReselect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


export default compose(
    connect(mapStateToProps, {setCurrentPage, getUsers, unfollowThunk, followThunk}),
    // withAuthRedirect,
)(UsersAPIComponent)