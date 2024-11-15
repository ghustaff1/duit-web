import React from 'react';
import './Reviews.scss';
import HomeSectionTitle from '../../AsideTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination';
import supabase from '../../../config/supabaseClient';
import { errorSvg } from '../../../App';
import { loadingSvg } from '../../../App';


const Reviews = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);


  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select();

      if (data)
        setData(data);
      if (error)
        setError(true);
    }
    fetchData();

  }, []);


  return (
    error ? (
      <div>
        <p>Error loading reviews</p>
        {errorSvg}
      </div>
    ) :
      data === null ?
        loadingSvg :

        <div className="reviews">
          <div className="container">
            <HomeSectionTitle title='Our customers says' />
          </div>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            autoHeight={true}
            navigation
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
          >
            {data?.map(obj => {
              return (
                <SwiperSlide key={obj.name}>
                  <article>
                    <p className='review__text'>" {obj.text} "</p>
                    <h3 className='review__name'>{obj.name}</h3>
                    <div className='review__img'>
                      <img src={obj.imgUrl} alt={obj.alt} />
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {/* <Slider {...sliderSettings}>
          {data?.map(obj => {
              return (
                <div key={obj.name}>
                  <article>
                    <p className='review__text'>" {obj.text} "</p>
                    <h3 className='review__name'>{obj.name}</h3>
                    <div className='review__img'>
                      <img src={obj.imgUrl} alt={obj.alt} />
                    </div>
                  </article>
                </div>
              )
            })}
          </Slider> */}
        </div>
  )
}


export default Reviews;