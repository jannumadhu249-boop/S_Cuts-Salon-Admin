// import React, { useState } from "react"
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   Input,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   FormGroup,
//   Label,
// } from "reactstrap"
// import Flatpickr from "react-flatpickr"
// import classNames from "classnames"
// import { Link } from "react-router-dom"

// // Import Styles
// import "./appointments.scss"

// const Appointments = () => {
//   const [modal, setModal] = useState(false)
//   const [customerModal, setCustomerModal] = useState(false)
//   const [activeTab, setActiveTab] = useState("list")
//   const [timeFilter, setTimeFilter] = useState("today")
//   const [selectedDate, setSelectedDate] = useState(new Date())

//   const toggleModal = () => setModal(!modal)

//   const summaryCards = [
//     {
//       title: "Today's Appointments",
//       value: "0",
//       icon: "bx-calendar",
//       class: "today",
//     },
//     {
//       title: "Upcoming",
//       value: "0",
//       icon: "bx-time-five",
//       class: "upcoming",
//     },
//     {
//       title: "Completed",
//       value: "0",
//       icon: "bx-check-circle",
//       class: "completed",
//     },
//     {
//       title: "Products",
//       value: "0",
//       icon: "bx-user-x",
//       class: "products",
//     },
//   ]

//   return (
//     <React.Fragment>
//       <div className="page-content appointments-page dashboard-sans">
//         <Container fluid>
//           {/* Top Header */}
//           <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
//             <div>
//               <h3 className="fw-bold mb-0 text-dark">Appointments</h3>
//               <p className="text-muted mb-0">Manage bookings and schedules</p>
//             </div>
//             <div className="d-flex align-items-center gap-2">
//               <Link to="/web-appointments" className="rounded-pill px-3 shadow-sm bg-white border-0 text-decoration-none text-dark">
//                 <Button color="light" className="rounded-pill px-3 shadow-sm bg-white border-0 text-decoration-none text-dark">
//                   <i className="bx bx-globe me-1"></i> Web Appointments
//                 </Button>
//               </Link>
//               <div className="btn-group bg-light p-1 rounded-pill shadow-sm">
//                 <Button
//                   className={classNames("rounded-pill px-3 border-0", {
//                     "bg-primary text-white": activeTab === "list",
//                     "bg-transparent text-dark": activeTab !== "list",
//                   })}
//                   onClick={() => setActiveTab("list")}
//                 >
//                   <i className="bx bx-list-ul me-1"></i> List
//                 </Button>
//                 <Button
//                   className={classNames("rounded-pill px-3 border-0", {
//                     "bg-primary text-white": activeTab === "calendar",
//                     "bg-transparent text-dark": activeTab !== "calendar",
//                   })}
//                   onClick={() => setActiveTab("calendar")}
//                 >
//                   <i className="bx bx-calendar me-1"></i> Calendar
//                 </Button>
//               </div>
//               <Button color="primary" className="rounded-pill px-4 shadow-sm ms-2" onClick={toggleModal}>
//                 <i className="bx bx-plus me-1"></i> New Appointment
//               </Button>
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <Row className="mb-4 g-3">
//             {summaryCards.map((card, key) => (
//               <Col key={key} xl={3} md={6}>
//                 <Card className={classNames("appointment-summary-card border-0 h-100 rounded-4", card.class)}>
//                   <CardBody className="p-4 d-flex justify-content-between align-items-center">
//                     <div>
//                       <p className="mb-1 text-white opacity-75 fw-medium">{card.title}</p>
//                       <h2 className="mb-0 text-white fw-bold">{card.value}</h2>
//                     </div>
//                     <div className="icon-wrapper">
//                       <i className={classNames("bx", card.icon)}></i>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Main Content Area */}
//           {activeTab === "list" ? (
//             <>
//               {/* Filter Bar (List View) */}
//               <div className="filter-bar d-flex align-items-center gap-3 mb-4">
//                 <div className="time-filters d-flex gap-2 p-1 bg-white rounded-pill shadow-sm">
//                   {["Today", "Next 7 Days", "Last 7 Days", "Last 30 Days"].map(item => (
//                     <Button
//                       key={item}
//                       className={classNames("rounded-pill border-0 px-3 py-1", {
//                         "bg-light text-dark fw-medium": timeFilter === item.toLowerCase().replace(/ /g, ""),
//                         "bg-transparent text-muted": timeFilter !== item.toLowerCase().replace(/ /g, ""),
//                       })}
//                       onClick={() => setTimeFilter(item.toLowerCase().replace(/ /g, ""))}
//                     >
//                       {item}
//                     </Button>
//                   ))}
//                 </div>
//                 <div className="date-picker-wrapper bg-white rounded-pill px-3 py-1 shadow-sm d-flex align-items-center border">
//                   <i className="bx bx-calendar me-2 text-muted"></i>
//                   <Flatpickr
//                     className="form-control border-0 bg-transparent p-0"
//                     options={{
//                       mode: "range",
//                       dateFormat: "M j, Y",
//                       defaultDate: [new Date(), new Date()],
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Search Bar */}
//               <Row className="mb-4">
//                 <Col md={4}>
//                   <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3">
//                     <i className="bx bx-search-alt text-muted me-2"></i>
//                     <Input
//                       type="text"
//                       placeholder="Search by name or phone..."
//                       className="border-0 bg-transparent p-0 form-control"
//                     />
//                   </div>
//                 </Col>
//                 <Col md={2}>
//                   <div className="status-filter bg-white rounded-pill shadow-sm border p-1 px-3 d-flex align-items-center">
//                     <Input type="select" className="border-0 bg-transparent p-0 form-control form-select">
//                       <option>All Statuses</option>
//                       <option>Confirmed</option>
//                       <option>Pending</option>
//                       <option>Cancelled</option>
//                     </Input>
//                   </div>
//                 </Col>
//               </Row>

