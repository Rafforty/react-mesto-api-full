import header__logo from "../images/header__logo.svg";
import { Link, Switch, Route} from "react-router-dom";

function Header(props) {
  
  return (
    <header className="header">
      <img className="header__logo" src={header__logo} alt="Логотип" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link className="header__nav" onClick={props.onLogout} to="/signin">
              Выход
            </Link>
          </div>
        </Route>
        <Route path="/signup">
          <Link className="header__nav" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__nav" to="/signup">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
