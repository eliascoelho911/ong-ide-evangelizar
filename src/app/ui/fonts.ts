import { Inter, Sora, Fredoka } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const sora = Sora({ subsets: ['latin'] });
export const fredoka = Fredoka({
    subsets: ['latin'],
    variable: '--font-fredoka'
});