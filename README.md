# Password Manager with Multi-Factor Authentication (MFA)

## 📌 Overview
This **Password Manager** is a secure and user-friendly application designed to store and manage passwords efficiently. It incorporates **Multi-Factor Authentication (MFA)** to enhance security. The system allows users to:

- Store passwords securely with associated platform names and owners.
- Check the strength of passwords before saving.
- Implement MFA for enhanced security.

## 🚀 Features
- **Secure Password Storage**: Stores passwords with their respective platform and owner details.
- **Password Strength Checker**: Analyzes password strength before saving.
- **Multi-Factor Authentication (MFA)**: Adds an extra layer of security.
- **User Authentication**: Firebase handles user authentication.
- **Modern UI**: Built with HTML, CSS, and JavaScript.
- **Real-time Database**: MongoDB stores encrypted password data.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Authentication, Node.js
- **Database**: MongoDB

## 🔐 Security Measures
- **Multi-Factor Authentication (MFA)** for user authentication.
- **Secure Storage** of passwords in an encrypted format.
- **Password Strength Analysis** to prevent weak passwords.

## 📂 Project Structure
```
password-manager/
│── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│
│── server/
│   ├── server.js
│   ├── database.js
│
│── config/
│   ├── firebaseConfig.js
│
│── README.md
│── package.json
```

## 🛠️ Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/password-manager.git
   cd password-manager
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Setup Firebase**
   - Configure Firebase Authentication in `config/firebaseConfig.js`.
   
4. **Run the Server**
   ```sh
   node server.js
   ```
5. **Open in Browser**
   - Visit `http://localhost:5173`

## 📌 Future Enhancements
- Implement **Biometric Authentication**.
- Add **Password Generator** feature.
- Enable **Cloud Backup** for password storage.

## 📝 License
This project is **open-source** and available under the MIT License.

---
### 🎯 Made with ❤️ by Avishek Roy