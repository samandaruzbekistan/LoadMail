console.log("✅ content.js yuklandi");

function getTextInside(container, selector) {
    const el = container.querySelector(selector);
    return el ? el.textContent.trim() : '';
}

function getEmail(container) {
    const emailEl = container.querySelector('a[href^="mailto:"]');
    return emailEl ? emailEl.textContent.trim() : '';
}

// Svg icons
const icons = {
    "email": `<svg width="16px" height="16px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 15H44V28V41H4V28V15H12" stroke="#1C274C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 19V5" stroke="#1C274C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 11L24 5L18 11" stroke="#1C274C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15L24 30L44 15" stroke="#1C274C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    "map": `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" stroke="#1C274C" stroke-width="1.5"/><path d="M13.4227 17.3618L16.9348 8.19598C17.2164 7.46107 16.5389 6.78361 15.804 7.06521L6.63824 10.5773C5.80779 10.8955 5.78079 12.06 6.5981 12.3083L10.0751 13.3648C10.3455 13.447 10.553 13.6545 10.6352 13.9249L11.6917 17.4019C11.94 18.2192 13.1045 18.1922 13.4227 17.3618Z" stroke="#1C274C" stroke-width="1.5"/></svg>`,
    "copy": `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_429_11155)"><path d="M16 3H4V16" stroke="#1C274C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7H20V19C20 20.1046 19.1046 21 18 21H10C8.89543 21 8 20.1046 8 19V7Z" stroke="#1C274C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_429_11155"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
    'sent': `<svg width="16px" height="16px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24V9H24H4V24V39H24" stroke="#1bb300ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 36L36 40L44 30" stroke="#1bb300ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 9L24 24L44 9" stroke="#1bb300ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

function createSendButton(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'email-button-wrapper';
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.gap = '8px';
    wrapper.style.marginTop = '6px';

    const emailExists = getEmail(container) !== "";

    // ✉️ Send Email
    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = icons.email;
    sendBtn.className = 'email-send-button';
    sendBtn.style.display = emailExists ? 'inline-block' : 'none';
    Object.assign(sendBtn.style, {
        padding: '4px 8px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'relative',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    // 📍 Open Map
    const mapBtn = document.createElement('button');
    mapBtn.innerHTML = icons.map;
    Object.assign(mapBtn.style, {
        padding: '4px 8px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    // 📋 Copy Email
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = icons.copy;
    copyBtn.style.display = emailExists ? 'inline-block' : 'none';
    Object.assign(copyBtn.style, {
        padding: '4px 8px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    // Dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'email-template-dropdown';
    Object.assign(dropdown.style, {
        display: 'none',
        position: 'absolute',
        top: '110%',
        left: 0,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 9999,
        minWidth: '160px',
        color: '#000'
    });

    const templates = [
        { key: 'template_1', label: 'Load info request' },
        { key: 'template_2', label: 'Any news' },
        { key: 'template_3', label: 'Next day Del' }
    ];

    templates.forEach(t => {
        const option = document.createElement('div');
        option.innerText = t.label;
        option.dataset.key = t.key;
        Object.assign(option.style, {
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: '#000'
        });
        option.addEventListener('mouseenter', () => {
            option.style.backgroundColor = '#f0f0f0';
        });
        option.addEventListener('mouseleave', () => {
            option.style.backgroundColor = '#fff';
        });

        option.addEventListener('click', function () {
            const rowDetailDiv = sendBtn.closest(".table-row-detail");
            if (!rowDetailDiv) return alert("❌ Yuk tafsilotlari topilmadi");

            setTimeout(() => {
                chrome.runtime.sendMessage({
                    action: "sendLoad",
                    payload: {
                        broker: getTextInside(rowDetailDiv, ".company-details"),
                        pickup: getTextInside(rowDetailDiv, ".route-origin .city"),
                        dropoff: getTextInside(rowDetailDiv, ".route-destination .city"),
                        template: this.dataset.key,
                        email: getEmail(container)
                    }
                }, (response) => {
                    if (response && response.success) {
                        showToast(response.message, 'success');
                        // Change button text to ✅ and disable after successful email
                        sendBtn.innerHTML = icons.sent;
                        // sendBtn.style.backgroundColor = '#28a745';
                        sendBtn.disabled = true;
                        sendBtn.style.cursor = 'not-allowed';
                        // sendBtn.style.opacity = '0.7';
                    } else {
                        showToast(response?.message || "Xatolik!", 'error');
                    }
                });
            }, 100);

            dropdown.style.display = 'none';
        });

        dropdown.appendChild(option);
    });

    sendBtn.appendChild(dropdown);

    let hideTimeout;
    sendBtn.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        dropdown.style.display = 'block';
    });
    sendBtn.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            dropdown.style.display = 'none';
        }, 300);
    });

    mapBtn.addEventListener("click", () => {
        const rowDetailDiv = mapBtn.closest(".table-row-detail");
        if (!rowDetailDiv) return alert("❌ Yuk tafsilotlari topilmadi");

        const start = cleanCityName(document.getElementById("mat-input-2")?.value?.trim()) || "Seattle, WA";
        const middle = cleanCityName(getTextInside(rowDetailDiv, ".route-origin .city"));
        const end = cleanCityName(getTextInside(rowDetailDiv, ".route-destination .city"));

        const url = "https://www.google.com/maps/dir/" +
            encodeURIComponent(start) + "/" +
            encodeURIComponent(middle) + "/" +
            encodeURIComponent(end);

        console.log(`🗺️ Opening Google Maps with cleaned cities: ${start} → ${middle} → ${end}`);
        window.open(url, "_blank");
    });

    copyBtn.addEventListener("click", async () => {
        const email = getEmail(container);
        if (!email) {
            showToast("No email address found", 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(email);
            showToast("Email copied to clipboard!", 'success');
            
            // Simple visual feedback - just show success toast, no button changes
            console.log('✅ Email copied successfully:', email);
        } catch (err) {
            console.error('Failed to copy email:', err);
            showToast("Failed to copy email", 'error');
        }
    });

    // Only append email buttons if email exists
    if (emailExists) {
        wrapper.appendChild(sendBtn);
        wrapper.appendChild(copyBtn);
    }
    
    // Always append map button
    wrapper.appendChild(mapBtn);

    return wrapper;
}


function injectButtonsForEmailAndMap() {
    const contactTitles = document.querySelectorAll('.contacts__subtitle');

    contactTitles.forEach((subtitleEl) => {
        // Tugma allaqachon joylashtirilgan bo‘lsa, yana qo‘shmaymiz
        const parent = subtitleEl.parentElement;
        if (!parent || parent.querySelector('.email-button-wrapper')) return;

        const rowDetail = subtitleEl.closest('.table-row-detail');
        const btnWrapper = createSendButton(rowDetail);

        // Tugmalarni .contacts__subtitle yoniga qo‘shamiz (inline tarzda)
        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.display = 'flex';
        wrapperDiv.style.alignItems = 'center';
        wrapperDiv.style.gap = '12px';
        wrapperDiv.style.marginTop = '6px';

        // Yozuv va tugmalarni yonma-yon joylashtiramiz
        const subtitleClone = subtitleEl.cloneNode(true);
        subtitleEl.style.display = 'none'; // Eski elementni yashiramiz
        wrapperDiv.appendChild(subtitleClone);
        wrapperDiv.appendChild(btnWrapper);

        parent.insertBefore(wrapperDiv, subtitleEl.nextSibling);
    });
}


// Map initialization tracking to prevent duplicate maps
const mapInstances = new Set();

function cleanCityName(raw) {
    if (!raw) return '';
    
    // Remove parentheses and numbers, trim whitespace
    // Handle cases like "Pasco, WA (212)" -> "Pasco, WA"
    // Also handle other common patterns
    let cleaned = raw
        .replace(/\s*\([^)]*\)/g, '') // Remove parentheses and content inside
        .replace(/\s*\[[^\]]*\]/g, '') // Remove brackets and content inside
        .replace(/\s*\{[^}]*\}/g, '') // Remove braces and content inside
        .replace(/\s*\d+$/g, '') // Remove trailing numbers
        .replace(/\s*#\d+/g, '') // Remove hash numbers
        .replace(/\s*-\s*\d+/g, '') // Remove dash numbers
        .trim();
    
    // Additional cleaning for common patterns
    cleaned = cleaned.replace(/\s+/g, ' '); // Replace multiple spaces with single space
    
    console.log(`🧹 Cleaned city name: "${raw}" -> "${cleaned}"`);
    return cleaned;
}


