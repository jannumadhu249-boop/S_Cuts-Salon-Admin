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
    Label,
    FormGroup,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap"
import classNames from "classnames"
import Flatpickr from "react-flatpickr"

// Styles
import "./staff.scss"

const Staff = () => {
    const [activeTab, setActiveTab] = useState("active")
    const [addModal, setAddModal] = useState(false)
    const [modalTab, setModalTab] = useState("1")

    const toggleAddModal = () => setAddModal(!addModal)

    return (
        <React.Fragment>
            <div className="page-content staff-management-page dashboard-sans">
                <Container fluid>
                    {/* Header Section */}
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <div>
                            <h3 className="fw-bold mb-0 text-dark">
                                <i className="bx bx-id-card text-primary me-2"></i>Staff Management
                            </h3>
                            <p className="text-muted mb-0">Manage staff and track commissions</p>
                        </div>
                        <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={toggleAddModal}>
                            <i className="bx bx-plus me-1"></i> Add Staff
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="search-box bg-white rounded-pill border px-3 py-2 d-flex align-items-center shadow-sm mb-4" style={{ maxWidth: '400px' }}>
                        <i className="bx bx-search text-muted me-2"></i>
                        <Input type="text" placeholder="Search by name or phone..." className="border-0 bg-transparent p-0" />
                    </div>

                    {/* Filter Tabs */}
                    <div className="tab-switcher bg-light bg-opacity-50 p-1 rounded-pill d-inline-flex mb-4 border">
                        <Button
                            className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                                "bg-white shadow-sm text-dark": activeTab === "active",
                                "bg-transparent text-muted": activeTab !== "active",
                            })}
                            onClick={() => setActiveTab("active")}
                        >
                            Active Staff (0)
                        </Button>
                        <Button
                            className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                                "bg-white shadow-sm text-dark": activeTab === "archived",
                                "bg-transparent text-muted": activeTab !== "archived",
                            })}
                            onClick={() => setActiveTab("archived")}
                        >
                            Archived (0)
                        </Button>
                    </div>

                    {/* Main List Card */}
                    <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
                        <CardBody className="p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0 custom-table">
                                    <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                                        {activeTab === "active" ? (
                                            <tr>
                                                <th className="ps-4">Staff Member</th>
                                                <th>Contact</th>
                                                <th>Role</th>
                                                <th>Commission</th>
                                                <th>Status</th>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <th className="ps-4">Staff Member</th>
                                                <th>Contact</th>
                                                <th>Role</th>
                                                <th>Archived On</th>
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={activeTab === "active" ? "5" : "4"} className="py-5 text-center">
                                                <div className="empty-state opacity-50">
                                                    <h6 className="text-muted mb-0">
                                                        {activeTab === "active" ? "No staff found" : "No archived staff"}
                                                    </h6>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>

                        {/* Pagination Footer */}
                        <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-muted small">Showing 0-0 of 0 staff</span>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-muted small">Rows per page:</span>
                                    <Input type="select" className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3" style={{ width: '70px' }}>
                                        <option>10</option>
                                    </Input>
                                </div>
                            </div>
                            <div className="pagination-controls d-flex align-items-center gap-3">
                                <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
                                    <i className="bx bx-chevron-left"></i> Previous
                                </Button>
                                <span className="text-muted small fw-medium">Page 1 of 1</span>
                                <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
                                    Next <i className="bx bx-chevron-right"></i>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Container>

                {/* Add Staff Modal */}
                <Modal isOpen={addModal} toggle={toggleAddModal} centered className="staff-modal modal-md">
                    <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
                        <ModalHeader toggle={toggleAddModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
                            <div className="text-center w-100">
                                <h4 className="fw-bold mb-1">Add New Staff</h4>
                                <p className="text-muted small mb-0">Add a new staff member.</p>
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
                                <TabPane tabId="1">
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold small mb-2">Name *</Label>
                                        <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple" />
                                    </FormGroup>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Phone</Label>
                                                <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Email</Label>
                                                <Input type="email" className="rounded-4 bg-light border-0 px-3 py-2" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Role *</Label>
                                                <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select small">
                                                    <option>Select role</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Date of Birth</Label>
                                                <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                                                    <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
                                                    <i className="bx bx-calendar text-muted"></i>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Date of Joining</Label>
                                                <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                                                    <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
                                                    <i className="bx bx-calendar text-muted"></i>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Date of Leaving</Label>
                                                <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                                                    <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
                                                    <i className="bx bx-calendar text-muted"></i>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Monthly Salary (₹)</Label>
                                                <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-4">
                                                <Label className="fw-bold small mb-2">Commission %</Label>
                                                <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup className="mb-0">
                                        <Label className="fw-bold small mb-2">Attendance ID</Label>
                                        <Input type="text" placeholder="Optional ID for attendance tracking" className="rounded-4 bg-light border-0 px-3 py-2" />
                                    </FormGroup>
                                </TabPane>
                                <TabPane tabId="3">
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold small mb-2">Emergency Contact Name</Label>
                                        <Input type="text" placeholder="Name of emergency contact" className="rounded-4 bg-light border-0 px-3 py-2" />
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <Label className="fw-bold small mb-2">Emergency Contact Phone</Label>
                                        <Input type="text" placeholder="Phone number" className="rounded-4 bg-light border-0 px-3 py-2" />
                                    </FormGroup>
                                </TabPane>
                            </TabContent>
                        </ModalBody>
                        <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
                            <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
                                Cancel
                            </Button>
                            <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary opacity-50" disabled>
                                Add Staff
                            </Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </div>
        </React.Fragment>
    )
}

export default Staff
