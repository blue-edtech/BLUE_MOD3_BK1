import dynamic from 'next/dynamic';
import ReactList from 'react-list';
import React, { useEffect, useState } from 'react';
import { ITweet } from '../shared/tweet';

const TweetComponent = dynamic(() => import('../shared/tweet'), { ssr: false });
const TweetBox = dynamic(() => import('./tweet-box'), { ssr: false });

const HomeCenterComponent: React.FC<{ onSearch: string }> = ({ onSearch }) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldUpdateTweets, setShouldUpdateTweets] = useState(0);

  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    const searchTweets = async () => {
      if (!onSearch) {
        setShouldUpdateTweets(shouldUpdateTweets + 1);

        return;
      }

      setIsLoading(true);

      const jwt = localStorage.getItem('jwt');

      const response = await fetch('http://localhost:3001/tweets/search?message=' + onSearch, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setTweets(data.tweets);
      } else {
        alert(data.message);
      }

      setIsLoading(false);
    };

    searchTweets();
  }, [onSearch]);

  useEffect(() => {
    const getTweets = async () => {
      const jwt = localStorage.getItem('jwt');

      const response = await fetch('http://localhost:3001/tweets', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();

      console.log(data);

      setTweets(data.results);
      setNextUrl(data.nextUrl);

      setIsLoading(false);
    };

    getTweets();
  }, [shouldUpdateTweets]);

  const viewMore = async () => {
    const jwt = localStorage.getItem('jwt');

    const response = await fetch(`http://localhost:3001${nextUrl}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();

    setTweets([...tweets, ...data.results]);
    setNextUrl(data.nextUrl);
  };

  if (isLoading) {
    return (
      <div>
        <div className="p-3 border-b border-white border-opacity-15 sticky top-0 bg-dark z-50">
          <span className="text-white text-xl font-extrabold">Início</span>
        </div>
        <div className="p-3 text-white text-xl font-extrabold">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-3 border-b border-white border-opacity-15 sticky top-0 bg-dark z-50">
        <span className="text-white text-xl font-extrabold">Início</span>
      </div>
      <TweetBox onTweet={() => setShouldUpdateTweets(shouldUpdateTweets + 1)} />
      <div>
        <ReactList
          type="variable"
          axis="y"
          length={tweets.length}
          itemRenderer={(idx, key) => <TweetComponent key={tweets[idx]['id']} {...tweets[idx]} />}
        />
      </div>
      {nextUrl ? (
        <div className="pagination">
          <button onClick={viewMore}>Ver mais</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

HomeCenterComponent.displayName = 'HomeCenterComponent';

export default HomeCenterComponent;
