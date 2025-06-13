import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Shield, Info } from 'lucide-react';

interface ComplianceScoreProps {
  score: number;
  lastAudit?: string;
  issues?: number;
  criteria?: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  className?: string;
}

const ComplianceScoreCard: React.FC<ComplianceScoreProps> = ({
  score,
  lastAudit = 'Jun 15, 2025',
  issues = 0,
  criteria = [],
  className = '',
}) => {
  // Default criteria if none provided
  const defaultCriteria = [
    { name: 'Environmental', score: 45, maxScore: 50 },
    { name: 'Labor Practices', score: 28, maxScore: 30 },
    { name: 'Ethical Sourcing', score: 19, maxScore: 20 },
  ];
  
  const actualCriteria = criteria.length > 0 ? criteria : defaultCriteria;
  
  // Determine score color
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-success';
    if (s >= 75) return 'text-warning';
    return 'text-error';
  };
  
  const getScoreBackground = (s: number) => {
    if (s >= 90) return 'bg-success/10';
    if (s >= 75) return 'bg-warning/10';
    return 'bg-error/10';
  };
  
  const getScoreRing = (s: number) => {
    if (s >= 90) return 'border-success';
    if (s >= 75) return 'border-warning';
    return 'border-error';
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Compliance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-muted-foreground text-lg ml-1">/100</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <span>Last audit: {lastAudit}</span>
              {issues > 0 && (
                <span className="ml-4 flex items-center text-error">
                  <Info className="h-3 w-3 mr-1" />
                  {issues} open issue{issues > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className={`relative w-20 h-20 ${getScoreBackground(score)} rounded-full flex items-center justify-center animate-pulse-slow`}>
            <div className={`absolute w-20 h-20 rounded-full border-4 ${getScoreRing(score)}`} />
            <div className={`text-lg font-bold ${getScoreColor(score)}`}>
              {score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D'}
            </div>
          </div>
        </div>
        
        {/* Criteria breakdown */}
        <div className="mt-6 space-y-3">
          {actualCriteria.map((criterion, index) => {
            const percentage = (criterion.score / criterion.maxScore) * 100;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{criterion.name}</span>
                  <span className="font-medium">
                    {criterion.score}/{criterion.maxScore}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      percentage >= 90 ? 'bg-success' : 
                      percentage >= 75 ? 'bg-warning' : 
                      'bg-error'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-medium ${getScoreColor(score)}`}>
                {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 60 ? 'Needs Improvement' : 'At Risk'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Certification</span>
              <span className="font-medium">
                {score >= 80 ? 'Certified Ethical' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceScoreCard;