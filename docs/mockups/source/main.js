import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';

const which = new URLSearchParams(location.search).get('s')||'a';
document.body.className = which==='d'?'c':which==='z'?'g z':which;
const W=innerWidth,H=900;
const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setSize(W,H); renderer.setPixelRatio(devicePixelRatio);
renderer.toneMapping=THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene();
let seed=7; const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};

function envMap(panels,amb){
  const s=new THREE.Scene(); s.background=new THREE.Color(amb);
  for(const [c,x,y,z,w,h,i] of panels){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));
    m.position.set(x,y,z); m.lookAt(0,0,0); s.add(m);
  }
  return new THREE.PMREMGenerator(renderer).fromScene(s,0.03).texture;
}
function siteTex(kind){
  const c=document.createElement('canvas');c.width=1280;c.height=800;const g=c.getContext('2d');
  const rr=(x,y,w,h,r,f)=>{g.fillStyle=f;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()};
  if(kind==='shop'){
    g.fillStyle='#fff7ee';g.fillRect(0,0,1280,800);
    g.fillStyle='#1b1b1b';g.font='700 34px Helvetica';g.fillText('MAISON',60,70);
    g.font='22px Helvetica';g.fillText('Shop     New     Sale     Cart (2)',820,68);
    g.font='700 86px Helvetica';g.fillText('Autumn',60,210);g.fillText('Collection',60,300);
    rr(60,340,220,62,31,'#1b1b1b');g.fillStyle='#fff';g.font='600 24px Helvetica';g.fillText('Shop now',112,380);
    const cols=['#ffb38a','#9ad0c2','#c7b3ff','#ffd66b'];
    cols.forEach((col,i)=>{rr(60+i*295,460,270,260,22,col);rr(60+i*295,738,150,18,9,'#1b1b1b');rr(60+i*295+200,738,70,18,9,'#bbb')});
    rr(640,110,580,300,26,'#ff7a45');g.fillStyle='#fff';g.beginPath();g.arc(930,260,95,0,7);g.fill();
  } else if(kind==='land'){
    const gr=g.createLinearGradient(0,0,1280,800);gr.addColorStop(0,'#4b2bff');gr.addColorStop(1,'#19c2ff');g.fillStyle=gr;g.fillRect(0,0,1280,800);
    g.fillStyle='#fff';g.font='700 32px Helvetica';g.fillText('◆ orbit',60,70);g.font='22px Helvetica';g.fillText('Product    Pricing    Login',900,68);
    g.textAlign='center';g.font='700 96px Helvetica';g.fillText('Launch faster.',640,290);g.fillText('Grow further.',640,395);
    g.globalAlpha=.8;g.font='28px Helvetica';g.fillText('The all-in-one platform for modern teams',640,460);g.globalAlpha=1;
    rr(500,510,280,72,36,'#fff');g.fillStyle='#4b2bff';g.font='600 28px Helvetica';g.fillText('Get started',640,556);g.textAlign='left';
    for(let i=0;i<3;i++)rr(140+i*350,650,300,200,24,'rgba(255,255,255,.18)');
  } else if(kind==='food'){
    g.fillStyle='#14110f';g.fillRect(0,0,1280,800);
    g.fillStyle='#f4e3c1';g.font='italic 700 40px Georgia';g.fillText('Osteria',60,74);
    g.font='700 100px Georgia';g.fillText('Taste the',60,300);g.fillText('tradition.',60,410);
    rr(60,470,250,66,33,'#e2542b');g.fillStyle='#fff';g.font='600 24px Helvetica';g.fillText('Book a table',110,512);
    g.fillStyle='#e2542b';g.beginPath();g.arc(960,400,270,0,7);g.fill();g.fillStyle='#f4e3c1';g.beginPath();g.arc(960,400,200,0,7);g.fill();
    g.fillStyle='#7da453';g.beginPath();g.arc(910,360,70,0,7);g.fill();g.fillStyle='#c0392b';g.beginPath();g.arc(1010,440,60,0,7);g.fill();
  } else if(kind==='lux'){
    const gr=g.createLinearGradient(0,0,1280,800);gr.addColorStop(0,'#0d0d10');gr.addColorStop(1,'#1c1a22');g.fillStyle=gr;g.fillRect(0,0,1280,800);
    const o=g.createRadialGradient(940,420,20,940,420,420);o.addColorStop(0,'#ffb27a');o.addColorStop(.45,'#c9507a');o.addColorStop(1,'rgba(60,40,140,0)');g.fillStyle=o;g.fillRect(480,0,800,800);
    g.fillStyle='#f4efe6';g.font='italic 34px Georgia';g.fillText('Aurel',64,76);g.font='19px Helvetica';g.globalAlpha=.7;g.fillText('Collection      Atelier      Journal      Contact',760,72);g.globalAlpha=1;
    g.font='104px Georgia';g.fillText('Quiet luxury,',64,330);g.font='italic 104px Georgia';g.fillText('delivered.',64,444);
    g.globalAlpha=.65;g.font='24px Helvetica';g.fillText('Handmade pieces for considered living.',66,510);g.globalAlpha=1;
    rr(64,560,230,62,31,'#f4efe6');g.fillStyle='#0d0d10';g.font='600 22px Helvetica';g.fillText('Explore  →',118,599);
    g.strokeStyle='rgba(244,239,230,.25)';g.lineWidth=1;g.beginPath();g.moveTo(64,700);g.lineTo(1216,700);g.stroke();
    g.fillStyle='#f4efe6';g.globalAlpha=.6;g.font='18px Helvetica';['01  Objects','02  Lighting','03  Textiles','04  Bespoke'].forEach((t,i)=>g.fillText(t,64+i*300,744));g.globalAlpha=1;
  } else {
    g.fillStyle='#0e1320';g.fillRect(0,0,1280,800);
    rr(0,0,250,800,0,'#151c2e');for(let i=0;i<6;i++)rr(34,130+i*70,180,22,11,i==0?'#6d5cff':'#2a3350');
    g.fillStyle='#fff';g.font='700 30px Helvetica';g.fillText('dash.',34,72);g.font='700 44px Helvetica';g.fillText('Overview',300,90);
    ['#6d5cff','#19c2ff','#ff7a45'].forEach((col,i)=>{rr(300+i*310,130,285,150,20,'#1a2238');rr(324+i*310,160,90,16,8,col);g.fillStyle='#fff';g.font='700 46px Helvetica';g.fillText(['$48.2k','1,284','92%'][i],324+i*310,240)});
    rr(300,310,905,440,20,'#1a2238');g.strokeStyle='#6d5cff';g.lineWidth=7;g.beginPath();
    for(let i=0;i<=12;i++){const x=340+i*68,y=600-Math.sin(i*.7)*70-i*14;i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
    for(let i=0;i<12;i++)rr(350+i*68,700-(40+((i*37)%90)),30,40+((i*37)%90),8,'rgba(25,194,255,.55)');
  }
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
}
function laptop(tex,bodyCol=0x23252e){
  const g=new THREE.Group();
  const mat=new THREE.MeshStandardMaterial({color:bodyCol,metalness:.9,roughness:.32});
  const base=new THREE.Mesh(new RoundedBoxGeometry(3.2,.12,2.1,4,.05),mat);g.add(base);
  const kb=new THREE.Mesh(new THREE.PlaneGeometry(2.8,1.1),new THREE.MeshStandardMaterial({color:0x0b0c10,roughness:.8}));kb.rotation.x=-Math.PI/2;kb.position.set(0,.062,-.3);g.add(kb);
  const tp=new THREE.Mesh(new THREE.PlaneGeometry(1,.55),new THREE.MeshStandardMaterial({color:0x15161c,roughness:.5,metalness:.6}));tp.rotation.x=-Math.PI/2;tp.position.set(0,.062,.65);g.add(tp);
  const piv=new THREE.Group();piv.position.set(0,.06,-1.05);piv.rotation.x=-.22;g.add(piv);
  const lid=new THREE.Mesh(new RoundedBoxGeometry(3.2,2.05,.08,4,.04),mat);lid.position.y=1.025;piv.add(lid);
  const bez=new THREE.Mesh(new THREE.PlaneGeometry(3.1,1.95),new THREE.MeshBasicMaterial({color:0x050505}));bez.position.set(0,1.025,.041);piv.add(bez);
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(2.98,1.86),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));scr.position.set(0,1.03,.043);piv.add(scr);
  g.traverse(o=>{o.castShadow=true});return g;
}
function phone(tex){
  const g=new THREE.Group();
  g.add(new THREE.Mesh(new RoundedBoxGeometry(1.05,2.1,.1,6,.05),new THREE.MeshStandardMaterial({color:0x1a1b22,metalness:.95,roughness:.25})));
  tex=tex.clone();tex.repeat.set(.36,1);tex.offset.set(.02,0);tex.needsUpdate=true;
  const s=new THREE.Mesh(new RoundedBoxGeometry(.95,2.0,.01,4,.004),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));s.position.z=.051;g.add(s);return g;
}
const ui=document.getElementById('ui');
let camera,composer=null;

