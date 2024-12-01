document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.php-email-form');
  const loadingElement = document.querySelector('.loading');
  const errorMessageElement = document.querySelector('.error-message');
  const sentMessageElement = document.querySelector('.sent-message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show loading indicator
    loadingElement.style.display = 'block';
    errorMessageElement.style.display = 'none';
    sentMessageElement.style.display = 'none';

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email. Please try again later.');
      }

      const result = await response.json();

      // Display success message
      loadingElement.style.display = 'none';
      sentMessageElement.style.display = 'block';
      sentMessageElement.textContent = result.message || 'Your message has been sent. Thank you!';
      form.reset();
    } catch (error) {
      // Display error message
      loadingElement.style.display = 'none';
      errorMessageElement.style.display = 'block';
      errorMessageElement.textContent = error.message || 'An error occurred. Please try again.';
    }
  });
});
