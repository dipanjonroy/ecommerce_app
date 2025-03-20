import { Link } from "react-router-dom";
import css from "./Footer.module.css";

function Footer() {
  return (
    <footer id={css.footer_area}>
      <div className={css.container}>
        <div className={css.row}>
          <div className={`${css.col} ${css.col_1}`}>
            <div className={css.brand}>
              <Link to="/">
                <img src="images/Brand_header.png" alt="" />
              </Link>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incidi ut labore et dolore magna aliqua. Ut enim ad
              minim veniam,
            </p>

            <div className="payment">
              <Link to="/">
                <img src="images/payment.webp" alt="" />
              </Link>
            </div>
          </div>

          <div className={`${css.col} ${css.col_2}`}>
            <h3>support</h3>

            <ul>
              <li>About Us</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Customer Service</li>
              <li>Return Policy</li>
            </ul>
          </div>

          <div className={`${css.col} ${css.col_3}`}>
            <h3>Information</h3>

            <ul>
              <li>My Account</li>
              <li>Order History</li>
              <li>Wish List</li>
              <li>Newsletter</li>
              <li>Order History</li>
              <li>International Orders</li>
            </ul>
          </div>

          <div className={`${css.col} ${css.col_4}`}>
            <h3>get in touch</h3>
            <ul>
              <li>Address: 123 Main Street, Anytown, CA 12345 - USA.</li>
              <li>Telephone Enquiry: (012) 800 456 789-987</li>
              <li>Email:Info@example.com</li>
            </ul>

            <h3>Get In Time</h3>
            <ul>
              <li>Open: 8:00 AM - Close: 18:00 PM</li>
              <li>Saturday - Sunday: Close</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
