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
  FormGroup,
  Label,
  ModalFooter,
  Alert,
  Spinner,
  UncontrolledTooltip
} from "reactstrap"
import { Link } from "react-router-dom"
import { post, put, del } from "../../helpers/api_helper"
import { URLS } from "../../url"

// Styles
import "./services.scss"

const Services = () => {
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  // Form State
  const [currentId, setCurrentId] = useState(null)
  const [serviceName, setServiceName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("active")
  const [duration, setDuration] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")

  const toggleModal = () => {
    setModal(!modal)
    if (modal) {
      setServiceName("")
      setCategoryId("")
      setPrice("")
      setStatus("active")
      setDuration("")
      setImageFile(null)
      setPreviewUrl("")
      setIsEdit(false)
      setCurrentId(null)
    }
  }

  const fetchCategories = useCallback(async () => {
    try {
      const response = await post(URLS.GetActiveCategories, {})
      if (response.success) {
        setCategories(response.data || [])
      }
    } catch (err) {
      console.error("Error fetching categories", err)
    }
  }, [])

  const fetchServices = useCallback(async (search = "", page = 1, limit = 10) => {
    setLoading(true)
    setError("")
    try {
      const url = `${URLS.GetServices}?search=${search}&page=${page}&limit=${limit}`
      const response = await post(url, {})
      if (response.success) {
        setServices(response.data || [])
        setTotalCount(response.totalRecords || response.count || 0)
      } else {
        setError(response.message || "Failed to fetch services")
      }
    } catch (err) {
      setError("An error occurred while fetching services")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices(searchTerm, currentPage, rowsPerPage)
    fetchCategories()
  }, [fetchServices, fetchCategories, currentPage, rowsPerPage])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(totalCount / rowsPerPage)
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData()
    formData.append("serviceName", serviceName)
    formData.append("categoryId", categoryId)
    formData.append("price", price)
    formData.append("status", status)
    formData.append("duration", duration)
    if (imageFile) {
      formData.append("image", imageFile)
    }

    try {
      let response
      if (isEdit) {
        response = await put(URLS.UpdateServices + currentId, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      } else {
        response = await post(URLS.AddServices, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      }

      if (response.success) {
        setSuccess(response.message || (isEdit ? "Service updated successfully" : "Service added successfully"))
        fetchServices(searchTerm, currentPage, rowsPerPage)
        toggleModal()
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(response.message || "Operation failed")
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (id) => {
    setLoading(true)
    try {
      const response = await post(URLS.GetByIdServices, { id })
      if (response.success) {
        const data = response.data
        setIsEdit(true)
        setCurrentId(data._id)
        setServiceName(data.serviceName)
        setCategoryId(data.categoryId)
        setPrice(data.price)
        setStatus(data.status || "active")
        setDuration(data.duration || "")
        setPreviewUrl(data.image ? URLS.ImageUrl + data.image : "")
        setModal(true)
      } else {
        setError(response.message || "Failed to fetch service details")
      }
    } catch (err) {
      setError("An error occurred while fetching details")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setLoading(true)
      try {
        const response = await del(URLS.DeleteServices + id)
        if (response.success) {
          setSuccess(response.message || "Service deleted successfully")
          fetchServices(searchTerm, currentPage, rowsPerPage)
          setTimeout(() => setSuccess(""), 3000)
        } else {
          setError(response.message || "Delete failed")
        }
      } catch (err) {
        setError("An error occurred while deleting")
      } finally {
        setLoading(false)
      }
    }
  }

  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1
  const startIndex = (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(currentPage * rowsPerPage, totalCount)

  return (
    <React.Fragment>
      <div className="page-content services-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-cog text-primary me-2"></i>Services
              </h3>
              <p className="text-muted mb-0">Manage availability and pricing for this branch.</p>
            </div>
            <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={toggleModal}>
              <i className="bx bx-plus me-1"></i> Create Service
            </Button>
          </div>

          {/* Alerts */}
          {error && <Alert color="danger" className="border-0 shadow-sm">{error}</Alert>}
          {success && <Alert color="success" className="border-0 shadow-sm">{success}</Alert>}

          {/* Search Bar */}
          <div className="search-section mb-4">
            <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3" style={{ maxWidth: '300px' }}>
              <i className="bx bx-search text-muted me-2"></i>
              <Input
                type="text"
                placeholder="Search services..."
                className="border-0 bg-transparent p-0 form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Main Table Card */}
          <Card className="border-0 rounded-4 shadow-sm table-card overflow-hidden">
            <div className="table-header-custom border-bottom bg-white px-4 py-3">
              <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
                <Col xs={1} className="text-center">
                  Sl. No.
                </Col>
                <Col xs={1}>Image</Col>
                <Col>Service Name</Col>
                <Col>Category</Col>
                <Col>Price</Col>
                <Col>Status</Col>
                <Col>Duration (Hours:Minutes)</Col>
                <Col className="text-end">Actions</Col>
              </Row>
            </div>

            <CardBody className="p-0">
              {loading && services.length === 0 ? (
                <div className="text-center py-5">
                  <Spinner color="primary" />
                </div>
              ) : services.length > 0 ? (
                <div className="table-responsive">
                  {services.map((service, index) => (
                    <div key={index} className="px-4 py-3 border-bottom table-row-hover">
                      <Row className="align-items-center">
                        <Col xs={1} className="text-center fw-medium text-muted small">
                          {startIndex + index}
                        </Col>
                        <Col xs={1}>
                          <div className="rounded-3 bg-light overflow-hidden" style={{ width: '40px', height: '40px' }}>
                            {service.image ? (
                              <img src={URLS.ImageUrl + service.image} alt="" className="w-100 h-100 object-fit-cover" />
                            ) : (
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                <i className="bx bx-image text-muted"></i>
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col className="fw-medium text-dark">{service.serviceName}</Col>
                        <Col className="text-muted small">{service.categoryName || 'N/A'}</Col>
                        <Col className="fw-bold text-primary">₹{service.price}</Col>
                        <Col>
                          <span className={`badge rounded-pill px-3 py-2 ${service.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                            {service.status || 'inactive'}
                          </span>
                        </Col>
                        <Col className="text-muted small">{service.duration || 'N/A'}</Col>
                        <Col className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Button
                              color="light"
                              size="md"
                              className="rounded-circle border-0"
                              onClick={() => handleEdit(service._id)}
                              id={`edit-${index}`}
                            >
                              <i className="bx bx-edit-alt text-primary"></i>
                            </Button>
                            <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                              Edit
                            </UncontrolledTooltip>

                            <Button
                              color="light"
                              size="md"
                              className="rounded-circle border-0"
                              onClick={() => handleDelete(service._id)}
                              id={`delete-${index}`}
                            >
                              <i className="bx bx-trash text-danger"></i>
                            </Button>
                            <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                              Delete
                            </UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-wrapper py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                  <div className="icon-circle mb-4">
                    <i className="bx bx-file display-4 text-muted"></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">No services found</h5>
                  <p className="text-muted small">Create a new service to get started.</p>
                </div>
              )}
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} Services
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input
                    type="select"
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-white"
                    style={{ width: '70px' }}
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
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
                  className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1"
                  disabled={currentPage === 1 || loading}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">Page {currentPage} of {totalPages}</span>
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1"
                  disabled={currentPage === totalPages || loading}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next <i className="bx bx-chevron-right"></i>
                </Button>
              </div>
            </div>
          </Card>
        </Container>

        {/* Add/Edit Service Modal */}
        <Modal isOpen={modal} toggle={toggleModal} centered className="inventory-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">{isEdit ? "Update Service" : "Add New Service"}</h4>
                <p className="text-muted small mb-0">
                  {isEdit ? "Update the details of the service." : "Fill in the details to add a new service."}
                </p>
              </div>
            </ModalHeader>

            <hr className="my-0 opacity-10 mx-4" />

            <form onSubmit={handleSubmit}>
              <ModalBody className="px-5 py-4">
                <Row className="g-3">
                  <Col md={12}>
                    <FormGroup className="mb-3">
                      <Label className="fw-bold small mb-2">
                        Service Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g., Haircut & Shave"
                        className="rounded-3 bg-light border-0 px-3 py-2 custom-focus-purple"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Label className="fw-bold small mb-2">
                        Category <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="select"
                        className="rounded-3 bg-light border-0 px-3 py-2"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Label className="fw-bold small mb-2">
                        Price <span className="text-danger">*</span>
                      </Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0 rounded-start-3 text-muted">₹</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="rounded-end-3 bg-light border-0 px-3 py-2"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Label className="fw-bold small mb-2">Status</Label>
                      <Input
                        type="select"
                        className="rounded-3 bg-light border-0 px-3 py-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-3">
                      <Label className="fw-bold small mb-2">Duration</Label>
                      <Input
                        type="text"
                        placeholder="e.g., 30 minutes"
                        className="rounded-3 bg-light border-0 px-3 py-2"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col md={12}>
                    <Label className="fw-bold small mb-2">
                      Service Image <span className="text-muted fw-normal">(optional)</span>
                    </Label>
                    <div className="d-flex align-items-center gap-3">
                      <div className="file-upload-wrapper position-relative">
                        <Button color="light" className="rounded-3 px-4 py-2 bg-white border">
                          <i className="bx bx-upload me-1"></i> Choose Image
                        </Button>
                        <Input
                          type="file"
                          className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                          accept="image/*"
                          onChange={onImageChange}
                        />
                      </div>
                      <div className="image-preview-placeholder bg-light d-flex align-items-center justify-content-center rounded-3 overflow-hidden"
                        style={{ width: 64, height: 64, border: '1px dashed #dee2e6' }}>
                        {previewUrl ? (
                          <img src={previewUrl} alt="preview" className="w-100 h-100 object-fit-cover" />
                        ) : (
                          <i className="bx bx-image text-muted fs-4"></i>
                        )}
                      </div>
                    </div>
                    <small className="text-muted">Supported formats: JPG, PNG. Max size: 2MB.</small>
                  </Col>
                </Row>
              </ModalBody>

              <hr className="my-0 opacity-10 mx-4" />

              <ModalFooter className="border-0 px-5 pb-5 pt-4 gap-3">
                <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleModal} type="button">
                  Cancel
                </Button>
                <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" type="submit" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : isEdit ? "Update Service" : "Add Service"}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Services
