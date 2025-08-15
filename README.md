FreshCart


FreshCart is a modern web application delivering fresh and trusted groceries. It features a seamless shopping experience, seller management, and a fully responsive UI.
🌟 Live Demo
Check it out here: FreshCart Live https://fresh-cart-snowy.vercel.app/
⚡ Features
User Features
🛒 Add and remove items from the cart
💳 Multiple payment options: Stripe Payment Gateway & Cash on Delivery (COD)
📄 My Orders page to track user purchases
🔑 Authentication: Login, Signup, Forgot & Reset Password via NodeMailer
📱 Fully responsive UI for mobile and desktop
🏠 Add multiple delivery addresses
🔍 Search bar to quickly find products
✉️ Contact form to give feedback
Seller Features
📊 Seller Dashboard to manage products
➕ Add and update products
📦 View all orders for their products
🔄 Update stock status via toggle
🛠 Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB
Image Hosting: Cloudinary
Authentication: JWT & NodeMailer
Payment: Stripe Payment Gateway
Deployment: Vercel
🚀 How It Works
Users browse products, search via the search bar, and add items to their cart
Choose Stripe or COD at checkout
Manage orders, addresses, and account settings
Sellers log in, manage products, view orders, and update stock availability
Password recovery is handled via NodeMailer
💻 Setup Instructions
# Clone the repository
git clone [your-repo-link]

# Navigate to project folder
cd FreshCart

# Install dependencies
npm install
Set up environment variables:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_key
NODEMAILER_EMAIL=your_email
NODEMAILER_PASSWORD=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_secret
# Run development server
npm run dev
