import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input
} from "reactstrap"
import { Link } from "react-router-dom"

// Styles
import "./services.scss"

const Services = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return (
    <React.Fragment>
      <div className="page-content services-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="mb-4 mt-2">
            <h3 className="fw-bold mb-0 text-dark"><i className="bx bx-service text-primary me-2"></i>Services</h3>
            <p className="text-muted mb-0">Manage availability and pricing for this branch.</p>
          </div>

          {/* Search Bar */}
          <div className="search-section mb-4">
            <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3" style={{ maxWidth: '400px' }}>
              <i className="bx bx-search text-muted me-2"></i>
              <Input
                type="text"
                placeholder="Search services..."
                className="border-0 bg-transparent p-0 form-control"
              />
            </div>
          </div>

          {/* Main Table Card */}
          <Card className="border-0 rounded-4 shadow-sm table-card overflow-hidden">
            <div className="table-header-custom border-bottom bg-white px-4 py-3">
              <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
                <Col xs={1} className="d-flex align-items-center justify-content-start">
                  <div className="custom-checkbox">
                    <Input type="checkbox" id="selectAll" />
                  </div>
                </Col>
                <Col xs={5}>Service Name</Col>
                <Col xs={2}>Price</Col>
                <Col xs={2}>Status</Col>
                <Col xs={2} className="text-end">Actions</Col>
              </Row>
            </div>

            <CardBody className="p-0">
              {/* Empty State */}
              <div className="empty-state-wrapper py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                <div className="icon-circle mb-4">
                  <i className="bx bx-file display-4 text-muted"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">No services found</h5>
                <p className="text-muted small">Ask your Brand Admin to import services.</p>
              </div>
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">Showing 0-0 of 0 services</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input 
                    type="select" 
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-white" 
                    style={{ width: '70px' }}
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(e.target.value)}
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </Input>
                </div>
              </div>
              
              <div className="pagination-controls d-flex align-items-center gap-3">
                <Button color="light" className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1 opacity-50" disabled>
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">Page 1 of 1</span>
                <Button color="light" className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1 opacity-50" disabled>
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

export default Services
