# Client Dashboard

A modern, responsive client dashboard for Tyler Wilks Running coaching platform.

## Features

- **Clean, Modern UI**: Beautiful interface with smooth animations and responsive design
- **Multiple Sections**: Overview, Schedule, Workouts, Progress, Notes, and Settings
- **Real-time Stats**: Track miles, time, workouts completed, and goal progress
- **Weekly Schedule**: Visual calendar view of training schedule
- **Activity Tracking**: Log and view workout history
- **Coach Notes**: View personalized notes from your coach
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Project Structure

```
Client dashboard/
├── index.html          # Main dashboard HTML
├── styles.css          # All styling and responsive design
├── script.js           # Dashboard functionality and data management
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a web browser
2. The dashboard will load with sample data stored in localStorage
3. Navigate between sections using the sidebar menu

## Sections Overview

### Overview
- Statistics cards showing weekly progress
- Upcoming workouts list
- Recent activity feed

### Schedule
- Weekly calendar view
- Training schedule for the current week
- Navigate between weeks

### Workouts
- List of all logged workouts
- Add new workouts
- View workout details

### Progress
- Weekly progress charts
- Monthly summary statistics
- Performance metrics

### Notes
- Coach notes and feedback
- Important announcements
- Training tips

### Settings
- Update account information
- Change password
- Manage preferences

## Data Storage

Currently, the dashboard uses browser `localStorage` for data persistence. This means:
- Data persists between sessions
- Data is stored locally on the client's device
- Each client's data is isolated

**Note**: For production use, integrate with a backend API to:
- Store data securely on a server
- Enable multi-device synchronization
- Implement proper authentication
- Add data backup and recovery

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --background: #f8fafc;
    /* ... */
}
```

### Adding New Sections
1. Add navigation item in `index.html` sidebar
2. Create new section in content area
3. Add corresponding JavaScript functionality in `script.js`

## Integration with Backend

To integrate with a backend API:

1. Replace `localStorage` calls with API requests
2. Add authentication headers
3. Handle loading states and errors
4. Implement real-time updates (WebSockets or polling)

Example API integration:
```javascript
async function loadUserData() {
    try {
        const response = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = await response.json();
        updateUserProfile(userData);
    } catch (error) {
        console.error('Failed to load user data:', error);
    }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Chart library integration for progress visualization
- [ ] Strava API integration for automatic workout sync
- [ ] Real-time notifications
- [ ] Dark mode support
- [ ] Export data functionality
- [ ] Mobile app version
- [ ] Workout completion tracking
- [ ] Social sharing features

## License

Private project for Tyler Wilks Running coaching platform.

