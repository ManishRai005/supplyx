import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Badge from './ui/Badge';
import { Zap, AlertTriangle, CheckCircle, Info, MapPin, TrendingUp, Truck, Factory, ArrowRight, RefreshCw } from 'lucide-react';

interface Node {
  id: string;
  type: 'supplier' | 'factory' | 'distributor' | 'retailer';
  name: string;
  location: string;
  status: 'active' | 'warning' | 'issue' | 'inactive';
  complianceScore: number;
  impact?: {
    carbon: number;
    social: number;
    water: number;
  };
}

interface Connection {
  from: string;
  to: string;
  transport: 'truck' | 'ship' | 'air' | 'rail';
  distance: number;
  carbonEmission: number;
  status: 'active' | 'delayed' | 'issue';
}

interface SupplyChainMapProps {
  productId?: string;
  supplierId?: string;
  className?: string;
}

const SupplyChainMap: React.FC<SupplyChainMapProps> = ({ productId, supplierId, className = '' }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate fetching data with progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
    
    // Mock supply chain data
    const mockNodes: Node[] = [
      {
        id: 'supplier1',
        type: 'supplier',
        name: 'EcoFarms Ltd',
        location: 'Costa Rica',
        status: 'active',
        complianceScore: 94,
        impact: {
          carbon: 3.2,
          social: 92,
          water: 2.4,
        },
      },
      {
        id: 'factory1',
        type: 'factory',
        name: 'GreenProcess Co',
        location: 'Mexico',
        status: 'active',
        complianceScore: 89,
        impact: {
          carbon: 8.7,
          social: 84,
          water: 5.1,
        },
      },
      {
        id: 'distributor1',
        type: 'distributor',
        name: 'EcoLogistics',
        location: 'United States',
        status: 'warning',
        complianceScore: 78,
        impact: {
          carbon: 12.3,
          social: 79,
          water: 1.8,
        },
      },
      {
        id: 'retailer1',
        type: 'retailer',
        name: 'GreenMart',
        location: 'United States',
        status: 'active',
        complianceScore: 91,
        impact: {
          carbon: 4.5,
          social: 88,
          water: 2.1,
        },
      },
    ];
    
    const mockConnections: Connection[] = [
      {
        from: 'supplier1',
        to: 'factory1',
        transport: 'ship',
        distance: 1850,
        carbonEmission: 7.2,
        status: 'active',
      },
      {
        from: 'factory1',
        to: 'distributor1',
        transport: 'truck',
        distance: 750,
        carbonEmission: 8.5,
        status: 'delayed',
      },
      {
        from: 'distributor1',
        to: 'retailer1',
        transport: 'truck',
        distance: 320,
        carbonEmission: 3.8,
        status: 'active',
      },
    ];
    
    setTimeout(() => {
      setNodes(mockNodes);
      setConnections(mockConnections);
      setSelectedNode(mockNodes[0]);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [productId, supplierId]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'issue':
        return <AlertTriangle className="h-4 w-4 text-error" />;
      case 'delayed':
        return <RefreshCw className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'supplier':
        return <Factory className="h-5 w-5" />;
      case 'factory':
        return <Zap className="h-5 w-5" />;
      case 'distributor':
        return <Truck className="h-5 w-5" />;
      case 'retailer':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  const formatNodeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Supply Chain Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex flex-col items-center justify-center">
            <div className="w-[200px] h-2 bg-muted rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Mapping supply chain... {loadingProgress}%
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {/* Interactive Map Visualization */}
            <div className="relative h-[300px] bg-muted/30 rounded-lg border border-border p-4 overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-50" />
              
              {/* Supply Chain Nodes */}
              <div className="relative h-full flex items-center justify-between px-6">
                {nodes.map((node, index) => (
                  <div 
                    key={node.id}
                    className={`flex flex-col items-center transition-all duration-300 cursor-pointer
                      ${selectedNode?.id === node.id ? 'scale-110' : 'hover:scale-105'}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center
                        ${selectedNode?.id === node.id ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-card text-primary shadow-md'}`}
                    >
                      {getNodeIcon(node.type)}
                    </div>
                    <span className="mt-2 text-xs font-medium">{node.name}</span>
                    <div className="mt-1 flex items-center">
                      {getStatusIcon(node.status)}
                      <span className="text-[10px] ml-1">{formatNodeType(node.type)}</span>
                    </div>
                    
                    <Badge 
                      variant={node.complianceScore > 90 ? 'success' : node.complianceScore > 75 ? 'warning' : 'error'} 
                      size="sm"
                      className="mt-1"
                    >
                      {node.complianceScore}%
                    </Badge>
                  </div>
                ))}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  {connections.map((connection, index) => {
                    const fromIndex = nodes.findIndex(n => n.id === connection.from);
                    const toIndex = nodes.findIndex(n => n.id === connection.to);
                    const nodeCount = nodes.length - 1;
                    
                    if (fromIndex === -1 || toIndex === -1) return null;
                    
                    const startX = (fromIndex / nodeCount) * 100;
                    const endX = (toIndex / nodeCount) * 100;
                    
                    const strokeColor = connection.status === 'active' 
                      ? 'rgba(var(--success), 0.7)' 
                      : connection.status === 'delayed'
                        ? 'rgba(var(--warning), 0.7)'
                        : 'rgba(var(--error), 0.7)';
                    
                    return (
                      <g key={`${connection.from}-${connection.to}`}>
                        <path
                          d={`M ${startX}% 50% L ${endX}% 50%`}
                          stroke={strokeColor}
                          strokeWidth="2"
                          strokeDasharray={connection.status === 'delayed' ? '5,5' : 'none'}
                          className="animate-pulse-slow"
                        />
                        
                        {/* Arrow */}
                        <circle
                          cx={`${(startX + endX) / 2}%`}
                          cy="50%"
                          r="4"
                          fill={strokeColor}
                          className="animate-pulse-slow"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
            
            {/* Node Details */}
            {selectedNode && (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${selectedNode.status === 'active' ? 'bg-success/20 text-success' : 
                        selectedNode.status === 'warning' ? 'bg-warning/20 text-warning' : 
                        'bg-error/20 text-error'}`}
                    >
                      {getNodeIcon(selectedNode.type)}
                    </div>
                    <div className="ml-2">
                      <h4 className="text-base font-semibold">{selectedNode.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedNode.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant={
                    selectedNode.complianceScore > 90 ? 'success' : 
                    selectedNode.complianceScore > 75 ? 'warning' : 'error'
                  }>
                    Compliance: {selectedNode.complianceScore}%
                  </Badge>
                </div>
                
                {/* Impact Metrics */}
                {selectedNode.impact && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-muted/30 p-2 rounded border border-border">
                      <div className="text-xs text-muted-foreground">Carbon Footprint</div>
                      <div className="text-sm font-medium flex items-center mt-1">
                        <span>{selectedNode.impact.carbon}</span>
                        <span className="text-xs ml-1">tonnes CO₂e</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded border border-border">
                      <div className="text-xs text-muted-foreground">Social Score</div>
                      <div className="text-sm font-medium flex items-center mt-1">
                        <span>{selectedNode.impact.social}</span>
                        <span className="text-xs ml-1">/ 100</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-2 rounded border border-border">
                      <div className="text-xs text-muted-foreground">Water Usage</div>
                      <div className="text-sm font-medium flex items-center mt-1">
                        <span>{selectedNode.impact.water}</span>
                        <span className="text-xs ml-1">m³ / unit</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Connections */}
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Connections</h5>
                  {connections
                    .filter(conn => conn.from === selectedNode.id || conn.to === selectedNode.id)
                    .map(connection => {
                      const isOutgoing = connection.from === selectedNode.id;
                      const partnerId = isOutgoing ? connection.to : connection.from;
                      const partner = nodes.find(n => n.id === partnerId);
                      
                      return (
                        <div 
                          key={`${connection.from}-${connection.to}`}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div className="flex items-center">
                            {!isOutgoing && <ArrowRight className="h-3 w-3 mr-1 text-muted-foreground" />}
                            <span className="text-sm">{partner?.name}</span>
                            {isOutgoing && <ArrowRight className="h-3 w-3 ml-1 text-muted-foreground" />}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" size="sm">
                              <Truck className="h-3 w-3 mr-1" />
                              {connection.distance} km
                            </Badge>
                            <Badge 
                              variant={
                                connection.carbonEmission < 5 ? 'success' : 
                                connection.carbonEmission < 10 ? 'warning' : 'error'
                              } 
                              size="sm"
                            >
                              {connection.carbonEmission} CO₂e
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;