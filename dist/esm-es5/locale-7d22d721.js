var __extends=this&&this.__extends||function(){var e=function(n,o){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o))e[o]=n[o]};return e(n,o)};return function(n,o){if(typeof o!=="function"&&o!==null)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");e(n,o);function t(){this.constructor=n}n.prototype=o===null?Object.create(o):(t.prototype=o.prototype,new t)}}();var IgcDockManagerPaneType;(function(e){e["splitPane"]="splitPane";e["contentPane"]="contentPane";e["tabGroupPane"]="tabGroupPane";e["documentHost"]="documentHost"})(IgcDockManagerPaneType||(IgcDockManagerPaneType={}));var IgcSplitPaneOrientation;(function(e){e["horizontal"]="horizontal";e["vertical"]="vertical"})(IgcSplitPaneOrientation||(IgcSplitPaneOrientation={}));var IgcUnpinnedLocation;(function(e){e["top"]="top";e["bottom"]="bottom";e["left"]="left";e["right"]="right"})(IgcUnpinnedLocation||(IgcUnpinnedLocation={}));var IgcDockingIndicatorPosition;(function(e){e["left"]="left";e["outerLeft"]="outerLeft";e["right"]="right";e["outerRight"]="outerRight";e["top"]="top";e["outerTop"]="outerTop";e["bottom"]="bottom";e["outerBottom"]="outerBottom";e["center"]="center"})(IgcDockingIndicatorPosition||(IgcDockingIndicatorPosition={}));var IgcPaneDragActionType;(function(e){e["floatPane"]="floatPane";e["moveFloatingPane"]="moveFloatingPane";e["dockPane"]="dockPane";e["moveTab"]="moveTab"})(IgcPaneDragActionType||(IgcPaneDragActionType={}));var IgcDockManagerComponent=function(e){__extends(n,e);function n(){return e!==null&&e.apply(this,arguments)||this}n.prototype.dropPane=function(){return null};n.prototype.removePane=function(e){return null};n.prototype.addEventListener=function(){};n.prototype.removeEventListener=function(){};return n}(HTMLElement);var IgcResizerLocation;(function(e){e["top"]="top";e["bottom"]="bottom";e["left"]="left";e["right"]="right";e["topLeft"]="topLeft";e["topRight"]="topRight";e["bottomLeft"]="bottomLeft";e["bottomRight"]="bottomRight"})(IgcResizerLocation||(IgcResizerLocation={}));var IgcDockManagerResourceStringsEN={close:"Close",pin:"Pin",unpin:"Unpin",maximize:"Maximize",minimize:"Minimize",moreOptions:"More options",moreTabs:"More tabs",panes:"Panes",documents:"Documents"};var IgcDockManagerResourceStringsJP={close:"閉じる",pin:"固定",unpin:"固定解除",maximize:"最大化",minimize:"最小化",moreOptions:"その他のオプション",moreTabs:"その他のタブ",panes:"Panes",documents:"Documents"};var IgcDockManagerResourceStringsES={close:"Cerrar",pin:"Anclar",unpin:"Desanclar",maximize:"Maximizar",minimize:"Minimizar",moreOptions:"Más opciones",moreTabs:"Más fichas",panes:"Panes",documents:"Documents"};var IgcDockManagerResourceStringsKO={close:"닫기",pin:"고정",unpin:"고정 해제",maximize:"최대화",minimize:"최소화",moreOptions:"더 많은 옵션",moreTabs:"탭 더 보기",panes:"Panes",documents:"Documents"};var resourceStringsMap=new Map;resourceStringsMap.set("en",IgcDockManagerResourceStringsEN);resourceStringsMap.set("jp",IgcDockManagerResourceStringsJP);resourceStringsMap.set("es",IgcDockManagerResourceStringsES);resourceStringsMap.set("ko",IgcDockManagerResourceStringsKO);function addResourceStrings(e,n){resourceStringsMap.set(e,n)}export{IgcDockManagerResourceStringsEN as I,IgcDockManagerResourceStringsJP as a,IgcDockManagerResourceStringsES as b,IgcDockManagerResourceStringsKO as c,addResourceStrings as d,IgcDockManagerPaneType as e,IgcSplitPaneOrientation as f,IgcUnpinnedLocation as g,IgcDockingIndicatorPosition as h,IgcPaneDragActionType as i,IgcDockManagerComponent as j,IgcResizerLocation as k,resourceStringsMap as r};