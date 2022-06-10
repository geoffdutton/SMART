/* eslint-disable no-undef */
import "bootstrap-sass/assets/javascripts/bootstrap";
import "./images/SMART-logo_shadow_white_horz.png";
import "./images/SMART_logo32x32_bw.ico";
import "./utils/jquery.formset.js";

import "d3";
import "nvd3";

import { getCookie } from "./utils/fetch_configs.js";
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        }
    }
});
