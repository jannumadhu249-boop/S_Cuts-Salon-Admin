import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hasPermission, getModuleNameForPath, getFirstAllowedPath } from "../helpers/permission_helper";
import { post } from "../helpers/api_helper";
import { URLS } from "../url";
import AccessDenied from "../pages/Utility/AccessDenied";

const Authmiddleware = (props) => {
  const location = useLocation();
  const [profileSynced, setProfileSynced] = useState(() => {
    return !!sessionStorage.getItem("profileSynced");
  });
  const [loading, setLoading] = useState(() => {
    // If not authenticated, we don't need to load anything
    if (!localStorage.getItem("authUser")) return false;
    // Load if we haven't synced yet in this session
    return !sessionStorage.getItem("profileSynced");
  });

  useEffect(() => {
    const syncProfile = async () => {
      const authUserStr = localStorage.getItem("authUser");
      if (!authUserStr) {
        setLoading(false);
        return;
      }

      try {
        const response = await post(URLS.GetProfile, {});
        if (response.success && response.profile) {
          const authUser = JSON.parse(authUserStr);
          authUser.user = response.profile;
          
          const userRole = response.profile.role;
          if (userRole) {
            const rolesResponse = await post(URLS.GetRoles, {});
            if (rolesResponse.success && Array.isArray(rolesResponse.data)) {
              const roleId = typeof userRole === "string" ? userRole : userRole._id;
              const matchedRole = rolesResponse.data.find(r => r._id === roleId);
              if (matchedRole) {
                localStorage.setItem("userRoleName", matchedRole.name);
                localStorage.setItem("userPermissions", JSON.stringify(matchedRole.permissions));
              }
            }
          } else {
            localStorage.removeItem("userRoleName");
            localStorage.removeItem("userPermissions");
          }
          
          localStorage.setItem("authUser", JSON.stringify(authUser));
          sessionStorage.setItem("profileSynced", "true");
          setProfileSynced(true);
        }
      } catch (error) {
        console.error("Failed to sync profile in background:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!profileSynced) {
      syncProfile();
    } else {
      setLoading(false);
    }
  }, [profileSynced]);

  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  if (loading) {
    // Show a premium loading spinner
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", background: "#f8f9fa" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentPath = location.pathname;
  const moduleName = getModuleNameForPath(currentPath);

  // If user doesn't have permission for this module
  if (!hasPermission(moduleName)) {
    // If they were trying to access dashboard/home, redirect them to their first allowed path
    if (currentPath === "/dashboard" || currentPath === "/") {
      const allowedPath = getFirstAllowedPath();
      if (allowedPath !== "/dashboard" && allowedPath !== "/") {
        return <Navigate to={allowedPath} />;
      }
    }
    // Otherwise show Access Denied component
    return <AccessDenied />;
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};

export default Authmiddleware;
