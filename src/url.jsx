
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

    //Products
    GetAllProducts: base_url + "v1/ScutsApi/admin/products/getAllProducts",
    SearchProducts: base_url + "v1/ScutsApi/admin/products/getAllProducts?search=",
    ProductsPagination: base_url + "v1/ScutsApi/admin/products/getAllProducts?page=",
    AddProducts: base_url + "v1/ScutsApi/admin/products/createProduct",
    UpdateProducts: base_url + "v1/ScutsApi/admin/products/updateProduct/",
    DeleteProducts: base_url + "v1/ScutsApi/admin/products/deleteProduct/",
    GetByIdProducts: base_url + "v1/ScutsApi/admin/products/getProductById",

    //Customers
    GetAllCustomers: base_url + "v1/ScutsApi/admin/customers/getAllCustomers",
    SearchCustomers: base_url + "v1/ScutsApi/admin/customers/getAllCustomers?search=",
    CustomersPagination: base_url + "v1/ScutsApi/admin/customers/getAllCustomers?page=",
    AddCustomers: base_url + "v1/ScutsApi/admin/customers/createCustomer",
    UpdateCustomers: base_url + "v1/ScutsApi/admin/customers/updateCustomer/",
    DeleteCustomers: base_url + "v1/ScutsApi/admin/customers/deleteCustomer/",
    GetByIdCustomers: base_url + "v1/ScutsApi/admin/customers/getCustomerById",
    GetArchivedCustomers: base_url + "v1/ScutsApi/admin/customers/getArchivedCustomers",

    //Coupons
    GetAllCoupons: base_url + "v1/ScutsApi/admin/coupon/getAllCoupons",
    SearchCoupons: base_url + "v1/ScutsApi/admin/coupon/getAllCoupons?searchQuery=",
    PaginationCoupons: base_url + "v1/ScutsApi/admin/coupon/getAllCoupons?page=",
    AddCoupons: base_url + "v1/ScutsApi/admin/coupon/createCoupon",
    UpdateCoupons: base_url + "v1/ScutsApi/admin/coupon/updateCoupon/",
    GetByIdCoupons: base_url +"v1/ScutsApi/admin/coupon/getSingleCoupon",
    DeleteCoupons: base_url + "v1/ScutsApi/admin/coupon/deleteCoupon/",

    //POS
    CreatePos: base_url + "v1/ScutsApi/admin/pos/createPOS",
    SearchPos: base_url + "v1/ScutsApi/admin/pos/searchandcreateCustomers",
    CreateCustomer: base_url + "v1/ScutsApi/admin/pos/searchandcreateCustomers",
    SearchPosItems: base_url + "v1/ScutsApi/admin/pos/searchPOSItems",
    GetPosBill: base_url + "v1/ScutsApi/admin/pos/getAllPOSBills",
    SearchPosBill: base_url + "v1/ScutsApi/admin/pos/getAllPOSBills?search=",
    PaginationPosBill: base_url + "v1/ScutsApi/admin/pos/getAllPOSBills?page=",
    GetPosById: base_url + "v1/ScutsApi/admin/pos/getPosById",
    UpdatePos: base_url + "v1/ScutsApi/admin/pos/updatePos/",
    DeletePos: base_url + "v1/ScutsApi/admin/pos/deletePOS/",

    //Dashboard
    GetDashboard: base_url + "v1/ScutsApi/admin/dashboard/getDashboard",

    //Invoices & Receipts
    GetInvoices: base_url + "v1/ScutsApi/admin/invoices_receipts/getInvoiceStats",
    SearchInvoices: base_url + "v1/ScutsApi/admin/invoices_receipts/getInvoiceStats?search=",
    PaginationInvoices: base_url + "v1/ScutsApi/admin/invoices_receipts/getInvoiceStats?page=",
    ExportInvoices: base_url + "v1/ScutsApi/admin/invoices_receipts/export",

    //Reports
    GetReports: base_url + "v1/ScutsApi/admin/report/getReport",
    GetExportReports: base_url + "v1/ScutsApi/admin/report/export",

    //Appionments
    GetAppionments: base_url + "v1/ScutsApi/admin/appointment/getAppointments",
    SearchAppionments: base_url + "v1/ScutsApi/admin/appointment/getAppointments?search=",
    AddAppionments: base_url + "v1/ScutsApi/admin/appointment/createAppointment",
    GetByIdAppionments: base_url + "v1/ScutsApi/admin/appointment/getById",
    CreateCustomerAppionments: base_url + "v1/ScutsApi/admin/appointment/createCustomer",
    UpdateAppionments: base_url + "v1/ScutsApi/admin/appointment/updateAppointment/",
    DeleteAppionments: base_url + "v1/ScutsApi/admin/appointment/cancelAppointment/",
    StatsAppionments: base_url + "v1/ScutsApi/admin/appointment/getAppointmentStats",
    UpdateAppionmentStatus: base_url + "v1/ScutsApi/admin/appointment/updateAppointmentStatus",

    //Staff Management
    GetStaff: base_url + "v1/ScutsApi/admin/staff/getAllStaff",
    AddStaff: base_url + "v1/ScutsApi/admin/staff/createStaff",
    GetByIdStaff: base_url + "v1/ScutsApi/admin/staff/getStaffById",
    UpdateStaff: base_url + "v1/ScutsApi/admin/staff/updateStaff/",
    DeleteStaff: base_url + "v1/ScutsApi/admin/staff/deleteStaff/",
    GetArchivedStaff: base_url + "v1/ScutsApi/admin/staff/getArchivedStaff",

    //Roles
    GetRoles: base_url + "v1/ScutsApi/admin/role/getAllRoles",
    AddRole: base_url + "v1/ScutsApi/admin/role/createRole",
    UpdateRole: base_url + "v1/ScutsApi/admin/role/updateRole/",
    DeleteRole: base_url + "v1/ScutsApi/admin/role/deleteRole/",


}