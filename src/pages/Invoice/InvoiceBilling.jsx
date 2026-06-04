// import React, { useState } from "react"
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   Input,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap"
// import Flatpickr from "react-flatpickr"
// import classNames from "classnames"
// import { Link } from "react-router-dom"

// // Styles
// import "./invoices.scss"

// const InvoiceBilling = () => {
//   const [importModal, setImportModal] = useState(false)
//   const [dateFilter, setDateFilter] = useState("alltime")
//   const [status, setStatus] = useState("all")

//   const toggleImportModal = () => setImportModal(!importModal)

//   const summaryCards = [
//     { title: "Total Invoices", value: "0", icon: "bx-receipt", class: "invoices" },
//     { title: "Total Revenue", value: "₹0.00", icon: "bx-rupee", class: "revenue" },
//     { title: "Total Discounts", value: "₹0.00", icon: "bx-purchase-tag", class: "discounts" },
//     { title: "Total Tips", value: "₹0.00", icon: "bx-gift", class: "tips" },
//     { title: "Total Pending", value: "₹0.00", icon: "bx-time-five", class: "pending" },
//   ]

//   const dateFilters = [
//     { label: "All Time", id: "alltime" },
//     { label: "Today", id: "today" },
//     { label: "Yesterday", id: "yesterday" },
//     { label: "This Week", id: "thisweek" },
//     { label: "This Month", id: "thismonth" },
//     { label: "Last 7 Days", id: "last7days" },
//     { label: "Last 30 Days", id: "last30days" },
//   ]

//   return (
//     <React.Fragment>
//       <div className="page-content invoices-page dashboard-sans">
//         <Container fluid>
//           {/* Header */}
//           <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
//             <div>
//               <h3 className="fw-bold mb-0 text-dark">Invoices & Billing</h3>
//               <p className="text-muted mb-0">View all invoices and billing history</p>
//             </div>
//             <div className="d-flex gap-2">
//               <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm">
//                 <i className="bx bx-export me-1"></i> Export
//               </Button>
//               <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={toggleImportModal}>
//                 <i className="bx bx-import me-1"></i> Import
//               </Button>
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <Row className="mb-4 g-3">
//             {summaryCards.map((card, key) => (
//               <Col key={key} className="col-xl-2-4 col-md-4 col-12">
//                 <Card className={classNames("invoice-summary-card border-0 rounded-4 shadow-sm h-100", card.class)}>
//                   <CardBody className="p-3 d-flex align-items-center gap-3">
//                     <div className="icon-wrapper d-flex align-items-center justify-content-center">
//                       <i className={classNames("bx", card.icon)}></i>
//                     </div>
//                     <div>
//                       <p className="mb-0 text-muted small fw-medium">{card.title}</p>
//                       <h5 className="mb-0 fw-bold text-dark">{card.value}</h5>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Filters Section */}
//           <Card className="border-0 rounded-4 shadow-sm mb-4">
//             <CardBody className="p-4">
//               <Row className="mb-3 g-3">
//                 <Col md={10}>
//                   <div className="search-box bg-light rounded-pill border-0 px-4 py-2 d-flex align-items-center">
//                     <i className="bx bx-search text-muted me-2"></i>
//                     <Input
//                       type="text"
//                       placeholder="Search by invoice # or customer name..."
//                       className="border-0 bg-transparent p-0 form-control"
//                     />
//                   </div>
//                 </Col>
//                 <Col md={2}>
//                   <Input type="select" className="rounded-pill bg-light border-0 px-3 py-2 form-select shadow-sm h-100">
//                     <option>All Statuses</option>
//                     <option>Paid</option>
//                     <option>Pending</option>
//                     <option>Cancelled</option>
//                   </Input>
//                 </Col>
//               </Row>

//               <div className="date-filters-bar d-flex align-items-center flex-wrap gap-2">
//                 <span className="text-muted small me-2">Date:</span>
//                 {dateFilters.map(filter => (
//                   <Button
//                     key={filter.id}
//                     className={classNames("rounded-pill border-0 px-3 py-1 small fw-medium", {
//                       "bg-primary text-white": dateFilter === filter.id,
//                       "bg-light text-muted": dateFilter !== filter.id,
//                     })}
//                     onClick={() => setDateFilter(filter.id)}
//                   >
//                     {filter.label}
//                   </Button>
//                 ))}
//                 <div className="custom-date-wrapper position-relative">
//                   <Button 
//                     className={classNames("rounded-pill border-0 px-3 py-1 small fw-medium d-flex align-items-center gap-1", {
//                       "bg-primary text-white": dateFilter === "custom",
//                       "bg-light text-muted": dateFilter !== "custom",
//                     })}
//                     onClick={() => setDateFilter("custom")}
//                   >
//                     <i className="bx bx-calendar"></i> Custom
//                   </Button>
//                   {dateFilter === "custom" && (
//                     <div className="flatpickr-popover position-absolute mt-2 shadow-lg rounded-4 overflow-hidden z-3" style={{ top: '100%', left: 0 }}>
//                       <Flatpickr
//                         options={{ mode: "range", inline: true, dateFormat: "M j, Y" }}
//                         className="d-none"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>

