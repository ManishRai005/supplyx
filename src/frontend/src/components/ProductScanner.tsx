import React, { useState, useRef, useEffect } from 'react';
import { QrCode, X, Check, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface ProductScannerProps {
  onScan?: (code: string) => void;
  onClose?: () => void;
  className?: string;
}

const ProductScanner: React.FC<ProductScannerProps> = ({
  onScan,
  onClose,
  className = '',
}) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ code: string; valid: boolean } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanLines, setScanLines] = useState(0);
  
  // Mock scan result - in a real app, this would be the QR code detection logic
  const mockScanResult = (demoMode = true) => {
    if (demoMode) {
      setTimeout(() => {
        const demoProducts = [
          { code: 'ECO72839465', valid: true },
          { code: 'ORG56782340', valid: true },
          { code: 'FAKE12345678', valid: false },
        ];
        
        const randomProduct = demoProducts[Math.floor(Math.random() * demoProducts.length)];
        setResult(randomProduct);
        
        if (randomProduct.valid && onScan) {
          onScan(randomProduct.code);
        }
        
        setScanning(false);
      }, 3000);
    }
  };
  
  const startScan = () => {
    setScanning(true);
    setResult(null);
    setErrorMessage('');
    
    // In a demo, we'll just use mock data
    mockScanResult();
    
    // In a real implementation, we would access the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && !videoRef.current?.srcObject) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          setErrorMessage('Camera access denied. Please enable camera permissions.');
          setScanning(false);
        });
    }
  };
  
  const stopScan = () => {
    setScanning(false);
    
    // Stop camera stream
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (onClose) {
      onClose();
    }
  };
  
  // Animate scan lines
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scanning) {
      interval = setInterval(() => {
        setScanLines(prev => (prev >= 100 ? 0 : prev + 4));
      }, 50);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scanning]);
  
  return (
    <div className={`bg-card rounded-lg border border-border shadow-md overflow-hidden ${className}`}>
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center">
          <QrCode className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium">Product Verification Scanner</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={stopScan}
          aria-label="Close scanner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-5">
        <div className="relative aspect-video bg-muted/30 rounded-lg border border-border overflow-hidden">
          {scanning && (
            <>
              <div
                className="absolute inset-0 border-2 border-primary/50 rounded-lg z-10"
                style={{ boxShadow: '0 0 0 4px rgba(var(--primary), 0.1)' }}
              />
              <div
                className="absolute left-0 right-0 h-0.5 bg-primary z-20 transition-all"
                style={{ top: `${scanLines}%` }}
              />
            </>
          )}
          
          {result && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-30 animate-fadeIn">
              {result.valid ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Authentic Product</h3>
                  <p className="text-muted-foreground mb-3">This product is verified authentic.</p>
                  <Badge variant="success" className="mb-4">{result.code}</Badge>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-error" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Verification Failed</h3>
                  <p className="text-muted-foreground mb-3">This product could not be verified.</p>
                  <Badge variant="error" className="mb-4">{result.code}</Badge>
                </>
              )}
              
              <Button
                onClick={() => {
                  setResult(null);
                  startScan();
                }}
              >
                Scan Again
              </Button>
            </div>
          )}
          
          {errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-30 animate-fadeIn p-4">
              <AlertTriangle className="h-8 w-8 text-error mb-2" />
              <p className="text-center text-error mb-4">{errorMessage}</p>
              <Button
                onClick={() => {
                  setErrorMessage('');
                  startScan();
                }}
              >
                Try Again
              </Button>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {!scanning && !result && !errorMessage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-4">
                Scan a product QR code to verify its authenticity and view supply chain details.
              </p>
              <Button onClick={startScan}>Start Scanning</Button>
            </div>
          )}
        </div>
        
        {scanning && (
          <div className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
            Position the QR code within the frame to scan...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScanner;