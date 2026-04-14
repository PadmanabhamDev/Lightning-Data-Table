public with sharing class ContactController {
    
    //get Contact details
    @AuraEnabled
    public static List<Contact> getContact(){
        try {
            return [SELECT Id, Name, Account.Name, Email, FirstName, LastName,LeadSource, Phone, MailingAddress FROM Contact ORDER BY Name ASC];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}

