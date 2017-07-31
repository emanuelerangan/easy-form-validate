/*! jQuery Validation Plugin - v1.0.0 - 8/1/2017
 * https://github.com/emanuelerangan
 * Copyright (c) 2017 Emanuele Rangan; Licensed MIT */

var validateOptions = {
	rules: {
		min: {
			phoneUS:true,
			required:true
		},
		vkey: {
			digits:true,
			required: true
		}
	},
	messages: {
		global : {
			required: "This field is required.",
			digits: "Please enter only digits."
		},
		min: {
			email:"This is not a real email address",
			phoneUS:"Please specify a valid phone number",
			digits:"Numbers only please"
		}
	},
}

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

$.fn.validate = function( options ) {

	var form = this;
	var errorsObj = {};
	var formValidationObj = {}

	// create the global obj errorsObj, which contains all the possible error messages for each DOM field within the form
	function buildValidation(options) {
		var opts = typeof options != 'undefined' ? options : typeof validateOptions != 'undefined' ? validateOptions : null;

		if (opts != null) {
			$.each(opts.rules, function(key) {
				var singleInputRules = this;
				if ($('[name="' + key + '"]').length) {
					$.each(singleInputRules, function(_ruleName) { 
						var ruleName = _ruleName,
							msg;

						if (typeof opts.messages.global != 'undefined' && opts.messages.global.hasOwnProperty(ruleName)) {
							msg = opts.messages.global[ruleName]
						}
						else if (typeof opts.messages[key] != 'undefined' && opts.messages[key].hasOwnProperty(ruleName)) {
							msg = opts.messages[key][ruleName]
						}

						errorsObj[key] = errorsObj[key] ? errorsObj[key] : {}

						errorsObj[key][ruleName] = {'msg': msg}
						formValidationObj[key] = true;
					})
				}
			})
		}
		else {
			console.warn('Please specify an options object! $(form).validate(options)')
		}
	}

	function fullValidate() {
		$.each(errorsObj,function(key) {
			var field = $('[name="' + key + '"]')
			var fieldName = field.attr('name');

			var isValidInput = true;
			$.each(this,function(ruleName) {

				var nextField = field.next();
				var isValidRule	= validateMethods[ruleName](field);

				isValidInput = (isValidInput && isValidRule)

				// set boolean validation for each input
				formValidationObj[fieldName] = isValidInput;

				if (typeof validateMethods[ruleName] == 'function' && !isValidRule) {
					if (!nextField.hasClass('error')) {
						field.after('<span class="error" style="color:#ED4337">' + this.msg + '</span>')
					}
					else {
						nextField.html(this.msg)
					}
				}

				if (typeof validateMethods[ruleName] == 'function' && isValidInput) { // nextField.hasClass('error')
					(nextField.hasClass('error')) ? nextField[0].innerHTML = '' : field.after('<span class="error" style="color:#ED4337"></span>')
				}

			})
		})
	}

	function validateField(field) {
		var fieldName = field.attr('name');

		// there's a possible error for the input with name fieldName
		if (typeof errorsObj[fieldName] != 'undefined' && errorsObj[fieldName]) {
			
			var isValidInput = true;
			$.each(errorsObj[fieldName],function(ruleName) {

				var nextField 	= field.next();
				var isValidRule	= validateMethods[ruleName](field);
				isValidInput = (isValidInput && isValidRule)
				
				// set boolean validation for each input
				formValidationObj[fieldName] = isValidInput;


				if (typeof validateMethods[ruleName] == 'function' && !isValidRule) {
					if (!nextField.hasClass('error')) {
						field.after('<span class="error" style="color:#ED4337">' + this.msg + '</span>')
					}
					else {
						nextField[0].innerHTML = this.msg
					}
				}

				if (typeof validateMethods[ruleName] == 'function' && isValidInput) {
					(nextField.hasClass('error')) ? nextField[0].innerHTML = '' : field.after('<span class="error" style="color:#ED4337"></span>')
				}
			})
		}
	}

	function handleSubmit(form) {
		errorsObj && fullValidate();
		var isValidForm = true;
		$.each(formValidationObj,function(key) {
			!formValidationObj[key] && (isValidForm = false)
		})
		isValidForm && form.submit();
	}

	buildValidation(options);

	form.on('submit', function(event) {
		event.preventDefault();
		handleSubmit(this);
	})

	form.find('input, textarea, select').each(function() {
		console.log('type: ,', $(this).attr('type'))

		if ($(this).attr('type') != 'hidden') {
			$(this).on('propertychange change click keyup input paste keypress',function() {
				validateField($(this))
			})
		}
	})
};

$(document).ready(function() {
	$('form').eq(0).validate()
})