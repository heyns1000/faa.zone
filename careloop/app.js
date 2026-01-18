// Care Loop Impact Simulator
// Powered by Heritage Matrix - 13,320 Cultural Pathways

// Configuration
const HERITAGE_API_BASE = 'https://fruitful-api-platform.fly.dev/api/heritage';
const GENERIC_COST_PER_ANIMAL = 240; // R240 per animal in generic routing

// State
let state = {
    donationAmount: 600,
    selectedCulture: {
        country: 'ZA',
        language: 'zu',
        countryName: 'South Africa',
        languageName: 'isiZulu',
        flag: '🇿🇦'
    },
    culturalImpact: null,
    isLoading: false
};

// Allocation categories configuration
const allocationConfig = [
    { key: 'education', label: 'Education', icon: '📚', color: '#FF6B6B', percentage: 35 },
    { key: 'health', label: 'Health', icon: '🏥', color: '#4ECDC4', percentage: 25 },
    { key: 'climate', label: 'Climate', icon: '🌍', color: '#45B7D1', percentage: 20 },
    { key: 'cultural_preservation', label: 'Cultural Preservation', icon: '🧬', color: '#FFA07A', percentage: 15 },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️', color: '#98D8C8', percentage: 3 },
    { key: 'economic_development', label: 'Economic Development', icon: '💼', color: '#F7DC6F', percentage: 2 }
];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    fetchImpact();
});

// Initialize UI elements and event listeners
function initializeUI() {
    // Slider
    const slider = document.getElementById('donation-slider');
    slider.addEventListener('input', (e) => {
        state.donationAmount = parseInt(e.target.value);
        updateDonationDisplay();
        debounce(fetchImpact, 500)();
    });

    // Dropdown
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownBtn.addEventListener('click', () => {
        const isOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isOpen ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdownMenu.style.display = 'none';
        }
    });

    // Dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            state.selectedCulture = {
                country: item.dataset.country,
                language: item.dataset.language,
                countryName: item.dataset.countryName,
                languageName: item.dataset.languageName,
                flag: item.dataset.flag
            };
            updateCultureDisplay();
            dropdownMenu.style.display = 'none';
            fetchImpact();
        });
    });

    // Initial display update
    updateDonationDisplay();
}

// Update donation amount display
function updateDonationDisplay() {
    const formattedAmount = formatCurrency(state.donationAmount);
    document.getElementById('donation-amount').textContent = formattedAmount;
    document.getElementById('donate-amount-btn').textContent = formattedAmount;
}

// Update culture display
function updateCultureDisplay() {
    const text = `${state.selectedCulture.flag} ${state.selectedCulture.countryName} - ${state.selectedCulture.languageName}`;
    document.getElementById('selected-culture-text').textContent = text;
}

// Format currency
function formatCurrency(amount) {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Debounce function for API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fetch impact data from Heritage API
async function fetchImpact() {
    if (state.donationAmount === 0) {
        hideImpactSection();
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${HERITAGE_API_BASE}/route-careloop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: state.selectedCulture.country,
                language: state.selectedCulture.language,
                donation_amount: state.donationAmount
            }),
        });

        if (!response.ok) {
            throw new Error(`Heritage API error: ${response.statusText}`);
        }

        const data = await response.json();
        state.culturalImpact = data.cultural_routing;
        
        hideLoading();
        displayImpact();
    } catch (error) {
        console.error('Failed to calculate impact:', error);
        hideLoading();
        
        // Fallback to simulated data for demonstration
        console.log('Using simulated data for demonstration');
        simulateImpact();
        displayImpact();
    }
}

// Simulate impact data (fallback when API is unavailable)
function simulateImpact() {
    const total = state.donationAmount;
    state.culturalImpact = {
        total: total,
        education: Math.round(total * 0.35),
        climate: Math.round(total * 0.20),
        health: Math.round(total * 0.25),
        cultural_preservation: Math.round(total * 0.15),
        infrastructure: Math.round(total * 0.03),
        economic_development: Math.round(total * 0.02),
        animals_helped_estimate: Math.round(total / 150), // R150 per animal with optimization
        optimization_boost: '+60%'
    };
}

// Show loading state
function showLoading() {
    state.isLoading = true;
    document.getElementById('loading-state').style.display = 'block';
    document.getElementById('impact-section').style.display = 'none';
}

// Hide loading state
function hideLoading() {
    state.isLoading = false;
    document.getElementById('loading-state').style.display = 'none';
}

// Hide impact section
function hideImpactSection() {
    document.getElementById('impact-section').style.display = 'none';
}

// Display impact data
function displayImpact() {
    if (!state.culturalImpact) return;

    const impactSection = document.getElementById('impact-section');
    impactSection.style.display = 'block';

    // Update pathway name
    const pathwayName = `${state.selectedCulture.languageName} Pathway (${state.selectedCulture.countryName}) - Ubuntu Optimization`;
    document.getElementById('pathway-name').textContent = pathwayName;

    // Render allocation bars
    renderAllocationBars();

    // Calculate and display generic impact
    const genericImpact = Math.floor(state.donationAmount / GENERIC_COST_PER_ANIMAL);
    document.getElementById('generic-animals').textContent = genericImpact;

    // Display cultural impact
    document.getElementById('cultural-animals').textContent = state.culturalImpact.animals_helped_estimate;

    // Calculate optimization percentage
    const optimizationPercent = genericImpact > 0 
        ? Math.round(((state.culturalImpact.animals_helped_estimate - genericImpact) / genericImpact) * 100)
        : 0;
    
    document.getElementById('optimization-boost').textContent = `+${optimizationPercent}%`;
}

// Render allocation bars
function renderAllocationBars() {
    const container = document.getElementById('allocation-bars');
    container.innerHTML = '';

    allocationConfig.forEach(config => {
        const amount = state.culturalImpact[config.key] || 0;
        const bar = createAllocationBar(
            config.label,
            amount,
            config.percentage,
            config.color,
            config.icon
        );
        container.appendChild(bar);
    });
}

// Create allocation bar element
function createAllocationBar(label, amount, percentage, color, icon) {
    const bar = document.createElement('div');
    bar.className = 'allocation-bar';

    bar.innerHTML = `
        <div class="bar-header">
            <span class="bar-label">${icon} ${label}</span>
            <span class="bar-amount">R${Math.round(amount).toLocaleString()} (${percentage}%)</span>
        </div>
        <div class="bar-track">
            <div class="bar-fill" style="width: ${percentage * 3}%; background-color: ${color};"></div>
        </div>
    `;

    return bar;
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        simulateImpact,
        GENERIC_COST_PER_ANIMAL
    };
}
