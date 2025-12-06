# 🍴 Namaste Food

A modern **React-based web application** for browsing restaurants, exploring menus, and managing a shopping cart.
Built as part of the **Namaste React Course** by [Akshay Saini](https://github.com/akshaymarch7).

🔗 **Live Demo**: [https://namaste-food.vercel.app](https://namaste-food-ashen.vercel.app/)
💻 **GitHub Repo**: [Namaste-Food](https://github.com/Tushar-Sahu7/Namaste-Food)

---

## 🚀 Tech Stack

* **React** – Frontend UI library for building interactive components
* **Redux Toolkit** – State management (cart, user state)
* **React Router** – Navigation & routing between pages
* **TailwindCSS v4** – Modern styling & responsive design
* **Parcel** – Fast bundler with zero-config setup
* **Babel** – Transpiler for modern JavaScript & JSX
* **FontAwesome** – Icons and visual enhancements
* **Swiggy API** – Restaurant & menu data (real-time fetch)
* **Jest + React Testing Library** – Unit & component testing

---

## ✨ Features

* **Restaurant Listing** – API-powered list with ratings, cuisines, cost, etc.
* **Restaurant Menu** – Dynamic items with description, price & images
* **Cart Management** – Add/remove items, dynamic total using Redux Toolkit
* **User Authentication Simulation** – Simple login/logout toggle
* **Responsive Design** – Works across mobile, tablet, and desktop
* **Shimmer Loading States** – Smooth user experience while fetching data
* **Dynamic UI** – Accordions, toggles, interactive components
* **Class + Functional Components** – Demonstrates both approaches
* **Context API** – Global user info sharing
* **Code Coverage** – reports for testing coverage

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tushar-Sahu7/Namaste-Food.git
   cd Namaste-Food
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---

## 🌐 Handling CORS (Cross-Origin Requests)

Since the project fetches data from the **Swiggy API**, you may face **CORS issues** while running locally.
👉 To fix this during development, install the Chrome extension:
[Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/hnlimanpjeeomjnpdglldcnpkppmndbp)

* After installation, **enable the extension** while running the app locally.

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

Code coverage reports are generated.

---

## 🙌 Acknowledgements

Special thanks to **[Akshay Saini](https://github.com/akshaymarch7)** for the **Namaste React Course** that inspired and guided this project.
