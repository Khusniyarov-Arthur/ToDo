import { ReactNode } from 'react';
import style from './Container.module.scss';

type TProps = {
  children: ReactNode;
};

export const Container = ({ children }: TProps) => {
  return <div className={style.container}>{children}</div>;
};
