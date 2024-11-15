import React from 'react';
import './FooterLinks.scss';
import { Link } from 'react-router-dom';
import GreenLink from '../../GreenLink';
import AsideTitle from '../../AsideTitle';
import supabase from '../../../config/supabaseClient';
import { loadingSvg } from '../../../App';
import { errorSvg } from '../../../App';

const FooterLinks = () => {

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('footerLinks')
        .select();

      if (data)
        setData(data);
      if (error)
        setError(true);
    }
    fetchData();
  }, []);


  return (
    error ? (
      <div>
        <p>Error loading footer</p>
        {errorSvg}
      </div>
    ) :
      data === null ?
        loadingSvg :
        <div className="footer-links__refs refs">
          {
            data.map(obj =>
              <div key={obj.id} className="refs__item">
                <AsideTitle value={obj.title} />
                <ul className="refs__list">
                  {obj.links.map(item =>
                    <li key={item.text} className='refs__link'>
                      <Link to={item.path}>
                        <GreenLink path={item.path} value={item.text} />
                      </Link>
                    </li>)}
                </ul>
              </div>
            )
          }
        </div>

  )
}

export default FooterLinks