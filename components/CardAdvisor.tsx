import Image from "next/image";
import * as React from "react";
import { BsCircleFill, BsCircleHalf } from "react-icons/bs";

interface ICardAdvisorProps {}

const CardAdvisor: React.FunctionComponent<ICardAdvisorProps> = (props) => {
  const bullets = [];
  let number = 4.5;
  if (number % 1 !== 0) {
    number -= 0.5;

    for (let i = 0; i < number; i++) {
      bullets.push(
        <BsCircleFill
          className="mr-1 !h-4 !w-4 text-tripadv"
          key={`bullets-${i}`}
        />
      );
    }
    bullets.push(
      <BsCircleHalf className="mr-1 !h-4 !w-4 text-tripadv" key={`demi`} />
    );
  } else {
    for (let i = 0; i < number; i++) {
      bullets.push(
        <BsCircleFill
          className="mr-1 !h-4 !w-4 text-tripadv"
          key={`bullets-${i}`}
        />
      );
    }
  }
  return (
    <div
      className="w-[calc(10rem + 15vw)] relative flex h-[36rem] flex-col rounded-lg bg-grayCard 
    font-heading"
    >
      <div className="mt-10 flex w-full justify-center">{bullets}</div>
      <div className="mx-6">
        <h3 className="mt-10 text-center text-lg font-medium">
          Excellet location and people
        </h3>
        <div className="mt-4 text-justify text-base font-extralight line-clamp-5">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
            dicta excepturi consectetur explicabo consequatur quo eaque quisquam
            odit dolorum! Consequatur harum praesentium aspernatur ipsa maiores
            vitae illum suscipit dolorum voluptate?
          </p>
        </div>
        <div className="text-center">
          <p className="mt-4 inline-block cursor-pointer text-center text-base font-normal underline">
            read more
          </p>
        </div>
        <span className="my-4 mx-6 flex border border-b border-dotted border-white/60" />
        <div className="flex flex-col items-center">
          <Image
            src="/assets/profil/LaurentDelacouette.webp"
            alt="profil tripAdvisor"
            width={800}
            height={800}
            className="h-28 w-28 rounded-full object-cover"
          />
          <p className="mt-4 text-base">Laurent Delacouette</p>
          <p className="mt-1 text-sm font-thin">18/03/2022</p>
        </div>
      </div>
    </div>
  );
};

export default CardAdvisor;
