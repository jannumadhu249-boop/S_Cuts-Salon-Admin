// import React, { useState } from "react"
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   Nav,
//   NavItem,
//   NavLink,
//   Input,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from "reactstrap"
// import Flatpickr from "react-flatpickr"
// import "flatpickr/dist/themes/material_blue.css"
// import classNames from "classnames"
// import ReactApexChart from "react-apexcharts"

// // Styles
// import "./reports.scss"

// const tabs = [
//   { id: "Sales", label: "Sales", icon: "bx bx-trending-up" },
//   { id: "Appointments", label: "Appointments", icon: "bx bx-calendar" },
//   { id: "Services", label: "Services", icon: "bx bx-cut" },
//   { id: "Packages", label: "Packages", icon: "bx bx-package" },
//   { id: "Staff", label: "Staff", icon: "bx bx-user-circle" },
//   // { id: "Commissions", label: "Commissions", icon: "bx bx-money" },
//   { id: "Customers", label: "Customers", icon: "bx bx-group" },
//   // { id: "Churn", label: "Churn", icon: "bx bx-user-minus" },
//   // { id: "Financial", label: "Financial", icon: "bx bx-wallet" },
//   { id: "Inventory", label: "Inventory", icon: "bx bx-box" },
//   // { id: "Messaging", label: "Messaging", icon: "bx bx-message-rounded" },
//   { id: "Coupons", label: "Coupons", icon: "bx bxs-discount" },
//   // { id: "Walk Ins", label: "Walk Ins", icon: "bx bx-walking" },
//   // { id: "Attendance", label: "Attendance", icon: "bx bx-user-check" },
//   // { id: "Memberships", label: "Memberships", icon: "bx bx-id-card" },
//   // { id: "Growth", label: "Growth", icon: "bx bx-line-chart-up" },
// ]

// const Reports = () => {
//   const [activeTab, setActiveTab] = useState("Sales")
//   const [dateFilterOpen, setDateFilterOpen] = useState(false)
//   const [exportOpen, setExportOpen] = useState(false)
//   const [selectedDateFilter, setSelectedDateFilter] = useState("Today")
  
//   const toggleDateFilter = () => setDateFilterOpen(!dateFilterOpen)
//   const toggleExport = () => setExportOpen(!exportOpen)

//   const toggleTab = tab => {
//     if (activeTab !== tab) setActiveTab(tab)
//   }

//   // ApexChart Options for Packages Trend
//   const lineChartOptions = {
//     chart: {
//       toolbar: { show: false },
//       zoom: { enabled: false }
//     },
//     colors: ['#22c55e'],
//     dataLabels: { enabled: false },
//     stroke: { curve: 'straight', width: 2 },
//     xaxis: {
//       categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       labels: {
//         style: { colors: '#9ca3af', fontSize: '12px' }
//       },
//       axisBorder: { show: true, color: '#e5e7eb' },
//       axisTicks: { show: true, color: '#e5e7eb' }
//     },
//     yaxis: {
//       labels: {
//         formatter: function (val) {
//           return "₹" + val + "K"
//         },
//         style: { colors: '#9ca3af', fontSize: '12px' }
//       }
//     },
//     grid: {
//       borderColor: '#f3f4f6',
//       strokeDashArray: 4,
//     }
//   }

//   const lineChartSeries = [{
//     name: 'Revenue',
//     data: [0, 0, 0, 0, 0, 0, 0]
//   }]

//   return (
//     <React.Fragment>
//       <div className="page-content reports-page dashboard-sans">
//         <Container fluid>
//           {/* Header Section */}
//           <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
//             <div>
//               <h3 className="fw-bold mb-0 text-dark"><i className="bx bx-bar-chart text-primary"></i> Reports</h3>
//               <p className="text-muted mb-0">Comprehensive analytics and insights</p>
//             </div>
//             <div className="d-flex gap-2">
//               <Dropdown isOpen={dateFilterOpen} toggle={toggleDateFilter}>
//                 <DropdownToggle color="light" className="rounded-pill px-3 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
//                   <i className="bx bx-calendar"></i> {selectedDateFilter} <i className="bx bx-chevron-down ms-1"></i>
//                 </DropdownToggle>
//                 <DropdownMenu>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Today")}>Today</DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Last 7 days")}>Last 7 days</DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Last 30 days")}>
//                     {selectedDateFilter === "Last 30 days" && <i className="bx bx-check me-2"></i>}
//                     Last 30 days
//                   </DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Last 90 days")}>Last 90 days</DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Last Year")}>Last Year</DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("All Time")}>All Time</DropdownItem>
//                   <DropdownItem onClick={() => setSelectedDateFilter("Custom Range")}>Custom Range</DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
              
