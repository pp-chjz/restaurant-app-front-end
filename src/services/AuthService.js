import AuthUser from "../store/AuthUser";
import backendInstance, { auth_key, auth } from "./backendInstance";

const user = auth ? auth.user : "";
const jwt = auth ? auth.jwt : "";

export default {

  getJwt() {
    return jwt;
  },

  async register({
    username,
    email,
    password,
    password_confirmation,
  }) {
    try {
      let body = {
        name: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      };

      console.log(body);

      let res = await backendInstance.post(`/api/auth/register`, body);
      console.log(res.data);
      return {
        success: true,
        user: res.data.user,
    };
    //   if (res.status === 201) {
    //     let autoLogin = await AuthUser.dispatch("login", body);
    //     console.log(autoLogin.jwt);
    //     return {
    //       success: true,
    //       user: res.data.user,
    //       jwt: autoLogin.jwt,
    //     };
    //   }
    } catch (e) {
      //console.error(error);
      if (e.response.status === 400) {
        return {
          success: false,
          message: e.response.data,
        };
      }
    }
  },

  async login({ email, password }) {
    try {
      let body = {
        email: email,
        password: password,
      };

      let res = await backendInstance.post(`/api/auth/login`, body);
      localStorage.setItem(auth_key, JSON.stringify(res.data));
      this.jwt = res.data.access_token;
      backendInstance.defaults.headers.common.Authorization = `Bearer ${this.jwt}`;

      return {
        success: true,
        user: res.data.user,
        jwt: res.data.access_token,
      };
    } catch (e) {
      if (e.response.status === 409) {
        return {
          success: false,
          message: "บัญชีของคุณถูกระงับ โปรดติดต่อผู้แลระบบ",
        };
      } else {
        return {
          success: false,
          message: "กรุณาตรวจสอบอีเมลและรหัสผ่านอีกครั้ง",
        };
      }
    }
  },

};
