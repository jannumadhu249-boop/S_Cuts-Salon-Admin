// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//     Container,
//     Row,
//     Col,
//     Card,
//     CardBody,
//     Button,
//     Input,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     FormGroup,
//     Label,
//     Alert,
//     Spinner,
//     UncontrolledTooltip,
// } from "reactstrap";
// import { post, put, del } from "../../helpers/api_helper";
// import { URLS } from "../../url";

// // ---------- Modules definition ----------
// const modules = [
//   { name: "Dashboard", key: "dashboard", hasCreate: false, hasEdit: false, hasDelete: false },
//   { name: "Appointments", key: "appointments", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Web Appointments", key: "webAppointments", hasCreate: false, hasEdit: false, hasDelete: false },
//   { name: "Point of Sale", key: "pos", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Invoice & Receipts", key: "invoiceReceipts", hasCreate: false, hasEdit: false, hasDelete: false },
//   { name: "Categories", key: "categories", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Services", key: "services", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Service Packages", key: "servicePackages", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Coupons & Offers", key: "couponsOffers", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Customers", key: "customers", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Staff Management", key: "staff", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Roles & Permissions", key: "rolesPermissions", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Products", key: "products", hasCreate: true, hasEdit: true, hasDelete: true },
//   { name: "Reports", key: "reports", hasCreate: false, hasEdit: false, hasDelete: false },
// ];

// // Helper: returns the permission types that are applicable for a module
// const getEnabledPerms = (mod) => {
//   const perms = ["view"];
//   if (mod.hasCreate) perms.push("create");
//   if (mod.hasEdit) perms.push("edit");
//   if (mod.hasDelete) perms.push("delete");
//   return perms;
// };

// // Build initial empty permissions object
// const buildInitialPermissions = () => {
//   const perms = {};
//   modules.forEach((mod) => {
//     perms[mod.key] = {
//       view: false,
//       create: false,
//       edit: false,
//       delete: false,
//     };
//   });
//   return perms;
// };

// const RolesAndPermissions = () => {
//   // ----- State -----
//   const [modal, setModal] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);

//   // Form
//   const [currentId, setCurrentId] = useState(null);
//   const [name, setName] = useState("");
//   const [permissions, setPermissions] = useState(buildInitialPermissions());
//   const [selectAll, setSelectAll] = useState(false);

//   // Refs for per‑module "All" checkboxes (indeterminate)
//   const moduleAllRefs = useRef({});

//   // ----- API Calls -----
//   const fetchRoles = useCallback(async (search = "", page = 1, limit = 10) => {
//     setLoading(true);
//     setError("");
//     try {
//       const url = `${URLS.GetRoles}?search=${search}&page=${page}&limit=${limit}`;
//       const response = await post(url, {});
//       if (response.success) {
//         setRoles(response.data || []);
//         setTotalCount(response.count || 0);
//       } else {
//         setError(response.message || "Failed to fetch roles");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching roles");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRoles(searchTerm, currentPage, rowsPerPage);
//   }, [fetchRoles, currentPage, rowsPerPage]);

//   // ----- Handlers -----
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setCurrentPage(1);
//     fetchRoles(value, 1, rowsPerPage);
//   };

//   const handleRowsPerPageChange = (e) => {
//     const value = parseInt(e.target.value);
//     setRowsPerPage(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= Math.ceil(totalCount / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   // ----- Modal toggles and form reset -----
//   const toggleModal = () => {
//     setModal(!modal);
//     if (modal) {
//       // closing
//       setName("");
//       setPermissions(buildInitialPermissions());
//       setSelectAll(false);
//       setIsEdit(false);
//       setCurrentId(null);
//     }
//   };

