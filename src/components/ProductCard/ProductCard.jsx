import React from 'react'
import './ProductCard.scss';
import MainBtn from '../MainBtn';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { useDispatch } from 'react-redux';
import { addToWishList, removeFromWishlist } from '../../redux/slices/wishlistSlice';
const ProductCard = ({ title, descr, imgUrl, price, datedPrice, id, rating, freshness, farm, amount, view, wishlisted }) => {

  const sale = datedPrice ? Math.round((1 - price / datedPrice) * 100) : null;

  const dispatch = useDispatch();

  const onToggleWishlist = () => {
    wishlisted ?
      dispatch(removeFromWishlist(id)) :
      dispatch(addToWishList(id));
  }

  const addToCart=()=>{
    localStorage.setItem('cartData', );
  }


  return (

    <div className={`productCard ${view}`}>
      {view === 'grid' ?
        (<>
          <Link to={`/items/${id}`}>
            {sale && <div className="productCard__sale">- {sale} %</div>}
            <div className='productCard__img'>
              <img src={imgUrl[0]} alt={title} />
            </div>
            <div className='productCard__text'>
              <h2 className='productCard__title'>{title}</h2>
              <p className='productCard__descr'>
                {descr.split(" ").slice(0, 10).join(" ")}
                ...</p>
            </div>

          </Link>
          <Rating itemName={title} rate={rating} color='gold' />
          <div className="productCard__bottom">
            <div className="productCard__price">
              <b className='productCard__price-actual'>{price} USD</b>
              {sale > 0 ?
                <s className='productCard__price-dated'>{datedPrice}</s> :
                null}
            </div>
            <Link
              to='/cart'
              onClick={() => console.log('clicked')}
              className='link-cart'>
              <MainBtn
                size='small'
                type='2'
                text='Buy now'
              />
            </Link>
          </div>
        </>) :
        (
          <>
            <div className="productCard__img">
              <img src={imgUrl[0]} alt={title} />
            </div>
            <div className="productCard__content">
              <div className="productCard__info">
                <div className="productCard__title">{title}</div>
                <div className="productCard__descr">{descr}</div>
                <Rating itemName={title} rate={rating} color='gold' />
                <dl className="productCard__specs">
                  <div>
                    <dt>Freshness:</dt>
                    <dd>{freshness} days old</dd>
                  </div>
                  <div>
                    <dt>Farm:</dt>
                    <dd>{farm}</dd>
                  </div>
                  <div>
                    <dt>Amount:</dt>
                    <dd>{amount}</dd>
                  </div>
                </dl>
              </div>
              <div className="productCard__orderInfo">
                <div className="productCard__price">
                  <b className="productCard__price-actual">{price} USD</b>
                  <s className="productCard__price-dated">{datedPrice}</s>
                </div>
                <div className="productCard__shipping">
                  <b>Free Shipping</b>
                  <p>Delivery in 1 day</p>
                </div>
                <div className='productCard__buttons'>
                  <Link to={`/items/${id}`}>
                    <MainBtn size='medium' type='2' text='Product detail' dir='next' />
                  </Link>
                  <Link to='https://www.apple.com/'>
                    <MainBtn size='medium' type='2' text='Product detail' dir='next' />
                  </Link>
                  {/* может быть изменить кнопку снизу*/}
                  <button className='productCard__wishlist' onClick={onToggleWishlist}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_37475_131580)">
                        <path style={{ fill: wishlisted ? 'black' : 'none' }} fillRule="evenodd" clipRule="evenodd" d="M9.13062 3.26001C9.76714 2.62349 10.6304 2.2659 11.5306 2.2659C12.4308 2.2659 13.2941 2.62349 13.9306 3.26001C14.5671 3.89653 14.9247 4.75984 14.9247 5.66001C14.9247 6.56019 14.5671 7.42349 13.9306 8.06001L13.0573 8.93334L8.25729 13.7333L3.45729 8.93334L2.58396 8.06001C1.94744 7.42349 1.58984 6.56019 1.58984 5.66001C1.58984 4.75984 1.94744 3.89653 2.58396 3.26001C3.22048 2.62349 4.08378 2.2659 4.98396 2.2659C5.88413 2.2659 6.74744 2.62349 7.38396 3.26001L8.25729 4.13334L9.13062 3.26001Z" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                    <p>Add to wish list</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default ProductCard;