import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../accets/img/user-icon-on-transparent-background-free-png.webp";
import {NavLink} from "react-router-dom";


const User = ({u, followingInProgress, unfollowThunk, followThunk}) => {
    return <div>

        {
            <div>
                    <span>
                        <div>
                            <NavLink to={"/profile" + "/" + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                          {u.followed
                              ?
                              <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                  unfollowThunk(u.id)
                              }}>Unfollow</button>

                              :
                              <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                  followThunk(u.id)
                              }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>
        }
    </div>
}

export default User;