//               <div className="position-relative">
//                 <i className="bx bx-calendar-event position-absolute text-muted" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}></i>
//                 <Flatpickr
//                   className="form-control rounded-pill bg-white border shadow-sm fw-medium text-dark ps-5"
//                   placeholder="Apr 2 - May 2"
//                   options={{
//                     mode: "range",
//                     dateFormat: "M j",
//                   }}
//                   style={{ width: '180px', cursor: 'pointer' }}
//                 />
//               </div>

//               <Dropdown isOpen={exportOpen} toggle={toggleExport}>
//                 <DropdownToggle color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
//                   <i className="bx bx-download"></i> Export
//                 </DropdownToggle>
//                 <DropdownMenu right>
//                   <DropdownItem header className="fw-bold text-dark">Export Format</DropdownItem>
//                   {/* <DropdownItem><i className="bx bx-file me-2 text-muted"></i> CSV (.csv)</DropdownItem> */}
//                   <DropdownItem><i className="bx bx-spreadsheet me-2 text-muted"></i> Excel (.xlsx)</DropdownItem>
//                   {/* <DropdownItem><i className="bx bx-spreadsheet me-2 text-muted"></i> Excel 97-2003 (.xls)</DropdownItem> */}
//                   <DropdownItem><i className="bx bxs-file-pdf me-2 text-muted"></i> PDF (.pdf)</DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           </div>

//           <Card className="empty-state-card mb-4 mt-2">
//             <i className="bx bx-box empty-icon"></i>
//             <h5>No data for selected filters</h5>
//             <p>Try adjusting the date range or add new activity to see reports.</p>
//           </Card>

//           {/* Global Cards */}
//           <Row>
//             <Col md={3}>
//               <Card className="stat-card">
//                 <CardBody>
//                   <div className="stat-content">
//                     <div className="stat-title">Total Revenue</div>
//                     <div className="stat-value">-</div>
//                     <div className="stat-subtitle">No data yet</div>
//                   </div>
//                   <div className="icon-box bg-purple-light">
//                     <i className="bx bx-rupee"></i>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="stat-card">
//                 <CardBody>
//                   <div className="stat-content">
//                     <div className="stat-title">Appointments</div>
//                     <div className="stat-value">-</div>
//                     <div className="stat-subtitle">No data yet</div>
//                   </div>
//                   <div className="icon-box bg-purple-light">
//                     <i className="bx bx-calendar"></i>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="stat-card">
//                 <CardBody>
//                   <div className="stat-content">
//                     <div className="stat-title">Total Products</div>
//                     <div className="stat-value">-</div>
//                     <div className="stat-subtitle">No data yet</div>
//                   </div>
//                   <div className="icon-box bg-purple-light">
//                     <i className="bx bx-user"></i>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//             <Col md={3}>
//               <Card className="stat-card">
//                 <CardBody>
//                   <div className="stat-content">
//                     <div className="stat-title">Commissions</div>
//                     <div className="stat-value">-</div>
//                     <div className="stat-subtitle">No data yet</div>
//                   </div>
//                   <div className="icon-box bg-purple-light">
//                     <i className="bx bx-group"></i>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           {/* Navigation Tabs */}
//           <Nav className="nav-tabs-custom mt-2">
//             {tabs.map(tab => (
//               <NavItem key={tab.id}>
//                 <NavLink
//                   className={classNames({ active: activeTab === tab.id })}
//                   onClick={() => toggleTab(tab.id)}
//                 >
//                   <i className={tab.icon}></i> {tab.label}
//                 </NavLink>
//               </NavItem>
//             ))}
//           </Nav>

//           {/* Tab Content */}
//           <div className="tab-content-section mt-4">
            
//             {activeTab === "Appointments" && (
//               <div>
//                 <Row>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Booked</div>
//                           <div className="stat-value">-</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-calendar"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Completed</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-green-light">
//                           <i className="bx bx-check-circle"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Cancelled</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-red-light">
//                           <i className="bx bx-x-circle text-danger"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">No Shows</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-orange-light">
//                           <i className="bx bx-error-circle text-warning"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Peak Hour</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-time"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </Row>

//                 <Card className="empty-state-card mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Appointments Data</h5>
//                   <p>Appointment reports will appear here once bookings are made.</p>
//                 </Card>
//               </div>
//             )}


