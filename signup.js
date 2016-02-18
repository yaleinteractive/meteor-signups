// This code executes on the client and on the server

// Declare a collection in the Mongo database
var Signups = new Mongo.Collection("signups");


// This code executes only on the client

if (Meteor.isClient) {
  
  Template.body.helpers({
     
    // The signups helper returns a list of the signups.
    // Find all the signups in the database and return them.
    signups: function() {
        return Signups.find({}, {sort: {time: 1}}); 
    }
     
  });
  
  Template.signup.helpers({
    
    pattern: function() {
      
      var pattern = '... ';
      var i = 0;
      while (i < this.github.length) {
        pattern += '<u>' + this.github.charAt(i) + '</u>';
        pattern += this.name.charAt(i);
        i += 1;
      }
      pattern += ' ...';
      return pattern;
      
    }
    
  });
  
  Template.signup.events({
    
    // This function is called whenever there is a click
    // event on a delete link in the "signup" template
    "click .delete": function(event) {
      
      // Tell the browser not to do its default behavior 
      // (which would try to link somewhere)
      event.preventDefault();

      // Using the Mongo id of this template's object, tell Mongo
      // to remove the object from the database
      Signups.remove(this._id);
      
    }
    
  });

  Template.new.events({
    
    // This function is called whenever there is a submit
    // event in the "new" template
    "submit": function(event) {
      
      // Tell the browser not to do its default behavior 
      // (which would reload the page)
      event.preventDefault();
      
      // Get the <form> HTML element (which by definition is
      // the target of the submit event)
      var form = event.target;
      
      // Insert a signup into the database collection
      Signups.insert({
        name: form.name.value,
        color: form.color.value,
        github: form.github.value,
        time: form.time.value,
      });
      
      // Clear the text fields
      form.name.value = '';
      form.color.value = '';
      form.github.value = '';
      form.time.value = '';

      // Focus the name field
      form.name.focus();
      
    }
    
  });
  
}
