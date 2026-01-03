// ===== SHAMMA SALON BOOKING SYSTEM =====
// Complete booking functionality with validation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Shamma Salon Booking System Loaded');
    
    // Initialize all booking functionality
    initBookingSystem();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form validation
    initFormValidation();
});

// ===== MAIN BOOKING SYSTEM =====
function initBookingSystem() {
    // Get modal elements
    const bookingModal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBookingBtn = document.getElementById('cancelBooking');
    const selectedServiceInput = document.getElementById('selectedService');
    
    // Get all BOOK NOW buttons
    const bookButtons = document.querySelectorAll('.book-btn, .book-service-btn, .btn-secondary, [class*="book"]');
    
    // ===== OPEN MODAL WHEN CLICKING BOOK NOW =====
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Book button clicked');
            
            // Get service name
            let serviceName = '';
            
            // Try different methods to get service name
            if (this.hasAttribute('data-service')) {
                serviceName = this.getAttribute('data-service');
            } else if (this.closest('.service-item')) {
                const serviceTitle = this.closest('.service-item').querySelector('h4');
                if (serviceTitle) serviceName = serviceTitle.textContent;
            } else if (this.closest('.service-card')) {
                const serviceTitle = this.closest('.service-card').querySelector('h3');
                if (serviceTitle) serviceName = serviceTitle.textContent;
            } else {
                serviceName = 'Salon Service';
            }
            
            console.log('Selected service:', serviceName);
            
            // Set service in modal
            selectedServiceInput.value = serviceName;
            
            // Show modal
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Set minimum date to today
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const dateInput = document.getElementById('appointmentDate');
            dateInput.min = tomorrow.toISOString().split('T')[0];
            
            // Set default date to tomorrow
            dateInput.value = tomorrow.toISOString().split('T')[0];
            
            // Focus on name field
            setTimeout(() => {
                document.getElementById('fullName').focus();
            }, 300);
        });
    });
    
    // ===== CLOSE MODAL FUNCTIONS =====
    // Close when clicking X
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeBookingModal();
        });
    }
    
    // Close when clicking Cancel button
    if (cancelBookingBtn) {
        cancelBookingBtn.addEventListener('click', function() {
            closeBookingModal();
        });
    }
    
    // Close when clicking outside modal
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.style.display === 'flex') {
            closeBookingModal();
        }
    });
    
    // ===== FORM SUBMISSION =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Validate and submit booking
            submitBookingForm();
        });
    }
    
    // ===== CLOSE MODAL FUNCTION =====
    function closeBookingModal() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        if (bookingForm) {
            bookingForm.reset();
        }
    }
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const phoneInput = document.getElementById('phoneNumber');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Format phone number
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+968 ' + value.substring(0, 4) + ' ' + value.substring(4, 8);
            }
            
            this.value = value;
        });
    }
    
    // Date validation
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Disable weekends (Friday and Saturday)
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            
            // 5 = Friday, 6 = Saturday
            if (day === 5 || day === 6) {
                alert('Sorry, we are closed on Fridays and Saturdays. Please select another date.');
                this.value = '';
            }
        });
    }
}

// ===== SUBMIT BOOKING FORM =====
function submitBookingForm() {
    // Get form data
    const formData = {
        service: document.getElementById('selectedService').value,
        name: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phoneNumber').value.trim(),
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        notes: document.getElementById('specialRequests').value.trim()
    };
    
    console.log('Form data:', formData);
    
    // Validate form
    if (!validateBookingForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call (2 seconds delay)
    setTimeout(() => {
        // Success - Show confirmation
        showBookingConfirmation(formData);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Close modal after 3 seconds
        setTimeout(() => {
            closeBookingModal();
            
            // Show success message
            showNotification('✅ Booking confirmed! We will contact you soon.', 'success');
        }, 3000);
        
    }, 2000);
}

// ===== FORM VALIDATION =====
function validateBookingForm(data) {
    // Check required fields
    if (!data.name || data.name.length < 2) {
        showNotification('Please enter a valid full name (minimum 2 characters)', 'error');
        document.getElementById('fullName').focus();
        return false;
    }
    
    if (!data.phone || data.phone.replace(/\D/g, '').length < 8) {
        showNotification('Please enter a valid Omani phone number (+968 XXXX XXXX)', 'error');
        document.getElementById('phoneNumber').focus();
        return false;
    }
    
    if (!data.date) {
        showNotification('Please select an appointment date', 'error');
        document.getElementById('appointmentDate').focus();
        return false;
    }
    
    if (!data.time) {
        showNotification('Please select an appointment time', 'error');
        document.getElementById('appointmentTime').focus();
        return false;
    }
    
    // Check if date is in the future
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) {
        showNotification('Please select a future date', 'error');
        document.getElementById('appointmentDate').focus();
        return false;
    }
    
    return true;
}

