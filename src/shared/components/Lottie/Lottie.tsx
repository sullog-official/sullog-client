import { useState } from 'react';
import ReactLottie from 'react-lottie';

type LottieProps = {
  animationData: any;
};

const Lottie = ({ animationData }: LottieProps) => {
  const [isStopped, setIsStopped] = useState(false);

  const onAnimationComplete = () => {
    setIsStopped(true);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      {isStopped ? null : (
        <ReactLottie
          options={defaultOptions}
          height={100}
          width={100}
          isStopped={false}
          isPaused={false}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => onAnimationComplete(),
            },
          ]}
        />
      )}
    </>
  );
};

export default Lottie;
