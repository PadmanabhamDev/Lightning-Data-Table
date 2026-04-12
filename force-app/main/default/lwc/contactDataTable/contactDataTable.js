import { LightningElement, wire } from 'lwc';
import getContact from '@salesforce/apex/ContactController.getContact';

export default class ContactDataTable extends LightningElement {

    contacts = [];
    contactsData = [];

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
     *  
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

    ]
}