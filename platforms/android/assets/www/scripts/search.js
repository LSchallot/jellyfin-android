define(["jQuery","searchmenu"],function(e){function n(){y&&(clearTimeout(y),y=null)}function t(e){return"Audio"==e.Type?[[e.AlbumArtist,e.Album].join(" - ")]:"MusicAlbum"==e.Type?[e.AlbumArtist]:"MusicArtist"==e.Type?[Globalize.translate("LabelArtist")]:"Movie"==e.Type?[Globalize.translate("LabelMovie")]:"MusicVideo"==e.Type?[Globalize.translate("LabelMusicVideo")]:"Episode"==e.Type?[Globalize.translate("LabelEpisode")]:"Series"==e.Type?[Globalize.translate("LabelSeries")]:"BoxSet"==e.Type?[Globalize.translate("LabelCollection")]:e.ChannelName?[e.ChannelName]:[e.Type]}function a(){var e=this;e.showSearchPanel=function(){m()}}function i(e,n){n=n.map(function(e){return e.Id=e.ItemId,e.ImageTags={},e.UserData={},e.PrimaryImageTag&&(e.ImageTags.Primary=e.PrimaryImageTag),e});var a=LibraryBrowser.getPosterViewHtml({items:n,shape:"auto",lazy:!0,overlayText:!1,showTitle:!0,centerImage:!0,centerText:!0,textLines:t,overlayPlayButton:!0}),i=e.querySelector(".itemsContainer");i.innerHTML=a,ImageLoader.lazyChildren(i)}function o(e,n){var t=y;Dashboard.showLoadingMsg(),ApiClient.getSearchHints({userId:Dashboard.getCurrentUserId(),searchTerm:n,limit:30}).then(function(n){t==y&&i(e,n.SearchHints),Dashboard.hideLoadingMsg()},function(){Dashboard.hideLoadingMsg()})}function r(e,t){if(!t){var a=e.querySelector(".itemsContainer");return a&&(a.innerHTML=""),void n()}n(),y=setTimeout(function(){o(e,t)},300)}function s(n){var t=document.querySelector(".searchResultsOverlay");if(n&&!t){var a='<div class="searchResultsOverlay ui-body-b smoothScrollY background-theme-b">';a+='<div class="searchResultsContainer"><div class="itemsContainer"></div></div></div>',t=e(a).appendTo(document.body)[0],e(t).createCardMenus()}return t}function u(e){var n;e?(n=s(!0),b||c(n,1),b=!0,document.body.classList.add("bodyWithPopupOpen"),r(n,e)):(n=s(!1),n&&(r(n,""),b&&(l(n,1),b=!1),document.body.classList.remove("bodyWithPopupOpen")))}function c(e,n){var t=[{opacity:"0",offset:0},{opacity:"1",offset:1}],a={duration:200,iterations:n,fill:"both"};e.animate(t,a)}function l(e,n){var t=[{opacity:"1",offset:0},{opacity:"0",offset:1}],a={duration:600,iterations:n,fill:"both"};e.animate(t,a).onfinish=function(){e.parentNode.removeChild(e)}}function d(){require(["searchmenu"],function(){Events.on(window.SearchMenu,"closed",h),Events.on(window.SearchMenu,"change",function(e,n){u(n)})})}function h(){u(""),f()}function m(){require(["searchmenu"],function(){window.SearchMenu.show()})}function f(){require(["searchmenu"],function(){window.SearchMenu.hide()})}var y;window.Search=new a;var b;document.addEventListener("pagebeforehide",h),document.addEventListener("headercreated",function(){d()})});