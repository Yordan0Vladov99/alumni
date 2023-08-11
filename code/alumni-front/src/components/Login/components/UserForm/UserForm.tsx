import ErrorSymbol from "../../../ErrorSymbol/ErrorSymbol";
import "../../../UserForm.scss";
import {
  FieldError,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  emailAddress: z
    .string({ required_error: "Email Address cannot be empty" })
    .email({ message: "Looks like this is not an email" }),
  password: z
    .string({ required_error: "Password cannot be empty" })
    .refine(
      (value) =>
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(
          value
        ),
      { message: "Password is too weak" }
    ),
});

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const user = {
      id: data.emailAddress,
      password: data.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("/api/users/authenticate", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("email", data.emailAddress);
        localStorage.setItem("type", res.userType);
        localStorage.setItem("token", res.token);
        localStorage.setItem("profile", res.profile);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const onInvalid: SubmitErrorHandler<FieldValues> = (errors) => {
    console.log(errors);
  };
  const errorMsg = (error: FieldError) => (
    <p className="error-msg">{error?.message as string}</p>
  );
  return (
    <form className="UserForm" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div
        className={`input-container ${
          errors.emailAddress?.message ? "invalid" : ""
        }`}
      >
        <input placeholder="Email" {...register("emailAddress")} />
        <ErrorSymbol />
      </div>
      {errorMsg(errors.emailAddress as FieldError)}

      <div
        className={`input-container ${
          errors.password?.message ? "invalid" : ""
        }`}
      >
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorSymbol />
      </div>
      {errorMsg(errors.password as FieldError)}

      <input type="submit" value="Login" />

      <p>
        Don't have an account?
        <Link to="/registration">
          <b> Register</b>
        </Link>
      </p>
    </form>
  );
}

export default UserForm;
