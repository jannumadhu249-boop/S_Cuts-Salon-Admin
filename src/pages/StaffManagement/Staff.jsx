// import React, { useState } from "react"
// import {
//     Container,
//     Row,
//     Col,
//     Card,
//     CardBody,
//     Button,
//     Input,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Label,
//     FormGroup,
//     Nav,
//     NavItem,
//     NavLink,
//     TabContent,
//     TabPane,
// } from "reactstrap"
// import classNames from "classnames"
// import Flatpickr from "react-flatpickr"

// // Styles
// import "./staff.scss"

// const Staff = () => {
//     const [activeTab, setActiveTab] = useState("active")
//     const [addModal, setAddModal] = useState(false)
//     const [modalTab, setModalTab] = useState("1")

//     const toggleAddModal = () => setAddModal(!addModal)

//     return (
//         <React.Fragment>
//             <div className="page-content staff-management-page dashboard-sans">
//                 <Container fluid>
//                     {/* Header Section */}
//                     <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
//                         <div>
//                             <h3 className="fw-bold mb-0 text-dark">
//                                 <i className="bx bx-id-card text-primary me-2"></i>Staff Management
//                             </h3>
//                             <p className="text-muted mb-0">Manage staff and track commissions</p>
//                         </div>
//                         <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={toggleAddModal}>
//                             <i className="bx bx-plus me-1"></i> Add Staff
//                         </Button>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="search-box bg-white rounded-pill border px-3 py-2 d-flex align-items-center shadow-sm mb-4" style={{ maxWidth: '400px' }}>
//                         <i className="bx bx-search text-muted me-2"></i>
//                         <Input type="text" placeholder="Search by name or phone..." className="border-0 bg-transparent p-0" />
//                     </div>

//                     {/* Filter Tabs */}
//                     <div className="tab-switcher bg-light bg-opacity-50 p-1 rounded-pill d-inline-flex mb-4 border">
//                         <Button
//                             className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
//                                 "bg-white shadow-sm text-dark": activeTab === "active",
//                                 "bg-transparent text-muted": activeTab !== "active",
//                             })}
//                             onClick={() => setActiveTab("active")}
//                         >
//                             Active Staff (0)
//                         </Button>
//                         <Button
//                             className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
//                                 "bg-white shadow-sm text-dark": activeTab === "archived",
//                                 "bg-transparent text-muted": activeTab !== "archived",
//                             })}
//                             onClick={() => setActiveTab("archived")}
//                         >
//                             Archived (0)
//                         </Button>
//                     </div>

//                     {/* Main List Card */}
//                     <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
//                         <CardBody className="p-0">
//                             <div className="table-responsive">
//                                 <table className="table table-hover align-middle mb-0 custom-table">
//                                     <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
//                                         {activeTab === "active" ? (
//                                             <tr>
//                                                 <th className="ps-4">Staff Member</th>
//                                                 <th>Contact</th>
//                                                 <th>Role</th>
//                                                 <th>Commission</th>
//                                                 <th>Status</th>
//                                                 <th className="text-end pe-4">Actions</th>
//                                             </tr>
//                                         ) : (
//                                             <tr>
//                                                 <th className="ps-4">Staff Member</th>
//                                                 <th>Contact</th>
//                                                 <th>Role</th>
//                                                 <th>Archived On</th>
//                                             </tr>
//                                         )}
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td colSpan={activeTab === "active" ? "5" : "4"} className="py-5 text-center">
//                                                 <div className="empty-state opacity-50">
//                                                     <h6 className="text-muted mb-0">
//                                                         {activeTab === "active" ? "No staff found" : "No archived staff"}
//                                                     </h6>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </CardBody>

//                         {/* Pagination Footer */}
//                         <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
//                             <div className="d-flex align-items-center gap-3">
//                                 <span className="text-muted small">Showing 0-0 of 0 staff</span>
//                                 <div className="d-flex align-items-center gap-2">
//                                     <span className="text-muted small">Rows per page:</span>
//                                     <Input type="select" className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3" style={{ width: '70px' }}>
//                                         <option>10</option>
//                                     </Input>
//                                 </div>
//                             </div>
//                             <div className="pagination-controls d-flex align-items-center gap-3">
//                                 <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
//                                     <i className="bx bx-chevron-left"></i> Previous
//                                 </Button>
//                                 <span className="text-muted small fw-medium">Page 1 of 1</span>
//                                 <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
//                                     Next <i className="bx bx-chevron-right"></i>
//                                 </Button>
//                             </div>
//                         </div>
//                     </Card>
//                 </Container>

