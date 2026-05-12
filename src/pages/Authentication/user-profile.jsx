// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Alert,
//   CardBody,
//   Button,
//   Label,
//   Input,
//   FormFeedback,
//   Form,
// } from "reactstrap";

// // Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// //redux
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";
// import withRouter from "components/Common/withRouter";

// //Import Breadcrumb
// import Breadcrumb from "../../components/Common/Breadcrumb";

// import avatar from "../../assets/images/users/avatar-1.jpg";
// // actions
// import { editProfile, resetProfileFlag } from "../../store/actions";

// const UserProfile = () => {

//   //meta title
//   document.title = "Profile | S-Cuts Admin";

//   const dispatch = useDispatch();

//   const [email, setemail] = useState("");
//   const [name, setname] = useState("");
//   const [idx, setidx] = useState(1);

//   const ProfileProperties = createSelector(
//     (state) => state.Profile,
//     (profile) => ({
//       error: profile.error,
//       success: profile.success,
//     })
//   );

//   const {
//     error,
//     success
//   } = useSelector(ProfileProperties);

//   useEffect(() => {
//     if (localStorage.getItem("authUser")) {
//       const obj = JSON.parse(localStorage.getItem("authUser"));
//       if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//         setname(obj.displayName);
//         setemail(obj.email);
//         setidx(obj.uid);
//       } else if (
//         process.env.REACT_APP_DEFAULTAUTH === "fake" ||
//         process.env.REACT_APP_DEFAULTAUTH === "jwt"
//       ) {
//         setname(obj.username);
//         setemail(obj.email);
//         setidx(obj.uid);
//       }
//       setTimeout(() => {
//         dispatch(resetProfileFlag());
//       }, 3000);
//     }
//   }, [dispatch, success]);

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       username: name || '',
//       idx: idx || '',
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().required("Please Enter Your UserName"),
//     }),
//     onSubmit: (values) => {
//       dispatch(editProfile(values));
//     }
//   });


//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumb */}
//           <Breadcrumb title="S-Cuts" breadcrumbItem="Profile" />

//           <Row>
//             <Col lg="12">
//               {error && error ? <Alert color="danger">{error}</Alert> : null}
//               {success ? <Alert color="success">{success}</Alert> : null}

//               <Card>
//                 <CardBody>
//                   <div className="d-flex">
//                     <div className="ms-3">
//                       <img
//                         src={avatar}
//                         alt=""
//                         className="avatar-md rounded-circle img-thumbnail"
//                       />
//                     </div>
//                     <div className="flex-grow-1 align-self-center">
//                       <div className="text-muted">
//                         <h5>{name}</h5>
//                         <p className="mb-1">{email}</p>
//                         <p className="mb-0">Id no: #{idx}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           <h4 className="card-title mb-4">Change User Name</h4>

//           <Card>
//             <CardBody>
//               <Form
//                 className="form-horizontal"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   validation.handleSubmit();
//                   return false;
//                 }}
//               >
//                 <div className="form-group">
//                   <Label className="form-label">User Name</Label>
//                   <Input
//                     name="username"
//                     // value={name}
//                     className="form-control"
//                     placeholder="Enter User Name"
//                     type="text"
//                     onChange={validation.handleChange}
//                     onBlur={validation.handleBlur}
//                     value={validation.values.username || ""}
//                     invalid={
//                       validation.touched.username && validation.errors.username ? true : false
//                     }
//                   />
//                   {validation.touched.username && validation.errors.username ? (
//                     <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
//                   ) : null}
//                   <Input name="idx" value={idx} type="hidden" />
//                 </div>
//                 <div className="text-center mt-4">
//                   <Button type="submit" color="danger">
//                     Update User Name
//                   </Button>
//                 </div>
//               </Form>
//             </CardBody>
//           </Card>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default withRouter(UserProfile);




import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "components/Common/withRouter";

import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";

import { editProfile, resetProfileFlag, apiError, loginSuccess } from "../../store/actions";
import { post, put } from "../../helpers/api_helper";
import { URLS } from "../../url";

