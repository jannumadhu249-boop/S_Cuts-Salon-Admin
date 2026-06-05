import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { hasPermission } from "../../helpers/permission_helper";


// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const canViewDashboard = hasPermission("Dashboard");
  const canViewAppointments = hasPermission("Appointments");
  const canViewPOS = hasPermission("Point of Sale");
  const canViewInvoices = hasPermission("Invoice & Receipts");
  const canViewCategories = hasPermission("Categories");
  const canViewServices = hasPermission("Services");
  const canViewPackages = hasPermission("Service Packages");
  const canViewCoupons = hasPermission("Coupons & Offers");
  const canViewCustomers = hasPermission("Customers");
  const canViewStaff = hasPermission("Staff Management");
  const canViewRoles = hasPermission("Roles & Permissions");
  const canViewProducts = hasPermission("Products");
  const canViewReports = hasPermission("Reports");

  const showMainSection = canViewDashboard || canViewAppointments || canViewPOS;
  const showOperationsSection = canViewInvoices || canViewCategories || canViewServices || canViewPackages || canViewCoupons;
  const showCustomersSection = canViewCustomers;
  const showStaffSection = canViewStaff || canViewRoles || canViewProducts || canViewReports;

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {showMainSection && <li className="menu-title">{props.t("Main")}</li>}
            
            {canViewDashboard && (
              <li>
                <Link to="/dashboard" className="">
                  <i className="bx bxs-dashboard"></i>
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
            )}
            
            {canViewAppointments && (
              <li>
                <Link to="/appointments" className="">
                  <i className="bx bx-calendar"></i>
                  <span>{props.t("Appoinments")}</span>
                </Link>
              </li>
            )}

            {canViewPOS && (
              <li>
                <Link to="/pos" className="">
                  <i className="bx bx-cart"></i>
                  <span>{props.t("Point of Sale")}</span>
                </Link>
              </li>
            )}

            {showOperationsSection && <li className="menu-title">{props.t("Operations")}</li>}

            {canViewInvoices && (
              <li>
                <Link to="/invoice-billing" >
                  <i className="bx bx-receipt"></i>
                  <span>{props.t("Invoices & Receipts")}</span>
                </Link>
              </li>
            )}

            {canViewCategories && (
              <li>
                <Link to="/category" className="">
                  <i className="bx bx-category"></i>
                  <span>{props.t("Categories")}</span>
                </Link>
              </li>
            )}

            {canViewServices && (
              <li>
                <Link to="/services" >
                  <i className="bx bx-wrench"></i>
                  <span>{props.t("Services")}</span>
                </Link>
              </li>
            )}

            {canViewPackages && (
              <li>
                <Link to="/service-packages" >
                  <i className="bx bx-package"></i>
                  <span>{props.t("Services Packages")}</span>
                </Link>
              </li>
            )}

            {canViewCoupons && (
              <li>
                <Link to="/coupons" className="">
                  <i className="bx bxs-offer"></i>
                  <span>{props.t("Coupons & Offers")}</span>
                </Link>
              </li>
            )}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>{props.t("Crypto")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/crypto-wallet">{props.t("Wallet")}</Link>
                </li>
                <li>
                  <Link to="/crypto-buy-sell">{props.t("Buy/Sell")}</Link>
                </li>
                <li>
                  <Link to="/crypto-exchange">{props.t("Exchange")}</Link>
                </li>
                <li>
                  <Link to="/crypto-lending">{props.t("Lending")}</Link>
                </li>
                <li>
                  <Link to="/crypto-orders">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="/crypto-kyc-application">
                    {props.t("KYC Application")}
                  </Link>
                </li>
                <li>
                  <Link to="/crypto-ico-landing">{props.t("ICO Landing")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-envelope"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/email-inbox">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("Read Email")} </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span key="t-email-templates">{props.t("Templates")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/email-template-basic">
                        {props.t("Basic Action")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-template-alert">
                        {props.t("Alert Email")}{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-template-billing">
                        {props.t("Billing Email")}{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Invoices")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/projects-grid">{props.t("Projects Grid")}</Link>
                </li>
                <li>
                  <Link to="/projects-list">{props.t("Projects List")}</Link>
                </li>
                <li>
                  <Link to="/projects-overview">
                    {props.t("Project Overview")}
                  </Link>
                </li>
                <li>
                  <Link to="/projects-create">{props.t("Create New")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>{props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tasks-list">{props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="/tasks-kanban">{props.t("Kanban Board")}</Link>
                </li>
                <li>
                  <Link to="/tasks-create">{props.t("Create Task")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="/contacts-list">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bxs-detail" />

                <span>{props.t("Blog")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/blog-list">{props.t("Blog List")}</Link>
                </li>
                <li>
                  <Link to="/blog-grid">{props.t("Blog Grid")}</Link>
                </li>
                <li>
                  <Link to="/blog-details">{props.t("Blog Details")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">                
                <i className="bx bx-briefcase-alt"></i>
                <span key="t-jobs">{props.t("Jobs")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/job-list">{props.t("Job List")}</Link></li>
                <li><Link to="/job-grid">{props.t("Job Grid")}</Link></li>
                <li><Link to="/job-apply">{props.t("Apply Job")}</Link></li>
                <li><Link to="/job-details">{props.t("Job Details")}</Link></li>
                <li><Link to="/job-categories">{props.t("Jobs Categories")}</Link></li>
                <li>
                  <Link to="/#" className="has-arrow">{props.t("Candidate")}</Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li><Link to="/candidate-list">{props.t("List")}</Link></li>
                    <li><Link to="/candidate-overview">{props.t("Overview")}</Link></li>
                  </ul>
                </li>
              </ul>
            </li> */}

            {showCustomersSection && <li className="menu-title">Customers</li>}
            {canViewCustomers && (
              <li>
                <Link to="/customers" className="">
                  <i className="bx bx-user-circle"></i>
                  <span>{props.t("Customers")}</span>
                </Link>
              </li>
            )}

            {showStaffSection && <li className="menu-title">{props.t("Staff & Managements")}</li>}
            {canViewStaff && (
              <li>
                <Link to="/staff" className="">
                  <i className="bx bx-group" />
                  <span>{props.t("Staff Management")}</span>
                </Link>
              </li>
            )}

            {canViewRoles && (
              <li>
                <Link to="/roles-permissions" className="">
                  <i className="bx bx-key" />
                  <span>{props.t("Roles & Permissions")}</span>
                </Link>
              </li>
            )}

            {canViewProducts && (
              <li>
                <Link to="/products" >
                  <i className="bx bx-cube"></i>
                  <span>{props.t("Products")}</span>
                </Link>
              </li>
            )}

            {canViewReports && (
              <li>
                <Link to="/reports" className="">
                  <i className="bx bx-bar-chart"></i>
                  <span>{props.t("Reports")}</span>
                </Link>
              </li>
            )}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/apex-charts">{props.t("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartjs Chart")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Knob Chart")}</Link>
                </li>
                <li>
                  <Link to="/re-charts">{props.t("Re Chart")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-aperture"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-map"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
                
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
