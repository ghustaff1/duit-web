import React from 'react';
import './CartItem.scss';
import { useSelector } from 'react-redux';
import supabase from '../../config/supabaseClient';
import { loadingSvg } from '../../App';

const CartItem = ({ id }) => {

  // const [amount, setAmount] = React.useState(1); //будет в редаксе
  const [data, setData] = React.useState(null);


  React.useEffect(() => {


    const fetchData = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', id);

      setData(data[0]);

    }
    fetchData();

  }, [])


  // if (data === null) return `loading`;

  return (
    data === null ?
      loadingSvg :
      <div className="cart-item">
        <div className='cart-item__wrapper'>
          <h3 className="cart-item__title">{data.title}</h3>
          <div className='cart-item__img'>
            <img src={data.imgUrl[0]} alt="apples" />

          </div>
          <div className="cart-item__info">

            {/* <div className="cart-item__wishlist"> // не нужен?(есть в Product)
            <svg width="15" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.15559 1.44502C6.63297 0.967627 7.28045 0.699432 7.95559 0.699432C8.63072 0.699432 9.2782 0.967627 9.75559 1.44502C10.233 1.92241 10.5012 2.56988 10.5012 3.24502C10.5012 3.92015 10.233 4.56763 9.75559 5.04502L9.10059 5.70001L5.50059 9.30001L1.90058 5.70001L1.24558 5.04502C0.768195 4.56763 0.5 3.92015 0.5 3.24502C0.5 2.56988 0.768195 1.92241 1.24558 1.44502C1.72297 0.967627 2.37045 0.699432 3.04558 0.699432C3.72072 0.699432 4.36819 0.967627 4.84558 1.44502L5.50059 2.10002L6.15559 1.44502Z" stroke="#151515" strokeLinecap="round" strokeLinejoin="bevel" />
            </svg>
            <p>Wishlist</p>
          </div> */}
            <div className="cart-item__prices">
              <p className="cart-item__actualPrice">{data.price} USD</p>

              {data.datedPrice ?
                <s className="cart-item__datedPrice">
                  {data.datedPrice}
                </s> :
                null}

            </div>
          </div>

          <div className="cart-item__amount">
            <input type="text" placeholder={data.amount} />
            <p>{data.measure}</p>
          </div>
        </div>
        <div className="cart-item__remove">
          <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" fillRule="evenodd" /></svg>
        </div>
      </div>
  )
}

export default CartItem;
