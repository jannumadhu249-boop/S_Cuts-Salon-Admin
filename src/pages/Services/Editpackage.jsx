import React, { useState, useEffect, useCallback } from "react"
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
  Badge,
  Alert,
  Spinner
} from "reactstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Flatpickr from "react-flatpickr"
import { post, put } from "../../helpers/api_helper"
import { URLS } from "../../url"

// Styles
import "./services.scss"

const EditPackage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const packageId = location.state?.id

  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form State
  const [packageName, setPackageName] = useState("")
  const [packagePrice, setPackagePrice] = useState("")
  const [description, setDescription] = useState("")
  const [validFrom, setValidFrom] = useState(new Date())
  const [validUntil, setValidUntil] = useState(new Date())
  const [applicableFor, setApplicableFor] = useState([])
  const [status, setStatus] = useState("active")
  const [selectedServices, setSelectedServices] = useState([])

  // Services Data
  const [allServices, setAllServices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [fetchingServices, setFetchingServices] = useState(false)

  const fetchServices = useCallback(async () => {
    setFetchingServices(true)
    try {
      const response = await post(URLS.GetServices + "?limit=1000", {})
      if (response.success) {
        setAllServices(response.data || [])
      }
    } catch (err) {
      console.error("Error fetching services", err)
    } finally {
      setFetchingServices(false)
    }
  }, [])

  const fetchPackageDetails = useCallback(async () => {
    if (!packageId) return
    setFetchingData(true)
    try {
      const response = await post(URLS.GetByIdServicePackage, { id: packageId })
      if (response.success) {
        const data = response.data
        setPackageName(data.packageName)
        setPackagePrice(data.packagePrice)
        setDescription(data.description)
        setValidFrom(new Date(data.validFrom))
        setValidUntil(new Date(data.validUntil))
        setApplicableFor(data.applicableFor || [])
        setStatus(data.status || "active")
        // Map services to just IDs
        const sIds = data.services ? data.services.map(s => s.serviceId || s._id) : []
        setSelectedServices(sIds)
      } else {
        setError(response.message || "Failed to fetch package details")
      }
    } catch (err) {
      setError("An error occurred while fetching package details")
    } finally {
      setFetchingData(false)
    }
  }, [packageId])

  useEffect(() => {
    fetchServices()
    fetchPackageDetails()
  }, [fetchServices, fetchPackageDetails])

  const handleApplicableToggle = (item) => {
    setApplicableFor(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const handleServiceToggle = (id) => {
    setSelectedServices(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (selectedServices.length === 0) {
      setError("Please select at least one service.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    const payload = {
      packageName,
      packagePrice: parseFloat(packagePrice),
      description,
      validFrom: validFrom instanceof Array ? validFrom[0].toISOString().split('T')[0] : (validFrom instanceof Date ? validFrom.toISOString().split('T')[0] : validFrom),
      validUntil: validUntil instanceof Array ? validUntil[0].toISOString().split('T')[0] : (validUntil instanceof Date ? validUntil.toISOString().split('T')[0] : validUntil),
      applicableFor,
      services: selectedServices,
      status
    }

    try {
      const response = await put(URLS.UpdateServicePackage + packageId, payload)
      if (response.success) {
        setSuccess(response.message || "Package updated successfully")
        setTimeout(() => navigate("/service-packages"), 2000)
      } else {
        setError(response.message || "Failed to update package")
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = allServices.filter(s => 
    s.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedServicesData = allServices.filter(s => selectedServices.includes(s._id))
  const originalPrice = selectedServicesData.reduce((acc, s) => acc + parseFloat(s.price || 0), 0)
  const savingsAmount = originalPrice - (parseFloat(packagePrice) || 0)
  const savingsPercentage = originalPrice > 0 ? (savingsAmount / originalPrice) * 100 : 0

  if (fetchingData && !error) {
    return (
      <div className="page-content text-center py-5">
        <Spinner color="primary" />
        <p className="mt-2">Loading package details...</p>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="page-content create-package-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div className="d-flex align-items-center gap-3">
              <Link to="/service-packages" className="text-dark">
                <i className="bx bx-left-arrow-alt fs-2"></i>
              </Link>
              <div>
                <h3 className="fw-bold mb-0 text-dark">Edit Package</h3>
                <p className="text-muted mb-0">Update this service combo package</p>
              </div>
            </div>
            <Button 
              color="primary" 
              className="rounded-pill px-4 shadow-primary"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Update Package"}
            </Button>
          </div>

          {error && <Alert color="danger" className="border-0 shadow-sm">{error}</Alert>}
          {success && <Alert color="success" className="border-0 shadow-sm">{success}</Alert>}

          <Row>
            {/* Left Column: Form Details */}
            <Col xl={8}>
              <Card className="border-0 rounded-4 shadow-sm mb-4">
                <CardBody className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bx bx-package fs-4 text-dark"></i>
                    <h5 className="fw-bold mb-0">Package Details</h5>
                  </div>
                  <p className="text-muted small mb-4">Basic information about the package</p>

                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Package Name *</Label>
                        <Input 
                          type="text" 
                          placeholder="e.g., Complete Relaxation Package" 
                          className="rounded-4 bg-light border-0 px-3 py-2"
                          value={packageName}
                          onChange={(e) => setPackageName(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Package Price *</Label>
                        <div className="position-relative">
                          <i className="bx bx-rupee position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            className="rounded-4 bg-light border-0 ps-5 py-2"
                            value={packagePrice}
                            onChange={(e) => setPackagePrice(e.target.value)}
                            required
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Description</Label>
                        <Input 
                          type="textarea" 
                          rows="3"
                          placeholder="Describe what's included in this package..." 
                          className="rounded-4 bg-light border-0 px-3 py-2"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Valid From</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                            value={validFrom}
                            onChange={date => setValidFrom(date)}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Valid Until</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                            value={validUntil}
                            onChange={date => setValidUntil(date)}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-3">Applicable For</Label>
                        <div className="d-flex gap-4">
                          {["POS", "Appointments", "Walk-ins"].map(item => (
                            <div key={item} className="d-flex align-items-center gap-2">
                              <Input 
                                type="checkbox" 
                                id={`applicable-${item}`} 
                                className="custom-check-purple cursor-pointer" 
                                checked={applicableFor.includes(item)}
                                onChange={() => handleApplicableToggle(item)}
                                style={{ cursor: 'pointer' }}
                              />
                              <Label htmlFor={`applicable-${item}`} className="mb-0 small fw-medium cursor-pointer" style={{ cursor: 'pointer' }}>{item}</Label>
                            </div>
                          ))}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <div className="d-flex justify-content-between align-items-center bg-light bg-opacity-50 p-3 rounded-4 border">
                        <div>
                          <h6 className="fw-bold mb-1">Active Status</h6>
                          <p className="text-muted small mb-0">Enable to make this package available</p>
                        </div>
                        <div className="form-check form-switch form-switch-md">
                          <Input 
                            type="switch" 
                            id="activeStatusSwitch" 
                            checked={status === "active"}
                            onChange={(e) => setStatus(e.target.checked ? "active" : "inactive")}
                            className="custom-switch-purple cursor-pointer"
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {/* Select Services Card */}
              <Card className="border-0 rounded-4 shadow-sm">
                <CardBody className="p-4">
                  <h5 className="fw-bold mb-1">Select Services</h5>
                  <p className="text-muted small mb-4">Choose services to include in this package</p>
                  
                  <div className="search-box bg-light rounded-pill border-0 px-4 py-2 d-flex align-items-center mb-4">
                    <i className="bx bx-search text-muted me-2"></i>
                    <Input
                      type="text"
                      placeholder="Search services..."
                      className="border-0 bg-transparent p-0 form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="services-list overflow-auto" style={{ maxHeight: '400px' }}>
                    {fetchingServices ? (
                      <div className="text-center py-4"><Spinner color="primary" /></div>
                    ) : filteredServices.length > 0 ? (
                      filteredServices.map(service => (
                        <div key={service._id} className="d-flex align-items-center justify-content-between p-3 border-bottom service-item-hover">
                          <div className="d-flex align-items-center gap-3">
                            <Input 
                              type="checkbox" 
                              id={`service-${service._id}`}
                              checked={selectedServices.includes(service._id)}
                              onChange={() => handleServiceToggle(service._id)}
                              className="custom-check-purple cursor-pointer"
                              style={{ cursor: 'pointer' }}
                            />
                            <Label htmlFor={`service-${service._id}`} className="m-0 cursor-pointer d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
                              <div className="service-img rounded-3 bg-light overflow-hidden" style={{ width: 40, height: 40 }}>
                                {service.image ? (
                                  <img src={URLS.ImageUrl + service.image} alt="" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                    <i className="bx bx-image text-muted"></i>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h6 className="fw-bold mb-0 small">{service.serviceName}</h6>
                                <span className="text-muted extra-small">{service.categoryName || 'General'}</span>
                              </div>
                            </Label>
                          </div>
                          <div className="text-end">
                            <h6 className="fw-bold mb-0 small">₹{service.price}</h6>
                            <span className="text-muted extra-small">{service.duration || 'N/A'}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-5 opacity-50">
                        <p className="text-muted small">No services found.</p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Right Column: Summary */}
            <Col xl={4}>
              <Card className="border-0 rounded-4 shadow-sm sticky-top" style={{ top: '100px' }}>
                <CardBody className="p-4">
                  <h5 className="fw-bold mb-4">Package Summary</h5>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted small">Services</span>
                    <Badge color={selectedServices.length > 0 ? "success" : "danger"} className="rounded-pill px-2 py-1">
                      {selectedServices.length}
                    </Badge>
                  </div>

                  <div className="selected-services-list mb-4 overflow-auto" style={{ maxHeight: '150px' }}>
                    {selectedServicesData.map(s => (
                      <div key={s._id} className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted extra-small text-truncate" style={{ maxWidth: '70%' }}>• {s.serviceName}</span>
                        <span className="extra-small fw-bold">₹{s.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <i className="bx bx-time-five"></i>
                      <span className="small">Estimated Price</span>
                    </div>
                    <span className="fw-bold small">₹{originalPrice}</span>
                  </div>

                  <hr className="my-4 opacity-50" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Original Price</span>
                    <span className="text-muted small fw-bold text-decoration-line-through">₹{originalPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="text-muted small">Package Price</span>
                    <span className="fw-bold text-dark fs-5">₹{packagePrice || 0}</span>
                  </div>

                  <div className={`border rounded-4 p-3 d-flex justify-content-between align-items-center ${savingsAmount > 0 ? 'bg-success bg-opacity-10 border-success border-opacity-10' : 'bg-light opacity-50'}`}>
                    <div className={`d-flex align-items-center gap-2 ${savingsAmount > 0 ? 'text-success' : 'text-muted'}`}>
                      <i className="bx bx-trending-down fs-4"></i>
                      <span className="fw-bold small">% Savings</span>
                    </div>
                    <div className="text-end">
                      <h6 className={`fw-bold mb-0 ${savingsAmount > 0 ? 'text-success' : 'text-muted'}`}>₹{savingsAmount > 0 ? savingsAmount.toFixed(2) : 0}</h6>
                      <span className={`${savingsAmount > 0 ? 'text-success' : 'text-muted'} small opacity-75`}>
                        {savingsAmount > 0 ? `${savingsPercentage.toFixed(1)}% saved` : 'No savings'}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EditPackage
