document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (link && content) {
            // Handle click on mobile for dropdowns
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    content.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Help Path Functionality
    let currentCategory = '';
    let currentSubcategory = '';

    // Support page mappings
    const supportPages = {
        'device-phone': '/support/mobile-devices',
        'device-laptop': '/support/laptop-support',
        'device-desktop': '/support/desktop-support',
        'device-tablet': '/support/tablet-support',
        'network-wifi': '/support/wifi-troubleshooting',
        'network-ethernet': '/support/wired-network',
        'network-router': '/support/router-setup',
        'network-setup': '/support/network-configuration',
        'software-office': '/support/office-software',
        'software-browser': '/support/browser-issues',
        'software-os': '/support/operating-system',
        'software-custom': '/support/business-software',
        'security-virus': '/support/virus-removal',
        'security-password': '/support/password-recovery',
        'security-backup': '/support/data-backup',
        'security-breach': '/support/security-emergency'
    };

    // Resource page mappings
    const resourcePages = {
        'device-phone': '/resources/mobile-guides',
        'device-laptop': '/resources/laptop-guides',
        'device-desktop': '/resources/desktop-guides',
        'device-tablet': '/resources/tablet-guides',
        'network-wifi': '/resources/wifi-guides',
        'network-ethernet': '/resources/network-guides',
        'network-router': '/resources/router-guides',
        'network-setup': '/resources/setup-guides',
        'software-office': '/resources/office-tutorials',
        'software-browser': '/resources/browser-guides',
        'software-os': '/resources/os-guides',
        'software-custom': '/resources/software-guides',
        'security-virus': '/resources/security-guides',
        'security-password': '/resources/password-guides',
        'security-backup': '/resources/backup-guides',
        'security-breach': '/resources/emergency-guides'
    };

    // Recommendation text for each combination
    const recommendations = {
        'device-phone': 'We can help you resolve mobile device issues including screen problems, battery issues, app crashes, and connectivity problems.',
        'device-laptop': 'Our laptop support covers hardware diagnostics, software troubleshooting, performance optimization, and repair services.',
        'device-desktop': 'Desktop computer support including hardware upgrades, software installation, virus removal, and system optimization.',
        'device-tablet': 'Tablet support for iPads and Android devices including app issues, connectivity problems, and performance optimization.',
        'network-wifi': 'WiFi troubleshooting including connection issues, slow speeds, password problems, and signal strength optimization.',
        'network-ethernet': 'Wired network support for ethernet connections, cable testing, and network configuration issues.',
        'network-router': 'Router and modem support including setup, configuration, firmware updates, and replacement services.',
        'network-setup': 'Complete network setup services for homes and businesses including security configuration and optimization.',
        'software-office': 'Microsoft Office and productivity software support including installation, training, and troubleshooting.',
        'software-browser': 'Web browser support for Chrome, Firefox, Safari, and Edge including performance issues and security settings.',
        'software-os': 'Operating system support for Windows, macOS, and Linux including updates, optimization, and troubleshooting.',
        'software-custom': 'Business software support for custom applications, database systems, and enterprise solutions.',
        'security-virus': 'Immediate virus and malware removal services with system cleaning and protection setup.',
        'security-password': 'Password recovery and security services including account recovery and security system setup.',
        'security-backup': 'Data backup solutions including cloud backup setup, local backup systems, and data recovery services.',
        'security-breach': 'Emergency security breach response including immediate containment, assessment, and recovery services.'
    };

    // Handle path option clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.path-option')) {
            const option = e.target.closest('.path-option');
            const nextStep = option.dataset.step;
            const category = option.dataset.category;
            const subcategory = option.dataset.subcategory;

            if (category) {
                currentCategory = category;
                showStep(nextStep, category);
            } else if (subcategory) {
                currentSubcategory = subcategory;
                showRecommendation();
            }
        }
    });

    // Handle back button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-button')) {
            const backStep = e.target.dataset.back;
            if (backStep) {
                showStep(backStep);
            } else {
                // Final back button
                showStep('2', currentCategory);
            }
        }
    });

    function showStep(stepNumber, category = '') {
        // Hide all steps
        document.querySelectorAll('.path-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show the requested step
        if (stepNumber === '1') {
            document.getElementById('step1').classList.add('active');
        } else if (stepNumber === '2') {
            document.getElementById(`step2-${category}`).classList.add('active');
        } else if (stepNumber === '3') {
            document.getElementById('step3').classList.add('active');
        }
    }

    function showRecommendation() {
        const key = `${currentCategory}-${currentSubcategory}`;
        
        // Update recommendation text
        document.getElementById('recommendationText').textContent = recommendations[key] || 'We can help you resolve this issue with our expert support services.';
        
        // Update support link
        document.getElementById('supportLink').href = supportPages[key] || '#contact';
        
        // Update resource link
        document.getElementById('resourceLink').href = resourcePages[key] || '#';
        
        // Show step 3
        showStep('3');
    }

    // Reset path functionality
    function resetPath() {
        currentCategory = '';
        currentSubcategory = '';
        showStep('1');
    }

    // Initialize the path
    showStep('1');
});