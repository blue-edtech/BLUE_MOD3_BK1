import Logo from '~/svgs/logo.svg';
import Input from '../shared/input';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useRouter } from 'next/router';

const SignupComponent: React.FC = () => {
  const router = useRouter();

  const [isPhone, setIsPhoneOrEmail] = useState(true);
  const { register, unregister, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });

  const nameLengthRef = useRef<HTMLSpanElement>(null);

  const updateNameLength = (e: any) => {
    if (nameLengthRef.current) {
      nameLengthRef.current.innerHTML = e.target.value.length + '/50';
    }
  };

  const togglePhoneOrEmail = () => {
    setValue('email', null);
    setValue('phone', null);
    if (isPhone) unregister('phone');
    else unregister('email');
    setIsPhoneOrEmail(prev => !prev);
  };

  const submitForm = async (body: any) => {
    const url = 'http://localhost:3001/users';

    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    });

    const result = await response.json();

    const jwt = result.token;

    if (jwt) {
      localStorage.setItem('jwt', jwt);

      router.push('/home');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="p-3 w-full">
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <div className="flex justify-between items-center">
          <div className="w-1/3"></div>
          <div className="w-1/3 flex justify-center">
            <Logo height="1.7rem" />
          </div>
          <div className="w-1/3 text-right">
            <button
              type="submit"
              className="focus:outline-none bg-primary hover:bg-primary-hover text-white font-bold rounded-full px-4 py-1">
              Próximo
            </button>
          </div>
        </div>
        <div className="mt-8 px-3">
          <span className="text-white text-2xl font-bold mb-5 block">Crie sua conta</span>

          <div className="mb-5">
            <Input
              onChange={updateNameLength}
              placeholder="Nome"
              name="name"
              innerRef={register({ required: 'Qual o seu nome?' })}
              error={!!errors?.name?.message}
            />
            <div className="flex mt-1 text-gray-600 px-2">
              <div className="block flex-grow">
                {errors?.name?.message && (
                  <span className="text-pinkish text-sm">{errors.name.message}</span>
                )}
              </div>
              <span ref={nameLengthRef}>0/50</span>
            </div>
          </div>

          <div className="mb-5">
            <Input
              type="text"
              maxLength={50}
              placeholder="Username"
              name="username"
              innerRef={register({ required: 'Digite o seu username' })}
              error={!!errors?.username?.message}
            />
          </div>

          <div className="mb-5">
            <Input
              type="text"
              maxLength={50}
              placeholder="Avatar"
              name="avatar"
              innerRef={register({ required: 'Coloque o link do seu avatar' })}
              error={!!errors?.avatar?.message}
            />
          </div>

          <div className="mb-5">
            <Input
              type="email"
              maxLength={50}
              placeholder="Email"
              name="email"
              innerRef={register({
                validate: value => validator.isEmail(value) || 'Digite um email válido',
              })}
              error={!!errors?.email?.message}
            />
            {errors?.email?.message && (
              <span className="text-pinkish text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-5">
            <Input
              type="password"
              maxLength={50}
              placeholder="Senha"
              name="password"
              innerRef={register({ required: 'Digite uma senha' })}
              error={!!errors?.password?.message}
            />
          </div>

        </div>
      </form>
    </div>
  );
};

export default SignupComponent;
