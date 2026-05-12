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
} from "reactstrap"
import classNames from "classnames"
import Flatpickr from "react-flatpickr"

// Styles
import "./customers.scss"

const Customers = () => {
  const [activeTab, setActiveTab] = useState("active")
  const [addModal, setAddModal] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const toggleAddModal = () => setAddModal(!addModal)
  const toggleImportModal = () => setImportModal(!importModal)

  return (
    <React.Fragment>
      <div className="page-content customers-page dashboard-sans">
        <Container fluid>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"> <i className="bx bx-user text-primary me-2"></i>Customers</h3>
              <p className="text-muted mb-0">Manage your customer database</p>
            </div>
            {activeTab === "active" && (
              <div className="d-flex gap-2">
                <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={toggleImportModal}>
                  <i className="bx bx-import me-1"></i> Import
                </Button>
                <Button color="primary" className="rounded-pill px-3 shadow-primary" onClick={toggleAddModal}>
                  <i className="bx bx-plus me-1"></i> Add Customer
                </Button>
              </div>
            )}
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
              <i className="bx bx-user me-1"></i> Active (0)
            </Button>
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "archived",
                "bg-transparent text-muted": activeTab !== "archived",
              })}
              onClick={() => setActiveTab("archived")}
            >
              <i className="bx bx-archive me-1"></i> Archived (0)
            </Button>
          </div>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
            <div className="p-4 border-bottom">
              <div className="search-box bg-light rounded-pill border-0 px-3 py-2 d-flex align-items-center" style={{ maxWidth: '350px' }}>
                <i className="bx bx-search text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="border-0 bg-transparent p-0 form-control"
                />
              </div>
            </div>
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 custom-table">
                  <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                    <tr>
                      <th className="ps-4" style={{ width: '50px' }}>
                        <Input type="checkbox" className="custom-check-purple" />
                      </th>
                      <th>Customer Name</th>
                      <th>Contact Number</th>
                      <th>Source</th>
                      <th>Notes</th>
                      <th>Visits</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="7" className="py-5 text-center">
                        <div className="empty-state opacity-50">
                          <h6 className="text-muted mb-0">No customers found</h6>
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
                <span className="text-muted small">Showing 0-0 of 0 customers</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input 
                    type="select" 
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3" 
                    style={{ width: '70px' }}
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(e.target.value)}
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
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

        {/* Add Customer Modal */}
        <Modal isOpen={addModal} toggle={toggleAddModal} centered className="customer-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={toggleAddModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Add New Customer</h4>
                <p className="text-muted small mb-0">Create a new customer profile.</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Name *</Label>
                    <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Phone</Label>
                    <div className="d-flex gap-2">
                      <Input type="select" className="rounded-4 bg-light border-0 px-2 py-2 small" style={{ width: '150px' }}>
                        <option>IN +91</option>
                      </Input>
                      <Input type="text" placeholder="Phone nu" className="rounded-4 bg-light border-0 px-3 py-2 flex-grow-1" />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Email</Label>
                    <Input type="email" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Gender (Optional)</Label>
                    <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select small">
                      <option>Prefer not to say</option>
                      <option>Male</option>
                      <option>Female</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Date of Birth (Optional)</Label>
                    <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                      <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="dd-mm-yyyy" options={{ dateFormat: "d-m-Y" }} />
                      <i className="bx bx-calendar text-muted"></i>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Source (Optional)</Label>
                    <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select small">
                      <option>Not specified</option>
                      <option>Social Media</option>
                      <option>Referral</option>
                      <option>Walk-in</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Notes</Label>
                    <Input type="textarea" rows="3" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary">
                Add Customer
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Import Modal */}
        <Modal isOpen={importModal} toggle={toggleImportModal} centered className="customer-modal modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <ModalHeader className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-file-blank fs-4"></i>
                <h4 className="fw-bold mb-0">Import Customers</h4>
              </div>
              <p className="text-muted small mt-2 mb-0">Upload a file to bulk import customers. Duplicates will be automatically skipped.</p>
              <Button type="button" onClick={toggleImportModal} className="btn-close position-absolute end-0 top-0 m-3" aria-label="Close"></Button>
            </ModalHeader>
            <ModalBody className="px-4 py-4">
              <div className="bg-light rounded-4 p-4 d-flex justify-content-between align-items-center mb-4 border">
                <div>
                  <h6 className="fw-bold mb-1">Download Template</h6>
                  <p className="text-muted small mb-0">Required columns: name, phone. Optional: email, gender, dob, notes</p>
                </div>
                <Button color="primary" outline className="rounded-pill px-4 py-2 border-primary d-flex align-items-center gap-2 custom-outline-btn">
                  <i className="bx bx-download"></i> Download
                </Button>
              </div>

              <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center mb-0" style={{ backgroundColor: '#fcfcfc' }}>
                <i className="bx bx-upload display-4 text-muted opacity-50 mb-3"></i>
                <p className="text-muted mb-3">Drag and drop or click to upload</p>
                <Button color="light" className="rounded-pill px-4 py-2 border bg-white small fw-medium">
                  Select File
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-4 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleImportModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary opacity-50" disabled>
                <i className="bx bx-upload me-1"></i> Import 0 Customers
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Customers
