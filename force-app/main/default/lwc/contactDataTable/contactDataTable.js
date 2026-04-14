import { LightningElement, wire } from 'lwc';
import getContact from '@salesforce/apex/ContactController.getContact';

export default class ContactDataTable extends LightningElement {

    contacts = [];
    contactsData = [];

    /**
     * Table Row Actions
     */
    rowActions = [
        {
            label: 'View',
            name: 'view'
        },
        {
            label: 'Edit',
            name: 'edit'
        },
        {
            label: 'Delete',
            name: 'delete'
        }
    ]

    // @wire(getContact)
    // getContact(data,error){
    //     if(data){
    //         this.contacts = data.map(contact =>{
    //             return{
    //                 ...contact,
    //                 contact.AccountName = contact.Account ? contact.Account.Name : '',
    //                 contact.street = contact.MailingAddress ? contact.MailingAddress.street : '',
    //                 contact.City = contact.MailingAddress ? contact.MailingAddress.city : '',
    //                 contact.State = contact.MailingAddress ? contact.MailingAddress.state : '',
    //                 contact.Country = contact.MailingAddress ? contact.MailingAddress.country : '',
    //                 contact.PostalCode = contact.MailingAddress ? contact.MailingAddress.postalCode : ''
    //             }
    //         })
    //     }
    // }


    connectedCallback() {
        this.getContacts();
    }
    /** this methods is called when compomnent is inserted in dom 
     *  ? is know as optional chaining 
     * In apex known as safe navigation
     * 
     * 
     * 
    */
    getContacts() {
        getContact()
            .then(contacts => {
                contacts.forEach(contact => {
                    contact.ContactURL = '/' + contact.Id;
                    contact.AccountURL = '/' + contact.Account?.Id
                    contact.AccountName = contact.Account?.Name;
                    contact.Name = contact.Name;
                    contact.Email = contact.Email;
                    contact.street = contact.MailingAddress?.street;
                    contact.city = contact.MailingAddress?.city;
                    contact.state = contact.MailingAddress?.state;
                    contact.country = contact.MailingAddress?.country;
                    contact.postalCode = contact.MailingAddress?.postalCode;
                });
                this.contacts = contacts;
                this.originalContacts = contacts;
                console.log(this.contacts);
            })
            .catch(error => {
                console.error(error);
            })
    }

    /** sorting Attributes */
    sortedBy = 'Name';
    sortedDirection = 'asc';
    defaultSortDirection = 'asc';

    /** Table Coulns
     * Type is case sensative
     * typeAttributes : 
     * menuAlignment ; will be right or left based on click so thats why I have 
     * 
     * 
     */

    columnsData = [
        {
            label: "Name",
            fieldName: "ContactURL",
            type: 'url',
            typeAttributes: {
                label: {
                    fieldName: 'Name',
                },
                targets: '_blank',
                tooltip: 'View Contact'
            },
            sortable: true,
            wrapText: true,//action on header
            hideDefaultActions: true
        },
        {
            label: "Account Name",
            fieldName: "AccountURL",
            type: 'url',
            typeAttributes: {
                label: {
                    fieldName: 'AccountName',
                },
                targets: '_blank',
                tooltip: 'View Account'
            },
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        },

        {
            label: "Phone",
            fieldName: "Phone",
            type: "phone",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        }
        ,
        {
            label: "Email",
            fieldName: "Email",
            type: "email",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        },
        {
            label: "Lead Source",
            fieldName: 'LeadSource',
            sortable: true,
            wrapText: true,
            hideDefaultActions: true,
            actions: [
                { label: 'All', checked: true, name: 'all' },
                { label: 'Web', checked: false, name: 'web' },
                { label: 'Phone Inquiry', checked: false, name: 'Phone Inquiry' },
                { label: 'Partner Referral', checked: false, name: 'Partner Referral' },
                { label: 'Purchased List', checked: false, name: 'PPurchased List' },
                { label: 'Other', checked: false, name: 'Other' },
                { label: 'Trade Show', checked: false, name: 'Trade Show' },
                { label: 'External Referral', checked: false, name: 'External Referral' },
                { label: 'Partner', checked: false, name: 'Partner' },
                { label: 'Public Relations', checked: false, name: 'Public Relations' },
                { label: 'Word of mouth', checked: false, name: 'Word of mouth' },
                { label: 'External Referral', checked: false, name: 'External Referral' },
            ]
        },
        {
            label: "Street",
            fieldName: "street",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        }
        ,
        {
            label: "City",
            fieldName: "city",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        },
        {

            label: "State",
            fieldName: "state",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        },
        {
            label: "Country",
            fieldName: "country",
            sortable: true,
            wrapText: true,
            hideDefaultActions: true
        },
        {
            label: "PostalCode",
            fieldName: "postalCode",
            sortable: true,
            wrapText: true,//action on header
            hideDefaultActions: true
        },
        {
            label: 'Action',
            type: 'action',
            typeAttributes: {
                rowActions: this.rowActions,
                menuAlignment: 'auto'
            },
            sortable: true,
        }

    ];

    /** This method will be called row action is clicked to implement  to implement add onrowAction*/
    handleRowAction(event) {
        console.log('line 155');
        //console.log(event.detail);
        const { action, row } = event.detail;
        console.log(row);
        switch (action?.name) {
            case 'view':
                console.log('view');
                break;
            case 'edit':
                console.log('edit');
                break;
            case 'delete':
                console.log('delete');
                break;
            default:
                break;
        }
    }

    sortBy(field, reverse) {
        return (a, b) => {
            let aVal = this.primer(field, a);
            let bVal = this.primer(field, b);

            // handle undefined/null
            aVal = aVal || '';
            bVal = bVal || '';

            if (aVal === bVal) return 0;
            return reverse * (aVal > bVal ? 1 : -1);
        };
    }
    /**
     * a and b -> contact records
     * >
     */

    // * Helper method for sortBy method
    primer(field, record) {
        let returnValue;
        switch (field) {
            case 'ContactURL':
                returnValue = record['Name'];
                break;
            case 'AccountURL':
                returnValue = record['AccountName'];
                break;
            default:
                returnValue = record[field];
                break;
        }
        return returnValue;
    }

    handleSortAction(event) {
        console.log(event.detail);
        const { fieldName: sortedBy, sortDirection: sortedDirection } = event.detail;
        const cloneContacts = [...this.contacts];//spread operator which will help to copy
        cloneContacts.sort(this.sortBy(sortedBy, sortedDirection === 'asc' ? 1 : -1));
        this.contacts = cloneContacts;
        this.sortedBy = sortedBy;
        this.sortedDirection = sortedDirection;
    }

    handleHeaderAction(event) {

        const { action, columnDefinition } = event.detail;
        const contactColumns = this.columnsData;
        console.log('line 276' + JSON.stringify(contactColumns));
        const actions = contactColumns.find(contactColumn => contactColumn.fieldName === columnDefinition.fieldName)?.actions;
        //console.log(JSON.stringify(actions));
        if (actions) {
            actions.forEach(currectAction => {
                currectAction.checked = currectAction.name === action.name;
            });
            this.columnsData = [...contactColumns];
            if (action.name === 'all') {
                this.contacts = this.originalContacts;
            } else {
                this.contacts = this.originalContacts.filter(contact => contact.LeadSource === action.label);
            }
        }


    }

}