//           {/* Main List Card */}
//           <Card className="border-0 rounded-4 shadow-sm main-list-card">
//             <CardBody className="py-5">
//               <div className="text-center py-5 opacity-50">
//                 <i className="bx bx-receipt display-3 mb-3 text-muted"></i>
//                 <h4 className="fw-bold">No invoices found</h4>
//                 <p className="text-muted">Invoices will appear here once created in the POS.</p>
//               </div>
//             </CardBody>
//           </Card>
//         </Container>

//         {/* Import Invoices Modal */}
//         <Modal isOpen={importModal} toggle={toggleImportModal} centered className="invoice-modal import-modal modal-lg">
//           <div className="modal-content border-0 rounded-4 shadow-lg">
//             <ModalHeader toggle={toggleImportModal} className="border-0 pb-0 px-4 pt-4">
//               <div className="d-flex align-items-center gap-2">
//                 <i className="bx bx-file text-dark fs-4"></i>
//                 <h4 className="fw-bold mb-0">Import Invoices</h4>
//               </div>
//               <p className="text-muted small mt-1 mb-0 ps-4">
//                 Upload a file to bulk import invoices. Services are matched by name, staff by name, and customers by phone number.
//               </p>
//             </ModalHeader>
//             <ModalBody className="px-5 py-4">
//               {/* Template Download Section */}
//               <div className="bg-light rounded-4 p-4 d-flex justify-content-between align-items-center mb-4 border">
//                 <div>
//                   <h6 className="fw-bold mb-1">Download Template</h6>
//                   <p className="text-muted small mb-0">Required: customer_name, total_amount. Optional: phone, items, staff_name, date, etc.</p>
//                 </div>
//                 <Button color="primary" outline className="rounded-pill px-4 py-2 border-primary d-flex align-items-center gap-2 custom-outline-btn">
//                   <i className="bx bx-download"></i> Download
//                 </Button>
//               </div>

//               {/* Upload Section */}
//               <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center cursor-pointer mb-4">
//                 <div className="mb-3">
//                   <i className="bx bx-upload display-4 text-muted opacity-50"></i>
//                 </div>
//                 <p className="text-muted mb-3">Click to upload a file</p>
//                 <Button color="light" className="rounded-pill px-4 py-2 border fw-medium bg-white">
//                   Select File
//                 </Button>
//                 <input type="file" className="d-none" />
//               </div>
//             </ModalBody>
//             <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
//               <Button color="light" className="rounded-pill px-5 py-2 fw-medium bg-light border-0" onClick={toggleImportModal}>
//                 Cancel
//               </Button>
//               <Button color="primary" className="rounded-pill px-4 py-2 fw-medium shadow-primary opacity-50" disabled>
//                 Import 0 Invoices
//               </Button>
//             </ModalFooter>
//           </div>
//         </Modal>
//       </div>
//     </React.Fragment>
//   )
// }

// export default InvoiceBilling








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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import classNames from "classnames"
import { Link } from "react-router-dom"
import { post } from "../../helpers/api_helper"
import { URLS } from "../../url"
import * as XLSX from "xlsx";

// Styles
import "./invoices.scss"

// ---------- Helpers ----------
const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getDateRangeFromFilter = (filter, customRange = null) => {
  // Returns { fromDate, toDate } for the given filter name
  if (filter === "custom" && customRange && customRange.length === 2) {
    return {
      fromDate: formatDate(customRange[0]),
      toDate: formatDate(customRange[1]),
    }
  }

  const today = new Date()
  switch (filter) {
    case "today":
      return {
        fromDate: formatDate(today),
        toDate: formatDate(today),
      }
    case "yesterday": {
      const yest = new Date(today)
      yest.setDate(yest.getDate() - 1)
      return {
        fromDate: formatDate(yest),
        toDate: formatDate(yest),
      }
    }
    case "thisweek": {
      const start = new Date(today)
      const day = start.getDay() // 0=Sun
      const diffToMonday = day === 0 ? -6 : 1 - day
      start.setDate(start.getDate() + diffToMonday)
      const end = new Date(start)
      end.setDate(end.getDate() + 6)
      return {
        fromDate: formatDate(start),
        toDate: formatDate(end),
      }
    }
    case "thismonth": {
      const start = new Date(today.getFullYear(), today.getMonth(), 1)
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      return {
        fromDate: formatDate(start),
        toDate: formatDate(end),
      }
    }
    case "last7days": {
      const start = new Date(today)
      start.setDate(start.getDate() - 6)
      return {
        fromDate: formatDate(start),
        toDate: formatDate(today),
      }
    }
    case "last30days": {
      const start = new Date(today)
      start.setDate(start.getDate() - 29)
      return {
        fromDate: formatDate(start),
        toDate: formatDate(today),
      }
    }
    case "alltime":
    default:
      return { fromDate: "", toDate: "" }
  }
}

