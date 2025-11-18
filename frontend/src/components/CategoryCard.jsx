import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = forwardRef(({ category, index }, ref) => {
  const borderColors = ['#002C21', '#004D3B', '#006145', '#017956', '#029865'];
  const borderColor = borderColors[index % borderColors.length];
  
  return (
    <div 
      ref={ref}
      className="category-card-wrapper"
    >
      <Link 
        to={`/category/${category.slug}`}
        className="category-card cursor-target" 
        style={{ borderColor: borderColor, '--card-green': borderColor }} 
        data-index={index}
      >
        <div className="category-card-image-container">
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

