import React from 'react';
import { Link } from 'react-router-dom';

export const ArchiveRecipes = (props) => {
    let counter = 1 ;
    return (
        <div key={`recipe-${counter++}`} className={ `${props.slug} card apple basil spinach cucumber lime p-0 relative filter-card flex bg-white md:p-4 shadow-md mb-6` }>
            <div className="absolute bottom-0 left-2 md:left-0 w-32 h-32 bg-center bg-cover mr-4" style={{background:props.color.hex}}>
            </div>
           
	        
        </div>
    )
}

export const ArchiveIngredients = (props) => {
    let counter = 1 ;
    return (
        <div key={counter++} className={ `${props.slug} card apple basil spinach cucumber lime p-0 relative filter-card flex bg-white shadow-md mb-6` }>
           test
        </div>
    )
}
