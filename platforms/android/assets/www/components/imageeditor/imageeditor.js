define(["dialogHelper","css!css/metadataeditor.css","emby-button","paper-icon-button-light"],function(e){function t(){var e={};return e.itemId=m.Id,e}function n(e,t){Dashboard.showLoadingMsg(),t?i(e,t):ApiClient.getItem(Dashboard.getCurrentUserId(),m.Id).then(function(t){i(e,t)})}function a(e,t,n){for(var a=0,i=e.length;i>a;a++)e[a].addEventListener(t,n)}function i(e,n){m=n,ApiClient.getRemoteImageProviders(t()).then(function(t){for(var a=e.querySelectorAll(".btnBrowseAllImages"),i=0,o=a.length;o>i;i++)t.length?a[i].classList.remove("hide"):a[i].classList.add("hide");ApiClient.getItemImageInfos(m.Id).then(function(a){l(e,n,a,t),s(e,n,a,t),d(e,n,a,t),Dashboard.hideLoadingMsg()})})}function o(e,t,n,a){return a=a||{},a.type=t,a.index=n,a.tag="Backdrop"==t?e.BackdropImageTags[n]:"Screenshot"==t?e.ScreenshotImageTags[n]:"Primary"==t?e.PrimaryImageTag||e.ImageTags[t]:e.ImageTags[t],ApiClient.getScaledImageUrl(e.Id||e.ItemId,a)}function r(e,t,i,r,l){for(var s="",d=0,g=i.length;g>d;d++){var u=i[d];s+='<div class="editorTile imageEditorTile">',s+='<div class="editorTileInner">';var h=150;s+='<div style="height:'+h+'px;vertical-align:top;background-repeat:no-repeat;background-position:center bottom;background-size:contain;" class="lazy" data-src="'+o(m,u.ImageType,u.ImageIndex,{height:h})+'"></div>',s+='<div class="editorTileFooter">',"Backdrop"!==u.ImageType&&"Screenshot"!==u.ImageType&&(s+="<h3>"+u.ImageType+"</h3>"),s+=u.Width&&u.Height?"<p>"+u.Width+" X "+u.Height+"</p>":"<p>&nbsp;</p>",s+="<div>","Backdrop"==u.ImageType||"Screenshot"==u.ImageType?(s+=d>0?'<button is="paper-icon-button-light" class="btnMoveImage autoSize" data-imagetype="'+u.ImageType+'" data-index="'+u.ImageIndex+'" data-newindex="'+(u.ImageIndex-1)+'" title="'+Globalize.translate("ButtonMoveLeft")+'"><i class="md-icon">chevron_left</i></button>':'<button is="paper-icon-button-light" class="autoSize" disabled title="'+Globalize.translate("ButtonMoveLeft")+'"><i class="md-icon">chevron_left</i></button>',s+=g-1>d?'<button is="paper-icon-button-light" class="btnMoveImage autoSize" data-imagetype="'+u.ImageType+'" data-index="'+u.ImageIndex+'" data-newindex="'+(u.ImageIndex+1)+'" title="'+Globalize.translate("ButtonMoveRight")+'"><i class="md-icon">chevron_right</i></button>':'<button is="paper-icon-button-light" class="autoSize" disabled title="'+Globalize.translate("ButtonMoveRight")+'"><i class="md-icon">chevron_right</i></button>'):r.length&&(s+='<button is="paper-icon-button-light" data-imagetype="'+u.ImageType+'" class="btnSearchImages autoSize" title="'+Globalize.translate("ButtonBrowseOnlineImages")+'"><i class="md-icon">search</i></button>'),s+='<button is="paper-icon-button-light" data-imagetype="'+u.ImageType+'" data-index="'+(null!=u.ImageIndex?u.ImageIndex:"null")+'" class="btnDeleteImage autoSize" title="'+Globalize.translate("Delete")+'"><i class="md-icon">delete</i></button>',s+="</div>",s+="</div>",s+="</div>",s+="</div>"}l.innerHTML=s,ImageLoader.lazyChildren(l),a(l.querySelectorAll(".btnSearchImages"),"click",function(){c(e,this.getAttribute("data-imagetype"))}),a(l.querySelectorAll(".btnDeleteImage"),"click",function(){var t=this.getAttribute("data-imagetype"),a=this.getAttribute("data-index");a="null"==a?null:parseInt(a),require(["confirm"],function(i){i(Globalize.translate("DeleteImageConfirmation"),Globalize.translate("HeaderDeleteImage")).then(function(){ApiClient.deleteItemImage(m.Id,t,a).then(function(){p=!0,n(e)})})})}),a(l.querySelectorAll(".btnMoveImage"),"click",function(){var t=this.getAttribute("data-imagetype"),a=parseInt(this.getAttribute("data-index")),i=parseInt(this.getAttribute("data-newindex"));ApiClient.updateItemImageIndex(m.Id,t,a,i).then(function(){p=!0,n(e)})})}function l(e,t,n,a){var i=n.filter(function(e){return"Screenshot"!=e.ImageType&&"Backdrop"!=e.ImageType&&"Chapter"!=e.ImageType});r(e,t,i,a,e.querySelector("#images"))}function s(e,t,n,a){var i=n.filter(function(e){return"Backdrop"==e.ImageType}).sort(function(e,t){return e.ImageIndex-t.ImageIndex});i.length?(e.querySelector("#backdropsContainer",e).classList.remove("hide"),r(e,t,i,a,e.querySelector("#backdrops"))):e.querySelector("#backdropsContainer",e).classList.add("hide")}function d(e,t,n,a){var i=n.filter(function(e){return"Screenshot"==e.ImageType}).sort(function(e,t){return e.ImageIndex-t.ImageIndex});i.length?(e.querySelector("#screenshotsContainer",e).classList.remove("hide"),r(e,t,i,a,e.querySelector("#screenshots"))):e.querySelector("#screenshotsContainer",e).classList.add("hide")}function c(e,t){require(["components/imagedownloader/imagedownloader"],function(a){a.show(m.Id,m.Type,t).then(function(){p=!0,n(e)})})}function g(e,t){a(e.querySelectorAll(".btnOpenUploadMenu"),"click",function(){var a=this.getAttribute("data-imagetype");require(["components/imageuploader/imageuploader"],function(i){i.show(m.Id,{theme:t.theme,imageType:a}).then(function(t){t&&(p=!0,n(e))})})}),a(e.querySelectorAll(".btnBrowseAllImages"),"click",function(){c(e,this.getAttribute("data-imagetype")||"Primary")})}function u(t,a,i,o){a=a||{},Dashboard.showLoadingMsg();var r=new XMLHttpRequest;r.open("GET","components/imageeditor/imageeditor.template.html",!0),r.onload=function(){var r=this.response;ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(function(t){var l=e.createDialog({size:"fullscreen-border",removeOnClose:!0}),s=a.theme||"b";l.classList.add("ui-body-"+s),l.classList.add("background-theme-"+s),l.classList.add("popupEditor");var d="";d+='<h2 class="dialogHeader">',d+='<button type="button" is="emby-button" icon="arrow-back" class="fab mini btnCloseDialog autoSize" tabindex="-1"><i class="md-icon">&#xE5C4;</i></button>',d+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+t.Name+"</div>",d+="</h2>",d+='<div class="editorContent" style="padding:0 1em;">',d+=Globalize.translateDocument(r),d+="</div>",l.innerHTML=d,document.body.appendChild(l),g(l,a),l.addEventListener("close",function(){Dashboard.hideLoadingMsg(),p?i():o()}),e.open(l);var c=l.querySelector(".editorContent");n(c,t),l.querySelector(".btnCloseDialog").addEventListener("click",function(){e.close(l)})})},r.send()}var m,p=!1;return{show:function(e,t){return new Promise(function(n,a){p=!1,u(e,t,n,a)})}}});