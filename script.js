function renderResources(selectedLevel) {
    const container = document.getElementById('content-container');
    container.innerHTML = '';

    const filtered = library.filter(item => item.level === selectedLevel);

    // This is the part that handles empty results
    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-msg">No resources found for ${selectedLevel} yet. Coming soon!</div>`;
        return;
    }

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="level-toggle-card">
                <h4>${item.title}</h4>
                <p>Subject: ${item.subject}</p>
                <a href="${item.url}" target="_blank" class="download-btn">Download PDF</a>
            </div>
        `;
    });
}

// --- 2. Combined Initialization Logic ---
window.addEventListener('DOMContentLoaded', () => {

    // A. Apply Theme on Page Load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }

    // B. ADD THIS: Theme Toggle Button Click Listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle classes
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');

            // Save the new state so BOTH pages see it
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // C. Setup Filter Bar (Your existing code)
    const hub = localStorage.getItem('selectedHub');
    const filterBar = document.getElementById('filter-bar');
    if (hub === 'olevel') {
        filterBar.innerHTML = `
            <button onclick="renderResources('S1')">Senior 1</button>
            <button onclick="renderResources('S2')">Senior 2</button>
            <button onclick="renderResources('S3')">Senior 3</button>
            <button onclick="renderResources('S4')">Senior 4</button>
        `;
    }
});