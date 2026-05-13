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
    FormGroup,
    Label,
    ModalFooter,
    Alert,
    Spinner,
    UncontrolledTooltip
} from "reactstrap"
import { Link } from "react-router-dom"
import { post, put, del } from "../../helpers/api_helper"
import { URLS } from "../../url"

// Styles
import "./category.scss"

const Category = () => {
    const [modal, setModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalCount, setTotalCount] = useState(0)

    // Form State
    const [currentId, setCurrentId] = useState(null)
    const [name, setName] = useState("")
    const [priority, setPriority] = useState("")
    const [status, setStatus] = useState("active")

    const toggleModal = () => {
        setModal(!modal)
        if (modal) {
            setName("")
            setPriority("")
            setStatus("active")
            setIsEdit(false)
            setCurrentId(null)
        }
    }

    const fetchCategories = useCallback(async (search = "", page = 1, limit = 10) => {
        setLoading(true)
        setError("")
        try {
            // Construct URL with pagination and search parameters
            const url = `${URLS.GetCategory}?search=${search}&page=${page}&limit=${limit}`
            const response = await post(url, {})
            
            if (response.success) {
                setCategories(response.data || [])
                setTotalCount(response.count || 0)
            } else {
                setError(response.message || "Failed to fetch categories")
            }
        } catch (err) {
            setError("An error occurred while fetching categories")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategories(searchTerm, currentPage, rowsPerPage)
    }, [fetchCategories, currentPage, rowsPerPage])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page on search
        fetchCategories(value, 1, rowsPerPage)
    }

    const handleRowsPerPageChange = (e) => {
        const value = parseInt(e.target.value)
        setRowsPerPage(value)
        setCurrentPage(1) // Reset to first page on limit change
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalCount / rowsPerPage)) {
            setCurrentPage(newPage)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        const payload = {
            name,
            priority: priority.toString(),
            status
        }

        try {
            let response
            if (isEdit) {
                response = await put(URLS.UpdateCategory + currentId, payload)
            } else {
                response = await post(URLS.AddCategory, payload)
            }

            if (response.success) {
                setSuccess(response.message || (isEdit ? "Category updated successfully" : "Category added successfully"))
                fetchCategories(searchTerm, currentPage, rowsPerPage)
                toggleModal()
                setTimeout(() => setSuccess(""), 3000)
            } else {
                setError(response.message || "Operation failed")
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (category) => {
        setIsEdit(true)
        setCurrentId(category._id)
        setName(category.name)
        setPriority(category.priority)
        setStatus(category.status || "active")
        setModal(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setLoading(true)
            try {
                const response = await del(URLS.DeleteCategory + id)
                if (response.success) {
                    setSuccess(response.message || "Category deleted successfully")
                    fetchCategories(searchTerm, currentPage, rowsPerPage)
                    setTimeout(() => setSuccess(""), 3000)
                } else {
                    setError(response.message || "Delete failed")
                }
            } catch (err) {
                setError("An error occurred while deleting")
            } finally {
                setLoading(false)
            }
        }
    }

    const totalPages = Math.ceil(totalCount / rowsPerPage) || 1
    const startIndex = (currentPage - 1) * rowsPerPage + 1
    const endIndex = Math.min(currentPage * rowsPerPage, totalCount)

    return (
        <React.Fragment>
            <div className="page-content services-page dashboard-sans">
                <Container fluid>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <div>
                            <h3 className="fw-bold mb-0 text-dark">
                                <i className="bx bx-category text-primary me-2"></i>Category
                            </h3>
                            <p className="text-muted mb-0">Manage your product categories here.</p>
                        </div>
                        <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={toggleModal}>
                            <i className="bx bx-plus me-1"></i> Create Category
                        </Button>
                    </div>

                    {/* Alerts */}
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">{success}</Alert>}

                    {/* Search Bar */}
                    <div className="search-section mb-4">
                        <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3" style={{ maxWidth: '300px' }}>
                            <i className="bx bx-search text-muted me-2"></i>
                            <Input
                                type="text"
                                placeholder="Search Category..."
                                className="border-0 bg-transparent p-0 form-control"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Main Table Card */}
                    <Card className="border-0 rounded-4 shadow-sm table-card overflow-hidden">
                        <div className="table-header-custom border-bottom bg-white px-4 py-3">
                            <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
                                {/* <Col xs={1} className="d-flex align-items-center justify-content-start">
                                    <div className="custom-checkbox">
                                        <Input type="checkbox" id="selectAll" />
                                    </div>
                                </Col> */}
                                <Col xs={1} className="text-center">
                                    Sl. No.
                                </Col>
                                <Col>Category Name</Col>
                                <Col>Priority</Col>
                                <Col>Status</Col>
                                <Col className="text-end">Actions</Col>
                            </Row>
                        </div>

                        <CardBody className="p-0">
                            {loading && categories.length === 0 ? (
                                <div className="text-center py-5">
                                    <Spinner color="primary" />
                                </div>
                            ) : categories.length > 0 ? (
                                <div className="table-responsive">
                                    {categories.map((category, index) => (
                                        <div key={index} className="px-4 py-3 border-bottom table-row-hover">
                                            <Row className="align-items-center">
                                                {/* <Col xs={1}>
                                                    <div className="custom-checkbox">
                                                        <Input type="checkbox" id={`check-${index}`} />
                                                    </div>
                                                </Col> */}
                                                <Col xs={1} className="text-center fw-medium text-muted small">
                                                    {startIndex + index}
                                                </Col>
                                                <Col className="fw-medium text-dark">{category.name}</Col>
                                                <Col>
                                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                                        {category.priority}
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <span className={`badge rounded-pill px-3 py-2 ${category.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                        {category.status || 'inactive'}
                                                    </span>
                                                </Col>
                                                <Col className="text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <Button
                                                            color="light"
                                                            size="md"
                                                            className="rounded-circle border-0"
                                                            onClick={() => handleEdit(category)}
                                                            id={`edit-${index}`}
                                                        >
                                                            <i className="bx bx-edit-alt text-primary"></i>
                                                        </Button>
                                                        <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                                                            Edit
                                                        </UncontrolledTooltip>

                                                        <Button
                                                            color="light"
                                                            size="md"
                                                            className="rounded-circle border-0"
                                                            onClick={() => handleDelete(category._id)}
                                                            id={`delete-${index}`}
                                                        >
                                                            <i className="bx bx-trash text-danger"></i>
                                                        </Button>
                                                        <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                                                            Delete
                                                        </UncontrolledTooltip>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="empty-state-wrapper py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                                    <div className="icon-circle mb-4">
                                        <i className="bx bx-file display-4 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold text-dark mb-2">No Category found</h5>
                                    <p className="text-muted small">Create a new category to get started.</p>
                                </div>
                            )}
                        </CardBody>

                        {/* Pagination Footer */}
                        <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-muted small">
                                    Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} Category
                                </span>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-muted small">Rows per page:</span>
                                    <Input
                                        type="select"
                                        className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-white"
                                        style={{ width: '70px' }}
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                    >
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </Input>
                                </div>
                            </div>

                            <div className="pagination-controls d-flex align-items-center gap-3">
                                <Button 
                                    color="light" 
                                    className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1" 
                                    disabled={currentPage === 1 || loading}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <i className="bx bx-chevron-left"></i> Previous
                                </Button>
                                <span className="text-muted small fw-medium">Page {currentPage} of {totalPages}</span>
                                <Button 
                                    color="light" 
                                    className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1" 
                                    disabled={currentPage === totalPages || loading}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next <i className="bx bx-chevron-right"></i>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Container>

                {/* Add/Edit Category Modal */}
                <Modal isOpen={modal} toggle={toggleModal} centered className="inventory-modal modal-md">
                    <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
                        <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
                            <div className="text-center w-100">
                                <h4 className="fw-bold mb-1">{isEdit ? "Update Category" : "Add New Category"}</h4>
                                <p className="text-muted small mb-0">
                                    {isEdit ? "Update the details of the category." : "Fill in the details to add a new Category."}
                                </p>
                            </div>
                        </ModalHeader>

                        <hr className="my-0 opacity-10 mx-4" />

                        <form onSubmit={handleSubmit}>
                            <ModalBody className="px-5 py-4">
                                <Row className="g-3">
                                    <Col md={12}>
                                        <FormGroup className="mb-3">
                                            <Label className="fw-bold small mb-2">
                                                Category Name <span className="text-danger">*</span>
                                            </Label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., Men's"
                                                className="rounded-3 bg-light border-0 px-3 py-2 custom-focus-purple"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="g-3">
                                    <Col md={6}>
                                        <FormGroup className="mb-0">
                                            <Label className="fw-bold small mb-2">
                                                Priority <span className="text-danger">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                className="rounded-3 bg-light border-0 px-3 py-2 custom-focus-purple"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-0">
                                            <Label className="fw-bold small mb-2">Status</Label>
                                            <Input
                                                type="select"
                                                className="rounded-3 bg-light border-0 px-3 py-2"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </ModalBody>

                            <hr className="my-0 opacity-10 mx-4" />

                            <ModalFooter className="border-0 px-5 pb-5 pt-4 gap-3">
                                <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleModal} type="button">
                                    Cancel
                                </Button>
                                <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" type="submit" disabled={loading}>
                                    {loading ? <Spinner size="sm" /> : isEdit ? "Update Category" : "Add Category"}
                                </Button>
                            </ModalFooter>
                        </form>
                    </div>
                </Modal>
            </div>
        </React.Fragment>
    )
}

export default Category
