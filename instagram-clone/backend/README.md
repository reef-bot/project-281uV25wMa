// File: instagram-clone/backend/README.md

# Instagram Clone Backend

The backend of the Instagram clone project handles user authentication, profile creation, post handling, and other functionalities. It is built using Django and interacts with the frontend implemented in React.

Dependencies:
- Django 3.2
- django-rest-framework 3.12
- boto3 1.17

File Structure:
- src
  - users
    - models.py
    - views.py
    - urls.py
- media
- static

The `src` directory contains the main source code for user management:
1. `models.py`: Defines the database models for users, posts, likes, comments, and other related entities.
2. `views.py`: Implements the views for user authentication, profile creation, post handling, and other user-related operations.
3. `urls.py`: Defines the URL patterns for different API endpoints related to users.

The `media` directory is used for storing user-uploaded images, while the `static` directory contains static files such as CSS, JavaScript, and images used in the frontend.

Ensure to maintain proper structure, code organization, and adhere to best practices throughout the backend development process.