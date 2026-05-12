import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import classNames from "classnames"
import { Link } from "react-router-dom"

// Import Styles
import "./appointments.scss"

const Appointments = () => {
  const [modal, setModal] = useState(false)
  const [customerModal, setCustomerModal] = useState(false)
  const [activeTab, setActiveTab] = useState("list")
  const [timeFilter, setTimeFilter] = useState("today")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const toggleModal = () => setModal(!modal)

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

  return (
    <React.Fragment>
      <div className="page-content appointments-page dashboard-sans">
        <Container fluid>
          {/* Top Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">Appointments</h3>
              <p className="text-muted mb-0">Manage bookings and schedules</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link to="/web-appointments" className="rounded-pill px-3 shadow-sm bg-white border-0 text-decoration-none text-dark">
                <Button color="light" className="rounded-pill px-3 shadow-sm bg-white border-0 text-decoration-none text-dark">
                  <i className="bx bx-globe me-1"></i> Web Appointments
                </Button>
              </Link>
              <div className="btn-group bg-light p-1 rounded-pill shadow-sm">
                <Button
                  className={classNames("rounded-pill px-3 border-0", {
                    "bg-primary text-white": activeTab === "list",
                    "bg-transparent text-dark": activeTab !== "list",
                  })}
                  onClick={() => setActiveTab("list")}
                >
                  <i className="bx bx-list-ul me-1"></i> List
                </Button>
                <Button
                  className={classNames("rounded-pill px-3 border-0", {
                    "bg-primary text-white": activeTab === "calendar",
                    "bg-transparent text-dark": activeTab !== "calendar",
                  })}
                  onClick={() => setActiveTab("calendar")}
                >
                  <i className="bx bx-calendar me-1"></i> Calendar
                </Button>
              </div>
              <Button color="primary" className="rounded-pill px-4 shadow-sm ms-2" onClick={toggleModal}>
                <i className="bx bx-plus me-1"></i> New Appointment
              </Button>
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

          {/* Main Content Area */}
          {activeTab === "list" ? (
            <>
              {/* Filter Bar (List View) */}
              <div className="filter-bar d-flex align-items-center gap-3 mb-4">
                <div className="time-filters d-flex gap-2 p-1 bg-white rounded-pill shadow-sm">
                  {["Today", "Next 7 Days", "Last 7 Days", "Last 30 Days"].map(item => (
                    <Button
                      key={item}
                      className={classNames("rounded-pill border-0 px-3 py-1", {
                        "bg-light text-dark fw-medium": timeFilter === item.toLowerCase().replace(/ /g, ""),
                        "bg-transparent text-muted": timeFilter !== item.toLowerCase().replace(/ /g, ""),
                      })}
                      onClick={() => setTimeFilter(item.toLowerCase().replace(/ /g, ""))}
                    >
                      {item}
                    </Button>
                  ))}
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

              {/* Search Bar */}
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
                      <option>All Statuses</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </Input>
                  </div>
                </Col>
              </Row>

              <Card className="border-0 rounded-4 shadow-sm main-content-card">
                <CardBody className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                  <div className="empty-state-icon mb-4">
                    <div className="icon-circle bg-light d-flex align-items-center justify-content-center">
                      <i className="bx bx-calendar-x text-muted display-4"></i>
                    </div>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">No Appointments Found</h4>
                  <p className="text-muted text-center mb-4" style={{ maxWidth: "400px" }}>
                    You don't have any appointments yet. Create your first appointment to get started.
                  </p>
                  <Button color="primary" className="rounded-pill px-5 py-2 shadow" onClick={toggleModal}>
                    <i className="bx bx-plus me-1"></i> Book First Appointment
                  </Button>
                </CardBody>
              </Card>
            </>
          ) : (
            <div className="calendar-view-container">
              {/* Calendar Filter Bar */}
              <div className="calendar-filter-bar d-flex justify-content-between align-items-center mb-4 bg-white p-2 rounded-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="nav-controls d-flex gap-2">
                    <Button color="light" className="rounded-circle p-2 bg-light border-0">
                      <i className="bx bx-chevron-left fs-5"></i>
                    </Button>
                    <div className="date-display bg-light px-3 py-1 rounded-pill d-flex align-items-center gap-2 border position-relative">
                      <i className="bx bx-calendar text-muted"></i>
                      <Flatpickr
                        className="form-control border-0 bg-transparent p-0 fw-bold text-dark"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date[0])}
                        options={{
                          dateFormat: "l, M j, Y",
                        }}
                        style={{ width: '180px', cursor: 'pointer' }}
                      />
                    </div>
                    <Button color="light" className="rounded-circle p-2 bg-light border-0">
                      <i className="bx bx-chevron-right fs-5"></i>
                    </Button>
                  </div>
                  <Button 
                    color="light" 
                    className="rounded-pill px-3 py-1 bg-white border fw-medium text-muted"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button color="light" className="rounded-pill px-3 py-1 bg-white border d-flex align-items-center gap-2">
                    <i className="bx bx-user text-muted"></i>
                    <span>Staff</span>
                  </Button>
                  <div className="status-filter bg-white rounded-pill border p-1 px-3 d-flex align-items-center">
                    <i className="bx bx-filter text-muted me-2"></i>
                    <Input type="select" className="border-0 bg-transparent p-0 form-control form-select text-muted" style={{ width: '120px' }}>
                      <option>All Services</option>
                    </Input>
                  </div>
                </div>
              </div>

              {/* Calendar Grid Area */}
              <Card className="border-0 rounded-4 shadow-sm calendar-grid-card overflow-hidden">
                <div className="calendar-grid-header d-flex border-bottom">
                  <div className="time-column-header text-center py-2 text-muted fw-medium border-end" style={{ width: '80px' }}>Time</div>
                  <div className="staff-column-header flex-grow-1 text-center py-2 text-dark fw-bold">Unassigned</div>
                </div>
                <div className="calendar-grid-body position-relative" style={{ height: '600px', overflowY: 'auto' }}>
                  {/* Time Slots */}
                  {Array.from({ length: 13 }).map((_, i) => {
                    const hour = i + 8;
                    const timeLabel = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? "12:00 PM" : `${hour}:00 AM`;
                    return (
                      <div key={i} className="time-slot-row d-flex border-bottom" style={{ height: '60px' }}>
                        <div className="time-label text-end pe-3 py-2 text-muted small border-end" style={{ width: '80px' }}>
                          {timeLabel}
                        </div>
                        <div className="slot-content flex-grow-1 position-relative">
                          {/* Grid Lines could go here */}
                        </div>
                      </div>
                    )
                  })}

                  {/* Empty State Overlay (Optional but nice for visualization) */}
                  <div className="calendar-empty-state w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75 position-absolute top-0 start-0 pt-5">
                    <div className="mb-3 mt-5">
                      <i className="bx bx-calendar-alt text-muted display-4 opacity-25"></i>
                    </div>
                    <h5 className="fw-bold text-dark">No appointments for this day</h5>
                    <p className="text-muted small">Select a different date or create a new appointment</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Container>

        {/* New Appointment Modal */}
        <Modal isOpen={modal} toggle={toggleModal} centered className="new-appointment-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-3 pt-4 position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">New Appointment</h4>
                <p className="text-muted small">Book a new appointment</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <Form>
                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-2">Customer *</Label>
                  <div className="select-wrapper position-relative">
                    <Input type="select" className="rounded-pill border-2 px-3 py-2 form-select">
                      <option className="py-2 ">Select customer</option>
                      <option className="py-2">John Doe</option>
                      <option className="py-2">Jane Smith</option>
                    </Input>
                  </div>
                </FormGroup>

                <div className="separator-text mb-3">
                  <span>or</span>
                </div>

                <Button 
                  color="light" 
                  className="w-100 rounded-pill py-2 mb-3 border d-flex align-items-center justify-content-center gap-2 bg-white"
                  onClick={() => {
                    setCustomerModal(true);
                  }}
                >
                  <i className="bx bx-user-plus fs-5"></i>
                  <span className="fw-medium">Create New Customer</span>
                </Button>

                <Row className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Date *</Label>
                      <div className="position-relative date-picker-field">
                        <Flatpickr
                          className="form-control rounded-4 border-light bg-light px-3 py-2"
                          placeholder="dd-mm-yyyy"
                          options={{ dateFormat: "d-m-Y" }}
                        />
                        <i className="bx bx-calendar position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Time *</Label>
                      <div className="position-relative time-picker-field">
                        <Flatpickr
                          className="form-control rounded-4 border-light bg-light px-3 py-2"
                          placeholder="--:--"
                          options={{ noCalendar: true, enableTime: true, dateFormat: "H:i" }}
                        />
                        <i className="bx bx-time position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-3">Package (Optional)</Label>
                  <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
                    <option>No Package</option>
                  </Input>
                </FormGroup>

                <Row className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Staff (Optional)</Label>
                      <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
                        <option>Select staff</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Service (Optional)</Label>
                      <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
                        <option>Select service</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-3">Notes (Optional)</Label>
                  <Input 
                    type="textarea" 
                    rows="4"
                    placeholder="Any special requests or notes..."
                    className="rounded-4 border-light bg-light px-4 py-2"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-3 pt-0 gap-2">
              <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-5 py-2 fw-medium shadow-primary" onClick={toggleModal}>
                Create Appointment
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Create Customer Modal */}
        <Modal isOpen={customerModal} toggle={() => setCustomerModal(false)} centered className="create-customer-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={() => setCustomerModal(false)} className="border-0 pb-0 px-2 pt-4">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Create New Customer</h4>
                <p className="text-muted small">Add a new customer for this appointment</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Form>
                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-3">Name *</Label>
                  <Input 
                    type="text" 
                    placeholder="Customer name" 
                    className="rounded-4 border-primary border-2 px-4 py-2"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-3">Phone *</Label>
                  <div className="d-flex gap-2">
                    <div style={{ width: '100px' }}>
                      <Input type="select" className="rounded-pill border-light bg-light px-1 py-2 form-select">
                        <option>IN +91</option>
                      </Input>
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Phone number" 
                      className="rounded-pill border-light bg-light px-4 py-2 flex-grow-1"
                    />
                  </div>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-3 pb-3 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-medium bg-light border-0" onClick={() => setCustomerModal(false)}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-medium opacity-50 shadow-primary" onClick={() => setCustomerModal(false)}>
                Create and Select
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Appointments
