webpackHotUpdate(1,{290:function(e,t,l){"use strict";var a=c(l(174)),n=c(l(15)),r=c(l(178)),u=c(l(173)),o=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}();l(282),l(94),l(171),l(275);var f=c(l(1)),d=c(l(9));function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function m(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}l(272);var p=u.default.Header,y=u.default.Content,E=u.default.Footer,h=u.default.Sider,b=(r.default.SubMenu,function(e){function t(e){i(this,t);var l=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return l.state={collapsed:!1},l.onCollapse=l.onCollapse.bind(l),l}return m(t,f.default.Component),o(t,[{key:"onCollapse",value:function(e){console.log(e),this.setState({collapsed:e})}},{key:"render",value:function(){return f.default.createElement(u.default,{style:{minHeight:"100vh"}},f.default.createElement(h,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0},collapsible:!0,collapsed:this.state.collapsed,onCollapse:this.onCollapse},f.default.createElement("div",{className:"logo"}),f.default.createElement(r.default,{style:{marginTop:"60px"},theme:"dark",defaultSelectedKeys:["1"],mode:"inline"},f.default.createElement(r.default.Item,{key:"1"},f.default.createElement(n.default,{type:"home"}),f.default.createElement("span",null,"Home")),f.default.createElement(r.default.Item,{key:"2"},f.default.createElement(n.default,{type:"heart"}),f.default.createElement("span",null,"Favorable")),f.default.createElement(r.default.Item,{key:"3"},f.default.createElement(n.default,{type:"message"}),f.default.createElement("span",null,"Message")),f.default.createElement(r.default.Item,{key:"4"},f.default.createElement(n.default,{type:"contacts"}),f.default.createElement("span",null,"Message")),f.default.createElement(r.default.Item,{key:"5"},f.default.createElement(n.default,{type:"tool"}),f.default.createElement("span",null,"Admin")))),f.default.createElement(u.default,null,f.default.createElement(p,{className:"header"}),f.default.createElement(y,{style:{margin:"0 16px"}},f.default.createElement(a.default,{style:{margin:"16px 0"}},f.default.createElement(a.default.Item,null,"User"),f.default.createElement(a.default.Item,null,"Bill")),f.default.createElement("div",{style:{padding:24,background:"#fff",minHeight:360}},"Bill is a cat.")),f.default.createElement(E,{style:{textAlign:"center"}},"YLT Design ©2018 Created by YLT")))}}]),t}()),g=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return m(t,f.default.Component),o(t,[{key:"render",value:function(){return f.default.createElement("div",null,f.default.createElement(b,null))}}]),t}(),v=document.getElementById("app");d.default.render(f.default.createElement(g,null),v)}});