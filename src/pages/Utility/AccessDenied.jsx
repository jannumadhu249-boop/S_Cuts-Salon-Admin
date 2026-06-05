import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { getFirstAllowedPath } from "../../helpers/permission_helper";

const AccessDenied = () => {
  document.title = "Access Denied | S-Cuts Admin";
  const homePath = getFirstAllowedPath();

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5 font-sans">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card 
                className="overflow-hidden shadow-lg border-0 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)"
                }}
              >
                <div 
                  className="p-5 text-center position-relative overflow-hidden bg-gradient"
                  style={{
                    background: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
                  }}
                >
                  {/* Subtle vector background details */}
                  <div 
                    className="position-absolute top-50 start-50 translate-middle opacity-10"
                    style={{
                      transform: "translate(-50%, -50%) rotate(-15deg)",
                      pointerEvents: "none"
                    }}
                  >
                    <i className="bx bx-shield-x" style={{ fontSize: "240px", color: "#fff" }}></i>
                  </div>

                  <div className="mb-4 position-relative z-3">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-20 shadow-sm"
                      style={{
                        width: "80px",
                        height: "80px",
                        animation: "pulse 2s infinite"
                      }}
                    >
                      <i className="bx bx-lock-alt text-white" style={{ fontSize: "42px" }}></i>
                    </div>
                  </div>
                  <h3 className="text-white fw-bold mb-1 position-relative z-3 font-sans">Access Denied</h3>
                  <p className="text-white-50 mb-0 position-relative z-3 font-sans small text-uppercase tracking-wider">
                    Restricted Area
                  </p>
                </div>
                <CardBody className="p-5 text-center">
                  <p className="text-muted mb-4 fs-6 font-sans lh-base">
                    You do not have the required permissions to access this page. Please contact your system administrator to request access.
                  </p>
                  <div className="d-grid gap-2">
                    <Link 
                      to={homePath} 
                      className="btn btn-lg rounded-pill shadow-sm text-white fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
                      style={{
                        background: "linear-gradient(90deg, #7928CA 0%, #B800B8 100%)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(184, 0, 184, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bx bx-left-arrow-alt fs-5"></i> Back to Safety
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        .font-sans {
          font-family: 'Outfit', 'Inter', sans-serif !important;
        }
        .tracking-wider {
          letter-spacing: 0.1em;
        }
      `}</style>
    </React.Fragment>
  );
};

export default AccessDenied;
