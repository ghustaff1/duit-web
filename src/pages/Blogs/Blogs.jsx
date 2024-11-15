import React from 'react'
import BlogCardBig from '../../components/BlogsPage/BlogCardBig/BlogCardBig';
import BlogCardSmall from '../../components/BlogsPage/BlogCardSmall/BlogCardSmall';
import './Blogs.scss';
import MainTitle from '../../components/MainTitle';
import UserPath from '../../components/UserPath';
import Pagination from '../../components/Pagination/Pagination';
import supabase from '../../config/supabaseClient';
import { errorSvg } from '../../App';

const Blogs = () => {

  const [error, setError] = React.useState(false);
  const [blogsBig, setBlogsBig] = React.useState();
  const [blogsSmall, setBlogsSmall] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(0);
  const pagesAmount = React.useRef(1);

  React.useEffect(() => {

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select();

      if (data) {
        pagesAmount.current = Math.ceil(data.filter(obj => obj.view === 'small').length / 8);
        setBlogsBig(data.filter(obj => obj.view === 'big'));
        setBlogsSmall(data.filter(obj => obj.view === 'small').slice(currentPage * 8, currentPage * 8 + 8));
      }
      if (error)
        setError(true);
    }

    fetchData();

  }, [])

  // React.useEffect(() => {
  //   axios.get('http://localhost:8000/blog')
  //     .then(res => {
  //       setBlogsSmall(res.data.filter(obj => obj.view = 'small').slice(currentPage * 8, currentPage * 8 + 8))
  //     })
  // }, [currentPage])

  console.log('pages', pagesAmount.current)

  if (!blogsBig) return 'loading';

  //сделать скелетон
  return (
    error ?
      errorSvg :
      <div className="blogs ">
        <div className='container'>
          <UserPath
            path={['Blogs']} />

          <MainTitle value={'BLogs'} />
          <div className='blogs__top'>
            {blogsBig.map(obj => <BlogCardBig key={obj.id} {...obj} />)}

          </div>
          <div className="blogs__main">
            {
              blogsSmall.map(obj =>
                <BlogCardSmall key={obj.id} {...obj} />
              )
            }
          </div>
          {<Pagination
            pagesAmount={pagesAmount.current}
            setPage={i => setCurrentPage(i)}
            currentPage={currentPage}
          />}
        </div>
      </div>
  )
}

export default Blogs