if(which==='a'){
  camera=new THREE.PerspectiveCamera(34,W/H,.1,200);camera.position.set(0,.4,12);
  const bc=document.createElement('canvas');bc.width=bc.height=512;const bg=bc.getContext('2d');
  const gr=bg.createRadialGradient(350,230,10,300,260,420);gr.addColorStop(0,'#2a1a66');gr.addColorStop(.45,'#0c0b24');gr.addColorStop(1,'#04040a');bg.fillStyle=gr;bg.fillRect(0,0,512,512);
  const bt=new THREE.CanvasTexture(bc);bt.colorSpace=THREE.SRGBColorSpace;scene.background=bt;
  scene.fog=new THREE.Fog(0x07071a,14,40);
  scene.environment=envMap([['#7b5cff',-6,4,4,8,8,4],['#22d3ee',7,2,3,6,8,4],['#ff6a3d',2,-6,2,8,4,3],['#ffffff',0,7,-2,6,3,3]],'#05050c');
  const L1=laptop(siteTex('land'));L1.position.set(3.1,-.9,1.2);L1.rotation.set(.32,-.55,.08);L1.scale.setScalar(1.25);scene.add(L1);
  const L2=laptop(siteTex('shop'));L2.position.set(-.6,2.6,-5);L2.rotation.set(.1,.5,-.12);scene.add(L2);
  const L3=laptop(siteTex('dash'));L3.position.set(8.5,3.6,-8);L3.rotation.set(.25,-.9,.2);scene.add(L3);
  const L4=laptop(siteTex('food'));L4.position.set(-1.5,-5.2,-9);L4.rotation.set(.4,.7,-.1);scene.add(L4);
  const P=phone(siteTex('shop'));P.position.set(60,1.3,2.2);P.rotation.set(-.15,-.6,.22);P.scale.setScalar(1.1);scene.add(P);
  const P2=phone(siteTex('food'));P2.position.set(1.2,-2.9,-2);P2.rotation.set(.3,.5,-.5);scene.add(P2);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(3.3,.018,16,200),new THREE.MeshBasicMaterial({color:new THREE.Color('#8b6cff').multiplyScalar(3)}));ring.position.set(3.3,.2,-.6);ring.rotation.set(1.15,.25,0);scene.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(4.3,.01,16,200),new THREE.MeshBasicMaterial({color:new THREE.Color('#3fd8ff').multiplyScalar(2.5)}));ring2.position.copy(ring.position);ring2.rotation.set(1.35,-.3,.4);scene.add(ring2);
  const geos=[new THREE.IcosahedronGeometry(1,0),new THREE.OctahedronGeometry(1,0),new THREE.TetrahedronGeometry(1,0),new THREE.TorusGeometry(.7,.28,24,60),new THREE.SphereGeometry(.8,48,48)];
  const cols=['#8b6cff','#3fd8ff','#ff7a45','#ffffff','#30325a'];
  for(let i=0;i<46;i++){
    const m=new THREE.Mesh(geos[i%5],new THREE.MeshPhysicalMaterial({color:cols[i%5],metalness:.9,roughness:.12,iridescence:.8,flatShading:i%5<3}));
    m.position.set((R()-.5)*26,(R()-.5)*13,-R()*22+3);if(m.position.x<0&&m.position.x>-7&&m.position.z>-4)m.position.z-=8;
    m.scale.setScalar(.12+R()*.42);m.rotation.set(R()*6,R()*6,R()*6);scene.add(m);
  }
  const big=new THREE.Mesh(new THREE.SphereGeometry(1.1,96,96),new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.04}));big.position.set(.9,.3,2.2);big.scale.setScalar(.55);scene.add(big);
  const pg=new THREE.BufferGeometry(),pp=[];for(let i=0;i<1800;i++)pp.push((R()-.5)*44,(R()-.5)*24,-R()*36+6);
  pg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xbfd4ff,size:.045,transparent:true,opacity:.85})));
  const a=new THREE.PointLight('#8b6cff',260,40);a.position.set(-3,5,6);scene.add(a);
  const b=new THREE.PointLight('#3fd8ff',200,40);b.position.set(9,-2,5);scene.add(b);
  const c=new THREE.PointLight('#ff7a45',90,30);c.position.set(3,-5,3);scene.add(c);
  renderer.toneMappingExposure=1.05;
  
  
  ui.innerHTML=`<div class="nav"><b>Your Name<span style="margin:0;opacity:.5">.dev</span></b><div><span>Services</span><span>Work</span><span>Process</span><span>Contact</span></div></div>
  <h1>Websites that feel <i>alive.</i></h1><p>Landing pages, online stores and web apps — designed and built to make people stop scrolling.</p><div class="btn">See the work ↓</div>
  <div class="tag" style="left:940px;top:215px">Landing page</div><div class="tag" style="left:935px;top:745px">Mobile store</div><div class="tag" style="left:748px;top:150px">E-commerce</div>
  <div class="foot"><span>Scroll to fly through</span><span>01 / 05</span></div>`;
}
if(which==='b'){
  const f=6.2,asp=W/H;camera=new THREE.OrthographicCamera(-f*asp,f*asp,f,-f,.1,100);camera.position.set(12,10.5,12);camera.lookAt(-2.6,2.3,0);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMappingExposure=1.1;
  scene.environment=envMap([['#ffffff',0,8,0,10,10,2.5],['#ffd9b8',8,3,4,8,8,1.5],['#c9c2ff',-6,3,6,8,8,1.5]],'#8a8296');
  const M=(c,r=.75,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
  const box=(w,h,d,mat,x,y,z,rad=.06)=>{const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,Math.min(rad,w/2.01,h/2.01,d/2.01)),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m};
  const cyl=(rt,rb,h,mat,x,y,z,s=40)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m};
  box(9,.4,9,M('#e7c39a'),0,-.2,0,.1);box(.4,6.4,9,M('#6f5bd6'),-4.7,3,0,.1);box(9.4,6.4,.4,M('#8571ea'),-.2,3,-4.7,.1);
  cyl(2.4,2.4,.06,M('#ff8f6b'),.6,.04,1.2,64);cyl(1.7,1.7,.07,M('#ffd9c2'),.6,.05,1.2,64);
  // desk
  box(4.6,.16,2,M('#fff4e6',.5),-.6,1.55,-3.2);[[-2.7,-3.9],[1.5,-3.9],[-2.7,-2.5],[1.5,-2.5]].forEach(([x,z])=>box(.14,1.5,.14,M('#2a2140'),x,.75,z,.03));
  box(.9,.06,.6,M('#2a2140',.4,.6),-.6,1.66,-3.5);box(.12,.5,.12,M('#2a2140',.4,.6),-.6,1.9,-3.6,.03);
  box(2.9,1.75,.12,M('#1c1c26',.4,.7),-.6,2.95,-3.55,.05);
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(2.75,1.6),new THREE.MeshBasicMaterial({map:siteTex('land'),toneMapped:false}));scr.position.set(-.6,2.95,-3.485);scene.add(scr);
  box(1.5,.06,.5,M('#ffffff',.4),-.7,1.67,-2.7,.02);cyl(.14,.14,.06,M('#ffffff',.4),.55,1.67,-2.7);
  const lp=laptop(siteTex('shop'),0xd9d9e2);lp.scale.setScalar(.42);lp.position.set(-2.2,1.66,-2.9);lp.rotation.y=.5;scene.add(lp);
  cyl(.16,.13,.3,M('#ff8f6b'),1.2,1.78,-3.4);
  // chair
  cyl(.7,.7,.14,M('#ff8f6b'),-.4,1,-1.1);cyl(.08,.08,.8,M('#2a2140'),-.4,.5,-1.1);cyl(.6,.6,.06,M('#2a2140'),-.4,.06,-1.1);
  const back=box(1.3,1.1,.16,M('#ff8f6b'),-.4,1.9,-.45,.08);back.rotation.x=.12;
  // wall frames = projects
  ['shop','food','dash'].forEach((k,i)=>{box(.1,1.3,1.9,M('#fff'),-4.45,4.3-(i==1?1.55:0),-2.2+(i==0?0:i==1?1.1:2.3)+(i==2?0:0),.03);
    const p=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.1),new THREE.MeshBasicMaterial({map:siteTex(k),toneMapped:false}));p.rotation.y=Math.PI/2;p.position.set(-4.39,4.3-(i==1?1.55:0),-2.2+(i==0?0:i==1?1.1:2.3));scene.add(p)});
  // shelf on back wall with service objects
  box(3.2,.12,.7,M('#fff4e6'),2.3,4.3,-4.2);box(3.2,.12,.7,M('#fff4e6'),2.3,2.7,-4.2);
  cyl(0,.22,.45,M('#ff5d5d'),1.2,5.2,-4.2);cyl(.22,.22,.6,M('#ffffff',.4),1.2,4.68,-4.2);cyl(.3,.12,.14,M('#ffb347'),1.2,4.42,-4.2);
  box(.8,.6,.5,M('#ffd66b'),2.4,4.66,-4.2);box(.9,.16,.6,M('#ff5d5d'),2.4,5.03,-4.2,.04);
  const gl=new THREE.Mesh(new THREE.SphereGeometry(.36,48,48),new THREE.MeshPhysicalMaterial({color:'#3fd8ff',metalness:.2,roughness:.1,iridescence:1}));gl.position.set(3.4,4.74,-4.2);gl.castShadow=true;scene.add(gl);
  [['#ff8f6b',.5],['#3fd8ff',.7],['#ffd66b',.6],['#fff',.45],['#ff5d5d',.65]].forEach(([c,h],i)=>box(.2,h,.5,M(c),1.1+i*.24,2.76+h/2,-4.2,.02));
  box(.7,.7,.5,M('#2a2140'),3.2,3.11,-4.2);const cube=new THREE.Mesh(new THREE.TorusKnotGeometry(.16,.06,100,16),M('#ffd66b',.2,.9));cube.position.set(3.2,3.65,-4.2);cube.castShadow=true;scene.add(cube);
  // plant
  cyl(.5,.38,.8,M('#fff'),3.4,.4,-3);[[0,1.5,0,.6],[.35,1.2,.2,.42],[-.3,1.25,-.15,.45],[.1,1.9,.1,.4]].forEach(([x,y,z,r])=>{const s=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),new THREE.MeshStandardMaterial({color:'#3fae7c',roughness:.8,flatShading:true}));s.position.set(3.4+x,y,-3+z);s.castShadow=true;scene.add(s)});
  // lamp
  cyl(.4,.4,.06,M('#2a2140'),-3.7,.04,3);cyl(.04,.04,3.6,M('#2a2140'),-3.7,1.8,3);cyl(.25,.55,.6,new THREE.MeshStandardMaterial({color:'#ffe9a8',emissive:'#ffcf5a',emissiveIntensity:1.2}),-3.7,3.8,3);
  const pl=new THREE.PointLight('#ffcf7a',30,9);pl.position.set(-3.5,3.4,3);scene.add(pl);
  // pouf + boxes
  cyl(.7,.75,.6,M('#3fd8ff'),2.6,.3,2.4);box(1,.8,1,M('#ffd66b'),-3.5,.4,.6);box(.7,.6,.7,M('#ff8f6b'),-3.5,1.1,.6);
  const ph=phone(siteTex('shop'));ph.scale.setScalar(.5);ph.position.set(2.6,1.25,2.4);ph.rotation.set(-.2,.8,0);scene.add(ph);
  const d=new THREE.DirectionalLight('#fff3e0',3.2);d.position.set(6,12,9);d.castShadow=true;d.shadow.mapSize.set(4096,4096);Object.assign(d.shadow.camera,{left:-10,right:10,top:10,bottom:-10});d.shadow.bias=-.0004;d.shadow.radius=6;scene.add(d);
  scene.add(new THREE.HemisphereLight('#fff','#b9a8ff',.9));
  ui.innerHTML=`<div class="nav"><b>Your Name.dev</b><div><span>Services</span><span>Work</span><span>Contact</span></div></div>
  <h1>Step inside my studio.</h1><p>Click anything in the room. The screens show my projects, the shelf holds my services.</p>
  <div class="tag" style="left:770px;top:330px">Latest project</div><div class="tag" style="left:1100px;top:105px">Services shelf</div><div class="tag" style="left:500px;top:255px">Showcase wall</div>
  <div class="foot"><span>Drag to rotate the room</span><span>Click an object to open it</span></div>`;
}
if(which==='c'){
  camera=new THREE.PerspectiveCamera(30,W/H,.1,100);camera.position.set(0,0,11);renderer.toneMappingExposure=1.15;
  scene.environment=envMap([['#ff3d8b',-7,2,3,7,9,5],['#3f6bff',7,3,2,7,9,5],['#ffb300',0,-7,3,10,5,4],['#ffffff',0,7,3,10,5,6],['#00e0c6',3,0,-8,8,8,3],['#ffffff',-2,1,8,3,3,5]],'#5d5a78');
  const geo=new THREE.SphereGeometry(2.25,400,400),p=geo.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();
    const d=1+.2*Math.sin(v.x*3.1+.6)*Math.cos(v.y*2.6-.4)+.14*Math.sin(v.z*4.2+v.x*2.2)+.1*Math.cos(v.y*5.2+v.z*1.7)+.05*Math.sin(v.x*8+v.y*7);
    v.multiplyScalar(2.25*d);p.setXYZ(i,v.x,v.y,v.z)}
  geo.computeVertexNormals();
  const blob=new THREE.Mesh(geo,new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.16,iridescence:1,iridescenceIOR:1.8}));blob.rotation.set(.3,.5,.1);blob.position.y=-.1;scene.add(blob);
  [[-3.1,1.9,.5,.36,'#ffffff'],[3.3,-1.7,1,.5,'#ffffff'],[2.9,2.1,-1,.22,'#ffffff'],[-2.9,-1.9,1.5,.26,'#ff3d8b']].forEach(([x,y,z,r,c])=>{
    const s=new THREE.Mesh(new THREE.SphereGeometry(r,64,64),new THREE.MeshPhysicalMaterial({color:c,metalness:1,roughness:.15}));s.position.set(x,y,z);scene.add(s)});
  const bgd=document.getElementById('bg');bgd.innerHTML=`<div class="big t1">DESIGN</div><div class="big t2">DEVELOP</div>`;
  ui.innerHTML=`<div class="nav"><b>Your Name®</b><div><span>Services</span><span>Work</span><span>Contact</span></div></div>
  <div class="num">01 — LANDING PAGES<br><u>02 — E-COMMERCE</u><br><u>03 — WEB APPS</u><br><u>04 — REDESIGNS</u></div>
  <div class="side">One living shape that morphs into a new form for every service as you scroll.</div>
  <div class="foot" style="opacity:1"><span>Scroll ↓</span><span>Web designer &amp; developer</span></div>`;
}

