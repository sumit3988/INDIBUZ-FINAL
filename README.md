# INDIBUZ Website

Premium B2B export website for Indibuz, now featuring a fully integrated Django backend for dynamic product loading and contact/partner lead management.

## System Architecture
- **Frontend**: Vanilla JS (ES6 Module Architecture), Vite, CSS Custom Properties
- **Backend**: Python 3.x, Django, Django REST Framework
- **Database**: SQLite3 (Local)

---

## ⚙️ BACKEND SETUP

1. Navigate to the backend directory and create a virtual environment:
   ```bash
   cd backend
   python -m venv ../venv
   ```

2. Activate the virtual environment:
   - **Windows:** `..\venv\Scripts\activate`
   - **Mac/Linux:** `source ../venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Load the default dynamic products into the database:
   ```bash
   python manage.py loaddata api/fixtures/products.json
   ```

6. Create a superuser to access the Django Admin Panel:
   ```bash
   python manage.py createsuperuser
   ```
   *(Follow the prompts to set your admin username, email, and password)*

7. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   The backend API will run seamlessly on `http://localhost:8000/api/`.

---

## 💻 FRONTEND SETUP

*Ensure your backend server is running in another terminal window first.*

1. In the project root (not the backend folder), install Node modules:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173/` or `http://localhost:3000/` depending on your Vite config. CORS has already been configured to allow these ports.*

---

## 🛡️ PORTALS & ENDPOINTS

### Admin Panel
Log in to view inquiries, partner leads, and modify the dynamic products.
**http://localhost:8000/admin/**

### API Base URL
The REST architecture endpoints.
**http://localhost:8000/api/**

- `GET /api/products/`
- `POST /api/contact/`
- `POST /api/partner/`
