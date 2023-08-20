import { useState } from 'react';
import ReactLottie from 'react-lottie';

type LottieProps = {
  animationData: any;
  onCompleted?: () => void;
  className?: string;
};

const Lottie = ({ className, animationData, onCompleted }: LottieProps) => {
  const [isStopped, setIsStopped] = useState(false);

  const onAnimationComplete = () => {
    setIsStopped(true);
    onCompleted && onCompleted();
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
    <div className={className}>
      {/*{isStopped ? null : (*/}
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
      {/*)}*/}
    </div>
  );
};

export default Lottie;