//                 {/* Add Staff Modal */}
//                 <Modal isOpen={addModal} toggle={toggleAddModal} centered className="staff-modal modal-md">
//                     <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
//                         <ModalHeader toggle={toggleAddModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
//                             <div className="text-center w-100">
//                                 <h4 className="fw-bold mb-1">Add New Staff</h4>
//                                 <p className="text-muted small mb-0">Add a new staff member.</p>
//                             </div>
//                         </ModalHeader>
//                         <ModalBody className="px-5 py-4">
//                             {/* Modal Tabs */}
//                             <div className="modal-tab-switcher bg-light rounded-pill p-1 d-flex mb-4">
//                                 <Button
//                                     className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
//                                         "bg-white shadow-sm text-dark": modalTab === "1",
//                                         "bg-transparent text-muted": modalTab !== "1",
//                                     })}
//                                     onClick={() => setModalTab("1")}
//                                 >
//                                     Basic Info
//                                 </Button>
//                                 <Button
//                                     className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
//                                         "bg-white shadow-sm text-dark": modalTab === "2",
//                                         "bg-transparent text-muted": modalTab !== "2",
//                                     })}
//                                     onClick={() => setModalTab("2")}
//                                 >
//                                     Employment
//                                 </Button>
//                                 <Button
//                                     className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
//                                         "bg-white shadow-sm text-dark": modalTab === "3",
//                                         "bg-transparent text-muted": modalTab !== "3",
//                                     })}
//                                     onClick={() => setModalTab("3")}
//                                 >
//                                     Emergency
//                                 </Button>
//                             </div>

//                             <TabContent activeTab={modalTab}>
//                                 <TabPane tabId="1">
//                                     <FormGroup className="mb-4">
//                                         <Label className="fw-bold small mb-2">Name *</Label>
//                                         <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple" />
//                                     </FormGroup>
//                                     <Row>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Phone</Label>
//                                                 <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Email</Label>
//                                                 <Input type="email" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Role *</Label>
//                                                 <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select small">
//                                                     <option>Select role</option>
//                                                 </Input>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Date of Birth</Label>
//                                                 <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
//                                                     <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
//                                                     <i className="bx bx-calendar text-muted"></i>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                 </TabPane>
//                                 <TabPane tabId="2">
//                                     <Row>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Date of Joining</Label>
//                                                 <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
//                                                     <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
//                                                     <i className="bx bx-calendar text-muted"></i>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Date of Leaving</Label>
//                                                 <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
//                                                     <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
//                                                     <i className="bx bx-calendar text-muted"></i>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Monthly Salary (₹)</Label>
//                                                 <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                             </FormGroup>
//                                         </Col>
//                                         <Col md={6}>
//                                             <FormGroup className="mb-4">
//                                                 <Label className="fw-bold small mb-2">Commission %</Label>
//                                                 <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                             </FormGroup>
//                                         </Col>
//                                     </Row>
//                                     <FormGroup className="mb-0">
//                                         <Label className="fw-bold small mb-2">Attendance ID</Label>
//                                         <Input type="text" placeholder="Optional ID for attendance tracking" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                     </FormGroup>
//                                 </TabPane>
//                                 <TabPane tabId="3">
//                                     <FormGroup className="mb-4">
//                                         <Label className="fw-bold small mb-2">Emergency Contact Name</Label>
//                                         <Input type="text" placeholder="Name of emergency contact" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                     </FormGroup>
//                                     <FormGroup className="mb-0">
//                                         <Label className="fw-bold small mb-2">Emergency Contact Phone</Label>
//                                         <Input type="text" placeholder="Phone number" className="rounded-4 bg-light border-0 px-3 py-2" />
//                                     </FormGroup>
//                                 </TabPane>
//                             </TabContent>
//                         </ModalBody>
//                         <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
//                             <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
//                                 Cancel
//                             </Button>
//                             <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary opacity-50" disabled>
//                                 Add Staff
//                             </Button>
//                         </ModalFooter>
//                     </div>
//                 </Modal>
//             </div>
//         </React.Fragment>
//     )
// }

