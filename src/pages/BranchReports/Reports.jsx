import React, { useState } from "react"
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
  DropdownItem
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import classNames from "classnames"
import ReactApexChart from "react-apexcharts"

// Styles
import "./reports.scss"

const tabs = [
  { id: "Sales", label: "Sales", icon: "bx bx-trending-up" },
  { id: "Appointments", label: "Appointments", icon: "bx bx-calendar" },
  { id: "Services", label: "Services", icon: "bx bx-cut" },
  { id: "Packages", label: "Packages", icon: "bx bx-package" },
  { id: "Staff", label: "Staff", icon: "bx bx-user-circle" },
  // { id: "Commissions", label: "Commissions", icon: "bx bx-money" },
  { id: "Customers", label: "Customers", icon: "bx bx-group" },
  // { id: "Churn", label: "Churn", icon: "bx bx-user-minus" },
  // { id: "Financial", label: "Financial", icon: "bx bx-wallet" },
  { id: "Inventory", label: "Inventory", icon: "bx bx-box" },
  // { id: "Messaging", label: "Messaging", icon: "bx bx-message-rounded" },
  { id: "Coupons", label: "Coupons", icon: "bx bxs-discount" },
  { id: "Walk Ins", label: "Walk Ins", icon: "bx bx-walking" },
  // { id: "Attendance", label: "Attendance", icon: "bx bx-user-check" },
  { id: "Memberships", label: "Memberships", icon: "bx bx-id-card" },
  // { id: "Growth", label: "Growth", icon: "bx bx-line-chart-up" },
]

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Sales")
  const [dateFilterOpen, setDateFilterOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today")
  
  const toggleDateFilter = () => setDateFilterOpen(!dateFilterOpen)
  const toggleExport = () => setExportOpen(!exportOpen)

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  // ApexChart Options for Packages Trend
  const lineChartOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#22c55e'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: { colors: '#9ca3af', fontSize: '12px' }
      },
      axisBorder: { show: true, color: '#e5e7eb' },
      axisTicks: { show: true, color: '#e5e7eb' }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return "₹" + val + "K"
        },
        style: { colors: '#9ca3af', fontSize: '12px' }
      }
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
    }
  }

  const lineChartSeries = [{
    name: 'Revenue',
    data: [0, 0, 0, 0, 0, 0, 0]
  }]

  return (
    <React.Fragment>
      <div className="page-content reports-page dashboard-sans">
        <Container fluid>
          {/* Header Section */}
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
                  <DropdownItem onClick={() => setSelectedDateFilter("Today")}>Today</DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("Last 7 days")}>Last 7 days</DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("Last 30 days")}>
                    {selectedDateFilter === "Last 30 days" && <i className="bx bx-check me-2"></i>}
                    Last 30 days
                  </DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("Last 90 days")}>Last 90 days</DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("Last Year")}>Last Year</DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("All Time")}>All Time</DropdownItem>
                  <DropdownItem onClick={() => setSelectedDateFilter("Custom Range")}>Custom Range</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <div className="position-relative">
                <i className="bx bx-calendar-event position-absolute text-muted" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}></i>
                <Flatpickr
                  className="form-control rounded-pill bg-white border shadow-sm fw-medium text-dark ps-5"
                  placeholder="Apr 2 - May 2"
                  options={{
                    mode: "range",
                    dateFormat: "M j",
                  }}
                  style={{ width: '180px', cursor: 'pointer' }}
                />
              </div>

              <Dropdown isOpen={exportOpen} toggle={toggleExport}>
                <DropdownToggle color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
                  <i className="bx bx-download"></i> Export
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header className="fw-bold text-dark">Export Format</DropdownItem>
                  {/* <DropdownItem><i className="bx bx-file me-2 text-muted"></i> CSV (.csv)</DropdownItem> */}
                  <DropdownItem><i className="bx bx-spreadsheet me-2 text-muted"></i> Excel (.xlsx)</DropdownItem>
                  {/* <DropdownItem><i className="bx bx-spreadsheet me-2 text-muted"></i> Excel 97-2003 (.xls)</DropdownItem> */}
                  <DropdownItem><i className="bx bxs-file-pdf me-2 text-muted"></i> PDF (.pdf)</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Card className="empty-state-card mb-4 mt-2">
            <i className="bx bx-box empty-icon"></i>
            <h5>No data for selected filters</h5>
            <p>Try adjusting the date range or add new activity to see reports.</p>
          </Card>

          {/* Global Cards */}
          <Row>
            <Col md={3}>
              <Card className="stat-card">
                <CardBody>
                  <div className="stat-content">
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value">-</div>
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
                    <div className="stat-value">-</div>
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
                    <div className="stat-title">Total Walk Ins</div>
                    <div className="stat-value">-</div>
                    <div className="stat-subtitle">No data yet</div>
                  </div>
                  <div className="icon-box bg-purple-light">
                    <i className="bx bx-user"></i>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <CardBody>
                  <div className="stat-content">
                    <div className="stat-title">Commissions</div>
                    <div className="stat-value">-</div>
                    <div className="stat-subtitle">No data yet</div>
                  </div>
                  <div className="icon-box bg-purple-light">
                    <i className="bx bx-group"></i>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Navigation Tabs */}
          <Nav className="nav-tabs-custom mt-2">
            {tabs.map(tab => (
              <NavItem key={tab.id}>
                <NavLink
                  className={classNames({ active: activeTab === tab.id })}
                  onClick={() => toggleTab(tab.id)}
                >
                  <i className={tab.icon}></i> {tab.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

          {/* Tab Content */}
          <div className="tab-content-section mt-4">
            
            {activeTab === "Appointments" && (
              <div>
                <Row>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Booked</div>
                          <div className="stat-value">-</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-calendar"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Completed</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-green-light">
                          <i className="bx bx-check-circle"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Cancelled</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-red-light">
                          <i className="bx bx-x-circle text-danger"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">No Shows</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-orange-light">
                          <i className="bx bx-error-circle text-warning"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Peak Hour</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-time"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card className="empty-state-card mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Appointments Data</h5>
                  <p>Appointment reports will appear here once bookings are made.</p>
                </Card>
              </div>
            )}


            {activeTab === "Inventory" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="section-title">Inventory Report</h4>
                    <p className="section-subtitle">Stock levels and alerts overview</p>
                  </div>
                  <Button color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-medium d-flex align-items-center gap-2">
                    <i className="bx bx-download"></i> Export
                  </Button>
                </div>
                
                <Row>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Items</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-box"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Low Stock</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-orange-light">
                          <i className="bx bx-error text-warning"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Critical Stock</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-red-light">
                          <i className="bx bx-error-circle"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Out of Stock</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-trending-down"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Stock Health</div>
                          <div className="stat-value">-</div>
                          <div className="stat-subtitle">No data yet</div>
                        </div>
                        <div className="icon-box bg-green-light">
                          <i className="bx bx-trending-up"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card className="empty-state-card mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Inventory Data</h5>
                  <p>Inventory reports will appear here once items are added.</p>
                </Card>
              </div>
            )}

            {activeTab === "Customers" && (
              <div>
                <Card className="empty-state-card mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Customer Data</h5>
                  <p>Customer reports will appear here once customers are added.</p>
                </Card>
              </div>
            )}

            {activeTab === "Staff" && (
              <div>
                <Row>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Revenue</div>
                          <div className="stat-value">₹0.00</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-rupee"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Services</div>
                          <div className="stat-value">0</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-user"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Tips</div>
                          <div className="stat-value">₹0.00</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-gift"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Total Commission</div>
                          <div className="stat-value">₹0.00</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-trending-up"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Avg Bill Value</div>
                          <div className="stat-value">₹0.00</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-credit-card"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card className="empty-state-card mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Staff Billing Data for Selected Period</h5>
                  <p>Staff reports will appear here once invoices are created with staff assignments.</p>
                </Card>
              </div>
            )}

            {activeTab === "Services" && (
              <div>
                <Card className="empty-state-card mb-4 mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Service Data</h5>
                  <p>Service reports will appear here once services are billed.</p>
                </Card>

                <Card className="chart-card">
                  <CardBody>
                    <h4 className="section-title mb-4">Detailed Service Report</h4>
                    <div className="d-flex gap-3 mb-5">
                      <Input type="select" className="form-select rounded-pill border-0 shadow-sm bg-light px-3 py-2" style={{ width: '180px' }}>
                        <option>All categories</option>
                      </Input>
                      <Input type="select" className="form-select rounded-pill border-0 shadow-sm bg-light px-3 py-2" style={{ width: '180px' }}>
                        <option>All staff</option>
                      </Input>
                    </div>

                    <div className="text-center py-5">
                      <i className="bx bx-box empty-icon"></i>
                      <p className="text-muted mt-3 mb-0">No service data for the selected filters.</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeTab === "Packages" && (
              <div>
                <Row>
                  <Col md={3}>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Packages Sold</div>
                          <div className="stat-value">0</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-cart"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Package Revenue</div>
                          <div className="stat-value">₹0.00</div>
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
                          <div className="stat-title">Revenue Contribution</div>
                          <div className="stat-value">0.0%</div>
                          <div className="stat-subtitle">of total revenue</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-trending-up"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="stat-card">
                      <CardBody>
                        <div className="stat-content">
                          <div className="stat-title">Active Packages</div>
                          <div className="stat-value">0</div>
                        </div>
                        <div className="icon-box bg-purple-light">
                          <i className="bx bx-package"></i>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Card className="chart-card h-100">
                      <CardBody>
                        <h4 className="section-title">Sales Trend (Last 7 Days)</h4>
                        <p className="section-subtitle">Daily package sales and revenue</p>
                        <div className="mt-4">
                          <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={280} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="chart-card h-100">
                      <CardBody>
                        <h4 className="section-title">Top Selling Packages</h4>
                        <p className="section-subtitle">Distribution by quantity sold</p>
                        <div className="d-flex align-items-center justify-content-center h-75">
                          <p className="text-muted small">No package sales yet</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Card className="chart-card mt-2">
                  <CardBody className="p-0">
                    <div className="p-4 border-bottom">
                      <h4 className="section-title">Package Performance</h4>
                      <p className="section-subtitle mb-0">Sales breakdown by package</p>
                    </div>
                    <div className="table-responsive">
                      <table className="table custom-table mb-0 w-100">
                        <thead className="bg-light bg-opacity-50 text-uppercase">
                          <tr>
                            <th>Package</th>
                            <th className="text-end">Qty Sold</th>
                            <th className="text-end">Revenue</th>
                            <th className="text-end">Avg Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <p className="text-muted small mb-0">No package sales recorded yet</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
            
            {/* Fallback empty state for other tabs */}
            {!["Appointments", "Inventory", "Customers", "Staff", "Services", "Packages"].includes(activeTab) && (
              <div>
                <Card className="empty-state-card mt-2">
                  <i className="bx bx-box empty-icon"></i>
                  <h5>No Data Available</h5>
                  <p>Data will appear here once relevant activities are recorded.</p>
                </Card>
              </div>
            )}
            
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Reports