if(which==='d'){
  camera=new THREE.PerspectiveCamera(30,W/H,.1,100);camera.position.set(0,0,11);renderer.toneMappingExposure=1.15;
  scene.environment=envMap([['#ff3d8b',-7,2,3,7,9,5],['#3f6bff',7,3,2,7,9,5],['#ffb300',0,-7,3,10,5,4],['#ffffff',0,7,3,10,5,6],['#00e0c6',3,0,-8,8,8,3],['#ffffff',-2,1,8,3,3,5]],'#5d5a78');
  const L=laptop(siteTex('land'),0x2a2b33);L.position.set(.1,-.75,0);L.rotation.set(.34,-.5,.07);L.scale.setScalar(.98);scene.add(L);
  const P=phone(siteTex('shop'));P.position.set(2.75,-1.25,1.2);P.rotation.set(-.1,-.55,.2);P.scale.setScalar(.62);scene.add(P);
  const geo=new THREE.SphereGeometry(1,200,200),p=geo.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();
    const d=1+.2*Math.sin(v.x*3.1+.6)*Math.cos(v.y*2.6-.4)+.14*Math.sin(v.z*4.2+v.x*2.2)+.1*Math.cos(v.y*5.2+v.z*1.7);v.multiplyScalar(d);p.setXYZ(i,v.x,v.y,v.z)}
  geo.computeVertexNormals();
  const cm=new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.16,iridescence:1,iridescenceIOR:1.8});
  const blob=new THREE.Mesh(geo,cm);blob.position.set(-2.6,1.75,.5);blob.scale.setScalar(.42);blob.rotation.set(.3,.5,.1);scene.add(blob);
  const s2=new THREE.Mesh(new THREE.SphereGeometry(.24,64,64),cm);s2.position.set(3.9,2.0,-.5);scene.add(s2);
  const s3=new THREE.Mesh(new THREE.SphereGeometry(.13,64,64),cm);s3.position.set(-2.4,-2.2,1);scene.add(s3);
  document.getElementById('bg').innerHTML=`<div class="big t1" style="font-size:215px;top:165px">WEBSITES</div><div class="big t2" style="font-size:215px;top:475px">THAT MOVE</div>`;
  ui.innerHTML=`<div class="nav"><b>Your Name®</b><div><span>Services</span><span>Work</span><span>Contact</span></div></div>
  <div class="num" style="top:346px">01 — LANDING PAGES<br><u>02 — E-COMMERCE</u><br><u>03 — WEB APPS</u><br><u>04 — REDESIGNS</u></div>
  <div class="side" style="top:362px">Scroll to fly from one project to the next. Click a screen to step inside it.</div>
  <div class="foot" style="opacity:1"><span>Scroll ↓</span><span>01 / 05 — Orbit, landing page</span></div>`;
}

