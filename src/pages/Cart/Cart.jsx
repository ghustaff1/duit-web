import React from 'react';
import './Cart.scss';
import CartItem from '../../components/CartItem/CartItem';
import MainBtn from '../../components/MainBtn';
import { useSelector } from 'react-redux';
import UserPath from '../../components/UserPath';

const Cart = () => {

  const items = useSelector(({ cart }) => cart.items);
  console.log('cartRedux', items)

  const totalPrice = items.reduce((acc, cur) => acc + (cur.price * cur.amount), 0);

  console.log('totalPrice', totalPrice)


  return (
    // <div className="cart">
    //   <div className="cart__top">
    //     <h2 className="cart__title">Shopping cart</h2>
    //     <svg onClick={closeCart} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M14.3606 14.36L1.64062 1.63995" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
    //       <path d="M14.3606 1.63995L1.64062 14.36" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
    //     </svg>
    //   </div>
    //   <div className='cart__items'>
    //     {items.map(obj=><CartItem key={obj.id} data={obj}/>)}
    //   </div>
    //   <div className="cart__bottom">
    //     <div className="cart__total">
    //       <h4 className='cart__total-title'>Total</h4>
    //       <p className="cart__total-totalPrice">{totalPrice} USD</p>
    //     </div>
    //     <div className="cart__order">
    //       <p className="cart__continue">Continue shopping</p>
    //       <MainBtn
    //         size='medium'
    //         type='2'
    //         text='Go to Checkout'
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="cart">
      <div className="container">
        <UserPath path={['Cart']} />
        <div className="cart__top">
          <h2 className="cart__title">Shopping cart</h2>
          <div className="cart__clear">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <p>Clear cart</p>
          </div>
        </div>
        <div className="cart__items">
          {items.map(obj => <CartItem key={obj.id} id={obj.id} />)}

        </div>
        <div className="cart__bottom">
          <div className="cart__details">
            <span >
              <p>Amount:</p>
              <p className="cart__amount">{items.length} pcs.</p>
            </span>
            <span>
              <p>Total:</p>
              <p className='cart__totalPrice'>{totalPrice} USD</p>
            </span>
          </div>
          <div className="cart__nav">
            <MainBtn className="cart__goBackBtn"
              size='medium'
              type='3'
              text='Continue shopping'
              dir='prev' />
            <MainBtn className="cart__paymentBtn"
              size='medium'
              type='2'
              text='Go to checkout'
              dir='next' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart