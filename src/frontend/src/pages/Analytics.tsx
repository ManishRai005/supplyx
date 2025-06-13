import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track and analyze your supply chain metrics.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;