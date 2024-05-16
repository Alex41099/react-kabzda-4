import axios, {toFormData} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "c604308d-263e-49ad-9642-f992925b0a3c)"
    },
})

export const UsersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, )
            .then(response => {
                return response.data
            })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`,)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {},)
    },
    getProfile(userId) {
        console.warn("Этот метод устарел используйте ")
        return ProfileAPI.getProfile(userId)
    },
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getProfileStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(Photofiles) {
        const formData = new FormData()
        formData.append("image", Photofiles)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`, )
    },
    login(email, password, rememberMe = null, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`, )
    },

}

export const CaptchaUrlApi = {
    captcha() {
        return instance.get(`security/get-captcha-url`, )
    },
}