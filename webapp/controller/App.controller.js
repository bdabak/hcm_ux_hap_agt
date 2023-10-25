sap.ui.define(
  ["hcm/ux/hapv3/controller/BaseController", "sap/ui/model/json/JSONModel", "com/smod/ux/lib/thirdparty/sweetalert",],
  function (BaseController, JSONModel, SwalJS) {
    "use strict";

    return BaseController.extend("hcm.ux.hapv3.controller.App", {
      onInit: function () {
        var oViewModel,
          fnSetAppNotBusy,
          iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

        oViewModel = new JSONModel({
          busy: false,
          delay: 0,
          busyImageSource: jQuery.sap.getModulePath(
            "hcm.ux.hapv3",
            "/images/loading_square.svg"
          ),
        });
        this.setModel(oViewModel, "appView");

        fnSetAppNotBusy = function () {
          oViewModel.setProperty("/busy", false);
          oViewModel.setProperty("/delay", iOriginalBusyDelay);
        };

        this.getOwnerComponent()
          .getModel()
          .metadataLoaded()
          .then(fnSetAppNotBusy);

        // apply content density mode to root view
        this.getView().addStyleClass(
          this.getOwnerComponent().getContentDensityClass()
        );
      },
    });
  }
);
