var uf=Object.defineProperty;var df=(i,e,t)=>e in i?uf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Fi=(i,e,t)=>df(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Nl="170",Us={ROTATE:0,DOLLY:1,PAN:2},Ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hf=0,gc=1,ff=2,cd=1,ud=2,Wn=3,Ri=0,$t=1,hn=2,vi=0,Ns=1,_c=2,vc=3,yc=4,pf=5,qi=100,mf=101,gf=102,_f=103,vf=104,yf=200,xf=201,Sf=202,Mf=203,ka=204,Ba=205,bf=206,Ef=207,wf=208,Tf=209,Af=210,Rf=211,Cf=212,Pf=213,Lf=214,za=0,Ha=1,Va=2,Bs=3,Ga=4,Wa=5,Xa=6,qa=7,dd=0,Df=1,If=2,yi=0,Uf=1,Nf=2,Of=3,hd=4,Ff=5,kf=6,Bf=7,fd=300,zs=301,Hs=302,Ya=303,$a=304,ko=306,Sr=1e3,ji=1001,ja=1002,Tn=1003,zf=1004,Fr=1005,Dn=1006,Zo=1007,Ki=1008,ti=1009,pd=1010,md=1011,Mr=1012,Ol=1013,Qi=1014,Jn=1015,js=1016,Fl=1017,kl=1018,Vs=1020,gd=35902,_d=1021,vd=1022,bn=1023,yd=1024,xd=1025,Os=1026,Gs=1027,Sd=1028,Bl=1029,Md=1030,zl=1031,Hl=1033,go=33776,_o=33777,vo=33778,yo=33779,Ka=35840,Ja=35841,Za=35842,Qa=35843,el=36196,tl=37492,nl=37496,il=37808,sl=37809,rl=37810,ol=37811,al=37812,ll=37813,cl=37814,ul=37815,dl=37816,hl=37817,fl=37818,pl=37819,ml=37820,gl=37821,xo=36492,_l=36494,vl=36495,bd=36283,yl=36284,xl=36285,Sl=36286,Hf=3200,Vf=3201,Ed=0,Gf=1,gi="",Ot="srgb",Ks="srgb-linear",Bo="linear",_t="srgb",fs=7680,xc=519,Wf=512,Xf=513,qf=514,wd=515,Yf=516,$f=517,jf=518,Kf=519,Sc=35044,Mc="300 es",Zn=2e3,To=2001;class is{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],So=Math.PI/180,Ao=180/Math.PI;function Lr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function Pt(i,e,t){return Math.max(e,Math.min(t,i))}function Jf(i,e){return(i%e+e)%e}function Qo(i,e,t){return(1-t)*i+t*e}function sr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Zf={DEG2RAD:So};class me{constructor(e=0,t=0){me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,s,r,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],S=s[4],v=s[7],A=s[2],w=s[5],T=s[8];return r[0]=o*x+a*b+l*A,r[3]=o*m+a*S+l*w,r[6]=o*p+a*v+l*T,r[1]=c*x+u*b+d*A,r[4]=c*m+u*S+d*w,r[7]=c*p+u*v+d*T,r[2]=f*x+h*b+g*A,r[5]=f*m+h*S+g*w,r[8]=f*p+h*v+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*r,h=c*r-o*l,g=t*d+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(s*c-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=h*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ea.makeScale(e,t)),this}rotate(e){return this.premultiply(ea.makeRotation(-e)),this}translate(e,t){return this.premultiply(ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Ke;function Td(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qf(){const i=Ro("canvas");return i.style.display="block",i}const bc={};function pr(i){i in bc||(bc[i]=!0,console.warn(i))}function ep(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function tp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function np(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const at={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===_t&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===_t&&(i.r=Fs(i.r),i.g=Fs(i.g),i.b=Fs(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===gi?Bo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ec=[.64,.33,.3,.6,.15,.06],wc=[.2126,.7152,.0722],Tc=[.3127,.329],Ac=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rc=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);at.define({[Ks]:{primaries:Ec,whitePoint:Tc,transfer:Bo,toXYZ:Ac,fromXYZ:Rc,luminanceCoefficients:wc,workingColorSpaceConfig:{unpackColorSpace:Ot},outputColorSpaceConfig:{drawingBufferColorSpace:Ot}},[Ot]:{primaries:Ec,whitePoint:Tc,transfer:_t,toXYZ:Ac,fromXYZ:Rc,luminanceCoefficients:wc,outputColorSpaceConfig:{drawingBufferColorSpace:Ot}}});let ps;class ip{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ps===void 0&&(ps=Ro("canvas")),ps.width=e.width,ps.height=e.height;const n=ps.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ro("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ei(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sp=0;class Ad{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Lr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ta(s[o].image)):r.push(ta(s[o]))}else r=ta(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ta(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ip.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rp=0;class jt extends is{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,n=ji,s=ji,r=Dn,o=Ki,a=bn,l=ti,c=jt.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Lr(),this.name="",this.source=new Ad(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sr:e.x=e.x-Math.floor(e.x);break;case ji:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sr:e.y=e.y-Math.floor(e.y);break;case ji:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=fd;jt.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,s=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(h+1)/2,A=(p+1)/2,w=(u+f)/4,T=(d+x)/4,C=(g+m)/4;return S>v&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=T/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=C/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=T/r,s=C/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-x)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class op extends is{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new jt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ad(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends op{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rd extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ap extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class es{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const f=r[o+0],h=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==f||c!==h||u!==g){let m=1-a;const p=l*f+c*h+u*g+d*x,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const A=Math.sqrt(S),w=Math.atan2(A,p*b);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const v=a*b;if(l=l*m+f*v,c=c*m+h*v,u=u*m+g*v,d=d*m+x*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],f=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-a*h,e[t+2]=c*g+u*h+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),f=l(n/2),h=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return na.copy(this).projectOnVector(e),this.sub(na)}reflect(e){return this.sub(na.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new L,Cc=new es;class Dr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),kr.copy(n.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Br.subVectors(this.max,rr),ms.subVectors(e.a,rr),gs.subVectors(e.b,rr),_s.subVectors(e.c,rr),ai.subVectors(gs,ms),li.subVectors(_s,gs),ki.subVectors(ms,_s);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-ki.z,ki.y,ai.z,0,-ai.x,li.z,0,-li.x,ki.z,0,-ki.x,-ai.y,ai.x,0,-li.y,li.x,0,-ki.y,ki.x,0];return!ia(t,ms,gs,_s,Br)||(t=[1,0,0,0,1,0,0,0,1],!ia(t,ms,gs,_s,Br))?!1:(zr.crossVectors(ai,li),t=[zr.x,zr.y,zr.z],ia(t,ms,gs,_s,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new L,new L,new L,new L,new L,new L,new L,new L],vn=new L,kr=new Dr,ms=new L,gs=new L,_s=new L,ai=new L,li=new L,ki=new L,rr=new L,Br=new L,zr=new L,Bi=new L;function ia(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bi.fromArray(i,r);const a=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),u=n.dot(Bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const lp=new Dr,or=new L,sa=new L;class zo{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);const t=or.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(or,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(sa)),this.expandByPoint(or.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new L,ra=new L,Hr=new L,ci=new L,oa=new L,Vr=new L,aa=new L;class Ho{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ra.copy(e).add(t).multiplyScalar(.5),Hr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(ra);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Hr),a=ci.dot(this.direction),l=-ci.dot(Hr),c=ci.lengthSq(),u=Math.abs(1-o*o);let d,f,h,g;if(u>0)if(d=o*l-a,f=o*a-l,g=r*u,d>=0)if(f>=-g)if(f<=g){const x=1/u;d*=x,f*=x,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ra).addScaledVector(Hr,f),h}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,s,r){oa.subVectors(t,e),Vr.subVectors(n,e),aa.crossVectors(oa,Vr);let o=this.direction.dot(aa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);const l=a*this.direction.dot(Vr.crossVectors(ci,Vr));if(l<0)return null;const c=a*this.direction.dot(oa.cross(ci));if(c<0||l+c>o)return null;const u=-a*ci.dot(aa);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,n,s,r,o,a,l,c,u,d,f,h,g,x,m){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,d,f,h,g,x,m)}set(e,t,n,s,r,o,a,l,c,u,d,f,h,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,h=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,g=c*u,x=c*d;t[0]=f+x*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,g=c*u,x=c*d;t[0]=f-x*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-x*d}else if(e.order==="XZY"){const f=o*l,h=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+x,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cp,e,up)}lookAt(e,t,n){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ui.crossVectors(n,tn),ui.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ui.crossVectors(n,tn)),ui.normalize(),Gr.crossVectors(tn,ui),s[0]=ui.x,s[4]=Gr.x,s[8]=tn.x,s[1]=ui.y,s[5]=Gr.y,s[9]=tn.y,s[2]=ui.z,s[6]=Gr.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],A=n[15],w=s[0],T=s[4],C=s[8],_=s[12],y=s[1],P=s[5],H=s[9],U=s[13],q=s[2],j=s[6],W=s[10],Z=s[14],G=s[3],de=s[7],_e=s[11],Te=s[15];return r[0]=o*w+a*y+l*q+c*G,r[4]=o*T+a*P+l*j+c*de,r[8]=o*C+a*H+l*W+c*_e,r[12]=o*_+a*U+l*Z+c*Te,r[1]=u*w+d*y+f*q+h*G,r[5]=u*T+d*P+f*j+h*de,r[9]=u*C+d*H+f*W+h*_e,r[13]=u*_+d*U+f*Z+h*Te,r[2]=g*w+x*y+m*q+p*G,r[6]=g*T+x*P+m*j+p*de,r[10]=g*C+x*H+m*W+p*_e,r[14]=g*_+x*U+m*Z+p*Te,r[3]=b*w+S*y+v*q+A*G,r[7]=b*T+S*P+v*j+A*de,r[11]=b*C+S*H+v*W+A*_e,r[15]=b*_+S*U+v*Z+A*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*a*f+n*c*f+s*a*h-n*l*h)+x*(+t*l*h-t*c*f+r*o*f-s*o*h+s*c*u-r*l*u)+m*(+t*c*d-t*a*h-r*o*d+n*o*h+r*a*u-n*c*u)+p*(-s*a*u-t*l*d+t*a*f+s*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],x=e[13],m=e[14],p=e[15],b=d*m*c-x*f*c+x*l*h-a*m*h-d*l*p+a*f*p,S=g*f*c-u*m*c-g*l*h+o*m*h+u*l*p-o*f*p,v=u*x*c-g*d*c+g*a*h-o*x*h-u*a*p+o*d*p,A=g*d*l-u*x*l-g*a*f+o*x*f+u*a*m-o*d*m,w=t*b+n*S+s*v+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=b*T,e[1]=(x*f*r-d*m*r-x*s*h+n*m*h+d*s*p-n*f*p)*T,e[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*p+n*l*p)*T,e[3]=(d*l*r-a*f*r-d*s*c+n*f*c+a*s*h-n*l*h)*T,e[4]=S*T,e[5]=(u*m*r-g*f*r+g*s*h-t*m*h-u*s*p+t*f*p)*T,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*T,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*h+t*l*h)*T,e[8]=v*T,e[9]=(g*d*r-u*x*r-g*n*h+t*x*h+u*n*p-t*d*p)*T,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*p+t*a*p)*T,e[11]=(u*a*r-o*d*r-u*n*c+t*d*c+o*n*h-t*a*h)*T,e[12]=A*T,e[13]=(u*x*s-g*d*s+g*n*f-t*x*f-u*n*m+t*d*m)*T,e[14]=(g*a*s-o*x*s-g*n*l+t*x*l+o*n*m-t*a*m)*T,e[15]=(o*d*s-u*a*s+u*n*l-t*d*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,f=r*c,h=r*u,g=r*d,x=o*u,m=o*d,p=a*d,b=l*c,S=l*u,v=l*d,A=n.x,w=n.y,T=n.z;return s[0]=(1-(x+p))*A,s[1]=(h+v)*A,s[2]=(g-S)*A,s[3]=0,s[4]=(h-v)*w,s[5]=(1-(f+p))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(g+S)*T,s[9]=(m-b)*T,s[10]=(1-(f+x))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=vs.set(s[0],s[1],s[2]).length();const o=vs.set(s[4],s[5],s[6]).length(),a=vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);const c=1/r,u=1/o,d=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Zn){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let h,g;if(a===Zn)h=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===To)h=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Zn){const l=this.elements,c=1/(t-e),u=1/(n-s),d=1/(o-r),f=(t+e)*c,h=(n+s)*u;let g,x;if(a===Zn)g=(o+r)*d,x=-2*d;else if(a===To)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vs=new L,yn=new ut,cp=new L(0,0,0),up=new L(1,1,1),ui=new L,Gr=new L,tn=new L,Pc=new ut,Lc=new es;class Un{constructor(e=0,t=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lc.setFromEuler(this),this.setFromQuaternion(Lc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class Vl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dp=0;const Dc=new L,ys=new es,zn=new ut,Wr=new L,ar=new L,hp=new L,fp=new es,Ic=new L(1,0,0),Uc=new L(0,1,0),Nc=new L(0,0,1),Oc={type:"added"},pp={type:"removed"},xs={type:"childadded",child:null},la={type:"childremoved",child:null};class Rt extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new L,t=new Un,n=new es,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new Ke}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Ic,e)}rotateY(e){return this.rotateOnAxis(Uc,e)}rotateZ(e){return this.rotateOnAxis(Nc,e)}translateOnAxis(e,t){return Dc.copy(e).applyQuaternion(this.quaternion),this.position.add(Dc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ic,e)}translateY(e){return this.translateOnAxis(Uc,e)}translateZ(e){return this.translateOnAxis(Nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wr.copy(e):Wr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(ar,Wr,this.up):zn.lookAt(Wr,ar,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(zn),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Oc),xs.child=e,this.dispatchEvent(xs),xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pp),la.child=e,this.dispatchEvent(la),la.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Oc),xs.child=e,this.dispatchEvent(xs),xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,hp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,fp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Rt.DEFAULT_UP=new L(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new L,Hn=new L,ca=new L,Vn=new L,Ss=new L,Ms=new L,Fc=new L,ua=new L,da=new L,ha=new L,fa=new pt,pa=new pt,ma=new pt;class Mn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Hn.subVectors(n,t),ca.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(Hn),l=xn.dot(ca),c=Hn.dot(Hn),u=Hn.dot(ca),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Vn.x),l.addScaledVector(o,Vn.y),l.addScaledVector(a,Vn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return fa.setScalar(0),pa.setScalar(0),ma.setScalar(0),fa.fromBufferAttribute(e,t),pa.fromBufferAttribute(e,n),ma.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(fa,r.x),o.addScaledVector(pa,r.y),o.addScaledVector(ma,r.z),o}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Hn.subVectors(e,t),xn.cross(Hn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),xn.cross(Hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ss.subVectors(s,n),Ms.subVectors(r,n),ua.subVectors(e,n);const l=Ss.dot(ua),c=Ms.dot(ua);if(l<=0&&c<=0)return t.copy(n);da.subVectors(e,s);const u=Ss.dot(da),d=Ms.dot(da);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ss,o);ha.subVectors(e,r);const h=Ss.dot(ha),g=Ms.dot(ha);if(g>=0&&h<=g)return t.copy(r);const x=h*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ms,a);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Fc.subVectors(r,s),a=(d-u)/(d-u+(h-g)),t.copy(s).addScaledVector(Fc,a);const p=1/(m+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(Ss,o).addScaledVector(Ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function ga(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class tt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=at.workingColorSpace){if(e=Jf(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ga(o,r,e+1/3),this.g=ga(o,r,e),this.b=ga(o,r,e-1/3)}return at.toWorkingColorSpace(this,s),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=Cd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return at.fromWorkingColorSpace(Gt.copy(this),e),Math.round(Pt(Gt.r*255,0,255))*65536+Math.round(Pt(Gt.g*255,0,255))*256+Math.round(Pt(Gt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Gt.copy(this),t);const n=Gt.r,s=Gt.g,r=Gt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Ot){at.fromWorkingColorSpace(Gt.copy(this),e);const t=Gt.r,n=Gt.g,s=Gt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(di),this.setHSL(di.h+e,di.s+t,di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(Xr);const n=Qo(di.h,Xr.h,t),s=Qo(di.s,Xr.s,t),r=Qo(di.l,Xr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new tt;tt.NAMES=Cd;let mp=0;class Js extends is{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=Lr(),this.name="",this.blending=Ns,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Ba,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Ba&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qn extends Js{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=dd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new L,qr=new me;class An{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Sc,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sc&&(e.usage=this.usage),e}}class Pd extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ld extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gp=0;const ln=new ut,_a=new Rt,bs=new L,nn=new Dr,lr=new Dr,Ut=new L;class Bt extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Td(e)?Ld:Pd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return _a.lookAt(e),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(nn.min,lr.min),nn.expandByPoint(Ut),Ut.addVectors(nn.max,lr.max),nn.expandByPoint(Ut)):(nn.expandByPoint(lr.min),nn.expandByPoint(lr.max))}nn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ut.fromBufferAttribute(a,c),l&&(bs.fromBufferAttribute(e,c),Ut.add(bs)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new L,l[C]=new L;const c=new L,u=new L,d=new L,f=new me,h=new me,g=new me,x=new L,m=new L;function p(C,_,y){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,_),d.fromBufferAttribute(n,y),f.fromBufferAttribute(r,C),h.fromBufferAttribute(r,_),g.fromBufferAttribute(r,y),u.sub(c),d.sub(c),h.sub(f),g.sub(f);const P=1/(h.x*g.y-g.x*h.y);isFinite(P)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(P),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(P),a[C].add(x),a[_].add(x),a[y].add(x),l[C].add(m),l[_].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let C=0,_=b.length;C<_;++C){const y=b[C],P=y.start,H=y.count;for(let U=P,q=P+H;U<q;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const S=new L,v=new L,A=new L,w=new L;function T(C){A.fromBufferAttribute(s,C),w.copy(A);const _=a[C];S.copy(_),S.sub(A.multiplyScalar(A.dot(_))).normalize(),v.crossVectors(w,_);const P=v.dot(l[C])<0?-1:1;o.setXYZW(C,S.x,S.y,S.z,P)}for(let C=0,_=b.length;C<_;++C){const y=b[C],P=y.start,H=y.count;for(let U=P,q=P+H;U<q;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?h=l[x]*a.data.stride+a.offset:h=l[x]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new An(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kc=new ut,zi=new Ho,Yr=new zo,Bc=new L,$r=new L,jr=new L,Kr=new L,va=new L,Jr=new L,zc=new L,Zr=new L;class ke extends Rt{constructor(e=new Bt,t=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(va.fromBufferAttribute(d,e),o?Jr.addScaledVector(va,u):Jr.addScaledVector(va.sub(t),u))}t.add(Jr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Yr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Yr,Bc)===null||zi.origin.distanceToSquared(Bc)>(e.far-e.near)**2))&&(kc.copy(r).invert(),zi.copy(e.ray).applyMatrix4(kc),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,A=S;v<A;v+=3){const w=a.getX(v),T=a.getX(v+1),C=a.getX(v+2);s=Qr(this,p,e,n,c,u,d,w,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let m=g,p=x;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=Qr(this,o,e,n,c,u,d,b,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,A=S;v<A;v+=3){const w=v,T=v+1,C=v+2;s=Qr(this,p,e,n,c,u,d,w,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let m=g,p=x;m<p;m+=3){const b=m,S=m+1,v=m+2;s=Qr(this,o,e,n,c,u,d,b,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function _p(i,e,t,n,s,r,o,a){let l;if(e.side===$t?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Ri,a),l===null)return null;Zr.copy(a),Zr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Zr);return c<t.near||c>t.far?null:{distance:c,point:Zr.clone(),object:i}}function Qr(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,$r),i.getVertexPosition(l,jr),i.getVertexPosition(c,Kr);const u=_p(i,e,t,n,$r,jr,Kr,zc);if(u){const d=new L;Mn.getBarycoord(zc,$r,jr,Kr,d),s&&(u.uv=Mn.getInterpolatedAttribute(s,a,l,c,d,new me)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,a,l,c,d,new me)),o&&(u.normal=Mn.getInterpolatedAttribute(o,a,l,c,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};Mn.getNormal($r,jr,Kr,f.normal),u.face=f,u.barycoord=d}return u}class $e extends Bt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(d,2));function g(x,m,p,b,S,v,A,w,T,C,_){const y=v/T,P=A/C,H=v/2,U=A/2,q=w/2,j=T+1,W=C+1;let Z=0,G=0;const de=new L;for(let _e=0;_e<W;_e++){const Te=_e*P-U;for(let Ue=0;Ue<j;Ue++){const Ze=Ue*y-H;de[x]=Ze*b,de[m]=Te*S,de[p]=q,c.push(de.x,de.y,de.z),de[x]=0,de[m]=0,de[p]=w>0?1:-1,u.push(de.x,de.y,de.z),d.push(Ue/T),d.push(1-_e/C),Z+=1}}for(let _e=0;_e<C;_e++)for(let Te=0;Te<T;Te++){const Ue=f+Te+j*_e,Ze=f+Te+j*(_e+1),J=f+(Te+1)+j*(_e+1),F=f+(Te+1)+j*_e;l.push(Ue,Ze,F),l.push(Ze,J,F),G+=6}a.addGroup(h,G,_),h+=G,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ws(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){const e={};for(let t=0;t<i.length;t++){const n=Ws(i[t]);for(const s in n)e[s]=n[s]}return e}function vp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Dd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Id={clone:Ws,merge:Yt};var yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends Js{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yp,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=vp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ud extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new L,Hc=new me,Vc=new me;class Wt extends Ud{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Hc,Vc),t.subVectors(Vc,Hc)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(So*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Es=-90,ws=1;class Sp extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(Es,ws,e,t);s.layers=this.layers,this.add(s);const r=new Wt(Es,ws,e,t);r.layers=this.layers,this.add(r);const o=new Wt(Es,ws,e,t);o.layers=this.layers,this.add(o);const a=new Wt(Es,ws,e,t);a.layers=this.layers,this.add(a);const l=new Wt(Es,ws,e,t);l.layers=this.layers,this.add(l);const c=new Wt(Es,ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===To)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nd extends jt{constructor(e,t,n,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:zs,super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mp extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Nd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $e(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:vi});r.uniforms.tEquirect.value=t;const o=new ke(s,r),a=t.minFilter;return t.minFilter===Ki&&(t.minFilter=Dn),new Sp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ya=new L,bp=new L,Ep=new Ke;class Yn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ya.subVectors(n,t).cross(bp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ya),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ep.getNormalMatrix(e),s=this.coplanarPoint(ya).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new zo,eo=new L;class Gl{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,o=new Yn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],f=s[7],h=s[8],g=s[9],x=s[10],m=s[11],p=s[12],b=s[13],S=s[14],v=s[15];if(n[0].setComponents(l-r,f-c,m-h,v-p).normalize(),n[1].setComponents(l+r,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+g,v+b).normalize(),n[3].setComponents(l-o,f-u,m-g,v-b).normalize(),n[4].setComponents(l-a,f-d,m-x,v-S).normalize(),t===Zn)n[5].setComponents(l+a,f+d,m+x,v+S).normalize();else if(t===To)n[5].setComponents(a,d,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(eo.x=s.normal.x>0?e.max.x:e.min.x,eo.y=s.normal.y>0?e.max.y:e.min.y,eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(eo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Od(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function wp(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],x=d[h];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const x=d[h];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ft extends Bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=e/a,f=t/l,h=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const b=p*f-o;for(let S=0;S<c;S++){const v=S*d-r;g.push(v,-b,0),x.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const S=b+c*p,v=b+c*(p+1),A=b+1+c*(p+1),w=b+1+c*p;h.push(S,v,w),h.push(v,A,w)}this.setIndex(h),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.width,e.height,e.widthSegments,e.heightSegments)}}var Tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
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
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
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
#endif`,Ip=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
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
#endif`,Np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Op=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bp=`#ifdef USE_IRIDESCENCE
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
#endif`,zp=`#ifdef USE_BUMPMAP
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$p=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jp=`#define PI 3.141592653589793
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
} // validated`,Kp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jp=`vec3 transformedNormal = objectNormal;
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
#endif`,Zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
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
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,om=`#ifdef USE_ENVMAP
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
#endif`,am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
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
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_m=`uniform bool receiveShadow;
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
#endif`,vm=`#ifdef USE_ENVMAP
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
#endif`,ym=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
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
#endif`,Em=`struct PhysicalMaterial {
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
}`,wm=`
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
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nm=`#if defined( USE_POINTS_UV )
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
#endif`,Om=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,km=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`#ifdef USE_MORPHTARGETS
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
#endif`,Vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$m=`#ifdef USE_NORMALMAP
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
#endif`,jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Km=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ng=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ig=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ug=`float getShadowMask() {
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
}`,dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hg=`#ifdef USE_SKINNING
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
#endif`,fg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pg=`#ifdef USE_SKINNING
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
#endif`,mg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yg=`#ifdef USE_TRANSMISSION
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
#endif`,xg=`#ifdef USE_TRANSMISSION
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
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Eg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tg=`uniform sampler2D t2D;
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lg=`#include <common>
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
}`,Dg=`#if DEPTH_PACKING == 3200
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
}`,Ig=`#define DISTANCE
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
}`,Ug=`#define DISTANCE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Og=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`uniform float scale;
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
}`,kg=`uniform vec3 diffuse;
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
}`,Bg=`#include <common>
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
}`,zg=`uniform vec3 diffuse;
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
}`,Hg=`#define LAMBERT
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
}`,Vg=`#define LAMBERT
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
}`,Gg=`#define MATCAP
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
}`,Wg=`#define MATCAP
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
}`,Xg=`#define NORMAL
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
}`,qg=`#define NORMAL
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
}`,Yg=`#define PHONG
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
}`,$g=`#define PHONG
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
}`,jg=`#define STANDARD
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
}`,Kg=`#define STANDARD
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
}`,Jg=`#define TOON
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
}`,Zg=`#define TOON
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
}`,Qg=`uniform float size;
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
}`,e0=`uniform vec3 diffuse;
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
}`,t0=`#include <common>
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
}`,n0=`uniform vec3 color;
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
}`,i0=`uniform float rotation;
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
}`,s0=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:Tp,alphahash_pars_fragment:Ap,alphamap_fragment:Rp,alphamap_pars_fragment:Cp,alphatest_fragment:Pp,alphatest_pars_fragment:Lp,aomap_fragment:Dp,aomap_pars_fragment:Ip,batching_pars_vertex:Up,batching_vertex:Np,begin_vertex:Op,beginnormal_vertex:Fp,bsdfs:kp,iridescence_fragment:Bp,bumpmap_pars_fragment:zp,clipping_planes_fragment:Hp,clipping_planes_pars_fragment:Vp,clipping_planes_pars_vertex:Gp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:$p,common:jp,cube_uv_reflection_fragment:Kp,defaultnormal_vertex:Jp,displacementmap_pars_vertex:Zp,displacementmap_vertex:Qp,emissivemap_fragment:em,emissivemap_pars_fragment:tm,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:sm,envmap_common_pars_fragment:rm,envmap_pars_fragment:om,envmap_pars_vertex:am,envmap_physical_pars_fragment:vm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:um,fog_fragment:dm,fog_pars_fragment:hm,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:_m,lights_toon_fragment:ym,lights_toon_pars_fragment:xm,lights_phong_fragment:Sm,lights_phong_pars_fragment:Mm,lights_physical_fragment:bm,lights_physical_pars_fragment:Em,lights_fragment_begin:wm,lights_fragment_maps:Tm,lights_fragment_end:Am,logdepthbuf_fragment:Rm,logdepthbuf_pars_fragment:Cm,logdepthbuf_pars_vertex:Pm,logdepthbuf_vertex:Lm,map_fragment:Dm,map_pars_fragment:Im,map_particle_fragment:Um,map_particle_pars_fragment:Nm,metalnessmap_fragment:Om,metalnessmap_pars_fragment:Fm,morphinstance_vertex:km,morphcolor_vertex:Bm,morphnormal_vertex:zm,morphtarget_pars_vertex:Hm,morphtarget_vertex:Vm,normal_fragment_begin:Gm,normal_fragment_maps:Wm,normal_pars_fragment:Xm,normal_pars_vertex:qm,normal_vertex:Ym,normalmap_pars_fragment:$m,clearcoat_normal_fragment_begin:jm,clearcoat_normal_fragment_maps:Km,clearcoat_pars_fragment:Jm,iridescence_pars_fragment:Zm,opaque_fragment:Qm,packing:eg,premultiplied_alpha_fragment:tg,project_vertex:ng,dithering_fragment:ig,dithering_pars_fragment:sg,roughnessmap_fragment:rg,roughnessmap_pars_fragment:og,shadowmap_pars_fragment:ag,shadowmap_pars_vertex:lg,shadowmap_vertex:cg,shadowmask_pars_fragment:ug,skinbase_vertex:dg,skinning_pars_vertex:hg,skinning_vertex:fg,skinnormal_vertex:pg,specularmap_fragment:mg,specularmap_pars_fragment:gg,tonemapping_fragment:_g,tonemapping_pars_fragment:vg,transmission_fragment:yg,transmission_pars_fragment:xg,uv_pars_fragment:Sg,uv_pars_vertex:Mg,uv_vertex:bg,worldpos_vertex:Eg,background_vert:wg,background_frag:Tg,backgroundCube_vert:Ag,backgroundCube_frag:Rg,cube_vert:Cg,cube_frag:Pg,depth_vert:Lg,depth_frag:Dg,distanceRGBA_vert:Ig,distanceRGBA_frag:Ug,equirect_vert:Ng,equirect_frag:Og,linedashed_vert:Fg,linedashed_frag:kg,meshbasic_vert:Bg,meshbasic_frag:zg,meshlambert_vert:Hg,meshlambert_frag:Vg,meshmatcap_vert:Gg,meshmatcap_frag:Wg,meshnormal_vert:Xg,meshnormal_frag:qg,meshphong_vert:Yg,meshphong_frag:$g,meshphysical_vert:jg,meshphysical_frag:Kg,meshtoon_vert:Jg,meshtoon_frag:Zg,points_vert:Qg,points_frag:e0,shadow_vert:t0,shadow_frag:n0,sprite_vert:i0,sprite_frag:s0},ye={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Pn={basic:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new tt(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Yt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Yt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new tt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Yt([ye.points,ye.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Yt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Yt([ye.common,ye.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Yt([ye.sprite,ye.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:Yt([ye.common,ye.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:Yt([ye.lights,ye.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Pn.physical={uniforms:Yt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const to={r:0,b:0,g:0},Vi=new Un,r0=new ut;function o0(i,e,t,n,s,r,o){const a=new tt(0);let l=r===!0?0:1,c,u,d=null,f=0,h=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?t:e).get(S)),S}function x(b){let S=!1;const v=g(b);v===null?p(a,l):v&&v.isColor&&(p(v,1),S=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===ko)?(u===void 0&&(u=new ke(new $e(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:Ws(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Vi.copy(S.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(r0.makeRotationFromEuler(Vi)),u.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,(d!==v||f!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ke(new Ft(2,2),new ii({name:"BackgroundMaterial",uniforms:Ws(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,S){b.getRGB(to,Dd(i)),n.buffers.color.setClear(to.r,to.g,to.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:x,addToRenderList:m}}function a0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,P,H,U,q){let j=!1;const W=d(U,H,P);r!==W&&(r=W,c(r.object)),j=h(y,U,H,q),j&&g(y,U,H,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(y,P,H,U),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,P,H){const U=H.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let j=q[P.id];j===void 0&&(j={},q[P.id]=j);let W=j[U];return W===void 0&&(W=f(l()),j[U]=W),W}function f(y){const P=[],H=[],U=[];for(let q=0;q<t;q++)P[q]=0,H[q]=0,U[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:U,object:y,attributes:{},index:null}}function h(y,P,H,U){const q=r.attributes,j=P.attributes;let W=0;const Z=H.getAttributes();for(const G in Z)if(Z[G].location>=0){const _e=q[G];let Te=j[G];if(Te===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(Te=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(Te=y.instanceColor)),_e===void 0||_e.attribute!==Te||Te&&_e.data!==Te.data)return!0;W++}return r.attributesNum!==W||r.index!==U}function g(y,P,H,U){const q={},j=P.attributes;let W=0;const Z=H.getAttributes();for(const G in Z)if(Z[G].location>=0){let _e=j[G];_e===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(_e=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(_e=y.instanceColor));const Te={};Te.attribute=_e,_e&&_e.data&&(Te.data=_e.data),q[G]=Te,W++}r.attributes=q,r.attributesNum=W,r.index=U}function x(){const y=r.newAttributes;for(let P=0,H=y.length;P<H;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const H=r.newAttributes,U=r.enabledAttributes,q=r.attributeDivisors;H[y]=1,U[y]===0&&(i.enableVertexAttribArray(y),U[y]=1),q[y]!==P&&(i.vertexAttribDivisor(y,P),q[y]=P)}function b(){const y=r.newAttributes,P=r.enabledAttributes;for(let H=0,U=P.length;H<U;H++)P[H]!==y[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function S(y,P,H,U,q,j,W){W===!0?i.vertexAttribIPointer(y,P,H,q,j):i.vertexAttribPointer(y,P,H,U,q,j)}function v(y,P,H,U){x();const q=U.attributes,j=H.getAttributes(),W=P.defaultAttributeValues;for(const Z in j){const G=j[Z];if(G.location>=0){let de=q[Z];if(de===void 0&&(Z==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),Z==="instanceColor"&&y.instanceColor&&(de=y.instanceColor)),de!==void 0){const _e=de.normalized,Te=de.itemSize,Ue=e.get(de);if(Ue===void 0)continue;const Ze=Ue.buffer,J=Ue.type,F=Ue.bytesPerElement,se=J===i.INT||J===i.UNSIGNED_INT||de.gpuType===Ol;if(de.isInterleavedBufferAttribute){const K=de.data,pe=K.stride,ue=de.offset;if(K.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)p(G.location+Ee,K.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)m(G.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let Ee=0;Ee<G.locationSize;Ee++)S(G.location+Ee,Te/G.locationSize,J,_e,pe*F,(ue+Te/G.locationSize*Ee)*F,se)}else{if(de.isInstancedBufferAttribute){for(let K=0;K<G.locationSize;K++)p(G.location+K,de.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let K=0;K<G.locationSize;K++)m(G.location+K);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let K=0;K<G.locationSize;K++)S(G.location+K,Te/G.locationSize,J,_e,Te*F,Te/G.locationSize*K*F,se)}}else if(W!==void 0){const _e=W[Z];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(G.location,_e);break;case 3:i.vertexAttrib3fv(G.location,_e);break;case 4:i.vertexAttrib4fv(G.location,_e);break;default:i.vertexAttrib1fv(G.location,_e)}}}}b()}function A(){C();for(const y in n){const P=n[y];for(const H in P){const U=P[H];for(const q in U)u(U[q].object),delete U[q];delete P[H]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const H in P){const U=P[H];for(const q in U)u(U[q].object),delete U[q];delete P[H]}delete n[y.id]}function T(y){for(const P in n){const H=n[P];if(H[y.id]===void 0)continue;const U=H[y.id];for(const q in U)u(U[q].object),delete U[q];delete H[y.id]}}function C(){_(),o=!0,r!==s&&(r=s,c(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:_,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function l0(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function c0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==bn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===js&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ti&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Jn&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:A,maxSamples:w}}function u0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Yn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const b=r?0:n,S=b*4;let v=p.clippingState||null;l.value=v,v=u(g,f,S,h);for(let A=0;A!==S;++A)v[A]=t[A];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=h+x*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=h;S!==x;++S,v+=4)o.copy(d[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function d0(i){let e=new WeakMap;function t(o,a){return a===Ya?o.mapping=zs:a===$a&&(o.mapping=Hs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ya||a===$a)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Mp(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Fd extends Ud{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ds=4,Gc=[.125,.215,.35,.446,.526,.582],Yi=20,xa=new Fd,Wc=new tt;let Sa=null,Ma=0,ba=0,Ea=!1;const Xi=(1+Math.sqrt(5))/2,Ts=1/Xi,Xc=[new L(-Xi,Ts,0),new L(Xi,Ts,0),new L(-Ts,0,Xi),new L(Ts,0,Xi),new L(0,Xi,-Ts),new L(0,Xi,Ts),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Ml{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sa,Ma,ba),this._renderer.xr.enabled=Ea,e.scissorTest=!1,no(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zs||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sa=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:js,format:bn,colorSpace:Ks,depthBuffer:!1},s=qc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=h0(r)),this._blurMaterial=f0(r,e,t)}return s}_compileMaterial(e){const t=new ke(this._lodPlanes[0],e);this._renderer.compile(t,xa)}_sceneToCubeUV(e,t,n,s){const a=new Wt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Wc),u.toneMapping=yi,u.autoClear=!1;const h=new Qn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),g=new ke(new $e,h);let x=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,x=!0):(h.color.copy(Wc),x=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const S=this._cubeSize;no(s,b*S,p>2?S:0,S,S),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===zs||e.mapping===Hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ke(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;no(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,xa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Xc[(s-r-1)%Xc.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ke(this._lodPlanes[s],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Yi-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);const p=[];let b=0;for(let T=0;T<Yi;++T){const C=T/x,_=Math.exp(-C*C/2);p.push(_),T===0?b+=_:T<m&&(b+=2*_)}for(let T=0;T<p.length;T++)p[T]=p[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[s],A=3*v*(s>S-Ds?s-S+Ds:0),w=4*(this._cubeSize-v);no(t,A,w,3*v,2*v),l.setRenderTarget(t),l.render(d,xa)}}function h0(i){const e=[],t=[],n=[];let s=i;const r=i-Ds+1+Gc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Ds?l=Gc[o-i+Ds-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,x=3,m=2,p=1,b=new Float32Array(x*g*h),S=new Float32Array(m*g*h),v=new Float32Array(p*g*h);for(let w=0;w<h;w++){const T=w%3*2/3-1,C=w>2?0:-1,_=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];b.set(_,x*g*w),S.set(f,m*g*w);const y=[w,w,w,w,w,w];v.set(y,p*g*w)}const A=new Bt;A.setAttribute("position",new An(b,x)),A.setAttribute("uv",new An(S,m)),A.setAttribute("faceIndex",new An(v,p)),e.push(A),s>Ds&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qc(i,e,t){const n=new ni(i,e,t);return n.texture.mapping=ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function no(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function f0(i,e,t){const n=new Float32Array(Yi),s=new L(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wl(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Yc(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wl(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function $c(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Wl(){return`

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
	`}function p0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ya||l===$a,u=l===zs||l===Hs;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ml(i)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&s(h)?(t===null&&(t=new Ml(i)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function m0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&pr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function g0(i,e,t,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const h=d.morphAttributes;for(const g in h){const x=h[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function c(d){const f=[],h=d.index,g=d.attributes.position;let x=0;if(h!==null){const b=h.array;x=h.version;for(let S=0,v=b.length;S<v;S+=3){const A=b[S+0],w=b[S+1],T=b[S+2];f.push(A,w,w,T,T,A)}}else if(g!==void 0){const b=g.array;x=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const A=S+0,w=S+1,T=S+2;f.push(A,w,w,T,T,A)}}else return;const m=new(Td(f)?Ld:Pd)(f,1);m.version=x;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const f=r.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function _0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,h){i.drawElements(n,h,r,f*o),t.update(h,n,1)}function c(f,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,f*o,g),t.update(h,n,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,n,1)}function d(f,h,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,r,f,0,x,0,g);let p=0;for(let b=0;b<g;b++)p+=h[b]*x[b];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function v0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function y0(i,e,t){const n=new WeakMap,s=new pt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let A=a.attributes.position.count*v,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const T=new Float32Array(A*w*4*d),C=new Rd(T,A,w,d);C.type=Jn,C.needsUpdate=!0;const _=v*4;for(let P=0;P<d;P++){const H=p[P],U=b[P],q=S[P],j=A*w*4*P;for(let W=0;W<H.count;W++){const Z=W*_;g===!0&&(s.fromBufferAttribute(H,W),T[j+Z+0]=s.x,T[j+Z+1]=s.y,T[j+Z+2]=s.z,T[j+Z+3]=0),x===!0&&(s.fromBufferAttribute(U,W),T[j+Z+4]=s.x,T[j+Z+5]=s.y,T[j+Z+6]=s.z,T[j+Z+7]=0),m===!0&&(s.fromBufferAttribute(q,W),T[j+Z+8]=s.x,T[j+Z+9]=s.y,T[j+Z+10]=s.z,T[j+Z+11]=q.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new me(A,w)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function x0(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class kd extends jt{constructor(e,t,n,s,r,o,a,l,c,u=Os){if(u!==Os&&u!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Os&&(n=Qi),n===void 0&&u===Gs&&(n=Vs),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Tn,this.minFilter=l!==void 0?l:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bd=new jt,jc=new kd(1,1),zd=new Rd,Hd=new ap,Vd=new Nd,Kc=[],Jc=[],Zc=new Float32Array(16),Qc=new Float32Array(9),eu=new Float32Array(4);function Zs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Kc[s];if(r===void 0&&(r=new Float32Array(s),Kc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vo(i,e){let t=Jc[e];t===void 0&&(t=new Int32Array(e),Jc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function S0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function M0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function b0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function w0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;eu.set(n),i.uniformMatrix2fv(this.addr,!1,eu),It(t,n)}}function T0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),It(t,n)}}function A0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Zc.set(n),i.uniformMatrix4fv(this.addr,!1,Zc),It(t,n)}}function R0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function L0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function D0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function I0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function U0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function N0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function O0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(jc.compareFunction=wd,r=jc):r=Bd,t.setTexture2D(e||r,s)}function F0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Hd,s)}function k0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Vd,s)}function B0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zd,s)}function z0(i){switch(i){case 5126:return S0;case 35664:return M0;case 35665:return b0;case 35666:return E0;case 35674:return w0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return I0;case 36295:return U0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return k0;case 36289:case 36303:case 36311:case 36292:return B0}}function H0(i,e){i.uniform1fv(this.addr,e)}function V0(i,e){const t=Zs(e,this.size,2);i.uniform2fv(this.addr,t)}function G0(i,e){const t=Zs(e,this.size,3);i.uniform3fv(this.addr,t)}function W0(i,e){const t=Zs(e,this.size,4);i.uniform4fv(this.addr,t)}function X0(i,e){const t=Zs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function q0(i,e){const t=Zs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Y0(i,e){const t=Zs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $0(i,e){i.uniform1iv(this.addr,e)}function j0(i,e){i.uniform2iv(this.addr,e)}function K0(i,e){i.uniform3iv(this.addr,e)}function J0(i,e){i.uniform4iv(this.addr,e)}function Z0(i,e){i.uniform1uiv(this.addr,e)}function Q0(i,e){i.uniform2uiv(this.addr,e)}function e_(i,e){i.uniform3uiv(this.addr,e)}function t_(i,e){i.uniform4uiv(this.addr,e)}function n_(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Bd,r[o])}function i_(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Hd,r[o])}function s_(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Vd,r[o])}function r_(i,e,t){const n=this.cache,s=e.length,r=Vo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zd,r[o])}function o_(i){switch(i){case 5126:return H0;case 35664:return V0;case 35665:return G0;case 35666:return W0;case 35674:return X0;case 35675:return q0;case 35676:return Y0;case 5124:case 35670:return $0;case 35667:case 35671:return j0;case 35668:case 35672:return K0;case 35669:case 35673:return J0;case 5125:return Z0;case 36294:return Q0;case 36295:return e_;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}class a_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=z0(t.type)}}class l_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=o_(t.type)}}class c_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function tu(i,e){i.seq.push(e),i.map[e.id]=e}function u_(i,e,t){const n=i.name,s=n.length;for(wa.lastIndex=0;;){const r=wa.exec(n),o=wa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){tu(t,c===void 0?new a_(a,i,e):new l_(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new c_(a),tu(t,d)),t=d}}}class Mo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);u_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function nu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const d_=37297;let h_=0;function f_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const iu=new Ke;function p_(i){at._getMatrix(iu,at.workingColorSpace,i);const e=`mat3( ${iu.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(i)){case Bo:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function su(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+f_(i.getShaderSource(e),o)}else return s}function m_(i,e){const t=p_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function g_(i,e){let t;switch(e){case Uf:t="Linear";break;case Nf:t="Reinhard";break;case Of:t="Cineon";break;case hd:t="ACESFilmic";break;case kf:t="AgX";break;case Bf:t="Neutral";break;case Ff:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const io=new L;function __(){at.getLuminanceCoefficients(io);const i=io.x.toFixed(4),e=io.y.toFixed(4),t=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function y_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function x_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function mr(i){return i!==""}function ru(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ou(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const S_=/^[ \t]*#include +<([\w\d./]+)>/gm;function bl(i){return i.replace(S_,b_)}const M_=new Map;function b_(i,e){let t=Qe[e];if(t===void 0){const n=M_.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bl(t)}const E_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function au(i){return i.replace(E_,w_)}function w_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function T_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ud?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function A_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zs:case Hs:e="ENVMAP_TYPE_CUBE";break;case ko:e="ENVMAP_TYPE_CUBE_UV";break}return e}function R_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hs:e="ENVMAP_MODE_REFRACTION";break}return e}function C_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case dd:e="ENVMAP_BLENDING_MULTIPLY";break;case Df:e="ENVMAP_BLENDING_MIX";break;case If:e="ENVMAP_BLENDING_ADD";break}return e}function P_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function L_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=T_(t),c=A_(t),u=R_(t),d=C_(t),f=P_(t),h=v_(t),g=y_(r),x=s.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),p.length>0&&(p+=`
`)):(m=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),p=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==yi?g_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,m_("linearToOutputTexel",t.outputColorSpace),__(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mr).join(`
`)),o=bl(o),o=ru(o,t),o=ou(o,t),a=bl(a),a=ru(a,t),a=ou(a,t),o=au(o),a=au(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Mc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+o,v=b+p+a,A=nu(s,s.VERTEX_SHADER,S),w=nu(s,s.FRAGMENT_SHADER,v);s.attachShader(x,A),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function T(P){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(x).trim(),U=s.getShaderInfoLog(A).trim(),q=s.getShaderInfoLog(w).trim();let j=!0,W=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{const Z=su(s,A,"vertex"),G=su(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+Z+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(U===""||q==="")&&(W=!1);W&&(P.diagnostics={runnable:j,programLog:H,vertexShader:{log:U,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(A),s.deleteShader(w),C=new Mo(s,x),_=x_(s,x)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let _;this.getAttributes=function(){return _===void 0&&T(this),_};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,d_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let D_=0;class I_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new U_(e),t.set(e,n)),n}}class U_{constructor(e){this.id=D_++,this.code=e,this.usedTimes=0}}function N_(i,e,t,n,s,r,o){const a=new Vl,l=new I_,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,y,P,H,U){const q=H.fog,j=U.geometry,W=_.isMeshStandardMaterial?H.environment:null,Z=(_.isMeshStandardMaterial?t:e).get(_.envMap||W),G=Z&&Z.mapping===ko?Z.image.height:null,de=g[_.type];_.precision!==null&&(h=s.getMaxPrecision(_.precision),h!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const _e=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Te=_e!==void 0?_e.length:0;let Ue=0;j.morphAttributes.position!==void 0&&(Ue=1),j.morphAttributes.normal!==void 0&&(Ue=2),j.morphAttributes.color!==void 0&&(Ue=3);let Ze,J,F,se;if(de){const mt=Pn[de];Ze=mt.vertexShader,J=mt.fragmentShader}else Ze=_.vertexShader,J=_.fragmentShader,l.update(_),F=l.getVertexShaderID(_),se=l.getFragmentShaderID(_);const K=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),ue=U.isInstancedMesh===!0,Ee=U.isBatchedMesh===!0,Ve=!!_.map,Be=!!_.matcap,ze=!!Z,N=!!_.aoMap,zt=!!_.lightMap,et=!!_.bumpMap,He=!!_.normalMap,De=!!_.displacementMap,it=!!_.emissiveMap,Ae=!!_.metalnessMap,R=!!_.roughnessMap,M=_.anisotropy>0,V=_.clearcoat>0,te=_.dispersion>0,ne=_.iridescence>0,O=_.sheen>0,oe=_.transmission>0,ae=M&&!!_.anisotropyMap,ve=V&&!!_.clearcoatMap,Ge=V&&!!_.clearcoatNormalMap,le=V&&!!_.clearcoatRoughnessMap,z=ne&&!!_.iridescenceMap,ie=ne&&!!_.iridescenceThicknessMap,ge=O&&!!_.sheenColorMap,ce=O&&!!_.sheenRoughnessMap,Re=!!_.specularMap,be=!!_.specularColorMap,Fe=!!_.specularIntensityMap,I=oe&&!!_.transmissionMap,fe=oe&&!!_.thicknessMap,$=!!_.gradientMap,Q=!!_.alphaMap,Se=_.alphaTest>0,xe=!!_.alphaHash,We=!!_.extensions;let St=yi;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(St=i.toneMapping);const Ht={shaderID:de,shaderType:_.type,shaderName:_.name,vertexShader:Ze,fragmentShader:J,defines:_.defines,customVertexShaderID:F,customFragmentShaderID:se,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:Ee,batchingColor:Ee&&U._colorsTexture!==null,instancing:ue,instancingColor:ue&&U.instanceColor!==null,instancingMorph:ue&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ks,alphaToCoverage:!!_.alphaToCoverage,map:Ve,matcap:Be,envMap:ze,envMapMode:ze&&Z.mapping,envMapCubeUVHeight:G,aoMap:N,lightMap:zt,bumpMap:et,normalMap:He,displacementMap:f&&De,emissiveMap:it,normalMapObjectSpace:He&&_.normalMapType===Gf,normalMapTangentSpace:He&&_.normalMapType===Ed,metalnessMap:Ae,roughnessMap:R,anisotropy:M,anisotropyMap:ae,clearcoat:V,clearcoatMap:ve,clearcoatNormalMap:Ge,clearcoatRoughnessMap:le,dispersion:te,iridescence:ne,iridescenceMap:z,iridescenceThicknessMap:ie,sheen:O,sheenColorMap:ge,sheenRoughnessMap:ce,specularMap:Re,specularColorMap:be,specularIntensityMap:Fe,transmission:oe,transmissionMap:I,thicknessMap:fe,gradientMap:$,opaque:_.transparent===!1&&_.blending===Ns&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:Se,alphaHash:xe,combine:_.combine,mapUv:Ve&&x(_.map.channel),aoMapUv:N&&x(_.aoMap.channel),lightMapUv:zt&&x(_.lightMap.channel),bumpMapUv:et&&x(_.bumpMap.channel),normalMapUv:He&&x(_.normalMap.channel),displacementMapUv:De&&x(_.displacementMap.channel),emissiveMapUv:it&&x(_.emissiveMap.channel),metalnessMapUv:Ae&&x(_.metalnessMap.channel),roughnessMapUv:R&&x(_.roughnessMap.channel),anisotropyMapUv:ae&&x(_.anisotropyMap.channel),clearcoatMapUv:ve&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:ce&&x(_.sheenRoughnessMap.channel),specularMapUv:Re&&x(_.specularMap.channel),specularColorMapUv:be&&x(_.specularColorMap.channel),specularIntensityMapUv:Fe&&x(_.specularIntensityMap.channel),transmissionMapUv:I&&x(_.transmissionMap.channel),thicknessMapUv:fe&&x(_.thicknessMap.channel),alphaMapUv:Q&&x(_.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(He||M),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!j.attributes.uv&&(Ve||Q),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:pe,skinning:U.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ue,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:St,decodeVideoTexture:Ve&&_.map.isVideoTexture===!0&&at.getTransfer(_.map.colorSpace)===_t,decodeVideoTextureEmissive:it&&_.emissiveMap.isVideoTexture===!0&&at.getTransfer(_.emissiveMap.colorSpace)===_t,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===hn,flipSided:_.side===$t,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:We&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&_.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ht.vertexUv1s=c.has(1),Ht.vertexUv2s=c.has(2),Ht.vertexUv3s=c.has(3),c.clear(),Ht}function p(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)y.push(P),y.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(b(y,_),S(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function b(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function S(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),_.push(a.mask)}function v(_){const y=g[_.type];let P;if(y){const H=Pn[y];P=Id.clone(H.uniforms)}else P=_.uniforms;return P}function A(_,y){let P;for(let H=0,U=u.length;H<U;H++){const q=u[H];if(q.cacheKey===y){P=q,++P.usedTimes;break}}return P===void 0&&(P=new L_(i,y,_,r),u.push(P)),P}function w(_){if(--_.usedTimes===0){const y=u.indexOf(_);u[y]=u[u.length-1],u.pop(),_.destroy()}}function T(_){l.remove(_)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:C}}function O_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function F_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function cu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function uu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,f,h,g,x,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,f,h,g,x,m){const p=o(d,f,h,g,x,m);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):t.push(p)}function l(d,f,h,g,x,m){const p=o(d,f,h,g,x,m);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||F_),n.length>1&&n.sort(f||cu),s.length>1&&s.sort(f||cu)}function u(){for(let d=e,f=i.length;d<f;d++){const h=i[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function k_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new uu,i.set(n,[o])):s>=r.length?(o=new uu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function B_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new tt};break;case"SpotLight":t={position:new L,direction:new L,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function z_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let H_=0;function V_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function G_(i){const e=new B_,t=z_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ut,o=new ut;function a(c){let u=0,d=0,f=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let h=0,g=0,x=0,m=0,p=0,b=0,S=0,v=0,A=0,w=0,T=0;c.sort(V_);for(let _=0,y=c.length;_<y;_++){const P=c[_],H=P.color,U=P.intensity,q=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=H.r*U,d+=H.g*U,f+=H.b*U;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],U);T++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Z=P.shadow,G=t.get(P);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[h]=G,n.directionalShadowMap[h]=j,n.directionalShadowMatrix[h]=P.shadow.matrix,b++}n.directional[h]=W,h++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(H).multiplyScalar(U),W.distance=q,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[x]=W;const Z=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,Z.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[x]=Z.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=j,v++}x++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(H).multiplyScalar(U),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Z=P.shadow,G=t.get(P);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(U),W.groundColor.copy(P.groundColor).multiplyScalar(U),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==h||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==b||C.numPointShadows!==S||C.numSpotShadows!==v||C.numSpotMaps!==A||C.numLightProbes!==T)&&(n.directional.length=h,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,C.directionalLength=h,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=b,C.numPointShadows=S,C.numSpotShadows=v,C.numSpotMaps=A,C.numLightProbes=T,n.version=H_++)}function l(c,u){let d=0,f=0,h=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function du(i){const e=new G_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function W_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new du(i),e.set(s,[a])):r>=o.length?(a=new du(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class X_ extends Js{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class q_ extends Js{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$_=`uniform sampler2D shadow_pass;
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
}`;function j_(i,e,t){let n=new Gl;const s=new me,r=new me,o=new pt,a=new X_({depthPacking:Vf}),l=new q_,c={},u=t.maxTextureSize,d={[Ri]:$t,[$t]:Ri,[hn]:hn},f=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:Y_,fragmentShader:$_}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new Bt;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ke(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cd;let p=this.type;this.render=function(w,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const _=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),H=i.state;H.setBlending(vi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const U=p!==Wn&&this.type===Wn,q=p===Wn&&this.type!==Wn;for(let j=0,W=w.length;j<W;j++){const Z=w[j],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const de=G.getFrameExtents();if(s.multiply(de),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,G.mapSize.y=r.y)),G.map===null||U===!0||q===!0){const Te=this.type!==Wn?{minFilter:Tn,magFilter:Tn}:{};G.map!==null&&G.map.dispose(),G.map=new ni(s.x,s.y,Te),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const _e=G.getViewportCount();for(let Te=0;Te<_e;Te++){const Ue=G.getViewport(Te);o.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),H.viewport(o),G.updateMatrices(Z,Te),n=G.getFrustum(),v(T,C,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===Wn&&b(G,C),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(_,y,P)};function b(w,T){const C=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ni(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,C,f,x,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,C,h,x,null)}function S(w,T,C,_){let y=null;const P=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)y=P;else if(y=C.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=y.uuid,U=T.uuid;let q=c[H];q===void 0&&(q={},c[H]=q);let j=q[U];j===void 0&&(j=y.clone(),q[U]=j,T.addEventListener("dispose",A)),y=j}if(y.visible=T.visible,y.wireframe=T.wireframe,_===Wn?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=i.properties.get(y);H.light=C}return y}function v(w,T,C,_,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Wn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const U=e.update(w),q=w.material;if(Array.isArray(q)){const j=U.groups;for(let W=0,Z=j.length;W<Z;W++){const G=j[W],de=q[G.materialIndex];if(de&&de.visible){const _e=S(w,de,_,y);w.onBeforeShadow(i,w,T,C,U,_e,G),i.renderBufferDirect(C,null,U,_e,w,G),w.onAfterShadow(i,w,T,C,U,_e,G)}}}else if(q.visible){const j=S(w,q,_,y);w.onBeforeShadow(i,w,T,C,U,j,null),i.renderBufferDirect(C,null,U,j,w,null),w.onAfterShadow(i,w,T,C,U,j,null)}}const H=w.children;for(let U=0,q=H.length;U<q;U++)v(H[U],T,C,_,y)}function A(w){w.target.removeEventListener("dispose",A);for(const C in c){const _=c[C],y=w.target.uuid;y in _&&(_[y].dispose(),delete _[y])}}}const K_={[za]:Ha,[Va]:Xa,[Ga]:qa,[Bs]:Wa,[Ha]:za,[Xa]:Va,[qa]:Ga,[Wa]:Bs};function J_(i,e){function t(){let I=!1;const fe=new pt;let $=null;const Q=new pt(0,0,0,0);return{setMask:function(Se){$!==Se&&!I&&(i.colorMask(Se,Se,Se,Se),$=Se)},setLocked:function(Se){I=Se},setClear:function(Se,xe,We,St,Ht){Ht===!0&&(Se*=St,xe*=St,We*=St),fe.set(Se,xe,We,St),Q.equals(fe)===!1&&(i.clearColor(Se,xe,We,St),Q.copy(fe))},reset:function(){I=!1,$=null,Q.set(-1,0,0,0)}}}function n(){let I=!1,fe=!1,$=null,Q=null,Se=null;return{setReversed:function(xe){if(fe!==xe){const We=e.get("EXT_clip_control");fe?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const St=Se;Se=null,this.setClear(St)}fe=xe},getReversed:function(){return fe},setTest:function(xe){xe?K(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(xe){$!==xe&&!I&&(i.depthMask(xe),$=xe)},setFunc:function(xe){if(fe&&(xe=K_[xe]),Q!==xe){switch(xe){case za:i.depthFunc(i.NEVER);break;case Ha:i.depthFunc(i.ALWAYS);break;case Va:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case Ga:i.depthFunc(i.EQUAL);break;case Wa:i.depthFunc(i.GEQUAL);break;case Xa:i.depthFunc(i.GREATER);break;case qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=xe}},setLocked:function(xe){I=xe},setClear:function(xe){Se!==xe&&(fe&&(xe=1-xe),i.clearDepth(xe),Se=xe)},reset:function(){I=!1,$=null,Q=null,Se=null,fe=!1}}}function s(){let I=!1,fe=null,$=null,Q=null,Se=null,xe=null,We=null,St=null,Ht=null;return{setTest:function(mt){I||(mt?K(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(mt){fe!==mt&&!I&&(i.stencilMask(mt),fe=mt)},setFunc:function(mt,gn,On){($!==mt||Q!==gn||Se!==On)&&(i.stencilFunc(mt,gn,On),$=mt,Q=gn,Se=On)},setOp:function(mt,gn,On){(xe!==mt||We!==gn||St!==On)&&(i.stencilOp(mt,gn,On),xe=mt,We=gn,St=On)},setLocked:function(mt){I=mt},setClear:function(mt){Ht!==mt&&(i.clearStencil(mt),Ht=mt)},reset:function(){I=!1,fe=null,$=null,Q=null,Se=null,xe=null,We=null,St=null,Ht=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],g=null,x=!1,m=null,p=null,b=null,S=null,v=null,A=null,w=null,T=new tt(0,0,0),C=0,_=!1,y=null,P=null,H=null,U=null,q=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Z=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=Z>=2);let de=null,_e={};const Te=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),Ze=new pt().fromArray(Te),J=new pt().fromArray(Ue);function F(I,fe,$,Q){const Se=new Uint8Array(4),xe=i.createTexture();i.bindTexture(I,xe),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<$;We++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(fe+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return xe}const se={};se[i.TEXTURE_2D]=F(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=F(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=F(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=F(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(i.DEPTH_TEST),o.setFunc(Bs),et(!1),He(gc),K(i.CULL_FACE),N(vi);function K(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function pe(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function ue(I,fe){return d[I]!==fe?(i.bindFramebuffer(I,fe),d[I]=fe,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=fe),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ee(I,fe){let $=h,Q=!1;if(I){$=f.get(fe),$===void 0&&($=[],f.set(fe,$));const Se=I.textures;if($.length!==Se.length||$[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,We=Se.length;xe<We;xe++)$[xe]=i.COLOR_ATTACHMENT0+xe;$.length=Se.length,Q=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,Q=!0);Q&&i.drawBuffers($)}function Ve(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const Be={[qi]:i.FUNC_ADD,[mf]:i.FUNC_SUBTRACT,[gf]:i.FUNC_REVERSE_SUBTRACT};Be[_f]=i.MIN,Be[vf]=i.MAX;const ze={[yf]:i.ZERO,[xf]:i.ONE,[Sf]:i.SRC_COLOR,[ka]:i.SRC_ALPHA,[Af]:i.SRC_ALPHA_SATURATE,[wf]:i.DST_COLOR,[bf]:i.DST_ALPHA,[Mf]:i.ONE_MINUS_SRC_COLOR,[Ba]:i.ONE_MINUS_SRC_ALPHA,[Tf]:i.ONE_MINUS_DST_COLOR,[Ef]:i.ONE_MINUS_DST_ALPHA,[Rf]:i.CONSTANT_COLOR,[Cf]:i.ONE_MINUS_CONSTANT_COLOR,[Pf]:i.CONSTANT_ALPHA,[Lf]:i.ONE_MINUS_CONSTANT_ALPHA};function N(I,fe,$,Q,Se,xe,We,St,Ht,mt){if(I===vi){x===!0&&(pe(i.BLEND),x=!1);return}if(x===!1&&(K(i.BLEND),x=!0),I!==pf){if(I!==m||mt!==_){if((p!==qi||v!==qi)&&(i.blendEquation(i.FUNC_ADD),p=qi,v=qi),mt)switch(I){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.ONE,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,S=null,A=null,w=null,T.set(0,0,0),C=0,m=I,_=mt}return}Se=Se||fe,xe=xe||$,We=We||Q,(fe!==p||Se!==v)&&(i.blendEquationSeparate(Be[fe],Be[Se]),p=fe,v=Se),($!==b||Q!==S||xe!==A||We!==w)&&(i.blendFuncSeparate(ze[$],ze[Q],ze[xe],ze[We]),b=$,S=Q,A=xe,w=We),(St.equals(T)===!1||Ht!==C)&&(i.blendColor(St.r,St.g,St.b,Ht),T.copy(St),C=Ht),m=I,_=!1}function zt(I,fe){I.side===hn?pe(i.CULL_FACE):K(i.CULL_FACE);let $=I.side===$t;fe&&($=!$),et($),I.blending===Ns&&I.transparent===!1?N(vi):N(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const Q=I.stencilWrite;a.setTest(Q),Q&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),it(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function He(I){I!==hf?(K(i.CULL_FACE),I!==P&&(I===gc?i.cullFace(i.BACK):I===ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),P=I}function De(I){I!==H&&(W&&i.lineWidth(I),H=I)}function it(I,fe,$){I?(K(i.POLYGON_OFFSET_FILL),(U!==fe||q!==$)&&(i.polygonOffset(fe,$),U=fe,q=$)):pe(i.POLYGON_OFFSET_FILL)}function Ae(I){I?K(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+j-1),de!==I&&(i.activeTexture(I),de=I)}function M(I,fe,$){$===void 0&&(de===null?$=i.TEXTURE0+j-1:$=de);let Q=_e[$];Q===void 0&&(Q={type:void 0,texture:void 0},_e[$]=Q),(Q.type!==I||Q.texture!==fe)&&(de!==$&&(i.activeTexture($),de=$),i.bindTexture(I,fe||se[I]),Q.type=I,Q.texture=fe)}function V(){const I=_e[de];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function O(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ge(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(I){Ze.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ze.copy(I))}function ce(I){J.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),J.copy(I))}function Re(I,fe){let $=c.get(fe);$===void 0&&($=new WeakMap,c.set(fe,$));let Q=$.get(I);Q===void 0&&(Q=i.getUniformBlockIndex(fe,I.name),$.set(I,Q))}function be(I,fe){const Q=c.get(fe).get(I);l.get(fe)!==Q&&(i.uniformBlockBinding(fe,Q,I.__bindingPointIndex),l.set(fe,Q))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},de=null,_e={},d={},f=new WeakMap,h=[],g=null,x=!1,m=null,p=null,b=null,S=null,v=null,A=null,w=null,T=new tt(0,0,0),C=0,_=!1,y=null,P=null,H=null,U=null,q=null,Ze.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:pe,bindFramebuffer:ue,drawBuffers:Ee,useProgram:Ve,setBlending:N,setMaterial:zt,setFlipSided:et,setCullFace:He,setLineWidth:De,setPolygonOffset:it,setScissorTest:Ae,activeTexture:R,bindTexture:M,unbindTexture:V,compressedTexImage2D:te,compressedTexImage3D:ne,texImage2D:z,texImage3D:ie,updateUBOMapping:Re,uniformBlockBinding:be,texStorage2D:Ge,texStorage3D:le,texSubImage2D:O,texSubImage3D:oe,compressedTexSubImage2D:ae,compressedTexSubImage3D:ve,scissor:ge,viewport:ce,reset:Fe}}function hu(i,e,t,n){const s=Z_(n);switch(t){case _d:return i*e;case yd:return i*e;case xd:return i*e*2;case Sd:return i*e/s.components*s.byteLength;case Bl:return i*e/s.components*s.byteLength;case Md:return i*e*2/s.components*s.byteLength;case zl:return i*e*2/s.components*s.byteLength;case vd:return i*e*3/s.components*s.byteLength;case bn:return i*e*4/s.components*s.byteLength;case Hl:return i*e*4/s.components*s.byteLength;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vo:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ja:case Qa:return Math.max(i,16)*Math.max(e,8)/4;case Ka:case Za:return Math.max(i,8)*Math.max(e,8)/2;case el:case tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case rl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case gl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case xo:case _l:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case bd:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case xl:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Z_(i){switch(i){case ti:case pd:return{byteLength:1,components:1};case Mr:case md:case js:return{byteLength:2,components:1};case Fl:case kl:return{byteLength:2,components:4};case Qi:case Ol:case Jn:return{byteLength:4,components:1};case gd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Q_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new me,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return h?new OffscreenCanvas(R,M):Ro("canvas")}function x(R,M,V){let te=1;const ne=Ae(R);if((ne.width>V||ne.height>V)&&(te=V/Math.max(ne.width,ne.height)),te<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const O=Math.floor(te*ne.width),oe=Math.floor(te*ne.height);d===void 0&&(d=g(O,oe));const ae=M?g(O,oe):d;return ae.width=O,ae.height=oe,ae.getContext("2d").drawImage(R,0,0,O,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+O+"x"+oe+")."),ae}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,M,V,te,ne=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let O=M;if(M===i.RED&&(V===i.FLOAT&&(O=i.R32F),V===i.HALF_FLOAT&&(O=i.R16F),V===i.UNSIGNED_BYTE&&(O=i.R8)),M===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(O=i.R8UI),V===i.UNSIGNED_SHORT&&(O=i.R16UI),V===i.UNSIGNED_INT&&(O=i.R32UI),V===i.BYTE&&(O=i.R8I),V===i.SHORT&&(O=i.R16I),V===i.INT&&(O=i.R32I)),M===i.RG&&(V===i.FLOAT&&(O=i.RG32F),V===i.HALF_FLOAT&&(O=i.RG16F),V===i.UNSIGNED_BYTE&&(O=i.RG8)),M===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(O=i.RG8UI),V===i.UNSIGNED_SHORT&&(O=i.RG16UI),V===i.UNSIGNED_INT&&(O=i.RG32UI),V===i.BYTE&&(O=i.RG8I),V===i.SHORT&&(O=i.RG16I),V===i.INT&&(O=i.RG32I)),M===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(O=i.RGB8UI),V===i.UNSIGNED_SHORT&&(O=i.RGB16UI),V===i.UNSIGNED_INT&&(O=i.RGB32UI),V===i.BYTE&&(O=i.RGB8I),V===i.SHORT&&(O=i.RGB16I),V===i.INT&&(O=i.RGB32I)),M===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(O=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(O=i.RGBA16UI),V===i.UNSIGNED_INT&&(O=i.RGBA32UI),V===i.BYTE&&(O=i.RGBA8I),V===i.SHORT&&(O=i.RGBA16I),V===i.INT&&(O=i.RGBA32I)),M===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(O=i.RGB9_E5),M===i.RGBA){const oe=ne?Bo:at.getTransfer(te);V===i.FLOAT&&(O=i.RGBA32F),V===i.HALF_FLOAT&&(O=i.RGBA16F),V===i.UNSIGNED_BYTE&&(O=oe===_t?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(O=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(O=i.RGB5_A1)}return(O===i.R16F||O===i.R32F||O===i.RG16F||O===i.RG32F||O===i.RGBA16F||O===i.RGBA32F)&&e.get("EXT_color_buffer_float"),O}function v(R,M){let V;return R?M===null||M===Qi||M===Vs?V=i.DEPTH24_STENCIL8:M===Jn?V=i.DEPTH32F_STENCIL8:M===Mr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Qi||M===Vs?V=i.DEPTH_COMPONENT24:M===Jn?V=i.DEPTH_COMPONENT32F:M===Mr&&(V=i.DEPTH_COMPONENT16),V}function A(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Tn&&R.minFilter!==Dn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function w(R){const M=R.target;M.removeEventListener("dispose",w),C(M),M.isVideoTexture&&u.delete(M)}function T(R){const M=R.target;M.removeEventListener("dispose",T),y(M)}function C(R){const M=n.get(R);if(M.__webglInit===void 0)return;const V=R.source,te=f.get(V);if(te){const ne=te[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&_(R),Object.keys(te).length===0&&f.delete(V)}n.remove(R)}function _(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const V=R.source,te=f.get(V);delete te[M.__cacheKey],o.memory.textures--}function y(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(M.__webglFramebuffer[te]))for(let ne=0;ne<M.__webglFramebuffer[te].length;ne++)i.deleteFramebuffer(M.__webglFramebuffer[te][ne]);else i.deleteFramebuffer(M.__webglFramebuffer[te]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[te])}else{if(Array.isArray(M.__webglFramebuffer))for(let te=0;te<M.__webglFramebuffer.length;te++)i.deleteFramebuffer(M.__webglFramebuffer[te]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let te=0;te<M.__webglColorRenderbuffer.length;te++)M.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[te]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const V=R.textures;for(let te=0,ne=V.length;te<ne;te++){const O=n.get(V[te]);O.__webglTexture&&(i.deleteTexture(O.__webglTexture),o.memory.textures--),n.remove(V[te])}n.remove(R)}let P=0;function H(){P=0}function U(){const R=P;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function q(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function j(R,M){const V=n.get(R);if(R.isVideoTexture&&De(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(V,R,M);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+M)}function W(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){J(V,R,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+M)}function Z(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){J(V,R,M);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+M)}function G(R,M){const V=n.get(R);if(R.version>0&&V.__version!==R.version){F(V,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+M)}const de={[Sr]:i.REPEAT,[ji]:i.CLAMP_TO_EDGE,[ja]:i.MIRRORED_REPEAT},_e={[Tn]:i.NEAREST,[zf]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[Dn]:i.LINEAR,[Zo]:i.LINEAR_MIPMAP_NEAREST,[Ki]:i.LINEAR_MIPMAP_LINEAR},Te={[Wf]:i.NEVER,[Kf]:i.ALWAYS,[Xf]:i.LESS,[wd]:i.LEQUAL,[qf]:i.EQUAL,[jf]:i.GEQUAL,[Yf]:i.GREATER,[$f]:i.NOTEQUAL};function Ue(R,M){if(M.type===Jn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Dn||M.magFilter===Zo||M.magFilter===Fr||M.magFilter===Ki||M.minFilter===Dn||M.minFilter===Zo||M.minFilter===Fr||M.minFilter===Ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,de[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,de[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,de[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,_e[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,_e[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Tn||M.minFilter!==Fr&&M.minFilter!==Ki||M.type===Jn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ze(R,M){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",w));const te=M.source;let ne=f.get(te);ne===void 0&&(ne={},f.set(te,ne));const O=q(M);if(O!==R.__cacheKey){ne[O]===void 0&&(ne[O]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ne[O].usedTimes++;const oe=ne[R.__cacheKey];oe!==void 0&&(ne[R.__cacheKey].usedTimes--,oe.usedTimes===0&&_(M)),R.__cacheKey=O,R.__webglTexture=ne[O].texture}return V}function J(R,M,V){let te=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(te=i.TEXTURE_3D);const ne=Ze(R,M),O=M.source;t.bindTexture(te,R.__webglTexture,i.TEXTURE0+V);const oe=n.get(O);if(O.version!==oe.__version||ne===!0){t.activeTexture(i.TEXTURE0+V);const ae=at.getPrimaries(at.workingColorSpace),ve=M.colorSpace===gi?null:at.getPrimaries(M.colorSpace),Ge=M.colorSpace===gi||ae===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let le=x(M.image,!1,s.maxTextureSize);le=it(M,le);const z=r.convert(M.format,M.colorSpace),ie=r.convert(M.type);let ge=S(M.internalFormat,z,ie,M.colorSpace,M.isVideoTexture);Ue(te,M);let ce;const Re=M.mipmaps,be=M.isVideoTexture!==!0,Fe=oe.__version===void 0||ne===!0,I=O.dataReady,fe=A(M,le);if(M.isDepthTexture)ge=v(M.format===Gs,M.type),Fe&&(be?t.texStorage2D(i.TEXTURE_2D,1,ge,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,ge,le.width,le.height,0,z,ie,null));else if(M.isDataTexture)if(Re.length>0){be&&Fe&&t.texStorage2D(i.TEXTURE_2D,fe,ge,Re[0].width,Re[0].height);for(let $=0,Q=Re.length;$<Q;$++)ce=Re[$],be?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,z,ie,ce.data):t.texImage2D(i.TEXTURE_2D,$,ge,ce.width,ce.height,0,z,ie,ce.data);M.generateMipmaps=!1}else be?(Fe&&t.texStorage2D(i.TEXTURE_2D,fe,ge,le.width,le.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,z,ie,le.data)):t.texImage2D(i.TEXTURE_2D,0,ge,le.width,le.height,0,z,ie,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){be&&Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ge,Re[0].width,Re[0].height,le.depth);for(let $=0,Q=Re.length;$<Q;$++)if(ce=Re[$],M.format!==bn)if(z!==null)if(be){if(I)if(M.layerUpdates.size>0){const Se=hu(ce.width,ce.height,M.format,M.type);for(const xe of M.layerUpdates){const We=ce.data.subarray(xe*Se/ce.data.BYTES_PER_ELEMENT,(xe+1)*Se/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,xe,ce.width,ce.height,1,z,We)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,le.depth,z,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ge,ce.width,ce.height,le.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,le.depth,z,ie,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,ge,ce.width,ce.height,le.depth,0,z,ie,ce.data)}else{be&&Fe&&t.texStorage2D(i.TEXTURE_2D,fe,ge,Re[0].width,Re[0].height);for(let $=0,Q=Re.length;$<Q;$++)ce=Re[$],M.format!==bn?z!==null?be?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,z,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,$,ge,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,z,ie,ce.data):t.texImage2D(i.TEXTURE_2D,$,ge,ce.width,ce.height,0,z,ie,ce.data)}else if(M.isDataArrayTexture)if(be){if(Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ge,le.width,le.height,le.depth),I)if(M.layerUpdates.size>0){const $=hu(le.width,le.height,M.format,M.type);for(const Q of M.layerUpdates){const Se=le.data.subarray(Q*$/le.data.BYTES_PER_ELEMENT,(Q+1)*$/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,le.width,le.height,1,z,ie,Se)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,z,ie,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,le.width,le.height,le.depth,0,z,ie,le.data);else if(M.isData3DTexture)be?(Fe&&t.texStorage3D(i.TEXTURE_3D,fe,ge,le.width,le.height,le.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,z,ie,le.data)):t.texImage3D(i.TEXTURE_3D,0,ge,le.width,le.height,le.depth,0,z,ie,le.data);else if(M.isFramebufferTexture){if(Fe)if(be)t.texStorage2D(i.TEXTURE_2D,fe,ge,le.width,le.height);else{let $=le.width,Q=le.height;for(let Se=0;Se<fe;Se++)t.texImage2D(i.TEXTURE_2D,Se,ge,$,Q,0,z,ie,null),$>>=1,Q>>=1}}else if(Re.length>0){if(be&&Fe){const $=Ae(Re[0]);t.texStorage2D(i.TEXTURE_2D,fe,ge,$.width,$.height)}for(let $=0,Q=Re.length;$<Q;$++)ce=Re[$],be?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,z,ie,ce):t.texImage2D(i.TEXTURE_2D,$,ge,z,ie,ce);M.generateMipmaps=!1}else if(be){if(Fe){const $=Ae(le);t.texStorage2D(i.TEXTURE_2D,fe,ge,$.width,$.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,z,ie,le)}else t.texImage2D(i.TEXTURE_2D,0,ge,z,ie,le);m(M)&&p(te),oe.__version=O.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function F(R,M,V){if(M.image.length!==6)return;const te=Ze(R,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const O=n.get(ne);if(ne.version!==O.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const oe=at.getPrimaries(at.workingColorSpace),ae=M.colorSpace===gi?null:at.getPrimaries(M.colorSpace),ve=M.colorSpace===gi||oe===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ge=M.isCompressedTexture||M.image[0].isCompressedTexture,le=M.image[0]&&M.image[0].isDataTexture,z=[];for(let Q=0;Q<6;Q++)!Ge&&!le?z[Q]=x(M.image[Q],!0,s.maxCubemapSize):z[Q]=le?M.image[Q].image:M.image[Q],z[Q]=it(M,z[Q]);const ie=z[0],ge=r.convert(M.format,M.colorSpace),ce=r.convert(M.type),Re=S(M.internalFormat,ge,ce,M.colorSpace),be=M.isVideoTexture!==!0,Fe=O.__version===void 0||te===!0,I=ne.dataReady;let fe=A(M,ie);Ue(i.TEXTURE_CUBE_MAP,M);let $;if(Ge){be&&Fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Re,ie.width,ie.height);for(let Q=0;Q<6;Q++){$=z[Q].mipmaps;for(let Se=0;Se<$.length;Se++){const xe=$[Se];M.format!==bn?ge!==null?be?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,xe.width,xe.height,ge,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,Re,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,xe.width,xe.height,ge,ce,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,Re,xe.width,xe.height,0,ge,ce,xe.data)}}}else{if($=M.mipmaps,be&&Fe){$.length>0&&fe++;const Q=Ae(z[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Re,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(le){be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,z[Q].width,z[Q].height,ge,ce,z[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Re,z[Q].width,z[Q].height,0,ge,ce,z[Q].data);for(let Se=0;Se<$.length;Se++){const We=$[Se].image[Q].image;be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,We.width,We.height,ge,ce,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,Re,We.width,We.height,0,ge,ce,We.data)}}else{be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ge,ce,z[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Re,ge,ce,z[Q]);for(let Se=0;Se<$.length;Se++){const xe=$[Se];be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,ge,ce,xe.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,Re,ge,ce,xe.image[Q])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),O.__version=ne.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function se(R,M,V,te,ne,O){const oe=r.convert(V.format,V.colorSpace),ae=r.convert(V.type),ve=S(V.internalFormat,oe,ae,V.colorSpace),Ge=n.get(M),le=n.get(V);if(le.__renderTarget=M,!Ge.__hasExternalTextures){const z=Math.max(1,M.width>>O),ie=Math.max(1,M.height>>O);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,O,ve,z,ie,M.depth,0,oe,ae,null):t.texImage2D(ne,O,ve,z,ie,0,oe,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),He(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,ne,le.__webglTexture,0,et(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,ne,le.__webglTexture,O),t.bindFramebuffer(i.FRAMEBUFFER,null)}function K(R,M,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const te=M.depthTexture,ne=te&&te.isDepthTexture?te.type:null,O=v(M.stencilBuffer,ne),oe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=et(M);He(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,O,M.width,M.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,O,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,O,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,R)}else{const te=M.textures;for(let ne=0;ne<te.length;ne++){const O=te[ne],oe=r.convert(O.format,O.colorSpace),ae=r.convert(O.type),ve=S(O.internalFormat,oe,ae,O.colorSpace),Ge=et(M);V&&He(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,ve,M.width,M.height):He(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge,ve,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ve,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(M.depthTexture);te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),j(M.depthTexture,0);const ne=te.__webglTexture,O=et(M);if(M.depthTexture.format===Os)He(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Gs)He(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function ue(R){const M=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const te=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),te){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,te.removeEventListener("dispose",ne)};te.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=te}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");pe(M.__webglFramebuffer,R)}else if(V){M.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[te]),M.__webglDepthbuffer[te]===void 0)M.__webglDepthbuffer[te]=i.createRenderbuffer(),K(M.__webglDepthbuffer[te],R,!1);else{const ne=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=M.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,O),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,O)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),K(M.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ne)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(R,M,V){const te=n.get(R);M!==void 0&&se(te.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&ue(R)}function Ve(R){const M=R.texture,V=n.get(R),te=n.get(M);R.addEventListener("dispose",T);const ne=R.textures,O=R.isWebGLCubeRenderTarget===!0,oe=ne.length>1;if(oe||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=M.version,o.memory.textures++),O){V.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[ae]=[];for(let ve=0;ve<M.mipmaps.length;ve++)V.__webglFramebuffer[ae][ve]=i.createFramebuffer()}else V.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)V.__webglFramebuffer[ae]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(oe)for(let ae=0,ve=ne.length;ae<ve;ae++){const Ge=n.get(ne[ae]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&He(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ae=0;ae<ne.length;ae++){const ve=ne[ae];V.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ae]);const Ge=r.convert(ve.format,ve.colorSpace),le=r.convert(ve.type),z=S(ve.internalFormat,Ge,le,ve.colorSpace,R.isXRRenderTarget===!0),ie=et(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,z,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,V.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),K(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(O){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,M);for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0)for(let ve=0;ve<M.mipmaps.length;ve++)se(V.__webglFramebuffer[ae][ve],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve);else se(V.__webglFramebuffer[ae],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let ae=0,ve=ne.length;ae<ve;ae++){const Ge=ne[ae],le=n.get(Ge);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),Ue(i.TEXTURE_2D,Ge),se(V.__webglFramebuffer,R,Ge,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,0),m(Ge)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,te.__webglTexture),Ue(ae,M),M.mipmaps&&M.mipmaps.length>0)for(let ve=0;ve<M.mipmaps.length;ve++)se(V.__webglFramebuffer[ve],R,M,i.COLOR_ATTACHMENT0,ae,ve);else se(V.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,ae,0);m(M)&&p(ae),t.unbindTexture()}R.depthBuffer&&ue(R)}function Be(R){const M=R.textures;for(let V=0,te=M.length;V<te;V++){const ne=M[V];if(m(ne)){const O=b(R),oe=n.get(ne).__webglTexture;t.bindTexture(O,oe),p(O),t.unbindTexture()}}}const ze=[],N=[];function zt(R){if(R.samples>0){if(He(R)===!1){const M=R.textures,V=R.width,te=R.height;let ne=i.COLOR_BUFFER_BIT;const O=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(R),ae=M.length>1;if(ae)for(let ve=0;ve<M.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ve=0;ve<M.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]);const Ge=n.get(M[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ge,0)}i.blitFramebuffer(0,0,V,te,0,0,V,te,ne,i.NEAREST),l===!0&&(ze.length=0,N.length=0,ze.push(i.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ze.push(O),N.push(O),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let ve=0;ve<M.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]);const Ge=n.get(M[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,Ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function et(R){return Math.min(s.maxSamples,R.samples)}function He(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function De(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function it(R,M){const V=R.colorSpace,te=R.format,ne=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==Ks&&V!==gi&&(at.getTransfer(V)===_t?(te!==bn||ne!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=H,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=Ee,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=se,this.useMultisampledRTT=He}function ev(i,e){function t(n,s=gi){let r;const o=at.getTransfer(s);if(n===ti)return i.UNSIGNED_BYTE;if(n===Fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pd)return i.BYTE;if(n===md)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===Ol)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Jn)return i.FLOAT;if(n===js)return i.HALF_FLOAT;if(n===_d)return i.ALPHA;if(n===vd)return i.RGB;if(n===bn)return i.RGBA;if(n===yd)return i.LUMINANCE;if(n===xd)return i.LUMINANCE_ALPHA;if(n===Os)return i.DEPTH_COMPONENT;if(n===Gs)return i.DEPTH_STENCIL;if(n===Sd)return i.RED;if(n===Bl)return i.RED_INTEGER;if(n===Md)return i.RG;if(n===zl)return i.RG_INTEGER;if(n===Hl)return i.RGBA_INTEGER;if(n===go||n===_o||n===vo||n===yo)if(o===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===go)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===go)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ka||n===Ja||n===Za||n===Qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===el||n===tl)return o===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===ul||n===dl||n===hl||n===fl||n===pl||n===ml||n===gl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===il)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===al)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ll)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ul)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ml)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xo||n===_l||n===vl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xo)return o===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bd||n===yl||n===xl||n===Sl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class tv extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qe extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nv={type:"move"};class Ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(nv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const iv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sv=`
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

}`;class rv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new jt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ii({vertexShader:iv,fragmentShader:sv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ke(new Ft(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends is{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null;const x=new rv,m=t.getContextAttributes();let p=null,b=null;const S=[],v=[],A=new me;let w=null;const T=new Wt;T.viewport=new pt;const C=new Wt;C.viewport=new pt;const _=[T,C],y=new tv;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let F=S[J];return F===void 0&&(F=new Ta,S[J]=F),F.getTargetRaySpace()},this.getControllerGrip=function(J){let F=S[J];return F===void 0&&(F=new Ta,S[J]=F),F.getGripSpace()},this.getHand=function(J){let F=S[J];return F===void 0&&(F=new Ta,S[J]=F),F.getHandSpace()};function U(J){const F=v.indexOf(J.inputSource);if(F===-1)return;const se=S[F];se!==void 0&&(se.update(J.inputSource,J.frame,c||o),se.dispatchEvent({type:J.type,data:J.inputSource}))}function q(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",j);for(let J=0;J<S.length;J++){const F=v[J];F!==null&&(v[J]=null,S[J].disconnect(F))}P=null,H=null,x.reset(),e.setRenderTarget(p),h=null,f=null,d=null,s=null,b=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",q),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const F={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,F),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new ni(h.framebufferWidth,h.framebufferHeight,{format:bn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let F=null,se=null,K=null;m.depth&&(K=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=m.stencil?Gs:Os,se=m.stencil?Vs:Qi);const pe={colorFormat:t.RGBA8,depthFormat:K,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new ni(f.textureWidth,f.textureHeight,{format:bn,type:ti,depthTexture:new kd(f.textureWidth,f.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(J){for(let F=0;F<J.removed.length;F++){const se=J.removed[F],K=v.indexOf(se);K>=0&&(v[K]=null,S[K].disconnect(se))}for(let F=0;F<J.added.length;F++){const se=J.added[F];let K=v.indexOf(se);if(K===-1){for(let ue=0;ue<S.length;ue++)if(ue>=v.length){v.push(se),K=ue;break}else if(v[ue]===null){v[ue]=se,K=ue;break}if(K===-1)break}const pe=S[K];pe&&pe.connect(se)}}const W=new L,Z=new L;function G(J,F,se){W.setFromMatrixPosition(F.matrixWorld),Z.setFromMatrixPosition(se.matrixWorld);const K=W.distanceTo(Z),pe=F.projectionMatrix.elements,ue=se.projectionMatrix.elements,Ee=pe[14]/(pe[10]-1),Ve=pe[14]/(pe[10]+1),Be=(pe[9]+1)/pe[5],ze=(pe[9]-1)/pe[5],N=(pe[8]-1)/pe[0],zt=(ue[8]+1)/ue[0],et=Ee*N,He=Ee*zt,De=K/(-N+zt),it=De*-N;if(F.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(it),J.translateZ(De),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),pe[10]===-1)J.projectionMatrix.copy(F.projectionMatrix),J.projectionMatrixInverse.copy(F.projectionMatrixInverse);else{const Ae=Ee+De,R=Ve+De,M=et-it,V=He+(K-it),te=Be*Ve/R*Ae,ne=ze*Ve/R*Ae;J.projectionMatrix.makePerspective(M,V,te,ne,Ae,R),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function de(J,F){F===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(F.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let F=J.near,se=J.far;x.texture!==null&&(x.depthNear>0&&(F=x.depthNear),x.depthFar>0&&(se=x.depthFar)),y.near=C.near=T.near=F,y.far=C.far=T.far=se,(P!==y.near||H!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,H=y.far),T.layers.mask=J.layers.mask|2,C.layers.mask=J.layers.mask|4,y.layers.mask=T.layers.mask|C.layers.mask;const K=J.parent,pe=y.cameras;de(y,K);for(let ue=0;ue<pe.length;ue++)de(pe[ue],K);pe.length===2?G(y,T,C):y.projectionMatrix.copy(T.projectionMatrix),_e(J,y,K)};function _e(J,F,se){se===null?J.matrix.copy(F.matrixWorld):(J.matrix.copy(se.matrixWorld),J.matrix.invert(),J.matrix.multiply(F.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(F.projectionMatrix),J.projectionMatrixInverse.copy(F.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ao*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Te=null;function Ue(J,F){if(u=F.getViewerPose(c||o),g=F,u!==null){const se=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let K=!1;se.length!==y.cameras.length&&(y.cameras.length=0,K=!0);for(let ue=0;ue<se.length;ue++){const Ee=se[ue];let Ve=null;if(h!==null)Ve=h.getViewport(Ee);else{const ze=d.getViewSubImage(f,Ee);Ve=ze.viewport,ue===0&&(e.setRenderTargetTextures(b,ze.colorTexture,f.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(b))}let Be=_[ue];Be===void 0&&(Be=new Wt,Be.layers.enable(ue),Be.viewport=new pt,_[ue]=Be),Be.matrix.fromArray(Ee.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Ee.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),ue===0&&(y.matrix.copy(Be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),K===!0&&y.cameras.push(Be)}const pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")){const ue=d.getDepthInformation(se[0]);ue&&ue.isValid&&ue.texture&&x.init(e,ue,s.renderState)}}for(let se=0;se<S.length;se++){const K=v[se],pe=S[se];K!==null&&pe!==void 0&&pe.update(K,F,c||o)}Te&&Te(J,F),F.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:F}),g=null}const Ze=new Od;Ze.setAnimationLoop(Ue),this.setAnimationLoop=function(J){Te=J},this.dispose=function(){}}}const Gi=new Un,av=new ut;function lv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Dd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,Gi.copy(v),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),m.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(Gi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=s[b.id];v===void 0&&(g(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",m));const A=S.program;n.updateUBOMapping(b,A);const w=e.render.frame;r[b.id]!==w&&(f(b),r[b.id]=w)}function u(b){const S=d();b.__bindingPointIndex=S;const v=i.createBuffer(),A=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=s[b.id],v=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,T=v.length;w<T;w++){const C=Array.isArray(v[w])?v[w]:[v[w]];for(let _=0,y=C.length;_<y;_++){const P=C[_];if(h(P,w,_,A)===!0){const H=P.__offset,U=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let j=0;j<U.length;j++){const W=U[j],Z=x(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+q,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,q),q+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(b,S,v,A){const w=b.value,T=S+"_"+v;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{const C=A[T];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return A[T]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(b){const S=b.uniforms;let v=0;const A=16;for(let T=0,C=S.length;T<C;T++){const _=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,P=_.length;y<P;y++){const H=_[y],U=Array.isArray(H.value)?H.value:[H.value];for(let q=0,j=U.length;q<j;q++){const W=U[q],Z=x(W),G=v%A,de=G%Z.boundary,_e=G+de;v+=de,_e!==0&&A-_e<Z.storage&&(v+=A-_e),H.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=Z.storage}}}const w=v%A;return w>0&&(v+=A-w),b.__size=v,b.__cache={},this}function x(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class uv{constructor(e={}){const{canvas:t=Qf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this.toneMapping=yi,this.toneMappingExposure=1;const v=this;let A=!1,w=0,T=0,C=null,_=-1,y=null;const P=new pt,H=new pt;let U=null;const q=new tt(0);let j=0,W=t.width,Z=t.height,G=1,de=null,_e=null;const Te=new pt(0,0,W,Z),Ue=new pt(0,0,W,Z);let Ze=!1;const J=new Gl;let F=!1,se=!1;const K=new ut,pe=new ut,ue=new L,Ee=new pt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function ze(){return C===null?G:1}let N=n;function zt(E,k){return t.getContext(E,k)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nl}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",xe,!1),N===null){const k="webgl2";if(N=zt(k,E),N===null)throw zt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let et,He,De,it,Ae,R,M,V,te,ne,O,oe,ae,ve,Ge,le,z,ie,ge,ce,Re,be,Fe,I;function fe(){et=new m0(N),et.init(),be=new ev(N,et),He=new c0(N,et,e,be),De=new J_(N,et),He.reverseDepthBuffer&&f&&De.buffers.depth.setReversed(!0),it=new v0(N),Ae=new O_,R=new Q_(N,et,De,Ae,He,be,it),M=new d0(v),V=new p0(v),te=new wp(N),Fe=new a0(N,te),ne=new g0(N,te,it,Fe),O=new x0(N,ne,te,it),ge=new y0(N,He,R),le=new u0(Ae),oe=new N_(v,M,V,et,He,Fe,le),ae=new lv(v,Ae),ve=new k_,Ge=new W_(et),ie=new o0(v,M,V,De,O,h,l),z=new j_(v,O,He),I=new cv(N,it,He,De),ce=new l0(N,et,it),Re=new _0(N,et,it),it.programs=oe.programs,v.capabilities=He,v.extensions=et,v.properties=Ae,v.renderLists=ve,v.shadowMap=z,v.state=De,v.info=it}fe();const $=new ov(v,N);this.xr=$,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=et.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=et.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(W,Z,!1))},this.getSize=function(E){return E.set(W,Z)},this.setSize=function(E,k,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,Z=k,t.width=Math.floor(E*G),t.height=Math.floor(k*G),X===!0&&(t.style.width=E+"px",t.style.height=k+"px"),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(W*G,Z*G).floor()},this.setDrawingBufferSize=function(E,k,X){W=E,Z=k,G=X,t.width=Math.floor(E*X),t.height=Math.floor(k*X),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(Te)},this.setViewport=function(E,k,X,Y){E.isVector4?Te.set(E.x,E.y,E.z,E.w):Te.set(E,k,X,Y),De.viewport(P.copy(Te).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(Ue)},this.setScissor=function(E,k,X,Y){E.isVector4?Ue.set(E.x,E.y,E.z,E.w):Ue.set(E,k,X,Y),De.scissor(H.copy(Ue).multiplyScalar(G).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(E){De.setScissorTest(Ze=E)},this.setOpaqueSort=function(E){de=E},this.setTransparentSort=function(E){_e=E},this.getClearColor=function(E){return E.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(E=!0,k=!0,X=!0){let Y=0;if(E){let B=!1;if(C!==null){const he=C.texture.format;B=he===Hl||he===zl||he===Bl}if(B){const he=C.texture.type,Me=he===ti||he===Qi||he===Mr||he===Vs||he===Fl||he===kl,Ce=ie.getClearColor(),Pe=ie.getClearAlpha(),Xe=Ce.r,je=Ce.g,Le=Ce.b;Me?(g[0]=Xe,g[1]=je,g[2]=Le,g[3]=Pe,N.clearBufferuiv(N.COLOR,0,g)):(x[0]=Xe,x[1]=je,x[2]=Le,x[3]=Pe,N.clearBufferiv(N.COLOR,0,x))}else Y|=N.COLOR_BUFFER_BIT}k&&(Y|=N.DEPTH_BUFFER_BIT),X&&(Y|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),ve.dispose(),Ge.dispose(),Ae.dispose(),M.dispose(),V.dispose(),O.dispose(),Fe.dispose(),I.dispose(),oe.dispose(),$.dispose(),$.removeEventListener("sessionstart",lc),$.removeEventListener("sessionend",cc),Oi.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const E=it.autoReset,k=z.enabled,X=z.autoUpdate,Y=z.needsUpdate,B=z.type;fe(),it.autoReset=E,z.enabled=k,z.autoUpdate=X,z.needsUpdate=Y,z.type=B}function xe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function We(E){const k=E.target;k.removeEventListener("dispose",We),St(k)}function St(E){Ht(E),Ae.remove(E)}function Ht(E){const k=Ae.get(E).programs;k!==void 0&&(k.forEach(function(X){oe.releaseProgram(X)}),E.isShaderMaterial&&oe.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,X,Y,B,he){k===null&&(k=Ve);const Me=B.isMesh&&B.matrixWorld.determinant()<0,Ce=af(E,k,X,Y,B);De.setMaterial(Y,Me);let Pe=X.index,Xe=1;if(Y.wireframe===!0){if(Pe=ne.getWireframeAttribute(X),Pe===void 0)return;Xe=2}const je=X.drawRange,Le=X.attributes.position;let lt=je.start*Xe,yt=(je.start+je.count)*Xe;he!==null&&(lt=Math.max(lt,he.start*Xe),yt=Math.min(yt,(he.start+he.count)*Xe)),Pe!==null?(lt=Math.max(lt,0),yt=Math.min(yt,Pe.count)):Le!=null&&(lt=Math.max(lt,0),yt=Math.min(yt,Le.count));const Mt=yt-lt;if(Mt<0||Mt===1/0)return;Fe.setup(B,Y,Ce,X,Pe);let Kt,dt=ce;if(Pe!==null&&(Kt=te.get(Pe),dt=Re,dt.setIndex(Kt)),B.isMesh)Y.wireframe===!0?(De.setLineWidth(Y.wireframeLinewidth*ze()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(B.isLine){let Ie=Y.linewidth;Ie===void 0&&(Ie=1),De.setLineWidth(Ie*ze()),B.isLineSegments?dt.setMode(N.LINES):B.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else B.isPoints?dt.setMode(N.POINTS):B.isSprite&&dt.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)dt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))dt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ie=B._multiDrawStarts,Fn=B._multiDrawCounts,ht=B._multiDrawCount,_n=Pe?te.get(Pe).bytesPerElement:1,hs=Ae.get(Y).currentProgram.getUniforms();for(let en=0;en<ht;en++)hs.setValue(N,"_gl_DrawID",en),dt.render(Ie[en]/_n,Fn[en])}else if(B.isInstancedMesh)dt.renderInstances(lt,Mt,B.count);else if(X.isInstancedBufferGeometry){const Ie=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Fn=Math.min(X.instanceCount,Ie);dt.renderInstances(lt,Mt,Fn)}else dt.render(lt,Mt)};function mt(E,k,X){E.transparent===!0&&E.side===hn&&E.forceSinglePass===!1?(E.side=$t,E.needsUpdate=!0,Or(E,k,X),E.side=Ri,E.needsUpdate=!0,Or(E,k,X),E.side=hn):Or(E,k,X)}this.compile=function(E,k,X=null){X===null&&(X=E),p=Ge.get(X),p.init(k),S.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),E!==X&&E.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const Y=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let Me=0;Me<he.length;Me++){const Ce=he[Me];mt(Ce,X,B),Y.add(Ce)}else mt(he,X,B),Y.add(he)}),S.pop(),p=null,Y},this.compileAsync=function(E,k,X=null){const Y=this.compile(E,k,X);return new Promise(B=>{function he(){if(Y.forEach(function(Me){Ae.get(Me).currentProgram.isReady()&&Y.delete(Me)}),Y.size===0){B(E);return}setTimeout(he,10)}et.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let gn=null;function On(E){gn&&gn(E)}function lc(){Oi.stop()}function cc(){Oi.start()}const Oi=new Od;Oi.setAnimationLoop(On),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(E){gn=E,$.setAnimationLoop(E),E===null?Oi.stop():Oi.start()},$.addEventListener("sessionstart",lc),$.addEventListener("sessionend",cc),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,k,C),p=Ge.get(E,S.length),p.init(k),S.push(p),pe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),J.setFromProjectionMatrix(pe),se=this.localClippingEnabled,F=le.init(this.clippingPlanes,se),m=ve.get(E,b.length),m.init(),b.push(m),$.enabled===!0&&$.isPresenting===!0){const he=v.xr.getDepthSensingMesh();he!==null&&Jo(he,k,-1/0,v.sortObjects)}Jo(E,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(de,_e),Be=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Be&&ie.addToRenderList(m,E),this.info.render.frame++,F===!0&&le.beginShadows();const X=p.state.shadowsArray;z.render(X,E,k),F===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(p.setupLights(),k.isArrayCamera){const he=k.cameras;if(B.length>0)for(let Me=0,Ce=he.length;Me<Ce;Me++){const Pe=he[Me];dc(Y,B,E,Pe)}Be&&ie.render(E);for(let Me=0,Ce=he.length;Me<Ce;Me++){const Pe=he[Me];uc(m,E,Pe,Pe.viewport)}}else B.length>0&&dc(Y,B,E,k),Be&&ie.render(E),uc(m,E,k);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(v,E,k),Fe.resetDefaultState(),_=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],F===!0&&le.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Jo(E,k,X,Y){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||J.intersectsSprite(E)){Y&&Ee.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pe);const Me=O.update(E),Ce=E.material;Ce.visible&&m.push(E,Me,Ce,X,Ee.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||J.intersectsObject(E))){const Me=O.update(E),Ce=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ee.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ee.copy(Me.boundingSphere.center)),Ee.applyMatrix4(E.matrixWorld).applyMatrix4(pe)),Array.isArray(Ce)){const Pe=Me.groups;for(let Xe=0,je=Pe.length;Xe<je;Xe++){const Le=Pe[Xe],lt=Ce[Le.materialIndex];lt&&lt.visible&&m.push(E,Me,lt,X,Ee.z,Le)}}else Ce.visible&&m.push(E,Me,Ce,X,Ee.z,null)}}const he=E.children;for(let Me=0,Ce=he.length;Me<Ce;Me++)Jo(he[Me],k,X,Y)}function uc(E,k,X,Y){const B=E.opaque,he=E.transmissive,Me=E.transparent;p.setupLightsView(X),F===!0&&le.setGlobalState(v.clippingPlanes,X),Y&&De.viewport(P.copy(Y)),B.length>0&&Nr(B,k,X),he.length>0&&Nr(he,k,X),Me.length>0&&Nr(Me,k,X),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function dc(E,k,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new ni(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?js:ti,minFilter:Ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const he=p.state.transmissionRenderTarget[Y.id],Me=Y.viewport||P;he.setSize(Me.z,Me.w);const Ce=v.getRenderTarget();v.setRenderTarget(he),v.getClearColor(q),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),Be&&ie.render(X);const Pe=v.toneMapping;v.toneMapping=yi;const Xe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),F===!0&&le.setGlobalState(v.clippingPlanes,Y),Nr(E,X,Y),R.updateMultisampleRenderTarget(he),R.updateRenderTargetMipmap(he),et.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let Le=0,lt=k.length;Le<lt;Le++){const yt=k[Le],Mt=yt.object,Kt=yt.geometry,dt=yt.material,Ie=yt.group;if(dt.side===hn&&Mt.layers.test(Y.layers)){const Fn=dt.side;dt.side=$t,dt.needsUpdate=!0,hc(Mt,X,Y,Kt,dt,Ie),dt.side=Fn,dt.needsUpdate=!0,je=!0}}je===!0&&(R.updateMultisampleRenderTarget(he),R.updateRenderTargetMipmap(he))}v.setRenderTarget(Ce),v.setClearColor(q,j),Xe!==void 0&&(Y.viewport=Xe),v.toneMapping=Pe}function Nr(E,k,X){const Y=k.isScene===!0?k.overrideMaterial:null;for(let B=0,he=E.length;B<he;B++){const Me=E[B],Ce=Me.object,Pe=Me.geometry,Xe=Y===null?Me.material:Y,je=Me.group;Ce.layers.test(X.layers)&&hc(Ce,k,X,Pe,Xe,je)}}function hc(E,k,X,Y,B,he){E.onBeforeRender(v,k,X,Y,B,he),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(v,k,X,Y,E,he),B.transparent===!0&&B.side===hn&&B.forceSinglePass===!1?(B.side=$t,B.needsUpdate=!0,v.renderBufferDirect(X,k,Y,B,E,he),B.side=Ri,B.needsUpdate=!0,v.renderBufferDirect(X,k,Y,B,E,he),B.side=hn):v.renderBufferDirect(X,k,Y,B,E,he),E.onAfterRender(v,k,X,Y,B,he)}function Or(E,k,X){k.isScene!==!0&&(k=Ve);const Y=Ae.get(E),B=p.state.lights,he=p.state.shadowsArray,Me=B.state.version,Ce=oe.getParameters(E,B.state,he,k,X),Pe=oe.getProgramCacheKey(Ce);let Xe=Y.programs;Y.environment=E.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(E.isMeshStandardMaterial?V:M).get(E.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,Xe===void 0&&(E.addEventListener("dispose",We),Xe=new Map,Y.programs=Xe);let je=Xe.get(Pe);if(je!==void 0){if(Y.currentProgram===je&&Y.lightsStateVersion===Me)return pc(E,Ce),je}else Ce.uniforms=oe.getUniforms(E),E.onBeforeCompile(Ce,v),je=oe.acquireProgram(Ce,Pe),Xe.set(Pe,je),Y.uniforms=Ce.uniforms;const Le=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=le.uniform),pc(E,Ce),Y.needsLights=cf(E),Y.lightsStateVersion=Me,Y.needsLights&&(Le.ambientLightColor.value=B.state.ambient,Le.lightProbe.value=B.state.probe,Le.directionalLights.value=B.state.directional,Le.directionalLightShadows.value=B.state.directionalShadow,Le.spotLights.value=B.state.spot,Le.spotLightShadows.value=B.state.spotShadow,Le.rectAreaLights.value=B.state.rectArea,Le.ltc_1.value=B.state.rectAreaLTC1,Le.ltc_2.value=B.state.rectAreaLTC2,Le.pointLights.value=B.state.point,Le.pointLightShadows.value=B.state.pointShadow,Le.hemisphereLights.value=B.state.hemi,Le.directionalShadowMap.value=B.state.directionalShadowMap,Le.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Le.spotShadowMap.value=B.state.spotShadowMap,Le.spotLightMatrix.value=B.state.spotLightMatrix,Le.spotLightMap.value=B.state.spotLightMap,Le.pointShadowMap.value=B.state.pointShadowMap,Le.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=je,Y.uniformsList=null,je}function fc(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=Mo.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function pc(E,k){const X=Ae.get(E);X.outputColorSpace=k.outputColorSpace,X.batching=k.batching,X.batchingColor=k.batchingColor,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.instancingMorph=k.instancingMorph,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function af(E,k,X,Y,B){k.isScene!==!0&&(k=Ve),R.resetTextureUnits();const he=k.fog,Me=Y.isMeshStandardMaterial?k.environment:null,Ce=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ks,Pe=(Y.isMeshStandardMaterial?V:M).get(Y.envMap||Me),Xe=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,je=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Le=!!X.morphAttributes.position,lt=!!X.morphAttributes.normal,yt=!!X.morphAttributes.color;let Mt=yi;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Mt=v.toneMapping);const Kt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,dt=Kt!==void 0?Kt.length:0,Ie=Ae.get(Y),Fn=p.state.lights;if(F===!0&&(se===!0||E!==y)){const an=E===y&&Y.id===_;le.setState(Y,E,an)}let ht=!1;Y.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Fn.state.version||Ie.outputColorSpace!==Ce||B.isBatchedMesh&&Ie.batching===!1||!B.isBatchedMesh&&Ie.batching===!0||B.isBatchedMesh&&Ie.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ie.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ie.instancing===!1||!B.isInstancedMesh&&Ie.instancing===!0||B.isSkinnedMesh&&Ie.skinning===!1||!B.isSkinnedMesh&&Ie.skinning===!0||B.isInstancedMesh&&Ie.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ie.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ie.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ie.instancingMorph===!1&&B.morphTexture!==null||Ie.envMap!==Pe||Y.fog===!0&&Ie.fog!==he||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==le.numPlanes||Ie.numIntersection!==le.numIntersection)||Ie.vertexAlphas!==Xe||Ie.vertexTangents!==je||Ie.morphTargets!==Le||Ie.morphNormals!==lt||Ie.morphColors!==yt||Ie.toneMapping!==Mt||Ie.morphTargetsCount!==dt)&&(ht=!0):(ht=!0,Ie.__version=Y.version);let _n=Ie.currentProgram;ht===!0&&(_n=Or(Y,k,B));let hs=!1,en=!1,nr=!1;const bt=_n.getUniforms(),Cn=Ie.uniforms;if(De.useProgram(_n.program)&&(hs=!0,en=!0,nr=!0),Y.id!==_&&(_=Y.id,en=!0),hs||y!==E){De.buffers.depth.getReversed()?(K.copy(E.projectionMatrix),tp(K),np(K),bt.setValue(N,"projectionMatrix",K)):bt.setValue(N,"projectionMatrix",E.projectionMatrix),bt.setValue(N,"viewMatrix",E.matrixWorldInverse);const ri=bt.map.cameraPosition;ri!==void 0&&ri.setValue(N,ue.setFromMatrixPosition(E.matrixWorld)),He.logarithmicDepthBuffer&&bt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&bt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,en=!0,nr=!0)}if(B.isSkinnedMesh){bt.setOptional(N,B,"bindMatrix"),bt.setOptional(N,B,"bindMatrixInverse");const an=B.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),bt.setValue(N,"boneTexture",an.boneTexture,R))}B.isBatchedMesh&&(bt.setOptional(N,B,"batchingTexture"),bt.setValue(N,"batchingTexture",B._matricesTexture,R),bt.setOptional(N,B,"batchingIdTexture"),bt.setValue(N,"batchingIdTexture",B._indirectTexture,R),bt.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&bt.setValue(N,"batchingColorTexture",B._colorsTexture,R));const ir=X.morphAttributes;if((ir.position!==void 0||ir.normal!==void 0||ir.color!==void 0)&&ge.update(B,X,_n),(en||Ie.receiveShadow!==B.receiveShadow)&&(Ie.receiveShadow=B.receiveShadow,bt.setValue(N,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Cn.envMap.value=Pe,Cn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&k.environment!==null&&(Cn.envMapIntensity.value=k.environmentIntensity),en&&(bt.setValue(N,"toneMappingExposure",v.toneMappingExposure),Ie.needsLights&&lf(Cn,nr),he&&Y.fog===!0&&ae.refreshFogUniforms(Cn,he),ae.refreshMaterialUniforms(Cn,Y,G,Z,p.state.transmissionRenderTarget[E.id]),Mo.upload(N,fc(Ie),Cn,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Mo.upload(N,fc(Ie),Cn,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&bt.setValue(N,"center",B.center),bt.setValue(N,"modelViewMatrix",B.modelViewMatrix),bt.setValue(N,"normalMatrix",B.normalMatrix),bt.setValue(N,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const an=Y.uniformsGroups;for(let ri=0,oi=an.length;ri<oi;ri++){const mc=an[ri];I.update(mc,_n),I.bind(mc,_n)}}return _n}function lf(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function cf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,k,X){Ae.get(E.texture).__webglTexture=k,Ae.get(E.depthTexture).__webglTexture=X;const Y=Ae.get(E);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,k){const X=Ae.get(E);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,X=0){C=E,w=k,T=X;let Y=!0,B=null,he=!1,Me=!1;if(E){const Pe=Ae.get(E);if(Pe.__useDefaultFramebuffer!==void 0)De.bindFramebuffer(N.FRAMEBUFFER,null),Y=!1;else if(Pe.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Pe.__hasExternalTextures)R.rebindTextures(E,Ae.get(E.texture).__webglTexture,Ae.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Le=E.depthTexture;if(Pe.__boundDepthTexture!==Le){if(Le!==null&&Ae.has(Le)&&(E.width!==Le.image.width||E.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Xe=E.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Me=!0);const je=Ae.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(je[k])?B=je[k][X]:B=je[k],he=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?B=Ae.get(E).__webglMultisampledFramebuffer:Array.isArray(je)?B=je[X]:B=je,P.copy(E.viewport),H.copy(E.scissor),U=E.scissorTest}else P.copy(Te).multiplyScalar(G).floor(),H.copy(Ue).multiplyScalar(G).floor(),U=Ze;if(De.bindFramebuffer(N.FRAMEBUFFER,B)&&Y&&De.drawBuffers(E,B),De.viewport(P),De.scissor(H),De.setScissorTest(U),he){const Pe=Ae.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Pe.__webglTexture,X)}else if(Me){const Pe=Ae.get(E.texture),Xe=k||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.__webglTexture,X||0,Xe)}_=-1},this.readRenderTargetPixels=function(E,k,X,Y,B,he,Me){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){De.bindFramebuffer(N.FRAMEBUFFER,Ce);try{const Pe=E.texture,Xe=Pe.format,je=Pe.type;if(!He.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-Y&&X>=0&&X<=E.height-B&&N.readPixels(k,X,Y,B,be.convert(Xe),be.convert(je),he)}finally{const Pe=C!==null?Ae.get(C).__webglFramebuffer:null;De.bindFramebuffer(N.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,k,X,Y,B,he,Me){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Pe=E.texture,Xe=Pe.format,je=Pe.type;if(!He.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=E.width-Y&&X>=0&&X<=E.height-B){De.bindFramebuffer(N.FRAMEBUFFER,Ce);const Le=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.bufferData(N.PIXEL_PACK_BUFFER,he.byteLength,N.STREAM_READ),N.readPixels(k,X,Y,B,be.convert(Xe),be.convert(je),0);const lt=C!==null?Ae.get(C).__webglFramebuffer:null;De.bindFramebuffer(N.FRAMEBUFFER,lt);const yt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ep(N,yt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,he),N.deleteBuffer(Le),N.deleteSync(yt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,k=null,X=0){E.isTexture!==!0&&(pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1]);const Y=Math.pow(2,-X),B=Math.floor(E.image.width*Y),he=Math.floor(E.image.height*Y),Me=k!==null?k.x:0,Ce=k!==null?k.y:0;R.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,Me,Ce,B,he),De.unbindTexture()},this.copyTextureToTexture=function(E,k,X=null,Y=null,B=0){E.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,E=arguments[1],k=arguments[2],B=arguments[3]||0,X=null);let he,Me,Ce,Pe,Xe,je,Le,lt,yt;const Mt=E.isCompressedTexture?E.mipmaps[B]:E.image;X!==null?(he=X.max.x-X.min.x,Me=X.max.y-X.min.y,Ce=X.isBox3?X.max.z-X.min.z:1,Pe=X.min.x,Xe=X.min.y,je=X.isBox3?X.min.z:0):(he=Mt.width,Me=Mt.height,Ce=Mt.depth||1,Pe=0,Xe=0,je=0),Y!==null?(Le=Y.x,lt=Y.y,yt=Y.z):(Le=0,lt=0,yt=0);const Kt=be.convert(k.format),dt=be.convert(k.type);let Ie;k.isData3DTexture?(R.setTexture3D(k,0),Ie=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(R.setTexture2DArray(k,0),Ie=N.TEXTURE_2D_ARRAY):(R.setTexture2D(k,0),Ie=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const Fn=N.getParameter(N.UNPACK_ROW_LENGTH),ht=N.getParameter(N.UNPACK_IMAGE_HEIGHT),_n=N.getParameter(N.UNPACK_SKIP_PIXELS),hs=N.getParameter(N.UNPACK_SKIP_ROWS),en=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Pe),N.pixelStorei(N.UNPACK_SKIP_ROWS,Xe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,je);const nr=E.isDataArrayTexture||E.isData3DTexture,bt=k.isDataArrayTexture||k.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Cn=Ae.get(E),ir=Ae.get(k),an=Ae.get(Cn.__renderTarget),ri=Ae.get(ir.__renderTarget);De.bindFramebuffer(N.READ_FRAMEBUFFER,an.__webglFramebuffer),De.bindFramebuffer(N.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let oi=0;oi<Ce;oi++)nr&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(E).__webglTexture,B,je+oi),E.isDepthTexture?(bt&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(k).__webglTexture,B,yt+oi),N.blitFramebuffer(Pe,Xe,he,Me,Le,lt,he,Me,N.DEPTH_BUFFER_BIT,N.NEAREST)):bt?N.copyTexSubImage3D(Ie,B,Le,lt,yt+oi,Pe,Xe,he,Me):N.copyTexSubImage2D(Ie,B,Le,lt,yt+oi,Pe,Xe,he,Me);De.bindFramebuffer(N.READ_FRAMEBUFFER,null),De.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else bt?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Ie,B,Le,lt,yt,he,Me,Ce,Kt,dt,Mt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(Ie,B,Le,lt,yt,he,Me,Ce,Kt,Mt.data):N.texSubImage3D(Ie,B,Le,lt,yt,he,Me,Ce,Kt,dt,Mt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,B,Le,lt,he,Me,Kt,dt,Mt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,B,Le,lt,Mt.width,Mt.height,Kt,Mt.data):N.texSubImage2D(N.TEXTURE_2D,B,Le,lt,he,Me,Kt,dt,Mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Fn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ht),N.pixelStorei(N.UNPACK_SKIP_PIXELS,_n),N.pixelStorei(N.UNPACK_SKIP_ROWS,hs),N.pixelStorei(N.UNPACK_SKIP_IMAGES,en),B===0&&k.generateMipmaps&&N.generateMipmap(Ie),De.unbindTexture()},this.copyTextureToTexture3D=function(E,k,X=null,Y=null,B=0){return E.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,E=arguments[2],k=arguments[3],B=arguments[4]||0),pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,k,X,Y,B)},this.initRenderTarget=function(E){Ae.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),De.unbindTexture()},this.resetState=function(){w=0,T=0,C=null,De.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}class Gd extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Wd extends Js{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Co=new L,Po=new L,fu=new ut,cr=new Ho,so=new zo,Aa=new L,pu=new L;class dv extends Rt{constructor(e=new Bt,t=new Wd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Co.fromBufferAttribute(t,s-1),Po.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Co.distanceTo(Po);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;fu.copy(s).invert(),cr.copy(e.ray).applyMatrix4(fu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=h,m=g-1;x<m;x+=c){const p=u.getX(x),b=u.getX(x+1),S=ro(this,e,cr,l,p,b);S&&t.push(S)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(h),p=ro(this,e,cr,l,x,m);p&&t.push(p)}}else{const h=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=h,m=g-1;x<m;x+=c){const p=ro(this,e,cr,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=ro(this,e,cr,l,g-1,h);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ro(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(Co.fromBufferAttribute(o,s),Po.fromBufferAttribute(o,r),t.distanceSqToSegment(Co,Po,Aa,pu)>n)return;Aa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Aa);if(!(l<e.near||l>e.far))return{distance:l,point:pu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Go extends jt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,h=(o-u)/f;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new me:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,s=[],r=[],o=[],a=new L,l=new ut;for(let h=0;h<=e;h++){const g=h/e;s[h]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Pt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(l.makeRotationAxis(a,g))}o[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(Pt(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(h=-h);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],h*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Xl extends Nn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new me){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,h=c-this.aY;l=f*u-h*d+this.aX,c=f*d+h*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class hv extends Xl{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ql(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,h=(a-o)/u-(l-o)/(u+d)+(l-a)/d;f*=u,h*=u,s(o,a,f,h)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const oo=new L,Ra=new ql,Ca=new ql,Pa=new ql;class Xd extends Nn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(oo.subVectors(s[0],s[1]).add(s[0]),c=oo);const d=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(oo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=oo),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),m=Math.pow(f.distanceToSquared(u),h);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Ra.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,g,x,m),Ca.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,g,x,m),Pa.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(Ra.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Ca.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Pa.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return n.set(Ra.calc(l),Ca.calc(l),Pa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function mu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function fv(i,e){const t=1-i;return t*t*e}function pv(i,e){return 2*(1-i)*i*e}function mv(i,e){return i*i*e}function _r(i,e,t,n){return fv(i,e)+pv(i,t)+mv(i,n)}function gv(i,e){const t=1-i;return t*t*t*e}function _v(i,e){const t=1-i;return 3*t*t*i*e}function vv(i,e){return 3*(1-i)*i*i*e}function yv(i,e){return i*i*i*e}function vr(i,e,t,n,s){return gv(i,e)+_v(i,t)+vv(i,n)+yv(i,s)}class qd extends Nn{constructor(e=new me,t=new me,n=new me,s=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new me){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vr(e,s.x,r.x,o.x,a.x),vr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xv extends Nn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vr(e,s.x,r.x,o.x,a.x),vr(e,s.y,r.y,o.y,a.y),vr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Yd extends Nn{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sv extends Nn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $d extends Nn{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(_r(e,s.x,r.x,o.x),_r(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jd extends Nn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(_r(e,s.x,r.x,o.x),_r(e,s.y,r.y,o.y),_r(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yl extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(mu(a,l.x,c.x,u.x,d.x),mu(a,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new me().fromArray(s))}return this}}var El=Object.freeze({__proto__:null,ArcCurve:hv,CatmullRomCurve3:Xd,CubicBezierCurve:qd,CubicBezierCurve3:xv,EllipseCurve:Xl,LineCurve:Yd,LineCurve3:Sv,QuadraticBezierCurve:$d,QuadraticBezierCurve3:jd,SplineCurve:Yl});class Mv extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new El[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new El[s.type]().fromJSON(s))}return this}}class bv extends Mv{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Yd(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new $d(this.currentPoint.clone(),new me(e,t),new me(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new qd(this.currentPoint.clone(),new me(e,t),new me(n,s),new me(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Yl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Xl(e,t,n,s,r,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ir extends Bt{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Pt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,d=new L,f=new me,h=new L,g=new L,x=new L;let m=0,p=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:m=e[b+1].x-e[b].x,p=e[b+1].y-e[b].y,h.x=p*1,h.y=-m,h.z=p*0,x.copy(h),h.normalize(),l.push(h.x,h.y,h.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[b+1].x-e[b].x,p=e[b+1].y-e[b].y,h.x=p*1,h.y=-m,h.z=p*0,g.copy(h),h.x+=x.x,h.y+=x.y,h.z+=x.z,h.normalize(),l.push(h.x,h.y,h.z),x.copy(g)}for(let b=0;b<=t;b++){const S=n+b*u*s,v=Math.sin(S),A=Math.cos(S);for(let w=0;w<=e.length-1;w++){d.x=e[w].x*v,d.y=e[w].y,d.z=e[w].x*A,o.push(d.x,d.y,d.z),f.x=b/t,f.y=w/(e.length-1),a.push(f.x,f.y);const T=l[3*w+0]*v,C=l[3*w+1],_=l[3*w+0]*A;c.push(T,C,_)}}for(let b=0;b<t;b++)for(let S=0;S<e.length-1;S++){const v=S+b*e.length,A=v,w=v+e.length,T=v+e.length+1,C=v+1;r.push(A,w,C),r.push(T,C,w)}this.setIndex(r),this.setAttribute("position",new gt(o,3)),this.setAttribute("uv",new gt(a,2)),this.setAttribute("normal",new gt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.points,e.segments,e.phiStart,e.phiLength)}}class dn extends Ir{constructor(e=1,t=1,n=4,s=8){const r=new bv;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new dn(e.radius,e.length,e.capSegments,e.radialSegments)}}class $l extends Bt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new L,u=new me;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const h=n+d/t*s;c.x=e*Math.cos(h),c.y=e*Math.sin(h),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Nt extends Bt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],h=[];let g=0;const x=[],m=n/2;let p=0;b(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new gt(d,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(h,2));function b(){const v=new L,A=new L;let w=0;const T=(t-e)/n;for(let C=0;C<=r;C++){const _=[],y=C/r,P=y*(t-e)+e;for(let H=0;H<=s;H++){const U=H/s,q=U*l+a,j=Math.sin(q),W=Math.cos(q);A.x=P*j,A.y=-y*n+m,A.z=P*W,d.push(A.x,A.y,A.z),v.set(j,T,W).normalize(),f.push(v.x,v.y,v.z),h.push(U,1-y),_.push(g++)}x.push(_)}for(let C=0;C<s;C++)for(let _=0;_<r;_++){const y=x[_][C],P=x[_+1][C],H=x[_+1][C+1],U=x[_][C+1];(e>0||_!==0)&&(u.push(y,P,U),w+=3),(t>0||_!==r-1)&&(u.push(P,H,U),w+=3)}c.addGroup(p,w,0),p+=w}function S(v){const A=g,w=new me,T=new L;let C=0;const _=v===!0?e:t,y=v===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,m*y,0),f.push(0,y,0),h.push(.5,.5),g++;const P=g;for(let H=0;H<=s;H++){const q=H/s*l+a,j=Math.cos(q),W=Math.sin(q);T.x=_*W,T.y=m*y,T.z=_*j,d.push(T.x,T.y,T.z),f.push(0,y,0),w.x=j*.5+.5,w.y=W*.5*y+.5,h.push(w.x,w.y),g++}for(let H=0;H<s;H++){const U=A+H,q=P+H;v===!0?u.push(q,q+1,U):u.push(q+1,q,U),C+=3}c.addGroup(p,C,v===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yr extends Nt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new yr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jl extends Bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(r.slice(),3)),this.setAttribute("uv",new gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const S=new L,v=new L,A=new L;for(let w=0;w<t.length;w+=3)h(t[w+0],S),h(t[w+1],v),h(t[w+2],A),l(S,v,A,b)}function l(b,S,v,A){const w=A+1,T=[];for(let C=0;C<=w;C++){T[C]=[];const _=b.clone().lerp(v,C/w),y=S.clone().lerp(v,C/w),P=w-C;for(let H=0;H<=P;H++)H===0&&C===w?T[C][H]=_:T[C][H]=_.clone().lerp(y,H/P)}for(let C=0;C<w;C++)for(let _=0;_<2*(w-C)-1;_++){const y=Math.floor(_/2);_%2===0?(f(T[C][y+1]),f(T[C+1][y]),f(T[C][y])):(f(T[C][y+1]),f(T[C+1][y+1]),f(T[C+1][y]))}}function c(b){const S=new L;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(b),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const b=new L;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];const v=m(b)/2/Math.PI+.5,A=p(b)/Math.PI+.5;o.push(v,1-A)}g(),d()}function d(){for(let b=0;b<o.length;b+=6){const S=o[b+0],v=o[b+2],A=o[b+4],w=Math.max(S,v,A),T=Math.min(S,v,A);w>.9&&T<.1&&(S<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),A<.2&&(o[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function h(b,S){const v=b*3;S.x=e[v+0],S.y=e[v+1],S.z=e[v+2]}function g(){const b=new L,S=new L,v=new L,A=new L,w=new me,T=new me,C=new me;for(let _=0,y=0;_<r.length;_+=9,y+=6){b.set(r[_+0],r[_+1],r[_+2]),S.set(r[_+3],r[_+4],r[_+5]),v.set(r[_+6],r[_+7],r[_+8]),w.set(o[y+0],o[y+1]),T.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),A.copy(b).add(S).add(v).divideScalar(3);const P=m(A);x(w,y+0,b,P),x(T,y+2,S,P),x(C,y+4,v,P)}}function x(b,S,v,A){A<0&&b.x===1&&(o[S]=b.x-1),v.x===0&&v.z===0&&(o[S]=A/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.vertices,e.indices,e.radius,e.details)}}class Kl extends jl{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kl(e.radius,e.detail)}}class ot extends Bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new L,f=new L,h=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const b=[],S=p/n;let v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let A=0;A<=t;A++){const w=A/t;d.x=-e*Math.cos(s+w*r)*Math.sin(o+S*a),d.y=e*Math.cos(o+S*a),d.z=e*Math.sin(s+w*r)*Math.sin(o+S*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(w+v,1-S),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const S=u[p][b+1],v=u[p][b],A=u[p+1][b],w=u[p+1][b+1];(p!==0||o>0)&&h.push(S,v,w),(p!==n-1||l<Math.PI)&&h.push(v,A,w)}this.setIndex(h),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ot(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Xt extends Bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new L,d=new L,f=new L;for(let h=0;h<=n;h++)for(let g=0;g<=s;g++){const x=g/s*r,m=h/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(h/n)}for(let h=1;h<=n;h++)for(let g=1;g<=s;g++){const x=(s+1)*h+g-1,m=(s+1)*(h-1)+g-1,p=(s+1)*(h-1)+g,b=(s+1)*h+g;o.push(x,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Jl extends Bt{constructor(e=new jd(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new me;let u=new L;const d=[],f=[],h=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new gt(d,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(h,2));function x(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),b(),p()}function m(S){u=e.getPointAt(S/t,u);const v=o.normals[S],A=o.binormals[S];for(let w=0;w<=s;w++){const T=w/s*Math.PI*2,C=Math.sin(T),_=-Math.cos(T);l.x=_*v.x+C*A.x,l.y=_*v.y+C*A.y,l.z=_*v.z+C*A.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let S=1;S<=t;S++)for(let v=1;v<=s;v++){const A=(s+1)*(S-1)+(v-1),w=(s+1)*S+(v-1),T=(s+1)*S+v,C=(s+1)*(S-1)+v;g.push(A,w,C),g.push(w,T,C)}}function b(){for(let S=0;S<=t;S++)for(let v=0;v<=s;v++)c.x=S/t,c.y=v/s,h.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Jl(new El[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class nt extends Js{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ed,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gu extends nt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wo extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ev extends Wo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const La=new ut,_u=new L,vu=new L;class Zl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gl,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_u.setFromMatrixPosition(e.matrixWorld),t.position.copy(_u),vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vu),t.updateMatrixWorld(),La.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(La)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class wv extends Zl{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ao*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class yu extends Wo{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new wv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const xu=new ut,ur=new L,Da=new L;class Tv extends Zl{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(e.matrixWorld),n.position.copy(ur),Da.copy(n.position),Da.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Da),n.updateMatrixWorld(),s.makeTranslation(-ur.x,-ur.y,-ur.z),xu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xu)}}class Kd extends Wo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Tv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Av extends Zl{constructor(){super(new Fd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rv extends Wo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Av}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Cv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Su(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Su();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Su(){return performance.now()}const Mu=new ut;class Pv{constructor(e,t,n=0,s=1/0){this.ray=new Ho(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Mu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mu),this}intersectObject(e,t=!0,n=[]){return wl(e,this,n,t),n.sort(bu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)wl(e[s],this,n,t);return n.sort(bu),n}}function bu(i,e){return i.distance-e.distance}function wl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)wl(r[o],e,t,!0)}}class Eu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Lv extends is{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nl);function Jd(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Bt;let c=0;for(let u=0;u<i.length;++u){const d=i[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[h]===void 0&&(o[h]=[]),o[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,h,u),c+=h}}if(t){let u=0;const d=[];for(let f=0;f<i.length;++f){const h=i[f].index;for(let g=0;g<h.count;++g)d.push(h.getX(g)+u);u+=i[f].attributes.position.count}l.setIndex(d)}for(const u in r){const d=wu(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in o){const d=o[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const h=[];for(let x=0;x<o[u].length;++x)h.push(o[u][x][f]);const g=wu(h);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function wu(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new An(o,t,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const d=l/t;for(let f=0,h=u.count;f<h;f++)for(let g=0;g<t;g++){const x=u.getComponent(f,g);a.setComponent(f+d,g,x)}}else o.set(u.array,l);l+=u.count*t}return s!==void 0&&(a.gpuType=s),a}function Rn(i,e,t={}){const n=document.createElement("canvas");n.width=i,n.height=i;const s=n.getContext("2d");e(s,i);const r=new Go(n);return r.wrapS=Sr,r.wrapT=Sr,t.srgb&&(r.colorSpace=Ot),t.repeat&&r.repeat.set(t.repeat[0],t.repeat[1]),r.anisotropy=4,r}function Ci(i){let e=i>>>0;return()=>(e=(e*1103515245+12345)%2147483648,e/2147483648)}function $n(i,e,t,n,s,r,o){for(let a=0;a<t;a++){const l=r+n()*(o-r);i.fillStyle=s(.03+n()*.08),i.beginPath(),i.ellipse(n()*e,n()*e,l,l*(.4+n()*.6),n()*Math.PI,0,Math.PI*2),i.fill()}}function br(i=[3,3]){const e=(n,s)=>{n.fillStyle="#f4f1ec",n.fillRect(0,0,s,s);const r=Ci(11);for(let o=0;o<s;o+=2)n.fillStyle=`rgba(120,110,100,${.05+r()*.06})`,n.fillRect(0,o,s,1);for(let o=0;o<s;o+=2)n.fillStyle=`rgba(255,255,255,${.05+r()*.05})`,n.fillRect(o,0,1,s);$n(n,s,500,r,o=>`rgba(105,95,85,${o})`,.6,1.8)},t=(n,s)=>{n.fillStyle="#808080",n.fillRect(0,0,s,s);for(let r=0;r<s;r+=3)n.fillStyle=r%6===0?"#a8a8a8":"#5c5c5c",n.fillRect(0,r,s,1.4);for(let r=0;r<s;r+=3)n.fillStyle=r%6===0?"rgba(168,168,168,0.55)":"rgba(92,92,92,0.55)",n.fillRect(r,0,1.4,s)};return{map:Rn(256,e,{srgb:!0,repeat:i}),bump:Rn(256,t,{repeat:i})}}function Dv(){const i=(t,n)=>{t.fillStyle="#fdf6f0",t.fillRect(0,0,n,n);const s=Ci(23);$n(t,n,260,s,r=>`rgba(214,150,110,${r*.7})`,4,16),$n(t,n,200,s,r=>`rgba(240,200,170,${r})`,3,10),$n(t,n,900,s,r=>`rgba(190,130,95,${r*.5})`,.5,1.2)},e=(t,n)=>{t.fillStyle="#808080",t.fillRect(0,0,n,n);const s=Ci(29);$n(t,n,2600,s,r=>`rgba(255,255,255,${r})`,.4,1.1),$n(t,n,2600,s,r=>`rgba(0,0,0,${r})`,.4,1.1)};return{map:Rn(256,i,{srgb:!0}),bump:Rn(256,e)}}function Iv(){const i=(e,t)=>(n,s)=>{n.fillStyle=e,n.fillRect(0,0,s,s);const r=Ci(37);for(let o=0;o<s;o+=1){const a=(r()-.5)*t;n.fillStyle=a>0?`rgba(255,235,210,${a})`:`rgba(10,5,0,${-a})`;const l=1+r()*2;n.fillRect(o,0,l,s),o+=l-1}for(let o=0;o<40;o++)n.fillStyle=`rgba(15,8,4,${.1+r()*.12})`,n.fillRect(r()*s,0,1,s)};return{map:Rn(256,i("#f7f2ec",.16),{srgb:!0,repeat:[2,1]}),bump:Rn(256,i("#808080",.85),{repeat:[2,1]})}}function Uv(){return Rn(512,(i,e)=>{const t=Ci(41),n=e/4;for(let s=0;s<4;s++){const r=.9+t()*.2,o=Math.round(178*r),a=Math.round(138*r),l=Math.round(98*r);i.fillStyle=`rgb(${o},${a},${l})`,i.fillRect(0,s*n,e,n);for(let u=0;u<46;u++){const d=s*n+t()*n;i.strokeStyle=`rgba(110,74,44,${.05+t()*.13})`,i.lineWidth=.6+t()*1.6,i.beginPath(),i.moveTo(0,d);for(let f=0;f<=e;f+=32)i.lineTo(f,d+Math.sin(f*.02+u)*2.2+(t()-.5)*2);i.stroke()}i.fillStyle="rgba(70,45,26,0.55)",i.fillRect(0,s*n,e,2);const c=t()*e;i.fillRect(c,s*n,2,n)}},{srgb:!0,repeat:[2.5,2.5]})}function Nv(){return Rn(256,(i,e)=>{i.fillStyle="#efe7db",i.fillRect(0,0,e,e);const t=Ci(53);$n(i,e,1500,t,n=>`rgba(190,175,155,${n*.6})`,.5,2.2),$n(i,e,900,t,n=>`rgba(255,252,246,${n})`,.5,2)},{srgb:!0,repeat:[3,1.5]})}function Zd(){const i=(t,n)=>{t.fillStyle="#6f6f6f",t.fillRect(0,0,n,n);const s=Ci(67);for(let r=0;r<2400;r++){const o=2+s()*4,a=s()*n,l=s()*n,c=t.createRadialGradient(a,l,0,a,l,o);c.addColorStop(0,"rgba(255,255,255,0.5)"),c.addColorStop(.75,"rgba(128,128,128,0.12)"),c.addColorStop(1,"rgba(0,0,0,0.4)"),t.fillStyle=c,t.beginPath(),t.arc(a,l,o,0,Math.PI*2),t.fill()}};return{map:Rn(256,(t,n)=>{t.fillStyle="#f5efe8",t.fillRect(0,0,n,n);const s=Ci(71);$n(t,n,700,s,r=>`rgba(120,90,60,${r*.55})`,.6,2.4)},{srgb:!0,repeat:[2,2]}),bump:Rn(256,i,{repeat:[2,2]})}}function Tl(i=[10,1]){return Rn(128,(e,t)=>{e.fillStyle="#808080",e.fillRect(0,0,t,t);for(let n=0;n<t;n+=8)e.fillStyle="#b2b2b2",e.fillRect(n,0,3.4,t),e.fillStyle="#4a4a4a",e.fillRect(n+4.4,0,2.2,t)},{repeat:i})}const Er=["bob","long","short","ponytail","bun"],wr=["#201612","#3a2417","#503729","#7a4a26","#8c3b22","#a97c50","#d9b380","#b9b4ad"],Tr=["#2e2019","#5a3a1e","#7a5a26","#46684a","#3d5a80","#707880"],Ql=["shoulderWidth","waist","hip","bust","build"],ec=["eyeSize","eyeSpacing","eyeHeight","eyeShape","eyeTilt","browHeight","browTilt","noseWidth","noseProminence","lipWidth","lipFullness","faceWidth","asymmetry"],on={skinTone:{kind:"range",min:0,max:1,def:.28},hairColor:{kind:"palette",options:wr,def:"#503729"},eyeColor:{kind:"palette",options:Tr,def:"#2e2019"},hairStyle:{kind:"enum",options:Er,def:"bob"},height:{kind:"range",min:1.45,max:1.95,def:1.74},shoulderWidth:{kind:"range",min:.88,max:1.14,def:1},waist:{kind:"range",min:.82,max:1.22,def:1},hip:{kind:"range",min:.86,max:1.2,def:1},bust:{kind:"range",min:.8,max:1.3,def:1},build:{kind:"range",min:.85,max:1.2,def:1},eyeSize:{kind:"range",min:.8,max:1.25,def:1},eyeSpacing:{kind:"range",min:.85,max:1.18,def:1},eyeHeight:{kind:"range",min:-.01,max:.01,def:0},eyeShape:{kind:"range",min:.55,max:.95,def:.74},eyeTilt:{kind:"range",min:-.2,max:.2,def:0},browHeight:{kind:"range",min:-.008,max:.008,def:0},browTilt:{kind:"range",min:-.25,max:.25,def:0},noseWidth:{kind:"range",min:.75,max:1.35,def:1},noseProminence:{kind:"range",min:.7,max:1.4,def:1},lipWidth:{kind:"range",min:.75,max:1.3,def:1},lipFullness:{kind:"range",min:.6,max:1.6,def:1},faceWidth:{kind:"range",min:.9,max:1.1,def:1},asymmetry:{kind:"range",min:0,max:1,def:.35}},Ar=1.45,Qd=1.95,Ov=1.74,jn={skinTone:.28,hairColor:"#503729",eyeColor:"#2e2019",hairStyle:"bob",height:1.74,shoulderWidth:1,waist:1,hip:1,bust:1,build:1,eyeSize:1,eyeSpacing:1,eyeHeight:0,eyeShape:.74,eyeTilt:0,browHeight:0,browTilt:0,noseWidth:1,noseProminence:1,lipWidth:1,lipFullness:1,faceWidth:1,asymmetry:.35};function Fv(i,e){return typeof i!="number"||!Number.isFinite(i)?e.def:Math.min(e.max,Math.max(e.min,i))}function kv(i,e,t){return typeof i=="string"&&e.includes(i)?i:t}function Qs(i){if(typeof i!="object"||i===null)return{...jn};const e=i,t={...jn};for(const[s,r]of Object.entries(on))t[s]=r.kind==="range"?Fv(e[s],r):kv(e[s],r.options,r.def);const n=t;return Bv(n),n}const dr=.5,Kn=i=>Math.min(1,Math.max(0,i));function hr(i){const e=Kn((1.66-i.height)/.21),t=Kn((1-i.bust)/.2),n=Kn(-(i.hip-i.waist)/.15),s=Kn((1-i.build)/.15),r=Kn((1-i.shoulderWidth)/.12);return .3*e+.25*t+.2*n+.15*s+.1*r}function Tu(i){const e=on[i];if(e.kind!=="range")throw new Error(`${i} is not a range parameter`);return e}function Bv(i){let e=hr(i)-dr;if(e<=0)return;const t=Kn((1-i.bust)/.2);if(t>0&&(i.bust=1-.2*Math.max(0,t-e/.25),e=hr(i)-dr,e<=0))return;const n=Kn(-(i.hip-i.waist)/.15);if(n>0){let a=-.15*Math.max(0,n-e/.2)-(i.hip-i.waist);const l=Math.min(Math.max(a,0),Tu("hip").max-i.hip);if(i.hip+=l,a-=l,a>0&&(i.waist-=Math.min(a,i.waist-Tu("waist").min)),e=hr(i)-dr,e<=0)return}const s=Kn((1-i.build)/.15);if(s>0&&(i.build=1-.15*Math.max(0,s-e/.15),e=hr(i)-dr,e<=0))return;const r=Kn((1-i.shoulderWidth)/.12);r>0&&(i.shoulderWidth=1-.12*Math.max(0,r-e/.1),e=hr(i)-dr,e<=0)||(i.bust=jn.bust,i.hip=jn.hip,i.waist=jn.waist,i.build=jn.build,i.shoulderWidth=jn.shoulderWidth)}function xi(i,e){const t=i<=.9?1:i>=1.02?0:(1.02-i)/.12,n=i<=.94||i>=1.17?0:i<1.02?(i-.94)/.08:i<=1.08?1:(1.17-i)/.09,s=i<=1.08||i>=1.335?0:i<1.17?(i-1.08)/.09:i<=1.25?1:(1.335-i)/.085;return(1+(e.build-1)*.6)*(1+(e.hip-1)*t+(e.waist-1)*n+(e.bust-1)*s)}function Al(i){return 1+(i.build-1)*.7+(i.hip-1)*.25}const ao=[[255,223,196],[240,197,151],[224,172,105],[198,134,66],[141,85,36],[92,56,40]],zv=["I","II","III","IV","V","VI"];function Au(i){const e=Math.min(1,Math.max(0,i))*(ao.length-1),t=Math.min(ao.length-2,Math.floor(e)),n=e-t,s=ao[t],r=ao[t+1],o=l=>Math.round(s[l]+(r[l]-s[l])*n),a=l=>o(l).toString(16).padStart(2,"0");return`#${a(0)}${a(1)}${a(2)}`}function Rl(i){const e=Math.min(5,Math.max(0,Math.floor(Math.min(1,Math.max(0,i))*6)));return zv[e]}function fn(i,e,t=48){const n=new Yl(i.map(([o,a])=>new me(o,a))),s=new Ir(n.getPoints(56),t),r=new ke(s,e);return r.castShadow=!0,r}function st(i,e,t=0,n=0,s=0){const r=new ke(i,e);return r.position.set(t,n,s),r.castShadow=!0,r}function Lo(i,e){const t=i.map(r=>{r.updateMatrix();const o=r.geometry.clone();return o.applyMatrix4(r.matrix),r.geometry.dispose(),o}),n=Jd(t,!1);for(const r of t)r.dispose();const s=new ke(n,e);return s.castShadow=!0,s}const eh=[[.015,.002],[.05,.01],[.066,.032],[.075,.062],[.08,.098],[.081,.132],[.076,.168],[.062,.205],[.036,.232],[.001,.244]],Hv=[[.138,.845],[.145,.88],[.14,.94],[.12,1.02],[.121,1.08],[.146,1.17],[.141,1.25],[.117,1.335],[.075,1.39],[.05,1.415]];function Ru(i,e,t=1){const n=new qe,s=fn(eh.slice(3).map(([a,l])=>[a+.005,l+.003]),e,56);s.scale.set(.88*t,1,1.12),s.position.z=-.004,n.add(s);const r=(a,l,c)=>{const u=st(new ot(.0845,48,24,0,Math.PI*2,0,Math.PI*a),e,0,l,.004);return u.scale.set(.9*t,1.05,1.1),u.rotation.x=c,u};switch(i){case"bob":{n.add(r(.3,.132,.3));const a=st(new dn(.05,.14,6,18),e,0,.015,-.062);a.rotation.x=.1,n.add(a);for(const l of[-1,1]){const c=st(new dn(.017,.09,4,12),e,l*.07*t,.045,.03);c.rotation.z=-l*.06,c.rotation.x=-.05,n.add(c)}break}case"long":{n.add(r(.3,.132,.3));const a=st(new dn(.056,.34,6,18),e,0,-.1,-.075);a.rotation.x=.06,n.add(a);for(const l of[-1,1]){const c=st(new dn(.018,.2,4,12),e,l*.072*t,-.03,.028);c.rotation.z=-l*.05,c.rotation.x=-.04,n.add(c)}break}case"short":{n.add(r(.26,.138,.22));const a=st(new dn(.048,.03,4,14),e,0,.055,-.058);a.rotation.x=.15,n.add(a);break}case"ponytail":{n.add(r(.3,.132,.3));const a=st(new ot(.03,14,10),e,0,.2,-.055);n.add(a);const l=st(new Xt(.027,.0065,8,20),e,0,.198,-.06);l.rotation.x=1.1,n.add(l);const c=st(new dn(.026,.24,6,14),e,0,.1,-.09);c.rotation.x=-.3,n.add(c);break}case"bun":{n.add(r(.3,.132,.3));const a=st(new ot(.037,18,12),e,0,.238,-.04);n.add(a);const l=st(new Xt(.035,.006,8,20),e,0,.232,-.042);l.rotation.x=1.2,n.add(l);break}}const o=n.children.filter(a=>a instanceof ke);return o.length>1&&(n.clear(),n.add(Lo(o,e))),n}function Cu(i){const e={ls:[0,0,-.1],rs:[0,0,.1],le:[-.06,0,0],re:[-.06,0,0],head:[0,0,0]};switch(i){case"wave":e.rs=[0,0,2.45],e.re=[-.15,0,0],e.head=[0,0,.05];break;case"cheer":e.ls=[0,0,-2.45],e.rs=[0,0,2.45],e.le=[0,0,0],e.re=[0,0,0],e.head=[-.05,0,0];break;case"peace":e.rs=[0,0,2.35],e.re=[-.35,0,0],e.ls=[0,0,-.55],e.le=[-.5,0,0],e.head=[0,0,-.05];break;case"relax":e.ls=[0,0,-.16],e.rs=[0,0,.16],e.le=[-.38,0,0],e.re=[-.38,0,0],e.head=[.04,0,.04];break}return e}function th(i){const e=Dv(),t=new nt({color:Au(i.skinTone),map:e.map,bumpMap:e.bump,bumpScale:.15,roughness:.58,envMapIntensity:.45}),n=Iv(),s=new nt({color:i.hairColor,map:n.map,bumpMap:n.bump,bumpScale:.3,roughness:.38,envMapIntensity:1.15}),r=br([2,2]),o=new nt({color:"#a8a29a",map:r.map,bumpMap:r.bump,bumpScale:.3,roughness:.9,envMapIntensity:.3}),a=br([3,3]),l=new nt({color:"#ff8fab",map:a.map,bumpMap:a.bump,bumpScale:.35,roughness:.84,envMapIntensity:.4,side:hn}),c=new nt({color:i.eyeColor,roughness:.12,envMapIntensity:1.3}),u=new nt({color:"#f3ede1",roughness:.22,envMapIntensity:1}),d=new nt({color:"#241a14",roughness:.3,envMapIntensity:.6}),f=new nt({color:"#14100d",roughness:.25,envMapIntensity:.8}),h=new nt({color:"#ffffff",transparent:!0,opacity:.16,roughness:.05,envMapIntensity:2.2,depthWrite:!1}),g=new qe,x=.12;g.position.y=x;const m=new qe;g.add(m);function p(z){const ie=new qe,ge=1+(z.build-1)*.7,ce=Al(z),Re=1+(z.build-1)*.35;for(const $ of[-1,1]){const Q=$*.096;ie.add(st(new dn(.067*ce,.25,6,20),t,Q,.645,0)),ie.add(Lo([st(new ot(.047*ge,20,14),t,Q,.462,.004),st(new dn(.043*ge,.26,6,18),t,Q,.278,0)],t)),ie.add(st(new Nt(.031*Re,.034*Re,.1,14),t,Q,.075,0))}const be=1+(z.build-1)*.4,Fe=st(new ot(1,36,24),o,0,.885,0);Fe.scale.set(.163*z.hip*be,.115*(1+(z.build-1)*.15),.128*(1+(z.hip-1)*.65)*be),ie.add(Lo([Fe,st(new Nt(.078*ce,.07*ce,.13,20),o,-.096,.8,0),st(new Nt(.078*ce,.07*ce,.13,20),o,.096,.8,0)],o));const I=fn(Hv.map(([$,Q])=>[$*xi(Q,z),Q]),o);I.scale.set(1,1,.8),ie.add(I);const fe=1+(z.build-1)*.4;return ie.add(st(new Nt(.042*fe,.05*fe,.15,20),t,0,1.465,0)),ie}let b=p(i);m.add(b);const S=new qe;m.add(S);const v=new qe;v.position.set(0,.95,0),m.add(v);const A=new qe;A.position.set(0,1.12,0),m.add(A);const w=new qe;w.position.set(0,1.415,0),m.add(w);const T=new qe;T.position.set(.235,1.02,.02),m.add(T);function C(z){const ie=new qe;ie.position.set(z*.172,1.374,0),ie.add(st(new ot(.052,20,14),t,0,.002,0));const ge=st(new Nt(.054,.045,.22,20),l,0,-.09,0);ie.add(ge);const ce=st(new dn(.04,.16,6,16),t,0,-.16,0);ie.add(ce);const Re=new qe;Re.position.set(0,-.27,0);const be=st(new dn(.034,.17,6,16),t,0,-.115,0);Re.add(be);const Fe=new qe;Fe.position.set(0,-.26,0);const I=st(new ot(1,16,12),t,0,-.032,0);I.scale.set(.03,.049,.017);const fe=st(new ot(.01,10,8),t,-z*.024,-.018,.01);return Fe.add(I,fe),Re.add(Fe),ie.add(Re),m.add(ie),{side:z,shoulder:ie,elbow:Re,sleeve:ge,upper:ce,fore:be}}const _=C(-1),y=C(1);function P(z){const ie=1+(z.build-1)*.7;for(const ge of[_,y])ge.shoulder.position.x=ge.side*.172*z.shoulderWidth*(1+(z.build-1)*.25),ge.sleeve.scale.set(ie,1,ie),ge.upper.scale.set(ie,1,ie),ge.fore.scale.set(ie,1,ie)}P(i);function H(z){m.remove(b),b.traverse(ie=>{ie instanceof ke&&ie.geometry.dispose()}),b=p(z),m.add(b),P(z)}const U=new qe;U.position.set(0,1.5,0),m.add(U);const q=fn(eh,t,56);q.scale.set(.88,1,1.12),U.add(q);function j(){const z=new qe,ie=st(new ot(.0135,24,16),u,0,0,0);ie.castShadow=!1,z.add(ie);const ge=new qe,ce=(Q,Se,xe)=>{const We=new ot(Q,24,12,0,Math.PI*2,0,Se);We.rotateX(Math.PI/2);const St=st(We,xe,0,0,0);return St.castShadow=!1,St},Re=ce(.0139,.46,d),be=ce(.01405,.4,c),Fe=ce(.0142,.19,f),I=ce(.0149,.52,h);ge.add(Re,be,Fe,I),z.add(ge);const fe=new qe,$=st(new ot(.0148,20,12,0,Math.PI*2,0,1.25),t,0,0,0);return $.castShadow=!1,fe.add($),fe.rotation.x=-.18,z.add(fe),U.add(z),{group:z,shells:[ie,Re,be,Fe,I],iris:ge,lid:fe,lidMesh:$}}const W=j(),Z=j(),G=st(new Xt(.02,.0028,8,20,1.5),s),de=st(new Xt(.02,.0028,8,20,1.5),s),_e=st(new ot(1,12,10),t),Te=st(new ot(1,12,10),t);for(const z of[G,de,_e,Te])z.castShadow=!1,U.add(z);_e.scale.set(.0075,.0155,.011),Te.scale.set(.0075,.0155,.011);const Ue=st(new ot(1,14,10),t,0,.08,.0855);Ue.castShadow=!1,U.add(Ue);const Ze=new nt({color:"#a96052",roughness:.45,envMapIntensity:.6}),J=st(new ot(1,18,12),Ze,0,.047,.0785);J.castShadow=!1,U.add(J);function F(z){const ie=z.asymmetry;q.scale.set(.88*z.faceWidth,1,1.12);const ge=1+(z.faceWidth-1)*.6,ce=[[W,-1],[Z,1]];for(const[be,Fe]of ce){be.group.position.set(Fe*.034*z.eyeSpacing*ge,.115+z.eyeHeight+(Fe<0?.0011*ie:-.0011*ie),.079),be.group.rotation.z=Fe*z.eyeTilt,be.group.scale.setScalar(z.eyeSize);for(const I of be.shells)I.scale.set(1.3,z.eyeShape,.62);be.lidMesh.scale.set(1.3,z.eyeShape+.04,.66)}const Re=[[G,-1],[de,1]];for(const[be,Fe]of Re)be.position.set(Fe*.0345*z.eyeSpacing*ge,.15+z.browHeight+(Fe<0?-.0014*ie:.0014*ie),.0765),be.rotation.set(-.3,0,Math.PI/2-.75-Fe*.09+Fe*z.browTilt*.7);_e.position.set(-.0695*z.faceWidth,.105+.0016*ie,-.002),Te.position.set(.0695*z.faceWidth,.105,-.002),Ue.position.x=9e-4*ie,Ue.position.z=.0855+(z.noseProminence-1)*.004,Ue.scale.set(.0105*z.noseWidth,.015,.009*z.noseProminence),J.position.x=-7e-4*ie,J.scale.set(.0195*z.lipWidth,.0062*z.lipFullness,.0068*z.lipFullness)}F(i);let se=Ru(i.hairStyle,s,i.faceWidth);U.add(se);const K=new qe;K.position.set(0,.242,0),U.add(K);const pe=new qe;pe.position.set(0,.115,.0905),U.add(pe);let ue={...i};function Ee(z){const ie=z/Ov,ge=1+(ie-1)*.45;m.scale.set(ge,ie,ge)}Ee(i.height);function Ve(z){t.color.set(Au(z.skinTone)),s.color.set(z.hairColor),c.color.set(z.eyeColor),F(z),(z.hairStyle!==ue.hairStyle||z.faceWidth!==ue.faceWidth)&&(U.remove(se),se.traverse(ie=>{ie instanceof ke&&ie.geometry.dispose()}),se=Ru(z.hairStyle,s,z.faceWidth),U.add(se)),(z.shoulderWidth!==ue.shoulderWidth||z.waist!==ue.waist||z.hip!==ue.hip||z.bust!==ue.bust||z.build!==ue.build)&&H(z),z.height!==ue.height&&Ee(z.height),ue={...z}}let Be="stand",ze=Cu("stand"),N=null;function zt(z){_.shoulder.rotation.set(...z.ls),y.shoulder.rotation.set(...z.rs),_.elbow.rotation.set(...z.le),y.elbow.rotation.set(...z.re),U.rotation.set(...z.head)}zt(ze);function et(z){Be=z,ze=Cu(z)}function He(z,ie,ge){z.rotation.x+=(ie[0]-z.rotation.x)*ge,z.rotation.y+=(ie[1]-z.rotation.y)*ge,z.rotation.z+=(ie[2]-z.rotation.z)*ge}let De=987654321;const it=()=>(De=(De*1103515245+12345)%2147483648,De/2147483648);let Ae=1.6+it()*2,R=-1,M=.22;function V(z){if(R<0&&z>=Ae&&(R=z,M=.17+it()*.13),R<0)return 0;const ie=(z-R)/M;if(ie>=1)return R=-1,Ae=z+(it()<.16?.3:2.1+it()*3.6),0;const ge=ce=>{const Re=Math.min(1,Math.max(0,ce));return Re*Re*(3-2*Re)};return ie<.38?ge(ie/.38):ie<.52?1:1-ge((ie-.52)/.48)}let te=135792468;const ne=()=>(te=(te*1103515245+12345)%2147483648,te/2147483648);let O=1.1,oe={x:0,y:0};const ae={x:0,y:0},ve=new L;function Ge(z,ie,ge){if(z>=O){O=z+.7+ne()*1.9;const I=ne()<.22;oe={x:I?(ne()-.5)*.22:(ne()-.5)*.05,y:I?(ne()-.5)*.1:(ne()-.5)*.03}}const ce=1-Math.exp(-ie*22);ce>0&&(ae.x+=(oe.x-ae.x)*ce,ae.y+=(oe.y-ae.y)*ce);let Re=0,be=0;if(ge){ve.copy(ge),U.worldToLocal(ve);const I=ve.y-.115;Re=Math.atan2(ve.x,ve.z),be=Math.atan2(I,Math.hypot(ve.x,ve.z))}const Fe=(I,fe,$)=>Math.min($,Math.max(fe,I));return{yaw:Fe(Re,-.38,.38)+ae.x,pitch:Fe(be,-.22,.28)+ae.y}}function le(z,ie){const ge=N===null?0:Math.min(.05,Math.max(0,z-N));N=z,g.position.y=x+Math.sin(z*1.5)*.0035,g.rotation.z=Math.sin(z*.6)*.004;const ce=1-Math.exp(-ge*7);if(ce>0){const Fe=Be==="wave"?Math.sin(z*6.5)*.18:0;He(_.shoulder,ze.ls,ce),He(y.shoulder,[ze.rs[0],ze.rs[1],ze.rs[2]+Fe],ce),He(_.elbow,ze.le,ce),He(y.elbow,ze.re,ce),He(U,ze.head,ce)}const Re=V(z);W.lid.rotation.x=-.18+Re*.95,Z.lid.rotation.x=-.18+Re*.95;const be=Ge(z,ge,ie);W.iris.rotation.set(-be.pitch,be.yaw,0),Z.iris.rotation.set(-be.pitch,be.yaw,0)}return{root:g,head:U,hatAnchor:K,glassesAnchor:pe,neckAnchor:w,torsoAnchor:A,bagAnchor:T,bottomAnchor:v,shoesAnchor:S,topMaterial:l,applyPose:et,setCharacter:Ve,tick:le}}const Pi=["#ffffff","#ff8fab","#7cc7ff","#8fe3c0","#c9a7ff","#ffd166","#3a4152","#b03050","#2e5e4e","#f2a65a"],ss=["#44557a","#2f3542","#e8e2d6","#a83c46","#7cc7ff","#8fe3c0","#ffd166","#5b4a68","#8a6642","#606c38"],rs=["#5e2233","#26262b","#e8e2d6","#7c4a2d","#a83c46","#3d5a80","#d8b25c","#ffffff","#c0c6cc","#2e5e4e"],os=["#b08954","#26262b","#2c3a55","#7a2e3a","#e8e2d6","#6b7250","#3a4152","#8a6642"],Li=["tee","hoodie","dress","blouse","dressLong"],as=["none","skirt","pants","shorts","skirtLong"],ls=["flats","sneakers","pumps","boots"],cs=["none","jacket","coat","cardigan"];function Xo(i){return i==="dress"||i==="dressLong"}const Di=["none","cap","beanie","catears","ribbon"],Ii=["none","round","square","sunglasses"],Ui=["none","necklace","scarf","bag"],Ni=["stand","wave","cheer","peace","relax"],At={name:"",topStyle:"tee",topColor:"#ff8fab",outerStyle:"none",outerColor:"#b08954",bottomStyle:"none",bottomColor:"#44557a",shoeStyle:"flats",shoeColor:"#5e2233",hat:"none",glasses:"none",accessory:"none",pose:"stand",character:{...jn}},nh="fitting-room.outfit.v1",Pu=24,ih=72,Vv=new TextEncoder;function us(i){if(typeof i!="string")return"";let e="";for(const n of i){const s=n.codePointAt(0)??0;s<32||s>=127&&s<=159||(e+=n)}e=e.replace(/\s+/g," ").trim();const t=[...e];for(t.length>Pu&&(e=t.slice(0,Pu).join(""));e&&Vv.encode(e).length>ih;)e=[...e].slice(0,-1).join("");return e}function fi(i,e,t){return typeof i=="string"&&e.includes(i)?i:t}function Xs(i){if(typeof i!="object"||i===null)return{...At};const e=i;return{name:us(e.name),topStyle:fi(e.topStyle,Li,At.topStyle),topColor:typeof e.topColor=="string"&&Pi.includes(e.topColor)?e.topColor:At.topColor,outerStyle:fi(e.outerStyle,cs,At.outerStyle),outerColor:typeof e.outerColor=="string"&&os.includes(e.outerColor)?e.outerColor:At.outerColor,bottomStyle:fi(e.bottomStyle,as,At.bottomStyle),bottomColor:typeof e.bottomColor=="string"&&ss.includes(e.bottomColor)?e.bottomColor:At.bottomColor,shoeStyle:fi(e.shoeStyle,ls,At.shoeStyle),shoeColor:typeof e.shoeColor=="string"&&rs.includes(e.shoeColor)?e.shoeColor:At.shoeColor,hat:fi(e.hat,Di,At.hat),glasses:fi(e.glasses,Ii,At.glasses),accessory:fi(e.accessory,Ui,At.accessory),pose:fi(e.pose,Ni,At.pose),character:Qs(e.character)}}function sh(i=localStorage){try{const e=i.getItem(nh);return e?Xs(JSON.parse(e)):{...At}}catch{return{...At}}}function Gv(i,e=localStorage){try{e.setItem(nh,JSON.stringify(i))}catch{}}function cn(i,e){return i[Math.floor(e()*i.length)]}function rh(i=Math.random){return{name:"",topStyle:cn(Li,i),topColor:cn(Pi,i),outerStyle:cn(cs,i),outerColor:cn(os,i),bottomStyle:cn(as,i),bottomColor:cn(ss,i),shoeStyle:cn(ls,i),shoeColor:cn(rs,i),hat:cn(Di,i),glasses:cn(Ii,i),accessory:cn(Ui,i),pose:cn(Ni,i),character:{...jn}}}function Ne(i,e,t=0,n=0,s=0){const r=new ke(i,e);return r.position.set(t,n,s),r.castShadow=!0,r}function qs(i){var r;const e=new Map;for(const o of i.children)if(o instanceof ke&&!Array.isArray(o.material)){const a=e.get(o.material)??[];a.push(o),e.set(o.material,a)}let t=!1;for(const o of e.values())o.length>=2&&(t=!0);if(!t)return;const n=[],s=new Set;for(const o of i.children)o instanceof ke&&!Array.isArray(o.material)&&(((r=e.get(o.material))==null?void 0:r.length)??0)>=2?s.has(o.material)||(s.add(o.material),n.push(Lo(e.get(o.material),o.material))):n.push(o);i.clear();for(const o of n)i.add(o)}function _i(i,e=.85){const t=br([2,2]);return new nt({color:i,map:t.map,bumpMap:t.bump,bumpScale:.35,roughness:e,envMapIntensity:.4})}const Wv=1.12,Xv=.95;function gr(i,e){return i.map(([t,n])=>[t*xi(n+Wv,e),n])}function Cl(i,e){return i.map(([t,n])=>[t*xi(n+Xv,e),n])}function qv(i,e,t){const n=new qe;if(i==="tee"){const s=fn(gr([[.149,-.275],[.156,-.24],[.151,-.18],[.131,-.1],[.132,-.04],[.157,.05],[.152,.13],[.128,.215],[.086,.27],[.06,.295]],t),e);s.scale.set(1,1,.8),n.add(s)}else if(i==="hoodie"){const s=fn(gr([[.165,-.28],[.168,-.2],[.15,-.1],[.152,-.03],[.172,.05],[.166,.13],[.14,.215],[.092,.27],[.064,.295]],t),e);s.scale.set(1,1,.8),n.add(s);const r=Ne(new Xt(.082,.03,12,24),e,0,.26,-.05);r.rotation.x=1.25,r.scale.set(1,1,.8),n.add(r);const o=Ne(new $e(.17,.095,.028),e,0,-.155,.125);o.position.z=.125*xi(.965,t),n.add(o);const a=new nt({color:"#e8e2d6",roughness:.8});for(const l of[-1,1])n.add(Ne(new Nt(.0035,.0035,.055,8),a,l*.018,.185,.098))}else if(i==="blouse"){const s=fn(gr([[.146,-.275],[.152,-.24],[.146,-.18],[.126,-.1],[.128,-.04],[.155,.05],[.15,.13],[.126,.215],[.084,.27],[.058,.295]],t),e);s.scale.set(1,1,.8),n.add(s);const r=xi(1.385,t),o=Ne(new Xt(.062,.009,10,36),e,0,.272,0);o.rotation.x=Math.PI/2,o.scale.set(r,.8*r,r),n.add(o)}else{const r=fn(gr([[.06,.295],[.086,.27],[.128,.215],[.152,.13],[.157,.05],[.132,-.04],[.13,-.115],[.148,-.2],[.18,-.36],...i==="dressLong"?[[.205,-.52],[.232,-.72],[.258,-.9],[.272,-1.02]]:[[.218,-.52],[.248,-.66]]],t),e);r.scale.set(1,1,.8),n.add(r);const o=new nt({color:"#f2ead9",roughness:.35,envMapIntensity:.8}),a=xi(1.005,t),l=Ne(new Xt(.13,.011,10,40),o,0,-.115,0);l.rotation.x=Math.PI/2,l.scale.set(a,.8*a,a),n.add(l)}return qs(n),n}function Yv(i,e,t){if(i==="none")return null;const n=new qe,s=i==="cardigan",r=_i(e,i==="coat"?.92:.85);s&&(r.bumpMap=Tl([16,1]),r.bumpScale=.5);const a=gr({jacket:[[.18,-.3],[.17,-.22],[.156,-.12],[.16,-.04],[.184,.05],[.178,.13],[.15,.215],[.108,.27],[.078,.295]],coat:[[.258,-.62],[.238,-.52],[.208,-.42],[.185,-.32],[.175,-.22],[.158,-.12],[.16,-.04],[.185,.05],[.178,.13],[.15,.215],[.108,.27],[.078,.295]],cardigan:[[.19,-.35],[.176,-.3],[.165,-.22],[.15,-.12],[.152,-.04],[.176,.05],[.17,.13],[.144,.215],[.1,.27],[.07,.295]]}[i],t),l=fn(a,r);if(l.scale.set(1,1,.8),n.add(l),!s){const h=xi(1.385,t),g=Ne(new Xt(.07,.014,10,36),r,0,.268,0);g.rotation.x=Math.PI/2,g.scale.set(h,.8*h,h),n.add(g)}const c=i==="coat"?-.55:-.28,u=(.18+c)/2;let d=a[0][0];for(let h=0;h+1<a.length;h++){const[g,x]=a[h],[m,p]=a[h+1];if((u-x)*(u-p)<=0){d=g+(m-g)*(u-x)/(p-x||1);break}d=m}const f=Ne(new $e(.02,.18-c,.006),r,0,u,d*.8+.002);if(n.add(f),i==="coat"){const h=xi(1.005,t),g=Ne(new Xt(.163,.012,10,40),r,0,-.115,0);g.rotation.x=Math.PI/2,g.scale.set(h,.8*h,h),n.add(g)}return qs(n),n}function Lu(i,e){const t=fn(Cl([[.168,-.2],[.18,-.16],[.186,-.11],[.184,-.06],[.172,-.01],[.15,.045]],e),i);return t.scale.set(1,1,.8),t}function Du(i,e,t,n){const s=fn(i.map(([r,o])=>[r*n,o]),e);return s.position.x=t*.096,s.scale.set(1,1,.92),s}function $v(i,e,t){const n=new qe;switch(i){case"none":return null;case"skirt":{const s=fn(Cl([[.232,-.43],[.216,-.33],[.196,-.22],[.182,-.13],[.176,-.065],[.166,-.03],[.147,.03]],t),e);return s.scale.set(1,1,.8),n.add(s),n}case"skirtLong":{const s=fn(Cl([[.262,-.78],[.246,-.62],[.226,-.45],[.202,-.28],[.186,-.13],[.176,-.065],[.166,-.03],[.147,.03]],t),e);return s.scale.set(1,1,.8),n.add(s),n}case"pants":{n.add(Lu(e,t));const s=[[.049,-.905],[.048,-.85],[.052,-.73],[.056,-.6],[.058,-.55],[.068,-.488],[.078,-.45],[.082,-.4],[.084,-.28],[.086,-.17],[.088,-.11]];for(const r of[-1,1])n.add(Du(s,e,r,Al(t)));return qs(n),n}case"shorts":{n.add(Lu(e,t));const s=[[.083,-.3],[.084,-.24],[.087,-.17],[.089,-.11]];for(const r of[-1,1])n.add(Du(s,e,r,Al(t)));return qs(n),n}}}function Ia(i,e,t=.9){return new nt({color:i,roughness:e,envMapIntensity:t})}function jv(i,e){const t=new qe;for(const n of[-1,1]){const s=n*.096,r=new qe;if(r.position.set(s,0,.012),t.add(r),i==="flats"||i==="boots"){const o=Ia(e,i==="boots"?.5:.32);if(i==="boots"){const c=Zd();o.map=c.map,o.bumpMap=c.bump,o.bumpScale=.4}r.add(Ne(new $e(.072,.016,.235),o,0,.008,.028));const a=Ne(new ot(1,20,14),o,0,.026,.02);a.scale.set(.04,.027,.105),r.add(a);const l=Ne(new ot(1,18,12),o,0,.019,.112);if(l.scale.set(.037,.02,.045),r.add(l),r.add(Ne(new $e(.054,.028,.034),o,0,.014,-.07)),i==="boots"){const c=Ne(new Nt(.058,.052,.3,20),o,s,.19,0);t.add(c);const u=Ne(new Nt(.061,.06,.025,20),o,s,.345,0);t.add(u)}}else if(i==="sneakers"){const o=br([2,2]),a=new nt({color:e,map:o.map,bumpMap:o.bump,bumpScale:.3,roughness:.85,envMapIntensity:.4}),l=Ia("#ece7db",.6,.5);r.add(Ne(new $e(.078,.026,.245),l,0,.013,.028));const c=Ne(new ot(1,20,14),a,0,.036,.015);c.scale.set(.042,.032,.108),r.add(c);const u=Ne(new ot(1,18,12),a,0,.026,.105);u.scale.set(.039,.022,.05),r.add(u),r.add(Ne(new $e(.06,.05,.03),a,0,.032,-.085))}else{const o=Ia(e,.18,1.2),a=Ne(new $e(.07,.02,.23),o,0,.031,.02);a.rotation.x=.18,r.add(a),r.add(Ne(new $e(.05,.05,.03),o,0,.025,-.075));const l=Ne(new ot(1,18,12),o,0,.03,.07);l.scale.set(.038,.024,.07),r.add(l);const c=Ne(new ot(1,18,12),o,0,.045,-.06);c.scale.set(.036,.03,.04),r.add(c)}qs(r)}return qs(t),t}function Kv(i){const e=new qe;switch(i){case"none":return null;case"cap":{const t=_i("#a83c46",.8),n=Ne(new ot(.0875,36,20,0,Math.PI*2,0,Math.PI*.52),t,0,-.12,-.002);n.scale.set(.9,.82,1.1),e.add(n);const s=Ne(new ot(1,24,12),t,0,-.106,.08);return s.scale.set(.052,.008,.048),e.add(s),e.add(Ne(new ot(.008,12,8),t,0,-.046,-.002)),e}case"beanie":{const t=_i("#7d9b8a",.95);t.bumpMap=Tl([16,1]),t.bumpScale=.5;const n=Ne(new ot(.0885,36,22,0,Math.PI*2,0,Math.PI*.55),t,0,-.114,-.002);n.scale.set(.9,.85,1.1),e.add(n);const s=_i("#6d8a7a",.95);s.bumpMap=Tl([22,1]),s.bumpScale=.7;const r=Ne(new Nt(.0895,.0905,.036,36,1,!0),s,0,-.15,-.002);return r.scale.set(.9,1,1.1),e.add(r),e.add(Ne(new ot(.024,14,10),_i("#f0ebe2",.95),0,-.028,-.002)),e}case"catears":{const t=Ne(new Xt(.082,.0038,8,32,Math.PI),new nt({color:"#26262b",roughness:.4,metalness:.3}),0,-.122,0);t.scale.set(.9,1,1.08),t.rotation.x=.08,e.add(t);const n=_i("#5a4232",.95),s=new nt({color:"#d98a9e",roughness:.9});for(const r of[-1,1]){const o=Ne(new yr(.021,.048,16),n,r*.052,-.028,0);o.rotation.z=-r*.28,e.add(o);const a=Ne(new yr(.011,.026,12),s,r*.05,-.034,.009);a.rotation.z=-r*.28,e.add(a)}return e}case"ribbon":{const t=new nt({color:"#b03050",roughness:.35,envMapIntensity:.8}),n=new qe;n.position.set(.048,-.052,.028);for(const r of[-1,1]){const o=Ne(new yr(.027,.052,18),t,r*.028,.004,0);o.rotation.z=r*1.15,o.scale.set(1,1,.45),n.add(o)}const s=Ne(new ot(.0105,12,10),t,0,.002,0);return s.scale.set(1,1,.7),n.add(s),e.add(n),e}}}const Sn=new nt({color:"#26262b",roughness:.35,metalness:.85,envMapIntensity:1.1}),Iu=new nt({color:"#d7e6ea",roughness:.05,metalness:0,transparent:!0,opacity:.16,envMapIntensity:1.4,depthWrite:!1});function Ua(i,e=.0016){const t=new qe;for(const n of[-1,1])t.add(Ne(new $e(e,e,.102),i,n*.0555,.004,-.047));return t}function Jv(i){const e=new qe;switch(i){case"none":return null;case"round":{for(const t of[-1,1]){e.add(Ne(new Xt(.0215,.0016,8,28),Sn,t*.034,0,.002));const n=Ne(new $l(.02,28),Iu,t*.034,0,.0015);n.castShadow=!1,e.add(n)}return e.add(Ne(new $e(.017,.002,.002),Sn,0,.004,.002)),e.add(Ua(Sn)),e}case"square":{for(const t of[-1,1]){const n=t*.034;e.add(Ne(new $e(.047,.0022,.0022),Sn,n,.018,.002)),e.add(Ne(new $e(.047,.0022,.0022),Sn,n,-.018,.002)),e.add(Ne(new $e(.0022,.038,.0022),Sn,n-.0225,0,.002)),e.add(Ne(new $e(.0022,.038,.0022),Sn,n+.0225,0,.002));const s=Ne(new Ft(.043,.034),Iu,n,0,.0015);s.castShadow=!1,e.add(s)}return e.add(Ne(new $e(.017,.002,.002),Sn,0,.006,.002)),e.add(Ua(Sn)),e}case"sunglasses":{const t=new nt({color:"#101014",roughness:.08,metalness:.1,transparent:!0,opacity:.94,envMapIntensity:1.5});for(const n of[-1,1]){const s=Ne(new ot(1,24,16),t,n*.034,-.002,.002);s.scale.set(.0255,.0185,.0055),e.add(s)}return e.add(Ne(new $e(.118,.004,.003),Sn,0,.016,.002)),e.add(Ua(Sn,.003)),e}}}const Uu=new nt({color:"#d8b25c",roughness:.27,metalness:1,envMapIntensity:1.3});function Zv(i,e){const t=new qe;switch(i){case"none":return null;case"necklace":{t.scale.z=1+(e.bust-1)*.55;const n=new Xd([new L(-.042,.005,.012),new L(-.052,-.045,.062),new L(0,-.118,.108),new L(.052,-.045,.062),new L(.042,.005,.012)]);t.add(Ne(new Jl(n,40,.0022,8),Uu,0,0,0));const s=Ne(new Kl(.0095),new nt({color:"#e58bb1",roughness:.12,envMapIntensity:1.5}),0,-.13,.106);return t.add(s),{group:t,anchor:"neck"}}case"scarf":{const n=_i("#a63d46",.95),s=Ne(new Xt(.056,.019,12,28),n,0,.038,0);s.rotation.x=Math.PI/2,t.add(s);const r=Ne(new $e(.042,.105,.011),n,.038,-.052,.088);return r.rotation.x=.06,t.add(r),{group:t,anchor:"neck"}}case"bag":{const n=Zd(),s=new nt({color:"#7c4a2d",map:n.map,bumpMap:n.bump,bumpScale:.5,roughness:.55,envMapIntensity:.7});t.add(Ne(new $e(.058,.165,.215),s,.012,-.145,0)),t.add(Ne(new $e(.06,.068,.218),s,.012,-.095,0)),t.add(Ne(new $e(.02,.014,.006),Uu,.012,-.128,.109));const r=Ne(new $e(.015,.583,.004),s,-.204,.148,-.005);return r.rotation.z=.8,t.add(r),{group:t,anchor:"bag"}}}}function Wi(i){for(const e of[...i.children])i.remove(e),e.traverse(t=>{t instanceof ke&&t.geometry.dispose()})}function qo(i,e){i.topMaterial.color.set(e.topColor),Wi(i.torsoAnchor),i.torsoAnchor.add(qv(e.topStyle,i.topMaterial,e.character));const t=Yv(e.outerStyle,e.outerColor,e.character);if(t&&i.torsoAnchor.add(t),Wi(i.bottomAnchor),!Xo(e.topStyle)&&e.bottomStyle!=="none"){const o=$v(e.bottomStyle,_i(e.bottomColor),e.character);o&&i.bottomAnchor.add(o)}Wi(i.shoesAnchor),i.shoesAnchor.add(jv(e.shoeStyle,e.shoeColor)),Wi(i.hatAnchor);const n=Kv(e.hat);n&&i.hatAnchor.add(n),Wi(i.glassesAnchor);const s=Jv(e.glasses);s&&i.glassesAnchor.add(s),Wi(i.neckAnchor),Wi(i.bagAnchor);const r=Zv(e.accessory,e.character);r&&(r.anchor==="neck"?i.neckAnchor:i.bagAnchor).add(r.group),i.applyPose(e.pose)}const Nu={type:"change"},tc={type:"start"},oh={type:"end"},lo=new Ho,Ou=new Yn,Qv=Math.cos(70*Zf.DEG2RAD),Ct=new L,Zt=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Na=1e-6;class ey extends Lv{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Ls.ROTATE,TWO:Ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new es,this._lastTargetPosition=new L,this._quat=new es().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Eu,this._sphericalDelta=new Eu,this._scale=1,this._panOffset=new L,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new L,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ny.bind(this),this._onPointerDown=ty.bind(this),this._onPointerUp=iy.bind(this),this._onContextMenu=uy.bind(this),this._onMouseWheel=oy.bind(this),this._onKeyDown=ay.bind(this),this._onTouchStart=ly.bind(this),this._onTouchMove=cy.bind(this),this._onMouseDown=sy.bind(this),this._onMouseMove=ry.bind(this),this._interceptControlDown=dy.bind(this),this._interceptControlUp=hy.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nu),this.update(),this.state=vt.NONE}update(e=null){const t=this.object.position;Ct.copy(t).sub(this.target),Ct.applyQuaternion(this._quat),this._spherical.setFromVector3(Ct),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Zt:n>Math.PI&&(n-=Zt),s<-Math.PI?s+=Zt:s>Math.PI&&(s-=Zt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ct.setFromSpherical(this._spherical),Ct.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ct),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ct.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ct.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(lo.origin.copy(this.object.position),lo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(lo.direction))<Qv?this.object.lookAt(this.target):(Ou.setFromNormalAndCoplanarPoint(this.object.up,this.target),lo.intersectPlane(Ou,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Na||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Na||this._lastTargetPosition.distanceToSquared(this.target)>Na?(this.dispatchEvent(Nu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ct.setFromMatrixColumn(t,0),Ct.multiplyScalar(-e),this._panOffset.add(Ct)}_panUp(e,t){this.screenSpacePanning===!0?Ct.setFromMatrixColumn(t,1):(Ct.setFromMatrixColumn(t,0),Ct.crossVectors(this.object.up,Ct)),Ct.multiplyScalar(e),this._panOffset.add(Ct)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ct.copy(s).sub(this.target);let r=Ct.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Zt*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function ty(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ny(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function iy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(oh),this.state=vt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function sy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=vt.DOLLY;break;case Us.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}break;case Us.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(tc)}function ry(i){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function oy(i){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(i.preventDefault(),this.dispatchEvent(tc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(oh))}function ay(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function ly(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=vt.TOUCH_ROTATE;break;case Ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=vt.TOUCH_DOLLY_PAN;break;case Ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(tc)}function cy(i){switch(this._trackPointer(i),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=vt.NONE}}function uy(i){this.enabled!==!1&&i.preventDefault()}function dy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class fy extends Gd{constructor(){super();const e=new $e;e.deleteAttribute("uv");const t=new nt({side:$t}),n=new nt,s=new Kd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new ke(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new ke(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new ke(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new ke(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new ke(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const u=new ke(e,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new ke(e,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new ke(e,As(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const h=new ke(e,As(50));h.position.set(-16.109,18.021,-8.207),h.scale.set(.1,2.425,2.751),this.add(h);const g=new ke(e,As(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const x=new ke(e,As(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const m=new ke(e,As(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new ke(e,As(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function As(i){const e=new Qn;return e.color.setScalar(i),e}class Yo extends ke{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Wt;const n=this,s=t.color!==void 0?new tt(t.color):new tt(8355711),r=t.textureWidth||512,o=t.textureHeight||512,a=t.clipBias||0,l=t.shader||Yo.ReflectorShader,c=t.multisample!==void 0?t.multisample:4,u=new Yn,d=new L,f=new L,h=new L,g=new ut,x=new L(0,0,-1),m=new pt,p=new L,b=new L,S=new pt,v=new ut,A=this.camera,w=new ni(r,o,{samples:c,type:js}),T=new ii({name:l.name!==void 0?l.name:"unspecified",uniforms:Id.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});T.uniforms.tDiffuse.value=w.texture,T.uniforms.color.value=s,T.uniforms.textureMatrix.value=v,this.material=T,this.onBeforeRender=function(C,_,y){if(f.setFromMatrixPosition(n.matrixWorld),h.setFromMatrixPosition(y.matrixWorld),g.extractRotation(n.matrixWorld),d.set(0,0,1),d.applyMatrix4(g),p.subVectors(f,h),p.dot(d)>0)return;p.reflect(d).negate(),p.add(f),g.extractRotation(y.matrixWorld),x.set(0,0,-1),x.applyMatrix4(g),x.add(h),b.subVectors(f,x),b.reflect(d).negate(),b.add(f),A.position.copy(p),A.up.set(0,1,0),A.up.applyMatrix4(g),A.up.reflect(d),A.lookAt(b),A.far=y.far,A.updateMatrixWorld(),A.projectionMatrix.copy(y.projectionMatrix),v.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),v.multiply(A.projectionMatrix),v.multiply(A.matrixWorldInverse),v.multiply(n.matrixWorld),u.setFromNormalAndCoplanarPoint(d,f),u.applyMatrix4(A.matrixWorldInverse),m.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const P=A.projectionMatrix;S.x=(Math.sign(m.x)+P.elements[8])/P.elements[0],S.y=(Math.sign(m.y)+P.elements[9])/P.elements[5],S.z=-1,S.w=(1+P.elements[10])/P.elements[14],m.multiplyScalar(2/m.dot(S)),P.elements[2]=m.x,P.elements[6]=m.y,P.elements[10]=m.z+1-a,P.elements[14]=m.w,n.visible=!1;const H=C.getRenderTarget(),U=C.xr.enabled,q=C.shadowMap.autoUpdate;C.xr.enabled=!1,C.shadowMap.autoUpdate=!1,C.setRenderTarget(w),C.state.buffers.depth.setMask(!0),C.autoClear===!1&&C.clear(),C.render(_,A),C.xr.enabled=U,C.shadowMap.autoUpdate=q,C.setRenderTarget(H);const j=y.viewport;j!==void 0&&C.state.viewport(j),n.visible=!0},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),n.material.dispose()}}}Yo.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const Pl=["ja","en","es","zh","fr","de","pt","ko"],py={ja:"日本語",en:"English",es:"Español",zh:"中文（简体）",fr:"Français",de:"Deutsch",pt:"Português",ko:"한국어"},my={ja:"ja-JP",en:"en-US",es:"es-ES",zh:"zh-CN",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ko:"ko-KR"},gy={"app.title":"3D試着室","app.workingTitle":"仮称","app.tagline":"着せ替えて、撮って、見せびらかそう。","cat.character":"人物","cat.looks":"コーデ","cat.tops":"トップス","cat.outer":"アウター","cat.bottoms":"ボトムス","cat.shoes":"靴","cat.hat":"帽子","cat.glasses":"メガネ","cat.accessory":"アクセサリー","cat.pose":"ポーズ","cat.llm":"AI接続","item.none":"なし","top.tee":"Tシャツ","top.hoodie":"パーカー","top.blouse":"ブラウス","top.dress":"ワンピース","top.dressLong":"ロングワンピース","outer.jacket":"ジャケット","outer.coat":"コート","outer.cardigan":"カーディガン","bottom.skirt":"スカート","bottom.skirtLong":"ロングスカート","bottom.pants":"パンツ","bottom.shorts":"ショートパンツ","shoe.flats":"フラットシューズ","shoe.sneakers":"スニーカー","shoe.pumps":"パンプス","shoe.boots":"ブーツ","hat.cap":"キャップ","hat.beanie":"ニット帽","hat.catears":"ねこ耳","hat.ribbon":"リボン","glasses.round":"まるメガネ","glasses.square":"しかくメガネ","glasses.sunglasses":"サングラス","accessory.necklace":"ネックレス","accessory.scarf":"マフラー","accessory.bag":"バッグ","pose.stand":"ふつう","pose.wave":"てをふる","pose.cheer":"バンザイ","pose.peace":"ピース","pose.relax":"リラックス","ui.skinTone":"肌の色","ui.height":"身長","ui.body":"体型","body.shoulderWidth":"肩幅","body.waist":"ウエスト","body.hip":"ヒップ","body.bust":"バスト","body.build":"体格","ui.face":"顔立ち","face.eyeSize":"目の大きさ","face.eyeSpacing":"目の間隔","face.eyeHeight":"目の高さ","face.eyeShape":"目の形","face.eyeTilt":"目の傾き","face.browHeight":"眉の高さ","face.browTilt":"眉の傾き","face.noseWidth":"鼻の幅","face.noseProminence":"鼻の高さ","face.lipWidth":"口の幅","face.lipFullness":"唇の厚み","face.faceWidth":"顔の幅","face.asymmetry":"左右差","ui.hairStyle":"髪型","ui.hairColor":"髪の色","ui.eyeColor":"瞳の色","hair.bob":"ボブ","hair.long":"ロング","hair.short":"ショート","hair.ponytail":"ポニーテール","hair.bun":"お団子","ui.seed":"シード","ui.copy":"コピー","ui.seedCopied":"シードをコピーしました","ui.seedApply":"適用","ui.seedInvalid":"シードが読み取れませんでした","ui.cardLoad":"カード画像から復元","ui.cardRestored":"カードから復元しました","ui.cardInvalid":"その画像からシードが読み取れませんでした","ui.name":"名前","ui.namePlaceholder":"名前（任意）","ui.nameNote":"その人物の呼び名です。名前はシードと一緒に旅をして、共有カードには着用者として小さく添えられます。実在の人物の名前は付けないでください。","ui.currentLook":"今のコーデ","ui.lookNamePlaceholder":"コーデの名前（例: 雨の日コーデ）","ui.saveLook":"このコーデを保存","ui.lookSaved":"コーデを保存しました","ui.lookApplied":"保存したコーデに着替えました","ui.lookNameRequired":"先にコーデの名前を入れてください","ui.looksEmpty":"保存したコーデはまだありません。今の組み合わせに名前を付けて残せます。","ui.prevLook":"前のコーデ","ui.swapLook":"前のコーデと入れ替え","ui.swapped":"前のコーデと入れ替えました","card.wornBy":"着用","card.fictional":"※この人物は架空のキャラクターです","ui.roster":"人物リスト","ui.newPerson":"新しい人物","ui.unnamed":"名前なし","ui.currentPerson":"表示中","ui.switchPerson":"呼び出す","ui.rename":"改名","ui.delete":"削除","ui.history":"編集履歴","ui.historyNote":"履歴はこの端末の中だけに残ります。カード・シード・書き出しファイルには含まれません。","ui.historyRestored":"履歴から復元しました","history.create":"作成","history.restore":"復元","history.blend":"合成","history.rename":"改名","history.parents":"合成元","history.mutate":"変異","history.source":"変異元","genetics.title":"人物の合成","genetics.note":"2人のシードから、新しい人物のパラメータを合成します。衣服と名前は引き継がれません。","genetics.personA":"人物Aのシード","genetics.personB":"人物Bのシード","genetics.useCurrent":"現在の人物","genetics.generate":"新しい人物を生成","genetics.result":"合成した人物","genetics.apply":"この人物にする","genetics.cancel":"やめる","genetics.created":"合成した人物を表示しています","mutation.title":"バリエーション","mutation.note":"この人物の「近くの別人」を4人作ります。選んだ人は新しい人物として始まります（名前は付きません）。衣服は変わりません。","mutation.subtle":"控えめ","mutation.standard":"標準","mutation.bold":"大胆","mutation.generate":"バリエーションを作る","mutation.candidates":"候補の人物","mutation.apply":"この人物にする","mutation.cancel":"やめる","mutation.applied":"新しい人物として採用しました","mutation.created":"候補を4人作りました","restore.note":"この人物は受け取った「型」です。そのまま使うこともできますが、ここから自分の人物を作るのがこのアプリの使い方です。","restore.makeMine":"この型から自分の人物を作る","restore.dismiss":"このまま使う","ui.dressHidesBottom":"ワンピースのときはボトムスは表示されません","ui.color":"色","ui.savePhoto":"写真を保存","ui.export3d":"3Dファイル書き出し","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3Dファイルを書き出しました","export.note":"人物とコーデを、他のツールやアプリで使える3Dファイルとして書き出します。Tポーズの基準姿勢で、骨格（ヒューマノイドの骨マッピング）付き。ファイルの中にはシードとパラメータのJSON、利用条件（素材として自由に使えます）が記録されます。","ui.random":"ランダム","ui.spin":"自動回転","ui.saved":"写真を保存しました","ui.resetView":"視点を戻す","llm.settingsTitle":"接続設定（自分のLLM）","llm.endpoint":"エンドポイントURL","llm.apiKey":"APIキー（任意）","llm.model":"モデル名","llm.save":"保存","llm.saved":"設定を保存しました","llm.test":"接続テスト","llm.testing":"接続中…","llm.testOk":"接続できました","llm.testFail":"接続できませんでした","llm.note":"設定はこの端末にだけ保存されます。送信されるのは指示文と現在の人物・コーデの状態だけで、送信先は設定したエンドポイントのみです。","llm.chatTitle":"AIに頼む","llm.chatPlaceholder":"例: ドレスに着替えて、髪を金色にして","llm.send":"送信","llm.thinking":"考え中…","llm.notConfigured":"まず接続設定を保存してください","llm.modelMissing":"モデル名を入力してください","llm.invalidEndpoint":"エンドポイントURLを確認してください","llm.applied":"実行","llm.rejected":"却下","llm.error":"エラー","llm.you":"あなた","llm.ai":"AI","sd.settingsTitle":"画像生成の接続設定（自分のSD）","sd.endpoint":"SDエンドポイントURL","sd.auth":"認証情報（任意）","sd.note":"設定はこの端末にだけ保存されます。生成は設定したSDサーバ側で行われます（モデルも計算もあなたの環境です）。「今の姿から生成」では、現在の3D描画が入力画像として設定先へ送られます。生成された画像はあなたのコンテンツで、この端末にだけ保存されます。","sd.promptTitle":"自動で組み立てるプロンプト","sd.extraLabel":"追加の言葉（任意）","sd.extraPlaceholder":"例: 水彩イラスト風、夕日の光","sd.fromPhoto":"今の姿から生成","sd.fromText":"文章だけで生成","sd.generating":"生成中…（サーバ側の計算に時間がかかります）","sd.notConfigured":"まずSDの接続設定を保存してください","sd.resultTitle":"生成した画像","sd.download":"画像を保存","sd.toCard":"この絵でカードを作る","sd.cardSaved":"カードを保存しました","vr.enter":"VRで入る","vr.exit":"VRを終了","vr.unsupported":"この環境ではWebXR（VR）に対応していないため、VRには入れません。通常の画面ではそのまま遊べます。","vr.sessionError":"VRセッションを開始できませんでした","vr.panelTitle":"きせかえ","vr.pageClothes":"ふく","vr.pageExtras":"こもの・ポーズ","vr.looks":"コーデ","vr.noLooks":"保存したコーデはまだありません","vr.turnLeft":"左を向く","vr.turnRight":"右を向く","vr.hint":"スティックを左右に倒しても回れます","footer.note":"無料・広告なし・アカウントなし。データはこの端末の中だけ。AI接続・画像生成を使う場合のみ、設定した接続先へ現在の状態（画像生成では現在の描画）が送られます。","principle.note":"このアプリの人物はすべて、パラメータから作られる架空の成人キャラクターです。生成は成人の範囲に限るよう設計されており、実在の人物を再現するためのものではありません。"},_y={"app.title":"3D Fitting Room","app.workingTitle":"working title","app.tagline":"Dress up, snap it, show it off.","cat.character":"Character","cat.looks":"Looks","cat.tops":"Tops","cat.outer":"Outerwear","cat.bottoms":"Bottoms","cat.shoes":"Shoes","cat.hat":"Hats","cat.glasses":"Glasses","cat.accessory":"Accessories","cat.pose":"Pose","cat.llm":"AI Connect","item.none":"None","top.tee":"T-shirt","top.hoodie":"Hoodie","top.blouse":"Blouse","top.dress":"Dress","top.dressLong":"Long dress","outer.jacket":"Jacket","outer.coat":"Coat","outer.cardigan":"Cardigan","bottom.skirt":"Skirt","bottom.skirtLong":"Long skirt","bottom.pants":"Pants","bottom.shorts":"Shorts","shoe.flats":"Flats","shoe.sneakers":"Sneakers","shoe.pumps":"Pumps","shoe.boots":"Boots","hat.cap":"Cap","hat.beanie":"Beanie","hat.catears":"Cat ears","hat.ribbon":"Ribbon","glasses.round":"Round glasses","glasses.square":"Square glasses","glasses.sunglasses":"Sunglasses","accessory.necklace":"Necklace","accessory.scarf":"Scarf","accessory.bag":"Bag","pose.stand":"Stand","pose.wave":"Wave","pose.cheer":"Cheer","pose.peace":"Peace","pose.relax":"Relax","ui.skinTone":"Skin tone","ui.height":"Height","ui.body":"Body","body.shoulderWidth":"Shoulder width","body.waist":"Waist","body.hip":"Hips","body.bust":"Bust","body.build":"Build","ui.face":"Face","face.eyeSize":"Eye size","face.eyeSpacing":"Eye spacing","face.eyeHeight":"Eye height","face.eyeShape":"Eye shape","face.eyeTilt":"Eye angle","face.browHeight":"Brow height","face.browTilt":"Brow angle","face.noseWidth":"Nose width","face.noseProminence":"Nose height","face.lipWidth":"Mouth width","face.lipFullness":"Lip fullness","face.faceWidth":"Face width","face.asymmetry":"Asymmetry","ui.hairStyle":"Hairstyle","ui.hairColor":"Hair color","ui.eyeColor":"Eye color","hair.bob":"Bob","hair.long":"Long","hair.short":"Short","hair.ponytail":"Ponytail","hair.bun":"Bun","ui.seed":"Seed","ui.copy":"Copy","ui.seedCopied":"Seed copied","ui.seedApply":"Apply","ui.seedInvalid":"That seed could not be read","ui.cardLoad":"Restore from a card image","ui.cardRestored":"Restored from the card","ui.cardInvalid":"No seed could be read from that image","ui.name":"Name","ui.namePlaceholder":"Name (optional)","ui.nameNote":"What this person is called. The name travels with the seed and is noted small on the share card as the wearer. Please do not name them after a real person.","ui.currentLook":"Current look","ui.lookNamePlaceholder":"Name this look (e.g. Rainy day)","ui.saveLook":"Save this look","ui.lookSaved":"Look saved","ui.lookApplied":"Changed into the saved look","ui.lookNameRequired":"Give the look a name first","ui.looksEmpty":"No saved looks yet. Name the current combination to keep it here.","ui.prevLook":"Previous look","ui.swapLook":"Swap with previous look","ui.swapped":"Swapped with the previous look","card.wornBy":"Worn by","card.fictional":"* This character is fictional.","ui.roster":"People","ui.newPerson":"New person","ui.unnamed":"Unnamed","ui.currentPerson":"On stage","ui.switchPerson":"Call up","ui.rename":"Rename","ui.delete":"Delete","ui.history":"Edit history","ui.historyNote":"History stays on this device only. It is never included in cards, seeds or exported files.","ui.historyRestored":"Restored from history","history.create":"Created","history.restore":"Restored","history.blend":"Blended","history.rename":"Renamed","history.parents":"Blended from","history.mutate":"Varied","history.source":"Varied from","genetics.title":"Blend two people","genetics.note":"Synthesizes a new person from the parameters of two seeds. Clothes and names are not carried over.","genetics.personA":"Seed of person A","genetics.personB":"Seed of person B","genetics.useCurrent":"Current person","genetics.generate":"Create a new person","genetics.result":"Blended person","genetics.apply":"Use this person","genetics.cancel":"Discard","genetics.created":"Showing the blended person","mutation.title":"Variations","mutation.note":"Rolls four nearby-but-different people from this one. Whoever you pick starts as a new person (no name attached). Clothes do not change.","mutation.subtle":"Subtle","mutation.standard":"Standard","mutation.bold":"Bold","mutation.generate":"Make variations","mutation.candidates":"Candidates","mutation.apply":"Use this person","mutation.cancel":"Discard","mutation.applied":"Adopted as a new person","mutation.created":"Four variations are ready","restore.note":"This person arrived as a template. You can keep them exactly as they are — or make them the starting point of your own person.","restore.makeMine":"Make my own person from this template","restore.dismiss":"Keep this person","ui.dressHidesBottom":"Bottoms are not shown while a dress is worn","ui.color":"Color","ui.savePhoto":"Save photo","ui.export3d":"Export 3D file","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D file exported","export.note":"Exports the person and outfit as a 3D file other tools and apps can use: a T-posed reference figure with a humanoid bone mapping. The seed, a parameter JSON and the usage terms (free to use as material) are recorded inside the file.","ui.random":"Random","ui.spin":"Auto-spin","ui.saved":"Photo saved","ui.resetView":"Reset view","llm.settingsTitle":"Connection (your own LLM)","llm.endpoint":"Endpoint URL","llm.apiKey":"API key (optional)","llm.model":"Model name","llm.save":"Save","llm.saved":"Settings saved","llm.test":"Test connection","llm.testing":"Testing…","llm.testOk":"Connected","llm.testFail":"Could not connect","llm.note":"Settings are stored only on this device. The only things ever sent are your instruction and the current character/outfit state, and only to the endpoint you set.","llm.chatTitle":"Ask the AI","llm.chatPlaceholder":"e.g. Put on a dress and make my hair blonde","llm.send":"Send","llm.thinking":"Thinking…","llm.notConfigured":"Save the connection settings first","llm.modelMissing":"Enter a model name","llm.invalidEndpoint":"Check the endpoint URL","llm.applied":"Applied","llm.rejected":"Rejected","llm.error":"Error","llm.you":"You","llm.ai":"AI","sd.settingsTitle":"Image generation (your own SD)","sd.endpoint":"SD endpoint URL","sd.auth":"Auth (optional)","sd.note":'Settings are stored only on this device. Generation runs on the SD server you configured — the model and the compute are yours. "From current look" sends the current 3D rendering to that endpoint as the input image. Generated images are your content and are kept only on this device.',"sd.promptTitle":"Auto-built prompt","sd.extraLabel":"Extra words (optional)","sd.extraPlaceholder":"e.g. watercolor illustration, sunset light","sd.fromPhoto":"From current look","sd.fromText":"From text only","sd.generating":"Generating… (the server takes a while)","sd.notConfigured":"Save the SD connection settings first","sd.resultTitle":"Generated image","sd.download":"Save image","sd.toCard":"Make a card with this image","sd.cardSaved":"Card saved","vr.enter":"Enter VR","vr.exit":"Exit VR","vr.unsupported":"WebXR VR is not available in this environment, so VR cannot be entered. The regular screen works as always.","vr.sessionError":"The VR session could not be started","vr.panelTitle":"Dress-up","vr.pageClothes":"Clothes","vr.pageExtras":"Extras & pose","vr.looks":"Looks","vr.noLooks":"No saved looks yet","vr.turnLeft":"Turn left","vr.turnRight":"Turn right","vr.hint":"You can also turn with the thumbstick","footer.note":"Free, no ads, no accounts. Data stays on this device; only when you use the AI or image-generation connections is the current state (for image generation, the current rendering) sent to the endpoint you configured.","principle.note":"Everyone in this app is a fictional adult character generated from parameters. Generation is designed to stay within an adult range, and this app is not made for recreating real people."},vy={"app.title":"3D Fitting Room","app.workingTitle":"título provisional","app.tagline":"Cambia el look, haz una foto y compártelo.","cat.character":"Personaje","cat.looks":"Conjuntos","cat.tops":"Tops","cat.outer":"Exteriores","cat.bottoms":"Partes de abajo","cat.shoes":"Zapatos","cat.hat":"Sombreros","cat.glasses":"Gafas","cat.accessory":"Accesorios","cat.pose":"Pose","cat.llm":"Conexión IA","item.none":"Ninguno","top.tee":"Camiseta","top.hoodie":"Sudadera","top.blouse":"Blusa","top.dress":"Vestido","top.dressLong":"Vestido largo","outer.jacket":"Chaqueta","outer.coat":"Abrigo","outer.cardigan":"Cárdigan","bottom.skirt":"Falda","bottom.skirtLong":"Falda larga","bottom.pants":"Pantalón","bottom.shorts":"Pantalón corto","shoe.flats":"Zapatos planos","shoe.sneakers":"Zapatillas","shoe.pumps":"Tacones","shoe.boots":"Botas","hat.cap":"Gorra","hat.beanie":"Gorro","hat.catears":"Orejas de gato","hat.ribbon":"Lazo","glasses.round":"Gafas redondas","glasses.square":"Gafas cuadradas","glasses.sunglasses":"Gafas de sol","accessory.necklace":"Collar","accessory.scarf":"Bufanda","accessory.bag":"Bolso","pose.stand":"De pie","pose.wave":"Saludar","pose.cheer":"Celebrar","pose.peace":"Paz","pose.relax":"Relax","ui.skinTone":"Tono de piel","ui.height":"Altura","ui.body":"Cuerpo","body.shoulderWidth":"Ancho de hombros","body.waist":"Cintura","body.hip":"Cadera","body.bust":"Pecho","body.build":"Complexión","ui.face":"Rostro","face.eyeSize":"Tamaño de ojos","face.eyeSpacing":"Distancia entre ojos","face.eyeHeight":"Altura de ojos","face.eyeShape":"Forma de ojos","face.eyeTilt":"Inclinación de ojos","face.browHeight":"Altura de cejas","face.browTilt":"Inclinación de cejas","face.noseWidth":"Ancho de nariz","face.noseProminence":"Altura de nariz","face.lipWidth":"Ancho de boca","face.lipFullness":"Grosor de labios","face.faceWidth":"Ancho de rostro","face.asymmetry":"Asimetría","ui.hairStyle":"Peinado","ui.hairColor":"Color de pelo","ui.eyeColor":"Color de ojos","hair.bob":"Bob","hair.long":"Largo","hair.short":"Corto","hair.ponytail":"Cola de caballo","hair.bun":"Moño","ui.seed":"Semilla","ui.copy":"Copiar","ui.seedCopied":"Semilla copiada","ui.seedApply":"Aplicar","ui.seedInvalid":"No se pudo leer esa semilla","ui.cardLoad":"Restaurar desde una tarjeta","ui.cardRestored":"Restaurado desde la tarjeta","ui.cardInvalid":"No se encontró ninguna semilla en esa imagen","ui.name":"Nombre","ui.namePlaceholder":"Nombre (opcional)","ui.nameNote":"El nombre de este personaje. Viaja con la semilla y aparece en pequeño en la tarjeta como quien lo lleva. No le pongas el nombre de una persona real.","ui.currentLook":"Look actual","ui.lookNamePlaceholder":"Nombre del look (ej.: Día de lluvia)","ui.saveLook":"Guardar este look","ui.lookSaved":"Look guardado","ui.lookApplied":"Look aplicado","ui.lookNameRequired":"Primero ponle un nombre al look","ui.looksEmpty":"Aún no hay looks guardados. Ponle nombre a la combinación actual para guardarla aquí.","ui.prevLook":"Look anterior","ui.swapLook":"Cambiar al look anterior","ui.swapped":"Cambiado al look anterior","card.wornBy":"Lo lleva","card.fictional":"* Este personaje es ficticio.","ui.roster":"Personajes","ui.newPerson":"Nuevo personaje","ui.unnamed":"Sin nombre","ui.currentPerson":"En escena","ui.switchPerson":"Mostrar","ui.rename":"Renombrar","ui.delete":"Eliminar","ui.history":"Historial de edición","ui.historyNote":"El historial se queda solo en este dispositivo. Nunca se incluye en tarjetas, semillas ni archivos exportados.","ui.historyRestored":"Restaurado del historial","history.create":"Creado","history.restore":"Restaurado","history.blend":"Combinado","history.rename":"Renombrado","history.parents":"Combinado de","history.mutate":"Variado","history.source":"Variado de","genetics.title":"Combinar dos personajes","genetics.note":"Sintetiza un personaje nuevo a partir de los parámetros de dos semillas. La ropa y los nombres no se heredan.","genetics.personA":"Semilla del personaje A","genetics.personB":"Semilla del personaje B","genetics.useCurrent":"Personaje actual","genetics.generate":"Crear un personaje nuevo","genetics.result":"Personaje combinado","genetics.apply":"Usar este personaje","genetics.cancel":"Descartar","genetics.created":"Mostrando el personaje combinado","mutation.title":"Variaciones","mutation.note":"Genera cuatro personas cercanas pero distintas a partir de esta. La que elijas empieza como un personaje nuevo (sin nombre). La ropa no cambia.","mutation.subtle":"Sutil","mutation.standard":"Estándar","mutation.bold":"Audaz","mutation.generate":"Crear variaciones","mutation.candidates":"Candidatos","mutation.apply":"Usar este personaje","mutation.cancel":"Descartar","mutation.applied":"Adoptado como personaje nuevo","mutation.created":"Cuatro variaciones listas","restore.note":"Este personaje llegó como plantilla. Puedes quedártelo tal cual, o convertirlo en el punto de partida de tu propio personaje.","restore.makeMine":"Crear mi personaje desde esta plantilla","restore.dismiss":"Quedarme con este personaje","ui.dressHidesBottom":"Las partes de abajo no se muestran con un vestido","ui.color":"Color","ui.savePhoto":"Guardar foto","ui.export3d":"Exportar archivo 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Archivo 3D exportado","export.note":"Exporta el personaje y el look como un archivo 3D que otras herramientas y apps pueden usar: una figura de referencia en pose T con mapeo de huesos humanoide. La semilla, un JSON de parámetros y las condiciones de uso (libre como material) quedan registrados dentro del archivo.","ui.random":"Aleatorio","ui.spin":"Giro automático","ui.saved":"Foto guardada","ui.resetView":"Restablecer vista","llm.settingsTitle":"Conexión (tu propio LLM)","llm.endpoint":"URL del endpoint","llm.apiKey":"Clave API (opcional)","llm.model":"Nombre del modelo","llm.save":"Guardar","llm.saved":"Configuración guardada","llm.test":"Probar conexión","llm.testing":"Probando…","llm.testOk":"Conectado","llm.testFail":"No se pudo conectar","llm.note":"La configuración se guarda solo en este dispositivo. Lo único que se envía es tu instrucción y el estado actual del personaje y el look, y solo al endpoint que configuraste.","llm.chatTitle":"Pídeselo a la IA","llm.chatPlaceholder":"ej.: Ponle un vestido y hazle el pelo rubio","llm.send":"Enviar","llm.thinking":"Pensando…","llm.notConfigured":"Primero guarda la configuración de conexión","llm.modelMissing":"Introduce un nombre de modelo","llm.invalidEndpoint":"Revisa la URL del endpoint","llm.applied":"Aplicado","llm.rejected":"Rechazado","llm.error":"Error","llm.you":"Tú","llm.ai":"IA","sd.settingsTitle":"Generación de imágenes (tu propio SD)","sd.endpoint":"URL del endpoint de SD","sd.auth":"Autenticación (opcional)","sd.note":"La configuración se guarda solo en este dispositivo. La generación se realiza en el servidor SD que configuraste: el modelo y el cómputo son tuyos. «Desde el look actual» envía la renderización 3D actual a ese endpoint como imagen de entrada. Las imágenes generadas son tu contenido y se guardan solo en este dispositivo.","sd.promptTitle":"Prompt construido automáticamente","sd.extraLabel":"Palabras extra (opcional)","sd.extraPlaceholder":"ej.: estilo acuarela, luz de atardecer","sd.fromPhoto":"Desde el look actual","sd.fromText":"Solo desde texto","sd.generating":"Generando… (el servidor tarda un poco)","sd.notConfigured":"Primero guarda la configuración de SD","sd.resultTitle":"Imagen generada","sd.download":"Guardar imagen","sd.toCard":"Hacer una tarjeta con esta imagen","sd.cardSaved":"Tarjeta guardada","vr.enter":"Entrar en VR","vr.exit":"Salir de VR","vr.unsupported":"La VR WebXR no está disponible en este entorno, así que no se puede entrar en VR. La pantalla normal funciona como siempre.","vr.sessionError":"No se pudo iniciar la sesión VR","vr.panelTitle":"Vestidor","vr.pageClothes":"Ropa","vr.pageExtras":"Accesorios y pose","vr.looks":"Looks","vr.noLooks":"Aún no hay looks guardados","vr.turnLeft":"Girar a la izquierda","vr.turnRight":"Girar a la derecha","vr.hint":"También puedes girar con el joystick","footer.note":"Gratis, sin anuncios y sin cuentas. Los datos se quedan en este dispositivo; solo cuando usas las conexiones de IA o de generación de imágenes se envía el estado actual (en el caso de las imágenes, el renderizado actual) al endpoint que configuraste.","principle.note":"Todos los personajes de esta app son adultos ficticios generados a partir de parámetros. La generación está diseñada para mantenerse dentro del rango adulto, y esta app no está hecha para recrear a personas reales."},yy={"app.title":"3D Fitting Room","app.workingTitle":"暂定名称","app.tagline":"换装、拍照、秀出来。","cat.character":"角色","cat.looks":"搭配","cat.tops":"上装","cat.outer":"外套","cat.bottoms":"下装","cat.shoes":"鞋子","cat.hat":"帽子","cat.glasses":"眼镜","cat.accessory":"配饰","cat.pose":"姿势","cat.llm":"AI 连接","item.none":"无","top.tee":"T恤","top.hoodie":"连帽衫","top.blouse":"衬衫","top.dress":"连衣裙","top.dressLong":"长款连衣裙","outer.jacket":"夹克","outer.coat":"大衣","outer.cardigan":"开衫","bottom.skirt":"裙子","bottom.skirtLong":"长裙","bottom.pants":"长裤","bottom.shorts":"短裤","shoe.flats":"平底鞋","shoe.sneakers":"运动鞋","shoe.pumps":"高跟鞋","shoe.boots":"靴子","hat.cap":"棒球帽","hat.beanie":"针织帽","hat.catears":"猫耳","hat.ribbon":"蝴蝶结","glasses.round":"圆框眼镜","glasses.square":"方框眼镜","glasses.sunglasses":"太阳镜","accessory.necklace":"项链","accessory.scarf":"围巾","accessory.bag":"包","pose.stand":"站立","pose.wave":"挥手","pose.cheer":"欢呼","pose.peace":"剪刀手","pose.relax":"放松","ui.skinTone":"肤色","ui.height":"身高","ui.body":"体型","body.shoulderWidth":"肩宽","body.waist":"腰围","body.hip":"臀围","body.bust":"胸围","body.build":"体格","ui.face":"面部","face.eyeSize":"眼睛大小","face.eyeSpacing":"眼距","face.eyeHeight":"眼睛高度","face.eyeShape":"眼型","face.eyeTilt":"眼角倾斜","face.browHeight":"眉毛高度","face.browTilt":"眉毛倾斜","face.noseWidth":"鼻宽","face.noseProminence":"鼻高","face.lipWidth":"嘴宽","face.lipFullness":"唇厚","face.faceWidth":"脸宽","face.asymmetry":"左右差","ui.hairStyle":"发型","ui.hairColor":"发色","ui.eyeColor":"瞳色","hair.bob":"波波头","hair.long":"长发","hair.short":"短发","hair.ponytail":"马尾","hair.bun":"丸子头","ui.seed":"种子","ui.copy":"复制","ui.seedCopied":"种子已复制","ui.seedApply":"应用","ui.seedInvalid":"无法读取该种子","ui.cardLoad":"从卡片图片恢复","ui.cardRestored":"已从卡片恢复","ui.cardInvalid":"无法从该图片读取种子","ui.name":"名字","ui.namePlaceholder":"名字（可选）","ui.nameNote":"这个角色的名字。名字会随种子一起传递，并作为穿着者小字标注在分享卡片上。请不要用真实人物的名字。","ui.currentLook":"当前搭配","ui.lookNamePlaceholder":"搭配名称（例：雨天搭配）","ui.saveLook":"保存这个搭配","ui.lookSaved":"搭配已保存","ui.lookApplied":"已换上保存的搭配","ui.lookNameRequired":"请先给搭配起个名字","ui.looksEmpty":"还没有保存的搭配。给现在的组合起个名字就能保存在这里。","ui.prevLook":"上一个搭配","ui.swapLook":"与上一个搭配互换","ui.swapped":"已与上一个搭配互换","card.wornBy":"穿着者","card.fictional":"※这个人物是虚构的角色","ui.roster":"人物列表","ui.newPerson":"新人物","ui.unnamed":"未命名","ui.currentPerson":"展示中","ui.switchPerson":"调出","ui.rename":"改名","ui.delete":"删除","ui.history":"编辑历史","ui.historyNote":"历史只保存在这台设备上，绝不会包含在卡片、种子或导出的文件中。","ui.historyRestored":"已从历史恢复","history.create":"创建","history.restore":"恢复","history.blend":"合成","history.rename":"改名","history.parents":"合成来源","history.mutate":"变异","history.source":"变异来源","genetics.title":"合成两个人物","genetics.note":"根据两个种子的参数合成一个新人物。衣服和名字不会被继承。","genetics.personA":"人物A的种子","genetics.personB":"人物B的种子","genetics.useCurrent":"当前人物","genetics.generate":"生成新人物","genetics.result":"合成的人物","genetics.apply":"使用这个人物","genetics.cancel":"取消","genetics.created":"正在显示合成的人物","mutation.title":"变体","mutation.note":"以这个人物为基础，生成四个相近但不同的人物。选中的人物将作为新人物开始（不带名字）。衣服不会改变。","mutation.subtle":"微小","mutation.standard":"标准","mutation.bold":"大胆","mutation.generate":"生成变体","mutation.candidates":"候选人物","mutation.apply":"使用这个人物","mutation.cancel":"取消","mutation.applied":"已作为新人物采用","mutation.created":"已生成四个变体","restore.note":"这个人物是以模板的形式收到的。你可以原样保留，也可以以此为起点，创建属于你自己的人物。","restore.makeMine":"以这个模板创建我的人物","restore.dismiss":"就保留这个人物","ui.dressHidesBottom":"穿连衣裙时不显示下装","ui.color":"颜色","ui.savePhoto":"保存照片","ui.export3d":"导出3D文件","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D文件已导出","export.note":"将人物和搭配导出为其他工具和应用可以使用的3D文件：T型姿势的参考模型，带有人形骨骼映射。种子、参数JSON和使用条件（可自由用作素材）都记录在文件内部。","ui.random":"随机","ui.spin":"自动旋转","ui.saved":"照片已保存","ui.resetView":"重置视角","llm.settingsTitle":"连接设置（自己的LLM）","llm.endpoint":"端点URL","llm.apiKey":"API密钥（可选）","llm.model":"模型名称","llm.save":"保存","llm.saved":"设置已保存","llm.test":"连接测试","llm.testing":"连接中…","llm.testOk":"已连接","llm.testFail":"无法连接","llm.note":"设置只保存在这台设备上。发送的内容只有你的指令和当前的人物/搭配状态，且只发送到你设置的端点。","llm.chatTitle":"让AI来做","llm.chatPlaceholder":"例：换上连衣裙，把头发变成金色","llm.send":"发送","llm.thinking":"思考中…","llm.notConfigured":"请先保存连接设置","llm.modelMissing":"请输入模型名称","llm.invalidEndpoint":"请检查端点URL","llm.applied":"已执行","llm.rejected":"已拒绝","llm.error":"错误","llm.you":"你","llm.ai":"AI","sd.settingsTitle":"图像生成连接设置（自己的SD）","sd.endpoint":"SD端点URL","sd.auth":"认证信息（可选）","sd.note":"设置只保存在这台设备上。生成在你配置的SD服务器上进行——模型和算力都属于你。“从当前造型生成”会把当前的3D渲染作为输入图片发送到该端点。生成的图片是你的内容，只保存在这台设备上。","sd.promptTitle":"自动组装的提示词","sd.extraLabel":"附加词（可选）","sd.extraPlaceholder":"例：水彩插画风、夕阳的光","sd.fromPhoto":"从当前造型生成","sd.fromText":"仅用文字生成","sd.generating":"生成中…（服务器计算需要时间）","sd.notConfigured":"请先保存SD连接设置","sd.resultTitle":"生成的图片","sd.download":"保存图片","sd.toCard":"用这张图制作卡片","sd.cardSaved":"卡片已保存","vr.enter":"进入VR","vr.exit":"退出VR","vr.unsupported":"此环境不支持 WebXR VR，无法进入 VR。普通画面可以照常使用。","vr.sessionError":"无法启动VR会话","vr.panelTitle":"换装","vr.pageClothes":"服装","vr.pageExtras":"配饰与姿势","vr.looks":"搭配","vr.noLooks":"还没有保存的搭配","vr.turnLeft":"向左转","vr.turnRight":"向右转","vr.hint":"也可以用摇杆左右转动","footer.note":"免费、无广告、无需账号。数据只保存在这台设备上；仅当你使用 AI 连接或图像生成时，当前状态（图像生成时为当前渲染图）才会发送到你设置的端点。","principle.note":"本应用中的人物都是由参数生成的虚构成年角色。生成被设计为仅限于成年范围，本应用并非用于再现真实人物。"},xy={"app.title":"3D Fitting Room","app.workingTitle":"titre provisoire","app.tagline":"Change de tenue, prends la photo, montre-la.","cat.character":"Personnage","cat.looks":"Tenues","cat.tops":"Hauts","cat.outer":"Vestes","cat.bottoms":"Bas","cat.shoes":"Chaussures","cat.hat":"Chapeaux","cat.glasses":"Lunettes","cat.accessory":"Accessoires","cat.pose":"Pose","cat.llm":"Connexion IA","item.none":"Aucun","top.tee":"T-shirt","top.hoodie":"Sweat à capuche","top.blouse":"Blouse","top.dress":"Robe","top.dressLong":"Robe longue","outer.jacket":"Veste","outer.coat":"Manteau","outer.cardigan":"Cardigan","bottom.skirt":"Jupe","bottom.skirtLong":"Jupe longue","bottom.pants":"Pantalon","bottom.shorts":"Short","shoe.flats":"Chaussures plates","shoe.sneakers":"Baskets","shoe.pumps":"Escarpins","shoe.boots":"Bottes","hat.cap":"Casquette","hat.beanie":"Bonnet","hat.catears":"Oreilles de chat","hat.ribbon":"Ruban","glasses.round":"Lunettes rondes","glasses.square":"Lunettes carrées","glasses.sunglasses":"Lunettes de soleil","accessory.necklace":"Collier","accessory.scarf":"Écharpe","accessory.bag":"Sac","pose.stand":"Debout","pose.wave":"Saluer","pose.cheer":"Hourra","pose.peace":"Paix","pose.relax":"Détente","ui.skinTone":"Teint","ui.height":"Taille","ui.body":"Corps","body.shoulderWidth":"Largeur d'épaules","body.waist":"Tour de taille","body.hip":"Hanches","body.bust":"Poitrine","body.build":"Carrure","ui.face":"Visage","face.eyeSize":"Taille des yeux","face.eyeSpacing":"Écart des yeux","face.eyeHeight":"Hauteur des yeux","face.eyeShape":"Forme des yeux","face.eyeTilt":"Inclinaison des yeux","face.browHeight":"Hauteur des sourcils","face.browTilt":"Inclinaison des sourcils","face.noseWidth":"Largeur du nez","face.noseProminence":"Hauteur du nez","face.lipWidth":"Largeur de la bouche","face.lipFullness":"Épaisseur des lèvres","face.faceWidth":"Largeur du visage","face.asymmetry":"Asymétrie","ui.hairStyle":"Coiffure","ui.hairColor":"Couleur de cheveux","ui.eyeColor":"Couleur des yeux","hair.bob":"Carré","hair.long":"Longs","hair.short":"Courts","hair.ponytail":"Queue de cheval","hair.bun":"Chignon","ui.seed":"Graine","ui.copy":"Copier","ui.seedCopied":"Graine copiée","ui.seedApply":"Appliquer","ui.seedInvalid":"Cette graine est illisible","ui.cardLoad":"Restaurer depuis une carte","ui.cardRestored":"Restauré depuis la carte","ui.cardInvalid":"Aucune graine trouvée dans cette image","ui.name":"Nom","ui.namePlaceholder":"Nom (facultatif)","ui.nameNote":"Le nom de ce personnage. Il voyage avec la graine et figure en petit sur la carte comme la personne qui porte la tenue. Ne lui donnez pas le nom d'une personne réelle.","ui.currentLook":"Tenue actuelle","ui.lookNamePlaceholder":"Nom de la tenue (ex. Jour de pluie)","ui.saveLook":"Enregistrer cette tenue","ui.lookSaved":"Tenue enregistrée","ui.lookApplied":"Tenue appliquée","ui.lookNameRequired":"Donnez d'abord un nom à la tenue","ui.looksEmpty":"Aucune tenue enregistrée pour le moment. Nommez la combinaison actuelle pour la garder ici.","ui.prevLook":"Tenue précédente","ui.swapLook":"Échanger avec la tenue précédente","ui.swapped":"Échange effectué","card.wornBy":"Porté par","card.fictional":"* Ce personnage est fictif.","ui.roster":"Personnages","ui.newPerson":"Nouveau personnage","ui.unnamed":"Sans nom","ui.currentPerson":"Sur scène","ui.switchPerson":"Afficher","ui.rename":"Renommer","ui.delete":"Supprimer","ui.history":"Historique d'édition","ui.historyNote":"L'historique reste uniquement sur cet appareil. Il n'est jamais inclus dans les cartes, les graines ni les fichiers exportés.","ui.historyRestored":"Restauré depuis l'historique","history.create":"Créé","history.restore":"Restauré","history.blend":"Fusionné","history.rename":"Renommé","history.parents":"Fusionné à partir de","history.mutate":"Varié","history.source":"Varié à partir de","genetics.title":"Fusionner deux personnages","genetics.note":"Synthétise un nouveau personnage à partir des paramètres de deux graines. Les vêtements et les noms ne sont pas repris.","genetics.personA":"Graine du personnage A","genetics.personB":"Graine du personnage B","genetics.useCurrent":"Personnage actuel","genetics.generate":"Créer un nouveau personnage","genetics.result":"Personnage fusionné","genetics.apply":"Utiliser ce personnage","genetics.cancel":"Abandonner","genetics.created":"Affichage du personnage fusionné","mutation.title":"Variations","mutation.note":"Génère quatre personnages proches mais différents à partir de celui-ci. Celui que vous choisirez commencera comme un nouveau personnage (sans nom). Les vêtements ne changent pas.","mutation.subtle":"Subtile","mutation.standard":"Standard","mutation.bold":"Audacieuse","mutation.generate":"Créer des variations","mutation.candidates":"Candidats","mutation.apply":"Utiliser ce personnage","mutation.cancel":"Abandonner","mutation.applied":"Adopté comme nouveau personnage","mutation.created":"Quatre variations prêtes","restore.note":"Ce personnage est arrivé comme modèle. Vous pouvez le garder tel quel — ou en faire le point de départ de votre propre personnage.","restore.makeMine":"Créer mon personnage à partir de ce modèle","restore.dismiss":"Garder ce personnage","ui.dressHidesBottom":"Le bas n'est pas affiché avec une robe","ui.color":"Couleur","ui.savePhoto":"Enregistrer la photo","ui.export3d":"Exporter le fichier 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Fichier 3D exporté","export.note":"Exporte le personnage et la tenue sous forme de fichier 3D utilisable par d'autres outils et applications : une figure de référence en pose T avec un squelette humanoïde. La graine, un JSON de paramètres et les conditions d'utilisation (libre comme matériau) sont enregistrés dans le fichier.","ui.random":"Aléatoire","ui.spin":"Rotation auto","ui.saved":"Photo enregistrée","ui.resetView":"Réinitialiser la vue","llm.settingsTitle":"Connexion (votre propre LLM)","llm.endpoint":"URL de l'endpoint","llm.apiKey":"Clé API (facultatif)","llm.model":"Nom du modèle","llm.save":"Enregistrer","llm.saved":"Réglages enregistrés","llm.test":"Tester la connexion","llm.testing":"Test en cours…","llm.testOk":"Connecté","llm.testFail":"Connexion impossible","llm.note":"Les réglages sont conservés uniquement sur cet appareil. Seuls votre instruction et l'état actuel du personnage et de la tenue sont envoyés, et uniquement au point de terminaison que vous avez défini.","llm.chatTitle":"Demander à l'IA","llm.chatPlaceholder":"ex. Mets-lui une robe et rends ses cheveux blonds","llm.send":"Envoyer","llm.thinking":"Réflexion…","llm.notConfigured":"Enregistrez d'abord les réglages de connexion","llm.modelMissing":"Saisissez un nom de modèle","llm.invalidEndpoint":"Vérifiez l'URL du point de terminaison","llm.applied":"Appliqué","llm.rejected":"Rejeté","llm.error":"Erreur","llm.you":"Vous","llm.ai":"IA","sd.settingsTitle":"Génération d'images (votre propre SD)","sd.endpoint":"URL de l'endpoint SD","sd.auth":"Authentification (facultatif)","sd.note":"Les réglages sont conservés uniquement sur cet appareil. La génération s'exécute sur le serveur SD que vous avez configuré — le modèle et le calcul sont les vôtres. « Depuis la tenue actuelle » envoie le rendu 3D actuel à ce point de terminaison comme image d'entrée. Les images générées sont votre contenu et restent uniquement sur cet appareil.","sd.promptTitle":"Prompt construit automatiquement","sd.extraLabel":"Mots supplémentaires (facultatif)","sd.extraPlaceholder":"ex. style aquarelle, lumière du couchant","sd.fromPhoto":"Depuis la tenue actuelle","sd.fromText":"Depuis le texte seul","sd.generating":"Génération… (le serveur prend un moment)","sd.notConfigured":"Enregistrez d'abord la configuration SD","sd.resultTitle":"Image générée","sd.download":"Enregistrer l'image","sd.toCard":"Faire une carte avec cette image","sd.cardSaved":"Carte enregistrée","vr.enter":"Entrer en VR","vr.exit":"Quitter la VR","vr.unsupported":"La VR WebXR n'est pas disponible dans cet environnement, impossible d'entrer en VR. L'écran normal fonctionne comme toujours.","vr.sessionError":"La session VR n'a pas pu démarrer","vr.panelTitle":"Essayage","vr.pageClothes":"Vêtements","vr.pageExtras":"Accessoires et pose","vr.looks":"Tenues","vr.noLooks":"Aucune tenue enregistrée","vr.turnLeft":"Tourner à gauche","vr.turnRight":"Tourner à droite","vr.hint":"Vous pouvez aussi tourner avec le stick","footer.note":"Gratuit, sans publicité, sans compte. Les données restent sur cet appareil ; ce n'est que lorsque vous utilisez les connexions IA ou de génération d'images que l'état actuel (pour les images, le rendu actuel) est envoyé au point de terminaison que vous avez configuré.","principle.note":"Tous les personnages de cette application sont des adultes fictifs générés à partir de paramètres. La génération est conçue pour rester dans la plage adulte, et cette application n'est pas faite pour recréer des personnes réelles."},Sy={"app.title":"3D Fitting Room","app.workingTitle":"Arbeitstitel","app.tagline":"Umziehen, Foto knipsen, herzeigen.","cat.character":"Figur","cat.looks":"Outfits","cat.tops":"Oberteile","cat.outer":"Jacken & Mäntel","cat.bottoms":"Unterteile","cat.shoes":"Schuhe","cat.hat":"Hüte","cat.glasses":"Brillen","cat.accessory":"Accessoires","cat.pose":"Pose","cat.llm":"KI-Verbindung","item.none":"Keine","top.tee":"T-Shirt","top.hoodie":"Hoodie","top.blouse":"Bluse","top.dress":"Kleid","top.dressLong":"Langes Kleid","outer.jacket":"Jacke","outer.coat":"Mantel","outer.cardigan":"Strickjacke","bottom.skirt":"Rock","bottom.skirtLong":"Langer Rock","bottom.pants":"Hose","bottom.shorts":"Shorts","shoe.flats":"Flache Schuhe","shoe.sneakers":"Sneaker","shoe.pumps":"Pumps","shoe.boots":"Stiefel","hat.cap":"Cap","hat.beanie":"Beanie","hat.catears":"Katzenohren","hat.ribbon":"Schleife","glasses.round":"Runde Brille","glasses.square":"Eckige Brille","glasses.sunglasses":"Sonnenbrille","accessory.necklace":"Halskette","accessory.scarf":"Schal","accessory.bag":"Tasche","pose.stand":"Stehen","pose.wave":"Winken","pose.cheer":"Jubeln","pose.peace":"Peace","pose.relax":"Entspannt","ui.skinTone":"Hautton","ui.height":"Größe","ui.body":"Körper","body.shoulderWidth":"Schulterbreite","body.waist":"Taille","body.hip":"Hüfte","body.bust":"Brust","body.build":"Statur","ui.face":"Gesicht","face.eyeSize":"Augengröße","face.eyeSpacing":"Augenabstand","face.eyeHeight":"Augenhöhe","face.eyeShape":"Augenform","face.eyeTilt":"Augenneigung","face.browHeight":"Brauenhöhe","face.browTilt":"Braunenneigung","face.noseWidth":"Nasenbreite","face.noseProminence":"Nasenhöhe","face.lipWidth":"Mundbreite","face.lipFullness":"Lippenfülle","face.faceWidth":"Gesichtsbreite","face.asymmetry":"Asymmetrie","ui.hairStyle":"Frisur","ui.hairColor":"Haarfarbe","ui.eyeColor":"Augenfarbe","hair.bob":"Bob","hair.long":"Lang","hair.short":"Kurz","hair.ponytail":"Pferdeschwanz","hair.bun":"Dutt","ui.seed":"Seed","ui.copy":"Kopieren","ui.seedCopied":"Seed kopiert","ui.seedApply":"Anwenden","ui.seedInvalid":"Dieser Seed konnte nicht gelesen werden","ui.cardLoad":"Von einer Karte wiederherstellen","ui.cardRestored":"Von der Karte wiederhergestellt","ui.cardInvalid":"In diesem Bild wurde kein Seed gefunden","ui.name":"Name","ui.namePlaceholder":"Name (optional)","ui.nameNote":"So heißt diese Figur. Der Name reist mit dem Seed und steht klein auf der Share-Karte als die Person, die das Outfit trägt. Bitte benenne sie nicht nach einer echten Person.","ui.currentLook":"Aktuelles Outfit","ui.lookNamePlaceholder":"Name des Outfits (z. B. Regentag)","ui.saveLook":"Dieses Outfit speichern","ui.lookSaved":"Outfit gespeichert","ui.lookApplied":"Gespeichertes Outfit angezogen","ui.lookNameRequired":"Gib dem Outfit zuerst einen Namen","ui.looksEmpty":"Noch keine gespeicherten Outfits. Benenne die aktuelle Kombination, um sie hier zu behalten.","ui.prevLook":"Vorheriges Outfit","ui.swapLook":"Mit vorherigem Outfit tauschen","ui.swapped":"Mit vorherigem Outfit getauscht","card.wornBy":"Getragen von","card.fictional":"* Diese Figur ist fiktiv.","ui.roster":"Figuren","ui.newPerson":"Neue Figur","ui.unnamed":"Ohne Namen","ui.currentPerson":"Auf der Bühne","ui.switchPerson":"Anzeigen","ui.rename":"Umbenennen","ui.delete":"Löschen","ui.history":"Bearbeitungsverlauf","ui.historyNote":"Der Verlauf bleibt nur auf diesem Gerät. Er ist nie in Karten, Seeds oder exportierten Dateien enthalten.","ui.historyRestored":"Aus dem Verlauf wiederhergestellt","history.create":"Erstellt","history.restore":"Wiederhergestellt","history.blend":"Gemischt","history.rename":"Umbenannt","history.parents":"Gemischt aus","history.mutate":"Variiert","history.source":"Variiert aus","genetics.title":"Zwei Figuren mischen","genetics.note":"Erzeugt aus den Parametern zweier Seeds eine neue Figur. Kleidung und Namen werden nicht übernommen.","genetics.personA":"Seed von Figur A","genetics.personB":"Seed von Figur B","genetics.useCurrent":"Aktuelle Figur","genetics.generate":"Neue Figur erzeugen","genetics.result":"Gemischte Figur","genetics.apply":"Diese Figur verwenden","genetics.cancel":"Verwerfen","genetics.created":"Die gemischte Figur wird gezeigt","mutation.title":"Variationen","mutation.note":"Erzeugt aus dieser Figur vier ähnliche, aber andere Figuren. Die gewählte startet als neue Figur (ohne Namen). Die Kleidung bleibt gleich.","mutation.subtle":"Dezent","mutation.standard":"Standard","mutation.bold":"Mutig","mutation.generate":"Variationen erzeugen","mutation.candidates":"Kandidaten","mutation.apply":"Diese Figur verwenden","mutation.cancel":"Verwerfen","mutation.applied":"Als neue Figur übernommen","mutation.created":"Vier Variationen sind bereit","restore.note":"Diese Figur kam als Vorlage an. Du kannst sie genau so behalten — oder sie zum Ausgangspunkt deiner eigenen Figur machen.","restore.makeMine":"Aus dieser Vorlage meine eigene Figur machen","restore.dismiss":"Diese Figur behalten","ui.dressHidesBottom":"Unterteile werden mit einem Kleid nicht angezeigt","ui.color":"Farbe","ui.savePhoto":"Foto speichern","ui.export3d":"3D-Datei exportieren","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D-Datei exportiert","export.note":"Exportiert Figur und Outfit als 3D-Datei, die andere Tools und Apps nutzen können: eine Referenzfigur in T-Pose mit humanoider Knochenzuordnung. Seed, ein Parameter-JSON und die Nutzungsbedingungen (frei als Material verwendbar) sind in der Datei gespeichert.","ui.random":"Zufällig","ui.spin":"Auto-Drehung","ui.saved":"Foto gespeichert","ui.resetView":"Ansicht zurücksetzen","llm.settingsTitle":"Verbindung (dein eigenes LLM)","llm.endpoint":"Endpoint-URL","llm.apiKey":"API-Schlüssel (optional)","llm.model":"Modellname","llm.save":"Speichern","llm.saved":"Einstellungen gespeichert","llm.test":"Verbindung testen","llm.testing":"Teste…","llm.testOk":"Verbunden","llm.testFail":"Verbindung fehlgeschlagen","llm.note":"Die Einstellungen werden nur auf diesem Gerät gespeichert. Gesendet werden nur deine Anweisung und der aktuelle Zustand von Figur und Outfit — und nur an den von dir eingestellten Endpoint.","llm.chatTitle":"Die KI bitten","llm.chatPlaceholder":"z. B. Ein Kleid anziehen und die Haare blond färben","llm.send":"Senden","llm.thinking":"Denkt nach…","llm.notConfigured":"Speichere zuerst die Verbindungseinstellungen","llm.modelMissing":"Gib einen Modellnamen ein","llm.invalidEndpoint":"Prüfe die Endpoint-URL","llm.applied":"Ausgeführt","llm.rejected":"Abgelehnt","llm.error":"Fehler","llm.you":"Du","llm.ai":"KI","sd.settingsTitle":"Bildgenerierung (dein eigenes SD)","sd.endpoint":"SD-Endpoint-URL","sd.auth":"Authentifizierung (optional)","sd.note":"Die Einstellungen werden nur auf diesem Gerät gespeichert. Die Generierung läuft auf dem von dir konfigurierten SD-Server — Modell und Rechenleistung sind deine. „Aus aktuellem Look“ sendet das aktuelle 3D-Rendering als Eingabebild an diesen Endpoint. Generierte Bilder sind deine Inhalte und bleiben nur auf diesem Gerät.","sd.promptTitle":"Automatisch gebauter Prompt","sd.extraLabel":"Zusätzliche Worte (optional)","sd.extraPlaceholder":"z. B. Aquarell-Stil, Abendlicht","sd.fromPhoto":"Aus aktuellem Look","sd.fromText":"Nur aus Text","sd.generating":"Generiere… (der Server braucht einen Moment)","sd.notConfigured":"Speichere zuerst die SD-Einstellungen","sd.resultTitle":"Generiertes Bild","sd.download":"Bild speichern","sd.toCard":"Mit diesem Bild eine Karte machen","sd.cardSaved":"Karte gespeichert","vr.enter":"VR betreten","vr.exit":"VR beenden","vr.unsupported":"WebXR-VR ist in dieser Umgebung nicht verfügbar, daher kann VR nicht betreten werden. Der normale Bildschirm funktioniert wie immer.","vr.sessionError":"Die VR-Sitzung konnte nicht gestartet werden","vr.panelTitle":"Anprobe","vr.pageClothes":"Kleidung","vr.pageExtras":"Extras & Pose","vr.looks":"Outfits","vr.noLooks":"Noch keine gespeicherten Outfits","vr.turnLeft":"Nach links drehen","vr.turnRight":"Nach rechts drehen","vr.hint":"Mit dem Stick kannst du dich auch drehen","footer.note":"Kostenlos, ohne Werbung, ohne Konto. Daten bleiben auf diesem Gerät; nur wenn du die KI- oder Bildgenerierungs-Verbindung nutzt, wird der aktuelle Zustand (bei Bildern das aktuelle Rendering) an den von dir eingestellten Endpoint gesendet.","principle.note":"Alle Figuren in dieser App sind fiktive Erwachsene, die aus Parametern erzeugt werden. Die Erzeugung ist so ausgelegt, dass sie im Erwachsenenbereich bleibt, und diese App ist nicht dafür gemacht, echte Personen nachzubilden."},My={"app.title":"3D Fitting Room","app.workingTitle":"título provisório","app.tagline":"Troque o look, tire a foto e mostre.","cat.character":"Personagem","cat.looks":"Looks","cat.tops":"Partes de cima","cat.outer":"Casacos","cat.bottoms":"Partes de baixo","cat.shoes":"Sapatos","cat.hat":"Chapéus","cat.glasses":"Óculos","cat.accessory":"Acessórios","cat.pose":"Pose","cat.llm":"Conexão IA","item.none":"Nenhum","top.tee":"Camiseta","top.hoodie":"Moletom","top.blouse":"Blusa","top.dress":"Vestido","top.dressLong":"Vestido longo","outer.jacket":"Jaqueta","outer.coat":"Casaco","outer.cardigan":"Cardigã","bottom.skirt":"Saia","bottom.skirtLong":"Saia longa","bottom.pants":"Calça","bottom.shorts":"Shorts","shoe.flats":"Sapatilha","shoe.sneakers":"Tênis","shoe.pumps":"Scarpin","shoe.boots":"Botas","hat.cap":"Boné","hat.beanie":"Gorro","hat.catears":"Orelhas de gato","hat.ribbon":"Laço","glasses.round":"Óculos redondos","glasses.square":"Óculos quadrados","glasses.sunglasses":"Óculos de sol","accessory.necklace":"Colar","accessory.scarf":"Cachecol","accessory.bag":"Bolsa","pose.stand":"Em pé","pose.wave":"Acenar","pose.cheer":"Comemorar","pose.peace":"Paz","pose.relax":"Relax","ui.skinTone":"Tom de pele","ui.height":"Altura","ui.body":"Corpo","body.shoulderWidth":"Largura dos ombros","body.waist":"Cintura","body.hip":"Quadris","body.bust":"Busto","body.build":"Estrutura","ui.face":"Rosto","face.eyeSize":"Tamanho dos olhos","face.eyeSpacing":"Distância dos olhos","face.eyeHeight":"Altura dos olhos","face.eyeShape":"Formato dos olhos","face.eyeTilt":"Inclinação dos olhos","face.browHeight":"Altura das sobrancelhas","face.browTilt":"Inclinação das sobrancelhas","face.noseWidth":"Largura do nariz","face.noseProminence":"Altura do nariz","face.lipWidth":"Largura da boca","face.lipFullness":"Espessura dos lábios","face.faceWidth":"Largura do rosto","face.asymmetry":"Assimetria","ui.hairStyle":"Penteado","ui.hairColor":"Cor do cabelo","ui.eyeColor":"Cor dos olhos","hair.bob":"Chanel","hair.long":"Longo","hair.short":"Curto","hair.ponytail":"Rabo de cavalo","hair.bun":"Coque","ui.seed":"Semente","ui.copy":"Copiar","ui.seedCopied":"Semente copiada","ui.seedApply":"Aplicar","ui.seedInvalid":"Não foi possível ler essa semente","ui.cardLoad":"Restaurar de um cartão","ui.cardRestored":"Restaurado do cartão","ui.cardInvalid":"Nenhuma semente encontrada nessa imagem","ui.name":"Nome","ui.namePlaceholder":"Nome (opcional)","ui.nameNote":"O nome deste personagem. Ele viaja com a semente e aparece pequeno no cartão como quem veste o look. Não use o nome de uma pessoa real.","ui.currentLook":"Look atual","ui.lookNamePlaceholder":"Nome do look (ex.: Dia de chuva)","ui.saveLook":"Salvar este look","ui.lookSaved":"Look salvo","ui.lookApplied":"Look salvo aplicado","ui.lookNameRequired":"Dê um nome ao look primeiro","ui.looksEmpty":"Nenhum look salvo ainda. Dê um nome à combinação atual para guardá-la aqui.","ui.prevLook":"Look anterior","ui.swapLook":"Trocar com o look anterior","ui.swapped":"Trocado com o look anterior","card.wornBy":"Usado por","card.fictional":"* Este personagem é fictício.","ui.roster":"Personagens","ui.newPerson":"Novo personagem","ui.unnamed":"Sem nome","ui.currentPerson":"No palco","ui.switchPerson":"Chamar","ui.rename":"Renomear","ui.delete":"Excluir","ui.history":"Histórico de edição","ui.historyNote":"O histórico fica apenas neste dispositivo. Nunca é incluído em cartões, sementes ou arquivos exportados.","ui.historyRestored":"Restaurado do histórico","history.create":"Criado","history.restore":"Restaurado","history.blend":"Combinado","history.rename":"Renomeado","history.parents":"Combinado de","history.mutate":"Variado","history.source":"Variado de","genetics.title":"Combinar dois personagens","genetics.note":"Sintetiza um novo personagem a partir dos parâmetros de duas sementes. Roupas e nomes não são herdados.","genetics.personA":"Semente do personagem A","genetics.personB":"Semente do personagem B","genetics.useCurrent":"Personagem atual","genetics.generate":"Criar um novo personagem","genetics.result":"Personagem combinado","genetics.apply":"Usar este personagem","genetics.cancel":"Descartar","genetics.created":"Mostrando o personagem combinado","mutation.title":"Variações","mutation.note":"Gera quatro pessoas parecidas, mas diferentes, a partir desta. Quem você escolher começa como um personagem novo (sem nome). As roupas não mudam.","mutation.subtle":"Sutil","mutation.standard":"Padrão","mutation.bold":"Ousado","mutation.generate":"Criar variações","mutation.candidates":"Candidatos","mutation.apply":"Usar este personagem","mutation.cancel":"Descartar","mutation.applied":"Adotado como novo personagem","mutation.created":"Quatro variações prontas","restore.note":"Este personagem chegou como um modelo. Você pode mantê-lo exatamente como está — ou torná-lo o ponto de partida do seu próprio personagem.","restore.makeMine":"Criar meu personagem a partir deste modelo","restore.dismiss":"Manter este personagem","ui.dressHidesBottom":"As partes de baixo não aparecem com vestido","ui.color":"Cor","ui.savePhoto":"Salvar foto","ui.export3d":"Exportar arquivo 3D","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"Arquivo 3D exportado","export.note":"Exporta o personagem e o look como um arquivo 3D que outras ferramentas e apps podem usar: uma figura de referência em pose T com mapeamento de ossos humanoide. A semente, um JSON de parâmetros e os termos de uso (livre como material) ficam registrados dentro do arquivo.","ui.random":"Aleatório","ui.spin":"Giro automático","ui.saved":"Foto salva","ui.resetView":"Redefinir vista","llm.settingsTitle":"Conexão (seu próprio LLM)","llm.endpoint":"URL do endpoint","llm.apiKey":"Chave de API (opcional)","llm.model":"Nome do modelo","llm.save":"Salvar","llm.saved":"Configurações salvas","llm.test":"Testar conexão","llm.testing":"Testando…","llm.testOk":"Conectado","llm.testFail":"Não foi possível conectar","llm.note":"As configurações ficam apenas neste dispositivo. Só são enviados a sua instrução e o estado atual do personagem e do look, e apenas para o endpoint que você configurou.","llm.chatTitle":"Peça à IA","llm.chatPlaceholder":"ex.: Coloque um vestido e deixe o cabelo loiro","llm.send":"Enviar","llm.thinking":"Pensando…","llm.notConfigured":"Salve primeiro as configurações de conexão","llm.modelMissing":"Digite um nome de modelo","llm.invalidEndpoint":"Verifique a URL do endpoint","llm.applied":"Aplicado","llm.rejected":"Rejeitado","llm.error":"Erro","llm.you":"Você","llm.ai":"IA","sd.settingsTitle":"Geração de imagens (seu próprio SD)","sd.endpoint":"URL do endpoint SD","sd.auth":"Autenticação (opcional)","sd.note":"As configurações ficam apenas neste dispositivo. A geração roda no servidor SD que você configurou — o modelo e o processamento são seus. “Do look atual” envia a renderização 3D atual para esse endpoint como imagem de entrada. As imagens geradas são seu conteúdo e ficam apenas neste dispositivo.","sd.promptTitle":"Prompt montado automaticamente","sd.extraLabel":"Palavras extras (opcional)","sd.extraPlaceholder":"ex.: estilo aquarela, luz do pôr do sol","sd.fromPhoto":"Do look atual","sd.fromText":"Só do texto","sd.generating":"Gerando… (o servidor leva um tempo)","sd.notConfigured":"Salve primeiro as configurações do SD","sd.resultTitle":"Imagem gerada","sd.download":"Salvar imagem","sd.toCard":"Fazer um cartão com esta imagem","sd.cardSaved":"Cartão salvo","vr.enter":"Entrar em VR","vr.exit":"Sair da VR","vr.unsupported":"A VR WebXR não está disponível neste ambiente, então não é possível entrar em VR. A tela normal funciona como sempre.","vr.sessionError":"Não foi possível iniciar a sessão VR","vr.panelTitle":"Provador","vr.pageClothes":"Roupas","vr.pageExtras":"Acessórios e pose","vr.looks":"Looks","vr.noLooks":"Nenhum look salvo ainda","vr.turnLeft":"Virar à esquerda","vr.turnRight":"Virar à direita","vr.hint":"Você também pode virar com o analógico","footer.note":"Grátis, sem anúncios, sem contas. Os dados ficam neste dispositivo; só quando você usa as conexões de IA ou de geração de imagens é que o estado atual (no caso das imagens, a renderização atual) é enviado ao endpoint que você configurou.","principle.note":"Todos os personagens deste app são adultos fictícios gerados a partir de parâmetros. A geração foi projetada para ficar dentro da faixa adulta, e este app não foi feito para recriar pessoas reais."},by={"app.title":"3D Fitting Room","app.workingTitle":"가제","app.tagline":"갈아입히고, 찍고, 자랑하세요.","cat.character":"인물","cat.looks":"코디","cat.tops":"상의","cat.outer":"아우터","cat.bottoms":"하의","cat.shoes":"신발","cat.hat":"모자","cat.glasses":"안경","cat.accessory":"액세서리","cat.pose":"포즈","cat.llm":"AI 연결","item.none":"없음","top.tee":"티셔츠","top.hoodie":"후드티","top.blouse":"블라우스","top.dress":"원피스","top.dressLong":"롱 원피스","outer.jacket":"재킷","outer.coat":"코트","outer.cardigan":"가디건","bottom.skirt":"스커트","bottom.skirtLong":"롱 스커트","bottom.pants":"바지","bottom.shorts":"반바지","shoe.flats":"플랫슈즈","shoe.sneakers":"스니커즈","shoe.pumps":"펌프스","shoe.boots":"부츠","hat.cap":"캡","hat.beanie":"비니","hat.catears":"고양이 귀","hat.ribbon":"리본","glasses.round":"동그란 안경","glasses.square":"네모난 안경","glasses.sunglasses":"선글라스","accessory.necklace":"목걸이","accessory.scarf":"목도리","accessory.bag":"가방","pose.stand":"서기","pose.wave":"손 흔들기","pose.cheer":"만세","pose.peace":"피스","pose.relax":"릴랙스","ui.skinTone":"피부톤","ui.height":"키","ui.body":"체형","body.shoulderWidth":"어깨너비","body.waist":"허리","body.hip":"엉덩이","body.bust":"가슴","body.build":"체격","ui.face":"얼굴","face.eyeSize":"눈 크기","face.eyeSpacing":"눈 간격","face.eyeHeight":"눈 높이","face.eyeShape":"눈 모양","face.eyeTilt":"눈 기울기","face.browHeight":"눈썹 높이","face.browTilt":"눈썹 기울기","face.noseWidth":"코 너비","face.noseProminence":"코 높이","face.lipWidth":"입 너비","face.lipFullness":"입술 두께","face.faceWidth":"얼굴 너비","face.asymmetry":"좌우 차이","ui.hairStyle":"헤어스타일","ui.hairColor":"머리 색","ui.eyeColor":"눈 색","hair.bob":"보브","hair.long":"롱","hair.short":"쇼트","hair.ponytail":"포니테일","hair.bun":"올림머리","ui.seed":"시드","ui.copy":"복사","ui.seedCopied":"시드를 복사했습니다","ui.seedApply":"적용","ui.seedInvalid":"그 시드를 읽을 수 없었습니다","ui.cardLoad":"카드 이미지에서 복원","ui.cardRestored":"카드에서 복원했습니다","ui.cardInvalid":"그 이미지에서 시드를 읽을 수 없었습니다","ui.name":"이름","ui.namePlaceholder":"이름(선택)","ui.nameNote":"이 인물의 이름입니다. 이름은 시드와 함께 이동하며, 공유 카드에 착용자로 작게 표시됩니다. 실제 인물의 이름은 붙이지 마세요.","ui.currentLook":"현재 코디","ui.lookNamePlaceholder":"코디 이름(예: 비 오는 날)","ui.saveLook":"이 코디 저장","ui.lookSaved":"코디를 저장했습니다","ui.lookApplied":"저장한 코디로 갈아입었습니다","ui.lookNameRequired":"먼저 코디 이름을 입력하세요","ui.looksEmpty":"아직 저장한 코디가 없습니다. 지금 조합에 이름을 붙이면 여기에 남길 수 있습니다.","ui.prevLook":"이전 코디","ui.swapLook":"이전 코디와 바꾸기","ui.swapped":"이전 코디와 바꿨습니다","card.wornBy":"착용","card.fictional":"※이 인물은 가상의 캐릭터입니다","ui.roster":"인물 목록","ui.newPerson":"새 인물","ui.unnamed":"이름 없음","ui.currentPerson":"표시 중","ui.switchPerson":"불러오기","ui.rename":"이름 변경","ui.delete":"삭제","ui.history":"편집 기록","ui.historyNote":"기록은 이 기기에만 남습니다. 카드, 시드, 내보낸 파일에는 절대 포함되지 않습니다.","ui.historyRestored":"기록에서 복원했습니다","history.create":"생성","history.restore":"복원","history.blend":"합성","history.rename":"이름 변경","history.parents":"합성 원본","history.mutate":"변이","history.source":"변이 원본","genetics.title":"두 인물 합성","genetics.note":"두 시드의 파라미터로 새 인물을 합성합니다. 옷과 이름은 이어지지 않습니다.","genetics.personA":"인물 A의 시드","genetics.personB":"인물 B의 시드","genetics.useCurrent":"현재 인물","genetics.generate":"새 인물 생성","genetics.result":"합성한 인물","genetics.apply":"이 인물로 하기","genetics.cancel":"취소","genetics.created":"합성한 인물을 표시하고 있습니다","mutation.title":"베리에이션","mutation.note":"이 인물을 바탕으로 가깝지만 다른 인물 4명을 만듭니다. 선택한 인물은 새 인물로 시작합니다(이름은 붙지 않습니다). 옷은 바뀌지 않습니다.","mutation.subtle":"은은하게","mutation.standard":"표준","mutation.bold":"대담하게","mutation.generate":"베리에이션 만들기","mutation.candidates":"후보 인물","mutation.apply":"이 인물로 하기","mutation.cancel":"취소","mutation.applied":"새 인물로 채택했습니다","mutation.created":"후보 4명을 만들었습니다","restore.note":"이 인물은 형(型)으로 받은 것입니다. 그대로 사용해도 되고, 여기서부터 나만의 인물을 만드는 출발점으로 삼을 수도 있습니다.","restore.makeMine":"이 형으로 내 인물 만들기","restore.dismiss":"이 인물 그대로 쓰기","ui.dressHidesBottom":"원피스를 입으면 하의는 표시되지 않습니다","ui.color":"색","ui.savePhoto":"사진 저장","ui.export3d":"3D 파일 내보내기","ui.exportGlb":"glTF (.glb)","ui.exportVrm":"VRM (.vrm)","ui.exported":"3D 파일을 내보냈습니다","export.note":"인물과 코디를 다른 도구와 앱에서 쓸 수 있는 3D 파일로 내보냅니다. 휴머노이드 뼈 매핑이 있는 T포즈 기준 모델입니다. 시드와 파라미터 JSON, 이용 조건(소재로 자유롭게 사용 가능)이 파일 안에 기록됩니다.","ui.random":"랜덤","ui.spin":"자동 회전","ui.saved":"사진을 저장했습니다","ui.resetView":"시점 초기화","llm.settingsTitle":"연결 설정(내 LLM)","llm.endpoint":"엔드포인트 URL","llm.apiKey":"API 키(선택)","llm.model":"모델 이름","llm.save":"저장","llm.saved":"설정을 저장했습니다","llm.test":"연결 테스트","llm.testing":"연결 중…","llm.testOk":"연결됐습니다","llm.testFail":"연결할 수 없었습니다","llm.note":"설정은 이 기기에만 저장됩니다. 전송되는 것은 지시문과 현재 인물·코디 상태뿐이며, 설정한 엔드포인트로만 전송됩니다.","llm.chatTitle":"AI에게 부탁하기","llm.chatPlaceholder":"예: 원피스로 갈아입히고 머리를 금발로 해줘","llm.send":"전송","llm.thinking":"생각 중…","llm.notConfigured":"먼저 연결 설정을 저장하세요","llm.modelMissing":"모델 이름을 입력하세요","llm.invalidEndpoint":"엔드포인트 URL을 확인하세요","llm.applied":"실행됨","llm.rejected":"거부됨","llm.error":"오류","llm.you":"나","llm.ai":"AI","sd.settingsTitle":"이미지 생성 연결 설정(내 SD)","sd.endpoint":"SD 엔드포인트 URL","sd.auth":"인증 정보(선택)","sd.note":'설정은 이 기기에만 저장됩니다. 생성은 설정한 SD 서버에서 이루어집니다(모델도 연산도 당신의 환경입니다). "지금 모습에서 생성"은 현재 3D 렌더링을 입력 이미지로 해당 엔드포인트에 보냅니다. 생성된 이미지는 당신의 콘텐츠이며 이 기기에만 저장됩니다.',"sd.promptTitle":"자동으로 조립되는 프롬프트","sd.extraLabel":"추가 문구(선택)","sd.extraPlaceholder":"예: 수채화 일러스트풍, 노을빛","sd.fromPhoto":"지금 모습에서 생성","sd.fromText":"문장만으로 생성","sd.generating":"생성 중…(서버 연산에 시간이 걸립니다)","sd.notConfigured":"먼저 SD 연결 설정을 저장하세요","sd.resultTitle":"생성한 이미지","sd.download":"이미지 저장","sd.toCard":"이 그림으로 카드 만들기","sd.cardSaved":"카드를 저장했습니다","vr.enter":"VR로 들어가기","vr.exit":"VR 종료","vr.unsupported":"이 환경에서는 WebXR(VR)을 지원하지 않아 VR에 들어갈 수 없습니다. 일반 화면에서는 평소처럼 놀 수 있습니다.","vr.sessionError":"VR 세션을 시작할 수 없었습니다","vr.panelTitle":"갈아입히기","vr.pageClothes":"옷","vr.pageExtras":"소품·포즈","vr.looks":"코디","vr.noLooks":"아직 저장한 코디가 없습니다","vr.turnLeft":"왼쪽 보기","vr.turnRight":"오른쪽 보기","vr.hint":"스틱을 좌우로 기울여도 돌아갈 수 있습니다","footer.note":"무료, 광고 없음, 계정 없음. 데이터는 이 기기 안에만 있습니다. AI 연결이나 이미지 생성을 사용할 때만 현재 상태(이미지 생성의 경우 현재 렌더링)가 설정한 엔드포인트로 전송됩니다.","principle.note":"이 앱의 인물은 모두 파라미터로 만들어지는 가상의 성인 캐릭터입니다. 생성은 성인 범위로 제한되도록 설계되어 있으며, 실제 인물을 재현하기 위한 앱이 아닙니다."},Ey={ja:gy,en:_y,es:vy,zh:yy,fr:xy,de:Sy,pt:My,ko:by};let nc="ja";function ah(i){nc=i}function Si(){return nc}function D(i){return Ey[nc][i]}function wy(i){if(i!==null&&Pl.includes(i))return i;const e=navigator.language.toLowerCase().split("-")[0];return Pl.includes(e)?e:"en"}function lh(){return[{id:"tops",page:0,labelKey:"cat.tops",field:"topStyle",itemPrefix:"top",items:Li,colorField:"topColor",colors:Pi},{id:"outer",page:0,labelKey:"cat.outer",field:"outerStyle",itemPrefix:"outer",items:cs,colorField:"outerColor",colors:os},{id:"bottoms",page:0,labelKey:"cat.bottoms",field:"bottomStyle",itemPrefix:"bottom",items:as,colorField:"bottomColor",colors:ss},{id:"shoes",page:0,labelKey:"cat.shoes",field:"shoeStyle",itemPrefix:"shoe",items:ls,colorField:"shoeColor",colors:rs},{id:"hat",page:1,labelKey:"cat.hat",field:"hat",itemPrefix:"hat",items:Di},{id:"glasses",page:1,labelKey:"cat.glasses",field:"glasses",itemPrefix:"glasses",items:Ii},{id:"accessory",page:1,labelKey:"cat.accessory",field:"accessory",itemPrefix:"accessory",items:Ui},{id:"pose",page:1,labelKey:"cat.pose",field:"pose",itemPrefix:"pose",items:Ni}]}function Ty(i,e){return e==="none"?"item.none":`${i.itemPrefix}.${e}`}function mi(i){switch(i.type){case"field":return`f:${i.field}:${i.value}`;case"color":return`c:${i.field}:${i.value}`;case"look":return`look:${i.id}`;case"photo":return"photo";case"turn":return`turn:${i.dir}`;case"page":return`page:${i.page}`}}const Ay=new Set(["topStyle","outerStyle","bottomStyle","shoeStyle","hat","glasses","accessory","pose"]),Ry=new Set(["topColor","outerColor","bottomColor","shoeColor"]);function Cy(i){if(i==="photo")return{type:"photo"};if(i.startsWith("look:")){const t=i.slice(5);return t?{type:"look",id:t}:null}if(i==="turn:1")return{type:"turn",dir:1};if(i==="turn:-1")return{type:"turn",dir:-1};if(i==="page:0")return{type:"page",page:0};if(i==="page:1")return{type:"page",page:1};const e=i.split(":");return e.length===3&&e[0]==="f"&&Ay.has(e[1])?{type:"field",field:e[1],value:e[2]}:e.length===3&&e[0]==="c"&&Ry.has(e[1])?{type:"color",field:e[1],value:e[2]}:null}function Py(i,e){if(i.type==="field"){const t=e.find(n=>n.field===i.field);return!t||!t.items.includes(i.value)?null:{[i.field]:i.value}}if(i.type==="color"){const t=e.find(n=>n.colorField===i.field);return!t||!t.colors||!t.colors.includes(i.value)?null:{[i.field]:i.value}}return null}const Ly=Math.PI/4;function Dy(i,e,t={x:0,z:0}){const n=e*Ly,s=Math.cos(n),r=Math.sin(n),o=i.x-t.x,a=i.z-t.z;return{x:t.x+o*s+a*r,z:t.z-o*r+a*s,yaw:i.yaw+n}}const Ll=[{mirrorPx:512,foveation:.5,shadows:!0},{mirrorPx:256,foveation:.5,shadows:!0},{mirrorPx:null,foveation:.65,shadows:!0},{mirrorPx:null,foveation:.85,shadows:!1}],ch=1e3/72,Iy=ch*.62;function Uy(i,e){const t=Math.min(Math.max(i,0),Ll.length-1);return e>ch?Math.min(t+1,Ll.length-1):e<Iy?Math.max(t-1,0):t}const Ny=new L(-1.62,1.34,-.5),Oy=new L(0,1.3,2.2),bo=1.06,co=1.85,Fy=6,un=bo-.12,Gn=.105,uo=.02,Rs=.052,ho=.062,fr=.022;function Fu(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const Do='"Hiragino Sans", "Noto Sans JP", "Noto Sans SC", "Noto Sans KR", "Malgun Gothic", "Microsoft YaHei", sans-serif';function ky(i,e,t){const n=t?1024:512,s=128,r=document.createElement("canvas");r.width=n,r.height=s;const o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");o.fillStyle=e?"#b08d57":"#38302a",Fu(o,3,3,n-6,s-6,26),o.fill(),o.strokeStyle=e?"#e8cf9f":"#6d5c44",o.lineWidth=3,Fu(o,3,3,n-6,s-6,26),o.stroke(),o.fillStyle=e?"#221a12":"#f2e9da",o.textAlign="center",o.textBaseline="middle";let a=52;const l=u=>`600 ${u}px ${Do}`;for(o.font=l(a);a>22&&o.measureText(i).width>n-44;)a-=4,o.font=l(a);o.fillText(i,n/2,s/2+2);const c=new Go(r);return c.colorSpace=Ot,c.anisotropy=4,c}function By(i){const n=document.createElement("canvas");n.width=1024,n.height=56;const s=n.getContext("2d");if(!s)throw new Error("2d context unavailable");s.fillStyle="#e9dfc9",s.textAlign="left",s.textBaseline="middle";let r=38;const o=l=>`600 ${l}px ${Do}`;for(s.font=o(r);r>20&&s.measureText(i).width>1008;)r-=3,s.font=o(r);s.fillText(i,4,56/2+1);const a=new Go(n);return a.colorSpace=Ot,a.anisotropy=4,a}function zy(i,e,t){const n=[];let s="";for(const a of e)a===" "?(s&&n.push(s),s="",n.push(" ")):/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(a)?(s&&n.push(s),s="",n.push(a)):s+=a;s&&n.push(s);const r=[];let o="";for(const a of n){if(a===" "&&o==="")continue;const l=o+a;i.measureText(l).width<=t||o===""?o=l:(r.push(o.trimEnd()),o=a===" "?"":a)}return o.trim()!==""&&r.push(o.trimEnd()),r}function Hy(i){const r=document.createElement("canvas"),o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");o.font=`500 30px ${Do}`;const a=zy(o,i,992),l=a.length*44+16;r.width=1024,r.height=l,o.font=`500 30px ${Do}`,o.fillStyle="#cfc2a8",o.textAlign="left",o.textBaseline="top",a.forEach((u,d)=>{o.fillText(u,16,16/2+d*44)});const c=new Go(r);return c.colorSpace=Ot,c.anisotropy=4,{tex:c,aspect:l/1024}}class Vy{constructor(){Fi(this,"group",new qe);Fi(this,"content",new qe);Fi(this,"hitMeshes",[]);Fi(this,"hovered",null);Fi(this,"categories",lh());Fi(this,"noteText",null);this.group.position.copy(Ny),this.group.lookAt(Oy);const e=new ke(new $e(bo,co,.035),new nt({color:"#2c241d",roughness:.6,envMapIntensity:.4}));e.position.z=-.02,this.group.add(e);const t=new nt({color:"#b08d57",roughness:.3,metalness:1,envMapIntensity:1.2}),n=new $e(bo+.03,.028,.045),s=new $e(.028,co+.03,.045);for(const r of[-1,1]){const o=new ke(n,t);o.position.set(0,r*(co/2+.008),-.02),this.group.add(o)}for(const r of[-1,1]){const o=new ke(s,t);o.position.set(r*(bo/2+.008),0,-.02),this.group.add(o)}this.group.add(this.content)}get targets(){return this.hitMeshes}addButton(e,t,n,s,r,o,a){const l=ky(e,t,o>.4),c=new Qn({map:l}),u=new ke(new Ft(o,a),c);u.position.set(s,r,.012),u.userData.actionId=n,u.userData.baseScale=1,this.content.add(u),this.hitMeshes.push(u)}addLabel(e,t,n,s){const r=By(e),o=new Qn({map:r,transparent:!0}),a=new ke(new Ft(s,Rs),o);a.position.set(t,n,.01),this.content.add(a)}addNote(e,t,n){const{tex:s,aspect:r}=Hy(e),o=n*r,a=new Qn({map:s,transparent:!0}),l=new ke(new Ft(n,o),a);return l.position.set(0,t-o/2,.01),this.content.add(l),o}addSwatch(e,t,n,s,r,o){if(t){const c=new ke(new Ft(o+.014,ho+.014),new Qn({color:"#e8cf9f"}));c.position.set(s,r,.011),this.content.add(c)}const a=new nt({color:e,roughness:.55,envMapIntensity:.5}),l=new ke(new Ft(o,ho),a);l.position.set(s,r,.012),l.userData.actionId=n,l.userData.baseScale=1,this.content.add(l),this.hitMeshes.push(l)}refresh(e){for(const l of[...this.content.children])this.content.remove(l),l.traverse(c=>{var f;const u=c;u.geometry&&u.geometry.dispose();const d=u.material;d&&((f=d.map)==null||f.dispose(),d.dispose())});this.hitMeshes=[],this.hovered=null,this.noteText=null;const{outfit:t,page:n}=e;let s=co/2-.075;this.addLabel(D("vr.panelTitle"),-un/2+.47,s,.94),s-=.075;const r=(un-uo)/2;[{page:0,key:"vr.pageClothes"},{page:1,key:"vr.pageExtras"}].forEach((l,c)=>{const u=-un/2+r/2+c*(r+uo);this.addButton(D(l.key),n===l.page,mi({type:"page",page:l.page}),u,s,r,.085)}),s-=.085/2+fr+.03;const a=(l,c)=>{const u=l.length,d=(un-(u-1)*uo)/u;l.forEach((f,h)=>{const g=-un/2+d/2+h*(d+uo);this.addButton(f.label,f.selected,f.actionId,g,c,d,Gn)})};for(const l of this.categories)if(l.page===n){if(s-=Rs/2,this.addLabel(D(l.labelKey),-un/2+.47,s,.94),s-=Rs/2+.012+Gn/2,a(l.items.map(c=>({label:D(Ty(l,c)),selected:t[l.field]===c,actionId:mi({type:"field",field:l.field,value:c})})),s),s-=Gn/2,l.colors&&l.colorField){const c=l.colorField;s-=.012+ho/2;const u=l.colors.length,d=(un-(u-1)*.012)/u;l.colors.forEach((f,h)=>{const g=-un/2+d/2+h*(d+.012);this.addSwatch(f,t[c]===f,mi({type:"color",field:c,value:f}),g,s,d)}),s-=ho/2}s-=fr+.012}if(n===0){s-=Rs/2,this.addLabel(D("vr.looks"),-un/2+.47,s,.94),s-=Rs/2+.012;const l=e.looks.slice(0,Fy);if(l.length===0)s-=.03,this.addLabel(D("vr.noLooks"),-un/2+.47,s,.94),s-=.03;else for(let c=0;c<l.length;c+=2)s-=Gn/2,a(l.slice(c,c+2).map(u=>({label:u.name,selected:!1,actionId:mi({type:"look",id:u.id})})),s),s-=Gn/2+fr}else{s-=.01+Gn/2,a([{label:D("ui.savePhoto"),selected:!1,actionId:mi({type:"photo"})}],s),s-=Gn/2+fr+Gn/2,a([{label:D("vr.turnLeft"),selected:!1,actionId:mi({type:"turn",dir:-1})},{label:D("vr.turnRight"),selected:!1,actionId:mi({type:"turn",dir:1})}],s),s-=Gn/2+fr+.03,this.addLabel(D("vr.hint"),-un/2+.47,s,.94);const l=D("principle.note");s-=Rs/2+.035,this.addNote(l,s,un),this.noteText=l}}setHovered(e){if(this.hovered!==e){if(this.hovered){const t=this.hovered;t.scale.setScalar(t.userData.baseScale??1);const n=t.material;n&&"color"in n&&n.color.setRGB(1,1,1)}if(this.hovered=e,this.hovered){const t=this.hovered;t.scale.setScalar(1.06);const n=t.material;n&&"color"in n&&n.color.setRGB(1.3,1.18,.95)}}}}const Gy=300,Wy=.35,Xy=.7;function qy(i,e){const t=new Vy;i.scene.add(t.group);const n=lh();let s=0,r=null;const o=new Pv,a=new L,l=new L,c=new ut;function u(){t.refresh({outfit:e.getOutfit(),looks:e.getLooks(),page:s})}function d(S){switch(r=S,S.type){case"field":case"color":{const v=Py(S,n);v&&e.applyPatch(v);break}case"look":e.applyLook(S.id);break;case"photo":e.takePhoto();break;case"turn":{const v=i.player,A=Dy({x:v.position.x,z:v.position.z,yaw:v.rotation.y},S.dir);v.position.x=A.x,v.position.z=A.z,v.rotation.y=A.yaw;break}case"page":s=S.page;break}u()}function f(S){const v=Cy(S);return v?(d(v),!0):!1}function h(S){c.identity().extractRotation(S.matrixWorld),a.setFromMatrixPosition(S.matrixWorld),l.set(0,0,-1).applyMatrix4(c),o.set(a,l);const v=o.intersectObjects(t.targets,!1);return v.length===0?null:{target:v[0].object,point:v[0].point}}const g=[],x=[];for(let S=0;S<2;S++){const v=i.renderer.xr.getController(S),A=new Bt().setFromPoints([new L(0,0,0),new L(0,0,-5)]),w=new dv(A,new Wd({color:15257503,transparent:!0,opacity:.55}));w.name="vr-ray",v.add(w),v.addEventListener("select",()=>{const C=h(v);if(C){const _=C.target.userData.actionId;_&&f(_)}}),i.player.add(v),g.push(v);const T=new ke(new ot(.012,10,8),new Qn({color:15257503}));T.visible=!1,i.scene.add(T),x.push(T)}const m=new Map;function p(S){const v=i.renderer.xr.getSession();if(v)for(const A of v.inputSources){const w=A.gamepad;if(!w||w.axes.length<2)continue;const T=w.axes.length>=4?w.axes[2]:w.axes[0],C=`${A.handedness}`;let _=m.get(C);if(_||(_={armed:!0,lastAt:0},m.set(C,_)),Math.abs(T)<Wy){_.armed=!0;continue}_.armed&&Math.abs(T)>Xy&&S-_.lastAt>Gy&&(_.armed=!1,_.lastAt=S,d({type:"turn",dir:T>0?1:-1}))}}function b(){if(!i.renderer.xr.isPresenting){t.setHovered(null);for(const v of x)v.visible=!1;return}let S=null;g.forEach((v,A)=>{const w=h(v),T=x[A];w?(T.visible=!0,T.position.copy(w.point),S||(S=w.target)):T.visible=!1}),t.setHovered(S),p(performance.now())}return u(),{panel:t,press:f,refreshPanel:u,update:b,get lastAction(){return r}}}const ku={x:0,z:1.9},Oa=1024;function Et(i,e,t=0,n=0,s=0){const r=new ke(i,e);return r.position.set(t,n,s),r}function Cs(i,e,t){e.updateMatrixWorld(!0);const n=new ut().copy(e.matrixWorld).invert(),s=i.map(o=>{const a=o.geometry.clone();return a.applyMatrix4(new ut().multiplyMatrices(n,o.matrixWorld)),a}),r=Jd(s,!1);for(const o of s)o.dispose();return new ke(r,t)}function Yy(i){const e=new uv({canvas:i,antialias:!0,preserveDrawingBuffer:!0});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.shadowMap.enabled=!0,e.shadowMap.type=ud,e.outputColorSpace=Ot,e.toneMapping=hd,e.toneMappingExposure=1.1,e.xr.enabled=!0,e.xr.setReferenceSpaceType("local-floor");const t=new Gd;t.background=new tt("#241f1c");const n=new Ml(e);t.environment=n.fromScene(new fy,.04).texture,t.environmentIntensity=.45;let s=1.74;const r=()=>new L(0,s*.76,3.9),o=()=>new L(0,s*.54,0),a=new Wt(40,1,.1,60);a.position.copy(r());const l=new qe;l.name="player",t.add(l),l.add(a);let c=!1;const u=new ey(a,i);u.target.copy(o()),u.enableDamping=!0,u.dampingFactor=.08,u.minDistance=.5,u.maxDistance=4.8,u.minPolarAngle=.35,u.maxPolarAngle=Math.PI*.56,u.enablePan=!1,u.autoRotateSpeed=2.4,t.add(new Ev("#fff4e2","#5c4a3a",.35));const d=new yu("#fff1dd",140,0,.46,.8,1.8);d.position.set(1.8,3.2,2.4),d.castShadow=!0,d.shadow.mapSize.set(2048,2048),d.shadow.bias=-3e-4,d.shadow.normalBias=.02,d.shadow.camera.near=.5,d.shadow.camera.far=12,d.target.position.set(0,.9,0),t.add(d,d.target);const f=new yu("#dfe9ff",70,0,.6,.9,1.8);f.position.set(-2.4,2.6,-2),f.target.position.set(0,1.2,0),t.add(f,f.target);const h=new Rv("#ffe9d2",.5);h.position.set(-2.5,2,3),t.add(h);const g=new nt({color:"#b08d57",roughness:.3,metalness:1,envMapIntensity:1.2}),x=new nt({map:Nv(),roughness:.95,envMapIntensity:.25}),m=new nt({color:"#e2d7c4",roughness:.85,envMapIntensity:.3}),p=new ke(new Ft(13,10),new gu({map:Uv(),roughness:.38,clearcoat:.25,clearcoatRoughness:.35,envMapIntensity:.7}));p.rotation.x=-Math.PI/2,p.position.set(0,0,.6),p.receiveShadow=!0,t.add(p);const b=Et(new Ft(13,3.8),x,0,1.9,-2.6),S=Et(new Ft(13,5.4),x,0,2.7,5.5);S.rotation.y=Math.PI;const v=[b,S];for(const O of[-1,1]){const oe=Et(new Ft(10,3.8),x,O*4.6,1.9,.6);oe.rotation.y=-O*Math.PI*.5,v.push(oe)}for(const O of v)t.add(O);const A=Cs(v,t,x);A.receiveShadow=!0;for(const O of v)t.remove(O);t.add(A);const w=Et(new Ft(13,10),x,0,3.8,.6);w.rotation.x=Math.PI/2,t.add(w);const T=[Et(new $e(13,.09,.02),m,0,.045,5.48),Et(new $e(13,.09,.02),m,0,.045,-2.58),Et(new $e(13,.05,.018),m,0,2.95,-2.585)];for(const O of[-3.4,-1.7,0,1.7,3.4]){const oe=Et(new $e(.05,3.2,.018),m,O,1.75,5.485);oe.rotation.y=Math.PI,T.push(oe)}for(const O of[-3.4,-1.9,1.9,3.4])T.push(Et(new $e(.05,3.2,.018),m,O,1.75,-2.585));for(const O of[-1,1]){const oe=Et(new $e(10,.09,.02),m,O*4.58,.045,.6);oe.rotation.y=Math.PI/2,T.push(oe)}for(const O of T)t.add(O);const C=Cs(T,t,m);for(const O of T)t.remove(O);t.add(C);const _=new Qn({color:"#ffd9a0"}),y=[],P=[];for(const O of[-1.7,1.7]){const oe=new ke(new ot(.045,14,10),_);oe.position.set(O,2.25,5.42),y.push(oe),P.push(Et(new Nt(.008,.008,.1,8),g,O,2.36,5.44));const ae=new Kd("#ffcf99",2.5,7,1.8);ae.position.set(O,2.25,5.25),t.add(ae)}for(const O of y)t.add(O);const H=Cs(y,t,_);for(const O of y)t.remove(O);t.add(H);const U=new Yo(new Ft(1.5,2.3),{clipBias:.003,textureWidth:Oa,textureHeight:Oa,color:13225682});U.position.set(0,1.42,-2.575),t.add(U);const q=Et(new $e(1.62,.055,.035),g,0,2.6,-2.565),j=Et(new $e(1.62,.055,.035),g,0,.245,-2.565),W=Et(new $e(.055,2.42,.035),g,-.81,1.42,-2.565),Z=Et(new $e(.055,2.42,.035),g,.81,1.42,-2.565);t.add(q,j,W,Z);function G(O){const oe=O+.62,ae=.25,ve=ae+oe/2;U.geometry.dispose(),U.geometry=new Ft(1.5,oe),U.position.y=ve,q.position.y=ae+oe+.0275,j.position.y=ae-.0275;for(const Ge of[W,Z])Ge.geometry.dispose(),Ge.geometry=new $e(.055,oe+.11,.035),Ge.position.y=ve}G(s);const de=new ke(new Nt(1.05,1.14,.12,56),new gu({color:"#e9e3d7",roughness:.22,clearcoat:.3,clearcoatRoughness:.25,envMapIntensity:.9}));de.position.y=.06,de.receiveShadow=!0,t.add(de);const _e=Et(new Xt(1,.007,8,72),g,0,.118,0);_e.rotation.x=Math.PI/2,P.push(_e);for(const O of P)t.add(O);const Te=Cs(P,t,g);for(const O of P)t.remove(O);t.add(Te);const Ue=new qe;Ue.position.set(-2.35,0,-1.15),Ue.rotation.y=.45;const Ze=[];for(const O of[-1,1])Ze.push(Et(new Nt(.016,.016,1.5,12),g,O*.65,.75,0)),Ze.push(Et(new $e(.05,.03,.55),g,O*.65,.015,0));const J=Et(new Nt(.014,.014,1.36,12),g,0,1.5,0);J.rotation.z=Math.PI/2,Ze.push(J),["#97a08a","#d9cfc0","#4a4a52"].forEach((O,oe)=>{const ae=br([1.5,1.5]),ve=new nt({color:O,map:ae.map,bumpMap:ae.bump,bumpScale:.3,roughness:.9,envMapIntensity:.3,side:hn}),Ge=-.4+oe*.4;Ze.push(Et(new Xt(.035,.004,6,14,Math.PI),g,Ge,1.5,0));const le=new ke(new Ir([new me(.012,0),new me(.1,-.07),new me(.055,-.18),new me(.135,-.54)],24),ve);le.position.set(Ge,1.47,0),le.scale.set(1,1,.45),le.castShadow=!0,Ue.add(le)});for(const O of Ze)Ue.add(O);const se=Cs(Ze,Ue,g);for(const O of Ze)Ue.remove(O);Ue.add(se),t.add(Ue);const K=new qe;K.position.set(2.45,0,-1.5);const pe=Et(new Nt(.17,.125,.3,24),new nt({color:"#a9603c",roughness:.8,envMapIntensity:.3}),0,.15,0);pe.castShadow=!0,K.add(pe),K.add(Et(new Nt(.018,.026,.35,10),new nt({color:"#6b4a2f",roughness:.9}),0,.45,0));const ue=new nt({color:"#5a7247",roughness:.7,envMapIntensity:.4}),Ee=[],Ve=[];for(let O=0;O<7;O++){const oe=Et(new ot(1,12,8),ue,0,.72,0);oe.scale.set(.035,.17,.07);const ae=new qe;ae.position.set(0,.55,0),oe.position.y=.17,ae.rotation.set(.5+O%3*.22,O/7*Math.PI*2,0),ae.add(oe),K.add(ae),Ee.push(oe),Ve.push(ae)}const Be=Cs(Ee,K,ue);for(const O of Ve)K.remove(O);K.add(Be),t.add(K);function ze(){const O=i.clientWidth||window.innerWidth,oe=i.clientHeight||window.innerHeight;e.setSize(O,oe,!1),a.aspect=O/oe,a.updateProjectionMatrix()}function N(){a.position.copy(r()),u.target.copy(o())}function zt(O){Math.abs(O-s)<.001||(s=O,G(O),u.target.y=O*.54,c||(a.position.y=O*.76))}function et(O){U.getRenderTarget().setSize(O,O)}let He=0,De=0,it=0,Ae=-1;const R=90;function M(O){const oe=Ll[O];oe.mirrorPx===null?U.visible=!1:(U.visible=!0,et(oe.mirrorPx)),d.castShadow=oe.shadows;try{e.xr.setFoveation(oe.foveation)}catch{}}function V(){De=0,it=0,Ae=-1}e.xr.addEventListener("sessionstart",()=>{c=!0,l.position.set(ku.x,0,ku.z),l.rotation.set(0,0,0),u.enabled=!1,He=0,V(),M(0)}),e.xr.addEventListener("sessionend",()=>{c=!1,l.position.set(0,0,0),l.rotation.set(0,0,0),u.enabled=!0,He=0,V(),U.visible=!0,d.castShadow=!0,et(Oa);try{e.xr.setFoveation(1)}catch{}});function te(){const O=U.visible,oe=e.info.autoReset;e.info.autoReset=!1,U.visible=!1,e.info.reset(),e.render(t,a);const ae=e.info.render.calls,ve=e.info.render.triangles;U.visible=!0,e.info.reset(),e.render(t,a);const Ge=e.info.render.calls;return U.visible=O,e.info.autoReset=oe,e.info.reset(),{withMirror:Ge,withoutMirror:ae,triangles:ve}}function ne(){if(!c){u.update();return}const O=performance.now();if(Ae>=0&&(De+=O-Ae,it+=1,it>=R)){const oe=Uy(He,De/it);V(),oe!==He&&(He=oe,M(oe))}Ae=O}return ze(),{scene:t,camera:a,renderer:e,controls:u,player:l,isPresenting:()=>c,xrQualityLevel:()=>He,tick:ne,resize:ze,resetView:N,setSubjectHeight:zt,measureDrawCalls:te}}const Is="FittingRoomSeed",$y=[137,80,78,71,13,10,26,10],jy=(()=>{const i=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let n=0;n<8;n++)t=t&1?3988292384^t>>>1:t>>>1;i[e]=t>>>0}return i})();function Ky(i){let e=4294967295;for(let t=0;t<i.length;t++)e=jy[(e^i[t])&255]^e>>>8;return(e^4294967295)>>>0}function uh(i){return i.length>=8&&$y.every((e,t)=>i[t]===e)}function dh(i,e){return(i[e]<<24|i[e+1]<<16|i[e+2]<<8|i[e+3])>>>0}function hh(i,e){return String.fromCharCode(i[e],i[e+1],i[e+2],i[e+3])}function Jy(i,e){const t=new Uint8Array(e.length+12),n=new DataView(t.buffer);n.setUint32(0,e.length);for(let s=0;s<4;s++)t[4+s]=i.charCodeAt(s);return t.set(e,8),n.setUint32(8+e.length,Ky(t.subarray(4,8+e.length))),t}function Zy(i,e){const t=new Uint8Array(i.length+1+e.length);for(let n=0;n<i.length;n++)t[n]=i.charCodeAt(n)&127;t[i.length]=0;for(let n=0;n<e.length;n++)t[i.length+1+n]=e.charCodeAt(n)&127;return t}function fh(i,e){if(i!=="tEXt"||e.length<Is.length+1)return!1;for(let t=0;t<Is.length;t++)if(e[t]!==Is.charCodeAt(t))return!1;return e[Is.length]===0}function Qy(i,e){if(!uh(i))return null;const t=Jy("tEXt",Zy(Is,e)),n=[i.subarray(0,8)];let s=8,r=!1;for(;s+8<=i.length;){const c=dh(i,s),u=s+12+c;if(u>i.length)return null;const d=hh(i,s+4),f=i.subarray(s+8,s+8+c);if(fh(d,f)||n.push(i.subarray(s,u)),d==="IHDR"&&!r&&(n.push(t),r=!0),s=u,d==="IEND")break}if(!r)return null;const o=n.reduce((c,u)=>c+u.length,0),a=new Uint8Array(o);let l=0;for(const c of n)a.set(c,l),l+=c.length;return a}function ex(i){if(!uh(i))return null;let e=8;for(;e+8<=i.length;){const t=dh(i,e),n=e+12+t;if(n>i.length)return null;const s=hh(i,e+4),r=i.subarray(e+8,e+8+t);if(fh(s,r)){let o="";for(let a=Is.length+1;a<r.length;a++)o+=String.fromCharCode(r[a]);return o}if(e=n,s==="IEND")break}return null}const sn=1080;async function ph(i,e){const t=document.createElement("canvas");t.width=sn,t.height=sn;const n=t.getContext("2d");if(!n)throw new Error("2d context unavailable");const s=n.createLinearGradient(0,0,0,sn);s.addColorStop(0,"#faf6f0"),s.addColorStop(1,"#e7dbc7"),n.fillStyle=s,n.fillRect(0,0,sn,sn);const r=800,o=(sn-r)/2,a=44;n.save(),n.beginPath(),n.roundRect(o,a,r,r,36),n.clip(),i(n,o,a,r),n.restore(),n.strokeStyle="rgba(255,255,255,0.9)",n.lineWidth=6,n.beginPath(),n.roundRect(o,a,r,r,36),n.stroke(),n.fillStyle="#33302a",n.textAlign="center";let l=a+r+48;n.font='700 48px "Hiragino Sans", "Noto Sans JP", sans-serif',n.fillText(e.appName,sn/2,l),l+=28,n.font='400 24px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63";const c=Si()==="ja"||Si()==="zh"?`${e.tagline}（${e.workingTitleNote}）`:`${e.tagline} (${e.workingTitleNote})`;n.fillText(c,sn/2,l),l+=34,n.font='600 25px "Hiragino Sans", "Noto Sans JP", sans-serif',n.fillStyle="#33302a";const u=sn-90,d=S=>(S.color?26:0)+n.measureText(S.label).width,f=[];let h=[],g=0;for(const S of e.look){const v=d(S),A=h.length?v+22:v;h.length&&g+A>u&&f.length===0?(f.push(h),h=[S],g=v):(h.push(S),g+=A)}h.length&&f.push(h);for(const S of f.slice(0,2)){const v=S.reduce((w,T,C)=>w+d(T)+(C?22:0),0);let A=(sn-v)/2;n.textAlign="left";for(const w of S)w.color&&(n.beginPath(),n.arc(A+9,l-8,9,0,Math.PI*2),n.fillStyle=w.color,n.fill(),n.strokeStyle="rgba(51,48,42,0.35)",n.lineWidth=1.5,n.stroke(),A+=26,n.fillStyle="#33302a"),n.fillText(w.label,A,l),A+=n.measureText(w.label).width+22;n.textAlign="center",l+=27}const x=(e.name??"").trim();if(x){l+=2,n.font='400 22px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63";const S=`${D("card.wornBy")}: ${x}`;n.fillText(S,sn/2,l),l+=25}n.font='600 22px ui-monospace, "SF Mono", Menlo, monospace',n.fillStyle="#6b5d49",n.fillText(e.seed,sn/2,l),l+=23,n.font='400 20px "Hiragino Sans", sans-serif',n.fillStyle="#8a7a63",n.fillText(D("card.fictional"),sn/2,l);const m=await new Promise((S,v)=>{t.toBlob(A=>A?S(A):v(new Error("PNG encode failed")),"image/png")}),p=new Uint8Array(await m.arrayBuffer()),b=Qy(p,e.seed);return b?new Blob([b.buffer],{type:"image/png"}):m}async function mh(i,e){return ph((t,n,s,r)=>{const o=Math.min(i.width,i.height),a=(i.width-o)/2,l=(i.height-o)/2;t.drawImage(i,a,l,o,o,n,s,r,r)},e)}async function gh(i,e){return ph((t,n,s,r)=>{const o=i.naturalWidth||i.width,a=i.naturalHeight||i.height,l=Math.max(r/o,r/a),c=o*l,u=a*l;t.drawImage(i,n+(r-c)/2,s+(r-u)/2,c,u)},e)}function Ur(i,e){const t=URL.createObjectURL(i),n=document.createElement("a");return n.href=t,n.download=e,document.body.appendChild(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),4e3),t}const _h="fitting-room.looks.v1",vh=30;let Bu=0;function tx(){return Bu+=1,`l${Date.now().toString(36)}-${Bu.toString(36)}-${Math.floor(Math.random()*16777215).toString(36)}`}function xr(i){return{topStyle:i.topStyle,topColor:i.topColor,outerStyle:i.outerStyle,outerColor:i.outerColor,bottomStyle:i.bottomStyle,bottomColor:i.bottomColor,shoeStyle:i.shoeStyle,shoeColor:i.shoeColor,hat:i.hat,glasses:i.glasses,accessory:i.accessory}}function nx(i){const e=typeof i=="object"&&i!==null?{...At,...i}:{...At};return xr(Xs(e))}function ix(i,e){return i.topStyle===e.topStyle&&i.topColor===e.topColor&&i.outerStyle===e.outerStyle&&i.outerColor===e.outerColor&&i.bottomStyle===e.bottomStyle&&i.bottomColor===e.bottomColor&&i.shoeStyle===e.shoeStyle&&i.shoeColor===e.shoeColor&&i.hat===e.hat&&i.glasses===e.glasses&&i.accessory===e.accessory}function sx(i){if(!Array.isArray(i))return[];const e=new Set,t=[];for(const n of i){if(typeof n!="object"||n===null)continue;const s=n;typeof s.id!="string"||!s.id||e.has(s.id)||typeof s.name!="string"||!s.name.trim()||(e.add(s.id),t.push({id:s.id,name:s.name,look:nx(s.look),updatedAt:typeof s.updatedAt=="number"&&Number.isFinite(s.updatedAt)?s.updatedAt:0}))}return t.sort((n,s)=>s.updatedAt-n.updatedAt),t.slice(0,vh)}function rx(i=localStorage){try{const e=i.getItem(_h);return e?sx(JSON.parse(e)):[]}catch{return[]}}function yh(i,e=localStorage){try{e.setItem(_h,JSON.stringify(i))}catch{}}function ox(i,e,t,n=Date.now()){return[{id:tx(),name:e,look:{...t},updatedAt:n},...i].slice(0,vh)}function ax(i,e){return i.filter(t=>t.id!==e)}const zu="FR1-",Hu="FR2-",Vu="FR3-",Gu="FR4-",Wu="FR5-",Dl="FR6-",lx=12,cx=25,ux=29,pi=34;function qt(i,e){const t=i.indexOf(e);return t>=0?t:0}function Io(i,e,t){return Math.min(t,Math.max(e,i))}function dx(i){let e="";for(const t of i)e+=String.fromCharCode(t);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function hx(i){try{const e=i.replace(/-/g,"+").replace(/_/g,"/");return[...atob(e)].map(n=>n.charCodeAt(0))}catch{return null}}function xh(i){const e=on[i];if(e.kind!=="range")throw new Error(`param ${i} is not a range`);return e}function Xu(i,e){const{min:t,max:n}=xh(i);return Math.round((Io(e,t,n)-t)/(n-t)*255)}function qu(i,e){const{min:t,max:n}=xh(i);return t+Io(e,0,255)/255*(n-t)}function ct(i){const e=i.character,t=[...new TextEncoder().encode(us(i.name))],n=[6,Math.round(Io(e.skinTone,0,1)*255),Math.round((Io(e.height,Ar,Qd)-Ar)*100),qt(wr,e.hairColor),qt(Tr,e.eyeColor),qt(Er,e.hairStyle),...ec.map(s=>Xu(s,e[s])),qt(Li,i.topStyle),qt(Pi,i.topColor),qt(Di,i.hat),qt(Ii,i.glasses),qt(Ui,i.accessory),qt(Ni,i.pose),qt(as,i.bottomStyle),qt(ss,i.bottomColor),qt(ls,i.shoeStyle),qt(rs,i.shoeColor),...Ql.map(s=>Xu(s,e[s])),qt(cs,i.outerStyle),qt(os,i.outerColor),t.length,...t];return Dl+dx(n)}function ft(i){if(typeof i!="string")return null;let e=i.trim();e.startsWith(Dl)?e=e.slice(Dl.length):e.startsWith(Wu)?e=e.slice(Wu.length):e.startsWith(Gu)?e=e.slice(Gu.length):e.startsWith(Vu)?e=e.slice(Vu.length):e.startsWith(Hu)?e=e.slice(Hu.length):e.startsWith(zu)&&(e=e.slice(zu.length));const t=hx(e);if(!t)return null;let n="",s=t,r=null;if(t[0]===5||t[0]===6){const a=t[0]===6?2:0;if(t.length<pi+a+1)return null;const l=t[pi+a];if(l>ih||t.length!==pi+a+1+l)return null;let c;try{c=new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(t.slice(pi+a+1)))}catch{return null}if(n=us(c),t[0]===6){const u=(d,f)=>d[Math.min(d.length-1,Math.max(0,f))]??d[0];r={outerStyle:u(cs,t[pi]),outerColor:u(os,t[pi+1])}}s=t.slice(0,pi),s[0]=4}const o=(a,l)=>a[Math.min(a.length-1,Math.max(0,s[l]))]??a[0];if(s[0]===1&&s.length===lx)return Xs({topStyle:o(Li,6),topColor:o(Pi,7),hat:o(Di,8),glasses:o(Ii,9),accessory:o(Ui,10),pose:o(Ni,11),character:{skinTone:s[1]/255,height:Math.round((Ar+s[2]/100)*100)/100,hairColor:o(wr,3),eyeColor:o(Tr,4),hairStyle:o(Er,5)}});if(s[0]===2&&s.length===cx||s[0]===3&&s.length===ux||s[0]===4&&s.length===pi){const a={};ec.forEach((c,u)=>{a[c]=qu(c,s[6+u])});const l={};return s[0]===4&&Ql.forEach((c,u)=>{l[c]=qu(c,s[29+u])}),Xs({name:n,...r??{},topStyle:o(Li,19),topColor:o(Pi,20),hat:o(Di,21),glasses:o(Ii,22),accessory:o(Ui,23),pose:o(Ni,24),...s[0]>=3?{bottomStyle:o(as,25),bottomColor:o(ss,26),shoeStyle:o(ls,27),shoeColor:o(rs,28)}:{},character:{skinTone:s[1]/255,height:Math.round((Ar+s[2]/100)*100)/100,hairColor:o(wr,3),eyeColor:o(Tr,4),hairStyle:o(Er,5),...a,...l}})}return null}const Sh="fitting-room.roster.v1",Uo=50;let Yu=0;function fx(){return Yu+=1,`p${Date.now().toString(36)}-${Yu.toString(36)}-${Math.floor(Math.random()*16777216).toString(36)}`}function $o(i,e=Date.now(),t=fx()){return{id:t,seed:i,updatedAt:e}}function px(i){if(typeof i!="object"||i===null)return null;const e=i;if(!Array.isArray(e.entries))return null;const t=new Set,n=[];for(const o of e.entries){if(typeof o!="object"||o===null)continue;const a=o;typeof a.id!="string"||!a.id||t.has(a.id)||typeof a.seed!="string"||!ft(a.seed)||(t.add(a.id),n.push({id:a.id,seed:a.seed,updatedAt:typeof a.updatedAt=="number"&&Number.isFinite(a.updatedAt)?a.updatedAt:0}))}if(!n.length)return null;n.sort((o,a)=>o.updatedAt-a.updatedAt);const s=n.slice(-Uo),r=typeof e.currentId=="string"&&s.some(o=>o.id===e.currentId)?e.currentId:s[s.length-1].id;return{entries:s,currentId:r}}function mx(i=localStorage){try{const n=i.getItem(Sh);if(n){const s=px(JSON.parse(n));if(s)return s}}catch{}const e=$o(ct(sh(i))),t={entries:[e],currentId:e.id};return er(t,i),t}function er(i,e=localStorage){try{e.setItem(Sh,JSON.stringify(i))}catch{}}function Mh(i){return i.entries.find(e=>e.id===i.currentId)??i.entries[i.entries.length-1]}function gx(i,e,t=Date.now()){const n=i.entries.findIndex(r=>r.id===i.currentId);if(n<0){const r=$o(e,t);return{entries:[...i.entries,r].slice(-Uo),currentId:r.id}}const s=i.entries.slice();return s[n]={...s[n],seed:e,updatedAt:t},{entries:s,currentId:i.currentId}}function _x(i,e,t=Date.now()){const n=$o(e,t);let s=[...i.entries,n];return s.length>Uo&&(s=[...s.filter(o=>o.id!==n.id).sort((o,a)=>o.updatedAt-a.updatedAt).slice(s.length-Uo),n]),{entries:s,currentId:n.id}}function vx(i,e){const t=i.entries.filter(s=>s.id!==e);if(!t.length){const s=$o(ct(At));return{entries:[s],currentId:s.id}}const n=i.currentId===e?t.reduce((s,r)=>s.updatedAt>=r.updatedAt?s:r).id:i.currentId;return{entries:t,currentId:n}}function yx(i,e,t,n=Date.now()){const s=i.entries.findIndex(a=>a.id===e);if(s<0)return null;const r=ft(i.entries[s].seed);if(!r)return null;const o=i.entries.slice();return o[s]={...o[s],seed:ct({...r,name:t}),updatedAt:n},{entries:o,currentId:i.currentId}}function ic(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function bh(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function xx(i,e){return bh(`${i}
${e}`)}function Eh(i,e,t){const n=ic(t),s={};for(const[r,o]of Object.entries(on)){const a=r;if(o.kind==="range"){const l=n();if(l<.4)s[r]=i[a];else if(l<.8)s[r]=e[a];else{const c=.25+.5*n();s[r]=i[a]+(e[a]-i[a])*c}}else s[r]=n()<.5?i[a]:e[a]}return Qs(s)}const sc=["subtle","standard","bold"],Sx={subtle:.05,standard:.14,bold:.3},Mx={subtle:.1,standard:.25,bold:.45};function rc(i){return typeof i=="string"&&sc.includes(i)}function wh(i,e,t){const n=ic(e),s=Sx[t],r={};for(const[o,a]of Object.entries(on)){const l=o;if(a.kind==="range"){const c=a.max-a.min,u=(i[l]-a.min)/c,d=n()+n()-1,f=Math.min(1,Math.max(0,u+d*s));r[o]=a.min+f*c}else{const c=a.options,u=i[l];if(c.length>1&&n()<Mx[t]){const d=c.filter(f=>f!==u);r[o]=d[Math.floor(n()*d.length)]}else r[o]=u}}return Qs(r)}function bx(i){return bh(i)}function Ex(i,e,t,n=4){const s=ic(e),r=[];for(let o=0;o<n;o++){const a=Math.floor(s()*4294967296)>>>0;r.push(wh(i,a,t))}return r}const Th="fitting-room.lineage.v1",jo=200,wx=["create","restore","blend","mutate","rename"];function Tx(i){if(!Array.isArray(i))return[];const e=[];for(const t of i){if(typeof t!="object"||t===null)continue;const n=t;if(typeof n.at!="number"||!Number.isFinite(n.at)||typeof n.kind!="string"||!wx.includes(n.kind)||typeof n.seed!="string"||!ft(n.seed))continue;const s={at:n.at,kind:n.kind,seed:n.seed};if(s.kind==="blend"){const o=n.parents;if(!Array.isArray(o)||o.length!==2||typeof o[0]!="string"||typeof o[1]!="string"||!ft(o[0])||!ft(o[1]))continue;s.parents=[o[0],o[1]]}if(s.kind==="mutate"){if(typeof n.source!="string"||!ft(n.source))continue;s.source=n.source,rc(n.strength)&&(s.strength=n.strength)}const r=us(n.name);r&&(s.name=r),e.push(s)}return e.slice(-jo)}const $u="fitting-room.mutation-history.v1";function Ah(i){try{const e=i.getItem(Th);return e?Tx(JSON.parse(e)):[]}catch{return[]}}function Ax(i){if(!Array.isArray(i))return[];const e=[];for(const t of i){if(typeof t!="object"||t===null)continue;const n=t;typeof n.at!="number"||!Number.isFinite(n.at)||n.kind==="mutate"&&(typeof n.seed!="string"||!ft(n.seed)||typeof n.source!="string"||!ft(n.source)||rc(n.strength)&&e.push({at:n.at,kind:"mutate",seed:n.seed,source:n.source,strength:n.strength}))}return e}function Rx(i){let e;try{e=i.getItem($u)}catch{return}if(e===null)return;let t=[];try{t=Ax(JSON.parse(e))}catch{t=[]}try{i.removeItem($u)}catch{}if(!t.length)return;const n=[...Ah(i),...t].sort((s,r)=>s.at-r.at).slice(-jo);Ch(n,i)}function Rh(i=localStorage){return Rx(i),Ah(i)}function Ch(i,e=localStorage){try{e.setItem(Th,JSON.stringify(i.slice(-jo)))}catch{}}function Cx(i,e=localStorage){const t=[...Rh(e),i].slice(-jo);return Ch(t,e),t}const Px=1179937895,Lx=2,Dx=1313821514,Ix=5130562,ju=5126,Ux=5121,Nx=5123,Ox=5125;function Fa(i){return i+3&-4}function Ku(i,e,t){if(i.length===0)throw new Error("buildGlb: no parts");if(e.length===0)throw new Error("buildGlb: no materials");const n=t.skin;if(n){if(n.joints.length===0)throw new Error("buildGlb: skin with no joints");if(n.inverseBindMatrices.length!==n.joints.length*16)throw new Error("buildGlb: inverseBindMatrices must hold one mat4 per joint");n.joints.forEach((_,y)=>{if(_.parent<-1||_.parent>=n.joints.length||_.parent===y)throw new Error(`buildGlb: joint ${y} (${_.name}) has an invalid parent`)})}const s=[],r=[],o=[];let a=0;const l=(_,y)=>{const P=Fa(a)-a;P>0&&(s.push(new Uint8Array(P)),a+=P);const H=r.length;return r.push({buffer:0,byteOffset:a,byteLength:_.length,target:y}),s.push(_),a+=_.length,H},c=(_,y,P)=>{const H=new Float32Array(_.length);H.set(_);const U=l(new Uint8Array(H.buffer),34962),q=y==="VEC3"?3:y==="VEC2"?2:4,j={bufferView:U,componentType:ju,count:_.length/q,type:y};if(P){const W=[1/0,1/0,1/0],Z=[-1/0,-1/0,-1/0];for(let G=0;G+2<_.length;G+=3)for(let de=0;de<3;de++){const _e=_[G+de];_e<W[de]&&(W[de]=_e),_e>Z[de]&&(Z[de]=_e)}j.min=W,j.max=Z}return o.push(j),o.length-1},u=[];i.forEach((_,y)=>{const P=_.positions.length/3;if(!Number.isInteger(P)||P===0)throw new Error(`buildGlb: part ${y} (${_.name}) has no vertices`);if(_.normals.length!==_.positions.length)throw new Error(`buildGlb: part ${y} (${_.name}) normals/positions count mismatch`);if(_.uvs&&_.uvs.length!==P*2)throw new Error(`buildGlb: part ${y} (${_.name}) uv count mismatch`);if(_.material<0||_.material>=e.length)throw new Error(`buildGlb: part ${y} (${_.name}) material index out of range`);if(_.joint!==void 0){if(!n)throw new Error(`buildGlb: part ${y} (${_.name}) names a joint but no skin was given`);if(_.joint<0||_.joint>=n.joints.length)throw new Error(`buildGlb: part ${y} (${_.name}) joint index out of range`)}const H={POSITION:c(_.positions,"VEC3",!0),NORMAL:c(_.normals,"VEC3",!1)};if(_.uvs&&(H.TEXCOORD_0=c(_.uvs,"VEC2",!1)),_.joint!==void 0){const q=new Uint8Array(P*4),j=new Float32Array(P*4);for(let Z=0;Z<P;Z++)q[Z*4]=_.joint,j[Z*4]=1;const W=l(q,34962);o.push({bufferView:W,componentType:Ux,count:P,type:"VEC4"}),H.JOINTS_0=o.length-1,H.WEIGHTS_0=c(j,"VEC4",!1)}const U={attributes:H,material:_.material};if(_.indices){let q=0;for(let G=0;G<_.indices.length;G++)_.indices[G]>q&&(q=_.indices[G]);if(q>=P)throw new Error(`buildGlb: part ${y} (${_.name}) index out of range`);const j=q>65535,W=j?new Uint32Array(_.indices.length):new Uint16Array(_.indices.length);W.set(_.indices);const Z=l(new Uint8Array(W.buffer),34963);o.push({bufferView:Z,componentType:j?Ox:Nx,count:_.indices.length,type:"SCALAR"}),U.indices=o.length-1}u.push({name:_.name,primitives:[U]})});const d=[];let f;if(n){const _=n.joints.map((U,q)=>q);n.joints.forEach((U,q)=>{const j={name:U.name,translation:[...U.translation]},W=n.joints.map((Z,G)=>Z.parent===q?_[G]:-1).filter(Z=>Z>=0);W.length&&(j.children=W),d.push(j)});const y=new Float32Array(n.inverseBindMatrices.length);y.set(n.inverseBindMatrices);const P=l(new Uint8Array(y.buffer),34962);o.push({bufferView:P,componentType:ju,count:n.joints.length,type:"MAT4"});const H=n.joints.findIndex(U=>U.parent===-1);f={joints:_,inverseBindMatrices:o.length-1,...H>=0?{skeleton:_[H]}:{}}}const h=d.length;i.forEach((_,y)=>{const P={name:_.name,mesh:y};n&&_.joint!==void 0&&(P.skin=0),d.push(P)});const g=[];n&&n.joints.forEach((_,y)=>{_.parent===-1&&g.push(y)});for(let _=0;_<i.length;_++)g.push(h+_);const x=d.length;d.push({name:"character",children:g});const m={asset:{version:"2.0",generator:t.generator},scene:0,scenes:[{nodes:[x]}],nodes:d,meshes:u,materials:e.map(_=>{const y={name:_.name,pbrMetallicRoughness:{baseColorFactor:[..._.baseColorFactor],roughnessFactor:_.roughnessFactor,metallicFactor:_.metallicFactor}};return _.alphaMode&&_.alphaMode!=="OPAQUE"&&(y.alphaMode=_.alphaMode),_.doubleSided&&(y.doubleSided=!0),y}),accessors:o,bufferViews:r,buffers:[{byteLength:a}]};f&&(m.skins=[f]),t.extensions&&(m.extensions=t.extensions),t.extensionsUsed&&(m.extensionsUsed=t.extensionsUsed),t.extras&&(m.extras=t.extras);const p=new TextEncoder().encode(JSON.stringify(m)),b=Fa(p.length),S=Fa(a),v=20+b+8+S,A=new Uint8Array(v),w=new DataView(A.buffer);w.setUint32(0,Px,!0),w.setUint32(4,Lx,!0),w.setUint32(8,v,!0),w.setUint32(12,b,!0),w.setUint32(16,Dx,!0),A.set(p,20);for(let _=20+p.length;_<20+b;_++)A[_]=32;const T=20+b;w.setUint32(T,S,!0),w.setUint32(T+4,Ix,!0);let C=T+8;for(const _ of s)A.set(_,C),C+=_.length;return A}const Il="https://creativecommons.org/publicdomain/zero/1.0/",Fx="This character is fictional. You may use this file freely as material in your own works — including commercial works — and may modify and redistribute it. No credit is required. (CC0 1.0)",kx="このキャラクターは架空のものです。このファイルは、商用を含む自分の作品の素材として自由に使うことができ、改変・再配布もできます。クレジット表記は不要です。（CC0 1.0）";function Bx(i,e){const t=e<-.01?".L":e>.01?".R":"";return i>=1.38?"neck":i>=1?"torso":i>=.7?"hips":i>=.52?`upperLeg${t}`:i>=.14?`lowerLeg${t}`:`foot${t}`}function zx(i){const e=i.position.x<0?"L":"R",t=new Map;t.set(i,`upperArm.${e}`);for(const n of i.children)if(n instanceof qe){t.set(n,`forearm.${e}`);for(const s of n.children)s instanceof qe&&t.set(s,`hand.${e}`)}return t}function Hx(i){const e=i.position.x<0?"L":"R";let t=null,n=null;for(const s of i.children)if(s instanceof qe){t=s;for(const r of s.children)r instanceof qe&&(n=r)}return{side:e,shoulder:i,elbow:t,hand:n}}function Vx(i){var v;const e=th(i.character);qo(e,i);const t=e.root,n=t.children[0],s={x:(n==null?void 0:n.scale.x)||1,y:(n==null?void 0:n.scale.y)||1},r=new Map([[e.head,"head"],[e.hatAnchor,"hat"],[e.glassesAnchor,"glasses"],[e.torsoAnchor,"top"],[e.bottomAnchor,"bottom"],[e.neckAnchor,"neck-item"],[e.bagAnchor,"bag"],[e.shoesAnchor,"shoes"]]),o=new Map,a=[];let l=null;if(n)for(const A of n.children){if(r.has(A)||!(A instanceof qe))continue;if(A.children.some(T=>T instanceof qe)){for(const[T,C]of zx(A))o.set(T,C);a.push(Hx(A))}else l=A}for(const A of a)A.shoulder.rotation.set(0,0,A.side==="L"?-Math.PI/2:Math.PI/2),(v=A.elbow)==null||v.rotation.set(0,0,0);const c=[],u=new Map,d=A=>{const w=u.get(A);if(w!==void 0)return w;const T=A,C=T.color,_={name:`material-${c.length}`,baseColorFactor:C?[C.r,C.g,C.b,T.opacity??1]:[1,1,1,T.opacity??1],roughnessFactor:T.roughness??1,metallicFactor:T.metalness??0,alphaMode:T.transparent?"BLEND":"OPAQUE",doubleSided:T.side===hn};return c.push(_),u.set(A,c.length-1),c.length-1},f=[],h=new Map,g=new L,x=(A,w)=>{const T=A.geometry.clone();T.applyMatrix4(A.matrixWorld);const C=T.getAttribute("position");if(!C||C.count===0)return;const _=T.getAttribute("normal"),y=T.getAttribute("uv"),P=Array.isArray(A.material)?A.material[0]:A.material,H=(h.get(w)??0)+1;h.set(w,H),f.push({name:`${w}-${H}`,region:w,positions:C.array,normals:_?_.array:new Float32Array(C.count*3),uvs:y?y.array:void 0,indices:T.index?T.index.array:void 0,material:d(P)})},m=A=>{A.geometry.computeBoundingBox();const w=A.geometry.boundingBox;return w?g.copy(w.getCenter(new L)).applyMatrix4(A.matrixWorld):g.set(0,0,0)},p=(A,w)=>{if(w==="shoes")return m(A).x<0?"shoe.L":"shoe.R";if(w==="body"){const T=m(A);return Bx(T.y/s.y,T.x)}return w==="neck-item"?m(A).y/s.y>=1.4?"neck":"chest":w},b=(A,w)=>{let T=w;const C=r.get(A);C&&(T=C);const _=o.get(A);_&&(T=_),A===l&&(T="body"),A instanceof ke&&x(A,p(A,T));for(const y of A.children)b(y,T)};t.position.y=0,t.updateMatrixWorld(!0),b(t,"part");const S={head:e.head.getWorldPosition(new L),arms:a};return{parts:f,materials:c,jointWorld:S,frameScale:s,rig:e}}function Gx(i){var t,n;const e=new Set;i.root.traverse(s=>{if(s instanceof ke){s.geometry.dispose();const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)e.add(o)}});for(const s of e){const r=s;(t=r.map)==null||t.dispose(),(n=r.bumpMap)==null||n.dispose(),s.dispose()}}const Oe={hips:0,spine:1,chest:2,neck:3,head:4,leftUpperArm:5,leftLowerArm:6,leftHand:7,rightUpperArm:8,rightLowerArm:9,rightHand:10,leftUpperLeg:11,leftLowerLeg:12,leftFoot:13,rightUpperLeg:14,rightLowerLeg:15,rightFoot:16};function Wx(i){switch(i){case"head":case"hat":case"glasses":return Oe.head;case"neck":return Oe.neck;case"chest":case"top":case"bag":return Oe.chest;case"torso":return Oe.spine;case"hips":case"bottom":return Oe.hips;case"upperLeg.L":return Oe.leftUpperLeg;case"lowerLeg.L":return Oe.leftLowerLeg;case"foot.L":case"shoe.L":return Oe.leftFoot;case"upperLeg.R":return Oe.rightUpperLeg;case"lowerLeg.R":return Oe.rightLowerLeg;case"foot.R":case"shoe.R":return Oe.rightFoot;case"upperArm.L":return Oe.leftUpperArm;case"forearm.L":return Oe.leftLowerArm;case"hand.L":return Oe.leftHand;case"upperArm.R":return Oe.rightUpperArm;case"forearm.R":return Oe.rightLowerArm;case"hand.R":return Oe.rightHand;default:return Oe.hips}}function Xx(i){const e=i.frameScale.x,t=i.frameScale.y,n=(l,c,u)=>new L(l,c,u),s=new Array(17);s[Oe.hips]=n(0,.92*t,0),s[Oe.spine]=n(0,1.08*t,0),s[Oe.chest]=n(0,1.26*t,0),s[Oe.neck]=n(0,1.44*t,0),s[Oe.head]=i.jointWorld.head.clone(),s[Oe.leftUpperLeg]=n(-.096*e,.8*t,0),s[Oe.leftLowerLeg]=n(-.096*e,.47*t,0),s[Oe.leftFoot]=n(-.096*e,.1*t,0),s[Oe.rightUpperLeg]=n(.096*e,.8*t,0),s[Oe.rightLowerLeg]=n(.096*e,.47*t,0),s[Oe.rightFoot]=n(.096*e,.1*t,0);for(const l of i.jointWorld.arms){const c=l.side==="L"?Oe.leftUpperArm:Oe.rightUpperArm,u=l.side==="L"?Oe.leftLowerArm:Oe.rightLowerArm,d=l.side==="L"?Oe.leftHand:Oe.rightHand;s[c]=l.shoulder.getWorldPosition(new L),l.elbow&&(s[u]=l.elbow.getWorldPosition(new L)),l.hand&&(s[d]=l.hand.getWorldPosition(new L)),s[u]||(s[u]=s[c].clone().add(n(l.side==="L"?-.27*e:.27*e,0,0))),s[d]||(s[d]=s[u].clone().add(n(l.side==="L"?-.26*e:.26*e,0,0)))}const o=[{name:"hips",parent:-1},{name:"spine",parent:Oe.hips},{name:"chest",parent:Oe.spine},{name:"neck",parent:Oe.chest},{name:"head",parent:Oe.neck},{name:"leftUpperArm",parent:Oe.chest},{name:"leftLowerArm",parent:Oe.leftUpperArm},{name:"leftHand",parent:Oe.leftLowerArm},{name:"rightUpperArm",parent:Oe.chest},{name:"rightLowerArm",parent:Oe.rightUpperArm},{name:"rightHand",parent:Oe.rightLowerArm},{name:"leftUpperLeg",parent:Oe.hips},{name:"leftLowerLeg",parent:Oe.leftUpperLeg},{name:"leftFoot",parent:Oe.leftLowerLeg},{name:"rightUpperLeg",parent:Oe.hips},{name:"rightLowerLeg",parent:Oe.rightUpperLeg},{name:"rightFoot",parent:Oe.rightLowerLeg}].map((l,c)=>{const u=l.parent>=0?s[l.parent]:new L,d=s[c].clone().sub(u);return{name:l.name,parent:l.parent,translation:[d.x,d.y,d.z]}}),a=new Float32Array(o.length*16);return s.forEach((l,c)=>{a.set([1,0,0,0,0,1,0,0,0,0,1,0,-l.x,-l.y,-l.z,1],c*16)}),{joints:o,inverseBindMatrices:a}}function qx(i,e){return{fittingRoomSeed:e,fittingRoomCharacter:"fictional",fittingRoomLicenseUrl:Il,fittingRoomTerms:Fx,fittingRoomTermsJa:kx,fittingRoomParams:i}}const Ju="3D Fitting Room (working title) — on-device glTF/VRM exporter";function Ph(i,e){const t=Vx(i);try{const n=Xx(t),s=t.parts.map(c=>({...c,joint:Wx(c.region)})),r=ct(i),o=qx(i,r);if(!e)return{bytes:Ku(s,t.materials,{generator:Ju,extras:o,skin:n}),parts:s.length,seed:r};const a={};for(const[c,u]of Object.entries(Oe))a[c]={node:u};return{bytes:Ku(s,t.materials,{generator:Ju,extras:o,skin:n,extensionsUsed:["VRMC_vrm"],extensions:{VRMC_vrm:{specVersion:"1.0",meta:{name:"Fitting Room Character",version:"1.0",authors:["3D Fitting Room (working title)"],copyrightInformation:"A fictional character, generated procedurally on-device by the 3D Fitting Room app. Free to use as material in your own works under CC0 1.0 (see licenseUrl).",licenseUrl:Il,otherLicenseUrl:Il,avatarPermission:"everyone",commercialUsage:"corporation",creditNotation:"unnecessary",allowRedistribution:!0,modification:"allowModificationRedistribution",allowExcessivelyViolentUsage:!1,allowExcessivelySexualUsage:!1,allowPoliticalOrReligiousUsage:!1,allowAntisocialOrHateUsage:!1},humanoid:{humanBones:a}}}}),parts:s.length,seed:r}}finally{Gx(t.rig)}}function Yx(i){return Ph(i,!1)}function $x(i){return Ph(i,!0)}const oc={set_top_style:{field:"topStyle",options:Li},set_top_color:{field:"topColor",options:Pi},set_outer_style:{field:"outerStyle",options:cs},set_outer_color:{field:"outerColor",options:os},set_bottom_style:{field:"bottomStyle",options:as},set_bottom_color:{field:"bottomColor",options:ss},set_shoe_style:{field:"shoeStyle",options:ls},set_shoe_color:{field:"shoeColor",options:rs},set_hat:{field:"hat",options:Di},set_glasses:{field:"glasses",options:Ii},set_accessory:{field:"accessory",options:Ui},set_pose:{field:"pose",options:Ni}},ac=Object.keys(on);function jx(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function Kx(i,e){const t=typeof i=="string"?Number(i):i;return typeof t!="number"||!Number.isFinite(t)?{ok:!1}:{ok:!0,value:Math.min(e.max,Math.max(e.min,t))}}function Zu(i,e){return typeof i=="string"&&e.includes(i)?{ok:!0,value:i}:{ok:!1}}function Jx(i,e){const t=n=>e.rejected.push({raw:i,reason:n});if(!jx(i)||typeof i.type!="string"){t("not a command object");return}switch(i.type){case"set_character":{const n=i.param;if(typeof n!="string"||!ac.includes(n)){t(`unknown character parameter: ${String(n)}`);return}const s=n,r=on[s];if(r.kind==="range"){const o=Kx(i.value,r);if(!o.ok){t(`value for ${s} must be a number`);return}e.commands.push({type:"set_character",param:s,value:o.value})}else{const o=Zu(i.value,r.options);if(!o.ok){t(`value for ${s} must be one of: ${r.options.join(", ")}`);return}e.commands.push({type:"set_character",param:s,value:o.value})}return}case"blend_characters":{const{seedA:n,seedB:s}=i;if(typeof n!="string"||!ft(n)){t("seedA is not a valid person seed");return}if(typeof s!="string"||!ft(s)){t("seedB is not a valid person seed");return}let r;if(i.mixSeed===void 0)r=xx(n,s);else{const o=typeof i.mixSeed=="string"?Number(i.mixSeed):i.mixSeed;if(typeof o!="number"||!Number.isFinite(o)){t("mixSeed must be an integer");return}r=Math.floor(o)>>>0}e.commands.push({type:"blend_characters",seedA:n,seedB:s,mixSeed:r});return}case"mutate_character":{if(!rc(i.strength)){t(`strength must be one of: ${sc.join(", ")}`);return}const n={type:"mutate_character",strength:i.strength};if(i.mutationSeed!==void 0){const s=typeof i.mutationSeed=="string"?Number(i.mutationSeed):i.mutationSeed;if(typeof s!="number"||!Number.isFinite(s)){t("mutationSeed must be an integer");return}n.mutationSeed=Math.floor(s)>>>0}e.commands.push(n);return}case"randomize_outfit":case"randomize_character":case"share_card":case"get_state":e.commands.push({type:i.type});return;default:{const n=oc[i.type];if(!n){t(`unknown command type: ${i.type}`);return}const s=Zu(i.value,n.options);if(!s.ok){t(`value for ${i.type} must be one of: ${n.options.join(", ")}`);return}e.commands.push({type:i.type,value:s.value});return}}}function Lh(i){const e={commands:[],rejected:[]};if(!Array.isArray(i))return e.rejected.push({raw:i,reason:"command list must be an array"}),e;for(const t of i)Jx(t,e);return e}function Zx(i){const e={};for(const t of ac){const n=on[t];e[t]=n.kind==="range"?n.min+i()*(n.max-n.min):n.options[Math.floor(i()*n.options.length)]}return Qs(e)}function Dh(i,e,t=Math.random){let n={...e,character:{...e.character}};const s=[],r=[];let o=!1,a=!1;for(const l of i)switch(l.type){case"set_character":n={...n,character:Qs({...n.character,[l.param]:l.value})},s.push(`set_character ${l.param} = ${String(l.value)}`);break;case"randomize_outfit":{n={...rh(t),character:n.character,name:n.name},s.push("randomize_outfit");break}case"randomize_character":n={...n,character:Zx(t)},s.push("randomize_character");break;case"blend_characters":{const c=ft(l.seedA),u=ft(l.seedB);c&&u&&(n={...n,name:"",character:Eh(c.character,u.character,l.mixSeed)},s.push(`blend_characters mixSeed=${l.mixSeed}`));break}case"mutate_character":{const c=ct(n),u=l.mutationSeed??bx(c);n={...n,character:wh(n.character,u,l.strength)},r.push({source:c,seed:ct(n),strength:l.strength}),s.push(`mutate_character strength=${l.strength} mutationSeed=${u}`);break}case"share_card":o=!0,s.push("share_card");break;case"get_state":a=!0,s.push("get_state");break;default:{const c=oc[l.type];n={...n,[c.field]:l.value},s.push(`${l.type} = ${l.value}`);break}}return{outfit:Xs(n),applied:s,wantShareCard:o,stateRequested:a,mutations:r}}function Ih(){const i=["Respond with a single JSON object and nothing else:",'{"reply": "<short message to the user>", "commands": [<command>, ...]}',"Available commands:"];for(const e of ac){const t=on[e];t.kind==="range"?i.push(`- {"type":"set_character","param":"${e}","value":<number>} — range ${t.min}..${t.max}`):i.push(`- {"type":"set_character","param":"${e}","value":<one of: ${t.options.join(" | ")}>}`)}for(const[e,t]of Object.entries(oc))i.push(`- {"type":"${e}","value":<one of: ${t.options.join(" | ")}>}`);return i.push('- {"type":"randomize_outfit"} — random clothes, same person','- {"type":"randomize_character"} — a new random person','- {"type":"blend_characters","seedA":"<seed of one person>","seedB":"<seed of another person>","mixSeed":<integer, optional>} — synthesize a new person from the two people named by their seeds; the same seeds and mixSeed always produce the same person. Clothes are not inherited: the current outfit stays on the new person','- {"type":"mutate_character","strength":<one of: subtle | standard | bold>,"mutationSeed":<integer, optional>} — vary the current person into a nearby new person (one-parent mutation); the same person, strength and mutationSeed always produce the same variation, and without a mutationSeed one is derived from the current person. Clothes stay as they are','- {"type":"share_card"} — save a photo of the current look','- {"type":"get_state"} — report the current state back',"Values outside a range are clamped; values not in an option list are rejected. Never invent parameters, options or command types."),i.join(`
`)}const Uh="fitting-room.llm.v1",Qu={endpoint:"",apiKey:"",model:""};function Qx(i=localStorage){try{const e=i.getItem(Uh);if(!e)return{...Qu};const t=JSON.parse(e);return{endpoint:typeof t.endpoint=="string"?t.endpoint:"",apiKey:typeof t.apiKey=="string"?t.apiKey:"",model:typeof t.model=="string"?t.model:""}}catch{return{...Qu}}}function eS(i,e=localStorage){try{e.setItem(Uh,JSON.stringify(i))}catch{}}function ds(i){try{const e=new URL(i.trim());return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}function Nh(i){return i.trim().replace(/\/+$/,"").replace(/\/chat\/completions$/,"")}function tS(i){const e=i.trim().replace(/\/+$/,"");return e.endsWith("/chat/completions")?e:`${Nh(i)}/chat/completions`}function nS(i){return`${Nh(i)}/models`}function Oh(i){const e={"Content-Type":"application/json"};return i.apiKey.trim()&&(e.Authorization=`Bearer ${i.apiKey.trim()}`),e}async function Fh(i,e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),t);try{return await n(i,{...e,signal:s.signal})}finally{clearTimeout(r)}}async function iS(i,e=fetch){if(!ds(i.endpoint))return{ok:!1,error:"invalid endpoint URL"};try{const t=await Fh(nS(i.endpoint),{headers:Oh(i)},15e3,e);if(!t.ok)return{ok:!1,error:`HTTP ${t.status}`};const n=await t.json();return{ok:!0,models:Array.isArray(n.data)?n.data.map(r=>r==null?void 0:r.id).filter(r=>typeof r=="string"):[]}}catch(t){return{ok:!1,error:t instanceof Error?t.message:String(t)}}}const sS={ja:"Japanese",en:"English",es:"Spanish",zh:"Chinese",fr:"French",de:"German",pt:"Portuguese",ko:"Korean"};function rS(i,e){return["You operate a 3D avatar fitting-room app for the user, through commands.","The user writes an instruction; you translate it into commands from the protocol below.",`Write the "reply" field in ${sS[e]}, briefly.`,"If the instruction asks for something no command can do, return an empty commands list and explain why in the reply.","","Current state (JSON):",JSON.stringify(i),"",Ih()].join(`
`)}function oS(i){const e=i.indexOf("{"),t=i.lastIndexOf("}");if(e<0||t<=e)return null;try{const n=JSON.parse(i.slice(e,t+1));if(typeof n!="object"||n===null)return null;const s=n;return Array.isArray(s.commands)?{reply:typeof s.reply=="string"?s.reply:"",rawCommands:s.commands}:null}catch{return null}}async function aS(i,e,t,n,s=fetch){var c,u,d;if(!ds(i.endpoint))throw new Error("invalid endpoint URL");if(!i.model.trim())throw new Error("no model set");const r=await Fh(tS(i.endpoint),{method:"POST",headers:Oh(i),body:JSON.stringify({model:i.model.trim(),temperature:.2,messages:[{role:"system",content:rS(e,n)},{role:"user",content:t}]})},6e4,s);if(!r.ok)throw new Error(`HTTP ${r.status}`);const a=(d=(u=(c=(await r.json()).choices)==null?void 0:c[0])==null?void 0:u.message)==null?void 0:d.content;if(typeof a!="string")throw new Error("empty response from the model");const l=oS(a);if(!l)throw new Error("the model response was not the expected JSON");return{reply:l.reply,validation:Lh(l.rawCommands)}}const kh="fitting-room.sd.v1",ed={endpoint:"",apiKey:""};function lS(i=localStorage){try{const e=i.getItem(kh);if(!e)return{...ed};const t=JSON.parse(e);return{endpoint:typeof t.endpoint=="string"?t.endpoint:"",apiKey:typeof t.apiKey=="string"?t.apiKey:""}}catch{return{...ed}}}function cS(i,e=localStorage){try{e.setItem(kh,JSON.stringify(i))}catch{}}function uS(i){return i.trim().replace(/\/+$/,"").replace(/\/sdapi\/v1$/,"")}function Bh(i,e){return`${uS(i)}/sdapi/v1/${e.replace(/^\/+/,"")}`}function zh(i){const e={"Content-Type":"application/json"},t=i.apiKey.trim();if(t)if(t.includes(":"))try{e.Authorization=`Basic ${btoa(t)}`}catch{e.Authorization=`Bearer ${t}`}else e.Authorization=`Bearer ${t}`;return e}async function Hh(i,e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),t);try{return await n(i,{...e,signal:s.signal})}finally{clearTimeout(r)}}async function dS(i,e=fetch){if(!ds(i.endpoint))return{ok:!1,error:"invalid endpoint URL"};try{const t=await Hh(Bh(i.endpoint,"sd-models"),{headers:zh(i)},15e3,e);if(!t.ok)return{ok:!1,error:`HTTP ${t.status}`};const n=await t.json();return{ok:!0,models:Array.isArray(n)?n.map(r=>typeof(r==null?void 0:r.model_name)=="string"?r.model_name:r==null?void 0:r.title).filter(r=>typeof r=="string"):[]}}catch(t){return{ok:!1,error:t instanceof Error?t.message:String(t)}}}const hS={"#201612":"black","#3a2417":"dark brown","#503729":"brown","#7a4a26":"chestnut brown","#8c3b22":"auburn","#a97c50":"light brown","#d9b380":"blonde","#b9b4ad":"silver-gray"},fS={"#2e2019":"dark brown","#5a3a1e":"brown","#7a5a26":"amber","#46684a":"green","#3d5a80":"blue","#707880":"gray"},fo={"#ffffff":"white","#ff8fab":"pink","#7cc7ff":"light blue","#8fe3c0":"mint green","#c9a7ff":"lavender","#ffd166":"yellow","#3a4152":"dark navy","#44557a":"indigo denim blue","#2f3542":"charcoal gray","#e8e2d6":"cream","#a83c46":"red","#5e2233":"burgundy","#26262b":"black","#7c4a2d":"brown","#3d5a80":"steel blue","#d8b25c":"gold","#b03050":"wine red","#2e5e4e":"deep green","#f2a65a":"apricot","#5b4a68":"muted plum","#8a6642":"camel","#606c38":"olive green","#c0c6cc":"silver gray","#b08954":"tan","#2c3a55":"navy","#7a2e3a":"wine","#6b7250":"khaki olive"},pS={bob:"a bob cut",long:"long hair",short:"short hair",ponytail:"a ponytail",bun:"a hair bun"},Vh={shoulderWidth:{low:"narrow shoulders",high:"broad shoulders"},waist:{low:"a slim waist",high:"a wide waist"},hip:{low:"narrow hips",high:"wide hips"},bust:{low:"a small bust",high:"a full bust"},build:{low:"a slim build",high:"a sturdy build"},eyeSize:{low:"small eyes",high:"large eyes"},eyeSpacing:{low:"close-set eyes",high:"wide-set eyes"},eyeShape:{low:"almond-shaped eyes",high:"round eyes"},noseWidth:{low:"a narrow nose",high:"a wide nose"},noseProminence:{low:"a small nose",high:"a prominent nose"},lipWidth:{low:"a small mouth",high:"a wide mouth"},lipFullness:{low:"thin lips",high:"full lips"},faceWidth:{low:"a narrow face",high:"a wide face"}},mS=["very pale skin","pale skin","light skin","a medium skin tone","brown skin","deep brown skin"],gS={tee:"T-shirt",hoodie:"hoodie",blouse:"blouse",dress:"one-piece dress",dressLong:"long one-piece dress"},_S={jacket:"a jacket",coat:"a long coat",cardigan:"a knit cardigan"},vS={skirt:"a skirt",skirtLong:"a long skirt",pants:"pants",shorts:"shorts"},yS={flats:"flat shoes",sneakers:"sneakers",pumps:"pumps",boots:"boots"},xS={cap:"a baseball cap",beanie:"a knit beanie",catears:"a cat-ear headband",ribbon:"a ribbon in the hair"},SS={round:"round glasses",square:"square glasses",sunglasses:"sunglasses"},MS={necklace:"a necklace",scarf:"a scarf",bag:"a shoulder bag"},bS={stand:"standing",wave:"waving one hand",cheer:"both arms raised in celebration",peace:"making a peace sign",relax:"a relaxed pose"};function ES(i,e){const t=Vh[i],n=on[i];if(!t||n.kind!=="range")return null;const s=n.max-n.min;if(s<=0)return null;const r=(e-n.min)/s,o=(n.def-n.min)/s;return r-o>.22?t.high:o-r>.22?t.low:null}const wS="minor, child, teenager, young-looking, school uniform, loli, nsfw, nude, naked, blurry, lowres, deformed hands, extra fingers, extra limbs, watermark, text";function Rr(i,e={}){var f;const t=i.character,n=[];e.forImg2Img?(n.push("the same fictional adult character as the input image"),n.push("keep the same face, hairstyle and outfit")):n.push("full-body portrait of a fictional adult character, one adult person");const s=["I","II","III","IV","V","VI"].indexOf(Rl(t.skinTone));n.push(mS[Math.max(0,s)]);const r=on.height;if(r.kind==="range"){const h=(t.height-r.min)/(r.max-r.min);h<.25?n.push("short in stature"):h>=.75?n.push("very tall"):h>=.5&&n.push("tall")}for(const h of Object.keys(Vh)){const g=ES(h,t[h]);g&&n.push(g)}const o=hS[t.hairColor]??"natural-colored",a=pS[t.hairStyle]??"a simple hairstyle";n.push(`${o} hair in ${a}`);const l=fS[t.eyeColor]??"dark";n.push(`${l} eyes`);const c=fo[i.topColor]??"";if(n.push(`wearing a ${c} ${gS[i.topStyle]??"top"}`.replace(/\s+/g," ")),i.outerStyle!=="none"){const h=fo[i.outerColor]??"";n.push(`${h} ${_S[i.outerStyle]??"outerwear"} over it`.replace(/\s+/g," "))}if(i.bottomStyle!=="none"&&!Xo(i.topStyle)){const h=fo[i.bottomColor]??"";n.push(`${h} ${vS[i.bottomStyle]??""}`.replace(/\s+/g," "))}const u=fo[i.shoeColor]??"";n.push(`${u} ${yS[i.shoeStyle]??"shoes"}`.replace(/\s+/g," ")),i.hat!=="none"&&n.push(xS[i.hat]??""),i.glasses!=="none"&&n.push(SS[i.glasses]??""),i.accessory!=="none"&&n.push(MS[i.accessory]??""),n.push(bS[i.pose]??"standing"),n.push("in a boutique fitting room, soft studio lighting, high quality, detailed");const d=(f=e.extra)==null?void 0:f.trim();return d&&n.push(d),{prompt:n.filter(Boolean).join(", "),negativePrompt:wS}}function TS(i){return i.startsWith("data:")?i:`data:image/png;base64,${i}`}function AS(i){const e=i.indexOf(",");return i.startsWith("data:")&&e>=0?i.slice(e+1):i}function No(i){return Math.max(64,Math.round(i/8)*8)}async function Gh(i,e,t,n,s){const r=await Hh(Bh(i.endpoint,e),{method:"POST",headers:zh(i),body:JSON.stringify(t)},3e5,s);if(!r.ok)throw new Error(`HTTP ${r.status}`);const o=await r.json(),a=Array.isArray(o.images)?o.images.filter(l=>typeof l=="string"&&l.length>0):[];if(!a.length)throw new Error("the server returned no image");return{dataUrl:TS(a[0]),prompt:n}}async function RS(i,e,t={},n=fetch){if(!ds(i.endpoint))throw new Error("invalid endpoint URL");return Gh(i,"txt2img",{prompt:e.prompt,negative_prompt:e.negativePrompt,steps:t.steps??20,cfg_scale:t.cfgScale??7,sampler_name:t.sampler??"Euler a",width:No(t.width??768),height:No(t.height??768),batch_size:1,n_iter:1},e.prompt,n)}async function CS(i,e,t,n,s={},r=fetch){if(!ds(i.endpoint))throw new Error("invalid endpoint URL");return Gh(i,"img2img",{prompt:e.prompt,negative_prompt:e.negativePrompt,init_images:[AS(t)],denoising_strength:s.denoisingStrength??.65,steps:s.steps??20,cfg_scale:s.cfgScale??7,sampler_name:s.sampler??"Euler a",width:No(s.width??n.width),height:No(s.height??n.height),resize_mode:0,batch_size:1,n_iter:1},e.prompt,r)}const Wh="fitting-room.lang.v1",rn=document.getElementById("gl");ah(wy(localStorage.getItem(Wh)));document.documentElement.lang=Si();const we=Yy(rn);let wt=null,xt=mx(),re=ft(Mh(xt).seed)??sh();const si=th(re.character);we.scene.add(si.root);we.setSubjectHeight(re.character.height);qo(si,re);const PS=[{id:"looks",key:"cat.looks"},{id:"tops",key:"cat.tops"},{id:"outer",key:"cat.outer"},{id:"bottoms",key:"cat.bottoms"},{id:"shoes",key:"cat.shoes"},{id:"hat",key:"cat.hat"},{id:"glasses",key:"cat.glasses"},{id:"accessory",key:"cat.accessory"},{id:"pose",key:"cat.pose"},{id:"character",key:"cat.character"},{id:"llm",key:"cat.llm"}];let Qt="looks";function ee(i,e,t){const n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Xh(){Gv(re),xt=gx(xt,ct(re)),er(xt)}let Cr=Rh();function pn(i,e,t={}){var r;const n={at:Date.now(),kind:i,seed:e};t.parents&&(n.parents=t.parents),t.source&&(n.source=t.source),t.strength&&(n.strength=t.strength);const s=((r=ft(e))==null?void 0:r.name)??"";s&&(n.name=s),Cr=Cx(n)}function qh(i,e){for(const t of i)t.type==="blend_characters"&&pn("blend",ct(e),{parents:[t.seedA,t.seedB]})}function Yh(i){for(const e of i.mutations)pn("mutate",e.seed,{source:e.source,strength:e.strength})}let In=rx(),ts=null,Oo="";function ns(i){const e=[{label:D(`top.${i.topStyle}`),color:i.topColor}];return i.outerStyle!=="none"&&e.push({label:D(`outer.${i.outerStyle}`),color:i.outerColor}),i.bottomStyle!=="none"&&!Xo(i.topStyle)&&e.push({label:D(`bottom.${i.bottomStyle}`),color:i.bottomColor}),e.push({label:D(`shoe.${i.shoeStyle}`),color:i.shoeColor}),i.hat!=="none"&&e.push({label:D(`hat.${i.hat}`)}),i.glasses!=="none"&&e.push({label:D(`glasses.${i.glasses}`)}),i.accessory!=="none"&&e.push({label:D(`accessory.${i.accessory}`)}),e}function LS(i){return ns(i).map(e=>e.label).join(" ・ ")}function td(){const i=us(Oo);if(!i){Lt(D("ui.lookNameRequired"));return}In=ox(In,i,xr(re)),yh(In),Oo="",Lt(D("ui.lookSaved")),Je()}function DS(i){const e=In.find(t=>t.id===i);e&&(rt({...re,...e.look}),Lt(D("ui.lookApplied")))}function IS(i){In=ax(In,i),yh(In),Je()}function US(){ts&&(rt({...re,...ts}),Lt(D("ui.swapped")))}function rt(i){Ln=null,kt=null,mn=null,Ti=!1;const e=Xs(i);ix(xr(re),xr(e))||(ts=xr(re)),re=e,si.setCharacter(re.character),we.setSubjectHeight(re.character.height),qo(si,re),Xh(),Je(),wt==null||wt.refreshPanel()}function po(i){Ln=null,kt=null,mn=null,Ti=!1,re={...re,character:Qs({...re.character,...i})},si.setCharacter(re.character),we.setSubjectHeight(re.character.height),Xh();const e=document.getElementById("seed-value");e&&(e.textContent=ct(re))}let Mi=Qx(),bi=!1,Zi=null;const Xn=[];let Ei=lS(),wi=!1,En=null,Ji="",wn=null,Eo="",wo="",Ln=null;function tr(i){si.setCharacter(i),we.setSubjectHeight(i.height),qo(si,{...re,character:i})}function NS(){const i=ft(Eo),e=ft(wo);if(!i||!e){Lt(D("ui.seedInvalid"));return}const t=Math.floor(Math.random()*4294967296)>>>0;Ln=Eh(i.character,e.character,t),tr(Ln),Lt(D("genetics.created")),Je()}function OS(i){const e=us(i);if(e===re.name){Je();return}const t={...re,name:e};pn("rename",ct(t)),rt(t)}function FS(){const i=ct({...At});xt=_x(xt,i),er(xt),pn("create",i),rt(ft(i)??{...At})}function kS(i){const e=xt.entries.find(n=>n.id===i);if(!e||i===xt.currentId)return;const t=ft(e.seed);t&&(xt={...xt,currentId:i},er(xt),Ys=null,rt(t))}function BS(i){const e=i===xt.currentId;if(xt=vx(xt,i),er(xt),Ys===i&&(Ys=null),e){const t=ft(Mh(xt).seed);t?rt(t):Je()}else Je()}function zS(i,e){const t=yx(xt,i,us(e));if(Ys=null,!t){Je();return}xt=t,er(xt);const n=xt.entries.find(s=>s.id===i);if(n&&pn("rename",n.seed),i===xt.currentId&&n){const s=ft(n.seed);s?rt(s):Je()}else Je()}let Ys=null,Pr="standard",kt=null,mn=null;function Fo(i){return{...re,character:i,name:""}}function HS(i){tr(i),we.renderer.render(we.scene,we.camera);const e=200,t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");if(!n)return"";const s=Math.min(rn.width,rn.height);return n.drawImage(rn,(rn.width-s)/2,(rn.height-s)/2,s,s,0,0,e,e),t.toDataURL("image/jpeg",.85)}function $h(){const i=Math.floor(Math.random()*4294967296)>>>0,e=Ex(re.character,i,Pr),t=e.map(n=>HS(n));kt={list:e,thumbs:t,strength:Pr},mn=null,tr(re.character),we.renderer.render(we.scene,we.camera),Lt(D("mutation.created")),Je()}function VS(i){!kt||!kt.list[i]||(mn=i,tr(kt.list[i]),Je())}function GS(){if(!kt||mn===null)return;const i=kt.list[mn],e=Fo(i);pn("mutate",ct(e),{source:ct(re),strength:kt.strength}),rt(e),Lt(D("mutation.applied"))}function WS(){mn=null,tr(re.character),Je()}let Ti=!1;function XS(){Ti=!1,Qt="character",Ko(),Pr="standard",$h()}function jh(){const i=e=>{var t;return((t=document.getElementById(e))==null?void 0:t.value.trim())??""};return{endpoint:i("llm-endpoint"),apiKey:i("llm-apikey"),model:i("llm-model")}}function qS(){const i=jh();if(i.endpoint&&!ds(i.endpoint)){Zi={kind:"ng",text:D("llm.invalidEndpoint")},Je();return}Mi=i,eS(Mi),Zi={kind:"ok",text:D("llm.saved")},Je()}async function YS(){const i=jh();bi=!0,Zi={kind:"ok",text:D("llm.testing")},Je();const e=await iS(i);bi=!1,Zi=e.ok?{kind:"ok",text:e.models.length?`${D("llm.testOk")}: ${e.models.join(", ")}`:D("llm.testOk")}:{kind:"ng",text:`${D("llm.testFail")}: ${e.error}`},Je()}async function nd(){const i=document.getElementById("llm-chat-input"),e=(i==null?void 0:i.value.trim())??"";if(!(!e||bi)){if(Xn.push({who:"you",text:e}),!Mi.endpoint){Xn.push({who:"sys",text:D("llm.notConfigured")}),Je();return}if(!Mi.model.trim()){Xn.push({who:"sys",text:D("llm.modelMissing")}),Je();return}bi=!0,Je();try{const t=await aS(Mi,re,e,Si());t.reply&&Xn.push({who:"ai",text:t.reply});const{validation:n}=t;if(n.commands.length){const s=Dh(n.commands,re);qh(n.commands,s.outfit),Yh(s),n.commands.some(r=>r.type!=="get_state")&&rt(s.outfit),s.applied.length&&Xn.push({who:"sys",text:`${D("llm.applied")}: ${s.applied.join("; ")}`}),s.stateRequested&&Xn.push({who:"sys",text:JSON.stringify(re)}),s.wantShareCard&&tf()}n.rejected.length&&Xn.push({who:"sys",text:`${D("llm.rejected")}: ${n.rejected.map(s=>s.reason).join("; ")}`})}catch(t){Xn.push({who:"sys",text:`${D("llm.error")}: ${t instanceof Error?t.message:String(t)}`})}bi=!1,Je()}}function Kh(){const i=e=>{var t;return((t=document.getElementById(e))==null?void 0:t.value.trim())??""};return{endpoint:i("sd-endpoint"),apiKey:i("sd-auth")}}function $S(){const i=Kh();if(i.endpoint&&!ds(i.endpoint)){En={kind:"ng",text:D("llm.invalidEndpoint")},Je();return}Ei=i,cS(Ei),En={kind:"ok",text:D("llm.saved")},Je()}async function jS(){const i=Kh();wi=!0,En={kind:"ok",text:D("llm.testing")},Je();const e=await dS(i);wi=!1,En=e.ok?{kind:"ok",text:e.models.length?`${D("llm.testOk")}: ${e.models.join(", ")}`:D("llm.testOk")}:{kind:"ng",text:`${D("llm.testFail")}: ${e.error}`},Je()}function KS(){we.renderer.render(we.scene,we.camera);const i=Math.min(1,768/Math.max(rn.width,rn.height)),e=Math.max(8,Math.round(rn.width*i/8)*8),t=Math.max(8,Math.round(rn.height*i/8)*8),n=document.createElement("canvas");n.width=e,n.height=t;const s=n.getContext("2d");if(!s)throw new Error("2d context unavailable");return s.drawImage(rn,0,0,e,t),{dataUrl:n.toDataURL("image/png"),width:e,height:t}}async function id(i){if(!wi){if(!Ei.endpoint){En={kind:"ng",text:D("sd.notConfigured")},Je();return}wi=!0,En={kind:"ok",text:D("sd.generating")},Je();try{let e;if(i==="img2img"){const t=KS(),n=Rr(re,{extra:Ji,forImg2Img:!0});e=await CS(Ei,n,t.dataUrl,{width:t.width,height:t.height})}else{const t=Rr(re,{extra:Ji});e=await RS(Ei,t)}wn={dataUrl:e.dataUrl,seed:ct(re)},En={kind:"ok",text:D("sd.resultTitle")}}catch(e){En={kind:"ng",text:`${D("llm.error")}: ${e instanceof Error?e.message:String(e)}`}}wi=!1,Je()}}function JS(i){var r;const e=i.indexOf(","),t=((r=/data:([^;]+)/.exec(i.slice(0,e)))==null?void 0:r[1])??"application/octet-stream",n=atob(i.slice(e+1)),s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return new Blob([s],{type:t})}function ZS(){wn&&Ur(JS(wn.dataUrl),"3d-fitting-room-ai.png")}async function Jh(){if(!wn)return null;const i=wn,e=new Image;await new Promise((n,s)=>{e.onload=()=>n(),e.onerror=()=>s(new Error("generated image could not be loaded")),e.src=i.dataUrl});const t=ft(i.seed);return gh(e,{appName:D("app.title"),workingTitleNote:D("app.workingTitle"),tagline:D("app.tagline"),seed:i.seed,look:t?ns(t):[],name:(t==null?void 0:t.name)??""})}async function QS(){const i=await Jh();i&&(Ur(i,"3d-fitting-room-card-ai.png"),Lt(D("sd.cardSaved")))}function Ye(i,e,t){const n=ee("button","chip",i);return n.type="button",n.setAttribute("aria-pressed",String(e)),n.addEventListener("click",t),n}function Ko(){document.getElementById("tabs").replaceChildren(...PS.map(({id:e,key:t})=>{const n=ee("button",void 0,D(t));return n.type="button",n.setAttribute("aria-pressed",String(Qt===e)),n.addEventListener("click",()=>{Qt=e,Ko(),Je()}),n}))}function Je(){var n,s,r;const i=document.getElementById("options"),e=[],t=(o,a)=>`${o}.${a}`;if(Ti){const o=ee("div","restored-block");o.id="restored-notice",o.append(ee("p","restored-note",D("restore.note")));const a=ee("div","seed-row"),l=Ye(D("restore.makeMine"),!1,XS);l.id="btn-make-mine",l.classList.add("primary");const c=Ye(D("restore.dismiss"),!1,()=>{Ti=!1,Je()});c.id="btn-restore-dismiss",a.append(l,c),o.append(a),e.push(o)}if(Qt==="looks"){e.push(ee("span","group-label",D("ui.currentLook"))),e.push(ee("p","llm-note",LS(re)));const o=ee("div","seed-row"),a=ee("input","seed-input");a.id="look-name",a.type="text",a.value=Oo,a.placeholder=D("ui.lookNamePlaceholder"),a.setAttribute("aria-label",D("ui.saveLook")),a.addEventListener("input",()=>{Oo=a.value}),a.addEventListener("keydown",c=>{c.key==="Enter"&&td()});const l=Ye(D("ui.saveLook"),!1,td);l.id="look-save",o.append(a,l),e.push(o),In.length===0&&e.push(ee("p","llm-note",D("ui.looksEmpty")));for(const c of In){const u=ee("div","seed-row"),d=Ye(c.name,!1,()=>DS(c.id));d.classList.add("look-apply");const f=Ye(D("ui.delete"),!1,()=>IS(c.id));f.classList.add("look-delete"),u.append(d,f),e.push(u),e.push(ee("p","llm-note",ns({...re,...c.look}).map(h=>h.label).join(" ・ ")))}if(ts){e.push(ee("span","group-label",D("ui.prevLook"))),e.push(ee("p","llm-note",ns({...re,...ts}).map(d=>d.label).join(" ・ ")));const c=ee("div","seed-row"),u=Ye(D("ui.swapLook"),!1,US);u.id="look-swap",c.append(u),e.push(c)}}else if(Qt==="character"){const o=re.character;e.push(ee("p","principle-note",D("principle.note"))),e.push(ee("span","group-label",D("ui.name")));const a=ee("div","seed-row"),l=ee("input","seed-input");l.id="person-name",l.type="text",l.value=re.name,l.placeholder=D("ui.namePlaceholder"),l.setAttribute("aria-label",D("ui.name")),l.addEventListener("change",()=>OS(l.value)),a.append(l),e.push(a),e.push(ee("p","llm-note",D("ui.nameNote")));const c=ee("div","slider-row"),u=ee("span","slider-val",Rl(o.skinTone)),d=ee("input","slider");d.type="range",d.min="0",d.max="1000",d.step="1",d.value=String(Math.round(o.skinTone*1e3)),d.setAttribute("aria-label",D("ui.skinTone")),d.addEventListener("input",()=>{const F=Number(d.value)/1e3;po({skinTone:F}),u.textContent=Rl(F)}),d.addEventListener("change",()=>Je()),c.append(ee("span","slider-label",D("ui.skinTone")),d,u),e.push(c);const f=(F,se,K,pe,ue,Ee)=>{const Ve=ee("div","slider-row"),Be=ee("span","slider-val",ue(se)),ze=ee("input","slider");return ze.type="range",ze.min=String(K),ze.max=String(pe),ze.step=String((pe-K)/200),ze.value=String(se),ze.setAttribute("aria-label",F),ze.addEventListener("input",()=>{const N=Number(ze.value);Ee(N),Be.textContent=ue(N)}),ze.addEventListener("change",()=>Je()),Ve.append(ee("span","slider-label",F),ze,Be),Ve},h=F=>`${F>=0?"+":""}${Math.round(F*1e3)} mm`,g=F=>`${F>=0?"+":""}${Math.round(F*180/Math.PI)}°`,x=(F,se)=>{switch(F){case"eyeHeight":case"browHeight":return h;case"eyeTilt":case"browTilt":return g;case"asymmetry":return K=>`${Math.round(K*100)}%`;default:return K=>`${Math.round(K/se*100)}%`}},m=ee("div","slider-row"),p=Math.round(o.height*100),b=ee("span","slider-val",`${p} cm`),S=ee("input","slider");S.type="range",S.min=String(Math.round(Ar*100)),S.max=String(Math.round(Qd*100)),S.step="1",S.value=String(p),S.setAttribute("aria-label",D("ui.height")),S.addEventListener("input",()=>{const F=Number(S.value);po({height:F/100}),b.textContent=`${F} cm`}),S.addEventListener("change",()=>Je()),m.append(ee("span","slider-label",D("ui.height")),S,b),e.push(m),e.push(ee("span","group-label",D("ui.body")));for(const F of Ql){const se=on[F];se.kind==="range"&&e.push(f(D(`body.${F}`),o[F],se.min,se.max,K=>`${Math.round(K/se.def*100)}%`,K=>po({[F]:K})))}e.push(ee("span","group-label",D("ui.face")));for(const F of ec){const se=on[F];se.kind==="range"&&e.push(f(D(`face.${F}`),o[F],se.min,se.max,x(F,se.def),K=>po({[F]:K})))}e.push(ee("span","group-label",D("ui.hairStyle")));for(const F of Er)e.push(Ye(D(t("hair",F)),o.hairStyle===F,()=>rt({...re,character:{...o,hairStyle:F}})));const v=(F,se,K,pe)=>{const ue=ee("button","swatch");return ue.type="button",ue.style.background=F,ue.setAttribute("aria-pressed",String(se)),ue.setAttribute("aria-label",`${K} ${F}`),ue.addEventListener("click",pe),ue};e.push(ee("span","group-label",D("ui.hairColor")));for(const F of wr)e.push(v(F,o.hairColor===F,D("ui.hairColor"),()=>rt({...re,character:{...o,hairColor:F}})));e.push(ee("span","group-label",D("ui.eyeColor")));for(const F of Tr)e.push(v(F,o.eyeColor===F,D("ui.eyeColor"),()=>rt({...re,character:{...o,eyeColor:F}})));e.push(ee("span","group-label",D("ui.seed")));const A=ee("div","seed-row"),w=ee("code","seed-value",ct(re));w.id="seed-value";const T=Ye(D("ui.copy"),!1,()=>{var F;try{(F=navigator.clipboard)==null||F.writeText(ct(re)).then(()=>Lt(D("ui.seedCopied"))).catch(()=>{})}catch{}});A.append(w,T),e.push(A);const C=ee("div","seed-row"),_=ee("input","seed-input");_.type="text",_.placeholder="FR1-…",_.setAttribute("aria-label",D("ui.seed"));const y=Ye(D("ui.seedApply"),!1,()=>{const F=ft(_.value);F?(pn("restore",ct(F)),rt(F),Ti=!0,Je()):Lt(D("ui.seedInvalid"))});C.append(_,y),e.push(C);const P=ee("div","seed-row");P.append(Ye(D("ui.cardLoad"),!1,()=>Ai.click())),e.push(P),e.push(ee("span","group-label",D("ui.roster")));const H=[...xt.entries].sort((F,se)=>se.updatedAt-F.updatedAt);for(const F of H){const se=ee("div","seed-row"),K=ft(F.seed),pe=(K==null?void 0:K.name)||D("ui.unnamed");if(Ys===F.id){const ue=ee("input","seed-input");ue.type="text",ue.value=(K==null?void 0:K.name)??"",ue.placeholder=D("ui.namePlaceholder"),ue.setAttribute("aria-label",D("ui.name")),ue.addEventListener("change",()=>zS(F.id,ue.value)),se.append(ue)}else{const ue=F.id===xt.currentId,Ee=Si()==="ja"||Si()==="zh",Ve=Ye(ue?Ee?`${pe}（${D("ui.currentPerson")}）`:`${pe} (${D("ui.currentPerson")})`:pe,ue,()=>kS(F.id));Ve.classList.add("roster-load"),se.append(Ve);const Be=Ye(D("ui.rename"),!1,()=>{Ys=F.id,Je()});Be.classList.add("roster-rename");const ze=Ye(D("ui.delete"),!1,()=>BS(F.id));ze.classList.add("roster-delete"),se.append(Be,ze)}e.push(se)}const U=ee("div","seed-row"),q=Ye(D("ui.newPerson"),!1,FS);q.id="roster-new",U.append(q),e.push(U),e.push(ee("span","group-label",D("ui.export3d"))),e.push(ee("p","llm-note",D("export.note")));const j=ee("div","seed-row"),W=Ye(D("ui.exportGlb"),!1,()=>rd("glb"));W.id="btn-export-glb";const Z=Ye(D("ui.exportVrm"),!1,()=>rd("vrm"));Z.id="btn-export-vrm",j.append(W,Z),e.push(j),e.push(ee("span","group-label",D("genetics.title"))),e.push(ee("p","llm-note",D("genetics.note")));const G=(F,se,K,pe)=>{const ue=ee("div","seed-row"),Ee=ee("input","seed-input");Ee.id=se,Ee.type="text",Ee.value=K,Ee.placeholder="FR1-…",Ee.setAttribute("aria-label",D(F)),Ee.addEventListener("input",()=>pe(Ee.value));const Ve=Ye(D("genetics.useCurrent"),!1,()=>{pe(ct(re)),Je()});return ue.append(Ee,Ve),ue};e.push(ee("span","group-label",D("genetics.personA"))),e.push(G("genetics.personA","blend-seed-a",Eo,F=>{Eo=F})),e.push(ee("span","group-label",D("genetics.personB"))),e.push(G("genetics.personB","blend-seed-b",wo,F=>{wo=F}));const de=ee("div","seed-row"),_e=Ye(D("genetics.generate"),!1,NS);if(_e.id="blend-generate",de.append(_e),e.push(de),Ln){e.push(ee("span","group-label",D("genetics.result")));const F=ee("div","seed-row"),se=ee("code","seed-value",ct({...re,character:Ln,name:""}));se.id="blend-child-seed",F.append(se),e.push(F);const K=ee("div","seed-row"),pe=Ye(D("genetics.apply"),!1,()=>{if(!Ln)return;const Ee=Ln,Ve=[Eo.trim(),wo.trim()];Ln=null;const Be={...re,character:Ee,name:""};pn("blend",ct(Be),{parents:Ve}),rt(Be)});pe.id="blend-apply";const ue=Ye(D("genetics.cancel"),!1,()=>{Ln=null,tr(re.character),Je()});ue.id="blend-cancel",K.append(pe,ue),e.push(K)}e.push(ee("span","group-label",D("ui.history"))),e.push(ee("p","llm-note",D("ui.historyNote")));const Te=[...Cr].reverse().slice(0,20);for(const F of Te){const se=ee("div","seed-row"),K=ft(F.seed),pe=F.name||(K==null?void 0:K.name)||D("ui.unnamed"),ue=new Date(F.at).toLocaleString(my[Si()],{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),Ee=Ye(`${ue} · ${D(`history.${F.kind}`)} · ${pe}`,!1,()=>{const Ve=ft(F.seed);Ve&&(pn("restore",ct(Ve)),rt(Ve),Lt(D("ui.historyRestored")))});if(Ee.classList.add("history-load"),se.append(Ee),e.push(se),F.kind==="blend"&&F.parents){const Ve=((n=ft(F.parents[0]))==null?void 0:n.name)||D("ui.unnamed"),Be=((s=ft(F.parents[1]))==null?void 0:s.name)||D("ui.unnamed");e.push(ee("p","llm-note",`${D("history.parents")}: ${Ve} × ${Be}`))}if(F.kind==="mutate"&&F.source){const Ve=((r=ft(F.source))==null?void 0:r.name)||D("ui.unnamed");e.push(ee("p","llm-note",`${D("history.source")}: ${Ve}`))}}e.push(ee("span","group-label",D("mutation.title"))),e.push(ee("p","llm-note",D("mutation.note")));const Ue=ee("div","seed-row");for(const F of sc){const se=Ye(D(`mutation.${F}`),Pr===F,()=>{Pr=F,Je()});se.id=`mutation-strength-${F}`,Ue.append(se)}e.push(Ue);const Ze=ee("div","seed-row"),J=Ye(D("mutation.generate"),!1,$h);if(J.id="mutation-generate",Ze.append(J),e.push(Ze),kt){e.push(ee("span","group-label",D("mutation.candidates")));const F=ee("div","mutation-thumbs");if(kt.list.forEach((se,K)=>{const pe=ee("button","mutation-thumb");pe.type="button",pe.id=`mutation-candidate-${K}`,pe.setAttribute("aria-pressed",String(mn===K)),pe.setAttribute("aria-label",`${D("mutation.candidates")} ${K+1}`);const ue=ee("img");ue.src=kt.thumbs[K],ue.alt="",pe.append(ue),pe.addEventListener("click",()=>VS(K)),F.append(pe)}),e.push(F),mn!==null){const se=ee("div","seed-row"),K=ee("code","seed-value",ct(Fo(kt.list[mn])));K.id="mutation-candidate-seed",se.append(K),e.push(se);const pe=ee("div","seed-row"),ue=Ye(D("mutation.apply"),!1,GS);ue.id="mutation-apply";const Ee=Ye(D("mutation.cancel"),!1,WS);Ee.id="mutation-cancel",pe.append(ue,Ee),e.push(pe)}}}else if(Qt==="tops"){for(const o of Li)e.push(Ye(D(t("top",o)),re.topStyle===o,()=>rt({...re,topStyle:o})));e.push(ee("span","group-label",D("ui.color")));for(const o of Pi){const a=ee("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.topColor===o)),a.setAttribute("aria-label",`${D("ui.color")} ${o}`),a.addEventListener("click",()=>rt({...re,topColor:o})),e.push(a)}}else if(Qt==="outer"){for(const o of cs)e.push(Ye(D(o==="none"?"item.none":t("outer",o)),re.outerStyle===o,()=>rt({...re,outerStyle:o})));e.push(ee("span","group-label",D("ui.color")));for(const o of os){const a=ee("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.outerColor===o)),a.setAttribute("aria-label",`${D("ui.color")} ${o}`),a.addEventListener("click",()=>rt({...re,outerColor:o})),e.push(a)}}else if(Qt==="bottoms"){for(const o of as)e.push(Ye(D(o==="none"?"item.none":t("bottom",o)),re.bottomStyle===o,()=>rt({...re,bottomStyle:o})));Xo(re.topStyle)&&e.push(ee("span","group-label",D("ui.dressHidesBottom"))),e.push(ee("span","group-label",D("ui.color")));for(const o of ss){const a=ee("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.bottomColor===o)),a.setAttribute("aria-label",`${D("ui.color")} ${o}`),a.addEventListener("click",()=>rt({...re,bottomColor:o})),e.push(a)}}else if(Qt==="shoes"){for(const o of ls)e.push(Ye(D(t("shoe",o)),re.shoeStyle===o,()=>rt({...re,shoeStyle:o})));e.push(ee("span","group-label",D("ui.color")));for(const o of rs){const a=ee("button","swatch");a.type="button",a.style.background=o,a.setAttribute("aria-pressed",String(re.shoeColor===o)),a.setAttribute("aria-label",`${D("ui.color")} ${o}`),a.addEventListener("click",()=>rt({...re,shoeColor:o})),e.push(a)}}else if(Qt==="hat")for(const o of Di)e.push(Ye(D(o==="none"?"item.none":t("hat",o)),re.hat===o,()=>rt({...re,hat:o})));else if(Qt==="glasses")for(const o of Ii)e.push(Ye(D(o==="none"?"item.none":t("glasses",o)),re.glasses===o,()=>rt({...re,glasses:o})));else if(Qt==="accessory")for(const o of Ui)e.push(Ye(D(o==="none"?"item.none":t("accessory",o)),re.accessory===o,()=>rt({...re,accessory:o})));else if(Qt==="pose")for(const o of Ni)e.push(Ye(D(t("pose",o)),re.pose===o,()=>rt({...re,pose:o})));else if(Qt==="llm"){const o=ee("div","llm-block");o.append(ee("span","group-label",D("llm.settingsTitle")));const a=(_,y,P,H,U="text")=>{const q=ee("div","form-row"),j=ee("label","form-label",D(_));j.htmlFor=y;const W=ee("input","form-input");return W.id=y,W.type=U,W.value=P,W.placeholder=H,W.autocomplete="off",q.append(j,W),q};o.append(a("llm.endpoint","llm-endpoint",Mi.endpoint,"http://localhost:11434/v1")),o.append(a("llm.apiKey","llm-apikey",Mi.apiKey,"","password")),o.append(a("llm.model","llm-model",Mi.model,"llama3.1"));const l=ee("div","chat-row"),c=Ye(D("llm.save"),!1,qS);c.id="llm-save";const u=Ye(D("llm.test"),!1,()=>void YS());u.id="llm-test",u.disabled=bi,l.append(c,u),Zi&&l.append(ee("span",`llm-status ${Zi.kind}`,Zi.text)),o.append(l),o.append(ee("p","llm-note",D("llm.note"))),o.append(ee("span","group-label",D("llm.chatTitle")));const d=ee("div","chat-log");d.id="llm-chat-log";for(const _ of Xn){const y=ee("div",`chat-msg ${_.who}`),P=ee("span","who",_.who==="you"?D("llm.you"):_.who==="ai"?D("llm.ai"):">");y.append(P,document.createTextNode(_.text)),d.append(y)}if(bi){const _=ee("div","chat-msg sys");_.append(ee("span","who",">"),document.createTextNode(D("llm.thinking"))),d.append(_)}o.append(d);const f=ee("div","chat-row"),h=ee("input","form-input");h.id="llm-chat-input",h.type="text",h.placeholder=D("llm.chatPlaceholder"),h.setAttribute("aria-label",D("llm.chatTitle")),h.addEventListener("keydown",_=>{_.key==="Enter"&&nd()});const g=Ye(D("llm.send"),!1,()=>void nd());g.id="llm-send",g.disabled=bi,f.append(h,g),o.append(f),o.append(ee("span","group-label",D("sd.settingsTitle"))),o.append(a("sd.endpoint","sd-endpoint",Ei.endpoint,"http://localhost:7860")),o.append(a("sd.auth","sd-auth",Ei.apiKey,"","password"));const x=ee("div","chat-row"),m=Ye(D("llm.save"),!1,$S);m.id="sd-save";const p=Ye(D("llm.test"),!1,()=>void jS());if(p.id="sd-test",p.disabled=wi,x.append(m,p),En){const _=ee("span",`llm-status ${En.kind} sd-status`,En.text);x.append(_)}o.append(x),o.append(ee("p","llm-note",D("sd.note"))),o.append(ee("span","group-label",D("sd.promptTitle")));const b=ee("textarea","sd-prompt");b.id="sd-prompt-preview",b.readOnly=!0,b.value=Rr(re,{extra:Ji}).prompt,b.setAttribute("aria-label",D("sd.promptTitle")),o.append(b);const S=ee("div","form-row"),v=ee("label","form-label",D("sd.extraLabel"));v.htmlFor="sd-extra";const A=ee("input","form-input");A.id="sd-extra",A.type="text",A.value=Ji,A.placeholder=D("sd.extraPlaceholder"),A.autocomplete="off",A.addEventListener("input",()=>{Ji=A.value,b.value=Rr(re,{extra:Ji}).prompt}),S.append(v,A),o.append(S);const w=ee("div","chat-row"),T=Ye(D("sd.fromPhoto"),!1,()=>void id("img2img"));T.id="sd-gen-img2img",T.disabled=wi;const C=Ye(D("sd.fromText"),!1,()=>void id("txt2img"));if(C.id="sd-gen-txt2img",C.disabled=wi,w.append(T,C),o.append(w),wn){o.append(ee("span","group-label",D("sd.resultTitle")));const _=ee("img","sd-result-img");_.id="sd-result-img",_.src=wn.dataUrl,_.alt=D("sd.resultTitle"),o.append(_);const y=ee("div","chat-row"),P=Ye(D("sd.download"),!1,ZS);P.id="sd-download";const H=Ye(D("sd.toCard"),!1,()=>void QS());H.id="sd-card",y.append(P,H),o.append(y)}e.push(o)}i.replaceChildren(...e)}let sd=0;function Lt(i){const e=document.getElementById("toast");e.textContent=i,e.hidden=!1,window.clearTimeout(sd),sd=window.setTimeout(()=>{e.hidden=!0},2e3)}const Ai=document.createElement("input");Ai.type="file";Ai.accept="image/png";Ai.hidden=!0;document.body.appendChild(Ai);Ai.addEventListener("change",()=>{var e;const i=(e=Ai.files)==null?void 0:e[0];Ai.value="",i&&Qh(i)});async function Zh(i){const e=ex(i);if(!e)return!1;const t=ft(e);return t?(pn("restore",ct(t)),rt(t),Ti=!0,Je(),!0):!1}async function Qh(i){try{const e=await Zh(new Uint8Array(await i.arrayBuffer()));Lt(D(e?"ui.cardRestored":"ui.cardInvalid"))}catch{Lt(D("ui.cardInvalid"))}}window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",i=>{var t,n;i.preventDefault();const e=(n=(t=i.dataTransfer)==null?void 0:t.files)==null?void 0:n[0];e&&Qh(e)});function ef(){document.getElementById("app-title").textContent=D("app.title"),document.getElementById("working-title").textContent=D("app.workingTitle"),document.getElementById("tagline").textContent=D("app.tagline"),document.getElementById("footer-note").textContent=D("footer.note"),document.getElementById("footer-principle").textContent=D("principle.note"),document.getElementById("btn-photo").textContent=D("ui.savePhoto"),document.getElementById("btn-random").textContent=D("ui.random"),document.getElementById("btn-spin").textContent=D("ui.spin"),document.getElementById("btn-reset-view").textContent=D("ui.resetView");const i=document.getElementById("lang-select");if(i.options.length===0)for(const e of Pl){const t=document.createElement("option");t.value=e,t.textContent=py[e],i.append(t)}i.value=Si(),document.title=`${D("app.title")}（${D("app.workingTitle")}）`}async function tf(){we.renderer.render(we.scene,we.camera);const i=await mh(rn,{appName:D("app.title"),workingTitleNote:D("app.workingTitle"),tagline:D("app.tagline"),seed:ct(re),look:ns(re),name:re.name});Ur(i,"3d-fitting-room.png"),Lt(D("ui.saved"))}document.getElementById("btn-photo").addEventListener("click",()=>{tf()});function nf(i){return i==="vrm"?$x(re):Yx(re)}function rd(i){const{bytes:e}=nf(i);Ur(new Blob([e.buffer],{type:"model/gltf-binary"}),`fitting-room-character.${i}`),Lt(D("ui.exported"))}document.getElementById("btn-random").addEventListener("click",()=>{rt({...rh(),character:re.character,name:re.name})});const od=document.getElementById("btn-spin");od.addEventListener("click",()=>{we.controls.autoRotate=!we.controls.autoRotate,od.setAttribute("aria-pressed",String(we.controls.autoRotate))});document.getElementById("btn-reset-view").addEventListener("click",()=>{we.resetView()});document.getElementById("lang-select").addEventListener("change",i=>{const e=i.target.value;ah(e),document.documentElement.lang=e;try{localStorage.setItem(Wh,e)}catch{}ef(),Ko(),Je(),wt==null||wt.refreshPanel(),$s()});window.addEventListener("resize",()=>we.resize());Cr.length===0&&pn("create",ct(re));ef();Ko();Je();const eM="fitting-room.looks.v1";function sf(){try{const i=localStorage.getItem(eM);if(!i)return[];const e=JSON.parse(i);if(!Array.isArray(e))return[];const t=[];for(const n of e){if(typeof n!="object"||n===null)continue;const s=n;typeof s.id!="string"||!s.id||typeof s.name!="string"||!s.name.trim()||typeof s.look!="object"||s.look===null||t.push({id:s.id,name:s.name,look:s.look})}return t}catch{return[]}}function tM(i){const e=sf().find(t=>t.id===i);e&&rt({...re,...e.look})}const $i=600,qn=750,ad=new ni($i,qn),mo=new Wt(40,$i/qn,.1,60);let Ul=!1;async function rf(){const i=re.character.height;mo.position.set(0,i*.76,3.9),mo.lookAt(0,i*.54,0),mo.updateMatrixWorld();const e=we.renderer,t=e.xr.enabled;we.isPresenting()&&(e.xr.enabled=!1);const n=e.getRenderTarget();e.setRenderTarget(ad),e.render(we.scene,mo);const s=new Uint8Array($i*qn*4);e.readRenderTargetPixels(ad,0,0,$i,qn,s),e.setRenderTarget(n),we.isPresenting()&&(e.xr.enabled=t);const r=document.createElement("canvas");r.width=$i,r.height=qn;const o=r.getContext("2d");if(!o)throw new Error("2d context unavailable");const a=o.createImageData($i,qn),l=$i*4;for(let u=0;u<qn;u++)a.data.set(s.subarray((qn-1-u)*l,(qn-u)*l),u*l);o.putImageData(a,0,0);const c=new Image;return await new Promise((u,d)=>{c.onload=()=>u(),c.onerror=()=>d(new Error("vr photo image could not be loaded")),c.src=r.toDataURL("image/png")}),gh(c,{appName:D("app.title"),workingTitleNote:D("app.workingTitle"),tagline:D("app.tagline"),seed:ct(re),look:ns(re),name:re.name})}async function of(){try{const i=await rf();Ur(i,"3d-fitting-room.png"),Lt(D("ui.saved"))}catch{Lt(D("vr.sessionError"))}}function nM(){we.isPresenting()?Ul=!0:of()}wt=qy(we,{getOutfit:()=>re,applyPatch:i=>rt({...re,...i}),getLooks:()=>sf().map(i=>({id:i.id,name:i.name})),applyLook:tM,takePhoto:nM});let ks="unknown",Ps=null;function $s(){const i=document.getElementById("btn-vr"),e=document.getElementById("vr-note");i&&(i.hidden=ks!=="supported",i.textContent=we.isPresenting()?D("vr.exit"):D("vr.enter")),e&&(e.hidden=ks!=="unsupported",ks==="unsupported"&&(e.textContent=D("vr.unsupported")))}async function iM(){let i=!1;if(navigator.xr)try{i=await navigator.xr.isSessionSupported("immersive-vr")}catch{i=!1}ks=i?"supported":"unsupported",$s()}async function sM(){if(we.isPresenting()){try{await(Ps==null?void 0:Ps.end())}catch{}return}if(!navigator.xr||ks!=="supported")return;const i=we.renderer.getPixelRatio();we.renderer.setPixelRatio(1),we.resize();let e=null;try{e=await navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor"]}),Ps=e,e.addEventListener("end",()=>{Ps=null,we.renderer.setPixelRatio(i),we.resize(),$s()}),await we.renderer.xr.setSession(e)}catch{if(e){try{await e.end()}catch{}Ps=null}we.renderer.setPixelRatio(i),we.resize(),Lt(D("vr.sessionError"))}$s()}document.getElementById("btn-vr").addEventListener("click",()=>{sM()});we.renderer.xr.addEventListener("sessionstart",$s);we.renderer.xr.addEventListener("sessionend",$s);iM();const rM=new Cv,ld=new L;function oM(){const i=rM.getElapsedTime();we.camera.getWorldPosition(ld),si.tick(i,ld),we.tick(),wt==null||wt.update(),we.renderer.render(we.scene,we.camera),Ul&&(Ul=!1,of())}we.renderer.setAnimationLoop(oM);"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").catch(()=>{});const aM={ready:!0,getOutfit:()=>({...re}),setOutfit:i=>rt({...re,...i}),getSeed:()=>ct(re),setSeed:i=>{const e=ft(i);return e?(pn("restore",ct(e)),rt(e),!0):!1},getRoster:()=>({entries:xt.entries.map(i=>({...i})),currentId:xt.currentId}),getLineage:()=>Cr.map(i=>({...i})),getLooks:()=>In.map(i=>({...i,look:{...i.look}})),getPrevLook:()=>ts?{...ts}:null,runCommands:i=>{const e=Array.isArray(i)?i:typeof i=="object"&&i!==null&&Array.isArray(i.commands)?i.commands:i,t=Lh(e),n=Dh(t.commands,re);return qh(t.commands,n.outfit),Yh(n),t.commands.some(s=>s.type!=="get_state")&&rt(n.outfit),{applied:n.applied,rejected:t.rejected.map(s=>({reason:s.reason})),wantShareCard:n.wantShareCard,outfit:{...re}}},commandSpec:()=>Ih(),export3dInfo:i=>{const{bytes:e,parts:t,seed:n}=nf(i);let s="";const r=32768;for(let o=0;o<e.length;o+=r)s+=String.fromCharCode(...e.subarray(o,o+r));return{dataUrl:`data:model/gltf-binary;base64,${btoa(s)}`,parts:t,bytes:e.length,seed:n}},getMutationState:()=>({candidateSeeds:kt?kt.list.map(i=>ct(Fo(i))):[],selectedSeed:kt&&mn!==null?ct(Fo(kt.list[mn])):null,restoredNotice:Ti,history:Cr.filter(i=>i.kind==="mutate")}),getSdState:()=>({configured:!!Ei.endpoint,prompt:Rr(re,{extra:Ji}).prompt,hasResult:wn!==null,resultSeed:(wn==null?void 0:wn.seed)??null}),sdCardDataURL:async()=>{const i=await Jh();return i?new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)}):null},cardDataURL:async()=>{we.renderer.render(we.scene,we.camera);const i=await mh(rn,{appName:D("app.title"),workingTitleNote:D("app.workingTitle"),tagline:D("app.tagline"),seed:ct(re),look:ns(re),name:re.name});return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)})},applyCardDataURL:async i=>{const e=i.indexOf(",");if(e<0)return!1;try{const t=atob(i.slice(e+1)),n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return Zh(n)}catch{return!1}},focusFace:(i=0)=>{const e=new L;si.head.getWorldPosition(e);const t=.62,n=i*Math.PI/180;we.camera.position.set(e.x+Math.sin(n)*t,e.y+.01,e.z+Math.cos(n)*t),we.controls.target.copy(e),we.controls.update()},getVrState:()=>({support:ks,presenting:we.isPresenting(),qualityLevel:we.xrQualityLevel(),panelButtons:wt?wt.panel.targets.length:0,panelActionIds:wt?wt.panel.targets.map(i=>String(i.userData.actionId??"")):[],playerPosition:[we.player.position.x,we.player.position.y,we.player.position.z],playerRotationY:we.player.rotation.y,lastAction:wt!=null&&wt.lastAction?mi(wt.lastAction):null,panelNote:wt?wt.panel.noteText:null}),vrPress:i=>wt?wt.press(i):!1,vrPhotoDataURL:async()=>{const i=await rf();return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>t(n.error),n.readAsDataURL(i)})},measureStageStats:()=>we.measureDrawCalls(),viewVrPanel:()=>{we.camera.position.set(.55,1.6,1.85),we.controls.target.set(-1.35,1.25,-.45),we.controls.update()}};window.__fittingRoom=aM;
