import classNames from 'classnames/bind';

import styles from './PageLayout.module.scss';

const cx = classNames.bind(styles);

type PageLayoutProps = {
  className?: string;
  children: React.ReactNode;
  hasTopNavigatorPadding?: boolean;
  hasBottomNavigatorPadding?: boolean;
};

const PageLayout = ({
  className,
  children,
  hasTopNavigatorPadding,
  hasBottomNavigatorPadding,
}: PageLayoutProps) => {
  return (
    <main
      className={cx(
        'main',
        {
          'has-top-navigator-padding': hasTopNavigatorPadding,
          'has-bottom-navigator-padding': hasBottomNavigatorPadding,
        },
        className
      )}
    >
      {children}
    </main>
  );
};

export default PageLayout;
