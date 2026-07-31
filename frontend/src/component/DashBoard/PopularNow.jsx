import React from 'react';
import  PopularBooksList from './PopularNowBooks';

function PopularBooks() {
    return (
        <div >
            <h2 className="text-xl font-bold ml-1">
                 Popular Now <span className="mr-2" role="img" aria-label="fire">🔥</span>
            </h2>
            <PopularBooksList/>
        </div>
    );
}

export default PopularBooks;