if(which==='e'){
  camera=new THREE.PerspectiveCamera(30,W/H,.1,100);camera.position.set(0,0,11);renderer.toneMappingExposure=1.05;
  scene.environment=envMap([['#ffffff',0,8,2,12,8,5],['#fff1e0',-8,2,4,6,10,2.5],['#e6ecff',8,2,4,6,10,2.5],['#ffffff',0,1,9,10,5,1.2]],'#77736c');
  const colEnv=envMap([['#ff3d8b',-7,2,3,7,9,5],['#3f6bff',7,3,2,7,9,5],['#ffb300',0,-7,3,10,5,4],['#ffffff',0,7,3,10,5,6],['#00e0c6',3,0,-8,8,8,3],['#ffffff',-2,1,8,3,3,5]],'#6a6788');
  const L=laptop(siteTex('lux'),0xd4d5da);L.traverse(o=>{if(o.material&&o.material.metalness>.8){o.material.roughness=.38;o.material.metalness=1}});
  L.position.set(0,-2.62,0);L.rotation.set(.2,-.3,.0);L.scale.setScalar(1.27);scene.add(L);
  const sc=document.createElement('canvas');sc.width=sc.height=256;const sg=sc.getContext('2d'),gr=sg.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(30,22,10,.42)');gr.addColorStop(1,'rgba(30,22,10,0)');sg.fillStyle=gr;sg.fillRect(0,0,256,256);
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(9,3.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2+.2;sh.position.set(.2,-3.05,.3);scene.add(sh);
  const P=phone(siteTex('shop'));P.children[0].material=new THREE.MeshStandardMaterial({color:0xd4d5da,metalness:1,roughness:.3});
  P.position.set(2.72,-1.25,.9);P.rotation.set(-.05,-.5,.16);P.scale.setScalar(.74);scene.add(P);
  const geo=new THREE.SphereGeometry(1,220,220),p=geo.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();const d=1+.2*Math.sin(v.x*3.1+.6)*Math.cos(v.y*2.6-.4)+.14*Math.sin(v.z*4.2+v.x*2.2)+.1*Math.cos(v.y*5.2+v.z*1.7);v.multiplyScalar(d);p.setXYZ(i,v.x,v.y,v.z)}
  geo.computeVertexNormals();
  const cm=new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.14,iridescence:1,iridescenceIOR:1.8,envMap:colEnv});
  const blob=new THREE.Mesh(geo,cm);blob.position.set(-2.55,-.62,.6);blob.scale.setScalar(.48);blob.rotation.set(.3,.5,.1);scene.add(blob);
  const s2=new THREE.Mesh(new THREE.SphereGeometry(.17,64,64),cm);s2.position.set(-3.6,.35,-.5);scene.add(s2);
  const s3=new THREE.Mesh(new THREE.SphereGeometry(.11,64,64),cm);s3.position.set(3.55,.4,.2);scene.add(s3);
  document.getElementById('bg').innerHTML=`<div class="ring"></div><div class="ring r2"></div>`;
  ui.innerHTML=`<div class="nav"><b>Your Name</b><div class="mid"><span>Services</span><span>Work</span><span>Process</span><span>About</span></div><div class="pill">Let's talk →</div></div>
  <div class="avail"><i></i>Available for new projects</div>
  <h1>Websites crafted<br>to <em>move</em> people.</h1>
  <div class="l">Landing pages, online stores and web apps, designed and built with care for brands that want to be remembered.<br><a>View selected work →</a></div>
  <div class="r">Landing pages<br><u>E-commerce</u><br><u>Web apps</u><br><u>Redesigns</u></div>
  <div class="foot"><span>Scroll to explore ↓</span><span>01 / 05 — Aurel, online store</span></div>`;
}

