define(["jQuery","cardStyle"],function(e){function a(a){Dashboard.showLoadingMsg(),AppInfo.enableAppStorePolicy?e(".optionAdultContainer",a).hide():e(".optionAdultContainer",a).show(),r.IsAppStoreSafe=!0;var i=ApiClient.getAvailablePlugins(r),l=ApiClient.getInstalledPlugins();Promise.all([i,l]).then(function(i){t({catalogElement:e("#pluginTiles",a),noItemsElement:e("#noPlugins",a),availablePlugins:i[0],installedPlugins:i[1]})})}function t(e){i(e)}function i(a){var t=a.availablePlugins,i=a.installedPlugins,n=t.filter(function(e){return e.category=e.category||"General",e.categoryDisplayName=Globalize.translate("PluginCategory"+e.category.replace(" ","")),a.categories&&-1==a.categories.indexOf(e.category)?!1:a.targetSystem&&e.targetSystem!=a.targetSystem?!1:"UserInstalled"==e.type});t=n.sort(function(e,a){var t=e.category,i=a.category;return t>i?1:i>t?-1:(t=e.name,i=a.name,t>i?1:i>t?-1:0)});var r,s,o,c,d="";if(!a.categories){c=Globalize.translate("HeaderTopPlugins"),d+='<div class="detailSectionHeader">'+c+"</div>";var g=n.slice(0).sort(function(e,a){if(e.installs>a.installs)return-1;if(a.installs>e.installs)return 1;var t=e.name,i=a.name;return t>i?1:i>t?-1:0});d+='<div class="itemsContainer vertical-wrap">';var u=screen.availWidth>=1920?15:12;for(r=0,s=Math.min(g.length,u);s>r;r++)d+=l(g[r],a,i);d+="</div>"}var m=!1;for(a.showCategory===!1&&(d+='<div class="itemsContainer vertical-wrap">',m=!0),r=0,s=t.length;s>r;r++){o=t[r];var v=o.categoryDisplayName;v!=c&&(a.showCategory!==!1&&(c&&(m=!1,d+="</div>",d+="<br/>",d+="<br/>",d+="<br/>"),d+='<div class="detailSectionHeader">'+v+"</div>",d+='<div class="itemsContainer vertical-wrap">',m=!0),c=v),d+=l(o,a,i)}m&&(d+="</div>"),!t.length&&a.noItemsElement&&e(a.noItemsElement).hide(),e(a.catalogElement).html(d),Dashboard.hideLoadingMsg()}function l(e,a,t){var i="",l=e.externalUrl?e.externalUrl:"addplugin.html?name="+encodeURIComponent(e.name)+"&guid="+e.guid;a.context&&(l+="&context="+a.context);var n=e.externalUrl?' target="_blank"':"";i+="<div class='card backdropCard bottomPaddedCard scalableCard'>",i+='<div class="cardBox visualCardBox">',i+='<div class="cardScalable">',i+='<div class="cardPadder"></div>',i+='<a class="cardContent" href="'+l+'"'+n+">",i+=e.thumbImage?'<div class="cardImage" style="background-image:url(\''+e.thumbImage+"');\">":'<div class="cardImage" style="background-image:url(\'css/images/items/list/collection.png\');">',e.isPremium&&(i+=e.price>0?"<div class='premiumBanner'><img src='css/images/supporter/premiumflag.png' /></div>":"<div class='premiumBanner'><img src='css/images/supporter/supporterflag.png' /></div>"),i+="</div>",i+="</a>",i+="</div>",i+='<div class="cardFooter">',i+="<div class='cardText'>",i+=e.name,i+="</div>",e.isExternal||(i+="<div class='cardText' style='display:flex;align-items:center;'>",e.avgRating&&(i+='<i class="md-icon" style="color:#cc3333;margin-right:.25em;">star</i>',i+=e.avgRating.toFixed(1)),e.totalRatings&&(i+="<div style='margin-left:.5em;'>",i+=" "+Globalize.translate("LabelNumberReviews").replace("{0}",e.totalRatings)),i+="</div>",i+="</div>");var r=e.isApp?null:t.filter(function(a){return a.Id==e.guid})[0];return i+="<div class='cardText'>",i+=r?Globalize.translate("LabelVersionInstalled").replace("{0}",r.Version):"&nbsp;",i+="</div>",i+="</div>",i+="</div>",i+="</div>"}function n(){return[{href:"plugins.html",name:Globalize.translate("TabMyPlugins")},{href:"plugincatalog.html",name:Globalize.translate("TabCatalog")}]}var r={TargetSystems:"Server",IsAdult:!1};e(document).on("pageinit","#pluginCatalogPage",function(){var t=this;e("#selectSystem",t).on("change",function(){r.TargetSystems=this.value,a(t)}),e("#chkAdult",t).on("change",function(){r.IsAdult=this.checked?null:!1,a(t)})}).on("pageshow","#pluginCatalogPage",function(){LibraryMenu.setTabs("plugins",1,n);var e=this;a(e)}),window.PluginCatalog={renderCatalog:t}});