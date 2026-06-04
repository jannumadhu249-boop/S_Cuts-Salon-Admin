import React, { useState, useEffect, useCallback } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Spinner,
  Table,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import classNames from "classnames"
import { URLS } from "../../url"
import { post } from "../../helpers/api_helper"

// Styles
import "./appointments.scss"

// Helper function
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const WebAppointments = () => {
  const [timeFilter, setTimeFilter] = useState("today")
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  // Stats
  const [stats, setStats] = useState({ 
    todaysAppointments: 0, 
    upcoming: 0, 
    completed: 0, 
    totalProducts: 0 
  })
  const [loadingStats, setLoadingStats] = useState(false)

  // Appointments
  const [appointments, setAppointments] = useState([])
  const [pagination, setPagination] = useState({ 
    total: 0, 
    currentPage: 1, 
    totalPages: 1, 
    limit: 10, 
    hasNextPage: false, 
    hasPreviousPage: false 
  })
  const [loading, setLoading] = useState(false)

  const statusOptions = ["All Statuses", "Confirmed", "Pending", "Cancelled", "Upcoming", "Completed"]

  // Fetch Stats
  const fetchStats = async () => {
    setLoadingStats(true)
    try {
      const json = await post(URLS.StatsAppionments, {})
      if (json.success) {
        setStats(json.data)
      }
    } catch (err) {
      console.error("Stats error:", err)
    } finally {
      setLoadingStats(false)
    }
  }

  // Fetch Appointments
  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      let fromDate, toDate
      if (dateRange?.length === 2) {
        fromDate = formatDate(dateRange[0])
        toDate = formatDate(dateRange[1])
      } else {
        const today = new Date()
        fromDate = toDate = formatDate(today)
      }

      const body = {
        fromDate,
        toDate,
        fromTime: "12:00 AM",
        toTime: "11:59 PM",
        bookingSource: "WEB",
        status: statusFilter === "All Statuses" ? "" : statusFilter,
      }

      const params = new URLSearchParams({
        search: search || "null",
        page: pagination.currentPage,
        limit: pagination.limit,
      })

      const json = await post(`${URLS.GetAppionments}?${params.toString()}`, body)
      if (json.success) {
        setAppointments(json.data || [])
        setPagination(json.pagination)
      }
    } catch (err) {
      console.error("Fetch appointments error:", err)
    } finally {
      setLoading(false)
    }
  }, [dateRange, search, pagination.currentPage, pagination.limit, statusFilter])

  // Initial load
  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  // Pagination
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }))
    }
  }

  // Handle time filter selection
  const handleTimeFilterClick = (filter) => {
    setTimeFilter(filter)
    const today = new Date()
    let fromDate, toDate

    switch (filter) {
      case "today":
        fromDate = toDate = new Date()
        break
      case "next7days":
        fromDate = new Date()
        toDate = new Date()
        toDate.setDate(today.getDate() + 7)
        break
      case "last7days":
        fromDate = new Date()
        fromDate.setDate(today.getDate() - 7)
        toDate = new Date()
        break
      case "last30days":
        fromDate = new Date()
        fromDate.setDate(today.getDate() - 30)
        toDate = new Date()
        break
      default:
        fromDate = toDate = new Date()
    }

    setDateRange([fromDate, toDate])
  }

  const summaryCards = [
    {
      title: "Today's Appointments",
      value: stats.todaysAppointments,
      icon: "bx-calendar",
      class: "today",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      icon: "bx-time-five",
      class: "upcoming",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "bx-check-circle",
      class: "completed",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: "bx-package",
      class: "products",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content appointments-page dashboard-sans">
        <Container fluid>
          {/* Top Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"> <i className="bx bx-globe text-primary"></i> Web Appointments</h3>
              <p className="text-muted mb-0">Appointments booked from your online portal</p>
            </div>
          </div>

          {/* Summary Cards */}
          <Row className="mb-4 g-3">
            {summaryCards.map((card, key) => (
              <Col key={key} xl={3} md={6}>
                <Card className={classNames("appointment-summary-card border-0 h-100 rounded-4", card.class)}>
                  <CardBody className="p-4 d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 text-white opacity-75 fw-medium">{card.title}</p>
                      <h2 className="mb-0 text-white fw-bold">
                        {loadingStats ? <Spinner size="sm" color="light" /> : card.value}
                      </h2>
                    </div>
                    <div className="icon-wrapper">
                      <i className={classNames("bx", card.icon)}></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Filter Bar */}
          <div className="filter-bar d-flex align-items-center gap-3 mb-4">
            <div className="time-filters d-flex gap-2 p-1 bg-white rounded-pill shadow-sm">
              {["Today", "Next 7 Days", "Last 7 Days", "Last 30 Days"].map(item => {
                const normalized = item.toLowerCase().replace(/\s/g, "")
                return (
                  <Button
                    key={item}
                    className={classNames("rounded-pill border-0 px-3 py-1", {
                      "bg-light text-dark fw-medium": timeFilter === normalized,
                      "bg-transparent text-muted": timeFilter !== normalized,
                    })}
                    onClick={() => handleTimeFilterClick(normalized)}
                  >
                    {item}
                  </Button>
                )
              })}
            </div>
            <div className="date-picker-wrapper bg-white rounded-pill px-3 py-1 shadow-sm d-flex align-items-center border">
              <i className="bx bx-calendar me-2 text-muted"></i>
              <Flatpickr
                className="form-control border-0 bg-transparent p-0"
                options={{
                  mode: "range",
                  dateFormat: "M j, Y",
                  defaultDate: dateRange,
                }}
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
              />
            </div>
          </div>

          {/* Search & Status */}
          <Row className="mb-4">
            <Col md={4}>
              <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3">
                <i className="bx bx-search-alt text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="border-0 bg-transparent p-0 form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>
            <Col md={2}>
              <div className="status-filter bg-white rounded-pill shadow-sm border p-1 px-3 d-flex align-items-center">
                <Input 
                  type="select" 
                  className="border-0 bg-transparent p-0 form-control form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Input>
              </div>
            </Col>
          </Row>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-content-card">
            {loading ? (
              <CardBody className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                <Spinner color="primary" />
                <p className="mt-3">Loading web appointments...</p>
              </CardBody>
            ) : appointments.length === 0 ? (
              <CardBody className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                <div className="empty-state-icon mb-4">
                  <div className="icon-circle bg-light d-flex align-items-center justify-content-center">
                    <i className="bx bx-calendar-x text-muted display-4"></i>
                  </div>
                </div>
                <h4 className="fw-bold text-dark mb-2">No Web Appointments Found</h4>
                <p className="text-muted text-center mb-4" style={{ maxWidth: "400px" }}>
                  Appointments booked from your online portal will appear here.
                </p>
              </CardBody>
            ) : (
              <CardBody className="p-0">
                <div className="table-responsive">
                  <Table className="mb-0 align-middle" hover>
                    <thead className="bg-light">
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Staff</th>
                        <th>Package</th>
                        <th>Status</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(apt => (
                        <tr key={apt._id}>
                          <td className="text-muted small">{apt.appointmentId}</td>
                          <td>
                            <div className="fw-bold">{apt.customerName}</div>
                            <small className="text-muted">{apt.customerPhone}</small>
                          </td>
                          <td>{apt.appointmentDate}</td>
                          <td>{apt.appointmentTime}</td>
                          <td>{apt.serviceName || "—"}</td>
                          <td>{apt.staffName || "—"}</td>
                          <td>{apt.packageName || "—"}</td>
                          <td>
                            <Badge 
                              color={
                                apt.status === "Upcoming" ? "primary" : 
                                apt.status === "Completed" ? "success" : 
                                apt.status === "Confirmed" ? "info" :
                                apt.status === "Cancelled" ? "danger" : 
                                "warning"
                              } 
                              className="rounded-pill px-3 py-1"
                            >
                              {apt.status}
                            </Badge>
                          </td>
                          <td>
                            <Badge color="success" className="rounded-pill px-3 py-1">
                              <i className="bx bx-globe me-1"></i>
                              {apt.bookingSource}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="d-flex justify-content-center p-3">
                    <Pagination>
                      <PaginationItem disabled={!pagination.hasPreviousPage}>
                        <PaginationLink 
                          previous 
                          onClick={() => goToPage(pagination.currentPage - 1)} 
                        />
                      </PaginationItem>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page} active={page === pagination.currentPage}>
                          <PaginationLink onClick={() => goToPage(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={!pagination.hasNextPage}>
                        <PaginationLink 
                          next 
                          onClick={() => goToPage(pagination.currentPage + 1)} 
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                )}
              </CardBody>
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default WebAppointments