# Medicio Healthcare Backend API

A comprehensive backend API for the Medicio Healthcare system built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Patient, doctor, and admin user management
- **Appointment System**: Complete appointment booking and management
- **Doctor Profiles**: Detailed doctor information and specialties
- **Service Management**: Medical services with pricing and availability
- **Contact System**: Contact form handling with notifications
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Password hashing, CORS, rate limiting, and secure headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Express Validator
- **Security**: bcryptjs, CORS

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medicio-healthcare

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_PHONE=+1-555-000-0000
ADMIN_PASSWORD=admin123

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - Logout user

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/:id` - Get single appointment
- `PUT /api/appointments/:id` - Update appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `PUT /api/appointments/:id/reschedule` - Reschedule appointment
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments
- `GET /api/appointments/availability/:doctorId` - Check availability

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `GET /api/doctors/specialty/:specialty` - Get doctors by specialty
- `GET /api/doctors/top-rated` - Get top rated doctors
- `GET /api/doctors/specialties` - Get all specialties
- `POST /api/doctors` - Create doctor profile (Doctor role)
- `PUT /api/doctors/:id` - Update doctor profile
- `DELETE /api/doctors/:id` - Delete doctor profile (Admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/popular` - Get popular services
- `GET /api/services/search` - Search services
- `GET /api/services/categories` - Get all categories
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (Admin)
- `GET /api/contact/:id` - Get single contact submission (Admin)
- `PUT /api/contact/:id/status` - Update contact status (Admin)
- `PUT /api/contact/:id/respond` - Respond to contact (Admin)
- `GET /api/contact/statistics` - Get contact statistics (Admin)
- `GET /api/contact/overdue` - Get overdue contacts (Admin)

### Health Check
- `GET /api/health` - API health check

## Database Models

### User
- Basic user information (name, phone, etc.)
- Role-based access (patient, doctor, admin)
- Medical history, allergies, medications
- Authentication data

### Doctor
- Doctor profile linked to User
- Specialty, education, certifications
- Availability schedule
- Rating and reviews
- Consultation fees

### Service
- Medical services with descriptions
- Pricing ranges and duration
- Category and features
- Booking restrictions

### Appointment
- Patient, doctor, and service references
- Date, time, and status
- Notes, symptoms, diagnosis
- Payment information
- Follow-up requirements

### Contact
- Contact form submissions
- Status tracking and priority
- Response management
- Email notifications

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation with express-validator
- **CORS Protection**: Configurable CORS for frontend integration
- **Rate Limiting**: Protection against brute force attacks
- **Error Handling**: Secure error messages without sensitive data
- **Role-based Access**: Different access levels for users

## Notifications

The API includes automated notifications for:
- Appointment confirmations
- Contact form submissions
- Account notifications

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Environment Variables
All configuration is done through environment variables. See `env.example` for required variables.

### Database
The API uses MongoDB with Mongoose ODM. Make sure MongoDB is running locally or provide a connection string to a remote database.

## API Documentation

The API follows RESTful conventions with JSON responses. All responses include a `success` boolean and appropriate status codes.

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
