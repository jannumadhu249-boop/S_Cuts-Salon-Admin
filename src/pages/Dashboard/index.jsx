import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
} from "reactstrap"
import { Link } from "react-router-dom"
import classNames from "classnames"
import Flatpickr from "react-flatpickr"

// Import SCSS
import "./dashboard.scss"

// import action
import { getChartsData as onGetChartsData } from "../../store/actions"

// i18n
import { withTranslation } from "react-i18next"

// redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

const Dashboard = props => {
  const dispatch = useDispatch()
  const [periodType, setPeriodType] = useState("today")

  const DashboardProperties = createSelector(
    state => state.Dashboard,
    dashboard => ({
      chartsData: dashboard.chartsData,
    })
  )

  const { chartsData } = useSelector(DashboardProperties)

  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  // meta title
  document.title = "Dashboard | S-Cuts Admin"

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const summaryCards = [
    {
      title: "Today's Revenue",
      value: "₹0.00",
      desc: "Total collected",
      icon: "bx-rupee",
      class: "revenue",
      link: "/invoice-billing",
    },
    {
      title: "Cashflow",
      value: "₹0.00",
      desc: "Net positive",
      icon: "bx-trending-up",
      class: "cashflow",
      link: "/reports",
    },
    {
      title: "No. of Appointments",
      value: "0",
      desc: "of 0 appointments",
      icon: "bx-calendar-event",
      class: "appointments",
      link: "/appointments",
    },
    {
      title: "Total Customers",
      value: "0",
      desc: "Active customers",
      icon: "bx-user-plus",
      class: "customers",
      link: "/customers",
    },
    {
      title: "Total Walk-Ins",
      value: "0",
      desc: "No-registration bills",
      icon: "bx-walk",
      class: "walkins",
      link: "/reports",
    },
  ]

  const actionButtons = [
    { label: "New Invoice", icon: "bx-cart", link: "/pos" },
    { label: "New Appointment", icon: "bx-calendar-plus", link: "/appointments" },
    { label: "Add Customer", icon: "bx-user-plus", link: "/customers" },
    { label: "View Reports", icon: "bx-bar-chart-alt-2", link: "/reports" },
  ]

  return (
    <React.Fragment>
      <div className="page-content dashboard-sans">
        <Container fluid>
          {/* Header Section */}
          <div className="dashboard-header mb-4">
            {/* <div className="header-left d-flex align-items-center gap-3">
              <h3 className="mb-0 me-3">Good Morning, Scuts Unisex Salon & Spa 👋</h3>
              <p className="mb-0 text-muted d-none d-md-block">Today's performance overview.</p>
            </div> */}
            <div className="header-left d-flex flex-column justify-content-center">
              <h3 className="mb-1 fw-semibold text-dark">
                {getGreeting()}, <span className="fw-bold">Scuts Unisex Salon & Spa</span> 👋
              </h3>
              <p className="mb-0 text-muted small d-none d-md-block">
                Here's what's happening with your salon today.
              </p>
            </div>
            <div className="header-right d-flex align-items-center gap-3">
              <div className="d-flex gap-2 bg-white p-1 rounded-pill shadow-sm">
                {["Today", "7 Days", "30 Days", "90 Days"].map(item => (
                  <button
                    key={item}
                    className={classNames("btn-time-filter rounded-pill border-0 px-3 py-1", {
                      active: periodType === item.toLowerCase().replace(" ", ""),
                      "bg-transparent text-dark": periodType !== item.toLowerCase().replace(" ", ""),
                    })}
                    onClick={() => setPeriodType(item.toLowerCase().replace(" ", ""))}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="date-picker-wrapper">
                <Flatpickr
                  className="form-control rounded-pill border-0 bg-white shadow-sm"
                  options={{
                    mode: "range",
                    dateFormat: "M j, Y",
                    defaultDate: [new Date(), new Date()],
                  }}
                />
              </div>
              <Link to="/pos">  
                <Button className="open-pos-btn rounded-pill px-3">
                  <i className="bx bx-cart me-1"></i>
                  Open POS
                </Button>
              </Link>
            </div>
          </div>

          <Row className="g-3">
            {summaryCards.map((card, key) => (
              <Col key={key} className="col-xl col-md-4 col-12">
                <Link to={card.link} className="text-decoration-none h-100 d-block">
                  <Card className={classNames("summary-card rounded-4 border-0 h-100", card.class)}>
                    <CardBody className="h-100">
                      <div>
                        <div className="card-title text-white">{card.title}</div>
                        <div className="card-value text-white">{card.value}</div>
                        <div className="card-desc text-white">{card.desc}</div>
                      </div>
                      <div className="card-icon text-white rounded-pill">
                        <i className={classNames("bx", card.icon)}></i>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {/* Action Buttons */}
          <div className="action-buttons-row">
            {actionButtons.map((btn, key) => (
              <div key={key} className="action-btn-item">
                <Link to={btn.link} className="icon-circle">
                  <i className={classNames("bx", btn.icon)}></i>
                </Link>
                <span>{btn.label}</span>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <Row>
            <Col xl={7}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Revenue & Appointments</h5>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <p>No hourly data available</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={5}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Payment Breakdown</h5>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <i className="bx bx-rupee"></i>
                    <p>No payments today</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xl={12}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Staff Leaderboard</h5>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <p>Staff leaderboard will appear here once services are performed.</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xl={6}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Upcoming Appointments</h5>
                  <Link to="/appointments" className="btn btn-light btn-md rounded-pill">View All</Link>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <i className="bx bx-calendar"></i>
                    <p>No upcoming appointments</p>
                    <Link to="/appointments" className="text-primary fw-medium">Schedule an appointment</Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Recent Billing Activity</h5>
                  <Link to="/invoice-billing" className="btn btn-light btn-md rounded-pill">View All</Link>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <i className="bx bx-file"></i>
                    <p>No billing activity today</p>
                    <Link to="/pos" className="text-primary fw-medium">Create an invoice</Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xl={12}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5><i className="bx bx-star text-warning me-2"></i>Customer Reviews</h5>
                  <Link to="#" className="btn btn-light btn-md rounded-pill">Manage Reviews</Link>
                </div>
                <CardBody>
                  <div className="empty-state">
                    <i className="bx bx-star"></i>
                    <p>No reviews yet</p>
                    <p className="text-muted small">Add customer reviews to showcase here</p>
                    <Link to="#" className="text-primary fw-medium">Add Your First Review</Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Footer Actions */}
          <div className="footer-actions">
            <Link to="/appointments" className="footer-btn btn-md rounded-pill">
              <i className="bx bx-calendar"></i> Manage Appointments
            </Link>
            <Link to="#" className="footer-btn btn-md rounded-pill">
              <i className="bx bx-user"></i> Customer Management
            </Link>
            <Link to="#" className="footer-btn btn-md rounded-pill">
              <i className="bx bx-bar-chart-alt-2"></i> View Reports
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)

