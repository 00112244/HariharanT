const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Add this as an environment variable in Vercel
      pass: process.env.EMAIL_PASS, // Add this as an environment variable in Vercel
    },
  });

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.RECIPIENT_EMAIL, // Add this as an environment variable in Vercel
      subject: subject,
      text: message,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
