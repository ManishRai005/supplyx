import React, { useState, useEffect } from 'react';
import { Activity, FileCheck, Filter, TrendingUp, RefreshCw, AlertTriangle, Clock, Zap, ChevronsUp, ChevronsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SupplyChainMap from '../components/SupplyChainMap';
import ComplianceScoreCard from '../components/ComplianceScoreCard';
import Badge from '../components/ui/Badge';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const [overviewStats, setOverviewStats] = useState({
    totalProducts: 238,
    verifiedSuppliers: 47,
    averageComplianceScore: 87,
    riskyNodes: 3,
  });

  const [complianceTrend, setComplianceTrend] = useState([
    { label: 'Jan', value: 82 },
    { label: 'Feb', value: 84 },
    { label: 'Mar', value: 83 },
    { label: 'Apr', value: 86 },
    { label: 'May', value: 87 },
    { label: 'Jun', value: 89 },
  ]);

  const [carbonEmissions, setCarbonEmissions] = useState([
    { label: 'Supplier', value: 12.4 },
    { label: 'Production', value: 18.7 },
    { label: 'Transport', value: 24.3 },
    { label: 'Packaging', value: 8.9 },
    { label: 'Retail', value: 5.2 },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'compliance',
      severity: 'high',
      message: 'Supplier "TextileCo" compliance certificate expires in 5 days',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'delivery',
      severity: 'medium',
      message: 'Shipment #7843 delayed by 2 days - weather conditions',
      time: '6 hours ago',
    },
    {
      id: 3,
      type: 'audit',
      severity: 'low',
      message: 'Annual sustainability audit scheduled for next month',
      time: '1 day ago',
    },
  ]);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Supply Chain Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your ethical supply chain performance and compliance in real-time.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            variant={timeRange === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button
            variant={timeRange === 'quarter' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter className="h-4 w-4" />}
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
            isLoading={refreshing}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Products</p>
                <h3 className="text-3xl font-bold">{overviewStats.totalProducts}</h3>
                <p className="text-sm text-success flex items-center mt-1">
                  <ChevronsUp className="h-4 w-4 mr-1" />
                  12% from last period
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Verified Suppliers</p>
                <h3 className="text-3xl font-bold">{overviewStats.verifiedSuppliers}</h3>
                <p className="text-sm text-success flex items-center mt-1">
                  <ChevronsUp className="h-4 w-4 mr-1" />
                  4 new this month
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Compliance</p>
                <h3 className="text-3xl font-bold">{overviewStats.averageComplianceScore}%</h3>
                <p className="text-sm text-success flex items-center mt-1">
                  <ChevronsUp className="h-4 w-4 mr-1" />
                  2.3% improvement
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent-dark" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Risk Nodes</p>
                <h3 className="text-3xl font-bold">{overviewStats.riskyNodes}</h3>
                <p className="text-sm text-error flex items-center mt-1">
                  <ChevronsUp className="h-4 w-4 mr-1" />
                  1 new issue detected
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-error/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-error" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SupplyChainMap className="lg:col-span-2 animate-fadeIn" />
        <ComplianceScoreCard score={87} className="animate-fadeIn" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="animate-fadeIn">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Compliance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={complianceTrend} height={250} color="rgb(var(--success))" />
          </CardContent>
        </Card>

        <Card className="animate-fadeIn">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Carbon Emissions by Stage (tonnes CO₂e)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={carbonEmissions} height={250} color="rgb(var(--secondary))" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="animate-fadeIn">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start p-3 rounded-lg border border-border bg-muted/30">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4
                  ${alert.severity === 'high' ? 'bg-error/10 text-error' : 
                    alert.severity === 'medium' ? 'bg-warning/10 text-warning' : 
                    'bg-primary/10 text-primary'}`}
                >
                  {alert.type === 'compliance' ? (
                    <FileCheck className="h-5 w-5" />
                  ) : alert.type === 'delivery' ? (
                    <Truck className="h-5 w-5" />
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium">
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                    </h4>
                    <Badge
                      variant={
                        alert.severity === 'high' ? 'error' : 
                        alert.severity === 'medium' ? 'warning' : 'primary'
                      }
                      size="sm"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-1">{alert.message}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;