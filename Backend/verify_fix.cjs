
const fs = require('fs');
const path = require('path');

// Helper to create a dummy image
const createDummyImage = () => {
    const buffer = Buffer.from('fake image content');
    fs.writeFileSync('test_image.jpg', buffer);
    return 'test_image.jpg';
};

// Helper for multipart form data boundary
const generateBoundary = () => {
    return '--------------------------' + Date.now().toString(16);
};

// Use node's fetch (available in Node 18+)
const runVerification = async () => {
    try {
        console.log("Starting verification...");

        // 1. Register a visitor
        const email = `test_visitor_${Date.now()}@example.com`;
        const password = 'password123';
        console.log(`Registering visitor with email: ${email}`);

        const registerResponse = await fetch('http://localhost:3000/api/visitor/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test Visitor",
                email,
                password,
                mobile: "1234567890",
                address: "Test Address",
                company: "Test Company"
            })
        });

        if (!registerResponse.ok) {
            const err = await registerResponse.text();
            throw new Error(`Registration failed: ${registerResponse.status} ${err}`);
        }

        const registerData = await registerResponse.json();
        const token = registerData.token;
        console.log("Registration successful, got token.");

        // 2. Create Appointment with Photo
        const imagePath = createDummyImage();
        const boundary = generateBoundary();

        const fileContent = fs.readFileSync(imagePath);
        const filename = path.basename(imagePath);

        // Construct multipart body manually since we don't have form-data package
        let body = [];
        const validHostId = "60d5ecb8b392d7001f8e8e8e"; // Dummy Mongo ID

        // Fields
        const fields = {
            hostId: validHostId,
            date: "2024-12-31",
            time: "10:00",
            purpose: "Test Visit"
        };

        for (const [key, value] of Object.entries(fields)) {
            body.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`);
        }

        // File
        body.push(`--${boundary}\r\nContent-Disposition: form-data; name="photo"; filename="${filename}"\r\nContent-Type: image/jpeg\r\n\r\n`);
        body.push(fileContent);
        body.push(`\r\n--${boundary}--`);

        // Convert body parts to a single Buffer
        const bodyBuffer = Buffer.concat(body.map(part => (typeof part === 'string' ? Buffer.from(part) : part)));

        console.log("Sending appointment request...");
        const appointmentResponse = await fetch('http://localhost:3000/api/visitor/create-appointment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            body: bodyBuffer
        });

        if (!appointmentResponse.ok) {
            const err = await appointmentResponse.text();
            throw new Error(`Appointment creation failed: ${appointmentResponse.status} ${err}`);
        }

        const appointmentData = await appointmentResponse.json();
        console.log("Appointment created successfully:", appointmentData);

        if (appointmentData.photo) {
            console.log("Verified: Photo path is present in response.");
        } else {
            console.error("Failed: Photo path missing in response.");
        }

        // Cleanup
        fs.unlinkSync(imagePath);

    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    }
};

runVerification();