async function getCoordinates(city) {
    if (!city || city.trim() === '') {
        console.warn('❌ Empty city name provided');
        return null;
    }
    
    console.log(`🔍 Looking up coordinates for: "${city}"`);
    
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const coords = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
            console.log(`✅ Found coordinates for ${city}:`, coords);
            return coords;
        } else {
            console.warn(`❌ No coordinates found for "${city}"`);
            return null;
        }
    } catch (error) {
        console.error(`❌ Error fetching coordinates for "${city}":`, error);
        return null;
    }
}


async function createMapElement(container, pickupRaw, dropoffRaw, driverRaw) {
    const pickupCity = cleanCityName(pickupRaw);
    const dropoffCity = cleanCityName(dropoffRaw);
    const driverCity = cleanCityName(driverRaw);

    console.log(`🗺️ Creating map for: "${pickupRaw}" -> "${pickupCity}" to "${dropoffRaw}" -> "${dropoffCity}"`);

    const mapId = 'map_' + Math.random().toString(36).substr(2, 9);
    if (container.querySelector('.leaflet-map-container')) return;

    // Check if we're in a map column (4th column) or rate calculator
    const isMapColumn = container.classList.contains('map-details-column');
    
    let mapContainer;
    if (isMapColumn) {
        // Use the existing map container in the 4th column
        mapContainer = container.querySelector('div[style*="height: 400px"]');
        if (!mapContainer) {
            mapContainer = document.createElement('div');
            Object.assign(mapContainer.style, {
                width: '100%',
                height: '400px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #0d6efd',
                backgroundColor: '#fff'
            });
            container.appendChild(mapContainer);
        }
    } else {
        // Create new map container for rate calculator
        mapContainer = document.createElement('div');
        Object.assign(mapContainer.style, {
            width: '100%',
            height: '300px',
            marginTop: '15px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid #0d6efd'
        });
        container.appendChild(mapContainer);
    }
    
    mapContainer.className = 'leaflet-map-container';
    mapContainer.id = mapId;

    try {
        const [pickupCoords, dropoffCoords, driverCoords] = await Promise.all([
            getCoordinates(pickupCity),
            getCoordinates(dropoffCity),
            getCoordinates(driverCity)
        ]);

        if (!pickupCoords || !dropoffCoords || !driverCoords) {
            mapContainer.remove();
            return;
        }

        const map = L.map(mapId).setView([
            (pickupCoords.lat + dropoffCoords.lat) / 2,
            (pickupCoords.lng + dropoffCoords.lng) / 2
        ], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // L.marker([pickupCoords.lat, pickupCoords.lng]).addTo(map).bindPopup(`<b>Pickup:</b> ${pickupCity}`);
        // L.marker([dropoffCoords.lat, dropoffCoords.lng]).addTo(map).bindPopup(`<b>Dropoff:</b> ${dropoffCity}`);
        
        L.marker([driverCoords.lat, driverCoords.lng], {
            icon: L.icon({
                iconUrl: chrome.runtime.getURL('leaflet/images/marker-icon.png'),
                iconSize: [20, 20],
                iconAnchor: [10, 20]
            })
        }).addTo(map).bindPopup(`<b>Driver:</b> ${driverCity}`);
        L.marker([pickupCoords.lat, pickupCoords.lng], {
            icon: L.icon({
                iconUrl: chrome.runtime.getURL('leaflet/images/marker-icon.png'),
                iconSize: [20, 20],
                iconAnchor: [10, 20]
            })
        }).addTo(map).bindPopup(`<b>Pickup:</b> ${pickupCity}`);
        L.marker([dropoffCoords.lat, dropoffCoords.lng], {
            icon: L.icon({
                iconUrl: chrome.runtime.getURL('leaflet/images/marker-icon.png'),
                iconSize: [20, 20],
                iconAnchor: [10, 20]
            })
        }).addTo(map).bindPopup(`<b>Dropoff:</b> ${dropoffCity}`);
        
        // L.polyline([
        //     [pickupCoords.lat, pickupCoords.lng],
        //     [dropoffCoords.lat, dropoffCoords.lng]
        // ], {
        //     color: '#0d6efd',
        //     weight: 3,
        //     opacity: 0.7
        // }).addTo(map);

        // Create routing control with 3 waypoints: driver -> pickup -> dropoff
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(driverCoords.lat, driverCoords.lng),
                L.latLng(pickupCoords.lat, pickupCoords.lng),
                L.latLng(dropoffCoords.lat, dropoffCoords.lng)
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            createMarker: function() { return null; }
        }).addTo(map);

        // Listen for route calculation completion
        routingControl.on('routesfound', function(e) {
            const routes = e.routes;
            if (routes && routes.length > 0) {
                const route = routes[0];
                const totalTime = route.summary.totalTime / 3600; // Convert seconds to hours
                
                // Get the route segments to calculate actual road distances
                const segments = route.coordinates;
                let totalDistance = 0;
                let dhDistance = 0;
                let tripDistance = 0;
                
                // Find the pickup point index (closest to pickup coordinates)
                let pickupIndex = 0;
                let minDistance = Infinity;
                for (let i = 0; i < segments.length; i++) {
                    const dist = L.latLng(segments[i].lat, segments[i].lng).distanceTo(L.latLng(pickupCoords.lat, pickupCoords.lng));
                    if (dist < minDistance) {
                        minDistance = dist;
                        pickupIndex = i;
                    }
                }
                
                // Calculate distances using actual route segments
                for (let i = 0; i < segments.length - 1; i++) {
                    const segmentDistance = L.latLng(segments[i].lat, segments[i].lng).distanceTo(L.latLng(segments[i + 1].lat, segments[i + 1].lng)) / 1609.34; // miles
                    totalDistance += segmentDistance;
                    
                    if (i < pickupIndex) {
                        dhDistance += segmentDistance;
                    } else {
                        tripDistance += segmentDistance;
                    }
                }

                // Update the rate calculator DH value with the calculated DH distance
                if (window.updateRateCalculatorDH) {
                    window.updateRateCalculatorDH(dhDistance);
                }
                
                // Create popup content
                const popupContent = `
                    <b>Total:</b> ${Math.round(totalDistance)} mi<br>
                    <b>Trip:</b> ${Math.round(tripDistance)} mi<br>
                    <b>DH:</b> ${Math.round(dhDistance)} mi<br>
                    <b>⏱</b> ${Math.round(totalTime)}h
                `;
                
                // Calculate midpoint of the route
                const routeCoords = route.coordinates;
                const midIndex = Math.floor(routeCoords.length / 2);
                const midPoint = routeCoords[midIndex];
                
                // Create popup at midpoint
                L.popup({ 
                    closeButton: true, 
                    autoClose: false,
                    closeOnClick: false,
                })
                .setLatLng([midPoint.lat, midPoint.lng])
                .setContent(popupContent)
                .openOn(map);
            }
        });

        

        map.fitBounds([
            [driverCoords.lat, driverCoords.lng],
            [pickupCoords.lat, pickupCoords.lng],
            [dropoffCoords.lat, dropoffCoords.lng]
        ], { padding: [20, 20] });

    } catch (error) {
        console.error('❌ Error creating map:', error);
        mapContainer.remove();
    }
}