//   // ----- Edit role -----
//   const handleEdit = (role) => {
//     setIsEdit(true);
//     setCurrentId(role._id);
//     setName(role.name);
//     if (role.permissions) {
//       const mapped = buildInitialPermissions();
//       Object.keys(role.permissions).forEach(key => {
//         if (mapped[key]) {
//           mapped[key].view = role.permissions[key]?.view || false;
//           mapped[key].create = role.permissions[key]?.create || false;
//           mapped[key].edit = role.permissions[key]?.edit || false;
//           mapped[key].delete = role.permissions[key]?.delete || false;
//         }
//       });
//       setPermissions(mapped);
//     } else {
//       setPermissions(buildInitialPermissions());
//     }
//     setSelectAll(false);
//     setModal(true);
//   };

//   // ----- Create role -----
//   const openAddModal = () => {
//     setIsEdit(false);
//     setCurrentId(null);
//     setName("");
//     setPermissions(buildInitialPermissions());
//     setSelectAll(false);
//     setModal(true);
//   };

//   // ----- Single permission change -----
//   const handlePermissionChange = (moduleKey, permType) => {
//     setPermissions(prev => ({
//       ...prev,
//       [moduleKey]: {
//         ...prev[moduleKey],
//         [permType]: !prev[moduleKey][permType],
//       },
//     }));
//   };

//   // ----- Per‑module "All" change -----
//   const handleModuleAllChange = (moduleKey, checked) => {
//     const mod = modules.find(m => m.key === moduleKey);
//     if (!mod) return;
//     const enabledPerms = getEnabledPerms(mod);
//     const newPerms = {};
//     enabledPerms.forEach(perm => {
//       newPerms[perm] = checked;
//     });
//     // Keep disabled permissions as they were (but they won't be changed anyway)
//     setPermissions(prev => ({
//       ...prev,
//       [moduleKey]: {
//         ...prev[moduleKey],
//         ...newPerms,
//       },
//     }));
//   };

//   // ----- Global "Select All" -----
//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);
//     const newPerms = { ...permissions };
//     modules.forEach(mod => {
//       const enabledPerms = getEnabledPerms(mod);
//       enabledPerms.forEach(perm => {
//         newPerms[mod.key][perm] = newSelectAll;
//       });
//     });
//     setPermissions(newPerms);
//   };

//   // ----- Set indeterminate property on per‑module "All" checkboxes -----
//   useEffect(() => {
//     modules.forEach(mod => {
//       const enabledPerms = getEnabledPerms(mod);
//       const allChecked = enabledPerms.every(perm => permissions[mod.key]?.[perm]);
//       const someChecked = enabledPerms.some(perm => permissions[mod.key]?.[perm]);
//       const checkbox = moduleAllRefs.current[mod.key];
//       if (checkbox) {
//         checkbox.indeterminate = someChecked && !allChecked;
//       }
//     });
//   }, [permissions]);

