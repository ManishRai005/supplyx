import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Leaf, Clock, Tag, ArrowUpDown, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  sustainabilityScore: number;
  imageUrl: string;
  price: string;
  certifications: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    minScore: 0,
    certifications: [] as string[],
  });
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'score' | 'price'>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Categories and certifications for filter options
  const categoryOptions = ['Apparel', 'Food', 'Home Goods', 'Electronics', 'Beauty'];
  const certificationOptions = ['GOTS Certified', 'Fair Trade', 'Carbon Neutral', 'B Corp', 'Organic'];
  
  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from API
        // Mock data for demonstration
        setTimeout(() => {
          const mockProducts: Product[] = [
            {
              id: '1',
              name: 'Organic Cotton T-shirt',
              category: 'Apparel',
              description: 'Sustainably produced 100% organic cotton t-shirt.',
              sustainabilityScore: 92,
              imageUrl: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$29.99',
              certifications: ['GOTS Certified', 'Fair Trade'],
            },
            {
              id: '2',
              name: 'Fair Trade Coffee Beans',
              category: 'Food',
              description: 'Single-origin coffee beans from ethical farms.',
              sustainabilityScore: 88,
              imageUrl: 'https://images.pexels.com/photos/6306720/pexels-photo-6306720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$14.99',
              certifications: ['Fair Trade', 'Organic'],
            },
            {
              id: '3',
              name: 'Recycled Glass Water Bottle',
              category: 'Home Goods',
              description: 'Durable water bottle made from 100% recycled glass.',
              sustainabilityScore: 95,
              imageUrl: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$24.95',
              certifications: ['B Corp', 'Carbon Neutral'],
            },
            {
              id: '4',
              name: 'Eco-Friendly Smartphone Case',
              category: 'Electronics',
              description: 'Biodegradable phone case made from plant materials.',
              sustainabilityScore: 84,
              imageUrl: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$19.99',
              certifications: ['Carbon Neutral'],
            },
            {
              id: '5',
              name: 'Organic Cotton Jeans',
              category: 'Apparel',
              description: 'Stylish jeans made with organic cotton and eco-friendly dyes.',
              sustainabilityScore: 86,
              imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$89.99',
              certifications: ['GOTS Certified', 'Fair Trade'],
            },
            {
              id: '6',
              name: 'Natural Ingredient Shampoo Bar',
              category: 'Beauty',
              description: 'Zero-waste shampoo bar with all-natural ingredients.',
              sustainabilityScore: 94,
              imageUrl: 'https://images.pexels.com/photos/3735207/pexels-photo-3735207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              price: '$12.99',
              certifications: ['Organic', 'B Corp'],
            },
          ];
          
          setProducts(mockProducts);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Sustainability score filter
    if (product.sustainabilityScore < filters.minScore) {
      return false;
    }
    
    // Certification filter
    if (filters.certifications.length > 0 && 
      !filters.certifications.some(cert => product.certifications.includes(cert))) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'score':
        comparison = a.sustainabilityScore - b.sustainabilityScore;
        break;
      case 'price':
        comparison = parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - 
                     parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
        break;
      case 'recent':
      default:
        // In a real app, you would use creation/update date
        comparison = parseInt(b.id) - parseInt(a.id);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  const toggleCategoryFilter = (category: string) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };
  
  const toggleCertificationFilter = (certification: string) => {
    setFilters(prev => {
      const certifications = prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification];
      
      return { ...prev, certifications };
    });
  };
  
  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if clicking the same sort option
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort option and default to descending
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      minScore: 0,
      certifications: [],
    });
    setSearchTerm('');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Ethical Products</h1>
        <p className="text-muted-foreground">
          Browse our catalog of fully traceable, ethical products with transparent supply chains.
        </p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full rounded-md border border-input bg-background py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 sm:text-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filters {filters.categories.length > 0 || filters.certifications.length > 0 || filters.minScore > 0 ? 
                `(${filters.categories.length + filters.certifications.length + (filters.minScore > 0 ? 1 : 0)})` : ''}
            </Button>
            
            <Button
              variant="outline"
              leftIcon={<ArrowUpDown className="h-4 w-4" />}
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-card border border-border rounded-lg animate-fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filter Products</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Categories
                </h4>
                <div className="space-y-2">
                  {categoryOptions.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategoryFilter(category)}
                        className="rounded border-input text-primary focus:ring-primary/40 mr-2"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Sustainability Score */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Leaf className="h-4 w-4 mr-1" />
                  Sustainability Score
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.minScore}
                    onChange={(e) => setFilters(prev => ({ ...prev, minScore: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {filters.minScore}</span>
                    <span>Max: 100</span>
                  </div>
                </div>
              </div>
              
              {/* Certifications */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Certifications
                </h4>
                <div className="space-y-2">
                  {certificationOptions.map(certification => (
                    <label key={certification} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.certifications.includes(certification)}
                        onChange={() => toggleCertificationFilter(certification)}
                        className="rounded border-input text-primary focus:ring-primary/40 mr-2"
                      />
                      <span className="text-sm">{certification}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Sort Options */}
      <div className="mb-6 flex overflow-x-auto no-scrollbar space-x-2 pb-2">
        <Button
          variant={sortBy === 'recent' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('recent')}
        >
          Most Recent
        </Button>
        <Button
          variant={sortBy === 'name' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('name')}
        >
          Name
        </Button>
        <Button
          variant={sortBy === 'score' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('score')}
        >
          Sustainability Score
        </Button>
        <Button
          variant={sortBy === 'price' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleSortChange('price')}
        >
          Price
        </Button>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          {(filters.categories.length > 0 || filters.certifications.length > 0 || filters.minScore > 0 || searchTerm) && ' with applied filters'}
        </p>
      </div>
      
      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search term to find what you're looking for.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <Card 
              key={product.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      product.sustainabilityScore >= 90 ? 'success' :
                      product.sustainabilityScore >= 75 ? 'warning' : 'error'
                    }
                    className="flex items-center"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    {product.sustainabilityScore}/100
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" size="sm">{product.category}</Badge>
                  <span className="font-medium">{product.price}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" size="sm">{cert}</Badge>
                  ))}
                </div>
                
                <Link to={`/products/${product.id}`}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;