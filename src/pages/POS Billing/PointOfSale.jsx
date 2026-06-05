import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Spinner,
  Alert,
  Badge,
} from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { post, put, del } from "../../helpers/api_helper";
import { URLS } from "../../url";
import moment from "moment";

// Styles
import "./pos.scss";

const PointOfSale = () => {
  // ─── UI State ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("services");
  const [customerModal, setCustomerModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [createCustomerModal, setCreateCustomerModal] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [dateTimeModal, setDateTimeModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [billsModal, setBillsModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // ─── Customer ────────────────────────────────────────────────────────────
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerSearchResult, setCustomerSearchResult] = useState(null);
  const [customerSearchLoading, setCustomerSearchLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "", phone: "", email: "", gender: "", dateOfBirth: "", source: "", notes: "",
  });
  const [createCustomerLoading, setCreateCustomerLoading] = useState(false);
  const [createCustomerError, setCreateCustomerError] = useState("");

  // ─── Items (Services, Products, Packages) ────────────────────────────────
  const [itemSearch, setItemSearch] = useState("");
  const [itemSearchResults, setItemSearchResults] = useState({ services: [], products: [], packages: [] });
  const [itemSearchLoading, setItemSearchLoading] = useState(false);

  // All items fetched on load
  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  // ─── Cart ────────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);

  // ─── Discount & Tip ──────────────────────────────────────────────────────
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountReason, setDiscountReason] = useState("");
  const [selectedTip, setSelectedTip] = useState(0);
  const [tipInput, setTipInput] = useState("");

  // ─── Coupon ──────────────────────────────────────────────────────────────
  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // ─── Payment ─────────────────────────────────────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // ─── POS Bill ────────────────────────────────────────────────────────────
  const [currentBillId, setCurrentBillId] = useState(null);
  const [billLoading, setBillLoading] = useState(false);
  const [billError, setBillError] = useState("");
  const [billSuccess, setBillSuccess] = useState("");

  // ─── Bills List ──────────────────────────────────────────────────────────
  const [allBills, setAllBills] = useState([]);
  const [billsLoading, setBillsLoading] = useState(false);
  const [billSearch, setBillSearch] = useState("");
  const [billPage, setBillPage] = useState(1);
  const [billTotalPages, setBillTotalPages] = useState(1);
  const [billTotalRecords, setBillTotalRecords] = useState(0);
  const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [fromTime, setFromTime] = useState("12:00 AM");
  const [toTime, setToTime] = useState("11:59 PM");

  // ─── Date/Time ───────────────────────────────────────────────────────────
  const [billingDate, setBillingDate] = useState(new Date());
  const [billingHour, setBillingHour] = useState(moment().format("hh"));
  const [billingMinute, setBillingMinute] = useState(moment().format("mm"));
  const [billingAmPm, setBillingAmPm] = useState(moment().format("A"));

  const itemSearchTimeout = useRef(null);
  const customerSearchTimeout = useRef(null);

  // ─── Calculations ─────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let discountAmount = 0;
  if (discountValue > 0) {
    if (discountType === "percentage") {
      discountAmount = (subtotal * discountValue) / 100;
    } else {
      discountAmount = discountValue;
    }
  }

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "Percentage" || appliedCoupon.discountType === "percentage") {
      couponDiscount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscountCap && couponDiscount > appliedCoupon.maxDiscountCap) {
        couponDiscount = appliedCoupon.maxDiscountCap;
      }
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const grandTotal = Math.max(0, subtotal + parseFloat(selectedTip || 0) - discountAmount - couponDiscount);

  // ─── Modal Toggles ────────────────────────────────────────────────────────
  const toggleCustomerModal = () => {
    setCustomerModal(!customerModal);
    if (!customerModal) {
      setCustomerSearch("");
      setCustomerSearchResult(null);
    }
  };
  const toggleCreateCustomerModal = () => {
    setCreateCustomerModal(!createCustomerModal);
    if (!createCustomerModal) {
      setNewCustomer({ name: "", phone: "", email: "", gender: "", dateOfBirth: "", source: "", notes: "" });
      setCreateCustomerError("");
    }
  };
  const toggleTipModal = () => setTipModal(!tipModal);
  const toggleDiscountModal = () => setDiscountModal(!discountModal);
  const toggleDateTimeModal = () => setDateTimeModal(!dateTimeModal);
  const togglePaymentModal = () => setPaymentModal(!paymentModal);
  const toggleBillsModal = () => {
    setBillsModal(!billsModal);
    if (!billsModal) fetchAllBills();
  };

  // ─── Close Invoice / Reset everything ──────────────────────────────────────
  const handleCloseInvoice = () => {
    setInvoiceModal(false);
    setInvoiceData(null);
    setCartItems([]);
    setSelectedCustomer(null);
    setCurrentBillId(null);
    setPaymentMethod("cash");
    setSelectedTip(0);
    setDiscountType("percentage");
    setDiscountValue(0);
    setDiscountReason("");
    setBillSuccess(""); 
    setBillError(""); 
    setItemSearch("");
    setItemSearchResults({ services: [], products: [], packages: [] });
  };

  const handleDownloadInvoice = () => {
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${invoiceData?._id || "unknown"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintInvoice = () => {
    const printContent = document.getElementById("invoice-print");
    if (printContent) {
      const win = window.open("", "", "width=800,height=600");
      win.document.write("<html><head><title>Print Invoice</title></head><body>");
      win.document.write(printContent.innerHTML);
      win.document.write("</body></html>");
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  };

  // ─── Search Customer ──────────────────────────────────────────────────────
const handleCustomerSearch = (value) => {
  setCustomerSearch(value);
  setCustomerSearchResult(null);
  clearTimeout(customerSearchTimeout.current);
  if (!value.trim()) return;
  customerSearchTimeout.current = setTimeout(async () => {
    setCustomerSearchLoading(true);
    try {
      const response = await post(URLS.SearchPos, { search: value });
      if (response.success && response.data) {
        if (response.data.name || response.data._id) {
          setCustomerSearchResult(response.data);
        } else {
          setCustomerSearchResult(null);
        }
      } else {
        setCustomerSearchResult(null);
      }
    } catch (err) {
      setCustomerSearchResult(null);
    } finally {
      setCustomerSearchLoading(false);
    }
  }, 400);
};

  const handleSelectFoundCustomer = (customer) => {
    if (customer && Object.keys(customer).length) {
      setSelectedCustomer(customer);
      toggleCustomerModal();
    }
  };

  // ─── Create Customer ──────────────────────────────────────────────────────
  const handleCreateCustomer = async () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      setCreateCustomerError("Name and phone are required.");
      return;
    }
    setCreateCustomerLoading(true);
    setCreateCustomerError("");
    try {
      const response = await post(URLS.CreateCustomer, newCustomer);
      if (response.success && response.data) {
        setSelectedCustomer(response.data);
        toggleCreateCustomerModal();
      } else {
        setCreateCustomerError(response.message || "Failed to create customer.");
      }
    } catch (err) {
      setCreateCustomerError("An error occurred.");
    } finally {
      setCreateCustomerLoading(false);
    }
  };

  // ─── Search POS Items ─────────────────────────────────────────────────────
  const handleItemSearch = (value) => {
    setItemSearch(value);
    clearTimeout(itemSearchTimeout.current);
    if (!value.trim()) {
      setItemSearchResults({ services: [], products: [], packages: [] });
      return;
    }
    itemSearchTimeout.current = setTimeout(async () => {
      setItemSearchLoading(true);
      try {
        const url = `${URLS.SearchPosItems}?search=${encodeURIComponent(value)}`;
        const response = await post(url, {});
        if (response.success && response.data) {
          setItemSearchResults({
            services: response.data.services || [],
            products: response.data.products || [],
            packages: response.data.packages || [],
          });
        }
      } catch (err) {
        console.error("Item search error:", err);
      } finally {
        setItemSearchLoading(false);
      }
    }, 400);
  };

  // ─── Fetch all items on load ──────────────────────────────────────────────
  const fetchAllItems = async () => {
    setItemsLoading(true);
    try {
      const [servicesRes, packagesRes, productsRes] = await Promise.all([
        post(URLS.GetServices, {}),
        post(URLS.GetAllServicePackages, {}),
        post(URLS.GetAllProducts, {}),
      ]);
      setAllServices(servicesRes.success ? servicesRes.data || [] : []);
      setAllPackages(packagesRes.success ? packagesRes.data || [] : []);
      setAllProducts(productsRes.success ? productsRes.data || [] : []);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  // ─── Cart Operations ──────────────────────────────────────────────────────
  // const addToCart = (item, type) => {
  //   const id = item._id;
  //   const existing = cartItems.find((c) => c.id === id);
  //   if (existing) {
  //     setCartItems((prev) =>
  //       prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
  //     );
  //   } else {
  //     const price = item.price || item.packagePrice || item.servicePrice || 0;
  //     const name =
  //       item.serviceName || item.packageName || item.name || item.productName || "Item";
  //     setCartItems((prev) => [
  //       ...prev,
  //       { id, name, price, quantity: 1, type, itemId: id },
  //     ]);
  //   }
  // };

  const addToCart = (item, type) => {
  // ✅ Prevent adding items if no customer is selected
  if (!selectedCustomer) {
    setBillError("Please select a customer before adding items.");
    setTimeout(() => setBillError(""), 3000);
    return;
  }

  const id = item._id;
  const existing = cartItems.find((c) => c.id === id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c))
      );
    } else {
      const price = item.price || item.packagePrice || item.servicePrice || 0;
      const name =
        item.serviceName || item.packageName || item.name || item.productName || "Item";
      setCartItems((prev) => [
        ...prev,
        { id, name, price, quantity: 1, type, itemId: id },
      ]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ─── Coupon ───────────────────────────────────────────────────────────────
  const fetchCoupons = useCallback(async () => {
    try {
      const url = `${URLS.GetAllCoupons}?searchQuery=${encodeURIComponent(couponCode)}&page=1&limit=20`;
      const response = await post(url, {});
      if (response.success) {
        setAvailableCoupons(response.data || response.coupons || []);
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  }, [couponCode]);

  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponCode.trim()) {
      setCouponError("Enter a coupon code.");
      return;
    }
    const found = availableCoupons.find(
      (c) => c.couponCode?.toUpperCase() === couponCode.toUpperCase() && c.isActive
    );
    if (found) {
      setAppliedCoupon(found);
      setCouponError("");
    } else {
      setCouponError("Invalid or inactive coupon code.");
    }
  };

  useEffect(() => {
    if (couponCode.length > 1) fetchCoupons();
  }, [couponCode]);

  // ─── Create/Update POS Bill (draft save) ──────────────────────────────────
  const buildItemsPayload = () =>
    cartItems.map((item) => ({
      itemType: item.type,
      itemId: item.itemId,
      ...(item.quantity > 1 ? { quantity: item.quantity } : {}),
    }));

  const handleSaveDraft = async () => {
    if (!selectedCustomer) {
      setBillError("Please select a customer first.");
      return;
    }
    if (cartItems.length === 0) {
      setBillError("Cart is empty.");
      return;
    }
    setBillLoading(true);
    setBillError("");
    setBillSuccess("");
    const payload = {
      customerId: selectedCustomer._id,
      items: buildItemsPayload(),
      tipAmount: parseFloat(selectedTip || 0),
      discountType: discountType,
      discountValue: parseFloat(discountValue || 0),
      paymentMethod,
    };
    try {
      let response;
      if (currentBillId) {
        response = await put(URLS.UpdatePos + currentBillId, payload);
      } else {
        response = await post(URLS.CreatePos, payload);
      }
      if (response.success) {
        setCurrentBillId(response.data._id);
        setBillSuccess("Bill saved as draft.");
        setTimeout(() => setBillSuccess(""), 3000);
      } else {
        setBillError(response.message || "Operation failed.");
      }
    } catch (err) {
      setBillError("An error occurred while saving the bill.");
    } finally {
      setBillLoading(false);
    }
  };

  // ─── Final Payment Handler ────────────────────────────────────────────────
  const handleFinalPayment = async () => {
    if (!selectedCustomer) {
      setBillError("Please select a customer first.");
      return;
    }
    if (cartItems.length === 0) {
      setBillError("Cart is empty.");
      return;
    }
    setBillLoading(true);
    setBillError("");
    const payload = {
      customerId: selectedCustomer._id,
      items: buildItemsPayload(),
      tipAmount: parseFloat(selectedTip || 0),
      discountType: discountType,
      discountValue: parseFloat(discountValue || 0),
      paymentMethod,
    };
    try {
      const response = currentBillId
        ? await put(URLS.UpdatePos + currentBillId, payload)
        : await post(URLS.CreatePos, payload);
      if (response.success) {
        const bill = response.data;
        setCurrentBillId(bill._id);
        setInvoiceData(bill);
        setPaymentModal(false);
        setSuccessModalOpen(true);
        setBillSuccess("");
        setItemSearch("");
        setItemSearchResults({ services: [], products: [], packages: [] });
      } else {
        setBillError(response.message || "Payment failed.");
      }
    } catch (err) {
      setBillError("An error occurred while processing payment.");
    } finally {
      setBillLoading(false);
    }
  };

  // ─── Delete Bill ──────────────────────────────────────────────────────────
  const handleDeleteBill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    try {
      const response = await del(URLS.DeletePos + id);
      if (response.success) {
        fetchAllBills();
        if (id === currentBillId) {
          setCurrentBillId(null);
          setCartItems([]);
          setSelectedCustomer(null);
        }
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Fetch All Bills ──────────────────────────────────────────────────────
  const fetchAllBills = useCallback(
    async (search = "", page = 1) => {
      setBillsLoading(true);
      const safeFromTime = fromTime || "12:00 AM";
      const safeToTime = toTime || "11:59 PM";
      try {
        const url = `${URLS.GetPosBill}?search=${encodeURIComponent(search)}&page=${page}&limit=10`;
        const response = await post(url, {
          fromDate: fromDate || moment().format("YYYY-MM-DD"),
          toDate: toDate || moment().format("YYYY-MM-DD"),
          fromTime: safeFromTime,
          toTime: safeToTime,
        });
        if (response.success) {
          setAllBills(response.data || []);
          setBillTotalPages(response.totalPages || 1);
          setBillTotalRecords(response.totalRecords || 0);
        }
      } catch (err) {
        console.error("Fetch bills error:", err);
      } finally {
        setBillsLoading(false);
      }
    },
    [fromDate, toDate, fromTime, toTime]
  );

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setBillSuccess("");
  };

  // ─── Load Bill into Cart ──────────────────────────────────────────────────
  const loadBillIntoCart = async (billId) => {
    try {
      const response = await post(URLS.GetPosById, { id: billId });
      if (response.success && response.data) {
        const bill = response.data;
        setCurrentBillId(bill._id);
        const restoredItems = (bill.items || []).map((item) => ({
          id: item._id,
          itemId: item.itemId,
          name: item.itemName,
          price: item.price,
          quantity: item.quantity,
          type: item.itemType,
        }));
        setCartItems(restoredItems);
        setSelectedCustomer({
          _id: bill.customerId,
          name: bill.customerName,
          phone: bill.customerPhone,
          email: bill.customerEmail,
        });
        setPaymentMethod(bill.paymentMethod || "cash");
        setSelectedTip(bill.tipAmount || 0);
        if (bill.discountType) setDiscountType(bill.discountType);
        if (bill.discountValue) setDiscountValue(bill.discountValue);
        setBillsModal(false);
      }
    } catch (err) {
      console.error("Load bill error:", err);
    }
  };

  // ─── Rendered Item Cards ──────────────────────────────────────────────────
  const renderItemList = (items, type) => {
    if (!items || items.length === 0) return null;
    return items.map((item) => {
      const name =
        item.serviceName || item.packageName || item.productName || item.name || "Item";
      const price = item.price || item.packagePrice || item.servicePrice || 0;
      return (
        <div
          key={item._id}
          className="item-card bg-white border rounded-4 p-3 mb-2 d-flex justify-content-between align-items-center shadow-sm cursor-pointer"
          onClick={() => addToCart(item, type)}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className={classNames(
                "item-icon rounded-circle d-flex align-items-center justify-content-center",
                {
                  "bg-info bg-opacity-10 text-info": type === "service",
                  "bg-success bg-opacity-10 text-success": type === "product",
                  "bg-warning bg-opacity-10 text-warning": type === "package",
                }
              )}
              style={{ width: "40px", height: "40px" }}
            >
              <i
                className={classNames("bx", {
                  "bx-cut": type === "service",
                  "bx-basket": type === "product",
                  "bx-package": type === "package",
                })}
              ></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0 small">{name}</h6>
              {item.totalDuration && (
                <span className="text-muted smaller">{item.totalDuration}</span>
              )}
            </div>
          </div>
          <div className="text-end">
            <span className="fw-bold text-primary small">₹{price}</span>
            <div>
              <button
                className="btn btn-sm btn-primary rounded-pill px-3 py-0 mt-1 small"
                style={{ fontSize: "11px" }}
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const getTabItems = () => {
    if (activeTab === "services") return itemSearchResults.services;
    if (activeTab === "packages") return itemSearchResults.packages;
    if (activeTab === "products") return itemSearchResults.products;
    return [];
  };

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
            <div className="d-flex align-items-center gap-2">
              <Button
                color="light"
                className="rounded-pill px-3 py-2 bg-white border shadow-sm small d-flex align-items-center gap-1"
                onClick={toggleBillsModal}
              >
                <i className="bx bx-list-ul me-1"></i> Open POS Bills
              </Button>
              <div
                className="bg-white px-3 py-2 rounded-4 shadow-sm border d-flex align-items-center gap-3 cursor-pointer date-time-display"
                onClick={toggleDateTimeModal}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="bx bx-calendar text-muted"></i>
                  <span className="fw-bold small text-dark">
                    {moment(billingDate).format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="border-start ps-3 d-flex align-items-center gap-2">
                  <i className="bx bx-time text-muted"></i>
                  <span className="fw-bold small text-dark">
                    {billingHour}:{billingMinute} {billingAmPm}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {billError && <Alert color="danger" className="rounded-4 mb-3">{billError}</Alert>}
          {billSuccess && <Alert color="success" className="rounded-4 mb-3">{billSuccess}</Alert>}

          <Row>
            {/* Left Column: POS Main */}
            <Col xl={8}>
              {/* Customer Selection */}
              <div className="bg-white p-3 rounded-4 shadow-sm border mb-4">
                {!selectedCustomer ? (
                  <Button
                    color="light"
                    className="w-100 rounded-pill bg-light border-0 py-2 text-start px-4 d-flex align-items-center justify-content-center gap-2 text-muted"
                    onClick={toggleCustomerModal}
                  >
                    <i className="bx bx-user fs-5"></i>
                    <span>Select Customer</span>
                  </Button>
                ) : (
                  <div className="walk-in-card p-2 rounded-4 bg-light border position-relative d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-4 p-3 d-flex align-items-center justify-content-center">
                      <i className="bx bx-user fs-4"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-0">{selectedCustomer.name}</h6>
                      <p className="text-muted small mb-0">
                        {selectedCustomer.phone}{" "}
                        {selectedCustomer.email && `• ${selectedCustomer.email}`}
                      </p>
                    </div>
                    <Button
                      color="transparent"
                      className="position-absolute end-0 top-0 mt-2 me-2 p-1 border-0"
                      onClick={() => {
                        setSelectedCustomer(null);
                        setCurrentBillId(null);
                      }}
                    >
                      <i className="bx bx-x fs-4 text-muted"></i>
                    </Button>
                  </div>
                )}
              </div>

              {/* Search Items */}
              <div className="search-box bg-white rounded-pill shadow-sm border mb-4 d-flex align-items-center px-4 py-2">
                <i className="bx bx-search text-muted me-2 fs-5"></i>
                <Input
                  type="text"
                  placeholder="Search services, packages or products..."
                  className="border-0 bg-transparent p-0 form-control"
                  value={itemSearch}
                  onChange={(e) => handleItemSearch(e.target.value)}
                />
                {itemSearchLoading && <Spinner size="sm" color="primary" />}
              </div>

              {/* Content Tabs */}
              <Card className="border-0 rounded-4 shadow-sm content-card overflow-hidden">
                <div className="bg-light p-2 px-3 border-bottom">
                  <Nav pills className="pos-nav-pills">
                    <NavItem>
                      <NavLink
                        className={classNames(
                          { active: activeTab === "services" },
                          "rounded-pill"
                        )}
                        onClick={() => setActiveTab("services")}
                      >
                        <i className="bx bx-cut me-2"></i> Services
                        <Badge color="primary" className="ms-1 rounded-pill">
                          {itemSearch.trim() ? itemSearchResults.services.length : allServices.length}
                        </Badge>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classNames(
                          { active: activeTab === "packages" },
                          "rounded-pill"
                        )}
                        onClick={() => setActiveTab("packages")}
                      >
                        <i className="bx bx-package me-2"></i> Packages
                        <Badge color="warning" className="ms-1 rounded-pill">
                          {itemSearch.trim() ? itemSearchResults.packages.length : allPackages.length}
                        </Badge>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classNames(
                          { active: activeTab === "products" },
                          "rounded-pill"
                        )}
                        onClick={() => setActiveTab("products")}
                      >
                        <i className="bx bx-basket me-2"></i> Products
                        <Badge color="success" className="ms-1 rounded-pill">
                          {itemSearch.trim() ? itemSearchResults.products.length : allProducts.length}
                        </Badge>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <CardBody className="p-3" style={{ minHeight: "280px" }}>
                  <TabContent activeTab={activeTab}>
                    {["services", "packages", "products"].map((tab) => (
                      <TabPane tabId={tab} key={tab}>
                        {itemsLoading ? (
                          <div className="text-center py-5">
                            <Spinner color="primary" />
                          </div>
                        ) : itemSearch.trim() === "" ? (
                          // Show all items when search is empty
                          (tab === "services" && allServices.length === 0) ||
                          (tab === "packages" && allPackages.length === 0) ||
                          (tab === "products" && allProducts.length === 0) ? (
                            <div className="text-center py-5 opacity-50">
                              <i
                                className={classNames("bx display-3 mb-3 text-muted", {
                                  "bx-cut": tab === "services",
                                  "bx-package": tab === "packages",
                                  "bx-basket": tab === "products",
                                })}
                              ></i>
                              <h5 className="fw-bold">No {tab} found</h5>
                              <p className="text-muted small">No {tab} available yet</p>
                            </div>
                          ) : (
                            <div>
                              {renderItemList(
                                tab === "services"
                                  ? allServices
                                  : tab === "packages"
                                  ? allPackages
                                  : allProducts,
                                tab === "services"
                                  ? "service"
                                  : tab === "packages"
                                  ? "package"
                                  : "product"
                              )}
                            </div>
                          )
                        ) : getTabItems().length === 0 ? (
                          <div className="text-center py-5 opacity-50">
                            <i className="bx bx-search-alt display-3 mb-3 text-muted"></i>
                            <h5 className="fw-bold">No {tab} found</h5>
                          </div>
                        ) : (
                          <div>
                            {renderItemList(
                              getTabItems(),
                              tab === "services"
                                ? "service"
                                : tab === "packages"
                                ? "package"
                                : "product"
                            )}
                          </div>
                        )}
                      </TabPane>
                    ))}
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

            {/* Right Column: Cart */}
            <Col xl={4}>
              <Card className="border-0 rounded-4 shadow-sm cart-card h-100 d-flex flex-column">
                {/* Cart Header */}
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white rounded p-2 d-flex align-items-center justify-content-center">
                      <i className="bx bx-cart fs-4"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Cart</h5>
                    <span className="badge rounded-pill bg-danger ms-1">{cartItems.length}</span>
                    {currentBillId && (
                      <span className="badge rounded-pill bg-success ms-1 small">Bill Active</span>
                    )}
                  </div>
                  <div className="cart-header-actions d-flex gap-3 text-muted">
                    {cartItems.length > 0 && (
                      <i
                        className="bx bx-trash fs-5 cursor-pointer hover-danger"
                        title="Clear Cart"
                        onClick={() => {
                          setCartItems([]);
                          setCurrentBillId(null);
                        }}
                      ></i>
                    )}
                    <i
                      className="bx bx-gift fs-5 cursor-pointer text-warning"
                      title="Add Tip"
                      onClick={toggleTipModal}
                    ></i>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-grow-1 overflow-auto p-0">
                  {cartItems.length === 0 ? (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                      <div className="bg-light rounded-circle p-4 mb-3">
                        <i className="bx bx-cart-alt display-4 text-muted opacity-25"></i>
                      </div>
                      <h6 className="fw-bold text-dark">Cart is empty</h6>
                      <p className="text-muted small">Add services, products or packages</p>
                    </div>
                  ) : (
                    <div className="cart-items-list p-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="cart-item-row bg-white border rounded-4 p-3 mb-3 shadow-sm position-relative"
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className={classNames(
                                  "item-icon-sm rounded-circle d-flex align-items-center justify-content-center",
                                  {
                                    "bg-info bg-opacity-10 text-info": item.type === "service",
                                    "bg-success bg-opacity-10 text-success":
                                      item.type === "product",
                                    "bg-warning bg-opacity-10 text-warning":
                                      item.type === "package",
                                  }
                                )}
                                style={{ width: "32px", height: "32px" }}
                              >
                                <i
                                  className={classNames("bx", {
                                    "bx-cut": item.type === "service",
                                    "bx-basket": item.type === "product",
                                    "bx-package": item.type === "package",
                                  })}
                                ></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-0 small">{item.name}</h6>
                                <span className="text-muted smaller">₹{item.price} each</span>
                              </div>
                            </div>
                            <Button
                              color="transparent"
                              className="p-0 border-0 text-muted"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="bx bx-x fs-5"></i>
                            </Button>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="quantity-control d-flex align-items-center gap-2 bg-light rounded-pill p-1">
                              <Button
                                size="sm"
                                color="white"
                                className="rounded-circle p-0 border shadow-sm d-flex align-items-center justify-content-center"
                                style={{ width: "24px", height: "24px" }}
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <i className="bx bx-minus smaller"></i>
                              </Button>
                              <span className="small fw-bold px-2">{item.quantity}</span>
                              <Button
                                size="sm"
                                color="white"
                                className="rounded-circle p-0 border shadow-sm d-flex align-items-center justify-content-center"
                                style={{ width: "24px", height: "24px" }}
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <i className="bx bx-plus smaller"></i>
                              </Button>
                            </div>
                            <span className="fw-bold text-dark">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                <div className="p-4 bg-light bg-opacity-50 border-top">
                  {cartItems.length > 0 && (
                    <div className="coupon-section mb-4">
                      <div className="coupon-card bg-white border rounded-4 p-3 shadow-sm">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <div
                            className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "32px", height: "32px" }}
                          >
                            <i className="bx bx-purchase-tag small"></i>
                          </div>
                          <h6 className="fw-bold mb-0 small">
                            {appliedCoupon
                              ? `Coupon: ${appliedCoupon.couponCode}`
                              : "Apply Coupon"}
                          </h6>
                          {appliedCoupon && (
                            <button
                              className="btn btn-sm text-danger p-0 ms-auto border-0 bg-transparent"
                              onClick={() => {
                                setAppliedCoupon(null);
                                setCouponCode("");
                                setCouponError("");
                              }}
                            >
                              <i className="bx bx-x"></i> Remove
                            </button>
                          )}
                        </div>
                        {!appliedCoupon && (
                          <>
                            <div className="d-flex gap-2">
                              <Input
                                type="text"
                                placeholder="Enter code"
                                className="rounded-pill border-0 bg-light px-3 py-2 shadow-none small"
                                value={couponCode}
                                onChange={(e) => {
                                  setCouponCode(e.target.value);
                                  setCouponError("");
                                }}
                              />
                              <Button
                                color="primary"
                                className="rounded-pill px-3 py-1 fw-bold shadow-primary small"
                                onClick={handleApplyCoupon}
                              >
                                Apply
                              </Button>
                            </div>
                            {couponError && (
                              <small className="text-danger d-block mt-1">{couponError}</small>
                            )}
                          </>
                        )}
                        {appliedCoupon && (
                          <small className="text-success d-block">
                            Saving ₹{couponDiscount.toFixed(2)} on this bill!
                          </small>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="cart-totals border-top pt-3">
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">₹{subtotal.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2 small text-danger">
                        <span>
                          Discount{" "}
                          {discountType === "percentage" ? `(${discountValue}%)` : ""}
                        </span>
                        <span className="fw-bold">- ₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {couponDiscount > 0 && (
                      <div className="d-flex justify-content-between mb-2 small text-success">
                        <span>Coupon ({appliedCoupon?.couponCode})</span>
                        <span className="fw-bold">- ₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    {selectedTip > 0 && (
                      <div className="d-flex justify-content-between mb-2 small text-success">
                        <span>Tip</span>
                        <span className="fw-bold">
                          + ₹{parseFloat(selectedTip).toLocaleString()}
                        </span>
                      </div>
                    )}

                    <Button
                      color="link"
                      className="text-primary p-0 mb-3 text-decoration-none small d-flex align-items-center gap-1"
                      onClick={toggleDiscountModal}
                    >
                      <i className="bx bx-plus-circle"></i>
                      {discountAmount > 0 ? "Edit discount" : "Add direct discount"}
                    </Button>

                    <div className="d-flex justify-content-between align-items-center mb-4 pt-2 border-top">
                      <h4 className="fw-bold mb-0">Total</h4>
                      <h4 className="fw-bold mb-0 text-primary">
                        ₹
                        {grandTotal.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                    </div>

                    <Button
                      color="primary"
                      className="w-100 rounded-pill py-3 fw-bold shadow-primary d-flex align-items-center justify-content-center gap-2 border-0 bg-gradient-primary"
                      disabled={cartItems.length === 0 || billLoading}
                      onClick={() => setPaymentModal(true)}
                    >
                      <i className="bx bx-wallet fs-5"></i>
                      Pay ₹
                      {grandTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

{/* ─── Modal 1: Select Customer ─────────────────────────────────────── */}
<Modal
  isOpen={customerModal}
  toggle={toggleCustomerModal}
  centered
  className="pos-modal customer-selection-modal"
>
  <div className="modal-content border-0 rounded-4">
    <ModalHeader toggle={toggleCustomerModal} className="border-0 pb-0 px-4 pt-4 text-center">
      <div className="w-100">
        <h4 className="fw-bold mb-1">Select Customer</h4>
        <p className="text-muted small">
          Search for an existing customer or create a new one
        </p>
      </div>
    </ModalHeader>
<ModalBody className="px-4 py-4">
  <div className="search-box bg-white rounded-pill border border-primary border-2 mb-4 d-flex align-items-center px-4 py-3">
    <i className="bx bx-search text-muted me-2 fs-5"></i>
    <Input
      type="text"
      placeholder="Search by name or phone..."
      className="border-0 bg-transparent p-0 form-control"
      value={customerSearch}
      onChange={(e) => handleCustomerSearch(e.target.value)}
    />
    {customerSearchLoading && <Spinner size="sm" color="primary" />}
  </div>

  {customerSearchResult?.name ? (
    <div
      className="customer-result-card bg-white border rounded-4 p-3 d-flex align-items-center gap-3 cursor-pointer"
      style={{ cursor: "pointer" }}
      onClick={() => handleSelectFoundCustomer(customerSearchResult)}
    >
      <div
        className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: "44px", height: "44px" }}
      >
        <i className="bx bx-user fs-4"></i>
      </div>
      <div className="flex-grow-1">
        <h6 className="fw-bold mb-0">{customerSearchResult.name}</h6>
        <p className="text-muted small mb-0">{customerSearchResult.phone}</p>
        {customerSearchResult.email && (
          <p className="text-muted smaller mb-0">{customerSearchResult.email}</p>
        )}
      </div>
      <i className="bx bx-check-circle text-success fs-4"></i>
    </div>
  ) : null}
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

        {/* ─── Modal 2: Create Customer ────────────────────────────────────── */}
        <Modal
          isOpen={createCustomerModal}
          toggle={toggleCreateCustomerModal}
          centered
          className="pos-modal create-customer-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader
              toggle={toggleCreateCustomerModal}
              className="border-0 pb-0 px-4 pt-4"
            >
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1">Create New Customer</h4>
                <p className="text-muted small">Add a new customer and proceed with billing</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-5 py-4">
              {createCustomerError && (
                <Alert color="danger" className="rounded-4 mb-3">
                  {createCustomerError}
                </Alert>
              )}
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Name *</Label>
                      <Input
                        type="text"
                        placeholder="Customer name"
                        className="rounded-4 border-primary border-2 px-4 py-3"
                        value={newCustomer.name}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Phone *</Label>
                      <Input
                        type="text"
                        placeholder="Phone number"
                        className="rounded-4 border-primary border-2 px-4 py-3"
                        value={newCustomer.phone}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Email</Label>
                      <Input
                        type="email"
                        placeholder="Email address"
                        className="rounded-4 bg-light border-0 px-4 py-3"
                        value={newCustomer.email}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Gender</Label>
                      <Input
                        type="select"
                        className="rounded-4 bg-light border-0 px-4 py-3 form-select"
                        value={newCustomer.gender}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, gender: e.target.value }))
                        }
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Date of Birth</Label>
                      <Input
                        type="date"
                        className="rounded-4 bg-light border-0 px-4 py-3"
                        value={newCustomer.dateOfBirth}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                          }))
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Label className="fw-bold mb-2">Source</Label>
                      <Input
                        type="select"
                        className="rounded-4 bg-light border-0 px-4 py-3 form-select"
                        value={newCustomer.source}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, source: e.target.value }))
                        }
                      >
                        <option value="">Not specified</option>
                        <option value="online">Online</option>
                        <option value="referral">Referral</option>
                        <option value="walk-in">Walk-in</option>
                        <option value="social_media">Social Media</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup className="mb-0">
                      <Label className="fw-bold mb-2">Notes</Label>
                      <Input
                        type="textarea"
                        rows="2"
                        placeholder="Optional notes..."
                        className="rounded-4 bg-light border-0 px-4 py-3"
                        value={newCustomer.notes}
                        onChange={(e) =>
                          setNewCustomer((prev) => ({ ...prev, notes: e.target.value }))
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-5 pb-5 pt-0 gap-3">
              <Button
                color="light"
                className="rounded-pill px-5 py-2 fw-medium bg-light border-0"
                onClick={toggleCreateCustomerModal}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="rounded-pill px-5 py-2 fw-medium shadow-primary"
                onClick={handleCreateCustomer}
                disabled={createCustomerLoading}
              >
                {createCustomerLoading ? <Spinner size="sm" /> : "Create and Select"}
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* ─── Modal 3: Add Tip ─────────────────────────────────────────────── */}
        <Modal isOpen={tipModal} toggle={toggleTipModal} centered className="pos-modal tip-modal">
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleTipModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-gift text-warning fs-3"></i>
                <h4 className="fw-bold mb-0">Add Tip</h4>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <div className="d-flex gap-2 mb-4">
                {[0, 50, 100, 200].map((tip) => (
                  <Button
                    key={tip}
                    color="light"
                    className={classNames("flex-grow-1 rounded-4 py-2 border-2", {
                      "border-primary bg-primary text-white": selectedTip === tip,
                      "bg-light text-dark": selectedTip !== tip,
                    })}
                    onClick={() => {
                      setSelectedTip(tip);
                      setTipInput(tip === 0 ? "" : String(tip));
                    }}
                  >
                    {tip === 0 ? "No Tip" : `₹${tip}`}
                  </Button>
                ))}
              </div>
              <FormGroup className="mb-4">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  className="rounded-4 bg-light border-0 px-4 py-3"
                  value={tipInput}
                  onChange={(e) => {
                    setTipInput(e.target.value);
                    setSelectedTip(parseFloat(e.target.value) || 0);
                  }}
                />
              </FormGroup>
              <Button
                color="primary"
                className="w-100 rounded-pill py-3 fw-bold shadow-primary"
                onClick={toggleTipModal}
              >
                Apply Tip {selectedTip > 0 ? `(₹${selectedTip})` : ""}
              </Button>
            </ModalBody>
          </div>
        </Modal>

        {/* ─── Modal 4: Direct Discount ────────────────────────────────────── */}
        <Modal
          isOpen={discountModal}
          toggle={toggleDiscountModal}
          centered
          className="pos-modal discount-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleDiscountModal} className="border-0 pb-0 px-4 pt-4">
              <div className="d-flex align-items-center gap-2">
                <i className="bx bx-purchase-tag text-primary fs-4"></i>
                <h4 className="fw-bold mb-0">Apply Direct Discount</h4>
              </div>
              <p className="text-muted small mt-1 mb-0 ms-1 ps-3">
                Add a discount to the entire bill
              </p>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <Form>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Discount Type</Label>
                  <div className="d-flex gap-2 p-1 bg-light rounded-4">
                    <Button
                      type="button"
                      className={classNames("flex-grow-1 rounded-4 py-3 border-0", {
                        "bg-primary text-white shadow": discountType === "percentage",
                        "bg-transparent text-muted": discountType !== "percentage",
                      })}
                      onClick={() => setDiscountType("percentage")}
                    >
                      <i className="bx bx-percent me-2"></i>Percentage (%)
                    </Button>
                    <Button
                      type="button"
                      className={classNames("flex-grow-1 rounded-4 py-3 border-0", {
                        "bg-primary text-white shadow": discountType === "flat",
                        "bg-transparent text-muted": discountType !== "flat",
                      })}
                      onClick={() => setDiscountType("flat")}
                    >
                      <i className="bx bx-rupee me-2"></i>Flat Amount (Rs)
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Discount Value</Label>
                  <div className="position-relative">
                    <i
                      className={classNames(
                        "bx position-absolute start-0 top-50 translate-middle-y ms-3 text-muted",
                        {
                          "bx-percent": discountType === "percentage",
                          "bx-rupee": discountType === "flat",
                        }
                      )}
                    ></i>
                    <Input
                      type="number"
                      placeholder={discountType === "percentage" ? "Percentage" : "Amount"}
                      className="rounded-pill bg-light border-0 px-5 py-3"
                      value={discountValue || ""}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="fw-bold mb-2">Reason (optional)</Label>
                  <Input
                    type="textarea"
                    rows="2"
                    placeholder="e.g., Loyal customer, Birthday discount"
                    className="rounded-4 bg-light border-0 px-4 py-3"
                    value={discountReason}
                    onChange={(e) => setDiscountReason(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-4 pt-0 gap-3">
              <Button
                color="light"
                className="rounded-pill px-5 py-2 fw-medium bg-light border-0"
                onClick={() => {
                  setDiscountValue(0);
                  setDiscountType("percentage");
                  toggleDiscountModal();
                }}
              >
                Clear
              </Button>
              <Button
                className="rounded-pill px-4 py-2 fw-medium bg-gradient-primary text-white border-0"
                onClick={toggleDiscountModal}
              >
                Apply Discount
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* ─── Modal 5: Billing Date & Time ─────────────────────────────────── */}
        <Modal
          isOpen={dateTimeModal}
          toggle={toggleDateTimeModal}
          centered
          className="pos-modal date-time-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleDateTimeModal} className="border-0 pb-0 px-4 pt-4">
              Billing Date & Time
            </ModalHeader>
            <ModalBody className="px-4 py-4">
              <div className="calendar-inline-wrapper mb-4 p-2 border rounded-4">
                <Flatpickr
                  options={{ inline: true, dateFormat: "Y-m-d" }}
                  value={billingDate}
                  onChange={(date) => setBillingDate(date[0])}
                  className="d-none"
                />
              </div>
              <div className="time-selectors d-flex align-items-center justify-content-center gap-2 mb-4">
                <Input
                  type="select"
                  className="rounded-pill bg-light border-0 px-3 py-2 text-center"
                  style={{ width: "90px" }}
                  value={billingHour}
                  onChange={(e) => setBillingHour(e.target.value)}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1}>{(i + 1).toString().padStart(2, "0")}</option>
                  ))}
                </Input>
                <span className="fw-bold fs-4">:</span>
                <Input
                  type="select"
                  className="rounded-pill bg-light border-0 px-3 py-2 text-center"
                  style={{ width: "90px" }}
                  value={billingMinute}
                  onChange={(e) => setBillingMinute(e.target.value)}
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i}>{i.toString().padStart(2, "0")}</option>
                  ))}
                </Input>
                <Input
                  type="select"
                  className="rounded-pill bg-light border-0 px-3 py-2 text-center"
                  style={{ width: "90px" }}
                  value={billingAmPm}
                  onChange={(e) => setBillingAmPm(e.target.value)}
                >
                  <option>AM</option>
                  <option>PM</option>
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

        {/* ─── Modal 6: Payment Method ──────────────────────────────────────── */}
        <Modal
          isOpen={paymentModal}
          toggle={togglePaymentModal}
          centered
          className="pos-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={togglePaymentModal} className="border-0 pb-0 px-4 pt-4">
              Select Payment Method
            </ModalHeader>
            <ModalBody className="px-4 py-4">
              <div className="d-flex flex-column gap-3">
                {["cash", "online"].map((method) => (
                  <div
                    key={method}
                    className={classNames(
                      "payment-option border rounded-4 p-3 d-flex align-items-center gap-3 cursor-pointer",
                      {
                        "border-primary bg-primary bg-opacity-10": paymentMethod === method,
                        "border-light bg-white": paymentMethod !== method,
                      }
                    )}
                    style={{ cursor: "pointer" }}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <i
                      className={classNames("fs-4", {
                        "bx bx-money text-success": method === "cash",
                        "bx bx-globe text-primary": method === "online",
                      })}
                    ></i>
                    <span className="fw-bold text-capitalize">{method}</span>
                    {paymentMethod === method && (
                      <i className="bx bx-check-circle text-primary ms-auto fs-5"></i>
                    )}
                  </div>
                ))}
              </div>
              <Button
                color="primary"
                className="w-100 rounded-pill py-3 fw-bold shadow-primary mt-4"
                onClick={handleFinalPayment}
                disabled={billLoading}
              >
                {billLoading ? (
                  <Spinner size="sm" />
                ) : (
                  `Confirm Payment — ₹${grandTotal.toFixed(2)}`
                )}
              </Button>
            </ModalBody>
          </div>
        </Modal>

        {/* ─── Modal 7: All POS Bills ──────────────────────────────────────── */}
        <Modal
          isOpen={billsModal}
          toggle={toggleBillsModal}
          centered
          size="lg"
          className="pos-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader toggle={toggleBillsModal} className="border-0 pb-0 px-4 pt-4">
              <div>
                <div className="fw-bold">POS Bills</div>
                <p className="text-muted small mb-0">{billTotalRecords} total bills</p>
              </div>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              {/* Date & Time Filters */}
              <div className="d-flex gap-2 mb-3 flex-wrap">
                <div className="d-flex align-items-center gap-1">
                  <label className="small text-muted mb-0">From:</label>
                  <Input
                    type="date"
                    className="form-control form-control-sm rounded-pill"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <Input
                    type="time"
                    className="form-control form-control-sm rounded-pill"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center gap-1">
                  <label className="small text-muted mb-0">To:</label>
                  <Input
                    type="date"
                    className="form-control form-control-sm rounded-pill"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <Input
                    type="time"
                    className="form-control form-control-sm rounded-pill"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => fetchAllBills(billSearch, billPage)}
                >
                  Apply
                </Button>
              </div>

              <div className="search-box bg-light rounded-pill d-flex align-items-center px-3 py-2 mb-4 border">
                <i className="bx bx-search text-muted me-2"></i>
                <Input
                  type="text"
                  placeholder="Search bills by customer..."
                  className="border-0 bg-transparent p-0 form-control"
                  value={billSearch}
                  onChange={(e) => {
                    setBillSearch(e.target.value);
                    fetchAllBills(e.target.value, 1);
                  }}
                />
              </div>

              {billsLoading ? (
                <div className="text-center py-5">
                  <Spinner color="primary" />
                </div>
              ) : allBills.length === 0 ? (
                <div className="text-center py-5 opacity-50">
                  <i className="bx bx-receipt display-3 text-muted mb-3"></i>
                  <h5 className="text-muted">No bills found</h5>
                </div>
              ) : (
                <div>
                  {allBills.map((bill) => (
                    <div
                      key={bill._id}
                      className="bill-row bg-white border rounded-4 p-3 mb-3 shadow-sm"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-1">
                            {bill.customerName || "Unknown Customer"}
                          </h6>
                          <p className="text-muted small mb-0">{bill.customerPhone}</p>
                          <p className="text-muted smaller mb-0">{bill.logCreatedDate}</p>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold text-primary">₹{bill.grandTotal}</span>
                          <div>
                            <Badge
                              color={bill.paymentStatus === "paid" ? "success" : "warning"}
                              className="rounded-pill small"
                            >
                              {bill.paymentStatus}
                            </Badge>
                          </div>
                          <div className="d-flex gap-2 mt-2">
                            <button
                              className="btn btn-sm btn-primary rounded-pill px-2"
                              onClick={() => loadBillIntoCart(bill._id)}
                            >
                              <i className="bx bx-edit-alt me-1"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger rounded-pill px-2"
                              onClick={() => handleDeleteBill(bill._id)}
                            >
                              <i className="bx bx-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 d-flex gap-1 flex-wrap">
                        {(bill.items || []).slice(0, 3).map((item, idx) => (
                          <Badge
                            key={idx}
                            color="light"
                            className="text-dark border rounded-pill small px-2"
                          >
                            {item.itemName}
                          </Badge>
                        ))}
                        {(bill.items || []).length > 3 && (
                          <Badge
                            color="light"
                            className="text-muted border rounded-pill small px-2"
                          >
                            +{bill.items.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {billTotalPages > 1 && (
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Button
                        color="light"
                        className="rounded-pill px-3 small border"
                        disabled={billPage === 1}
                        onClick={() => {
                          setBillPage((p) => p - 1);
                          fetchAllBills(billSearch, billPage - 1);
                        }}
                      >
                        <i className="bx bx-chevron-left"></i> Prev
                      </Button>
                      <span className="d-flex align-items-center text-muted small">
                        Page {billPage} of {billTotalPages}
                      </span>
                      <Button
                        color="light"
                        className="rounded-pill px-3 small border"
                        disabled={billPage === billTotalPages}
                        onClick={() => {
                          setBillPage((p) => p + 1);
                          fetchAllBills(billSearch, billPage + 1);
                        }}
                      >
                        Next <i className="bx bx-chevron-right"></i>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
          </div>
        </Modal>

        {/* ─── Modal 8: Invoice Display ──────────────────────────────────────── */}
        <Modal
          isOpen={invoiceModal}
          toggle={() => setInvoiceModal(false)}
          centered
          size="lg"
          className="pos-modal"
        >
          <div className="modal-content border-0 rounded-4">
            <ModalHeader
              toggle={() => setInvoiceModal(false)}
              className="border-0 pb-0 px-4 pt-4"
            >
              Invoice #{invoiceData?._id}
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <div id="invoice-print">
                {invoiceData && (
                  <div>
                    <p className="mb-1">
                      <strong>Customer:</strong> {invoiceData.customerName || "-"}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {invoiceData.createdAt || "-"}
                    </p>
                    <hr />
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(invoiceData.items || []).map((it, idx) => (
                            <tr key={idx}>
                              <td>{it.itemName || it.itemId}</td>
                              <td>{it.quantity || 1}</td>
                              <td>₹{it.price}</td>
                              <td>₹{(it.price * (it.quantity || 1)).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <hr />
                    <p className="mb-1">
                      <strong>Subtotal:</strong> ₹{invoiceData.subtotal?.toFixed(2) || "-"}
                    </p>
                    <p className="mb-1">
                      <strong>Discount:</strong> ₹
                      {invoiceData.discountAmount?.toFixed(2) || "0"}
                    </p>
                    <p className="mb-1">
                      <strong>Coupon Discount:</strong> ₹
                      {invoiceData.couponDiscount?.toFixed(2) || "0"}
                    </p>
                    <p className="mb-1">
                      <strong>Tip:</strong> ₹{invoiceData.tipAmount?.toFixed(2) || "0"}
                    </p>
                    <h5 className="mt-3">
                      <strong>
                        Grand Total: ₹{invoiceData.grandTotal?.toFixed(2) || "-"}
                      </strong>
                    </h5>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="border-0 px-4 pb-4 pt-0">
              <Button
                color="primary"
                className="rounded-pill px-5 py-2"
                onClick={handleCloseInvoice}
              >
                Close
              </Button>
              <Button
                color="secondary"
                className="rounded-pill px-5 py-2 ms-2"
                onClick={handlePrintInvoice}
              >
                Print
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {/* ─── Modal 9: Payment Success ──────────────────────────────────────── */}
        <Modal
          isOpen={successModalOpen}
          toggle={() => setSuccessModalOpen(false)}
          centered
          backdrop="static"
          keyboard={false}
          className="success-modal"
        >
          <div
            className="modal-content border-0 rounded-4 text-center"
            style={{
              background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
            }}
          >
            <ModalBody className="px-4 py-5 d-flex flex-column align-items-center justify-content-center">
              <div
                className="success-checkmark-wrapper mb-4"
                style={{ animation: "scaleIn 0.6s ease-out" }}
              >
                <div className="success-checkmark" style={{ width: "100px", height: "100px" }}>
                  <div
                    className="check-icon"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#4caf50",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 30px rgba(76, 175, 80, 0.3)",
                    }}
                  >
                    <i className="bx bx-check fs-1 text-white"></i>
                  </div>
                </div>
              </div>

              <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "28px" }}>
                Payment Successful! 🎉
              </h2>
              <p className="text-muted mb-2">
                Your payment has been successfully processed.
              </p>
              <p className="text-muted small mb-4">
                Invoice #{invoiceData?._id || "N/A"} is ready.
              </p>

              <div className="d-flex gap-3">
                <Button
                  color="success"
                  className="rounded-pill px-4 py-2 fw-bold shadow-lg border-0"
                  onClick={() => {
                    setSuccessModalOpen(false);
                    handleCloseInvoice();
                  }}
                  style={{
                    background: "linear-gradient(135deg, #4caf50, #45a049)",
                    boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  color="light"
                  className="rounded-pill px-4 py-2 fw-bold border"
                  onClick={() => {
                    setSuccessModalOpen(false);
                    setInvoiceModal(true);
                  }}
                >
                  View Invoice
                </Button>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default PointOfSale;

