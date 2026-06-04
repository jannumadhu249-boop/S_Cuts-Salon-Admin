import React, { useState, useEffect, useCallback } from "react"
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
  Spinner,
  Badge,
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { post, put, del } from "../../helpers/api_helper"
import { URLS } from "../../url"
import { toast } from "react-toastify"
import "./products.scss"


const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    SKU: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
    lowStockAlert: "",
    image: null
  })
  const [previewUrl, setPreviewUrl] = useState("")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleAddModal = () => {
    setAddModal(!addModal)
    if (addModal) {
      resetForm()
    }
  }
  const toggleImportModal = () => setImportModal(!importModal)

  const resetForm = () => {
    setFormData({
      productName: "",
      categoryId: "",
      SKU: "",
      costPrice: "",
      sellingPrice: "",
      stockQuantity: "",
      lowStockAlert: "",
      image: null
    })
    setPreviewUrl("")
    setIsEdit(false)
    setCurrentProduct(null)
  }

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const url = `${URLS.GetAllProducts}?page=${currentPage}&limit=${pageSize}${searchTerm ? `&search=${searchTerm}` : ""}`
      const response = await post(url, {})
      if (response.success) {
        setProducts(response.data || [])
        setTotalPages(response.totalPages || 1)
        setTotalRecords(response.totalRecords || 0)
      } else {
        toast.error(response.message || "Failed to fetch products")
      }
    } catch (error) {
      toast.error("An error occurred while fetching products")
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, searchTerm])

  const fetchCategories = useCallback(async () => {
    try {
      // Trying GetCategory which is more likely to return all categories
      const response = await post(URLS.GetCategory, {})
      if (response.success) {
        setCategories(response.data || [])
      } else {
        // Fallback to GetActiveCategories if GetCategory fails
        const activeResponse = await post(URLS.GetActiveCategories, {})
        if (activeResponse.success) {
          setCategories(activeResponse.data || [])
        }
      }
    } catch (error) {
      console.error("Error fetching categories", error)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key])
      }
    })

    try {
      let response
      if (isEdit) {
        response = await put(URLS.UpdateProducts + currentProduct._id, data)
      } else {
        response = await post(URLS.AddProducts, data)
      }

      if (response.success) {
        toast.success(response.message || `Product ${isEdit ? "updated" : "added"} successfully`)
        toggleAddModal()
        fetchProducts()
      } else {
        toast.error(response.message || "Operation failed")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleEdit = (product) => {
    setIsEdit(true)
    setCurrentProduct(product)
    setFormData({
      productName: product.productName || "",
      categoryId: product.categoryId || "",
      SKU: product.SKU || "",
      costPrice: product.costPrice || "",
      sellingPrice: product.sellingPrice || "",
      stockQuantity: product.stockQuantity || "",
      lowStockAlert: product.lowStockAlert || "",
      image: null
    })
    setPreviewUrl(product.image ? URLS.ImageUrl + product.image : "")
    setAddModal(true)
  }

  const handleDelete = (product) => {
    setProductToDelete(product)
    setDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await del(URLS.DeleteProducts + productToDelete._id)
      if (response.success) {
        toast.success(response.message || "Product deleted successfully")
        fetchProducts()
      } else {
        toast.error(response.message || "Failed to delete product")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setDeleteModal(false)
      setProductToDelete(null)
    }
  }

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
            <Input
              type="text"
              placeholder="Search by name or SKU..."
              className="border-0 bg-transparent p-0 flex-grow-1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card overflow-hidden">
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 custom-table">
                  <thead className="bg-light bg-opacity-50 text-muted small text-uppercase fw-bold ls-1">
                    <tr>
                      <th className="ps-4">
                        Sl.No.
                      </th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Cost</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={product._id}>
                          <td className="ps-4" style={{ width: '40px' }}>
                            <span className="text-muted small">{(currentPage - 1) * pageSize + index + 1}</span>
                          </td>
                          <td>
                            <div className="product-img rounded-3 bg-light overflow-hidden" style={{ width: 40, height: 40 }}>
                              {product.image ? (
                                <img src={URLS.ImageUrl + product.image} alt="" className="w-100 h-100 object-fit-cover" />
                              ) : (
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                  <i className="bx bx-image text-muted"></i>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <h6 className="fw-bold mb-0 text-dark">{product.productName}</h6>
                              <span className="text-muted extra-small">SKU: {product.SKU || 'N/A'} | {product.categoryName}</span>
                            </div>
                          </td>
                          <td className="fw-medium text-muted">₹{product.costPrice}</td>
                          <td className="fw-bold text-dark">₹{product.sellingPrice}</td>
                          <td>
                            <Badge
                              color={product.stockQuantity <= (product.lowStockAlert || 10) ? "danger" : "success"}
                              className="rounded-pill px-2 py-1"
                            >
                              {product.stockQuantity} In Stock
                            </Badge>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-3">

                              <button
                                type="button"
                                title="Edit"
                                className="border-0 bg-transparent p-0"
                                onClick={() => handleEdit(product)}
                              >
                                <i className="bx bx-edit-alt text-primary fs-5"></i>
                              </button>

                              <button
                                type="button"
                                title="Delete"
                                className="border-0 bg-transparent p-0"
                                onClick={() => handleDelete(product)}
                              >
                                <i className="bx bx-trash text-danger fs-5"></i>
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-5 text-center">
                          <div className="empty-state opacity-50">
                            <i className="bx bx-package display-4 mb-3 d-block"></i>
                            <h6 className="text-muted mb-0">No products found</h6>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer border-top px-4 py-3 d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {Math.min((currentPage - 1) * pageSize + 1, totalRecords)} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} products
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Rows per page:</span>
                  <Input
                    type="select"
                    className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-light px-3"
                    style={{ width: '80px' }}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value))
                      setCurrentPage(1)
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </Input>
                </div>
              </div>
              <div className="pagination-controls d-flex align-items-center gap-3">
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1"
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <i className="bx bx-chevron-left"></i> Previous
                </Button>
                <span className="text-muted small fw-medium">Page {currentPage} of {totalPages}</span>
                <Button
                  color="light"
                  className="rounded-pill px-3 py-1 bg-white border small d-flex align-items-center gap-1"
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
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
                <h4 className="fw-bold mb-1">{isEdit ? "Update Product" : "Add New Product"}</h4>
                <p className="text-muted small mb-0">{isEdit ? "Modify existing product details." : "Add a new product to inventory."}</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              <Row>
                <Col md={12}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Category *</Label>
                    <Input
                      type="select"
                      name="categoryId"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name || cat.categoryName || "Unnamed Category"}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Product Name *</Label>
                    <Input
                      type="text"
                      name="productName"
                      className="rounded-4 bg-light border-0 px-3 py-2 custom-focus-purple"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">SKU</Label>
                    <Input
                      type="text"
                      name="SKU"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.SKU}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Cost Price</Label>
                    <Input
                      type="number"
                      name="costPrice"
                      placeholder="0"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.costPrice}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-4">
                    <Label className="fw-bold small mb-2">Selling Price</Label>
                    <Input
                      type="number"
                      name="sellingPrice"
                      placeholder="0"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Stock Quantity</Label>
                    <Input
                      type="number"
                      name="stockQuantity"
                      placeholder="0"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mb-0">
                    <Label className="fw-bold small mb-2">Low Stock Alert At</Label>
                    <Input
                      type="number"
                      name="lowStockAlert"
                      placeholder="10"
                      className="rounded-4 bg-light border-0 px-3 py-2"
                      value={formData.lowStockAlert}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12}>
                  <Label className="fw-bold small mb-2">
                    Product Image
                  </Label>
                  <div className="d-flex align-items-center gap-3">
                    {/* Custom file upload button */}
                    <div className="file-upload-wrapper position-relative">
                      <Button color="light" className="rounded-3 px-4 py-2 bg-white border">
                        <i className="bx bx-upload me-1"></i> Choose Image
                      </Button>
                      <Input
                        type="file"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    {/* Image preview placeholder */}
                    <div className="image-preview-placeholder bg-light d-flex align-items-center justify-content-center rounded-3 overflow-hidden"
                      style={{ width: 64, height: 64, border: '1px dashed #dee2e6' }}>
                      {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-100 h-100 object-fit-cover" />
                      ) : (
                        <i className="bx bx-image text-muted fs-4"></i>
                      )}
                    </div>
                  </div>
                  <small className="text-muted">Supported formats: JPG, PNG. Max size: 2MB.</small>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleAddModal}>
                Cancel
              </Button>
              <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" onClick={handleSubmit}>
                {isEdit ? "Update Product" : "Add Product"}
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* Import CSV Modal */}
        <Modal isOpen={importModal} toggle={toggleImportModal} centered className="inventory-modal modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            {/* <ModalHeader toggle={toggleImportModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="d-flex align-items-center justify-content-center w-100 mb-2">
                <i className="bx bx-file text-dark fs-4 me-2"></i>
                <h4 className="fw-bold mb-0">Import Inventory</h4>
              </div>
              <p className="text-muted small text-center mb-0 mt-2">
                Upload a xl file to bulk import inventory items. Existing SKUs will be updated.
              </p>
            </ModalHeader> */}
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

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)} centered>
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <ModalHeader toggle={() => setDeleteModal(false)} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
              <div className="text-center w-100">
                <div className="icon-circle bg-danger bg-opacity-10 text-danger mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px' }}>
                  <i className="bx bx-trash fs-2"></i>
                </div>
                <h4 className="fw-bold mb-1">Are you sure?</h4>
                <p className="text-muted small mb-0">You won't be able to revert this!</p>
              </div>
            </ModalHeader>
            <ModalFooter className="border-0 px-5 pb-5 pt-4 gap-3 justify-content-center">
              <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button color="danger" className="rounded-pill px-4 py-2 fw-bold shadow-sm" onClick={confirmDelete}>
                Yes, delete it!
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Products