function rrect(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  const g=new THREE.ShapeGeometry(s,14),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+w/2)/w,(p.getY(i)+h/2)/h);return g}
function card(tex,frame='#ffffff',w=2.5,h=1.5625,b=.05){const g=new THREE.Group();
  const f=new THREE.Mesh(rrect(w+b*2,h+b*2,.13),new THREE.MeshBasicMaterial({color:frame,toneMapped:false,side:THREE.DoubleSide}));g.add(f);
  const s=new THREE.Mesh(rrect(w,h,.09),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));s.position.z=.01;g.add(s);return g}
function shadow(w,h,x,y,z,a=.4,col='30,22,10',tilt=.2){const sc=document.createElement('canvas');sc.width=sc.height=256;const sg=sc.getContext('2d'),gr=sg.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,`rgba(${col},${a})`);gr.addColorStop(1,`rgba(${col},0)`);sg.fillStyle=gr;sg.fillRect(0,0,256,256);
  const sh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2+tilt;sh.position.set(x,y,z);scene.add(sh)}
function blobGeo(seg=220){const geo=new THREE.SphereGeometry(1,seg,seg),p=geo.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();const d=1+.2*Math.sin(v.x*3.1+.6)*Math.cos(v.y*2.6-.4)+.14*Math.sin(v.z*4.2+v.x*2.2)+.1*Math.cos(v.y*5.2+v.z*1.7);v.multiplyScalar(d);p.setXYZ(i,v.x,v.y,v.z)}
  geo.computeVertexNormals();return geo}
