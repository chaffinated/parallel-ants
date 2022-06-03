import React, { useEffect } from 'react';
import { generateAntWinLikelihoodCalculator } from 'services/Ants';
import { callbackToPromise } from 'utils/callbackToPromise';
import { NetworkRequestStatus } from 'types/network';
import { useAsyncHandler } from 'utils/useAsync';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Box from 'components/Box';
import type { Ant } from 'types/Ants';


interface AntProps {
  ant: Ant;
  handleOddsChange: (val: number) => void;
  shouldRunOdds: boolean;
  place: number | null;
}

function AntItem(props: AntProps) {
  const { ant, handleOddsChange, shouldRunOdds, place } = props;
  const odds = useAsyncHandler<number>(callbackToPromise<number>(generateAntWinLikelihoodCalculator()));

  useEffect(() => {
    if (place != null || odds.status !== NetworkRequestStatus.SUCCESS) return;
    handleOddsChange(odds.data!);
    odds.reset?.();
  }, [place, odds, handleOddsChange]);
  
  useEffect(() => {
    if (!shouldRunOdds || odds.status !== NetworkRequestStatus.IDLE) return;
    odds.fetch!();
  }, [shouldRunOdds, odds])

  return (
    <Box
      borderRadius={[3, 4]}
      padding={[2, 3]}
      boxShadow={'2px 2px 4px 0 rgba(18, 25, 26, 0.1)'}
      backgroundColor='white'
    >
      <Flex
        position='relative'
        flexDirection={'row'}
        justifyContent='space-between'
      >
        <Container width={'12%'}>
          { odds.status === NetworkRequestStatus.FETCHING 
            ? <Spinner size={'1rem'} rows={3} columns={3} />
            : <Box width='4.8rem' borderRadius={'50%'} backgroundColor='black' padding={[1, 2]} marginRight={[1]}>
                <Flex width='100%' flexDirection={'row'} justifyContent='center' alignItems={'center'}>
                  <Text variant='p' color='white' margin={0} textAlign='center'>
                    { place ? `${Math.floor(odds.data! * 100)}%` : 'n/a' }
                  </Text>
                </Flex>
              </Box>
          }
        </Container>
        <Container marginLeft={[2, 3]} width={'36%'}>
          <Text variant='p' color='black' strong>{ ant.name }</Text>
        </Container>
        <Container width={'16%'}>
          <Text variant='p' color='black' strong>{ ant.color }</Text>
        </Container>
        <Container width={'16%'}>
          <Text variant='p' color='black' strong>{ ant.weight }</Text>
        </Container>
        <Container width={'16%'}>
          <Text variant='p' color='black' strong>{ ant.length }</Text>
        </Container>
      </Flex>
    </Box>
  )
}

export default AntItem;
