var path = require('path')

var keys = require('../../../env/development');

var mandrill = require('mandrill-api/mandrill');
var swig = require('swig');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var mandrillClient = new mandrill.Mandrill(keys.MANDRILL.api);

//confirmation emails

var extreme = {
  tag: "Exxxtreme",
  from: "Exxxtreme",
  email: "gluedonhorns@gmail.com",
  confirmSubj: "Your order has been confirmed",
  updateSubj: "Your order status has been updated"
};

var sendEmail = function sendEmail(order, subject, message_html) {
  var message = {
      "html": message_html,
      "subject": subject,
      "from_email": extreme.email,
      "from_name": extreme.from,
      "to": [{
              "email": order.email,
              "name": order.name
          }],
      "important": false,
      "track_opens": true,    
      "auto_html": false,
      "preserve_recipients": true,
      "merge": false,
      "tags": [
          extreme.tag
      ]    
  };
  //console.log(message);
  var async = false;
  var ip_pool = "Main Pool";
  mandrillClient.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
      console.log('email sent!!!');   
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

// function renderTemp(templateFilename, order) {
//   console.log(templateFilename);
//   return fs.readFileAsync(templateFilename)
//   .then(function (contents) {
//     return ejs.render(contents, order);
//   });
// }

function renderTemp(templateFilename, order) {
  templateFilename = __dirname + templateFilename;
  fs.readFile(templateFilename, function (err, contents) {
    contents = contents.toString();
    if (err) console.log("readfile error:", err);
    console.log("ORDER", order);
    var renderedTemp = swig.render(contents, {locals: {order: order}});
    //console.log("REDNERED:", renderedTemp);
    //sendEmail(order, extreme.updateSubj, renderedTemp);
  });
  // .then(function (contents) {
  //   return ejs.render(contents, order);
  // });
}



var confirmEmail = function (order) {
  renderTemp('/confirmTemp.html', order)
  // .then(function (renderedHtml) {
  //   sendEmail(order, extreme.confirmSubj, renderedHtml);
  // });
};

var updateEmail = function (order) {
  renderTemp('updateTemp.html', order)
  .then(function (renderedHtml) {
    console.log('sending email...')
    sendEmail(order, extreme.updateSubj, renderedHtml);
  });
};




module.exports = {
  updateEmail: updateEmail,
  confirmEmail: confirmEmail
};

