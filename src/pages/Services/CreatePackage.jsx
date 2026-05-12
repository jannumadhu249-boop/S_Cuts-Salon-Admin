import React, { useState } from "react"
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
} from "reactstrap"
import { Link } from "react-router-dom"
import Flatpickr from "react-flatpickr"

// Styles
import "./services.scss"

const CreatePackage = () => {
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
                <h3 className="fw-bold mb-0 text-dark">Create Package</h3>
                <p className="text-muted mb-0">Create a new service combo package</p>
              </div>
            </div>
            <Button color="primary" className="rounded-pill px-4 shadow-primary">
              Create Package
            </Button>
          </div>

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
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label className="fw-bold small mb-2">Package Price</Label>
                        <div className="position-relative">
                          <i className="bx bx-rupee position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            className="rounded-4 bg-light border-0 ps-5 py-2"
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
                              <Input type="checkbox" id={item} className="custom-check-purple" defaultChecked />
                              <Label htmlFor={item} className="mb-0 small fw-medium">{item}</Label>
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
                          <Input type="switch" role="switch" id="activeStatus" defaultChecked className="custom-switch-purple" />
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
                    />
                  </div>

                  <div className="text-center py-5 opacity-50">
                    <p className="text-muted small">No services available. Ask your Brand Admin to import services.</p>
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
                    <Badge color="danger" className="rounded-pill px-2 py-1">0</Badge>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <i className="bx bx-time-five"></i>
                      <span className="small">Duration</span>
                    </div>
                    <span className="fw-bold small">0 mins</span>
                  </div>

                  <hr className="my-4 opacity-50" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Original Price</span>
                    <span className="text-muted small fw-bold text-decoration-line-through">₹0</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="text-muted small">Package Price</span>
                    <span className="fw-bold text-dark">₹0</span>
                  </div>

                  <div className="bg-success bg-opacity-10 border-success border-opacity-10 border rounded-4 p-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 text-success">
                      <i className="bx bx-trending-down fs-4"></i>
                      <span className="fw-bold small">% Savings</span>
                    </div>
                    <div className="text-end">
                      <h6 className="fw-bold text-success mb-0">₹0</h6>
                      <span className="text-success small opacity-75">No savings</span>
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

export default CreatePackage