//               <Card className="border-0 rounded-4 shadow-sm main-content-card">
//                 <CardBody className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
//                   <div className="empty-state-icon mb-4">
//                     <div className="icon-circle bg-light d-flex align-items-center justify-content-center">
//                       <i className="bx bx-calendar-x text-muted display-4"></i>
//                     </div>
//                   </div>
//                   <h4 className="fw-bold text-dark mb-2">No Appointments Found</h4>
//                   <p className="text-muted text-center mb-4" style={{ maxWidth: "400px" }}>
//                     You don't have any appointments yet. Create your first appointment to get started.
//                   </p>
//                   <Button color="primary" className="rounded-pill px-5 py-2 shadow" onClick={toggleModal}>
//                     <i className="bx bx-plus me-1"></i> Book First Appointment
//                   </Button>
//                 </CardBody>
//               </Card>
//             </>
//           ) : (
//             <div className="calendar-view-container">
//               {/* Calendar Filter Bar */}
//               <div className="calendar-filter-bar d-flex justify-content-between align-items-center mb-4 bg-white p-2 rounded-4 shadow-sm">
//                 <div className="d-flex align-items-center gap-3">
//                   <div className="nav-controls d-flex gap-2">
//                     <Button color="light" className="rounded-circle p-2 bg-light border-0">
//                       <i className="bx bx-chevron-left fs-5"></i>
//                     </Button>
//                     <div className="date-display bg-light px-3 py-1 rounded-pill d-flex align-items-center gap-2 border position-relative">
//                       <i className="bx bx-calendar text-muted"></i>
//                       <Flatpickr
//                         className="form-control border-0 bg-transparent p-0 fw-bold text-dark"
//                         value={selectedDate}
//                         onChange={(date) => setSelectedDate(date[0])}
//                         options={{
//                           dateFormat: "l, M j, Y",
//                         }}
//                         style={{ width: '180px', cursor: 'pointer' }}
//                       />
//                     </div>
//                     <Button color="light" className="rounded-circle p-2 bg-light border-0">
//                       <i className="bx bx-chevron-right fs-5"></i>
//                     </Button>
//                   </div>
//                   <Button 
//                     color="light" 
//                     className="rounded-pill px-3 py-1 bg-white border fw-medium text-muted"
//                     onClick={() => setSelectedDate(new Date())}
//                   >
//                     Today
//                   </Button>
//                 </div>
//                 <div className="d-flex align-items-center gap-2">
//                   <Button color="light" className="rounded-pill px-3 py-1 bg-white border d-flex align-items-center gap-2">
//                     <i className="bx bx-user text-muted"></i>
//                     <span>Staff</span>
//                   </Button>
//                   <div className="status-filter bg-white rounded-pill border p-1 px-3 d-flex align-items-center">
//                     <i className="bx bx-filter text-muted me-2"></i>
//                     <Input type="select" className="border-0 bg-transparent p-0 form-control form-select text-muted" style={{ width: '120px' }}>
//                       <option>All Services</option>
//                     </Input>
//                   </div>
//                 </div>
//               </div>

//               {/* Calendar Grid Area */}
//               <Card className="border-0 rounded-4 shadow-sm calendar-grid-card overflow-hidden">
//                 <div className="calendar-grid-header d-flex border-bottom">
//                   <div className="time-column-header text-center py-2 text-muted fw-medium border-end" style={{ width: '80px' }}>Time</div>
//                   <div className="staff-column-header flex-grow-1 text-center py-2 text-dark fw-bold">Unassigned</div>
//                 </div>
//                 <div className="calendar-grid-body position-relative" style={{ height: '600px', overflowY: 'auto' }}>
//                   {/* Time Slots */}
//                   {Array.from({ length: 13 }).map((_, i) => {
//                     const hour = i + 8;
//                     const timeLabel = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? "12:00 PM" : `${hour}:00 AM`;
//                     return (
//                       <div key={i} className="time-slot-row d-flex border-bottom" style={{ height: '60px' }}>
//                         <div className="time-label text-end pe-3 py-2 text-muted small border-end" style={{ width: '80px' }}>
//                           {timeLabel}
//                         </div>
//                         <div className="slot-content flex-grow-1 position-relative">
//                           {/* Grid Lines could go here */}
//                         </div>
//                       </div>
//                     )
//                   })}

//                   {/* Empty State Overlay (Optional but nice for visualization) */}
//                   <div className="calendar-empty-state w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75 position-absolute top-0 start-0 pt-5">
//                     <div className="mb-3 mt-5">
//                       <i className="bx bx-calendar-alt text-muted display-4 opacity-25"></i>
//                     </div>
//                     <h5 className="fw-bold text-dark">No appointments for this day</h5>
//                     <p className="text-muted small">Select a different date or create a new appointment</p>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           )}
//         </Container>

