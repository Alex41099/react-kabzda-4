import React from "react";
import s from "./MyPosts.module.css";
import Posts from "./posts/Posts";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../commom/FormControls/FormControls";


const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[required, maxLength10]} />
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)


const MyPosts = (props) => {
    // создаем копию приходящих данных и переворачиваем их с помощью метода reverse()!
    let postsElements = [...props.posts].reverse().map(p => <Posts messages={p.messages} likePosts={p.likesCount}/>)

    const onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddNewPostForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;