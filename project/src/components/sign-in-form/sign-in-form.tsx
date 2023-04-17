import { FormEvent, useRef, useState } from 'react';
import { SignInError, ValidationPattern } from '../../utils/constants';
import { login } from '../../store/user-data/api-actions';
import { AuthData } from '../../types/user-auth-data';
import { useAppDispatch } from '../../hooks';

function SignInForm(): JSX.Element {
  const [invalidFields, setInvalidFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => dispatch(login(authData));

  const checkValidity = (field: HTMLInputElement, pattern: RegExp) => field.value.match(pattern);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const isEmailValid = checkValidity(emailRef.current, ValidationPattern.Email);
      const isPasswordValid = checkValidity(passwordRef.current, ValidationPattern.Password);

      if (isEmailValid && isPasswordValid) {
        onSubmit({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        setInvalidFields(false);
        setErrorMessage('');
      } else {
        setInvalidFields(true);
        const error = !isEmailValid ? SignInError.InvalidEmail : SignInError.InvalidPassword;
        setErrorMessage(error);
      }
    }
  };

  return (
    <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
      {invalidFields &&
        <div className='sign-in__message'>
          <p>{errorMessage}</p>
        </div>}
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={emailRef} data-testid='email-input'/>
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} data-testid='password-input'/>
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default SignInForm;
