import users from "../pages/Users/users";

export const BASE_URL = "http://localhost/UniYatWoon_AdminPanel"

  const endpoints = {
   admin: `${BASE_URL}/admin.php`,

   users: `${BASE_URL}/users.php`,

   login: `${BASE_URL}/login.php`,

   get_session: `${BASE_URL}/get_session.php`,

   fetchposts: `${BASE_URL}/fetchposts.php`,

   fetchreportposts: `${BASE_URL}/fetchreportposts.php`,

   reportposts: `${BASE_URL}/reportposts.php`,

   addposts: `${BASE_URL}/addposts.php`,

   deletePost: `${BASE_URL}/deletepost.php`,

  }

  
export default endpoints;