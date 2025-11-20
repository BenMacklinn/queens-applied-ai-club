import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = forwardRef(({ category, index }, ref) => {
  const paletteColors = ['#C48BD4', '#8A7BCF', '#76A7E4', '#63B4EB', '#2665A8'];
  const borderColor = paletteColors[index % paletteColors.length];
  
  return (
    <div 
      ref={ref}
      className="category-card-wrapper"
    >
      <Link 
        to={`/category/${category.slug}`}
        className="category-card cursor-target" 
        style={{ borderColor: borderColor, '--card-overlay': 'rgba(0, 0, 0, 0.4)' }} 
        data-index={index}
      >
        <div className="category-card-image-container" data-category-slug={category.slug}>
          <img 
            src={category.imageUrl} 
            alt={category.name}
            className="category-card-image"
          />
        </div>
        <div className="category-card-label">
          <span className="category-card-name">{category.name}</span>
        </div>
      </Link>
    </div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;

