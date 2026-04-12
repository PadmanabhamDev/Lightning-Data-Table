import { LightningElement } from 'lwc';

export default class BasicDataTable extends LightningElement {

    employeeColumns = [
        { label: "Employee Id", fieldName: 'employeeId' },
        { label: "First Name", fieldName: 'firstName' },
        { label: "Last Name", fieldName: 'lastName' },
        { label: "Phone Number", fieldName: 'phoneNumber' },
        { label: "Email Address", fieldName: 'emailAddress' },
    ];

    employeeData = [
        { employeeId: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '555-123-4567', emailAddress: 'john.doe@example.com' },
        { employeeId: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '555-234-5678', emailAddress: 'jane.smith@example.com' },
        { employeeId: 3, firstName: 'Michael', lastName: 'Johnson', phoneNumber: '555-345-6789', emailAddress: 'michael.johnson@example.com' },
        { employeeId: 4, firstName: 'Emily', lastName: 'Williams', phoneNumber: '555-456-7890', emailAddress: 'emily.williams@example.com' },
        { employeeId: 5, firstName: 'David', lastName: 'Brown', phoneNumber: '555-567-8901', emailAddress: 'david.brown@example.com' },
        { employeeId: 6, firstName: 'Sarah', lastName: 'Jones', phoneNumber: '555-678-9012', emailAddress: 'sarah.jones@example.com' },
        { employeeId: 7, firstName: 'Robert', lastName: 'Garcia', phoneNumber: '555-789-0123', emailAddress: 'robert.garcia@example.com' },
        { employeeId: 8, firstName: 'Lisa', lastName: 'Miller', phoneNumber: '555-890-1234', emailAddress: 'lisa.miller@example.com' },
        { employeeId: 9, firstName: 'James', lastName: 'Davis', phoneNumber: '555-901-2345', emailAddress: 'james.davis@example.com' },
        { employeeId: 10, firstName: 'Maria', lastName: 'Rodriguez', phoneNumber: '555-012-3456', emailAddress: 'maria.rodriguez@example.com' },
    ];
}