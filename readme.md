# 📁 Portfolio Projects CRUD Application

A simple Laravel 12.x application for managing portfolio projects with full CRUD (Create, Read, Update, Delete) functionality using Inertia.js and Vue.js.



## 🚀 Laravel Version

**Laravel 12.0**



## ⚙️ Project Setup Instructions

Follow the steps below to set up and run the project locally:


# 1. Clone the repository
git clone https://github.com/rjzim01/Portfolio-Projects-CRUD-Application

# 2. Navigate into the project directory
cd Portfolio-Projects-CRUD-Application

# 3. Install PHP dependencies
composer install

# 4. Install Node dependencies and compile assets
npm install && npm run build

# 5. Copy .env file
cp .env.example .env

# 6. Generate application key
php artisan key:generate

# 7. Run database migrations
php artisan migrate

# 8. Create symbolic link for storage
php artisan storage:link

# 9. Serve the application
php artisan serve


## 🛢️ Database
use the sqlite database it will generate automatically

