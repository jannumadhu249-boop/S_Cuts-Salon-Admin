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
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import classNames from "classnames"
import { Link } from "react-router-dom"

// Styles
import "./invoices.scss"

const InvoiceBilling = () => {
  const [importModal, setImportModal] = useState(false)
  const [dateFilter, setDateFilter] = useState("alltime")
  const [status, setStatus] = useState("all")

  const toggleImportModal = () => setImportModal(!importModal)

  const summaryCards = [
    { title: "Total Invoices", value: "0", icon: "bx-receipt", class: "invoices" },
    { title: "Total Revenue", value: "₹0.00", icon: "bx-rupee", class: "revenue" },
    { title: "Total Discounts", value: "₹0.00", icon: "bx-purchase-tag", class: "discounts" },
    { title: "Total Tips", value: "₹0.00", icon: "bx-gift", class: "tips" },
    { title: "Total Pending", value: "₹0.00", icon: "bx-time-five", class: "pending" },
  ]

  const dateFilters = [
    { label: "All Time", id: "alltime" },
    { label: "Today", id: "today" },
    { label: "Yesterday", id: "yesterday" },
    { label: "This Week", id: "thisweek" },
    { label: "This Month", id: "thismonth" },
    { label: "Last 7 Days", id: "last7days" },
    { label: "Last 30 Days", id: "last30days" },
  ]

  return (
    <React.Fragment>
      <div className="page-content invoices-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">Invoices & Billing</h3>
              <p className="text-muted mb-0">View all invoices and billing history</p>
            </div>
            <div className="d-flex gap-2">
              <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm">
                <i className="bx bx-export me-1"></i> Export
              </Button>
              <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={toggleImportModal}>
                <i className="bx bx-import me-1"></i> Import
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <Row className="mb-4 g-3">
            {summaryCards.map((card, key) => (
              <Col key={key} className="col-xl-2-4 col-md-4 col-12">
                <Card className={classNames("invoice-summary-card border-0 rounded-4 shadow-sm h-100", card.class)}>
                  <CardBody className="p-3 d-flex align-items-center gap-3">
                    <div className="icon-wrapper d-flex align-items-center justify-content-center">
                      <i className={classNames("bx", card.icon)}></i>
                    </div>
                    <div>
                      <p className="mb-0 text-muted small fw-medium">{card.title}</p>
                      <h5 className="mb-0 fw-bold text-dark">{card.value}</h5>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Filters Section */}
          <Card className="border-0 rounded-4 shadow-sm mb-4">
            <CardBody className="p-4">
              <Row className="mb-3 g-3">
                <Col md={10}>
                  <div className="search-box bg-light rounded-pill border-0 px-4 py-2 d-flex align-items-center">
                    <i className="bx bx-search text-muted me-2"></i>
                    <Input
                      type="text"
                      placeholder="Search by invoice # or customer name..."
                      className="border-0 bg-transparent p-0 form-control"
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <Input type="select" className="rounded-pill bg-light border-0 px-3 py-2 form-select shadow-sm h-100">
                    <option>All Statuses</option>
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </Input>
                </Col>
              </Row>

              <div className="date-filters-bar d-flex align-items-center flex-wrap gap-2">
                <span className="text-muted small me-2">Date:</span>
                {dateFilters.map(filter => (
                  <Button
                    key={filter.id}
                    className={classNames("rounded-pill border-0 px-3 py-1 small fw-medium", {
                      "bg-primary text-white": dateFilter === filter.id,
                      "bg-light text-muted": dateFilter !== filter.id,
                    })}
                    onClick={() => setDateFilter(filter.id)}
                  >
                    {filter.label}
                  </Button>
                ))}
                <div className="custom-date-wrapper position-relative">
                  <Button 
                    className={classNames("rounded-pill border-0 px-3 py-1 small fw-medium d-flex align-items-center gap-1", {
                      "bg-primary text-white": dateFilter === "custom",
                      "bg-light text-muted": dateFilter !== "custom",
                    })}
                    onClick={() => setDateFilter("custom")}
                  >
                    <i className="bx bx-calendar"></i> Custom
                  </Button>
                  {dateFilter === "custom" && (
                    <div className="flatpickr-popover position-absolute mt-2 shadow-lg rounded-4 overflow-hidden z-3" style={{ top: '100%', left: 0 }}>
                      <Flatpickr
                        options={{ mode: "range", inline: true, dateFormat: "M j, Y" }}
                        className="d-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card">
            <CardBody className="py-5">
              <div className="text-center py-5 opacity-50">
                <i className="bx bx-receipt display-3 mb-3 text-muted"></i>
                <h4 className="fw-bold">No invoices found</h4>
                <p className="text-muted">Invoices will appear here once created in the POS.</p>
              </div>
            </CardBody>
          </Card>
        </Container>

        {/* Import Invoices Modal */}
        <Modal isOpen={importModal} toggle={toggleImportModal} centered className="invoice-modal import-modal modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <ModalHeader toggle={toggleImportModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-file text-dark fs-4"></i>
                <h4 className="fw-bold mb-0">Import Invoices</h4>
              </div>
              <p className="text-muted small mt-1 mb-0 ps-4">
                Upload a file to bulk import invoices. Services are matched by name, staff by name, and customers by phone number.
              </p>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              {/* Template Download Section */}
              <div className="bg-light rounded-4 p-4 d-flex justify-content-between align-items-center mb-4 border">
                <div>
                  <h6 className="fw-bold mb-1">Download Template</h6>
                  <p className="text-muted small mb-0">Required: customer_name, total_amount. Optional: phone, items, staff_name, date, etc.</p>
                </div>
                <Button color="primary" outline className="rounded-pill px-4 py-2 border-primary d-flex align-items-center gap-2 custom-outline-btn">
                  <i className="bx bx-download"></i> Download
                </Button>
              </div>

              {/* Upload Section */}
              <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center cursor-pointer mb-4">
                <div className="mb-3">
                  <i className="bx bx-upload display-4 text-muted opacity-50"></i>
                </div>
                <p className="text-muted mb-3">Click to upload a file</p>
                <Button color="light" className="rounded-pill px-4 py-2 border fw-medium bg-white">
                  Select File
                </Button>
                <input type="file" className="d-none" />
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleImportModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-medium shadow-primary opacity-50" disabled>
                Import 0 Invoices
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default InvoiceBilling
