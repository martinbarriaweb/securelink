document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#btnAll")
    .addEventListener("click", getAllLinks, false);
  document
    .querySelector("#btnUnsecure")
    .addEventListener("click", getUnsecureLinks, false);
  document
    .querySelector("#btnSecure")
    .addEventListener("click", getSecureLinks, false);

  //ALL LINKS FUNCTION
  function getAllLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "all", setCountAll);
    });
  }
  function setCountAll(res) {
    clean();
    disabledButtons();
    $("#loadingAll").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      $("#loadingAll").addClass("none");
      $("#txtAll").removeClass("none");
      if (res) {
        $("#txtAll").html(`This page have ${res.count} Links`);
      } else {
        $("#txtAll").html(`This page not have links`);
      }
    }, 1000);
  }

  //UNSECURES FUNCTION
  function getUnsecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "unsecure", setCountUnsecure);
    });
  }
  function setCountUnsecure(res) {
    clean();
    disabledButtons();
    $("#loadingUnsecure").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      $("#loadingUnsecure").addClass("none");
      $("#txtUnsecure").removeClass("none");
      if (res) {
        $("#txtUnsecure").html(`This page have ${res.count} Unsecure Links`);
      } else {
        $("#txtUnsecure").html(`This page not have links`);
      }
    }, 1000);
  }

  //SECURES FUNCTION
  function getSecureLinks() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "secure", setCountSecure);
    });
  }
  function setCountSecure(res) {
    clean();
    disabledButtons();
    $("#loadingSecure").removeClass("none");
    setTimeout(() => {
      enabledButtons();
      $("#loadingSecure").addClass("none");
      $("#txtSecure").removeClass("none");
      if (res) {
        $("#txtSecure").html(`This page have ${res.count} Secure Links`);
      } else {
        $("#txtSecure").html(`This page not have links`);
      }
    }, 1000);
  }

  function disabledButtons() {
    $("#btnUnsecure").attr("disabled", true);
    $("#btnSecure").attr("disabled", true);
    $("#btnAll").attr("disabled", true);
  }

  function enabledButtons() {
    $("#btnUnsecure").attr("disabled", false);
    $("#btnSecure").attr("disabled", false);
    $("#btnAll").attr("disabled", false);
  }

  //CLEAN ALL LINKER TEXTS
  function clean() {
    $("#txtAll").addClass("none");
    $("#txtUnsecure").addClass("none");
    $("#txtSecure").addClass("none");
    $("#loadingUnsecure").addClass("none");
    $("#loadingSecure").addClass("none");
    $("#loadingAll").addClass("none");
  }
});
