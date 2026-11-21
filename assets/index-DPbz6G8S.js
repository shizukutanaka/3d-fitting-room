var rf=Object.defineProperty;var of=(i,e,t)=>e in i?rf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Fi=(i,e,t)=>of(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dl="170",Is={ROTATE:0,DOLLY:1,PAN:2},Ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},af=0,fc=1,lf=2,rd=1,od=2,Wn=3,Ri=0,$t=1,hn=2,vi=0,Us=1,pc=2,mc=3,gc=4,cf=5,qi=100,uf=101,df=102,hf=103,ff=104,pf=200,mf=201,gf=202,_f=203,Na=204,Oa=205,vf=206,yf=207,xf=208,Sf=209,Mf=210,bf=211,Ef=212,wf=213,Tf=214,Fa=0,ka=1,Ba=2,ks=3,za=4,Va=5,Ha=6,Ga=7,ad=0,Af=1,Rf=2,yi=0,Cf=1,Pf=2,Lf=3,ld=4,Df=5,If=6,Uf=7,cd=300,Bs=301,zs=302,Wa=303,Xa=304,No=306,yr=1e3,ji=1001,qa=1002,Tn=1003,Nf=1004,Nr=1005,Ln=1006,jo=1007,Ki=1008,ti=1009,ud=1010,dd=1011,xr=1012,Il=1013,Qi=1014,Jn=1015,Ys=1016,Ul=1017,Nl=1018,Vs=1020,hd=35902,fd=1021,pd=1022,bn=1023,md=1024,gd=1025,Ns=1026,Hs=1027,_d=1028,Ol=1029,vd=1030,Fl=1031,kl=1033,po=33776,mo=33777,go=33778,_o=33779,Ya=35840,$a=35841,ja=35842,Ka=35843,Ja=36196,Za=37492,Qa=37496,el=37808,tl=37809,nl=37810,il=37811,sl=37812,rl=37813,ol=37814,al=37815,ll=37816,cl=37817,ul=37818,dl=37819,hl=37820,fl=37821,vo=36492,pl=36494,ml=36495,yd=36283,gl=36284,_l=36285,vl=36286,Of=3200,Ff=3201,xd=0,kf=1,gi="",Ot="srgb",$s="srgb-linear",Oo="linear",vt="srgb",fs=7680,_c=519,Bf=512,zf=513,Vf=514,Sd=515,Hf=516,Gf=517,Wf=518,Xf=519,vc=35044,yc="300 es",Zn=2e3,Eo=2001;class is{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yo=Math.PI/180,wo=180/Math.PI;function Cr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function Lt(i,e,t){return Math.max(e,Math.min(t,i))}function qf(i,e){return(i%e+e)%e}function Ko(i,e,t){return(1-t)*i+t*e}function nr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Yf={DEG2RAD:yo};class fe{constructor(e=0,t=0){fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,s,r,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],p=n[5],_=n[8],x=s[0],m=s[3],h=s[6],b=s[1],S=s[4],v=s[7],A=s[2],w=s[5],T=s[8];return r[0]=o*x+a*b+l*A,r[3]=o*m+a*S+l*w,r[6]=o*h+a*v+l*T,r[1]=c*x+u*b+d*A,r[4]=c*m+u*S+d*w,r[7]=c*h+u*v+d*T,r[2]=f*x+p*b+_*A,r[5]=f*m+p*S+_*w,r[8]=f*h+p*v+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*r,p=c*r-o*l,_=t*d+n*f+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=d*x,e[1]=(s*c-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jo.makeScale(e,t)),this}rotate(e){return this.premultiply(Jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jo=new Ke;function Md(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function To(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $f(){const i=To("canvas");return i.style.display="block",i}const xc={};function hr(i){i in xc||(xc[i]=!0,console.warn(i))}function jf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Kf(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Jf(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const lt={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===vt&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===vt&&(i.r=Os(i.r),i.g=Os(i.g),i.b=Os(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===gi?Oo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Sc=[.64,.33,.3,.6,.15,.06],Mc=[.2126,.7152,.0722],bc=[.3127,.329],Ec=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wc=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);lt.define({[$s]:{primaries:Sc,whitePoint:bc,transfer:Oo,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:Mc,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:Sc,whitePoint:bc,transfer:vt,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:Mc,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}});let ps;class Zf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ps===void 0&&(ps=To("canvas")),ps.width=e.width,ps.height=e.height;const n=ps.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=To("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ei(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qf=0;class bd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Cr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zo(s[o].image)):r.push(Zo(s[o]))}else r=Zo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Zo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ep=0;class jt extends is{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,n=ji,s=ji,r=Ln,o=Ki,a=bn,l=ti,c=jt.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Cr(),this.name="",this.source=new bd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yr:e.x=e.x-Math.floor(e.x);break;case ji:e.x=e.x<0?0:1;break;case qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yr:e.y=e.y-Math.floor(e.y);break;case ji:e.y=e.y<0?0:1;break;case qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=cd;jt.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],_=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(p+1)/2,A=(h+1)/2,w=(u+f)/4,T=(d+x)/4,C=(_+m)/4;return S>v&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=T/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=C/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=T/r,s=C/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-x)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tp extends is{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new jt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends tp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ed extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class np extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class es{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const f=r[o+0],p=r[o+1],_=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=x;return}if(d!==x||l!==f||c!==p||u!==_){let m=1-a;const h=l*f+c*p+u*_+d*x,b=h>=0?1:-1,S=1-h*h;if(S>Number.EPSILON){const A=Math.sqrt(S),w=Math.atan2(A,h*b);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const v=a*b;if(l=l*m+f*v,c=c*m+p*v,u=u*m+_*v,d=d*m+x*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],f=r[o+1],p=r[o+2],_=r[o+3];return e[t]=a*_+u*d+l*p-c*f,e[t+1]=l*_+u*f+c*d-a*p,e[t+2]=c*_+u*p+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),f=l(n/2),p=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"YXZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"ZXY":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"ZYX":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"YZX":this._x=f*u*d+c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d-f*p*_;break;case"XZY":this._x=f*u*d-c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qo.copy(this).projectOnVector(e),this.sub(Qo)}reflect(e){return this.sub(Qo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qo=new L,Tc=new es;class Pr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Fr.subVectors(this.max,ir),ms.subVectors(e.a,ir),gs.subVectors(e.b,ir),_s.subVectors(e.c,ir),ai.subVectors(gs,ms),li.subVectors(_s,gs),ki.subVectors(ms,_s);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-ki.z,ki.y,ai.z,0,-ai.x,li.z,0,-li.x,ki.z,0,-ki.x,-ai.y,ai.x,0,-li.y,li.x,0,-ki.y,ki.x,0];return!ea(t,ms,gs,_s,Fr)||(t=[1,0,0,0,1,0,0,0,1],!ea(t,ms,gs,_s,Fr))?!1:(kr.crossVectors(ai,li),t=[kr.x,kr.y,kr.z],ea(t,ms,gs,_s,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new L,new L,new L,new L,new L,new L,new L,new L],vn=new L,Or=new Pr,ms=new L,gs=new L,_s=new L,ai=new L,li=new L,ki=new L,ir=new L,Fr=new L,kr=new L,Bi=new L;function ea(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bi.fromArray(i,r);const a=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),u=n.dot(Bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ip=new Pr,sr=new L,ta=new L;class Fo{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ip.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);const t=sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(sr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(ta)),this.expandByPoint(sr.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new L,na=new L,Br=new L,ci=new L,ia=new L,zr=new L,sa=new L;class ko{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){na.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(na);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Br),a=ci.dot(this.direction),l=-ci.dot(Br),c=ci.lengthSq(),u=Math.abs(1-o*o);let d,f,p,_;if(u>0)if(d=o*l-a,f=o*a-l,_=r*u,d>=0)if(f>=-_)if(f<=_){const x=1/u;d*=x,f*=x,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(na).addScaledVector(Br,f),p}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,s,r){ia.subVectors(t,e),zr.subVectors(n,e),sa.crossVectors(ia,zr);let o=this.direction.dot(sa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);const l=a*this.direction.dot(zr.crossVectors(ci,zr));if(l<0)return null;const c=a*this.direction.dot(ia.cross(ci));if(c<0||l+c>o)return null;const u=-a*ci.dot(sa);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,t,n,s,r,o,a,l,c,u,d,f,p,_,x,m){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,d,f,p,_,x,m)}set(e,t,n,s,r,o,a,l,c,u,d,f,p,_,x,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=_,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,p=o*d,_=a*u,x=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=_+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,_=c*u,x=c*d;t[0]=f+x*a,t[4]=_*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-_,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,_=c*u,x=c*d;t[0]=f-x*a,t[4]=-o*d,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*d,_=a*u,x=a*d;t[0]=l*u,t[4]=_*c-p,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=p*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,_=a*l,x=a*c;t[0]=l*u,t[4]=x-f*d,t[8]=_*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*d+_,t[10]=f-x*d}else if(e.order==="XZY"){const f=o*l,p=o*c,_=a*l,x=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+x,t[5]=o*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=a*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sp,e,rp)}lookAt(e,t,n){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ui.crossVectors(n,tn),ui.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ui.crossVectors(n,tn)),ui.normalize(),Vr.crossVectors(tn,ui),s[0]=ui.x,s[4]=Vr.x,s[8]=tn.x,s[1]=ui.y,s[5]=Vr.y,s[9]=tn.y,s[2]=ui.z,s[6]=Vr.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],p=n[13],_=n[2],x=n[6],m=n[10],h=n[14],b=n[3],S=n[7],v=n[11],A=n[15],w=s[0],T=s[4],C=s[8],g=s[12],y=s[1],P=s[5],B=s[9],O=s[13],H=s[2],$=s[6],X=s[10],K=s[14],G=s[3],ue=s[7],ge=s[11],Te=s[15];return r[0]=o*w+a*y+l*H+c*G,r[4]=o*T+a*P+l*$+c*ue,r[8]=o*C+a*B+l*X+c*ge,r[12]=o*g+a*O+l*K+c*Te,r[1]=u*w+d*y+f*H+p*G,r[5]=u*T+d*P+f*$+p*ue,r[9]=u*C+d*B+f*X+p*ge,r[13]=u*g+d*O+f*K+p*Te,r[2]=_*w+x*y+m*H+h*G,r[6]=_*T+x*P+m*$+h*ue,r[10]=_*C+x*B+m*X+h*ge,r[14]=_*g+x*O+m*K+h*Te,r[3]=b*w+S*y+v*H+A*G,r[7]=b*T+S*P+v*$+A*ue,r[11]=b*C+S*B+v*X+A*ge,r[15]=b*g+S*O+v*K+A*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],_=e[3],x=e[7],m=e[11],h=e[15];return _*(+r*l*d-s*c*d-r*a*f+n*c*f+s*a*p-n*l*p)+x*(+t*l*p-t*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+t*c*d-t*a*p-r*o*d+n*o*p+r*a*u-n*c*u)+h*(-s*a*u-t*l*d+t*a*f+s*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],_=e[12],x=e[13],m=e[14],h=e[15],b=d*m*c-x*f*c+x*l*p-a*m*p-d*l*h+a*f*h,S=_*f*c-u*m*c-_*l*p+o*m*p+u*l*h-o*f*h,v=u*x*c-_*d*c+_*a*p-o*x*p-u*a*h+o*d*h,A=_*d*l-u*x*l-_*a*f+o*x*f+u*a*m-o*d*m,w=t*b+n*S+s*v+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=b*T,e[1]=(x*f*r-d*m*r-x*s*p+n*m*p+d*s*h-n*f*h)*T,e[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*h+n*l*h)*T,e[3]=(d*l*r-a*f*r-d*s*c+n*f*c+a*s*p-n*l*p)*T,e[4]=S*T,e[5]=(u*m*r-_*f*r+_*s*p-t*m*p-u*s*h+t*f*h)*T,e[6]=(_*l*r-o*m*r-_*s*c+t*m*c+o*s*h-t*l*h)*T,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*p+t*l*p)*T,e[8]=v*T,e[9]=(_*d*r-u*x*r-_*n*p+t*x*p+u*n*h-t*d*h)*T,e[10]=(o*x*r-_*a*r+_*n*c-t*x*c-o*n*h+t*a*h)*T,e[11]=(u*a*r-o*d*r-u*n*c+t*d*c+o*n*p-t*a*p)*T,e[12]=A*T,e[13]=(u*x*s-_*d*s+_*n*f-t*x*f-u*n*m+t*d*m)*T,e[14]=(_*a*s-o*x*s-_*n*l+t*x*l+o*n*m-t*a*m)*T,e[15]=(o*d*s-u*a*s+u*n*l-t*d*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,f=r*c,p=r*u,_=r*d,x=o*u,m=o*d,h=a*d,b=l*c,S=l*u,v=l*d,A=n.x,w=n.y,T=n.z;return s[0]=(1-(x+h))*A,s[1]=(p+v)*A,s[2]=(_-S)*A,s[3]=0,s[4]=(p-v)*w,s[5]=(1-(f+h))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(_+S)*T,s[9]=(m-b)*T,s[10]=(1-(f+x))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=vs.set(s[0],s[1],s[2]).length();const o=vs.set(s[4],s[5],s[6]).length(),a=vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);const c=1/r,u=1/o,d=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Zn){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let p,_;if(a===Zn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Eo)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Zn){const l=this.elements,c=1/(t-e),u=1/(n-s),d=1/(o-r),f=(t+e)*c,p=(n+s)*u;let _,x;if(a===Zn)_=(o+r)*d,x=-2*d;else if(a===Eo)_=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vs=new L,yn=new gt,sp=new L(0,0,0),rp=new L(1,1,1),ui=new L,Vr=new L,tn=new L,Ac=new gt,Rc=new es;class Un{constructor(e=0,t=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ac,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rc.setFromEuler(this),this.setFromQuaternion(Rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class Bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let op=0;const Cc=new L,ys=new es,zn=new gt,Hr=new L,rr=new L,ap=new L,lp=new es,Pc=new L(1,0,0),Lc=new L(0,1,0),Dc=new L(0,0,1),Ic={type:"added"},cp={type:"removed"},xs={type:"childadded",child:null},ra={type:"childremoved",child:null};class Ct extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Cr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new L,t=new Un,n=new es,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ke}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Pc,e)}rotateY(e){return this.rotateOnAxis(Lc,e)}rotateZ(e){return this.rotateOnAxis(Dc,e)}translateOnAxis(e,t){return Cc.copy(e).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pc,e)}translateY(e){return this.translateOnAxis(Lc,e)}translateZ(e){return this.translateOnAxis(Dc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hr.copy(e):Hr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(rr,Hr,this.up):zn.lookAt(Hr,rr,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(zn),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ic),xs.child=e,this.dispatchEvent(xs),xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cp),ra.child=e,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ic),xs.child=e,this.dispatchEvent(xs),xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,ap),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,lp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ct.DEFAULT_UP=new L(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new L,Vn=new L,oa=new L,Hn=new L,Ss=new L,Ms=new L,Uc=new L,aa=new L,la=new L,ca=new L,ua=new pt,da=new pt,ha=new pt;class Mn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Vn.subVectors(n,t),oa.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(Vn),l=xn.dot(oa),c=Vn.dot(Vn),u=Vn.dot(oa),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(c*l-a*u)*f,_=(o*u-a*l)*f;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return ua.setScalar(0),da.setScalar(0),ha.setScalar(0),ua.fromBufferAttribute(e,t),da.fromBufferAttribute(e,n),ha.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ua,r.x),o.addScaledVector(da,r.y),o.addScaledVector(ha,r.z),o}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Vn.subVectors(e,t),xn.cross(Vn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),xn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ss.subVectors(s,n),Ms.subVectors(r,n),aa.subVectors(e,n);const l=Ss.dot(aa),c=Ms.dot(aa);if(l<=0&&c<=0)return t.copy(n);la.subVectors(e,s);const u=Ss.dot(la),d=Ms.dot(la);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ss,o);ca.subVectors(e,r);const p=Ss.dot(ca),_=Ms.dot(ca);if(_>=0&&p<=_)return t.copy(r);const x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Ms,a);const m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return Uc.subVectors(r,s),a=(d-u)/(d-u+(p-_)),t.copy(s).addScaledVector(Uc,a);const h=1/(m+x+f);return o=x*h,a=f*h,t.copy(n).addScaledVector(Ss,o).addScaledVector(Ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Gr={h:0,s:0,l:0};function fa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=qf(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=fa(o,r,e+1/3),this.g=fa(o,r,e),this.b=fa(o,r,e-1/3)}return lt.toWorkingColorSpace(this,s),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=wd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return lt.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Lt(Ht.r*255,0,255))*65536+Math.round(Lt(Ht.g*255,0,255))*256+Math.round(Lt(Ht.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace(Ht.copy(this),t);const n=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Ot){lt.fromWorkingColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,s=Ht.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(di),this.setHSL(di.h+e,di.s+t,di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(Gr);const n=Ko(di.h,Gr.h,t),s=Ko(di.s,Gr.s,t),r=Ko(di.l,Gr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Qe;Qe.NAMES=wd;let up=0;class js extends is{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Cr(),this.name="",this.blending=Us,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Na,this.blendDst=Oa,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Na&&(n.blendSrc=this.blendSrc),this.blendDst!==Oa&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qn extends js{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new L,Wr=new fe;class Dn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vc,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vc&&(e.usage=this.usage),e}}class Td extends Dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ad extends Dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends Dn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let dp=0;const ln=new gt,pa=new Ct,bs=new L,nn=new Pr,or=new Pr,Nt=new L;class Xt extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Cr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Md(e)?Ad:Td)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return pa.lookAt(e),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _t(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(nn.min,or.min),nn.expandByPoint(Nt),Nt.addVectors(nn.max,or.max),nn.expandByPoint(Nt)):(nn.expandByPoint(or.min),nn.expandByPoint(or.max))}nn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Nt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Nt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Nt.fromBufferAttribute(a,c),l&&(bs.fromBufferAttribute(e,c),Nt.add(bs)),s=Math.max(s,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new L,l[C]=new L;const c=new L,u=new L,d=new L,f=new fe,p=new fe,_=new fe,x=new L,m=new L;function h(C,g,y){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,g),d.fromBufferAttribute(n,y),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,g),_.fromBufferAttribute(r,y),u.sub(c),d.sub(c),p.sub(f),_.sub(f);const P=1/(p.x*_.y-_.x*p.y);isFinite(P)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(P),a[C].add(x),a[g].add(x),a[y].add(x),l[C].add(m),l[g].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let C=0,g=b.length;C<g;++C){const y=b[C],P=y.start,B=y.count;for(let O=P,H=P+B;O<H;O+=3)h(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const S=new L,v=new L,A=new L,w=new L;function T(C){A.fromBufferAttribute(s,C),w.copy(A);const g=a[C];S.copy(g),S.sub(A.multiplyScalar(A.dot(g))).normalize(),v.crossVectors(w,g);const P=v.dot(l[C])<0?-1:1;o.setXYZW(C,S.x,S.y,S.z,P)}for(let C=0,g=b.length;C<g;++C){const y=b[C],P=y.start,B=y.count;for(let O=P,H=P+B;O<H;O+=3)T(e.getX(O+0)),T(e.getX(O+1)),T(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let h=0;h<u;h++)f[_++]=c[p++]}return new Dn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nc=new gt,zi=new ko,Xr=new Fo,Oc=new L,qr=new L,Yr=new L,$r=new L,ma=new L,jr=new L,Fc=new L,Kr=new L;class He extends Ct{constructor(e=new Xt,t=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(ma.fromBufferAttribute(d,e),o?jr.addScaledVector(ma,u):jr.addScaledVector(ma.sub(t),u))}t.add(jr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Xr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Xr,Oc)===null||zi.origin.distanceToSquared(Oc)>(e.far-e.near)**2))&&(Nc.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Nc),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],h=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,A=S;v<A;v+=3){const w=a.getX(v),T=a.getX(v+1),C=a.getX(v+2);s=Jr(this,h,e,n,c,u,d,w,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=_,h=x;m<h;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=Jr(this,o,e,n,c,u,d,b,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],h=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,A=S;v<A;v+=3){const w=v,T=v+1,C=v+2;s=Jr(this,h,e,n,c,u,d,w,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,h=x;m<h;m+=3){const b=m,S=m+1,v=m+2;s=Jr(this,o,e,n,c,u,d,b,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function hp(i,e,t,n,s,r,o,a){let l;if(e.side===$t?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Ri,a),l===null)return null;Kr.copy(a),Kr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Kr);return c<t.near||c>t.far?null:{distance:c,point:Kr.clone(),object:i}}function Jr(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,qr),i.getVertexPosition(l,Yr),i.getVertexPosition(c,$r);const u=hp(i,e,t,n,qr,Yr,$r,Fc);if(u){const d=new L;Mn.getBarycoord(Fc,qr,Yr,$r,d),s&&(u.uv=Mn.getInterpolatedAttribute(s,a,l,c,d,new fe)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,a,l,c,d,new fe)),o&&(u.normal=Mn.getInterpolatedAttribute(o,a,l,c,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};Mn.getNormal(qr,Yr,$r,f.normal),u.face=f,u.barycoord=d}return u}class $e extends Xt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,p=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(d,2));function _(x,m,h,b,S,v,A,w,T,C,g){const y=v/T,P=A/C,B=v/2,O=A/2,H=w/2,$=T+1,X=C+1;let K=0,G=0;const ue=new L;for(let ge=0;ge<X;ge++){const Te=ge*P-O;for(let ze=0;ze<$;ze++){const tt=ze*y-B;ue[x]=tt*b,ue[m]=Te*S,ue[h]=H,c.push(ue.x,ue.y,ue.z),ue[x]=0,ue[m]=0,ue[h]=w>0?1:-1,u.push(ue.x,ue.y,ue.z),d.push(ze/T),d.push(1-ge/C),K+=1}}for(let ge=0;ge<C;ge++)for(let Te=0;Te<T;Te++){const ze=f+Te+$*ge,tt=f+Te+$*(ge+1),j=f+(Te+1)+$*(ge+1),N=f+(Te+1)+$*ge;l.push(ze,tt,N),l.push(tt,j,N),G+=6}a.addGroup(p,G,g),p+=G,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){const e={};for(let t=0;t<i.length;t++){const n=Gs(i[t]);for(const s in n)e[s]=n[s]}return e}function fp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Rd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const Cd={clone:Gs,merge:Yt};var pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends js{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Pd extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new L,kc=new fe,Bc=new fe;class Gt extends Pd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wo*2*Math.atan(Math.tan(yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,kc,Bc),t.subVectors(Bc,kc)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Es=-90,ws=1;class gp extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Es,ws,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Es,ws,e,t);r.layers=this.layers,this.add(r);const o=new Gt(Es,ws,e,t);o.layers=this.layers,this.add(o);const a=new Gt(Es,ws,e,t);a.layers=this.layers,this.add(a);const l=new Gt(Es,ws,e,t);l.layers=this.layers,this.add(l);const c=new Gt(Es,ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Eo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ld extends jt{constructor(e,t,n,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Bs,super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _p extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ld(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $e(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:vi});r.uniforms.tEquirect.value=t;const o=new He(s,r),a=t.minFilter;return t.minFilter===Ki&&(t.minFilter=Ln),new gp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ga=new L,vp=new L,yp=new Ke;class Yn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ga.subVectors(n,t).cross(vp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||yp.getNormalMatrix(e),s=this.coplanarPoint(ga).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vi=new Fo,Zr=new L;class zl{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,o=new Yn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],f=s[7],p=s[8],_=s[9],x=s[10],m=s[11],h=s[12],b=s[13],S=s[14],v=s[15];if(n[0].setComponents(l-r,f-c,m-p,v-h).normalize(),n[1].setComponents(l+r,f+c,m+p,v+h).normalize(),n[2].setComponents(l+o,f+u,m+_,v+b).normalize(),n[3].setComponents(l-o,f-u,m-_,v-b).normalize(),n[4].setComponents(l-a,f-d,m-x,v-S).normalize(),t===Zn)n[5].setComponents(l+a,f+d,m+x,v+S).normalize();else if(t===Eo)n[5].setComponents(a,d,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){return Vi.center.set(0,0,0),Vi.radius=.7071067811865476,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Zr.x=s.normal.x>0?e.max.x:e.min.x,Zr.y=s.normal.y>0?e.max.y:e.min.y,Zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function xp(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<d.length;p++){const _=d[f],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,_=d.length;p<_;p++){const x=d[p];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ft extends Xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=e/a,f=t/l,p=[],_=[],x=[],m=[];for(let h=0;h<u;h++){const b=h*f-o;for(let S=0;S<c;S++){const v=S*d-r;_.push(v,-b,0),x.push(0,0,1),m.push(S/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<a;b++){const S=b+c*h,v=b+c*(h+1),A=b+1+c*(h+1),w=b+1+c*h;p.push(S,v,w),p.push(v,A,w)}this.setIndex(p),this.setAttribute("position",new _t(_,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.width,e.height,e.widthSegments,e.heightSegments)}}var Sp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ap=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ip=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Up=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Np=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$p=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,im=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,om=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,um=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_m=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ym=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Um=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Om=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,km=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$m=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Km=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,og=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ag=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ag=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Bg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Hg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$g=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:Sp,alphahash_pars_fragment:Mp,alphamap_fragment:bp,alphamap_pars_fragment:Ep,alphatest_fragment:wp,alphatest_pars_fragment:Tp,aomap_fragment:Ap,aomap_pars_fragment:Rp,batching_pars_vertex:Cp,batching_vertex:Pp,begin_vertex:Lp,beginnormal_vertex:Dp,bsdfs:Ip,iridescence_fragment:Up,bumpmap_pars_fragment:Np,clipping_planes_fragment:Op,clipping_planes_pars_fragment:Fp,clipping_planes_pars_vertex:kp,clipping_planes_vertex:Bp,color_fragment:zp,color_pars_fragment:Vp,color_pars_vertex:Hp,color_vertex:Gp,common:Wp,cube_uv_reflection_fragment:Xp,defaultnormal_vertex:qp,displacementmap_pars_vertex:Yp,displacementmap_vertex:$p,emissivemap_fragment:jp,emissivemap_pars_fragment:Kp,colorspace_fragment:Jp,colorspace_pars_fragment:Zp,envmap_fragment:Qp,envmap_common_pars_fragment:em,envmap_pars_fragment:tm,envmap_pars_vertex:nm,envmap_physical_pars_fragment:fm,envmap_vertex:im,fog_vertex:sm,fog_pars_vertex:rm,fog_fragment:om,fog_pars_fragment:am,gradientmap_pars_fragment:lm,lightmap_pars_fragment:cm,lights_lambert_fragment:um,lights_lambert_pars_fragment:dm,lights_pars_begin:hm,lights_toon_fragment:pm,lights_toon_pars_fragment:mm,lights_phong_fragment:gm,lights_phong_pars_fragment:_m,lights_physical_fragment:vm,lights_physical_pars_fragment:ym,lights_fragment_begin:xm,lights_fragment_maps:Sm,lights_fragment_end:Mm,logdepthbuf_fragment:bm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:wm,logdepthbuf_vertex:Tm,map_fragment:Am,map_pars_fragment:Rm,map_particle_fragment:Cm,map_particle_pars_fragment:Pm,metalnessmap_fragment:Lm,metalnessmap_pars_fragment:Dm,morphinstance_vertex:Im,morphcolor_vertex:Um,morphnormal_vertex:Nm,morphtarget_pars_vertex:Om,morphtarget_vertex:Fm,normal_fragment_begin:km,normal_fragment_maps:Bm,normal_pars_fragment:zm,normal_pars_vertex:Vm,normal_vertex:Hm,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:Wm,clearcoat_normal_fragment_maps:Xm,clearcoat_pars_fragment:qm,iridescence_pars_fragment:Ym,opaque_fragment:$m,packing:jm,premultiplied_alpha_fragment:Km,project_vertex:Jm,dithering_fragment:Zm,dithering_pars_fragment:Qm,roughnessmap_fragment:eg,roughnessmap_pars_fragment:tg,shadowmap_pars_fragment:ng,shadowmap_pars_vertex:ig,shadowmap_vertex:sg,shadowmask_pars_fragment:rg,skinbase_vertex:og,skinning_pars_vertex:ag,skinning_vertex:lg,skinnormal_vertex:cg,specularmap_fragment:ug,specularmap_pars_fragment:dg,tonemapping_fragment:hg,tonemapping_pars_fragment:fg,transmission_fragment:pg,transmission_pars_fragment:mg,uv_pars_fragment:gg,uv_pars_vertex:_g,uv_vertex:vg,worldpos_vertex:yg,background_vert:xg,background_frag:Sg,backgroundCube_vert:Mg,backgroundCube_frag:bg,cube_vert:Eg,cube_frag:wg,depth_vert:Tg,depth_frag:Ag,distanceRGBA_vert:Rg,distanceRGBA_frag:Cg,equirect_vert:Pg,equirect_frag:Lg,linedashed_vert:Dg,linedashed_frag:Ig,meshbasic_vert:Ug,meshbasic_frag:Ng,meshlambert_vert:Og,meshlambert_frag:Fg,meshmatcap_vert:kg,meshmatcap_frag:Bg,meshnormal_vert:zg,meshnormal_frag:Vg,meshphong_vert:Hg,meshphong_frag:Gg,meshphysical_vert:Wg,meshphysical_frag:Xg,meshtoon_vert:qg,meshtoon_frag:Yg,points_vert:$g,points_frag:jg,shadow_vert:Kg,shadow_frag:Jg,sprite_vert:Zg,sprite_frag:Qg},ve={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Cn={basic:{uniforms:Yt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Yt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Yt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Yt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Yt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Yt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Yt([ve.points,ve.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Yt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Yt([ve.common,ve.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Yt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Yt([ve.sprite,ve.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Yt([ve.common,ve.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Yt([ve.lights,ve.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Cn.physical={uniforms:Yt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Qr={r:0,b:0,g:0},Hi=new Un,e0=new gt;function t0(i,e,t,n,s,r,o){const a=new Qe(0);let l=r===!0?0:1,c,u,d=null,f=0,p=null;function _(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?t:e).get(S)),S}function x(b){let S=!1;const v=_(b);v===null?h(a,l):v&&v.isColor&&(h(v,1),S=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const v=_(S);v&&(v.isCubeTexture||v.mapping===No)?(u===void 0&&(u=new He(new $e(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:Gs(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Hi.copy(S.backgroundRotation),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(Hi)),u.material.toneMapped=lt.getTransfer(v.colorSpace)!==vt,(d!==v||f!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,p=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new He(new Ft(2,2),new ii({name:"BackgroundMaterial",uniforms:Gs(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=lt.getTransfer(v.colorSpace)!==vt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,f=v.version,p=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function h(b,S){b.getRGB(Qr,Rd(i)),n.buffers.color.setClear(Qr.r,Qr.g,Qr.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,h(a,l)},render:x,addToRenderList:m}}function n0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,P,B,O,H){let $=!1;const X=d(O,B,P);r!==X&&(r=X,c(r.object)),$=p(y,O,B,H),$&&_(y,O,B,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(y,P,B,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,P,B){const O=B.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let $=H[P.id];$===void 0&&($={},H[P.id]=$);let X=$[O];return X===void 0&&(X=f(l()),$[O]=X),X}function f(y){const P=[],B=[],O=[];for(let H=0;H<t;H++)P[H]=0,B[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,P,B,O){const H=r.attributes,$=P.attributes;let X=0;const K=B.getAttributes();for(const G in K)if(K[G].location>=0){const ge=H[G];let Te=$[G];if(Te===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(Te=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(Te=y.instanceColor)),ge===void 0||ge.attribute!==Te||Te&&ge.data!==Te.data)return!0;X++}return r.attributesNum!==X||r.index!==O}function _(y,P,B,O){const H={},$=P.attributes;let X=0;const K=B.getAttributes();for(const G in K)if(K[G].location>=0){let ge=$[G];ge===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ge=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ge=y.instanceColor));const Te={};Te.attribute=ge,ge&&ge.data&&(Te.data=ge.data),H[G]=Te,X++}r.attributes=H,r.attributesNum=X,r.index=O}function x(){const y=r.newAttributes;for(let P=0,B=y.length;P<B;P++)y[P]=0}function m(y){h(y,0)}function h(y,P){const B=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;B[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),H[y]!==P&&(i.vertexAttribDivisor(y,P),H[y]=P)}function b(){const y=r.newAttributes,P=r.enabledAttributes;for(let B=0,O=P.length;B<O;B++)P[B]!==y[B]&&(i.disableVertexAttribArray(B),P[B]=0)}function S(y,P,B,O,H,$,X){X===!0?i.vertexAttribIPointer(y,P,B,H,$):i.vertexAttribPointer(y,P,B,O,H,$)}function v(y,P,B,O){x();const H=O.attributes,$=B.getAttributes(),X=P.defaultAttributeValues;for(const K in $){const G=$[K];if(G.location>=0){let ue=H[K];if(ue===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),ue!==void 0){const ge=ue.normalized,Te=ue.itemSize,ze=e.get(ue);if(ze===void 0)continue;const tt=ze.buffer,j=ze.type,N=ze.bytesPerElement,ie=j===i.INT||j===i.UNSIGNED_INT||ue.gpuType===Il;if(ue.isInterleavedBufferAttribute){const J=ue.data,pe=J.stride,oe=ue.offset;if(J.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)h(G.location+Ee,J.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)m(G.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Ee=0;Ee<G.locationSize;Ee++)S(G.location+Ee,Te/G.locationSize,j,ge,pe*N,(oe+Te/G.locationSize*Ee)*N,ie)}else{if(ue.isInstancedBufferAttribute){for(let J=0;J<G.locationSize;J++)h(G.location+J,ue.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let J=0;J<G.locationSize;J++)m(G.location+J);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let J=0;J<G.locationSize;J++)S(G.location+J,Te/G.locationSize,j,ge,Te*N,Te/G.locationSize*J*N,ie)}}else if(X!==void 0){const ge=X[K];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(G.location,ge);break;case 3:i.vertexAttrib3fv(G.location,ge);break;case 4:i.vertexAttrib4fv(G.location,ge);break;default:i.vertexAttrib1fv(G.location,ge)}}}}b()}function A(){C();for(const y in n){const P=n[y];for(const B in P){const O=P[B];for(const H in O)u(O[H].object),delete O[H];delete P[B]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const B in P){const O=P[B];for(const H in O)u(O[H].object),delete O[H];delete P[B]}delete n[y.id]}function T(y){for(const P in n){const B=n[P];if(B[y.id]===void 0)continue;const O=B[y.id];for(const H in O)u(O[H].object),delete O[H];delete B[y.id]}}function C(){g(),o=!0,r!==s&&(r=s,c(r.object))}function g(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:g,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function i0(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=u[_];t.update(p,n,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let x=0;x<d;x++)_+=u[x]*f[x];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function s0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==bn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===Ys&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ti&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Jn&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:A,maxSamples:w}}function r0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Yn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,h=i.get(d);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const b=r?0:n,S=b*4;let v=h.clippingState||null;l.value=v,v=u(_,f,S,p);for(let A=0;A!==S;++A)v[A]=t[A];h.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,p,_){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,_!==!0||m===null){const h=p+x*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,v=p;S!==x;++S,v+=4)o.copy(d[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function o0(i){let e=new WeakMap;function t(o,a){return a===Wa?o.mapping=Bs:a===Xa&&(o.mapping=zs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wa||a===Xa)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _p(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Id extends Pd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ls=4,zc=[.125,.215,.35,.446,.526,.582],Yi=20,_a=new Id,Vc=new Qe;let va=null,ya=0,xa=0,Sa=!1;const Xi=(1+Math.sqrt(5))/2,Ts=1/Xi,Hc=[new L(-Xi,Ts,0),new L(Xi,Ts,0),new L(-Ts,0,Xi),new L(Ts,0,Xi),new L(0,Xi,-Ts),new L(0,Xi,Ts),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class yl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){va=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va,ya,xa),this._renderer.xr.enabled=Sa,e.scissorTest=!1,eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bs||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:Ys,format:bn,colorSpace:$s,depthBuffer:!1},s=Gc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a0(r)),this._blurMaterial=l0(r,e,t)}return s}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,s){const a=new Gt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Vc),u.toneMapping=yi,u.autoClear=!1;const p=new Qn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),_=new He(new $e,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Vc),x=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):b===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const S=this._cubeSize;eo(s,b*S,h>2?S:0,S,S),u.setRenderTarget(s),x&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Bs||e.mapping===zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new He(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;eo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_a)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hc[(s-r-1)%Hc.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new He(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Yi-1),x=r/_,m=isFinite(r)?1+Math.floor(u*x):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);const h=[];let b=0;for(let T=0;T<Yi;++T){const C=T/x,g=Math.exp(-C*C/2);h.push(g),T===0?b+=g:T<m&&(b+=2*g)}for(let T=0;T<h.length;T++)h[T]=h[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-n;const v=this._sizeLods[s],A=3*v*(s>S-Ls?s-S+Ls:0),w=4*(this._cubeSize-v);eo(t,A,w,3*v,2*v),l.setRenderTarget(t),l.render(d,_a)}}function a0(i){const e=[],t=[],n=[];let s=i;const r=i-Ls+1+zc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Ls?l=zc[o-i+Ls-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,_=6,x=3,m=2,h=1,b=new Float32Array(x*_*p),S=new Float32Array(m*_*p),v=new Float32Array(h*_*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,C=w>2?0:-1,g=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];b.set(g,x*_*w),S.set(f,m*_*w);const y=[w,w,w,w,w,w];v.set(y,h*_*w)}const A=new Xt;A.setAttribute("position",new Dn(b,x)),A.setAttribute("uv",new Dn(S,m)),A.setAttribute("faceIndex",new Dn(v,h)),e.push(A),s>Ls&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gc(i,e,t){const n=new ni(i,e,t);return n.texture.mapping=No,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function eo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function l0(i,e,t){const n=new Float32Array(Yi),s=new L(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Wc(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Xc(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Vl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function c0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wa||l===Xa,u=l===Bs||l===zs;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new yl(i)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new yl(i)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function u0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&hr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function d0(i,e,t,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const x=f.morphAttributes[_];for(let m=0,h=x.length;m<h;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const p=d.morphAttributes;for(const _ in p){const x=p[_];for(let m=0,h=x.length;m<h;m++)e.update(x[m],i.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,_=d.attributes.position;let x=0;if(p!==null){const b=p.array;x=p.version;for(let S=0,v=b.length;S<v;S+=3){const A=b[S+0],w=b[S+1],T=b[S+2];f.push(A,w,w,T,T,A)}}else if(_!==void 0){const b=_.array;x=_.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const A=S+0,w=S+1,T=S+2;f.push(A,w,w,T,T,A)}}else return;const m=new(Md(f)?Ad:Td)(f,1);m.version=x;const h=r.get(d);h&&e.remove(h),r.set(d,m)}function u(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function h0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function c(f,p,_){_!==0&&(i.drawElementsInstanced(n,p,r,f*o,_),t.update(p,n,_))}function u(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,_);let m=0;for(let h=0;h<_;h++)m+=p[h];t.update(m,n,1)}function d(f,p,_,x){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/o,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,_);let h=0;for(let b=0;b<_;b++)h+=p[b]*x[b];t.update(h,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function f0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function p0(i,e,t){const n=new WeakMap,s=new pt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let A=a.attributes.position.count*v,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const T=new Float32Array(A*w*4*d),C=new Ed(T,A,w,d);C.type=Jn,C.needsUpdate=!0;const g=v*4;for(let P=0;P<d;P++){const B=h[P],O=b[P],H=S[P],$=A*w*4*P;for(let X=0;X<B.count;X++){const K=X*g;_===!0&&(s.fromBufferAttribute(B,X),T[$+K+0]=s.x,T[$+K+1]=s.y,T[$+K+2]=s.z,T[$+K+3]=0),x===!0&&(s.fromBufferAttribute(O,X),T[$+K+4]=s.x,T[$+K+5]=s.y,T[$+K+6]=s.z,T[$+K+7]=0),m===!0&&(s.fromBufferAttribute(H,X),T[$+K+8]=s.x,T[$+K+9]=s.y,T[$+K+10]=s.z,T[$+K+11]=H.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new fe(A,w)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const x=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function m0(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ud extends jt{constructor(e,t,n,s,r,o,a,l,c,u=Ns){if(u!==Ns&&u!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ns&&(n=Qi),n===void 0&&u===Hs&&(n=Vs),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Tn,this.minFilter=l!==void 0?l:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nd=new jt,qc=new Ud(1,1),Od=new Ed,Fd=new np,kd=new Ld,Yc=[],$c=[],jc=new Float32Array(16),Kc=new Float32Array(9),Jc=new Float32Array(4);function Ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Yc[s];if(r===void 0&&(r=new Float32Array(s),Yc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Bo(i,e){let t=$c[e];t===void 0&&(t=new Int32Array(e),$c[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function g0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function v0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function x0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,n))return;Jc.set(n),i.uniformMatrix2fv(this.addr,!1,Jc),Ut(t,n)}}function S0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,n))return;Kc.set(n),i.uniformMatrix3fv(this.addr,!1,Kc),Ut(t,n)}}function M0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,n))return;jc.set(n),i.uniformMatrix4fv(this.addr,!1,jc),Ut(t,n)}}function b0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function w0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function T0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function A0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function L0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qc.compareFunction=Sd,r=qc):r=Nd,t.setTexture2D(e||r,s)}function D0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Fd,s)}function I0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||kd,s)}function U0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Od,s)}function N0(i){switch(i){case 5126:return g0;case 35664:return _0;case 35665:return v0;case 35666:return y0;case 35674:return x0;case 35675:return S0;case 35676:return M0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return w0;case 35669:case 35673:return T0;case 5125:return A0;case 36294:return R0;case 36295:return C0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return I0;case 36289:case 36303:case 36311:case 36292:return U0}}function O0(i,e){i.uniform1fv(this.addr,e)}function F0(i,e){const t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function k0(i,e){const t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function B0(i,e){const t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function z0(i,e){const t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function V0(i,e){const t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function H0(i,e){const t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function G0(i,e){i.uniform1iv(this.addr,e)}function W0(i,e){i.uniform2iv(this.addr,e)}function X0(i,e){i.uniform3iv(this.addr,e)}function q0(i,e){i.uniform4iv(this.addr,e)}function Y0(i,e){i.uniform1uiv(this.addr,e)}function $0(i,e){i.uniform2uiv(this.addr,e)}function j0(i,e){i.uniform3uiv(this.addr,e)}function K0(i,e){i.uniform4uiv(this.addr,e)}function J0(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Nd,r[o])}function Z0(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Fd,r[o])}function Q0(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||kd,r[o])}function e_(i,e,t){const n=this.cache,s=e.length,r=Bo(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Od,r[o])}function t_(i){switch(i){case 5126:return O0;case 35664:return F0;case 35665:return k0;case 35666:return B0;case 35674:return z0;case 35675:return V0;case 35676:return H0;case 5124:case 35670:return G0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return $0;case 36295:return j0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return e_}}class n_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=N0(t.type)}}class i_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=t_(t.type)}}class s_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function Zc(i,e){i.seq.push(e),i.map[e.id]=e}function r_(i,e,t){const n=i.name,s=n.length;for(Ma.lastIndex=0;;){const r=Ma.exec(n),o=Ma.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Zc(t,c===void 0?new n_(a,i,e):new i_(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new s_(a),Zc(t,d)),t=d}}}class xo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);r_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Qc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const o_=37297;let a_=0;function l_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const eu=new Ke;function c_(i){lt._getMatrix(eu,lt.workingColorSpace,i);const e=`mat3( ${eu.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(i)){case Oo:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function tu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+l_(i.getShaderSource(e),o)}else return s}function u_(i,e){const t=c_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function d_(i,e){let t;switch(e){case Cf:t="Linear";break;case Pf:t="Reinhard";break;case Lf:t="Cineon";break;case ld:t="ACESFilmic";break;case If:t="AgX";break;case Uf:t="Neutral";break;case Df:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const to=new L;function h_(){lt.getLuminanceCoefficients(to);const i=to.x.toFixed(4),e=to.y.toFixed(4),t=to.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function f_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function p_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function m_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function fr(i){return i!==""}function nu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function iu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const g_=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(i){return i.replace(g_,v_)}const __=new Map;function v_(i,e){let t=Ze[e];if(t===void 0){const n=__.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xl(t)}const y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function su(i){return i.replace(y_,x_)}function x_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ru(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function S_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===rd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===od?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function M_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bs:case zs:e="ENVMAP_TYPE_CUBE";break;case No:e="ENVMAP_TYPE_CUBE_UV";break}return e}function b_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function E_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ad:e="ENVMAP_BLENDING_MULTIPLY";break;case Af:e="ENVMAP_BLENDING_MIX";break;case Rf:e="ENVMAP_BLENDING_ADD";break}return e}function w_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function T_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=S_(t),c=M_(t),u=b_(t),d=E_(t),f=w_(t),p=f_(t),_=p_(r),x=s.createProgram();let m,h,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(fr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(fr).join(`
`),h.length>0&&(h+=`
`)):(m=[ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),h=[ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==yi?d_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,u_("linearToOutputTexel",t.outputColorSpace),h_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fr).join(`
`)),o=xl(o),o=nu(o,t),o=iu(o,t),a=xl(a),a=nu(a,t),a=iu(a,t),o=su(o),a=su(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=b+m+o,v=b+h+a,A=Qc(s,s.VERTEX_SHADER,S),w=Qc(s,s.FRAGMENT_SHADER,v);s.attachShader(x,A),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function T(P){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(x).trim(),O=s.getShaderInfoLog(A).trim(),H=s.getShaderInfoLog(w).trim();let $=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{const K=tu(s,A,"vertex"),G=tu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+K+`
`+G)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||H==="")&&(X=!1);X&&(P.diagnostics={runnable:$,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:h}})}s.deleteShader(A),s.deleteShader(w),C=new xo(s,x),g=m_(s,x)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let g;this.getAttributes=function(){return g===void 0&&T(this),g};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,o_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=a_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let A_=0;class R_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new C_(e),t.set(e,n)),n}}class C_{constructor(e){this.id=A_++,this.code=e,this.usedTimes=0}}function P_(i,e,t,n,s,r,o){const a=new Bl,l=new R_,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(g){return c.add(g),g===0?"uv":`uv${g}`}function m(g,y,P,B,O){const H=B.fog,$=O.geometry,X=g.isMeshStandardMaterial?B.environment:null,K=(g.isMeshStandardMaterial?t:e).get(g.envMap||X),G=K&&K.mapping===No?K.image.height:null,ue=_[g.type];g.precision!==null&&(p=s.getMaxPrecision(g.precision),p!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));const ge=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Te=ge!==void 0?ge.length:0;let ze=0;$.morphAttributes.position!==void 0&&(ze=1),$.morphAttributes.normal!==void 0&&(ze=2),$.morphAttributes.color!==void 0&&(ze=3);let tt,j,N,ie;if(ue){const mt=Cn[ue];tt=mt.vertexShader,j=mt.fragmentShader}else tt=g.vertexShader,j=g.fragmentShader,l.update(g),N=l.getVertexShaderID(g),ie=l.getFragmentShaderID(g);const J=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),oe=O.isInstancedMesh===!0,Ee=O.isBatchedMesh===!0,Ve=!!g.map,ke=!!g.matcap,le=!!K,D=!!g.aoMap,rt=!!g.lightMap,qe=!!g.bumpMap,Be=!!g.normalMap,Ie=!!g.displacementMap,nt=!!g.emissiveMap,Ue=!!g.metalnessMap,R=!!g.roughnessMap,M=g.anisotropy>0,V=g.clearcoat>0,te=g.dispersion>0,se=g.iridescence>0,ee=g.sheen>0,Ae=g.transmission>0,_e=M&&!!g.anisotropyMap,ye=V&&!!g.clearcoatMap,it=V&&!!g.clearcoatNormalMap,ce=V&&!!g.clearcoatRoughnessMap,z=se&&!!g.iridescenceMap,ne=se&&!!g.iridescenceThicknessMap,me=ee&&!!g.sheenColorMap,ae=ee&&!!g.sheenRoughnessMap,Re=!!g.specularMap,be=!!g.specularColorMap,Fe=!!g.specularIntensityMap,U=Ae&&!!g.transmissionMap,he=Ae&&!!g.thicknessMap,Y=!!g.gradientMap,Z=!!g.alphaMap,Se=g.alphaTest>0,xe=!!g.alphaHash,Ge=!!g.extensions;let Mt=yi;g.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Mt=i.toneMapping);const zt={shaderID:ue,shaderType:g.type,shaderName:g.name,vertexShader:tt,fragmentShader:j,defines:g.defines,customVertexShaderID:N,customFragmentShaderID:ie,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&O._colorsTexture!==null,instancing:oe,instancingColor:oe&&O.instanceColor!==null,instancingMorph:oe&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:$s,alphaToCoverage:!!g.alphaToCoverage,map:Ve,matcap:ke,envMap:le,envMapMode:le&&K.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:rt,bumpMap:qe,normalMap:Be,displacementMap:f&&Ie,emissiveMap:nt,normalMapObjectSpace:Be&&g.normalMapType===kf,normalMapTangentSpace:Be&&g.normalMapType===xd,metalnessMap:Ue,roughnessMap:R,anisotropy:M,anisotropyMap:_e,clearcoat:V,clearcoatMap:ye,clearcoatNormalMap:it,clearcoatRoughnessMap:ce,dispersion:te,iridescence:se,iridescenceMap:z,iridescenceThicknessMap:ne,sheen:ee,sheenColorMap:me,sheenRoughnessMap:ae,specularMap:Re,specularColorMap:be,specularIntensityMap:Fe,transmission:Ae,transmissionMap:U,thicknessMap:he,gradientMap:Y,opaque:g.transparent===!1&&g.blending===Us&&g.alphaToCoverage===!1,alphaMap:Z,alphaTest:Se,alphaHash:xe,combine:g.combine,mapUv:Ve&&x(g.map.channel),aoMapUv:D&&x(g.aoMap.channel),lightMapUv:rt&&x(g.lightMap.channel),bumpMapUv:qe&&x(g.bumpMap.channel),normalMapUv:Be&&x(g.normalMap.channel),displacementMapUv:Ie&&x(g.displacementMap.channel),emissiveMapUv:nt&&x(g.emissiveMap.channel),metalnessMapUv:Ue&&x(g.metalnessMap.channel),roughnessMapUv:R&&x(g.roughnessMap.channel),anisotropyMapUv:_e&&x(g.anisotropyMap.channel),clearcoatMapUv:ye&&x(g.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(g.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&x(g.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&x(g.iridescenceThicknessMap.channel),sheenColorMapUv:me&&x(g.sheenColorMap.channel),sheenRoughnessMapUv:ae&&x(g.sheenRoughnessMap.channel),specularMapUv:Re&&x(g.specularMap.channel),specularColorMapUv:be&&x(g.specularColorMap.channel),specularIntensityMapUv:Fe&&x(g.specularIntensityMap.channel),transmissionMapUv:U&&x(g.transmissionMap.channel),thicknessMapUv:he&&x(g.thicknessMap.channel),alphaMapUv:Z&&x(g.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Be||M),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(Ve||Z),fog:!!H,useFog:g.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:pe,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:ze,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Mt,decodeVideoTexture:Ve&&g.map.isVideoTexture===!0&&lt.getTransfer(g.map.colorSpace)===vt,decodeVideoTextureEmissive:nt&&g.emissiveMap.isVideoTexture===!0&&lt.getTransfer(g.emissiveMap.colorSpace)===vt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===hn,flipSided:g.side===$t,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Ge&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&g.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return zt.vertexUv1s=c.has(1),zt.vertexUv2s=c.has(2),zt.vertexUv3s=c.has(3),c.clear(),zt}function h(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const P in g.defines)y.push(P),y.push(g.defines[P]);return g.isRawShaderMaterial===!1&&(b(y,g),S(y,g),y.push(i.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function b(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapCubeUVHeight),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.morphAttributeCount),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function S(g,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),g.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),g.push(a.mask)}function v(g){const y=_[g.type];let P;if(y){const B=Cn[y];P=Cd.clone(B.uniforms)}else P=g.uniforms;return P}function A(g,y){let P;for(let B=0,O=u.length;B<O;B++){const H=u[B];if(H.cacheKey===y){P=H,++P.usedTimes;break}}return P===void 0&&(P=new T_(i,y,g,r),u.push(P)),P}function w(g){if(--g.usedTimes===0){const y=u.indexOf(g);u[y]=u[u.length-1],u.pop(),g.destroy()}}function T(g){l.remove(g)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:A,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:C}}function L_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function D_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ou(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function au(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,f,p,_,x,m){let h=i[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:_,renderOrder:d.renderOrder,z:x,group:m},i[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=_,h.renderOrder=d.renderOrder,h.z=x,h.group=m),e++,h}function a(d,f,p,_,x,m){const h=o(d,f,p,_,x,m);p.transmission>0?n.push(h):p.transparent===!0?s.push(h):t.push(h)}function l(d,f,p,_,x,m){const h=o(d,f,p,_,x,m);p.transmission>0?n.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||D_),n.length>1&&n.sort(f||ou),s.length>1&&s.sort(f||ou)}function u(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function I_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new au,i.set(n,[o])):s>=r.length?(o=new au,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function U_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Qe};break;case"SpotLight":t={position:new L,direction:new L,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function N_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let O_=0;function F_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function k_(i){const e=new U_,t=N_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new gt,o=new gt;function a(c){let u=0,d=0,f=0;for(let g=0;g<9;g++)n.probe[g].set(0,0,0);let p=0,_=0,x=0,m=0,h=0,b=0,S=0,v=0,A=0,w=0,T=0;c.sort(F_);for(let g=0,y=c.length;g<y;g++){const P=c[g],B=P.color,O=P.intensity,H=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=B.r*O,d+=B.g*O,f+=B.b*O;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],O);T++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=P.shadow.matrix,b++}n.directional[p]=X,p++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(B).multiplyScalar(O),X.distance=H,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[x]=X;const K=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,K.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[x]=K.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=$,v++}x++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(B).multiplyScalar(O),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const K=P.shadow,G=t.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[_]=G,n.pointShadowMap[_]=$,n.pointShadowMatrix[_]=P.shadow.matrix,S++}n.point[_]=X,_++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(O),X.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[h]=X,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==p||C.pointLength!==_||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==h||C.numDirectionalShadows!==b||C.numPointShadows!==S||C.numSpotShadows!==v||C.numSpotMaps!==A||C.numLightProbes!==T)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=_,n.hemi.length=h,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,C.directionalLength=p,C.pointLength=_,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=h,C.numDirectionalShadows=b,C.numPointShadows=S,C.numSpotShadows=v,C.numSpotMaps=A,C.numLightProbes=T,n.version=O_++)}function l(c,u){let d=0,f=0,p=0,_=0,x=0;const m=u.matrixWorldInverse;for(let h=0,b=c.length;h<b;h++){const S=c[h];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function lu(i){const e=new k_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function B_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new lu(i),e.set(s,[a])):r>=o.length?(a=new lu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class z_ extends js{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class V_ extends js{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const H_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function W_(i,e,t){let n=new zl;const s=new fe,r=new fe,o=new pt,a=new z_({depthPacking:Ff}),l=new V_,c={},u=t.maxTextureSize,d={[Ri]:$t,[$t]:Ri,[hn]:hn},f=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:H_,fragmentShader:G_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Xt;_.setAttribute("position",new Dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new He(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rd;let h=this.type;this.render=function(w,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const g=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),B=i.state;B.setBlending(vi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=h!==Wn&&this.type===Wn,H=h===Wn&&this.type!==Wn;for(let $=0,X=w.length;$<X;$++){const K=w[$],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ue=G.getFrameExtents();if(s.multiply(ue),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ue.x),s.x=r.x*ue.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ue.y),s.y=r.y*ue.y,G.mapSize.y=r.y)),G.map===null||O===!0||H===!0){const Te=this.type!==Wn?{minFilter:Tn,magFilter:Tn}:{};G.map!==null&&G.map.dispose(),G.map=new ni(s.x,s.y,Te),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ge=G.getViewportCount();for(let Te=0;Te<ge;Te++){const ze=G.getViewport(Te);o.set(r.x*ze.x,r.y*ze.y,r.x*ze.z,r.y*ze.w),B.viewport(o),G.updateMatrices(K,Te),n=G.getFrustum(),v(T,C,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===Wn&&b(G,C),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(g,y,P)};function b(w,T){const C=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ni(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,C,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,C,p,x,null)}function S(w,T,C,g){let y=null;const P=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)y=P;else if(y=C.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const B=y.uuid,O=T.uuid;let H=c[B];H===void 0&&(H={},c[B]=H);let $=H[O];$===void 0&&($=y.clone(),H[O]=$,T.addEventListener("dispose",A)),y=$}if(y.visible=T.visible,y.wireframe=T.wireframe,g===Wn?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=C}return y}function v(w,T,C,g,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Wn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const O=e.update(w),H=w.material;if(Array.isArray(H)){const $=O.groups;for(let X=0,K=$.length;X<K;X++){const G=$[X],ue=H[G.materialIndex];if(ue&&ue.visible){const ge=S(w,ue,g,y);w.onBeforeShadow(i,w,T,C,O,ge,G),i.renderBufferDirect(C,null,O,ge,w,G),w.onAfterShadow(i,w,T,C,O,ge,G)}}}else if(H.visible){const $=S(w,H,g,y);w.onBeforeShadow(i,w,T,C,O,$,null),i.renderBufferDirect(C,null,O,$,w,null),w.onAfterShadow(i,w,T,C,O,$,null)}}const B=w.children;for(let O=0,H=B.length;O<H;O++)v(B[O],T,C,g,y)}function A(w){w.target.removeEventListener("dispose",A);for(const C in c){const g=c[C],y=w.target.uuid;y in g&&(g[y].dispose(),delete g[y])}}}const X_={[Fa]:ka,[Ba]:Ha,[za]:Ga,[ks]:Va,[ka]:Fa,[Ha]:Ba,[Ga]:za,[Va]:ks};function q_(i,e){function t(){let U=!1;const he=new pt;let Y=null;const Z=new pt(0,0,0,0);return{setMask:function(Se){Y!==Se&&!U&&(i.colorMask(Se,Se,Se,Se),Y=Se)},setLocked:function(Se){U=Se},setClear:function(Se,xe,Ge,Mt,zt){zt===!0&&(Se*=Mt,xe*=Mt,Ge*=Mt),he.set(Se,xe,Ge,Mt),Z.equals(he)===!1&&(i.clearColor(Se,xe,Ge,Mt),Z.copy(he))},reset:function(){U=!1,Y=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,he=!1,Y=null,Z=null,Se=null;return{setReversed:function(xe){if(he!==xe){const Ge=e.get("EXT_clip_control");he?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const Mt=Se;Se=null,this.setClear(Mt)}he=xe},getReversed:function(){return he},setTest:function(xe){xe?J(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(xe){Y!==xe&&!U&&(i.depthMask(xe),Y=xe)},setFunc:function(xe){if(he&&(xe=X_[xe]),Z!==xe){switch(xe){case Fa:i.depthFunc(i.NEVER);break;case ka:i.depthFunc(i.ALWAYS);break;case Ba:i.depthFunc(i.LESS);break;case ks:i.depthFunc(i.LEQUAL);break;case za:i.depthFunc(i.EQUAL);break;case Va:i.depthFunc(i.GEQUAL);break;case Ha:i.depthFunc(i.GREATER);break;case Ga:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=xe}},setLocked:function(xe){U=xe},setClear:function(xe){Se!==xe&&(he&&(xe=1-xe),i.clearDepth(xe),Se=xe)},reset:function(){U=!1,Y=null,Z=null,Se=null,he=!1}}}function s(){let U=!1,he=null,Y=null,Z=null,Se=null,xe=null,Ge=null,Mt=null,zt=null;return{setTest:function(mt){U||(mt?J(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(mt){he!==mt&&!U&&(i.stencilMask(mt),he=mt)},setFunc:function(mt,gn,On){(Y!==mt||Z!==gn||Se!==On)&&(i.stencilFunc(mt,gn,On),Y=mt,Z=gn,Se=On)},setOp:function(mt,gn,On){(xe!==mt||Ge!==gn||Mt!==On)&&(i.stencilOp(mt,gn,On),xe=mt,Ge=gn,Mt=On)},setLocked:function(mt){U=mt},setClear:function(mt){zt!==mt&&(i.clearStencil(mt),zt=mt)},reset:function(){U=!1,he=null,Y=null,Z=null,Se=null,xe=null,Ge=null,Mt=null,zt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],_=null,x=!1,m=null,h=null,b=null,S=null,v=null,A=null,w=null,T=new Qe(0,0,0),C=0,g=!1,y=null,P=null,B=null,O=null,H=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=K>=2);let ue=null,ge={};const Te=i.getParameter(i.SCISSOR_BOX),ze=i.getParameter(i.VIEWPORT),tt=new pt().fromArray(Te),j=new pt().fromArray(ze);function N(U,he,Y,Z){const Se=new Uint8Array(4),xe=i.createTexture();i.bindTexture(U,xe),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<Y;Ge++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(he+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return xe}const ie={};ie[i.TEXTURE_2D]=N(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=N(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=N(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=N(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(ks),qe(!1),Be(fc),J(i.CULL_FACE),D(vi);function J(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function pe(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function oe(U,he){return d[U]!==he?(i.bindFramebuffer(U,he),d[U]=he,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=he),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Ee(U,he){let Y=p,Z=!1;if(U){Y=f.get(he),Y===void 0&&(Y=[],f.set(he,Y));const Se=U.textures;if(Y.length!==Se.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,Ge=Se.length;xe<Ge;xe++)Y[xe]=i.COLOR_ATTACHMENT0+xe;Y.length=Se.length,Z=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Z=!0);Z&&i.drawBuffers(Y)}function Ve(U){return _!==U?(i.useProgram(U),_=U,!0):!1}const ke={[qi]:i.FUNC_ADD,[uf]:i.FUNC_SUBTRACT,[df]:i.FUNC_REVERSE_SUBTRACT};ke[hf]=i.MIN,ke[ff]=i.MAX;const le={[pf]:i.ZERO,[mf]:i.ONE,[gf]:i.SRC_COLOR,[Na]:i.SRC_ALPHA,[Mf]:i.SRC_ALPHA_SATURATE,[xf]:i.DST_COLOR,[vf]:i.DST_ALPHA,[_f]:i.ONE_MINUS_SRC_COLOR,[Oa]:i.ONE_MINUS_SRC_ALPHA,[Sf]:i.ONE_MINUS_DST_COLOR,[yf]:i.ONE_MINUS_DST_ALPHA,[bf]:i.CONSTANT_COLOR,[Ef]:i.ONE_MINUS_CONSTANT_COLOR,[wf]:i.CONSTANT_ALPHA,[Tf]:i.ONE_MINUS_CONSTANT_ALPHA};function D(U,he,Y,Z,Se,xe,Ge,Mt,zt,mt){if(U===vi){x===!0&&(pe(i.BLEND),x=!1);return}if(x===!1&&(J(i.BLEND),x=!0),U!==cf){if(U!==m||mt!==g){if((h!==qi||v!==qi)&&(i.blendEquation(i.FUNC_ADD),h=qi,v=qi),mt)switch(U){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pc:i.blendFunc(i.ONE,i.ONE);break;case mc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,S=null,A=null,w=null,T.set(0,0,0),C=0,m=U,g=mt}return}Se=Se||he,xe=xe||Y,Ge=Ge||Z,(he!==h||Se!==v)&&(i.blendEquationSeparate(ke[he],ke[Se]),h=he,v=Se),(Y!==b||Z!==S||xe!==A||Ge!==w)&&(i.blendFuncSeparate(le[Y],le[Z],le[xe],le[Ge]),b=Y,S=Z,A=xe,w=Ge),(Mt.equals(T)===!1||zt!==C)&&(i.blendColor(Mt.r,Mt.g,Mt.b,zt),T.copy(Mt),C=zt),m=U,g=!1}function rt(U,he){U.side===hn?pe(i.CULL_FACE):J(i.CULL_FACE);let Y=U.side===$t;he&&(Y=!Y),qe(Y),U.blending===Us&&U.transparent===!1?D(vi):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),nt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function Be(U){U!==af?(J(i.CULL_FACE),U!==P&&(U===fc?i.cullFace(i.BACK):U===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),P=U}function Ie(U){U!==B&&(X&&i.lineWidth(U),B=U)}function nt(U,he,Y){U?(J(i.POLYGON_OFFSET_FILL),(O!==he||H!==Y)&&(i.polygonOffset(he,Y),O=he,H=Y)):pe(i.POLYGON_OFFSET_FILL)}function Ue(U){U?J(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function R(U){U===void 0&&(U=i.TEXTURE0+$-1),ue!==U&&(i.activeTexture(U),ue=U)}function M(U,he,Y){Y===void 0&&(ue===null?Y=i.TEXTURE0+$-1:Y=ue);let Z=ge[Y];Z===void 0&&(Z={type:void 0,texture:void 0},ge[Y]=Z),(Z.type!==U||Z.texture!==he)&&(ue!==Y&&(i.activeTexture(Y),ue=Y),i.bindTexture(U,he||ie[U]),Z.type=U,Z.texture=he)}function V(){const U=ge[ue];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(U){tt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),tt.copy(U))}function ae(U){j.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),j.copy(U))}function Re(U,he){let Y=c.get(he);Y===void 0&&(Y=new WeakMap,c.set(he,Y));let Z=Y.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(he,U.name),Y.set(U,Z))}function be(U,he){const Z=c.get(he).get(U);l.get(he)!==Z&&(i.uniformBlockBinding(he,Z,U.__bindingPointIndex),l.set(he,Z))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ue=null,ge={},d={},f=new WeakMap,p=[],_=null,x=!1,m=null,h=null,b=null,S=null,v=null,A=null,w=null,T=new Qe(0,0,0),C=0,g=!1,y=null,P=null,B=null,O=null,H=null,tt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:pe,bindFramebuffer:oe,drawBuffers:Ee,useProgram:Ve,setBlending:D,setMaterial:rt,setFlipSided:qe,setCullFace:Be,setLineWidth:Ie,setPolygonOffset:nt,setScissorTest:Ue,activeTexture:R,bindTexture:M,unbindTexture:V,compressedTexImage2D:te,compressedTexImage3D:se,texImage2D:z,texImage3D:ne,updateUBOMapping:Re,uniformBlockBinding:be,texStorage2D:it,texStorage3D:ce,texSubImage2D:ee,texSubImage3D:Ae,compressedTexSubImage2D:_e,compressedTexSubImage3D:ye,scissor:me,viewport:ae,reset:Fe}}function cu(i,e,t,n){const s=Y_(n);switch(t){case fd:return i*e;case md:return i*e;case gd:return i*e*2;case _d:return i*e/s.components*s.byteLength;case Ol:return i*e/s.components*s.byteLength;case vd:return i*e*2/s.components*s.byteLength;case Fl:return i*e*2/s.components*s.byteLength;case pd:return i*e*3/s.components*s.byteLength;case bn:return i*e*4/s.components*s.byteLength;case kl:return i*e*4/s.components*s.byteLength;case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $a:case Ka:return Math.max(i,16)*Math.max(e,8)/4;case Ya:case ja:return Math.max(i,8)*Math.max(e,8)/2;case Ja:case Za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case hl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vo:case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*16;case yd:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _l:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Y_(i){switch(i){case ti:case ud:return{byteLength:1,components:1};case xr:case dd:case Ys:return{byteLength:2,components:1};case Ul:case Nl:return{byteLength:2,components:4};case Qi:case Il:case Jn:return{byteLength:4,components:1};case hd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function $_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,M){return p?new OffscreenCanvas(R,M):To("canvas")}function x(R,M,V){let te=1;const se=Ue(R);if((se.width>V||se.height>V)&&(te=V/Math.max(se.width,se.height)),te<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor(te*se.width),Ae=Math.floor(te*se.height);d===void 0&&(d=_(ee,Ae));const _e=M?_(ee,Ae):d;return _e.width=ee,_e.height=Ae,_e.getContext("2d").drawImage(R,0,0,ee,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ee+"x"+Ae+")."),_e}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),R;return R}function m(R){return R.generateMipmaps}function h(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,M,V,te,se=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=M;if(M===i.RED&&(V===i.FLOAT&&(ee=i.R32F),V===i.HALF_FLOAT&&(ee=i.R16F),V===i.UNSIGNED_BYTE&&(ee=i.R8)),M===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.R8UI),V===i.UNSIGNED_SHORT&&(ee=i.R16UI),V===i.UNSIGNED_INT&&(ee=i.R32UI),V===i.BYTE&&(ee=i.R8I),V===i.SHORT&&(ee=i.R16I),V===i.INT&&(ee=i.R32I)),M===i.RG&&(V===i.FLOAT&&(ee=i.RG32F),V===i.HALF_FLOAT&&(ee=i.RG16F),V===i.UNSIGNED_BYTE&&(ee=i.RG8)),M===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RG8UI),V===i.UNSIGNED_SHORT&&(ee=i.RG16UI),V===i.UNSIGNED_INT&&(ee=i.RG32UI),V===i.BYTE&&(ee=i.RG8I),V===i.SHORT&&(ee=i.RG16I),V===i.INT&&(ee=i.RG32I)),M===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),V===i.UNSIGNED_INT&&(ee=i.RGB32UI),V===i.BYTE&&(ee=i.RGB8I),V===i.SHORT&&(ee=i.RGB16I),V===i.INT&&(ee=i.RGB32I)),M===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),V===i.UNSIGNED_INT&&(ee=i.RGBA32UI),V===i.BYTE&&(ee=i.RGBA8I),V===i.SHORT&&(ee=i.RGBA16I),V===i.INT&&(ee=i.RGBA32I)),M===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),M===i.RGBA){const Ae=se?Oo:lt.getTransfer(te);V===i.FLOAT&&(ee=i.RGBA32F),V===i.HALF_FLOAT&&(ee=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ee=Ae===vt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(R,M){let V;return R?M===null||M===Qi||M===Vs?V=i.DEPTH24_STENCIL8:M===Jn?V=i.DEPTH32F_STENCIL8:M===xr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Qi||M===Vs?V=i.DEPTH_COMPONENT24:M===Jn?V=i.DEPTH_COMPONENT32F:M===xr&&(V=i.DEPTH_COMPONENT16),V}function A(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Tn&&R.minFilter!==Ln?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function w(R){const M=R.target;M.removeEventListener("dispose",w),C(M),M.isVideoTexture&&u.delete(M)}function T(R){const M=R.target;M.removeEventListener("dispose",T),y(M)}function C(R){const M=n.get(R);if(M.__webglInit===void 0)return;const V=R.source,te=f.get(V);if(te){const se=te[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&g(R),Object.keys(te).length===0&&f.delete(V)}n.remove(R)}function g(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const V=R.source,te=f.get(V);delete te[M.__cacheKey],o.memory.textures--}function y(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(M.__webglFramebuffer[te]))for(let se=0;se<M.__webglFramebuffer[te].length;se++)i.deleteFramebuffer(M.__webglFramebuffer[te][se]);else i.deleteFramebuffer(M.__webglFramebuffer[te]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[te])}else{if(Array.isArray(M.__webglFramebuffer))for(let te=0;te<M.__webglFramebuffer.length;te++)i.deleteFramebuffer(M.__webglFramebuffer[te]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let te=0;te<M.__webglColorRenderbuffer.length;te++)M.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[te]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const V=R.textures;for(let te=0,se=V.length;te<se;te++){const ee=n.get(V[te]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(V[te])}n.remove(R)}let P=0;function B(){P=0}function O(){const R=P;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function H(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function $(R,M){const V=n.get(R);if(R.isVideoTexture&&Ie(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(V,R,M);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+M)}function X(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){j(V,R,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+M)}function K(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){j(V,R,M);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+M)}function G(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){N(V,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+M)}const ue={[yr]:i.REPEAT,[ji]:i.CLAMP_TO_EDGE,[qa]:i.MIRRORED_REPEAT},ge={[Tn]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Nr]:i.NEAREST_MIPMAP_LINEAR,[Ln]:i.LINEAR,[jo]:i.LINEAR_MIPMAP_NEAREST,[Ki]:i.LINEAR_MIPMAP_LINEAR},Te={[Bf]:i.NEVER,[Xf]:i.ALWAYS,[zf]:i.LESS,[Sd]:i.LEQUAL,[Vf]:i.EQUAL,[Wf]:i.GEQUAL,[Hf]:i.GREATER,[Gf]:i.NOTEQUAL};function ze(R,M){if(M.type===Jn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Ln||M.magFilter===jo||M.magFilter===Nr||M.magFilter===Ki||M.minFilter===Ln||M.minFilter===jo||M.minFilter===Nr||M.minFilter===Ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ue[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ue[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ue[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ge[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ge[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Tn||M.minFilter!==Nr&&M.minFilter!==Ki||M.type===Jn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function tt(R,M){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",w));const te=M.source;let se=f.get(te);se===void 0&&(se={},f.set(te,se));const ee=H(M);if(ee!==R.__cacheKey){se[ee]===void 0&&(se[ee]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),se[ee].usedTimes++;const Ae=se[R.__cacheKey];Ae!==void 0&&(se[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&g(M)),R.__cacheKey=ee,R.__webglTexture=se[ee].texture}return V}function j(R,M,V){let te=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(te=i.TEXTURE_3D);const se=tt(R,M),ee=M.source;t.bindTexture(te,R.__webglTexture,i.TEXTURE0+V);const Ae=n.get(ee);if(ee.version!==Ae.__version||se===!0){t.activeTexture(i.TEXTURE0+V);const _e=lt.getPrimaries(lt.workingColorSpace),ye=M.colorSpace===gi?null:lt.getPrimaries(M.colorSpace),it=M.colorSpace===gi||_e===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let ce=x(M.image,!1,s.maxTextureSize);ce=nt(M,ce);const z=r.convert(M.format,M.colorSpace),ne=r.convert(M.type);let me=S(M.internalFormat,z,ne,M.colorSpace,M.isVideoTexture);ze(te,M);let ae;const Re=M.mipmaps,be=M.isVideoTexture!==!0,Fe=Ae.__version===void 0||se===!0,U=ee.dataReady,he=A(M,ce);if(M.isDepthTexture)me=v(M.format===Hs,M.type),Fe&&(be?t.texStorage2D(i.TEXTURE_2D,1,me,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,me,ce.width,ce.height,0,z,ne,null));else if(M.isDataTexture)if(Re.length>0){be&&Fe&&t.texStorage2D(i.TEXTURE_2D,he,me,Re[0].width,Re[0].height);for(let Y=0,Z=Re.length;Y<Z;Y++)ae=Re[Y],be?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ae.width,ae.height,z,ne,ae.data):t.texImage2D(i.TEXTURE_2D,Y,me,ae.width,ae.height,0,z,ne,ae.data);M.generateMipmaps=!1}else be?(Fe&&t.texStorage2D(i.TEXTURE_2D,he,me,ce.width,ce.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce.width,ce.height,z,ne,ce.data)):t.texImage2D(i.TEXTURE_2D,0,me,ce.width,ce.height,0,z,ne,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){be&&Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,me,Re[0].width,Re[0].height,ce.depth);for(let Y=0,Z=Re.length;Y<Z;Y++)if(ae=Re[Y],M.format!==bn)if(z!==null)if(be){if(U)if(M.layerUpdates.size>0){const Se=cu(ae.width,ae.height,M.format,M.type);for(const xe of M.layerUpdates){const Ge=ae.data.subarray(xe*Se/ae.data.BYTES_PER_ELEMENT,(xe+1)*Se/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,xe,ae.width,ae.height,1,z,Ge)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ae.width,ae.height,ce.depth,z,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,me,ae.width,ae.height,ce.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ae.width,ae.height,ce.depth,z,ne,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,me,ae.width,ae.height,ce.depth,0,z,ne,ae.data)}else{be&&Fe&&t.texStorage2D(i.TEXTURE_2D,he,me,Re[0].width,Re[0].height);for(let Y=0,Z=Re.length;Y<Z;Y++)ae=Re[Y],M.format!==bn?z!==null?be?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,ae.width,ae.height,z,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ae.width,ae.height,z,ne,ae.data):t.texImage2D(i.TEXTURE_2D,Y,me,ae.width,ae.height,0,z,ne,ae.data)}else if(M.isDataArrayTexture)if(be){if(Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,me,ce.width,ce.height,ce.depth),U)if(M.layerUpdates.size>0){const Y=cu(ce.width,ce.height,M.format,M.type);for(const Z of M.layerUpdates){const Se=ce.data.subarray(Z*Y/ce.data.BYTES_PER_ELEMENT,(Z+1)*Y/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,ce.width,ce.height,1,z,ne,Se)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,z,ne,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ce.width,ce.height,ce.depth,0,z,ne,ce.data);else if(M.isData3DTexture)be?(Fe&&t.texStorage3D(i.TEXTURE_3D,he,me,ce.width,ce.height,ce.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,z,ne,ce.data)):t.texImage3D(i.TEXTURE_3D,0,me,ce.width,ce.height,ce.depth,0,z,ne,ce.data);else if(M.isFramebufferTexture){if(Fe)if(be)t.texStorage2D(i.TEXTURE_2D,he,me,ce.width,ce.height);else{let Y=ce.width,Z=ce.height;for(let Se=0;Se<he;Se++)t.texImage2D(i.TEXTURE_2D,Se,me,Y,Z,0,z,ne,null),Y>>=1,Z>>=1}}else if(Re.length>0){if(be&&Fe){const Y=Ue(Re[0]);t.texStorage2D(i.TEXTURE_2D,he,me,Y.width,Y.height)}for(let Y=0,Z=Re.length;Y<Z;Y++)ae=Re[Y],be?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,z,ne,ae):t.texImage2D(i.TEXTURE_2D,Y,me,z,ne,ae);M.generateMipmaps=!1}else if(be){if(Fe){const Y=Ue(ce);t.texStorage2D(i.TEXTURE_2D,he,me,Y.width,Y.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,z,ne,ce)}else t.texImage2D(i.TEXTURE_2D,0,me,z,ne,ce);m(M)&&h(te),Ae.__version=ee.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function N(R,M,V){if(M.image.length!==6)return;const te=tt(R,M),se=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const ee=n.get(se);if(se.version!==ee.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const Ae=lt.getPrimaries(lt.workingColorSpace),_e=M.colorSpace===gi?null:lt.getPrimaries(M.colorSpace),ye=M.colorSpace===gi||Ae===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const it=M.isCompressedTexture||M.image[0].isCompressedTexture,ce=M.image[0]&&M.image[0].isDataTexture,z=[];for(let Z=0;Z<6;Z++)!it&&!ce?z[Z]=x(M.image[Z],!0,s.maxCubemapSize):z[Z]=ce?M.image[Z].image:M.image[Z],z[Z]=nt(M,z[Z]);const ne=z[0],me=r.convert(M.format,M.colorSpace),ae=r.convert(M.type),Re=S(M.internalFormat,me,ae,M.colorSpace),be=M.isVideoTexture!==!0,Fe=ee.__version===void 0||te===!0,U=se.dataReady;let he=A(M,ne);ze(i.TEXTURE_CUBE_MAP,M);let Y;if(it){be&&Fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Re,ne.width,ne.height);for(let Z=0;Z<6;Z++){Y=z[Z].mipmaps;for(let Se=0;Se<Y.length;Se++){const xe=Y[Se];M.format!==bn?me!==null?be?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se,0,0,xe.width,xe.height,me,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se,Re,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se,0,0,xe.width,xe.height,me,ae,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se,Re,xe.width,xe.height,0,me,ae,xe.data)}}}else{if(Y=M.mipmaps,be&&Fe){Y.length>0&&he++;const Z=Ue(z[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Re,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ce){be?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,z[Z].width,z[Z].height,me,ae,z[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Re,z[Z].width,z[Z].height,0,me,ae,z[Z].data);for(let Se=0;Se<Y.length;Se++){const Ge=Y[Se].image[Z].image;be?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se+1,0,0,Ge.width,Ge.height,me,ae,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se+1,Re,Ge.width,Ge.height,0,me,ae,Ge.data)}}else{be?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,me,ae,z[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Re,me,ae,z[Z]);for(let Se=0;Se<Y.length;Se++){const xe=Y[Se];be?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se+1,0,0,me,ae,xe.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Se+1,Re,me,ae,xe.image[Z])}}}m(M)&&h(i.TEXTURE_CUBE_MAP),ee.__version=se.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ie(R,M,V,te,se,ee){const Ae=r.convert(V.format,V.colorSpace),_e=r.convert(V.type),ye=S(V.internalFormat,Ae,_e,V.colorSpace),it=n.get(M),ce=n.get(V);if(ce.__renderTarget=M,!it.__hasExternalTextures){const z=Math.max(1,M.width>>ee),ne=Math.max(1,M.height>>ee);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,ee,ye,z,ne,M.depth,0,Ae,_e,null):t.texImage2D(se,ee,ye,z,ne,0,Ae,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Be(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,se,ce.__webglTexture,0,qe(M)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,se,ce.__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function J(R,M,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const te=M.depthTexture,se=te&&te.isDepthTexture?te.type:null,ee=v(M.stencilBuffer,se),Ae=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=qe(M);Be(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,ee,M.width,M.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ee,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,R)}else{const te=M.textures;for(let se=0;se<te.length;se++){const ee=te[se],Ae=r.convert(ee.format,ee.colorSpace),_e=r.convert(ee.type),ye=S(ee.internalFormat,Ae,_e,ee.colorSpace),it=qe(M);V&&Be(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,ye,M.width,M.height):Be(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,ye,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ye,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(M.depthTexture);te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const se=te.__webglTexture,ee=qe(M);if(M.depthTexture.format===Ns)Be(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(M.depthTexture.format===Hs)Be(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function oe(R){const M=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const te=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),te){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,te.removeEventListener("dispose",se)};te.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=te}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");pe(M.__webglFramebuffer,R)}else if(V){M.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[te]),M.__webglDepthbuffer[te]===void 0)M.__webglDepthbuffer[te]=i.createRenderbuffer(),J(M.__webglDepthbuffer[te],R,!1);else{const se=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),J(M.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(R,M,V){const te=n.get(R);M!==void 0&&ie(te.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&oe(R)}function Ve(R){const M=R.texture,V=n.get(R),te=n.get(M);R.addEventListener("dispose",T);const se=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Ae=se.length>1;if(Ae||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=M.version,o.memory.textures++),ee){V.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[_e]=[];for(let ye=0;ye<M.mipmaps.length;ye++)V.__webglFramebuffer[_e][ye]=i.createFramebuffer()}else V.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let _e=0;_e<M.mipmaps.length;_e++)V.__webglFramebuffer[_e]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let _e=0,ye=se.length;_e<ye;_e++){const it=n.get(se[_e]);it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Be(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let _e=0;_e<se.length;_e++){const ye=se[_e];V.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[_e]);const it=r.convert(ye.format,ye.colorSpace),ce=r.convert(ye.type),z=S(ye.internalFormat,it,ce,ye.colorSpace,R.isXRRenderTarget===!0),ne=qe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,z,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,V.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),J(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ze(i.TEXTURE_CUBE_MAP,M);for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0)for(let ye=0;ye<M.mipmaps.length;ye++)ie(V.__webglFramebuffer[_e][ye],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ye);else ie(V.__webglFramebuffer[_e],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(M)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let _e=0,ye=se.length;_e<ye;_e++){const it=se[_e],ce=n.get(it);t.bindTexture(i.TEXTURE_2D,ce.__webglTexture),ze(i.TEXTURE_2D,it),ie(V.__webglFramebuffer,R,it,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),m(it)&&h(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_e=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,te.__webglTexture),ze(_e,M),M.mipmaps&&M.mipmaps.length>0)for(let ye=0;ye<M.mipmaps.length;ye++)ie(V.__webglFramebuffer[ye],R,M,i.COLOR_ATTACHMENT0,_e,ye);else ie(V.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,_e,0);m(M)&&h(_e),t.unbindTexture()}R.depthBuffer&&oe(R)}function ke(R){const M=R.textures;for(let V=0,te=M.length;V<te;V++){const se=M[V];if(m(se)){const ee=b(R),Ae=n.get(se).__webglTexture;t.bindTexture(ee,Ae),h(ee),t.unbindTexture()}}}const le=[],D=[];function rt(R){if(R.samples>0){if(Be(R)===!1){const M=R.textures,V=R.width,te=R.height;let se=i.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(R),_e=M.length>1;if(_e)for(let ye=0;ye<M.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let ye=0;ye<M.length;ye++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const it=n.get(M[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,V,te,0,0,V,te,se,i.NEAREST),l===!0&&(le.length=0,D.length=0,le.push(i.COLOR_ATTACHMENT0+ye),R.depthBuffer&&R.resolveDepthBuffer===!1&&(le.push(ee),D.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,le))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let ye=0;ye<M.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const it=n.get(M[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,it,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function qe(R){return Math.min(s.maxSamples,R.samples)}function Be(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ie(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function nt(R,M){const V=R.colorSpace,te=R.format,se=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==$s&&V!==gi&&(lt.getTransfer(V)===vt?(te!==bn||se!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}function Ue(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=Ee,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Be}function j_(i,e){function t(n,s=gi){let r;const o=lt.getTransfer(s);if(n===ti)return i.UNSIGNED_BYTE;if(n===Ul)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ud)return i.BYTE;if(n===dd)return i.SHORT;if(n===xr)return i.UNSIGNED_SHORT;if(n===Il)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Jn)return i.FLOAT;if(n===Ys)return i.HALF_FLOAT;if(n===fd)return i.ALPHA;if(n===pd)return i.RGB;if(n===bn)return i.RGBA;if(n===md)return i.LUMINANCE;if(n===gd)return i.LUMINANCE_ALPHA;if(n===Ns)return i.DEPTH_COMPONENT;if(n===Hs)return i.DEPTH_STENCIL;if(n===_d)return i.RED;if(n===Ol)return i.RED_INTEGER;if(n===vd)return i.RG;if(n===Fl)return i.RG_INTEGER;if(n===kl)return i.RGBA_INTEGER;if(n===po||n===mo||n===go||n===_o)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ya||n===$a||n===ja||n===Ka)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ja||n===Za||n===Qa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ja||n===Za)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===ul||n===dl||n===hl||n===fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===el)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===il)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ol)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===al)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ll)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ul)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===dl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vo||n===pl||n===ml)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===vo)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yd||n===gl||n===_l||n===vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_l)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class K_ extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Xe extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const J_={type:"move"};class ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(J_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ev{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new jt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ii({vertexShader:Z_,fragmentShader:Q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new Ft(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tv extends is{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,_=null;const x=new ev,m=t.getContextAttributes();let h=null,b=null;const S=[],v=[],A=new fe;let w=null;const T=new Gt;T.viewport=new pt;const C=new Gt;C.viewport=new pt;const g=[T,C],y=new K_;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let N=S[j];return N===void 0&&(N=new ba,S[j]=N),N.getTargetRaySpace()},this.getControllerGrip=function(j){let N=S[j];return N===void 0&&(N=new ba,S[j]=N),N.getGripSpace()},this.getHand=function(j){let N=S[j];return N===void 0&&(N=new ba,S[j]=N),N.getHandSpace()};function O(j){const N=v.indexOf(j.inputSource);if(N===-1)return;const ie=S[N];ie!==void 0&&(ie.update(j.inputSource,j.frame,c||o),ie.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",$);for(let j=0;j<S.length;j++){const N=v[j];N!==null&&(v[j]=null,S[j].disconnect(N))}P=null,B=null,x.reset(),e.setRenderTarget(h),p=null,f=null,d=null,s=null,b=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(h=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const N={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,N),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new ni(p.framebufferWidth,p.framebufferHeight,{format:bn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let N=null,ie=null,J=null;m.depth&&(J=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,N=m.stencil?Hs:Ns,ie=m.stencil?Vs:Qi);const pe={colorFormat:t.RGBA8,depthFormat:J,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new ni(f.textureWidth,f.textureHeight,{format:bn,type:ti,depthTexture:new Ud(f.textureWidth,f.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,N),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),tt.setContext(s),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(j){for(let N=0;N<j.removed.length;N++){const ie=j.removed[N],J=v.indexOf(ie);J>=0&&(v[J]=null,S[J].disconnect(ie))}for(let N=0;N<j.added.length;N++){const ie=j.added[N];let J=v.indexOf(ie);if(J===-1){for(let oe=0;oe<S.length;oe++)if(oe>=v.length){v.push(ie),J=oe;break}else if(v[oe]===null){v[oe]=ie,J=oe;break}if(J===-1)break}const pe=S[J];pe&&pe.connect(ie)}}const X=new L,K=new L;function G(j,N,ie){X.setFromMatrixPosition(N.matrixWorld),K.setFromMatrixPosition(ie.matrixWorld);const J=X.distanceTo(K),pe=N.projectionMatrix.elements,oe=ie.projectionMatrix.elements,Ee=pe[14]/(pe[10]-1),Ve=pe[14]/(pe[10]+1),ke=(pe[9]+1)/pe[5],le=(pe[9]-1)/pe[5],D=(pe[8]-1)/pe[0],rt=(oe[8]+1)/oe[0],qe=Ee*D,Be=Ee*rt,Ie=J/(-D+rt),nt=Ie*-D;if(N.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(nt),j.translateZ(Ie),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),pe[10]===-1)j.projectionMatrix.copy(N.projectionMatrix),j.projectionMatrixInverse.copy(N.projectionMatrixInverse);else{const Ue=Ee+Ie,R=Ve+Ie,M=qe-nt,V=Be+(J-nt),te=ke*Ve/R*Ue,se=le*Ve/R*Ue;j.projectionMatrix.makePerspective(M,V,te,se,Ue,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ue(j,N){N===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(N.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let N=j.near,ie=j.far;x.texture!==null&&(x.depthNear>0&&(N=x.depthNear),x.depthFar>0&&(ie=x.depthFar)),y.near=C.near=T.near=N,y.far=C.far=T.far=ie,(P!==y.near||B!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,B=y.far),T.layers.mask=j.layers.mask|2,C.layers.mask=j.layers.mask|4,y.layers.mask=T.layers.mask|C.layers.mask;const J=j.parent,pe=y.cameras;ue(y,J);for(let oe=0;oe<pe.length;oe++)ue(pe[oe],J);pe.length===2?G(y,T,C):y.projectionMatrix.copy(T.projectionMatrix),ge(j,y,J)};function ge(j,N,ie){ie===null?j.matrix.copy(N.matrixWorld):(j.matrix.copy(ie.matrixWorld),j.matrix.invert(),j.matrix.multiply(N.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(N.projectionMatrix),j.projectionMatrixInverse.copy(N.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=wo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Te=null;function ze(j,N){if(u=N.getViewerPose(c||o),_=N,u!==null){const ie=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let J=!1;ie.length!==y.cameras.length&&(y.cameras.length=0,J=!0);for(let oe=0;oe<ie.length;oe++){const Ee=ie[oe];let Ve=null;if(p!==null)Ve=p.getViewport(Ee);else{const le=d.getViewSubImage(f,Ee);Ve=le.viewport,oe===0&&(e.setRenderTargetTextures(b,le.colorTexture,f.ignoreDepthValues?void 0:le.depthStencilTexture),e.setRenderTarget(b))}let ke=g[oe];ke===void 0&&(ke=new Gt,ke.layers.enable(oe),ke.viewport=new pt,g[oe]=ke),ke.matrix.fromArray(Ee.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Ee.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),oe===0&&(y.matrix.copy(ke.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),J===!0&&y.cameras.push(ke)}const pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")){const oe=d.getDepthInformation(ie[0]);oe&&oe.isValid&&oe.texture&&x.init(e,oe,s.renderState)}}for(let ie=0;ie<S.length;ie++){const J=v[ie],pe=S[ie];J!==null&&pe!==void 0&&pe.update(J,N,c||o)}Te&&Te(j,N),N.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:N}),_=null}const tt=new Dd;tt.setAnimationLoop(ze),this.setAnimationLoop=function(j){Te=j},this.dispose=function(){}}}const Gi=new Un,nv=new gt;function iv(i,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Rd(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,b,S,v){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),d(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h)):h.isMeshStandardMaterial?(r(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,v)):h.isMeshMatcapMaterial?(r(m,h),_(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,b,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===$t&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===$t&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const b=e.get(h),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,Gi.copy(v),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),m.envMapRotation.value.setFromMatrix4(nv.makeRotationFromEuler(Gi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,b,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*b,m.scale.value=S*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,b){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===$t&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const b=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function sv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=s[b.id];v===void 0&&(_(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",m));const A=S.program;n.updateUBOMapping(b,A);const w=e.render.frame;r[b.id]!==w&&(f(b),r[b.id]=w)}function u(b){const S=d();b.__bindingPointIndex=S;const v=i.createBuffer(),A=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=s[b.id],v=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,T=v.length;w<T;w++){const C=Array.isArray(v[w])?v[w]:[v[w]];for(let g=0,y=C.length;g<y;g++){const P=C[g];if(p(P,w,g,A)===!0){const B=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let $=0;$<O.length;$++){const X=O[$],K=x(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,B+H,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,H),H+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,S,v,A){const w=b.value,T=S+"_"+v;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{const C=A[T];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return A[T]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function _(b){const S=b.uniforms;let v=0;const A=16;for(let T=0,C=S.length;T<C;T++){const g=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,P=g.length;y<P;y++){const B=g[y],O=Array.isArray(B.value)?B.value:[B.value];for(let H=0,$=O.length;H<$;H++){const X=O[H],K=x(X),G=v%A,ue=G%K.boundary,ge=G+ue;v+=ue,ge!==0&&A-ge<K.storage&&(v+=A-ge),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=K.storage}}}const w=v%A;return w>0&&(v+=A-w),b.__size=v,b.__cache={},this}function x(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function h(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:h}}class rv{constructor(e={}){const{canvas:t=$f(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=new Uint32Array(4),x=new Int32Array(4);let m=null,h=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=yi,this.toneMappingExposure=1;const v=this;let A=!1,w=0,T=0,C=null,g=-1,y=null;const P=new pt,B=new pt;let O=null;const H=new Qe(0);let $=0,X=t.width,K=t.height,G=1,ue=null,ge=null;const Te=new pt(0,0,X,K),ze=new pt(0,0,X,K);let tt=!1;const j=new zl;let N=!1,ie=!1;const J=new gt,pe=new gt,oe=new L,Ee=new pt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function le(){return C===null?G:1}let D=n;function rt(E,F){return t.getContext(E,F)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dl}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",xe,!1),D===null){const F="webgl2";if(D=rt(F,E),D===null)throw rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let qe,Be,Ie,nt,Ue,R,M,V,te,se,ee,Ae,_e,ye,it,ce,z,ne,me,ae,Re,be,Fe,U;function he(){qe=new u0(D),qe.init(),be=new j_(D,qe),Be=new s0(D,qe,e,be),Ie=new q_(D,qe),Be.reverseDepthBuffer&&f&&Ie.buffers.depth.setReversed(!0),nt=new f0(D),Ue=new L_,R=new $_(D,qe,Ie,Ue,Be,be,nt),M=new o0(v),V=new c0(v),te=new xp(D),Fe=new n0(D,te),se=new d0(D,te,nt,Fe),ee=new m0(D,se,te,nt),me=new p0(D,Be,R),ce=new r0(Ue),Ae=new P_(v,M,V,qe,Be,Fe,ce),_e=new iv(v,Ue),ye=new I_,it=new B_(qe),ne=new t0(v,M,V,Ie,ee,p,l),z=new W_(v,ee,Be),U=new sv(D,nt,Be,Ie),ae=new i0(D,qe,nt),Re=new h0(D,qe,nt),nt.programs=Ae.programs,v.capabilities=Be,v.extensions=qe,v.properties=Ue,v.renderLists=ye,v.shadowMap=z,v.state=Ie,v.info=nt}he();const Y=new tv(v,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=qe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=qe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(X,K,!1))},this.getSize=function(E){return E.set(X,K)},this.setSize=function(E,F,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,K=F,t.width=Math.floor(E*G),t.height=Math.floor(F*G),W===!0&&(t.style.width=E+"px",t.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(X*G,K*G).floor()},this.setDrawingBufferSize=function(E,F,W){X=E,K=F,G=W,t.width=Math.floor(E*W),t.height=Math.floor(F*W),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(Te)},this.setViewport=function(E,F,W,q){E.isVector4?Te.set(E.x,E.y,E.z,E.w):Te.set(E,F,W,q),Ie.viewport(P.copy(Te).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(ze)},this.setScissor=function(E,F,W,q){E.isVector4?ze.set(E.x,E.y,E.z,E.w):ze.set(E,F,W,q),Ie.scissor(B.copy(ze).multiplyScalar(G).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(E){Ie.setScissorTest(tt=E)},this.setOpaqueSort=function(E){ue=E},this.setTransparentSort=function(E){ge=E},this.getClearColor=function(E){return E.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor.apply(ne,arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha.apply(ne,arguments)},this.clear=function(E=!0,F=!0,W=!0){let q=0;if(E){let k=!1;if(C!==null){const de=C.texture.format;k=de===kl||de===Fl||de===Ol}if(k){const de=C.texture.type,Me=de===ti||de===Qi||de===xr||de===Vs||de===Ul||de===Nl,Ce=ne.getClearColor(),Pe=ne.getClearAlpha(),We=Ce.r,je=Ce.g,Le=Ce.b;Me?(_[0]=We,_[1]=je,_[2]=Le,_[3]=Pe,D.clearBufferuiv(D.COLOR,0,_)):(x[0]=We,x[1]=je,x[2]=Le,x[3]=Pe,D.clearBufferiv(D.COLOR,0,x))}else q|=D.COLOR_BUFFER_BIT}F&&(q|=D.DEPTH_BUFFER_BIT),W&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),ye.dispose(),it.dispose(),Ue.dispose(),M.dispose(),V.dispose(),ee.dispose(),Fe.dispose(),U.dispose(),Ae.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",rc),Y.removeEventListener("sessionend",oc),Oi.stop()};function Z(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const E=nt.autoReset,F=z.enabled,W=z.autoUpdate,q=z.needsUpdate,k=z.type;he(),nt.autoReset=E,z.enabled=F,z.autoUpdate=W,z.needsUpdate=q,z.type=k}function xe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ge(E){const F=E.target;F.removeEventListener("dispose",Ge),Mt(F)}function Mt(E){zt(E),Ue.remove(E)}function zt(E){const F=Ue.get(E).programs;F!==void 0&&(F.forEach(function(W){Ae.releaseProgram(W)}),E.isShaderMaterial&&Ae.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,W,q,k,de){F===null&&(F=Ve);const Me=k.isMesh&&k.matrixWorld.determinant()<0,Ce=tf(E,F,W,q,k);Ie.setMaterial(q,Me);let Pe=W.index,We=1;if(q.wireframe===!0){if(Pe=se.getWireframeAttribute(W),Pe===void 0)return;We=2}const je=W.drawRange,Le=W.attributes.position;let ct=je.start*We,xt=(je.start+je.count)*We;de!==null&&(ct=Math.max(ct,de.start*We),xt=Math.min(xt,(de.start+de.count)*We)),Pe!==null?(ct=Math.max(ct,0),xt=Math.min(xt,Pe.count)):Le!=null&&(ct=Math.max(ct,0),xt=Math.min(xt,Le.count));const bt=xt-ct;if(bt<0||bt===1/0)return;Fe.setup(k,q,Ce,W,Pe);let Kt,dt=ae;if(Pe!==null&&(Kt=te.get(Pe),dt=Re,dt.setIndex(Kt)),k.isMesh)q.wireframe===!0?(Ie.setLineWidth(q.wireframeLinewidth*le()),dt.setMode(D.LINES)):dt.setMode(D.TRIANGLES);else if(k.isLine){let De=q.linewidth;De===void 0&&(De=1),Ie.setLineWidth(De*le()),k.isLineSegments?dt.setMode(D.LINES):k.isLineLoop?dt.setMode(D.LINE_LOOP):dt.setMode(D.LINE_STRIP)}else k.isPoints?dt.setMode(D.POINTS):k.isSprite&&dt.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)dt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))dt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const De=k._multiDrawStarts,Fn=k._multiDrawCounts,ht=k._multiDrawCount,_n=Pe?te.get(Pe).bytesPerElement:1,hs=Ue.get(q).currentProgram.getUniforms();for(let en=0;en<ht;en++)hs.setValue(D,"_gl_DrawID",en),dt.render(De[en]/_n,Fn[en])}else if(k.isInstancedMesh)dt.renderInstances(ct,bt,k.count);else if(W.isInstancedBufferGeometry){const De=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Fn=Math.min(W.instanceCount,De);dt.renderInstances(ct,bt,Fn)}else dt.render(ct,bt)};function mt(E,F,W){E.transparent===!0&&E.side===hn&&E.forceSinglePass===!1?(E.side=$t,E.needsUpdate=!0,Ur(E,F,W),E.side=Ri,E.needsUpdate=!0,Ur(E,F,W),E.side=hn):Ur(E,F,W)}this.compile=function(E,F,W=null){W===null&&(W=E),h=it.get(W),h.init(F),S.push(h),W.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(h.pushLight(k),k.castShadow&&h.pushShadow(k))}),E!==W&&E.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(h.pushLight(k),k.castShadow&&h.pushShadow(k))}),h.setupLights();const q=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const de=k.material;if(de)if(Array.isArray(de))for(let Me=0;Me<de.length;Me++){const Ce=de[Me];mt(Ce,W,k),q.add(Ce)}else mt(de,W,k),q.add(de)}),S.pop(),h=null,q},this.compileAsync=function(E,F,W=null){const q=this.compile(E,F,W);return new Promise(k=>{function de(){if(q.forEach(function(Me){Ue.get(Me).currentProgram.isReady()&&q.delete(Me)}),q.size===0){k(E);return}setTimeout(de,10)}qe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let gn=null;function On(E){gn&&gn(E)}function rc(){Oi.stop()}function oc(){Oi.start()}const Oi=new Dd;Oi.setAnimationLoop(On),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(E){gn=E,Y.setAnimationLoop(E),E===null?Oi.stop():Oi.start()},Y.addEventListener("sessionstart",rc),Y.addEventListener("sessionend",oc),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,F,C),h=it.get(E,S.length),h.init(F),S.push(h),pe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),j.setFromProjectionMatrix(pe),ie=this.localClippingEnabled,N=ce.init(this.clippingPlanes,ie),m=ye.get(E,b.length),m.init(),b.push(m),Y.enabled===!0&&Y.isPresenting===!0){const de=v.xr.getDepthSensingMesh();de!==null&&$o(de,F,-1/0,v.sortObjects)}$o(E,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ue,ge),ke=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ke&&ne.addToRenderList(m,E),this.info.render.frame++,N===!0&&ce.beginShadows();const W=h.state.shadowsArray;z.render(W,E,F),N===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,k=m.transmissive;if(h.setupLights(),F.isArrayCamera){const de=F.cameras;if(k.length>0)for(let Me=0,Ce=de.length;Me<Ce;Me++){const Pe=de[Me];lc(q,k,E,Pe)}ke&&ne.render(E);for(let Me=0,Ce=de.length;Me<Ce;Me++){const Pe=de[Me];ac(m,E,Pe,Pe.viewport)}}else k.length>0&&lc(q,k,E,F),ke&&ne.render(E),ac(m,E,F);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(v,E,F),Fe.resetDefaultState(),g=-1,y=null,S.pop(),S.length>0?(h=S[S.length-1],N===!0&&ce.setGlobalState(v.clippingPlanes,h.state.camera)):h=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function $o(E,F,W,q){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){q&&Ee.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pe);const Me=ee.update(E),Ce=E.material;Ce.visible&&m.push(E,Me,Ce,W,Ee.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const Me=ee.update(E),Ce=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ee.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ee.copy(Me.boundingSphere.center)),Ee.applyMatrix4(E.matrixWorld).applyMatrix4(pe)),Array.isArray(Ce)){const Pe=Me.groups;for(let We=0,je=Pe.length;We<je;We++){const Le=Pe[We],ct=Ce[Le.materialIndex];ct&&ct.visible&&m.push(E,Me,ct,W,Ee.z,Le)}}else Ce.visible&&m.push(E,Me,Ce,W,Ee.z,null)}}const de=E.children;for(let Me=0,Ce=de.length;Me<Ce;Me++)$o(de[Me],F,W,q)}function ac(E,F,W,q){const k=E.opaque,de=E.transmissive,Me=E.transparent;h.setupLightsView(W),N===!0&&ce.setGlobalState(v.clippingPlanes,W),q&&Ie.viewport(P.copy(q)),k.length>0&&Ir(k,F,W),de.length>0&&Ir(de,F,W),Me.length>0&&Ir(Me,F,W),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function lc(E,F,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[q.id]===void 0&&(h.state.transmissionRenderTarget[q.id]=new ni(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?Ys:ti,minFilter:Ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace}));const de=h.state.transmissionRenderTarget[q.id],Me=q.viewport||P;de.setSize(Me.z,Me.w);const Ce=v.getRenderTarget();v.setRenderTarget(de),v.getClearColor(H),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),ke&&ne.render(W);const Pe=v.toneMapping;v.toneMapping=yi;const We=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),h.setupLightsView(q),N===!0&&ce.setGlobalState(v.clippingPlanes,q),Ir(E,W,q),R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de),qe.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let Le=0,ct=F.length;Le<ct;Le++){const xt=F[Le],bt=xt.object,Kt=xt.geometry,dt=xt.material,De=xt.group;if(dt.side===hn&&bt.layers.test(q.layers)){const Fn=dt.side;dt.side=$t,dt.needsUpdate=!0,cc(bt,W,q,Kt,dt,De),dt.side=Fn,dt.needsUpdate=!0,je=!0}}je===!0&&(R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de))}v.setRenderTarget(Ce),v.setClearColor(H,$),We!==void 0&&(q.viewport=We),v.toneMapping=Pe}function Ir(E,F,W){const q=F.isScene===!0?F.overrideMaterial:null;for(let k=0,de=E.length;k<de;k++){const Me=E[k],Ce=Me.object,Pe=Me.geometry,We=q===null?Me.material:q,je=Me.group;Ce.layers.test(W.layers)&&cc(Ce,F,W,Pe,We,je)}}function cc(E,F,W,q,k,de){E.onBeforeRender(v,F,W,q,k,de),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(v,F,W,q,E,de),k.transparent===!0&&k.side===hn&&k.forceSinglePass===!1?(k.side=$t,k.needsUpdate=!0,v.renderBufferDirect(W,F,q,k,E,de),k.side=Ri,k.needsUpdate=!0,v.renderBufferDirect(W,F,q,k,E,de),k.side=hn):v.renderBufferDirect(W,F,q,k,E,de),E.onAfterRender(v,F,W,q,k,de)}function Ur(E,F,W){F.isScene!==!0&&(F=Ve);const q=Ue.get(E),k=h.state.lights,de=h.state.shadowsArray,Me=k.state.version,Ce=Ae.getParameters(E,k.state,de,F,W),Pe=Ae.getProgramCacheKey(Ce);let We=q.programs;q.environment=E.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(E.isMeshStandardMaterial?V:M).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,We===void 0&&(E.addEventListener("dispose",Ge),We=new Map,q.programs=We);let je=We.get(Pe);if(je!==void 0){if(q.currentProgram===je&&q.lightsStateVersion===Me)return dc(E,Ce),je}else Ce.uniforms=Ae.getUniforms(E),E.onBeforeCompile(Ce,v),je=Ae.acquireProgram(Ce,Pe),We.set(Pe,je),q.uniforms=Ce.uniforms;const Le=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=ce.uniform),dc(E,Ce),q.needsLights=sf(E),q.lightsStateVersion=Me,q.needsLights&&(Le.ambientLightColor.value=k.state.ambient,Le.lightProbe.value=k.state.probe,Le.directionalLights.value=k.state.directional,Le.directionalLightShadows.value=k.state.directionalShadow,Le.spotLights.value=k.state.spot,Le.spotLightShadows.value=k.state.spotShadow,Le.rectAreaLights.value=k.state.rectArea,Le.ltc_1.value=k.state.rectAreaLTC1,Le.ltc_2.value=k.state.rectAreaLTC2,Le.pointLights.value=k.state.point,Le.pointLightShadows.value=k.state.pointShadow,Le.hemisphereLights.value=k.state.hemi,Le.directionalShadowMap.value=k.state.directionalShadowMap,Le.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Le.spotShadowMap.value=k.state.spotShadowMap,Le.spotLightMatrix.value=k.state.spotLightMatrix,Le.spotLightMap.value=k.state.spotLightMap,Le.pointShadowMap.value=k.state.pointShadowMap,Le.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=je,q.uniformsList=null,je}function uc(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=xo.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function dc(E,F){const W=Ue.get(E);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function tf(E,F,W,q,k){F.isScene!==!0&&(F=Ve),R.resetTextureUnits();const de=F.fog,Me=q.isMeshStandardMaterial?F.environment:null,Ce=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:$s,Pe=(q.isMeshStandardMaterial?V:M).get(q.envMap||Me),We=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,je=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Le=!!W.morphAttributes.position,ct=!!W.morphAttributes.normal,xt=!!W.morphAttributes.color;let bt=yi;q.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(bt=v.toneMapping);const Kt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,dt=Kt!==void 0?Kt.length:0,De=Ue.get(q),Fn=h.state.lights;if(N===!0&&(ie===!0||E!==y)){const an=E===y&&q.id===g;ce.setState(q,E,an)}let ht=!1;q.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Fn.state.version||De.outputColorSpace!==Ce||k.isBatchedMesh&&De.batching===!1||!k.isBatchedMesh&&De.batching===!0||k.isBatchedMesh&&De.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&De.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&De.instancing===!1||!k.isInstancedMesh&&De.instancing===!0||k.isSkinnedMesh&&De.skinning===!1||!k.isSkinnedMesh&&De.skinning===!0||k.isInstancedMesh&&De.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&De.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&De.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&De.instancingMorph===!1&&k.morphTexture!==null||De.envMap!==Pe||q.fog===!0&&De.fog!==de||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==ce.numPlanes||De.numIntersection!==ce.numIntersection)||De.vertexAlphas!==We||De.vertexTangents!==je||De.morphTargets!==Le||De.morphNormals!==ct||De.morphColors!==xt||De.toneMapping!==bt||De.morphTargetsCount!==dt)&&(ht=!0):(ht=!0,De.__version=q.version);let _n=De.currentProgram;ht===!0&&(_n=Ur(q,F,k));let hs=!1,en=!1,er=!1;const Et=_n.getUniforms(),Rn=De.uniforms;if(Ie.useProgram(_n.program)&&(hs=!0,en=!0,er=!0),q.id!==g&&(g=q.id,en=!0),hs||y!==E){Ie.buffers.depth.getReversed()?(J.copy(E.projectionMatrix),Kf(J),Jf(J),Et.setValue(D,"projectionMatrix",J)):Et.setValue(D,"projectionMatrix",E.projectionMatrix),Et.setValue(D,"viewMatrix",E.matrixWorldInverse);const ri=Et.map.cameraPosition;ri!==void 0&&ri.setValue(D,oe.setFromMatrixPosition(E.matrixWorld)),Be.logarithmicDepthBuffer&&Et.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Et.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,en=!0,er=!0)}if(k.isSkinnedMesh){Et.setOptional(D,k,"bindMatrix"),Et.setOptional(D,k,"bindMatrixInverse");const an=k.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Et.setValue(D,"boneTexture",an.boneTexture,R))}k.isBatchedMesh&&(Et.setOptional(D,k,"batchingTexture"),Et.setValue(D,"batchingTexture",k._matricesTexture,R),Et.setOptional(D,k,"batchingIdTexture"),Et.setValue(D,"batchingIdTexture",k._indirectTexture,R),Et.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&Et.setValue(D,"batchingColorTexture",k._colorsTexture,R));const tr=W.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&me.update(k,W,_n),(en||De.receiveShadow!==k.receiveShadow)&&(De.receiveShadow=k.receiveShadow,Et.setValue(D,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Rn.envMap.value=Pe,Rn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(Rn.envMapIntensity.value=F.environmentIntensity),en&&(Et.setValue(D,"toneMappingExposure",v.toneMappingExposure),De.needsLights&&nf(Rn,er),de&&q.fog===!0&&_e.refreshFogUniforms(Rn,de),_e.refreshMaterialUniforms(Rn,q,G,K,h.state.transmissionRenderTarget[E.id]),xo.upload(D,uc(De),Rn,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(xo.upload(D,uc(De),Rn,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Et.setValue(D,"center",k.center),Et.setValue(D,"modelViewMatrix",k.modelViewMatrix),Et.setValue(D,"normalMatrix",k.normalMatrix),Et.setValue(D,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const an=q.uniformsGroups;for(let ri=0,oi=an.length;ri<oi;ri++){const hc=an[ri];U.update(hc,_n),U.bind(hc,_n)}}return _n}function nf(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function sf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,F,W){Ue.get(E.texture).__webglTexture=F,Ue.get(E.depthTexture).__webglTexture=W;const q=Ue.get(E);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const W=Ue.get(E);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,W=0){C=E,w=F,T=W;let q=!0,k=null,de=!1,Me=!1;if(E){const Pe=Ue.get(E);if(Pe.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Pe.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Pe.__hasExternalTextures)R.rebindTextures(E,Ue.get(E.texture).__webglTexture,Ue.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Le=E.depthTexture;if(Pe.__boundDepthTexture!==Le){if(Le!==null&&Ue.has(Le)&&(E.width!==Le.image.width||E.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const We=E.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Me=!0);const je=Ue.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(je[F])?k=je[F][W]:k=je[F],de=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?k=Ue.get(E).__webglMultisampledFramebuffer:Array.isArray(je)?k=je[W]:k=je,P.copy(E.viewport),B.copy(E.scissor),O=E.scissorTest}else P.copy(Te).multiplyScalar(G).floor(),B.copy(ze).multiplyScalar(G).floor(),O=tt;if(Ie.bindFramebuffer(D.FRAMEBUFFER,k)&&q&&Ie.drawBuffers(E,k),Ie.viewport(P),Ie.scissor(B),Ie.setScissorTest(O),de){const Pe=Ue.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,Pe.__webglTexture,W)}else if(Me){const Pe=Ue.get(E.texture),We=F||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pe.__webglTexture,W||0,We)}g=-1},this.readRenderTargetPixels=function(E,F,W,q,k,de,Me){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ue.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){Ie.bindFramebuffer(D.FRAMEBUFFER,Ce);try{const Pe=E.texture,We=Pe.format,je=Pe.type;if(!Be.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-q&&W>=0&&W<=E.height-k&&D.readPixels(F,W,q,k,be.convert(We),be.convert(je),de)}finally{const Pe=C!==null?Ue.get(C).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,F,W,q,k,de,Me){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ue.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Pe=E.texture,We=Pe.format,je=Pe.type;if(!Be.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-q&&W>=0&&W<=E.height-k){Ie.bindFramebuffer(D.FRAMEBUFFER,Ce);const Le=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Le),D.bufferData(D.PIXEL_PACK_BUFFER,de.byteLength,D.STREAM_READ),D.readPixels(F,W,q,k,be.convert(We),be.convert(je),0);const ct=C!==null?Ue.get(C).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,ct);const xt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await jf(D,xt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Le),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,de),D.deleteBuffer(Le),D.deleteSync(xt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,F=null,W=0){E.isTexture!==!0&&(hr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const q=Math.pow(2,-W),k=Math.floor(E.image.width*q),de=Math.floor(E.image.height*q),Me=F!==null?F.x:0,Ce=F!==null?F.y:0;R.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,Me,Ce,k,de),Ie.unbindTexture()},this.copyTextureToTexture=function(E,F,W=null,q=null,k=0){E.isTexture!==!0&&(hr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,E=arguments[1],F=arguments[2],k=arguments[3]||0,W=null);let de,Me,Ce,Pe,We,je,Le,ct,xt;const bt=E.isCompressedTexture?E.mipmaps[k]:E.image;W!==null?(de=W.max.x-W.min.x,Me=W.max.y-W.min.y,Ce=W.isBox3?W.max.z-W.min.z:1,Pe=W.min.x,We=W.min.y,je=W.isBox3?W.min.z:0):(de=bt.width,Me=bt.height,Ce=bt.depth||1,Pe=0,We=0,je=0),q!==null?(Le=q.x,ct=q.y,xt=q.z):(Le=0,ct=0,xt=0);const Kt=be.convert(F.format),dt=be.convert(F.type);let De;F.isData3DTexture?(R.setTexture3D(F,0),De=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(R.setTexture2DArray(F,0),De=D.TEXTURE_2D_ARRAY):(R.setTexture2D(F,0),De=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const Fn=D.getParameter(D.UNPACK_ROW_LENGTH),ht=D.getParameter(D.UNPACK_IMAGE_HEIGHT),_n=D.getParameter(D.UNPACK_SKIP_PIXELS),hs=D.getParameter(D.UNPACK_SKIP_ROWS),en=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,bt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Pe),D.pixelStorei(D.UNPACK_SKIP_ROWS,We),D.pixelStorei(D.UNPACK_SKIP_IMAGES,je);const er=E.isDataArrayTexture||E.isData3DTexture,Et=F.isDataArrayTexture||F.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Rn=Ue.get(E),tr=Ue.get(F),an=Ue.get(Rn.__renderTarget),ri=Ue.get(tr.__renderTarget);Ie.bindFramebuffer(D.READ_FRAMEBUFFER,an.__webglFramebuffer),Ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let oi=0;oi<Ce;oi++)er&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ue.get(E).__webglTexture,k,je+oi),E.isDepthTexture?(Et&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ue.get(F).__webglTexture,k,xt+oi),D.blitFramebuffer(Pe,We,de,Me,Le,ct,de,Me,D.DEPTH_BUFFER_BIT,D.NEAREST)):Et?D.copyTexSubImage3D(De,k,Le,ct,xt+oi,Pe,We,de,Me):D.copyTexSubImage2D(De,k,Le,ct,xt+oi,Pe,We,de,Me);Ie.bindFramebuffer(D.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Et?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(De,k,Le,ct,xt,de,Me,Ce,Kt,dt,bt.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(De,k,Le,ct,xt,de,Me,Ce,Kt,bt.data):D.texSubImage3D(De,k,Le,ct,xt,de,Me,Ce,Kt,dt,bt):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,k,Le,ct,de,Me,Kt,dt,bt.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,k,Le,ct,bt.width,bt.height,Kt,bt.data):D.texSubImage2D(D.TEXTURE_2D,k,Le,ct,de,Me,Kt,dt,bt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Fn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht),D.pixelStorei(D.UNPACK_SKIP_PIXELS,_n),D.pixelStorei(D.UNPACK_SKIP_ROWS,hs),D.pixelStorei(D.UNPACK_SKIP_IMAGES,en),k===0&&F.generateMipmaps&&D.generateMipmap(De),Ie.unbindTexture()},this.copyTextureToTexture3D=function(E,F,W=null,q=null,k=0){return E.isTexture!==!0&&(hr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,q=arguments[1]||null,E=arguments[2],F=arguments[3],k=arguments[4]||0),hr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,F,W,q,k)},this.initRenderTarget=function(E){Ue.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Ie.unbindTexture()},this.resetState=function(){w=0,T=0,C=null,Ie.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}class Bd extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zd extends js{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ao=new L,Ro=new L,uu=new gt,ar=new ko,no=new Fo,Ea=new L,du=new L;class ov extends Ct{constructor(e=new Xt,t=new zd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ao.fromBufferAttribute(t,s-1),Ro.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ao.distanceTo(Ro);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),no.radius+=r,e.ray.intersectsSphere(no)===!1)return;uu.copy(s).invert(),ar.copy(e.ray).applyMatrix4(uu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=c){const h=u.getX(x),b=u.getX(x+1),S=io(this,e,ar,l,h,b);S&&t.push(S)}if(this.isLineLoop){const x=u.getX(_-1),m=u.getX(p),h=io(this,e,ar,l,x,m);h&&t.push(h)}}else{const p=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=c){const h=io(this,e,ar,l,x,x+1);h&&t.push(h)}if(this.isLineLoop){const x=io(this,e,ar,l,_-1,p);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function io(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(Ao.fromBufferAttribute(o,s),Ro.fromBufferAttribute(o,r),t.distanceSqToSegment(Ao,Ro,Ea,du)>n)return;Ea.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ea);if(!(l<e.near||l>e.far))return{distance:l,point:du.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class zo extends jt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,p=(o-u)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new fe:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,s=[],r=[],o=[],a=new L,l=new gt;for(let p=0;p<=e;p++){const _=p/e;s[p]=this.getTangentAt(_,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Lt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,_))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Lt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let _=1;_<=e;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],p*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Hl extends Nn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new fe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class av extends Hl{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Gl(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+d)+(l-a)/d;f*=u,p*=u,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const so=new L,wa=new Gl,Ta=new Gl,Aa=new Gl;class Vd extends Nn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(so.subVectors(s[0],s[1]).add(s[0]),c=so);const d=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(so.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=so),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);x<1e-4&&(x=1),_<1e-4&&(_=x),m<1e-4&&(m=x),wa.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,_,x,m),Ta.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,_,x,m),Aa.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,_,x,m)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Ta.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Aa.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return n.set(wa.calc(l),Ta.calc(l),Aa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function hu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function lv(i,e){const t=1-i;return t*t*e}function cv(i,e){return 2*(1-i)*i*e}function uv(i,e){return i*i*e}function mr(i,e,t,n){return lv(i,e)+cv(i,t)+uv(i,n)}function dv(i,e){const t=1-i;return t*t*t*e}function hv(i,e){const t=1-i;return 3*t*t*i*e}function fv(i,e){return 3*(1-i)*i*i*e}function pv(i,e){return i*i*i*e}function gr(i,e,t,n,s){return dv(i,e)+hv(i,t)+fv(i,n)+pv(i,s)}class Hd extends Nn{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gr(e,s.x,r.x,o.x,a.x),gr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mv extends Nn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gr(e,s.x,r.x,o.x,a.x),gr(e,s.y,r.y,o.y,a.y),gr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gd extends Nn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gv extends Nn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wd extends Nn{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(mr(e,s.x,r.x,o.x),mr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xd extends Nn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(mr(e,s.x,r.x,o.x),mr(e,s.y,r.y,o.y),mr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wl extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(hu(a,l.x,c.x,u.x,d.x),hu(a,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new fe().fromArray(s))}return this}}var Sl=Object.freeze({__proto__:null,ArcCurve:av,CatmullRomCurve3:Vd,CubicBezierCurve:Hd,CubicBezierCurve3:mv,EllipseCurve:Hl,LineCurve:Gd,LineCurve3:gv,QuadraticBezierCurve:Wd,QuadraticBezierCurve3:Xd,SplineCurve:Wl});class _v extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Sl[s.type]().fromJSON(s))}return this}}class vv extends _v{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Gd(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Wd(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new Hd(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Wl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Hl(e,t,n,s,r,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Lr extends Xt{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Lt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,d=new L,f=new fe,p=new L,_=new L,x=new L;let m=0,h=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:m=e[b+1].x-e[b].x,h=e[b+1].y-e[b].y,p.x=h*1,p.y=-m,p.z=h*0,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[b+1].x-e[b].x,h=e[b+1].y-e[b].y,p.x=h*1,p.y=-m,p.z=h*0,_.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(_)}for(let b=0;b<=t;b++){const S=n+b*u*s,v=Math.sin(S),A=Math.cos(S);for(let w=0;w<=e.length-1;w++){d.x=e[w].x*v,d.y=e[w].y,d.z=e[w].x*A,o.push(d.x,d.y,d.z),f.x=b/t,f.y=w/(e.length-1),a.push(f.x,f.y);const T=l[3*w+0]*v,C=l[3*w+1],g=l[3*w+0]*A;c.push(T,C,g)}}for(let b=0;b<t;b++)for(let S=0;S<e.length-1;S++){const v=S+b*e.length,A=v,w=v+e.length,T=v+e.length+1,C=v+1;r.push(A,w,C),r.push(T,C,w)}this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("uv",new _t(a,2)),this.setAttribute("normal",new _t(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.points,e.segments,e.phiStart,e.phiLength)}}class dn extends Lr{constructor(e=1,t=1,n=4,s=8){const r=new vv;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new dn(e.radius,e.length,e.capSegments,e.radialSegments)}}class Xl extends Xt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new L,u=new fe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=n+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class kt extends Xt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],p=[];let _=0;const x=[],m=n/2;let h=0;b(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(p,2));function b(){const v=new L,A=new L;let w=0;const T=(t-e)/n;for(let C=0;C<=r;C++){const g=[],y=C/r,P=y*(t-e)+e;for(let B=0;B<=s;B++){const O=B/s,H=O*l+a,$=Math.sin(H),X=Math.cos(H);A.x=P*$,A.y=-y*n+m,A.z=P*X,d.push(A.x,A.y,A.z),v.set($,T,X).normalize(),f.push(v.x,v.y,v.z),p.push(O,1-y),g.push(_++)}x.push(g)}for(let C=0;C<s;C++)for(let g=0;g<r;g++){const y=x[g][C],P=x[g+1][C],B=x[g+1][C+1],O=x[g][C+1];(e>0||g!==0)&&(u.push(y,P,O),w+=3),(t>0||g!==r-1)&&(u.push(P,B,O),w+=3)}c.addGroup(h,w,0),h+=w}function S(v){const A=_,w=new fe,T=new L;let C=0;const g=v===!0?e:t,y=v===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),_++;const P=_;for(let B=0;B<=s;B++){const H=B/s*l+a,$=Math.cos(H),X=Math.sin(H);T.x=g*X,T.y=m*y,T.z=g*$,d.push(T.x,T.y,T.z),f.push(0,y,0),w.x=$*.5+.5,w.y=X*.5*y+.5,p.push(w.x,w.y),_++}for(let B=0;B<s;B++){const O=A+B,H=P+B;v===!0?u.push(H,H+1,O):u.push(H+1,H,O),C+=3}c.addGroup(h,C,v===!0?1:2),h+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends kt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new _r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ql extends Xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new _t(r,3)),this.setAttribute("normal",new _t(r.slice(),3)),this.setAttribute("uv",new _t(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const S=new L,v=new L,A=new L;for(let w=0;w<t.length;w+=3)p(t[w+0],S),p(t[w+1],v),p(t[w+2],A),l(S,v,A,b)}function l(b,S,v,A){const w=A+1,T=[];for(let C=0;C<=w;C++){T[C]=[];const g=b.clone().lerp(v,C/w),y=S.clone().lerp(v,C/w),P=w-C;for(let B=0;B<=P;B++)B===0&&C===w?T[C][B]=g:T[C][B]=g.clone().lerp(y,B/P)}for(let C=0;C<w;C++)for(let g=0;g<2*(w-C)-1;g++){const y=Math.floor(g/2);g%2===0?(f(T[C][y+1]),f(T[C+1][y]),f(T[C][y])):(f(T[C][y+1]),f(T[C+1][y+1]),f(T[C+1][y]))}}function c(b){const S=new L;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(b),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const b=new L;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];const v=m(b)/2/Math.PI+.5,A=h(b)/Math.PI+.5;o.push(v,1-A)}_(),d()}function d(){for(let b=0;b<o.length;b+=6){const S=o[b+0],v=o[b+2],A=o[b+4],w=Math.max(S,v,A),T=Math.min(S,v,A);w>.9&&T<.1&&(S<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),A<.2&&(o[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,S){const v=b*3;S.x=e[v+0],S.y=e[v+1],S.z=e[v+2]}function _(){const b=new L,S=new L,v=new L,A=new L,w=new fe,T=new fe,C=new fe;for(let g=0,y=0;g<r.length;g+=9,y+=6){b.set(r[g+0],r[g+1],r[g+2]),S.set(r[g+3],r[g+4],r[g+5]),v.set(r[g+6],r[g+7],r[g+8]),w.set(o[y+0],o[y+1]),T.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),A.copy(b).add(S).add(v).divideScalar(3);const P=m(A);x(w,y+0,b,P),x(T,y+2,S,P),x(C,y+4,v,P)}}function x(b,S,v,A){A<0&&b.x===1&&(o[S]=b.x-1),v.x===0&&v.z===0&&(o[S]=A/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function h(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ql(e.vertices,e.indices,e.radius,e.details)}}class Yl extends ql{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yl(e.radius,e.detail)}}class at extends Xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new L,f=new L,p=[],_=[],x=[],m=[];for(let h=0;h<=n;h++){const b=[],S=h/n;let v=0;h===0&&o===0?v=.5/t:h===n&&l===Math.PI&&(v=-.5/t);for(let A=0;A<=t;A++){const w=A/t;d.x=-e*Math.cos(s+w*r)*Math.sin(o+S*a),d.y=e*Math.cos(o+S*a),d.z=e*Math.sin(s+w*r)*Math.sin(o+S*a),_.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(w+v,1-S),b.push(c++)}u.push(b)}for(let h=0;h<n;h++)for(let b=0;b<t;b++){const S=u[h][b+1],v=u[h][b],A=u[h+1][b],w=u[h+1][b+1];(h!==0||o>0)&&p.push(S,v,w),(h!==n-1||l<Math.PI)&&p.push(v,A,w)}this.setIndex(p),this.setAttribute("position",new _t(_,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new at(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wt extends Xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new L,d=new L,f=new L;for(let p=0;p<=n;p++)for(let _=0;_<=s;_++){const x=_/s*r,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let _=1;_<=s;_++){const x=(s+1)*p+_-1,m=(s+1)*(p-1)+_-1,h=(s+1)*(p-1)+_,b=(s+1)*p+_;o.push(x,m,b),o.push(m,h,b)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class $l extends Xt{constructor(e=new Xd(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new fe;let u=new L;const d=[],f=[],p=[],_=[];x(),this.setIndex(_),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(p,2));function x(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),b(),h()}function m(S){u=e.getPointAt(S/t,u);const v=o.normals[S],A=o.binormals[S];for(let w=0;w<=s;w++){const T=w/s*Math.PI*2,C=Math.sin(T),g=-Math.cos(T);l.x=g*v.x+C*A.x,l.y=g*v.y+C*A.y,l.z=g*v.z+C*A.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,d.push(a.x,a.y,a.z)}}function h(){for(let S=1;S<=t;S++)for(let v=1;v<=s;v++){const A=(s+1)*(S-1)+(v-1),w=(s+1)*S+(v-1),T=(s+1)*S+v,C=(s+1)*(S-1)+v;_.push(A,w,C),_.push(w,T,C)}}function b(){for(let S=0;S<=t;S++)for(let v=0;v<=s;v++)c.x=S/t,c.y=v/s,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new $l(new Sl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class et extends js{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xd,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fu extends et{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vo extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class yv extends Vo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new gt,pu=new L,mu=new L;class jl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zl,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;pu.setFromMatrixPosition(e.matrixWorld),t.position.copy(pu),mu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mu),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class xv extends jl{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=wo*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class gu extends Vo{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new xv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const _u=new gt,lr=new L,Ca=new L;class Sv extends jl{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),lr.setFromMatrixPosition(e.matrixWorld),n.position.copy(lr),Ca.copy(n.position),Ca.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ca),n.updateMatrixWorld(),s.makeTranslation(-lr.x,-lr.y,-lr.z),_u.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_u)}}class qd extends Vo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Mv extends jl{constructor(){super(new Id(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bv extends Vo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Mv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ev{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=vu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function vu(){return performance.now()}const yu=new gt;class wv{constructor(e,t,n=0,s=1/0){this.ray=new ko(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Bl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yu),this}intersectObject(e,t=!0,n=[]){return Ml(e,this,n,t),n.sort(xu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ml(e[s],this,n,t);return n.sort(xu),n}}function xu(i,e){return i.distance-e.distance}function Ml(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ml(r[o],e,t,!0)}}class Su{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Lt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Tv extends is{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dl);function An(i,e,t={}){const n=document.createElement("canvas");n.width=i,n.height=i;const s=n.getContext("2d");e(s,i);const r=new zo(n);return r.wrapS=yr,r.wrapT=yr,t.srgb&&(r.colorSpace=Ot),t.repeat&&r.repeat.set(t.repeat[0],t.repeat[1]),r.anisotropy=4,r}function Ci(i){let e=i>>>0;return()=>(e=(e*1103515245+12345)%2147483648,e/2147483648)}function $n(i,e,t,n,s,r,o){for(let a=0;a<t;a++){const l=r+n()*(o-r);i.fillStyle=s(.03+n()*.08),i.beginPath(),i.ellipse(n()*e,n()*e,l,l*(.4+n()*.6),n()*Math.PI,0,Math.PI*2),i.fill()}}function Sr(i=[3,3]){const e=(n,s)=>{n.fillStyle="#f4f1ec",n.fillRect(0,0,s,s);const r=Ci(11);for(let o=0;o<s;o+=2)n.fillStyle=`rgba(120,110,100,${.05+r()*.06})`,n.fillRect(0,o,s,1);for(let o=0;o<s;o+=2)n.fillStyle=`rgba(255,255,255,${.05+r()*.05})`,n.fillRect(o,0,1,s);$n(n,s,500,r,o=>`rgba(105,95,85,${o})`,.6,1.8)},t=(n,s)=>{n.fillStyle="#808080",n.fillRect(0,0,s,s);for(let r=0;r<s;r+=3)n.fillStyle=r%6===0?"#a8a8a8":"#5c5c5c",n.fillRect(0,r,s,1.4);for(let r=0;r<s;r+=3)n.fillStyle=r%6===0?"rgba(168,168,168,0.55)":"rgba(92,92,92,0.55)",n.fillRect(r,0,1.4,s)};return{map:An(256,e,{srgb:!0,repeat:i}),bump:An(256,t,{repeat:i})}}function Av(){const i=(t,n)=>{t.fillStyle="#fdf6f0",t.fillRect(0,0,n,n);const s=Ci(23);$n(t,n,260,s,r=>`rgba(214,150,110,${r*.7})`,4,16),$n(t,n,200,s,r=>`rgba(240,200,170,${r})`,3,10),$n(t,n,900,s,r=>`rgba(190,130,95,${r*.5})`,.5,1.2)},e=(t,n)=>{t.fillStyle="#808080",t.fillRect(0,0,n,n);const s=Ci(29);$n(t,n,2600,s,r=>`rgba(255,255,255,${r})`,.4,1.1),$n(t,n,2600,s,r=>`rgba(0,0,0,${r})`,.4,1.1)};return{map:An(256,i,{srgb:!0}),bump:An(256,e)}}function Rv(){const i=(e,t)=>(n,s)=>{n.fillStyle=e,n.fillRect(0,0,s,s);const r=Ci(37);for(let o=0;o<s;o+=1){const a=(r()-.5)*t;n.fillStyle=a>0?`rgba(255,235,210,${a})`:`rgba(10,5,0,${-a})`;const l=1+r()*2;n.fillRect(o,0,l,s),o+=l-1}for(let o=0;o<40;o++)n.fillStyle=`rgba(15,8,4,${.1+r()*.12})`,n.fillRect(r()*s,0,1,s)};return{map:An(256,i("#f7f2ec",.16),{srgb:!0,repeat:[2,1]}),bump:An(256,i("#808080",.85),{repeat:[2,1]})}}function Cv(){return An(512,(i,e)=>{const t=Ci(41),n=e/4;for(let s=0;s<4;s++){const r=.9+t()*.2,o=Math.round(178*r),a=Math.round(138*r),l=Math.round(98*r);i.fillStyle=`rgb(${o},${a},${l})`,i.fillRect(0,s*n,e,n);for(let u=0;u<46;u++){const d=s*n+t()*n;i.strokeStyle=`rgba(110,74,44,${.05+t()*.13})`,i.lineWidth=.6+t()*1.6,i.beginPath(),i.moveTo(0,d);for(let f=0;f<=e;f+=32)i.lineTo(f,d+Math.sin(f*.02+u)*2.2+(t()-.5)*2);i.stroke()}i.fillStyle="rgba(70,45,26,0.55)",i.fillRect(0,s*n,e,2);const c=t()*e;i.fillRect(c,s*n,2,n)}},{srgb:!0,repeat:[2.5,2.5]})}function Pv(){return An(256,(i,e)=>{i.fillStyle="#efe7db",i.fillRect(0,0,e,e);const t=Ci(53);$n(i,e,1500,t,n=>`rgba(190,175,155,${n*.6})`,.5,2.2),$n(i,e,900,t,n=>`rgba(255,252,246,${n})`,.5,2)},{srgb:!0,repeat:[3,1.5]})}function Yd(){const i=(t,n)=>{t.fillStyle="#6f6f6f",t.fillRect(0,0,n,n);const s=Ci(67);for(let r=0;r<2400;r++){const o=2+s()*4,a=s()*n,l=s()*n,c=t.createRadialGradient(a,l,0,a,l,o);c.addColorStop(0,"rgba(255,255,255,0.5)"),c.addColorStop(.75,"rgba(128,128,128,0.12)"),c.addColorStop(1,"rgba(0,0,0,0.4)"),t.fillStyle=c,t.beginPath(),t.arc(a,l,o,0,Math.PI*2),t.fill()}};return{map:An(256,(t,n)=>{t.fillStyle="#f5efe8",t.fillRect(0,0,n,n);const s=Ci(71);$n(t,n,700,s,r=>`rgba(120,90,60,${r*.55})`,.6,2.4)},{srgb:!0,repeat:[2,2]}),bump:An(256,i,{repeat:[2,2]})}}function bl(i=[10,1]){return An(128,(e,t)=>{e.fillStyle="#808080",e.fillRect(0,0,t,t);for(let n=0;n<t;n+=8)e.fillStyle="#b2b2b2",e.fillRect(n,0,3.4,t),e.fillStyle="#4a4a4a",e.fillRect(n+4.4,0,2.2,t)},{repeat:i})}const Mr=["bob","long","short","ponytail","bun"],br=["#201612","#3a2417","#503729","#7a4a26","#8c3b22","#a97c50","#d9b380","#b9b4ad"],Er=["#2e2019","#5a3a1e","#7a5a26","#46684a","#3d5a80","#707880"],Kl=["shoulderWidth","waist","hip","bust","build"],Jl=["eyeSize","eyeSpacing","eyeHeight","eyeShape","eyeTilt","browHeight","browTilt","noseWidth","noseProminence","lipWidth","lipFullness","faceWidth","asymmetry"],on={skinTone:{kind:"range",min:0,max:1,def:.28},hairColor:{kind:"palette",options:br,def:"#503729"},eyeColor:{kind:"palette",options:Er,def:"#2e2019"},hairStyle:{kind:"enum",options:Mr,def:"bob"},height:{kind:"range",min:1.45,max:1.95,def:1.74},shoulderWidth:{kind:"range",min:.88,max:1.14,def:1},waist:{kind:"range",min:.82,max:1.22,def:1},hip:{kind:"range",min:.86,max:1.2,def:1},bust:{kind:"range",min:.8,max:1.3,def:1},build:{kind:"range",min:.85,max:1.2,def:1},eyeSize:{kind:"range",min:.8,max:1.25,def:1},eyeSpacing:{kind:"range",min:.85,max:1.18,def:1},eyeHeight:{kind:"range",min:-.01,max:.01,def:0},eyeShape:{kind:"range",min:.55,max:.95,def:.74},eyeTilt:{kind:"range",min:-.2,max:.2,def:0},browHeight:{kind:"range",min:-.008,max:.008,def:0},browTilt:{kind:"range",min:-.25,max:.25,def:0},noseWidth:{kind:"range",min:.75,max:1.35,def:1},noseProminence:{kind:"range",min:.7,max:1.4,def:1},lipWidth:{kind:"range",min:.75,max:1.3,def:1},lipFullness:{kind:"range",min:.6,max:1.6,def:1},faceWidth:{kind:"range",min:.9,max:1.1,def:1},asymmetry:{kind:"range",min:0,max:1,def:.35}},wr=1.45,$d=1.95,Lv=1.74,jn={skinTone:.28,hairColor:"#503729",eyeColor:"#2e2019",hairStyle:"bob",height:1.74,shoulderWidth:1,waist:1,hip:1,bust:1,build:1,eyeSize:1,eyeSpacing:1,eyeHeight:0,eyeShape:.74,eyeTilt:0,browHeight:0,browTilt:0,noseWidth:1,noseProminence:1,lipWidth:1,lipFullness:1,faceWidth:1,asymmetry:.35};function Dv(i,e){return typeof i!="number"||!Number.isFinite(i)?e.def:Math.min(e.max,Math.max(e.min,i))}function Iv(i,e,t){return typeof i=="string"&&e.includes(i)?i:t}function Js(i){if(typeof i!="object"||i===null)return{...jn};const e=i,t={...jn};for(const[s,r]of Object.entries(on))t[s]=r.kind==="range"?Dv(e[s],r):Iv(e[s],r.options,r.def);const n=t;return Uv(n),n}const cr=.5,Kn=i=>Math.min(1,Math.max(0,i));function ur(i){const e=Kn((1.66-i.height)/.21),t=Kn((1-i.bust)/.2),n=Kn(-(i.hip-i.waist)/.15),s=Kn((1-i.build)/.15),r=Kn((1-i.shoulderWidth)/.12);return .3*e+.25*t+.2*n+.15*s+.1*r}function Mu(i){const e=on[i];if(e.kind!=="range")throw new Error(`${i} is not a range parameter`);return e}function Uv(i){let e=ur(i)-cr;if(e<=0)return;const t=Kn((1-i.bust)/.2);if(t>0&&(i.bust=1-.2*Math.max(0,t-e/.25),e=ur(i)-cr,e<=0))return;const n=Kn(-(i.hip-i.waist)/.15);if(n>0){let a=-.15*Math.max(0,n-e/.2)-(i.hip-i.waist);const l=Math.min(Math.max(a,0),Mu("hip").max-i.hip);if(i.hip+=l,a-=l,a>0&&(i.waist-=Math.min(a,i.waist-Mu("waist").min)),e=ur(i)-cr,e<=0)return}const s=Kn((1-i.build)/.15);if(s>0&&(i.build=1-.15*Math.max(0,s-e/.15),e=ur(i)-cr,e<=0))return;const r=Kn((1-i.shoulderWidth)/.12);r>0&&(i.shoulderWidth=1-.12*Math.max(0,r-e/.1),e=ur(i)-cr,e<=0)||(i.bust=jn.bust,i.hip=jn.hip,i.waist=jn.waist,i.build=jn.build,i.shoulderWidth=jn.shoulderWidth)}function xi(i,e){const t=i<=.9?1:i>=1.02?0:(1.02-i)/.12,n=i<=.94||i>=1.17?0:i<1.02?(i-.94)/.08:i<=1.08?1:(1.17-i)/.09,s=i<=1.08||i>=1.335?0:i<1.17?(i-1.08)/.09:i<=1.25?1:(1.335-i)/.085;return(1+(e.build-1)*.6)*(1+(e.hip-1)*t+(e.waist-1)*n+(e.bust-1)*s)}function El(i){return 1+(i.build-1)*.7+(i.hip-1)*.25}const ro=[[255,223,196],[240,197,151],[224,172,105],[198,134,66],[141,85,36],[92,56,40]],Nv=["I","II","III","IV","V","VI"];function bu(i){const e=Math.min(1,Math.max(0,i))*(ro.length-1),t=Math.min(ro.length-2,Math.floor(e)),n=e-t,s=ro[t],r=ro[t+1],o=l=>Math.round(s[l]+(r[l]-s[l])*n),a=l=>o(l).toString(16).padStart(2,"0");return`#${a(0)}${a(1)}${a(2)}`}function wl(i){const e=Math.min(5,Math.max(0,Math.floor(Math.min(1,Math.max(0,i))*6)));return Nv[e]}function fn(i,e,t=48){const n=new Wl(i.map(([o,a])=>new fe(o,a))),s=new Lr(n.getPoints(56),t),r=new He(s,e);return r.castShadow=!0,r}function ot(i,e,t=0,n=0,s=0){const r=new He(i,e);return r.position.set(t,n,s),r.castShadow=!0,r}const jd=[[.015,.002],[.05,.01],[.066,.032],[.075,.062],[.08,.098],[.081,.132],[.076,.168],[.062,.205],[.036,.232],[.001,.244]],Ov=[[.138,.845],[.145,.88],[.14,.94],[.12,1.02],[.121,1.08],[.146,1.17],[.141,1.25],[.117,1.335],[.075,1.39],[.05,1.415]];function Eu(i,e,t=1){const n=new Xe,s=fn(jd.slice(3).map(([o,a])=>[o+.005,a+.003]),e,56);s.scale.set(.88*t,1,1.12),s.position.z=-.004,n.add(s);const r=(o,a,l)=>{const c=ot(new at(.0845,48,24,0,Math.PI*2,0,Math.PI*o),e,0,a,.004);return c.scale.set(.9*t,1.05,1.1),c.rotation.x=l,c};switch(i){case"bob":{n.add(r(.3,.132,.3));const o=ot(new dn(.05,.14,6,18),e,0,.015,-.062);o.rotation.x=.1,n.add(o);for(const a of[-1,1]){const l=ot(new dn(.017,.09,4,12),e,a*.07*t,.045,.03);l.rotation.z=-a*.06,l.rotation.x=-.05,n.add(l)}break}case"long":{n.add(r(.3,.132,.3));const o=ot(new dn(.056,.34,6,18),e,0,-.1,-.075);o.rotation.x=.06,n.add(o);for(const a of[-1,1]){const l=ot(new dn(.018,.2,4,12),e,a*.072*t,-.03,.028);l.rotation.z=-a*.05,l.rotation.x=-.04,n.add(l)}break}case"short":{n.add(r(.26,.138,.22));const o=ot(new dn(.048,.03,4,14),e,0,.055,-.058);o.rotation.x=.15,n.add(o);break}case"ponytail":{n.add(r(.3,.132,.3));const o=ot(new at(.03,14,10),e,0,.2,-.055);n.add(o);const a=ot(new Wt(.027,.0065,8,20),e,0,.198,-.06);a.rotation.x=1.1,n.add(a);const l=ot(new dn(.026,.24,6,14),e,0,.1,-.09);l.rotation.x=-.3,n.add(l);break}case"bun":{n.add(r(.3,.132,.3));const o=ot(new at(.037,18,12),e,0,.238,-.04);n.add(o);const a=ot(new Wt(.035,.006,8,20),e,0,.232,-.042);a.rotation.x=1.2,n.add(a);break}}return n}function wu(i){const e={ls:[0,0,-.1],rs:[0,0,.1],le:[-.06,0,0],re:[-.06,0,0],head:[0,0,0]};switch(i){case"wave":e.rs=[0,0,2.45],e.re=[-.15,0,0],e.head=[0,0,.05];break;case"cheer":e.ls=[0,0,-2.45],e.rs=[0,0,2.45],e.le=[0,0,0],e.re=[0,0,0],e.head=[-.05,0,0];break;case"peace":e.rs=[0,0,2.35],e.re=[-.35,0,0],e.ls=[0,0,-.55],e.le=[-.5,0,0],e.head=[0,0,-.05];break;case"relax":e.ls=[0,0,-.16],e.rs=[0,0,.16],e.le=[-.38,0,0],e.re=[-.38,0,0],e.head=[.04,0,.04];break}return e}function Kd(i){const e=Av(),t=new et({color:bu(i.skinTone),map:e.map,bumpMap:e.bump,bumpScale:.15,roughness:.58,envMapIntensity:.45}),n=Rv(),s=new et({color:i.hairColor,map:n.map,bumpMap:n.bump,bumpScale:.3,roughness:.38,envMapIntensity:1.15}),r=Sr([2,2]),o=new et({color:"#a8a29a",map:r.map,bumpMap:r.bump,bumpScale:.3,roughness:.9,envMapIntensity:.3}),a=Sr([3,3]),l=new et({color:"#ff8fab",map:a.map,bumpMap:a.bump,bumpScale:.35,roughness:.84,envMapIntensity:.4,side:hn}),c=new et({color:i.eyeColor,roughness:.12,envMapIntensity:1.3}),u=new et({color:"#f3ede1",roughness:.22,envMapIntensity:1}),d=new et({color:"#241a14",roughness:.3,envMapIntensity:.6}),f=new et({color:"#14100d",roughness:.25,envMapIntensity:.8}),p=new et({color:"#ffffff",transparent:!0,opacity:.16,roughness:.05,envMapIntensity:2.2,depthWrite:!1}),_=new Xe,x=.12;_.position.y=x;const m=new Xe;_.add(m);function h(z){const ne=new Xe,me=1+(z.build-1)*.7,ae=El(z),Re=1+(z.build-1)*.35;for(const Y of[-1,1]){const Z=Y*.096;ne.add(ot(new dn(.067*ae,.25,6,20),t,Z,.645,0)),ne.add(ot(new at(.047*me,20,14),t,Z,.462,.004)),ne.add(ot(new dn(.043*me,.26,6,18),t,Z,.278,0)),ne.add(ot(new kt(.031*Re,.034*Re,.1,14),t,Z,.075,0))}const be=1+(z.build-1)*.4,Fe=ot(new at(1,36,24),o,0,.885,0);Fe.scale.set(.163*z.hip*be,.115*(1+(z.build-1)*.15),.128*(1+(z.hip-1)*.65)*be),ne.add(Fe);for(const Y of[-1,1])ne.add(ot(new kt(.078*ae,.07*ae,.13,20),o,Y*.096,.8,0));const U=fn(Ov.map(([Y,Z])=>[Y*xi(Z,z),Z]),o);U.scale.set(1,1,.8),ne.add(U);const he=1+(z.build-1)*.4;return ne.add(ot(new kt(.042*he,.05*he,.15,20),t,0,1.465,0)),ne}let b=h(i);m.add(b);const S=new Xe;m.add(S);const v=new Xe;v.position.set(0,.95,0),m.add(v);const A=new Xe;A.position.set(0,1.12,0),m.add(A);const w=new Xe;w.position.set(0,1.415,0),m.add(w);const T=new Xe;T.position.set(.235,1.02,.02),m.add(T);function C(z){const ne=new Xe;ne.position.set(z*.172,1.374,0),ne.add(ot(new at(.052,20,14),t,0,.002,0));const me=ot(new kt(.054,.045,.22,20),l,0,-.09,0);ne.add(me);const ae=ot(new dn(.04,.16,6,16),t,0,-.16,0);ne.add(ae);const Re=new Xe;Re.position.set(0,-.27,0);const be=ot(new dn(.034,.17,6,16),t,0,-.115,0);Re.add(be);const Fe=new Xe;Fe.position.set(0,-.26,0);const U=ot(new at(1,16,12),t,0,-.032,0);U.scale.set(.03,.049,.017);const he=ot(new at(.01,10,8),t,-z*.024,-.018,.01);return Fe.add(U,he),Re.add(Fe),ne.add(Re),m.add(ne),{side:z,shoulder:ne,elbow:Re,sleeve:me,upper:ae,fore:be}}const g=C(-1),y=C(1);function P(z){const ne=1+(z.build-1)*.7;for(const me of[g,y])me.shoulder.position.x=me.side*.172*z.shoulderWidth*(1+(z.build-1)*.25),me.sleeve.scale.set(ne,1,ne),me.upper.scale.set(ne,1,ne),me.fore.scale.set(ne,1,ne)}P(i);function B(z){m.remove(b),b.traverse(ne=>{ne instanceof He&&ne.geometry.dispose()}),b=h(z),m.add(b),P(z)}const O=new Xe;O.position.set(0,1.5,0),m.add(O);const H=fn(jd,t,56);H.scale.set(.88,1,1.12),O.add(H);function $(){const z=new Xe,ne=ot(new at(.0135,24,16),u,0,0,0);ne.castShadow=!1,z.add(ne);const me=new Xe,ae=(Z,Se,xe)=>{const Ge=new at(Z,24,12,0,Math.PI*2,0,Se);Ge.rotateX(Math.PI/2);const Mt=ot(Ge,xe,0,0,0);return Mt.castShadow=!1,Mt},Re=ae(.0139,.46,d),be=ae(.01405,.4,c),Fe=ae(.0142,.19,f),U=ae(.0149,.52,p);me.add(Re,be,Fe,U),z.add(me);const he=new Xe,Y=ot(new at(.0148,20,12,0,Math.PI*2,0,1.25),t,0,0,0);return Y.castShadow=!1,he.add(Y),he.rotation.x=-.18,z.add(he),O.add(z),{group:z,shells:[ne,Re,be,Fe,U],iris:me,lid:he,lidMesh:Y}}const X=$(),K=$(),G=ot(new Wt(.02,.0028,8,20,1.5),s),ue=ot(new Wt(.02,.0028,8,20,1.5),s),ge=ot(new at(1,12,10),t),Te=ot(new at(1,12,10),t);for(const z of[G,ue,ge,Te])z.castShadow=!1,O.add(z);ge.scale.set(.0075,.0155,.011),Te.scale.set(.0075,.0155,.011);const ze=ot(new at(1,14,10),t,0,.08,.0855);ze.castShadow=!1,O.add(ze);const tt=new et({color:"#a96052",roughness:.45,envMapIntensity:.6}),j=ot(new at(1,18,12),tt,0,.047,.0785);j.castShadow=!1,O.add(j);function N(z){const ne=z.asymmetry;H.scale.set(.88*z.faceWidth,1,1.12);const me=1+(z.faceWidth-1)*.6,ae=[[X,-1],[K,1]];for(const[be,Fe]of ae){be.group.position.set(Fe*.034*z.eyeSpacing*me,.115+z.eyeHeight+(Fe<0?.0011*ne:-.0011*ne),.079),be.group.rotation.z=Fe*z.eyeTilt,be.group.scale.setScalar(z.eyeSize);for(const U of be.shells)U.scale.set(1.3,z.eyeShape,.62);be.lidMesh.scale.set(1.3,z.eyeShape+.04,.66)}const Re=[[G,-1],[ue,1]];for(const[be,Fe]of Re)be.position.set(Fe*.0345*z.eyeSpacing*me,.15+z.browHeight+(Fe<0?-.0014*ne:.0014*ne),.0765),be.rotation.set(-.3,0,Math.PI/2-.75-Fe*.09+Fe*z.browTilt*.7);ge.position.set(-.0695*z.faceWidth,.105+.0016*ne,-.002),Te.position.set(.0695*z.faceWidth,.105,-.002),ze.position.x=9e-4*ne,ze.position.z=.0855+(z.noseProminence-1)*.004,ze.scale.set(.0105*z.noseWidth,.015,.009*z.noseProminence),j.position.x=-7e-4*ne,j.scale.set(.0195*z.lipWidth,.0062*z.lipFullness,.0068*z.lipFullness)}N(i);let ie=Eu(i.hairStyle,s,i.faceWidth);O.add(ie);const J=new Xe;J.position.set(0,.242,0),O.add(J);const pe=new Xe;pe.position.set(0,.115,.0905),O.add(pe);let oe={...i};function Ee(z){const ne=z/Lv,me=1+(ne-1)*.45;m.scale.set(me,ne,me)}Ee(i.height);function Ve(z){t.color.set(bu(z.skinTone)),s.color.set(z.hairColor),c.color.set(z.eyeColor),N(z),(z.hairStyle!==oe.hairStyle||z.faceWidth!==oe.faceWidth)&&(O.remove(ie),ie.traverse(ne=>{ne instanceof He&&ne.geometry.dispose()}),ie=Eu(z.hairStyle,s,z.faceWidth),O.add(ie)),(z.shoulderWidth!==oe.shoulderWidth||z.waist!==oe.waist||z.hip!==oe.hip||z.bust!==oe.bust||z.build!==oe.build)&&B(z),z.height!==oe.height&&Ee(z.height),oe={...z}}let ke="stand",le=wu("stand"),D=null;function rt(z){g.shoulder.rotation.set(...z.ls),y.shoulder.rotation.set(...z.rs),g.elbow.rotation.set(...z.le),y.elbow.rotation.set(...z.re),O.rotation.set(...z.head)}rt(le);function qe(z){ke=z,le=wu(z)}function Be(z,ne,me){z.rotation.x+=(ne[0]-z.rotation.x)*me,z.rotation.y+=(ne[1]-z.rotation.y)*me,z.rotation.z+=(ne[2]-z.rotation.z)*me}let Ie=987654321;const nt=()=>(Ie=(Ie*1103515245+12345)%2147483648,Ie/2147483648);let Ue=1.6+nt()*2,R=-1,M=.22;function V(z){if(R<0&&z>=Ue&&(R=z,M=.17+nt()*.13),R<0)return 0;const ne=(z-R)/M;if(ne>=1)return R=-1,Ue=z+(nt()<.16?.3:2.1+nt()*3.6),0;const me=ae=>{const Re=Math.min(1,Math.max(0,ae));return Re*Re*(3-2*Re)};return ne<.38?me(ne/.38):ne<.52?1:1-me((ne-.52)/.48)}let te=135792468;const se=()=>(te=(te*1103515245+12345)%2147483648,te/2147483648);let ee=1.1,Ae={x:0,y:0};const _e={x:0,y:0},ye=new L;function it(z,ne,me){if(z>=ee){ee=z+.7+se()*1.9;const U=se()<.22;Ae={x:U?(se()-.5)*.22:(se()-.5)*.05,y:U?(se()-.5)*.1:(se()-.5)*.03}}const ae=1-Math.exp(-ne*22);ae>0&&(_e.x+=(Ae.x-_e.x)*ae,_e.y+=(Ae.y-_e.y)*ae);let Re=0,be=0;if(me){ye.copy(me),O.worldToLocal(ye);const U=ye.y-.115;Re=Math.atan2(ye.x,ye.z),be=Math.atan2(U,Math.hypot(ye.x,ye.z))}const Fe=(U,he,Y)=>Math.min(Y,Math.max(he,U));return{yaw:Fe(Re,-.38,.38)+_e.x,pitch:Fe(be,-.22,.28)+_e.y}}function ce(z,ne){const me=D===null?0:Math.min(.05,Math.max(0,z-D));D=z,_.position.y=x+Math.sin(z*1.5)*.0035,_.rotation.z=Math.sin(z*.6)*.004;const ae=1-Math.exp(-me*7);if(ae>0){const Fe=ke==="wave"?Math.sin(z*6.5)*.18:0;Be(g.shoulder,le.ls,ae),Be(y.shoulder,[le.rs[0],le.rs[1],le.rs[2]+Fe],ae),Be(g.elbow,le.le,ae),Be(y.elbow,le.re,ae),Be(O,le.head,ae)}const Re=V(z);X.lid.rotation.x=-.18+Re*.95,K.lid.rotation.x=-.18+Re*.95;const be=it(z,me,ne);X.iris.rotation.set(-be.pitch,be.yaw,0),K.iris.rotation.set(-be.pitch,be.yaw,0)}return{root:_,head:O,hatAnchor:J,glassesAnchor:pe,neckAnchor:w,torsoAnchor:A,bagAnchor:T,bottomAnchor:v,shoesAnchor:S,topMaterial:l,applyPose:qe,setCharacter:Ve,tick:ce}}const Pi=["#ffffff","#ff8fab","#7cc7ff","#8fe3c0","#c9a7ff","#ffd166","#3a4152","#b03050","#2e5e4e","#f2a65a"],ss=["#44557a","#2f3542","#e8e2d6","#a83c46","#7cc7ff","#8fe3c0","#ffd166","#5b4a68","#8a6642","#606c38"],rs=["#5e2233","#26262b","#e8e2d6","#7c4a2d","#a83c46","#3d5a80","#d8b25c","#ffffff","#c0c6cc","#2e5e4e"],os=["#b08954","#26262b","#2c3a55","#7a2e3a","#e8e2d6","#6b7250","#3a4152","#8a6642"],Li=["tee","hoodie","dress","blouse","dressLong"],as=["none","skirt","pants","shorts","skirtLong"],ls=["flats","sneakers","pumps","boots"],cs=["none","jacket","coat","cardigan"];function Ho(i){return i==="dress"||i==="dressLong"}const Di=["none","cap","beanie","catears","ribbon"],Ii=["none","round","square","sunglasses"],Ui=["none","necklace","scarf","bag"],Ni=["stand","wave","cheer","peace","relax"],Rt={name:"",topStyle:"tee",topColor:"#ff8fab",outerStyle:"none",outerColor:"#b08954",bottomStyle:"none",bottomColor:"#44557a",shoeStyle:"flats",shoeColor:"#5e2233",hat:"none",glasses:"none",accessory:"none",pose:"stand",character:{...jn}},Jd="fitting-room.outfit.v1",Tu=24,Zd=72,Fv=new TextEncoder;function us(i){if(typeof i!="string")return"";let e="";for(const n of i){const s=n.codePointAt(0)??0;s<32||s>=127&&s<=159||(e+=n)}e=e.replace(/\s+/g," ").trim();const t=[...e];for(t.length>Tu&&(e=t.slice(0,Tu).join(""));e&&Fv.encode(e).length>Zd;)e=[...e].slice(0,-1).join("");return e}function fi(i,e,t){return typeof i=="string"&&e.includes(i)?i:t}function Ws(i){if(typeof i!="object"||i===null)return{...Rt};const e=i;return{name:us(e.name),topStyle:fi(e.topStyle,Li,Rt.topStyle),topColor:typeof e.topColor=="string"&&Pi.includes(e.topColor)?e.topColor:Rt.topColor,outerStyle:fi(e.outerStyle,cs,Rt.outerStyle),outerColor:typeof e.outerColor=="string"&&os.includes(e.outerColor)?e.outerColor:Rt.outerColor,bottomStyle:fi(e.bottomStyle,as,Rt.bottomStyle),bottomColor:typeof e.bottomColor=="string"&&ss.includes(e.bottomColor)?e.bottomColor:Rt.bottomColor,shoeStyle:fi(e.shoeStyle,ls,Rt.shoeStyle),shoeColor:typeof e.shoeColor=="string"&&rs.includes(e.shoeColor)?e.shoeColor:Rt.shoeColor,hat:fi(e.hat,Di,Rt.hat),glasses:fi(e.glasses,Ii,Rt.glasses),accessory:fi(e.accessory,Ui,Rt.accessory),pose:fi(e.pose,Ni,Rt.pose),character:Js(e.character)}}function Qd(i=localStorage){try{const e=i.getItem(Jd);return e?Ws(JSON.parse(e)):{...Rt}}catch{return{...Rt}}}function kv(i,e=localStorage){try{e.setItem(Jd,JSON.stringify(i))}catch{}}function cn(i,e){return i[Math.floor(e()*i.length)]}function eh(i=Math.random){return{name:"",topStyle:cn(Li,i),topColor:cn(Pi,i),outerStyle:cn(cs,i),outerColor:cn(os,i),bottomStyle:cn(as,i),bottomColor:cn(ss,i),shoeStyle:cn(ls,i),shoeColor:cn(rs,i),hat:cn(Di,i),glasses:cn(Ii,i),accessory:cn(Ui,i),pose:cn(Ni,i),character:{...jn}}}function Ne(i,e,t=0,n=0,s=0){const r=new He(i,e);return r.position.set(t,n,s),r.castShadow=!0,r}function _i(i,e=.85){const t=Sr([2,2]);return new et({color:i,map:t.map,bumpMap:t.bump,bumpScale:.35,roughness:e,envMapIntensity:.4})}const Bv=1.12,zv=.95;function pr(i,e){return i.map(([t,n])=>[t*xi(n+Bv,e),n])}function Tl(i,e){return i.map(([t,n])=>[t*xi(n+zv,e),n])}function Vv(i,e,t){const n=new Xe;if(i==="tee"){const s=fn(pr([[.149,-.275],[.156,-.24],[.151,-.18],[.131,-.1],[.132,-.04],[.157,.05],[.152,.13],[.128,.215],[.086,.27],[.06,.295]],t),e);s.scale.set(1,1,.8),n.add(s)}else if(i==="hoodie"){const s=fn(pr([[.165,-.28],[.168,-.2],[.15,-.1],[.152,-.03],[.172,.05],[.166,.13],[.14,.215],[.092,.27],[.064,.295]],t),e);s.scale.set(1,1,.8),n.add(s);const r=Ne(new Wt(.082,.03,12,24),e,0,.26,-.05);r.rotation.x=1.25,r.scale.set(1,1,.8),n.add(r);const o=Ne(new $e(.17,.095,.028),e,0,-.155,.125);o.position.z=.125*xi(.965,t),n.add(o);const a=new et({color:"#e8e2d6",roughness:.8});for(const l of[-1,1])n.add(Ne(new kt(.0035,.0035,.055,8),a,l*.018,.185,.098))}else if(i==="blouse"){const s=fn(pr([[.146,-.275],[.152,-.24],[.146,-.18],[.126,-.1],[.128,-.04],[.155,.05],[.15,.13],[.126,.215],[.084,.27],[.058,.295]],t),e);s.scale.set(1,1,.8),n.add(s);const r=xi(1.385,t),o=Ne(new Wt(.062,.009,10,36),e,0,.272,0);o.rotation.x=Math.PI/2,o.scale.set(r,.8*r,r),n.add(o)}else{const r=fn(pr([[.06,.295],[.086,.27],[.128,.215],[.152,.13],[.157,.05],[.132,-.04],[.13,-.115],[.148,-.2],[.18,-.36],...i==="dressLong"?[[.205,-.52],[.232,-.72],[.258,-.9],[.272,-1.02]]:[[.218,-.52],[.248,-.66]]],t),e);r.scale.set(1,1,.8),n.add(r);const o=new et({color:"#f2ead9",roughness:.35,envMapIntensity:.8}),a=xi(1.005,t),l=Ne(new Wt(.13,.011,10,40),o,0,-.115,0);l.rotation.x=Math.PI/2,l.scale.set(a,.8*a,a),n.add(l)}return n}function Hv(i,e,t){if(i==="none")return null;const n=new Xe,s=i==="cardigan",r=_i(e,i==="coat"?.92:.85);s&&(r.bumpMap=bl([16,1]),r.bumpScale=.5);const a=pr({jacket:[[.18,-.3],[.17,-.22],[.156,-.12],[.16,-.04],[.184,.05],[.178,.13],[.15,.215],[.108,.27],[.078,.295]],coat:[[.258,-.62],[.238,-.52],[.208,-.42],[.185,-.32],[.175,-.22],[.158,-.12],[.16,-.04],[.185,.05],[.178,.13],[.15,.215],[.108,.27],[.078,.295]],cardigan:[[.19,-.35],[.176,-.3],[.165,-.22],[.15,-.12],[.152,-.04],[.176,.05],[.17,.13],[.144,.215],[.1,.27],[.07,.295]]}[i],t),l=fn(a,r);if(l.scale.set(1,1,.8),n.add(l),!s){const p=xi(1.385,t),_=Ne(new Wt(.07,.014,10,36),r,0,.268,0);_.rotation.x=Math.PI/2,_.scale.set(p,.8*p,p),n.add(_)}const c=i==="coat"?-.55:-.28,u=(.18+c)/2;let d=a[0][0];for(let p=0;p+1<a.length;p++){const[_,x]=a[p],[m,h]=a[p+1];if((u-x)*(u-h)<=0){d=_+(m-_)*(u-x)/(h-x||1);break}d=m}const f=Ne(new $e(.02,.18-c,.006),r,0,u,d*.8+.002);if(n.add(f),i==="coat"){const p=xi(1.005,t),_=Ne(new Wt(.163,.012,10,40),r,0,-.115,0);_.rotation.x=Math.PI/2,_.scale.set(p,.8*p,p),n.add(_)}return n}function Au(i,e){const t=fn(Tl([[.168,-.2],[.18,-.16],[.186,-.11],[.184,-.06],[.172,-.01],[.15,.045]],e),i);return t.scale.set(1,1,.8),t}function Ru(i,e,t,n){const s=fn(i.map(([r,o])=>[r*n,o]),e);return s.position.x=t*.096,s.scale.set(1,1,.92),s}function Gv(i,e,t){const n=new Xe;switch(i){case"none":return null;case"skirt":{const s=fn(Tl([[.232,-.43],[.216,-.33],[.196,-.22],[.182,-.13],[.176,-.065],[.166,-.03],[.147,.03]],t),e);return s.scale.set(1,1,.8),n.add(s),n}case"skirtLong":{const s=fn(Tl([[.262,-.78],[.246,-.62],[.226,-.45],[.202,-.28],[.186,-.13],[.176,-.065],[.166,-.03],[.147,.03]],t),e);return s.scale.set(1,1,.8),n.add(s),n}case"pants":{n.add(Au(e,t));const s=[[.049,-.905],[.048,-.85],[.052,-.73],[.056,-.6],[.058,-.55],[.068,-.488],[.078,-.45],[.082,-.4],[.084,-.28],[.086,-.17],[.088,-.11]];for(const r of[-1,1])n.add(Ru(s,e,r,El(t)));return n}case"shorts":{n.add(Au(e,t));const s=[[.083,-.3],[.084,-.24],[.087,-.17],[.089,-.11]];for(const r of[-1,1])n.add(Ru(s,e,r,El(t)));return n}}}function Pa(i,e,t=.9){return new et({color:i,roughness:e,envMapIntensity:t})}function Wv(i,e){const t=new Xe;for(const n of[-1,1]){const s=n*.096,r=new Xe;if(r.position.set(s,0,.012),t.add(r),i==="flats"||i==="boots"){const o=Pa(e,i==="boots"?.5:.32);if(i==="boots"){const c=Yd();o.map=c.map,o.bumpMap=c.bump,o.bumpScale=.4}r.add(Ne(new $e(.072,.016,.235),o,0,.008,.028));const a=Ne(new at(1,20,14),o,0,.026,.02);a.scale.set(.04,.027,.105),r.add(a);const l=Ne(new at(1,18,12),o,0,.019,.112);if(l.scale.set(.037,.02,.045),r.add(l),r.add(Ne(new $e(.054,.028,.034),o,0,.014,-.07)),i==="boots"){const c=Ne(new kt(.058,.052,.3,20),o,s,.19,0);t.add(c);const u=Ne(new kt(.061,.06,.025,20),o,s,.345,0);t.add(u)}}else if(i==="sneakers"){const o=Sr([2,2]),a=new et({color:e,map:o.map,bumpMap:o.bump,bumpScale:.3,roughness:.85,envMapIntensity:.4}),l=Pa("#ece7db",.6,.5);r.add(Ne(new $e(.078,.026,.245),l,0,.013,.028));const c=Ne(new at(1,20,14),a,0,.036,.015);c.scale.set(.042,.032,.108),r.add(c);const u=Ne(new at(1,18,12),a,0,.026,.105);u.scale.set(.039,.022,.05),r.add(u),r.add(Ne(new $e(.06,.05,.03),a,0,.032,-.085))}else{const o=Pa(e,.18,1.2),a=Ne(new $e(.07,.02,.23),o,0,.031,.02);a.rotation.x=.18,r.add(a),r.add(Ne(new $e(.05,.05,.03),o,0,.025,-.075));const l=Ne(new at(1,18,12),o,0,.03,.07);l.scale.set(.038,.024,.07),r.add(l);const c=Ne(new at(1,18,12),o,0,.045,-.06);c.scale.set(.036,.03,.04),r.add(c)}}return t}function Xv(i){const e=new Xe;switch(i){case"none":return null;case"cap":{const t=_i("#a83c46",.8),n=Ne(new at(.0875,36,20,0,Math.PI*2,0,Math.PI*.52),t,0,-.12,-.002);n.scale.set(.9,.82,1.1),e.add(n);const s=Ne(new at(1,24,12),t,0,-.106,.08);return s.scale.set(.052,.008,.048),e.add(s),e.add(Ne(new at(.008,12,8),t,0,-.046,-.002)),e}case"beanie":{const t=_i("#7d9b8a",.95);t.bumpMap=bl([16,1]),t.bumpScale=.5;const n=Ne(new at(.0885,36,22,0,Math.PI*2,0,Math.PI*.55),t,0,-.114,-.002);n.scale.set(.9,.85,1.1),e.add(n);const s=_i("#6d8a7a",.95);s.bumpMap=bl([22,1]),s.bumpScale=.7;const r=Ne(new kt(.0895,.0905,.036,36,1,!0),s,0,-.15,-.002);return r.scale.set(.9,1,1.1),e.add(r),e.add(Ne(new at(.024,14,10),_i("#f0ebe2",.95),0,-.028,-.002)),e}case"catears":{const t=Ne(new Wt(.082,.0038,8,32,Math.PI),new et({color:"#26262b",roughness:.4,metalness:.3}),0,-.122,0);t.scale.set(.9,1,1.08),t.rotation.x=.08,e.add(t);const n=_i("#5a4232",.95),s=new et({color:"#d98a9e",roughness:.9});for(const r of[-1,1]){const o=Ne(new _r(.021,.048,16),n,r*.052,-.028,0);o.rotation.z=-r*.28,e.add(o);const a=Ne(new _r(.011,.026,12),s,r*.05,-.034,.009);a.rotation.z=-r*.28,e.add(a)}return e}case"ribbon":{const t=new et({color:"#b03050",roughness:.35,envMapIntensity:.8}),n=new Xe;n.position.set(.048,-.052,.028);for(const r of[-1,1]){const o=Ne(new _r(.027,.052,18),t,r*.028,.004,0);o.rotation.z=r*1.15,o.scale.set(1,1,.45),n.add(o)}const s=Ne(new at(.0105,12,10),t,0,.002,0);return s.scale.set(1,1,.7),n.add(s),e.add(n),e}}}const Sn=new et({color:"#26262b",roughness:.35,metalness:.85,envMapIntensity:1.1}),Cu=new et({color:"#d7e6ea",roughness:.05,metalness:0,transparent:!0,opacity:.16,envMapIntensity:1.4,depthWrite:!1});function La(i,e=.0016){const t=new Xe;for(const n of[-1,1])t.add(Ne(new $e(e,e,.102),i,n*.0555,.004,-.047));return t}function qv(i){const e=new Xe;switch(i){case"none":return null;case"round":{for(const t of[-1,1]){e.add(Ne(new Wt(.0215,.0016,8,28),Sn,t*.034,0,.002));const n=Ne(new Xl(.02,28),Cu,t*.034,0,.0015);n.castShadow=!1,e.add(n)}return e.add(Ne(new $e(.017,.002,.002),Sn,0,.004,.002)),e.add(La(Sn)),e}case"square":{for(const t of[-1,1]){const n=t*.034;e.add(Ne(new $e(.047,.0022,.0022),Sn,n,.018,.002)),e.add(Ne(new $e(.047,.0022,.0022),Sn,n,-.018,.002)),e.add(Ne(new $e(.0022,.038,.0022),Sn,n-.0225,0,.002)),e.add(Ne(new $e(.0022,.038,.0022),Sn,n+.0225,0,.002));const s=Ne(new Ft(.043,.034),Cu,n,0,.0015);s.castShadow=!1,e.add(s)}return e.add(Ne(new $e(.017,.002,.002),Sn,0,.006,.002)),e.add(La(Sn)),e}case"sunglasses":{const t=new et({color:"#101014",roughness:.08,metalness:.1,transparent:!0,opacity:.94,envMapIntensity:1.5});for(const n of[-1,1]){const s=Ne(new at(1,24,16),t,n*.034,-.002,.002);s.scale.set(.0255,.0185,.0055),e.add(s)}return e.add(Ne(new $e(.118,.004,.003),Sn,0,.016,.002)),e.add(La(Sn,.003)),e}}}const Pu=new et({color:"#d8b25c",roughness:.27,metalness:1,envMapIntensity:1.3});function Yv(i,e){const t=new Xe;switch(i){case"none":return null;case"necklace":{t.scale.z=1+(e.bust-1)*.55;const n=new Vd([new L(-.042,.005,.012),new L(-.052,-.045,.062),new L(0,-.118,.108),new L(.052,-.045,.062),new L(.042,.005,.012)]);t.add(Ne(new $l(n,40,.0022,8),Pu,0,0,0));const s=Ne(new Yl(.0095),new et({color:"#e58bb1",roughness:.12,envMapIntensity:1.5}),0,-.13,.106);return t.add(s),{group:t,anchor:"neck"}}case"scarf":{const n=_i("#a63d46",.95),s=Ne(new Wt(.056,.019,12,28),n,0,.038,0);s.rotation.x=Math.PI/2,t.add(s);const r=Ne(new $e(.042,.105,.011),n,.038,-.052,.088);return r.rotation.x=.06,t.add(r),{group:t,anchor:"neck"}}case"bag":{const n=Yd(),s=new et({color:"#7c4a2d",map:n.map,bumpMap:n.bump,bumpScale:.5,roughness:.55,envMapIntensity:.7});t.add(Ne(new $e(.058,.165,.215),s,.012,-.145,0)),t.add(Ne(new $e(.06,.068,.218),s,.012,-.095,0)),t.add(Ne(new $e(.02,.014,.006),Pu,.012,-.128,.109));const r=Ne(new $e(.015,.583,.004),s,-.204,.148,-.005);return r.rotation.z=.8,t.add(r),{group:t,anchor:"bag"}}}}function Wi(i){for(const e of[...i.children])i.remove(e),e.traverse(t=>{t instanceof He&&t.geometry.dispose()})}function Go(i,e){i.topMaterial.color.set(e.topColor),Wi(i.torsoAnchor),i.torsoAnchor.add(Vv(e.topStyle,i.topMaterial,e.character));const t=Hv(e.outerStyle,e.outerColor,e.character);if(t&&i.torsoAnchor.add(t),Wi(i.bottomAnchor),!Ho(e.topStyle)&&e.bottomStyle!=="none"){const o=Gv(e.bottomStyle,_i(e.bottomColor),e.character);o&&i.bottomAnchor.add(o)}Wi(i.shoesAnchor),i.shoesAnchor.add(Wv(e.shoeStyle,e.shoeColor)),Wi(i.hatAnchor);const n=Xv(e.hat);n&&i.hatAnchor.add(n),Wi(i.glassesAnchor);const s=qv(e.glasses);s&&i.glassesAnchor.add(s),Wi(i.neckAnchor),Wi(i.bagAnchor);const r=Yv(e.accessory,e.character);r&&(r.anchor==="neck"?i.neckAnchor:i.bagAnchor).add(r.group),i.applyPose(e.pose)}const Lu={type:"change"},Zl={type:"start"},th={type:"end"},oo=new ko,Du=new Yn,$v=Math.cos(70*Yf.DEG2RAD),Pt=new L,Zt=2*Math.PI,yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Da=1e-6;class jv extends Tv{constructor(e,t=null){super(e,t),this.state=yt.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Is.ROTATE,MIDDLE:Is.DOLLY,RIGHT:Is.PAN},this.touches={ONE:Ps.ROTATE,TWO:Ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new es,this._lastTargetPosition=new L,this._quat=new es().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Su,this._sphericalDelta=new Su,this._scale=1,this._panOffset=new L,this._rotateStart=new fe,this._rotateEnd=new fe,this._rotateDelta=new fe,this._panStart=new fe,this._panEnd=new fe,this._panDelta=new fe,this._dollyStart=new fe,this._dollyEnd=new fe,this._dollyDelta=new fe,this._dollyDirection=new L,this._mouse=new fe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Jv.bind(this),this._onPointerDown=Kv.bind(this),this._onPointerUp=Zv.bind(this),this._onContextMenu=ry.bind(this),this._onMouseWheel=ty.bind(this),this._onKeyDown=ny.bind(this),this._onTouchStart=iy.bind(this),this._onTouchMove=sy.bind(this),this._onMouseDown=Qv.bind(this),this._onMouseMove=ey.bind(this),this._interceptControlDown=oy.bind(this),this._interceptControlUp=ay.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lu),this.update(),this.state=yt.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Zt:n>Math.PI&&(n-=Zt),s<-Math.PI?s+=Zt:s>Math.PI&&(s-=Zt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Pt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(oo.origin.copy(this.object.position),oo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oo.direction))<$v?this.object.lookAt(this.target):(Du.setFromNormalAndCoplanarPoint(this.object.up,this.target),oo.intersectPlane(Du,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Da||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Da||this._lastTargetPosition.distanceToSquared(this.target)>Da?(this.dispatchEvent(Lu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pt.copy(s).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new fe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Kv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Jv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Zv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(th),this.state=yt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Qv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Is.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=yt.DOLLY;break;case Is.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}break;case Is.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(Zl)}function ey(i){switch(this.state){case yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ty(i){this.enabled===!1||this.enableZoom===!1||this.state!==yt.NONE||(i.preventDefault(),this.dispatchEvent(Zl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(th))}function ny(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function iy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=yt.TOUCH_ROTATE;break;case Ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=yt.TOUCH_PAN;break;default:this.state=yt.NONE}break;case 2:switch(this.touches.TWO){case Ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=yt.TOUCH_DOLLY_PAN;break;case Ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=yt.TOUCH_DOLLY_ROTATE;break;default:this.state=yt.NONE}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(Zl)}function sy(i){switch(this._trackPointer(i),this.state){case yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=yt.NONE}}function ry(i){this.enabled!==!1&&i.preventDefault()}function oy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ay(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ly extends Bd{constructor(){super();const e=new $e;e.deleteAttribute("uv");const t=new et({side:$t}),n=new et,s=new qd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new He(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new He(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new He(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new He(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new He(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const u=new He(e,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new He(e,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new He(e,As(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const p=new He(e,As(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const _=new He(e,As(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const x=new He(e,As(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const m=new He(e,As(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const h=new He(e,As(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function As(i){const e=new Qn;return e.color.setScalar(i),e}class Wo extends He{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Gt;const n=this,s=t.color!==void 0?new Qe(t.color):new Qe(8355711),r=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,l=t.shader||Wo.ReflectorShader,c=t.multisample!==void 0?t.multisample:4,u=new Yn,d=new L,f=new L,p=new L,_=new gt,x=new L(0,0,-1),m=new pt,h=new L,b=new L,S=new pt,v=new gt,A=this.camera,w=new ni(r,o,{samples:c,type:Ys}),T=new ii({name:l.name!==void 0?l.name:"unspecified",uniforms:Cd.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});T.uniforms.tDiffuse.value=w.texture,T.uniforms.color.value=s,T.uniforms.textureMatrix.value=v,this.material=T,this.onBeforeRender=function(C,g,y){if(f.setFromMatrixPosition(n.matrixWorld),p.setFromMatrixPosition(y.matrixWorld),_.extractRotation(n.matrixWorld),d.set(0,0,1),d.applyMatrix4(_),h.subVectors(f,p),h.dot(d)>0)return;h.reflect(d).negate(),h.add(f),_.extractRotation(y.matrixWorld),x.set(0,0,-1),x.applyMatrix4(_),x.add(p),b.subVectors(f,x),b.reflect(d).negate(),b.add(f),A.position.copy(h),A.up.set(0,1,0),A.up.applyMatrix4(_),A.up.reflect(d),A.lookAt(b),A.far=y.far,A.updateMatrixWorld(),A.projectionMatrix.copy(y.projectionMatrix),v.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),v.multiply(A.projectionMatrix),v.multiply(A.matrixWorldInverse),v.multiply(n.matrixWorld),u.setFromNormalAndCoplanarPoint(d,f),u.applyMatrix4(A.matrixWorldInverse),m.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const P=A.projectionMatrix;S.x=(Math.sign(m.x)+P.elements[8])/P.elements[0],S.y=(Math.sign(m.y)+P.elements[9])/P.elements[5],S.z=-1,S.w=(1+P.elements[10])/P.elements[14],m.multiplyScalar(2/m.dot(S)),P.elements[2]=m.x,P.elements[6]=m.y,P.elements[10]=m.z+1-a,P.elements[14]=m.w,n.visible=!1;const B=C.getRenderTarget(),O=C.xr.enabled,H=C.shadowMap.autoUpdate;C.xr.enabled=!1,C.shadowMap.autoUpdate=!1,C.setRenderTarget(w),C.state.buffers.depth.setMask(!0),C.autoClear===!1&&C.clear(),C.render(g,A),C.xr.enabled=O,C.shadowMap.autoUpdate=H,C.setRenderTarget(B);const $=y.viewport;$!==void 0&&C.state.viewport($),n.visible=!0},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),n.material.dispose()}}}Wo.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const Al=["ja","en","es","zh","fr","de","pt","ko"],cy={ja:"日本語",en:"English",es:"Español",zh:"中文（简体）",fr:"Français",de:"Deutsch",pt:"Português",ko:"한국어"},uy={ja:"ja-JP",en:"en-US",es:"es-ES",zh:"zh-CN",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ko:"ko-KR"},dy={"app.title":"3D試着室","app.workingTitle":"仮称","app.tagline":"着せ替えて、撮って、見せびらかそう。","cat.character":"人物","cat.looks":"コーデ","cat.tops":"トップス","cat.outer":"アウター","cat.bottoms":"ボトムス","cat.shoes":"靴","cat.hat":"帽子","cat.glasses":"メガネ","cat.accessory":"アクセサリー","cat.pose":"ポーズ","cat.llm":"AI接続","item.none":"なし","top.tee":"Tシャツ","top.hoodie":"パーカー","top.blouse":"ブラウス","top.dress":"ワンピース","top.dressLong":"ロングワンピース","outer.jacket":"ジャケット","outer.coat":"コート","outer.cardigan":"カーディガン","bottom.skirt":"スカート","bottom.skirtLong":"ロングスカート","bottom.pants":"パンツ","bottom.shorts":"ショートパンツ","shoe.flats":"フラットシューズ","shoe.sneakers":"スニーカー","shoe.pumps":"パンプス","shoe.boots":"ブーツ","hat.cap":"キャップ","hat.beanie":"ニット帽","hat.catears":"ねこ耳","hat.ribbon":"リボン","glasses.round":"まるメガネ","glasses.square":"しかくメガネ","glasses.sunglasses":"サングラス","accessory.necklace":"ネックレス","accessory.scarf":"マフラー","accessory.bag":"バッグ","pose.stand":"ふつう","pose.wave":"てをふる","pose.cheer":"バンザイ","pose.peace":"ピース","pose.relax":"リラックス","ui.skinTone":"肌の色","ui.height":"身長","ui.body":"体型","body.shoulderWidth":"肩幅","body.waist":"ウエスト","body.hip":"ヒップ","body.bust":"バスト","body.build":"体格","ui.face":"顔立ち","face.eyeSize":"目の大きさ","face.eyeSpacing":"目の間隔","face.eyeHeight":"目の高さ","face.eyeShape":"目の形","face.eyeTilt":"目の傾き","face.browHeight":"眉の高さ","face.browTilt":"眉の傾き","face.noseWidth":"鼻の幅","face.noseProminence":"鼻の高さ","face.lipWidth":"口の幅","face.lipFullness":"唇の厚み","face.faceWidth":"顔の幅","face.asymmetry":"左右差","ui.hairStyle":"髪型","ui.hairColor":"髪の色","ui.eyeColor":"瞳の色","hair.bob":"ボブ","hair.long":"ロング","hair.short":"ショート","hair.ponytail":"ポニーテール","hair.bun":"お団子","ui.seed":"シード","ui.copy":"コピー","ui.seedCopied":"シードをコピーしました","ui.seedApply":"適用","ui.seedInvalid":"シードが読み取れませんでした","ui.cardLoad":"カード画像から復元","ui.cardRestored":"カードから復元しました","ui.cardInvalid":"その画像からシードが読み取れませんでした","ui.name":"名前","ui.namePlaceholder":"名前（任意）","ui.nameNote":"その人物の呼び名です。名前はシードと一緒に旅をして、共有カードには着用者として小さく添えられます。実在の人物の名前は付けないでください。","ui.currentLook":"今のコーデ","ui.lookNamePlaceholder":"コーデの名前（例: 雨の日コーデ）","ui.saveLook":"このコーデを保存","ui.lookSaved":"コーデを保存しました","ui.lookApplied":"保存したコーデに着替えました","ui.lookNameRequired":"先にコーデの名前を入れてください","ui.looksEmpty":"保存したコーデはまだありません。今の組み合わせに名前を付けて残せます。","ui.prevLook":"前のコーデ","ui.swapLook":"前のコーデと入れ替え","ui.swapped":"前のコーデと入れ替えました","card.wornBy":"着用","card.fictional":"※この人物は架空のキャラクターです","ui.roster":"人物リスト","ui.newPerson":"新しい人物","ui.unnamed":"名前なし","ui.currentPerson":"表示中","ui.switchPerson":"呼び出す","ui.rename":"改名","ui.delete":"削除","ui.history":"編集履歴","ui.historyNote":"履歴はこの端末の中だけに残ります。カード・シード・書き出しファイルには含まれません。","ui.historyRestored":"履歴から復元しました","history.create":"作成","history.restore":"復元","history.blend":"合成","history.rename":"改名","history.parents":"合成元","history.mutate":"変異","history.source":"変異元","genetics.title":"人物の合成","genetics.note":"2人のシードから、新しい人物のパラメータを合成します。衣服と名前は引き継がれません。","genetics.personA":"人物Aのシード","genetics.personB":"人物Bのシード","genetics.useCurrent":"現在の人物","genetics.generate":"新しい人物を生成","genetics.result":"合成した人物","genetics.apply":"この人物にする","genetics.cancel":"やめる","genetics.created":"合成した人物を表示しています","mutation.title":"バリエーション","mutation.note":"この人物の「近くの別人」を4人作ります。選んだ人は新しい人物として始まります（名前は付きません）。衣服は変わりません。","mutation.subtle":"控えめ","mutation.standard":"標準","mutation.bold":"大胆","mutation.generate":"バリエーションを作る","mutation.candidates":"候補の人物","mutation.apply":"この人物にする","mutation.cancel":"やめる","mutation.applied":"新しい人物として採用しました","mutation.created":"候補を4人作りました","restore.note":"この人物は受け取った「型」です。そのまま使うこともできますが、ここから自分の人物を作るのがこのアプリの使い方です。","restore.makeMine":"この型から自分の人物を作る","restore.dismiss":"このまま使う","ui.dressHidesBottom":"ワンピースのときはボトムスは表示されません","ui.color":"色","ui.savePhoto":"写真を保存","ui.export3d":"3Dファイル書き出し","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3Dファイルを書き出しました","export.note":"人物とコーデを、他のツールやアプリで使える3Dファイルとして書き出します。Tポーズの基準姿勢で、骨格（ヒューマノイドの骨マッピング）付き。ファイルの中にはシードとパラメータのJSON、利用条件（素材として自由に使えます）が記録されます。","ui.random":"ランダム","ui.spin":"自動回転","ui.saved":"写真を保存しました","ui.resetView":"視点を戻す","llm.settingsTitle":"接続設定（自分のLLM）","llm.endpoint":"エンドポイントURL","llm.apiKey":"APIキー（任意）","llm.model":"モデル名","llm.save":"保存","llm.saved":"設定を保存しました","llm.test":"接続テスト","llm.testing":"接続中…","llm.testOk":"接続できました","llm.testFail":"接続できませんでした","llm.note":"設定はこの端末にだけ保存されます。送信されるのは指示文と現在の人物・コーデの状態だけで、送信先は設定したエンドポイントのみです。","llm.chatTitle":"AIに頼む","llm.chatPlaceholder":"例: ドレスに着替えて、髪を金色にして","llm.send":"送信","llm.thinking":"考え中…","llm.notConfigured":"まず接続設定を保存してください","llm.modelMissing":"モデル名を入力してください","llm.invalidEndpoint":"エンドポイントURLを確認してください","llm.applied":"実行","llm.rejected":"却下","llm.error":"エラー","llm.you":"あなた","llm.ai":"AI","sd.settingsTitle":"画像生成の接続設定（自分のSD）","sd.endpoint":"SDエンドポイントURL","sd.auth":"認証情報（任意）","sd.note":"設定はこの端末にだけ保存されます。生成は設定したSDサーバ側で行われます（モデルも計算もあなたの環境です）。「今の姿から生成」では、現在の3D描画が入力画像として設定先へ送られます。生成された画像はあなたのコンテンツで、この端末にだけ保存されます。","sd.promptTitle":"自動で組み立てるプロンプト","sd.extraLabel":"追加の言葉（任意）","sd.extraPlaceholder":"例: 水彩イラスト風、夕日の光","sd.fromPhoto":"今の姿から生成","sd.fromText":"文章だけで生成","sd.generating":"生成中…（サーバ側の計算に時間がかかります）","sd.notConfigured":"まずSDの接続設定を保存してください","sd.resultTitle":"生成した画像","sd.download":"画像を保存","sd.toCard":"この絵でカードを作る","sd.cardSaved":"カードを保存しました","vr.enter":"VRで入る","vr.exit":"VRを終了","vr.unsupported":"この環境ではWebXR（VR）に対応していないため、VRには入れません。通常の画面ではそのまま遊べます。","vr.sessionError":"VRセッションを開始できませんでした","vr.panelTitle":"きせかえ","vr.pageClothes":"ふく","vr.pageExtras":"こもの・ポーズ","vr.looks":"コーデ","vr.noLooks":"保存したコーデはまだありません","vr.turnLeft":"左を向く","vr.turnRight":"右を向く","vr.hint":"スティックを左右に倒しても回れます","footer.note":"無料・広告なし・アカウントなし。データはこの端末の中だけ。AI接続・画像生成を使う場合のみ、設定した接続先へ現在の状態（画像生成では現在の描画）が送られます。","principle.note":"このアプリの人物はすべて、パラメータから作られる架空の成人キャラクターです。生成は成人の範囲に限るよう設計されており、実在の人物を再現するためのものではありません。"},hy={"app.title":"3D Fitting Room","app.workingTitle":"working title","app.tagline":"Dress up, snap it, show it off.","cat.character":"Character","cat.looks":"Looks","cat.tops":"Tops","cat.outer":"Outerwear","cat.bottoms":"Bottoms","cat.shoes":"Shoes","cat.hat":"Hats","cat.glasses":"Glasses","cat.accessory":"Accessories","cat.pose":"Pose","cat.llm":"AI Connect","item.none":"None","top.tee":"T-shirt","top.hoodie":"Hoodie","top.blouse":"Blouse","top.dress":"Dress","top.dressLong":"Long dress","outer.jacket":"Jacket","outer.coat":"Coat","outer.cardigan":"Cardigan","bottom.skirt":"Skirt","bottom.skirtLong":"Long skirt","bottom.pants":"Pants","bottom.shorts":"Shorts","shoe.flats":"Flats","shoe.sneakers":"Sneakers","shoe.pumps":"Pumps","shoe.boots":"Boots","hat.cap":"Cap","hat.beanie":"Beanie","hat.catears":"Cat ears","hat.ribbon":"Ribbon","glasses.round":"Round glasses","glasses.square":"Square glasses","glasses.sunglasses":"Sunglasses","accessory.necklace":"Necklace","accessory.scarf":"Scarf","accessory.bag":"Bag","pose.stand":"Stand","pose.wave":"Wave","pose.cheer":"Cheer","pose.peace":"Peace","pose.relax":"Relax","ui.skinTone":"Skin tone","ui.height":"Height","ui.body":"Body","body.shoulderWidth":"Shoulder width","body.waist":"Waist","body.hip":"Hips","body.bust":"Bust","body.build":"Build","ui.face":"Face","face.eyeSize":"Eye size","face.eyeSpacing":"Eye spacing","face.eyeHeight":"Eye height","face.eyeShape":"Eye shape","face.eyeTilt":"Eye angle","face.browHeight":"Brow height","face.browTilt":"Brow angle","face.noseWidth":"Nose width","face.noseProminence":"Nose height","face.lipWidth":"Mouth width","face.lipFullness":"Lip fullness","face.faceWidth":"Face width","face.asymmetry":"Asymmetry","ui.hairStyle":"Hairstyle","ui.hairColor":"Hair color","ui.eyeColor":"Eye color","hair.bob":"Bob","hair.long":"Long","hair.short":"Short","hair.ponytail":"Ponytail","hair.bun":"Bun","ui.seed":"Seed","ui.copy":"Copy","ui.seedCopied":"Seed copied","ui.seedApply":"Apply","ui.seedInvalid":"That seed could not be read","ui.cardLoad":"Restore from a card image","ui.cardRestored":"Restored from the card","ui.cardInvalid":"No seed could be read from that image","ui.name":"Name","ui.namePlaceholder":"Name (optional)","ui.nameNote":"What this person is called. The name travels with the seed and is noted small on the share card as the wearer. Please do not name them after a real person.","ui.currentLook":"Current look","ui.lookNamePlaceholder":"Name this look (e.g. Rainy day)","ui.saveLook":"Save this look","ui.lookSaved":"Look saved","ui.lookApplied":"Changed into the saved look","ui.lookNameRequired":"Give the look a name first","ui.looksEmpty":"No saved looks yet. Name the current combination to keep it here.","ui.prevLook":"Previous look","ui.swapLook":"Swap with previous look","ui.swapped":"Swapped with the previous look","card.wornBy":"Worn by","card.fictional":"* This character is fictional.","ui.roster":"People","ui.newPerson":"New person","ui.unnamed":"Unnamed","ui.currentPerson":"On stage","ui.switchPerson":"Call up","ui.rename":"Rename","ui.delete":"Delete","ui.history":"Edit history","ui.historyNote":"History stays on this device only. It is never included in cards, seeds or exported files.","ui.historyRestored":"Restored from history","history.create":"Created","history.restore":"Restored","history.blend":"Blended","history.rename":"Renamed","history.parents":"Blended from","history.mutate":"Varied","history.source":"Varied from","genetics.title":"Blend two people","genetics.note":"Synthesizes a new person from the parameters of two seeds. Clothes and names are not carried over.","genetics.personA":"Seed of person A","genetics.personB":"Seed of person B","genetics.useCurrent":"Current person","genetics.generate":"Create a new person","genetics.result":"Blended person","genetics.apply":"Use this person","genetics.cancel":"Discard","genetics.created":"Showing the blended person","mutation.title":"Variations","mutation.note":"Rolls four nearby-but-different people from this one. Whoever you pick starts as a new person (no name attached). Clothes do not change.","mutation.subtle":"Subtle","mutation.standard":"Standard","mutation.bold":"Bold","mutation.generate":"Make variations","mutation.candidates":"Candidates","mutation.apply":"Use this person","mutation.cancel":"Discard","mutation.applied":"Adopted as a new person","mutation.created":"Four variations are ready","restore.note":"This person arrived as a template. You can keep them exactly as they are — or make them the starting point of your own person.","restore.makeMine":"Make my own person from this template","restore.dismiss":"Keep this person","ui.dressHidesBottom":"Bottoms are not shown while a dress is worn","ui.color":"Color","ui.savePhoto":"Save photo","ui.export3d":"Export 3D file","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D file exported","export.note":"Exports the person and outfit as a 3D file other tools and apps can use: a T-posed reference figure with a humanoid bone mapping. The seed, a parameter JSON and the usage terms (free to use as material) are recorded inside the file.","ui.random":"Random","ui.spin":"Auto-spin","ui.saved":"Photo saved","ui.resetView":"Reset view","llm.settingsTitle":"Connection (your own LLM)","llm.endpoint":"Endpoint URL","llm.apiKey":"API key (optional)","llm.model":"Model name","llm.save":"Save","llm.saved":"Settings saved","llm.test":"Test connection","llm.testing":"Testing…","llm.testOk":"Connected","llm.testFail":"Could not connect","llm.note":"Settings are stored only on this device. The only things ever sent are your instruction and the current character/outfit state, and only to the endpoint you set.","llm.chatTitle":"Ask the AI","llm.chatPlaceholder":"e.g. Put on a dress and make my hair blonde","llm.send":"Send","llm.thinking":"Thinking…","llm.notConfigured":"Save the connection settings first","llm.modelMissing":"Enter a model name","llm.invalidEndpoint":"Check the endpoint URL","llm.applied":"Applied","llm.rejected":"Rejected","llm.error":"Error","llm.you":"You","llm.ai":"AI","sd.settingsTitle":"Image generation (your own SD)","sd.endpoint":"SD endpoint URL","sd.auth":"Auth (optional)","sd.note":'Settings are stored only on this device. Generation runs on the SD server you configured — the model and the compute are yours. "From current look" sends the current 3D rendering to that endpoint as the input image. Generated images are your content and are kept only on this device.',"sd.promptTitle":"Auto-built prompt","sd.extraLabel":"Extra words (optional)","sd.extraPlaceholder":"e.g. watercolor illustration, sunset light","sd.fromPhoto":"From current look","sd.fromText":"From text only","sd.generating":"Generating… (the server takes a while)","sd.notConfigured":"Save the SD connection settings first","sd.resultTitle":"Generated image","sd.download":"Save image","sd.toCard":"Make a card with this image","sd.cardSaved":"Card saved","vr.enter":"Enter VR","vr.exit":"Exit VR","vr.unsupported":"WebXR VR is not available in this environment, so VR cannot be entered. The regular screen works as always.","vr.sessionError":"The VR session could not be started","vr.panelTitle":"Dress-up","vr.pageClothes":"Clothes","vr.pageExtras":"Extras & pose","vr.looks":"Looks","vr.noLooks":"No saved looks yet","vr.turnLeft":"Turn left","vr.turnRight":"Turn right","vr.hint":"You can also turn with the thumbstick","footer.note":"Free, no ads, no accounts. Data stays on this device; only when you use the AI or image-generation connections is the current state (for image generation, the current rendering) sent to the endpoint you configured.","principle.note":"Everyone in this app is a fictional adult character generated from parameters. Generation is designed to stay within an adult range, and this app is not made for recreating real people."},fy={"app.title":"3D Fitting Room","app.workingTitle":"título provisional","app.tagline":"Cambia el look, haz una foto y compártelo.","cat.character":"Personaje","cat.looks":"Conjuntos","cat.tops":"Tops","cat.outer":"Exteriores","cat.bottoms":"Partes de abajo","cat.shoes":"Zapatos","cat.hat":"Sombreros","cat.glasses":"Gafas","cat.accessory":"Accesorios","cat.pose":"Pose","cat.llm":"Conexión IA","item.none":"Ninguno","top.tee":"Camiseta","top.hoodie":"Sudadera","top.blouse":"Blusa","top.dress":"Vestido","top.dressLong":"Vestido largo","outer.jacket":"Chaqueta","outer.coat":"Abrigo","outer.cardigan":"Cárdigan","bottom.skirt":"Falda","bottom.skirtLong":"Falda larga","bottom.pants":"Pantalón","bottom.shorts":"Pantalón corto","shoe.flats":"Zapatos planos","shoe.sneakers":"Zapatillas","shoe.pumps":"Tacones","shoe.boots":"Botas","hat.cap":"Gorra","hat.beanie":"Gorro","hat.catears":"Orejas de gato","hat.ribbon":"Lazo","glasses.round":"Gafas redondas","glasses.square":"Gafas cuadradas","glasses.sunglasses":"Gafas de sol","accessory.necklace":"Collar","accessory.scarf":"Bufanda","accessory.bag":"Bolso","pose.stand":"De pie","pose.wave":"Saludar","pose.cheer":"Celebrar","pose.peace":"Paz","pose.relax":"Relax","ui.skinTone":"Tono de piel","ui.height":"Altura","ui.body":"Cuerpo","body.shoulderWidth":"Ancho de hombros","body.waist":"Cintura","body.hip":"Cadera","body.bust":"Pecho","body.build":"Complexión","ui.face":"Rostro","face.eyeSize":"Tamaño de ojos","face.eyeSpacing":"Distancia entre ojos","face.eyeHeight":"Altura de ojos","face.eyeShape":"Forma de ojos","face.eyeTilt":"Inclinación de ojos","face.browHeight":"Altura de cejas","face.browTilt":"Inclinación de cejas","face.noseWidth":"Ancho de nariz","face.noseProminence":"Altura de nariz","face.lipWidth":"Ancho de boca","face.lipFullness":"Grosor de labios","face.faceWidth":"Ancho de rostro","face.asymmetry":"Asimetría","ui.hairStyle":"Peinado","ui.hairColor":"Color de pelo","ui.eyeColor":"Color de ojos","hair.bob":"Bob","hair.long":"Largo","hair.short":"Corto","hair.ponytail":"Cola de caballo","hair.bun":"Moño","ui.seed":"Semilla","ui.copy":"Copiar","ui.seedCopied":"Semilla copiada","ui.seedApply":"Aplicar","ui.seedInvalid":"No se pudo leer esa semilla","ui.cardLoad":"Restaurar desde una tarjeta","ui.cardRestored":"Restaurado desde la tarjeta","ui.cardInvalid":"No se encontró ninguna semilla en esa imagen","ui.name":"Nombre","ui.namePlaceholder":"Nombre (opcional)","ui.nameNote":"El nombre de este personaje. Viaja con la semilla y aparece en pequeño en la tarjeta como quien lo lleva. No le pongas el nombre de una persona real.","ui.currentLook":"Look actual","ui.lookNamePlaceholder":"Nombre del look (ej.: Día de lluvia)","ui.saveLook":"Guardar este look","ui.lookSaved":"Look guardado","ui.lookApplied":"Look aplicado","ui.lookNameRequired":"Primero ponle un nombre al look","ui.looksEmpty":"Aún no hay looks guardados. Ponle nombre a la combinación actual para guardarla aquí.","ui.prevLook":"Look anterior","ui.swapLook":"Cambiar al look anterior","ui.swapped":"Cambiado al look anterior","card.wornBy":"Lo lleva","card.fictional":"* Este personaje es ficticio.","ui.roster":"Personajes","ui.newPerson":"Nuevo personaje","ui.unnamed":"Sin nombre","ui.currentPerson":"En escena","ui.switchPerson":"Mostrar","ui.rename":"Renombrar","ui.delete":"Eliminar","ui.history":"Historial de edición","ui.historyNote":"El historial se queda solo en este dispositivo. Nunca se incluye en tarjetas, semillas ni archivos exportados.","ui.historyRestored":"Restaurado del historial","history.create":"Creado","history.restore":"Restaurado","history.blend":"Combinado","history.rename":"Renombrado","history.parents":"Combinado de","history.mutate":"Variado","history.source":"Variado de","genetics.title":"Combinar dos personajes","genetics.note":"Sintetiza un personaje nuevo a partir de los parámetros de dos semillas. La ropa y los nombres no se heredan.","genetics.personA":"Semilla del personaje A","genetics.personB":"Semilla del personaje B","genetics.useCurrent":"Personaje actual","genetics.generate":"Crear un personaje nuevo","genetics.result":"Personaje combinado","genetics.apply":"Usar este personaje","genetics.cancel":"Descartar","genetics.created":"Mostrando el personaje combinado","mutation.title":"Variaciones","mutation.note":"Genera cuatro personas cercanas pero distintas a partir de esta. La que elijas empieza como un personaje nuevo (sin nombre). La ropa no cambia.","mutation.subtle":"Sutil","mutation.standard":"Estándar","mutation.bold":"Audaz","mutation.generate":"Crear variaciones","mutation.candidates":"Candidatos","mutation.apply":"Usar este personaje","mutation.cancel":"Descartar","mutation.applied":"Adoptado como personaje nuevo","mutation.created":"Cuatro variaciones listas","restore.note":"Este personaje llegó como plantilla. Puedes quedártelo tal cual, o convertirlo en el punto de partida de tu propio personaje.","restore.makeMine":"Crear mi personaje desde esta plantilla","restore.dismiss":"Quedarme con este personaje","ui.dressHidesBottom":"Las partes de abajo no se muestran con un vestido","ui.color":"Color","ui.savePhoto":"Guardar foto","ui.export3d":"Exportar archivo 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Archivo 3D exportado","export.note":"Exporta el personaje y el look como un archivo 3D que otras herramientas y apps pueden usar: una figura de referencia en pose T con mapeo de huesos humanoide. La semilla, un JSON de parámetros y las condiciones de uso (libre como material) quedan registrados dentro del archivo.","ui.random":"Aleatorio","ui.spin":"Giro automático","ui.saved":"Foto guardada","ui.resetView":"Restablecer vista","llm.settingsTitle":"Conexión (tu propio LLM)","llm.endpoint":"URL del endpoint","llm.apiKey":"Clave API (opcional)","llm.model":"Nombre del modelo","llm.save":"Guardar","llm.saved":"Configuración guardada","llm.test":"Probar conexión","llm.testing":"Probando…","llm.testOk":"Conectado","llm.testFail":"No se pudo conectar","llm.note":"La configuración se guarda solo en este dispositivo. Lo único que se envía es tu instrucción y el estado actual del personaje y el look, y solo al endpoint que configuraste.","llm.chatTitle":"Pídeselo a la IA","llm.chatPlaceholder":"ej.: Ponle un vestido y hazle el pelo rubio","llm.send":"Enviar","llm.thinking":"Pensando…","llm.notConfigured":"Primero guarda la configuración de conexión","llm.modelMissing":"Introduce un nombre de modelo","llm.invalidEndpoint":"Revisa la URL del endpoint","llm.applied":"Aplicado","llm.rejected":"Rechazado","llm.error":"Error","llm.you":"Tú","llm.ai":"IA","sd.settingsTitle":"Generación de imágenes (tu propio SD)","sd.endpoint":"URL del endpoint de SD","sd.auth":"Autenticación (opcional)","sd.note":"La configuración se guarda solo en este dispositivo. La generación se realiza en el servidor SD que configuraste: el modelo y el cómputo son tuyos. «Desde el look actual» envía la renderización 3D actual a ese endpoint como imagen de entrada. Las imágenes generadas son tu contenido y se guardan solo en este dispositivo.","sd.promptTitle":"Prompt construido automáticamente","sd.extraLabel":"Palabras extra (opcional)","sd.extraPlaceholder":"ej.: estilo acuarela, luz de atardecer","sd.fromPhoto":"Desde el look actual","sd.fromText":"Solo desde texto","sd.generating":"Generando… (el servidor tarda un poco)","sd.notConfigured":"Primero guarda la configuración de SD","sd.resultTitle":"Imagen generada","sd.download":"Guardar imagen","sd.toCard":"Hacer una tarjeta con esta imagen","sd.cardSaved":"Tarjeta guardada","vr.enter":"Entrar en VR","vr.exit":"Salir de VR","vr.unsupported":"La VR WebXR no está disponible en este entorno, así que no se puede entrar en VR. La pantalla normal funciona como siempre.","vr.sessionError":"No se pudo iniciar la sesión VR","vr.panelTitle":"Vestidor","vr.pageClothes":"Ropa","vr.pageExtras":"Accesorios y pose","vr.looks":"Looks","vr.noLooks":"Aún no hay looks guardados","vr.turnLeft":"Girar a la izquierda","vr.turnRight":"Girar a la derecha","vr.hint":"También puedes girar con el joystick","footer.note":"Gratis, sin anuncios y sin cuentas. Los datos se quedan en este dispositivo; solo cuando usas las conexiones de IA o de generación de imágenes se envía el estado actual (en el caso de las imágenes, el renderizado actual) al endpoint que configuraste.","principle.note":"Todos los personajes de esta app son adultos ficticios generados a partir de parámetros. La generación está diseñada para mantenerse dentro del rango adulto, y esta app no está hecha para recrear a personas reales."},py={"app.title":"3D Fitting Room","app.workingTitle":"暂定名称","app.tagline":"换装、拍照、秀出来。","cat.character":"角色","cat.looks":"搭配","cat.tops":"上装","cat.outer":"外套","cat.bottoms":"下装","cat.shoes":"鞋子","cat.hat":"帽子","cat.glasses":"眼镜","cat.accessory":"配饰","cat.pose":"姿势","cat.llm":"AI 连接","item.none":"无","top.tee":"T恤","top.hoodie":"连帽衫","top.blouse":"衬衫","top.dress":"连衣裙","top.dressLong":"长款连衣裙","outer.jacket":"夹克","outer.coat":"大衣","outer.cardigan":"开衫","bottom.skirt":"裙子","bottom.skirtLong":"长裙","bottom.pants":"长裤","bottom.shorts":"短裤","shoe.flats":"平底鞋","shoe.sneakers":"运动鞋","shoe.pumps":"高跟鞋","shoe.boots":"靴子","hat.cap":"棒球帽","hat.beanie":"针织帽","hat.catears":"猫耳","hat.ribbon":"蝴蝶结","glasses.round":"圆框眼镜","glasses.square":"方框眼镜","glasses.sunglasses":"太阳镜","accessory.necklace":"项链","accessory.scarf":"围巾","accessory.bag":"包","pose.stand":"站立","pose.wave":"挥手","pose.cheer":"欢呼","pose.peace":"剪刀手","pose.relax":"放松","ui.skinTone":"肤色","ui.height":"身高","ui.body":"体型","body.shoulderWidth":"肩宽","body.waist":"腰围","body.hip":"臀围","body.bust":"胸围","body.build":"体格","ui.face":"面部","face.eyeSize":"眼睛大小","face.eyeSpacing":"眼距","face.eyeHeight":"眼睛高度","face.eyeShape":"眼型","face.eyeTilt":"眼角倾斜","face.browHeight":"眉毛高度","face.browTilt":"眉毛倾斜","face.noseWidth":"鼻宽","face.noseProminence":"鼻高","face.lipWidth":"嘴宽","face.lipFullness":"唇厚","face.faceWidth":"脸宽","face.asymmetry":"左右差","ui.hairStyle":"发型","ui.hairColor":"发色","ui.eyeColor":"瞳色","hair.bob":"波波头","hair.long":"长发","hair.short":"短发","hair.ponytail":"马尾","hair.bun":"丸子头","ui.seed":"种子","ui.copy":"复制","ui.seedCopied":"种子已复制","ui.seedApply":"应用","ui.seedInvalid":"无法读取该种子","ui.cardLoad":"从卡片图片恢复","ui.cardRestored":"已从卡片恢复","ui.cardInvalid":"无法从该图片读取种子","ui.name":"名字","ui.namePlaceholder":"名字（可选）","ui.nameNote":"这个角色的名字。名字会随种子一起传递，并作为穿着者小字标注在分享卡片上。请不要用真实人物的名字。","ui.currentLook":"当前搭配","ui.lookNamePlaceholder":"搭配名称（例：雨天搭配）","ui.saveLook":"保存这个搭配","ui.lookSaved":"搭配已保存","ui.lookApplied":"已换上保存的搭配","ui.lookNameRequired":"请先给搭配起个名字","ui.looksEmpty":"还没有保存的搭配。给现在的组合起个名字就能保存在这里。","ui.prevLook":"上一个搭配","ui.swapLook":"与上一个搭配互换","ui.swapped":"已与上一个搭配互换","card.wornBy":"穿着者","card.fictional":"※这个人物是虚构的角色","ui.roster":"人物列表","ui.newPerson":"新人物","ui.unnamed":"未命名","ui.currentPerson":"展示中","ui.switchPerson":"调出","ui.rename":"改名","ui.delete":"删除","ui.history":"编辑历史","ui.historyNote":"历史只保存在这台设备上，绝不会包含在卡片、种子或导出的文件中。","ui.historyRestored":"已从历史恢复","history.create":"创建","history.restore":"恢复","history.blend":"合成","history.rename":"改名","history.parents":"合成来源","history.mutate":"变异","history.source":"变异来源","genetics.title":"合成两个人物","genetics.note":"根据两个种子的参数合成一个新人物。衣服和名字不会被继承。","genetics.personA":"人物A的种子","genetics.personB":"人物B的种子","genetics.useCurrent":"当前人物","genetics.generate":"生成新人物","genetics.result":"合成的人物","genetics.apply":"使用这个人物","genetics.cancel":"取消","genetics.created":"正在显示合成的人物","mutation.title":"变体","mutation.note":"以这个人物为基础，生成四个相近但不同的人物。选中的人物将作为新人物开始（不带名字）。衣服不会改变。","mutation.subtle":"微小","mutation.standard":"标准","mutation.bold":"大胆","mutation.generate":"生成变体","mutation.candidates":"候选人物","mutation.apply":"使用这个人物","mutation.cancel":"取消","mutation.applied":"已作为新人物采用","mutation.created":"已生成四个变体","restore.note":"这个人物是以模板的形式收到的。你可以原样保留，也可以以此为起点，创建属于你自己的人物。","restore.makeMine":"以这个模板创建我的人物","restore.dismiss":"就保留这个人物","ui.dressHidesBottom":"穿连衣裙时不显示下装","ui.color":"颜色","ui.savePhoto":"保存照片","ui.export3d":"导出3D文件","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D文件已导出","export.note":"将人物和搭配导出为其他工具和应用可以使用的3D文件：T型姿势的参考模型，带有人形骨骼映射。种子、参数JSON和使用条件（可自由用作素材）都记录在文件内部。","ui.random":"随机","ui.spin":"自动旋转","ui.saved":"照片已保存","ui.resetView":"重置视角","llm.settingsTitle":"连接设置（自己的LLM）","llm.endpoint":"端点URL","llm.apiKey":"API密钥（可选）","llm.model":"模型名称","llm.save":"保存","llm.saved":"设置已保存","llm.test":"连接测试","llm.testing":"连接中…","llm.testOk":"已连接","llm.testFail":"无法连接","llm.note":"设置只保存在这台设备上。发送的内容只有你的指令和当前的人物/搭配状态，且只发送到你设置的端点。","llm.chatTitle":"让AI来做","llm.chatPlaceholder":"例：换上连衣裙，把头发变成金色","llm.send":"发送","llm.thinking":"思考中…","llm.notConfigured":"请先保存连接设置","llm.modelMissing":"请输入模型名称","llm.invalidEndpoint":"请检查端点URL","llm.applied":"已执行","llm.rejected":"已拒绝","llm.error":"错误","llm.you":"你","llm.ai":"AI","sd.settingsTitle":"图像生成连接设置（自己的SD）","sd.endpoint":"SD端点URL","sd.auth":"认证信息（可选）","sd.note":"设置只保存在这台设备上。生成在你配置的SD服务器上进行——模型和算力都属于你。“从当前造型生成”会把当前的3D渲染作为输入图片发送到该端点。生成的图片是你的内容，只保存在这台设备上。","sd.promptTitle":"自动组装的提示词","sd.extraLabel":"附加词（可选）","sd.extraPlaceholder":"例：水彩插画风、夕阳的光","sd.fromPhoto":"从当前造型生成","sd.fromText":"仅用文字生成","sd.generating":"生成中…（服务器计算需要时间）","sd.notConfigured":"请先保存SD连接设置","sd.resultTitle":"生成的图片","sd.download":"保存图片","sd.toCard":"用这张图制作卡片","sd.cardSaved":"卡片已保存","vr.enter":"进入VR","vr.exit":"退出VR","vr.unsupported":"此环境不支持 WebXR VR，无法进入 VR。普通画面可以照常使用。","vr.sessionError":"无法启动VR会话","vr.panelTitle":"换装","vr.pageClothes":"服装","vr.pageExtras":"配饰与姿势","vr.looks":"搭配","vr.noLooks":"还没有保存的搭配","vr.turnLeft":"向左转","vr.turnRight":"向右转","vr.hint":"也可以用摇杆左右转动","footer.note":"免费、无广告、无需账号。数据只保存在这台设备上；仅当你使用 AI 连接或图像生成时，当前状态（图像生成时为当前渲染图）才会发送到你设置的端点。","principle.note":"本应用中的人物都是由参数生成的虚构成年角色。生成被设计为仅限于成年范围，本应用并非用于再现真实人物。"},my={"app.title":"3D Fitting Room","app.workingTitle":"titre provisoire","app.tagline":"Change de tenue, prends la photo, montre-la.","cat.character":"Personnage","cat.looks":"Tenues","cat.tops":"Hauts","cat.outer":"Vestes","cat.bottoms":"Bas","cat.shoes":"Chaussures","cat.hat":"Chapeaux","cat.glasses":"Lunettes","cat.accessory":"Accessoires","cat.pose":"Pose","cat.llm":"Connexion IA","item.none":"Aucun","top.tee":"T-shirt","top.hoodie":"Sweat à capuche","top.blouse":"Blouse","top.dress":"Robe","top.dressLong":"Robe longue","outer.jacket":"Veste","outer.coat":"Manteau","outer.cardigan":"Cardigan","bottom.skirt":"Jupe","bottom.skirtLong":"Jupe longue","bottom.pants":"Pantalon","bottom.shorts":"Short","shoe.flats":"Chaussures plates","shoe.sneakers":"Baskets","shoe.pumps":"Escarpins","shoe.boots":"Bottes","hat.cap":"Casquette","hat.beanie":"Bonnet","hat.catears":"Oreilles de chat","hat.ribbon":"Ruban","glasses.round":"Lunettes rondes","glasses.square":"Lunettes carrées","glasses.sunglasses":"Lunettes de soleil","accessory.necklace":"Collier","accessory.scarf":"Écharpe","accessory.bag":"Sac","pose.stand":"Debout","pose.wave":"Saluer","pose.cheer":"Hourra","pose.peace":"Paix","pose.relax":"Détente","ui.skinTone":"Teint","ui.height":"Taille","ui.body":"Corps","body.shoulderWidth":"Largeur d'épaules","body.waist":"Tour de taille","body.hip":"Hanches","body.bust":"Poitrine","body.build":"Carrure","ui.face":"Visage","face.eyeSize":"Taille des yeux","face.eyeSpacing":"Écart des yeux","face.eyeHeight":"Hauteur des yeux","face.eyeShape":"Forme des yeux","face.eyeTilt":"Inclinaison des yeux","face.browHeight":"Hauteur des sourcils","face.browTilt":"Inclinaison des sourcils","face.noseWidth":"Largeur du nez","face.noseProminence":"Hauteur du nez","face.lipWidth":"Largeur de la bouche","face.lipFullness":"Épaisseur des lèvres","face.faceWidth":"Largeur du visage","face.asymmetry":"Asymétrie","ui.hairStyle":"Coiffure","ui.hairColor":"Couleur de cheveux","ui.eyeColor":"Couleur des yeux","hair.bob":"Carré","hair.long":"Longs","hair.short":"Courts","hair.ponytail":"Queue de cheval","hair.bun":"Chignon","ui.seed":"Graine","ui.copy":"Copier","ui.seedCopied":"Graine copiée","ui.seedApply":"Appliquer","ui.seedInvalid":"Cette graine est illisible","ui.cardLoad":"Restaurer depuis une carte","ui.cardRestored":"Restauré depuis la carte","ui.cardInvalid":"Aucune graine trouvée dans cette image","ui.name":"Nom","ui.namePlaceholder":"Nom (facultatif)","ui.nameNote":"Le nom de ce personnage. Il voyage avec la graine et figure en petit sur la carte comme la personne qui porte la tenue. Ne lui donnez pas le nom d'une personne réelle.","ui.currentLook":"Tenue actuelle","ui.lookNamePlaceholder":"Nom de la tenue (ex. Jour de pluie)","ui.saveLook":"Enregistrer cette tenue","ui.lookSaved":"Tenue enregistrée","ui.lookApplied":"Tenue appliquée","ui.lookNameRequired":"Donnez d'abord un nom à la tenue","ui.looksEmpty":"Aucune tenue enregistrée pour le moment. Nommez la combinaison actuelle pour la garder ici.","ui.prevLook":"Tenue précédente","ui.swapLook":"Échanger avec la tenue précédente","ui.swapped":"Échange effectué","card.wornBy":"Porté par","card.fictional":"* Ce personnage est fictif.","ui.roster":"Personnages","ui.newPerson":"Nouveau personnage","ui.unnamed":"Sans nom","ui.currentPerson":"Sur scène","ui.switchPerson":"Afficher","ui.rename":"Renommer","ui.delete":"Supprimer","ui.history":"Historique d'édition","ui.historyNote":"L'historique reste uniquement sur cet appareil. Il n'est jamais inclus dans les cartes, les graines ni les fichiers exportés.","ui.historyRestored":"Restauré depuis l'historique","history.create":"Créé","history.restore":"Restauré","history.blend":"Fusionné","history.rename":"Renommé","history.parents":"Fusionné à partir de","history.mutate":"Varié","history.source":"Varié à partir de","genetics.title":"Fusionner deux personnages","genetics.note":"Synthétise un nouveau personnage à partir des paramètres de deux graines. Les vêtements et les noms ne sont pas repris.","genetics.personA":"Graine du personnage A","genetics.personB":"Graine du personnage B","genetics.useCurrent":"Personnage actuel","genetics.generate":"Créer un nouveau personnage","genetics.result":"Personnage fusionné","genetics.apply":"Utiliser ce personnage","genetics.cancel":"Abandonner","genetics.created":"Affichage du personnage fusionné","mutation.title":"Variations","mutation.note":"Génère quatre personnages proches mais différents à partir de celui-ci. Celui que vous choisirez commencera comme un nouveau personnage (sans nom). Les vêtements ne changent pas.","mutation.subtle":"Subtile","mutation.standard":"Standard","mutation.bold":"Audacieuse","mutation.generate":"Créer des variations","mutation.candidates":"Candidats","mutation.apply":"Utiliser ce personnage","mutation.cancel":"Abandonner","mutation.applied":"Adopté comme nouveau personnage","mutation.created":"Quatre variations prêtes","restore.note":"Ce personnage est arrivé comme modèle. Vous pouvez le garder tel quel — ou en faire le point de départ de votre propre personnage.","restore.makeMine":"Créer mon personnage à partir de ce modèle","restore.dismiss":"Garder ce personnage","ui.dressHidesBottom":"Le bas n'est pas affiché avec une robe","ui.color":"Couleur","ui.savePhoto":"Enregistrer la photo","ui.export3d":"Exporter le fichier 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Fichier 3D exporté","export.note":"Exporte le personnage et la tenue sous forme de fichier 3D utilisable par d'autres outils et applications : une figure de référence en pose T avec un squelette humanoïde. La graine, un JSON de paramètres et les conditions d'utilisation (libre comme matériau) sont enregistrés dans le fichier.","ui.random":"Aléatoire","ui.spin":"Rotation auto","ui.saved":"Photo enregistrée","ui.resetView":"Réinitialiser la vue","llm.settingsTitle":"Connexion (votre propre LLM)","llm.endpoint":"URL de l'endpoint","llm.apiKey":"Clé API (facultatif)","llm.model":"Nom du modèle","llm.save":"Enregistrer","llm.saved":"Réglages enregistrés","llm.test":"Tester la connexion","llm.testing":"Test en cours…","llm.testOk":"Connecté","llm.testFail":"Connexion impossible","llm.note":"Les réglages sont conservés uniquement sur cet appareil. Seuls votre instruction et l'état actuel du personnage et de la tenue sont envoyés, et uniquement au point de terminaison que vous avez défini.","llm.chatTitle":"Demander à l'IA","llm.chatPlaceholder":"ex. Mets-lui une robe et rends ses cheveux blonds","llm.send":"Envoyer","llm.thinking":"Réflexion…","llm.notConfigured":"Enregistrez d'abord les réglages de connexion","llm.modelMissing":"Saisissez un nom de modèle","llm.invalidEndpoint":"Vérifiez l'URL du point de terminaison","llm.applied":"Appliqué","llm.rejected":"Rejeté","llm.error":"Erreur","llm.you":"Vous","llm.ai":"IA","sd.settingsTitle":"Génération d'images (votre propre SD)","sd.endpoint":"URL de l'endpoint SD","sd.auth":"Authentification (facultatif)","sd.note":"Les réglages sont conservés uniquement sur cet appareil. La génération s'exécute sur le serveur SD que vous avez configuré — le modèle et le calcul sont les vôtres. « Depuis la tenue actuelle » envoie le rendu 3D actuel à ce point de terminaison comme image d'entrée. Les images générées sont votre contenu et restent uniquement sur cet appareil.","sd.promptTitle":"Prompt construit automatiquement","sd.extraLabel":"Mots supplémentaires (facultatif)","sd.extraPlaceholder":"ex. style aquarelle, lumière du couchant","sd.fromPhoto":"Depuis la tenue actuelle","sd.fromText":"Depuis le texte seul","sd.generating":"Génération… (le serveur prend un moment)","sd.notConfigured":"Enregistrez d'abord la configuration SD","sd.resultTitle":"Image générée","sd.download":"Enregistrer l'image","sd.toCard":"Faire une carte avec cette image","sd.cardSaved":"Carte enregistrée","vr.enter":"Entrer en VR","vr.exit":"Quitter la VR","vr.unsupported":"La VR WebXR n'est pas disponible dans cet environnement, impossible d'entrer en VR. L'écran normal fonctionne comme toujours.","vr.sessionError":"La session VR n'a pas pu démarrer","vr.panelTitle":"Essayage","vr.pageClothes":"Vêtements","vr.pageExtras":"Accessoires et pose","vr.looks":"Tenues","vr.noLooks":"Aucune tenue enregistrée","vr.turnLeft":"Tourner à gauche","vr.turnRight":"Tourner à droite","vr.hint":"Vous pouvez aussi tourner avec le stick","footer.note":"Gratuit, sans publicité, sans compte. Les données restent sur cet appareil ; ce n'est que lorsque vous utilisez les connexions IA ou de génération d'images que l'état actuel (pour les images, le rendu actuel) est envoyé au point de terminaison que vous avez configuré.","principle.note":"Tous les personnages de cette application sont des adultes fictifs générés à partir de paramètres. La génération est conçue pour rester dans la plage adulte, et cette application n'est pas faite pour recréer des personnes réelles."},gy={"app.title":"3D Fitting Room","app.workingTitle":"Arbeitstitel","app.tagline":"Umziehen, Foto knipsen, herzeigen.","cat.character":"Figur","cat.looks":"Outfits","cat.tops":"Oberteile","cat.outer":"Jacken & Mäntel","cat.bottoms":"Unterteile","cat.shoes":"Schuhe","cat.hat":"Hüte","cat.glasses":"Brillen","cat.accessory":"Accessoires","cat.pose":"Pose","cat.llm":"KI-Verbindung","item.none":"Keine","top.tee":"T-Shirt","top.hoodie":"Hoodie","top.blouse":"Bluse","top.dress":"Kleid","top.dressLong":"Langes Kleid","outer.jacket":"Jacke","outer.coat":"Mantel","outer.cardigan":"Strickjacke","bottom.skirt":"Rock","bottom.skirtLong":"Langer Rock","bottom.pants":"Hose","bottom.shorts":"Shorts","shoe.flats":"Flache Schuhe","shoe.sneakers":"Sneaker","shoe.pumps":"Pumps","shoe.boots":"Stiefel","hat.cap":"Cap","hat.beanie":"Beanie","hat.catears":"Katzenohren","hat.ribbon":"Schleife","glasses.round":"Runde Brille","glasses.square":"Eckige Brille","glasses.sunglasses":"Sonnenbrille","accessory.necklace":"Halskette","accessory.scarf":"Schal","accessory.bag":"Tasche","pose.stand":"Stehen","pose.wave":"Winken","pose.cheer":"Jubeln","pose.peace":"Peace","pose.relax":"Entspannt","ui.skinTone":"Hautton","ui.height":"Größe","ui.body":"Körper","body.shoulderWidth":"Schulterbreite","body.waist":"Taille","body.hip":"Hüfte","body.bust":"Brust","body.build":"Statur","ui.face":"Gesicht","face.eyeSize":"Augengröße","face.eyeSpacing":"Augenabstand","face.eyeHeight":"Augenhöhe","face.eyeShape":"Augenform","face.eyeTilt":"Augenneigung","face.browHeight":"Brauenhöhe","face.browTilt":"Braunenneigung","face.noseWidth":"Nasenbreite","face.noseProminence":"Nasenhöhe","face.lipWidth":"Mundbreite","face.lipFullness":"Lippenfülle","face.faceWidth":"Gesichtsbreite","face.asymmetry":"Asymmetrie","ui.hairStyle":"Frisur","ui.hairColor":"Haarfarbe","ui.eyeColor":"Augenfarbe","hair.bob":"Bob","hair.long":"Lang","hair.short":"Kurz","hair.ponytail":"Pferdeschwanz","hair.bun":"Dutt","ui.seed":"Seed","ui.copy":"Kopieren","ui.seedCopied":"Seed kopiert","ui.seedApply":"Anwenden","ui.seedInvalid":"Dieser Seed konnte nicht gelesen werden","ui.cardLoad":"Von einer Karte wiederherstellen","ui.cardRestored":"Von der Karte wiederhergestellt","ui.cardInvalid":"In diesem Bild wurde kein Seed gefunden","ui.name":"Name","ui.namePlaceholder":"Name (optional)","ui.nameNote":"So heißt diese Figur. Der Name reist mit dem Seed und steht klein auf der Share-Karte als die Person, die das Outfit trägt. Bitte benenne sie nicht nach einer echten Person.","ui.currentLook":"Aktuelles Outfit","ui.lookNamePlaceholder":"Name des Outfits (z. B. Regentag)","ui.saveLook":"Dieses Outfit speichern","ui.lookSaved":"Outfit gespeichert","ui.lookApplied":"Gespeichertes Outfit angezogen","ui.lookNameRequired":"Gib dem Outfit zuerst einen Namen","ui.looksEmpty":"Noch keine gespeicherten Outfits. Benenne die aktuelle Kombination, um sie hier zu behalten.","ui.prevLook":"Vorheriges Outfit","ui.swapLook":"Mit vorherigem Outfit tauschen","ui.swapped":"Mit vorherigem Outfit getauscht","card.wornBy":"Getragen von","card.fictional":"* Diese Figur ist fiktiv.","ui.roster":"Figuren","ui.newPerson":"Neue Figur","ui.unnamed":"Ohne Namen","ui.currentPerson":"Auf der Bühne","ui.switchPerson":"Anzeigen","ui.rename":"Umbenennen","ui.delete":"Löschen","ui.history":"Bearbeitungsverlauf","ui.historyNote":"Der Verlauf bleibt nur auf diesem Gerät. Er ist nie in Karten, Seeds oder exportierten Dateien enthalten.","ui.historyRestored":"Aus dem Verlauf wiederhergestellt","history.create":"Erstellt","history.restore":"Wiederhergestellt","history.blend":"Gemischt","history.rename":"Umbenannt","history.parents":"Gemischt aus","history.mutate":"Variiert","history.source":"Variiert aus","genetics.title":"Zwei Figuren mischen","genetics.note":"Erzeugt aus den Parametern zweier Seeds eine neue Figur. Kleidung und Namen werden nicht übernommen.","genetics.personA":"Seed von Figur A","genetics.personB":"Seed von Figur B","genetics.useCurrent":"Aktuelle Figur","genetics.generate":"Neue Figur erzeugen","genetics.result":"Gemischte Figur","genetics.apply":"Diese Figur verwenden","genetics.cancel":"Verwerfen","genetics.created":"Die gemischte Figur wird gezeigt","mutation.title":"Variationen","mutation.note":"Erzeugt aus dieser Figur vier ähnliche, aber andere Figuren. Die gewählte startet als neue Figur (ohne Namen). Die Kleidung bleibt gleich.","mutation.subtle":"Dezent","mutation.standard":"Standard","mutation.bold":"Mutig","mutation.generate":"Variationen erzeugen","mutation.candidates":"Kandidaten","mutation.apply":"Diese Figur verwenden","mutation.cancel":"Verwerfen","mutation.applied":"Als neue Figur übernommen","mutation.created":"Vier Variationen sind bereit","restore.note":"Diese Figur kam als Vorlage an. Du kannst sie genau so behalten — oder sie zum Ausgangspunkt deiner eigenen Figur machen.","restore.makeMine":"Aus dieser Vorlage meine eigene Figur machen","restore.dismiss":"Diese Figur behalten","ui.dressHidesBottom":"Unterteile werden mit einem Kleid nicht angezeigt","ui.color":"Farbe","ui.savePhoto":"Foto speichern","ui.export3d":"3D-Datei exportieren","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D-Datei exportiert","export.note":"Exportiert Figur und Outfit als 3D-Datei, die andere Tools und Apps nutzen können: eine Referenzfigur in T-Pose mit humanoider Knochenzuordnung. Seed, ein Parameter-JSON und die Nutzungsbedingungen (frei als Material verwendbar) sind in der Datei gespeichert.","ui.random":"Zufällig","ui.spin":"Auto-Drehung","ui.saved":"Foto gespeichert","ui.resetView":"Ansicht zurücksetzen","llm.settingsTitle":"Verbindung (dein eigenes LLM)","llm.endpoint":"Endpoint-URL","llm.apiKey":"API-Schlüssel (optional)","llm.model":"Modellname","llm.save":"Speichern","llm.saved":"Einstellungen gespeichert","llm.test":"Verbindung testen","llm.testing":"Teste…","llm.testOk":"Verbunden","llm.testFail":"Verbindung fehlgeschlagen","llm.note":"Die Einstellungen werden nur auf diesem Gerät gespeichert. Gesendet werden nur deine Anweisung und der aktuelle Zustand von Figur und Outfit — und nur an den von dir eingestellten Endpoint.","llm.chatTitle":"Die KI bitten","llm.chatPlaceholder":"z. B. Ein Kleid anziehen und die Haare blond färben","llm.send":"Senden","llm.thinking":"Denkt nach…","llm.notConfigured":"Speichere zuerst die Verbindungseinstellungen","llm.modelMissing":"Gib einen Modellnamen ein","llm.invalidEndpoint":"Prüfe die Endpoint-URL","llm.applied":"Ausgeführt","llm.rejected":"Abgelehnt","llm.error":"Fehler","llm.you":"Du","llm.ai":"KI","sd.settingsTitle":"Bildgenerierung (dein eigenes SD)","sd.endpoint":"SD-Endpoint-URL","sd.auth":"Authentifizierung (optional)","sd.note":"Die Einstellungen werden nur auf diesem Gerät gespeichert. Die Generierung läuft auf dem von dir konfigurierten SD-Server — Modell und Rechenleistung sind deine. „Aus aktuellem Look“ sendet das aktuelle 3D-Rendering als Eingabebild an diesen Endpoint. Generierte Bilder sind deine Inhalte und bleiben nur auf diesem Gerät.","sd.promptTitle":"Automatisch gebauter Prompt","sd.extraLabel":"Zusätzliche Worte (optional)","sd.extraPlaceholder":"z. B. Aquarell-Stil, Abendlicht","sd.fromPhoto":"Aus aktuellem Look","sd.fromText":"Nur aus Text","sd.generating":"Generiere… (der Server braucht einen Moment)","sd.notConfigured":"Speichere zuerst die SD-Einstellungen","sd.resultTitle":"Generiertes Bild","sd.download":"Bild speichern","sd.toCard":"Mit diesem Bild eine Karte machen","sd.cardSaved":"Karte gespeichert","vr.enter":"VR betreten","vr.exit":"VR beenden","vr.unsupported":"WebXR-VR ist in dieser Umgebung nicht verfügbar, daher kann VR nicht betreten werden. Der normale Bildschirm funktioniert wie immer.","vr.sessionError":"Die VR-Sitzung konnte nicht gestartet werden","vr.panelTitle":"Anprobe","vr.pageClothes":"Kleidung","vr.pageExtras":"Extras & Pose","vr.looks":"Outfits","vr.noLooks":"Noch keine gespeicherten Outfits","vr.turnLeft":"Nach links drehen","vr.turnRight":"Nach rechts drehen","vr.hint":"Mit dem Stick kannst du dich auch drehen","footer.note":"Kostenlos, ohne Werbung, ohne Konto. Daten bleiben auf diesem Gerät; nur wenn du die KI- oder Bildgenerierungs-Verbindung nutzt, wird der aktuelle Zustand (bei Bildern das aktuelle Rendering) an den von dir eingestellten Endpoint gesendet.","principle.note":"Alle Figuren in dieser App sind fiktive Erwachsene, die aus Parametern erzeugt werden. Die Erzeugung ist so ausgelegt, dass sie im Erwachsenenbereich bleibt, und diese App ist nicht dafür gemacht, echte Personen nachzubilden."},_y={"app.title":"3D Fitting Room","app.workingTitle":"título provisório","app.tagline":"Troque o look, tire a foto e mostre.","cat.character":"Personagem","cat.looks":"Looks","cat.tops":"Partes de cima","cat.outer":"Casacos","cat.bottoms":"Partes de baixo","cat.shoes":"Sapatos","cat.hat":"Chapéus","cat.glasses":"Óculos","cat.accessory":"Acessórios","cat.pose":"Pose","cat.llm":"Conexão IA","item.none":"Nenhum","top.tee":"Camiseta","top.hoodie":"Moletom","top.blouse":"Blusa","top.dress":"Vestido","top.dressLong":"Vestido longo","outer.jacket":"Jaqueta","outer.coat":"Casaco","outer.cardigan":"Cardigã","bottom.skirt":"Saia","bottom.skirtLong":"Saia longa","bottom.pants":"Calça","bottom.shorts":"Shorts","shoe.flats":"Sapatilha","shoe.sneakers":"Tênis","shoe.pumps":"Scarpin","shoe.boots":"Botas","hat.cap":"Boné","hat.beanie":"Gorro","hat.catears":"Orelhas de gato","hat.ribbon":"Laço","glasses.round":"Óculos redondos","glasses.square":"Óculos quadrados","glasses.sunglasses":"Óculos de sol","accessory.necklace":"Colar","accessory.scarf":"Cachecol","accessory.bag":"Bolsa","pose.stand":"Em pé","pose.wave":"Acenar","pose.cheer":"Comemorar","pose.peace":"Paz","pose.relax":"Relax","ui.skinTone":"Tom de pele","ui.height":"Altura","ui.body":"Corpo","body.shoulderWidth":"Largura dos ombros","body.waist":"Cintura","body.hip":"Quadris","body.bust":"Busto","body.build":"Estrutura","ui.face":"Rosto","face.eyeSize":"Tamanho dos olhos","face.eyeSpacing":"Distância dos olhos","face.eyeHeight":"Altura dos olhos","face.eyeShape":"Formato dos olhos","face.eyeTilt":"Inclinação dos olhos","face.browHeight":"Altura das sobrancelhas","face.browTilt":"Inclinação das sobrancelhas","face.noseWidth":"Largura do nariz","face.noseProminence":"Altura do nariz","face.lipWidth":"Largura da boca","face.lipFullness":"Espessura dos lábios","face.faceWidth":"Largura do rosto","face.asymmetry":"Assimetria","ui.hairStyle":"Penteado","ui.hairColor":"Cor do cabelo","ui.eyeColor":"Cor dos olhos","hair.bob":"Chanel","hair.long":"Longo","hair.short":"Curto","hair.ponytail":"Rabo de cavalo","hair.bun":"Coque","ui.seed":"Semente","ui.copy":"Copiar","ui.seedCopied":"Semente copiada","ui.seedApply":"Aplicar","ui.seedInvalid":"Não foi possível ler essa semente","ui.cardLoad":"Restaurar de um cartão","ui.cardRestored":"Restaurado do cartão","ui.cardInvalid":"Nenhuma semente encontrada nessa imagem","ui.name":"Nome","ui.namePlaceholder":"Nome (opcional)","ui.nameNote":"O nome deste personagem. Ele viaja com a semente e aparece pequeno no cartão como quem veste o look. Não use o nome de uma pessoa real.","ui.currentLook":"Look atual","ui.lookNamePlaceholder":"Nome do look (ex.: Dia de chuva)","ui.saveLook":"Salvar este look","ui.lookSaved":"Look salvo","ui.lookApplied":"Look salvo aplicado","ui.lookNameRequired":"Dê um nome ao look primeiro","ui.looksEmpty":"Nenhum look salvo ainda. Dê um nome à combinação atual para guardá-la aqui.","ui.prevLook":"Look anterior","ui.swapLook":"Trocar com o look anterior","ui.swapped":"Trocado com o look anterior","card.wornBy":"Usado por","card.fictional":"* Este personagem é fictício.","ui.roster":"Personagens","ui.newPerson":"Novo personagem","ui.unnamed":"Sem nome","ui.currentPerson":"No palco","ui.switchPerson":"Chamar","ui.rename":"Renomear","ui.delete":"Excluir","ui.history":"Histórico de edição","ui.historyNote":"O histórico fica apenas neste dispositivo. Nunca é incluído em cartões, sementes ou arquivos exportados.","ui.historyRestored":"Restaurado do histórico","history.create":"Criado","history.restore":"Restaurado","history.blend":"Combinado","history.rename":"Renomeado","history.parents":"Combinado de","history.mutate":"Variado","history.source":"Variado de","genetics.title":"Combinar dois personagens","genetics.note":"Sintetiza um novo personagem a partir dos parâmetros de duas sementes. Roupas e nomes não são herdados.","genetics.personA":"Semente do personagem A","genetics.personB":"Semente do personagem B","genetics.useCurrent":"Personagem atual","genetics.generate":"Criar um novo personagem","genetics.result":"Personagem combinado","genetics.apply":"Usar este personagem","genetics.cancel":"Descartar","genetics.created":"Mostrando o personagem combinado","mutation.title":"Variações","mutation.note":"Gera quatro pessoas parecidas, mas diferentes, a partir desta. Quem você escolher começa como um personagem novo (sem nome). As roupas não mudam.","mutation.subtle":"Sutil","mutation.standard":"Padrão","mutation.bold":"Ousado","mutation.generate":"Criar variações","mutation.candidates":"Candidatos","mutation.apply":"Usar este personagem","mutation.cancel":"Descartar","mutation.applied":"Adotado como novo personagem","mutation.created":"Quatro variações prontas","restore.note":"Este personagem chegou como um modelo. Você pode mantê-lo exatamente como está — ou torná-lo o ponto de partida do seu próprio personagem.","restore.makeMine":"Criar meu personagem a partir deste modelo","restore.dismiss":"Manter este personagem","ui.dressHidesBottom":"As partes de baixo não aparecem com vestido","ui.color":"Cor","ui.savePhoto":"Salvar foto","ui.export3d":"Exportar arquivo 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Arquivo 3D exportado","export.note":"Exporta o personagem e o look como um arquivo 3D que outras ferramentas e apps podem usar: uma figura de referência em pose T com mapeamento de ossos humanoide. A semente, um JSON de parâmetros e os termos de uso (livre como material) ficam registrados dentro do arquivo.","ui.random":"Aleatório","ui.spin":"Giro automático","ui.saved":"Foto salva","ui.resetView":"Redefinir vista","llm.settingsTitle":"Conexão (seu próprio LLM)","llm.endpoint":"URL do endpoint","llm.apiKey":"Chave de API (opcional)","llm.model":"Nome do modelo","llm.save":"Salvar","llm.saved":"Configurações salvas","llm.test":"Testar conexão","llm.testing":"Testando…","llm.testOk":"Conectado","llm.testFail":"Não foi possível conectar","llm.note":"As configurações ficam apenas neste dispositivo. Só são enviados a sua instrução e o estado atual do personagem e do look, e apenas para o endpoint que você configurou.","llm.chatTitle":"Peça à IA","llm.chatPlaceholder":"ex.: Coloque um vestido e deixe o cabelo loiro","llm.send":"Enviar","llm.thinking":"Pensando…","llm.notConfigured":"Salve primeiro as configurações de conexão","llm.modelMissing":"Digite um nome de modelo","llm.invalidEndpoint":"Verifique a URL do endpoint","llm.applied":"Aplicado","llm.rejected":"Rejeitado","llm.error":"Erro","llm.you":"Você","llm.ai":"IA","sd.settingsTitle":"Geração de imagens (seu próprio SD)","sd.endpoint":"URL do endpoint SD","sd.auth":"Autenticação (opcional)","sd.note":"As configurações ficam apenas neste dispositivo. A geração roda no servidor SD que você configurou — o modelo e o processamento são seus. “Do look atual” envia a renderização 3D atual para esse endpoint como imagem de entrada. As imagens geradas são seu conteúdo e ficam apenas neste dispositivo.","sd.promptTitle":"Prompt montado automaticamente","sd.extraLabel":"Palavras extras (opcional)","sd.extraPlaceholder":"ex.: estilo aquarela, luz do pôr do sol","sd.fromPhoto":"Do look atual","sd.fromText":"Só do texto","sd.generating":"Gerando… (o servidor leva um tempo)","sd.notConfigured":"Salve primeiro as configurações do SD","sd.resultTitle":"Imagem gerada","sd.download":"Salvar imagem","sd.toCard":"Fazer um cartão com esta imagem","sd.cardSaved":"Cartão salvo","vr.enter":"Entrar em VR","vr.exit":"Sair da VR","vr.unsupported":"A VR WebXR não está disponível neste ambiente, então não é possível entrar em VR. A tela normal funciona como sempre.","vr.sessionError":"Não foi possível iniciar a sessão VR","vr.panelTitle":"Provador","vr.pageClothes":"Roupas","vr.pageExtras":"Acessórios e pose","vr.looks":"Looks","vr.noLooks":"Nenhum look salvo ainda","vr.turnLeft":"Virar à esquerda","vr.turnRight":"Virar à direita","vr.hint":"Você também pode virar com o analógico","footer.note":"Grátis, sem anúncios, sem contas. Os dados ficam neste dispositivo; só quando você usa as conexões de IA ou de geração de imagens é que o estado atual (no caso das imagens, a renderização atual) é enviado ao endpoint que você configurou.","principle.note":"Todos os personagens deste app são adultos fictícios gerados a partir de parâmetros. A geração foi projetada para ficar dentro da faixa adulta, e este app não foi feito para recriar pessoas reais."},vy={"app.title":"3D Fitting Room","app.workingTitle":"가제","app.tagline":"갈아입히고, 찍고, 자랑하세요.","cat.character":"인물","cat.looks":"코디","cat.tops":"상의","cat.outer":"아우터","cat.bottoms":"하의","cat.shoes":"신발","cat.hat":"모자","cat.glasses":"안경","cat.accessory":"액세서리","cat.pose":"포즈","cat.llm":"AI 연결","item.none":"없음","top.tee":"티셔츠","top.hoodie":"후드티","top.blouse":"블라우스","top.dress":"원피스","top.dressLong":"롱 원피스","outer.jacket":"재킷","outer.coat":"코트","outer.cardigan":"가디건","bottom.skirt":"스커트","bottom.skirtLong":"롱 스커트","bottom.pants":"바지","bottom.shorts":"반바지","shoe.flats":"플랫슈즈","shoe.sneakers":"스니커즈","shoe.pumps":"펌프스","shoe.boots":"부츠","hat.cap":"캡","hat.beanie":"비니","hat.catears":"고양이 귀","hat.ribbon":"리본","glasses.round":"동그란 안경","glasses.square":"네모난 안경","glasses.sunglasses":"선글라스","accessory.necklace":"목걸이","accessory.scarf":"목도리","accessory.bag":"가방","pose.stand":"서기","pose.wave":"손 흔들기","pose.cheer":"만세","pose.peace":"피스","pose.relax":"릴랙스","ui.skinTone":"피부톤","ui.height":"키","ui.body":"체형","body.shoulderWidth":"어깨너비","body.waist":"허리","body.hip":"엉덩이","body.bust":"가슴","body.build":"체격","ui.face":"얼굴","face.eyeSize":"눈 크기","face.eyeSpacing":"눈 간격","face.eyeHeight":"눈 높이","face.eyeShape":"눈 모양","face.eyeTilt":"눈 기울기","face.browHeight":"눈썹 높이","face.browTilt":"눈썹 기울기","face.noseWidth":"코 너비","face.noseProminence":"코 높이","face.lipWidth":"입 너비","face.lipFullness":"입술 두께","face.faceWidth":"얼굴 너비","face.asymmetry":"좌우 차이","ui.hairStyle":"헤어스타일","ui.hairColor":"머리 색","ui.eyeColor":"눈 색","hair.bob":"보브","hair.long":"롱","hair.short":"쇼트","hair.ponytail":"포니테일","hair.bun":"올림머리","ui.seed":"시드","ui.copy":"복사","ui.seedCopied":"시드를 복사했습니다","ui.seedApply":"적용","ui.seedInvalid":"그 시드를 읽을 수 없었습니다","ui.cardLoad":"카드 이미지에서 복원","ui.cardRestored":"카드에서 복원했습니다","ui.cardInvalid":"그 이미지에서 시드를 읽을 수 없었습니다","ui.name":"이름","ui.namePlaceholder":"이름(선택)","ui.nameNote":"이 인물의 이름입니다. 이름은 시드와 함께 이동하며, 공유 카드에 착용자로 작게 표시됩니다. 실제 인물의 이름은 붙이지 마세요.","ui.currentLook":"현재 코디","ui.lookNamePlaceholder":"코디 이름(예: 비 오는 날)","ui.saveLook":"이 코디 저장","ui.lookSaved":"코디를 저장했습니다","ui.lookApplied":"저장한 코디로 갈아입었습니다","ui.lookNameRequired":"먼저 코디 이름을 입력하세요","ui.looksEmpty":"아직 저장한 코디가 없습니다. 지금 조합에 이름을 붙이면 여기에 남길 수 있습니다.","ui.prevLook":"이전 코디","ui.swapLook":"이전 코디와 바꾸기","ui.swapped":"이전 코디와 바꿨습니다","card.wornBy":"착용","card.fictional":"※이 인물은 가상의 캐릭터입니다","ui.roster":"인물 목록","ui.newPerson":"새 인물","ui.unnamed":"이름 없음","ui.currentPerson":"표시 중","ui.switchPerson":"불러오기","ui.rename":"이름 변경","ui.delete":"삭제","ui.history":"편집 기록","ui.historyNote":"기록은 이 기기에만 남습니다. 카드, 시드, 내보낸 파일에는 절대 포함되지 않습니다.","ui.historyRestored":"기록에서 복원했습니다","history.create":"생성","history.restore":"복원","history.blend":"합성","history.rename":"이름 변경","history.parents":"합성 원본","history.mutate":"변이","history.source":"변이 원본","genetics.title":"두 인물 합성","genetics.note":"두 시드의 파라미터로 새 인물을 합성합니다. 옷과 이름은 이어지지 않습니다.","genetics.personA":"인물 A의 시드","genetics.personB":"인물 B의 시드","genetics.useCurrent":"현재 인물","genetics.generate":"새 인물 생성","genetics.result":"합성한 인물","genetics.apply":"이 인물로 하기","genetics.cancel":"취소","genetics.created":"합성한 인물을 표시하고 있습니다","mutation.title":"베리에이션","mutation.note":"이 인물을 바탕으로 가깝지만 다른 인물 4명을 만듭니다. 선택한 인물은 새 인물로 시작합니다(이름은 붙지 않습니다). 옷은 바뀌지 않습니다.","mutation.subtle":"은은하게","mutation.standard":"표준","mutation.bold":"대담하게","mutation.generate":"베리에이션 만들기","mutation.candidates":"후보 인물","mutation.apply":"이 인물로 하기","mutation.cancel":"취소","mutation.applied":"새 인물로 채택했습니다","mutation.created":"후보 4명을 만들었습니다","restore.note":"이 인물은 형(型)으로 받은 것입니다. 그대로 사용해도 되고, 여기서부터 나만의 인물을 만드는 출발점으로 삼을 수도 있습니다.","restore.makeMine":"이 형으로 내 인물 만들기","restore.dismiss":"이 인물 그대로 쓰기","ui.dressHidesBottom":"원피스를 입으면 하의는 표시되지 않습니다","ui.color":"색","ui.savePhoto":"사진 저장","ui.export3d":"3D 파일 내보내기","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D 파일을 내보냈습니다","export.note":"인물과 코디를 다른 도구와 앱에서 쓸 수 있는 3D 파일로 내보냅니다. 휴머노이드 뼈 매핑이 있는 T포즈 기준 모델입니다. 시드와 파라미터 JSON, 이용 조건(소재로 자유롭게 사용 가능)이 파일 안에 기록됩니다.","ui.random":"랜덤","ui.spin":"자동 회전","ui.saved":"사진을 저장했습니다","ui.resetView":"시점 초기화","llm.settingsTitle":"연결 설정(내 LLM)","llm.endpoint":"엔드포인트 URL","llm.apiKey":"API 키(선택)","llm.model":"모델 이름","llm.save":"저장","llm.saved":"설정을 저장했습니다","llm.test":"연결 테스트","llm.testing":"연결 중…","llm.testOk":"연결됐습니다","llm.testFail":"연결할 수 없었습니다","llm.note":"설정은 이 기기에만 저장됩니다. 전송되는 것은 지시문과 현재 인물·코디 상태뿐이며, 설정한 엔드포인트로만 전송됩니다.","llm.chatTitle":"AI에게 부탁하기","llm.chatPlaceholder":"예: 원피스로 갈아입히고 머리를 금발로 해줘","llm.send":"전송","llm.thinking":"생각 중…","llm.notConfigured":"먼저 연결 설정을 저장하세요","llm.modelMissing":"모델 이름을 입력하세요","llm.invalidEndpoint":"엔드포인트 URL을 확인하세요","llm.applied":"실행됨","llm.rejected":"거부됨","llm.error":"오류","llm.you":"나","llm.ai":"AI","sd.settingsTitle":"이미지 생성 연결 설정(내 SD)","sd.endpoint":"SD 엔드포인트 URL","sd.auth":"인증 정보(선택)","sd.note":'설정은 이 기기에만 저장됩니다. 생성은 설정한 SD 서버에서 이루어집니다(모델도 연산도 당신의 환경입니다). "지금 모습에서 생성"은 현재 3D 렌더링을 입력 이미지로 해당 엔드포인트에 보냅니다. 생성된 이미지는 당신의 콘텐츠이며 이 기기에만 저장됩니다.',"sd.promptTitle":"자동으로 조립되는 프롬프트","sd.extraLabel":"추가 문구(선택)","sd.extraPlaceholder":"예: 수채화 일러스트풍, 노을빛","sd.fromPhoto":"지금 모습에서 생성","sd.fromText":"문장만으로 생성","sd.generating":"생성 중…(서버 연산에 시간이 걸립니다)","sd.notConfigured":"먼저 SD 연결 설정을 저장하세요","sd.resultTitle":"생성한 이미지","sd.download":"이미지 저장","sd.toCard":"이 그림으로 카드 만들기","sd.cardSaved":"카드를 저장했습니다","vr.enter":"VR로 들어가기","vr.exit":"VR 종료","vr.unsupported":"이 환경에서는 WebXR(VR)을 지원하지 않아 VR에 들어갈 수 없습니다. 일반 화면에서는 평소처럼 놀 수 있습니다.","vr.sessionError":"VR 세션을 시작할 수 없었습니다","vr.panelTitle":"갈아입히기","vr.pageClothes":"옷","vr.pageExtras":"소품·포즈","vr.looks":"코디","vr.noLooks":"아직 저장한 코디가 없습니다","vr.turnLeft":"왼쪽 보기","vr.turnRight":"오른쪽 보기","vr.hint":"스틱을 좌우로 기울여도 돌아갈 수 있습니다","footer.note":"무료, 광고 없음, 계정 없음. 데이터는 이 기기 안에만 있습니다. AI 연결이나 이미지 생성을 사용할 때만 현재 상태(이미지 생성의 경우 현재 렌더링)가 설정한 엔드포인트로 전송됩니다.","principle.note":"이 앱의 인물은 모두 파라미터로 만들어지는 가상의 성인 캐릭터입니다. 생성은 성인 범위로 제한되도록 설계되어 있으며, 실제 인물을 재현하기 위한 앱이 아닙니다."},yy={ja:dy,en:hy,es:fy,zh:py,fr:my,de:gy,pt:_y,ko:vy};let Ql="ja";function nh(i){Ql=i}function Si(){return Ql}function I(i){return yy[Ql][i]}function xy(i){if(i!==null&&Al.includes(i))return i;const e=navigator.language.toLowerCase().split("-")[0];return Al.includes(e)?e:"en"}function ih(){return[{id:"tops",page:0,labelKey:"cat.tops",field:"topStyle",itemPrefix:"top",items:Li,colorField:"topColor",colors:Pi},{id:"outer",page:0,labelKey:"cat.outer",field:"outerStyle",itemPrefix:"outer",items:cs,colorField:"outerColor",colors:os},{id:"bottoms",page:0,labelKey:"cat.bottoms",field:"bottomStyle",itemPrefix:"bottom",items:as,colorField:"bottomColor",colors:ss},{id:"shoes",page:0,labelKey:"cat.shoes",field:"shoeStyle",itemPrefix:"shoe",items:ls,colorField:"shoeColor",colors:rs},{id:"hat",page:1,labelKey:"cat.hat",field:"hat",itemPrefix:"hat",items:Di},{id:"glasses",page:1,labelKey:"cat.glasses",field:"glasses",itemPrefix:"glasses",items:Ii},{id:"accessory",page:1,labelKey:"cat.accessory",field:"accessory",itemPrefix:"accessory",items:Ui},{id:"pose",page:1,labelKey:"cat.pose",field:"pose",itemPrefix:"pose",items:Ni}]}function Sy(i,e){return e==="none"?"item.none":`${i.itemPrefix}.${e}`}function mi(i){switch(i.type){case"field":return`f:${i.field}:${i.value}`;case"color":return`c:${i.field}:${i.value}`;case"look":return`look:${i.id}`;case"photo":return"photo";case"turn":return`turn:${i.dir}`;case"page":return`page:${i.page}`}}const My=new Set(["topStyle","outerStyle","bottomStyle","shoeStyle","hat","glasses","accessory","pose"]),by=new Set(["topColor","outerColor","bottomColor","shoeColor"]);function Ey(i){if(i==="photo")return{type:"photo"};if(i.startsWith("look:")){const t=i.slice(5);return t?{type:"look",id:t}:null}if(i==="turn:1")return{type:"turn",dir:1};if(i==="turn:-1")return{type:"turn",dir:-1};if(i==="page:0")return{type:"page",page:0};if(i==="page:1")return{type:"page",page:1};const e=i.split(":");return e.length===3&&e[0]==="f"&&My.has(e[1])?{type:"field",field:e[1],value:e[2]}:e.length===3&&e[0]==="c"&&by.has(e[1])?{type:"color",field:e[1],value:e[2]}:null}function wy(i,e){if(i.type==="field"){const t=e.find(n=>n.field===i.field);return!t||!t.items.includes(i.value)?null:{[i.field]:i.value}}if(i.type==="color"){const t=e.find(n=>n.colorField===i.field);return!t||!t.colors||!t.colors.includes(i.value)?null:{[i.field]:i.value}}return null}const Ty=Math.PI/4;function Ay(i,e,t={x:0,z:0}){const n=e*Ty,s=Math.cos(n),r=Math.sin(n),o=i.x-t.x,a=i.z-t.z;return{x:t.x+o*s+a*r,z:t.z-o*r+a*s,yaw:i.yaw+n}}const Rl=[{mirrorPx:512,foveation:.5,shadows:!0},{mirrorPx:256,foveation:.5,shadows:!0},{mirrorPx:null,foveation:.65,shadows:!0},{mirrorPx:null,foveation:.85,shadows:!1}],sh=1e3/72,Ry=sh*.62;function Cy(i,e){const t=Math.min(Math.max(i,0),Rl.length-1);return e>sh?Math.min(t+1,Rl.length-1):e<Ry?Math.max(t-1,0):t}const Py=new L(-1.62,1.34,-.5),Ly=new L(0,1.3,2.2),So=1.06,ao=1.85,Dy=6,un=So-.12,Gn=.105,lo=.02,Rs=.052,co=.062,dr=.022;function Iu(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const Co='"Hiragino Sans", "Noto Sans JP", "Noto Sans SC", "Noto Sans KR", "Malgun Gothic", "Microsoft YaHei", sans-serif';function Iy(i,e,t){const n=t?1024:512,s=128,r=document.createElement("canvas");r.width=n,r.height=s;const o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");o.fillStyle=e?"#b08d57":"#38302a",Iu(o,3,3,n-6,s-6,26),o.fill(),o.strokeStyle=e?"#e8cf9f":"#6d5c44",o.lineWidth=3,Iu(o,3,3,n-6,s-6,26),o.stroke(),o.fillStyle=e?"#221a12":"#f2e9da",o.textAlign="center",o.textBaseline="middle";let a=52;const l=u=>`600 ${u}px ${Co}`;for(o.font=l(a);a>22&&o.measureText(i).width>n-44;)a-=4,o.font=l(a);o.fillText(i,n/2,s/2+2);const c=new zo(r);return c.colorSpace=Ot,c.anisotropy=4,c}function Uy(i){const n=document.createElement("canvas");n.width=1024,n.height=56;const s=n.getContext("2d");if(!s)throw new Error("2d context unavailable");s.fillStyle="#e9dfc9",s.textAlign="left",s.textBaseline="middle";let r=38;const o=l=>`600 ${l}px ${Co}`;for(s.font=o(r);r>20&&s.measureText(i).width>1008;)r-=3,s.font=o(r);s.fillText(i,4,56/2+1);const a=new zo(n);return a.colorSpace=Ot,a.anisotropy=4,a}function Ny(i,e,t){const n=[];let s="";for(const a of e)a===" "?(s&&n.push(s),s="",n.push(" ")):/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(a)?(s&&n.push(s),s="",n.push(a)):s+=a;s&&n.push(s);const r=[];let o="";for(const a of n){if(a===" "&&o==="")continue;const l=o+a;i.measureText(l).width<=t||o===""?o=l:(r.push(o.trimEnd()),o=a===" "?"":a)}return o.trim()!==""&&r.push(o.trimEnd()),r}function Oy(i){const r=document.createElement("canvas"),o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");o.font=`500 30px ${Co}`;const a=Ny(o,i,992),l=a.length*44+16;r.width=1024,r.height=l,o.font=`500 30px ${Co}`,o.fillStyle="#cfc2a8",o.textAlign="left",o.textBaseline="top",a.forEach((u,d)=>{o.fillText(u,16,16/2+d*44)});const c=new zo(r);return c.colorSpace=Ot,c.anisotropy=4,{tex:c,aspect:l/1024}}class Fy{constructor(){Fi(this,"group",new Xe);Fi(this,"content",new Xe);Fi(this,"hitMeshes",[]);Fi(this,"hovered",null);Fi(this,"categories",ih());Fi(this,"noteText",null);this.group.position.copy(Py),this.group.lookAt(Ly);const e=new He(new $e(So,ao,.035),new et({color:"#2c241d",roughness:.6,envMapIntensity:.4}));e.position.z=-.02,this.group.add(e);const t=new et({color:"#b08d57",roughness:.3,metalness:1,envMapIntensity:1.2}),n=new $e(So+.03,.028,.045),s=new $e(.028,ao+.03,.045);for(const r of[-1,1]){const o=new He(n,t);o.position.set(0,r*(ao/2+.008),-.02),this.group.add(o)}for(const r of[-1,1]){const o=new He(s,t);o.position.set(r*(So/2+.008),0,-.02),this.group.add(o)}this.group.add(this.content)}get targets(){return this.hitMeshes}addButton(e,t,n,s,r,o,a){const l=Iy(e,t,o>.4),c=new Qn({map:l}),u=new He(new Ft(o,a),c);u.position.set(s,r,.012),u.userData.actionId=n,u.userData.baseScale=1,this.content.add(u),this.hitMeshes.push(u)}addLabel(e,t,n,s){const r=Uy(e),o=new Qn({map:r,transparent:!0}),a=new He(new Ft(s,Rs),o);a.position.set(t,n,.01),this.content.add(a)}addNote(e,t,n){const{tex:s,aspect:r}=Oy(e),o=n*r,a=new Qn({map:s,transparent:!0}),l=new He(new Ft(n,o),a);return l.position.set(0,t-o/2,.01),this.content.add(l),o}addSwatch(e,t,n,s,r,o){if(t){const c=new He(new Ft(o+.014,co+.014),new Qn({color:"#e8cf9f"}));c.position.set(s,r,.011),this.content.add(c)}const a=new et({color:e,roughness:.55,envMapIntensity:.5}),l=new He(new Ft(o,co),a);l.position.set(s,r,.012),l.userData.actionId=n,l.userData.baseScale=1,this.content.add(l),this.hitMeshes.push(l)}refresh(e){for(const l of[...this.content.children])this.content.remove(l),l.traverse(c=>{var f;const u=c;u.geometry&&u.geometry.dispose();const d=u.material;d&&((f=d.map)==null||f.dispose(),d.dispose())});this.hitMeshes=[],this.hovered=null,this.noteText=null;const{outfit:t,page:n}=e;let s=ao/2-.075;this.addLabel(I("vr.panelTitle"),-un/2+.47,s,.94),s-=.075;const r=(un-lo)/2;[{page:0,key:"vr.pageClothes"},{page:1,key:"vr.pageExtras"}].forEach((l,c)=>{const u=-un/2+r/2+c*(r+lo);this.addButton(I(l.key),n===l.page,mi({type:"page",page:l.page}),u,s,r,.085)}),s-=.085/2+dr+.03;const a=(l,c)=>{const u=l.length,d=(un-(u-1)*lo)/u;l.forEach((f,p)=>{const _=-un/2+d/2+p*(d+lo);this.addButton(f.label,f.selected,f.actionId,_,c,d,Gn)})};for(const l of this.categories)if(l.page===n){if(s-=Rs/2,this.addLabel(I(l.labelKey),-un/2+.47,s,.94),s-=Rs/2+.012+Gn/2,a(l.items.map(c=>({label:I(Sy(l,c)),selected:t[l.field]===c,actionId:mi({type:"field",field:l.field,value:c})})),s),s-=Gn/2,l.colors&&l.colorField){const c=l.colorField;s-=.012+co/2;const u=l.colors.length,d=(un-(u-1)*.012)/u;l.colors.forEach((f,p)=>{const _=-un/2+d/2+p*(d+.012);this.addSwatch(f,t[c]===f,mi({type:"color",field:c,value:f}),_,s,d)}),s-=co/2}s-=dr+.012}if(n===0){s-=Rs/2,this.addLabel(I("vr.looks"),-un/2+.47,s,.94),s-=Rs/2+.012;const l=e.looks.slice(0,Dy);if(l.length===0)s-=.03,this.addLabel(I("vr.noLooks"),-un/2+.47,s,.94),s-=.03;else for(let c=0;c<l.length;c+=2)s-=Gn/2,a(l.slice(c,c+2).map(u=>({label:u.name,selected:!1,actionId:mi({type:"look",id:u.id})})),s),s-=Gn/2+dr}else{s-=.01+Gn/2,a([{label:I("ui.savePhoto"),selected:!1,actionId:mi({type:"photo"})}],s),s-=Gn/2+dr+Gn/2,a([{label:I("vr.turnLeft"),selected:!1,actionId:mi({type:"turn",dir:-1})},{label:I("vr.turnRight"),selected:!1,actionId:mi({type:"turn",dir:1})}],s),s-=Gn/2+dr+.03,this.addLabel(I("vr.hint"),-un/2+.47,s,.94);const l=I("principle.note");s-=Rs/2+.035,this.addNote(l,s,un),this.noteText=l}}setHovered(e){if(this.hovered!==e){if(this.hovered){const t=this.hovered;t.scale.setScalar(t.userData.baseScale??1);const n=t.material;n&&"color"in n&&n.color.setRGB(1,1,1)}if(this.hovered=e,this.hovered){const t=this.hovered;t.scale.setScalar(1.06);const n=t.material;n&&"color"in n&&n.color.setRGB(1.3,1.18,.95)}}}}const ky=300,By=.35,zy=.7;function Vy(i,e){const t=new Fy;i.scene.add(t.group);const n=ih();let s=0,r=null;const o=new wv,a=new L,l=new L,c=new gt;function u(){t.refresh({outfit:e.getOutfit(),looks:e.getLooks(),page:s})}function d(S){switch(r=S,S.type){case"field":case"color":{const v=wy(S,n);v&&e.applyPatch(v);break}case"look":e.applyLook(S.id);break;case"photo":e.takePhoto();break;case"turn":{const v=i.player,A=Ay({x:v.position.x,z:v.position.z,yaw:v.rotation.y},S.dir);v.position.x=A.x,v.position.z=A.z,v.rotation.y=A.yaw;break}case"page":s=S.page;break}u()}function f(S){const v=Ey(S);return v?(d(v),!0):!1}function p(S){c.identity().extractRotation(S.matrixWorld),a.setFromMatrixPosition(S.matrixWorld),l.set(0,0,-1).applyMatrix4(c),o.set(a,l);const v=o.intersectObjects(t.targets,!1);return v.length===0?null:{target:v[0].object,point:v[0].point}}const _=[],x=[];for(let S=0;S<2;S++){const v=i.renderer.xr.getController(S),A=new Xt().setFromPoints([new L(0,0,0),new L(0,0,-5)]),w=new ov(A,new zd({color:15257503,transparent:!0,opacity:.55}));w.name="vr-ray",v.add(w),v.addEventListener("select",()=>{const C=p(v);if(C){const g=C.target.userData.actionId;g&&f(g)}}),i.player.add(v),_.push(v);const T=new He(new at(.012,10,8),new Qn({color:15257503}));T.visible=!1,i.scene.add(T),x.push(T)}const m=new Map;function h(S){const v=i.renderer.xr.getSession();if(v)for(const A of v.inputSources){const w=A.gamepad;if(!w||w.axes.length<2)continue;const T=w.axes.length>=4?w.axes[2]:w.axes[0],C=`${A.handedness}`;let g=m.get(C);if(g||(g={armed:!0,lastAt:0},m.set(C,g)),Math.abs(T)<By){g.armed=!0;continue}g.armed&&Math.abs(T)>zy&&S-g.lastAt>ky&&(g.armed=!1,g.lastAt=S,d({type:"turn",dir:T>0?1:-1}))}}function b(){if(!i.renderer.xr.isPresenting){t.setHovered(null);for(const v of x)v.visible=!1;return}let S=null;_.forEach((v,A)=>{const w=p(v),T=x[A];w?(T.visible=!0,T.position.copy(w.point),S||(S=w.target)):T.visible=!1}),t.setHovered(S),h(performance.now())}return u(),{panel:t,press:f,refreshPanel:u,update:b,get lastAction(){return r}}}const Uu={x:0,z:1.9},Ia=1024;function wt(i,e,t=0,n=0,s=0){const r=new He(i,e);return r.position.set(t,n,s),r}function Hy(i){const e=new rv({canvas:i,antialias:!0,preserveDrawingBuffer:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.shadowMap.enabled=!0,e.shadowMap.type=od,e.outputColorSpace=Ot,e.toneMapping=ld,e.toneMappingExposure=1.1,e.xr.enabled=!0,e.xr.setReferenceSpaceType("local-floor");const t=new Bd;t.background=new Qe("#241f1c");const n=new yl(e);t.environment=n.fromScene(new ly,.04).texture,t.environmentIntensity=.45;let s=1.74;const r=()=>new L(0,s*.76,3.9),o=()=>new L(0,s*.54,0),a=new Gt(40,1,.1,60);a.position.copy(r());const l=new Xe;l.name="player",t.add(l),l.add(a);let c=!1;const u=new jv(a,i);u.target.copy(o()),u.enableDamping=!0,u.dampingFactor=.08,u.minDistance=.5,u.maxDistance=4.8,u.minPolarAngle=.35,u.maxPolarAngle=Math.PI*.56,u.enablePan=!1,u.autoRotateSpeed=2.4,t.add(new yv("#fff4e2","#5c4a3a",.35));const d=new gu("#fff1dd",140,0,.46,.8,1.8);d.position.set(1.8,3.2,2.4),d.castShadow=!0,d.shadow.mapSize.set(2048,2048),d.shadow.bias=-3e-4,d.shadow.normalBias=.02,d.shadow.camera.near=.5,d.shadow.camera.far=12,d.target.position.set(0,.9,0),t.add(d,d.target);const f=new gu("#dfe9ff",70,0,.6,.9,1.8);f.position.set(-2.4,2.6,-2),f.target.position.set(0,1.2,0),t.add(f,f.target);const p=new bv("#ffe9d2",.5);p.position.set(-2.5,2,3),t.add(p);const _=new et({color:"#b08d57",roughness:.3,metalness:1,envMapIntensity:1.2}),x=new et({map:Pv(),roughness:.95,envMapIntensity:.25}),m=new et({color:"#e2d7c4",roughness:.85,envMapIntensity:.3}),h=new He(new Ft(13,10),new fu({map:Cv(),roughness:.38,clearcoat:.25,clearcoatRoughness:.35,envMapIntensity:.7}));h.rotation.x=-Math.PI/2,h.position.set(0,0,.6),h.receiveShadow=!0,t.add(h);const b=wt(new Ft(13,3.8),x,0,1.9,-2.6);b.receiveShadow=!0,t.add(b);const S=wt(new Ft(13,5.4),x,0,2.7,5.5);S.rotation.y=Math.PI,S.receiveShadow=!0,t.add(S),t.add(wt(new $e(13,.09,.02),m,0,.045,5.48));for(const le of[-3.4,-1.7,0,1.7,3.4]){const D=wt(new $e(.05,3.2,.018),m,le,1.75,5.485);D.rotation.y=Math.PI,t.add(D)}for(const le of[-1.7,1.7]){const D=new He(new at(.045,14,10),new Qn({color:"#ffd9a0"}));D.position.set(le,2.25,5.42),t.add(D),t.add(wt(new kt(.008,.008,.1,8),_,le,2.36,5.44));const rt=new qd("#ffcf99",2.5,7,1.8);rt.position.set(le,2.25,5.25),t.add(rt)}for(const le of[-1,1]){const D=wt(new Ft(10,3.8),x,le*4.6,1.9,.6);D.rotation.y=-le*Math.PI*.5,D.receiveShadow=!0,t.add(D);const rt=wt(new $e(10,.09,.02),m,le*4.58,.045,.6);t.add(rt)}const v=wt(new $e(13,.09,.02),m,0,.045,-2.58);t.add(v);const A=wt(new Ft(13,10),x,0,3.8,.6);A.rotation.x=Math.PI/2,t.add(A);for(const le of[-3.4,-1.9,1.9,3.4])t.add(wt(new $e(.05,3.2,.018),m,le,1.75,-2.585));t.add(wt(new $e(13,.05,.018),m,0,2.95,-2.585));const w=new Wo(new Ft(1.5,2.3),{clipBias:.003,textureWidth:Ia,textureHeight:Ia,color:13225682});w.position.set(0,1.42,-2.575),t.add(w);const T=wt(new $e(1.62,.055,.035),_,0,2.6,-2.565),C=wt(new $e(1.62,.055,.035),_,0,.245,-2.565),g=wt(new $e(.055,2.42,.035),_,-.81,1.42,-2.565),y=wt(new $e(.055,2.42,.035),_,.81,1.42,-2.565);t.add(T,C,g,y);function P(le){const D=le+.62,rt=.25,qe=rt+D/2;w.geometry.dispose(),w.geometry=new Ft(1.5,D),w.position.y=qe,T.position.y=rt+D+.0275,C.position.y=rt-.0275;for(const Be of[g,y])Be.geometry.dispose(),Be.geometry=new $e(.055,D+.11,.035),Be.position.y=qe}P(s);const B=new He(new kt(1.05,1.14,.12,56),new fu({color:"#e9e3d7",roughness:.22,clearcoat:.3,clearcoatRoughness:.25,envMapIntensity:.9}));B.position.y=.06,B.receiveShadow=!0,t.add(B);const O=wt(new Wt(1,.007,8,72),_,0,.118,0);O.rotation.x=Math.PI/2,t.add(O);const H=new Xe;H.position.set(-2.35,0,-1.15),H.rotation.y=.45;for(const le of[-1,1]){H.add(wt(new kt(.016,.016,1.5,12),_,le*.65,.75,0));const D=wt(new $e(.05,.03,.55),_,le*.65,.015,0);H.add(D)}const $=wt(new kt(.014,.014,1.36,12),_,0,1.5,0);$.rotation.z=Math.PI/2,H.add($),["#97a08a","#d9cfc0","#4a4a52"].forEach((le,D)=>{const rt=Sr([1.5,1.5]),qe=new et({color:le,map:rt.map,bumpMap:rt.bump,bumpScale:.3,roughness:.9,envMapIntensity:.3,side:hn}),Be=-.4+D*.4,Ie=wt(new Wt(.035,.004,6,14,Math.PI),_,Be,1.5,0);H.add(Ie);const nt=new He(new Lr([new fe(.012,0),new fe(.1,-.07),new fe(.055,-.18),new fe(.135,-.54)],24),qe);nt.position.set(Be,1.47,0),nt.scale.set(1,1,.45),nt.castShadow=!0,H.add(nt)}),t.add(H);const K=new Xe;K.position.set(2.45,0,-1.5);const G=wt(new kt(.17,.125,.3,24),new et({color:"#a9603c",roughness:.8,envMapIntensity:.3}),0,.15,0);G.castShadow=!0,K.add(G),K.add(wt(new kt(.018,.026,.35,10),new et({color:"#6b4a2f",roughness:.9}),0,.45,0));const ue=new et({color:"#5a7247",roughness:.7,envMapIntensity:.4});for(let le=0;le<7;le++){const D=wt(new at(1,12,8),ue,0,.72,0);D.scale.set(.035,.17,.07);const rt=new Xe;rt.position.set(0,.55,0),D.position.y=.17,rt.rotation.set(.5+le%3*.22,le/7*Math.PI*2,0),rt.add(D),K.add(rt)}t.add(K);function ge(){const le=i.clientWidth||window.innerWidth,D=i.clientHeight||window.innerHeight;e.setSize(le,D,!1),a.aspect=le/D,a.updateProjectionMatrix()}function Te(){a.position.copy(r()),u.target.copy(o())}function ze(le){Math.abs(le-s)<.001||(s=le,P(le),u.target.y=le*.54,c||(a.position.y=le*.76))}function tt(le){w.getRenderTarget().setSize(le,le)}let j=0,N=0,ie=0,J=-1;const pe=90;function oe(le){const D=Rl[le];D.mirrorPx===null?w.visible=!1:(w.visible=!0,tt(D.mirrorPx)),d.castShadow=D.shadows;try{e.xr.setFoveation(D.foveation)}catch{}}function Ee(){N=0,ie=0,J=-1}e.xr.addEventListener("sessionstart",()=>{c=!0,l.position.set(Uu.x,0,Uu.z),l.rotation.set(0,0,0),u.enabled=!1,j=0,Ee(),oe(0)}),e.xr.addEventListener("sessionend",()=>{c=!1,l.position.set(0,0,0),l.rotation.set(0,0,0),u.enabled=!0,j=0,Ee(),w.visible=!0,d.castShadow=!0,tt(Ia);try{e.xr.setFoveation(1)}catch{}});function Ve(){const le=w.visible,D=e.info.autoReset;e.info.autoReset=!1,w.visible=!1,e.info.reset(),e.render(t,a);const rt=e.info.render.calls,qe=e.info.render.triangles;w.visible=!0,e.info.reset(),e.render(t,a);const Be=e.info.render.calls;return w.visible=le,e.info.autoReset=D,e.info.reset(),{withMirror:Be,withoutMirror:rt,triangles:qe}}function ke(){if(!c){u.update();return}const le=performance.now();if(J>=0&&(N+=le-J,ie+=1,ie>=pe)){const D=Cy(j,N/ie);Ee(),D!==j&&(j=D,oe(D))}J=le}return ge(),{scene:t,camera:a,renderer:e,controls:u,player:l,isPresenting:()=>c,xrQualityLevel:()=>j,tick:ke,resize:ge,resetView:Te,setSubjectHeight:ze,measureDrawCalls:Ve}}const Ds="FittingRoomSeed",Gy=[137,80,78,71,13,10,26,10],Wy=(()=>{const i=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let n=0;n<8;n++)t=t&1?3988292384^t>>>1:t>>>1;i[e]=t>>>0}return i})();function Xy(i){let e=4294967295;for(let t=0;t<i.length;t++)e=Wy[(e^i[t])&255]^e>>>8;return(e^4294967295)>>>0}function rh(i){return i.length>=8&&Gy.every((e,t)=>i[t]===e)}function oh(i,e){return(i[e]<<24|i[e+1]<<16|i[e+2]<<8|i[e+3])>>>0}function ah(i,e){return String.fromCharCode(i[e],i[e+1],i[e+2],i[e+3])}function qy(i,e){const t=new Uint8Array(e.length+12),n=new DataView(t.buffer);n.setUint32(0,e.length);for(let s=0;s<4;s++)t[4+s]=i.charCodeAt(s);return t.set(e,8),n.setUint32(8+e.length,Xy(t.subarray(4,8+e.length))),t}function Yy(i,e){const t=new Uint8Array(i.length+1+e.length);for(let n=0;n<i.length;n++)t[n]=i.charCodeAt(n)&127;t[i.length]=0;for(let n=0;n<e.length;n++)t[i.length+1+n]=e.charCodeAt(n)&127;return t}function lh(i,e){if(i!=="tEXt"||e.length<Ds.length+1)return!1;for(let t=0;t<Ds.length;t++)if(e[t]!==Ds.charCodeAt(t))return!1;return e[Ds.length]===0}function $y(i,e){if(!rh(i))return null;const t=qy("tEXt",Yy(Ds,e)),n=[i.subarray(0,8)];let s=8,r=!1;for(;s+8<=i.length;){const c=oh(i,s),u=s+12+c;if(u>i.length)return null;const d=ah(i,s+4),f=i.subarray(s+8,s+8+c);if(lh(d,f)||n.push(i.subarray(s,u)),d==="IHDR"&&!r&&(n.push(t),r=!0),s=u,d==="IEND")break}if(!r)return null;const o=n.reduce((c,u)=>c+u.length,0),a=new Uint8Array(o);let l=0;for(const c of n)a.set(c,l),l+=c.length;return a}function jy(i){if(!rh(i))return null;let e=8;for(;e+8<=i.length;){const t=oh(i,e),n=e+12+t;if(n>i.length)return null;const s=ah(i,e+4),r=i.subarray(e+8,e+8+t);if(lh(s,r)){let o="";for(let a=Ds.length+1;a<r.length;a++)o+=String.fromCharCode(r[a]);return o}if(e=n,s==="IEND")break}return null}const sn=1080;async function ch(i,e){const t=document.createElement("canvas");t.width=sn,t.height=sn;const n=t.getContext("2d");if(!n)throw new Error("2d context unavailable");const s=n.createLinearGradient(0,0,0,sn);s.addColorStop(0,"#faf6f0"),s.addColorStop(1,"#e7dbc7"),n.fillStyle=s,n.fillRect(0,0,sn,sn);const r=800,o=(sn-r)/2,a=44;n.save(),n.beginPath(),n.roundRect(o,a,r,r,36),n.clip(),i(n,o,a,r),n.restore(),n.strokeStyle="rgba(255,255,255,0.9)",n.lineWidth=6,n.beginPath(),n.roundRect(o,a,r,r,36),n.stroke(),n.fillStyle="#33302a",n.textAlign="center";let l=a+r+48;n.font='700 48px "Hiragino Sans", "Noto Sans JP", sans-serif',n.fillText(e.appName,sn/2,l),l+=28,n.font='400 24px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63";const c=Si()==="ja"||Si()==="zh"?`${e.tagline}（${e.workingTitleNote}）`:`${e.tagline} (${e.workingTitleNote})`;n.fillText(c,sn/2,l),l+=34,n.font='600 25px "Hiragino Sans", "Noto Sans JP", sans-serif',n.fillStyle="#33302a";const u=sn-90,d=S=>(S.color?26:0)+n.measureText(S.label).width,f=[];let p=[],_=0;for(const S of e.look){const v=d(S),A=p.length?v+22:v;p.length&&_+A>u&&f.length===0?(f.push(p),p=[S],_=v):(p.push(S),_+=A)}p.length&&f.push(p);for(const S of f.slice(0,2)){const v=S.reduce((w,T,C)=>w+d(T)+(C?22:0),0);let A=(sn-v)/2;n.textAlign="left";for(const w of S)w.color&&(n.beginPath(),n.arc(A+9,l-8,9,0,Math.PI*2),n.fillStyle=w.color,n.fill(),n.strokeStyle="rgba(51,48,42,0.35)",n.lineWidth=1.5,n.stroke(),A+=26,n.fillStyle="#33302a"),n.fillText(w.label,A,l),A+=n.measureText(w.label).width+22;n.textAlign="center",l+=27}const x=(e.name??"").trim();if(x){l+=2,n.font='400 22px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63";const S=`${I("card.wornBy")}: ${x}`;n.fillText(S,sn/2,l),l+=25}n.font='600 22px ui-monospace, "SF Mono", Menlo, monospace',n.fillStyle="#6b5d49",n.fillText(e.seed,sn/2,l),l+=23,n.font='400 20px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63",n.fillText(I("card.fictional"),sn/2,l);const m=await new Promise((S,v)=>{t.toBlob(A=>A?S(A):v(new Error("PNG encode failed")),"image/png")}),h=new Uint8Array(await m.arrayBuffer()),b=$y(h,e.seed);return b?new Blob([b.buffer],{type:"image/png"}):m}async function uh(i,e){return ch((t,n,s,r)=>{const o=Math.min(i.width,i.height),a=(i.width-o)/2,l=(i.height-o)/2;t.drawImage(i,a,l,o,o,n,s,r,r)},e)}async function dh(i,e){return ch((t,n,s,r)=>{const o=i.naturalWidth||i.width,a=i.naturalHeight||i.height,l=Math.max(r/o,r/a),c=o*l,u=a*l;t.drawImage(i,n+(r-c)/2,s+(r-u)/2,c,u)},e)}function Dr(i,e){const t=URL.createObjectURL(i),n=document.createElement("a");return n.href=t,n.download=e,document.body.appendChild(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),4e3),t}const hh="fitting-room.looks.v1",fh=30;let Nu=0;function Ky(){return Nu+=1,`l${Date.now().toString(36)}-${Nu.toString(36)}-${Math.floor(Math.random()*16777215).toString(36)}`}function vr(i){return{topStyle:i.topStyle,topColor:i.topColor,outerStyle:i.outerStyle,outerColor:i.outerColor,bottomStyle:i.bottomStyle,bottomColor:i.bottomColor,shoeStyle:i.shoeStyle,shoeColor:i.shoeColor,hat:i.hat,glasses:i.glasses,accessory:i.accessory}}function Jy(i){const e=typeof i=="object"&&i!==null?{...Rt,...i}:{...Rt};return vr(Ws(e))}function Zy(i,e){return i.topStyle===e.topStyle&&i.topColor===e.topColor&&i.outerStyle===e.outerStyle&&i.outerColor===e.outerColor&&i.bottomStyle===e.bottomStyle&&i.bottomColor===e.bottomColor&&i.shoeStyle===e.shoeStyle&&i.shoeColor===e.shoeColor&&i.hat===e.hat&&i.glasses===e.glasses&&i.accessory===e.accessory}function Qy(i){if(!Array.isArray(i))return[];const e=new Set,t=[];for(const n of i){if(typeof n!="object"||n===null)continue;const s=n;typeof s.id!="string"||!s.id||e.has(s.id)||typeof s.name!="string"||!s.name.trim()||(e.add(s.id),t.push({id:s.id,name:s.name,look:Jy(s.look),updatedAt:typeof s.updatedAt=="number"&&Number.isFinite(s.updatedAt)?s.updatedAt:0}))}return t.sort((n,s)=>s.updatedAt-n.updatedAt),t.slice(0,fh)}function ex(i=localStorage){try{const e=i.getItem(hh);return e?Qy(JSON.parse(e)):[]}catch{return[]}}function ph(i,e=localStorage){try{e.setItem(hh,JSON.stringify(i))}catch{}}function tx(i,e,t,n=Date.now()){return[{id:Ky(),name:e,look:{...t},updatedAt:n},...i].slice(0,fh)}function nx(i,e){return i.filter(t=>t.id!==e)}const Ou="FR1-",Fu="FR2-",ku="FR3-",Bu="FR4-",zu="FR5-",Cl="FR6-",ix=12,sx=25,rx=29,pi=34;function qt(i,e){const t=i.indexOf(e);return t>=0?t:0}function Po(i,e,t){return Math.min(t,Math.max(e,i))}function ox(i){let e="";for(const t of i)e+=String.fromCharCode(t);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function ax(i){try{const e=i.replace(/-/g,"+").replace(/_/g,"/");return[...atob(e)].map(n=>n.charCodeAt(0))}catch{return null}}function mh(i){const e=on[i];if(e.kind!=="range")throw new Error(`param ${i} is not a range`);return e}function Vu(i,e){const{min:t,max:n}=mh(i);return Math.round((Po(e,t,n)-t)/(n-t)*255)}function Hu(i,e){const{min:t,max:n}=mh(i);return t+Po(e,0,255)/255*(n-t)}function ut(i){const e=i.character,t=[...new TextEncoder().encode(us(i.name))],n=[6,Math.round(Po(e.skinTone,0,1)*255),Math.round((Po(e.height,wr,$d)-wr)*100),qt(br,e.hairColor),qt(Er,e.eyeColor),qt(Mr,e.hairStyle),...Jl.map(s=>Vu(s,e[s])),qt(Li,i.topStyle),qt(Pi,i.topColor),qt(Di,i.hat),qt(Ii,i.glasses),qt(Ui,i.accessory),qt(Ni,i.pose),qt(as,i.bottomStyle),qt(ss,i.bottomColor),qt(ls,i.shoeStyle),qt(rs,i.shoeColor),...Kl.map(s=>Vu(s,e[s])),qt(cs,i.outerStyle),qt(os,i.outerColor),t.length,...t];return Cl+ox(n)}function ft(i){if(typeof i!="string")return null;let e=i.trim();e.startsWith(Cl)?e=e.slice(Cl.length):e.startsWith(zu)?e=e.slice(zu.length):e.startsWith(Bu)?e=e.slice(Bu.length):e.startsWith(ku)?e=e.slice(ku.length):e.startsWith(Fu)?e=e.slice(Fu.length):e.startsWith(Ou)&&(e=e.slice(Ou.length));const t=ax(e);if(!t)return null;let n="",s=t,r=null;if(t[0]===5||t[0]===6){const a=t[0]===6?2:0;if(t.length<pi+a+1)return null;const l=t[pi+a];if(l>Zd||t.length!==pi+a+1+l)return null;let c;try{c=new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(t.slice(pi+a+1)))}catch{return null}if(n=us(c),t[0]===6){const u=(d,f)=>d[Math.min(d.length-1,Math.max(0,f))]??d[0];r={outerStyle:u(cs,t[pi]),outerColor:u(os,t[pi+1])}}s=t.slice(0,pi),s[0]=4}const o=(a,l)=>a[Math.min(a.length-1,Math.max(0,s[l]))]??a[0];if(s[0]===1&&s.length===ix)return Ws({topStyle:o(Li,6),topColor:o(Pi,7),hat:o(Di,8),glasses:o(Ii,9),accessory:o(Ui,10),pose:o(Ni,11),character:{skinTone:s[1]/255,height:Math.round((wr+s[2]/100)*100)/100,hairColor:o(br,3),eyeColor:o(Er,4),hairStyle:o(Mr,5)}});if(s[0]===2&&s.length===sx||s[0]===3&&s.length===rx||s[0]===4&&s.length===pi){const a={};Jl.forEach((c,u)=>{a[c]=Hu(c,s[6+u])});const l={};return s[0]===4&&Kl.forEach((c,u)=>{l[c]=Hu(c,s[29+u])}),Ws({name:n,...r??{},topStyle:o(Li,19),topColor:o(Pi,20),hat:o(Di,21),glasses:o(Ii,22),accessory:o(Ui,23),pose:o(Ni,24),...s[0]>=3?{bottomStyle:o(as,25),bottomColor:o(ss,26),shoeStyle:o(ls,27),shoeColor:o(rs,28)}:{},character:{skinTone:s[1]/255,height:Math.round((wr+s[2]/100)*100)/100,hairColor:o(br,3),eyeColor:o(Er,4),hairStyle:o(Mr,5),...a,...l}})}return null}const gh="fitting-room.roster.v1",Lo=50;let Gu=0;function lx(){return Gu+=1,`p${Date.now().toString(36)}-${Gu.toString(36)}-${Math.floor(Math.random()*16777216).toString(36)}`}function Xo(i,e=Date.now(),t=lx()){return{id:t,seed:i,updatedAt:e}}function cx(i){if(typeof i!="object"||i===null)return null;const e=i;if(!Array.isArray(e.entries))return null;const t=new Set,n=[];for(const o of e.entries){if(typeof o!="object"||o===null)continue;const a=o;typeof a.id!="string"||!a.id||t.has(a.id)||typeof a.seed!="string"||!ft(a.seed)||(t.add(a.id),n.push({id:a.id,seed:a.seed,updatedAt:typeof a.updatedAt=="number"&&Number.isFinite(a.updatedAt)?a.updatedAt:0}))}if(!n.length)return null;n.sort((o,a)=>o.updatedAt-a.updatedAt);const s=n.slice(-Lo),r=typeof e.currentId=="string"&&s.some(o=>o.id===e.currentId)?e.currentId:s[s.length-1].id;return{entries:s,currentId:r}}function ux(i=localStorage){try{const n=i.getItem(gh);if(n){const s=cx(JSON.parse(n));if(s)return s}}catch{}const e=Xo(ut(Qd(i))),t={entries:[e],currentId:e.id};return Zs(t,i),t}function Zs(i,e=localStorage){try{e.setItem(gh,JSON.stringify(i))}catch{}}function _h(i){return i.entries.find(e=>e.id===i.currentId)??i.entries[i.entries.length-1]}function dx(i,e,t=Date.now()){const n=i.entries.findIndex(r=>r.id===i.currentId);if(n<0){const r=Xo(e,t);return{entries:[...i.entries,r].slice(-Lo),currentId:r.id}}const s=i.entries.slice();return s[n]={...s[n],seed:e,updatedAt:t},{entries:s,currentId:i.currentId}}function hx(i,e,t=Date.now()){const n=Xo(e,t);let s=[...i.entries,n];return s.length>Lo&&(s=[...s.filter(o=>o.id!==n.id).sort((o,a)=>o.updatedAt-a.updatedAt).slice(s.length-Lo),n]),{entries:s,currentId:n.id}}function fx(i,e){const t=i.entries.filter(s=>s.id!==e);if(!t.length){const s=Xo(ut(Rt));return{entries:[s],currentId:s.id}}const n=i.currentId===e?t.reduce((s,r)=>s.updatedAt>=r.updatedAt?s:r).id:i.currentId;return{entries:t,currentId:n}}function px(i,e,t,n=Date.now()){const s=i.entries.findIndex(a=>a.id===e);if(s<0)return null;const r=ft(i.entries[s].seed);if(!r)return null;const o=i.entries.slice();return o[s]={...o[s],seed:ut({...r,name:t}),updatedAt:n},{entries:o,currentId:i.currentId}}function ec(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function vh(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function mx(i,e){return vh(`${i}
${e}`)}function yh(i,e,t){const n=ec(t),s={};for(const[r,o]of Object.entries(on)){const a=r;if(o.kind==="range"){const l=n();if(l<.4)s[r]=i[a];else if(l<.8)s[r]=e[a];else{const c=.25+.5*n();s[r]=i[a]+(e[a]-i[a])*c}}else s[r]=n()<.5?i[a]:e[a]}return Js(s)}const tc=["subtle","standard","bold"],gx={subtle:.05,standard:.14,bold:.3},_x={subtle:.1,standard:.25,bold:.45};function nc(i){return typeof i=="string"&&tc.includes(i)}function xh(i,e,t){const n=ec(e),s=gx[t],r={};for(const[o,a]of Object.entries(on)){const l=o;if(a.kind==="range"){const c=a.max-a.min,u=(i[l]-a.min)/c,d=n()+n()-1,f=Math.min(1,Math.max(0,u+d*s));r[o]=a.min+f*c}else{const c=a.options,u=i[l];if(c.length>1&&n()<_x[t]){const d=c.filter(f=>f!==u);r[o]=d[Math.floor(n()*d.length)]}else r[o]=u}}return Js(r)}function vx(i){return vh(i)}function yx(i,e,t,n=4){const s=ec(e),r=[];for(let o=0;o<n;o++){const a=Math.floor(s()*4294967296)>>>0;r.push(xh(i,a,t))}return r}const Sh="fitting-room.lineage.v1",qo=200,xx=["create","restore","blend","mutate","rename"];function Sx(i){if(!Array.isArray(i))return[];const e=[];for(const t of i){if(typeof t!="object"||t===null)continue;const n=t;if(typeof n.at!="number"||!Number.isFinite(n.at)||typeof n.kind!="string"||!xx.includes(n.kind)||typeof n.seed!="string"||!ft(n.seed))continue;const s={at:n.at,kind:n.kind,seed:n.seed};if(s.kind==="blend"){const o=n.parents;if(!Array.isArray(o)||o.length!==2||typeof o[0]!="string"||typeof o[1]!="string"||!ft(o[0])||!ft(o[1]))continue;s.parents=[o[0],o[1]]}if(s.kind==="mutate"){if(typeof n.source!="string"||!ft(n.source))continue;s.source=n.source,nc(n.strength)&&(s.strength=n.strength)}const r=us(n.name);r&&(s.name=r),e.push(s)}return e.slice(-qo)}const Wu="fitting-room.mutation-history.v1";function Mh(i){try{const e=i.getItem(Sh);return e?Sx(JSON.parse(e)):[]}catch{return[]}}function Mx(i){if(!Array.isArray(i))return[];const e=[];for(const t of i){if(typeof t!="object"||t===null)continue;const n=t;typeof n.at!="number"||!Number.isFinite(n.at)||n.kind==="mutate"&&(typeof n.seed!="string"||!ft(n.seed)||typeof n.source!="string"||!ft(n.source)||nc(n.strength)&&e.push({at:n.at,kind:"mutate",seed:n.seed,source:n.source,strength:n.strength}))}return e}function bx(i){let e;try{e=i.getItem(Wu)}catch{return}if(e===null)return;let t=[];try{t=Mx(JSON.parse(e))}catch{t=[]}try{i.removeItem(Wu)}catch{}if(!t.length)return;const n=[...Mh(i),...t].sort((s,r)=>s.at-r.at).slice(-qo);Eh(n,i)}function bh(i=localStorage){return bx(i),Mh(i)}function Eh(i,e=localStorage){try{e.setItem(Sh,JSON.stringify(i.slice(-qo)))}catch{}}function Ex(i,e=localStorage){const t=[...bh(e),i].slice(-qo);return Eh(t,e),t}const wx=1179937895,Tx=2,Ax=1313821514,Rx=5130562,Xu=5126,Cx=5121,Px=5123,Lx=5125;function Ua(i){return i+3&-4}function qu(i,e,t){if(i.length===0)throw new Error("buildGlb: no parts");if(e.length===0)throw new Error("buildGlb: no materials");const n=t.skin;if(n){if(n.joints.length===0)throw new Error("buildGlb: skin with no joints");if(n.inverseBindMatrices.length!==n.joints.length*16)throw new Error("buildGlb: inverseBindMatrices must hold one mat4 per joint");n.joints.forEach((g,y)=>{if(g.parent<-1||g.parent>=n.joints.length||g.parent===y)throw new Error(`buildGlb: joint ${y} (${g.name}) has an invalid parent`)})}const s=[],r=[],o=[];let a=0;const l=(g,y)=>{const P=Ua(a)-a;P>0&&(s.push(new Uint8Array(P)),a+=P);const B=r.length;return r.push({buffer:0,byteOffset:a,byteLength:g.length,target:y}),s.push(g),a+=g.length,B},c=(g,y,P)=>{const B=new Float32Array(g.length);B.set(g);const O=l(new Uint8Array(B.buffer),34962),H=y==="VEC3"?3:y==="VEC2"?2:4,$={bufferView:O,componentType:Xu,count:g.length/H,type:y};if(P){const X=[1/0,1/0,1/0],K=[-1/0,-1/0,-1/0];for(let G=0;G+2<g.length;G+=3)for(let ue=0;ue<3;ue++){const ge=g[G+ue];ge<X[ue]&&(X[ue]=ge),ge>K[ue]&&(K[ue]=ge)}$.min=X,$.max=K}return o.push($),o.length-1},u=[];i.forEach((g,y)=>{const P=g.positions.length/3;if(!Number.isInteger(P)||P===0)throw new Error(`buildGlb: part ${y} (${g.name}) has no vertices`);if(g.normals.length!==g.positions.length)throw new Error(`buildGlb: part ${y} (${g.name}) normals/positions count mismatch`);if(g.uvs&&g.uvs.length!==P*2)throw new Error(`buildGlb: part ${y} (${g.name}) uv count mismatch`);if(g.material<0||g.material>=e.length)throw new Error(`buildGlb: part ${y} (${g.name}) material index out of range`);if(g.joint!==void 0){if(!n)throw new Error(`buildGlb: part ${y} (${g.name}) names a joint but no skin was given`);if(g.joint<0||g.joint>=n.joints.length)throw new Error(`buildGlb: part ${y} (${g.name}) joint index out of range`)}const B={POSITION:c(g.positions,"VEC3",!0),NORMAL:c(g.normals,"VEC3",!1)};if(g.uvs&&(B.TEXCOORD_0=c(g.uvs,"VEC2",!1)),g.joint!==void 0){const H=new Uint8Array(P*4),$=new Float32Array(P*4);for(let K=0;K<P;K++)H[K*4]=g.joint,$[K*4]=1;const X=l(H,34962);o.push({bufferView:X,componentType:Cx,count:P,type:"VEC4"}),B.JOINTS_0=o.length-1,B.WEIGHTS_0=c($,"VEC4",!1)}const O={attributes:B,material:g.material};if(g.indices){let H=0;for(let G=0;G<g.indices.length;G++)g.indices[G]>H&&(H=g.indices[G]);if(H>=P)throw new Error(`buildGlb: part ${y} (${g.name}) index out of range`);const $=H>65535,X=$?new Uint32Array(g.indices.length):new Uint16Array(g.indices.length);X.set(g.indices);const K=l(new Uint8Array(X.buffer),34963);o.push({bufferView:K,componentType:$?Lx:Px,count:g.indices.length,type:"SCALAR"}),O.indices=o.length-1}u.push({name:g.name,primitives:[O]})});const d=[];let f;if(n){const g=n.joints.map((O,H)=>H);n.joints.forEach((O,H)=>{const $={name:O.name,translation:[...O.translation]},X=n.joints.map((K,G)=>K.parent===H?g[G]:-1).filter(K=>K>=0);X.length&&($.children=X),d.push($)});const y=new Float32Array(n.inverseBindMatrices.length);y.set(n.inverseBindMatrices);const P=l(new Uint8Array(y.buffer),34962);o.push({bufferView:P,componentType:Xu,count:n.joints.length,type:"MAT4"});const B=n.joints.findIndex(O=>O.parent===-1);f={joints:g,inverseBindMatrices:o.length-1,...B>=0?{skeleton:g[B]}:{}}}const p=d.length;i.forEach((g,y)=>{const P={name:g.name,mesh:y};n&&g.joint!==void 0&&(P.skin=0),d.push(P)});const _=[];n&&n.joints.forEach((g,y)=>{g.parent===-1&&_.push(y)});for(let g=0;g<i.length;g++)_.push(p+g);const x=d.length;d.push({name:"character",children:_});const m={asset:{version:"2.0",generator:t.generator},scene:0,scenes:[{nodes:[x]}],nodes:d,meshes:u,materials:e.map(g=>{const y={name:g.name,pbrMetallicRoughness:{baseColorFactor:[...g.baseColorFactor],roughnessFactor:g.roughnessFactor,metallicFactor:g.metallicFactor}};return g.alphaMode&&g.alphaMode!=="OPAQUE"&&(y.alphaMode=g.alphaMode),g.doubleSided&&(y.doubleSided=!0),y}),accessors:o,bufferViews:r,buffers:[{byteLength:a}]};f&&(m.skins=[f]),t.extensions&&(m.extensions=t.extensions),t.extensionsUsed&&(m.extensionsUsed=t.extensionsUsed),t.extras&&(m.extras=t.extras);const h=new TextEncoder().encode(JSON.stringify(m)),b=Ua(h.length),S=Ua(a),v=20+b+8+S,A=new Uint8Array(v),w=new DataView(A.buffer);w.setUint32(0,wx,!0),w.setUint32(4,Tx,!0),w.setUint32(8,v,!0),w.setUint32(12,b,!0),w.setUint32(16,Ax,!0),A.set(h,20);for(let g=20+h.length;g<20+b;g++)A[g]=32;const T=20+b;w.setUint32(T,S,!0),w.setUint32(T+4,Rx,!0);let C=T+8;for(const g of s)A.set(g,C),C+=g.length;return A}const Pl="https://creativecommons.org/publicdomain/zero/1.0/",Dx="This character is fictional. You may use this file freely as material in your own works — including commercial works — and may modify and redistribute it. No credit is required. (CC0 1.0)",Ix="このキャラクターは架空のものです。このファイルは、商用を含む自分の作品の素材として自由に使うことができ、改変・再配布もできます。クレジット表記は不要です。（CC0 1.0）";function Ux(i,e){const t=e<-.01?".L":e>.01?".R":"";return i>=1.38?"neck":i>=1?"torso":i>=.7?"hips":i>=.52?`upperLeg${t}`:i>=.14?`lowerLeg${t}`:`foot${t}`}function Nx(i){const e=i.position.x<0?"L":"R",t=new Map;t.set(i,`upperArm.${e}`);for(const n of i.children)if(n instanceof Xe){t.set(n,`forearm.${e}`);for(const s of n.children)s instanceof Xe&&t.set(s,`hand.${e}`)}return t}function Ox(i){const e=i.position.x<0?"L":"R";let t=null,n=null;for(const s of i.children)if(s instanceof Xe){t=s;for(const r of s.children)r instanceof Xe&&(n=r)}return{side:e,shoulder:i,elbow:t,hand:n}}function Fx(i){var v;const e=Kd(i.character);Go(e,i);const t=e.root,n=t.children[0],s={x:(n==null?void 0:n.scale.x)||1,y:(n==null?void 0:n.scale.y)||1},r=new Map([[e.head,"head"],[e.hatAnchor,"hat"],[e.glassesAnchor,"glasses"],[e.torsoAnchor,"top"],[e.bottomAnchor,"bottom"],[e.neckAnchor,"neck-item"],[e.bagAnchor,"bag"],[e.shoesAnchor,"shoes"]]),o=new Map,a=[];let l=null;if(n)for(const A of n.children){if(r.has(A)||!(A instanceof Xe))continue;if(A.children.some(T=>T instanceof Xe)){for(const[T,C]of Nx(A))o.set(T,C);a.push(Ox(A))}else l=A}for(const A of a)A.shoulder.rotation.set(0,0,A.side==="L"?-Math.PI/2:Math.PI/2),(v=A.elbow)==null||v.rotation.set(0,0,0);const c=[],u=new Map,d=A=>{const w=u.get(A);if(w!==void 0)return w;const T=A,C=T.color,g={name:`material-${c.length}`,baseColorFactor:C?[C.r,C.g,C.b,T.opacity??1]:[1,1,1,T.opacity??1],roughnessFactor:T.roughness??1,metallicFactor:T.metalness??0,alphaMode:T.transparent?"BLEND":"OPAQUE",doubleSided:T.side===hn};return c.push(g),u.set(A,c.length-1),c.length-1},f=[],p=new Map,_=new L,x=(A,w)=>{const T=A.geometry.clone();T.applyMatrix4(A.matrixWorld);const C=T.getAttribute("position");if(!C||C.count===0)return;const g=T.getAttribute("normal"),y=T.getAttribute("uv"),P=Array.isArray(A.material)?A.material[0]:A.material,B=(p.get(w)??0)+1;p.set(w,B),f.push({name:`${w}-${B}`,region:w,positions:C.array,normals:g?g.array:new Float32Array(C.count*3),uvs:y?y.array:void 0,indices:T.index?T.index.array:void 0,material:d(P)})},m=A=>{A.geometry.computeBoundingBox();const w=A.geometry.boundingBox;return w?_.copy(w.getCenter(new L)).applyMatrix4(A.matrixWorld):_.set(0,0,0)},h=(A,w)=>{if(w==="shoes")return m(A).x<0?"shoe.L":"shoe.R";if(w==="body"){const T=m(A);return Ux(T.y/s.y,T.x)}return w==="neck-item"?m(A).y/s.y>=1.4?"neck":"chest":w},b=(A,w)=>{let T=w;const C=r.get(A);C&&(T=C);const g=o.get(A);g&&(T=g),A===l&&(T="body"),A instanceof He&&x(A,h(A,T));for(const y of A.children)b(y,T)};t.position.y=0,t.updateMatrixWorld(!0),b(t,"part");const S={head:e.head.getWorldPosition(new L),arms:a};return{parts:f,materials:c,jointWorld:S,frameScale:s,rig:e}}function kx(i){var t,n;const e=new Set;i.root.traverse(s=>{if(s instanceof He){s.geometry.dispose();const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)e.add(o)}});for(const s of e){const r=s;(t=r.map)==null||t.dispose(),(n=r.bumpMap)==null||n.dispose(),s.dispose()}}const Oe={hips:0,spine:1,chest:2,neck:3,head:4,leftUpperArm:5,leftLowerArm:6,leftHand:7,rightUpperArm:8,rightLowerArm:9,rightHand:10,leftUpperLeg:11,leftLowerLeg:12,leftFoot:13,rightUpperLeg:14,rightLowerLeg:15,rightFoot:16};function Bx(i){switch(i){case"head":case"hat":case"glasses":return Oe.head;case"neck":return Oe.neck;case"chest":case"top":case"bag":return Oe.chest;case"torso":return Oe.spine;case"hips":case"bottom":return Oe.hips;case"upperLeg.L":return Oe.leftUpperLeg;case"lowerLeg.L":return Oe.leftLowerLeg;case"foot.L":case"shoe.L":return Oe.leftFoot;case"upperLeg.R":return Oe.rightUpperLeg;case"lowerLeg.R":return Oe.rightLowerLeg;case"foot.R":case"shoe.R":return Oe.rightFoot;case"upperArm.L":return Oe.leftUpperArm;case"forearm.L":return Oe.leftLowerArm;case"hand.L":return Oe.leftHand;case"upperArm.R":return Oe.rightUpperArm;case"forearm.R":return Oe.rightLowerArm;case"hand.R":return Oe.rightHand;default:return Oe.hips}}function zx(i){const e=i.frameScale.x,t=i.frameScale.y,n=(l,c,u)=>new L(l,c,u),s=new Array(17);s[Oe.hips]=n(0,.92*t,0),s[Oe.spine]=n(0,1.08*t,0),s[Oe.chest]=n(0,1.26*t,0),s[Oe.neck]=n(0,1.44*t,0),s[Oe.head]=i.jointWorld.head.clone(),s[Oe.leftUpperLeg]=n(-.096*e,.8*t,0),s[Oe.leftLowerLeg]=n(-.096*e,.47*t,0),s[Oe.leftFoot]=n(-.096*e,.1*t,0),s[Oe.rightUpperLeg]=n(.096*e,.8*t,0),s[Oe.rightLowerLeg]=n(.096*e,.47*t,0),s[Oe.rightFoot]=n(.096*e,.1*t,0);for(const l of i.jointWorld.arms){const c=l.side==="L"?Oe.leftUpperArm:Oe.rightUpperArm,u=l.side==="L"?Oe.leftLowerArm:Oe.rightLowerArm,d=l.side==="L"?Oe.leftHand:Oe.rightHand;s[c]=l.shoulder.getWorldPosition(new L),l.elbow&&(s[u]=l.elbow.getWorldPosition(new L)),l.hand&&(s[d]=l.hand.getWorldPosition(new L)),s[u]||(s[u]=s[c].clone().add(n(l.side==="L"?-.27*e:.27*e,0,0))),s[d]||(s[d]=s[u].clone().add(n(l.side==="L"?-.26*e:.26*e,0,0)))}const o=[{name:"hips",parent:-1},{name:"spine",parent:Oe.hips},{name:"chest",parent:Oe.spine},{name:"neck",parent:Oe.chest},{name:"head",parent:Oe.neck},{name:"leftUpperArm",parent:Oe.chest},{name:"leftLowerArm",parent:Oe.leftUpperArm},{name:"leftHand",parent:Oe.leftLowerArm},{name:"rightUpperArm",parent:Oe.chest},{name:"rightLowerArm",parent:Oe.rightUpperArm},{name:"rightHand",parent:Oe.rightLowerArm},{name:"leftUpperLeg",parent:Oe.hips},{name:"leftLowerLeg",parent:Oe.leftUpperLeg},{name:"leftFoot",parent:Oe.leftLowerLeg},{name:"rightUpperLeg",parent:Oe.hips},{name:"rightLowerLeg",parent:Oe.rightUpperLeg},{name:"rightFoot",parent:Oe.rightLowerLeg}].map((l,c)=>{const u=l.parent>=0?s[l.parent]:new L,d=s[c].clone().sub(u);return{name:l.name,parent:l.parent,translation:[d.x,d.y,d.z]}}),a=new Float32Array(o.length*16);return s.forEach((l,c)=>{a.set([1,0,0,0,0,1,0,0,0,0,1,0,-l.x,-l.y,-l.z,1],c*16)}),{joints:o,inverseBindMatrices:a}}function Vx(i,e){return{fittingRoomSeed:e,fittingRoomCharacter:"fictional",fittingRoomLicenseUrl:Pl,fittingRoomTerms:Dx,fittingRoomTermsJa:Ix,fittingRoomParams:i}}const Yu="3D Fitting Room (working title) — on-device glTF/VRM exporter";function wh(i,e){const t=Fx(i);try{const n=zx(t),s=t.parts.map(c=>({...c,joint:Bx(c.region)})),r=ut(i),o=Vx(i,r);if(!e)return{bytes:qu(s,t.materials,{generator:Yu,extras:o,skin:n}),parts:s.length,seed:r};const a={};for(const[c,u]of Object.entries(Oe))a[c]={node:u};return{bytes:qu(s,t.materials,{generator:Yu,extras:o,skin:n,extensionsUsed:["VRMC_vrm"],extensions:{VRMC_vrm:{specVersion:"1.0",meta:{name:"Fitting Room Character",version:"1.0",authors:["3D Fitting Room (working title)"],copyrightInformation:"A fictional character, generated procedurally on-device by the 3D Fitting Room app. Free to use as material in your own works under CC0 1.0 (see licenseUrl).",licenseUrl:Pl,otherLicenseUrl:Pl,avatarPermission:"everyone",commercialUsage:"corporation",creditNotation:"unnecessary",allowRedistribution:!0,modification:"allowModificationRedistribution",allowExcessivelyViolentUsage:!1,allowExcessivelySexualUsage:!1,allowPoliticalOrReligiousUsage:!1,allowAntisocialOrHateUsage:!1},humanoid:{humanBones:a}}}}),parts:s.length,seed:r}}finally{kx(t.rig)}}function Hx(i){return wh(i,!1)}function Gx(i){return wh(i,!0)}const ic={set_top_style:{field:"topStyle",options:Li},set_top_color:{field:"topColor",options:Pi},set_outer_style:{field:"outerStyle",options:cs},set_outer_color:{field:"outerColor",options:os},set_bottom_style:{field:"bottomStyle",options:as},set_bottom_color:{field:"bottomColor",options:ss},set_shoe_style:{field:"shoeStyle",options:ls},set_shoe_color:{field:"shoeColor",options:rs},set_hat:{field:"hat",options:Di},set_glasses:{field:"glasses",options:Ii},set_accessory:{field:"accessory",options:Ui},set_pose:{field:"pose",options:Ni}},sc=Object.keys(on);function Wx(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function Xx(i,e){const t=typeof i=="string"?Number(i):i;return typeof t!="number"||!Number.isFinite(t)?{ok:!1}:{ok:!0,value:Math.min(e.max,Math.max(e.min,t))}}function $u(i,e){return typeof i=="string"&&e.includes(i)?{ok:!0,value:i}:{ok:!1}}function qx(i,e){const t=n=>e.rejected.push({raw:i,reason:n});if(!Wx(i)||typeof i.type!="string"){t("not a command object");return}switch(i.type){case"set_character":{const n=i.param;if(typeof n!="string"||!sc.includes(n)){t(`unknown character parameter: ${String(n)}`);return}const s=n,r=on[s];if(r.kind==="range"){const o=Xx(i.value,r);if(!o.ok){t(`value for ${s} must be a number`);return}e.commands.push({type:"set_character",param:s,value:o.value})}else{const o=$u(i.value,r.options);if(!o.ok){t(`value for ${s} must be one of: ${r.options.join(", ")}`);return}e.commands.push({type:"set_character",param:s,value:o.value})}return}case"blend_characters":{const{seedA:n,seedB:s}=i;if(typeof n!="string"||!ft(n)){t("seedA is not a valid person seed");return}if(typeof s!="string"||!ft(s)){t("seedB is not a valid person seed");return}let r;if(i.mixSeed===void 0)r=mx(n,s);else{const o=typeof i.mixSeed=="string"?Number(i.mixSeed):i.mixSeed;if(typeof o!="number"||!Number.isFinite(o)){t("mixSeed must be an integer");return}r=Math.floor(o)>>>0}e.commands.push({type:"blend_characters",seedA:n,seedB:s,mixSeed:r});return}case"mutate_character":{if(!nc(i.strength)){t(`strength must be one of: ${tc.join(", ")}`);return}const n={type:"mutate_character",strength:i.strength};if(i.mutationSeed!==void 0){const s=typeof i.mutationSeed=="string"?Number(i.mutationSeed):i.mutationSeed;if(typeof s!="number"||!Number.isFinite(s)){t("mutationSeed must be an integer");return}n.mutationSeed=Math.floor(s)>>>0}e.commands.push(n);return}case"randomize_outfit":case"randomize_character":case"share_card":case"get_state":e.commands.push({type:i.type});return;default:{const n=ic[i.type];if(!n){t(`unknown command type: ${i.type}`);return}const s=$u(i.value,n.options);if(!s.ok){t(`value for ${i.type} must be one of: ${n.options.join(", ")}`);return}e.commands.push({type:i.type,value:s.value});return}}}function Th(i){const e={commands:[],rejected:[]};if(!Array.isArray(i))return e.rejected.push({raw:i,reason:"command list must be an array"}),e;for(const t of i)qx(t,e);return e}function Yx(i){const e={};for(const t of sc){const n=on[t];e[t]=n.kind==="range"?n.min+i()*(n.max-n.min):n.options[Math.floor(i()*n.options.length)]}return Js(e)}function Ah(i,e,t=Math.random){let n={...e,character:{...e.character}};const s=[],r=[];let o=!1,a=!1;for(const l of i)switch(l.type){case"set_character":n={...n,character:Js({...n.character,[l.param]:l.value})},s.push(`set_character ${l.param} = ${String(l.value)}`);break;case"randomize_outfit":{n={...eh(t),character:n.character,name:n.name},s.push("randomize_outfit");break}case"randomize_character":n={...n,character:Yx(t)},s.push("randomize_character");break;case"blend_characters":{const c=ft(l.seedA),u=ft(l.seedB);c&&u&&(n={...n,name:"",character:yh(c.character,u.character,l.mixSeed)},s.push(`blend_characters mixSeed=${l.mixSeed}`));break}case"mutate_character":{const c=ut(n),u=l.mutationSeed??vx(c);n={...n,character:xh(n.character,u,l.strength)},r.push({source:c,seed:ut(n),strength:l.strength}),s.push(`mutate_character strength=${l.strength} mutationSeed=${u}`);break}case"share_card":o=!0,s.push("share_card");break;case"get_state":a=!0,s.push("get_state");break;default:{const c=ic[l.type];n={...n,[c.field]:l.value},s.push(`${l.type} = ${l.value}`);break}}return{outfit:Ws(n),applied:s,wantShareCard:o,stateRequested:a,mutations:r}}function Rh(){const i=["Respond with a single JSON object and nothing else:",'{"reply": "<short message to the user>", "commands": [<command>, ...]}',"Available commands:"];for(const e of sc){const t=on[e];t.kind==="range"?i.push(`- {"type":"set_character","param":"${e}","value":<number>} — range ${t.min}..${t.max}`):i.push(`- {"type":"set_character","param":"${e}","value":<one of: ${t.options.join(" | ")}>}`)}for(const[e,t]of Object.entries(ic))i.push(`- {"type":"${e}","value":<one of: ${t.options.join(" | ")}>}`);return i.push('- {"type":"randomize_outfit"} — random clothes, same person','- {"type":"randomize_character"} — a new random person','- {"type":"blend_characters","seedA":"<seed of one person>","seedB":"<seed of another person>","mixSeed":<integer, optional>} — synthesize a new person from the two people named by their seeds; the same seeds and mixSeed always produce the same person. Clothes are not inherited: the current outfit stays on the new person','- {"type":"mutate_character","strength":<one of: subtle | standard | bold>,"mutationSeed":<integer, optional>} — vary the current person into a nearby new person (one-parent mutation); the same person, strength and mutationSeed always produce the same variation, and without a mutationSeed one is derived from the current person. Clothes stay as they are','- {"type":"share_card"} — save a photo of the current look','- {"type":"get_state"} — report the current state back',"Values outside a range are clamped; values not in an option list are rejected. Never invent parameters, options or command types."),i.join(`
`)}const Ch="fitting-room.llm.v1",ju={endpoint:"",apiKey:"",model:""};function $x(i=localStorage){try{const e=i.getItem(Ch);if(!e)return{...ju};const t=JSON.parse(e);return{endpoint:typeof t.endpoint=="string"?t.endpoint:"",apiKey:typeof t.apiKey=="string"?t.apiKey:"",model:typeof t.model=="string"?t.model:""}}catch{return{...ju}}}function jx(i,e=localStorage){try{e.setItem(Ch,JSON.stringify(i))}catch{}}function ds(i){try{const e=new URL(i.trim());return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function Ph(i){return i.trim().replace(/\/+$/,"").replace(/\/chat\/completions$/,"")}function Kx(i){const e=i.trim().replace(/\/+$/,"");return e.endsWith("/chat/completions")?e:`${Ph(i)}/chat/completions`}function Jx(i){return`${Ph(i)}/models`}function Lh(i){const e={"Content-Type":"application/json"};return i.apiKey.trim()&&(e.Authorization=`Bearer ${i.apiKey.trim()}`),e}async function Dh(i,e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),t);try{return await n(i,{...e,signal:s.signal})}finally{clearTimeout(r)}}async function Zx(i,e=fetch){if(!ds(i.endpoint))return{ok:!1,error:"invalid endpoint URL"};try{const t=await Dh(Jx(i.endpoint),{headers:Lh(i)},15e3,e);if(!t.ok)return{ok:!1,error:`HTTP ${t.status}`};const n=await t.json();return{ok:!0,models:Array.isArray(n.data)?n.data.map(r=>r==null?void 0:r.id).filter(r=>typeof r=="string"):[]}}catch(t){return{ok:!1,error:t instanceof Error?t.message:String(t)}}}const Qx={ja:"Japanese",en:"English",es:"Spanish",zh:"Chinese",fr:"French",de:"German",pt:"Portuguese",ko:"Korean"};function eS(i,e){return["You operate a 3D avatar fitting-room app for the user, through commands.","The user writes an instruction; you translate it into commands from the protocol below.",`Write the "reply" field in ${Qx[e]}, briefly.`,"If the instruction asks for something no command can do, return an empty commands list and explain why in the reply.","","Current state (JSON):",JSON.stringify(i),"",Rh()].join(`
`)}function tS(i){const e=i.indexOf("{"),t=i.lastIndexOf("}");if(e<0||t<=e)return null;try{const n=JSON.parse(i.slice(e,t+1));if(typeof n!="object"||n===null)return null;const s=n;return Array.isArray(s.commands)?{reply:typeof s.reply=="string"?s.reply:"",rawCommands:s.commands}:null}catch{return null}}async function nS(i,e,t,n,s=fetch){var c,u,d;if(!ds(i.endpoint))throw new Error("invalid endpoint URL");if(!i.model.trim())throw new Error("no model set");const r=await Dh(Kx(i.endpoint),{method:"POST",headers:Lh(i),body:JSON.stringify({model:i.model.trim(),temperature:.2,messages:[{role:"system",content:eS(e,n)},{role:"user",content:t}]})},6e4,s);if(!r.ok)throw new Error(`HTTP ${r.status}`);const a=(d=(u=(c=(await r.json()).choices)==null?void 0:c[0])==null?void 0:u.message)==null?void 0:d.content;if(typeof a!="string")throw new Error("empty response from the model");const l=tS(a);if(!l)throw new Error("the model response was not the expected JSON");return{reply:l.reply,validation:Th(l.rawCommands)}}const Ih="fitting-room.sd.v1",Ku={endpoint:"",apiKey:""};function iS(i=localStorage){try{const e=i.getItem(Ih);if(!e)return{...Ku};const t=JSON.parse(e);return{endpoint:typeof t.endpoint=="string"?t.endpoint:"",apiKey:typeof t.apiKey=="string"?t.apiKey:""}}catch{return{...Ku}}}function sS(i,e=localStorage){try{e.setItem(Ih,JSON.stringify(i))}catch{}}function rS(i){return i.trim().replace(/\/+$/,"").replace(/\/sdapi\/v1$/,"")}function Uh(i,e){return`${rS(i)}/sdapi/v1/${e.replace(/^\/+/,"")}`}function Nh(i){const e={"Content-Type":"application/json"},t=i.apiKey.trim();if(t)if(t.includes(":"))try{e.Authorization=`Basic ${btoa(t)}`}catch{e.Authorization=`Bearer ${t}`}else e.Authorization=`Bearer ${t}`;return e}async function Oh(i,e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),t);try{return await n(i,{...e,signal:s.signal})}finally{clearTimeout(r)}}async function oS(i,e=fetch){if(!ds(i.endpoint))return{ok:!1,error:"invalid endpoint URL"};try{const t=await Oh(Uh(i.endpoint,"sd-models"),{headers:Nh(i)},15e3,e);if(!t.ok)return{ok:!1,error:`HTTP ${t.status}`};const n=await t.json();return{ok:!0,models:Array.isArray(n)?n.map(r=>typeof(r==null?void 0:r.model_name)=="string"?r.model_name:r==null?void 0:r.title).filter(r=>typeof r=="string"):[]}}catch(t){return{ok:!1,error:t instanceof Error?t.message:String(t)}}}const aS={"#201612":"black","#3a2417":"dark brown","#503729":"brown","#7a4a26":"chestnut brown","#8c3b22":"auburn","#a97c50":"light brown","#d9b380":"blonde","#b9b4ad":"silver-gray"},lS={"#2e2019":"dark brown","#5a3a1e":"brown","#7a5a26":"amber","#46684a":"green","#3d5a80":"blue","#707880":"gray"},uo={"#ffffff":"white","#ff8fab":"pink","#7cc7ff":"light blue","#8fe3c0":"mint green","#c9a7ff":"lavender","#ffd166":"yellow","#3a4152":"dark navy","#44557a":"indigo denim blue","#2f3542":"charcoal gray","#e8e2d6":"cream","#a83c46":"red","#5e2233":"burgundy","#26262b":"black","#7c4a2d":"brown","#3d5a80":"steel blue","#d8b25c":"gold","#b03050":"wine red","#2e5e4e":"deep green","#f2a65a":"apricot","#5b4a68":"muted plum","#8a6642":"camel","#606c38":"olive green","#c0c6cc":"silver gray","#b08954":"tan","#2c3a55":"navy","#7a2e3a":"wine","#6b7250":"khaki olive"},cS={bob:"a bob cut",long:"long hair",short:"short hair",ponytail:"a ponytail",bun:"a hair bun"},Fh={shoulderWidth:{low:"narrow shoulders",high:"broad shoulders"},waist:{low:"a slim waist",high:"a wide waist"},hip:{low:"narrow hips",high:"wide hips"},bust:{low:"a small bust",high:"a full bust"},build:{low:"a slim build",high:"a sturdy build"},eyeSize:{low:"small eyes",high:"large eyes"},eyeSpacing:{low:"close-set eyes",high:"wide-set eyes"},eyeShape:{low:"almond-shaped eyes",high:"round eyes"},noseWidth:{low:"a narrow nose",high:"a wide nose"},noseProminence:{low:"a small nose",high:"a prominent nose"},lipWidth:{low:"a small mouth",high:"a wide mouth"},lipFullness:{low:"thin lips",high:"full lips"},faceWidth:{low:"a narrow face",high:"a wide face"}},uS=["very pale skin","pale skin","light skin","a medium skin tone","brown skin","deep brown skin"],dS={tee:"T-shirt",hoodie:"hoodie",blouse:"blouse",dress:"one-piece dress",dressLong:"long one-piece dress"},hS={jacket:"a jacket",coat:"a long coat",cardigan:"a knit cardigan"},fS={skirt:"a skirt",skirtLong:"a long skirt",pants:"pants",shorts:"shorts"},pS={flats:"flat shoes",sneakers:"sneakers",pumps:"pumps",boots:"boots"},mS={cap:"a baseball cap",beanie:"a knit beanie",catears:"a cat-ear headband",ribbon:"a ribbon in the hair"},gS={round:"round glasses",square:"square glasses",sunglasses:"sunglasses"},_S={necklace:"a necklace",scarf:"a scarf",bag:"a shoulder bag"},vS={stand:"standing",wave:"waving one hand",cheer:"both arms raised in celebration",peace:"making a peace sign",relax:"a relaxed pose"};function yS(i,e){const t=Fh[i],n=on[i];if(!t||n.kind!=="range")return null;const s=n.max-n.min;if(s<=0)return null;const r=(e-n.min)/s,o=(n.def-n.min)/s;return r-o>.22?t.high:o-r>.22?t.low:null}const xS="minor, child, teenager, young-looking, school uniform, loli, nsfw, nude, naked, blurry, lowres, deformed hands, extra fingers, extra limbs, watermark, text";function Tr(i,e={}){var f;const t=i.character,n=[];e.forImg2Img?(n.push("the same fictional adult character as the input image"),n.push("keep the same face, hairstyle and outfit")):n.push("full-body portrait of a fictional adult character, one adult person");const s=["I","II","III","IV","V","VI"].indexOf(wl(t.skinTone));n.push(uS[Math.max(0,s)]);const r=on.height;if(r.kind==="range"){const p=(t.height-r.min)/(r.max-r.min);p<.25?n.push("short in stature"):p>=.75?n.push("very tall"):p>=.5&&n.push("tall")}for(const p of Object.keys(Fh)){const _=yS(p,t[p]);_&&n.push(_)}const o=aS[t.hairColor]??"natural-colored",a=cS[t.hairStyle]??"a simple hairstyle";n.push(`${o} hair in ${a}`);const l=lS[t.eyeColor]??"dark";n.push(`${l} eyes`);const c=uo[i.topColor]??"";if(n.push(`wearing a ${c} ${dS[i.topStyle]??"top"}`.replace(/\s+/g," ")),i.outerStyle!=="none"){const p=uo[i.outerColor]??"";n.push(`${p} ${hS[i.outerStyle]??"outerwear"} over it`.replace(/\s+/g," "))}if(i.bottomStyle!=="none"&&!Ho(i.topStyle)){const p=uo[i.bottomColor]??"";n.push(`${p} ${fS[i.bottomStyle]??""}`.replace(/\s+/g," "))}const u=uo[i.shoeColor]??"";n.push(`${u} ${pS[i.shoeStyle]??"shoes"}`.replace(/\s+/g," ")),i.hat!=="none"&&n.push(mS[i.hat]??""),i.glasses!=="none"&&n.push(gS[i.glasses]??""),i.accessory!=="none"&&n.push(_S[i.accessory]??""),n.push(vS[i.pose]??"standing"),n.push("in a boutique fitting room, soft studio lighting, high quality, detailed");const d=(f=e.extra)==null?void 0:f.trim();return d&&n.push(d),{prompt:n.filter(Boolean).join(", "),negativePrompt:xS}}function SS(i){return i.startsWith("data:")?i:`data:image/png;base64,${i}`}function MS(i){const e=i.indexOf(",");return i.startsWith("data:")&&e>=0?i.slice(e+1):i}function Do(i){return Math.max(64,Math.round(i/8)*8)}async function kh(i,e,t,n,s){const r=await Oh(Uh(i.endpoint,e),{method:"POST",headers:Nh(i),body:JSON.stringify(t)},3e5,s);if(!r.ok)throw new Error(`HTTP ${r.status}`);const o=await r.json(),a=Array.isArray(o.images)?o.images.filter(l=>typeof l=="string"&&l.length>0):[];if(!a.length)throw new Error("the server returned no image");return{dataUrl:SS(a[0]),prompt:n}}async function bS(i,e,t={},n=fetch){if(!ds(i.endpoint))throw new Error("invalid endpoint URL");return kh(i,"txt2img",{prompt:e.prompt,negative_prompt:e.negativePrompt,steps:t.steps??20,cfg_scale:t.cfgScale??7,sampler_name:t.sampler??"Euler a",width:Do(t.width??768),height:Do(t.height??768),batch_size:1,n_iter:1},e.prompt,n)}async function ES(i,e,t,n,s={},r=fetch){if(!ds(i.endpoint))throw new Error("invalid endpoint URL");return kh(i,"img2img",{prompt:e.prompt,negative_prompt:e.negativePrompt,init_images:[MS(t)],denoising_strength:s.denoisingStrength??.65,steps:s.steps??20,cfg_scale:s.cfgScale??7,sampler_name:s.sampler??"Euler a",width:Do(s.width??n.width),height:Do(s.height??n.height),resize_mode:0,batch_size:1,n_iter:1},e.prompt,r)}const Bh="fitting-room.lang.v1",rn=document.getElementById("gl");nh(xy(localStorage.getItem(Bh)));document.documentElement.lang=Si();const we=Hy(rn);let Tt=null,St=ux(),re=ft(_h(St).seed)??Qd();const si=Kd(re.character);we.scene.add(si.root);we.setSubjectHeight(re.character.height);Go(si,re);const wS=[{id:"looks",key:"cat.looks"},{id:"tops",key:"cat.tops"},{id:"outer",key:"cat.outer"},{id:"bottoms",key:"cat.bottoms"},{id:"shoes",key:"cat.shoes"},{id:"hat",key:"cat.hat"},{id:"glasses",key:"cat.glasses"},{id:"accessory",key:"cat.accessory"},{id:"pose",key:"cat.pose"},{id:"character",key:"cat.character"},{id:"llm",key:"cat.llm"}];let Qt="looks";function Q(i,e,t){const n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function zh(){kv(re),St=dx(St,ut(re)),Zs(St)}let Ar=bh();function pn(i,e,t={}){var r;const n={at:Date.now(),kind:i,seed:e};t.parents&&(n.parents=t.parents),t.source&&(n.source=t.source),t.strength&&(n.strength=t.strength);const s=((r=ft(e))==null?void 0:r.name)??"";s&&(n.name=s),Ar=Ex(n)}function Vh(i,e){for(const t of i)t.type==="blend_characters"&&pn("blend",ut(e),{parents:[t.seedA,t.seedB]})}function Hh(i){for(const e of i.mutations)pn("mutate",e.seed,{source:e.source,strength:e.strength})}let In=ex(),ts=null,Io="";function ns(i){const e=[{label:I(`top.${i.topStyle}`),color:i.topColor}];return i.outerStyle!=="none"&&e.push({label:I(`outer.${i.outerStyle}`),color:i.outerColor}),i.bottomStyle!=="none"&&!Ho(i.topStyle)&&e.push({label:I(`bottom.${i.bottomStyle}`),color:i.bottomColor}),e.push({label:I(`shoe.${i.shoeStyle}`),color:i.shoeColor}),i.hat!=="none"&&e.push({label:I(`hat.${i.hat}`)}),i.glasses!=="none"&&e.push({label:I(`glasses.${i.glasses}`)}),i.accessory!=="none"&&e.push({label:I(`accessory.${i.accessory}`)}),e}function TS(i){return ns(i).map(e=>e.label).join(" ・ ")}function Ju(){const i=us(Io);if(!i){Dt(I("ui.lookNameRequired"));return}In=tx(In,i,vr(re)),ph(In),Io="",Dt(I("ui.lookSaved")),Je()}function AS(i){const e=In.find(t=>t.id===i);e&&(st({...re,...e.look}),Dt(I("ui.lookApplied")))}function RS(i){In=nx(In,i),ph(In),Je()}function CS(){ts&&(st({...re,...ts}),Dt(I("ui.swapped")))}function st(i){Pn=null,Bt=null,mn=null,Ti=!1;const e=Ws(i);Zy(vr(re),vr(e))||(ts=vr(re)),re=e,si.setCharacter(re.character),we.setSubjectHeight(re.character.height),Go(si,re),zh(),Je(),Tt==null||Tt.refreshPanel()}function ho(i){Pn=null,Bt=null,mn=null,Ti=!1,re={...re,character:Js({...re.character,...i})},si.setCharacter(re.character),we.setSubjectHeight(re.character.height),zh();const e=document.getElementById("seed-value");e&&(e.textContent=ut(re))}let Mi=$x(),bi=!1,Zi=null;const Xn=[];let Ei=iS(),wi=!1,En=null,Ji="",wn=null,Mo="",bo="",Pn=null;function Qs(i){si.setCharacter(i),we.setSubjectHeight(i.height),Go(si,{...re,character:i})}function PS(){const i=ft(Mo),e=ft(bo);if(!i||!e){Dt(I("ui.seedInvalid"));return}const t=Math.floor(Math.random()*4294967296)>>>0;Pn=yh(i.character,e.character,t),Qs(Pn),Dt(I("genetics.created")),Je()}function LS(i){const e=us(i);if(e===re.name){Je();return}const t={...re,name:e};pn("rename",ut(t)),st(t)}function DS(){const i=ut({...Rt});St=hx(St,i),Zs(St),pn("create",i),st(ft(i)??{...Rt})}function IS(i){const e=St.entries.find(n=>n.id===i);if(!e||i===St.currentId)return;const t=ft(e.seed);t&&(St={...St,currentId:i},Zs(St),Xs=null,st(t))}function US(i){const e=i===St.currentId;if(St=fx(St,i),Zs(St),Xs===i&&(Xs=null),e){const t=ft(_h(St).seed);t?st(t):Je()}else Je()}function NS(i,e){const t=px(St,i,us(e));if(Xs=null,!t){Je();return}St=t,Zs(St);const n=St.entries.find(s=>s.id===i);if(n&&pn("rename",n.seed),i===St.currentId&&n){const s=ft(n.seed);s?st(s):Je()}else Je()}let Xs=null,Rr="standard",Bt=null,mn=null;function Uo(i){return{...re,character:i,name:""}}function OS(i){Qs(i),we.renderer.render(we.scene,we.camera);const e=200,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");if(!n)return"";const s=Math.min(rn.width,rn.height);return n.drawImage(rn,(rn.width-s)/2,(rn.height-s)/2,s,s,0,0,e,e),t.toDataURL("image/jpeg",.85)}function Gh(){const i=Math.floor(Math.random()*4294967296)>>>0,e=yx(re.character,i,Rr),t=e.map(n=>OS(n));Bt={list:e,thumbs:t,strength:Rr},mn=null,Qs(re.character),we.renderer.render(we.scene,we.camera),Dt(I("mutation.created")),Je()}function FS(i){!Bt||!Bt.list[i]||(mn=i,Qs(Bt.list[i]),Je())}function kS(){if(!Bt||mn===null)return;const i=Bt.list[mn],e=Uo(i);pn("mutate",ut(e),{source:ut(re),strength:Bt.strength}),st(e),Dt(I("mutation.applied"))}function BS(){mn=null,Qs(re.character),Je()}let Ti=!1;function zS(){Ti=!1,Qt="character",Yo(),Rr="standard",Gh()}function Wh(){const i=e=>{var t;return((t=document.getElementById(e))==null?void 0:t.value.trim())??""};return{endpoint:i("llm-endpoint"),apiKey:i("llm-apikey"),model:i("llm-model")}}function VS(){const i=Wh();if(i.endpoint&&!ds(i.endpoint)){Zi={kind:"ng",text:I("llm.invalidEndpoint")},Je();return}Mi=i,jx(Mi),Zi={kind:"ok",text:I("llm.saved")},Je()}async function HS(){const i=Wh();bi=!0,Zi={kind:"ok",text:I("llm.testing")},Je();const e=await Zx(i);bi=!1,Zi=e.ok?{kind:"ok",text:e.models.length?`${I("llm.testOk")}: ${e.models.join(", ")}`:I("llm.testOk")}:{kind:"ng",text:`${I("llm.testFail")}: ${e.error}`},Je()}async function Zu(){const i=document.getElementById("llm-chat-input"),e=(i==null?void 0:i.value.trim())??"";if(!(!e||bi)){if(Xn.push({who:"you",text:e}),!Mi.endpoint){Xn.push({who:"sys",text:I("llm.notConfigured")}),Je();return}if(!Mi.model.trim()){Xn.push({who:"sys",text:I("llm.modelMissing")}),Je();return}bi=!0,Je();try{const t=await nS(Mi,re,e,Si());t.reply&&Xn.push({who:"ai",text:t.reply});const{validation:n}=t;if(n.commands.length){const s=Ah(n.commands,re);Vh(n.commands,s.outfit),Hh(s),n.commands.some(r=>r.type!=="get_state")&&st(s.outfit),s.applied.length&&Xn.push({who:"sys",text:`${I("llm.applied")}: ${s.applied.join("; ")}`}),s.stateRequested&&Xn.push({who:"sys",text:JSON.stringify(re)}),s.wantShareCard&&Kh()}n.rejected.length&&Xn.push({who:"sys",text:`${I("llm.rejected")}: ${n.rejected.map(s=>s.reason).join("; ")}`})}catch(t){Xn.push({who:"sys",text:`${I("llm.error")}: ${t instanceof Error?t.message:String(t)}`})}bi=!1,Je()}}function Xh(){const i=e=>{var t;return((t=document.getElementById(e))==null?void 0:t.value.trim())??""};return{endpoint:i("sd-endpoint"),apiKey:i("sd-auth")}}function GS(){const i=Xh();if(i.endpoint&&!ds(i.endpoint)){En={kind:"ng",text:I("llm.invalidEndpoint")},Je();return}Ei=i,sS(Ei),En={kind:"ok",text:I("llm.saved")},Je()}async function WS(){const i=Xh();wi=!0,En={kind:"ok",text:I("llm.testing")},Je();const e=await oS(i);wi=!1,En=e.ok?{kind:"ok",text:e.models.length?`${I("llm.testOk")}: ${e.models.join(", ")}`:I("llm.testOk")}:{kind:"ng",text:`${I("llm.testFail")}: ${e.error}`},Je()}function XS(){we.renderer.render(we.scene,we.camera);const i=Math.min(1,768/Math.max(rn.width,rn.height)),e=Math.max(8,Math.round(rn.width*i/8)*8),t=Math.max(8,Math.round(rn.height*i/8)*8),n=document.createElement("canvas");n.width=e,n.height=t;const s=n.getContext("2d");if(!s)throw new Error("2d context unavailable");return s.drawImage(rn,0,0,e,t),{dataUrl:n.toDataURL("image/png"),width:e,height:t}}async function Qu(i){if(!wi){if(!Ei.endpoint){En={kind:"ng",text:I("sd.notConfigured")},Je();return}wi=!0,En={kind:"ok",text:I("sd.generating")},Je();try{let e;if(i==="img2img"){const t=XS(),n=Tr(re,{extra:Ji,forImg2Img:!0});e=await ES(Ei,n,t.dataUrl,{width:t.width,height:t.height})}else{const t=Tr(re,{extra:Ji});e=await bS(Ei,t)}wn={dataUrl:e.dataUrl,seed:ut(re)},En={kind:"ok",text:I("sd.resultTitle")}}catch(e){En={kind:"ng",text:`${I("llm.error")}: ${e instanceof Error?e.message:String(e)}`}}wi=!1,Je()}}function qS(i){var r;const e=i.indexOf(","),t=((r=/data:([^;]+)/.exec(i.slice(0,e)))==null?void 0:r[1])??"application/octet-stream",n=atob(i.slice(e+1)),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return new Blob([s],{type:t})}function YS(){wn&&Dr(qS(wn.dataUrl),"3d-fitting-room-ai.png")}async function qh(){if(!wn)return null;const i=wn,e=new Image;await new Promise((n,s)=>{e.onload=()=>n(),e.onerror=()=>s(new Error("generated image could not be loaded")),e.src=i.dataUrl});const t=ft(i.seed);return dh(e,{appName:I("app.title"),workingTitleNote:I("app.workingTitle"),tagline:I("app.tagline"),seed:i.seed,look:t?ns(t):[],name:(t==null?void 0:t.name)??""})}async function $S(){const i=await qh();i&&(Dr(i,"3d-fitting-room-card-ai.png"),Dt(I("sd.cardSaved")))}function Ye(i,e,t){const n=Q("button","chip",i);return n.type="button",n.setAttribute("aria-pressed",String(e)),n.addEventListener("click",t),n}function Yo(){document.getElementById("tabs").replaceChildren(...wS.map(({id:e,key:t})=>{const n=Q("button",void 0,I(t));return n.type="button",n.setAttribute("aria-pressed",String(Qt===e)),n.addEventListener("click",()=>{Qt=e,Yo(),Je()}),n}))}function Je(){var n,s,r;const i=document.getElementById("options"),e=[],t=(o,a)=>`${o}.${a}`;if(Ti){const o=Q("div","restored-block");o.id="restored-notice",o.append(Q("p","restored-note",I("restore.note")));const a=Q("div","seed-row"),l=Ye(I("restore.makeMine"),!1,zS);l.id="btn-make-mine",l.classList.add("primary");const c=Ye(I("restore.dismiss"),!1,()=>{Ti=!1,Je()});c.id="btn-restore-dismiss",a.append(l,c),o.append(a),e.push(o)}if(Qt==="looks"){e.push(Q("span","group-label",I("ui.currentLook"))),e.push(Q("p","llm-note",TS(re)));const o=Q("div","seed-row"),a=Q("input","seed-input");a.id="look-name",a.type="text",a.value=Io,a.placeholder=I("ui.lookNamePlaceholder"),a.setAttribute("aria-label",I("ui.saveLook")),a.addEventListener("input",()=>{Io=a.value}),a.addEventListener("keydown",c=>{c.key==="Enter"&&Ju()});const l=Ye(I("ui.saveLook"),!1,Ju);l.id="look-save",o.append(a,l),e.push(o),In.length===0&&e.push(Q("p","llm-note",I("ui.looksEmpty")));for(const c of In){const u=Q("div","seed-row"),d=Ye(c.name,!1,()=>AS(c.id));d.classList.add("look-apply");const f=Ye(I("ui.delete"),!1,()=>RS(c.id));f.classList.add("look-delete"),u.append(d,f),e.push(u),e.push(Q("p","llm-note",ns({...re,...c.look}).map(p=>p.label).join(" ・ ")))}if(ts){e.push(Q("span","group-label",I("ui.prevLook"))),e.push(Q("p","llm-note",ns({...re,...ts}).map(d=>d.label).join(" ・ ")));const c=Q("div","seed-row"),u=Ye(I("ui.swapLook"),!1,CS);u.id="look-swap",c.append(u),e.push(c)}}else if(Qt==="character"){const o=re.character;e.push(Q("p","principle-note",I("principle.note"))),e.push(Q("span","group-label",I("ui.name")));const a=Q("div","seed-row"),l=Q("input","seed-input");l.id="person-name",l.type="text",l.value=re.name,l.placeholder=I("ui.namePlaceholder"),l.setAttribute("aria-label",I("ui.name")),l.addEventListener("change",()=>LS(l.value)),a.append(l),e.push(a),e.push(Q("p","llm-note",I("ui.nameNote")));const c=Q("div","slider-row"),u=Q("span","slider-val",wl(o.skinTone)),d=Q("input","slider");d.type="range",d.min="0",d.max="1000",d.step="1",d.value=String(Math.round(o.skinTone*1e3)),d.setAttribute("aria-label",I("ui.skinTone")),d.addEventListener("input",()=>{const N=Number(d.value)/1e3;ho({skinTone:N}),u.textContent=wl(N)}),d.addEventListener("change",()=>Je()),c.append(Q("span","slider-label",I("ui.skinTone")),d,u),e.push(c);const f=(N,ie,J,pe,oe,Ee)=>{const Ve=Q("div","slider-row"),ke=Q("span","slider-val",oe(ie)),le=Q("input","slider");return le.type="range",le.min=String(J),le.max=String(pe),le.step=String((pe-J)/200),le.value=String(ie),le.setAttribute("aria-label",N),le.addEventListener("input",()=>{const D=Number(le.value);Ee(D),ke.textContent=oe(D)}),le.addEventListener("change",()=>Je()),Ve.append(Q("span","slider-label",N),le,ke),Ve},p=N=>`${N>=0?"+":""}${Math.round(N*1e3)} mm`,_=N=>`${N>=0?"+":""}${Math.round(N*180/Math.PI)}°`,x=(N,ie)=>{switch(N){case"eyeHeight":case"browHeight":return p;case"eyeTilt":case"browTilt":return _;case"asymmetry":return J=>`${Math.round(J*100)}%`;default:return J=>`${Math.round(J/ie*100)}%`}},m=Q("div","slider-row"),h=Math.round(o.height*100),b=Q("span","slider-val",`${h} cm`),S=Q("input","slider");S.type="range",S.min=String(Math.round(wr*100)),S.max=String(Math.round($d*100)),S.step="1",S.value=String(h),S.setAttribute("aria-label",I("ui.height")),S.addEventListener("input",()=>{const N=Number(S.value);ho({height:N/100}),b.textContent=`${N} cm`}),S.addEventListener("change",()=>Je()),m.append(Q("span","slider-label",I("ui.height")),S,b),e.push(m),e.push(Q("span","group-label",I("ui.body")));for(const N of Kl){const ie=on[N];ie.kind==="range"&&e.push(f(I(`body.${N}`),o[N],ie.min,ie.max,J=>`${Math.round(J/ie.def*100)}%`,J=>ho({[N]:J})))}e.push(Q("span","group-label",I("ui.face")));for(const N of Jl){const ie=on[N];ie.kind==="range"&&e.push(f(I(`face.${N}`),o[N],ie.min,ie.max,x(N,ie.def),J=>ho({[N]:J})))}e.push(Q("span","group-label",I("ui.hairStyle")));for(const N of Mr)e.push(Ye(I(t("hair",N)),o.hairStyle===N,()=>st({...re,character:{...o,hairStyle:N}})));const v=(N,ie,J,pe)=>{const oe=Q("button","swatch");return oe.type="button",oe.style.background=N,oe.setAttribute("aria-pressed",String(ie)),oe.setAttribute("aria-label",`${J} ${N}`),oe.addEventListener("click",pe),oe};e.push(Q("span","group-label",I("ui.hairColor")));for(const N of br)e.push(v(N,o.hairColor===N,I("ui.hairColor"),()=>st({...re,character:{...o,hairColor:N}})));e.push(Q("span","group-label",I("ui.eyeColor")));for(const N of Er)e.push(v(N,o.eyeColor===N,I("ui.eyeColor"),()=>st({...re,character:{...o,eyeColor:N}})));e.push(Q("span","group-label",I("ui.seed")));const A=Q("div","seed-row"),w=Q("code","seed-value",ut(re));w.id="seed-value";const T=Ye(I("ui.copy"),!1,()=>{var N;try{(N=navigator.clipboard)==null||N.writeText(ut(re)).then(()=>Dt(I("ui.seedCopied"))).catch(()=>{})}catch{}});A.append(w,T),e.push(A);const C=Q("div","seed-row"),g=Q("input","seed-input");g.type="text",g.placeholder="FR1-…",g.setAttribute("aria-label",I("ui.seed"));const y=Ye(I("ui.seedApply"),!1,()=>{const N=ft(g.value);N?(pn("restore",ut(N)),st(N),Ti=!0,Je()):Dt(I("ui.seedInvalid"))});C.append(g,y),e.push(C);const P=Q("div","seed-row");P.append(Ye(I("ui.cardLoad"),!1,()=>Ai.click())),e.push(P),e.push(Q("span","group-label",I("ui.roster")));const B=[...St.entries].sort((N,ie)=>ie.updatedAt-N.updatedAt);for(const N of B){const ie=Q("div","seed-row"),J=ft(N.seed),pe=(J==null?void 0:J.name)||I("ui.unnamed");if(Xs===N.id){const oe=Q("input","seed-input");oe.type="text",oe.value=(J==null?void 0:J.name)??"",oe.placeholder=I("ui.namePlaceholder"),oe.setAttribute("aria-label",I("ui.name")),oe.addEventListener("change",()=>NS(N.id,oe.value)),ie.append(oe)}else{const oe=N.id===St.currentId,Ee=Si()==="ja"||Si()==="zh",Ve=Ye(oe?Ee?`${pe}（${I("ui.currentPerson")}）`:`${pe} (${I("ui.currentPerson")})`:pe,oe,()=>IS(N.id));Ve.classList.add("roster-load"),ie.append(Ve);const ke=Ye(I("ui.rename"),!1,()=>{Xs=N.id,Je()});ke.classList.add("roster-rename");const le=Ye(I("ui.delete"),!1,()=>US(N.id));le.classList.add("roster-delete"),ie.append(ke,le)}e.push(ie)}const O=Q("div","seed-row"),H=Ye(I("ui.newPerson"),!1,DS);H.id="roster-new",O.append(H),e.push(O),e.push(Q("span","group-label",I("ui.export3d"))),e.push(Q("p","llm-note",I("export.note")));const $=Q("div","seed-row"),X=Ye(I("ui.exportGlb"),!1,()=>td("glb"));X.id="btn-export-glb";const K=Ye(I("ui.exportVrm"),!1,()=>td("vrm"));K.id="btn-export-vrm",$.append(X,K),e.push($),e.push(Q("span","group-label",I("genetics.title"))),e.push(Q("p","llm-note",I("genetics.note")));const G=(N,ie,J,pe)=>{const oe=Q("div","seed-row"),Ee=Q("input","seed-input");Ee.id=ie,Ee.type="text",Ee.value=J,Ee.placeholder="FR1-…",Ee.setAttribute("aria-label",I(N)),Ee.addEventListener("input",()=>pe(Ee.value));const Ve=Ye(I("genetics.useCurrent"),!1,()=>{pe(ut(re)),Je()});return oe.append(Ee,Ve),oe};e.push(Q("span","group-label",I("genetics.personA"))),e.push(G("genetics.personA","blend-seed-a",Mo,N=>{Mo=N})),e.push(Q("span","group-label",I("genetics.personB"))),e.push(G("genetics.personB","blend-seed-b",bo,N=>{bo=N}));const ue=Q("div","seed-row"),ge=Ye(I("genetics.generate"),!1,PS);if(ge.id="blend-generate",ue.append(ge),e.push(ue),Pn){e.push(Q("span","group-label",I("genetics.result")));const N=Q("div","seed-row"),ie=Q("code","seed-value",ut({...re,character:Pn,name:""}));ie.id="blend-child-seed",N.append(ie),e.push(N);const J=Q("div","seed-row"),pe=Ye(I("genetics.apply"),!1,()=>{if(!Pn)return;const Ee=Pn,Ve=[Mo.trim(),bo.trim()];Pn=null;const ke={...re,character:Ee,name:""};pn("blend",ut(ke),{parents:Ve}),st(ke)});pe.id="blend-apply";const oe=Ye(I("genetics.cancel"),!1,()=>{Pn=null,Qs(re.character),Je()});oe.id="blend-cancel",J.append(pe,oe),e.push(J)}e.push(Q("span","group-label",I("ui.history"))),e.push(Q("p","llm-note",I("ui.historyNote")));const Te=[...Ar].reverse().slice(0,20);for(const N of Te){const ie=Q("div","seed-row"),J=ft(N.seed),pe=N.name||(J==null?void 0:J.name)||I("ui.unnamed"),oe=new Date(N.at).toLocaleString(uy[Si()],{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),Ee=Ye(`${oe} · ${I(`history.${N.kind}`)} · ${pe}`,!1,()=>{const Ve=ft(N.seed);Ve&&(pn("restore",ut(Ve)),st(Ve),Dt(I("ui.historyRestored")))});if(Ee.classList.add("history-load"),ie.append(Ee),e.push(ie),N.kind==="blend"&&N.parents){const Ve=((n=ft(N.parents[0]))==null?void 0:n.name)||I("ui.unnamed"),ke=((s=ft(N.parents[1]))==null?void 0:s.name)||I("ui.unnamed");e.push(Q("p","llm-note",`${I("history.parents")}: ${Ve} × ${ke}`))}if(N.kind==="mutate"&&N.source){const Ve=((r=ft(N.source))==null?void 0:r.name)||I("ui.unnamed");e.push(Q("p","llm-note",`${I("history.source")}: ${Ve}`))}}e.push(Q("span","group-label",I("mutation.title"))),e.push(Q("p","llm-note",I("mutation.note")));const ze=Q("div","seed-row");for(const N of tc){const ie=Ye(I(`mutation.${N}`),Rr===N,()=>{Rr=N,Je()});ie.id=`mutation-strength-${N}`,ze.append(ie)}e.push(ze);const tt=Q("div","seed-row"),j=Ye(I("mutation.generate"),!1,Gh);if(j.id="mutation-generate",tt.append(j),e.push(tt),Bt){e.push(Q("span","group-label",I("mutation.candidates")));const N=Q("div","mutation-thumbs");if(Bt.list.forEach((ie,J)=>{const pe=Q("button","mutation-thumb");pe.type="button",pe.id=`mutation-candidate-${J}`,pe.setAttribute("aria-pressed",String(mn===J)),pe.setAttribute("aria-label",`${I("mutation.candidates")} ${J+1}`);const oe=Q("img");oe.src=Bt.thumbs[J],oe.alt="",pe.append(oe),pe.addEventListener("click",()=>FS(J)),N.append(pe)}),e.push(N),mn!==null){const ie=Q("div","seed-row"),J=Q("code","seed-value",ut(Uo(Bt.list[mn])));J.id="mutation-candidate-seed",ie.append(J),e.push(ie);const pe=Q("div","seed-row"),oe=Ye(I("mutation.apply"),!1,kS);oe.id="mutation-apply";const Ee=Ye(I("mutation.cancel"),!1,BS);Ee.id="mutation-cancel",pe.append(oe,Ee),e.push(pe)}}}else if(Qt==="tops"){for(const o of Li)e.push(Ye(I(t("top",o)),re.topStyle===o,()=>st({...re,topStyle:o})));e.push(Q("span","group-label",I("ui.color")));for(const o of Pi){const a=Q("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.topColor===o)),a.setAttribute("aria-label",`${I("ui.color")} ${o}`),a.addEventListener("click",()=>st({...re,topColor:o})),e.push(a)}}else if(Qt==="outer"){for(const o of cs)e.push(Ye(I(o==="none"?"item.none":t("outer",o)),re.outerStyle===o,()=>st({...re,outerStyle:o})));e.push(Q("span","group-label",I("ui.color")));for(const o of os){const a=Q("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.outerColor===o)),a.setAttribute("aria-label",`${I("ui.color")} ${o}`),a.addEventListener("click",()=>st({...re,outerColor:o})),e.push(a)}}else if(Qt==="bottoms"){for(const o of as)e.push(Ye(I(o==="none"?"item.none":t("bottom",o)),re.bottomStyle===o,()=>st({...re,bottomStyle:o})));Ho(re.topStyle)&&e.push(Q("span","group-label",I("ui.dressHidesBottom"))),e.push(Q("span","group-label",I("ui.color")));for(const o of ss){const a=Q("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.bottomColor===o)),a.setAttribute("aria-label",`${I("ui.color")} ${o}`),a.addEventListener("click",()=>st({...re,bottomColor:o})),e.push(a)}}else if(Qt==="shoes"){for(const o of ls)e.push(Ye(I(t("shoe",o)),re.shoeStyle===o,()=>st({...re,shoeStyle:o})));e.push(Q("span","group-label",I("ui.color")));for(const o of rs){const a=Q("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.shoeColor===o)),a.setAttribute("aria-label",`${I("ui.color")} ${o}`),a.addEventListener("click",()=>st({...re,shoeColor:o})),e.push(a)}}else if(Qt==="hat")for(const o of Di)e.push(Ye(I(o==="none"?"item.none":t("hat",o)),re.hat===o,()=>st({...re,hat:o})));else if(Qt==="glasses")for(const o of Ii)e.push(Ye(I(o==="none"?"item.none":t("glasses",o)),re.glasses===o,()=>st({...re,glasses:o})));else if(Qt==="accessory")for(const o of Ui)e.push(Ye(I(o==="none"?"item.none":t("accessory",o)),re.accessory===o,()=>st({...re,accessory:o})));else if(Qt==="pose")for(const o of Ni)e.push(Ye(I(t("pose",o)),re.pose===o,()=>st({...re,pose:o})));else if(Qt==="llm"){const o=Q("div","llm-block");o.append(Q("span","group-label",I("llm.settingsTitle")));const a=(g,y,P,B,O="text")=>{const H=Q("div","form-row"),$=Q("label","form-label",I(g));$.htmlFor=y;const X=Q("input","form-input");return X.id=y,X.type=O,X.value=P,X.placeholder=B,X.autocomplete="off",H.append($,X),H};o.append(a("llm.endpoint","llm-endpoint",Mi.endpoint,"http://localhost:11434/v1")),o.append(a("llm.apiKey","llm-apikey",Mi.apiKey,"","password")),o.append(a("llm.model","llm-model",Mi.model,"llama3.1"));const l=Q("div","chat-row"),c=Ye(I("llm.save"),!1,VS);c.id="llm-save";const u=Ye(I("llm.test"),!1,()=>void HS());u.id="llm-test",u.disabled=bi,l.append(c,u),Zi&&l.append(Q("span",`llm-status ${Zi.kind}`,Zi.text)),o.append(l),o.append(Q("p","llm-note",I("llm.note"))),o.append(Q("span","group-label",I("llm.chatTitle")));const d=Q("div","chat-log");d.id="llm-chat-log";for(const g of Xn){const y=Q("div",`chat-msg ${g.who}`),P=Q("span","who",g.who==="you"?I("llm.you"):g.who==="ai"?I("llm.ai"):">");y.append(P,document.createTextNode(g.text)),d.append(y)}if(bi){const g=Q("div","chat-msg sys");g.append(Q("span","who",">"),document.createTextNode(I("llm.thinking"))),d.append(g)}o.append(d);const f=Q("div","chat-row"),p=Q("input","form-input");p.id="llm-chat-input",p.type="text",p.placeholder=I("llm.chatPlaceholder"),p.setAttribute("aria-label",I("llm.chatTitle")),p.addEventListener("keydown",g=>{g.key==="Enter"&&Zu()});const _=Ye(I("llm.send"),!1,()=>void Zu());_.id="llm-send",_.disabled=bi,f.append(p,_),o.append(f),o.append(Q("span","group-label",I("sd.settingsTitle"))),o.append(a("sd.endpoint","sd-endpoint",Ei.endpoint,"http://localhost:7860")),o.append(a("sd.auth","sd-auth",Ei.apiKey,"","password"));const x=Q("div","chat-row"),m=Ye(I("llm.save"),!1,GS);m.id="sd-save";const h=Ye(I("llm.test"),!1,()=>void WS());if(h.id="sd-test",h.disabled=wi,x.append(m,h),En){const g=Q("span",`llm-status ${En.kind} sd-status`,En.text);x.append(g)}o.append(x),o.append(Q("p","llm-note",I("sd.note"))),o.append(Q("span","group-label",I("sd.promptTitle")));const b=Q("textarea","sd-prompt");b.id="sd-prompt-preview",b.readOnly=!0,b.value=Tr(re,{extra:Ji}).prompt,b.setAttribute("aria-label",I("sd.promptTitle")),o.append(b);const S=Q("div","form-row"),v=Q("label","form-label",I("sd.extraLabel"));v.htmlFor="sd-extra";const A=Q("input","form-input");A.id="sd-extra",A.type="text",A.value=Ji,A.placeholder=I("sd.extraPlaceholder"),A.autocomplete="off",A.addEventListener("input",()=>{Ji=A.value,b.value=Tr(re,{extra:Ji}).prompt}),S.append(v,A),o.append(S);const w=Q("div","chat-row"),T=Ye(I("sd.fromPhoto"),!1,()=>void Qu("img2img"));T.id="sd-gen-img2img",T.disabled=wi;const C=Ye(I("sd.fromText"),!1,()=>void Qu("txt2img"));if(C.id="sd-gen-txt2img",C.disabled=wi,w.append(T,C),o.append(w),wn){o.append(Q("span","group-label",I("sd.resultTitle")));const g=Q("img","sd-result-img");g.id="sd-result-img",g.src=wn.dataUrl,g.alt=I("sd.resultTitle"),o.append(g);const y=Q("div","chat-row"),P=Ye(I("sd.download"),!1,YS);P.id="sd-download";const B=Ye(I("sd.toCard"),!1,()=>void $S());B.id="sd-card",y.append(P,B),o.append(y)}e.push(o)}i.replaceChildren(...e)}let ed=0;function Dt(i){const e=document.getElementById("toast");e.textContent=i,e.hidden=!1,window.clearTimeout(ed),ed=window.setTimeout(()=>{e.hidden=!0},2e3)}const Ai=document.createElement("input");Ai.type="file";Ai.accept="image/png";Ai.hidden=!0;document.body.appendChild(Ai);Ai.addEventListener("change",()=>{var e;const i=(e=Ai.files)==null?void 0:e[0];Ai.value="",i&&$h(i)});async function Yh(i){const e=jy(i);if(!e)return!1;const t=ft(e);return t?(pn("restore",ut(t)),st(t),Ti=!0,Je(),!0):!1}async function $h(i){try{const e=await Yh(new Uint8Array(await i.arrayBuffer()));Dt(I(e?"ui.cardRestored":"ui.cardInvalid"))}catch{Dt(I("ui.cardInvalid"))}}window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",i=>{var t,n;i.preventDefault();const e=(n=(t=i.dataTransfer)==null?void 0:t.files)==null?void 0:n[0];e&&$h(e)});function jh(){document.getElementById("app-title").textContent=I("app.title"),document.getElementById("working-title").textContent=I("app.workingTitle"),document.getElementById("tagline").textContent=I("app.tagline"),document.getElementById("footer-note").textContent=I("footer.note"),document.getElementById("footer-principle").textContent=I("principle.note"),document.getElementById("btn-photo").textContent=I("ui.savePhoto"),document.getElementById("btn-random").textContent=I("ui.random"),document.getElementById("btn-spin").textContent=I("ui.spin"),document.getElementById("btn-reset-view").textContent=I("ui.resetView");const i=document.getElementById("lang-select");if(i.options.length===0)for(const e of Al){const t=document.createElement("option");t.value=e,t.textContent=cy[e],i.append(t)}i.value=Si(),document.title=`${I("app.title")}（${I("app.workingTitle")}）`}async function Kh(){we.renderer.render(we.scene,we.camera);const i=await uh(rn,{appName:I("app.title"),workingTitleNote:I("app.workingTitle"),tagline:I("app.tagline"),seed:ut(re),look:ns(re),name:re.name});Dr(i,"3d-fitting-room.png"),Dt(I("ui.saved"))}document.getElementById("btn-photo").addEventListener("click",()=>{Kh()});function Jh(i){return i==="vrm"?Gx(re):Hx(re)}function td(i){const{bytes:e}=Jh(i);Dr(new Blob([e.buffer],{type:"model/gltf-binary"}),`fitting-room-character.${i}`),Dt(I("ui.exported"))}document.getElementById("btn-random").addEventListener("click",()=>{st({...eh(),character:re.character,name:re.name})});const nd=document.getElementById("btn-spin");nd.addEventListener("click",()=>{we.controls.autoRotate=!we.controls.autoRotate,nd.setAttribute("aria-pressed",String(we.controls.autoRotate))});document.getElementById("btn-reset-view").addEventListener("click",()=>{we.resetView()});document.getElementById("lang-select").addEventListener("change",i=>{const e=i.target.value;nh(e),document.documentElement.lang=e;try{localStorage.setItem(Bh,e)}catch{}jh(),Yo(),Je(),Tt==null||Tt.refreshPanel(),qs()});window.addEventListener("resize",()=>we.resize());Ar.length===0&&pn("create",ut(re));jh();Yo();Je();const jS="fitting-room.looks.v1";function Zh(){try{const i=localStorage.getItem(jS);if(!i)return[];const e=JSON.parse(i);if(!Array.isArray(e))return[];const t=[];for(const n of e){if(typeof n!="object"||n===null)continue;const s=n;typeof s.id!="string"||!s.id||typeof s.name!="string"||!s.name.trim()||typeof s.look!="object"||s.look===null||t.push({id:s.id,name:s.name,look:s.look})}return t}catch{return[]}}function KS(i){const e=Zh().find(t=>t.id===i);e&&st({...re,...e.look})}const $i=600,qn=750,id=new ni($i,qn),fo=new Gt(40,$i/qn,.1,60);let Ll=!1;async function Qh(){const i=re.character.height;fo.position.set(0,i*.76,3.9),fo.lookAt(0,i*.54,0),fo.updateMatrixWorld();const e=we.renderer,t=e.xr.enabled;we.isPresenting()&&(e.xr.enabled=!1);const n=e.getRenderTarget();e.setRenderTarget(id),e.render(we.scene,fo);const s=new Uint8Array($i*qn*4);e.readRenderTargetPixels(id,0,0,$i,qn,s),e.setRenderTarget(n),we.isPresenting()&&(e.xr.enabled=t);const r=document.createElement("canvas");r.width=$i,r.height=qn;const o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");const a=o.createImageData($i,qn),l=$i*4;for(let u=0;u<qn;u++)a.data.set(s.subarray((qn-1-u)*l,(qn-u)*l),u*l);o.putImageData(a,0,0);const c=new Image;return await new Promise((u,d)=>{c.onload=()=>u(),c.onerror=()=>d(new Error("vr photo image could not be loaded")),c.src=r.toDataURL("image/png")}),dh(c,{appName:I("app.title"),workingTitleNote:I("app.workingTitle"),tagline:I("app.tagline"),seed:ut(re),look:ns(re),name:re.name})}async function ef(){try{const i=await Qh();Dr(i,"3d-fitting-room.png"),Dt(I("ui.saved"))}catch{Dt(I("vr.sessionError"))}}function JS(){we.isPresenting()?Ll=!0:ef()}Tt=Vy(we,{getOutfit:()=>re,applyPatch:i=>st({...re,...i}),getLooks:()=>Zh().map(i=>({id:i.id,name:i.name})),applyLook:KS,takePhoto:JS});let Fs="unknown",Cs=null;function qs(){const i=document.getElementById("btn-vr"),e=document.getElementById("vr-note");i&&(i.hidden=Fs!=="supported",i.textContent=we.isPresenting()?I("vr.exit"):I("vr.enter")),e&&(e.hidden=Fs!=="unsupported",Fs==="unsupported"&&(e.textContent=I("vr.unsupported")))}async function ZS(){let i=!1;if(navigator.xr)try{i=await navigator.xr.isSessionSupported("immersive-vr")}catch{i=!1}Fs=i?"supported":"unsupported",qs()}async function QS(){if(we.isPresenting()){try{await(Cs==null?void 0:Cs.end())}catch{}return}if(!navigator.xr||Fs!=="supported")return;const i=we.renderer.getPixelRatio();we.renderer.setPixelRatio(1),we.resize();let e=null;try{e=await navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor"]}),Cs=e,e.addEventListener("end",()=>{Cs=null,we.renderer.setPixelRatio(i),we.resize(),qs()}),await we.renderer.xr.setSession(e)}catch{if(e){try{await e.end()}catch{}Cs=null}we.renderer.setPixelRatio(i),we.resize(),Dt(I("vr.sessionError"))}qs()}document.getElementById("btn-vr").addEventListener("click",()=>{QS()});we.renderer.xr.addEventListener("sessionstart",qs);we.renderer.xr.addEventListener("sessionend",qs);ZS();const eM=new Ev,sd=new L;function tM(){const i=eM.getElapsedTime();we.camera.getWorldPosition(sd),si.tick(i,sd),we.tick(),Tt==null||Tt.update(),we.renderer.render(we.scene,we.camera),Ll&&(Ll=!1,ef())}we.renderer.setAnimationLoop(tM);"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").catch(()=>{});const nM={ready:!0,getOutfit:()=>({...re}),setOutfit:i=>st({...re,...i}),getSeed:()=>ut(re),setSeed:i=>{const e=ft(i);return e?(pn("restore",ut(e)),st(e),!0):!1},getRoster:()=>({entries:St.entries.map(i=>({...i})),currentId:St.currentId}),getLineage:()=>Ar.map(i=>({...i})),getLooks:()=>In.map(i=>({...i,look:{...i.look}})),getPrevLook:()=>ts?{...ts}:null,runCommands:i=>{const e=Array.isArray(i)?i:typeof i=="object"&&i!==null&&Array.isArray(i.commands)?i.commands:i,t=Th(e),n=Ah(t.commands,re);return Vh(t.commands,n.outfit),Hh(n),t.commands.some(s=>s.type!=="get_state")&&st(n.outfit),{applied:n.applied,rejected:t.rejected.map(s=>({reason:s.reason})),wantShareCard:n.wantShareCard,outfit:{...re}}},commandSpec:()=>Rh(),export3dInfo:i=>{const{bytes:e,parts:t,seed:n}=Jh(i);let s="";const r=32768;for(let o=0;o<e.length;o+=r)s+=String.fromCharCode(...e.subarray(o,o+r));return{dataUrl:`data:model/gltf-binary;base64,${btoa(s)}`,parts:t,bytes:e.length,seed:n}},getMutationState:()=>({candidateSeeds:Bt?Bt.list.map(i=>ut(Uo(i))):[],selectedSeed:Bt&&mn!==null?ut(Uo(Bt.list[mn])):null,restoredNotice:Ti,history:Ar.filter(i=>i.kind==="mutate")}),getSdState:()=>({configured:!!Ei.endpoint,prompt:Tr(re,{extra:Ji}).prompt,hasResult:wn!==null,resultSeed:(wn==null?void 0:wn.seed)??null}),sdCardDataURL:async()=>{const i=await qh();return i?new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)}):null},cardDataURL:async()=>{we.renderer.render(we.scene,we.camera);const i=await uh(rn,{appName:I("app.title"),workingTitleNote:I("app.workingTitle"),tagline:I("app.tagline"),seed:ut(re),look:ns(re),name:re.name});return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)})},applyCardDataURL:async i=>{const e=i.indexOf(",");if(e<0)return!1;try{const t=atob(i.slice(e+1)),n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return Yh(n)}catch{return!1}},focusFace:(i=0)=>{const e=new L;si.head.getWorldPosition(e);const t=.62,n=i*Math.PI/180;we.camera.position.set(e.x+Math.sin(n)*t,e.y+.01,e.z+Math.cos(n)*t),we.controls.target.copy(e),we.controls.update()},getVrState:()=>({support:Fs,presenting:we.isPresenting(),qualityLevel:we.xrQualityLevel(),panelButtons:Tt?Tt.panel.targets.length:0,panelActionIds:Tt?Tt.panel.targets.map(i=>String(i.userData.actionId??"")):[],playerPosition:[we.player.position.x,we.player.position.y,we.player.position.z],playerRotationY:we.player.rotation.y,lastAction:Tt!=null&&Tt.lastAction?mi(Tt.lastAction):null,panelNote:Tt?Tt.panel.noteText:null}),vrPress:i=>Tt?Tt.press(i):!1,vrPhotoDataURL:async()=>{const i=await Qh();return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)})},measureStageStats:()=>we.measureDrawCalls(),viewVrPanel:()=>{we.camera.position.set(.55,1.6,1.85),we.controls.target.set(-1.35,1.25,-.45),we.controls.update()}};window.__fittingRoom=nM;
