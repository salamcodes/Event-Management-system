# Eventopia – Event Management System

Eventopia is a web-based **Event Management System** for users and organizers.  
Users can browse events, view event details, book tickets, and receive **QR-code tickets**, while organizers (admins) can manage events, track sales and revenue, and validate tickets at entry.

## Key Features

### Secure Authentication
- **Login and Signup** for users and admins
- **Protected routes** based on user role

### User Side
- View all events and event details
- Book tickets (login required)
- Fill booking form with required details
- Generate **QR code ticket** after booking
- Download ticket as an image
- **My Tickets** page: fetch tickets by user ID

### Admin Side
- **Dashboard** showing total events, total tickets, and total revenue
- **Manage Events** page:
  - Add new events
  - Delete events
  - Search and filter events
- **Attendee List** page:
  - View all attendees
  - Search and filter users by event
- **Validate Ticket** page:
  - Scan QR code or enter ticket ID manually
  - Validation responses:
    - Valid → Allow entry
    - Already used → Ticket cannot be used again
    - Fake / Not found → No ticket with this ID

## Demo Accounts

You can use the following demo accounts to test the application:

User  
- Sign up using any email and password to test user features

Admin  
- Email: admin@gmail.com  
- Password: admin786  

## Tech Stack
- React
- Firebase (Authentication, Firestore)
- Tailwind CSS


### Libraries / Tools
- **react-qr**: QR code generation for tickets  
- **html5-qrcode**: QR code scanning for ticket validation  
- React Router (Routing)
- Redux Toolkit (state management)

## Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/eventopia.git

# Navigate to the project folder
cd eventopia

# Install dependencies
npm install

# Start the development server
npm run dev
