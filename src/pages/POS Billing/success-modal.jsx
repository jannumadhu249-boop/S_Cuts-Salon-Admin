        {/* ─── Modal Success Payment ──────────────────────────────────────────────── */}
        <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(false)} centered backdrop="static" keyboard={false} className="success-modal">
          <div className="modal-content border-0 rounded-4 text-center" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}>
            <ModalBody className="px-4 py-5 d-flex flex-column align-items-center justify-content-center">
              <div className="success-checkmark-wrapper mb-4" style={{ animation: 'scaleIn 0.6s ease-out' }}>
                <div className="success-checkmark" style={{ width: '100px', height: '100px' }}>
                  <div className="check-icon" style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#4caf50', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.3)'
                  }}>
                    <i className="bx bx-check fs-1 text-white"></i>
                  </div>
                </div>
              </div>
              
              <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '28px' }}>Payment Successful! 🎉</h2>
              <p className="text-muted mb-4">Your payment has been successfully processed.</p>
              <p className="text-muted small mb-4">Now you can view your invoice & discover new products.</p>
              
              <Button
                color="success"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold shadow-lg border-0"
                onClick={handleContinueShopping}
                style={{ 
                  minWidth: '250px',
                  background: 'linear-gradient(135deg, #4caf50, #45a049)',
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                  fontSize: '16px'
                }}
              >
                Continue Shopping
              </Button>
            </ModalBody>
          </div>
        </Modal>
