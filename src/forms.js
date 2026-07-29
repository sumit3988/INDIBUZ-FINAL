import { API_BASE_URL } from './config.js';

export function initForm(formId, fields) {
  const form = document.getElementById(formId);
  if (!form) return;

  const formElement = form.querySelector('form') || form;
  const successEl = form.querySelector('.form-success');
  const formFields = form.querySelector('.form-fields');
  const submitBtn = formElement.querySelector('button[type="submit"]');

  // Determine API endpoint based on formId
  const apiEndpoint = formId === 'partner-form-wrap' 
    ? `${API_BASE_URL}/api/partner/` 
    : `${API_BASE_URL}/api/contact/`;

  // Real-time validation
  fields.forEach(field => {
    const input = form.querySelector(`[name="${field.name}"]`);
    if (!input) return;

    input.addEventListener('blur', () => validateField(input, field));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input, field);
      }
    });
  });

  // Form submission
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    const bodyData = {};
    
    fields.forEach(field => {
      const input = form.querySelector(`[name="${field.name}"]`);
      if (input) {
        if (!validateField(input, field)) {
          isValid = false;
        } else {
          bodyData[field.name] = input.value.trim();
        }
      }
    });

    if (isValid) {
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner" style="display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:#fff; animation:spin 1s linear infinite;"></span> Submitting...';
      }

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if (response.status === 201 || response.status === 200) {
          // Success
          if (formFields) formFields.style.display = 'none';
          if (successEl) {
            successEl.querySelector('.form-success-msg').textContent = data.message || "Thank you, we'll be in touch.";
            successEl.classList.add('visible');
          }
          formElement.reset();
        } else if (response.status === 400) {
          // Validation Error from API
          if (data.errors) {
            for (const [fieldName, errors] of Object.entries(data.errors)) {
              const input = form.querySelector(`[name="${fieldName}"]`);
              if (input) {
                input.classList.add('error');
                const errorEl = input.parentElement.querySelector('.form-error');
                if (errorEl) {
                  errorEl.textContent = Array.isArray(errors) ? errors[0] : errors;
                  errorEl.classList.add('visible');
                }
              }
            }
          }
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        // Network/Server failure fallback
        const fallbackHTML = `
          <div style="background:#ffebee; color:#c62828; padding:16px; border-radius:8px; margin-top:16px; font-size:14px;">
            Unable to submit context right now. Please <a href="https://wa.me/916284302338?text=Hello%20INDIBUZ..." target="_blank" style="color:#c62828; font-weight:bold; text-decoration:underline;">WhatsApp us directly ↗</a>.
          </div>
        `;
        if (submitBtn && submitBtn.parentElement) {
          submitBtn.parentElement.insertAdjacentHTML('beforeend', fallbackHTML);
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          // Note: you may need to define CSS keyframes for .spinner if not exists, but inline fallback is above.
          submitBtn.innerHTML = submitBtn.dataset.originalText || submitBtn.textContent.replace('Submitting...', '').trim() || 'Submit';
        }
      }
    }
  });

  // Save original text to dataset for restoration
  if (submitBtn) {
    submitBtn.dataset.originalText = submitBtn.innerHTML;
  }
}

function validateField(input, rules) {
  const value = input.value.trim();
  const errorEl = input.parentElement.querySelector('.form-error');
  let errorMsg = '';

  if (rules.required && !value) {
    errorMsg = rules.requiredMsg || 'This field is required';
  } else if (rules.type === 'email' && value && !isValidEmail(value)) {
    errorMsg = rules.emailMsg || 'Please enter a valid email address';
  } else if (rules.type === 'phone' && value && !isValidPhone(value)) {
    errorMsg = rules.phoneMsg || 'Please enter a valid phone number';
  } else if (rules.minLength && value.length < rules.minLength) {
    errorMsg = rules.minLengthMsg || `Minimum ${rules.minLength} characters required`;
  }

  if (errorMsg) {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.add('visible');
    }
    return false;
  } else {
    input.classList.remove('error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
    return true;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\+]?[0-9\s\-\(\)]{7,20}$/.test(phone);
}

// Generate WhatsApp fallback HTML
export function whatsappFallback() {
  return `
    <div class="form-whatsapp-fallback">
      <span>Prefer to chat?</span>
      <a href="https://wa.me/916284302338?text=Hello%20INDIBUZ%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer">
        Message us on WhatsApp →
      </a>
    </div>
  `;
}

// Success state HTML
export function formSuccessHTML() {
  return `
    <div class="form-success">
      <div class="form-success-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 class="form-success-title">Thank You!</h3>
      <p class="form-success-msg">We've received your inquiry. Our team will be in touch within 24 hours.</p>
    </div>
  `;
}
