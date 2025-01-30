# Vue.js Coding Test

This test is designed to assess your proficiency in **Vue.js**, focusing on building a frontend application that interacts with APIs, handles state management, and ensures proper file handling.

---

## Objective

You are tasked with building a **File Management Frontend** that interacts with a backend API. This frontend should allow users to upload, view, download, and delete files through the provided API.

---

## Testing the solution instructions

1. **Clone the Repository**  
   Clone this repository to your local environment:
   ```bash
   git clone git@github.com:robuedi/vue-coding-test.git
   cd vue-coding-test
   ```

2. **Set Up the Project**  
   1. Install dependencies:
      ```bash
      npm install
      ```
   2. Create an `.env` file in the root directory using:
      ```
      cp .env.example .env
      ```
   3. Start the development server:
      ```bash
      npm run dev
      ```
---

## Requirements

### 1. Features

1. **File Listing**
   - Display a list of files retrieved from the API.
   - Show each file’s:
     - Name.
     - Upload date.
     - Action buttons (e.g., download and delete).

2. **File Upload**
   - Provide a form to upload files.
   - Validate file input before sending it to the API.

3. **File Actions**
   - **Download**: Allow users to download files by triggering the corresponding API endpoint.
   - **Delete**: Allow users to delete files with a confirmation dialog.

4. **State Management**
   - Use Vue 3’s `ref`, `reactive`, and `watch` from the Composition API.
   - Ensure the UI updates dynamically after file actions (e.g., upload, delete).

5. **Environment Configuration**
   - Use an `.env` file to store the API base URL:
     - Example: `VITE_API_BASE_URL=http://your-backend-api-url\`.
   - Ensure the application reads the URL dynamically.

6. **Error Handling**
   - Display error messages for failed uploads, invalid files, or API errors.
   - Provide a fallback message if no files are available.

---

## Evaluation Criteria

Your submission will be evaluated based on:

1. **Code Quality**
   - Clean and modular components.
   - Proper state management and API handling.
   - Well-structured file organization.

2. **Functionality**
   - Completeness of required features (list, upload, download, delete).
   - Dynamic updates after file actions.

3. **Environment Management**
   - Correct usage of the `.env` file for configuration.

4. **Error Handling**
   - Graceful handling of API errors and edge cases.

5. **User Interface**
   - A simple, clean, and intuitive UI.

6. **Documentation**
   - Clear setup and usage instructions in `README.md`.