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
                console.log(this.contacts);
            })
            .catch(error => {
                console.error(error);
            })
    }

    /** Table Coulns
     * Type is case sensative
     * typeAttributes : 
     * menuAlignment ; will be right or left based on click so thats why I have 
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
            }
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
            }
        },

        {
            label: "Phone",
            fieldName: "Phone",
            type: "phone"
        }
        ,
        {
            label: "Email",
            fieldName: "Email",
            type: "email"
        },
        {
            label: "Street",
            fieldName: "street"
        }
        ,
        {
            label: "City",
            fieldName: "city"
        },
        {

            label: "State",
            fieldName: "state"
        },
        {
            label: "Country",
            fieldName: "country"
        },
        {
            label: "PostalCode",
            fieldName: "postalCode"
        },
        {
            label: 'Action',
            type: 'action',
            typeAttributes: {
                rowActions: this.rowActions,
                menuAlignment: 'auto'
            }
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
}