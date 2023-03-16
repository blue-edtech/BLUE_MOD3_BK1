import Logo from '~/svgs/logo.svg';
import Input from '../shared/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const router = useRouter();
  const { handleSubmit, register, errors } = useForm({
    mode: 'onSubmit',
  });

  const submitForm = async (body: any) => {
    const url = 'http://localhost:3001/auth/login';

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
    <div className="flex flex-col justify-center  container mt-5 text-white mx-auto">
      <Logo height="2.3rem" />
      <span className="font-bold text-2xl mt-6 pt-1 text-center">Entre no Twitter</span>
      <div className=" lg:w-5/12 lg:px-0 px-5 w-full mt-5 mx-auto">
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <div className="mb-5">
            <Input
              type="email"
              spellCheck="false"
              autoComplete="on"
              autoCorrect="off"
              name="email"
              placeholder="Email"
              className="w-full"
              error={!!errors?.email?.message}
              innerRef={register({ required: 'Essa campo é obrigatório' })}
            />
            {errors?.email?.message && (
              <span className="text-pinkish text-sm">{errors?.email?.message}</span>
            )}
          </div>
          <div className="mb-5">
            <Input
              type="password"
              spellCheck="false"
              autoComplete="on"
              autoCorrect="off"
              name="password"
              placeholder="Senha"
              className="w-full"
              error={!!errors?.password?.message}
              innerRef={register({ required: 'Essa campo é obrigatório' })}
            />
            {errors?.password?.message && (
              <span className="text-pinkish text-sm">{errors?.password?.message}</span>
            )}
          </div>
          <div className="-mx-1 mb-5">
            <button
              type="submit"
              className={`bg-primary focus:outline-none font-bold hover:bg-primary-hover text-white rounded-full w-full py-3`}>
              Entrar
            </button>
          </div>
          <div className="flex justify-center">
            <Link href="/login?signup=true" as="/signup">
              <a className="text-primary hover:underline ml-2">Cadastre-se</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
