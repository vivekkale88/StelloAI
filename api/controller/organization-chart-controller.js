import { TreeNode, Organization } from '../model/organization-chart.js';

const org = new Organization();

// Initialize organization structure
const initializeOrganization = () => {
    const ceo = new TreeNode('1', 'Alice', 'CEO');
    org.setCEO(ceo);

    const cto = new TreeNode('2', 'Bob', 'CTO');
    ceo.addEmployee(cto);

    const vp = new TreeNode('3', 'Charlie', 'VP', 500);
    cto.addEmployee(vp);

    const director = new TreeNode('4', 'David', 'Director');
    vp.addEmployee(director);

    const manager = new TreeNode('5', 'Eve', 'Manager');
    director.addEmployee(manager);

    const employee = new TreeNode('6', 'Frank', 'Employee');
    manager.addEmployee(employee);

    const srManager = new TreeNode('7', 'Grace', 'Sr. Manager');
    manager.addEmployee(srManager);

    const srDirector = new TreeNode('8', 'Heidi', 'Sr. Director');
    vp.addEmployee(srDirector);

    const srVP = new TreeNode('9', 'Ivan', 'Sr. VP');
    cto.addEmployee(srVP);
};

initializeOrganization();

const getCEO = (req, res) => {
    const ceo = org.getCEO();
    res.json({ name: ceo.name, role: ceo.role });
};

const findEmployeeByRole = (req, res) => {
    const role = req.params.role;
    const employee = org.findEmployeeByRole(role);
    if (employee) {
        res.json({ name: employee.name, role: employee.role });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

const findEmployees = (req, res) => {
    const role = req.params.role;
    const employees = org.getEmployees();
    if (employees && employees.length > 0) {
        res.json(employees);
    } else {
        res.status(404).json({ message: 'No Employees not found' });
    }
};

const displayTree = (req, res) => {
    const result = [];
    const displayTreeHelper = (node = org.ceo, indent = "") => {
        if (!node) return;
        result.push(`${indent}${node.name} (${node.role})`);
        displayTreeHelper(node.subordinate, indent + "  ");
        displayTreeHelper(node.nextSibling, indent);
    };
    displayTreeHelper();
    res.json(result);
};

const findMaxNumberOfDirectReports = (req, res) => {
    const employee = org.findMaxNumberOfDirectReports();
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'No employees found' });
    }
};

const findCommonManager = (req, res) => {
    const { employee1, employee2 } = req.params;
    const manager = org.findCommonManager(employee1, employee2);
    if (manager) {
        res.json({ name: manager.name, role: manager.role });
    } else {
        res.status(404).json({ message: 'No common manager found' });
    }
};

export { getCEO, findEmployeeByRole, displayTree, findEmployees, findMaxNumberOfDirectReports, findCommonManager };
