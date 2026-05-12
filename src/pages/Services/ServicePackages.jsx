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
import "./services.scss"

const ServicePackages = () => {
  return (
    <React.Fragment>
      <div className="page-content packages-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"><i className="bx bxs-offer text-primary me-2"></i>Service Packages</h3>
              <p className="text-muted mb-0">Create and manage combo packages for services</p>
            </div>
            <Link to="/create-package">
              <Button color="primary" className="rounded-pill px-4 shadow-primary">
                <i className="bx bx-plus me-1"></i> Create Package
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-section mb-4">
            <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3" style={{ maxWidth: '400px' }}>
              <i className="bx bx-search text-muted me-2"></i>
              <Input
                type="text"
                placeholder="Search packages..."
                className="border-0 bg-transparent p-0 form-control"
              />
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="border-0 rounded-4 shadow-sm content-card overflow-hidden">
            <CardBody className="py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center">
              <div className="empty-state-icon mb-4">
                <i className="bx bx-box display-2 text-muted opacity-25"></i>
              </div>
              <h4 className="fw-bold text-dark mb-2">No packages found</h4>
              <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
                Create your first service package to get started
              </p>
              <Link to="/create-package">
                <Button color="primary" className="rounded-pill px-4 shadow-primary">
                  <i className="bx bx-plus me-1"></i> Create Package
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ServicePackages
