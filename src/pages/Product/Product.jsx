import React from 'react';

import { Link, useParams } from 'react-router-dom';
import './Product.scss';
import MainTitle from '../../components/MainTitle';
import AddToWishList from '../../components/ProductPage/AddToWishList/AddToWishList';
import BottomProductInfo from '../../components/ProductPage/BottomProductInfo/BottomProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { addToWishList, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import UserPath from '../../components/UserPath';
import Rating from '../../components/Rating/Rating';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { A11y, Pagination } from 'swiper';
// import { useSwiper } from 'swiper/react';
// import 'swiper/scss'; // core Swiper
// import 'swiper/scss/pagination';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import supabase from '../../config/supabaseClient';
import { loadingSvg } from '../../App';



const sliderSettings = {
  className:'slider',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const Product = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [amount, setAmount] = React.useState(1);

  const { id } = useParams();

  const carted = useSelector(({ cart }) => cart.items.find(obj => obj.id === id));

  const wishlisted = useSelector(({ wishlist }) => wishlist.items.includes(id));

  React.useEffect(() => {
    const fetchData = async () => {

      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', id);

      if (data) {
        setData(data[0]);
        setLoading(false);
      }
      if (error) {
        setLoading(false);
        setFailed(true);
      }

    }

    fetchData();
  }, []);

  const onChangeAmount = (e) => {
    //сделать проверку на число
    //сделать alert если ввели больше, чем имеется
    if (+e.currentTarget.value > data.amount)
      setAmount(data.amount);
    else
      setAmount(e.currentTarget.value);
  }
  const onToggleCart = () => {
    carted ?
      dispatch(removeFromCart({
        id,
      })) :
      dispatch(addToCart({
        id,
        amount,
        price:data.price
      }))

  }
  const onToggleWishlist = () => {
    wishlisted ?
      dispatch(removeFromWishlist(id)) :
      dispatch(addToWishList(id));
  }

  console.log('data', data)





  return (
    loading === true ? loadingSvg :
      <div className="product">
        <div className="container">
          <UserPath path={[data.category, data.title]} section='categories' />
          <div className='product__wrapper'>
            <Slider {...sliderSettings}>
            {data.imgUrl.map(url =>
              <div key={url}>
                <img src={process.env.PUBLIC_URL + url} alt={data.title} />
              </div>
            )}
            </Slider>
            <div className="product__content">
              <MainTitle value={data.title} />
              {/* rating */}
              <Rating itemName={data.title} rate={data.rating} color='gold' />
              <p className="product__descr">{data.descr}</p>
              <dl className="product__info">
                <div>
                  <dt>SKU:</dt>
                  <dd>{data.id}</dd>
                </div>
                <div>
                  <dt>Category:</dt>
                  <dd>{data.category}</dd>
                </div>
                <div>
                  <dt>Stock:</dt>
                  <dd>{data.amount ? 'In Stock' : 'Unavailable'}</dd>
                </div>
                <div>
                  <dt>Farm:</dt>
                  <dd>{data.farm}</dd>
                </div>
                <div>
                  <dt>Freshness:</dt>
                  <dd>{data.freshness} days old</dd>
                </div>
                <div>
                  <dt>Amount:</dt>
                  <dd>{data.amount}</dd>
                </div>
              </dl>
              <div className="product__order">
                <div className="product__price">
                  <p className="product__actualPrice">{(data.price * amount).toFixed(2)} USD</p>
                  {data.datedPrice ?
                    <s className="product__datedPrice">{data.datedPrice} USD</s> :
                    null}
                </div>
                <div className="product__order-btns">
                  {/* такой же компонент в CartItem */}
                  <div className="product__order-amount">
                    <input value={amount} type="text" placeholder={amount}
                      onChange={e => onChangeAmount(e)} />
                    <p className='product__order-measure'>{data.measure}</p>
                  </div>
                  <button className='product__order-cart'
                    onClick={onToggleCart}>
                    {carted ?
                      (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      </svg>) :
                      (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                        <path d="M6.82812 12.3334V1.66676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      </svg>)}
                    <p>{carted ? "Remove from cart" : "Add to cart"}</p>
                    {/* <p>{addedToCart.current ? "Remove from cart" : null}</p> */}
                  </button>
                </div>
              </div>
              <div className="product__wishlist" onClick={onToggleWishlist}>
                <svg style={{ fill: wishlisted ? '#E6704B' : 'none' }} width="20" height="17" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.62281 2.76001C9.25933 2.12349 10.1226 1.7659 11.0228 1.7659C11.923 1.7659 12.7863 2.12349 13.4228 2.76001C14.0593 3.39653 14.4169 4.25984 14.4169 5.16001C14.4169 6.06019 14.0593 6.92349 13.4228 7.56001L12.5495 8.43334L7.74948 13.2333L2.94948 8.43334L2.07614 7.56001C1.43962 6.92349 1.08203 6.06019 1.08203 5.16001C1.08203 4.25984 1.43962 3.39653 2.07614 2.76001C2.71266 2.12349 3.57597 1.7659 4.47614 1.7659C5.37632 1.7659 6.23962 2.12349 6.87614 2.76001L7.74948 3.63334L8.62281 2.76001Z" stroke="#E6704B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Add to my wish list</p>
              </div>
              {/* <AddToWishList /> */}
              <BottomProductInfo farmTitle={data.farm}
                recipe={data.recipe}
                reviews={data.reviews}
                id={id} />
            </div>
          </div>
        </div>
      </div>

  )
  return loadingSvg;
}

export default Product;