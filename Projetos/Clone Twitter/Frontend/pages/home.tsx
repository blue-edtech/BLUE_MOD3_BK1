import CenterContent from '~/components/shared/center-content';
import HomeCenterComponent from '~/components/home-page/home-center-component';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { INextPage } from '~/types/INextPage';
import { SyntheticEvent, useRef, useState } from 'react';

const NewsWidget = dynamic(() => import('~/components/shared/news-widget'), { ssr: false });
const WhoToFollowWidget = dynamic(() => import('~/components/shared/who-to-follow-widget'), {
  ssr: false,
});

const HomePage: INextPage = () => {
  const [onSearch, setOnSearch] = useState('');

  const search = (e: SyntheticEvent) => {
    setOnSearch((e.target as HTMLInputElement).value);
  };

  return (
    <div className="flex">
      <Head>
        <title>Início / Twitter Clone</title>
      </Head>
      <CenterContent>
        <HomeCenterComponent onSearch={onSearch} />
      </CenterContent>
      <div className="hidden lg:block px-6">
        <div className="sticky top-0 z-50 bg-dark">
          <input
            placeholder="Pesquise no Twitter"
            className="placeholder-gray-400 text-white w-full bg-dark-lighter mb-3 mt-3 border-transparent focus:outline-none py-2 border px-3 rounded-xl focus:border-primary"
            onChange={search}
          />
        </div>
        <div className="sticky top-0">
          <div className="mb-5">
            <NewsWidget />
          </div>
          <div>
            <WhoToFollowWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
