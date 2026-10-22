//<script type="text/javascript">
var tcImplicit = 0; // set to 1 for implicit consent
var tcImplicitClick = 0; // set to 1 for implicit consent on click
var tcImplicitScroll = 0; // set to 1 for implicit consent on scroll
var tcReloadContainer = 0; // set to 1 to reload all containers immediately upon privacy change
var tcScrollPercentage = 0; // enter the percentage of scroll necessary to trigger implicit consent
var tcTrustTrigger = 1; // set to 1 if you want to fire a trigger upon privacy change
var tcTrustTriggerName = "consentGiven"; // name of the trigger
var tcImplicitType = "Opt-OUT"; // the type of implicit consent

var tcGetScrollPercent = function () {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};
var reloadAllContainers = function () {
  if (
    Array.isArray(window.tc_containers_URLs) &&
    typeof tC.script.add === "function"
  ) {
    window.tc_containers_URLs.map(function (elem) {
      tC.script.add(elem);
    });
  } else {
    console.log("Cannot reload containers");
    console.log(
      "tag 'Commanders Act - Containers URL saver' has a problem or it's missing",
    );
  }
};
var optinAndReload = function (actionType) {
  tC.privacy.In(0, tC.privacyVersion, "ALL", "ALL", actionType);
  reloadAllContainers();
};
var removeBanner = function () {
  if (document.getElementById("tc-privacy-wrapper")) {
    var x = document.getElementById("tc-privacy-wrapper");
    x.parentNode.removeChild(x);
  }
  if (document.querySelector("#privacy-overlay-banner")) {
    var y = document.querySelector("#privacy-overlay-banner");
    document.body.removeChild(y);
  }
};

if (tcImplicitClick) {
  document
    .querySelector("body")
    .addEventListener("mousedown", function (event) {
      if (event.target.id && event.target.id.indexOf("tc_privacy") > -1) {
        return;
      }
      if (tC.getCookie("TC_PRIVACY")) {
        return;
      }
      if (
        document.getElementById("tc-privacy-wrapper") &&
        document.getElementById("tc-privacy-wrapper").contains(event.target)
      ) {
        return;
      }
      if (
        document.getElementById("privacy-iframe") &&
        document.getElementById("privacy-iframe").contains(event.target)
      ) {
        return;
      }
      removeBanner();
      if (
        tcTrustTrigger &&
        tcTrustTriggerName &&
        typeof tC.event[tcTrustTriggerName] == "function"
      ) {
        tC.event[tcTrustTriggerName](this, { optinEvent: "scroll" });
      }
      if (tcImplicitType == "Opt-IN") {
        optinAndReload("click");
      } else {
        optOUTandReload("click");
      }
    });
}

if (tcImplicitScroll) {
  var optinOnScroll = function () {
    if (tC.getCookie("TC_PRIVACY")) {
      return;
    }
    if (tcGetScrollPercent() >= tcScrollPercentage) {
      removeBanner();
      window.removeEventListener("scroll", optinOnScroll, true);
      if (
        tcTrustTrigger &&
        tcTrustTriggerName &&
        typeof tC.event[tcTrustTriggerName] == "function"
      ) {
        tC.event[tcTrustTriggerName](this, { optinEvent: "scroll" });
      }
      if (tcImplicitType == "Opt-IN") {
        optinAndReload("scroll");
      } else {
        optOUTandReload("scroll");
      }
    }
  };
  window.addEventListener("scroll", optinOnScroll, true);
}
window.tc_closePrivacyCenter = function (mode) {
  if (mode !== "save") return; // if the user closes with the cross we don't want to remove the banner
  removeBanner();
  if (
    tcTrustTrigger &&
    tcTrustTriggerName &&
    typeof tC.event[tcTrustTriggerName] == "function"
  ) {
    tC.event[tcTrustTriggerName](this, { optinEvent: "banner_accept_button" });
  }
  if (reloadContainer) {
    reloadAllContainers();
  }
  if (document.querySelector("#privacy-overlay-banner")) {
    var y = document.querySelector("#privacy-overlay-banner");
    document.body.removeChild(y);
  }
};
window.tc_closePrivacyButton = function () {
  removeBanner();
  if (
    tcTrustTrigger &&
    tcTrustTriggerName &&
    typeof tC.event[tcTrustTriggerName] == "function"
  ) {
    tC.event[tcTrustTriggerName](this, { optinEvent: "privacy_center" });
  }
  if (tcReloadContainer) {
    reloadAllContainers();
  }
  if (document.querySelector("#privacy-overlay-banner")) {
    var y = document.querySelector("#privacy-overlay-banner");
    document.body.removeChild(y);
  }

  //--------------------------> updated on the error fix
  /* 
    if(tcTrustTrigger && tcTrustTriggerName && typeof tC.event[tcTrustTriggerName] == 'function'){
		tC.event[tcTrustTriggerName](this,{"optinEvent":"privacy_center"});
	}
    */

  if (tcReloadContainer) {
    reloadAllContainers();
  }
  /* 
   if(document.querySelector("#privacy-overlay-banner")){
      var y = document.querySelector("#privacy-overlay-banner");
      document.body.removeChild(y);
    }
    */
};
var tCPrivacyTagManager = "gtm";
//</script>
