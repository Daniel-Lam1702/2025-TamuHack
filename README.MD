# Vite + React Front-End Project

## Getting Started

Follow these instructions to set up and run the Vite + React front-end project.

### Prerequisites

Make sure you have the following installed:
- Node.js (version 14.18+ or 16+)
- npm (version 6+)

**Clone the repository:**
    ```
    git clone https://github.com/Daniel-Lam1702/2025-TamuHack.git
    ```

### Installation

1. **Change directory to the front-end folder:**
    ```
    cd front-end
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

### Running the Project

1. **Start the development server:**
    ```
    npm run dev
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

### Build for Production

To create a production build, run:
    ```
    npm run build
    ```

# Back-end
1. Change to the back-end folder:
    ```
    cd back-end
    ```
2. Create a virtual environment:
    ```
    python -m venv myenv
    ```
3. Activate the virtual environment
    ```
    myenv\Scripts\activate
    ```
4. Install Dependencies:
    ```
    pip install -r requirements.txt
    ```
5. Start the Django project:
    ```
    cd api
    python manage.py runserver
    ```
6. If a new library is created execute:
    ```
    pip freeze > requirements.txt
    ```

### Version

This project uses:
- **Vite**: `^3.0.0`
- **React**: `^18.0.0`

For more details, refer to the `package.json` file.