//             {activeTab === "Inventory" && (
//               <div>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h4 className="section-title">Inventory Report</h4>
//                     <p className="section-subtitle">Stock levels and alerts overview</p>
//                   </div>
//                   <Button color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
//                     <i className="bx bx-download"></i> Export
//                   </Button>
//                 </div>
                
//                 <Row>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Items</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-box"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Low Stock</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-orange-light">
//                           <i className="bx bx-error text-warning"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Critical Stock</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-red-light">
//                           <i className="bx bx-error-circle"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Out of Stock</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-trending-down"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Stock Health</div>
//                           <div className="stat-value">-</div>
//                           <div className="stat-subtitle">No data yet</div>
//                         </div>
//                         <div className="icon-box bg-green-light">
//                           <i className="bx bx-trending-up"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </Row>

//                 <Card className="empty-state-card mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Inventory Data</h5>
//                   <p>Inventory reports will appear here once items are added.</p>
//                 </Card>
//               </div>
//             )}

//             {activeTab === "Customers" && (
//               <div>
//                 <Card className="empty-state-card mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Customer Data</h5>
//                   <p>Customer reports will appear here once customers are added.</p>
//                 </Card>
//               </div>
//             )}

//             {activeTab === "Staff" && (
//               <div>
//                 <Row>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Revenue</div>
//                           <div className="stat-value">₹0.00</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-rupee"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Services</div>
//                           <div className="stat-value">0</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-user"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Tips</div>
//                           <div className="stat-value">₹0.00</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-gift"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Total Commission</div>
//                           <div className="stat-value">₹0.00</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-trending-up"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Avg Bill Value</div>
//                           <div className="stat-value">₹0.00</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-credit-card"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </Row>

//                 <Card className="empty-state-card mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Staff Billing Data for Selected Period</h5>
//                   <p>Staff reports will appear here once invoices are created with staff assignments.</p>
//                 </Card>
//               </div>
//             )}

//             {activeTab === "Services" && (
//               <div>
//                 <Card className="empty-state-card mb-4 mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Service Data</h5>
//                   <p>Service reports will appear here once services are billed.</p>
//                 </Card>

//                 <Card className="chart-card">
//                   <CardBody>
//                     <h4 className="section-title mb-4">Detailed Service Report</h4>
//                     <div className="d-flex gap-3 mb-5">
//                       <Input type="select" className="form-select rounded-pill border-0 shadow-sm bg-light px-3 py-2" style={{ width: '180px' }}>
//                         <option>All categories</option>
//                       </Input>
//                       <Input type="select" className="form-select rounded-pill border-0 shadow-sm bg-light px-3 py-2" style={{ width: '180px' }}>
//                         <option>All staff</option>
//                       </Input>
//                     </div>

//                     <div className="text-center py-5">
//                       <i className="bx bx-box empty-icon"></i>
//                       <p className="text-muted mt-3 mb-0">No service data for the selected filters.</p>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </div>
//             )}

//             {activeTab === "Packages" && (
//               <div>
//                 <Row>
//                   <Col md={3}>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Packages Sold</div>
//                           <div className="stat-value">0</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-cart"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col md={3}>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Package Revenue</div>
//                           <div className="stat-value">₹0.00</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-rupee"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col md={3}>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Revenue Contribution</div>
//                           <div className="stat-value">0.0%</div>
//                           <div className="stat-subtitle">of total revenue</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-trending-up"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col md={3}>
//                     <Card className="stat-card">
//                       <CardBody>
//                         <div className="stat-content">
//                           <div className="stat-title">Active Packages</div>
//                           <div className="stat-value">0</div>
//                         </div>
//                         <div className="icon-box bg-purple-light">
//                           <i className="bx bx-package"></i>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </Row>

//                 <Row className="mt-2">
//                   <Col md={6}>
//                     <Card className="chart-card h-100">
//                       <CardBody>
//                         <h4 className="section-title">Sales Trend (Last 7 Days)</h4>
//                         <p className="section-subtitle">Daily package sales and revenue</p>
//                         <div className="mt-4">
//                           <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={280} />
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                   <Col md={6}>
//                     <Card className="chart-card h-100">
//                       <CardBody>
//                         <h4 className="section-title">Top Selling Packages</h4>
//                         <p className="section-subtitle">Distribution by quantity sold</p>
//                         <div className="d-flex align-items-center justify-content-center h-75">
//                           <p className="text-muted small">No package sales yet</p>
//                         </div>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 </Row>