//   // ----- Submit -----
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     const payload = {
//       name,
//       permissions,
//     };

//     try {
//       let response;
//       if (isEdit) {
//         response = await put(URLS.UpdateRole + currentId, payload);
//       } else {
//         response = await post(URLS.AddRole, payload);
//       }

//       if (response.success) {
//         setSuccess(response.message || (isEdit ? "Role updated successfully" : "Role added successfully"));
//         fetchRoles(searchTerm, currentPage, rowsPerPage);
//         toggleModal();
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(response.message || "Operation failed");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----- Delete -----
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this role?")) {
//       setLoading(true);
//       try {
//         const response = await del(URLS.DeleteRole + id);
//         if (response.success) {
//           setSuccess(response.message || "Role deleted successfully");
//           fetchRoles(searchTerm, currentPage, rowsPerPage);
//           setTimeout(() => setSuccess(""), 3000);
//         } else {
//           setError(response.message || "Delete failed");
//         }
//       } catch (err) {
//         setError("An error occurred while deleting");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;
//   const startIndex = (currentPage - 1) * rowsPerPage + 1;
//   const endIndex = Math.min(currentPage * rowsPerPage, totalCount);

//   return (
//     <React.Fragment>
//       <div className="page-content services-page dashboard-sans">
//         <Container fluid>
//           {/* Header */}
//           <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
//             <div>
//               <h3 className="fw-bold mb-0 text-dark">
//                 <i className="bx bx-category text-primary me-2"></i>Roles & Permissions
//               </h3>
//               <p className="text-muted mb-0">Manage your roles and permissions here.</p>
//             </div>
//             <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={openAddModal}>
//               <i className="bx bx-plus me-1"></i> Create Role
//             </Button>
//           </div>

//           {/* Alerts */}
//           {error && <Alert color="danger">{error}</Alert>}
//           {success && <Alert color="success">{success}</Alert>}

//           {/* Search Bar */}
//           <div className="search-section mb-4">
//             <div className="search-box bg-white rounded-pill shadow-sm border p-1 d-flex align-items-center px-3" style={{ maxWidth: '300px' }}>
//               <i className="bx bx-search text-muted me-2"></i>
//               <Input
//                 type="text"
//                 placeholder="Search Role..."
//                 className="border-0 bg-transparent p-0 form-control"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//           </div>

//           {/* Main Table Card */}
//           <Card className="border-0 rounded-4 shadow-sm table-card overflow-hidden">
//             <div className="table-header-custom border-bottom bg-white px-4 py-3">
//               <Row className="align-items-center fw-bold text-muted small text-uppercase ls-1">
//                 <Col xs={1} className="text-center">Sl. No.</Col>
//                 <Col>Role Name</Col>
//                 <Col>Created Date</Col>
//                 <Col className="text-end">Actions</Col>
//               </Row>
//             </div>

//             <CardBody className="p-0">
//               {loading && roles.length === 0 ? (
//                 <div className="text-center py-5"><Spinner color="primary" /></div>
//               ) : roles.length > 0 ? (
//                 <div className="table-responsive">
//                   {roles.map((role, index) => (
//                     <div key={index} className="px-4 py-3 border-bottom table-row-hover">
//                       <Row className="align-items-center">
//                         <Col xs={1} className="text-center fw-medium text-muted small">{startIndex + index}</Col>
//                         <Col className="fw-medium text-dark">{role.name}</Col>
//                         <Col>
//                           <span className="badge bg-light text-dark rounded-pill px-3 py-2">{role.logCreatedDate}</span>
//                         </Col>
//                         <Col className="text-end">
//                           <div className="d-flex justify-content-end gap-2">
//                             <Button color="light" size="md" className="rounded-circle border-0" onClick={() => handleEdit(role)} id={`edit-${index}`}>
//                               <i className="bx bx-edit-alt text-primary"></i>
//                             </Button>
//                             <UncontrolledTooltip placement="top" target={`edit-${index}`}>Edit</UncontrolledTooltip>

//                             <Button color="light" size="md" className="rounded-circle border-0" onClick={() => handleDelete(role._id)} id={`delete-${index}`}>
//                               <i className="bx bx-trash text-danger"></i>
//                             </Button>
//                             <UncontrolledTooltip placement="top" target={`delete-${index}`}>Delete</UncontrolledTooltip>
//                           </div>
//                         </Col>
//                       </Row>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="empty-state-wrapper py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
//                   <div className="icon-circle mb-4"><i className="bx bx-file display-4 text-muted"></i></div>
//                   <h5 className="fw-bold text-dark mb-2">No Roles found</h5>
//                   <p className="text-muted small">Create a new role to get started.</p>
//                 </div>
//               )}
//             </CardBody>

//             {/* Pagination Footer */}
//             <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center gap-3">
//                 <span className="text-muted small">Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} Roles</span>
//                 <div className="d-flex align-items-center gap-2">
//                   <span className="text-muted small">Rows per page:</span>
//                   <Input type="select" className="form-select form-select-sm rounded-pill border-0 shadow-sm bg-white" style={{ width: '70px' }} value={rowsPerPage} onChange={handleRowsPerPageChange}>
//                     <option value={10}>10</option>
//                     <option value={25}>25</option>
//                     <option value={50}>50</option>
//                   </Input>
//                 </div>
//               </div>
//               <div className="pagination-controls d-flex align-items-center gap-3">
//                 <Button color="light" className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1" disabled={currentPage === 1 || loading} onClick={() => handlePageChange(currentPage - 1)}>
//                   <i className="bx bx-chevron-left"></i> Previous
//                 </Button>
//                 <span className="text-muted small fw-medium">Page {currentPage} of {totalPages}</span>
//                 <Button color="light" className="rounded-pill px-3 py-1 bg-white border border-light-subtle small d-flex align-items-center gap-1" disabled={currentPage === totalPages || loading} onClick={() => handlePageChange(currentPage + 1)}>
//                   Next <i className="bx bx-chevron-right"></i>
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </Container>

//         {/* Add/Edit Role Modal */}
//         <Modal isOpen={modal} toggle={toggleModal} centered className="inventory-modal modal-lg">
//           <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
//             <ModalHeader toggle={toggleModal} className="border-0 pb-0 px-4 pt-4 justify-content-center position-relative">
//               <div className="text-center w-100">
//                 <h4 className="fw-bold mb-1">{isEdit ? "Update Role" : "Add New Role"}</h4>
//                 <p className="text-muted small mb-0">
//                   {isEdit ? "Update the role and its permissions." : "Fill in the details to add a new role."}
//                 </p>
//               </div>
//             </ModalHeader>

//             <hr className="my-0 opacity-10 mx-4" />

//             <form onSubmit={handleSubmit}>
//               <ModalBody className="px-5 py-4">
//                 <Row className="mb-4">
//                   <Col md={12}>
//                     <FormGroup className="mb-0">
//                       <Label className="fw-bold small mb-2">
//                         Role Name <span className="text-danger">*</span>
//                       </Label>
//                       <Input
//                         type="text"
//                         placeholder="e.g., Administrator"
//                         className="rounded-3 bg-light border-0 px-3 py-2"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 {/* Permissions Table */}
//                 <div className="permissions-section">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h6 className="fw-bold mb-0">Permissions</h6>
//                     <div className="form-check">
//                       <Input
//                         type="checkbox"
//                         id="selectAll"
//                         className="form-check-input"
//                         checked={selectAll}
//                         onChange={handleSelectAll}
//                       />
//                       <Label className="form-check-label small fw-bold" htmlFor="selectAll">
//                         Select All
//                       </Label>
//                     </div>
//                   </div>

//                   <div className="table-responsive">
//                     <table className="table table-bordered align-middle mb-0">
//                       <thead className="bg-light">
//                         <tr>
//                           <th style={{ width: '30%' }}>Module</th>
//                           <th className="text-center">All</th>
//                           <th className="text-center">View</th>
//                           <th className="text-center">Create</th>
//                           <th className="text-center">Edit</th>
//                           <th className="text-center">Delete</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {modules.map((mod) => {
//                           const enabledPerms = getEnabledPerms(mod);
//                           const allChecked = enabledPerms.every(perm => permissions[mod.key]?.[perm]);
//                           const someChecked = enabledPerms.some(perm => permissions[mod.key]?.[perm]);

//                           return (
//                             <tr key={mod.key}>
//                               <td className="fw-medium">{mod.name}</td>
//                               <td className="text-center">
//                                 <Input
//                                   type="checkbox"
//                                   checked={allChecked}
//                                   innerRef={el => moduleAllRefs.current[mod.key] = el}
//                                   onChange={(e) => handleModuleAllChange(mod.key, e.target.checked)}
//                                 />
//                               </td>
//                               <td className="text-center">
//                                 <Input
//                                   type="checkbox"
//                                   checked={permissions[mod.key]?.view || false}
//                                   onChange={() => handlePermissionChange(mod.key, 'view')}
//                                 />
//                               </td>
//                               <td className="text-center">
//                                 <Input
//                                   type="checkbox"
//                                   disabled={!mod.hasCreate}
//                                   checked={mod.hasCreate ? permissions[mod.key]?.create || false : false}
//                                   onChange={() => handlePermissionChange(mod.key, 'create')}
//                                 />
//                               </td>
//                               <td className="text-center">
//                                 <Input
//                                   type="checkbox"
//                                   disabled={!mod.hasEdit}
//                                   checked={mod.hasEdit ? permissions[mod.key]?.edit || false : false}
//                                   onChange={() => handlePermissionChange(mod.key, 'edit')}
//                                 />
//                               </td>
//                               <td className="text-center">
//                                 <Input
//                                   type="checkbox"
//                                   disabled={!mod.hasDelete}
//                                   checked={mod.hasDelete ? permissions[mod.key]?.delete || false : false}
//                                   onChange={() => handlePermissionChange(mod.key, 'delete')}
//                                 />
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </ModalBody>

//               <hr className="my-0 opacity-10 mx-4" />

//               <ModalFooter className="border-0 px-5 pb-5 pt-4 gap-3">
//                 <Button color="light" className="rounded-pill px-4 py-2 fw-bold bg-white border" onClick={toggleModal} type="button">
//                   Cancel
//                 </Button>
//                 <Button color="primary" className="rounded-pill px-4 py-2 fw-bold shadow-primary" type="submit" disabled={loading}>
//                   {loading ? <Spinner size="sm" /> : isEdit ? "Update Role" : "Add Role"}
//                 </Button>
//               </ModalFooter>
//             </form>
//           </div>
//         </Modal>
//       </div>
//     </React.Fragment>
//   );
// };

// export default RolesAndPermissions;



import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
    FormGroup,
    Label,
    Alert,
    Spinner,
    UncontrolledTooltip,
} from "reactstrap";
import { post, put, del } from "../../helpers/api_helper";
import { URLS } from "../../url";

