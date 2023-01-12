import { Puff } from 'react-loader-spinner';

export const Loader = () => (
  <Puff
    height="80"
    width="80"
    radius={1}
    color="#3f51b5"
    ariaLabel="puff-loading"
    wrapperStyle={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
    }}
    visible={true}
  />
);