//                 <Card className="chart-card mt-2">
//                   <CardBody className="p-0">
//                     <div className="p-4 border-bottom">
//                       <h4 className="section-title">Package Performance</h4>
//                       <p className="section-subtitle mb-0">Sales breakdown by package</p>
//                     </div>
//                     <div className="table-responsive">
//                       <table className="table custom-table mb-0 w-100">
//                         <thead className="bg-light bg-opacity-50 text-uppercase">
//                           <tr>
//                             <th>Package</th>
//                             <th className="text-end">Qty Sold</th>
//                             <th className="text-end">Revenue</th>
//                             <th className="text-end">Avg Price</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td colSpan="4" className="text-center py-5">
//                               <p className="text-muted small mb-0">No package sales recorded yet</p>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </div>
//             )}
            
//             {/* Fallback empty state for other tabs */}
//             {!["Appointments", "Inventory", "Customers", "Staff", "Services", "Packages"].includes(activeTab) && (
//               <div>
//                 <Card className="empty-state-card mt-2">
//                   <i className="bx bx-box empty-icon"></i>
//                   <h5>No Data Available</h5>
//                   <p>Data will appear here once relevant activities are recorded.</p>
//                 </Card>
//               </div>
//             )}
            
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

// export default Reports






import React, { useState, useEffect, useCallback } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import classNames from "classnames"
import ReactApexChart from "react-apexcharts"
import { post } from "../../helpers/api_helper"
import { URLS } from "../../url"
import * as XLSX from "xlsx"

// Styles
import "./reports.scss"

// ---------- Helpers ----------
const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getDateRangeFromFilter = (filter, customRange = []) => {
  if (filter === "Custom Range" && customRange && customRange.length === 2) {
    return {
      startDate: formatDate(customRange[0]),
      endDate: formatDate(customRange[1]),
    }
  }

  const today = new Date()
  switch (filter) {
    case "Today":
      return { startDate: formatDate(today), endDate: formatDate(today) }
    case "Last 7 days": {
      const start = new Date(today)
      start.setDate(start.getDate() - 6)
      return { startDate: formatDate(start), endDate: formatDate(today) }
    }
    case "Last 30 days": {
      const start = new Date(today)
      start.setDate(start.getDate() - 29)
      return { startDate: formatDate(start), endDate: formatDate(today) }
    }
    case "Last 90 days": {
      const start = new Date(today)
      start.setDate(start.getDate() - 89)
      return { startDate: formatDate(start), endDate: formatDate(today) }
    }
    case "Last Year": {
      const start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
      return { startDate: formatDate(start), endDate: formatDate(today) }
    }
    case "All Time":
    default:
      return { startDate: "", endDate: "" }
  }
}

