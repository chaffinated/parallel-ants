import React from 'react';
import Flex from 'components/Flex';
import Text from 'components/Text';

interface ErrorProps {
  message: string;
  maxLength?: number;
}

const ErrorMessage = (props: ErrorProps) => {
  const {
    message,
    maxLength = Infinity,
  } = props;
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Text variant='p'>
        {message.slice(0, maxLength)}
      </Text>
    </Flex>
  );
};

ErrorMessage.defaultProps = {
  maxLength: 40,
};

export default ErrorMessage;
