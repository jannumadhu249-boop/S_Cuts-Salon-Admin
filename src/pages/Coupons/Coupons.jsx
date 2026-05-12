import React from "react"
import {
  Container,
  Card,
  CardBody,
  Button,
  Input,
} from "reactstrap"
import { Link } from "react-router-dom"

// Styles
import "./coupons.scss"

const Coupons = () => {
  return (
    <React.Fragment>
      <div className="page-content coupons-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"><i className="bx bx-purchase-tag text-primary me-2"></i>Coupons</h3>
              <p className="text-muted mb-0">Manage discount coupons for your brand</p>
            </div>
            <Link to="/create-coupon">
              <Button color="primary" className="rounded-pill px-4 shadow-primary">
                <i className="bx bx-plus me-1"></i> Create Coupon
              </Button>
            </Link>
          </div>

          {/* Main Card */}
          <Card className="border-0 rounded-4 shadow-sm main-card">
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-purchase-tag fs-4 text-dark"></i>
                <div>
                  <h5 className="fw-bold mb-0">All Coupons</h5>
                  <span className="text-muted small">0 total coupons</span>
                </div>
              </div>
              <div className="search-box bg-light rounded-pill border-0 px-3 py-2 d-flex align-items-center" style={{ width: '300px' }}>
                <i className="bx bx-search text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search coupons..."
                  className="border-0 bg-transparent p-0 form-control"
                />
              </div>
            </div>
            <CardBody className="py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center">
              <div className="empty-state-icon mb-4">
                <i className="bx bx-purchase-tag display-2 text-muted opacity-25"></i>
              </div>
              <h4 className="fw-bold text-dark mb-2">No coupons found</h4>
              <p className="text-muted mb-0">Create your first coupon to get started</p>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Coupons
