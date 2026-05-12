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
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classNames from "classnames"
import { Link } from "react-router-dom"
import Flatpickr from "react-flatpickr"

// Styles
import "./pos.scss"

const PointOfSale = () => {
  const [activeTab, setActiveTab] = useState("services")
  const [customerModal, setCustomerModal] = useState(false)
  const [createCustomerModal, setCreateCustomerModal] = useState(false)
  const [tipModal, setTipModal] = useState(false)
  const [discountModal, setDiscountModal] = useState(false)
  const [dateTimeModal, setDateTimeModal] = useState(false)
  const [discountType, setDiscountType] = useState("percentage")
  const [selectedTip, setSelectedTip] = useState("no-tip")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const toggleCustomerModal = () => setCustomerModal(!customerModal)
  const toggleCreateCustomerModal = () => setCreateCustomerModal(!createCustomerModal)
  const toggleTipModal = () => setTipModal(!tipModal)
  const toggleDiscountModal = () => setDiscountModal(!discountModal)
  const toggleDateTimeModal = () => setDateTimeModal(!dateTimeModal)

  return (
    <React.Fragment>
      <div className="page-content pos-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-shopping-bag text-primary me-2"></i>
                Point of Sale
              </h3>
              <p className="text-muted mb-0">Create bills and process payments</p>
            </div>
            <div 
              className="bg-white px-3 py-2 rounded-4 shadow-sm border d-flex align-items-center gap-3 cursor-pointer date-time-display"
              onClick={toggleDateTimeModal}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-calendar text-muted"></i>
                <span className="fw-bold small text-dark">01 May 2026</span>
              </div>
              <div className="border-start ps-3 d-flex align-items-center gap-2">
                <i className="bx bx-time text-muted"></i>
                <span className="fw-bold small text-dark">02:44 PM</span>
              </div>
            </div>
          </div>

          <Row>
            {/* Left Column: POS Main */}
            <Col xl={8}>
              {/* Customer Selection */}
              <div className="bg-white p-3 rounded-4 shadow-sm border mb-4">
                {!selectedCustomer ? (
                  <div className="d-flex gap-3">
                    <Button 
                      color="light" 
                      className="flex-grow-1 rounded-pill bg-light border-0 py-2 text-start px-4 d-flex align-items-center justify-content-center gap-2 text-muted"
                      onClick={toggleCustomerModal}
                    >
                      <i className="bx bx-user fs-5"></i>
                      <span>Select Customer</span>
                    </Button>
                    <Button 
                      color="primary" 
                      className="rounded-pill px-5 d-flex align-items-center gap-2"
                      onClick={() => setSelectedCustomer('walk-in')}
                    >
                      <i className="bx bx-user-voice fs-5"></i>
                      <span>Walk-In</span>
                    </Button>
                  </div>
                ) : (
                  <div className="walk-in-card p-2 rounded-4 bg-light border position-relative d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-4 p-3 d-flex align-items-center justify-content-center">
                      <i className="bx bx-user fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Walk-In</h6>
                      <p className="text-muted small mb-0">No phone</p>
                    </div>
                    <Button 
                      color="transparent" 
                      className="position-absolute end-0 top-0 mt-2 me-2 p-1 border-0"
                      onClick={() => setSelectedCustomer(null)}
                    >
                      <i className="bx bx-x fs-4 text-muted"></i>
                    </Button>
                  </div>
                )}
              </div>

              {/* Search Services */}
              <div className="search-box bg-white rounded-pill shadow-sm border mb-4 d-flex align-items-center px-4 py-2">
                <i className="bx bx-search text-muted me-2 fs-5"></i>
                <Input
                  type="text"
                  placeholder="Search services, packages or products..."
                  className="border-0 bg-transparent p-0 form-control"
                />
              </div>

              {/* Content Tabs */}
              <Card className="border-0 rounded-4 shadow-sm content-card overflow-hidden">
                <div className="bg-light p-2 px-3 border-bottom">
                  <Nav pills className="pos-nav-pills">
                    <NavItem>
                      <NavLink
                        className={classNames({ active: activeTab === "services" }, "rounded-pill")}
                        onClick={() => setActiveTab("services")}
                      >
                        <i className="bx bx-cut me-2"></i> Services
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classNames({ active: activeTab === "packages" }, "rounded-pill")}
                        onClick={() => setActiveTab("packages")}
                      >
                        <i className="bx bx-package me-2"></i> Packages
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classNames({ active: activeTab === "products" }, "rounded-pill")}
                        onClick={() => setActiveTab("products")}
                      >
                        <i className="bx bx-basket me-2"></i> Products
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <CardBody className="py-5">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="services">
                      <div className="text-center py-5 opacity-50">
                        <i className="bx bx-cut display-3 mb-3 text-muted"></i>
                        <h4 className="fw-bold">No services found</h4>
                        <p className="text-muted">Ask your Brand Admin to import services</p>
                      </div>
                    </TabPane>
                    <TabPane tabId="packages">
                      <div className="text-center py-5 opacity-50">
                        <i className="bx bx-package display-3 mb-3 text-muted"></i>
                        <h4 className="fw-bold">No packages found</h4>
                      </div>
                    </TabPane>
                    <TabPane tabId="products">
                      <div className="text-center py-5 opacity-50">
                        <i className="bx bx-basket display-3 mb-3 text-muted"></i>
                        <h4 className="fw-bold">No products found</h4>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

            {/* Right Column: Cart */}
            <Col xl={4}>
              <Card className="border-0 rounded-4 shadow-sm cart-card h-100 d-flex flex-column">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white rounded p-2 d-flex align-items-center justify-content-center">
                      <i className="bx bx-cart fs-4"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Cart</h5>
                    <span className="badge rounded-pill bg-danger ms-1">0</span>
                  </div>
                  <div className="cart-header-actions d-flex gap-3 text-muted">
                    <i className="bx bx-file fs-5 cursor-pointer" title="Notes"></i>
                    <i className="bx bx-gift fs-5 cursor-pointer text-warning" title="Add Tip" onClick={toggleTipModal}></i>
                    <i className="bx bx-user fs-5 cursor-pointer" title="Select Staff"></i>
                    <i className="bx bx-group fs-5 cursor-pointer" title="Groups"></i>
                  </div>
                </div>

                <div className="flex-grow-1 p-4 d-flex flex-column align-items-center justify-content-center text-center empty-cart-area">
                  <div className="bg-light rounded-circle p-4 mb-3">
                    <i className="bx bx-cart-alt display-4 text-muted opacity-25"></i>
                  </div>
                  <h6 className="fw-bold text-dark">Cart is empty</h6>
                  <p className="text-muted small">Add services, products or packages</p>
                </div>

                <div className="p-4 bg-light bg-opacity-50 border-top mt-auto">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center text-muted small mb-1">
                      <span>Select a coupon to apply</span>
                    </div>
                    <p className="text-muted small italic">No active coupons available</p>
                  </div>

                  <div className="cart-totals border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">₹0</span>
                    </div>
                    <Button 
                      color="link" 
                      className="text-primary p-0 mb-3 text-decoration-none small"
                      onClick={toggleDiscountModal}
                    >
                      + Add direct discount
                    </Button>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Total</h4>
                      <h4 className="fw-bold mb-0">₹0</h4>
                    </div>
                    <Button color="primary" className="w-100 rounded-pill py-2 fw-bold shadow-primary d-flex align-items-center justify-content-center gap-2">
                      <i className="bx bx-wallet"></i>
                      Pay ₹0
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Modal 1: Select Customer */}
        <Modal isOpen={customerModal} toggle={toggleCustomerModal} centered className="pos-modal customer-selection-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleCustomerModal} className="border-0 pb-0 px-4 pt-4 text-center">
              <div className="w-100">
                <h4 className="fw-bold mb-1">Select Customer</h4>
                <p className="text-muted small">Search for an existing customer or create a new one</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-4">
              <div className="search-box bg-white rounded-pill border-primary border-2 mb-4 d-flex align-items-center px-4 py-3">
                <i className="bx bx-search text-muted me-2 fs-5"></i>
                <Input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="border-0 bg-transparent p-0 form-control"
                />
              </div>
              <div className="text-center py-5 opacity-50">
                <h5 className="text-muted">No customers found</h5>
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-4 pt-0">
              <Button 
                color="light" 
                className="w-100 rounded-pill py-3 d-flex align-items-center justify-content-center gap-2 bg-white border"
                onClick={() => {
                  toggleCustomerModal();
                  toggleCreateCustomerModal();
                }}
              >
                <i className="bx bx-user-plus fs-5"></i>
                <span className="fw-medium">Create New Customer</span>
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Modal 2: Create New Customer */}
        <Modal isOpen={createCustomerModal} toggle={toggleCreateCustomerModal} centered className="pos-modal create-customer-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleCreateCustomerModal} className="border-0 pb-0 px-4 pt-4">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Create New Customer</h4>
                <p className="text-muted small">Add a new customer and proceed with billing</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Form>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Name *</Label>
                  <Input 
                    type="text" 
                    placeholder="Customer name" 
                    className="rounded-4 border-primary border-2 px-4 py-3"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Phone *</Label>
                  <div className="d-flex gap-2">
                    <div style={{ width: '100px' }}>
                      <Input type="select" className="rounded-pill border-light bg-light px-3 py-3 form-select">
                        <option>IN +91</option>
                      </Input>
                    </div>
                    <Input 
                      type="text" 
                      placeholder="Phone number" 
                      className="rounded-pill border-light bg-light px-4 py-3 flex-grow-1"
                    />
                  </div>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleCreateCustomerModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-5 py-2 fw-medium shadow-primary" onClick={toggleCreateCustomerModal}>
                Create and Select
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Modal 3: Add Tip */}
        <Modal isOpen={tipModal} toggle={toggleTipModal} centered className="pos-modal tip-modal">
          <div className="modal-content border-0 rounded-4" style={{ maxWidth: '500px', margin: 'auto' }}>
            <ModalHeader toggle={toggleTipModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-gift text-warning fs-3"></i>
                <h4 className="fw-bold mb-0">Add Tip</h4>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <div className="d-flex gap-2 mb-4">
                {["no-tip", "50", "100", "200"].map((tip) => (
                  <Button
                    key={tip}
                    color="light"
                    className={classNames("flex-grow-1 rounded-4 py-2 border-2", {
                      "border-primary bg-primary text-white": selectedTip === tip,
                      "bg-light text-dark": selectedTip !== tip
                    })}
                    onClick={() => setSelectedTip(tip)}
                  >
                    {tip === "no-tip" ? "No Tip" : `₹${tip}`}
                  </Button>
                ))}
              </div>
              <FormGroup className="mb-4">
                <Input 
                  type="text" 
                  placeholder="Custom amount" 
                  className="rounded-4 bg-light border-0 px-4 py-3"
                />
              </FormGroup>
              <Button 
                color="primary" 
                className="w-100 rounded-pill py-3 fw-bold shadow-primary mb-2"
                onClick={toggleTipModal}
              >
                Remove Tip
              </Button>
            </ModalBody>
          </div>
        </Modal>

        {/* Modal 4: Apply Direct Discount */}
        <Modal isOpen={discountModal} toggle={toggleDiscountModal} centered className="pos-modal discount-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleDiscountModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-purchase-tag text-primary fs-4"></i>
                <h4 className="fw-bold mb-0">Apply Direct Discount</h4>
              </div>
              <p className="text-muted small mt-1 mb-0 ms-1 ps-3">Add a discount to the entire bill</p>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <Form>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Discount Type</Label>
                  <div className="d-flex gap-2 p-1 bg-light rounded-4">
                    <Button 
                      className={classNames("flex-grow-1 rounded-4 py-3 border-0", {
                        "bg-primary text-white shadow": discountType === "percentage",
                        "bg-transparent text-muted": discountType !== "percentage"
                      })}
                      onClick={() => setDiscountType("percentage")}
                    >
                      <i className="bx bx-percent me-2"></i>
                      Percentage (%)
                    </Button>
                    <Button 
                      className={classNames("flex-grow-1 rounded-4 py-3 border-0", {
                        "bg-primary text-white shadow": discountType === "flat",
                        "bg-transparent text-muted": discountType !== "flat"
                      })}
                      onClick={() => setDiscountType("flat")}
                    >
                      <i className="bx bx-rupee me-2"></i>
                      Flat Amount (Rs)
                    </Button>
                  </div>
                </FormGroup>

                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Discount Value</Label>
                  <div className="position-relative">
                    <i className={classNames("bx position-absolute start-0 top-50 translate-middle-y ms-3 text-muted", {
                      "bx-percent": discountType === "percentage",
                      "bx-rupee": discountType === "flat"
                    })}></i>
                    <Input 
                      type="number" 
                      placeholder={discountType === "percentage" ? "Percentage" : "Amount"}
                      className="rounded-pill bg-light border-0 px-5 py-3"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Reason (optional)</Label>
                  <Input 
                    type="textarea" 
                    rows="3"
                    placeholder="e.g., Loyal customer, Birthday discount"
                    className="rounded-4 bg-light border-0 px-4 py-3"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-4 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleDiscountModal}>
                Cancel
              </Button>
              <Button className="rounded-pill px-4 py-2 fw-medium bg-gradient-primary text-white border-0" onClick={toggleDiscountModal}>
                Apply Discount
              </Button>
            </ModalFooter>
          </div>
        </Modal>
        {/* Modal 5: Billing Date & Time */}
        <Modal isOpen={dateTimeModal} toggle={toggleDateTimeModal} centered className="pos-modal date-time-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleDateTimeModal} className="border-0 pb-0 px-4 pt-4">
              <h5 className="fw-bold mb-0">Billing Date & Time</h5>
            </ModalHeader>
            <ModalBody className="px-4 py-4">
              <div className="calendar-inline-wrapper mb-4 p-2 border rounded-4">
                <Flatpickr
                  options={{ inline: true, dateFormat: "Y-m-d" }}
                  className="d-none"
                />
              </div>
              
              <div className="time-selectors d-flex align-items-center justify-content-center gap-2 mb-4">
                <Input type="select" className="rounded-pill bg-light border-0 px-3 py-2 text-center" style={{ width: '90px' }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1}>{(i + 1).toString().padStart(2, '0')}</option>
                  ))}
                </Input>
                <span className="fw-bold fs-4">:</span>
                <Input type="select" className="rounded-pill bg-light border-0 px-3 py-2 text-center" style={{ width: '90px' }}>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i}>{i.toString().padStart(2, '0')}</option>
                  ))}
                </Input>
                <Input type="select" className="rounded-pill bg-light border-0 px-3 py-2 text-center" style={{ width: '90px' }}>
                  <option>PM</option>
                  <option>AM</option>
                </Input>
              </div>

              <Button 
                color="primary" 
                className="w-100 rounded-pill py-3 fw-bold shadow-primary"
                onClick={toggleDateTimeModal}
              >
                Apply
              </Button>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default PointOfSale