const NAV=(cta)=>`<div class="nav"><b>Your Name</b><div class="mid"><span>Services</span><span>Work</span><span>Process</span><span>About</span></div><div class="pill">${cta}</div></div>`;
if('fghiz'.includes(which)){camera=new THREE.PerspectiveCamera(30,W/H,.1,100);camera.position.set(0,0,11)}
if(which==='f'){
  renderer.toneMappingExposure=1.1;
  scene.environment=envMap([['#ffd9a0',-6,5,4,6,8,5],['#ffffff',6,6,3,5,5,5],['#c8792a',4,-6,3,8,4,3],['#fff0d0',0,2,9,4,4,1.2],['#ffb060',-8,-2,-3,6,6,2]],'#120d07');
  const gold=new THREE.MeshPhysicalMaterial({color:'#e9c98c',metalness:1,roughness:.2});
  const k=new THREE.Mesh(new THREE.TorusKnotGeometry(1.25,.43,400,64,2,3),gold);k.position.set(2.95,.05,0);k.rotation.set(.5,.3,.2);scene.add(k);
  const c1=card(siteTex('lux'),'#3a2f20',2.3,1.44,.03);c1.position.set(1.0,-1.38,1.6);c1.rotation.set(-.08,.38,-.05);scene.add(c1);
  const c2=card(siteTex('dash'),'#3a2f20',2.3,1.44,.03);c2.position.set(5.0,1.55,-1.8);c2.rotation.set(.02,-.45,.05);scene.add(c2);
  [[4.9,-1.7,.8,.2],[1.3,1.9,-.5,.12],[.6,.4,1,.07]].forEach(([x,y,z,r])=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,64,64),gold);s.position.set(x,y,z);scene.add(s)});
  ui.innerHTML=NAV("Let's talk →")+`<div class="eye">Web design &amp; development</div>
  <h1>Digital craft<br>for <em>ambitious</em><br>brands.</h1>
  <p>Landing pages, online stores and web apps, designed with restraint and engineered to perform.</p>
  <div class="cta"><div class="g">Start a project</div><div class="o">View the work</div></div>
  <div class="foot"><span>Scroll to explore ↓</span><span>Landing pages — E-commerce — Web apps — Redesigns</span></div>`;
}
if(which==='g'||which==='z'){
  const ks=['food','shop','lux','land','dash'];
  [-2,2,-1,1,0].forEach(i=>{const c=card(siteTex(ks[i+2]),'#ffffff',2.5,1.5625,.06),a=Math.abs(i);
    c.position.set(i*1.5,-1.3-a*.2,-a*.55);c.rotation.set(0,-i*.2,-i*.085);scene.add(c);
    shadow(3.6,1.4,i*1.5,-2.35-a*.2,-a*.55+.2,.2,'60,50,110',.35)});
  ui.innerHTML=`<div class="bar"><b>Your Name</b><span>Services</span><span>Work</span><span>Pricing</span><span>About</span><i>Get in touch</i></div>
  <div class="chip"><u>New</u>Booking projects for next month →</div>
  <h1>Design that sells.<br><span>Code that lasts.</span></h1>
  <div class="cta"><div>Start a project</div><a>See the work ›</a></div>`;
}
if(which==='h'){
  renderer.toneMappingExposure=1.1;
  scene.environment=envMap([['#ffffff',-5,6,4,7,9,9],['#ffffff',7,1,3,4,10,8],['#ff4d00',0,-7,2,10,4,6],['#ffffff',0,1,9,3,3,3],['#ffffff',-8,-2,2,3,9,6]],'#0b0b0b');
  const b=new THREE.Mesh(blobGeo(360),new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.13}));b.position.set(2.75,.15,0);b.scale.setScalar(1.6);b.rotation.set(.3,.9,.1);scene.add(b);
  const s=new THREE.Mesh(new THREE.SphereGeometry(.2,64,64),new THREE.MeshBasicMaterial({color:'#ff4d00',toneMapped:false}));s.position.set(.9,1.9,1);scene.add(s);
  shadow(6,1.6,2.75,-2.3,0,.22,'0,0,0',.25);
  document.getElementById('bg').innerHTML=`<div class="gl" style="left:25%"></div><div class="gl" style="left:50%"></div><div class="gl" style="left:75%"></div><div class="hh">Web<br>design<br>&amp; build<i>.</i></div>`;
  ui.innerHTML=`<div class="nav"><b>YN®</b><div><span>Work</span><span>Services</span><span>About</span><span style="opacity:1">Contact ↗</span></div></div>
  <div class="meta" style="left:56px;top:122px"><span class="dot"></span>Open for projects</div>
  <div class="idx">(01 — 05)</div>
  <div class="meta" style="right:56px;bottom:86px;text-align:right"><u>01</u>Landing pages<br><u>02</u>E-commerce<br><u>03</u>Web apps<br><u>04</u>Redesigns</div>
  <div class="foot"><span>Scroll ↓</span><span>Independent web designer &amp; developer</span></div>`;
}
if(which==='i'){
  const ks=['dash','shop','lux','land','food'],Rr=5.4;
  [-2,-1,0,1,2].forEach(i=>{const a=i*.5,c=card(siteTex(ks[i+2]),'#efe6d5',2.55,1.6,.05);
    c.position.set(Math.sin(a)*Rr,-1.2,Rr*(1-Math.cos(a))-1.2);c.rotation.y=-a;scene.add(c)});
  shadow(16,3.4,0,-2.55,.3,.5,'0,0,0',.3);
  ui.innerHTML=NAV("Start a project")+`<div class="eye">Web designer &amp; developer</div>
  <h1>Selected work,<br><em>built to perform.</em></h1>
  <div class="cap"><u>←</u>03 / 05 — Aurel, online store<u>→</u></div>
  <div class="foot"><span>Drag to browse</span><span>Scroll to explore ↓</span></div>`;
}

