# 🚫🔊 NoMoreNoise 🔊🚫

 
*Community-driven Noise Pollution Reporting App for India*

---

## 🌏 Overview

India is a vibrant country full of celebrations, festivals, and events throughout the year. 🎉🎶 While this rich cultural tapestry adds joy and color to life, it often comes with unintended consequences — especially in densely populated urban areas. Loud music and noise during festivals or celebrations can disrupt the daily lives of many residents, particularly students 📚 and the elderly 👵🧓 who rely on quiet environments for study and rest.

**NoMoreNoise** is created to address this pressing issue by empowering citizens to report excessive noise pollution in their neighborhoods quickly and easily. By enabling community participation and volunteer moderation, this app aims to foster awareness and promote quieter, more respectful celebrations. 🤝

---

## ❓ Why NoMoreNoise?

- 🎊 **Frequent Festivities:** India experiences continuous cultural and religious celebrations with amplified music and loudspeakers running late into the night.
- 📖 **Disruption to Studies & Health:** Students preparing for exams and elderly residents need quiet and peaceful surroundings, which are often compromised.
- 🏘️ **Community Empowerment:** Traditional complaint mechanisms can be slow and ineffective. NoMoreNoise offers a faster, transparent, and local way to raise noise concerns.
- 🤗 **Volunteers as Noise Moderators:** Local volunteers can access reports in their area and help negotiate or remind event organizers about acceptable noise levels.

---

## ⚙️ How It Works

1. 🎤 **Report Noise Pollution**  
   Use your smartphone microphone to measure noise levels in decibels. The app automatically captures your location to geo-tag reports accurately.

2. 📝 **Submit Detailed Reports**  
   Add any comments or descriptions about the noise issue and submit your report easily.

3. 📚 **View Your History**  
   Track your previously submitted reports and monitor if issues have been addressed.

4. 🛡️ **Volunteer/Admin Panel**  
   Volunteers and admins can securely log in to view reports in their areas, enabling them to consult with local organizers and reduce noise pollution.

5. 👋 **Intro Popup**  
   New users are greeted with an introduction explaining the app’s purpose and usage.

---

## 🚀 Features

| Feature                          | Description                                                                                  |
|---------------------------------|----------------------------------------------------------------------------------------------|
| 🎧 **Real-Time Noise Measurement** | Uses device microphone to detect current noise levels in decibels.                           |
| 📍 **Automatic Location Capture** | Captures GPS coordinates automatically when submitting a report for accurate geo-tagging.  |
| 📝 **Easy Report Submission**       | Simple form to submit noise complaints with optional descriptions.                          |
| 📚 **User Report History**           | Users can view their past submitted reports to track reported issues.                       |
| 🔐 **Volunteer/Admin Login**         | Secure login system for volunteers/admins to monitor noise reports locally.                 |
| 📊 **Admin Dashboard**               | View all submitted reports with detailed information for effective noise management.        |
| 👋 **Persistent Intro Popup**        | Educates new users about the app’s functions; shown once using localStorage.                |
| 📱 **Responsive Design**             | Works seamlessly on desktop and mobile browsers.                                            |

---

## 🛠️ Installation & Setup

Follow these steps to run NoMoreNoise locally:

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/NoMoreNoise_Website.git
cd NoMoreNoise_Website


2. **Install dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open the app in your browser**

Visit [http://localhost:5173](http://localhost:5173) to see the app running.

---

## 📝 How to Use the App

### For Users:

* On first visit, read the intro popup that explains the app.
* Use the microphone to measure noise levels in your area.
* Submit a report including noise decibel reading and optional comments.
* View your submitted report history to check past complaints.
### LOGO
<p align="left">
  <img src="https://github.com/user-attachments/assets/b365ec28-88d0-4253-93d9-47ae7f108742" alt="NoMoreNoise Logo" width="150"/>



### Screenshots 
<img width="1467" alt="Screenshot 2025-05-29 at 1 21 57 AM" src="https://github.com/user-attachments/assets/db4994b8-65f6-4103-85eb-e4cc65204e16" />
### for volunteers or admins
<img width="1457" alt="Screenshot 2025-05-29 at 1 22 20 AM" src="https://github.com/user-attachments/assets/f85cef92-26a0-4467-bdf8-b69a4e8918ad" />
<img width="1461" alt="Screenshot 2025-05-29 at 1 22 29 AM" src="https://github.com/user-attachments/assets/5d73e9f8-828e-4030-8500-ab2e86c97d92" />

### About page

<img width="1456" alt="Screenshot 2025-05-29 at 1 22 41 AM" src="https://github.com/user-attachments/assets/09a3f19c-2274-4caf-a1ac-8a36cf5ea96c" />
<img width="1407" alt="Screenshot 2025-05-29 at 1 22 49 AM" src="https://github.com/user-attachments/assets/7b198cbd-d1a6-4b39-a7f2-6f115a0de528" />




### For Volunteers/Admins:

* Navigate to the Admin Login page from the Home screen.

* Use the hardcoded credentials to log in:

  ```
  Username: admin
  Password: 1234
  ```

* Access the dashboard to see all noise reports submitted by users.

* Contact local event organizers or residents to help reduce noise levels.

---

## 🛑 Common Errors and Fixes

* **Blank page on load:**
  Ensure your `package.json` has correct scripts and run `npm run dev`.
  Check your React and ReactDOM versions are consistent with `npm ls react`.

* **Invalid hook call error:**
  Make sure hooks like `useState` are only used inside functional components.
  Verify no duplicate React versions exist in `node_modules`.

* **Missing start script error:**
  Use `npm run dev` for Vite-based projects instead of `npm start`.

---

## 🤝 Contribution

Your contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

---

## 📞 Contact

Created with ❤️ by Nandini & Sumit Das

---

## 📄 License

This project is licensed under the MIT License.

---



