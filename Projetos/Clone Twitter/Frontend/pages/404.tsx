import { NextPage } from 'next';

const PageNotFound: NextPage = () => {
  return (
    <div className="text-center text-white text-4xl h-64 flex items-center justify-center">
      404 | Página não encontrada.
    </div>
  );
};

export default PageNotFound;