if(which==='z'){
  const img=k=>siteTex(k).image.toDataURL('image/jpeg',.92);
  const IM={lux:img('lux'),shop:img('shop'),land:img('land'),food:img('food'),dash:img('dash')};
  // 3D service icons rendered to images
  const r2=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r2.setSize(340,340);r2.setPixelRatio(2);r2.toneMapping=THREE.ACESFilmicToneMapping;r2.toneMappingExposure=1.15;
  const pm=new THREE.PMREMGenerator(r2),es=new THREE.Scene();es.background=new THREE.Color('#77749a');
  [['#ff3d8b',-7,2,3,7,9,5],['#3f6bff',7,3,2,7,9,5],['#ffb300',0,-7,3,10,5,4],['#ffffff',0,7,3,10,5,6],['#00e0c6',3,0,-8,8,8,3],['#ffffff',-2,1,8,3,3,5]].forEach(([c,x,y,z,w,h,i])=>{const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));q.position.set(x,y,z);q.lookAt(0,0,0);es.add(q)});
  const env2=pm.fromScene(es,.03).texture,cm=()=>new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:1,roughness:.16,iridescence:1,iridescenceIOR:1.8});
  const cam2=new THREE.PerspectiveCamera(30,1,.1,50);cam2.position.set(0,0,8);
  const icon=build=>{const sc=new THREE.Scene();sc.environment=env2;const g=new THREE.Group();build(g);g.rotation.set(.35,-.55,.12);sc.add(g);r2.render(sc,cam2);return r2.domElement.toDataURL()};
  const add=(g,geo,x=0,y=0,z=0,rx=0,ry=0,rz=0)=>{const o=new THREE.Mesh(geo,cm());o.position.set(x,y,z);o.rotation.set(rx,ry,rz);g.add(o);return o};
  const I=[
    icon(g=>{add(g,new THREE.CapsuleGeometry(.62,1.2,24,64),0,.15,0,0,0,-.5);add(g,new THREE.TorusGeometry(1.0,.13,32,120),-.05,.05,0,1.3,0,-.5);add(g,new THREE.SphereGeometry(.2,48,48),1.35,-1.05,0)}),
    icon(g=>{add(g,new RoundedBoxGeometry(1.9,1.6,1.1,8,.3),0,-.35,0);add(g,new THREE.TorusGeometry(.55,.11,32,100,Math.PI),0,.45,0)}),
    icon(g=>{[-.75,0,.75].forEach((y,i)=>add(g,new RoundedBoxGeometry(2.1-i*.0,.34,2.1,8,.16),0,y,0,0,i*.25,0))}),
    icon(g=>{add(g,new THREE.TorusGeometry(1.0,.3,48,140),0,0,0,.2,.3,0);add(g,new THREE.SphereGeometry(.42,64,64),0,0,0);add(g,new THREE.SphereGeometry(.17,48,48),1.45,1.0,0)}),
  ];
  const hb=document.createElement('div');hb.className='herobg';document.body.prepend(hb);
  const tilt=(x,y)=>`transform:perspective(1400px) rotateY(${y}deg) rotateX(${x}deg)`;
  const main=document.createElement('main');
  main.innerHTML=`
  <div class="mq"><b>Landing pages</b><i> ✦ </i><span>E-commerce</span><i> ✦ </i><b>Web apps</b><i> ✦ </i><span>Redesigns</span><i> ✦ </i><b>Speed &amp; SEO</b><i> ✦ </i><span>Landing pages</span></div>
  <div class="glow" style="left:-380px;top:1500px;background:radial-gradient(#ffe1d2,transparent 65%)"></div>
  <div class="glow" style="right:-380px;top:2300px;background:radial-gradient(#d5dcff,transparent 65%)"></div>
  <div class="glow" style="left:-300px;top:3600px;background:radial-gradient(#ecd9ff,transparent 65%)"></div>
  <div class="glow" style="right:-360px;top:4500px;background:radial-gradient(#ffe1d2,transparent 65%)"></div>
  <section><div class="head"><div><div class="k">Services</div><h2>Everything you need<br><span>to look great online.</span></h2></div><p>From a single high-converting page to a full online store. Designed, built and launched by one person who cares about the details.</p></div>
   <div class="svc">${[['Landing pages','One focused page built to turn visitors into customers.',['Conversion-first layout','Scroll animations','Fast loading']],['E-commerce','Online stores that make buying feel effortless.',['Product & cart pages','Secure checkout','Easy to manage']],['Web apps','Dashboards and tools tailored to how you work.',['Custom features','Logins & databases','Built to scale']],['Redesigns','A fresh, modern look for a site that feels dated.',['New visual identity','Better mobile experience','Speed & SEO tune-up']]].map((s,i)=>`<div class="glass"><span class="n">0${i+1}</span><img src="${I[i]}"><h3>${s[0]}</h3><p>${s[1]}</p><ul>${s[2].map(l=>`<li>${l}</li>`).join('')}</ul></div>`).join('')}</div></section>
  <section><div class="head"><div><div class="k">Selected work</div><h2>Websites I've built.<br><span>Click one to step inside.</span></h2></div><p>Each project opens as a live, working website, so clients can try the real thing instead of looking at a screenshot.</p></div>
   <div class="bento">
    <div class="tile" style="grid-column:span 7;height:470px;background:linear-gradient(135deg,#ffe4d6,#f3d9ff)"><div class="t">Aurel<small>Luxury online store</small></div><div class="go">↗</div><img src="${IM.lux}" style="width:600px;left:90px;top:128px;${tilt(8,-14)}"></div>
    <div class="tile" style="grid-column:span 5;height:470px;background:linear-gradient(135deg,#dfe6ff,#eaf6ff)"><div class="t">Orbit<small>SaaS landing page</small></div><div class="go">↗</div><img src="${IM.land}" style="width:440px;left:44px;top:150px;${tilt(8,14)}"></div>
    <div class="tile" style="grid-column:span 4;height:380px;background:linear-gradient(135deg,#fff0d9,#ffe0e6)"><div class="t">Maison<small>Fashion store</small></div><div class="go">↗</div><img src="${IM.shop}" style="width:330px;left:36px;top:128px;${tilt(8,-12)}"></div>
    <div class="tile" style="grid-column:span 4;height:380px;background:linear-gradient(135deg,#e2f5ea,#e3f0ff)"><div class="t">Osteria<small>Restaurant website</small></div><div class="go">↗</div><img src="${IM.food}" style="width:330px;left:28px;top:128px;${tilt(8,0)}"></div>
    <div class="tile" style="grid-column:span 4;height:380px;background:linear-gradient(135deg,#ece4ff,#dfe6ff)"><div class="t">Dash<small>Analytics web app</small></div><div class="go">↗</div><img src="${IM.dash}" style="width:330px;left:20px;top:128px;${tilt(8,12)}"></div>
   </div></section>
  <section><div class="head"><div><div class="k">Process</div><h2>From idea to launch<br><span>in four clear steps.</span></h2></div><p>You always know what happens next, and you see progress at every stage.</p></div>
   <div class="steps">${[['Discover','We talk through your goals, audience and the sites you admire.','Day 1'],['Design','You get a full visual design to review before any code is written.','Week 1'],['Build','I turn the design into a fast, animated, mobile-ready website.','Week 2–3'],['Launch','Your site goes live, and I stay on hand for fixes and updates.','Week 4']].map((s,i)=>`<div><div class="d ${i==0?'on':''}">0${i+1}</div><h3>${s[0]}</h3><p>${s[1]}</p><em>${s[2]}</em></div>`).join('')}</div></section>
  <section><div class="head"><div><div class="k">Pricing</div><h2>Simple packages.<br><span>No surprises.</span></h2></div><p>Placeholder prices. Tell me your real packages and I'll fill them in.</p></div>
   <div class="plans">${[['Starter','$000','A single landing page',['1 page, up to 5 sections','Mobile responsive','Contact form','1 round of revisions'],0],['Business','$000','A complete business website',['Up to 6 pages','Custom animations','SEO & speed setup','3 rounds of revisions','2 weeks of support'],1],['Store','$000','A full online store',['Product & cart pages','Payment setup','Admin training','3 rounds of revisions'],0]].map(p=>`<div class="glass plan ${p[4]?'dark':''}">${p[4]?'<span class="tag">Most popular</span>':''}<h3>${p[0]}</h3><div class="p">${p[1]}<small>starting at</small></div><div class="s">${p[2]}</div><ul>${p[3].map(l=>`<li>${l}</li>`).join('')}</ul><div class="b">Choose ${p[0]}</div></div>`).join('')}</div></section>
  <section><div class="glass quote"><div class="q">“Your client's words go here.<span> A short, honest quote about what it was like to work with you and the result they got.”</span><div class="dots"><i></i><i></i><i></i></div></div><div class="who"><div class="av"></div><b>Client name</b>Role, Company</div></div></section>
  <section><div class="contact"><div class="lft"><div class="k">Contact</div><h2>Let's build<br>something<br><span>people remember.</span></h2><p>Tell me about your project and I'll reply within a day with ideas and a quote.</p>
    <div class="ln">Email <span>you@example.com ↗</span></div><div class="ln">WhatsApp <span>+00 000 000 000 ↗</span></div><div class="ln">Fiverr <span>fiverr.com/yourname ↗</span></div></div>
   <div class="glass form"><label>Your name</label><div class="in">Jane Doe</div><label>Email</label><div class="in">jane@company.com</div><label>What do you need?</label><div class="chips"><i class="on">Landing page</i><i>Online store</i><i>Web app</i><i>Redesign</i></div><label>Project details</label><div class="in ta">Tell me a little about it…</div><div class="send">Send message →</div></div></div></section>`;
  document.body.appendChild(main);
  const f=document.createElement('footer');f.innerHTML=`<div class="big">Your Name</div><div class="row"><div>© 2026 Your Name. All rights reserved.</div><div><span>Services</span><span>Work</span><span>Pricing</span><span>Contact</span><span>Back to top ↑</span></div></div>`;document.body.appendChild(f);
}
(composer?composer:{render:()=>renderer.render(scene,camera)}).render();
if(composer)composer.render();
window.DONE=true;
