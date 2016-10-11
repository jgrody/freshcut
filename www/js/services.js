angular.module('app.services', [])

.factory('popupFactory', ['$ionicPopup', function($ionicPopup){
    return {
        confirm: function(options){
            var defaults = {
                cancelText: 'No',
                okText: 'Yes'
            }
            
            return $ionicPopup.confirm(angular.extend({}, defaults, options));
        }
    }
}])

.service('Validator', [function(){
    return {
        phoneIsValid: function(num){
            var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
            var digits = num.replace(/\D/g, "");
            return digits.match(phoneRe) !== null;
        },
        
        validate: function(type, object){
            switch(type){
                case 'phone':
                    var valid = this.phoneIsValid(object);
                    return object && object.length && valid;
                case 'name':
                    return object && object.length;
                case 'existence':
                    return object && object.length;
            }
        },
        
        setNameErrors: function(name){
            var errors = {};
            
            if (name.length){
                errors.name = "";
            } else {
                errors.name = "Name is a required field";
            }
            
            return errors.name;
        },
        
        setPhoneErrors: function(phone){
            var errors = {};
            var isValid = this.phoneIsValid(phone);
       
            if (phone.length){
                errors.phone = "Phone number is a required field"
            }
        
            if (!isValid) {
                errors.phone = "Phone number is invalid";
            }
        
            if (phone.length && isValid){
                errors.phone = "";
            }
            
            return errors.phone;
        }
    }
}]);