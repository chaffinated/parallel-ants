import React from 'react';
import Layout from 'components/Layout';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Box from 'components/Box';
import Link from 'components/Link';

interface NotFoundProps {

}

function NotFound(props: NotFoundProps) {
  return (
    <Layout className='not-found' preserveColors>
      <Flex minHeight='72vh' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box>
          <Flex flexDirection={'column'} justifyContent={'center'} alignItems='center'>
            <Text variant='h1'>Are You Lost?</Text>
            <Text variant='p'>
              Find your way home by clicking <Link href='/'>here</Link>.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}

export default NotFound;
