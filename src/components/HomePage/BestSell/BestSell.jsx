import React from 'react'
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';
import { useSelector } from 'react-redux';
// import { getCategoryFromPath } from '../../../redux/slices/categoriesSlice';
import supabase from '../../../config/supabaseClient';

const BestSell = () => {

  const [fetchError, setFetchError] = React.useState(null)
  const [data, setData] = React.useState(null);

  const categories = useSelector(({ categories }) => categories.categories.map(
    category => category.title));

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .order('sells', {ascending:false})
        .range(0,2)

      if (error) {
        setFetchError('Could not fetch data');
        setData(null);
        console.log(error);
      }
      if (data) {
        setData(data);
        setFetchError(null);
      }


    }


    fetchData();

  }, [])


  return (
    <HomeSaleSection
      title="Best selling products"
      data={data}
      links={categories}
      className='bestSell' />
  )
}

export default BestSell;