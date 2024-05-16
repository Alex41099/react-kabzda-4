import {createSelector} from "reselect"; // импортируем метод createSelector


const getUsersSelector = (state) => { // 2. вот эту
    return state.usersPage.users
}
// 1.первым параметром передаем своиство которое отслеживаем
export const getUsersReselect = createSelector(getUsersSelector,(users,) => { // 3. вторым берем ее своиство
    return users/*.filter(u => true)*/ // 4. ну и дальше здесь пишем сложный код!
})


export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}