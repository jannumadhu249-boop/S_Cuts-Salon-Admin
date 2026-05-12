import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import classNames from "classnames"
import { Link } from "react-router-dom"

// Styles
import "./appointments.scss"

const WebAppointments = () => {
  const [timeFilter, setTimeFilter] = useState("today")

  const summaryCards = [
    {
      title: "Today's Appointments",
      value: "0",
      icon: "bx-calendar",
      class: "today",
    },
    {
      title: "Upcoming",
      value: "0",
      icon: "bx-time-five",
      class: "upcoming",
    },
    {
      title: "Completed",
      value: "0",
      icon: "bx-check-circle",
      class: "completed",
    },
    {
      title: "No Shows",
      value: "0",
      icon: "bx-user-x",
      class: "noshows",
    },
  ]

  const statusOptions = ["All Statuses", "Confirmed", "Pending", "Cancelled"]

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
                      <h2 className="mb-0 text-white fw-bold">{card.value}</h2>
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
                    onClick={() => setTimeFilter(normalized)}
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
                  defaultDate: [new Date(), new Date()],
                }}
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
                />
              </div>
            </Col>
            <Col md={2}>
              <div className="status-filter bg-white rounded-pill shadow-sm border p-1 px-3 d-flex align-items-center">
                <Input type="select" className="border-0 bg-transparent p-0 form-control form-select">
                  {statusOptions.map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Input>
              </div>
            </Col>
          </Row>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-content-card">
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
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default WebAppointments