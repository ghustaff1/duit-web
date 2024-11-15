import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCardBig.scss';
import Tag from '../../Tag';

const BlogCardBig = ({ id, title, bgImg, authorImg, authorName, date, tags }) => {
  return (
    <Link to={`/blogs/${id}`} className='blogCardBig'>
      <div className='blogCardBig__bg'>
        <img src={bgImg} alt="background" />
      </div>
      <div className="blogCardBig__body">
        <div className='blogCardBig__top'>
          <Tag value={tags[0]} />
        </div>
        <div className='blogCardBig___bottom'>
          <h2 className='blogCardBig__title'>{title}</h2>
          <div className="blogCardBig__info">
            <div className="blogCardBig__author author">
              <div className="author__img">
                <img src={authorImg} alt="authorImg" />
              </div>
              <p>{authorName}</p>
            </div>
            <time dateTime={`${date[2]}-${date[1]}-${date[0]}`}>
              {date[0]}. {date[1]}. {date[2]}
            </time>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCardBig