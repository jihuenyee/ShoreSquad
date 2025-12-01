/**
 * ShoreSquad - Interactive App Logic
 *
 * Key Features:
 * - Crew management (add, remove, store in localStorage)
 * - Weather data placeholder for API integration
 * - Mobile-responsive navigation
 * - Event creation and display
 * - Performance-optimized with event delegation
 * - Accessibility: keyboard navigation, screen reader support
 */

// ===== App State =====
const AppState = {
    crew: [],
    events: [],
    selectedBeach: null,
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    loadCrewFromStorage();
    renderCrew();
    setupEventListeners();
    initMobileNav();
    loadSampleEvents();
    renderEvents();
});

/**
 * Initialize the app
 */
function initApp() {
    console.log('🌊 ShoreSquad initialized');
    // Load user preferences or data from localStorage
    const savedData = localStorage.getItem('shoresquad-data');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        AppState.crew = parsed.crew || [];
        AppState.events = parsed.events || [];
    }
}

/**
 * Save crew data to localStorage
 */
function saveCrewToStorage() {
    const data = {
        crew: AppState.crew,
        events: AppState.events,
        lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem('shoresquad-data', JSON.stringify(data));
}

/**
 * Load crew data from localStorage
 */
function loadCrewFromStorage() {
    const saved = localStorage.getItem('shoresquad-data');
    if (saved) {
        const data = JSON.parse(saved);
        AppState.crew = data.crew || [];
        AppState.events = data.events || [];
    }
}

// ===== Crew Management =====
/**
 * Add a crew member
 * @param {string} name - Crew member name
 * @param {string} role - Crew member role
 */
function addCrewMember(name, role) {
    if (!name.trim()) {
        console.warn('Crew name cannot be empty');
        return;
    }

    const crewMember = {
        id: Date.now(),
        name: name.trim(),
        role: role,
        joinedAt: new Date().toISOString(),
    };

    AppState.crew.push(crewMember);
    saveCrewToStorage();
    renderCrew();
}

/**
 * Remove a crew member by ID
 * @param {number} id - Crew member ID
 */
function removeCrewMember(id) {
    AppState.crew = AppState.crew.filter(member => member.id !== id);
    saveCrewToStorage();
    renderCrew();
}

/**
 * Render crew list to DOM
 */
function renderCrew() {
    const crewList = document.getElementById('crewList');
    if (!crewList) return;

    if (AppState.crew.length === 0) {
        crewList.innerHTML = '<p style="text-align: center; color: #6B7280;">No crew members yet. Add your first team member!</p>';
        return;
    }

    crewList.innerHTML = AppState.crew.map(member => `
        <div class="crew-item" role="listitem">
            <div class="crew-item-info">
                <h4>${escapeHtml(member.name)}</h4>
                <span class="crew-item-role">${escapeHtml(member.role)}</span>
            </div>
            <button class="crew-item-remove" data-id="${member.id}" aria-label="Remove ${escapeHtml(member.name)}">Remove</button>
        </div>
    `).join('');

    // Event delegation for remove buttons
    crewList.addEventListener('click', (e) => {
        if (e.target.classList.contains('crew-item-remove')) {
            const id = parseInt(e.target.dataset.id);
            removeCrewMember(id);
        }
    });
}

// ===== Event Management =====
/**
 * Create a new cleanup event
 * @param {object} eventData - Event details
 */
function createEvent(eventData) {
    const event = {
        id: Date.now(),
        title: eventData.title || 'Beach Cleanup',
        location: eventData.location || 'Local Beach',
        date: eventData.date || new Date().toLocaleDateString(),
        time: eventData.time || '09:00 AM',
        attendees: eventData.attendees || 0,
        description: eventData.description || 'Join us for a beach cleanup!',
        createdAt: new Date().toISOString(),
    };

    AppState.events.push(event);
    saveCrewToStorage();
    renderEvents();
}

/**
 * Load sample events for demo
 */
function loadSampleEvents() {
    if (AppState.events.length === 0) {
        createEvent({
            title: 'Pasir Ris Community Cleanup',
            location: 'Pasir Ris Beach, Singapore',
            date: '2025-12-07',
            time: '09:00 AM',
            attendees: 30,
            description: 'Join the local community at Pasir Ris for beach cleanup and recycling workshops.',
        });
        createEvent({
            title: 'East Coast Park Morning Cleanup',
            location: 'East Coast Park, Singapore',
            date: '2025-12-14',
            time: '08:00 AM',
            attendees: 20,
            description: 'Family-friendly morning cleanup followed by a small picnic. Bring gloves and water.',
        });
        createEvent({
            title: 'Changi Beach Coastal Cleanup',
            location: 'Changi Beach, Singapore',
            date: '2025-12-21',
            time: '10:00 AM',
            attendees: 15,
            description: 'Coastal cleanup focusing on plastic removal and marine debris logging.',
        });
    }
}

/**
 * Format date from YYYY-MM-DD to "MMM DD" format
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "Dec 22")
 */
function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/**
 * Render events to DOM
 */
function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;

    if (AppState.events.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #6B7280;">No events scheduled yet. Create one to get started!</p>';
        return;
    }

    eventsList.innerHTML = AppState.events.map(event => {
        const formattedDate = formatDateShort(event.date);
        return `
        <div class="event-card">
            <!-- Row 1: Date -->
            <div style="font-size:0.9rem; color:#6B7280; margin-bottom:0.75rem; padding:0 0 0.5rem 0; border-bottom:1px solid var(--neutral-dark);">
                📅 ${formattedDate}
            </div>
            
            <!-- Row 2: Event Title -->
            <h3 class="event-title" style="margin:0.75rem 0 0.5rem 0; font-size:1.25rem; font-weight:700;">
                ${escapeHtml(event.title)}
            </h3>
            
            <!-- Row 3: Location -->
            <div style="font-size:0.95rem; color:#374151; margin-bottom:0.75rem; padding:0.5rem 0;">
                📍 ${escapeHtml(event.location)}
            </div>
            
            <!-- Row 4: Time -->
            <div style="font-size:0.95rem; color:#374151; margin-bottom:1rem; padding:0.5rem 0;">
                🕐 ${event.time}
            </div>
            
            <!-- Row 5: Join Button -->
            <button class="btn btn-secondary" style="width:100%; padding:0.75rem 1rem; font-size:0.95rem; margin-top:0.5rem;" aria-label="Join ${escapeHtml(event.title)}">
                ✋ Join Squad
            </button>
        </div>
        `;
    }).join('');
}

