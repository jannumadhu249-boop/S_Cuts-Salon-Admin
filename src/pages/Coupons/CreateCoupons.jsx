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
} from "reactstrap"
import { Link } from "react-router-dom"
import Flatpickr from "react-flatpickr"

// Styles
import "./coupons.scss"

const CreateCoupons = () => {
  return (
    <React.Fragment>
      <div className="page-content create-coupon-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex align-items-center gap-3 mb-4 mt-2">
            <Link to="/coupons" className="text-dark">
              <i className="bx bx-left-arrow-alt fs-2"></i>
            </Link>
            <div className="text-center">
              <h3 className="fw-bold mb-0 text-dark">Create Coupon</h3>
              <p className="text-muted mb-0">Create a new discount coupon</p>
            </div>
          </div>

          <Row className="justify-content-center">
            <Col xl={8}>
              <Card className="border-0 rounded-4 shadow-sm">
                <CardBody className="p-5">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bx bx-purchase-tag fs-4 text-dark"></i>
                    <h5 className="fw-bold mb-0">Coupon Details</h5>
                  </div>
                  <p className="text-muted small mb-4">Configure the coupon code and discount</p>

                  <div className="form-sections">
                    {/* Row 1: Code + Toggles */}
                    <Row className="mb-4 align-items-end">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Coupon Code *</Label>
                        <Input 
                          type="text" 
                          placeholder="SUMMER20" 
                          className="rounded-4 bg-light border-0 px-3 py-2 text-uppercase fw-bold ls-1"
                        />
                        <span className="text-muted x-small mt-1 d-block italic">Unique code, auto-capitalized</span>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="form-check form-switch form-switch-md">
                            <Input type="switch" role="switch" id="activeStatus" defaultChecked className="custom-switch-purple" />
                          </div>
                          <Label htmlFor="activeStatus" className="mb-0 small fw-bold">Active</Label>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="form-check form-switch form-switch-md">
                            <Input type="switch" role="switch" id="branchOnly" defaultChecked className="custom-switch-purple" />
                          </div>
                          <Label htmlFor="branchOnly" className="mb-0 small fw-bold">This branch only</Label>
                        </div>
                      </Col>
                    </Row>

                    {/* Row 2: Discount */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Discount Type *</Label>
                        <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select">
                          <option>Percentage</option>
                          <option>Flat Amount</option>
                        </Input>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Discount Value *</Label>
                        <div className="position-relative">
                          <i className="bx bx-percent position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input type="number" placeholder="10" className="rounded-4 bg-light border-0 ps-5 py-2" />
                        </div>
                      </Col>
                    </Row>

                    {/* Row 3: Limits */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Minimum Bill Amount</Label>
                        <div className="position-relative">
                          <i className="bx bx-rupee position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
                          <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 ps-5 py-2" />
                        </div>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Max Discount Cap</Label>
                        <Input type="text" placeholder="No limit" className="rounded-4 bg-light border-0 px-3 py-2" />
                      </Col>
                    </Row>

                    {/* Row 4: Dates */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Valid From</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-bold small mb-2">Valid Until</Label>
                        <div className="bg-light rounded-4 px-3 py-2 d-flex align-items-center border-0">
                          <Flatpickr
                            className="form-control border-0 bg-transparent p-0"
                            placeholder="dd-mm-yyyy"
                            options={{ dateFormat: "d-m-Y" }}
                          />
                          <i className="bx bx-calendar text-muted"></i>
                        </div>
                      </Col>
                  </Row>

                  {/* Row 5: Usage Limits */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Label className="fw-bold small mb-2">Total Usage Limit</Label>
                      <Input type="text" placeholder="Unlimited" className="rounded-4 bg-light border-0 px-3 py-2" />
                    </Col>
                    <Col md={6}>
                      <Label className="fw-bold small mb-2">Per Customer Limit</Label>
                      <Input type="text" placeholder="Unlimited" className="rounded-4 bg-light border-0 px-3 py-2" />
                    </Col>
                  </Row>

                  {/* Row 6: Applicable For */}
                  <div className="mb-5">
                    <Label className="fw-bold small mb-3">Applicable For *</Label>
                    <div className="d-flex gap-4">
                      {["Services", "Packages", "Products"].map(item => (
                        <div key={item} className="d-flex align-items-center gap-2">
                          <Input type="checkbox" id={item} className="custom-check-purple" defaultChecked />
                          <Label htmlFor={item} className="mb-0 small fw-medium">{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="d-flex gap-3 float-end">
                    <Button color="light" className="rounded-pill px-5 py-2 fw-bold bg-light border-0" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <Button color="primary" className="rounded-pill px-5 py-2 fw-bold shadow-primary">
                      Create Coupon
                    </Button>
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

export default CreateCoupons
