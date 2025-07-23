const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting for booking endpoint
const bookingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        message: 'Too many booking requests. Please try again later.'
    }
});

// CORRECTED: Email transporter configuration
const transporter = nodemailer.createTransport({  // ← Fixed: removed 'er'
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email NOT send messages');
        console.error('Email not Sent configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Booking submission endpoint
app.post('/api/booking', bookingLimiter, async (req, res) => {
    try {
        const bookingData = req.body;
        
        // Server-side validation
        const validationError = validateBookingData(bookingData);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }
        
        // Send email
        const emailSent = await sendBookingEmail(bookingData);
        
        if (emailSent) {
            res.json({
                success: true,
                message: 'Booking request received successfully!'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send booking request. Please try again.'
            });
        }
        
    } catch (error) {
        console.error('Booking submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Email sending function
async function sendBookingEmail(bookingData) {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            serviceType,
            eventDate,
            venue,
            guestCount,
            duration,
            budget,
            message
        } = bookingData;

        // Email content
        const emailSubject = `New Booking Request - ${serviceType} - ${firstName} ${lastName}`;
        
        const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #555; display: inline-block; width: 140px; }
                    .value { color: #333; }
                    .highlight { background: #fff; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📸 New Booking Request - DaVibe Photography</h2>
                        <p>A new client has submitted a booking request</p>
                    </div>
                    
                    <div class="content">
                        <h3>Client Information</h3>
                        <div class="field">
                            <span class="label">Name:</span>
                            <span class="value">${firstName} ${lastName}</span>
                        </div>
                        <div class="field">
                            <span class="label">Email:</span>
                            <span class="value">${email}</span>
                        </div>
                        <div class="field">
                            <span class="label">Phone:</span>
                            <span class="value">${phone}</span>
                        </div>
                        
                        <h3>Event Details</h3>
                        <div class="field">
                            <span class="label">Service Type:</span>
                            <span class="value">${getServiceTypeLabel(serviceType)}</span>
                        </div>
                        <div class="field">
                            <span class="label">Event Date:</span>
                            <span class="value">${formatDate(eventDate)}</span>
                        </div>
                        <div class="field">
                            <span class="label">Venue:</span>
                            <span class="value">${venue}</span>
                        </div>
                        ${guestCount ? `
                        <div class="field">
                            <span class="label">Guest Count:</span>
                            <span class="value">${guestCount}</span>
                        </div>
                        ` : ''}
                        ${duration ? `
                        <div class="field">
                            <span class="label">Duration:</span>
                            <span class="value">${getDurationLabel(duration)}</span>
                        </div>
                        ` : ''}
                        ${budget ? `
                        <div class="field">
                            <span class="label">Budget Range:</span>
                            <span class="value">${budget}</span>
                        </div>
                        ` : ''}
                        
                        ${message ? `
                        <div class="highlight">
                            <h4>Additional Message:</h4>
                            <p>${message}</p>
                        </div>
                        ` : ''}
                        
                        <div class="footer">
                            <p>This booking request was submitted on ${new Date().toLocaleString()}</p>
                            <p>Please respond to the client within 24 hours for the best experience.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Email options
        const mailOptions = {
            from: `"DaVibe Photography Booking" <${process.env.EMAIL_USER}>`,
            to: process.env.PHOTOGRAPHER_EMAIL, // Your business email
            subject: emailSubject,
            html: emailHTML,
            replyTo: email // Client's email for easy reply
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        // Optional: Send confirmation email to client
        await sendClientConfirmation(bookingData);
        
        return true;
        
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
}

// Send confirmation email to client
async function sendClientConfirmation(bookingData) {
    try {
        const confirmationHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .highlight { background: #fff; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📸 Thank You for Your Booking Request!</h2>
                        <p>DaVibe Photography</p>
                    </div>
                    
                    <div class="content">
                        <p>Dear ${bookingData.firstName},</p>
                        
                        <p>Thank you for choosing DaVibe Photography! We have received your booking request for <strong>${getServiceTypeLabel(bookingData.serviceType)}</strong> on <strong>${formatDate(bookingData.eventDate)}</strong>.</p>
                        
                        <div class="highlight">
                            <h4>What happens next?</h4>
                            <ul>
                                <li>We will review your request within 24 hours</li>
                                <li>Our team will contact you to discuss your requirements</li>
                                <li>We'll provide a detailed quote and package options</li>
                                <li>Once confirmed, we'll send you a contract and booking details</li>
                            </ul>
                        </div>
                        
                        <p>If you have any urgent questions, please don't hesitate to contact us at:</p>
                        <ul>
                            <li>📧 Email: ${process.env.PHOTOGRAPHER_EMAIL}</li>
                            <li>📱 Phone: +91-XXXXXXXXXX</li>
                        </ul>
                        
                        <p>We're excited to capture your special moments!</p>
                        
                        <p>Best regards,<br>
                        <strong>DaVibe Photography Team</strong></p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const confirmationOptions = {
            from: `"DaVibe Photography" <${process.env.EMAIL_USER}>`,
            to: bookingData.email,
            subject: 'Booking Request Received - DaVibe Photography',
            html: confirmationHTML
        };

        await transporter.sendMail(confirmationOptions);
        
    } catch (error) {
        console.error('Client confirmation email error:', error);
        // Don't throw error as main booking email is more important
    }
}

// Validation function
function validateBookingData(data) {
    const required = ['firstName', 'lastName', 'email', 'phone', 'serviceType', 'eventDate', 'venue'];
    
    for (const field of required) {
        if (!data[field] || data[field].toString().trim() === '') {
            return `${field} is required`;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return 'Invalid email address';
    }
    
    // Date validation
    const eventDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
        return 'Event date cannot be in the past';
    }
    
    return null;
}

// Helper functions
function getServiceTypeLabel(serviceType) {
    const labels = {
        'wedding': 'Wedding Photography',
        'pre-wedding': 'Pre-Wedding Shoot',
        'events': 'Event Photography',
        'reception': 'Reception Photography',
        'engagement': 'Engagement Session'
    };
    return labels[serviceType] || serviceType;
}

function getDurationLabel(duration) {
    const labels = {
        'half-day': 'Half Day (4-6 hours)',
        'full-day': 'Full Day (8-10 hours)',
        'multi-day': 'Multi-Day Event'
    };
    return labels[duration] || duration;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
