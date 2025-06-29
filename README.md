 Overview
This submission is a login interface built in React using Bootstrap, designed according to the functional and UI requirements specified in the task document.

🔗 Live Demo: https://loginvalidate.netlify.app/

🛠️ Features Implemented
🔐 1. Login with Form Validation
Validates proper email format and password length (minimum 6 characters)

Invalid fields are highlighted with red borders and inline messages

💾 2. “Remember Me” Feature
When checked, the app stores login attempts and lock status in localStorage

When unchecked, login attempts are tracked only in-memory using React useState (session-only)

🚫 3. Account Locking
After 5 failed attempts, account is locked

Remember Me checked → lock persists across refresh

Unchecked → lock clears on refresh (session-only lock)

⏳ 4. Auto Unlock After 2 Hours
Locked users with "Remember Me" are automatically unlocked after 2 hours

🧠 5. License Expiry Check
If the system date is beyond 2025-07-27, login is blocked with a license expiry message

🔑 6. Password Reset (Popup)
"Forget Password?" opens a Bootstrap modal

Clicking Next simulates a password reset request

Clicking Close exits the modal cleanly

👁️ 7. Show/Hide Password Toggle
Password field visibility can be toggled using a checkbox

🧪 Testing Credentials
Field	Value
Email	valmikirekha@gmail.com
Password	rekha123

Any other credentials will be treated as invalid.

📁 Technologies Used
React (with functional components and hooks)

Bootstrap 5 for responsive UI styling

React Router DOM for navigation (useNavigate)

localStorage for persistent user state
