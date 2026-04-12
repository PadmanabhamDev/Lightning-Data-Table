public with sharing class ContactController {
    
    //get Contact details
    @AuraEnabled
    public static List<Contact> getContact(){
        try {
            return [SELECT Id,Name,Account.Name,Email, FirstName, LastName,Phone, MailingAddress FROM Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}

