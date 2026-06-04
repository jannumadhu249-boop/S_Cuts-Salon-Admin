import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  FormGroup,
  Alert,
  Spinner,
} from "reactstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Flatpickr from "react-flatpickr"
import { post, put } from "../../helpers/api_helper"
import { URLS } from "../../url"

// Styles
import "./coupons.scss"

const UpdateCoupons = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const couponId = location.state?.id || ""
  const initialCoupon = location.state?.coupon

  const [formData, setFormData] = useState({
    couponCode: "",
    isActive: true,
    discountType: "Percentage",
    discountValue: "",
    minimumBillAmount: "",
    maxDiscountCap: "",
    validFrom: null,
    validUntil: null,
    totalUsageLimit: "",
    perCustomerLimit: "",
    applicableFor: [],
    branchOnly: true,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  // Load and fetch coupon details
  useEffect(() => {
    if (initialCoupon) {
      setFormData({
        couponCode: initialCoupon.couponCode || "",
        isActive: initialCoupon.isActive !== undefined ? initialCoupon.isActive : true,
        discountType: initialCoupon.discountType || "Percentage",
        discountValue: initialCoupon.discountValue || "",
        minimumBillAmount: initialCoupon.minimumBillAmount || "",
        maxDiscountCap: initialCoupon.maxDiscountCap || "",
        validFrom: initialCoupon.validFrom ? new Date(initialCoupon.validFrom) : null,
        validUntil: initialCoupon.validUntil ? new Date(initialCoupon.validUntil) : null,
        totalUsageLimit: initialCoupon.totalUsageLimit || "",
        perCustomerLimit: initialCoupon.perCustomerLimit || "",
        applicableFor: initialCoupon.applicableFor || [],
        branchOnly: initialCoupon.branchOnly !== undefined ? initialCoupon.branchOnly : true,
      })
    }

    if (couponId) {
      const getFreshData = async () => {
        try {
          const response = await post(URLS.GetByIdCoupons, { couponId })
          if (response.success && response.data) {
            const data = response.data
            setFormData({
              couponCode: data.couponCode || "",
              isActive: data.isActive !== undefined ? data.isActive : true,
              discountType: data.discountType || "Percentage",
              discountValue: data.discountValue !== undefined ? data.discountValue : "",
              minimumBillAmount: data.minimumBillAmount !== undefined ? data.minimumBillAmount : "",
              maxDiscountCap: data.maxDiscountCap !== undefined ? data.maxDiscountCap : "",
              validFrom: data.validFrom ? new Date(data.validFrom) : null,
              validUntil: data.validUntil ? new Date(data.validUntil) : null,
              totalUsageLimit: data.totalUsageLimit !== undefined ? data.totalUsageLimit : "",
              perCustomerLimit: data.perCustomerLimit !== undefined ? data.perCustomerLimit : "",
              applicableFor: data.applicableFor || [],
              branchOnly: data.branchOnly !== undefined ? data.branchOnly : true,
            })
          }
        } catch (err) {
          console.error("Error fetching fresh coupon data:", err)
        }
      }
      getFreshData()
    }
  }, [couponId, initialCoupon])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? (value !== "" ? Number(value) : "") : value
    }))
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle toggle switches
  const handleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  // Handle date changes
  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date && date[0] ? date[0] : null
    }))
  }

  // Handle checkbox for applicable items
  const handleApplicableForChange = (item) => {
    setFormData(prev => ({
      ...prev,
      applicableFor: prev.applicableFor.includes(item)
        ? prev.applicableFor.filter(i => i !== item)
        : [...prev.applicableFor, item]
    }))
  }

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return null
    const d = new Date(date)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${month}-${day}`
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (!formData.couponCode.trim()) errors.couponCode = "Coupon code is required"
    if (!formData.discountValue || formData.discountValue <= 0) errors.discountValue = "Discount value is required and must be positive"
    if (!formData.validFrom) errors.validFrom = "Valid from date is required"
    if (!formData.validUntil) errors.validUntil = "Valid until date is required"
    if (formData.applicableFor.length === 0) errors.applicableFor = "Select at least one applicable category"
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Prepare API payload
      const payload = {
        couponCode: formData.couponCode.toUpperCase(),
        isActive: formData.isActive,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minimumBillAmount: formData.minimumBillAmount ? Number(formData.minimumBillAmount) : 0,
        maxDiscountCap: formData.maxDiscountCap ? Number(formData.maxDiscountCap) : null,
        validFrom: formatDate(formData.validFrom),
        validUntil: formatDate(formData.validUntil),
        totalUsageLimit: formData.totalUsageLimit ? Number(formData.totalUsageLimit) : null,
        perCustomerLimit: formData.perCustomerLimit ? Number(formData.perCustomerLimit) : null,
        applicableFor: formData.applicableFor,
      }

      // PUT Update request
      const response = await put(URLS.UpdateCoupons + couponId, payload)

      if (response.success) {
        setSuccess(true)
        
        // Show success message and redirect after 2 seconds
        setTimeout(() => {
          navigate("/coupons")
        }, 2000)
      } else {
        throw new Error(response.message || "Failed to update coupon")
      }
    } catch (err) {
      setError(err.message || "Failed to update coupon. Please try again.")
      console.error("Error updating coupon:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content update-coupon-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex align-items-center gap-3 mb-4 mt-2">
            <Link to="/coupons" className="text-dark">
              <i className="bx bx-left-arrow-alt fs-2"></i>
            </Link>
            <div className="text-center">
              <h3 className="fw-bold mb-0 text-dark">Update Coupon</h3>
              <p className="text-muted mb-0">Update an existing discount coupon</p>
            </div>
          </div>

          <Row className="justify-content-center">
            <Col xl={8}>
              <Card className="border-0 rounded-4 shadow-sm">
                <CardBody className="p-5">
                  {/* Success Alert */}
                  {success && (
                    <Alert color="success" className="mb-4 rounded-4">
                      <i className="bx bx-check-circle me-2"></i>
                      Coupon updated successfully! Redirecting...
                    </Alert>
                  )}

                  {/* Error Alert */}
                  {error && (
                    <Alert color="danger" className="mb-4 rounded-4">
                      <i className="bx bx-x-circle me-2"></i>
                      {error}
                    </Alert>
                  )}

                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bx bx-purchase-tag fs-4 text-dark"></i>
                    <h5 className="fw-bold mb-0">Coupon Details</h5>
                  </div>
                  <p className="text-muted small mb-4">Configure the coupon code and discount</p>

                  <form onSubmit={handleSubmit} className="form-sections">
                    {/* Row 1: Code + Toggles */}
                    <Row className="mb-4 align-items-end">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Coupon Code *</Label>
                        <Input 
                          type="text" 
                          name="couponCode"
                          placeholder="SUMMER20" 
                          className={`rounded-4 bg-light border-0 px-3 py-2 text-uppercase fw-bold ls-1 ${validationErrors.couponCode ? "is-invalid" : ""}`}
                          value={formData.couponCode}
                          onChange={handleInputChange}
                        />
                        {validationErrors.couponCode && (
                          <small className="text-danger d-block mt-1">{validationErrors.couponCode}</small>
                        )}
                        <span className="text-muted x-small mt-1 d-block italic">Unique code, auto-capitalized</span>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="form-check form-switch form-switch-md">
                            <Input 
                              type="checkbox" 
                              role="switch" 
                              id="activeStatus" 
                              name="isActive"
                              checked={formData.isActive}
                              onChange={(e) => handleToggle("isActive")}
                              className="form-check-input custom-switch-purple" 
                            />
                          </div>
                          <Label htmlFor="activeStatus" className="mb-0 small fw-bold">Active</Label>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="form-check form-switch form-switch-md">
                            <Input 
                              type="checkbox" 
                              role="switch" 
                              id="branchOnly" 
                              name="branchOnly"
                              checked={formData.branchOnly}
                              onChange={(e) => handleToggle("branchOnly")}
                              className="form-check-input custom-switch-purple" 
                            />
                          </div>
                          <Label htmlFor="branchOnly" className="mb-0 small fw-bold">This branch only</Label>
                        </div>
                      </Col>
                    </Row>

                    {/* Row 2: Discount */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Discount Type *</Label>
                        <Input 
                          type="select" 
                          name="discountType"
                          className="rounded-4 bg-light border-0 px-3 py-2 form-select"
                          value={formData.discountType}
                          onChange={handleInputChange}
                        >
                          <option>Percentage</option>
                          <option>Flat Amount</option>
                        </Input>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Discount Value *</Label>
                        <div className="position-relative">
                          <i className="bx bx-percent position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input 
                            type="number" 
                            name="discountValue"
                            placeholder="10" 
                            className={`rounded-4 bg-light border-0 ps-5 py-2 ${validationErrors.discountValue ? "is-invalid" : ""}`}
                            value={formData.discountValue}
                            onChange={handleInputChange}
                          />
                        </div>
                        {validationErrors.discountValue && (
                          <small className="text-danger d-block mt-1">{validationErrors.discountValue}</small>
                        )}
                      </Col>
                    </Row>

                    {/* Row 3: Limits */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Minimum Bill Amount</Label>
                        <div className="position-relative">
                          <i className="bx bx-rupee position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input 
                            type="number" 
                            name="minimumBillAmount"
                            placeholder="0" 
                            className="rounded-4 bg-light border-0 ps-5 py-2"
                            value={formData.minimumBillAmount}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Max Discount Cap</Label>
                        <Input 
                          type="number" 
                          name="maxDiscountCap"
                          placeholder="No limit" 
                          className="rounded-4 bg-light border-0 px-3 py-2"
                          value={formData.maxDiscountCap}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>

                    {/* Row 4: Dates */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Valid From *</Label>
                        <div className={`bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0 ${validationErrors.validFrom ? "border border-danger" : ""}`}>
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                            value={formData.validFrom}
                            onChange={(date) => handleDateChange("validFrom", date)}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                        {validationErrors.validFrom && (
                          <small className="text-danger d-block mt-1">{validationErrors.validFrom}</small>
                        )}
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Valid Until *</Label>
                        <div className={`bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0 ${validationErrors.validUntil ? "border border-danger" : ""}`}>
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                            value={formData.validUntil}
                            onChange={(date) => handleDateChange("validUntil", date)}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                        {validationErrors.validUntil && (
                          <small className="text-danger d-block mt-1">{validationErrors.validUntil}</small>
                        )}
                      </Col>
                    </Row>

                    {/* Row 5: Usage Limits */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Total Usage Limit</Label>
                        <Input 
                          type="number" 
                          name="totalUsageLimit"
                          placeholder="Unlimited" 
                          className="rounded-4 bg-light border-0 px-3 py-2"
                          value={formData.totalUsageLimit}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Per Customer Limit</Label>
                        <Input 
                          type="number" 
                          name="perCustomerLimit"
                          placeholder="Unlimited" 
                          className="rounded-4 bg-light border-0 px-3 py-2"
                          value={formData.perCustomerLimit}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>

                    {/* Row 6: Applicable For */}
                    <div className="mb-5">
                      <Label className="fw-bold small mb-3">Applicable For *</Label>
                      {validationErrors.applicableFor && (
                        <small className="text-danger d-block mb-2">{validationErrors.applicableFor}</small>
                      )}
                      <div className="d-flex gap-4">
                        {["Services", "Packages", "Products"].map(item => (
                          <div key={item} className="d-flex align-items-center gap-2">
                            <Input 
                              type="checkbox" 
                              id={item} 
                              name={item}
                              className="form-check-input custom-check-purple"
                              checked={formData.applicableFor.includes(item)}
                              onChange={(e) => handleApplicableForChange(item)}
                            />
                            <Label htmlFor={item} className="mb-0 small fw-medium">{item}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="d-flex gap-3 float-end">
                      <Button 
                        type="button"
                        color="light" 
                        className="rounded-pill px-5 py-2 fw-bold bg-light border-0"
                        onClick={() => navigate("/coupons")}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        color="primary" 
                        className="rounded-pill px-5 py-2 fw-bold shadow-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner size="sm" className="me-2" /> Updating...
                          </>
                        ) : (
                          "Update Coupon"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UpdateCoupons
