import { Link } from "react-router-dom";

function NotFound() {
    return (
      <main>
        <h1>404</h1>
        <p>Hello, 404 Page 📃</p>
        <Link to="/">return to home page</Link>
      </main>
    );
  }
  
  export default NotFound;
  