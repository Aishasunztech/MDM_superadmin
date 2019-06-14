import axios from 'axios';
import { BASE_URL, USER_URL } from '../../constants/Application';
import io from "socket.io-client";

const RestService = {
    //============================================= Auth =================================================
    connectSocket: (token) => {
        let makeToken = "token=" + token + "&isWeb=true";
        let socket = io.connect(BASE_URL, {
            query: makeToken,
            // reconnectionDelay:1000,
            // reconnection:true,
            // forceNew:true
        });
        return socket;
    },
    login: (user) => {
        return axios.post(BASE_URL + 'auth/login', user);
    },
    verifyCode: (verifyForm) => {
        return axios.post(BASE_URL + 'users/verify_code', {
            verify_code: verifyForm.verify_code
        });
    },
    getHeader: () => {
        return {
            headers: {
                authorization: localStorage.getItem('token') //the token is a variable which holds the token
            }
        };
    },

    // for logout
    authLogOut: () => {
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('type');
        localStorage.removeItem('name');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('token');
        localStorage.removeItem('dealer_pin');
        // this.router.navigate(['/login']);
    },

    authLogIn: (data) => {
        // console.log("authLogin", data);
        localStorage.setItem('id', data.id);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('firstName', data.first_name);
        localStorage.setItem('lastName', data.last_name);
        // localStorage.setItem('connected_dealer', data.user.connected_dealer);
        // localStorage.setItem('connected_devices', data.user.connected_devices[0].total);
        // localStorage.setItem('type', data.user.user_type);
        // localStorage.setItem('dealer_pin', data.user.link_code);
        localStorage.setItem('two_factor_auth', data.two_factor_auth);

    },
    setUserData: (data) => {
        // console.log("hello12312", data);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('name', data.user.dealer_name);
        localStorage.setItem('firstName', data.user.firstName);
        localStorage.setItem('lastName', data.user.lastName);
        localStorage.setItem('connected_dealer', data.user.connected_dealer);
        localStorage.setItem('connected_devices', data.user.connected_devices[0].total);
        localStorage.setItem('type', data.user.user_type);
        localStorage.setItem('dealer_pin', data.user.link_code);
        localStorage.setItem('two_factor_auth', data.user.two_factor_auth);

    },

    // checkAuth
    checkAuth: (response) => {
        if (response.success !== undefined && response.success === false) {
            return false;
        } else {
            return true;
        }

    },

    getFile: (filename) => {
        window.location = BASE_URL + 'users/getFile/' + filename;
    },

    twoFactorAuth: (isEnable) => {
        return axios.post(BASE_URL + 'users/two_factor_auth', { isEnable: isEnable }, RestService.getHeader())
    },
    // Component Allowed
    checkComponent: (ComponentUri) => {
        return axios.post(BASE_URL + 'users/check_component', { ComponentUri: ComponentUri }, RestService.getHeader());

    },
    checkApkName: (name, apk_id = '') => {
        return axios.post(BASE_URL + 'users/checkApkName', { name, apk_id }, RestService.getHeader());
    },
    // 
    getAllowedComponents: () => {

    },

    // isAdmin
    isAdmin: () => {

        return axios.get(BASE_URL + 'users/check_admin', RestService.getHeader());
    },

    // getuserType
    getUserType: () => {

    },

    // checkUserType
    checkUserType: () => {

    },

    // getMenu
    getMenu: () => {

    },

    // =========================================Sidebar Menus =====================================
    getWhiteLabels: () => {
        return axios.get(USER_URL + 'white-labels', RestService.getHeader());
    },
    getWhiteLabelInfo: (id) => {
        return axios.get(USER_URL + 'white-labels/' + id, RestService.getHeader());
    },

    editWhiteLabelInfo: (data) => {
        return axios.put(USER_URL + 'update-white-label', data, RestService.getHeader());
    },


    // ======================================== Account ===========================================
    getSimIDs: () => {
        return axios.get(BASE_URL + 'users/get_sim_ids', RestService.getHeader());
    },
    getChatIDs: () => {
        console.log('hi')
        return axios.get(BASE_URL + 'users/get_chat_ids', RestService.getHeader());
    },
    getPGPEmails: () => {
        return axios.get(BASE_URL + 'users/get_pgp_emails', RestService.getHeader());
    },
    getUsedPGPEmails: () => {
        return axios.get(BASE_URL + 'users/get_used_pgp_emails', RestService.getHeader());
    },
    getUsedSimIds: () => {
        return axios.get(BASE_URL + 'users/get_used_sim_ids', RestService.getHeader());
    },
    getUsedChatIds: () => {
        return axios.get(BASE_URL + 'users/get_used_chat_ids', RestService.getHeader());
    },

    importCSV: (formData, fieldName) => {
        return axios.post(BASE_URL + 'users/import/' + fieldName, formData, RestService.getHeader());
    },
    exportCSV: (fieldName) => {
        return axios.get(BASE_URL + 'users/export/' + fieldName, RestService.getHeader());
    },
    releaseCSV: (fieldName, ids) => {
        return axios.post(BASE_URL + 'users/releaseCSV/' + fieldName, { ids }, RestService.getHeader());
    },
    // Dealer and sdealers items apis
    getSelectedItems(pageName) {
        // console.log('page name', pageName);
        return axios.get(BASE_URL + 'users/dealer/gtdropdown/' + pageName, RestService.getHeader());
    },

    postSelectedItems: (selectedItems, pageName) => {

        const items = JSON.stringify(selectedItems);
        return axios.post(BASE_URL + 'users/dealer/dropdown', { selected_items: items, pageName: pageName }, RestService.getHeader());

    },
    ApkList: () => {
        return axios.get(BASE_URL + 'users/apklist', RestService.getHeader());
    },
    addAPK: (formData) => {
        return axios.post(BASE_URL + 'users/addApk', formData, RestService.getHeader());
    },
    unlinkAPK: (apk_id) => {
        return axios.post(BASE_URL + 'users/apk/delete', { apk_id: apk_id }, RestService.getHeader());
    },
    // For Apk edit(admin dashboard)
    updateApkDetails: (formData) => {
        return axios.post(BASE_URL + 'users/edit/apk', formData, RestService.getHeader());

    },
}
export default RestService;