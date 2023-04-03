### Technologies Used

- React
- ESLint
- Prettier
- Node.js + Express
- MongoDB
- Material.ui
- Axios
- RTK Query
- reduxjs/toolkit
- react-router
- Formik + yup
- Joi

::lemon: A response SPA with basic phonebook functionality. React + Material.ui. Redux + Redux Toolkit + RTK Query serves as state manager.

::lemon: WebServer [Node.js + Express] in connection with MongoDB. DAL is implemented.

::lemon: On the frontend Formik + yup. Backend validation uses Joi.

::lemon: Application provides authentication with email + password and sync across all devices. LocalStorage keeps user info between sessions if needed. Current user is tracked during each reload. A unique token is issued for every session and needed for every operation concerning mutation of users data. User can add, edit and delete contacts which contain name, email and phone number fields. There's a search by contact name and ability for adding to favorite which moves contacts to the top of the list.

::lemon: features to implement: Add UI to implement an ability to add and change avatar.
