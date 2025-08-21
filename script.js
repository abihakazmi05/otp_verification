const form = document.getElementById('otp-form');
const inputs = document.querySelectorAll('.otp-input');
const successMsg = document.getElementById('success-message');
const errorMsg = document.getElementById('error-message');
const VALID_OTP = '1234'; // 🔐 Static OTP for demo (Replace with dynamic value in production)

// 🔄 Auto move to next input and handle backspace
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.classList.remove('success', 'error'); // Remove previous validation classes

    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus(); // Move focus to next box
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus(); // Move back if empty and Backspace is pressed
    }
  });
});

// ✅ Handle OTP form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const enteredOTP = Array.from(inputs).map(input => input.value).join('');

  // Clear previous styles and messages
  inputs.forEach(input => input.classList.remove('success', 'error'));
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  // 🎯 OTP Match Check
  if (enteredOTP === VALID_OTP) {
    inputs.forEach(input => input.classList.add('success'));
    successMsg.textContent = '✅ OTP Verified Successfully!';
    successMsg.style.display = 'block';
  } else {
    inputs.forEach(input => input.classList.add('error'));
    errorMsg.textContent = '❌ Invalid OTP!';
    errorMsg.style.display = 'block';
  }
});
