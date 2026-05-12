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
import "./membership.scss"

const Membership = () => {
  const [activeTab, setActiveTab] = useState("customers")
  const [sellModal, setSellModal] = useState(false)
  const [planModal, setPlanModal] = useState(false)
  const [importModal, setImportModal] = useState(false)

  const toggleSellModal = () => setSellModal(!sellModal)
  const togglePlanModal = () => setPlanModal(!planModal)
  const toggleImportModal = () => setImportModal(!importModal)

  const summaryCards = [
    { title: "Active Memberships", value: "0", icon: "bxs-group", class: "bg-green-gradient" },
    { title: "Outstanding Balance", value: "₹0", icon: "bx-trending-up", class: "bg-blue-gradient" },
    { title: "Total Sold", value: "₹0", icon: "bxs-credit-card", class: "bg-pink-gradient" },
    { title: "Total Members", value: "0", icon: "bxs-gift", class: "bg-orange-gradient" },
  ]

  return (
    <React.Fragment>
      <div className="page-content membership-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-user-check text-primary me-2"></i>Memberships
              </h3>
              <p className="text-muted mb-0">Manage membership cards and customer balances</p>
            </div>
            <div className="d-flex gap-2">
              <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={toggleImportModal}>
                <i className="bx bx-import me-1"></i> Import
              </Button>
              <Button color="primary" className="rounded-pill px-3 shadow-primary" onClick={toggleSellModal}>
                <i className="bx bx-cart me-1"></i> Sell Membership
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <Row className="mb-4">
            {summaryCards.map((card, key) => (
              <Col key={key} xl={3} md={6} className="mb-3">
                <Card className={classNames("membership-summary-card border-0 rounded-4 shadow-sm h-100", card.class)}>
                  <CardBody className="p-4 d-flex justify-content-between align-items-start">
                    <div className="text-white">
                      <p className="mb-2 opacity-75 small fw-medium">{card.title}</p>
                      <h3 className="mb-0 fw-bold">{card.value}</h3>
                    </div>
                    <div className="icon-wrapper">
                      <i className={classNames("bx", card.icon)}></i>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Tabs Switcher */}
          <div className="tab-switcher bg-light bg-opacity-50 p-1 rounded-pill d-inline-flex mb-4 border">
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "customers",
                "bg-transparent text-muted": activeTab !== "customers",
              })}
              onClick={() => setActiveTab("customers")}
            >
              Customer Memberships
            </Button>
            <Button
              className={classNames("rounded-pill px-4 py-1 border-0 small fw-bold", {
                "bg-white shadow-sm text-dark": activeTab === "plans",
                "bg-transparent text-muted": activeTab !== "plans",
              })}
              onClick={() => setActiveTab("plans")}
            >
              Membership Plans
            </Button>
          </div>

          {/* Main Content Area */}
          {activeTab === "customers" ? (
            <div className="customers-view">
              <Row className="mb-3 g-2">
                <Col md={5}>
                  <div className="search-box bg-white rounded-pill border px-3 py-2 d-flex align-items-center shadow-sm">
                    <i className="bx bx-search text-muted me-2"></i>
                    <Input type="text" placeholder="Search by name, phone, or plan..." className="border-0 bg-transparent p-0" />
                  </div>
                </Col>
                <Col md={2}>
                  <Input type="select" className="rounded-pill bg-white border shadow-sm px-3 py-2 form-select small h-100">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expired</option>
                    <option>Expiring Soon</option>
                  </Input>
                </Col>
                <Col md={3}>
                  <div className="bg-white rounded-pill border shadow-sm px-3 py-2 d-flex align-items-center h-100">
                    <i className="bx bx-calendar text-muted me-2"></i>
                    <Flatpickr className="form-control border-0 bg-transparent p-0 small" placeholder="Filter by date" />
                  </div>
                </Col>
              </Row>

              <Card className="border-0 rounded-4 shadow-sm main-list-card">
                <CardBody className="py-5 my-4 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                  <i className="bx bx-credit-card display-3 text-muted mb-4"></i>
                  <h4 className="fw-bold text-dark">No memberships found</h4>
                  <p className="text-muted">Start selling memberships to customers</p>
                  <Button color="primary" className="rounded-pill px-4 py-2 mt-2 shadow-primary" onClick={toggleSellModal}>
                    <i className="bx bx-plus me-1"></i> Sell First Membership
                  </Button>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="plans-view">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted small mb-0">Create reusable membership templates that can be quickly selected when selling.</p>
                <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={togglePlanModal}>
                  <i className="bx bx-plus me-1"></i> Create Plan
                </Button>
              </div>

              <Card className="border-0 rounded-4 shadow-sm main-list-card">
                <CardBody className="py-5 my-4 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                  <i className="bx bx-credit-card display-3 text-muted mb-4"></i>
                  <h4 className="fw-bold text-dark">No membership plans</h4>
                  <p className="text-muted">Create plans to quickly sell memberships</p>
                  <Button color="primary" className="rounded-pill px-4 py-2 mt-2 shadow-primary" onClick={togglePlanModal}>
                    <i className="bx bx-plus me-1"></i> Create First Plan
                  </Button>
                </CardBody>
              </Card>
            </div>
          )}
        </Container>

        {/* Sell Membership Modal */}
        <Modal isOpen={sellModal} toggle={toggleSellModal} centered className="membership-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <ModalHeader toggle={toggleSellModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Sell Membership</h4>
                <p className="text-muted small mb-0">Create a new membership for a customer</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <FormGroup className="mb-4">
                <Label className="fw-bold small mb-2">Customer *</Label>
                <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select shadow-purple-focus">
                  <option>Search customer...</option>
                </Input>
              </FormGroup>
              <FormGroup className="mb-4">
                <Label className="fw-bold small mb-2">Membership Name *</Label>
                <Input type="text" placeholder="e.g. Gold Card, Silver Package" className="rounded-4 bg-light border-0 px-3 py-2" />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label className="fw-bold small mb-2">Card Number</Label>
                <Input type="text" placeholder="e.g. MC-001234" className="rounded-4 bg-light border-0 px-3 py-2" />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Type</Label>
                    <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select">
                      <option>Prepaid</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Validity (days)</Label>
                    <Input type="number" placeholder="365" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Price</Label>
                    <Input type="number" placeholder="5000" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Balance</Label>
                    <Input type="text" placeholder="Same as price" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Discount %</Label>
                    <Input type="number" placeholder="10" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleSellModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary">
                Sell Membership
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Create Plan Modal */}
        <Modal isOpen={planModal} toggle={togglePlanModal} centered className="membership-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <ModalHeader toggle={togglePlanModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Create Membership Plan</h4>
                <p className="text-muted small mb-0">Create a reusable membership template</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <FormGroup className="mb-4">
                <Label className="fw-bold small mb-2">Plan Name *</Label>
                <Input type="text" placeholder="e.g. Gold Membership" className="rounded-4 bg-light border-0 px-3 py-2 shadow-purple-focus" />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Type</Label>
                    <Input type="select" className="rounded-4 bg-light border-0 px-3 py-2 form-select">
                      <option>Prepaid</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Validity (days)</Label>
                    <Input type="number" placeholder="365" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Price</Label>
                    <Input type="number" placeholder="5000" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Balance</Label>
                    <Input type="text" placeholder="Same as price" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Discount %</Label>
                    <Input type="number" placeholder="10" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex align-items-center gap-2 mt-2">
                <div className="form-check form-switch form-switch-md">
                  <Input type="switch" role="switch" id="activeStatus" defaultChecked className="custom-switch-purple" />
                </div>
                <Label htmlFor="activeStatus" className="mb-0 small fw-bold">Active</Label>
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={togglePlanModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary">
                Create Plan
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Import Modal */}
        <Modal isOpen={importModal} toggle={toggleImportModal} centered className="membership-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <ModalHeader toggle={toggleImportModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-file fs-4"></i>
                <h4 className="fw-bold mb-0">Import Memberships</h4>
              </div>
              <p className="text-muted small mt-2 mb-0">Upload a file to bulk import memberships</p>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center mb-4">
                <i className="bx bx-upload display-4 text-muted opacity-50 mb-3"></i>
                <p className="text-muted small mb-3">Select a file</p>
                <Button color="primary" className="rounded-pill px-4 py-2 border-primary custom-outline-btn d-flex align-items-center gap-2 mx-auto">
                  <i className="bx bx-upload"></i> Choose File
                </Button>
              </div>
              <Button color="light" className="rounded-pill px-4 py-2 border bg-white small fw-bold d-flex align-items-center gap-2">
                <i className="bx bx-download"></i> Download Template
              </Button>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Membership
