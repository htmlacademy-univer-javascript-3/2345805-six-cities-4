import { useRef } from 'react';
import { changeCity, getIsSubmittingLogin, loginAction } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Routes, CityName } from '../../const';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks';

const REGEX_PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]+$/;
const PASSWORD_ERROR_MESSAGE =
  'The password must consist of at least one English letter and one symbol without spaces.';

const isPasswordValid = (password: string) => REGEX_PASSWORD.test(password);

const cities: CityName[] = [
  CityName.Paris,
  CityName.Cologne,
  CityName.Brussels,
  CityName.Amsterdam,
  CityName.Hamburg,
  CityName.Dusseldorf,
];

function getRandomElementFromArray<T>(arr: T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSubmittingLogin = useAppSelector(getIsSubmittingLogin);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const city = getRandomElementFromArray(cities);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const login = loginRef.current?.value;
    const password = passwordRef.current?.value;

    if (!login || !password) {
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error(PASSWORD_ERROR_MESSAGE);
      return;
    }

    dispatch(
      loginAction({
        login: login.trim(),
        password: password.trim(),
      })
    );
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={loginRef}
                disabled={isSubmittingLogin}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                ref={passwordRef}
                disabled={isSubmittingLogin}
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={isSubmittingLogin}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a
              className="locations__item-link"
              onClick={(evt) => {
                evt.preventDefault();
                navigate(Routes.Main);
                dispatch(changeCity(city));
              }}
            >
              <span>{city}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
