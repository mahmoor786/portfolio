const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const VH=1000;const p=await b.newPage({viewport:{width:1440,height:VH},deviceScaleFactor:2});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html?s=z');await p.waitForFunction('window.DONE',{timeout:120000});await p.waitForTimeout(1500);
const h=await p.evaluate(()=>document.documentElement.scrollHeight);console.log('height',h);
let i=0;for(let y=0;y<h;y+=VH){const yy=Math.min(y,h-VH);await p.evaluate(v=>scrollTo(0,v),yy);await p.waitForTimeout(250);await p.screenshot({path:`slice${i}.png`});console.log(i,yy);i++}
await b.close()})();