function injectRateCalculatorInsteadOfMarketRates() {
    const marketRateBlocks = document.querySelectorAll(
        'dat-search-market-rates .market-rates-expanded-details-container > .ng-star-inserted > .ng-star-inserted > .details-container'
    );

    marketRateBlocks.forEach((block) => {
        if (block.querySelector('.custom-rpm-box')) return;

        let miles = 0;
        const parentRow = block.closest('.table-row-detail') || block.closest('[data-test="search-result"]');
        if (parentRow) {
            const tripMilesEl = parentRow.querySelector('.trip-miles');
            if (tripMilesEl) {
                const match = tripMilesEl.textContent.match(/[\d,]+/);
                miles = match ? parseInt(match[0].replace(/,/g, '')) : 0;
            }
        }

        if (!miles || miles === 0) {
            const milesEl = block.querySelector('.miles-day-average span');
            const match = milesEl?.textContent?.match(/[\d,]+/);
            if (match) miles = parseInt(match[0].replace(/,/g, ''));
        }

        if (!miles || isNaN(miles)) {
            console.warn('⚠️ Miles topilmadi:', block);
            return;
        }

        // Get the actual rate from the load details
        let loadRate = 0;
        const rateElement = parentRow.querySelector('.data-item-total');
        if (rateElement) {
            const rateMatch = rateElement.textContent.match(/[\d,]+/);
            loadRate = rateMatch ? parseInt(rateMatch[0].replace(/,/g, '')) : 0;
        }

        block.innerHTML = '';
        const box = document.createElement('div');
        box.className = 'custom-rpm-box';
        Object.assign(box.style, {
            background: '#fff',
            color: '#333',
            // padding: '20px',
            borderRadius: '8px',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        });

        // RATE Header
        const rateHeader = document.createElement('div');
        rateHeader.textContent = 'RATE';
        Object.assign(rateHeader.style, {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '10px'
        });
        // box.appendChild(rateHeader);

        // Summary Section
        const summarySection = document.createElement('div');
        Object.assign(summarySection.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '15px'
        });

        const totalRow = document.createElement('div');
        totalRow.innerHTML = `<span style="color: #666;">Total:</span> <strong>$${loadRate.toLocaleString()}</strong>`;
        totalRow.style.fontSize = '16px';
        summarySection.appendChild(totalRow);

        const tripRow = document.createElement('div');
        tripRow.innerHTML = `<span style="color: #666;">Trip:</span> <strong>${miles} mi</strong>`;
        tripRow.style.fontSize = '16px';
        summarySection.appendChild(tripRow);

        const ratePerMileRow = document.createElement('div');
        const initialRatePerMile = miles > 0 ? (loadRate / miles).toFixed(2) : '0.00';
        ratePerMileRow.innerHTML = `<span style="color: #666;">Rate / mile:</span> <strong>$${initialRatePerMile}</strong> <span style="color: #666;">ⓘ</span>`;
        ratePerMileRow.style.fontSize = '16px';
        summarySection.appendChild(ratePerMileRow);

        // box.appendChild(summarySection);

        // Main Calculator Section with Blue Border
        const calculatorSection = document.createElement('div');
        Object.assign(calculatorSection.style, {
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#f8f9fa'
        });

        // Input Fields
        const inputFields = document.createElement('div');
        Object.assign(inputFields.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '15px'
        });

        // First Row: Miles, DH, Rate
        const firstRow = document.createElement('div');
        Object.assign(firstRow.style, {
            display: 'flex',
            gap: '10px'
        });

        const milesGroup = createInputField('Miles', miles.toString());
        const dhGroup = createInputField('DH', '35');
        const rateGroup = createInputField('Rate', loadRate.toString(), true);

        firstRow.appendChild(milesGroup.group);
        firstRow.appendChild(dhGroup.group);
        firstRow.appendChild(rateGroup.group);
        inputFields.appendChild(firstRow);

        // Second Row: Diesel/GL, MPG, Driver's CPM, Other Costs
        const secondRow = document.createElement('div');
        Object.assign(secondRow.style, {
            display: 'flex',
            gap: '10px'
        });

        const dieselGroup = createInputField('Diesel /GL', '3.50');
        const mpgGroup = createInputField('MPG', '6.5');
        const driverCpmGroup = createInputField('Driver\'s CPM', '0.60');
        const otherCostsGroup = createInputField('Other Costs', '0');

        secondRow.appendChild(dieselGroup.group);
        secondRow.appendChild(mpgGroup.group);
        secondRow.appendChild(driverCpmGroup.group);
        secondRow.appendChild(otherCostsGroup.group);
        inputFields.appendChild(secondRow);

        calculatorSection.appendChild(inputFields);

        // Results Boxes
        const resultsBoxes = document.createElement('div');
        Object.assign(resultsBoxes.style, {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
        });

        const rpmBox = createResultBox('RPM', '$0.00');
        const rpmDhBox = createResultBox('RPM+DH', '$0.00');
        const fuelCostBox = createResultBox('Fuel Cost', '$0.00');
        const driverPayBox = createResultBox('Driver\'s Pay', '$0.00');
        const profitBox = createResultBox('Profit', '$0.00');

        resultsBoxes.appendChild(rpmBox.box);
        resultsBoxes.appendChild(rpmDhBox.box);
        resultsBoxes.appendChild(fuelCostBox.box);
        resultsBoxes.appendChild(driverPayBox.box);
        resultsBoxes.appendChild(profitBox.box);

        calculatorSection.appendChild(resultsBoxes);
        box.appendChild(calculatorSection);

        // Helper function to create input fields
        function createInputField(label, defaultValue, hasIcon = false) {
            const group = document.createElement('div');
            Object.assign(group.style, {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            });

            const labelEl = document.createElement('label');
            labelEl.innerHTML = hasIcon ? `${label} <span style="color: #666;">ⓘ</span>` : label;
            Object.assign(labelEl.style, {
                fontSize: '12px',
                color: '#666',
                fontWeight: '500'
            });

            const input = document.createElement('input');
            Object.assign(input.style, {
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
            });
            input.value = defaultValue;
            input.type = 'number';
            input.step = '0.01';

            group.appendChild(labelEl);
            group.appendChild(input);
            return { group, input };
        }

        // Helper function to create result boxes
        function createResultBox(label, value) {
            const box = document.createElement('div');
            Object.assign(box.style, {
                background: '#0d6efd',
                color: 'white',
                padding: '10px',
                borderRadius: '6px',
                textAlign: 'center',
                flex: 1,
                minWidth: '80px'
            });

            const labelEl = document.createElement('div');
            labelEl.textContent = label;
            labelEl.style.fontSize = '12px';
            labelEl.style.marginBottom = '4px';

            const valueEl = document.createElement('div');
            valueEl.textContent = value;
            valueEl.style.fontSize = '14px';
            valueEl.style.fontWeight = 'bold';

            box.appendChild(labelEl);
            box.appendChild(valueEl);
            return { box, valueEl };
        }

        // Get all input elements
        const milesInput = milesGroup.input;
        const dhInput = dhGroup.input;
        const rateInput = rateGroup.input;
        const dieselInput = dieselGroup.input;
        const mpgInput = mpgGroup.input;
        const driverCpmInput = driverCpmGroup.input;
        const otherCostsInput = otherCostsGroup.input;

        // Get all result elements
        const rpmValueEl = rpmBox.valueEl;
        const rpmDhValueEl = rpmDhBox.valueEl;
        const fuelCostValueEl = fuelCostBox.valueEl;
        const driverPayValueEl = driverPayBox.valueEl;
        const profitValueEl = profitBox.valueEl;

        // Function to update DH value from map calculations
        const updateDHFromMap = (dhDistance) => {
            if (dhInput && !isNaN(dhDistance)) {
                dhInput.value = Math.round(dhDistance);
                calculateAll(); // Recalculate all values
            }
        };

        // Make the updateDHFromMap function globally accessible for the map
        window.updateRateCalculatorDH = updateDHFromMap;

        // Calculation function
        const calculateAll = () => {
            const tripMiles = parseFloat(milesInput.value) || 0;
            const deadheadMiles = parseFloat(dhInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            const dieselPrice = parseFloat(dieselInput.value) || 0;
            const mpg = parseFloat(mpgInput.value) || 0;
            const driverCPM = parseFloat(driverCpmInput.value) || 0;
            const otherCosts = parseFloat(otherCostsInput.value) || 0;

            const totalMiles = tripMiles + deadheadMiles;
            
            // Corrected formulas with division by zero protection
            const rpm = tripMiles > 0 ? rate / tripMiles : 0;
            const rpmDh = totalMiles > 0 ? rate / totalMiles : 0;
            const fuelCost = mpg > 0 ? (totalMiles / mpg) * dieselPrice : 0;
            const driverPay = totalMiles * driverCPM;
            const profit = rate - fuelCost - driverPay - otherCosts;

            // Update summary
            totalRow.innerHTML = `<span style="color: #666;">Total:</span> <strong>$${rate.toLocaleString()}</strong>`;
            tripRow.innerHTML = `<span style="color: #666;">Trip:</span> <strong>${tripMiles} mi</strong>`;
            ratePerMileRow.innerHTML = `<span style="color: #666;">Rate / mile:</span> <strong>$${rpm.toFixed(2)}</strong> <span style="color: #666;">ⓘ</span>`;

            // Update results
            rpmValueEl.textContent = `$${rpm.toFixed(2)}`;
            rpmDhValueEl.textContent = `$${rpmDh.toFixed(2)}`;
            fuelCostValueEl.textContent = `$${fuelCost.toFixed(2)}`;
            driverPayValueEl.textContent = `$${driverPay.toFixed(2)}`;
            profitValueEl.textContent = `$${profit.toFixed(2)}`;
        };

        // Add event listeners to all inputs
        [milesInput, dhInput, rateInput, dieselInput, mpgInput, driverCpmInput, otherCostsInput].forEach(input => {
            input.addEventListener('input', calculateAll);
        });

        // Calculate initial values
        calculateAll();

        block.appendChild(box);

        // Get pickup and dropoff cities from the parent row
        const pickupCity = getTextInside(parentRow, '.route-origin .city') || 'Seattle';
        const dropoffCity = getTextInside(parentRow, '.route-destination .city') || 'Los Angeles';
        
        // Get driver location from the input field
        const driverInput = document.getElementById('mat-input-2');
        const driverCity = driverInput ? driverInput.value.trim() : 'Portland';

        // Add map as 4th column only
        addMapAsFourthColumn(parentRow, pickupCity, dropoffCity, driverCity);
    });
}

