import React from 'react'
import './HomeSaleSection.scss';
import MainBtn from '../../MainBtn';
import GreenLink from '../../GreenLink';
import ProductCard from '../../ProductCard/ProductCard';
import AsideTitle from '../../AsideTitle';


const HomeSaleSection = ({ title, data, links, className }) => {

  
  return (
    <div className={`HomeSaleSection ${className}`}>
      <div className="container">
        <div className='HomeSaleSection__wrapper'>
          <aside className='HomeSaleSection__aside'>
            <AsideTitle value={title} />
            <ul>
              {links?.map(link => {
                return <li key={link}><GreenLink underline={true} value={link} /></li>;
              })}
            </ul>
            <MainBtn type='3' size='medium' text='More products' dir='next' />
          </aside>
          <div className='HomeSaleSection__cards'>
            {data?.map(obj => <ProductCard key={obj.id} {...obj} view='grid'/>)}
          </div>
        </div>
      </div>
    </div>
  )
};


export default HomeSaleSection;