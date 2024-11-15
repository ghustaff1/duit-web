import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Cart from '../pages/Cart/Cart';
import Footer from '../components/Footer/Footer';
import AccountPopup from '../components/AccountPopup/AccountPopup';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';


const MainLayout = () => {

  //пока не разобрался с логином и регистрацией на сайте будет по дефолту 'login'
  const [userStatus, setUserStatus] = React.useState('');

  const layoutRef=React.useRef();
  
  userStatus==='authenticating'?
  disablePageScroll(layoutRef.current):
  enablePageScroll(layoutRef.current)




  return (
    <div ref={layoutRef}>
      <Header 
      userStatus={userStatus}
      setUserStatus={setUserStatus}/>
      <AccountPopup 
      userStatus={userStatus}
      setUserStatus={setUserStatus}/>
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;