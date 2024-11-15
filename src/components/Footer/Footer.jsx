import React from 'react'
import FooterLinks from './FooterLinks/FooterLinks';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <FooterLinks/>
        {/* tags  */}
        <p className='footer__rights'>Copyright © 2020 petrbilek.com</p>
      </div>
    </div>
  )
}

export default Footer