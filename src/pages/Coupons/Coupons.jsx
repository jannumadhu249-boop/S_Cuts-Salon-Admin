import React, { useState, useEffect, useCallback } from "react"
import {
  Container,
  Card,
  CardBody,
  Button,
  Input,
  Row,
  Col,
  Alert,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap"
import { Link } from "react-router-dom"
import moment from "moment"
import { post, del } from "../../helpers/api_helper"
import { URLS } from "../../url"
import "./coupons.scss"

const Coupons = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const fetchCoupons = useCallback(async (search = "", page = 1, limit = 10) => {
    setLoading(true)
    setError("")
    try {
      // Construct URL with search and pagination parameters as per curls
      // Note: Backend expects searchQuery instead of search for coupons
      const url = `${URLS.GetAllCoupons}?searchQuery=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      const response = await post(url, {})
      
      if (response.success) {
        const couponList = response.data || response.coupons || []
        setCoupons(couponList)
        // Handle variations of total counts and record arrays from backend
        setTotalCount(
          response.totalCoupons !== undefined
            ? response.totalCoupons
            : response.totalRecords !== undefined
            ? response.totalRecords
            : response.count !== undefined
            ? response.count
            : couponList.length
        )
      } else {
        setError(response.message || "Failed to fetch coupons")
      }
    } catch (err) {
      setError("An error occurred while fetching coupons")
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search / fetch effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCoupons(searchTerm, currentPage, rowsPerPage)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, currentPage, rowsPerPage, fetchCoupons])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1) // Reset to first page when limit changes
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setLoading(true)
      setError("")
      setSuccess("")
      try {
        const response = await del(URLS.DeleteCoupons + id)
        if (response.success) {
          setSuccess(response.message || "Coupon deleted successfully")
          fetchCoupons(searchTerm, currentPage, rowsPerPage)
          setTimeout(() => setSuccess(""), 3000)
        } else {
          setError(response.message || "Failed to delete coupon")
        }
      } catch (err) {
        setError("An error occurred while deleting coupon")
      } finally {
        setLoading(false)
      }
    }
  }

  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1
  const startIndex = totalCount > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0
  const endIndex = Math.min(currentPage * rowsPerPage, totalCount)

  return (
    <React.Fragment>
      <div className="page-content coupons-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-purchase-tag text-primary me-2"></i>Coupons
              </h3>
              <p className="text-muted mb-0">Manage discount coupons for your brand</p>
            </div>
            <Link to="/create-coupon">
              <Button color="primary" className="rounded-pill px-4 shadow-primary">
                <i className="bx bx-plus me-1"></i> Create Coupon
              </Button>
            </Link>
          </div>

          {/* Alerts */}
          {error && <Alert color="danger" className="border-0 rounded-3 shadow-sm">{error}</Alert>}
          {success && <Alert color="success" className="border-0 rounded-3 shadow-sm">{success}</Alert>}

          {/* Main Card */}
          <Card className="border-0 rounded-4 shadow-sm main-card overflow-hidden">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-purchase-tag fs-4 text-dark"></i>
                <div>
                  <h5 className="fw-bold mb-0">All Coupons</h5>
                  <span className="text-muted small">{totalCount} total coupons</span>
                </div>
              </div>
              <div className="search-box bg-light rounded-pill border-0 px-3 py-2 d-flex align-items-center" style={{ width: '300px' }}>
                <i className="bx bx-search text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search coupons..."
                  className="border-0 bg-transparent p-0 form-control"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <CardBody className="p-0">
              {loading && coupons.length === 0 ? (
                <div className="text-center py-5 my-5">
                  <Spinner color="primary" />
                </div>
              ) : coupons.length > 0 ? (
                <div className="table-responsive">
                  {/* Table Header */}
                  <div className="table-header-custom border-bottom bg-light bg-opacity-25 px-4 py-3">
                    <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
                      <Col xs={1} className="text-center">Sl. No.</Col>
                      <Col xs={2}>Coupon Code</Col>
                      <Col xs={2}>Discount</Col>
                      <Col xs={2}>Requirements / Cap</Col>
                      <Col xs={2}>Validity</Col>
                      <Col xs={2}>Usage / Applicable</Col>
                      <Col xs={1} className="text-end">Actions</Col>
                    </Row>
                  </div>

                  {/* Table Body */}
                  {coupons.map((coupon, index) => (
                    <div key={coupon._id || index} className="px-4 py-3 border-bottom table-row-hover bg-white">
                      <Row className="align-items-center">
                        {/* Sl. No. */}
                        <Col xs={1} className="text-center fw-medium text-muted small">
                          {startIndex + index}
                        </Col>

                        {/* Coupon Code & Status */}
                        <Col xs={2}>
                          <div className="d-flex flex-column">
                            <span className="fw-bold text-dark text-uppercase fs-5 ls-1">
                              {coupon.couponCode}
                            </span>
                            <span className="mt-1">
                              <span className={`badge rounded-pill px-2.5 py-1 small ${coupon.isActive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                {coupon.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </span>
                          </div>
                        </Col>

                        {/* Discount details */}
                        <Col xs={2}>
                          <div className="d-flex flex-column">
                            <span className="fw-bold text-primary fs-5">
                              {coupon.discountType === 'Percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                            </span>
                            <span className="text-muted small">{coupon.discountType} Discount</span>
                          </div>
                        </Col>

                        {/* Requirements & Caps */}
                        <Col xs={2}>
                          <div className="d-flex flex-column text-muted small">
                            <div>Min Spend: <span className="fw-semibold text-dark">₹{coupon.minimumBillAmount || 0}</span></div>
                            <div className="mt-1">Max Cap: <span className="fw-semibold text-dark">{coupon.maxDiscountCap ? `₹${coupon.maxDiscountCap}` : 'No Limit'}</span></div>
                          </div>
                        </Col>

                        {/* Validity Dates */}
                        <Col xs={2}>
                          <div className="d-flex flex-column text-muted small">
                            <div className="d-flex align-items-center">
                              <i className="bx bx-calendar text-muted me-1"></i>From: <span className="fw-medium text-dark ms-1">{moment(coupon.validFrom).format("DD MMM YYYY")}</span>
                            </div>
                            <div className="d-flex align-items-center mt-1">
                              <i className="bx bx-calendar text-muted me-1"></i>Until: <span className="fw-medium text-dark ms-1">{moment(coupon.validUntil).format("DD MMM YYYY")}</span>
                            </div>
                          </div>
                        </Col>

                        {/* Usage limits & Applicable lists */}
                        <Col xs={2}>
                          <div className="d-flex flex-column gap-1">
                            <div className="d-flex flex-wrap gap-1">
                              {coupon.applicableFor && coupon.applicableFor.map((item, idx) => (
                                <span key={idx} className="badge bg-light text-secondary rounded-pill px-2 py-1 small fw-medium border">
                                  {item}
                                </span>
                              ))}
                            </div>
                            <div className="text-muted small mt-1">
                              Usage: <span className="fw-semibold text-dark">{coupon.totalUsageLimit ? `${coupon.totalUsageLimit}` : 'Unlimited'}</span> (Per Cust: {coupon.perCustomerLimit || 'Unlimited'})
                            </div>
                          </div>
                        </Col>

                        {/* Actions */}
                        <Col xs={1} className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Link to={`/edit-coupon`} state={{ id: coupon._id, coupon }}>
                              <Button
                                color="light"
                                size="md"
                                className="rounded-circle border-0 d-flex align-items-center justify-content-center"
                                style={{ width: '38px', height: '38px' }}
                                id={`edit-${index}`}
                              >
                                <i className="bx bx-edit-alt text-primary fs-5"></i>
                              </Button>
                            </Link>
                            <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                              Edit
                            </UncontrolledTooltip>

                            <Button
                              color="light"
                              size="md"
                              className="rounded-circle border-0 d-flex align-items-center justify-content-center"
                              style={{ width: '38px', height: '38px' }}
                              onClick={() => handleDelete(coupon._id)}
                              id={`delete-${index}`}
                            >
                              <i className="bx bx-trash text-danger fs-5"></i>
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
                <div className="py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="empty-state-icon mb-4">
                    <i className="bx bx-purchase-tag display-2 text-muted opacity-25"></i>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">
                    {searchTerm ? "No matching coupons found" : "No coupons found"}
                  </h4>
                  <p className="text-muted mb-0">
                    {searchTerm
                      ? "Try searching for a different code or value"
                      : "Create your first coupon to get started"}
                  </p>
                </div>
              )}
            </CardBody>

            {/* Pagination Footer */}
            {totalCount > 0 && (
              <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted small">
                    Showing {startIndex}-{endIndex} of {totalCount} Coupons
                  </span>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Rows per page:</span>
                    <Input
                      type="select"
                      className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-white"
                      style={{ width: '70px', height: '30px', padding: '0 8px' }}
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
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Coupons

