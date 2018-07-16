import axios from "axios";
const headUrl = "";
const signinUrl = "/user/signin";
const signupUrl = "/user/signup";
module.exports = {
     userSignIn(params) {
        return axios.post( headUrl + signinUrl, params);
    },
    userSignUp(params) {
        return axios.post( headUrl + signupUrl, params);
    }
}

