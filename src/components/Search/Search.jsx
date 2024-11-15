import React from 'react'
import './Search.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice';

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const categories = useSelector(({ categories }) => categories.categories);

  return (
    <div className="searchBlock">
      <div className="searchBlock-categories"
        onClick={() => setOpen(!open)}>
        All categories
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.81348 1.53336L4.55348 4.27336C4.67838 4.39752 4.84735 4.46722 5.02348 4.46722C5.1996 4.46722 5.36857 4.39752 5.49348 4.27336L8.16014 1.60669" stroke="#6A983C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>

      </div>
      {
        open && (
          <div className="searchBlock-popup">
            <ul>
              {
                categories.map((category, i) => {
                  const link = '/' + category.path;
                  return (
                    <li key={i} onClick={() => setOpen(false)}>
                      <Link to={link}>{category.title}</Link>
                    </li>
                  )
                }
                )
              }
            </ul>
          </div>
        )
      }
      <input type="text" className='searchBlock-input' placeholder='Search Products, categories ...' />
      <button>
        <svg className='searchBlock-searchSvg' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.19303 10.4333C10.7704 10.4333 12.8597 8.34394 12.8597 5.76661C12.8597 3.18928 10.7704 1.09995 8.19303 1.09995C5.61571 1.09995 3.52637 3.18928 3.52637 5.76661C3.52637 8.34394 5.61571 10.4333 8.19303 10.4333Z" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
          <path d="M4.81319 9.24002L1.68652 12.3667" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </button>

    </div>
  )
}

export default Search;