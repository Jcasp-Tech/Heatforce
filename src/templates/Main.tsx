import { HeartFilled } from '@ant-design/icons';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  pageName: string;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className={`main ${props.pageName}`}>
    <header>{props.meta}</header>

    <main>{props.children}</main>

    <footer>
      <div className="container">
        Made with <HeartFilled className="text-red" />{' '}
        <a target="_blank" href="https://jcasptechnologies.com/">
          JCasp Technologies
        </a>
      </div>
    </footer>
  </div>
);

export { Main };
