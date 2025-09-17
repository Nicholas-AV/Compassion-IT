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

    // Enhanced Help Path Functionality
    let currentCategory = '';
    let currentSubcategory = '';
    let currentSpecific = '';

    // Enhanced support page mappings with specific issues
    const supportPages = {
        // Device specific issues
        'device-phone-camera': '/support/phone-camera-repair',
        'device-phone-screen': '/support/phone-screen-replacement',
        'device-phone-battery': '/support/phone-battery-service',
        'device-phone-calling': '/support/phone-calling-issues',
        'device-phone-apps': '/support/phone-app-troubleshooting',
        'device-phone-storage': '/support/phone-storage-cleanup',
        'device-laptop-screen': '/support/laptop-screen-repair',
        'device-laptop-keyboard': '/support/laptop-keyboard-replacement',
        'device-laptop-battery': '/support/laptop-battery-service',
        'device-laptop-performance': '/support/laptop-performance-optimization',
        'device-laptop-overheating': '/support/laptop-cooling-service',
        'device-laptop-startup': '/support/laptop-startup-repair',
        'device-desktop-monitor': '/support/desktop-monitor-troubleshooting',
        'device-desktop-startup': '/support/desktop-startup-repair',
        'device-desktop-performance': '/support/desktop-performance-tuning',
        'device-desktop-storage': '/support/desktop-storage-upgrade',
        'device-desktop-peripherals': '/support/desktop-peripheral-setup',
        'device-desktop-noise': '/support/desktop-hardware-diagnostics',
        'device-tablet-screen': '/support/tablet-screen-repair',
        'device-tablet-charging': '/support/tablet-charging-port-repair',
        'device-tablet-apps': '/support/tablet-app-support',
        'device-tablet-performance': '/support/tablet-optimization',
        
        // Network specific issues
        'network-wifi-connect': '/support/wifi-connection-setup',
        'network-wifi-slow': '/support/wifi-speed-optimization',
        'network-wifi-drops': '/support/wifi-stability-troubleshooting',
        'network-wifi-password': '/support/wifi-password-recovery',
        'network-ethernet-noconnection': '/support/ethernet-connection-repair',
        'network-ethernet-slow': '/support/ethernet-speed-optimization',
        'network-ethernet-intermittent': '/support/ethernet-stability-fix',
        'network-ethernet-cable': '/support/ethernet-cable-testing',
        'network-router-nopower': '/support/router-power-troubleshooting',
        'network-router-nointernet': '/support/router-internet-setup',
        'network-router-reset': '/support/router-factory-reset',
        'network-router-upgrade': '/support/router-firmware-update',
        'network-setup-newnetwork': '/support/new-network-installation',
        'network-setup-security': '/support/network-security-setup',
        'network-setup-multiple': '/support/multiple-device-network',
        'network-setup-business': '/support/business-network-setup',
        
        // Software specific issues
        'software-office-install': '/support/office-installation-service',
        'software-office-crashes': '/support/office-crash-repair',
        'software-office-files': '/support/office-file-recovery',
        'software-office-formatting': '/support/office-formatting-help',
        'software-browser-slow': '/support/browser-speed-optimization',
        'software-browser-crashes': '/support/browser-crash-fix',
        'software-browser-homepage': '/support/browser-hijack-removal',
        'software-browser-bookmarks': '/support/bookmark-recovery',
        'software-os-updates': '/support/system-update-repair',
        'software-os-startup': '/support/boot-repair-service',
        'software-os-errors': '/support/system-error-fix',
        'software-os-performance': '/support/system-optimization',
        'software-custom-install': '/support/business-software-installation',
        'software-custom-licensing': '/support/software-license-management',
        'software-custom-integration': '/support/software-integration-service',
        'software-custom-training': '/support/software-training-service',
        
        // Security specific issues
        'security-virus-detected': '/support/virus-removal-emergency',
        'security-virus-suspicious': '/support/malware-detection-service',
        'security-virus-slow': '/support/system-cleanup-optimization',
        'security-virus-popups': '/support/adware-removal-service',
        'security-password-forgot': '/support/password-recovery-service',
        'security-password-reset': '/support/password-reset-help',
        'security-password-manager': '/support/password-manager-setup',
        'security-password-compromised': '/support/account-security-recovery',
        'security-backup-setup': '/support/backup-system-setup',
        'security-backup-restore': '/support/data-recovery-service',
        'security-backup-cloud': '/support/cloud-backup-setup',
        'security-backup-schedule': '/support/automatic-backup-setup',
        'security-breach-hacked': '/support/computer-hack-recovery',
        'security-breach-identity': '/support/identity-theft-response',
        'security-breach-financial': '/support/financial-fraud-response',
        'security-breach-ransomware': '/support/ransomware-recovery-service',
        
        // Fallback for general categories
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

    // Enhanced resource page mappings
    const resourcePages = {
        // Add all the resource mappings following the same pattern...
        'device-phone': '/resources/mobile-guides',
        'device-laptop': '/resources/laptop-guides',
        'device-desktop': '/resources/desktop-guides',
        'device-tablet': '/resources/tablet-guides',
        'network-wifi': '/resources/wifi-guides',
        'software-office': '/resources/office-tutorials',
        'security-virus': '/resources/security-guides'
    };

    // Enhanced recommendation text with specific solutions
    const recommendations = {
        // Phone specific recommendations
        'device-phone-camera': 'We can diagnose camera hardware issues, fix software conflicts, and replace faulty camera components to restore full photo and video functionality.',
        'device-phone-screen': 'Our screen replacement service includes genuine parts, precision installation, and testing to ensure your phone display works perfectly.',
        'device-phone-battery': 'Battery replacement service with genuine batteries, plus optimization tips to extend battery life and charging performance.',
        'device-phone-calling': 'We troubleshoot call quality issues, network problems, and hardware faults to restore clear calling functionality.',
        'device-phone-apps': 'App troubleshooting including crash fixes, compatibility issues, storage problems, and performance optimization.',
        'device-phone-storage': 'Storage cleanup service including file management, app optimization, and recommendations for storage solutions.',
        
        // Network specific recommendations
        'network-wifi-connect': 'WiFi connection setup and troubleshooting including network discovery, password configuration, and signal optimization.',
        'network-wifi-slow': 'WiFi speed optimization including router configuration, interference elimination, and network setup improvements.',
        'network-ethernet-noconnection': 'Ethernet connection diagnostics including cable testing, port verification, and network adapter troubleshooting.',
        'network-router-nopower': 'Router power troubleshooting including power adapter testing, internal power supply diagnosis, and replacement services.',
        
        // Add more specific recommendations as needed...
        
        // Fallback recommendations
        'device-phone': 'We can help you resolve mobile device issues including screen problems, battery issues, app crashes, and connectivity problems.',
        'device-laptop': 'Our laptop support covers hardware diagnostics, software troubleshooting, performance optimization, and repair services.',
        'network-wifi': 'WiFi troubleshooting including connection issues, slow speeds, password problems, and signal strength optimization.',
        'software-office': 'Microsoft Office and productivity software support including installation, training, and troubleshooting.',
        'security-virus': 'Immediate virus and malware removal services with system cleaning and protection setup.'
    };

    // Handle path option clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.path-option')) {
            const option = e.target.closest('.path-option');
            const nextStep = option.dataset.step;
            const category = option.dataset.category;
            const subcategory = option.dataset.subcategory;
            const specific = option.dataset.specific;

            console.log('Clicked option:', { nextStep, category, subcategory, specific });

            if (category) {
                // Step 1 -> Step 2: Main category selected
                currentCategory = category;
                currentSubcategory = '';
                currentSpecific = '';
                showStep('2');
            } else if (subcategory) {
                // Step 2 -> Step 3: Subcategory selected
                currentSubcategory = subcategory;
                currentSpecific = '';
                showStep('3');
            } else if (specific) {
                // Step 3 -> Step 4: Specific issue selected
                currentSpecific = specific;
                showRecommendation();
            }
        }
    });

    // Handle back button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-button')) {
            const backStep = e.target.dataset.back;
            console.log('Back button clicked, target step:', backStep);
            
            if (backStep === '1') {
                // Go back to step 1
                currentCategory = '';
                currentSubcategory = '';
                currentSpecific = '';
                showStep('1');
            } else if (backStep === '2') {
                // Go back to step 2
                currentSubcategory = '';
                currentSpecific = '';
                showStep('2');
            } else if (e.target.id === 'finalBack') {
                // From final recommendations, go back to step 3
                currentSpecific = '';
                showStep('3');
            }
        }
    });

    function showStep(stepNumber) {
        console.log('Showing step:', stepNumber, 'Category:', currentCategory, 'Subcategory:', currentSubcategory);
        
        // Hide all steps
        document.querySelectorAll('.path-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show the requested step
        if (stepNumber === '1') {
            document.getElementById('step1').classList.add('active');
        } else if (stepNumber === '2') {
            const stepId = `step2-${currentCategory}`;
            const stepElement = document.getElementById(stepId);
            if (stepElement) {
                stepElement.classList.add('active');
            } else {
                console.error('Step 2 element not found:', stepId);
                showStep('1'); // Fallback to step 1
            }
        } else if (stepNumber === '3') {
            const stepId = `step3-${currentCategory}-${currentSubcategory}`;
            const stepElement = document.getElementById(stepId);
            console.log('Looking for step 3 element:', stepId, 'Found:', !!stepElement);
            
            if (stepElement) {
                stepElement.classList.add('active');
            } else {
                console.error('Step 3 element not found:', stepId);
                // If we can't find the specific step 3, go directly to recommendations
                showRecommendation();
            }
        } else if (stepNumber === '4') {
            document.getElementById('step4').classList.add('active');
        }
    }

    function showRecommendation() {
        let key;
        
        // Build the key based on available information
        if (currentSpecific) {
            key = `${currentCategory}-${currentSubcategory}-${currentSpecific}`;
        } else {
            key = `${currentCategory}-${currentSubcategory}`;
        }
        
        console.log('Showing recommendation for key:', key);
        
        // Update recommendation text
        const recommendationText = 
            recommendations[key] || 
            recommendations[`${currentCategory}-${currentSubcategory}`] || 
            'We can help you resolve this issue with our expert support services.';
        
        document.getElementById('recommendationText').textContent = recommendationText;
        
        // Update support link
        const supportLink = 
            supportPages[key] || 
            supportPages[`${currentCategory}-${currentSubcategory}`] || 
            '#contact';
            
        document.getElementById('supportLink').href = supportLink;
        
        // Update resource link
        const resourceLink = 
            resourcePages[key] || 
            resourcePages[`${currentCategory}-${currentSubcategory}`] || 
            '#';
            
        document.getElementById('resourceLink').href = resourceLink;
        
        // Show step 4 (recommendations)
        showStep('4');
    }

    // Reset path functionality
    function resetPath() {
        currentCategory = '';
        currentSubcategory = '';
        currentSpecific = '';
        showStep('1');
    }

    // Initialize the path
    console.log('Initializing help path');
    showStep('1');
});