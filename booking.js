// ===== SHAMMA SALON BOOKING SYSTEM =====
console.log('🔧 Loading booking system...');

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page loaded, starting booking system...');
    initBookingSystem();
});

// Main booking system
function initBookingSystem() {
    console.log('🎯 Initializing booking system...');
    
    // Get elements
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBooking');
    const serviceInput = document.getElementById('selectedService');
    const bookingForm = document.getElementById('bookingForm');
    
    console.log('Elements found - Modal:', !!modal, 'Form:', !!bookingForm);
    
    // Get all BOOK NOW buttons
    const bookButtons = document.querySelectorAll('.book-btn, .book-service-btn, .btn-secondary');
    console.log('Found', bookButtons.length, 'book buttons');
    
    // Add click events to buttons
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📝 Book button clicked');
            
            // Get service name
            let serviceName = this.getAttribute('data-service') || 'Salon Service';
            console.log('Service:', serviceName);
            
            // Set in modal
            if (serviceInput) serviceInput.value = serviceName;
            
            // Show modal
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Set date to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const dateStr = tomorrow.toISOString().split('T')[0];
                
                const dateInput = document.getElementById('appointmentDate');
                if (dateInput) {
                    dateInput.min = dateStr;
                    dateInput.value = dateStr;
                }
                
                // Focus on name field
                setTimeout(() => {
                    const nameInput = document.getElementById('fullName');
                    if (nameInput) nameInput.focus();
                }, 300);
            }
        });
    });
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (bookingForm) bookingForm.reset();
    }
    
    // Close button events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📤 Form submitted');
            
            // Get form data
            const formData = {
                service: document.getElementById('selectedService')?.value || '',
                name: document.getElementById('fullName')?.value.trim() || '',
                phone: document.getElementById('phoneNumber')?.value.trim() || '',
                date: document.getElementById('appointmentDate')?.value || '',
                time: document.getElementById('appointmentTime')?.value || '',
                notes: document.getElementById('specialRequests')?.value.trim() || ''
            };
            
            console.log('Form data:', formData);
            
            // Validate and submit
            if (validateForm(formData)) {
                submitBooking(formData);
            }
        });
    }
    
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    console.log('✅ Booking system initialized');
}

// Form validation
function validateForm(data) {
    if (!data.name || data.name.length < 2) {
        alert('Please enter your full name (minimum 2 characters)');
        return false;
    }
    
    if (!data.phone || data.phone.replace(/\D/g, '').length < 8) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    if (!data.date) {
        alert('Please select a date');
        return false;
    }
    
    if (!data.time) {
        alert('Please select a time');
        return false;
    }
    
    return true;
}

// Submit booking
function submitBooking(data) {
    console.log('🚀 Submitting booking...');
    
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn?.innerHTML || 'Confirm Booking';
    
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
    }
    
    // Save to localStorage for admin
    saveToStorage(data);
    
    // Simulate processing
    setTimeout(() => {
        // Success message
        alert(`✅ BOOKING CONFIRMED!\n\nThank you ${data.name}!\n\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\n\nWe will contact you at ${data.phone} to confirm.`);
        
        // Close modal
        const modal = document.getElementById('bookingModal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset button
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        
        // Reset form
        const form = document.getElementById('bookingForm');
        if (form) form.reset();
        
        console.log('🎉 Booking completed');
    }, 1500);
}

// Save to localStorage
function saveToStorage(data) {
    try {
        // Add metadata
        data.id = Date.now();
        data.timestamp = new Date().toISOString();
        data.status = 'pending';
        
        // Get existing bookings
        let bookings = JSON.parse(localStorage.getItem('shammaBookings')) || [];
        
        // Add new booking
        bookings.push(data);
        
        // Save back
        localStorage.setItem('shammaBookings', JSON.stringify(bookings));
        
        console.log('💾 Saved to localStorage. Total:', bookings.length);
        console.log('Latest:', data);
        
        return true;
    } catch (error) {
        console.error('Error saving:', error);
        return false;
    }
}

// Error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
});

console.log('📜 Booking script loaded');
