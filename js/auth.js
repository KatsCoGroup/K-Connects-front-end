// Authentication Modal System
class AuthModal {
  constructor() {
    this.currentScreen = 'login';
    this.userData = {};
    this.init();
  }

  init() {
    this.createModal();
    this.attachEventListeners();
  }

  createModal() {
    const modalHTML = `
      <div class="modal-overlay" id="authModal">
        <div class="auth-modal">
          <button class="modal-close" onclick="authModal.close()">&times;</button>
          <div id="modalContent"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  attachEventListeners() {
    // Connect wallet buttons
    document.querySelectorAll('.btn--primary, .btn.btn--primary').forEach(btn => {
      if (btn.textContent.includes('CONNECT WALLET') || btn.textContent.includes('ENROLL NOW')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open('login');
        });
      }
    });

    // Click outside to close
    document.getElementById('authModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'authModal') {
        this.close();
      }
    });
  }

  open(screen = 'login') {
    this.currentScreen = screen;
    this.render();
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  render() {
    const content = document.getElementById('modalContent');
    const screens = {
      login: this.getLoginScreen(),
      signup: this.getSignupScreen(),
      mobile: this.getMobileScreen(),
      verify: this.getVerifyScreen(),
      getWallet: this.getWalletOptionsScreen(),
      connectWallet: this.getConnectWalletScreen(),
      kyc: this.getKYCScreen(),
      success: this.getSuccessScreen(),
      payout: this.getPayoutScreen(),
      bankDetails: this.getBankDetailsScreen(),
      paypalEmail: this.getPaypalEmailScreen()
    };

    content.innerHTML = screens[this.currentScreen] || screens.login;
    this.attachFormListeners();
  }

  getLoginScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">K</div>
        <h2 class="auth-modal__title">Login</h2>
        <p class="auth-modal__subtitle">Welcome back! Please login to your account</p>
      </div>

      <div class="form-tabs">
        <button class="form-tab active" data-tab="email">📧 Email</button>
        <button class="form-tab" data-tab="phone">📱 Phone</button>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" placeholder="Enter your username" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="Enter your password" required>
        </div>

        <div class="form-checkbox">
          <input type="checkbox" id="remember">
          <label for="remember">Remember me</label>
        </div>

        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.showScreen('mobile')">Login</button>
        
        <div class="form-divider">Or login with</div>

        <div class="social-buttons">
          <button class="btn-social" title="Google">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button class="btn-social" title="Apple">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
          <button class="btn-social" title="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>

        <div class="form-footer">
          Don't have an account? <a href="#" onclick="authModal.showScreen('signup'); return false;">Sign up</a>
        </div>
      </form>
    `;
  }

  getSignupScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">K</div>
        <h2 class="auth-modal__title">Sign Up</h2>
        <p class="auth-modal__subtitle">Create your account to get started</p>
      </div>

      <div class="form-tabs">
        <button class="form-tab active" data-tab="personal">👤 Personal</button>
        <button class="form-tab" data-tab="business">🏢 Business</button>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="Enter your email" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" placeholder="Choose a username" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="Create a password" required>
        </div>

        <div class="form-checkbox">
          <input type="checkbox" id="terms" required>
          <label for="terms">I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></label>
        </div>

        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.showScreen('mobile')">Sign Up</button>
        
        <div class="form-divider">Or sign up with</div>

        <div class="social-buttons">
          <button class="btn-social" title="Google">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button class="btn-social" title="Apple">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
          <button class="btn-social" title="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>