// export default Staff



import React, { useState, useEffect, useCallback } from "react";
import {
  Container, Row, Col, Card, CardBody, Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup,
  Spinner, Table, TabContent, TabPane,
} from "reactstrap";
import classNames from "classnames";
import Flatpickr from "react-flatpickr";
import { URLS } from "../../url";
import { post, put, del } from "../../helpers/api_helper";
import { toast } from "react-toastify";
import "./staff.scss";

// ---------- Helpers ----------
const formatDateToInput = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0]; // yyyy-mm-dd
};

const Staff = () => {
  // ----- State -----
  const [activeTab, setActiveTab] = useState("active");
  const [modal, setModal] = useState(false);
  const [modalTab, setModalTab] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Lists
  const [staffList, setStaffList] = useState([]);
  const [archivedStaff, setArchivedStaff] = useState([]);
  const [roles, setRoles] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [archiveCurrentPage, setArchiveCurrentPage] = useState(1);
  const [archiveTotalPages, setArchiveTotalPages] = useState(1);
  const [archiveTotalRecords, setArchiveTotalRecords] = useState(0);

  // Search
  const [search, setSearch] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);

  // Counts
  const [activeCount, setActiveCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
    dateOfBirth: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    monthlySalary: "",
    commission: "",
    attendanceId: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  // ----- API Calls -----
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: activeTab === "active" ? currentPage : archiveCurrentPage,
        limit: pageSize,
        search: search || "",
      });

      const url =
        activeTab === "active"
          ? `${URLS.GetStaff}?${params.toString()}`
          : `${URLS.GetArchivedStaff}?${params.toString()}`;

      const response = await post(url, {});
      if (response.success) {
        if (activeTab === "active") {
          setStaffList(response.data || []);
          setTotalPages(response.totalPages || 1);
          setTotalRecords(response.totalCount || response.totalRecords || 0);
        } else {
          setArchivedStaff(response.data || []);
          setArchiveTotalPages(response.totalPages || 1);
          setArchiveTotalRecords(response.totalCount || response.totalRecords || 0);
        }
      } else {
        toast.error(response.message || "Failed to fetch staff");
      }
    } catch (error) {
      toast.error("An error occurred while fetching staff");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentPage, archiveCurrentPage, pageSize, search]);

  const fetchCounts = async () => {
    try {
      const activeRes = await post(`${URLS.GetStaff}?page=1&limit=1&search=`, {});
      const archivedRes = await post(`${URLS.GetArchivedStaff}?page=1&limit=1&search=`, {});
      setActiveCount(activeRes.totalCount || activeRes.totalRecords || 0);
      setArchivedCount(archivedRes.totalCount || archivedRes.totalRecords || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const response = await post(URLS.GetRoles, {});
      if (response.success) setRoles(response.data || []);
    } catch (err) {
      console.error("Roles fetch error:", err);
    } finally {
      setRolesLoading(false);
    }
  };

  const fetchStaffById = async (id) => {
    try {
      const response = await post(URLS.GetByIdStaff, { id });
      if (response.success) return response.data;
    } catch (err) {
      console.error("Get staff by id error:", err);
    }
    return null;
  };

  // ----- Initial Load & Tab Switch -----
  useEffect(() => {
    fetchRoles();
    fetchCounts();
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  // Re-fetch on tab change or search
  useEffect(() => {
    if (activeTab === "active") setCurrentPage(1);
    else setArchiveCurrentPage(1);
  }, [search, activeTab]);

  // ----- Modal & Form -----
  const toggleModal = () => {
    if (modal) {
      resetForm();
      setEditMode(false);
      setSelectedStaff(null);
      setModalTab("1");
    }
    setModal(!modal);
  };

  const resetForm = () => {
    setFormData({
      name: "", password: "", email: "", role: "",
      dateOfBirth: "", dateOfJoining: "", dateOfLeaving: "",
      monthlySalary: "", commission: "", attendanceId: "",
      emergencyContactName: "", emergencyContactPhone: "",
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditMode(false);
    setSelectedStaff(null);
    setModalTab("1");
    setModal(true);
  };

  const openEditModal = async (staff) => {
    setLoading(true);
    const data = await fetchStaffById(staff._id);
    if (data) {
      setSelectedStaff(data);
      setFormData({
        name: data.name || "",
        password: data.password || "",
        email: data.email || "",
        role: data.role?._id || data.role || "",
        dateOfBirth: formatDateToInput(data.dateOfBirth),
        dateOfJoining: formatDateToInput(data.dateOfJoining),
        dateOfLeaving: formatDateToInput(data.dateOfLeaving),
        monthlySalary: data.monthlySalary || "",
        commission: data.commission || "",
        attendanceId: data.attendanceId || "",
        emergencyContactName: data.emergencyContactName || "",
        emergencyContactPhone: data.emergencyContactPhone || "",
      });
      setEditMode(true);
      setModalTab("1");
      setModal(true);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        dateOfBirth: formData.dateOfBirth,
        dateOfJoining: formData.dateOfJoining,
        dateOfLeaving: formData.dateOfLeaving,
        monthlySalary: Number(formData.monthlySalary) || 0,
        commission: Number(formData.commission) || 0,
        attendanceId: formData.attendanceId,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        status: "Active",
      };

      let response;
      if (editMode && selectedStaff) {
        response = await put(`${URLS.UpdateStaff}${selectedStaff._id}`, payload);
      } else {
        response = await post(URLS.CreateStaff, payload);
      }

      if (response.success) {
        toast.success(response.message || `Staff ${editMode ? "updated" : "created"} successfully`);
        toggleModal();
        fetchStaff();
        fetchCounts();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error("Operation failed. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };
    // ----- Move to archive (soft delete) -----
    const handleArchive = async (id) => {
        if (!window.confirm("Move this staff member to archive?")) return;

        setLoading(true);
        try {
            const response = await put(`${URLS.UpdateStaff}${id}`, { isDeleted: true });
            if (response.success) {
            toast.success("Staff moved to archive");
            fetchStaff();
            fetchCounts();
            } else {
            toast.error(response.message || "Archive failed");
            }
        } catch (error) {
            toast.error("Archive failed. Please try again.");
            console.error("Archive error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ----- Permanent delete -----
    const handlePermanentDelete = async (id) => {
        if (!window.confirm("Permanently delete this staff member? This cannot be undone.")) return;

           setLoading(true);
            try {
                const response = await del(`${URLS.DeleteStaff}${id}`);
                if (response.success) {
                toast.success("Staff deleted permanently");
                fetchStaff();
                fetchCounts();
                } else {
                toast.error(response.message || "Delete failed");
                }
            } catch (error) {
                toast.error("Delete failed. Please try again.");
                console.error("Delete error:", error);
            } finally {
                setLoading(false);
        }
    };

  // ----- Render -----
  return (
    <React.Fragment>
      <div className="page-content staff-management-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-id-card text-primary me-2"></i>Staff Management
              </h3>
              <p className="text-muted mb-0">Manage staff and track commissions</p>
            </div>
            {activeTab === "active" && (
              <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={openAddModal}>
                <i className="bx bx-plus me-1"></i> Add Staff
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className="tab-switcher bg-light bg-opacity-50 p-1 rounded-pill d-inline-flex mb-4 border">
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "active",
                "bg-transparent text-muted": activeTab !== "active",
              })}
              onClick={() => { setActiveTab("active"); setCurrentPage(1); }}
            >
              <i className="bx bx-user me-1"></i> Active ({activeCount})
            </Button>
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "archived",
                "bg-transparent text-muted": activeTab !== "archived",
              })}
              onClick={() => { setActiveTab("archived"); setArchiveCurrentPage(1); }}
            >
              <i className="bx bx-archive me-1"></i> Archived ({archivedCount})
            </Button>
          </div>

          {/* Search & Table Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
            <div className="p-4 border-bottom">
              <div className="search-box bg-light rounded-pill border-0 px-3 py-2 d-flex align-items-center" style={{ maxWidth: "350px" }}>
                <i className="bx bx-search text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="border-0 bg-transparent p-0 form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <CardBody className="p-0">
              <div className="table-responsive">
                <Table className="table-hover align-middle mb-0 custom-table">
                  <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                    {activeTab === "active" ? (
                      <tr>
                        <th className="ps-4" style={{ width: "50px" }}>Sl.No</th>
                        <th>Staff Member</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="ps-4" style={{ width: "50px" }}>Sl.No</th>
                        <th>Staff Member</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Archived On</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (activeTab === "active" ? staffList : archivedStaff).length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-5 text-center text-muted">
                          No staff found
                        </td>
                      </tr>
                    ) : (
                      (activeTab === "active" ? staffList : archivedStaff).map((staff, index) => (
                        <tr key={staff._id}>
                          <td className="ps-4">
                            {((activeTab === "active" ? currentPage : archiveCurrentPage) - 1) * pageSize + index + 1}
                          </td>
                          <td>
                            <div className="fw-bold">{staff.name}</div>
                          </td>
                          <td>
                            <div className="small">{staff.phone}</div>
                            <div className="small text-muted">{staff.email}</div>
                          </td>
                          <td>{staff.role?.name || staff.roleName || "—"}</td>
                          {activeTab === "active" ? (
                            <>
                              <td>{staff.commission}%</td>
                              <td><span className="badge bg-success rounded-pill">Active</span></td>
                              <td className="text-end pe-4 me-2">
                                <Button color="light" size="md" className="rounded-pill text-primary me-2" onClick={() => openEditModal(staff)}>
                                  <i className="bx bx-edit-alt"></i>
                                </Button>
                                <Button color="light" size="md" className="rounded-pill text-danger" onClick={() => handleArchive(staff._id)}>
                                  <i className="bx bx-archive-in"></i>
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{staff.logModifiedDate ? new Date(staff.logModifiedDate).toLocaleDateString() : "—"}</td>
                              <td className="text-end pe-4">
                                <div className="d-flex justify-content-center gap-2">
                                  {/* <Button color="light" size="sm" className="rounded-pill" onClick={() => handleRestore(staff._id)}>
                                    <i className="bx bx-reset text-success"></i>
                                  </Button> */}
                                  <Button color="light" size="md" className="rounded-pill text-danger" onClick={() => handlePermanentDelete(staff._id)}>
                                    <i className="bx bx-trash"></i>
                                  </Button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {Math.min(((activeTab === "active" ? currentPage : archiveCurrentPage) - 1) * pageSize + 1, activeTab === "active" ? totalRecords : archiveTotalRecords)} to{" "}
                  {Math.min((activeTab === "active" ? currentPage : archiveCurrentPage) * pageSize, activeTab === "active" ? totalRecords : archiveTotalRecords)} of{" "}
                  {activeTab === "active" ? totalRecords : archiveTotalRecords} staff
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input
                    type="select"
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3"
                    style={{ width: "80px" }}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value));
                      if (activeTab === "active") setCurrentPage(1);
                      else setArchiveCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </Input>
                </div>
              </div>

              <div className="pagination-controls d-flex align-items-center gap-3">
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1"
                  disabled={(activeTab === "active" ? currentPage : archiveCurrentPage) === 1 || loading}
                  onClick={() => {
                    if (activeTab === "active") setCurrentPage(prev => Math.max(prev - 1, 1));
                    else setArchiveCurrentPage(prev => Math.max(prev - 1, 1));
                  }}
                >
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">
                  Page {activeTab === "active" ? currentPage : archiveCurrentPage} of{" "}
                  {activeTab === "active" ? totalPages : archiveTotalPages}
                </span>
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1"
                  disabled={(activeTab === "active" ? currentPage : archiveCurrentPage) === (activeTab === "active" ? totalPages : archiveTotalPages) || loading}
                  onClick={() => {
                    if (activeTab === "active") setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    else setArchiveCurrentPage(prev => Math.min(prev + 1, archiveTotalPages));
                  }}
                >
                  Next <i className="bx bx-chevron-right"></i>
                </Button>
              </div>
            </div>
          </Card>
        </Container>

        {/* Add/Edit Modal – same three‑tab design as original */}
        <Modal isOpen={modal} toggle={toggleModal} centered className="staff-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">{editMode ? "Edit Staff" : "Add New Staff"}</h4>
                <p className="text-muted small mb-0">{editMode ? "Update staff details" : "Add a new staff member."}</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              {/* Modal Tabs */}
              <div className="modal-tab-switcher bg-light rounded-pill p-1 d-flex mb-4">
                <Button
                  className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
                    "bg-white shadow-sm text-dark": modalTab === "1",
                    "bg-transparent text-muted": modalTab !== "1",
                  })}
                  onClick={() => setModalTab("1")}
                >
                  Basic Info
                </Button>
                <Button
                  className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
                    "bg-white shadow-sm text-dark": modalTab === "2",
                    "bg-transparent text-muted": modalTab !== "2",
                  })}
                  onClick={() => setModalTab("2")}
                >
                  Employment
                </Button>
                <Button
                  className={classNames("flex-grow-1 rounded-pill border-0 small fw-bold py-2", {
                    "bg-white shadow-sm text-dark": modalTab === "3",
                    "bg-transparent text-muted": modalTab !== "3",
                  })}
                  onClick={() => setModalTab("3")}
                >
                  Emergency
                </Button>
              </div>

              <TabContent activeTab={modalTab}>
                {/* Tab 1: Basic Info */}
                <TabPane tabId="1">
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Name *</Label>
                    <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </FormGroup>
                  <Row>
                    {/* <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Phone</Label>
                        <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </FormGroup>
                    </Col> */}
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Password</Label>
                        <div className="position-relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="rounded-4 bg-light border-0 px-3 py-2 pe-5"
                            value={formData.password}
                            maxLength={6}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                          />
                          <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className={`bx ${showPassword ? "bx-show" : "bx-hide"} text-muted`}></i>
                          </span>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Email</Label>
                        <Input type="email" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Role *</Label>
                        <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select small" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                          <option value="">Select role</option>
                          {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Date of Birth</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0 small"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "Y-m-d" }}
                            value={formData.dateOfBirth}
                            onChange={(date) => setFormData({...formData, dateOfBirth: date[0] ? formatDateToInput(date[0]) : ""})}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>

                {/* Tab 2: Employment */}
                <TabPane tabId="2">
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Date of Joining</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0 small"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "Y-m-d" }}
                            value={formData.dateOfJoining}
                            onChange={(date) => setFormData({...formData, dateOfJoining: date[0] ? formatDateToInput(date[0]) : ""})}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Date of Leaving</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0 small"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "Y-m-d" }}
                            value={formData.dateOfLeaving}
                            onChange={(date) => setFormData({...formData, dateOfLeaving: date[0] ? formatDateToInput(date[0]) : ""})}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Monthly Salary (₹)</Label>
                        <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.monthlySalary} onChange={e => setFormData({...formData, monthlySalary: e.target.value})} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Commission %</Label>
                        <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.commission} onChange={e => setFormData({...formData, commission: e.target.value})} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Attendance ID</Label>
                    <Input type="text" placeholder="Optional ID for attendance tracking" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.attendanceId} onChange={e => setFormData({...formData, attendanceId: e.target.value})} />
                  </FormGroup>
                </TabPane>

                {/* Tab 3: Emergency */}
                <TabPane tabId="3">
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Emergency Contact Name</Label>
                    <Input type="text" placeholder="Name of emergency contact" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.emergencyContactName} onChange={e => setFormData({...formData, emergencyContactName: e.target.value})} />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Emergency Contact Phone</Label>
                    <Input type="text" placeholder="Phone number" className="rounded-4 bg-light border-0 px-3 py-2" value={formData.emergencyContactPhone} onChange={e => setFormData({...formData, emergencyContactPhone: e.target.value})} />
                  </FormGroup>
                </TabPane>
              </TabContent>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <Spinner size="sm" /> : editMode ? "Update Staff" : "Add Staff"}
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Staff;