// ---------- Component ----------
const InvoiceBilling = () => {
  // State for filters
  const [dateFilter, setDateFilter] = useState("alltime")
  const [customDateRange, setCustomDateRange] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [exporting, setExporting] = useState(false);

  // Data & UI state
  const [summary, setSummary] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    totalDiscounts: 0,
    totalTips: 0,
    totalPending: 0,
  })
  const [invoices, setInvoices] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [importModal, setImportModal] = useState(false)

  // Fetch invoices data
  const fetchInvoices = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)

    const { fromDate, toDate } = getDateRangeFromFilter(dateFilter, customDateRange)

    try {
      const url = `${URLS.GetInvoices}?page=${page}&limit=${pagination.limit}&search=${encodeURIComponent(searchTerm)}`
      const response = await post(url, {
        fromDate,
        toDate,
        paymentStatus,
      })

      if (response.success) {
        const { dashboard, data, pagination: pag } = response
        setSummary(dashboard || { totalInvoices: 0, totalRevenue: 0, totalDiscounts: 0, totalTips: 0, totalPending: 0 })
        setInvoices(data || [])
        setPagination(pag || { currentPage: 1, totalPages: 1, totalCount: 0, limit: 10 })
      } else {
        setError(response.message || "Failed to fetch invoices")
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [dateFilter, customDateRange, searchTerm, paymentStatus, pagination.limit])

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchInvoices(1) // always reset to page 1 when filters change
  }, [fetchInvoices]) // fetchInvoices dependency changes when any filter changes

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInvoices(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return
    fetchInvoices(page)
  }

  const toggleImportModal = () => setImportModal(!importModal)

    // ---------- Export Functionality (XLSX) ----------
  const handleExport = async () => {
    setExporting(true);
    try {
      const { fromDate, toDate } = getDateRangeFromFilter(dateFilter, customDateRange);

      const response = await post(URLS.ExportInvoices, {
        fromDate,
        toDate,
        paymentStatus,
      });

      if (response.success && response.data) {
        // Prepare data for Excel
        const excelData = response.data.map((inv) => ({
          "Invoice #": inv._id?.slice(-8).toUpperCase() || "N/A",
          Customer: inv.customer?.name || inv.customer?.phone || "",
          Items: inv.items.map((it) => `${it.itemName} x${it.quantity}`).join("; "),
          "Sub Total": inv.subTotal.toFixed(2),
          Discount: inv.discountAmount.toFixed(2),
          Tip: inv.tipAmount.toFixed(2),
          "Grand Total": inv.grandTotal.toFixed(2),
          "Payment Status": inv.paymentStatus,
          Date: inv.logCreatedDate
            ? new Date(inv.logCreatedDate).toLocaleDateString()
            : "",
        }));

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Invoices");

        // Generate buffer and trigger download
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute(
          "download",
          `invoices_${fromDate || "all"}_${toDate || "all"}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert("Export failed: " + (response.message || "No data received"));
      }
    } catch (err) {
      alert("Export failed: " + (err.message || "Network error"));
    } finally {
      setExporting(false);
    }
  };

  // Date filter buttons
  const dateFilters = [
    { label: "All Time", id: "alltime" },
    { label: "Today", id: "today" },
    { label: "Yesterday", id: "yesterday" },
    { label: "This Week", id: "thisweek" },
    { label: "This Month", id: "thismonth" },
    { label: "Last 7 Days", id: "last7days" },
    { label: "Last 30 Days", id: "last30days" },
  ]

  // Summary cards
  const summaryCards = [
    { title: "Total Invoices", value: summary.totalInvoices, icon: "bx-receipt", class: "invoices" },
    { title: "Total Revenue", value: `₹${summary.totalRevenue.toFixed(2)}`, icon: "bx-rupee", class: "revenue" },
    { title: "Total Discounts", value: `₹${summary.totalDiscounts.toFixed(2)}`, icon: "bx-purchase-tag", class: "discounts" },
    { title: "Total Tips", value: `₹${summary.totalTips.toFixed(2)}`, icon: "bx-gift", class: "tips" },
    { title: "Total Pending", value: `₹${summary.totalPending.toFixed(2)}`, icon: "bx-time-five", class: "pending" },
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
              <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={handleExport} disabled={exporting}>
                <i className="bx bx-export me-1"></i> Export
              </Button>
              {/* <Button color="light" className="rounded-pill px-3 bg-white border shadow-sm" onClick={toggleImportModal}>
                <i className="bx bx-import me-1"></i> Import
              </Button> */}
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
                <Col md={8}>
                  <div className="search-box bg-light rounded-pill border-0 px-4 py-2 d-flex align-items-center">
                    <i className="bx bx-search text-muted me-2"></i>
                    <Input
                      type="text"
                      placeholder="Search by invoice # or customer name..."
                      className="border-0 bg-transparent p-0 form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Input
                    type="select"
                    className="rounded-pill bg-light border-0 px-3 py-2 form-select shadow-sm h-100"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </Input>
                </Col>
              </Row>

              <div className="date-filters-bar d-flex align-items-center flex-wrap gap-2">
                <span className="text-muted small me-2">Date:</span>
                {dateFilters.map((filter) => (
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
                    <div
                      className="flatpickr-popover position-absolute mt-2 shadow-lg rounded-4 overflow-hidden z-3"
                      style={{ top: "100%", left: 0 }}
                    >
                      <Flatpickr
                        options={{
                          mode: "range",
                          inline: true,
                          dateFormat: "M j, Y",
                        }}
                        onChange={(dates) => setCustomDateRange(dates)}
                        value={customDateRange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Error alert */}
          {error && (
            <div className="alert alert-warning d-flex align-items-center">
              <i className="bx bx-error-circle me-2"></i>
              {error}
            </div>
          )}

          {/* Main List Card */}
          <Card className="border-0 rounded-4 shadow-sm main-list-card">
            <CardBody>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : invoices.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Invoice Number</th>
                          <th>Customer Name</th>
                          <th>Items</th>
                          <th>Sub Total</th>
                          <th>Discount</th>
                          <th>Tip</th>
                          <th>Grand Total</th>
                          <th>Payment</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => (
                          <tr key={inv._id}>
                            <td>
                              <Link to="#" className="text-primary fw-medium">
                                {inv._id?.slice(-8).toUpperCase() || "N/A"}
                              </Link>
                            </td>
                            <td>{inv.customer?.name || inv.customer?.phone || ""}</td>
                            <td>
                              <ul className="list-unstyled mb-0 small">
                                {inv.items.map((item, i) => (
                                  <li key={i}>
                                    {item.itemName} × {item.quantity}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>₹{inv.subTotal.toFixed(2)}</td>
                            <td>₹{inv.discountAmount.toFixed(2)}</td>
                            <td>₹{inv.tipAmount.toFixed(2)}</td>
                            <td className="fw-semibold">₹{inv.grandTotal.toFixed(2)}</td>
                            <td>
                              <span
                                className={classNames("badge rounded-pill", {
                                  "bg-success": inv.paymentStatus === "paid",
                                  "bg-warning": inv.paymentStatus === "pending",
                                  "bg-danger": inv.paymentStatus === "cancelled",
                                })}
                              >
                                {inv.paymentStatus}
                              </span>
                            </td>
                            <td className="text-muted small">
                              {new Date(inv.logCreatedDate).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="text-muted small">
                        Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} total invoices)
                      </div>
                      <Pagination className="mb-0">
                        <PaginationItem disabled={pagination.currentPage === 1}>
                          <PaginationLink first onClick={() => handlePageChange(1)} />
                        </PaginationItem>
                        <PaginationItem disabled={pagination.currentPage === 1}>
                          <PaginationLink previous onClick={() => handlePageChange(pagination.currentPage - 1)} />
                        </PaginationItem>
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page} active={page === pagination.currentPage}>
                            <PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem disabled={pagination.currentPage === pagination.totalPages}>
                          <PaginationLink next onClick={() => handlePageChange(pagination.currentPage + 1)} />
                        </PaginationItem>
                        <PaginationItem disabled={pagination.currentPage === pagination.totalPages}>
                          <PaginationLink last onClick={() => handlePageChange(pagination.totalPages)} />
                        </PaginationItem>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-5 opacity-50">
                  <i className="bx bx-receipt display-3 mb-3 text-muted"></i>
                  <h4 className="fw-bold">No invoices found</h4>
                  <p className="text-muted">Invoices will appear here once created in the POS.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </Container>

        {/* Import Invoices Modal (unchanged) */}
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
              <div className="bg-light rounded-4 p-4 d-flex justify-content-between align-items-center mb-4 border">
                <div>
                  <h6 className="fw-bold mb-1">Download Template</h6>
                  <p className="text-muted small mb-0">Required: customer_name, total_amount. Optional: phone, items, staff_name, date, etc.</p>
                </div>
                <Button color="primary" outline className="rounded-pill px-4 py-2 border-primary d-flex align-items-center gap-2 custom-outline-btn">
                  <i className="bx bx-download"></i> Download
                </Button>
              </div>
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