// ===== SHOW BOOKING CONFIRMATION =====
function showBookingConfirmation(data) {
    // Create confirmation modal
    const modal = document.getElementById('bookingModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Save original content
    const originalContent = modalContent.innerHTML;
    
    // Create confirmation content
    const confirmationHTML = `
        <div class="modal-header">
            <h2><i class="fas fa-check-circle"></i> Booking Confirmed!</h2>
            <button class="close-modal" id="closeConfirmation">&times;</button>
        </div>
        <div class="modal-body">
            <div class="confirmation-content">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Thank you for your booking!</h3>
                <p>Your appointment has been scheduled successfully.</p>
                
                <div class="booking-details">
                    <div class="detail-item">
                        <span class="detail-label">Service:</span>
                        <span class="detail-value">${data.service}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${data.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">${data.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${formatDate(data.date)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Time:</span>
                        <span class="detail-value">${formatTime(data.time)}</span>
                    </div>
                    ${data.notes ? `
                    <div class="detail-item">
                        <span class="detail-label">Notes:</span>
                        <span class="detail-value">${data.notes}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="confirmation-message">
                    <p><i class="fas fa-info-circle"></i> We will contact you at <strong>${data.phone}</strong> to confirm your appointment.</p>
                    <p>Please arrive 10 minutes before your scheduled time.</p>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn-submit" id="printBooking">
                        <i class="fas fa-print"></i> Print Details
                    </button>
                    <button class="btn-cancel" id="closeConfirmationBtn">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Replace modal content
    modalContent.innerHTML = confirmationHTML;
    
    // Add confirmation styles
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-content {
            text-align: center;
            padding: 20px 0;
        }
        
        .confirmation-icon {
            font-size: 4rem;
            color: #27ae60;
            margin-bottom: 20px;
        }
        
        .confirmation-content h3 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .booking-details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
            text-align: left;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #495057;
        }
        
        .detail-value {
            color: #212529;
            text-align: right;
            max-width: 60%;
            word-break: break-word;
        }
        
        .confirmation-message {
            background: #e8f4fd;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
            border-radius: 0 8px 8px 0;
        }
        
        .confirmation-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        #printBooking:hover {
            background: #2196a5;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for confirmation buttons
    document.getElementById('closeConfirmation').addEventListener('click', function() {
        modalContent.innerHTML = originalContent;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        initBookingSystem(); // Reinitialize booking system
    });
    
    document.getElementById('closeConfirmationBtn').addEventListener('click', function() {
        modalContent.innerHTML = originalContent;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        initBookingSystem(); // Reinitialize booking system
    });
    
    document.getElementById('printBooking').addEventListener('click', function() {
        window.print();
    });
}

// ===== HELPER FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .notification-success {
            background: #27ae60;
            border-left: 5px solid #219653;
        }
        
        .notification-error {
            background: #e74c3c;
            border-left: 5px solid #c0392b;
        }
        
        .notification-info {
            background: #3498db;
            border-left: 5px solid #2980b9;
        }
        
        .close-notification {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 15px;
            line-height: 1;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.remove();
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== EMAIL FUNCTIONALITY (Optional) =====
function sendBookingEmail(data) {
    // This function would send an email to the salon
    // You need a backend server for this functionality
    
    const emailData = {
        to: '202111205@gcet.edu.om',
        subject: `New Booking: ${data.service}`,
        body: `
            New Booking Details:
            
            Service: ${data.service}
            Name: ${data.name}
            Phone: ${data.phone}
            Date: ${data.date}
            Time: ${data.time}
            Notes: ${data.notes || 'No special requests'}
            
            Received: ${new Date().toLocaleString()}
        `
    };
    
    console.log('Email would be sent:', emailData);
    // Implement actual email sending here
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.BookingSystem = {
    init: initBookingSystem,
    submitBooking: submitBookingForm,
    showNotification: showNotification
};

console.log('Booking system initialized successfully');
