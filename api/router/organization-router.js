import express from 'express';
import { getCEO, findEmployeeByRole, displayTree, findEmployees, findMaxNumberOfDirectReports, findCommonManager } from '../controller/organization-chart-controller.js';

const organizationRoutes = express.Router();

// Define routes and attach the appropriate controller methods
organizationRoutes.get('/ceo', getCEO);
organizationRoutes.get('/employee/:role', findEmployeeByRole);
organizationRoutes.get('/displayTree', displayTree);
organizationRoutes.get('/employees', findEmployees);
organizationRoutes.get('/maxDirectReports', findMaxNumberOfDirectReports);
organizationRoutes.get('/commonManager/:employee1/:employee2', findCommonManager);

export default organizationRoutes;