function addMapAsFourthColumn(parentRow, pickupCity, dropoffCity, driverCity) {
    // Check if map column already exists
    if (parentRow.querySelector('.map-details-column')) return;
    
    // Find the details-container
    const detailsContainer = parentRow.querySelector('.details-container');
    if (!detailsContainer) return;
    
    // Create the 4th column (map column)
    const mapColumn = document.createElement('div');
    mapColumn.className = 'details-column map-details-column';
    Object.assign(mapColumn.style, {
        width: '25%',
        minWidth: '300px',
        padding: '15px',
        borderLeft: '1px solid #e0e0e0',
        // backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    });
    
    // Create map header
    const mapHeader = document.createElement('div');
    mapHeader.innerHTML = '<h4 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">🗺️ Route Map</h4>';
    mapColumn.appendChild(mapHeader);
    
    // Create map container
    const mapContainer = document.createElement('div');
    Object.assign(mapContainer.style, {
        width: '100%',
        height: '400px',
        borderRadius: '8px',
        overflow: 'hidden',
        // border: '2px solid rgb(0, 0, 0)',
        backgroundColor: '#fff'
    });
    mapColumn.appendChild(mapContainer);
    
    // Insert the map column after the first column (trip details) and before rate calculator
    const existingColumns = detailsContainer.querySelectorAll('.details-column');
    if (existingColumns.length > 0) {
        // Insert after the first column (trip details)
        detailsContainer.insertBefore(mapColumn, existingColumns[1] || null);
    } else {
        // Fallback: append if no existing columns found
        detailsContainer.appendChild(mapColumn);
    }
    
    // Create the map in the new column
    createMapElement(mapColumn, pickupCity, dropoffCity, driverCity);
}

// 🔁 DOM ni har 1 soniyada yangilab turadi
setInterval(() => {
    injectButtonsForEmailAndMap();
    injectRateCalculatorInsteadOfMarketRates();
}, 1000);

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.innerText = message;
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}
