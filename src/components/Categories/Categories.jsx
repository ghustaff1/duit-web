import React from 'react'
import './Categories.scss';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import { useSelector } from 'react-redux';

const Categories = () => {

  const { categories } = useSelector(({ categories }) => categories);
  console.log('2024 categories', categories)
  const farms = useSelector(({ farms }) => farms.farms);
  console.log('2024 farms', farms)

  return (
    <div className='categories'>
      <div className='container'>
        <ul className='categories-list'>
          {
            categories.map((category) => {
              const farmsByCategory = farms.filter(
                farm => farm.cat_title.find(
                cat_title => cat_title == category.title));
              return (
                <CategoriesItem
                  //key={category.title}
                  categoryTitle={category.title}
                  categoryPath={category.path}
                  farmsByCategory={farmsByCategory}
                />
              )
            }
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Categories;