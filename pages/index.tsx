import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'
import List, { ListItem } from 'components/List';
import Container from 'components/Container';
import { Dialog } from 'components/Dialog';
import AntItem from 'components/AntItem';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Flex from 'components/Flex';
import Text from 'components/Text';
import Box from 'components/Box';
import SEO from 'components/SEO';
import { NetworkRequestStatus } from 'types/network';
import { useAsyncHandler } from 'utils/useAsync';
import { wait } from 'utils/wait';
import type { AntData } from 'types/Ants';


interface LandingProps {
  
}

function Landing(props: LandingProps) {
  const antData = useAsyncHandler<AntData>(fetchAnts);
  const isAntDataLoading = antData.status === NetworkRequestStatus.FETCHING;
  const [antOdds, setAntOdds] = useState<number[]>([]);
  const [shouldRunOdds, setShouldRunOdds] = useState(false);
  const [shouldShowResetDialog, setShouldShowResetDialog] = useState(false);
  const areOddsComplete = antOdds.length === antData.data?.ants.length && antData.data?.ants.every((ant, i) => antOdds[i] != null);

  const ants = antData.data?.ants.concat() || [];
  ants.sort((a, b) => {
    const aOdds = antOdds[a.key] || 0;
    const bOdds = antOdds[b.key] || -1;
    return bOdds - aOdds;
  });

  const makeOddsChangeHandler = (i: number) => (val: number) => {
    const odds = antOdds.concat();
    odds[i] = val;
    setAntOdds(odds);
  };

  const runOdds = () => setShouldRunOdds(() => true);
  const openResetDialog = () => setShouldShowResetDialog(true);
  const closeResetDialog = () => setShouldShowResetDialog(false);
  const reset = () => {
    setAntOdds([]);
    closeResetDialog();
  };

  useEffect(() => {
    if (!areOddsComplete) return;
    setShouldRunOdds(() => false);
  }, [areOddsComplete]);

  return (
    <Layout>
      <SEO
        title={'Ant Racing'}
        description={'See how fast ants go'}
      />
      <Flex
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        minHeight={'90vh'}
        position='relative'
      >
        <Container variant='main' margin={'0 auto'}>
          <Text variant='h1' textAlign={'center'}>
            Let&apos;s see some ants race!
          </Text>

          <Flex flexDirection={['column-reverse', 'row']} alignItems='flex-start'>
            <Box
              position={'sticky'}
              top={['initial', 0]}
              bottom={[0, 'initial']}
              width={['100%', '40%']}
              padding={[2, 3]}
              backgroundColor={['white', 'transparent']}
              borderRadius={3}
              zIndex={20}
            >
              <Flex flexDirection={['row', 'column']} spacingX={0} spacingY={0}>
                { antData.data == null
                  ? <Button
                      onClick={antData.fetch}
                      loading={isAntDataLoading}
                      disabled={isAntDataLoading || shouldRunOdds}
                      width={'100%'}
                    >
                      Get some ant data!
                    </Button>
                  : null
                }
                
                { antData.data != null
                  ? <>
                      <Button
                        onClick={runOdds}
                        loading={shouldRunOdds}
                        disabled={antData.data == null || shouldRunOdds || areOddsComplete}
                        width={'100%'}
                        marginBottom={[0, 2]}
                        marginRight={[2, 0]}
                        variant='tertiary'
                      >
                        Run the odds!
                      </Button>
                      
                      <Button
                        onClick={openResetDialog}
                        disabled={!areOddsComplete}
                        width={'100%'}
                        margin={0}
                        variant='alert'
                      >
                        Reset
                      </Button>
                    </>
                  : null 
                }
              </Flex>
            </Box>

            <Container paddingY={[2, 3]}>
              <Box
                borderRadius={[3, 4]}
                padding={[2, 3]}
                boxShadow={'2px 2px 4px 0 rgba(18, 25, 26, 0.1)'}
                backgroundColor='white'
              >
                <Flex flexDirection={'row'} spacingX={0}>
                  <Container width={'12%'}>
                    <Text variant='p' color='black' margin={0} strong>Rank (%)</Text>
                  </Container>
                  <Container marginLeft={[2, 3]} width={'36%'}>
                    <Text variant='p' color='black' margin={0} strong>Name</Text>
                  </Container>
                  <Container width={'16%'}>
                    <Text variant='p' color='black' margin={0} strong>Color</Text>
                  </Container>
                  <Container width={'16%'}>
                    <Text variant='p' color='black' margin={0} strong>Weight</Text>
                  </Container>
                  <Container width={'16%'}>
                    <Text variant='p' color='black' margin={0} strong>Length</Text>
                  </Container>
                </Flex>
              </Box>

              <Flipper flipKey={antOdds.join('')} spring={'veryGentle'}>
                <List paddingLeft={0} listStyleType='none'>
                  { ants.map((ant, i) => {
                    return (
                      <Flipped key={ant.key} flipId={ant.key}>
                        <div>
                          <ListItem marginBottom={[2, 3]}>
                            <AntItem
                              ant={ant}
                              shouldRunOdds={shouldRunOdds && antOdds[ant.key] == null}
                              handleOddsChange={makeOddsChangeHandler(ant.key)}
                              place={antOdds[ant.key] != null ? i + 1 : null}
                            />
                          </ListItem>
                        </div>
                      </Flipped>
                    )
                  }) }
                </List>
              </Flipper>
            </Container>
          </Flex>
        </Container>
      </Flex>

      <Dialog show={shouldShowResetDialog} onClose={closeResetDialog} dismissOnClickBackground>
        <Text variant='h2'>
          Warning!
        </Text>
        <Text variant='p'>
          Are you sure you want to reset the rankings?
        </Text>
        <Flex flexDirection='row' justifyContent='flex-end' width='100%' spacingX={[1]}>
          <Button variant='alertInverted' onClick={closeResetDialog}>
            Cancel
          </Button>
          <Button variant='alert' onClick={reset}>
            Reset
          </Button>
        </Flex>
      </Dialog>
    </Layout>
  );
}

export default Landing;


async function fetchAnts(): Promise<AntData> {
  await wait(1200);
  const res = await fetch('/data/ants.json');
  const data: AntData = await res.json();
  const ants = data.ants.map((ant, i) => ({ ...ant, key: i }));
  data.ants = ants;
  return data;
}
