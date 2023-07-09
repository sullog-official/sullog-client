import classNames from 'classnames/bind';

import styles from './PageLayout.module.scss';

const cx = classNames.bind(styles);

type PageLayoutProps = {
  className?: string;
  children: React.ReactNode;
  hasTopNavigatorPadding?: boolean;
  hasBottomNavigatorPadding?: boolean;
  isModal?: boolean;
};

const PageLayout = ({
  className,
  children,
  hasTopNavigatorPadding,
  hasBottomNavigatorPadding,
  isModal,
}: PageLayoutProps) => {
  const ElementType: keyof JSX.IntrinsicElements = isModal ? 'div' : 'main';

  return (
    <ElementType
      className={cx(
        'main',
        {
          'main--is-modal': isModal,
          'has-top-navigator-padding': hasTopNavigatorPadding,
          'has-bottom-navigator-padding': hasBottomNavigatorPadding,
        },
        className
      )}
    >
      {children}
    </ElementType>
  );
};

export default PageLayout;
