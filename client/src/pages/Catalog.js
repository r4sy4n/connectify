import React from 'react';
import CatalogWrapper from '../assets/wrappers/Catalog';
import { categories } from '../components/CategoryList';

const Catalog = () => {
  return (
    <div>
      <CatalogWrapper>
        <div className='title-container'>
          <h1>
            Catalog
          </h1>
        </div>

        <div className='main-container'>
          {
            categories.map(list => 
              <div className='category-container'>
                <h2>{ list.name }</h2>
                <p>{ list.description }</p>
                <button className='category-btn'>OPEN</button>
              </div>
            )
          }
        </div>
      </CatalogWrapper>
    </div>
  )
}

export default Catalog;