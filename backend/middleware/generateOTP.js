import nodemailer from 'nodemailer';
// Function to generate a 6-digit OTP
function generateOTP(length = 6) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
    return otp;
}

// Function to send OTP via email
async function sendOTP(email) {
    const otp = generateOTP(); // Generate OTP
    console.log("Generated OTP:", otp); // Log OTP for debugging

    // Create transporter for sending email
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail SMTP
        auth: {
             user: "it21.priyankasharma@svceindore.ac.in", pass: "ctxx upiz vcvm sbxn"
        }
    });

    // Email details
    let mailOptions = {
        from: 'ReactKickStart@gmail.com',
        to: email,
        subject ,
        text: `Your OTP for verification is: ${otp}\nThis OTP is valid for 5 minutes.`
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return { success: true, otp };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}

// // Example usage
// sendOTP('user@example.com')
//     .then(response => console.log(response))
//     .catch(error => console.log(error));

    export default  sendOTP;