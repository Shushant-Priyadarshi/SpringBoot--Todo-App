import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="navbar  bg-neutral text-white">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-2xl">Todo-App</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-3 text-lg">
      <Link to={"/dashboard"}><li>Your Tasks</li></Link>
      
    </ul>
  </div>
</div>
  )
}

export default Header