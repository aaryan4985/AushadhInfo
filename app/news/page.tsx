import Header from '@/components/Header';
import Box from '@/components/Box';
import News from './components/News';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="h-full w-full rounded-lg">
      <Box>
        <Header children={undefined} />
      </Box>
      <Box className="bg-white h-[calc(100%-75px)]">
        <div>
            <News/>
        </div>
      </Box>
    </div>
  );
}
