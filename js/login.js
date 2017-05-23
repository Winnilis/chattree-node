var LoginModalController = {
    tabsElementName: ".logmod__tabs li",
    tabElementName: ".logmod__tab",
    inputElementsName: ".logmod__form .input",
    hidePasswordName: ".hide-password",

    inputElements: null,
    tabsElement: null,
    tabElement: null,
    hidePassword: null,

    activeTab: null,
    tabSelection: 0, // 0 - first, 1 - second

    findElements: function () {
        var base = this;

        base.tabsElement = $(base.tabsElementName);
        base.tabElement = $(base.tabElementName);
        base.inputElements = $(base.inputElementsName);
        base.hidePassword = $(base.hidePasswordName);

        return base;
    },

    setState: function (state) {
        var base = this,
            elem = null;

        if (!state) {
            state = 0;
        }

        if (base.tabsElement) {
            elem = $(base.tabsElement[state]);
            elem.addClass("current");
            $("." + elem.attr("data-tabtar")).addClass("show");
        }

        return base;
    },

    getActiveTab: function () {
        var base = this;

        base.tabsElement.each(function (i, el) {
            if ($(el).hasClass("current")) {
                base.activeTab = $(el);
            }
        });

        return base;
    },

    addClickEvents: function () {
        var base = this;

        base.tabsElement.on("click", function (e) {
            var targetTab = $(this).attr("data-tabtar");

            e.preventDefault();
            base.activeTab.removeClass("current");
            base.activeTab = $(this);
            base.activeTab.addClass("current");

            base.tabElement.each(function (i, el) {
                var $el = $(el);
                $el.removeClass("show");
                if ($el.hasClass(targetTab)) {
                    $el.addClass("show");
                }
            });
        });

        base.inputElements.find("label").on("click", function (e) {
            var $this = $(this),
                $input = $this.next("input");

            $input.focus();
        });

        return base;
    },

    initialize: function () {
        var base = this;

        base.findElements().setState().getActiveTab().addClickEvents();
    }
};

var forms = {
    setLoginSubmit: function () {
        $('#login-form').submit(function (e) {
            e.preventDefault();

            var data = {
                user: $('#login-form-user')[0].value,
                password: $('#login-form-password')[0].value
            };

            $.post('/api/login', data)
                .done(function (data) {
                    resetErrors();
                    if (!data.result) {
                        switch (data.reason) {
                            case 'account.not.found':
                                $('#login-form-user').css('border-bottom-color', 'red');
                                $('#login-form-user-error').css('visibility', 'visible');
                                break;
                            case 'wrong.password':
                                $('#login-form-password').css('border-bottom-color', 'red');
                                $('#login-form-password-error').css('visibility', 'visible');
                                break;
                            default:
                        }
                        return false;
                    }
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('password', data.password);
                    window.location.href = '/index/';
                })
        });
    },

    setSignupSubmit: function () {
        $('#signup-form').submit(function (e) {
            e.preventDefault();

            var data = {
                email: $('#signup-form-email')[0].value,
                password: $('#signup-form-password')[0].value,
                confirmation: $('#signup-form-confirmation')[0].value
            };

            $.post('/api/new_account', data).done(function (data) {
                resetErrors();
                if (!data.result) {
                    switch (data.reason) {
                        case 'email.already.used':
                            $('#signup-form-email').css('border-bottom-color', 'red');
                            $('#signup-form-email-error').css('visibility', 'visible');
                            break;
                        case 'wrong.confirmation':
                            $('#signup-form-password').css('border-bottom-color', 'red');
                            $('#signup-form-confirmation').css('border-bottom-color', 'red');
                            $('#signup-form-confirmation-error').css('visibility', 'visible');
                            break;
                        default:
                    }
                    return false;
                }
                window.location.replace('/login');
            })
        });
    }
};

var resetErrors = function () {
    $('#login-form-user').css('border-bottom-color', '#CCC');
    $('#login-form-user-error').css('visibility', 'hidden');
    $('#login-form-password').css('border-bottom-color', '#CCC');
    $('#login-form-password-error').css('visibility', 'hidden');

    $('#signup-form-email').css('border-bottom-color', '#333');
    $('#signup-form-email-error').css('visibility', 'hidden');
    $('#signup-form-password').css('border-bottom-color', '#333');
    $('#signup-form-confirmation').css('border-bottom-color', '#333');
    $('#signup-form-confirmation-error').css('visibility', 'hidden');
};

$(document).ready(function () {
    LoginModalController.initialize();
    forms.setLoginSubmit();
    forms.setSignupSubmit();
});