        <div class="form-footer">
          Already have an account? <a href="#" onclick="authModal.showScreen('login'); return false;">Login</a>
        </div>
      </form>
    `;
  }

  getMobileScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">📱</div>
        <h2 class="auth-modal__title">Enter Mobile Number</h2>
        <p class="auth-modal__subtitle">We'll send you a verification code</p>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required>
        </div>

        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.showScreen('verify')">Send Verification Code</button>
        <button type="button" class="btn-auth btn-auth--secondary" onclick="authModal.showScreen('getWallet')">Skip for Now</button>
      </form>
    `;
  }

  getVerifyScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">✓</div>
        <h2 class="auth-modal__title">Verify Your Number</h2>
        <p class="auth-modal__subtitle">Enter the 6-digit code sent to your phone</p>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="otp-inputs">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
          <input type="text" class="otp-input" maxlength="1" pattern="[0-9]">
        </div>

        <div class="resend-link">
          Didn't receive code? <a href="#">Resend</a>
        </div>

        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.showScreen('getWallet')">Verify</button>
      </form>
    `;
  }

  getWalletOptionsScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">💼</div>
        <h2 class="auth-modal__title">Get a Wallet</h2>
        <p class="auth-modal__subtitle">Start Exploring Web3</p>
      </div>

      <div class="wallet-grid">
        <div class="wallet-option" onclick="authModal.showScreen('connectWallet')">
          <div class="wallet-icon">🦊</div>
          <div class="wallet-info">
            <h3 class="wallet-name">MetaMask</h3>
            <p class="wallet-desc">Most popular Web3 wallet</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('connectWallet')">
          <div class="wallet-icon">🔵</div>
          <div class="wallet-info">
            <h3 class="wallet-name">Coinbase Wallet</h3>
            <p class="wallet-desc">User-friendly and secure</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('connectWallet')">
          <div class="wallet-icon">🔷</div>
          <div class="wallet-info">
            <h3 class="wallet-name">Trust Wallet</h3>
            <p class="wallet-desc">Mobile-first wallet</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('connectWallet')">
          <div class="wallet-icon">🌈</div>
          <div class="wallet-info">
            <h3 class="wallet-name">Rainbow</h3>
            <p class="wallet-desc">Beautiful and simple</p>
          </div>
        </div>
      </div>

      <button class="btn-auth btn-auth--secondary" onclick="authModal.showScreen('kyc')">I already have a wallet</button>
    `;
  }

  getConnectWalletScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">🔗</div>
        <h2 class="auth-modal__title">Connect Wallet</h2>
        <p class="auth-modal__subtitle">Choose your preferred cryptocurrency wallet</p>
      </div>

      <div class="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>

      <div class="wallet-grid">
        <div class="wallet-option" onclick="authModal.connectMetaMask()">
          <div class="wallet-icon">🦊</div>
          <div class="wallet-info">
            <h3 class="wallet-name">MetaMask</h3>
            <p class="wallet-desc">Connect with MetaMask</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('kyc')">
          <div class="wallet-icon">💰</div>
          <div class="wallet-info">
            <h3 class="wallet-name">Coinbase Wallet</h3>
            <p class="wallet-desc">Scan with Coinbase</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('kyc')">
          <div class="wallet-icon">🌐</div>
          <div class="wallet-info">
            <h3 class="wallet-name">WalletConnect</h3>
            <p class="wallet-desc">Scan with WalletConnect</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('kyc')">
          <div class="wallet-icon">🔷</div>
          <div class="wallet-info">
            <h3 class="wallet-name">USDT</h3>
            <p class="wallet-desc">Tether wallet</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('kyc')">
          <div class="wallet-icon">🟢</div>
          <div class="wallet-info">
            <h3 class="wallet-name">USDC</h3>
            <p class="wallet-desc">USD Coin wallet</p>
          </div>
        </div>

        <div class="wallet-option" onclick="authModal.showScreen('kyc')">
          <div class="wallet-icon">💎</div>
          <div class="wallet-info">
            <h3 class="wallet-name">Other Wallets</h3>
            <p class="wallet-desc">Connect other wallet</p>
          </div>
        </div>
      </div>

      <div class="form-checkbox" style="justify-content:center">
        <input type="checkbox" id="terms2" required>
        <label for="terms2">I agree to the Terms and Conditions</label>
      </div>
    `;
  }

  getKYCScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">📄</div>
        <h2 class="auth-modal__title">KYC Verification</h2>
        <p class="auth-modal__subtitle">Upload your ID for verification</p>
      </div>

      <div class="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">Document Type</label>
          <select class="form-input">
            <option>Driver's License</option>
            <option>Passport</option>
            <option>National ID</option>
          </select>
        </div>

        <div class="upload-area">
          <div class="upload-icon">📤</div>
          <p class="upload-text">Click to upload or drag and drop</p>
          <p class="upload-hint">PNG, JPG or PDF (max. 5MB)</p>
        </div>

        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.showScreen('success')">Submit Verification</button>
        <button type="button" class="btn-auth btn-auth--secondary" onclick="authModal.showScreen('success')">Skip for Now</button>
      </form>
    `;
  }

  getSuccessScreen() {
    return `
      <div class="success-screen">
        <div class="success-icon">✓</div>
        <h2 class="auth-modal__title">Account Created</h2>
        <p class="auth-modal__subtitle">Your account has been created successfully!</p>
        
        <button class="btn-auth btn-auth--primary" onclick="authModal.showScreen('payout')" style="margin-top:32px">Continue</button>
        <button class="btn-auth btn-auth--secondary" onclick="authModal.close()">Skip for Now</button>
      </div>
    `;
  }

  getPayoutScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">💳</div>
        <h2 class="auth-modal__title">Select Your Payout Method</h2>
        <p class="auth-modal__subtitle">Choose how you'd like to receive payments</p>
      </div>

      <div class="payout-grid">
        <div class="payout-option selected" onclick="authModal.showScreen('bankDetails')">
          <div class="payout-icon">🏦</div>
          <h3 class="payout-name">Bank Transfer</h3>
          <p class="payout-desc">Direct bank deposit</p>
        </div>

        <div class="payout-option" onclick="authModal.showScreen('connectWallet')">
          <div class="payout-icon">💰</div>
          <h3 class="payout-name">Crypto Wallet</h3>
          <p class="payout-desc">Get paid in crypto</p>
        </div>

        <div class="payout-option" onclick="authModal.showScreen('paypalEmail')">
          <div class="payout-icon">💙</div>
          <h3 class="payout-name">PayPal</h3>
          <p class="payout-desc">PayPal payments</p>
        </div>
      </div>

      <p style="text-align:center; color:#999; font-size:13px; margin-top:20px">
        You can update this anytime in settings
      </p>

      <button class="btn-auth btn-auth--primary" style="margin-top:24px" onclick="authModal.close()">Save</button>
    `;
  }

  getBankDetailsScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">🏦</div>
        <h2 class="auth-modal__title">Add Your Bank Details</h2>
        <p class="auth-modal__subtitle">Enter your bank information for payouts</p>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">Account Holder Name</label>
          <input type="text" class="form-input" placeholder="John Doe" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Bank Name</label>
          <input type="text" class="form-input" placeholder="Your Bank" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Account Number</label>
          <input type="text" class="form-input" placeholder="1234567890" required>
        </div>

        <div class="form-group">
          <label class="form-label">Country</label>
          <select class="form-input">
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>

        <button type="button" class="btn-auth btn-auth--secondary" onclick="authModal.showScreen('payout')">Back</button>
        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.close()">Save & Continue</button>
      </form>
    `;
  }

  getPaypalEmailScreen() {
    return `
      <div class="auth-modal__header">
        <div class="auth-modal__logo">💙</div>
        <h2 class="auth-modal__title">Add PayPal Email</h2>
        <p class="auth-modal__subtitle">Enter your PayPal email for payouts</p>
      </div>

      <form class="auth-form" onsubmit="return false;">
        <div class="form-group">
          <label class="form-label">PayPal Email</label>
          <input type="email" class="form-input" placeholder="your@email.com" required>
        </div>

        <p style="text-align:left; color:#666; font-size:13px; margin:16px 0">
          Make sure this email is linked to your PayPal account
        </p>

        <button type="button" class="btn-auth btn-auth--secondary" onclick="authModal.showScreen('payout')">Back</button>
        <button type="submit" class="btn-auth btn-auth--primary" onclick="authModal.close()">Save & Continue</button>
      </form>
    `;
  }

  showScreen(screen) {
    this.currentScreen = screen;
    this.render();
  }

  async connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.showScreen('kyc');
      } catch (error) {
        alert('MetaMask connection failed. Please try again.');
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask extension.');
    }
  }

  attachFormListeners() {
    // Tab switching
    document.querySelectorAll('.form-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // OTP auto-focus
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
      input.addEventListener('input', function() {
        if (this.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });
      
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    // Payout option selection
    document.querySelectorAll('.payout-option').forEach(option => {
      option.addEventListener('click', function() {
        document.querySelectorAll('.payout-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }
}

// Initialize auth modal when DOM is ready
let authModal;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    authModal = new AuthModal();
  });
} else {
  authModal = new AuthModal();
}
