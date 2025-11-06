
    const new_cookie_names = {
        ms_click_tracker: 'bh_mc_id',
    };

    function get_cookie(cookie_name) {
        let name = cookie_name + "=";
        let cookie_array = document.cookie.split(';');
        for (let i = 0; i < cookie_array.length; i++) {
            let c = cookie_array[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (new_cookie_names[cookie_name] && c.indexOf(new_cookie_names[cookie_name] + '=') === 0) {
                return c.substring(new_cookie_names[cookie_name].length + 1, c.length);
            } else if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    function set_cookie(cookie_name, cookie_value, expire_seconds, additional_param_info='') {
        let d = new Date();
        d.setTime(d.getTime() + (expire_seconds * 1000));
        let expires = "";
        if (expire_seconds != false) {
            expires = "expires=" + d.toUTCString();
        }
        if (new_cookie_names[cookie_name]) {
            cookie_name = new_cookie_names[cookie_name];
        }
        if (additional_param_info.length && additional_param_info.charAt(0) !== ';') {
            additional_param_info = ';' + additional_param_info;
        }
        document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/" + additional_param_info;
    }



        var page_info = {"locale":"en-KE","force_enable_language":false,"localizejs_language":"en","geo_country":"ke","week_starts_monday":false,"sites_fqdn":["www.mytherapist.com","www.teencounseling.com","www.betterhelp.com","www.betterhelporg.com","www.regain.us"],"redirect_sites_fqdn":["www.betterhelp.com","www.regain.us","www.teencounseling.com"],"show_cookie_banner":true,"ms_cookie_consent_settings":{"is_in_GB_EU":false,"ms_cookie_consent_required":true},"is_paypal_disabled":false,"redesigned_home":"betterhelp_two","account_recovery":false,"total_sessions":451352508,"total_therapists":32231,"total_members":6028592,"show_ukraine_support_modal":false,"app_version":"c085e475694065b5499","uniqid":"690c8309ab5c94.52767300","user_type":"logged_out_user","user_id":"559f7fdb0bfc4a99ee911d8941a0033931d84e830feb21263a0eea212c33017a9e0e898e83da61bce25961d69cb0cad6db7ef9d72d00d9e077f087fa3d90b972","template":"main","is_mobile":false,"is_app":false,"is_ios_app":false,"is_android_app":false,"user_app_version":null,"is_development_local":false,"is_development_cloud":false,"is_staging":false,"is_non_production_cloud":false,"is_qa_server":false,"features":{"specify_podcast":true,"sunsetting":false,"urgent_messages":true,"couples":false,"phone_calls":true,"secret_assign_straights":true,"livechat":true,"about":true,"counselor_application":true,"counselor_application_lean":false,"worksheets":true,"smart_match_with_categories":true,"groupinars":true,"group_sessions":true,"login_quotes":true,"videosessions":true,"app_supports_videosessions":true,"cloud_chat":true,"consent_agreement":true,"gmail_quick_action":true,"scheduling":true,"support_link":true,"no_trial":true,"strike_through_cake":true,"dollar_test_charge":true,"groupon":true,"mobgo":true,"mental":true,"funnel_smart_match":true,"funnel_overview":true,"offer_promo_codes":true,"email_verification_always":true,"reviews_page":true,"jobs_page":true,"security_logos_display":true,"social_links_display":true,"counselor-directory":true,"language_is_matching_hard_filter":false,"advice":true,"presskit":true,"press_page":true,"text_notifications":true,"goals":true,"goals_mobile_main_menu":false,"batch_creation":true,"ask_language":true,"parent_child_account":false,"hardcoded_testimonials":false,"friendly_funnel":true,"referral_program":true,"vouchers":true,"betterhelp_branded":true,"signup_captcha":true,"signup_repeat_password":false,"phone_on_mobile_signup":true,"cookie_consent_required":true,"journal":true,"maintenance_plan":true,"show_business_link":true,"show_impressum":true,"counselors_page":true},"date_time_formats":{"full":"F j, Y g:ia T","full_short_mo_no_tz":"M j, Y g:ia","date":"F j, Y","date_short_mo":"M j, Y","date_short_mo_int":"j M, Y","time":"g:ia","time_with_tz":"g:ia T","bh_date":"D, M j, Y \\a\\t g:ia T","bh_date_int":"D, j M, Y \\a\\t g:ia T","bh_date_full_day":"l, M j, Y \\a\\t g:ia T","bh_date_int_full_day":"l, j M, Y \\a\\t g:ia T","numeric_date_int":"d.m.Y"},"subdomain":"www","environment_name":null,"cdn_host_assets":"assets.betterhelp.com","cdn_host":"static.betterhelp.com","assets_app_version":"ab3ccb07d4f4","contrib_app_version":28,"env_image_tag":"20251106RC9c265b5499","product_code_name":"betterhelp","product_name":"BetterHelp","bh_address":"3155 Olsen Dr., Suite #375, San Jose, CA 95117","unix_timestamp":1762427657,"track_userid":"","coralogix_api_url":"https:\/\/api.coralogix.us\/api\/v1\/logs","coralogix_api_key":"cxtp_xLio15bMClZkt4QAxKEEOIKfFpDvku","coralogix_frontend_key":"cxtp_xLio15bMClZkt4QAxKEEOIKfFpDvku","coralogix_rumfrontend_key":"cxtp_ZN7InjlIyKqiTTDilrju0OSDLiv1UY","use_sentry":0,"msfrontend_logger_ignore_regex_useragent":"Googlebot\/2.1|RavenCrawler|Bytespider","msfrontend_logger_ignore_regex_eventmessage":"Script error\\.|ResizeObserver loop|Failed to write image to cache|Non-Error exception captured|Non-Error promise rejection captured|OpenTok:|Extension context invalidated|telephone","default_language_id":1,"csrf_token":"01ec211846a1ccfa1f7232404caea1bd6c9e6e73e4545b8b787a8c0c7aa4c587a84164e57d29946749cb9afabb8880ee5869b2a8b4bb1deef62cad74ef67569c","presignup_experiments":{"NEW_HOMEPAGE_VALUE_PROPS":"CONTROL","NEW_GET_STARTED_COPY_V1":"CONTROL"},"counselor_presignup_experiments":[],"eligible_for_iterable_push_notifications":false,"is_eligible_for_analytics":false,"showCancelMembership":false,"base64_encode_entries":false,"base64_encode_journals":false,"base64_encode_notes":false}
    

 zarazData = {"dataLayerIgnore":["OptanonLoaded","OneTrustLoaded"],"z_product_code_name":"betterhelp","z_cookieConsent":0} ; 

(function(w,d){{(function(w,d){})(window, document)}})(window,document)


    try {
        ;(function (p, l, o, w, i, n, g) {
            if (!p[i]) {
                p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
                p.GlobalSnowplowNamespace.push(i);
                p[i] = function () {
                    (p[i].q = p[i].q || []).push(arguments)
                };
                p[i].q = p[i].q || [];
                n = l.createElement(o);
                g = l.getElementsByTagName(o)[0];
                n.async = 1;
                n.src = w;
                g.parentNode.insertBefore(n, g)
            }
        }(window, document, "script", "//static.betterhelp.com/js/contrib/sp/H9R1GshL.js?v=28", "snowplow"));

        snowplow('newTracker', 'multisite', 'https://events.betterhelp.com', {
            appId: '2',
            discoverRootDomain: true,
            cookieSameSite: 'Lax', // Recommended
            contexts: {
                webPage: true // default, can be omitted
            }
        });
        var user_type = page_info.user_type;
        if (user_type == 'logged_out_user') {
            // in the PHP code, we send 'logged_out' to Snowplow
            user_type = 'logged_out';
        }
        snowplow('addGlobalContexts', [{
            schema: "iglu:com.betterhelp/user/jsonschema/1-0-3",
            data: {
                user_type: user_type,
                language: document.documentElement.lang,
            }
        }]);
        if (page_info.user_id && Number.isInteger(page_info.user_id) && page_info.user_id > 0) {
            snowplow('setUserId', page_info.user_id)
        }
        snowplow('enableActivityTracking', {
            minimumVisitLength: 30,
            heartbeatDelay: 10
        });
        snowplow('trackPageView');
        var snowplow_global = null;
        snowplow(function () {
            snowplow_global = this.multisite;
        });
    }
    catch (e) {
        console.log(e);
    }



 { "@context": "http://schema.org",
 "@type": "Organization",
 "name": "BetterHelp",
 "url": "https://www.betterhelp.com",
 "logo": "/images/logo.png?v=ab3ccb07d4f4",
 "foundingDate": "2013",
 "founders": [
 {
 "@type": "Person",
 "name": "Alon Matas"
 },
 {
 "@type": "Person",
 "name": "Danny Bragonier"
 } ],
"potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.betterhelp.com/advice_search/?search={search_term}",
    "query-input": "required name=search_term" },
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "3155 Olsen Dr.",
 "addressLocality": "San Jose",
 "addressRegion": "CA",
 "postalCode": "95117",
 "addressCountry": "USA"
 },
 "contactPoint": {
 "@type": "ContactPoint",
 "contactType": "customer support",
 "email": "contact@betterhelp.com",
 "url": "https://www.betterhelp.com/contact/"
 },
 "sameAs": [
 "https://www.facebook.com/BetterHelp/",
 "https://twitter.com/betterhelp",
 "https://www.instagram.com/betterhelp/?hl=en",
 "https://www.linkedin.com/company/betterhelp-com",
 "https://www.pinterest.com/betterhelp/",
 "https://plus.google.com/117263820920114720157",
 "https://en.wikipedia.org/wiki/BetterHelp",
 "https://www.youtube.com/c/BetterHelp" ]}


(function(w,d){;w.zarazData.executed.push("Pageview");;w.zarazData.executed.push("836060a8-f41d-405c-b46e-fde261c71cfe");;w.zarazData.executed.push("NjwT");;w.zarazData.executed.push("b9e7cda6-9cbc-4865-94dd-e169befaa64b");;w.zarazData.executed.push("cVpV");;w.zarazData.executed.push("ifsc");;w.zarazData.executed.push("oiiO");;w.zarazData.executed.push("Betterhelp");;w.zarazData.executed.push("a0215340-1984-476a-be7b-34ef2973feef");;w.zarazData.executed.push("ea7b7665-40ad-4e96-8567-27df3874eb91");;w.zarazData.executed.push("NoPerformance");;w.zarazData.executed.push("NoTracking");})(window,document)

(function(w,d){{(function(w,d){})(window, document)}})(window,document)


            function remove_url_parameter(url, parameter) {
                //prefer to use l.search if you have a location/link object
                var url_parts= url.split('?');
                if (url_parts.length>=2) {
                    var prefix= encodeURIComponent(parameter)+'=';
                    var pars= url_parts[1].split(/[&;]/g);

                    //reverse iteration as may be destructive
                    for (var i= pars.length; i-- > 0;) {
                        //idiom for string.startsWith
                        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                            pars.splice(i, 1);
                        }
                    }

                    url= url_parts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
                    return url;
                } else {
                    return url;
                }
            }
            try {
                var clean_url = remove_url_parameter(window.location.href, 'email');
                clean_url = remove_url_parameter(clean_url, 'e');
                clean_url = remove_url_parameter(clean_url, 'pe');
                clean_url = remove_url_parameter(clean_url, 'pn');
                clean_url = remove_url_parameter(clean_url, 'organization_name');
                window.history.replaceState('', '', clean_url);
            }
            catch (e) {}
        


        if (typeof snowplow !== "undefined") {
            snowplow("trackStructEvent", {
                category: "homepage",
                action: "viewed"
            });
        }
    


                // Default for `logger` to ensure it is always defined
                window.logger = {
                    debug: () => {},
                    info: () => {},
                    warning: () => {},
                    error: () => {},
                }
            


    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();


jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});

jQuery.fn.bootstrap_tooltip = jQuery.fn.tooltip;


                    // Fix for android app trying to use sockets on pause/resume events without checking whether sockets are available on the given page
                    var socket = {
                        on: function() {
                            return false;
                        },
                        disconnect: function () {
                            return false;
                        },
                        emit: function () {
                            return false;
                        },
                        off: function () {
                            return false;
                        }
                    };

                    var reconnectSocket = function() {
                        return false;
                    }
                


        $(document).ready(function() {
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('link_expired')) {
                $('#modal-link-expired').modal('show');
            }
            if (page_info.product_code_name === 'betterhelp') {
                var counseling_type = null;
                var question_name = 'What type of therapy are you looking for?';
                $('.home-illus-button-group a').click(function() {
                    counseling_type = $(this).text().trim();
                    if (counseling_type.toLowerCase().indexOf("individual") > -1
                        && typeof BhEvents !== undefined) {
                        CounselingSelectedEvent("individual").send();
                    }
                });
                $('div[id^=refer_to]').on('shown.bs.modal', function () {
                    if (typeof snowplow !== "undefined") {
                        snowplow("trackStructEvent", {
                            category: "onboarding_redirect_modal",
                            action: "shown",
                            context: [
                                {
                                    schema: "iglu:com.betterhelp/onboarding-redirect-modal/jsonschema/1-0-0",
                                    data: {
                                        triggering_question_name: question_name,
                                        triggering_question_number: 0,
                                        modal_passable: "yes",
                                        proposed_domain: counseling_type
                                    }
                                }
                            ]
                        });
                    }
                });
                $('.redirect-button').on('click', function() {
                    var modal_response = $(this).text();
                    if (typeof snowplow !== "undefined") {
                        snowplow("trackStructEvent", {
                            category: "onboarding_redirect_modal",
                            action: "answered",
                            context: [
                                {
                                    schema: "iglu:com.betterhelp/onboarding-redirect-modal/jsonschema/1-0-0",
                                    data: {
                                        triggering_question_name: question_name,
                                        triggering_question_number: 0,
                                        modal_passable: 'yes',
                                        proposed_domain: counseling_type,
                                        modal_response: modal_response
                                    }
                                }
                            ]
                        });
                        var counseling_type = '';
                        if (modal_response.toLowerCase().indexOf("teen") > -1) {
                            counseling_type = "teen";
                        } else if (modal_response.toLowerCase().indexOf("couple") > -1) {
                            counseling_type = "couples";
                        }
                        if (typeof BhEvents !== undefined) {
                            CounselingSelectedEvent(counseling_type).send();
                        }
                    }
                });
                $('button[id^="dont-redirect"]').on('click', function() {
                    var modal_response = $(this).text();
                    if (typeof snowplow !== "undefined") {
                        snowplow("trackStructEvent", {
                            category: "onboarding_redirect_modal",
                            action: "answered",
                            context: [
                                {
                                    schema: "iglu:com.betterhelp/onboarding-redirect-modal/jsonschema/1-0-0",
                                    data: {
                                        triggering_question_name: question_name,
                                        triggering_question_number: 0,
                                        modal_passable: 'yes',
                                        proposed_domain: counseling_type,
                                        modal_response: modal_response
                                    }
                                }
                            ]
                        });
                        if (typeof BhEvents !== undefined) {
                            CounselingSelectedEvent("individual").send();
                        }
                    }
                });
            }
        });
    


        function addFormNonces() {
            var forms = document.querySelectorAll('form');
            for (var i = 0; i < forms.length; i++) {
                addFormNonce(forms[i]);
            }
        }

        function addFormNonce(form) {
            // Nonce unique per user per form with random identifier
            var nonce = page_info.user_type + ":" + page_info.user_id + ":" + form.getAttribute('id') + ":" + Date.now(),
                nonce_el = form.querySelector('[name=nonce]');

            if (nonce_el) {
                nonce_el.value = nonce;
            } else {
                nonce_el = document.createElement('input');
                nonce_el.type = 'hidden';
                nonce_el.name = 'nonce';
                nonce_el.value = nonce;
                form.appendChild(nonce_el);
            }
        }

        addFormNonces();
    


            // Workaround to wait until Snowplow is connected
            setTimeout(function () {
                BhStructEvent('privacy', 'banner_viewed').send()
            }, 1000);
        