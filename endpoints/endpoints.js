import { comment } from "postcss";
import Savedposts from "../pages/Posts/fetchsavedposts";
import users from "../pages/Users/users";

export const BASE_URL = "http://localhost/UniYatWoon_AdminPanel"

  const endpoints = {
   users: `${BASE_URL}/users.php`,

   login: `${BASE_URL}/login.php`,

   logout: `${BASE_URL}/logout.php`,

   get_session: `${BASE_URL}/get_session.php`,

   profile: `${BASE_URL}/profile.php`,

   ban_account: `${BASE_URL}/ban_account.php`,

   fetchposts: `${BASE_URL}/fetchposts.php`,

   fetchreportposts: `${BASE_URL}/fetchreportposts.php`,

   savedposts: `${BASE_URL}/savedposts.php`,

   fetchsavedposts: `${BASE_URL}/fetchsavedposts.php`,

   reportposts: `${BASE_URL}/reportposts.php`,

   addposts: `${BASE_URL}/addposts.php`,

   deletePost: `${BASE_URL}/deletepost.php`,

   comment  : `${BASE_URL}/comments.php`,

  }

  
export default endpoints;