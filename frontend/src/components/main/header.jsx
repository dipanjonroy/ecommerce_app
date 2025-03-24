import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
 
  const [isAuth, setIsAuth] = useState(false);

  const {success, data} = useSelector((store)=>store.userAuth);

  useEffect(()=>{
    if(success){
      setIsAuth(true)
    }
  })

  return (
    <header id={css.header_area}>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.brand}>
            <Link to="/">
              <img src="images/Brand_header.png" alt="" />
            </Link>
          </div>
          <form>
            <input type="text" placeholder="Search your products" />
            <button>
              <i className="ri-search-line"></i>
            </button>
          </form>

          <nav>
            <div className={css.navigate}>
              <i className="ri-heart-line"></i>
              <span>Wishlist</span>
              <div className={css.wishlistNum}>0</div>
            </div>

            {isAuth ? (
              <div className={css.navigate}>
                <i className="ri-user-line"></i>
                <span>{data?.firstname}</span>
              </div>
            ) : (
              <div className={css.navigate}>
                <Link to="login">
                  <i className="ri-user-line"></i>
                  <span>Sign in/Sign up</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
