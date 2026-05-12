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

// Styles
import "./products.scss"

const Products = () => {
  const [addModal, setAddModal] = useState(false)
  const [importModal, setImportModal] = useState(false)

  const toggleAddModal = () => setAddModal(!addModal)
  const toggleImportModal = () => setImportModal(!importModal)

  return (
    <React.Fragment>
      <div className="page-content inventory-page dashboard-sans">
        <Container fluid>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark"> <i className="bx bx-cube text-primary me-2"></i>Products</h3>
              <p className="text-muted mb-0">Manage products and stock levels</p>
            </div>
            <div className="d-flex gap-2">
              <Button color="light" className="rounded-pill px-4 bg-white border shadow-sm fw-bold" onClick={toggleImportModal}>
                <i className="bx bx-upload me-2"></i> Import
              </Button>
              <Button color="primary" className="rounded-pill px-4 shadow-primary fw-bold" onClick={toggleAddModal}>
                <i className="bx bx-plus me-1"></i> Add Product
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-box bg-white rounded-pill border px-3 py-2 d-flex align-items-center shadow-sm mb-4" style={{ maxWidth: '500px' }}>
            <i className="bx bx-search text-muted me-2 fs-5"></i>
            <Input type="text" placeholder="Search by name or SKU..." className="border-0 bg-transparent p-0 flex-grow-1" />
          </div>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 custom-table">
                  <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                    <tr>
                      <th className="ps-4" style={{ width: '40px' }}>
                        <i className="bx bx-circle fs-5 opacity-50"></i>
                      </th>
                      <th>Product</th>
                      <th>Cost</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="5" className="py-5 text-center">
                        <div className="empty-state opacity-50">
                          <h6 className="text-muted mb-0">No products found</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">Showing 0-0 of 0 products</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input type="select" className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3" style={{ width: '70px' }}>
                    <option>25</option>
                  </Input>
                </div>
              </div>
              <div className="pagination-controls d-flex align-items-center gap-3">
                <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">Page 1 of 1</span>
                <Button color="light" className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1 opacity-50" disabled>
                  Next <i className="bx bx-chevron-right"></i>
                </Button>
              </div>
            </div>
          </Card>
        </Container>

        {/* Add Product Modal */}
        <Modal isOpen={addModal} toggle={toggleAddModal} centered className="inventory-modal modal-md">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={toggleAddModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Add New Product</h4>
                <p className="text-muted small mb-0">Add a new product to inventory.</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Product Name *</Label>
                    <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">SKU</Label>
                    <Input type="text" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Cost Price</Label>
                    <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Selling Price</Label>
                    <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Stock Quantity</Label>
                    <Input type="number" placeholder="0" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Low Stock Alert At</Label>
                    <Input type="number" placeholder="10" className="rounded-4 bg-light border-0 px-3 py-2" />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary">
                Add Product
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Import CSV Modal */}
        <Modal isOpen={importModal} toggle={toggleImportModal} centered className="inventory-modal modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={toggleImportModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="d-flex align-items-center justify-content-center w-100 mb-2">
                <i className="bx bx-file text-dark fs-4 me-2"></i>
                <h4 className="fw-bold mb-0">Import Inventory</h4>
              </div>
              <p className="text-muted small text-center mb-0 mt-2">
                Upload a xl file to bulk import inventory items. Existing SKUs will be updated.
              </p>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              {/* Template Download Section */}
              <div className="bg-light bg-opacity-50 rounded-4 p-4 mb-4 d-flex justify-content-between align-items-center border">
                <div>
                  <h6 className="fw-bold mb-1">Download Template</h6>
                  <p className="text-muted small mb-0">
                    Required: name. Optional: sku, category, quantity, cost_price, selling_price, reorder_level, supplier, unit
                  </p>
                </div>
                <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white custom-outline-btn d-flex align-items-center">
                  <i className="bx bx-download me-2"></i> Download
                </Button>
              </div>

              {/* Upload Zone */}
              <div className="upload-area rounded-4 p-5 text-center cursor-pointer">
                <i className="bx bx-upload display-4 text-muted mb-3 d-block"></i>
                <p className="text-muted mb-3">Drag and drop or click to upload</p>
                <Button color="light" className="rounded-pill px-4 py-2 bg-white border shadow-sm small fw-medium">
                  Select File
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3 justify-content-end">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleImportModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary opacity-50" disabled>
                <i className="bx bx-upload me-1"></i> Import 0 Items
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Products
