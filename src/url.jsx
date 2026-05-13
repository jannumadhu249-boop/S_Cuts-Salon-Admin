
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

    //Categories
    GetCategory: base_url + "v1/ScutsApi/admin/category/getAllCategories",
    SearchCategory: base_url + "v1/ScutsApi/admin/category/getAllCategories?search=",
    AddCategory: base_url + "v1/ScutsApi/admin/category/createCategory",
    UpdateCategory: base_url + "v1/ScutsApi/admin/category/updateCategory/",
    DeleteCategory: base_url + "v1/ScutsApi/admin/category/deleteCategory/",
    CategoryPagination: base_url + "v1/ScutsApi/admin/category/getAllCategories?page=",
    GetActiveCategories: base_url + "v1/ScutsApi/admin/category/getActiveCategories",

    //Services
    GetServices: base_url + "v1/ScutsApi/admin/services/getAllServices",
    SearchServices: base_url + "v1/ScutsApi/admin/services/getAllServices?search=",
    ServicePagination: base_url + "v1/ScutsApi/admin/services/getAllServices?page=",
    AddServices: base_url + "v1/ScutsApi/admin/services/createService",
    UpdateServices: base_url + "v1/ScutsApi/admin/services/updateService/",
    DeleteServices: base_url + "v1/ScutsApi/admin/services/deleteService/",
    GetByIdServices: base_url + "v1/ScutsApi/admin/services/getServiceById",

    //Service packages
    GetAllServicePackages: base_url + "v1/ScutsApi/admin/servicePackages/getAllPackages",
    SearchServicePackages: base_url + "v1/ScutsApi/admin/servicePackages/getAllPackages?search=",
    ServicePackagesPagination: base_url + "v1/ScutsApi/admin/servicePackages/getAllPackages?page=",
    AddServicePackage: base_url + "v1/ScutsApi/admin/servicePackages/createPackage",
    UpdateServicePackage: base_url + "v1/ScutsApi/admin/servicePackages/updatePackage/",
    DeleteServicePackage: base_url + "v1/ScutsApi/admin/servicePackages/deletePackage/",
    GetByIdServicePackage: base_url + "v1/ScutsApi/admin/servicePackages/getPackageById",
}