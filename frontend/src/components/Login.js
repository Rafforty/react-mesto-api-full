import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(password, email);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Вход</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login__form-input"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__form-input"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