const UserProfile = () => {

  document.title = "Profile | S-Cuts Admin";

  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(avatar);

  const ProfileProperties = createSelector(
    (state) => state.Profile,
    (profile) => ({
      error: profile.error,
      success: profile.success,
    })
  );

  const { error, success } = useSelector(ProfileProperties);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      idx: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter User Name"),

      email: Yup.string()
        .email("Invalid Email")
        .required("Please Enter Email"),

      phone: Yup.string().required("Please Enter Phone Number"),

      address: Yup.string().required("Please Enter Address"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await put(URLS.UpdateProfile, {
          name: values.username,
          email: values.email,
          phone: values.phone,
          address: values.address
        });

        if (response.success) {
          // Update localStorage
          const authUser = JSON.parse(localStorage.getItem("authUser"));
          authUser.user = response.data;
          localStorage.setItem("authUser", JSON.stringify(authUser));
          
          dispatch(loginSuccess(authUser));
          dispatch({ type: "PROFILE_SUCCESS", payload: response.message });
          
          setTimeout(() => {
            dispatch(resetProfileFlag());
          }, 3000);
        }
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Update failed";
        dispatch(apiError(message));
      }
    },
  });

  const fetchProfile = async () => {
    try {
      const response = await post(URLS.GetProfile, {});
      if (response.success) {
        const profile = response.profile;
        validation.setValues({
          username: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          idx: profile._id || "",
        });

        if (profile.image) {
          setProfileImage(URLS.ImageUrl + profile.image.replace(/\\/g, '/'));
        }
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await put(URLS.UpdateProfilePic, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.success) {
          const updatedUser = response.data;
          setProfileImage(URLS.ImageUrl + updatedUser.image.replace(/\\/g, '/'));
          
          // Update localStorage
          const authUser = JSON.parse(localStorage.getItem("authUser"));
          authUser.user = updatedUser;
          localStorage.setItem("authUser", JSON.stringify(authUser));
          
          dispatch(loginSuccess(authUser));
          dispatch({ type: "PROFILE_SUCCESS", payload: response.message });
        }
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Image upload failed";
        dispatch(apiError(message));
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Breadcrumb title="S-Cuts" breadcrumbItem="Profile" />

          {/* Alerts */}
          <Row>
            <Col lg="12">
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
            </Col>
          </Row>

          {/* Profile Card */}
          <Card className="shadow-sm border-0 mb-4">
            <CardBody>
              <Row className="align-items-center">

                <Col lg="3" className="text-center">
                  <div className="position-relative d-inline-block">

                    <img
                      src={profileImage}
                      alt="profile"
                      className="rounded-circle img-thumbnail"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />

                    <label
                      htmlFor="profile-upload"
                      className="btn btn-danger position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        padding: "0",
                      }}
                    >
                      <i className="bx bx-camera text-white" style={{ fontSize: "24px" }}></i>
                    </label>

                    <input
                      type="file"
                      id="profile-upload"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </Col>

                <Col lg="9">
                  <div className="ps-2 mt-4 mt-lg-0">

                    <h3 className="fw-bold mb-2">
                      {validation.values.username}
                    </h3>
                    <h4 className="text-muted mb-1">
                      {validation.values.email}
                    </h4>

                    {/* <Row className="g-3 mt-2">

                      <Col md="6">
                        <div className="border rounded p-3 h-100">
                          <p className="text-muted mb-1">Email</p>
                          <h6 className="mb-0">
                            {validation.values.email || "N/A"}
                          </h6>
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="border rounded p-3 h-100">
                          <p className="text-muted mb-1">Phone Number</p>
                          <h6 className="mb-0">
                            {validation.values.phone || "N/A"}
                          </h6>
                        </div>
                      </Col>

                      <Col md="12">
                        <div className="border rounded p-3">
                          <p className="text-muted mb-1">Address</p>
                          <h6 className="mb-0">
                            {validation.values.address || "N/A"}
                          </h6>
                        </div>
                      </Col>

                    </Row> */}
                  </div>
                </Col>

              </Row>
            </CardBody>
          </Card>

          {/* Update Form */}
          <Card className="shadow-sm border-0">
            <CardBody>

              <h4 className="card-title mb-4">
                Update Profile Information
              </h4>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >

                <Row>

                  {/* User Name */}
                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">
                        User Name
                      </Label>

                      <Input
                        name="username"
                        type="text"
                        placeholder="Enter User Name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username &&
                          validation.errors.username
                            ? true
                            : false
                        }
                      />

                      {validation.touched.username &&
                      validation.errors.username ? (
                        <FormFeedback>
                          {validation.errors.username}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  {/* Email */}
                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">
                        Email Address
                      </Label>

                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email &&
                          validation.errors.email
                            ? true
                            : false
                        }
                      />

                      {validation.touched.email &&
                      validation.errors.email ? (
                        <FormFeedback>
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  {/* Phone */}
                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">
                        Phone Number
                      </Label>

                      <Input
                        name="phone"
                        type="text"
                        placeholder="Enter Phone Number"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone &&
                          validation.errors.phone
                            ? true
                            : false
                        }
                      />

                      {validation.touched.phone &&
                      validation.errors.phone ? (
                        <FormFeedback>
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  {/* Address */}
                  <Col md="6">
                    <div className="mb-3">
                      <Label className="form-label">
                        Address
                      </Label>

                      <Input
                        name="address"
                        type="textarea"
                        rows="3"
                        placeholder="Enter Address"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.address || ""}
                        invalid={
                          validation.touched.address &&
                          validation.errors.address
                            ? true
                            : false
                        }
                      />

                      {validation.touched.address &&
                      validation.errors.address ? (
                        <FormFeedback>
                          {validation.errors.address}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                </Row>

                <Input
                  name="idx"
                  value={validation.values.idx}
                  type="hidden"
                />

                <div className="text-end mt-4">
                  <Button
                    type="submit"
                    color="danger"
                    className="px-4"
                  >
                    Update Profile
                  </Button>
                </div>

              </Form>

            </CardBody>
          </Card>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);