import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CatalogWrapper } from '../assets/wrappers/Catalog';
import { categories } from '../components/CategoryList';

const Catalog = () => {
  const navigate = useNavigate();
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
              <div
                key={ list.name }
                className='list-container'
                onClick={() => navigate( list.name.trim().replace(/\s+/g, '-').toLowerCase() )}
              >
                <h2>{ list.name }</h2>
                <p>{ list.description }</p>
                <button>OPEN</button>
              </div>
            )
          }
        </div>
      </CatalogWrapper>
    </div>
  )
}

export default Catalog;