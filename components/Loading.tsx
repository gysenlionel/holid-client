import Plane from "./SVG/Plane";
import Ray from "./SVG/Ray";
import Sun from "./SVG/Sun";
import ray from "../public/ray.svg";
import plane from "../public/plane.svg";
import round from "../public/round.svg";
import cloud from "../public/cloud.svg";
import Image from "next/image";

interface ILoadingProps {
  className?: string;
}

const Loading: React.FunctionComponent<ILoadingProps> = ({ className }) => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={`${className}`}>
      <div className="relative gap-32">
        <div className="flex items-center space-x-2">
          <div>
            <div className="">
              <Image priority src={plane} alt="ray" height={200} width={200} />
            </div>
            <div className="absolute top-4 left-32 z-30 animate-slide-right">
              <Image priority src={cloud} alt="cloud" height={60} width={60} />
            </div>
            <div className="absolute right-14 bottom-10 animate-slide-right">
              <Image priority src={cloud} alt="cloud" height={60} width={60} />
            </div>
          </div>
          <div className="relative mb-9">
            <div className="">
              <Image
                priority
                src={ray}
                alt="ray"
                height={60}
                width={60}
                className="animate-[spin_3.5s_linear_infinite]"
              />
            </div>
            <div className="absolute top-5 left-5">
              <Image priority src={round} alt="ray" height={20} width={20} />
            </div>
          </div>
        </div>
        <p className="text-center font-heading text-base">Loading</p>
      </div>
    </div>
  );
};

export default Loading;
