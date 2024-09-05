import Header from '@/components/Header';
import Box from '@/components/Box';
import General from './components/General';
import Conditions from './components/Conditions';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="h-full w-full rounded-lg">
      <Box>
        <Header children={undefined} />
      </Box>
      <Box className="bg-white h-[calc(100%-75px)]">
          <div className="flex h-full overflow-y-auto pt-3 flex-col gap-y-2">
            <div className='h-full'>
              <General />
            </div>
            <div className='h-full'>
              <Conditions />
            </div>
          </div>            
      </Box>
    </div>
  );
}