// ===== Weather Data =====
/**
 * Fetch or mock weather data
 * In production, integrate with OpenWeatherMap, WeatherAPI, etc.
 */
function updateWeatherDisplay() {
    // Fetch the 4-day forecast from NEA / data.gov.sg
    // Endpoint: https://api.data.gov.sg/v1/environment/4-day-weather-forecast
    const url = 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast';

    // Render a loading state
    const weatherGrid = document.getElementById('weatherGrid');
    if (weatherGrid) {
        weatherGrid.innerHTML = '<p style="text-align:center; width:100%">Loading forecast...</p>';
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            const items = data.items || [];
            if (items.length === 0) throw new Error('No forecast data available');
            const forecasts = items[0].forecasts || [];
            renderForecasts(forecasts);
        })
        .catch(err => {
            console.error('Weather API error:', err);
            if (weatherGrid) {
                weatherGrid.innerHTML = '<p style="text-align:center; color:#DC2626">Could not load forecast. Please try again later.</p>';
            }
        });
}

/**
 * Render the NEA 4-day forecasts into the weather grid
 * @param {Array} forecasts
 */
function renderForecasts(forecasts) {
    const weatherGrid = document.getElementById('weatherGrid');
    if (!weatherGrid) return;

    // Helper: map forecast text to emoji icon
    function getIcon(text) {
        if (!text) return '❓';
        const t = text.toLowerCase();
        if (t.includes('thunder') || t.includes('thundery') || t.includes('thunderstorm')) return '⛈️';
        if (t.includes('showers') || t.includes('rain') || t.includes('shower')) return '🌧️';
        if (t.includes('partly')) return '⛅';
        if (t.includes('cloud') || t.includes('cloudy')) return '☁️';
        if (t.includes('fair') || t.includes('sunny') || t.includes('clear')) return '☀️';
        if (t.includes('wind') || t.includes('breezy')) return '🌬️';
        return '🌤️';
    }

    // Build cards for each forecast day
    const html = forecasts.map(f => {
        const dateStr = f.date || '';
        const dateObj = dateStr ? new Date(dateStr + 'T00:00:00') : null;
        const weekday = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: 'short' }) : '';
        const dateDisplay = dateObj ? dateObj.toLocaleDateString() : dateStr;
        const forecastText = f.forecast || '-';
        const icon = getIcon(forecastText);
        const tempLow = f.temperature && f.temperature.low != null ? `${f.temperature.low}°C` : '-';
        const tempHigh = f.temperature && f.temperature.high != null ? `${f.temperature.high}°C` : '-';
        const windLow = f.wind && f.wind.speed && f.wind.speed.low != null ? `${f.wind.speed.low} km/h` : '-';
        const windHigh = f.wind && f.wind.speed && f.wind.speed.high != null ? `${f.wind.speed.high} km/h` : '-';
        const humidityLow = f.relative_humidity && f.relative_humidity.low != null ? `${f.relative_humidity.low}%` : '-';
        const humidityHigh = f.relative_humidity && f.relative_humidity.high != null ? `${f.relative_humidity.high}%` : '-';

        return `
            <div class="weather-card" role="article" aria-label="Forecast for ${dateStr}">
                <!-- Row 1: Icon and Day -->
                <div style="display:flex; gap:0.75rem; align-items:center; margin-bottom:0.5rem;">
                    <span class="weather-icon" aria-hidden="true">${icon}</span>
                    <span style="font-weight:700; font-size:1rem;">${weekday}</span>
                </div>
                
                <!-- Row 2: Date -->
                <div style="font-size:0.9rem; color:#374151; margin-bottom:0.5rem;">
                    ${dateDisplay}
                </div>
                
                <!-- Row 3: Forecast -->
                <div style="font-weight:600; font-size:0.95rem; margin-bottom:0.5rem; min-height:2.2em;">
                    ${escapeHtml(forecastText)}
                </div>
                
                <!-- Row 4: Temperature -->
                <div style="font-weight:700; font-size:1.1rem; color:var(--primary); margin-bottom:0.5rem;">
                    ${tempHigh} / ${tempLow}
                </div>
                
                <!-- Row 5: Wind -->
                <div style="font-size:0.9rem; color:#374151; margin-bottom:0.5rem;">
                    Wind: ${windLow}–${windHigh}
                </div>
                
                <!-- Row 6: Humidity -->
                <div style="font-size:0.9rem; color:#6B7280;">
                    Humidity: ${humidityLow} – ${humidityHigh}
                </div>
            </div>
        `;
    }).join('');

    weatherGrid.innerHTML = html;
}

