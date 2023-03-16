import { ITweet } from '~/components/shared/tweet';

export const tweets: ITweet[] = [
  {
    id: String(Math.random() * 100000),
    message: 'Oie, vou criar um clone do Twitter, vamos?',
    username: 'isabellanunes',
    name: 'Isabella',
    avatar: 'images/personal.jpg',
    date: new Date('2020-7-8'),
    likes: 511,
    replies: 78,
    retweets: 32,
  },
  {
    id: String(Math.random() * 100000),
    message: ` Nossos alunos vão criar páginas incriveis com o <a href="https://nextjs.org/" target="_blank" class='mention'>@nextjs</a> &
    <a href="https://tailwindcss.com/" target="_blank" class='mention'>@tailwind</a>
     além já escrever tudo com TypeScript! Eles são demais! <a class='hashtag'>#nextjs_and_tailwind_rocks</a>`,
    username: 'blueedtech',
    name: 'Blue EdTech',
    avatar: 'images/blue.png',
    date: new Date('2020-7-8'),
    likes: 554,
    replies: 112,
    retweets: 60,
    assets: [
      { type: 'image', url: 'images/nextjs.png' },
      { type: 'image', url: 'images/nextjs.png' },
    ],
  },
  {
    id: String(Math.random() * 100000),
    message: `Sim, somos demais! É verdade o bilhete!`,
    username: 'tailwindcss',
    name: 'Tailwind CSS',
    avatar: 'images/tailwind.png',
    date: new Date('2020-7-8'),
    likes: 210,
    replies: 78,
    retweets: 32,
  },
  {
    id: String(Math.random() * 100000),
    message: `Novas atualizações em breve, garantimos que vem novidade!`,
    username: 'vercel',
    name: 'Vercel',
    avatar: 'images/vercel.jpg',
    date: new Date('2020-7-8'),
    likes: 199,
    replies: 45,
    retweets: 22,
  },
  {
    id: String(Math.random() * 100000),
    message:
      'Desenvolver é fácil, só é difíicl no começo, mas é uma questão até que seja automático. Paciência!',
    username: 'isabellanunes',
    name: 'Isabella',
    avatar: 'images/personal.jpg',
    date: new Date('2020-7-8'),
    likes: 511,
    replies: 78,
    retweets: 32,
  },
];
