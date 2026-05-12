import React, { useEffect, useState } from "react";
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
    InputGroup,
    InputGroupText,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "components/Common/withRouter";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { resetProfileFlag, apiError } from "../../store/actions";
import { post } from "../../helpers/api_helper";
import { URLS } from "../../url";

const ChangePassword = () => {

    document.title = "Change Password | S-Cuts Admin";

    const dispatch = useDispatch();

    // ---------- Password visibility toggles ----------
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
            password: "",
            newPassword: "",
            confirmPassword: "",
        },

        validationSchema: Yup.object({
            password: Yup.string().required("Please Enter Current Password"),
            newPassword: Yup.string()
                .required("Please Enter New Password")
                .min(6, "Password must be at least 6 characters")
                .notOneOf([Yup.ref('password')], 'New password must be different from current password'),
            confirmPassword: Yup.string()
                .required("Please Enter Confirm New Password")
                .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
        }),

        onSubmit: async (values) => {
            try {
                const response = await post(URLS.ChangePassword, {
                    password: values.password,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword
                });

                if (response.success) {
                    dispatch({ type: "PROFILE_SUCCESS", payload: response.message });
                    validation.resetForm();
                    setTimeout(() => {
                        dispatch(resetProfileFlag());
                    }, 3000);
                } else {
                    dispatch(apiError(response.message || "Password change failed"));
                }
            } catch (error) {
                const message = error.response?.data?.message || error.message || "Update failed";
                dispatch(apiError(message));
            }
        },
    });

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(resetProfileFlag());
            }, 3000);
        }
    }, [dispatch, success]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Breadcrumb title="S-Cuts" breadcrumbItem="Change Password" />

                    <Row>
                        <Col lg="12">
                            {error && <Alert color="danger">{error}</Alert>}
                            {success && <Alert color="success">{success}</Alert>}
                        </Col>
                    </Row>

                    <Card className="shadow-sm border-0">
                        <CardBody>
                            <h4 className="card-title mb-4">
                                Update Password
                            </h4>

                            <Form onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                            >
                                <Row>
                                    {/* ----- Current Password ----- */}
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label className="form-label">
                                                Current Password
                                            </Label>
                                            <InputGroup>
                                                <Input
                                                    name="password"
                                                    type={showCurrent ? "text" : "password"}
                                                    placeholder="Enter Current Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password || ""}
                                                    invalid={
                                                        validation.touched.password &&
                                                        validation.errors.password
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <InputGroupText
                                                    onClick={() => setShowCurrent(!showCurrent)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <i className={`mdi ${showCurrent ? "mdi-eye-off-outline" : "mdi-eye-outline"}`} />
                                                </InputGroupText>
                                            </InputGroup>
                                            {validation.touched.password &&
                                                validation.errors.password ? (
                                                <FormFeedback>
                                                    {validation.errors.password}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>

                                    {/* ----- New Password ----- */}
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label className="form-label">
                                                New Password
                                            </Label>
                                            <InputGroup>
                                                <Input
                                                    name="newPassword"
                                                    type={showNew ? "text" : "password"}
                                                    placeholder="Enter New Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.newPassword || ""}
                                                    invalid={
                                                        validation.touched.newPassword &&
                                                        validation.errors.newPassword
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <InputGroupText
                                                    onClick={() => setShowNew(!showNew)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <i className={`mdi ${showNew ? "mdi-eye-off-outline" : "mdi-eye-outline"}`} />
                                                </InputGroupText>
                                            </InputGroup>
                                            {validation.touched.newPassword &&
                                                validation.errors.newPassword ? (
                                                <FormFeedback>
                                                    {validation.errors.newPassword}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>

                                    {/* ----- Confirm Password ----- */}
                                    <Col md="6">
                                        <div className="mb-3">
                                            <Label className="form-label">
                                                Confirm New Password
                                            </Label>
                                            <InputGroup>
                                                <Input
                                                    name="confirmPassword"
                                                    type={showConfirm ? "text" : "password"}
                                                    placeholder="Confirm New Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.confirmPassword || ""}
                                                    invalid={
                                                        validation.touched.confirmPassword &&
                                                        validation.errors.confirmPassword
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <InputGroupText
                                                    onClick={() => setShowConfirm(!showConfirm)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <i className={`mdi ${showConfirm ? "mdi-eye-off-outline" : "mdi-eye-outline"}`} />
                                                </InputGroupText>
                                            </InputGroup>
                                            {validation.touched.confirmPassword &&
                                                validation.errors.confirmPassword ? (
                                                <FormFeedback>
                                                    {validation.errors.confirmPassword}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>

                                <div className="text-end mt-4">
                                    <Button
                                        type="submit"
                                        color="danger"
                                        className="px-4"
                                    >
                                        Update Password
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

export default withRouter(ChangePassword);