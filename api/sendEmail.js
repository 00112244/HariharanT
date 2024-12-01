import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Log the request body to check if it is being received
  console.log('Request body:', req.body);

  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Destructure the body and check if all required fields are present
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Set up environment variable in Vercel
      pass: process.env.EMAIL_PASS,  // Set up environment variable in Vercel
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.RECIPIENT_EMAIL,  // Set up environment variable in Vercel
      subject: subject,
      text: message,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
