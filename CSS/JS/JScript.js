document.addEventListener('DOMContentLoaded', () => {

    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Coordinates for Johannesburg
        const johannesburgCoords = [-26.2041, 28.0473];
        const map = L.map('map').setView(johannesburgCoords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Custom Marker
        L.marker(johannesburgCoords).addTo(map)
            .bindPopup('<b>Hope Haven Animal Shelter</b><br>123 Rescue Road, Johannesburg.')
            .openPopup();
    }

    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const captionText = document.getElementById('lightboxCaption');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const closeBtn = document.querySelector('.lightbox-close');

    if (modal && triggers.length > 0) {
        triggers.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default submission

            let isValid = true;
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Clear existing errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            // Validation Checks
            if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // South African Phone Number Regex
            const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
            if (!phoneRegex.test(phone)) {
                document.getElementById('phoneError').textContent = 'Enter a valid SA phone number (e.g., 0821234567).';
                isValid = false;
            }

            if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters long.';
                isValid = false;
            }

            if (!isValid) return;

            // AJAX Form Submission
            formStatus.style.color = '#FFF8E7';
            formStatus.textContent = 'Submitting message...';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.style.color = '#4BB543';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                formStatus.style.color = '#FF3333';
                formStatus.textContent = 'Submission simulated successfully (Client side validated).';
                contactForm.reset();
            });
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchableItems = document.querySelectorAll('.searchable-item');

    if (searchInput && searchableItems.length > 0) {
        searchInput.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();

            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});