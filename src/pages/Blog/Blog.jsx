import React from 'react'
import './Blog.scss';
import { Link, useParams } from 'react-router-dom';
import AsideTitle from '../../components/AsideTitle';
import Tag from '../../components/Tag';
import UserPath from '../../components/UserPath';
import supabase from '../../config/supabaseClient';
import { errorSvg, loadingSvg } from '../../App';

const Blog = () => {
  const { id } = useParams();

  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select()
        .eq('id', id);
      if (data) {
        setData(data[0]);
        setLoading(false);
      }

      if (error)
        setError(true);
    }
    fetchData();
    window.scrollTo(0, 0);//доделать скролл к началу блока
  }, [])

  return (
    loading ?
      loadingSvg :
      error ?
        errorSvg :

        <div className="blog">
          <div className="container">
            <UserPath path={['blogs', data.title]} section='blogs' />
            <div className="blog-top">
              <div className="blog-top__bg">
                <img src={data.bgImg} alt="bgImg" />
              </div>
              <div className="blog-top__content">
                <dl className="blog-top__info">
                  <div>
                    <dt>Date:</dt>
                    <dd>{data.date}</dd>
                  </div>
                  <div>
                    <dt>Author:</dt>
                    <dd>{data.authorName}</dd>
                  </div>
                </dl>
                <h1 className="blog-top__title">
                  {data.title}
                </h1>
              </div>
            </div>
            <div className="blog-main main">
              <div className="main__aside aside">
                <div className="aside__item">
                  <AsideTitle value='Tags' />
                  <div className="aside__tags">
                    {data.tags.map(tag => <Tag value={tag} />)}
                  </div>
                </div>
                <Link to='/blogs' className='backToBlogBtn'>
                  <svg width="19" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4.5H10.6667C11.0203 4.5 11.3594 4.64048 11.6095 4.89052C11.8595 5.14057 12 5.47971 12 5.83333V14.5" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33246 6.5L3.4258 4.56C3.41287 4.54813 3.40254 4.53371 3.39548 4.51764C3.38841 4.50158 3.38477 4.48422 3.38477 4.46667C3.38477 4.44912 3.38841 4.43176 3.39548 4.41569C3.40254 4.39962 3.41287 4.3852 3.4258 4.37333L5.33246 2.5" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Back to Blog</p>
                </Link>
              </div>
              <div className="main__content">
                {
                  data.topics.map(({ topicTitle, topicText }) => (
                    <>
                      <h3 className="topic__title">
                        {topicTitle}
                      </h3>
                      <p className="topic__text">
                        {topicText}
                      </p>
                    </>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
  )
}

export default Blog