//         {/* New Appointment Modal */}
//         <Modal isOpen={modal} toggle={toggleModal} centered className="new-appointment-modal">
//           <div className="modal-content border-0 rounded-4">
//             <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-3 pt-4 position-relative">
//               <div className="text-center w-100">
//                 <h4 className="fw-bold mb-1">New Appointment</h4>
//                 <p className="text-muted small">Book a new appointment</p>
//               </div>
//             </ModalHeader>
//             <ModalBody className="px-4 py-3">
//               <Form>
//                 <FormGroup className="mb-3">
//                   <Label className="fw-bold mb-2">Customer *</Label>
//                   <div className="select-wrapper position-relative">
//                     <Input type="select" className="rounded-pill border-2 px-3 py-2 form-select">
//                       <option className="py-2 ">Select customer</option>
//                       <option className="py-2">John Doe</option>
//                       <option className="py-2">Jane Smith</option>
//                     </Input>
//                   </div>
//                 </FormGroup>

//                 <div className="separator-text mb-3">
//                   <span>or</span>
//                 </div>

//                 <Button 
//                   color="light" 
//                   className="w-100 rounded-pill py-2 mb-3 border d-flex align-items-center justify-content-center gap-2 bg-white"
//                   onClick={() => {
//                     setCustomerModal(true);
//                   }}
//                 >
//                   <i className="bx bx-user-plus fs-5"></i>
//                   <span className="fw-medium">Create New Customer</span>
//                 </Button>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <FormGroup>
//                       <Label className="fw-bold mb-3">Date *</Label>
//                       <div className="position-relative date-picker-field">
//                         <Flatpickr
//                           className="form-control rounded-4 border-light bg-light px-3 py-2"
//                           placeholder="dd-mm-yyyy"
//                           options={{ dateFormat: "d-m-Y" }}
//                         />
//                         <i className="bx bx-calendar position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
//                       </div>
//                     </FormGroup>
//                   </Col>
//                   <Col md={6}>
//                     <FormGroup>
//                       <Label className="fw-bold mb-3">Time *</Label>
//                       <div className="position-relative time-picker-field">
//                         <Flatpickr
//                           className="form-control rounded-4 border-light bg-light px-3 py-2"
//                           placeholder="--:--"
//                           options={{ noCalendar: true, enableTime: true, dateFormat: "H:i" }}
//                         />
//                         <i className="bx bx-time position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
//                       </div>
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <FormGroup className="mb-3">
//                       <Label className="fw-bold mb-3">Package (Optional)</Label>
//                       <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
//                         <option>No Package</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                   <Col md={6}>
//                     <FormGroup className="mb-3">
//                       <Label className="fw-bold mb-3">Booking Source (Optional)</Label>
//                       <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
//                         <option>Select Source</option>
//                         <option>POS</option>
//                         <option>WEB</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <FormGroup>
//                       <Label className="fw-bold mb-3">Staff (Optional)</Label>
//                       <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
//                         <option>Select staff</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                   <Col md={6}>
//                     <FormGroup>
//                       <Label className="fw-bold mb-3">Service (Optional)</Label>
//                       <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select">
//                         <option>Select service</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <FormGroup className="mb-3">
//                   <Label className="fw-bold mb-3">Notes (Optional)</Label>
//                   <Input 
//                     type="textarea" 
//                     rows="4"
//                     placeholder="Any special requests or notes..."
//                     className="rounded-4 border-light bg-light px-4 py-2"
//                   />
//                 </FormGroup>
//               </Form>
//             </ModalBody>
//             <ModalFooter className="border-0 px-4 pb-3 pt-0 gap-2">
//               <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleModal}>
//                 Cancel
//               </Button>
//               <Button color="primary" className="rounded-pill px-5 py-2 fw-medium shadow-primary" onClick={toggleModal}>
//                 Create Appointment
//               </Button>
//             </ModalFooter>
//           </div>
//         </Modal>

//         {/* Create Customer Modal */}
//         <Modal isOpen={customerModal} toggle={() => setCustomerModal(false)} centered className="create-customer-modal">
//           <div className="modal-content border-0 rounded-4">
//             <ModalHeader toggle={() => setCustomerModal(false)} className="border-0 pb-0 px-2 pt-4">
//               <div className="text-center w-100">
//                 <h4 className="fw-bold mb-1">Create New Customer</h4>
//                 <p className="text-muted small">Add a new customer for this appointment</p>
//               </div>
//             </ModalHeader>
//             <ModalBody className="px-5 py-4">
//               <Form>
//                 <FormGroup className="mb-3">
//                   <Label className="fw-bold mb-3">Name *</Label>
//                   <Input 
//                     type="text" 
//                     placeholder="Customer name" 
//                     className="rounded-4 border-primary border-2 px-4 py-2"
//                   />
//                 </FormGroup>
//                 <FormGroup className="mb-3">
//                   <Label className="fw-bold mb-3">Phone *</Label>
//                   <div className="d-flex gap-2">
//                     <div style={{ width: '100px' }}>
//                       <Input type="select" className="rounded-pill border-light bg-light px-1 py-2 form-select">
//                         <option>IN +91</option>
//                       </Input>
//                     </div>
//                     <Input 
//                       type="text" 
//                       placeholder="Phone number" 
//                       className="rounded-pill border-light bg-light px-4 py-2 flex-grow-1"
//                     />
//                   </div>
//                 </FormGroup>
//               </Form>
//             </ModalBody>
//             <ModalFooter className="border-0 px-3 pb-3 pt-0 gap-3">
//               <Button color="light" className="rounded-pill px-4 py-2 fw-medium bg-light border-0" onClick={() => setCustomerModal(false)}>
//                 Cancel
//               </Button>
//               <Button color="primary" className="rounded-pill px-4 py-2 fw-medium opacity-50 shadow-primary" onClick={() => setCustomerModal(false)}>
//                 Create and Select
//               </Button>
//             </ModalFooter>
//           </div>
//         </Modal>
//       </div>
//     </React.Fragment>
//   )
// }

