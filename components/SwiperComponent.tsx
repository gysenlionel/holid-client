import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Navigation } from "swiper";
import "swiper/css";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Photo } from "../types";

interface ISwiperComponentProps {
  images: Photo[];
}

const SwiperComponent: React.FunctionComponent<ISwiperComponentProps> = ({
  images,
}) => {
  return (
    <div className="relative mt-8">
      <ChevronLeftIcon className="swiper-button image-swiper-button-prev z-40 h-10 w-10 md:ml-4 lg:h-12 lg:w-12" />
      <ChevronRightIcon className="swiper-button image-swiper-button-next z-40 h-10 w-10 md:mr-4 lg:h-12 lg:w-12" />
      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {images.map((photo, index) => (
          <SwiperSlide className="!w-full" key={`photo-${index}`}>
            <Image
              src={photo.url}
              alt="hotel image"
              fill
              className="!relative !h-[350px] !w-full object-cover lg:!h-[500px]"
              placeholder="blur"
              blurDataURL={images[index].url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
