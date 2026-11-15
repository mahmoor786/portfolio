const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const names={a:'A-floating-studio',b:'B-3d-room',c:'C-liquid-sculpture',d:'D-minimal-floating',e:'1-atelier',f:'2-noir',g:'3-glass',h:'4-swiss',i:'5-gallery',z:'full-website-glass'};
for(const s of (process.argv[2]||'abc')){const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
p.on('console',m=>m.type()=='error'&&console.log(s,m.text()));p.on('pageerror',e=>console.log(s,'ERR',e.message));
await p.goto('http://localhost:8765/index.html?s='+s);await p.waitForFunction('window.DONE',{timeout:90000}).catch(e=>console.log(s,'timeout'));
await p.waitForTimeout(1200);await p.screenshot({path:names[s]+'.png',fullPage:s=='z'});await p.close();console.log('ok',s)}
await b.close()})();