// ---------- Modules definition ----------
const modules = [
  { name: "Dashboard", key: "dashboard", hasCreate: false, hasEdit: false, hasDelete: false },
  { name: "Appointments", key: "appointments", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Web Appointments", key: "webAppointments", hasCreate: false, hasEdit: false, hasDelete: false },
  { name: "Point of Sale", key: "pos", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Invoice & Receipts", key: "invoiceReceipts", hasCreate: false, hasEdit: false, hasDelete: false },
  { name: "Categories", key: "categories", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Services", key: "services", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Service Packages", key: "servicePackages", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Coupons & Offers", key: "couponsOffers", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Customers", key: "customers", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Staff Management", key: "staff", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Roles & Permissions", key: "rolesPermissions", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Products", key: "products", hasCreate: true, hasEdit: true, hasDelete: true },
  { name: "Reports", key: "reports", hasCreate: false, hasEdit: false, hasDelete: false },
];

// Helper: returns the permission types that are applicable for a module
const getEnabledPerms = (mod) => {
  const perms = ["view"];
  if (mod.hasCreate) perms.push("create");
  if (mod.hasEdit) perms.push("edit");
  if (mod.hasDelete) perms.push("delete");
  return perms;
};

// Build initial empty permissions object
const buildInitialPermissions = () => {
  const perms = {};
  modules.forEach((mod) => {
    perms[mod.key] = {
      view: false,
      create: false,
      edit: false,
      delete: false,
    };
  });
  return perms;
};

const RolesAndPermissions = () => {
  // ----- State -----
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [allRoles, setAllRoles] = useState([]);           // Full list from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Form
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState(buildInitialPermissions());
  const [selectAll, setSelectAll] = useState(false);

  // Refs for per‑module "All" checkboxes (indeterminate)
  const moduleAllRefs = useRef({});

  // ----- API Calls -----
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await post(URLS.GetRoles, {});   // POST with empty body, as per API
      if (response.success) {
        setAllRoles(response.data || []);
      } else {
        setError(response.message || "Failed to fetch roles");
      }
    } catch (err) {
      setError("An error occurred while fetching roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // ----- Derived data for search & pagination -----
  const filteredRoles = useMemo(() => {
    if (!searchTerm.trim()) return allRoles;
    return allRoles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allRoles, searchTerm]);

  const totalCount = filteredRoles.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalCount);

  const paginatedRoles = useMemo(() => {
    return filteredRoles.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [filteredRoles, currentPage, rowsPerPage]);

  // Reset page when search changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // ----- Modal toggles and form reset -----
  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      // closing
      setName("");
      setPermissions(buildInitialPermissions());
      setSelectAll(false);
      setIsEdit(false);
      setCurrentId(null);
    }
  };

  // ----- Edit role -----
  const handleEdit = (role) => {
    setIsEdit(true);
    setCurrentId(role._id);
    setName(role.name);
    // Map the API's permissions array back to the object shape used in the UI
    const mapped = buildInitialPermissions();
    if (role.permissions && Array.isArray(role.permissions)) {
      role.permissions.forEach(p => {
        const mod = modules.find(m => m.name === p.module);
        if (mod) {
          mapped[mod.key].view = p.view || false;
          if (mod.hasCreate) mapped[mod.key].create = p.create || false;
          if (mod.hasEdit) mapped[mod.key].edit = p.edit || false;
          if (mod.hasDelete) mapped[mod.key].delete = p.delete || false;
        }
      });
    }
    setPermissions(mapped);
    setSelectAll(false);
    setModal(true);
  };

  // ----- Create role -----
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentId(null);
    setName("");
    setPermissions(buildInitialPermissions());
    setSelectAll(false);
    setModal(true);
  };

  // ----- Single permission change -----
  const handlePermissionChange = (moduleKey, permType) => {
    setPermissions(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [permType]: !prev[moduleKey][permType],
      },
    }));
  };

  // ----- Per‑module "All" change -----
  const handleModuleAllChange = (moduleKey, checked) => {
    const mod = modules.find(m => m.key === moduleKey);
    if (!mod) return;
    const enabledPerms = getEnabledPerms(mod);
    const newPerms = {};
    enabledPerms.forEach(perm => {
      newPerms[perm] = checked;
    });
    setPermissions(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        ...newPerms,
      },
    }));
  };

  // ----- Global "Select All" -----
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newPerms = { ...permissions };
    modules.forEach(mod => {
      const enabledPerms = getEnabledPerms(mod);
      enabledPerms.forEach(perm => {
        newPerms[mod.key][perm] = newSelectAll;
      });
    });
    setPermissions(newPerms);
  };

  // ----- Set indeterminate property on per‑module "All" checkboxes -----
  useEffect(() => {
    modules.forEach(mod => {
      const enabledPerms = getEnabledPerms(mod);
      const allChecked = enabledPerms.every(perm => permissions[mod.key]?.[perm]);
      const someChecked = enabledPerms.some(perm => permissions[mod.key]?.[perm]);
      const checkbox = moduleAllRefs.current[mod.key];
      if (checkbox) {
        checkbox.indeterminate = someChecked && !allChecked;
      }
    });
  }, [permissions]);

  // ----- Build permissions array for API payload -----
  const buildPermissionsPayload = () => {
    return modules.map(mod => {
      const p = permissions[mod.key];
      const enabledPerms = getEnabledPerms(mod);
      const allChecked = enabledPerms.every(perm => p[perm]);
      return {
        module: mod.name,
        all: allChecked,
        view: p.view,
        create: p.create,
        edit: p.edit,
        delete: p.delete,
      };
    });
  };

  // ----- Submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      name,
      permissions: buildPermissionsPayload(),
    };

    try {
      let response;
      if (isEdit) {
        response = await put(`${URLS.UpdateRole}${currentId}`, payload);
      } else {
        response = await post(URLS.AddRole, payload);
      }

      if (response.success) {
        setSuccess(response.message || (isEdit ? "Role updated successfully" : "Role added successfully"));
        fetchRoles();                       // re-fetch all roles
        toggleModal();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.message || "Operation failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ----- Delete -----
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setLoading(true);
      try {
        const response = await del(`${URLS.DeleteRole}${id}`);
        if (response.success) {
          setSuccess(response.message || "Role deleted successfully");
          fetchRoles();
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError(response.message || "Delete failed");
        }
      } catch (err) {
        setError("An error occurred while deleting");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content services-page dashboard-sans">
        <Container fluid>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                <i className="bx bx-category text-primary me-2"></i>Roles & Permissions
              </h3>
              <p className="text-muted mb-0">Manage your roles and permissions here.</p>
            </div>
            <Button color="primary" className="rounded-pill px-4 shadow-primary" onClick={openAddModal}>
              <i className="bx bx-plus me-1"></i> Create Role
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
                placeholder="Search Role..."
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
                <Col xs={1} className="text-center">Sl. No.</Col>
                <Col>Role Name</Col>
                <Col>Created Date</Col>
                <Col className="text-end">Actions</Col>
              </Row>
            </div>

            <CardBody className="p-0">
              {loading && allRoles.length === 0 ? (
                <div className="text-center py-5"><Spinner color="primary" /></div>
              ) : paginatedRoles.length > 0 ? (
                <div className="table-responsive">
                  {paginatedRoles.map((role, index) => (
                    <div key={index} className="px-4 py-3 border-bottom table-row-hover">
                      <Row className="align-items-center">
                        <Col xs={1} className="text-center fw-medium text-muted small">{startIndex + index}</Col>
                        <Col className="fw-medium text-dark">{role.name}</Col>
                        <Col>
                          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                            {new Date(role.logCreatedDate).toLocaleDateString()}
                          </span>
                        </Col>
                        <Col className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Button color="light" size="md" className="rounded-circle border-0" onClick={() => handleEdit(role)} id={`edit-${index}`}>
                              <i className="bx bx-edit-alt text-primary"></i>
                            </Button>
                            <UncontrolledTooltip placement="top" target={`edit-${index}`}>Edit</UncontrolledTooltip>

                            <Button color="light" size="md" className="rounded-circle border-0" onClick={() => handleDelete(role._id)} id={`delete-${index}`}>
                              <i className="bx bx-trash text-danger"></i>
                            </Button>
                            <UncontrolledTooltip placement="top" target={`delete-${index}`}>Delete</UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-wrapper py-5 my-5 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                  <div className="icon-circle mb-4"><i className="bx bx-file display-4 text-muted"></i></div>
                  <h5 className="fw-bold text-dark mb-2">No Roles found</h5>
                  <p className="text-muted small">Create a new role to get started.</p>
                </div>
              )}
            </CardBody>

            {/* Pagination Footer */}
            <div className="table-footer-custom bg-light bg-opacity-50 border-top px-4 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted small">
                  Showing {totalCount > 0 ? startIndex : 0}-{endIndex} of {totalCount} Roles
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

        {/* MODERNISED MODAL – ONLY THIS PART CHANGED */}
        <Modal isOpen={modal} toggle={toggleModal} centered className="modern-modal modal-lg">
          <style>{`
            .modern-modal .modal-content {
              border: none;
              border-radius: 1.5rem;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.5);
            }
            .modern-modal .modal-header {
              border-bottom: 1px solid rgba(0,0,0,0.05);
              background: transparent;
              padding: 1.5rem 2rem 0.5rem;
            }
            .modern-modal .modal-body {
              padding: 1.5rem 2rem;
            }
            .modern-modal .modal-footer {
              border-top: 1px solid rgba(0,0,0,0.05);
              padding: 1rem 2rem 1.5rem;
            }
            .modern-modal .form-control, .modern-modal .form-select {
              border-radius: 0.75rem;
              border: 1px solid #e2e8f0;
              background: rgba(255,255,255,0.7);
              padding: 0.6rem 1rem;
              transition: all 0.2s;
            }
            .modern-modal .form-control:focus, .modern-modal .form-select:focus {
              border-color: #7c8aff;
              box-shadow: 0 0 0 3px rgba(124,138,255,0.2);
              background: white;
            }
            .modern-modal .permissions-table {
              border-radius: 1rem;
              overflow: hidden;
              border: 1px solid rgba(0,0,0,0.05);
            }
            .modern-modal .permissions-table thead {
              background: #f8fafc;
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #475569;
            }
            .modern-modal .permissions-table tbody tr:hover {
              background: #f1f5f9;
            }
            .modern-modal .permissions-table input[type="checkbox"] {
              transform: scale(1.15);
              accent-color: #7c8aff;
            }
            .modern-modal .btn-gradient {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border: none;
              color: white;
              border-radius: 50px;
              padding: 0.6rem 2rem;
              font-weight: 600;
              transition: all 0.2s;
              box-shadow: 0 4px 6px -1px rgba(102,126,234,0.4);
            }
            .modern-modal .btn-gradient:hover {
              transform: translateY(-1px);
              box-shadow: 0 10px 15px -3px rgba(102,126,234,0.5);
            }
            .modern-modal .btn-outline-light {
              border-radius: 50px;
              padding: 0.6rem 2rem;
              font-weight: 600;
              border: 1px solid #e2e8f0;
              background: white;
              transition: all 0.2s;
            }
            .modern-modal .btn-outline-light:hover {
              background: #f8fafc;
              border-color: #cbd5e1;
            }
          `}</style>
          <div className="modal-content">
            <ModalHeader toggle={toggleModal}>
              <div className="text-center w-100">
                <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                  {isEdit ? 'Update Role' : 'Add New Role'}
                </h4>
                <p className="text-muted small mb-0">
                  {isEdit
                    ? 'Update the role and its permissions.'
                    : 'Fill in the details to add a new role.'}
                </p>
              </div>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Row className="mb-4">
                  <Col md={12}>
                    <FormGroup className="mb-0">
                      <Label className="fw-bold small mb-2">
                        Role Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g., Administrator"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="permissions-section">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Permissions</h6>
                    <div className="form-check">
                      <Input
                        type="checkbox"
                        id="selectAll"
                        className="form-check-input"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      <Label className="form-check-label small fw-bold" htmlFor="selectAll">
                        Select All
                      </Label>
                    </div>
                  </div>
                  <div className="table-responsive permissions-table">
                    <table className="table table-bordered align-middle mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: '30%' }}>Module</th>
                          <th className="text-center">All</th>
                          <th className="text-center">View</th>
                          <th className="text-center">Create</th>
                          <th className="text-center">Edit</th>
                          <th className="text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modules.map((mod) => {
                          const enabledPerms = getEnabledPerms(mod);
                          const allChecked = enabledPerms.every(
                            (perm) => permissions[mod.key]?.[perm]
                          );
                          return (
                            <tr key={mod.key}>
                              <td className="fw-medium">{mod.name}</td>
                              <td className="text-center">
                                <Input
                                  type="checkbox"
                                  checked={allChecked}
                                  innerRef={(el) => (moduleAllRefs.current[mod.key] = el)}
                                  onChange={(e) =>
                                    handleModuleAllChange(mod.key, e.target.checked)
                                  }
                                />
                              </td>
                              <td className="text-center">
                                <Input
                                  type="checkbox"
                                  checked={permissions[mod.key]?.view || false}
                                  onChange={() => handlePermissionChange(mod.key, 'view')}
                                />
                              </td>
                              <td className="text-center">
                                <Input
                                  type="checkbox"
                                  disabled={!mod.hasCreate}
                                  checked={
                                    mod.hasCreate
                                      ? permissions[mod.key]?.create || false
                                      : false
                                  }
                                  onChange={() => handlePermissionChange(mod.key, 'create')}
                                />
                              </td>
                              <td className="text-center">
                                <Input
                                  type="checkbox"
                                  disabled={!mod.hasEdit}
                                  checked={
                                    mod.hasEdit
                                      ? permissions[mod.key]?.edit || false
                                      : false
                                  }
                                  onChange={() => handlePermissionChange(mod.key, 'edit')}
                                />
                              </td>
                              <td className="text-center">
                                <Input
                                  type="checkbox"
                                  disabled={!mod.hasDelete}
                                  checked={
                                    mod.hasDelete
                                      ? permissions[mod.key]?.delete || false
                                      : false
                                  }
                                  onChange={() => handlePermissionChange(mod.key, 'delete')}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="btn-outline-light"
                  onClick={toggleModal}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="btn-gradient"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : isEdit ? (
                    'Update Role'
                  ) : (
                    'Add Role'
                  )}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default RolesAndPermissions;