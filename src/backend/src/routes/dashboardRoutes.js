const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logger = require('../utils/logger');

// GET /api/dashboard
router.get('/', auth, async (req, res, next) => {
  try {
    // Mock data for demonstration
    const dashboardData = {
      summary: {
        totalProducts: 150,
        activeSuppliers: 45,
        complianceRate: 92,
      },
      monthlyStats: [
        { month: 'Jan', products: 120, violations: 8 },
        { month: 'Feb', products: 130, violations: 6 },
        { month: 'Mar', products: 140, violations: 5 },
        { month: 'Apr', products: 150, violations: 4 },
      ],
      recentProducts: [
        {
          id: 1,
          name: 'Product A',
          supplier: 'Supplier X',
          status: 'Active',
          lastUpdated: new Date(),
        },
        {
          id: 2,
          name: 'Product B',
          supplier: 'Supplier Y',
          status: 'Active',
          lastUpdated: new Date(),
        },
      ],
    };

    logger.info('Dashboard data fetched successfully');
    res.json(dashboardData);
  } catch (error) {
    logger.error('Error fetching dashboard data:', error);
    next(error);
  }
});

module.exports = router; 