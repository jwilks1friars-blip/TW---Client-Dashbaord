// Client Dashboard JavaScript

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeDashboard();
    loadUserData();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        updatePageTitle(sectionId);
    }
}

// Update page title based on section
function updatePageTitle(sectionId) {
    const titles = {
        overview: 'Dashboard',
        schedule: 'Training Schedule',
        workouts: 'My Workouts',
        progress: 'Progress',
        notes: 'Coach Notes',
        settings: 'Settings'
    };
    
    const titleElement = document.querySelector('.page-title');
    if (titleElement && titles[sectionId]) {
        titleElement.textContent = titles[sectionId];
    }
}

// Initialize dashboard data
function initializeDashboard() {
    loadUpcomingWorkouts();
    loadRecentActivity();
    loadSchedule();
    updateStats();
}

// Load user data from localStorage or API
function loadUserData() {
    // This would typically come from an API or authentication system
    const userData = JSON.parse(localStorage.getItem('clientData')) || {
        name: 'Client Name',
        email: 'client@example.com'
    };
    
    updateUserProfile(userData);
}

// Update user profile display
function updateUserProfile(userData) {
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    
    if (userName) userName.textContent = userData.name;
    if (userEmail) userEmail.textContent = userData.email;
    
    // Update settings form
    const nameInput = document.getElementById('client-name');
    const emailInput = document.getElementById('client-email');
    
    if (nameInput) nameInput.value = userData.name;
    if (emailInput) emailInput.value = userData.email;
}

// Load upcoming workouts
function loadUpcomingWorkouts() {
    const container = document.getElementById('upcoming-workouts');
    if (!container) return;
    
    // Sample data - replace with actual API call
    const workouts = JSON.parse(localStorage.getItem('upcomingWorkouts')) || [];
    
    if (workouts.length === 0) {
        container.innerHTML = '<p class="empty-state">No upcoming workouts scheduled</p>';
        return;
    }
    
    container.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">${workout.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">
                        ${workout.date} • ${workout.distance} miles • ${workout.pace}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load recent activity
function loadRecentActivity() {
    const container = document.getElementById('recent-activity');
    if (!container) return;
    
    const activities = JSON.parse(localStorage.getItem('recentActivity')) || [];
    
    if (activities.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div style="font-weight: 500; margin-bottom: 4px;">${activity.title}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${activity.date}</div>
        </div>
    `).join('');
}

// Load schedule calendar
function loadSchedule() {
    const container = document.getElementById('schedule-calendar');
    if (!container) return;
    
    const today = new Date();
    const currentWeek = getWeekDates(today);
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    container.innerHTML = currentWeek.map((date, index) => {
        const dayName = daysOfWeek[date.getDay()];
        const dayNumber = date.getDate();
        const isToday = date.toDateString() === today.toDateString();
        
        // Get workouts for this day (sample data)
        const workouts = getWorkoutsForDate(date);
        
        return `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="calendar-day-header">${dayName}</div>
                <div class="calendar-day-number">${dayNumber}</div>
                ${workouts.map(workout => `
                    <div class="calendar-workout">${workout}</div>
                `).join('')}
            </div>
        `;
    }).join('');
}

// Get week dates (Sunday to Saturday)
function getWeekDates(date) {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date.setDate(diff));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        week.push(day);
    }
    
    return week;
}

// Get workouts for a specific date (sample function)
function getWorkoutsForDate(date) {
    // This would typically fetch from an API
    const schedule = JSON.parse(localStorage.getItem('schedule')) || {};
    const dateKey = date.toISOString().split('T')[0];
    return schedule[dateKey] || [];
}

// Update statistics
function updateStats() {
    const stats = JSON.parse(localStorage.getItem('stats')) || {
        milesThisWeek: 0,
        totalTime: 0,
        workoutsCompleted: 0,
        goalProgress: 0
    };
    
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 4) {
        statValues[0].textContent = stats.milesThisWeek || 0;
        statValues[1].textContent = formatTime(stats.totalTime || 0);
        statValues[2].textContent = stats.workoutsCompleted || 0;
        statValues[3].textContent = `${stats.goalProgress || 0}%`;
    }
}

// Format time in minutes to readable format
function formatTime(minutes) {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Load workouts list
function loadWorkoutsList() {
    const container = document.getElementById('workouts-list');
    if (!container) return;
    
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    
    if (workouts.length === 0) {
        container.innerHTML = '<p class="empty-state">No workouts logged yet</p>';
        return;
    }
    
    container.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">${workout.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">
                        ${workout.date} • ${workout.distance} miles • ${workout.pace}
                    </div>
                </div>
                <span style="font-size: 12px; color: var(--text-secondary);">${workout.duration}</span>
            </div>
        </div>
    `).join('');
}

// Load notes
function loadNotes() {
    const container = document.getElementById('notes-list');
    if (!container) return;
    
    const notes = JSON.parse(localStorage.getItem('coachNotes')) || [];
    
    if (notes.length === 0) {
        container.innerHTML = '<p class="empty-state">No notes from your coach yet</p>';
        return;
    }
    
    container.innerHTML = notes.map(note => `
        <div class="workout-item">
            <div style="font-weight: 600; margin-bottom: 8px;">${note.title}</div>
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${note.content}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${note.date}</div>
        </div>
    `).join('');
}

// Event listeners for section-specific loading
document.addEventListener('DOMContentLoaded', () => {
    // Load workouts when workouts section is shown
    const workoutsNav = document.querySelector('[data-section="workouts"]');
    if (workoutsNav) {
        workoutsNav.addEventListener('click', () => {
            setTimeout(loadWorkoutsList, 100);
        });
    }
    
    // Load notes when notes section is shown
    const notesNav = document.querySelector('[data-section="notes"]');
    if (notesNav) {
        notesNav.addEventListener('click', () => {
            setTimeout(loadNotes, 100);
        });
    }
});

// Settings form handling
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('#settings .btn-primary');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const name = document.getElementById('client-name').value;
            const email = document.getElementById('client-email').value;
            const password = document.getElementById('client-password').value;
            
            // Save to localStorage (in production, this would be an API call)
            const userData = { name, email };
            if (password) {
                userData.password = password; // In production, hash this!
            }
            
            localStorage.setItem('clientData', JSON.stringify(userData));
            updateUserProfile(userData);
            
            alert('Settings saved successfully!');
        });
    }
});

