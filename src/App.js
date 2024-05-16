import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {compose} from "redux";
import withRouter from "react-router-dom/es/withRouter";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/commom/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./HOC (High Order Component)/withSuspense";
import PreloaderApp from "./components/commom/PreloaderApp/PreloaderApp";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))


class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return <PreloaderApp/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Switch>

                        <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>}/>

                        <Route exact path={'/dialogs'} render={() => {
                            return withSuspense(DialogsContainer)}}/>

                        <Route exact path={'/profile/:userid?'} render={() => {
                            return <ProfileContainer/>
                        }}/>

                        <Route exact path={'/users'} render={() => {
                            return withSuspense(UsersContainer)}}/>

                        <Route exact path={'/login'} render={() => <Login/>}/>

                        <Route path={'*'} render={() => <div>404</div>}/>

                    </Switch>
                </div>
            </div>
        );
    };
}

const MapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    connect(MapStateToProps, {initializeApp}))(App)

export const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer
                store={store}
                dispatch={store.dispatch.bind(store)}
            />
        </Provider>
    </BrowserRouter>
}

