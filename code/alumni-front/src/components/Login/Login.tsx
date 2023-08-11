import "./Login.css";
import UserForm from "./components/UserForm/UserForm";

function Login() {
  return (
    <div className="Login">
      <div className="call-to-action">
        <h1>Share your memories</h1>
        <p>
          With our platform you can save your graduation photos in different forms, allowing you
          to treasure your graduation exactly how you want to. Future alumni can also request photo sessions from our top photographers.
        </p>
      </div>
      <div className="form-section">
        <p>
          <b> Completely free. </b> 10% discount on photo sessions
        </p>
        <UserForm />
      </div>
    </div>
  );
}

export default Login;