// export default Appointments









import React, { useState, useEffect, useCallback } from "react";
import {
  Container, Row, Col, Card, CardBody, Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,
  Label, Spinner, Table, Badge, Pagination, PaginationItem, PaginationLink,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { URLS } from "../../url";
import { get, post, put, del } from "../../helpers/api_helper";
import { toast } from "react-toastify";

import "./appointments.scss";

// ---------- Helpers ----------
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatTimeForApi = (timeInput) => {
  if (!timeInput) return "";
  const [hours, minutes] = timeInput.split(":");
  const hourNum = parseInt(hours, 10);
  const period = hourNum >= 12 ? "PM" : "AM";
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
  return `${displayHour}:${minutes} ${period}`;
};

const formatTimeForInput = (timeStr) => {
  if (!timeStr) return "";
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (period === "PM" && hours !== "12") hours = String(+hours + 12);
  if (period === "AM" && hours === "12") hours = "00";
  return `${hours.padStart(2, "0")}:${minutes}`;
};

// 🔍 Searchable Dropdown Component
const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  labelKey = "name",
  valueKey = "_id",
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Debug logging
  // console.log("SearchableSelect - options:", options);
  // console.log("SearchableSelect - labelKey:", labelKey, "valueKey:", valueKey);
  
  const filtered = options.filter((opt) =>
    opt[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selected = options.find((opt) => opt[valueKey] === value);

  return (
    <div className="searchable-select position-relative">
      <div
        className="form-control rounded-pill border-light bg-light px-4 py-2 d-flex align-items-center"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        {selected ? <span>{selected[labelKey]}</span> : <span className="text-muted">{placeholder}</span>}
        <i className="bx bx-chevron-down ms-auto"></i>
      </div>
      {open && (
        <div className="dropdown-menu show w-100 p-2" style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}>
          <Input
            type="text"
            placeholder="Search..."
            className="mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {isLoading ? (
            <div className="text-center py-2"><Spinner size="sm" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-2 text-muted">
              {options.length === 0 ? "No data available" : "No matching results"}
            </div>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt[valueKey]}
                type="button"
                className="dropdown-item"
                onClick={() => { onChange(opt[valueKey]); setOpen(false); setSearchTerm(""); }}
              >
                {opt[labelKey]}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ---------- Main Component ----------
const Appointments = () => {
  // ----- State -----
  const [modal, setModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [timeFilter, setTimeFilter] = useState("today");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  // Stats
  const [stats, setStats] = useState({ todaysAppointments: 0, upcoming: 0, completed: 0, totalProducts: 0 });
  const [loadingStats, setLoadingStats] = useState(false);

  // Appointments
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, currentPage: 1, totalPages: 1, limit: 10, hasNextPage: false, hasPreviousPage: false });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [bookingSourceFilter, setBookingSourceFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Form
  const [editMode, setEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    customerType: "existing",
    customerId: "",
    customerName: "",
    customerPhone: "",
    serviceId: "",
    staffId: "",
    packageId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
    bookingSource: "WEB",
  });

  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });

  // Dropdown data
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  // ----- API Calls -----
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const json = await post(URLS.StatsAppionments, {});
      if (json.success) setStats(json.data);
    } catch (err) { 
      console.error("Stats error:", err); 
    } finally { 
      setLoadingStats(false); 
    }
  };

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      let fromDate, toDate;
      if (activeTab === "calendar") {
        fromDate = toDate = formatDate(selectedDate);
      } else {
        if (dateRange?.length === 2) {
          fromDate = formatDate(dateRange[0]);
          toDate = formatDate(dateRange[1]);
        } else {
          const today = new Date();
          fromDate = toDate = formatDate(today);
        }
      }

      const body = {
        fromDate,
        toDate,
        fromTime: "12:00 AM",
        toTime: "11:59 PM",
        bookingSource: bookingSourceFilter || "",
        status: statusFilter === "All Statuses" ? "" : statusFilter,
      };

      const params = new URLSearchParams({
        search: search || "null",
        page: pagination.currentPage,
        limit: pagination.limit,
      });

      const json = await post(`${URLS.GetAppionments}?${params.toString()}`, body);
      if (json.success) {
        setAppointments(json.data || []);
        setPagination(json.pagination);
      }
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  }, [activeTab, dateRange, selectedDate, search, pagination.currentPage, pagination.limit, bookingSourceFilter, statusFilter]);

  // Dropdown fetchers
  const fetchCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const json = await post(URLS.GetAllCustomers, {});
      if (json.success) {
        const customerData = json.data || [];
        setCustomers(customerData);
      }
    } catch (err) { 
      console.error("Customers error:", err); 
    } finally { 
      setLoadingCustomers(false); 
    }
  };

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const json = await post(URLS.GetAllServicePackages, {});
      if (json.success) {
        const packageData = json.data || [];
        setPackages(packageData);
      }
    } catch (err) { 
      console.error("Packages error:", err); 
    } finally { 
      setLoadingPackages(false); 
    }
  };

  const fetchStaff = async () => {
    setLoadingStaff(true);
    try {
      const json = await post(URLS.GetStaff, {});
      if (json.success) {
        setStaffList(json.data || []);
      }
    } catch (err) {
      console.error("Staff error:", err);
    } finally {
      setLoadingStaff(false);
    }
  };

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const json = await post(URLS.GetServices, {});
      if (json.success) {
        const serviceData = json.data || [];
        setServices(serviceData);
      }
    } catch (err) { 
      console.error("Services error:", err); 
    } finally { 
      setLoadingServices(false); 
    }
  };

  // Initial load
  useEffect(() => {
    fetchStats();
    fetchCustomers();
    fetchPackages();
    fetchStaff();
    fetchServices();
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  // ----- Pagination -----
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) setPagination(prev => ({ ...prev, currentPage: page }));
  };

  // ----- Handle time filter -----
  const handleTimeFilterClick = (filter) => {
    setTimeFilter(filter);
    const today = new Date();
    let fromDate, toDate;

    switch (filter) {
      case "today":
        fromDate = toDate = new Date();
        break;
      case "next7days":
        fromDate = new Date();
        toDate = new Date();
        toDate.setDate(today.getDate() + 7);
        break;
      case "last7days":
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 7);
        toDate = new Date();
        break;
      case "last30days":
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 30);
        toDate = new Date();
        break;
      default:
        fromDate = toDate = new Date();
    }

    setDateRange([fromDate, toDate]);
  };

  // ----- Modals -----
  const toggleModal = () => {
    if (modal) { resetForm(); setEditMode(false); setSelectedAppointment(null); }
    setModal(!modal);
  };
   const toggleCustomerModal = () => setCustomerModal(!customerModal);
  

  const resetForm = () => {
    setFormData({
      customerType: "existing",
      customerId: "", customerName: "", customerPhone: "",
      serviceId: "", staffId: "", packageId: "",
      appointmentDate: "", appointmentTime: "",
      notes: "", bookingSource: "WEB",
    });
  };

  // ----- Edit -----
  const openEditModal = async (apt) => {
    setLoading(true);
    try {
      const json = await post(URLS.GetByIdAppionments, { id: apt._id });
      if (json.success) {
        const d = json.data;
        setSelectedAppointment(d);
        setFormData({
          customerType: "existing",
          customerId: d.customerId,
          customerName: d.customerName,
          customerPhone: d.customerPhone,
          serviceId: d.serviceId,
          staffId: d.staffId,
          packageId: d.packageId || "",
          appointmentDate: d.appointmentDate,
          appointmentTime: d.appointmentTime,
          notes: d.notes || "",
          bookingSource: d.bookingSource || "WEB",
        });
        setEditMode(true);
        setModal(true);
      }
    } catch (err) { 
      console.error("Edit fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  // ----- Create / Update -----
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        serviceId: formData.serviceId,
        staffId: formData.staffId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        notes: formData.notes,
        bookingSource: formData.bookingSource,
      };
      if (formData.packageId) payload.packageId = formData.packageId;

      if (formData.customerType === "existing") {
        payload.customerId = formData.customerId;
      } else {
        payload.customerName = formData.customerName;
        payload.customerPhone = formData.customerPhone;
      }

      let json;
      if (editMode && selectedAppointment) {
        json = await put(`${URLS.UpdateAapionments}${selectedAppointment._id}`, payload);
      } else {
        json = await post(URLS.AddAppionments, payload);
      }

      if (json.success) {
        toggleModal();
        fetchAppointments();
        fetchStats();
      } else {
        alert("Operation failed: " + (json.message || "Unknown error"));
      }
    } catch (err) { 
      console.error("Submit error:", err); 
      alert("Operation failed. Please try again.");
    } finally { 
      setLoading(false); 
    }
  };

  // ----- Cancel -----
  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    setLoading(true);
    try {
      const json = await del(`${URLS.DeleteAppionments}${id}`);
      if (json.success) { 
        fetchAppointments(); 
        fetchStats(); 
      } else {
        alert("Cancel failed.");
      }
    } catch (err) { 
      console.error("Cancel error:", err); 
      alert("Cancel failed. Please try again.");
    } finally { 
      setLoading(false); 
    }
  };

  // ----- Create Customer from modal -----
  // const handleCreateCustomer = async () => {
  //   if (!newCustomer.name || !newCustomer.phone) { 
  //     alert("Name and phone required"); 
  //     return; 
  //   }
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       customerName: newCustomer.name,
  //       customerPhone: newCustomer.phone,
  //     };
  //     const json = await post(URLS.CreateCustomerAppionments, payload);
  //     if (json.success) {
  //       setFormData({
  //       ...formData,
  //       customerType: "existing",
  //       customerId: newCust._id,
  //       customerName: "",
  //       customerPhone: "",
  //     });
  //       toggleCustomerModal();
  //       alert("Customer created and selected.");
  //     } else {
  //       alert("Failed: " + (json.message || "Unknown error"));
  //     }
  //   } catch (err) { 
  //     console.error("Create customer error:", err); 
  //     alert("Failed to create customer. Please try again.");
  //   } finally { 
  //     setLoading(false); 
  //   }
  // };

  const handleCreateCustomer = async () => {
  if (!newCustomer.name || !newCustomer.phone) {
    alert("Name and phone required");
    return;
  }

  setLoading(true);
  try {
    // Send only customer details (use your dedicated customer-creation endpoint)
    const payload = {
      customerName: newCustomer.name,
      customerPhone: newCustomer.phone,
    };

    const json = await post(URLS.CreateCustomerAppionments, payload);
    
    if (json.success) {

  const newCustomerId =
    json.data.customerId ||
    json.data._id;

  // Refresh customer list
  await fetchCustomers();

  // Select newly created customer
  setFormData(prev => ({
    ...prev,
    customerType: "existing",
    customerId: newCustomerId,
    customerName: "",
    customerPhone: "",
  }));

  // Reset modal fields
  setNewCustomer({
    name: "",
    phone: "",
  });

  toggleCustomerModal();

  toast.success("Customer created and selected.");
} 
    else {
      toast.error("Failed: " + (json.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Create customer error:", err);
    toast.error("Failed to create customer. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // ----- Summary Cards -----
  const summaryCards = [
    { title: "Today's Appointments", value: stats.todaysAppointments, icon: "bx-calendar", class: "today" },
    { title: "Upcoming", value: stats.upcoming, icon: "bx-time-five", class: "upcoming" },
    { title: "Completed", value: stats.completed, icon: "bx-check-circle", class: "completed" },
    { title: "Products", value: stats.totalProducts, icon: "bx-package", class: "products" },
  ];

  // ----- Calendar Rendering (same as before) -----
  const renderCalendarAppointments = () => {
    const dayApps = appointments.filter(apt => apt.appointmentDate === formatDate(selectedDate));
    return dayApps.map(apt => {
      const match = apt.appointmentTime.match(/(\d+):(\d+)\s*(AM|PM)/);
      if (!match) return null;
      let hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      const period = match[3];
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
      const start = hour * 60 + minute;
      const duration = apt.duration || 60;
      const slotStart = 8 * 60; // 8:00 AM
      const top = ((start - slotStart) / 60) * 60;
      const height = (duration / 60) * 60;
      if (start < slotStart || start >= slotStart + 13 * 60) return null;
      return (
        <div key={apt._id} className="appointment-block position-absolute bg-primary text-white rounded-2 p-1 small"
          style={{ top: `${top}px`, height: `${height}px`, left: "5px", right: "5px", zIndex: 10, fontSize: "12px", lineHeight: "1.2" }}
          title={`${apt.customerName} - ${apt.serviceName}`}
        >
          <strong>{apt.customerName}</strong><br />{apt.serviceName} ({apt.appointmentTime})
        </div>
      );
    });
  };

  // ---------- Render ----------
  return (
    <React.Fragment>
      <div className="page-content appointments-page dashboard-sans">
        <Container fluid>
          {/* Header & Tabs (unchanged) */}
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
                <Button className={classNames("rounded-pill px-3 border-0", { "bg-primary text-white": activeTab === "list", "bg-transparent text-dark": activeTab !== "list" })} onClick={() => setActiveTab("list")}>
                  <i className="bx bx-list-ul me-1"></i> List
                </Button>
                <Button className={classNames("rounded-pill px-3 border-0", { "bg-primary text-white": activeTab === "calendar", "bg-transparent text-dark": activeTab !== "calendar" })} onClick={() => setActiveTab("calendar")}>
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
            {summaryCards.map((card, i) => (
              <Col key={i} xl={3} md={6}>
                <Card className={classNames("appointment-summary-card border-0 h-100 rounded-4", card.class)}>
                  <CardBody className="p-4 d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 text-white opacity-75 fw-medium">{card.title}</p>
                      <h2 className="mb-0 text-white fw-bold">{loadingStats ? <Spinner size="sm" color="light" /> : card.value}</h2>
                    </div>
                    <div className="icon-wrapper"><i className={classNames("bx", card.icon)}></i></div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {/* List View */}
          {activeTab === "list" && (
            <>
              {/* Filters */}
              <div className="filter-bar d-flex align-items-center gap-3 mb-4 flex-wrap">
                <div className="time-filters d-flex gap-2 p-1 bg-white rounded-pill shadow-sm">
                  {["Today", "Next 7 Days", "Last 7 Days", "Last 30 Days"].map(item => (
                    <Button key={item} className={classNames("rounded-pill border-0 px-3 py-1", { "bg-light text-dark fw-medium": timeFilter === item.toLowerCase().replace(/ /g, ""), "bg-transparent text-muted": timeFilter !== item.toLowerCase().replace(/ /g, "") })}
                      onClick={() => handleTimeFilterClick(item.toLowerCase().replace(/ /g, ""))}>{item}</Button>
                  ))}
                </div>
                <div className="date-picker-wrapper bg-white rounded-pill px-3 py-1 shadow-sm d-flex align-items-center border">
                  <i className="bx bx-calendar me-2 text-muted"></i>
                  <Flatpickr className="form-control border-0 bg-transparent p-0" options={{ mode: "range", dateFormat: "M j, Y", defaultDate: dateRange }}
                    value={dateRange} onChange={(dates) => setDateRange(dates)} />
                </div>
                {/* <div className="status-filter bg-white rounded-pill shadow-sm border p-1 px-3 d-flex align-items-center">
                  <Input type="select" className="border-0 bg-transparent p-0 form-control form-select" value={bookingSourceFilter}
                    onChange={(e) => setBookingSourceFilter(e.target.value)}>
                    <option value="">All Sources</option>
                    <option value="WEB">WEB</option>
                    <option value="POS">POS</option>
                  </Input>
                </div> */}
              </div>

              {/* Search & Status */}
              <Row className="mb-4">
                <Col md={4}>
                  <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3">
                    <i className="bx bx-search-alt text-muted me-2"></i>
                    <Input type="text" placeholder="Search by name or phone..." className="border-0 bg-transparent p-0 form-control"
                      value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </Col>
                <Col md={2}>
                  <div className="status-filter bg-white rounded-pill shadow-sm border p-1 px-3 d-flex align-items-center">
                    <Input type="select" className="border-0 bg-transparent p-0 form-control form-select" value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}>
                      <option>All Statuses</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Upcoming</option>
                      <option>Cancelled</option>
                    </Input>
                  </div>
                </Col>
              </Row>

              {/* Table */}
              <Card className="border-0 rounded-4 shadow-sm main-content-card">
                {loading ? (
                  <div className="text-center py-5"><Spinner color="primary" /><p className="mt-2">Loading appointments...</p></div>
                ) : appointments.length === 0 ? (
                  <CardBody className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                    <div className="empty-state-icon mb-4"><div className="icon-circle bg-light d-flex align-items-center justify-content-center"><i className="bx bx-calendar-x text-muted display-4"></i></div></div>
                    <h4 className="fw-bold text-dark mb-2">No Appointments Found</h4>
                    <p className="text-muted text-center mb-4" style={{ maxWidth: "400px" }}>You don't have any appointments yet. Create your first appointment to get started.</p>
                    <Button color="primary" className="rounded-pill px-5 py-2 shadow" onClick={toggleModal}><i className="bx bx-plus me-1"></i> Book First Appointment</Button>
                  </CardBody>
                ) : (
                  <CardBody className="p-0">
                    <div className="table-responsive">
                      <Table className="mb-0 align-middle" hover>
                        <thead className="bg-light">
                          <tr>
                            <th>ID</th><th>Customer</th><th>Date</th><th>Time</th><th>Service</th><th>Staff</th><th>Status</th><th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.filter(apt => statusFilter === "All Statuses" ? true : apt.status === statusFilter).map(apt => (
                            <tr key={apt._id}>
                              <td className="text-muted small">{apt.appointmentId}</td>
                              <td><div className="fw-bold">{apt.customerName}</div><small className="text-muted">{apt.customerPhone}</small></td>
                              {/* <td>{apt.appointmentDate}</td> */}
                              <td>
                                {apt.appointmentDate}
                                {apt.appointmentDate === formatDate(new Date()) && (
                                  <Badge color="success" className="ms-2 rounded-pill" pill>Today</Badge>
                                )}
                              </td>
                              <td>{apt.appointmentTime}</td>
                              <td>{apt.serviceName || "—"}</td>
                              <td>{apt.staffName || "—"}</td>
                              <td><Badge color={apt.status === "Upcoming" ? "primary" : apt.status === "Completed" ? "success" : apt.status === "Cancelled" ? "danger" : "warning"} className="rounded-pill px-3 py-1">{apt.status}</Badge></td>
                              <td>
                                <div className="d-flex gap-1">
                                  <Button color="light" size="sm" className="rounded-pill" onClick={() => openEditModal(apt)}><i className="bx bx-edit-alt"></i></Button>
                                  <Button color="light" size="sm" className="rounded-pill text-danger" onClick={() => cancelAppointment(apt._id)}><i className="bx bx-trash"></i></Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {pagination.totalPages > 1 && (
                      <div className="d-flex justify-content-center p-3">
                        <Pagination>
                          <PaginationItem disabled={!pagination.hasPreviousPage}><PaginationLink previous onClick={() => goToPage(pagination.currentPage - 1)} /></PaginationItem>
                          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                            <PaginationItem key={page} active={page === pagination.currentPage}><PaginationLink onClick={() => goToPage(page)}>{page}</PaginationLink></PaginationItem>
                          ))}
                          <PaginationItem disabled={!pagination.hasNextPage}><PaginationLink next onClick={() => goToPage(pagination.currentPage + 1)} /></PaginationItem>
                        </Pagination>
                      </div>
                    )}
                  </CardBody>
                )}
              </Card>
            </>
          )}

          {/* Calendar View */}
          {activeTab === "calendar" && (
            <div className="calendar-view-container">
              {/* Calendar Filter Bar */}
              <div className="calendar-filter-bar d-flex justify-content-between align-items-center mb-4 bg-white p-2 rounded-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="nav-controls d-flex gap-2">
                    <Button color="light" className="rounded-circle p-2 bg-light border-0"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 86400000))}>
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
                    <Button color="light" className="rounded-circle p-2 bg-light border-0"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 86400000))}>
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
                          {/* Grid Lines */}
                        </div>
                      </div>
                    )
                  })}

                  {/* Render Appointments on Calendar */}
                  {renderCalendarAppointments()}

                  {/* Empty State Overlay */}
                  {appointments.filter(apt => apt.appointmentDate === formatDate(selectedDate)).length === 0 && (
                    <div className="calendar-empty-state w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75 position-absolute top-0 start-0 pt-5">
                      <div className="mb-3 mt-5">
                        <i className="bx bx-calendar-alt text-muted display-4 opacity-25"></i>
                      </div>
                      <h5 className="fw-bold text-dark">No appointments for this day</h5>
                      <p className="text-muted small">Select a different date or create a new appointment</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

        </Container>

        {/* 📌 Appointment Modal */}
        <Modal isOpen={modal} toggle={toggleModal} centered className="new-appointment-modal" size="lg">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-3 pt-4">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">{editMode ? "Edit Appointment" : "New Appointment"}</h4>
                <p className="text-muted small">{editMode ? "Update details" : "Book a new appointment"}</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <Form>
                {/* Customer Selection */}
                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-2">Customer *</Label>
                  {/* <div className="d-flex gap-3 mb-2">
                    <FormGroup check><Input type="radio" name="customerType" checked={formData.customerType === "existing"} onChange={() => setFormData({...formData, customerType: "existing"})} /> <Label check>Existing Customer</Label></FormGroup>
                    <FormGroup check><Input type="radio" name="customerType" checked={formData.customerType === "new"} onChange={() => setFormData({...formData, customerType: "new"})} /> <Label check>New Customer</Label></FormGroup>
                  </div> */}
                  {formData.customerType === "existing" ? (
                    <SearchableSelect key={formData.customerId} options={customers} value={formData.customerId} onChange={(id) => setFormData({...formData, customerId: id})} placeholder="Search and select customer..." labelKey="name" valueKey="_id" isLoading={loadingCustomers} />
                  ) : (
                    <Row>
                      <Col md={6}><Input type="text" placeholder="Customer Name" className="rounded-pill border-2 px-3 py-2" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} /></Col>
                      <Col md={6}><Input type="text" placeholder="Phone" className="rounded-pill border-2 px-3 py-2" value={formData.customerPhone} maxLength={10} onChange={e => setFormData({...formData, customerPhone: e.target.value})} /></Col>
                    </Row>
                  )}
                </FormGroup>
                <div className="separator-text mb-3"><span>or</span></div>
                <Button color="light" className="w-100 rounded-pill py-2 mb-3 border d-flex align-items-center justify-content-center gap-2 bg-white" onClick={() => setCustomerModal(true)}>
                  <i className="bx bx-user-plus fs-5"></i><span className="fw-medium">Create New Customer</span>
                </Button>

                {/* Date & Time */}
                <Row className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Date *</Label>
                      <Flatpickr className="form-control rounded-4 border-light bg-light px-3 py-2" placeholder="YYYY-MM-DD" options={{ dateFormat: "Y-m-d" }}
                        value={formData.appointmentDate} onChange={date => setFormData({...formData, appointmentDate: formatDate(date[0])})} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Time *</Label>
                      <Flatpickr className="form-control rounded-4 border-light bg-light px-3 py-2" placeholder="--:--" options={{ noCalendar: true, enableTime: true, dateFormat: "h:i K" }}
                        value={formatTimeForInput(formData.appointmentTime)}
                        onChange={time => setFormData({...formData, appointmentTime: time[0] ? formatTimeForApi(new Date(time[0]).toTimeString().split(" ")[0]) : ""})} />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Package & Booking Source */}
                <Row className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Package (Optional)</Label>
                      <SearchableSelect options={packages} value={formData.packageId} onChange={id => setFormData({...formData, packageId: id})} placeholder="Select package" labelKey="packageName" valueKey="_id" isLoading={loadingPackages} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Booking Source *</Label>
                      <Input type="select" className="rounded-pill border-light bg-light px-4 py-2 form-select" value={formData.bookingSource}
                        onChange={e => setFormData({...formData, bookingSource: e.target.value})}>
                        <option value="WEB">WEB</option><option value="POS">POS</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                {/* Staff & Service */}
                <Row className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Staff (Optional)</Label>
                      <SearchableSelect options={staffList} value={formData.staffId} onChange={id => setFormData({...formData, staffId: id})} placeholder="Select staff" labelKey="name" valueKey="_id" isLoading={loadingStaff} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold mb-3">Service (Optional)</Label>
                      <SearchableSelect options={services} value={formData.serviceId} onChange={id => setFormData({...formData, serviceId: id})} placeholder="Select service" labelKey="serviceName" valueKey="_id" isLoading={loadingServices} />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Notes */}
                <FormGroup className="mb-3">
                  <Label className="fw-bold mb-3">Notes (Optional)</Label>
                  <Input type="textarea" rows="4" placeholder="Any special requests or notes..." className="rounded-4 border-light bg-light px-4 py-2"
                    value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-3 pt-0 gap-2">
              <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleModal}>Cancel</Button>
              <Button color="primary" className="rounded-pill px-5 py-2 fw-medium shadow-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <Spinner size="sm" /> : editMode ? "Update Appointment" : "Create Appointment"}
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Create Customer Modal */}
        <Modal isOpen={customerModal} toggle={toggleCustomerModal} centered className="create-customer-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleCustomerModal} className="border-0 pb-0 px-2 pt-4">
              <div className="text-center w-100"><h4 className="fw-bold mb-1">Create New Customer</h4><p className="text-muted small">Add a new customer for this appointment</p></div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Form>
                <FormGroup className="mb-3"><Label className="fw-bold mb-3">Name *</Label><Input type="text" placeholder="Customer name" className="rounded-4 border-primary border-2 px-4 py-2" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} /></FormGroup>
                <FormGroup className="mb-3"><Label className="fw-bold mb-3">Phone *</Label><div className="d-flex gap-2"><div style={{width:'100px'}}><Input type="select" className="rounded-pill border-light bg-light px-1 py-2 form-select"><option>IN +91</option></Input></div><Input type="text" placeholder="Phone number" className="rounded-pill border-light bg-light px-4 py-2 flex-grow-1" value={newCustomer.phone} maxLength={10} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} /></div></FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-3 pb-3 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-medium bg-light border-0" onClick={toggleCustomerModal}>Cancel</Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-medium shadow-primary" onClick={handleCreateCustomer} disabled={loading}>{loading ? <Spinner size="sm" /> : "Create and Select"}</Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Appointments;


