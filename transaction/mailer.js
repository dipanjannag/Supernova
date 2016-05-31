var sendgrid  = require('sendgrid')('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');


var send_signup_mail = function(name, email){
	var body_html = "Thank you for signing up. Please click the following link to confirm your email id <a href=\"#\">activation link</a>";
	var cardEmail = new sendgrid.Email({
		to: email,
		from: "admin@shortrip.com",
		subject: "Thank You for signing up for Shortrip",
		html: body_html, // This fills out the <%body%> tag inside your SendGrid template
	});

	// Tell SendGrid which template to use, and what to substitute. You can use as many substitutions as you want.
	cardEmail.setFilters({"templates": {"settings": {"enabled": 1, "template_id": "86127c4b-726c-4c30-b108-a645e11d7a38"}}}); // Just replace this with the ID of the template you want to use
	cardEmail.addSubstitution('%name%', name); // You don't need to have a subsitution, but if you want it, here's how you do that :)

	// Everything is set up, let's send the email!
	sendgrid.send(cardEmail, function(err, json){
		if (err) {
		  console.log(err);
		} else {
		  console.log('Email sent!');
		}
	});
}

send_signup_mail('Dipanjan','ping@dipanjan.me');
