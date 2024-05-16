import React from "react";
import Paginator from "../commom/Paginator/Paginator";
import User from "./User";


const Users = ({totalUsersCount, currentPage, pageSize, onPageChanged, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
        />
        {
            props.users.map(u => <span key={u.id}><User
                                        u={u}
                                       followingInProgress={props.followingInProgress}
                                       unfollowThunk={props.unfollowThunk}
                                       followThunk={props.followThunk}>

            </User></span>)
        }
    </div>
}

export default Users;

