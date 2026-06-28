# Citizen Hub Kenya - Admin Panel

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [Authentication](#authentication)
8. [Available Scripts](#available-scripts)
9. [Deployment](#deployment)
10. [API Integration](#api-integration)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)
13. [License](#license)

---

## Project Overview

Citizen Hub Kenya Admin Panel is a comprehensive administration interface for managing the Citizen Hub Kenya platform. It provides administrators with full visibility and control over all platform activities, including user management, crime report oversight, payment monitoring, and content management.

The admin panel is built as a standalone React application using Vite for fast builds and optimal performance. It communicates with the Citizen Hub Kenya backend API to fetch and manage data.

---

## Features

### Dashboard
- Real-time platform statistics
- User growth metrics
- Crime report summaries
- Chatbot conversation analytics
- Payment transaction overview

### User Management
- View all registered users
- Filter users by status (active/inactive)
- Search users by phone number or email
- Update user account types (free/premium)
- Activate or deactivate user accounts
- View user civic engagement scores

### Crime Report Management
- View all submitted crime reports
- Filter reports by status and category
- Update report status (pending, investigating, resolved, dismissed)
- View report details including location and reporter information

### Payment Monitoring
- View all M-Pesa transactions
- Track payment status (completed/pending)
- View transaction amounts and references
- Monitor payment receipts

### FAQ Management
- View all frequently asked questions
- Edit existing FAQs
- Delete FAQs
- Track FAQ view counts and helpfulness ratings

### Chatbot Conversation History
- Review all user conversations with the AI legal assistant
- View questions and answers
- See which constitution articles were cited

### Data Scraping Controls
- Trigger manual scraping of MPs data
- Trigger manual scraping of Constitution articles
- Scrape all data sources simultaneously
- View scraping logs and status

### System Settings
- View debug mode status
- Check maintenance mode status
- View API version information
- Monitor system configuration

---

## Technology Stack

### Core Frameworks
- React 18.3.1
- React Router DOM 6.23.1
- Vite 5.2.0

### Styling
- CSS3 with custom variables
- React Icons 5.2.1

### State Management
- React Hooks (useState, useEffect)
- Local Storage for session persistence

### HTTP Client
- Fetch API for RESTful communication
- Axios for advanced HTTP requests

### Build Tools
- Vite 5.2.0
- ESLint 9.4.0

---

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Setup Instructions

1. Clone the repository
https://github.com/maxmillan45/Citizen_hub_admin.git

```bash 
 cd citizen-hub-admin

2. Install dependencies
   npm install

3. Start the development server
   npm run dev

4. Build for production
   npm run build

5. Preview production build
   npm run preview


---

## Environment Variables

Create a `.env` file in the root directory with the following variables:
VITE_API_URL=https://citizen-hub-kenya-backend.onrender.com

text

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:8000 |

---

## Project Structure
src/
├── components/
│ ├── admin/
│ │ ├── layout/
│ │ │ └── AdminLayout.jsx
│ │ └── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Users.jsx
│ │ ├── Crimes.jsx
│ │ ├── Payments.jsx
│ │ ├── Chatbot.jsx
│ │ ├── Faqs.jsx
│ │ ├── Scraping.jsx
│ │ └── Settings.jsx
│ └── Login.jsx
├── config/
│ └── api.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css

text

---

## Authentication

### Admin Login Flow

1. Administrator enters phone number on login page
2. Frontend calls `/api/get-token/` to retrieve JWT token
3. Backend checks if user has admin privileges (is_superuser or is_staff)
4. If authorized, JWT token is stored in localStorage
5. User is redirected to the admin dashboard
6. Token is automatically included in all subsequent API requests

### Token Management
- Access tokens expire in 24 hours
- Refresh tokens expire in 7 days
- Tokens are automatically refreshed on 401 responses
- Logout clears all tokens from localStorage

### Admin Privileges
Only users with `is_superuser=True` or `is_staff=True` can access the admin panel. Regular users are denied access with an "Access denied" message.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. On Render, create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm run start`
6. Set publish directory: `dist`
7. Add environment variables:
   - `NODE_VERSION=20`
   - `VITE_API_URL=https://citizen-hub-kenya-backend.onrender.com`
8. Click Deploy

### Deploy to Netlify
npm run build

text
Then drag and drop the `dist` folder to Netlify.

### Deploy to Vercel
vercel --prod

text

---

## API Integration

The admin panel communicates with the Citizen Hub Kenya backend through RESTful API endpoints.

### API Base URL
https://citizen-hub-kenya-backend.onrender.com

text

### Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/get-token/` | POST | Get authentication token |
| `/api/auth/admin-panel/dashboard/` | GET | Dashboard statistics |
| `/api/auth/admin-panel/users/` | GET | List all users |
| `/api/auth/admin-panel/users/` | PATCH | Update user |
| `/api/auth/admin-panel/users/` | DELETE | Delete user |
| `/api/auth/admin-panel/crimes/` | GET | List crime reports |
| `/api/auth/admin-panel/crimes/` | PATCH | Update crime status |
| `/api/auth/admin-panel/payments/` | GET | List payments |
| `/api/auth/admin-panel/faqs/` | GET | List FAQs |
| `/api/auth/admin-panel/chatbot/` | GET | List chatbot conversations |
| `/api/auth/admin-panel/scraping/` | GET | List scraping logs |
| `/api/auth/admin-panel/scraping/` | POST | Trigger data scraping |
| `/api/auth/admin-panel/settings/` | GET | System settings |

### Authentication Headers
All API requests must include a valid JWT token in the Authorization header:
Authorization: Bearer <access_token>

text

---

## Troubleshooting

### Common Issues

**Access Denied Error**
- Ensure the user has `is_superuser=True` or `is_staff=True`
- Verify the user exists in the backend database
- Make sure the token is valid and not expired

**CORS Errors**
- Ensure the backend CORS settings include your admin panel URL
- Add the domain to `CORS_ALLOWED_ORIGINS` in backend settings

**Blank Dashboard (All Zeros)**
- Check if the user is logged in with a valid token
- Verify the API URL is correct in `src/config/api.js`
- Open browser console (F12) to check for errors

**Build Fails on Render**
- Set Node.js version to 20 using `NODE_VERSION=20`
- Use `legacy-peer-deps` flag: `npm install --legacy-peer-deps && npm run build`
- Ensure `vite.config.js` has `allowedHosts` set for your Render URL

### Debugging

1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API request/response details
4. Verify localStorage contains the access_token
5. Check that the token is being sent in Authorization headers

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use functional components with hooks
- Follow the project's folder structure
- Include proper error handling
- Add console logs for debugging
- Use meaningful variable names

---

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited.

---

## Contact

For support or inquiries, contact the development team.

---

## Acknowledgments

- Safaricom for M-Pesa API integration
- Kenya Law for constitution data
- Open Kenya for parliamentary data
- All contributors and testers who helped shape this platform