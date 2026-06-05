export const getModuleNameForPath = (path) => {
  if (!path) return null;
  
  // Normalize path by removing trailing slash if any
  const normalizedPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  
  if (normalizedPath === "/dashboard") return "Dashboard";
  if (normalizedPath === "/appointments") return "Appointments";
  if (normalizedPath === "/web-appointments") return "Web Appointments";
  if (normalizedPath === "/pos") return "Point of Sale";
  if (normalizedPath === "/invoice-billing") return "Invoice & Receipts";
  if (normalizedPath === "/category") return "Categories";
  if (normalizedPath === "/services") return "Services";
  if (
    normalizedPath === "/service-packages" ||
    normalizedPath === "/create-package" ||
    normalizedPath.startsWith("/edit-package")
  ) {
    return "Service Packages";
  }
  if (
    normalizedPath === "/coupons" ||
    normalizedPath === "/create-coupon" ||
    normalizedPath.startsWith("/edit-coupon")
  ) {
    return "Coupons & Offers";
  }
  if (normalizedPath === "/customers") return "Customers";
  if (normalizedPath === "/staff") return "Staff Management";
  if (normalizedPath === "/roles-permissions") return "Roles & Permissions";
  if (normalizedPath === "/products") return "Products";
  if (normalizedPath === "/reports") return "Reports";
  
  return null; // For public or always-allowed routes (profile, change-password, etc.)
};

export const hasPermission = (moduleName) => {
  if (!moduleName) return true;

  const authUserStr = localStorage.getItem("authUser");
  if (!authUserStr) return false;

  try {
    const authUser = JSON.parse(authUserStr);
    const user = authUser?.user;

    if (!user) return false;

    // Check if role is admin/super admin
    const roleVal = user.role;
    const cachedRoleName = localStorage.getItem("userRoleName");
    const roleName = cachedRoleName || (typeof roleVal === "string" ? roleVal : roleVal?.name);
    const isAdmin =
      !roleVal ||
      roleName?.toLowerCase() === "admin" ||
      roleName?.toLowerCase() === "super admin" ||
      roleName?.toLowerCase() === "administrator";

    if (isAdmin) return true;

    // Check cached permissions in localStorage
    const cachedPermsStr = localStorage.getItem("userPermissions");
    if (cachedPermsStr) {
      const cachedPerms = JSON.parse(cachedPermsStr);
      if (Array.isArray(cachedPerms)) {
        const modulePerm = cachedPerms.find(
          (p) => p.module?.toLowerCase() === moduleName.toLowerCase()
        );
        return modulePerm ? !!modulePerm.view : false;
      }
    }

    // Fallback: Check permissions array directly on user.role object if present
    if (roleVal?.permissions && Array.isArray(roleVal.permissions)) {
      const modulePerm = roleVal.permissions.find(
        (p) => p.module?.toLowerCase() === moduleName.toLowerCase()
      );
      return modulePerm ? !!modulePerm.view : false;
    }
  } catch (error) {
    console.error("Error checking permissions:", error);
  }

  return false;
};

export const getFirstAllowedPath = () => {
  const authUserStr = localStorage.getItem("authUser");
  if (!authUserStr) return "/login";

  try {
    const authUser = JSON.parse(authUserStr);
    const user = authUser?.user;

    if (!user) return "/login";

    const roleVal = user.role;
    const cachedRoleName = localStorage.getItem("userRoleName");
    const roleName = cachedRoleName || (typeof roleVal === "string" ? roleVal : roleVal?.name);
    const isAdmin =
      !roleVal ||
      roleName?.toLowerCase() === "admin" ||
      roleName?.toLowerCase() === "super admin" ||
      roleName?.toLowerCase() === "administrator";

    if (isAdmin) return "/dashboard";

    const landingPriority = [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Appointments", path: "/appointments" },
      { name: "Web Appointments", path: "/web-appointments" },
      { name: "Point of Sale", path: "/pos" },
      { name: "Invoice & Receipts", path: "/invoice-billing" },
      { name: "Categories", path: "/category" },
      { name: "Services", path: "/services" },
      { name: "Service Packages", path: "/service-packages" },
      { name: "Coupons & Offers", path: "/coupons" },
      { name: "Customers", path: "/customers" },
      { name: "Staff Management", path: "/staff" },
      { name: "Roles & Permissions", path: "/roles-permissions" },
      { name: "Products", path: "/products" },
      { name: "Reports", path: "/reports" },
    ];

    // Check cached permissions in localStorage
    const cachedPermsStr = localStorage.getItem("userPermissions");
    if (cachedPermsStr) {
      const cachedPerms = JSON.parse(cachedPermsStr);
      if (Array.isArray(cachedPerms)) {
        for (const item of landingPriority) {
          const modulePerm = cachedPerms.find(
            (p) => p.module?.toLowerCase() === item.name.toLowerCase()
          );
          if (modulePerm && modulePerm.view) {
            return item.path;
          }
        }
      }
    }

    // Fallback: Check permissions array directly on user.role object
    if (roleVal?.permissions && Array.isArray(roleVal.permissions)) {
      for (const item of landingPriority) {
        const modulePerm = roleVal.permissions.find(
          (p) => p.module?.toLowerCase() === item.name.toLowerCase()
        );
        if (modulePerm && modulePerm.view) {
          return item.path;
        }
      }
    }
  } catch (error) {
    console.error("Error getting first allowed path:", error);
  }

  return "/profile"; // Fallback path if no permissions are found
};
