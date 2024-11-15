import React from 'react'
import './BlogCardSmall.scss';
import { Link } from 'react-router-dom';
import Tag from '../../Tag';

const BlogCardSmall = ({ id, title, bgImg, authorName, date, tags }) => {
  return (
    <Link to={`/blogs/${id}`} className="BlogCardSmall">
      <div className="BlogCardSmall__img">
        <img src={bgImg} alt="bgImg" />
      </div>
      <div className="BlogCardSmall__body">
        <Tag value={tags[0]}/>
        <h3 className="BlogCardSmall__title">{title}</h3>
        <div className="BlogCardSmall__info">
          <p className="BlogCardSmall__authorName">{authorName}</p>
          <time dateTime={`${date[2]}-${date[1]}-${date[0]}`}>
            {date[0]}. {date[1]}. {date[2]}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default BlogCardSmall