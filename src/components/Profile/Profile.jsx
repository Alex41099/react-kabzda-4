import React from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {savePhotoSunck} from "../../redux/profile-reducer";


const Profile = (props) => {

  return (
    <div>
      <ProfileInfo saveProfile={props.saveProfile} profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                   isOwner={props.isOwner} savePhotoSunck={props.savePhotoSunck} authorizedUserId={props.authorizedUserId}
                   isBool={props.isBool} editProfile={props.editProfile}
                   editProfileForm={props.editProfileForm} disabledEdit={props.disabledEdit}
                   loaderUsersProfile={props.loaderUsersProfile}/>
      <MyPostsContainer store={props.store}/>
    </div>
  );
};

export default Profile;

