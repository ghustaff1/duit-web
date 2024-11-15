import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Title = styled.h4`
font-family: "Poppins", sans-serif;
color:#151515;
font-weight: 500;
font-size: 16px;
line-height: 1.3;
margin-bottom: 5px;
`;
const Descr = styled.p`
font-size: 15px;
color:#151515;
line-height: 1.3;
margin-bottom: 32px;
`;

const Description = ({ farmTitle, recipe }) => {

  const farmDescr = useSelector(({ farms }) => farms.farms.find(farm => farm.title === farmTitle)).descr;


  const data = [
    {
      title: farmTitle,
      descr: farmDescr
    },
    {
      title: 'How to cook',
      descr: recipe
    }
  ];

  return (
    <>
      {data.map(obj =>
        <li key={obj.title}>
          <Title>{obj.title}</Title>
          <Descr>{obj.descr}</Descr>
        </li>
      )}
    </>
  )
}

export default Description;