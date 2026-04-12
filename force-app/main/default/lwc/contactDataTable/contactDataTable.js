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
    //this methods is called when compomnent is inserted in dom
    getContacts() {
        getContact()
            .then(contacts => {
                contacts.forEach(contact => {
                    contact.AccountName = contact.Account?.Name;
                    contact.street = contact.MailingAddress?.street;
                    contact.City = contact.MailingAddress?.City;
                    contact.State = contact.MailingAddress?.State;
                    contact.Country = contact.MailingAddress?.Country;
                    contact.PostalCode = contact.MailingAddress?.PostalCode;
                });
                this.contacts = contacts;
                console.log(this.contacts);
            })
            .catch(error => {
                console.error(error);
            })
    }

    //Table Coulns
    columnsData = [
        { label: "ContactId", fieldName: "Id" },
        { label: "Account Name", fieldName: "AccountName" },
        { label: "Name", fieldName: "Name" },
        { label: "Phone", fieldName: "Phone" },
        { label: "Email", fieldName: "Email" },
        { label: "Street", fieldName: "street" },
        { label: "City", fieldName: "City" },
        { label: "State", fieldName: "State" },
        { label: "Country", fieldName: "Country" },
        { label: "PostalCode", fieldName: "PostalCode" },

    ]
}