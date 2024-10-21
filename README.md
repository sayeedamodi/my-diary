
# 📝 Personal Diary App

A simple personal diary app built using **Node.js**, **Express.js**, **MongoDB**, and **EJS** for rendering the views. This app allows users to compose and read diary entries.

## 🚀 Features
- Create new diary posts with a title and content.
- View specific diary entries based on the title.
- Data stored securely using **MongoDB Atlas**.

## 🛠️ Technologies Used
- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB Atlas**: Cloud database for storing posts
- **Mongoose**: ODM for MongoDB
- **EJS**: Templating engine for rendering HTML

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/PersonalDiary.git
   cd PersonalDiary
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blogdb?retryWrites=true&w=majority
   PORT=3000
   ```

   Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

4. **Run the application:**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## 🌍 Deployed Version
You can check out the live version of the app here: [Live Link](https://my-diary-vwwr.onrender.com)

## 📚 Usage

- Navigate to `/compose` to create a new diary entry.
- View diary entries by navigating to `http://localhost:3000/posts/<postName>` where `<postName>` is the title of the post you want to view.

## 🤝 Contributing

Feel free to submit a pull request if you'd like to improve the project!


