(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(1),o=t.n(a),i=t(14),c=t.n(i),s=(t(20),t(3)),u=function(e){return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:e.filterWord,onChange:e.handleFilter})]})},l=function(e){return Object(r.jsxs)("form",{onSubmit:e.addPerson,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.name,t=e.number,a=e.deletePerson;return Object(r.jsxs)("div",{children:[n," ",t,Object(r.jsx)("button",{onClick:a,children:" delete"})]})},m=function(e){return Object(r.jsx)("div",{children:e.personsToShow.map((function(n){return Object(r.jsx)(d,{name:n.name,number:n.number,deletePerson:function(){return e.deletePerson(n)}},n.name)}))})},f=t(4),b=t.n(f),j="api/persons",h=function(){return b.a.get(j).then((function(e){return e.data}))},O=function(e){return b.a.post(j,e).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(j,"/").concat(e))},x=function(e,n){return b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},p=(t(39),function(e){var n=e.message,t=e.style;return null===n?null:Object(r.jsx)("div",{className:"notification",style:t,children:n})}),v=function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],o=n[1],i=Object(a.useState)(""),c=Object(s.a)(i,2),d=c[0],f=c[1],b=Object(a.useState)(""),j=Object(s.a)(b,2),v=j[0],w=j[1],y=Object(a.useState)(""),C=Object(s.a)(y,2),N=C[0],k=C[1],S={borderRadius:"10px",padding:"0.5rem",border:"1px solid green",fontFamily:"Arial, Helvetica, sans-serif",color:"green",backgroundColor:"antiquewhite",marginBottom:"1rem"},P={borderRadius:"10px",padding:"0.5rem",border:"1px solid red",fontFamily:"Arial, Helvetica, sans-serif",color:"red",backgroundColor:"antiquewhite",marginBottom:"1rem"},T=Object(a.useState)({message:null,style:S}),F=Object(s.a)(T,2),A=F[0],B=F[1];Object(a.useEffect)((function(){h().then((function(e){o(e)}))}),[]);var D=t.filter((function(e){return function(e,n){var t=e.name.toLowerCase(),r=n.toLowerCase();return-1!==t.indexOf(r)}(e,N)}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(p,{message:A.message,style:A.style}),Object(r.jsx)(u,{filterWord:N,handleFilter:function(e){k(e.target.value)}}),Object(r.jsx)("h3",{children:"add a new"}),Object(r.jsx)(l,{addPerson:function(e){e.preventDefault();var n={name:d,number:v},r=t.findIndex((function(e){return e.name===d}));if(-1!==r){if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one ? "))){var a=t[r].id;x(a,n).then((function(e){o(t.map((function(n){return n.id!==a?n:e}))),B({message:"Updated "+e.name,style:S}),setTimeout((function(){B({message:null,style:S})}),3e3)})).catch((function(e){B({message:e.name,style:P}),o(t.filter((function(e){return e.id!==a}))),setTimeout((function(){B({message:null,style:S})}),3e3)}))}}else O(n).then((function(e){o(t.concat(e)),f(""),w(""),B({message:"Added "+e.name,style:S}),setTimeout((function(){B({message:null,style:S})}),3e3)}))},newName:d,handleNameChange:function(e){f(e.target.value)},newNumber:v,handleNumberChange:function(e){w(e.target.value)}}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(m,{personsToShow:D,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&g(e.id).then((function(n){o(t.filter((function(n){return n.id!==e.id}))),B({message:"Deleted "+e.name,style:S}),setTimeout((function(){B({message:null,style:S})}),3e3)})).catch((function(n){B({message:"Information of "+e.name+" has already been removed from the server.",style:P}),o(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){B({message:null,style:P})}),3e3)}))}})]})};c.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(v,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.537d3711.chunk.js.map