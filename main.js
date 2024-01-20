(()=>{"use strict";function e(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function n(t){"Escape"===t.key&&e(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"0e80c708-a109-4922-99c3-35b8103960ba","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():(console.error(e),Promise.reject("Ошибка: ".concat(e.status)))},c=document.querySelector("#card-template").content.querySelector(".places__item");function u(e,t,n,r){var o=e._id,u=e.isMyCard,a=e.likes,i=e.likedByMe,l=c.cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__title"),p=l.querySelector(".card__like-count");d.textContent=e.name,s.src=e.link,s.alt=e.name,p.textContent=a.length;var f=l.querySelector(".card__delete-button");u?f.addEventListener("click",(function(){return r(l,o)})):f.remove(),s.addEventListener("click",(function(){return t(e.name,e.link)}));var m=l.querySelector(".card__like-button");return m.addEventListener("click",(function(e){return n(e,o,p)})),i&&m.classList.toggle("card__like-button_is-active"),l}function a(e,t,n){var c=e.target;(c.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then((function(e){return o(e)}))}(t):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then((function(e){return o(e)}))}(t)).then((function(e){n.textContent=e.likes.length})),c.classList.toggle("card__like-button_is-active")}function i(e,t){(function(e){fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then((function(e){return o(e)}))})(t),e.remove()}var l=function(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(t,e,n)})),s(t,n,r)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),v=document.forms["edit-profile"],h=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),b=document.querySelector(".places__list"),q=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),E=document.forms["new-place"],k=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url"),g=document.querySelector(".places__list"),x=document.querySelector(".popup_type_image"),A=x.querySelector(".popup__caption"),U=x.querySelector("img"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},M=document.querySelector(".profile__image"),j=document.querySelector(".popup_type_avatar"),B=document.forms["edit-avatar"],O=B.querySelector("#link-input"),T=B.querySelector("button"),P=v.querySelector("button"),D=E.querySelector("button");function I(e,n){U.src=n,U.alt=e,A.textContent=e,t(x)}function N(e,t){q.textContent=e,C.textContent=t}function J(e){M.style.backgroundImage="url(".concat(e,")")}M.addEventListener("click",(function(){B.reset(),d(B,w),t(j)})),f.addEventListener("click",(function(){t(y),h.value=q.textContent,S.value=C.textContent,d(v,w)})),m.addEventListener("click",(function(){t(_),k.value="",L.value="",d(E,w)})),document.querySelectorAll(".popup").forEach((function(t){t.querySelector("button.popup__close").addEventListener("click",(function(){e(t)})),t.addEventListener("click",(function(n){n.target===t&&e(t)}))})),B.addEventListener("submit",(function(t){t.preventDefault();var n,c=T.textContent;T.textContent="Сохранение...",(n=O.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then((function(e){return o(e)}))).then((function(t){J(t.avatar),e(j),T.textContent=c}))})),v.addEventListener("submit",(function(t){t.preventDefault();var n,c,u=P.textContent;P.textContent="Сохранение...",(n=h.value,c=S.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:c})}).then((function(e){return o(e)}))).then((function(t){N(t.name,t.about),e(y),P.textContent=u}))})),E.addEventListener("submit",(function(t){t.preventDefault();var n,c,l=D.textContent;D.textContent="Сохранение...",(n=k.value,c=L.value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n,link:c})}).then((function(e){return o(e)}))).then((function(t){t.isMyCard=!0;var n=u(t,I,a,i);e(_),g.prepend(n),E.reset(),D.textContent=l}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(t,n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?l(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.classList.add(e.errorClass),o.textContent=r}(e,t,n,n.validationMessage)}(t,e,o),s(t,n,r)}))}))}(t,e)}))}(w),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then((function(e){return o(e)})),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then((function(e){return o(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];N(o.name,o.about),J(o.avatar),c.forEach((function(e){e.isMyCard=e.owner._id===o._id,e.likedByMe=e.likes.some((function(e){return e._id===o._id})),function(e){var t=u(e,I,a,i);b.append(t)}(e)}))}))})();