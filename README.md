# Easy Form Validate
Easy to use form validation

Create a new object called "validateOptions" as follows:

```
var validateOptions = {
	rules: {
		input1: {
			phoneUS:true,
			required:true
		},
		input2: {
			digits:true,
			required: true
		}
	},
	messages: {
		global : {
			required: "This field is required.",
			digits: "Please enter only digits."
		},
		input1: {
			email:"This is not a real email address",
			phoneUS:"Please specify a valid phone number",
			digits:"Numbers only please"
		},
    input2: {
			phoneUS:"Please specify a valid phone number"
		}
	},
}
```
