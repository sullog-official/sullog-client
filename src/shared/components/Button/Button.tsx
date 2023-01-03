import classNames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children = "" }: ButtonProps) => {
  return <button className={cx("button")}>{children}</button>;
};

export default Button;
