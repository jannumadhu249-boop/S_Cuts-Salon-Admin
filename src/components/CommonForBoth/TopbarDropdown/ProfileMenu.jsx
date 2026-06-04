import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import user1 from "../../../assets/images/users/avatar-1.jpg";
import { URLS } from "../../../url";

const ProfileMenu = props => {

  const [menu, setMenu] = useState(false);
  const { t } = useTranslation();
  const { user } = useSelector(state => state.Login);

  // Get data from Redux state (if available) or fallback to localStorage
  const authUser = localStorage.getItem("authUser");
  const obj = authUser ? JSON.parse(authUser) : null;
  const userObj = user?.user || obj?.user;
  const username = userObj?.name || "Admin";
  const profilePic = userObj?.image
    ? (URLS.ImageUrl + userObj.image.replace(/\\/g, '/'))
    : user1;

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profilePic}
            alt="admin image"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          {/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {t("Edit Profile")}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="#">
            <i className="bx bx-image font-size-16 align-middle me-1" />
            {t("Change Avatar")}
          </DropdownItem> */}
          <DropdownItem tag="a" href="/change-password">
            <i className="bx bx-key font-size-16 align-middle me-1" />
            {t("Change Password")}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item text-danger">
            <i className="bx bx-power-off font-size-16 align-middle me-1" />
            <span>{t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

export default withRouter(ProfileMenu);


