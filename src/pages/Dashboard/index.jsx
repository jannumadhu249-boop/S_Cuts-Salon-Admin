// import PropTypes from "prop-types"
// import React, { useEffect, useState } from "react"
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Card,
//   CardBody,
//   Input,
// } from "reactstrap"
// import { Link } from "react-router-dom"
// import classNames from "classnames"
// import Flatpickr from "react-flatpickr"

// // Import SCSS
// import "./dashboard.scss"

// // import action
// import { getChartsData as onGetChartsData } from "../../store/actions"

// // i18n
// import { withTranslation } from "react-i18next"

// // redux
// import { useSelector, useDispatch } from "react-redux"
// import { createSelector } from "reselect"

// const Dashboard = props => {
//   const dispatch = useDispatch()
//   const [periodType, setPeriodType] = useState("today")

//   const DashboardProperties = createSelector(
//     state => state.Dashboard,
//     dashboard => ({
//       chartsData: dashboard.chartsData,
//     })
//   )

//   const { chartsData } = useSelector(DashboardProperties)

//   useEffect(() => {
//     dispatch(onGetChartsData("yearly"))
//   }, [dispatch])

//   // meta title
//   document.title = "Dashboard | S-Cuts Admin"

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const summaryCards = [
//     {
//       title: "Today's Revenue",
//       value: "₹0.00",
//       desc: "Total collected",
//       icon: "bx-rupee",
//       class: "revenue",
//       link: "/invoice-billing",
//     },
//     {
//       title: "Cashflow",
//       value: "₹0.00",
//       desc: "Net positive",
//       icon: "bx-trending-up",
//       class: "cashflow",
//       link: "/reports",
//     },
//     {
//       title: "No. of Appointments",
//       value: "0",
//       desc: "of 0 appointments",
//       icon: "bx-calendar-event",
//       class: "appointments",
//       link: "/appointments",
//     },
//     {
//       title: "Total Customers",
//       value: "0",
//       desc: "Active customers",
//       icon: "bx-user-plus",
//       class: "customers",
//       link: "/customers",
//     },
//     {
//       title: "Total Products",
//       value: "0",
//       desc: "Products Sold",
//       icon: "bx-walk",
//       class: "walkins",
//       link: "/reports",
//     },
//   ]

//   const actionButtons = [
//     { label: "New Invoice", icon: "bx-cart", link: "/pos" },
//     { label: "New Appointment", icon: "bx-calendar-plus", link: "/appointments" },
//     { label: "Add Customer", icon: "bx-user-plus", link: "/customers" },
//     { label: "View Reports", icon: "bx-bar-chart-alt-2", link: "/reports" },
//   ]

//   return (
//     <React.Fragment>
//       <div className="page-content dashboard-sans">
//         <Container fluid>
//           {/* Header Section */}
//           <div className="dashboard-header mb-4">
//             <div className="header-left d-flex flex-column justify-content-center">
//               <h3 className="mb-1 fw-semibold text-dark">
//                 {getGreeting()}, <span className="fw-bold">Scuts Unisex Salon & Spa</span> 👋
//               </h3>
//               <p className="mb-0 text-muted small d-none d-md-block">
//                 Here's what's happening with your salon today.
//               </p>
//             </div>
//             <div className="header-right d-flex align-items-center gap-3">
//               <div className="d-flex gap-2 bg-white p-1 rounded-pill shadow-sm">
//                 {["Today", "7 Days", "30 Days", "90 Days"].map(item => (
//                   <button
//                     key={item}
//                     className={classNames("btn-time-filter rounded-pill border-0 px-3 py-1", {
//                       active: periodType === item.toLowerCase().replace(" ", ""),
//                       "bg-transparent text-dark": periodType !== item.toLowerCase().replace(" ", ""),
//                     })}
//                     onClick={() => setPeriodType(item.toLowerCase().replace(" ", ""))}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//               <div className="date-picker-wrapper">
//                 <Flatpickr
//                   className="form-control rounded-pill border-0 bg-white shadow-sm"
//                   options={{
//                     mode: "range",
//                     dateFormat: "M j, Y",
//                     defaultDate: [new Date(), new Date()],
//                   }}
//                 />
//               </div>
//               <Link to="/pos">  
//                 <Button className="open-pos-btn rounded-pill px-3">
//                   <i className="bx bx-cart me-1"></i>
//                   Open POS
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           <Row className="g-3">
//             {summaryCards.map((card, key) => (
//               <Col key={key} className="col-xl col-md-4 col-12">
//                 <Link to={card.link} className="text-decoration-none h-100 d-block">
//                   <Card className={classNames("summary-card rounded-4 border-0 h-100", card.class)}>
//                     <CardBody className="h-100">
//                       <div>
//                         <div className="card-title text-white">{card.title}</div>
//                         <div className="card-value text-white">{card.value}</div>
//                         <div className="card-desc text-white">{card.desc}</div>
//                       </div>
//                       <div className="card-icon text-white rounded-pill">
//                         <i className={classNames("bx", card.icon)}></i>
//                       </div>
//                     </CardBody>
//                   </Card>
//                 </Link>
//               </Col>
//             ))}
//           </Row>

//           {/* Action Buttons */}
//           <div className="action-buttons-row">
//             {actionButtons.map((btn, key) => (
//               <div key={key} className="action-btn-item">
//                 <Link to={btn.link} className="icon-circle">
//                   <i className={classNames("bx", btn.icon)}></i>
//                 </Link>
//                 <span>{btn.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* Main Content Grid */}
//           <Row>
//             <Col xl={7}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5>Revenue & Appointments</h5>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <p>No hourly data available</p>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col xl={5}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5>Payment Breakdown</h5>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <i className="bx bx-rupee"></i>
//                     <p>No payments today</p>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="mt-4">
//             <Col xl={12}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5>Staff Leaderboard</h5>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <p>Staff leaderboard will appear here once services are performed.</p>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="mt-4">
//             <Col xl={6}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5>Upcoming Appointments</h5>
//                   <Link to="/appointments" className="btn btn-light btn-md rounded-pill">View All</Link>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <i className="bx bx-calendar"></i>
//                     <p>No upcoming appointments</p>
//                     <Link to="/appointments" className="text-primary fw-medium">Schedule an appointment</Link>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col xl={6}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5>Recent Billing Activity</h5>
//                   <Link to="/invoice-billing" className="btn btn-light btn-md rounded-pill">View All</Link>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <i className="bx bx-file"></i>
//                     <p>No billing activity today</p>
//                     <Link to="/pos" className="text-primary fw-medium">Create an invoice</Link>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <Row className="mt-4">
//             <Col xl={12}>
//               <Card className="dashboard-grid-card rounded-4">
//                 <div className="card-header">
//                   <h5><i className="bx bx-star text-warning me-2"></i>Customer Reviews</h5>
//                   <Link to="#" className="btn btn-light btn-md rounded-pill">Manage Reviews</Link>
//                 </div>
//                 <CardBody>
//                   <div className="empty-state">
//                     <i className="bx bx-star"></i>
//                     <p>No reviews yet</p>
//                     <p className="text-muted small">Add customer reviews to showcase here</p>
//                     <Link to="#" className="text-primary fw-medium">Add Your First Review</Link>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           {/* Footer Actions */}
//           <div className="footer-actions">
//             <Link to="/appointments" className="footer-btn btn-md rounded-pill">
//               <i className="bx bx-calendar"></i> Manage Appointments
//             </Link>
//             <Link to="#" className="footer-btn btn-md rounded-pill">
//               <i className="bx bx-user"></i> Customer Management
//             </Link>
//             <Link to="#" className="footer-btn btn-md rounded-pill">
//               <i className="bx bx-bar-chart-alt-2"></i> View Reports
//             </Link>
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

// Dashboard.propTypes = {
//   t: PropTypes.any,
//   chartsData: PropTypes.any,
//   onGetChartsData: PropTypes.func,
// }

// export default withTranslation()(Dashboard)




import PropTypes from "prop-types"
import React, { useEffect, useState, useCallback } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap"
import { Link } from "react-router-dom"
import classNames from "classnames"
import Flatpickr from "react-flatpickr"
import { post } from "../../helpers/api_helper"

// Import SCSS
import "./dashboard.scss"

// i18n
import { withTranslation } from "react-i18next"
import { URLS } from "../../url"

// ---------- Helpers ----------
const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getDateRange = (periodType, customRange = null) => {
  // If custom date range is selected, use it
  if (customRange && customRange.length === 2) {
    return {
      fromDate: formatDate(customRange[0]),
      toDate: formatDate(customRange[1]),
    }
  }

  const today = new Date()
  const toDate = formatDate(today)
  let fromDate = toDate

  switch (periodType) {
    case "7days": {
      const past = new Date(today)
      past.setDate(past.getDate() - 6)
      fromDate = formatDate(past)
      break
    }
    case "30days": {
      const past = new Date(today)
      past.setDate(past.getDate() - 29)
      fromDate = formatDate(past)
      break
    }
    case "90days": {
      const past = new Date(today)
      past.setDate(past.getDate() - 89)
      fromDate = formatDate(past)
      break
    }
    case "custom":
      // Custom range should be handled above
      break
    case "today":
    default:
      // fromDate equals toDate for today
      break
  }

  return { fromDate, toDate }
}

// ---------- Component ----------
const Dashboard = (props) => {
  // Local state
  const [periodType, setPeriodType] = useState("today")
  const [customDateRange, setCustomDateRange] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get greeting - moved outside to always be available
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  // Function to fetch data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { fromDate, toDate } = getDateRange(periodType, customDateRange)
    try {
      const response = await post(URLS.GetDashboard, { fromDate, toDate })

      if (response.success) {
        setDashboardData(response.data)
      } else {
        setError(response.message || "Failed to fetch dashboard data")
      }
    } catch (err) {
      console.error('Dashboard API Error:', err)
      setError(err.response?.data?.message || err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [periodType, customDateRange])

  // Fetch on mount and whenever periodType or customDateRange changes
  useEffect(() => {
    fetchDashboardData()
  }, [periodType, customDateRange])

  // Meta title
  document.title = "Dashboard | S-Cuts Admin"

  // Dynamic greeting from API or local fallback
  // Check if greetingMessage exists and is not empty
  const greetingMessage = (dashboardData?.greetingMessage && dashboardData.greetingMessage.trim() !== "") 
    ? dashboardData.greetingMessage 
    : `${getGreeting()}, Scuts Unisex Salon & Spa 👋`


  // Summary cards from API
  const summaryCards = [
    {
      title: "Today's Revenue",
      value: `₹${(dashboardData?.todayRevenue || 0).toFixed(2)}`,
      desc: "Total collected",
      icon: "bx-rupee",
      class: "revenue",
      link: "/invoice-billing",
    },
    {
      title: "Cashflow",
      value: `₹${(dashboardData?.totalCashFlow || 0).toFixed(2)}`,
      desc: "Net positive",
      icon: "bx-trending-up",
      class: "cashflow",
      link: "/reports",
    },
    {
      title: "No. of Appointments",
      value: dashboardData?.todaysAppointments || 0,
      desc: `of ${(dashboardData?.todaysAppointments || 0) + (dashboardData?.upcomingAppointments || 0)} total`,
      icon: "bx-calendar-event",
      class: "appointments",
      link: "/appointments",
    },
    {
      title: "Total Customers",
      value: dashboardData?.totalCustomers || 0,
      desc: "Active customers",
      icon: "bx-user-plus",
      class: "customers",
      link: "/customers",
    },
    {
      title: "Total Products",
      value: dashboardData?.totalProducts || 0,
      desc: "No Products Sold",
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

  // Render functions for each section
  const renderPaymentBreakdown = () => {
    if (!dashboardData?.paymentBreakdown?.length) {
      return (
        <div className="empty-state">
          <i className="bx bx-rupee"></i>
          <p>No payments today</p>
        </div>
      )
    }
    return (
      <ul className="list-unstyled mb-0">
        {dashboardData.paymentBreakdown.map((item, idx) => (
          <li key={idx} className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-capitalize">{item._id || "Other"}</span>
            <span className="fw-medium">₹{item.totalAmount?.toFixed(2) || "0.00"}</span>
          </li>
        ))}
      </ul>
    )
  }

  const renderRevenueChart = () => {
    if (!dashboardData?.revenueAndAppointments?.length) {
      return (
        <div className="empty-state">
          <p>No hourly data available</p>
        </div>
      )
    }
    // Placeholder – replace with your chart library (e.g., Recharts)
    return (
      <div>
        {dashboardData.revenueAndAppointments.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between py-1">
            <span>{item.hour || item.label}</span>
            <span>₹{item.revenue || 0}</span>
            <span>{item.appointments || 0} appts</span>
          </div>
        ))}
      </div>
    )
  }

  const renderRecentBilling = () => {
    if (!dashboardData?.recentBilling?.length) {
      return (
        <div className="empty-state">
          <i className="bx bx-file"></i>
          <p>No billing activity today</p>
          <Link to="/pos" className="text-primary fw-medium">Create an invoice</Link>
        </div>
      )
    }
    return (
      <div className="table-responsive">
        <table className="table table-sm table-borderless">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBilling.map((bill, idx) => (
              <tr key={bill._id || idx}>
                <td className="fw-medium">{bill.customerId?.name || "N/A"}</td>
                <td className="text-muted">{bill.customerId?.phone || "N/A"}</td>
                <td className="fw-bold text-success">₹{bill.grandTotal?.toFixed(2) || "0.00"}</td>
                <td className="text-muted small">{bill.logCreatedDate ? new Date(bill.logCreatedDate).toLocaleString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderReviews = () => {
    if (!dashboardData?.reviews?.length) {
      return (
        <div className="empty-state">
          <i className="bx bx-star"></i>
          <p>No reviews yet</p>
          <p className="text-muted small">Add customer reviews to showcase here</p>
          <Link to="#" className="text-primary fw-medium">Add Your First Review</Link>
        </div>
      )
    }
    return (
      <>
        <div className="d-flex align-items-center mb-3">
          <span className="fw-bold me-2">Average Rating:</span>
          <span className="text-warning me-1">
            {"★".repeat(Math.round(dashboardData.averageRating || 0))}
          </span>
          <span>({(dashboardData.averageRating || 0).toFixed(1)})</span>
          <span className="ms-auto">Total: {dashboardData.totalReviews || 0} reviews</span>
        </div>
        {dashboardData.reviews.map((review) => (
          <div key={review._id} className="border-bottom pb-3 mb-3">
            <div className="d-flex align-items-start gap-3">
              {review.image && (
                <img
                  src={`${URLS.Base}${review.image}`}
                  alt={review.userName}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect width='50' height='50' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3E%3F%3C/text%3E%3C/svg%3E"
                  }}
                />
              )}
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <strong className="d-block">{review.userName}</strong>
                    {review.email && <small className="text-muted">{review.email}</small>}
                  </div>
                  <div className="text-warning" style={{ fontSize: '1.1rem' }}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-muted mb-0 small">{review.description}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <React.Fragment>
      <div className="page-content dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="dashboard-header mb-4">
            <div className="header-left d-flex flex-column justify-content-center">
              <h3 className="mb-1 fw-semibold text-dark">{greetingMessage}</h3>
              <p className="mb-0 text-muted small d-none d-md-block">
                Here's what's happening with your salon today.
              </p>
            </div>
            <div className="header-right d-flex align-items-center gap-3">
              <div className="d-flex gap-2 bg-white p-1 rounded-pill shadow-sm">
                {[
                  { label: "Today", value: "today" },
                  { label: "7 Days", value: "7days" },
                  { label: "30 Days", value: "30days" },
                  { label: "90 Days", value: "90days" }
                ].map((item) => (
                  <button
                    key={item.value}
                    className={classNames("btn-time-filter rounded-pill border-0 px-3 py-1", {
                      active: periodType === item.value,
                      "bg-transparent text-dark": periodType !== item.value,
                    })}
                    onClick={() => {
                      setPeriodType(item.value)
                      setCustomDateRange(null) // Clear custom date range when using preset
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="date-picker-wrapper">
                <Flatpickr
                  className="form-control rounded-pill border-0 bg-white shadow-sm"
                  options={{
                    mode: "range",
                    dateFormat: "M j, Y",
                  }}
                  value={customDateRange || [new Date(), new Date()]}
                  onChange={(dates) => {
                    if (dates && dates.length === 2) {
                      setCustomDateRange(dates)
                      setPeriodType("custom") // Set to custom when date picker is used
                    }
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

          {/* Error & Loading alerts */}
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && !dashboardData && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Summary Cards */}
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

          {/* Revenue & Payments */}
          <Row>
            <Col xl={7}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Revenue & Appointments</h5>
                </div>
                <CardBody>{loading ? <div className="text-center py-3">Loading...</div> : renderRevenueChart()}</CardBody>
              </Card>
            </Col>
            <Col xl={5}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Payment Breakdown</h5>
                </div>
                <CardBody>{loading ? <div className="text-center py-3">Loading...</div> : renderPaymentBreakdown()}</CardBody>
              </Card>
            </Col>
          </Row>

          {/* Staff Leaderboard (static placeholder) */}
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

          {/* Upcoming & Recent Billing */}
          <Row className="mt-4">
            <Col xl={6}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Upcoming Appointments</h5>
                  <Link to="/appointments" className="btn btn-light btn-md rounded-pill">View All</Link>
                </div>
                <CardBody>
                  {dashboardData?.upcomingAppointments > 0 ? (
                    <div className="text-center py-4">
                      <i className="bx bx-calendar-check display-4 text-success"></i>
                      <p className="mt-2 fw-medium">
                        You have {dashboardData.upcomingAppointments} upcoming
                      </p>
                      <Link to="/appointments" className="btn btn-primary rounded-pill">View Appointments</Link>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="bx bx-calendar"></i>
                      <p>No upcoming appointments</p>
                      <Link to="/appointments" className="text-primary fw-medium">Schedule an appointment</Link>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5>Recent Billing Activity</h5>
                  <Link to="/invoice-billing" className="btn btn-light btn-md rounded-pill">View All</Link>
                </div>
                <CardBody>{loading ? <div className="text-center py-3">Loading...</div> : renderRecentBilling()}</CardBody>
              </Card>
            </Col>
          </Row>

          {/* Customer Reviews */}
          <Row className="mt-4">
            <Col xl={12}>
              <Card className="dashboard-grid-card rounded-4">
                <div className="card-header">
                  <h5><i className="bx bx-star text-warning me-2"></i>Customer Reviews</h5>
                  <Link to="#" className="btn btn-light btn-md rounded-pill">Manage Reviews</Link>
                </div>
                <CardBody>{loading ? <div className="text-center py-3">Loading...</div> : renderReviews()}</CardBody>
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
}

export default withTranslation()(Dashboard)