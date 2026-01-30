import Image from "next/image";

export interface LogoProps {
  className?: string;
}

export const Logo = (props: LogoProps) => {
  const { className, collapsed }: any = props;
  return (
    <div>
      {!collapsed ? (
        <Image height={80} width={80} src="/images/Logo.png" alt="Logo" className={className} />
      ) : (
        <Image height={80} width={80}
          src="/images/collapsed-logo.svg"
          alt="collapsed-logo.svg"
          className={`${className}`}
        />
      )}
    </div>
  );
};
