# Easy Form Validate
Easy to use form validation

Since this is a non-tested version, please feel free to suggest any improvement, correction by sending it to emanuelerangan@gmail.com


* Include the mandatory libraries:
```
<script src="jquery-3.2.1.min.js"></script>
<script src="validate.js"></script>

```



* Create a new object called "validateOptions" as follows:

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


* and a methods object as follows (adding all the methods you need):
```
var validateMethods = {
	required: function(input) {
		var val = input.val();
		return val.trim() != '';
	},
	phoneUS: function(input) {
		var val = input[0].value
		return (val.length > 9 && /^(1-?)?(\([0-9]\d{2}\)|[0-9]\d{2})-?[0-9]\d{2}-?\d{4}$/.test(val));
	},
	digits: function(input) {
		var val = input.val();
		return /^\d+$/.test(val);
	},
}
```

* then simply call the plugin after dom is ready:

```
$(document).ready(function() {
	$('form').eq(0).validate()
})
```
