
const base_url = "http://187.127.143.141:5000/";


export const URLS = {

    Base: base_url,
    ImageUrl: base_url,

    //Authentication
    AdminLogin: base_url + "v1/ScutsApi/admin/auth/adminlogin",
    GetProfile: base_url + "v1/ScutsApi/admin/auth/getadminprofile",
    UpdateProfilePic: base_url + "v1/ScutsApi/admin/auth/editprofilepic",
    UpdateProfile: base_url + "v1/ScutsApi/admin/auth/editprofile",
    ChangePassword: base_url + "v1/ScutsApi/admin/auth/changepass",
}