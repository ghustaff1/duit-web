import React from 'react'
import './Home.scss';
import BestSell from '../../components/HomePage/BestSell/BestSell';
import BestFarmers from '../../components/HomePage/BestFarmers/BestFarmers';
import Reviews from '../../components/HomePage/Reviews/Reviews';
import Cart from '../Cart/Cart';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { Link } from 'react-router-dom';

const Home = () => {

  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [])


  return (
    <div className="home">
      <BestSell />
      {/* <BestFarmers /> */}
      <Reviews />
    </div>
  )
}

export default Home;