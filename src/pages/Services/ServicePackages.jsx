import React, { useState, useEffect, useCallback } from "react"
import {
  Container,
  Card,
  CardBody,
  Button,
  Input,
  Col,
  Row,
  Alert,
  Spinner,
  UncontrolledTooltip
} from "reactstrap"
import { Link } from "react-router-dom"
import { post, del } from "../../helpers/api_helper"
import { URLS } from "../../url"

// Styles
import "./services.scss"

const ServicePackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const fetchPackages = useCallback(async (search = "", page = 1, limit = 10) => {
    setLoading(true)
    setError("")
    try {
      const url = `${URLS.GetAllServicePackages}?search=${search}&page=${page}&limit=${limit}`
      const response = await post(url, {})
      if (response.success) {
        setPackages(response.data || [])
        setTotalCount(response.totalRecords || response.count || 0)
      } else {
        setError(response.message || "Failed to fetch packages")
      }
    } catch (err) {
      setError("An error occurred while fetching packages")
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPackages(searchTerm, currentPage, rowsPerPage)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, currentPage, rowsPerPage, fetchPackages])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setLoading(true)
      try {
        const response = await del(URLS.DeleteServicePackage + id)
        if (response.success) {
          setSuccess(response.message || "Package deleted successfully")
          fetchPackages(searchTerm, currentPage, rowsPerPage)
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
      <div className="page-content packages-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"><i className="bx bxs-offer text-primary me-2"></i>Service Packages</h3>
              <p className="text-muted mb-0">Create and manage combo packages for services</p>
            </div>
            <Link to="/create-package">
              <Button color="primary" className="rounded-pill px-4 shadow-primary">
                <i className="bx bx-plus me-1"></i> Create Package
              </Button>
            </Link>
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
                placeholder="Search packages..."
                className="border-0 bg-transparent p-0 form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="border-0 rounded-4 shadow-sm table-card overflow-hidden">
            <div className="table-header-custom border-bottom bg-white px-4 py-3">
              <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
                <Col xs={1} className="text-center">
                  Sl. No.
                </Col>
                <Col>Package Name</Col>
                <Col>Package Price</Col>
                <Col>Status</Col>
                <Col>Valid From - Till</Col>
                <Col className="text-end">Actions</Col>
              </Row>
            </div>
            <CardBody className="p-0">
              {loading && packages.length === 0 ? (
                <div className="text-center py-5">
                  <Spinner color="primary" />
                </div>
              ) : packages.length > 0 ? (
                <div className="table-responsive">
                  {packages.map((pkg, index) => (
                    <div key={index} className="px-4 py-3 border-bottom table-row-hover">
                      <Row className="align-items-center">
                        <Col xs={1} className="text-center fw-medium text-muted small">
                          {startIndex + index}
                        </Col>
                        <Col className="fw-medium text-dark">{pkg.packageName}</Col>
                        <Col className="fw-bold text-primary">₹{pkg.packagePrice}</Col>
                        <Col>
                          <span className={`badge rounded-pill px-3 py-2 ${pkg.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                            {pkg.status || 'inactive'}
                          </span>
                        </Col>
                        <Col className="text-muted small">
                          {pkg.validFrom} - {pkg.validUntil}
                        </Col>
                        <Col className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Link to={`/edit-package`} state={{ id: pkg._id }}>
                              <Button
                                color="light"
                                size="md"
                                className="rounded-circle border-0"
                                id={`edit-${index}`}
                              >
                                <i className="bx bx-edit-alt text-primary"></i>
                              </Button>
                            </Link>
                            <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                              Edit
                            </UncontrolledTooltip>

                            <Button
                              color="light"
                              size="md"
                              className="rounded-circle border-0"
                              onClick={() => handleDelete(pkg._id)}
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
                <div className="py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                  <div className="empty-state-icon mb-4">
                    <i className="bx bx-box display-2 text-muted opacity-25"></i>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">No packages found</h4>
                  <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
                    Create your first service package to get started
                  </p>
                  <Link to="/create-package">
                    <Button color="primary" className="rounded-pill px-4 shadow-primary">
                      <i className="bx bx-plus me-1"></i> Create Package
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} Packages
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
      </div>
    </React.Fragment>
  )
}

export default ServicePackages
