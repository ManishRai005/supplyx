import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Suppliers: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Suppliers</h1>
        <p className="text-muted-foreground">
          Manage and monitor your ethical supply chain partners.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Supplier Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Supplier management features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;