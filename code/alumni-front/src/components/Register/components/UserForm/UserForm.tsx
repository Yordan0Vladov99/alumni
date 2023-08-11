import ErrorSymbol from "../../../ErrorSymbol/ErrorSymbol";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(1, { message: "First Name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last Name cannot be empty" }),
  emailAddress: z
    .string({ required_error: "Email Address cannot be empty" })
    .email({ message: "Looks like this is not an email" }),
  password: z
    .string({ required_error: "Password cannot be empty" })
    .refine(
      (value) =>
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(
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
      name: `${data.firstName} ${data.lastName}`,
      type: "USER",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("/api/users/register", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("email", data.emailAddress);
        localStorage.setItem("type", "ROLE_USER");
        localStorage.setItem("token", res["token"]);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const errorMsg = (error: FieldError) => (
    <p className="error-msg">{error?.message as string}</p>
  );
  return (
    <form className="UserForm" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`input-container ${
          errors.firstName?.message !== undefined ? "invalid" : ""
        }`}
      >
        <input placeholder="First Name" {...register("firstName")} />
        <ErrorSymbol />
      </div>
      {errorMsg(errors.firstName as FieldError)}

      <div
        className={`input-container ${
          errors.lastName?.message ? "invalid" : ""
        }`}
      >
        <input placeholder="Last Name" {...register("lastName")} />
        <ErrorSymbol />
      </div>
      <p className="error-msg">{errors.lastName?.message as string}</p>

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

      <input type="submit" value="Register" />

      <p>
        Already have an account?
        <Link to="/login">
          <b> Sign in</b>
        </Link>
      </p>
    </form>
  );
}

export default UserForm;
