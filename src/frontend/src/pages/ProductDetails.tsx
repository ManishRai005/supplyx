import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Box, Calendar, Award, Leaf, Info, BarChart3, ExternalLink, Truck, Factory, ScanLine } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SupplyChainMap from '../components/SupplyChainMap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import LineChart from '../components/charts/LineChart';
import LoadingSpinner from '../components/LoadingSpinner';

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  certifications: string[];
  sustainabilityScore: number;
  carbonFootprint: number;
  waterUsage: number;
  manufacturer: string;
  manufacturingDate: string;
  price: string;
  materialsList: {
    name: string;
    percentage: number;
    sustainable: boolean;
  }[];
  impactHistory: { label: string; value: number }[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'chain'>('overview');

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProductDetails = async () => {
      try {
        // In a real app, you would fetch from an API
        // Mock data for demonstration
        setTimeout(() => {
          const mockProduct: ProductDetails = {
            id: id || '123',
            name: 'Organic Cotton T-shirt',
            category: 'Apparel',
            description: 'Sustainably produced 100% organic cotton t-shirt made with eco-friendly dyes and ethical labor practices throughout the supply chain.',
            imageUrl: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            certifications: ['GOTS Certified', 'Fair Trade', 'Carbon Neutral'],
            sustainabilityScore: 92,
            carbonFootprint: 3.2, // kg CO2e
            waterUsage: 120, // liters
            manufacturer: 'EcoTextiles Inc.',
            manufacturingDate: '2025-03-15',
            price: '$29.99',
            materialsList: [
              { name: 'Organic Cotton', percentage: 95, sustainable: true },
              { name: 'Elastane', percentage: 5, sustainable: false },
            ],
            impactHistory: [
              { label: 'Jan', value: 3.8 },
              { label: 'Feb', value: 3.6 },
              { label: 'Mar', value: 3.4 },
              { label: 'Apr', value: 3.3 },
              { label: 'May', value: 3.2 },
              { label: 'Jun', value: 3.2 },
            ],
          };
          
          setProduct(mockProduct);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <LoadingSpinner size="lg" text="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-error/10 text-error p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge 
                      variant={product.sustainabilityScore >= 90 ? 'success' : 'warning'}
                      className="flex items-center"
                    >
                      <Leaf className="h-3 w-3 mr-1" />
                      {product.sustainabilityScore}/100
                    </Badge>
                  </div>
                </div>
                <span className="text-xl font-bold">{product.price}</span>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Factory className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="text-sm text-muted-foreground">Manufacturer</div>
                    <div className="font-medium">{product.manufacturer}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="text-sm text-muted-foreground">Manufacturing Date</div>
                    <div className="font-medium">
                      {new Date(product.manufacturingDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Award className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" size="sm">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  leftIcon={<ScanLine className="h-4 w-4" />}
                >
                  Verify Authenticity
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Product Certificate
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 relative overflow-hidden h-[300px] md:h-auto">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-card/80 backdrop-blur-sm p-2 rounded">
                    <div className="text-xs text-muted-foreground">Carbon</div>
                    <div className="font-medium flex items-baseline">
                      <span>{product.carbonFootprint}</span>
                      <span className="text-xs ml-1">kg CO₂e</span>
                    </div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm p-2 rounded">
                    <div className="text-xs text-muted-foreground">Water</div>
                    <div className="font-medium flex items-baseline">
                      <span>{product.waterUsage}</span>
                      <span className="text-xs ml-1">liters</span>
                    </div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm p-2 rounded">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className="font-medium flex items-baseline">
                      <span>{product.sustainabilityScore}</span>
                      <span className="text-xs ml-1">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`py-3 px-6 text-sm font-medium border-b-2 ${
            activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Overview
          </div>
        </button>
        <button
          className={`py-3 px-6 text-sm font-medium border-b-2 ${
            activeTab === 'impact'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors'
          }`}
          onClick={() => setActiveTab('impact')}
        >
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Environmental Impact
          </div>
        </button>
        <button
          className={`py-3 px-6 text-sm font-medium border-b-2 ${
            activeTab === 'chain'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors'
          }`}
          onClick={() => setActiveTab('chain')}
        >
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Supply Chain
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Box className="h-5 w-5 mr-2 text-primary" />
                  Materials Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.materialsList.map((material, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{material.name}</span>
                          {material.sustainable && (
                            <Badge variant="success" size="sm" className="ml-2">
                              Sustainable
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-medium">{material.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            material.sustainable ? 'bg-success' : 'bg-warning'
                          }`}
                          style={{ width: `${material.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Product Specifications</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Weight: </span>
                      <span className="font-medium">180g</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Fabric Density: </span>
                      <span className="font-medium">150 GSM</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Country of Origin: </span>
                      <span className="font-medium">India</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">SKU: </span>
                      <span className="font-medium">ECT-OC-001</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-primary" />
                  Sustainability Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Carbon Footprint</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-medium">{product.carbonFootprint} kg CO₂e</div>
                      <Badge variant="success" size="sm">
                        -12% YoY
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      vs. industry avg: 5.8 kg CO₂e
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Water Usage</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-medium">{product.waterUsage} liters</div>
                      <Badge variant="success" size="sm">
                        -18% YoY
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      vs. industry avg: 2,700 liters
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Energy Efficiency</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-medium">A+</div>
                      <Badge variant="success" size="sm">
                        Top 5%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Certifications</h4>
                  <div className="space-y-2">
                    {product.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Award className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Carbon Footprint Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={product.impactHistory} 
                  height={250} 
                  color="rgb(var(--success))" 
                />
                
                <div className="mt-4 space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Impact Breakdown</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Raw Materials</span>
                          <span className="font-medium">1.1 kg CO₂e</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: '34%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Manufacturing</span>
                          <span className="font-medium">0.8 kg CO₂e</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{ width: '25%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Transportation</span>
                          <span className="font-medium">1.0 kg CO₂e</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: '31%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Packaging</span>
                          <span className="font-medium">0.3 kg CO₂e</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning rounded-full"
                            style={{ width: '10%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Carbon Offset</div>
                      <div className="text-lg font-medium mt-1">100%</div>
                      <div className="text-xs text-success flex items-center mt-1">
                        <Leaf className="h-3 w-3 mr-1" />
                        Fully Offset
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Trees Planted</div>
                      <div className="text-lg font-medium mt-1">2 trees</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        per product sold
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-primary" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Water Consumption</h4>
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium">{product.waterUsage} liters</span>
                        <Badge variant="success">95% less</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Compared to conventional cotton t-shirts which use an average of 
                        2,700 liters of water.
                      </p>
                      
                      <div className="mt-4 h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '5%' }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>This product</span>
                        <span>Industry average</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Chemical Usage</h4>
                    <div className="bg-success/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium">GOTS Certified</span>
                        <Badge variant="success">No Toxins</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uses natural dyes and GOTS-certified processes with no harmful chemicals.
                      </p>
                      
                      <div className="mt-3 flex flex-col space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-success" />
                          </div>
                          <span>No heavy metals</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-success" />
                          </div>
                          <span>No formaldehyde</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-success" />
                          </div>
                          <span>No AZO dyes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">End of Life</h4>
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div className="text-center flex-1">
                          <div className="text-sm text-muted-foreground mb-1">Biodegradable</div>
                          <div className="font-medium text-success">95%</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-sm text-muted-foreground mb-1">Recyclable</div>
                          <div className="font-medium text-success">Yes</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-sm text-muted-foreground mb-1">Take-back Program</div>
                          <div className="font-medium text-success">Available</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-3">
                        This product is part of our circular economy initiative. Return worn items 
                        for a 15% discount on your next purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'chain' && (
          <div className="grid grid-cols-1 gap-6">
            <SupplyChainMap productId={id} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-primary" />
                  Supply Chain Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                  
                  <div className="mb-6">
                    <div className="absolute left-0 w-3 h-3 -ml-1.5 rounded-full bg-primary" />
                    <div className="text-lg font-medium mb-1">Raw Material Sourcing</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      EcoFarms, Costa Rica • March 1, 2025
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        Organic cotton grown using rainwater harvesting techniques and without 
                        synthetic pesticides. Certified by GOTS and Fair Trade.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" size="sm" className="mr-2">Fair Labor</Badge>
                        <Badge variant="outline" size="sm" className="mr-2">Organic</Badge>
                        <Badge variant="outline" size="sm">Pesticide-free</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="absolute left-0 w-3 h-3 -ml-1.5 rounded-full bg-primary" />
                    <div className="text-lg font-medium mb-1">Processing & Spinning</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      GreenProcess Co, Mexico • March 10, 2025
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        Cotton processed into yarn using energy-efficient machinery powered by 
                        100% renewable energy. Water recycling systems in place.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" size="sm" className="mr-2">Renewable Energy</Badge>
                        <Badge variant="outline" size="sm">Water Conservation</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="absolute left-0 w-3 h-3 -ml-1.5 rounded-full bg-primary" />
                    <div className="text-lg font-medium mb-1">Fabric Production & Dyeing</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Eco Textiles, Mexico • March 15, 2025
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        Fabric woven and dyed using natural, plant-based dyes. Closed-loop water 
                        system reduces water consumption by 95% compared to conventional methods.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" size="sm" className="mr-2">Natural Dyes</Badge>
                        <Badge variant="outline" size="sm">Closed Loop</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="absolute left-0 w-3 h-3 -ml-1.5 rounded-full bg-warning" />
                    <div className="text-lg font-medium mb-1">
                      Manufacturing & Packaging
                      <Badge variant="warning" size="sm" className="ml-2">
                        Monitoring
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      EcoWear Factory, USA • March 25, 2025
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        Cut and sewn in a fair labor certified factory. Packaging uses 
                        biodegradable materials made from cornstarch.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" size="sm" className="mr-2">Fair Wages</Badge>
                        <Badge variant="outline" size="sm">Eco Packaging</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="absolute left-0 w-3 h-3 -ml-1.5 rounded-full bg-primary" />
                    <div className="text-lg font-medium mb-1">Distribution</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      EcoLogistics, USA • April 2, 2025
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        Transported using carbon-neutral logistics. Final delivery uses 
                        electric vehicles within 100-mile radius of distribution centers.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" size="sm" className="mr-2">Carbon Neutral</Badge>
                        <Badge variant="outline" size="sm">Electric Fleet</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;