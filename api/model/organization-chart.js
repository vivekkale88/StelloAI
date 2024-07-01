class TreeNode {
    constructor(id, name, role, salary) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.salary = salary;
        this.subordinate = null;
        this.nextSibling = null;
    }

    addEmployee(employee) {
        if (!this.subordinate) {
            this.subordinate = employee;
        } else {
            let current = this.subordinate;
            while (current.nextSibling) {
                current = current.nextSibling;
            }
            current.nextSibling = employee;
        }
    }

    getEmployees() {
        let employees = [];
        let current = this.subordinate;
        while (current) {
            employees.push(current);
            current = current.nextSibling;
        }
        return employees;
    }
}

class Organization {
    constructor() {
        this.ceo = null;
    }

    setCEO(ceo) {
        this.ceo = ceo;
    }

    getCEO() {
        return this.ceo;
    }

    findEmployeeByRole(role, node = this.ceo) {
        if (!node) return null;
        if (node.role === role) {
            return node;
        }
        let found = this.findEmployeeByRole(role, node.subordinate);
        if (found) return found;
        return this.findEmployeeByRole(role, node.nextSibling);
    }

    displayTree(node = this.ceo, indent = "") {
        if (!node) return;
        console.log(`${indent}${node.name} (${node.role})`);
        this.displayTree(node.subordinate, indent + "  ");
        this.displayTree(node.nextSibling, indent);
    }

    getEmployees(node = this.ceo, indent = "") {
        return node.getEmployees();
    }

    findMaxNumberOfDirectReports() {
        let maxDirectReports = 0;
        let employeeWithMaxDirectReports = null;

        const traverse = (node) => {
            if (!node) return;
            const directReports = node.getEmployees().length;
            if (directReports > maxDirectReports) {
                maxDirectReports = directReports;
                employeeWithMaxDirectReports = node;
            }
            traverse(node.subordinate);
            traverse(node.nextSibling);
        };

        traverse(this.ceo);

        return employeeWithMaxDirectReports ? 
            { id: employeeWithMaxDirectReports.id, name: employeeWithMaxDirectReports.name, role: employeeWithMaxDirectReports.role, directReports: maxDirectReports } : 
            null;
    }

    findCommonManager(employee1, employee2) {
        const pathToEmployee = (root, employee) => {
            if (!root) return null;
            if (root.name === employee) return [root];

            let path = pathToEmployee(root.subordinate, employee);
            if (path) {
                path.unshift(root);
                return path;
            }

            path = pathToEmployee(root.nextSibling, employee);
            if (path) {
                return path;
            }

            return null;
        };

        const path1 = pathToEmployee(this.ceo, employee1);
        const path2 = pathToEmployee(this.ceo, employee2);

        if (!path1 || !path2) return null;

        let i = 0;
        while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
            i++;
        }

        return path1[i - 1] || null;
    }
}

export { TreeNode, Organization };
