/* ==========================================================================
   BOPHELO MOTHER & CHILD HEALTHCARE CENTRE - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------------------------------
       1. DYNAMIC COPYRIGHT YEAR IN FOOTER
       -------------------------------------------------------------------------- */
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* --------------------------------------------------------------------------
       2. RESPONSIVE MOBILE NAVIGATION TOGGLE
       -------------------------------------------------------------------------- */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
    }


    /* --------------------------------------------------------------------------
       3. FORM VALIDATION LOGIC (Enquiry & Contact Forms)
       -------------------------------------------------------------------------- */
    const form = document.getElementById("enquiry-form") || document.getElementById("contact-form");
    
    if (form) {
        // Map form fields and their inline error elements
        const fields = {
            name: {
                input: document.getElementById("name"),
                error: document.getElementById("name-error")
            },
            surname: {
                input: document.getElementById("surname"),
                error: document.getElementById("surname-error")
            },
            dob: {
                input: document.getElementById("dob"),
                error: document.getElementById("dob-error")
            },
            email: {
                input: document.getElementById("email"),
                error: document.getElementById("email-error")
            },
            phone: {
                input: document.getElementById("phone"),
                error: document.getElementById("phone-error")
            },
            date: {
                input: document.getElementById("date") || document.getElementById("appointment-date"),
                error: document.getElementById("date-error") || document.getElementById("appointment-date-error")
            },
            carcategory: {
                input: document.getElementById("carcategory") || document.getElementById("service"),
                error: document.getElementById("carcategory-error") || document.getElementById("service-error")
            }
        };

        // Ensure status message container exists on page
        let formStatus = document.getElementById("form-status");
        if (!formStatus) {
            formStatus = document.createElement("div");
            formStatus.id = "form-status";
            formStatus.style.marginTop = "15px";
            formStatus.style.fontWeight = "bold";
            form.appendChild(formStatus);
        }

        // Clear all error messages
        function clearErrors() {
            Object.values(fields).forEach((item) => {
                if (item.error) {
                    item.error.textContent = "";
                }
            });
            if (formStatus) {
                formStatus.textContent = "";
            }
        }

        // Validate form input fields
        function validate() {
            clearErrors();
            let valid = true;

            // Validate Name (Required & Min 2 chars)
            if (fields.name.input) {
                const val = fields.name.input.value.trim();
                if (val === "" || val.length < 2) {
                    if (fields.name.error) {
                        fields.name.error.textContent = "Please enter your name (at least 2 characters).";
                    }
                    valid = false;
                }
            }

            // Validate Surname (Required & Min 2 chars)
            if (fields.surname.input) {
                const val = fields.surname.input.value.trim();
                if (val === "" || val.length < 2) {
                    if (fields.surname.error) {
                        fields.surname.error.textContent = "Please enter your surname (at least 2 characters).";
                    }
                    valid = false;
                }
            }

            // Validate Date of Birth (Required)
            if (fields.dob.input) {
                if (fields.dob.input.value.trim() === "") {
                    if (fields.dob.error) {
                        fields.dob.error.textContent = "Please select your date of birth.";
                    }
                    valid = false;
                }
            }

            // Validate Email Pattern (Required)
            if (fields.email.input) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(fields.email.input.value.trim())) {
                    if (fields.email.error) {
                        fields.email.error.textContent = "Please enter a valid email address.";
                    }
                    valid = false;
                }
            }

            // Validate Phone Number (Required 10 Digits)
            if (fields.phone.input) {
                const phonePattern = /^[0-9]{10}$/;
                if (!phonePattern.test(fields.phone.input.value.trim())) {
                    if (fields.phone.error) {
                        fields.phone.error.textContent = "Phone number must contain exactly 10 digits.";
                    }
                    valid = false;
                }
            }

            // Validate Preferred Date / Appointment Date (Required)
            if (fields.date.input) {
                if (fields.date.input.value.trim() === "") {
                    if (fields.date.error) {
                        fields.date.error.textContent = "Please select a date.";
                    }
                    valid = false;
                }
            }

            // Validate Category / Service Dropdown (Required)
            if (fields.carcategory.input) {
                if (fields.carcategory.input.value === "") {
                    if (fields.carcategory.error) {
                        fields.carcategory.error.textContent = "Please select an option from the dropdown.";
                    }
                    valid = false;
                }
            }

            return valid;
        }

        // Handle Form Submission
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (validate()) {
                formStatus.textContent = "Form submitted successfully!";
                formStatus.style.color = "#16a34a"; // Green
                form.reset();
            } else {
                formStatus.textContent = "Please correct the highlighted errors above.";
                formStatus.style.color = "#dc2626"; // Red
            }
        });

        // Real-time dynamic clearing of error on typing
        Object.values(fields).forEach((item) => {
            if (item.input) {
                item.input.addEventListener("input", () => {
                    if (item.error && item.error.textContent) {
                        validate();
                    }
                });
            }
        });
    }

});