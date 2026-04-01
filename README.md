🚀 Social Media Web Application
🌐 Overview

This is a full-stack social media web application where users can create profiles, share posts, interact with others, and build connections.

The platform provides a complete experience similar to modern social apps with authentication, profile management, posts, and networking features.

🎯 Key Features :

1. 👤 User Features
User Registration & Login
Token-based Authentication
Profile Creation & Update
Upload Profile Picture

2. 📝 Post Features
Create Post (with image/media)
View All Posts
Like Posts
Comment on Posts
Delete Posts & Comments
🤝 Connection Features
Send Connection Requests
Accept Requests
View Connections
3. 📊 Dashboard
View user profile
View posts
Perform all interactions in one place


🛠️ Tech Stack :
1.🔹 Frontend
Next.js
Redux Toolkit
Axios
Tailwind CSS
shadcn/ui

2.🔹 Backend
Node.js
Express.js
MongoDB (Mongoose)
Multer (File Upload)
CORS & dotenv

🧠 Application Architecture :

Frontend (Next.js + Redux)
        ↓
Axios API Calls
        ↓
Backend (Express.js)
        ↓
MongoDB Database

🔐 Authentication Flow :

1.User registers/logs in
2.Backend generates a token
3.Token is stored in localStorage
4.Token is used in API calls
5.Dashboard is accessible only after login

📊 Dashboard Flow (Core Feature) :

1.🔹 Backend
Get User Profile :
GET /api/users/get_user_and_profile

a.Finds user using token
b.Fetches profile data
c.Populates user details

Get All Posts :
GET /posts

a.Returns all posts
b.Includes user details

Frontend :

1.On Dashboard Load -
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  } else {
    dispatch(getAllPosts());
    dispatch(getAboutUsers({ token }));
  }
}, []);

Data Rendering :
1.Profile displayed using Avatar
2.Posts rendered using map
3.Redux manages global state

📡 API Routes :

1.🧑 User Routes -
Method	         Endpoint	                             Description
POST	           /api/users/register	                 Register
POST	           /api/users/login	                     Login
GET	             /api/users/get_user_and_profile	     Get profile
POST	           /api/users/update_profile_picture     Upload image
POST	           /api/users/user_update	               Update profile
GET	             /api/users/get_all_users	             Get users
POST	           /api/users/send_connection_request	   Send request
POST	           /api/users/accept_connection_request	 Accept request

2.📝 Post Routes
Method	           Endpoint	            Description
GET	               /posts	              Get all posts
POST	             /post	              Create post
POST	             /delete_post	        Delete post
POST	             /comment	            Add comment
GET	               /get_comment	        Get comments
POST	             /increment_post_like	Like post

📂 File Upload System :

1.Uses Multer
2.Stores files in /uploads

Accessible via:
http://localhost:9090/uploads/filename

⚙️ Setup Instructions :

1.🔹 Backend
npm install
npm run dev

Create .env:  MONGO_URI=your_database_url

2.🔹 Frontend
npm install
npm run dev

📁 Project Structure :

Backend
/controllers
/routes
/uploads
server.js

Frontend
/app
/components
/config/redux

🔄 Complete User Flow :

User opens homepage
Clicks Signup
Registers account
Logs in
Redirect to Dashboard

Dashboard loads:
a.User Profile
b.Posts
c.User interacts:
d.Like
e.Comment
f.Create Post
g.Connect with users


UI Highlights :

> Modern UI using Tailwind CSS
> Reusable components (Avatar, Buttons, Tabs)
> Responsive design


👨‍💻 Author
Mansha vatsh
BTech ECE | Full Stack Developer

⭐ Final Note :

This project demonstrates:
a. Full-stack development skills
b. API design and integration
c. State management using Redux
d. Real-world application architecture
