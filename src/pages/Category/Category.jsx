import React from 'react'
import UserPath from '../../components/UserPath'
import './Category.scss';
import MainTitle from '../../components/MainTitle'
import { useParams, useSearchParams } from 'react-router-dom'
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice'
import AsideTitle from '../../components/AsideTitle';
import Rating from '../../components/Rating/Rating';

import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination'
import PriceSlider from '../../components/CategoryPage/PriceSlider';
import supabase from '../../config/supabaseClient';

const viewType = ['grid', 'list']

const Category = () => {
  const [view, setView] = React.useState(viewType[0]);
  const [sortPrice, setSortPrice] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [farms, setFarms] = React.useState([]);
  const [chosenFarms, setChosenFarms] = React.useState([]);
  const [chosenRating, setChosenRating] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const [sliderPrices, setSliderPrices] = React.useState([]);

  //исп. для получения или модификации query
  const [searchParams, setSearchParams] = useSearchParams();
  const farmInQuery = searchParams.get('farm');

  const wishListItems = useSelector(({ wishlist }) => wishlist.items);

  // const { categoryFromQuery } = useParams();
  // console.log('categoryFromQuery', categoryFromQuery)

  const params = useParams();
  const categoryPath = params.category;


  // const categoryName = getCategoryFromPath(category);
  const categoryName = useSelector(({ categories }) => categories.categories.find(
    category => category.path === categoryPath
  )?.title
  );//упростить возможно


  //для корректной работы запросов
  const farmsByCategory = useSelector(({ farms }) => farms.farms)
    .filter(farm => farm.cat_title.find(cat_title =>
      cat_title === categoryName))
    .map(obj => obj.title);
  const rating = [1, 2, 3, 4, 5];


  console.log('farmsByCategory', farmsByCategory)



  const _itemsUrl = `http://localhost:8000/products?category=${categoryPath}`;

  const totalItemsAmount = React.useRef(0);
  const priceRange = React.useRef([]);

  React.useEffect(() => {
    setComponent();
  }, []);

  React.useEffect(() => {

    const fetchItems = async () => {

      let { data } = await supabase
        .from('products')
        .select()
        .in('farm', chosenFarms.length !== 0 ? chosenFarms : farmsByCategory)
        .in('rating', chosenRating.length !== 0 ? chosenRating : rating)
        .filter('price', 'gte', sliderPrices.length !== 0 ?
          sliderPrices[0] : 0)
        .filter('price', 'lte', sliderPrices.length !== 0 ?
          sliderPrices[1] : 10000)
        .order('price', { ascending: sortPrice === 'desc' ? false : sortPrice === 'asc' ? true : null })

      setItems(data);
    }

    fetchItems();
  }, [sortPrice, chosenFarms, chosenRating, currentPage, sliderPrices]);


  //если меняется categoryPath, значит польз. выбрал другую категорию -> новый контент
  React.useEffect(() => {
    setComponent();
  }, [categoryPath]);

  //если меняется farmInQuery, значит польз. выбрал другую ферму в header -> страница перерисовывается
  React.useEffect(() => {
    if (searchParams.get('farm') !== null) {
      setChosenFarms([searchParams.get('farm')]);
    }
    setComponent();

  }, [farmInQuery])

  //заполняет компонент контентом
  const setComponent = async () => {



    const { data } = await supabase
      .from('products')
      .select()
      .in('farm', chosenFarms.length !== 0 ? chosenFarms : farmsByCategory);
      
    setFarms(farmsByCategory);
    setItems(data);

    console.log('data', data)

    totalItemsAmount.current = data.length;
    priceRange.current[0] = Math.min.apply(null, data.map(obj => obj.price));
    priceRange.current[1] = Math.max.apply(null, data.map(obj => obj.price));

    // setChosenRating([]);
    // setSliderPrices([])
  }



  const onToggleFarm = (farm) => {
    if (chosenFarms.includes(farm)) {
      const newChosenFarms = chosenFarms;
      newChosenFarms.splice(newChosenFarms.indexOf(farm), 1);
      setChosenFarms([...newChosenFarms]);
    } else {
      setChosenFarms([...chosenFarms, farm]);
    }
  };
  const onToggleRating = (rating) => {
    if (chosenRating.includes(rating)) {
      const newChosenRating = chosenRating;
      newChosenRating.splice(newChosenRating.indexOf(rating), 1);
      setChosenRating([...newChosenRating]);
    } else {
      setChosenRating([...chosenRating, rating]);
    }

  }

  console.log('items', items)
  console.log('farms', farms)
  console.log('category', categoryPath)

  return (
    <div className={`category ${categoryName}`}>
      <div className="container">
        <UserPath path={[categoryName]} section='categories' />
        <div className='category__top top'>
          <div className="top__head">
            <MainTitle value={categoryName} />
            <div className="top__view">
              <button
                onClick={() => setView('grid')}
                className={`top__gridViewBtn ${view === 'grid' ? 'active' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Grid view</p>
              </button>
              <button
                onClick={() => setView('list')}
                className={`top__listViewBtn ${view === 'list' ? 'active' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>List view</p>
              </button>
              <div className="top__productsAmount">
                <span>{totalItemsAmount.current}</span>
                <p>Products</p>
              </div>
            </div>
          </div>
          <div className="top__filters filters">
            <div className="filters__price">
              <p className='filters__title'>Price</p>
              <div
                // ref={ascBtn} 
                onClick={() => setSortPrice('asc')}
                className={`filters__price-asc filters-priceBtn ${sortPrice === 'asc' ? 'active' : ''}`}>
                <span className='filters__checkbox'></span>
                <p>Ascending</p>
              </div>
              <div
                // ref={descBtn} 
                onClick={() => setSortPrice('desc')}
                className={`filters__price-asc filters-priceBtn ${sortPrice === 'desc' ? 'active' : ''}`}>
                <span className='filters__checkbox'></span>
                <p>Descending</p>
              </div>
            </div>

          </div>
        </div>

        <div className="category__main main">
          <div className="category__aside aside">
            <div className="aside__item">
              <AsideTitle value='Farms' />
              <ul className="aside__list farms">
                {farms.map(farm =>
                  <li
                    key={farm}
                    onClick={() => onToggleFarm(farm)}
                    className={chosenFarms.includes(farm) ? 'active' : ''}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                    </span>
                    <p>{farm}</p>
                  </li>)}

              </ul>
            </div>
            <div className="aside__item">
              <AsideTitle value='Rating' />
              <ul className="aside__list">
                <li onClick={() => onToggleRating(5)}
                  className={chosenRating.includes(5) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating5' rate='5' color='gold' /></li>
                <li onClick={() => onToggleRating(4)}
                  className={chosenRating.includes(4) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating4' rate='4' color='gold' /></li>
                <li onClick={() => onToggleRating(3)}
                  className={chosenRating.includes(3) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating3' rate='3' color='gold' /></li>
                <li onClick={() => onToggleRating(2)}
                  className={chosenRating.includes(2) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating2' rate='2' color='gold' /></li>
                <li onClick={() => onToggleRating(1)}
                  className={chosenRating.includes(1) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating1' rate='1' color='gold' /></li>
              </ul>
            </div>
            <div className="aside__item">
              <AsideTitle value='Price' />
              <PriceSlider
                minPrice={priceRange.current[0]}
                maxPrice={priceRange.current[1]}
                setSliderPrices={setSliderPrices} />
            </div>
          </div>
          <div className={`main__items ${view}`}>
            {
              items?.map(item => <ProductCard
                key={item.id}
                {...item}
                view={view}
                wishlisted={wishListItems.includes(item.id)}
              />)
            }
          </div>

        </div>
        <Pagination
          amount={Math.ceil(totalItemsAmount.current / 6)}
          setPage={setCurrentPage}
          currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Category