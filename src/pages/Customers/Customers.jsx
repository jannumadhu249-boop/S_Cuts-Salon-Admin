import React, { useState, useEffect, useCallback } from "react"
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
  Spinner,
  Badge,
  Alert
} from "reactstrap"
import { post, put, del } from "../../helpers/api_helper"
import { URLS } from "../../url"
import { toast } from "react-toastify"
import classNames from "classnames"
import Flatpickr from "react-flatpickr"

// Styles
import "./customers.scss"

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")
  const [addModal, setAddModal] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const [activeCount, setActiveCount] = useState(0)
  const [archivedCount, setArchivedCount] = useState(0)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    source: "",
    notes: ""
  })

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleAddModal = () => {
    setAddModal(!addModal)
    if (addModal) {
      resetForm()
    }
  }
  const toggleImportModal = () => setImportModal(!importModal)

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      source: "",
      notes: ""
    })
    setIsEdit(false)
    setCurrentCustomer(null)
  }

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    try {
      // const url = `${URLS.GetAllCustomers}?page=${currentPage}&limit=${pageSize}&isDeleted=${activeTab === "archived"}${searchTerm ? `&search=${searchTerm}` : ""}`
      const url =
      activeTab === "archived"
        ? `${URLS.GetArchivedCustomers}?search=${searchTerm || ""}&page=${currentPage}&limit=${pageSize}`
        : `${URLS.GetAllCustomers}?page=${currentPage}&limit=${pageSize}${searchTerm ? `&search=${searchTerm}` : ""}`;
      const response = await post(url, {})
      if (response.success) {
        setCustomers(response.data || [])
        setTotalPages(response.totalPages || 1)
        setTotalRecords(response.totalRecords || 0)
      } else {
        toast.error(response.message || "Failed to fetch customers")
      }
    } catch (error) {
      toast.error("An error occurred while fetching customers")
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, searchTerm, activeTab])

  const fetchCounts = async () => {
    try {
      const activeRes = await post(
        `${URLS.GetAllCustomers}?page=1&limit=1`,
        {}
      );

      const archivedRes = await post(
        `${URLS.GetArchivedCustomers}?page=1&limit=1&search=`,
        {}
      );

      setActiveCount(activeRes.totalRecords || 0);
      setArchivedCount(archivedRes.totalRecords || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchCounts();
  }, [fetchCustomers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (isEdit) {
        response = await put(URLS.UpdateCustomers + currentCustomer._id, formData)
      } else {
        response = await post(URLS.AddCustomers, formData)
      }

      if (response.success) {
        toast.success(response.message || `Customer ${isEdit ? "updated" : "added"} successfully`)
        toggleAddModal()
        fetchCustomers()
        fetchCounts()
      } else {
        toast.error(response.message || "Operation failed")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleEdit = (customer) => {
    setIsEdit(true)
    setCurrentCustomer(customer)
    setFormData({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      gender: customer.gender || "",
      dateOfBirth: customer.dateOfBirth || "",
      source: customer.source || "",
      notes: customer.notes || ""
    })
    setAddModal(true)
  }

  const handleDelete = (customer) => {
    setCustomerToDelete(customer)
    setDeleteModal(true)
  }

  // const confirmDelete = async () => {
  //   try {
  //     const response = await del(URLS.DeleteCustomers + customerToDelete._id)
  //     if (response.success) {
  //       toast.success(response.message || "Customer deleted successfully")
  //       fetchCustomers()
  //     } else {
  //       toast.error(response.message || "Failed to delete customer")
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred")
  //   } finally {
  //     setDeleteModal(false)
  //     setCustomerToDelete(null)
  //   }
  // }

  const confirmDelete = async () => {
    try {
      const response = await del(
        URLS.DeleteCustomers + customerToDelete._id,
        { isDeleted: true }
      )

      if (response.success) {
        toast.success("Customer moved to archive")
        fetchCustomers();
        fetchCounts();
      } else {
        toast.error(response.message || "Failed to archive customer")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setDeleteModal(false)
      setCustomerToDelete(null)
    }
  }

  const handlePermanentDelete = async (customerId) => {
    if (!window.confirm("This customer will be permanently deleted. Continue?")) {
      return;
    }

    try {
      const response = await del(
        URLS.DeleteCustomers + customerId
      );

      if (response.success) {
        toast.success("Customer deleted permanently");
        fetchCustomers();
        fetchCounts();
      } else {
        toast.error(response.message || "Failed to delete customer");
      }
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };


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
              onClick={() => { setActiveTab("active"); setCurrentPage(1); }}
            >
              <i className="bx bx-user me-1"></i> Active ({activeCount})
              {/* ({activeTab === 'active' ? activeCount : totalRecords}) */}
            </Button>
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "archived",
                "bg-transparent text-muted": activeTab !== "archived",
              })}
              onClick={() => { setActiveTab("archived"); setCurrentPage(1); }}
            >
              <i className="bx bx-archive me-1"></i> Archived ({archivedCount})
              {/* ({activeTab === 'archived' && archivedCount}) */}
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
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 custom-table">
                  <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                    <tr>
                      <th className="ps-4">
                        Sl. No.
                      </th>
                      <th>Customer Name</th>
                      <th>Contact Number</th>
                      <th>Source</th>
                      <th>Notes</th>
                      <th>Visits</th>
                      <th>Total Spent</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center py-5">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : customers.length > 0 ? (
                      customers.map((customer, index) => (
                        <tr key={customer._id}>
                          <td className="ps-4">
                            {(currentPage - 1) * pageSize + index + 1}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-2">
                                <span className="avatar-title rounded-circle bg-primary bg-opacity-10 text-primary fw-bold">
                                  {customer.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="fw-medium">{customer.name}</span>
                            </div>
                          </td>
                          <td>{customer.phone}</td>
                          <td>
                            <Badge color="info" className="bg-opacity-10 text-info border-0 rounded-pill px-2">
                              {customer.source || 'Direct'}
                            </Badge>
                          </td>
                          <td className="text-muted small text-truncate" style={{ maxWidth: '150px' }}>{customer.notes || '-'}</td>
                          <td>0</td>
                          <td className="fw-bold">₹0</td>
                          <td className="text-center">
                            {/* <div className="d-flex justify-content-center gap-3">
                              <button
                                type="button"
                                className="border-0 bg-transparent p-0"
                                onClick={() => handleEdit(customer)}
                              >
                                <i className="bx bx-edit-alt text-primary fs-5"></i>
                              </button>
                              <button
                                type="button"
                                className="border-0 bg-transparent p-0"
                                onClick={() => handleDelete(customer)}
                              >
                                <i className="bx bx-trash text-danger fs-5"></i>
                              </button>
                            </div> */}
                            {/* <div className="d-flex justify-content-center gap-3">
                              {activeTab === "active" ? (
                                <>
                                  <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    onClick={() => handleEdit(customer)}
                                  >
                                    <i className="bx bx-edit-alt text-primary fs-5"></i>
                                  </button>

                                  <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    onClick={() => handleDelete(customer)}
                                  >
                                    <i className="bx bx-trash text-danger fs-5"></i>
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="border-0 bg-transparent p-0"
                                  onClick={async () => {
                                    try {
                                      const response = await put(
                                        URLS.UpdateCustomers + customer._id,
                                        { isDeleted: false }
                                      )

                                      if (response.success) {
                                        toast.success("Customer restored successfully")
                                        fetchCustomers()
                                      } else {
                                        toast.error(response.message)
                                      }
                                    } catch (error) {
                                      toast.error("Failed to restore customer")
                                    }
                                  }}
                                >
                                  <i className="bx bx-reset text-success fs-5"></i>
                                </button>
                              )}
                            </div> */}

                            <div className="d-flex justify-content-center gap-3">

                              {activeTab === "active" ? (
                                <>
                                  <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    title="Edit Customer"
                                    onClick={() => handleEdit(customer)}
                                  >
                                    <i className="bx bx-edit-alt text-primary fs-5"></i>
                                  </button>

                                  <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    title="Move To Archive"
                                    onClick={() => handleDelete(customer)}
                                  >
                                    <i className="bx bx-trash text-danger fs-5"></i>
                                  </button>
                                </>
                              ) : (
                                <>
                                  {/* Restore */}

                                  {/* <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    title="Restore Customer"
                                    onClick={async () => {
                                      try {
                                        const response = await put(
                                          URLS.UpdateCustomers + customer._id,
                                          { isDeleted: false }
                                        );

                                        if (response.success) {
                                          toast.success("Customer restored successfully");
                                          fetchCustomers();
                                          fetchCounts();
                                        } else {
                                          toast.error(response.message);
                                        }
                                      } catch (error) {
                                        toast.error("Failed to restore customer");
                                      }
                                    }}
                                  >
                                    <i className="bx bx-reset text-success fs-5"></i>
                                  </button> */}

                                  {/* Permanent Delete */}

                                  <button
                                    type="button"
                                    className="border-0 bg-transparent p-0"
                                    title="Delete Permanently"
                                    onClick={() => handlePermanentDelete(customer._id)}
                                  >
                                    <i className="bx bx-trash-alt text-danger fs-5"></i>
                                  </button>
                                </>
                              )}

                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-5 text-center">
                          <div className="empty-state opacity-50">
                            <i className="bx bx-user-voice display-4 mb-3 d-block"></i>
                            <h6 className="text-muted mb-0">No customers found</h6>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {Math.min((currentPage - 1) * pageSize + 1, totalRecords)} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} customers
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input
                    type="select"
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3"
                    style={{ width: '80px' }}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value))
                      setCurrentPage(1)
                    }}
                  >
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
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">Page {currentPage} of {totalPages}</span>
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1"
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
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
                <h4 className="fw-bold mb-1">{isEdit ? "Update Customer" : "Add New Customer"}</h4>
                <p className="text-muted small mb-0">{isEdit ? "Modify existing customer profile." : "Create a new customer profile."}</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Name *</Label>
                      <Input
                        type="text"
                        name="name"
                        className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Phone *</Label>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        className="rounded-4 bg-light border-0 px-3 py-2 w-100"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxlength={10}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        className="rounded-4 bg-light border-0 px-3 py-2"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Gender (Optional)</Label>
                      <Input
                        type="select"
                        name="gender"
                        className="rounded-4 bg-light border-0 px-3 py-2 form-select small"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Date of Birth (Optional)</Label>
                      <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center">
                        <Flatpickr
                          className="form-control border-0 bg-transparent p-0 small"
                          placeholder="dd-mm-yyyy"
                          options={{ dateFormat: "Y-m-d" }}
                          value={formData.dateOfBirth}
                          onChange={date => setFormData(prev => ({ ...prev, dateOfBirth: date[0] ? date[0].toISOString().split('T')[0] : "" }))}
                        />
                        <i className="bx bx-calendar text-muted"></i>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold small mb-2">Source (Optional)</Label>
                      <Input
                        type="select"
                        name="source"
                        className="rounded-4 bg-light border-0 px-3 py-2 form-select small"
                        value={formData.source}
                        onChange={handleInputChange}
                      >
                        <option value="">Not specified</option>
                        <option value="online">Online</option>
                        <option value="social_media">Social Media</option>
                        <option value="referral">Referral</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup className="mb-0">
                      <Label className="fw-bold small mb-2">Notes</Label>
                      <Input
                        type="textarea"
                        name="notes"
                        rows="3"
                        className="rounded-4 bg-light border-0 px-3 py-2"
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </form>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" onClick={handleSubmit}>
                {isEdit ? "Update Customer" : "Add Customer"}
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

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)} centered>
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={() => setDeleteModal(false)} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <div className="icon-circle bg-danger bg-opacity-10 text-danger mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px' }}>
                  <i className="bx bx-trash fs-2"></i>
                </div>
                <h4 className="fw-bold mb-1">Move Customer To Archive?</h4>
                <p className="text-muted small mb-0">The customer will be moved to Archived Customers and can be restored later.</p>
              </div>
            </ModalHeader>
            <ModalFooter className="border-0 px-5 pb-5 pt-4 gap-3 justify-content-center">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button color="danger" className="rounded-pill px-4 py-2 fw-bold shadow-sm" onClick={confirmDelete}>
                Move To Archive
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Customers
