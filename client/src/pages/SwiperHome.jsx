import { Swiper, SwiperSlide } from "swiper/react";
import banGoldImg from "../images/postergold.jpg";
import bannerImg from "../images/bannergold.jpg";
import goldBanner2 from "../images/goldbanner2.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../Styles/SwiperHome.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SwiperHome() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* 1st  */}
        <SwiperSlide>
          <div className="swiperimg">
            <img src={banGoldImg} alt="advertisement" />
          </div>
        </SwiperSlide>

        {/* 2nd  */}
        <SwiperSlide>
          <div className="swiperimg">
            <img src={bannerImg} alt="advertisement" />
          </div>
        </SwiperSlide>

        {/* 3rd  */}
        <SwiperSlide>
          <div className="swiperimg">
            <img src={goldBanner2} alt="advertisement" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