// ===== Mobile Navigation =====
/**
 * Initialize mobile navigation toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu when link clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== Event Listeners =====
/**
 * Setup all event listeners for interactive elements
 */
function setupEventListeners() {
    // Crew form submission
    const crewForm = document.getElementById('crewForm');
    if (crewForm) {
        crewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('crewName');
            const roleSelect = document.getElementById('crewRole');
            addCrewMember(nameInput.value, roleSelect.value);
            crewForm.reset();
            nameInput.focus();
        });
    }

    // Hero CTA button
    const heroBtn = document.getElementById('heroBtn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            document.getElementById('crew').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Locate button (mock)
    const locateBtn = document.getElementById('locateBtn');
    if (locateBtn) {
        locateBtn.addEventListener('click', () => {
            console.log('📍 User location requested');
            alert('📍 Locating you... (In production, uses Geolocation API)');
        });
    }

    // Filter button (mock)
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            console.log('🔍 Filter beaches');
            alert('🔍 Filter options coming soon!');
        });
    }

    // Create event button
    const createEventBtn = document.getElementById('createEventBtn');
    if (createEventBtn) {
        createEventBtn.addEventListener('click', () => {
            const title = prompt('Event title:');
            if (title) {
                const location = prompt('Location:');
                const date = prompt('Date (YYYY-MM-DD):');
                createEvent({ title, location, date });
            }
        });
    }

    // Update weather on load
    updateWeatherDisplay();
}

// ===== Utility Functions =====
/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Log app statistics (for debugging)
 */
function logStats() {
    console.log('📊 ShoreSquad Stats:', {
        crew: AppState.crew.length,
        events: AppState.events.length,
        storageSizeKB: (JSON.stringify(AppState).length / 1024).toFixed(2),
    });
}

// Export for console debugging
window.ShoreSquad = {
    AppState,
    addCrewMember,
    removeCrewMember,
    createEvent,
    logStats,
};

console.log('💡 Tip: Use window.ShoreSquad to debug in console');
