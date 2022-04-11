import { FireIcon } from "@heroicons/react/solid";

type LogoProps = {
  logoClassName?: string,
  nameClassName?: string,
  onClick?: CallableFunction,
};

const Logo = ({ logoClassName, nameClassName, onClick }: LogoProps) => {
  const hasOnClick = onClick !== undefined;
  return (
    <div
      className={`flex items-center ${hasOnClick ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => {
        if (!hasOnClick) return;
        onClick();
      }}>
      <FireIcon className={`fill-blue-700 ${logoClassName ?? "w-8 h-8"}`} />
      <h1 className={`${nameClassName ?? "text-3xl"}`}>Ignite</h1>
    </div >
  );
}

export default Logo;