(function(t){function e(e){for(var o,n,s=e[0],l=e[1],d=e[2],u=0,p=[];u<s.length;u++)n=s[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&p.push(r[n][0]),r[n]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);c&&c(e);while(p.length)p.shift()();return i.push.apply(i,d||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],o=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(o=!1)}o&&(i.splice(e--,1),t=n(n.s=a[0]))}return t}var o={},r={app:0},i=[];function n(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=o,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(a,o,function(e){return t[e]}.bind(null,o));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var c=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);var o=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{app:"",clipped:"","mini-variant":""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{on:{click:function(t){}}},[a("v-list-item-action",[a("v-icon",[t._v("dashboard")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Dashboard")])],1)],1),a("v-list-item",{on:{click:function(t){}}},[a("v-list-item-action",[a("v-icon",[t._v("settings")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Settings")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"","clipped-left":"",color:"white"}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar",{staticStyle:{"font-size":"1.8em"},attrs:{flat:""}},[t._v("\n      🍫\n    ")])],1),a("v-content",[a("v-container",{attrs:{fluid:"","px-5":""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("DataTable")],1)],1)],1)],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-data-table",t._b({staticClass:"elevation-1",attrs:{dense:"",headers:t.headers,items:t.words,"mobile-breakpoint":"100"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Words")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("div",{staticClass:"flex-grow-1"}),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[a("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},o),[t._v("New Word")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[t._l(t.languages,function(e){return[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:e},model:{value:t.editedWord[e],callback:function(a){t.$set(t.editedWord,e,a)},expression:"editedWord[language]"}})],1)]})],2)],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Save")])],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var o=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(o)}}},[t._v("\n      edit\n    ")]),a("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(o)}}},[t._v("\n      delete\n    ")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Reset")])]},proxy:!0}])},"v-data-table",{"items-per-page":t.isMobile},!1))},s=[],l=a("bc3a"),d=a.n(l),c={data:()=>({dialog:!1,words:[],languages:[],headers:[],editedIndex:-1,editedWord:{},defaultItem:{}}),created(){localStorage.getItem("words")&&(this.words=JSON.parse(localStorage.getItem("words"))),localStorage.getItem("languages")&&(this.languages=JSON.parse(localStorage.getItem("languages"))),d.a.get("http://localhost:3000/").then(t=>this.words=t.data.data),this.headers=[];for(const t of Object.keys(this.words[0]))this.headers.push({text:t,value:t}),this.editedWord[t]="",this.defaultItem[t]="";this.headers.push({text:" ",value:"action",sortable:!1,align:"right"}),d.a.get("http://localhost:3000/languages").then(t=>this.languages=t.data.data),console.log("prout",Object.keys(this.words[0])),console.log(this.editedWord)},mounted(){localStorage.getItem("words")&&(this.words=JSON.parse(localStorage.getItem("words"))),d.a.get("http://localhost:3000/").then(t=>this.words=t.data.data)},computed:{formTitle(){return-1===this.editedIndex?"New Word":"Edit Word"},isMobile(){const t=window.matchMedia("only screen and (max-width: 760px)");return t.matches?-1:20}},watch:{dialog(t){t||this.close()},words:{handler(){console.log("Words updated."),localStorage.setItem("words",JSON.stringify(this.words)),localStorage.setItem("languages",JSON.stringify(this.languages))},deep:!0}},methods:{editItem(t){this.editedIndex=this.words.indexOf(t),this.editedWord=Object.assign({},t),this.dialog=!0},deleteItem(t){const e=this.words.indexOf(t);this.words.splice(e,1)},close(){this.dialog=!1,setTimeout(()=>{this.editedWord=Object.assign({},this.defaultItem),this.editedIndex=-1},300)},save(){this.editedIndex>-1?Object.assign(this.words[this.editedIndex],this.editedWord):this.words.push(this.editedWord),this.close()}}},u=c,p=a("2877"),v=a("6544"),f=a.n(v),h=a("8336"),g=a("b0af"),m=a("99d9"),b=a("62ad"),w=a("a523"),x=a("8fea"),y=a("169a"),V=a("ce7e"),_=a("132d"),I=a("0fd9"),k=a("8654"),O=a("71d9"),S=a("2a7f"),j=Object(p["a"])(u,n,s,!1,null,null,null),C=j.exports;f()(j,{VBtn:h["a"],VCard:g["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VCol:b["a"],VContainer:w["a"],VDataTable:x["a"],VDialog:y["a"],VDivider:V["a"],VIcon:_["a"],VRow:I["a"],VTextField:k["a"],VToolbar:O["a"],VToolbarTitle:S["a"]});var T={props:{source:String},data:()=>({drawer:!1}),created(){this.$vuetify.theme.dark=!1},components:{DataTable:C}},W=T,N=a("7496"),P=a("40dc"),D=a("5bc1"),J=a("a75b"),M=a("8860"),A=a("da13"),L=a("1800"),$=a("5d23"),B=a("f774"),E=Object(p["a"])(W,r,i,!1,null,null,null),R=E.exports;f()(E,{VApp:N["a"],VAppBar:P["a"],VAppBarNavIcon:D["a"],VContainer:w["a"],VContent:J["a"],VIcon:_["a"],VList:M["a"],VListItem:A["a"],VListItemAction:L["a"],VListItemContent:$["a"],VListItemTitle:$["b"],VNavigationDrawer:B["a"],VRow:I["a"],VToolbar:O["a"]});var z=a("f309");o["a"].use(z["a"]);var F=new z["a"]({icons:{iconfont:"mdi"}});a("d1e7");o["a"].config.productionTip=!1,new o["a"]({vuetify:F,render:t=>t(R)}).$mount("#app")}});
//# sourceMappingURL=app.fc21dee9.js.map