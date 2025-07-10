
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router';

import logo from '../../assets/images/logo-white.png'
import { AuthContext } from '../../context/AuthContext/AuthCotext';
import { use } from 'react';

const Navbar = () => {
  const {user,signOutUser}=use(AuthContext)
  const handleSignOut=()=>{
    signOutUser()
    .then(()=>{
        console.log("signout user ")
    })
    .catch(error=>{
        console.log(error)
    })
  }

  return (
    <nav className="bg-[#1e1e1e] text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
        </div>
          
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-6 font-semibold text-sm">
          <Link to="/">Home</Link>
          <Link to="/add-blog">Add Blog</Link>
          <Link to="/all-blogs">All Blogs</Link>
          <Link to="/featured-blogs">Featured Blogs</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        {/* Right Icons or Auth */}
        <div className="flex items-center space-x-6 text-sm">
          

          { user ? (
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <button onClick={handleSignOut} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Logout</button>
            </div>
          ) : (
            
            <Link
              to="/login"
              className="flex items-center bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-all duration-200"
            >
              <FiLogIn className="mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;