// ---------- Component ----------
const Reports = () => {
  // UI state
  const [activeTab, setActiveTab] = useState("Sales")
  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Time")
  const [customDateRange, setCustomDateRange] = useState([])
  const [exportLoading, setExportLoading] = useState(false)

  // Data state
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch report data
  const fetchReport = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { startDate, endDate } = getDateRangeFromFilter(selectedDateFilter, customDateRange)

    try {
      const response = await post(URLS.GetReports, { startDate, endDate })

      if (response.success) {
        setReportData(response)
      } else {
        setError(response.message || "Failed to fetch reports")
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [selectedDateFilter, customDateRange])

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  // -------- EXPORT HANDLER --------
  const handleExport = async (format) => {
    if (!reportData || !reportData.data) {
      setError("No data to export. Please load a report first.");
      return;
    }

    setExportLoading(true);
    setError(null);

    try {
      if (format === "excel") {
        // ---- Build Excel workbook ----
        const workbook = XLSX.utils.book_new();

        // Summary sheet
        if (reportData.summary) {
          const summaryRows = [
            { Metric: "Total Revenue", Value: reportData.summary.totalRevenue || 0 },
            { Metric: "Total Appointments", Value: reportData.summary.totalAppointments || 0 },
            { Metric: "Packages Sold", Value: reportData.summary.totalPackagesSold || 0 },
          ];
          const summaryWS = XLSX.utils.json_to_sheet(summaryRows);
          XLSX.utils.book_append_sheet(workbook, summaryWS, "Summary");
        }

        // Function to add a sheet from a data object
        const addSheet = (name, dataObj) => {
          if (dataObj && Object.keys(dataObj).length > 0) {
            const arr = [dataObj]; // wrap single object
            const ws = XLSX.utils.json_to_sheet(arr);
            XLSX.utils.book_append_sheet(workbook, ws, name);
          }
        };

        // Add each tab’s data
        addSheet("Sales", reportData.data.sales);
        addSheet("Appointments", reportData.data.appointments);
        addSheet("Services", reportData.data.services);
        addSheet("Packages", reportData.data.packages);
        addSheet("Packages Analytics", reportData.data.packagesAnalytics);
        addSheet("Staff", reportData.data.staff);
        addSheet("Customers", reportData.data.customers);
        addSheet("Inventory", reportData.data.inventory);
        addSheet("Coupons", reportData.data.coupons);
        addSheet("Memberships", reportData.data.memberships);

        // Top services / packages arrays – make each a sheet
        if (reportData.data.topServices?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(reportData.data.topServices);
          XLSX.utils.book_append_sheet(workbook, ws, "Top Services");
        }
        if (reportData.data.topPackages?.length > 0) {
          const ws = XLSX.utils.json_to_sheet(reportData.data.topPackages);
          XLSX.utils.book_append_sheet(workbook, ws, "Top Packages");
        }

        // Download the file
        XLSX.writeFile(workbook, `report_${formatDate(new Date())}.xlsx`);
      } else if (format === "pdf") {
        // Optional: PDF generation (left for you to implement with jsPDF if needed)
        setError("PDF export is not yet available. Please use Excel.");
      }
    } catch (err) {
      setError("Export failed. Please try again.");
      console.error(err);
    } finally {
      setExportLoading(false);
    }
  };
  
  // Handlers
  const toggleDateFilter = () => setDateFilterOpen(!dateFilterOpen)
  const toggleExport = () => setExportOpen(!exportOpen)

  const handleDateFilterSelect = (filter) => {
    setSelectedDateFilter(filter)
    if (filter !== "Custom Range") {
      setCustomDateRange([])
    }
  }

  const handleCustomDateChange = (dates) => {
    setCustomDateRange(dates)
    if (dates.length === 2) {
      setSelectedDateFilter("Custom Range")
    }
  }

  // Tab definitions (unchanged)
  const tabs = [
    { id: "Sales", label: "Sales", icon: "bx bx-trending-up" },
    { id: "Appointments", label: "Appointments", icon: "bx bx-calendar" },
    { id: "Services", label: "Services", icon: "bx bx-cut" },
    { id: "Packages", label: "Packages", icon: "bx bx-package" },
    { id: "Staff", label: "Staff", icon: "bx bx-user-circle" },
    { id: "Customers", label: "Customers", icon: "bx bx-group" },
    { id: "Inventory", label: "Inventory", icon: "bx bx-box" },
    { id: "Coupons", label: "Coupons", icon: "bx bxs-discount" },
  ]

  // ------ Render helpers for each tab ------
  const renderSalesTab = () => {
    const s = reportData?.data?.sales
    if (!s) return <EmptyState message="No sales data available" />
    return (
      <>
        <Row>
          <StatCard title="Total Bills" value={s.totalBills || 0} icon="bx bx-receipt" />
          <StatCard title="Total Revenue" value={`₹${(s.totalRevenue || 0).toFixed(2)}`} icon="bx bx-rupee" />
          <StatCard title="Sub Total" value={`₹${(s.totalSubTotal || 0).toFixed(2)}`} icon="bx bx-cart-alt" />
          <StatCard title="Discounts" value={`₹${(s.totalDiscount || 0).toFixed(2)}`} icon="bx bx-purchase-tag" />
          <StatCard title="Tips" value={`₹${(s.totalTips || 0).toFixed(2)}`} icon="bx bx-gift" />
        </Row>
        <Row className="mt-2">
          <StatCard title="Paid Bills" value={s.paidBills || 0} icon="bx bx-check-circle" color="green" />
          <StatCard title="Pending Bills" value={s.pendingBills || 0} icon="bx bx-time-five" color="orange" />
          <StatCard title="Cash Payments" value={`₹${(s.cashPayments || 0).toFixed(2)}`} icon="bx bx-money" />
          <StatCard title="Card Payments" value={`₹${(s.cardPayments || 0).toFixed(2)}`} icon="bx bx-credit-card" />
          <StatCard title="UPI Payments" value={`₹${(s.upiPayments || 0).toFixed(2)}`} icon="bx bx-qr-scan" />
        </Row>
      </>
    )
  }

  const renderAppointmentsTab = () => {
    const a = reportData?.data?.appointments
    if (!a) return <EmptyState message="No appointments data" />
    return (
      <>
        <Row>
          <StatCard title="Total Booked" value={a.totalAppointments || 0} icon="bx bx-calendar" />
          <StatCard title="Completed" value={a.completedAppointments || 0} icon="bx bx-check-circle" color="green" />
          <StatCard title="Cancelled" value={a.cancelledAppointments || 0} icon="bx bx-x-circle" color="red" />
          <StatCard title="No Shows" value={a.noShowAppointments || 0} icon="bx bx-error-circle" color="orange" />
          <StatCard title="Upcoming" value={a.upcomingAppointments || 0} icon="bx bx-calendar-event" color="blue" />
        </Row>
        <Row className="mt-2">
          <StatCard title="Web Bookings" value={a.webBookings || 0} icon="bx bx-globe" />
          <StatCard title="POS Bookings" value={a.posBookings || 0} icon="bx bx-laptop" />
        </Row>
      </>
    )
  }

  const renderServicesTab = () => {
    const s = reportData?.data?.services
    if (!s) return <EmptyState message="No service data" />
    return (
      <>
        <Row>
          <StatCard title="Total Services" value={s.totalServices || 0} icon="bx bx-cut" />
          <StatCard title="Active Services" value={s.activeServices || 0} icon="bx bx-check-shield" color="green" />
          <StatCard title="Inactive Services" value={s.inactiveServices || 0} icon="bx bx-shield-x" color="red" />
        </Row>
        {reportData?.data?.topServices?.length > 0 && (
          <Card className="chart-card mt-2">
            <CardBody>
              <h4 className="section-title">Top Services</h4>
              <div className="table-responsive">
                <table className="table custom-table mb-0 w-100">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th className="text-end">Qty Sold</th>
                      <th className="text-end">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.data.topServices.map((svc, idx) => (
                      <tr key={idx}>
                        <td>{svc._id}</td>
                        <td className="text-end">{svc.totalSold}</td>
                        <td className="text-end">₹{svc.totalRevenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        )}
      </>
    )
  }

  const renderPackagesTab = () => {
    const p = reportData?.data?.packages
    const pa = reportData?.data?.packagesAnalytics
    if (!p || !pa) return <EmptyState message="No package data" />
    return (
      <>
        <Row>
          <StatCard title="Packages Sold" value={pa.packagesSold || 0} icon="bx bx-cart" />
          <StatCard title="Package Revenue" value={`₹${(pa.packageRevenue || 0).toFixed(2)}`} icon="bx bx-rupee" />
          <StatCard title="Revenue Contribution" value={`${pa.revenueContribution || 0}%`} icon="bx bx-trending-up" subtitle="of total revenue" />
          <StatCard title="Active Packages" value={pa.activePackages || 0} icon="bx bx-package" />
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <Card className="chart-card h-100">
              <CardBody>
                <h4 className="section-title">Sales Trend (Last 7 Days)</h4>
                <p className="section-subtitle">Daily package sales and revenue</p>
                <div className="mt-4">
                  <ReactApexChart
                    options={{
                      chart: { toolbar: { show: false }, zoom: { enabled: false } },
                      colors: ['#22c55e'],
                      dataLabels: { enabled: false },
                      stroke: { curve: 'straight', width: 2 },
                      xaxis: { categories: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] },
                      yaxis: {
                        labels: {
                          formatter: (val) => "₹" + val + "K",
                          style: { colors: '#9ca3af', fontSize: '12px' },
                        },
                      },
                      grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
                    }}
                    series={[{ name: 'Revenue', data: [0,0,0,0,0,0,0] }]}
                    type="line"
                    height={280}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="chart-card h-100">
              <CardBody>
                <h4 className="section-title">Top Selling Packages</h4>
                <p className="section-subtitle">Distribution by quantity sold</p>
                {pa.topSellingPackages?.length > 0 ? (
                  <div className="table-responsive mt-3">
                    <table className="table custom-table mb-0 w-100">
                      <thead>
                        <tr>
                          <th>Package</th>
                          <th className="text-end">Qty Sold</th>
                          <th className="text-end">Revenue</th>
                          <th className="text-end">Avg Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pa.topSellingPackages.map((pkg, idx) => (
                          <tr key={idx}>
                            <td>{pkg._id}</td>
                            <td className="text-end">{pkg.qtySold || 0}</td>
                            <td className="text-end">₹{(pkg.revenue || 0).toFixed(2)}</td>
                            <td className="text-end">₹{(pkg.avgPrice || 0).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted">No packages sold yet</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card className="chart-card mt-2">
          <CardBody>
            <h4 className="section-title">Package Performance</h4>
            <p className="section-subtitle">Sales breakdown by package</p>
            <div className="table-responsive">
              <table className="table custom-table mb-0 w-100">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th className="text-end">Qty Sold</th>
                    <th className="text-end">Revenue</th>
                    <th className="text-end">Avg Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pa.topSellingPackages?.length > 0 ? (
                    pa.topSellingPackages.map((pkg, idx) => (
                      <tr key={idx}>
                        <td>{pkg._id}</td>
                        <td className="text-end">{pkg.qtySold || 0}</td>
                        <td className="text-end">₹{(pkg.revenue || 0).toFixed(2)}</td>
                        <td className="text-end">₹{(pkg.avgPrice || 0).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-3">No package sales recorded yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </>
    )
  }

  const renderStaffTab = () => {
    const st = reportData?.data?.staff
    if (!st) return <EmptyState message="No staff data" />
    return (
      <>
        <Row>
          <StatCard title="Total Staff" value={st.totalStaff || 0} icon="bx bx-user-circle" />
          <StatCard title="Active Staff" value={st.activeStaff || 0} icon="bx bx-user-check" color="green" />
          <StatCard title="Archived Staff" value={st.archivedStaff || 0} icon="bx bx-user-x" color="red" />
          <StatCard title="Total Salary Expense" value={`₹${(st.totalSalaryExpense || 0).toFixed(2)}`} icon="bx bx-money" />
        </Row>
        <Card className="empty-state-card mt-2">
          <i className="bx bx-box empty-icon"></i>
          <h5>Detailed Staff Reports</h5>
          <p>Individual staff performance data will appear here when billing includes staff assignments.</p>
        </Card>
      </>
    )
  }

  const renderCustomersTab = () => {
    const c = reportData?.data?.customers
    if (!c) return <EmptyState message="No customer data" />
    return (
      <>
        <Row>
          <StatCard title="Total Customers" value={c.totalCustomers || 0} icon="bx bx-group" />
          <StatCard title="Male Customers" value={c.maleCustomers || 0} icon="bx bx-male-sign" />
          <StatCard title="Female Customers" value={c.femaleCustomers || 0} icon="bx bx-female-sign" />
        </Row>
      </>
    )
  }

  const renderInventoryTab = () => {
    const inv = reportData?.data?.inventory
    if (!inv) return <EmptyState message="No inventory data" />
    return (
      <>
        <Row>
          <StatCard title="Total Products" value={inv.totalProducts || 0} icon="bx bx-box" />
          <StatCard title="Low Stock" value={inv.lowStockProducts || 0} icon="bx bx-error" color="orange" />
          <StatCard title="Out of Stock" value={inv.outOfStockProducts || 0} icon="bx bx-error-circle" color="red" />
        </Row>
      </>
    )
  }

  const renderCouponsTab = () => {
    const coup = reportData?.data?.coupons
    if (!coup) return <EmptyState message="No coupon data" />
    return (
      <Row>
        <StatCard title="Total Coupons" value={coup.totalCoupons || 0} icon="bx bxs-discount" />
        <StatCard title="Active Coupons" value={coup.activeCoupons || 0} icon="bx bx-check-shield" color="green" />
        <StatCard title="Inactive Coupons" value={coup.inactiveCoupons || 0} icon="bx bx-shield-x" color="red" />
      </Row>
    )
  }

  const EmptyState = ({ message }) => (
    <Card className="empty-state-card mt-2">
      <i className="bx bx-box empty-icon"></i>
      <h5>No Data Available</h5>
      <p>{message || "Data will appear here once relevant activities are recorded."}</p>
    </Card>
  )

  const StatCard = ({ title, value, icon, color = "purple", subtitle }) => (
    <Col md={3} className="mb-3">
      <Card className="stat-card">
        <CardBody>
          <div className="stat-content">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value !== undefined ? value : "-"}</div>
            {subtitle && <div className="stat-subtitle">{subtitle}</div>}
          </div>
          <div className={classNames("icon-box", `bg-${color}-light`)}>
            <i className={icon}></i>
          </div>
        </CardBody>
      </Card>
    </Col>
  )

  return (
    <React.Fragment>
      <div className="page-content reports-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"><i className="bx bx-bar-chart text-primary"></i> Reports</h3>
              <p className="text-muted mb-0">Comprehensive analytics and insights</p>
            </div>
            <div className="d-flex gap-2">
              <Dropdown isOpen={dateFilterOpen} toggle={toggleDateFilter}>
                <DropdownToggle color="light" className="rounded-pill px-3 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
                  <i className="bx bx-calendar"></i> {selectedDateFilter} <i className="bx bx-chevron-down ms-1"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleDateFilterSelect("Today")}>Today</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("Last 7 days")}>Last 7 days</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("Last 30 days")}>Last 30 days</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("Last 90 days")}>Last 90 days</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("Last Year")}>Last Year</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("All Time")}>All Time</DropdownItem>
                  <DropdownItem onClick={() => handleDateFilterSelect("Custom Range")}>Custom Range</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div className="position-relative">
                <i className="bx bx-calendar-event position-absolute text-muted" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}></i>
                <Flatpickr
                  className="form-control rounded-pill bg-white border shadow-sm fw-medium text-dark ps-5"
                  placeholder="Select date range"
                  options={{
                    mode: "range",
                    dateFormat: "M j, Y",
                  }}
                  style={{ width: '180px', cursor: 'pointer' }}
                  onChange={handleCustomDateChange}
                  value={customDateRange}
                />
              </div>

              {/* <Dropdown isOpen={exportOpen} toggle={toggleExport}>
                <DropdownToggle color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
                  <i className="bx bx-download"></i> Export
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem header className="fw-bold text-dark">Export Format</DropdownItem>
                  <DropdownItem><i className="bx bx-spreadsheet me-2 text-muted"></i> Excel (.xlsx)</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}

              {/* Export Dropdown – Updated */}
              <Dropdown isOpen={exportOpen} toggle={toggleExport}>
                <DropdownToggle color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
                  <i className="bx bx-download"></i> Export
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem header className="fw-bold text-dark">Export Format</DropdownItem>
                  <DropdownItem
                    onClick={() => handleExport("excel")}
                    disabled={exportLoading}
                  >
                    {exportLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : (
                      <i className="bx bx-spreadsheet me-2 text-muted"></i>
                    )}
                    Excel (.xlsx)
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleExport("pdf")}
                    disabled={exportLoading}
                  >
                    <i className="bx bxs-file-pdf me-2 text-muted"></i> PDF (.pdf)
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Error & Loading */}
          {error && <div className="alert alert-warning">{error}</div>}
          {loading && !reportData && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Global Summary Cards */}
          {reportData?.summary && (
            <Row>
              <Col md={3}>
                <Card className="stat-card">
                  <CardBody>
                    <div className="stat-content">
                      <div className="stat-title">Total Revenue</div>
                      <div className="stat-value">₹{(reportData.summary.totalRevenue || 0).toFixed(2)}</div>
                      <div className="stat-subtitle">Overall</div>
                    </div>
                    <div className="icon-box bg-purple-light">
                      <i className="bx bx-rupee"></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stat-card">
                  <CardBody>
                    <div className="stat-content">
                      <div className="stat-title">Appointments</div>
                      <div className="stat-value">{reportData.summary.totalAppointments || 0}</div>
                      <div className="stat-subtitle">Total booked</div>
                    </div>
                    <div className="icon-box bg-purple-light">
                      <i className="bx bx-calendar"></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stat-card">
                  <CardBody>
                    <div className="stat-content">
                      <div className="stat-title">Total Products</div>
                      <div className="stat-value">{reportData.data?.inventory?.totalProducts || 0}</div>
                      <div className="stat-subtitle">In inventory</div>
                    </div>
                    <div className="icon-box bg-purple-light">
                      <i className="bx bx-box"></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="stat-card">
                  <CardBody>
                    <div className="stat-content">
                      <div className="stat-title">Packages Sold</div>
                      <div className="stat-value">{reportData.summary.totalPackagesSold || 0}</div>
                      <div className="stat-subtitle">Total packages</div>
                    </div>
                    <div className="icon-box bg-purple-light">
                      <i className="bx bx-package"></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          {/* Tabs */}
          <Nav className="nav-tabs-custom mt-2">
            {tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  className={classNames({ active: activeTab === tab.id })}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={tab.icon}></i> {tab.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

          {/* Tab Content */}
          <div className="tab-content-section mt-4">
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            )}
            {!loading && reportData && (
              <>
                {activeTab === "Sales" && renderSalesTab()}
                {activeTab === "Appointments" && renderAppointmentsTab()}
                {activeTab === "Services" && renderServicesTab()}
                {activeTab === "Packages" && renderPackagesTab()}
                {activeTab === "Staff" && renderStaffTab()}
                {activeTab === "Customers" && renderCustomersTab()}
                {activeTab === "Inventory" && renderInventoryTab()}
                {activeTab === "Coupons" && renderCouponsTab()}
              </>
            )}
            {!loading && !reportData && !error && (
              <EmptyState message="Select a date range and load report data." />
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Reports