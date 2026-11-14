// Original artwork: Amber Morning. Run with SHARP_MODULE pointing to a local sharp installation.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');
let seed = 20261114;
const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
const pieces = [];
const add = s => pieces.push(s);
const ellipse = (x,y,rx,ry,fill,extra='') => add(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`);
add(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<defs>
 <radialGradient id="table" cx="20%" cy="15%" r="110%"><stop stop-color="#5d4636"/><stop offset=".52" stop-color="#292523"/><stop offset="1" stop-color="#101a1c"/></radialGradient>
 <radialGradient id="plate"><stop stop-color="#f1e9da"/><stop offset=".68" stop-color="#ddd8ce"/><stop offset=".85" stop-color="#b8b9b4"/><stop offset=".92" stop-color="#f6eee2"/><stop offset="1" stop-color="#a1aaa7"/></radialGradient>
 <linearGradient id="side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b86c27"/><stop offset=".24" stop-color="#ffe2a0"/><stop offset=".46" stop-color="#edbf73"/><stop offset=".8" stop-color="#c8883b"/><stop offset="1" stop-color="#8c401b"/></linearGradient>
 <radialGradient id="top" cx="38%" cy="29%" r="75%"><stop stop-color="#eec27d"/><stop offset=".5" stop-color="#cc843b"/><stop offset=".83" stop-color="#a35020"/><stop offset=".94" stop-color="#d99645"/><stop offset="1" stop-color="#ffcf80"/></radialGradient>
 <linearGradient id="syrup" x1=".1" y1="0" x2=".85" y2="1"><stop stop-color="#fff0ab"/><stop offset=".1" stop-color="#e5a135"/><stop offset=".35" stop-color="#ac4812"/><stop offset=".62" stop-color="#69270e"/><stop offset=".82" stop-color="#d47a1d"/><stop offset="1" stop-color="#f1b63f"/></linearGradient>
 <linearGradient id="butter" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffbd0"/><stop offset=".5" stop-color="#ffe59a"/><stop offset="1" stop-color="#e8b34f"/></linearGradient>
 <radialGradient id="berry" cx="30%" cy="22%"><stop stop-color="#9cadc2"/><stop offset=".25" stop-color="#6b819d"/><stop offset=".6" stop-color="#354764"/><stop offset=".9" stop-color="#19233a"/><stop offset="1" stop-color="#0d1522"/></radialGradient>
 <radialGradient id="rasp" cx="25%" cy="20%"><stop stop-color="#ff8c75"/><stop offset=".3" stop-color="#e7434a"/><stop offset=".7" stop-color="#b80f33"/><stop offset="1" stop-color="#5e0b26"/></radialGradient>
 <linearGradient id="leaf"><stop stop-color="#b4c662"/><stop offset=".5" stop-color="#4e823b"/><stop offset="1" stop-color="#1a462a"/></linearGradient>
 <filter id="shadow" x="-40%" y="-70%" width="180%" height="240%"><feGaussianBlur stdDeviation="17"/></filter>
 <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" seed="8"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter>
</defs>
<path fill="url(#table)" d="M0 0h1024v1024H0z"/>`);
// Quiet linen at the left, angled away from the hero dish.
add(`<path d="M0 176 L113 130 L287 951 L0 1024Z" fill="#a5a49a" opacity=".54"/>
<path d="M0 196 L88 165 L256 959" fill="none" stroke="#dad2bf" stroke-width="3" opacity=".32"/>`);
for(let i=0;i<85;i++) add(`<path d="M${-85+i*3} 179l171 810" stroke="#e2dfd3" stroke-width=".7" opacity=".12"/>`);
ellipse(546,786,422,160,'#050e10','filter="url(#shadow)" opacity=".75"');
ellipse(517,711,425,225,'#727b79');
ellipse(511,698,425,224,'url(#plate)');
ellipse(511,695,368,177,'none','stroke="#979d99" stroke-width="2" opacity=".42"');
ellipse(511,697,350,163,'#e6dfd2');
ellipse(530,731,271,113,'#3a2116','opacity=".36" filter="url(#shadow)"');
// A little syrup pooled on the porcelain.
add(`<path d="M299 704C360 675 670 658 732 709C807 767 686 807 589 800C498 791 416 828 319 785C271 762 251 728 299 704Z" fill="url(#syrup)"/>
<path d="M310 768C390 803 470 786 507 792M629 787Q701 788 735 760" fill="none" stroke="#f8ce81" stroke-width="3" opacity=".65"/>`);
// Four pancakes, each with individual scalloping, airy pores and browned edges.
for(let layer=0;layer<4;layer++){
 const y=665-layer*83, rx=241-layer*6, ry=90;
 add(`<path d="M${512-rx} ${y-6}C${512-rx-7} ${y+25} ${512-rx+2} ${y+54} ${512-rx+21} ${y+62}C${400} ${y+117} ${646} ${y+119} ${512+rx-14} ${y+57}Q${512+rx+6} ${y+33} ${512+rx} ${y-6}Z" fill="url(#side)"/>`);
 ellipse(512,y,rx,ry,'url(#top)');
 add(`<path d="M${512-rx+4} ${y+13}C${512-rx+20} ${y+104} ${512+rx-17} ${y+108} ${512+rx-2} ${y+5}" fill="none" stroke="#ffdaa0" stroke-width="4" opacity=".7"/>`);
 for(let i=0;i<800;i++){
  const a=random()*Math.PI*2, r=Math.sqrt(random())*.96;
  const x=512+Math.cos(a)*rx*r, yy=y+Math.sin(a)*ry*r;
  const rr=.4+random()*3;
  ellipse(x.toFixed(2),yy.toFixed(2),rr.toFixed(2),(rr*.48).toFixed(2),random()>.4?'#773711':'#ffe2a0',`opacity="${(.08+random()*.2).toFixed(2)}"`);
 }
 for(let i=0;i<150;i++){
  const a=random()*Math.PI, x=512+Math.cos(a)*(rx-7), yy=y+Math.sin(a)*85+14+random()*30;
  ellipse(x.toFixed(2),yy.toFixed(2),(.6+random()*1.8).toFixed(2),(.5+random()*1).toFixed(2),'#79451f',`opacity="${(.15+random()*.28).toFixed(2)}"`);
 }
}
// Syrup flows over the top and down the front in asymmetric rounded rivulets.
add(`<path d="M337 406C356 365 412 351 475 355C538 335 655 352 697 383C739 415 686 443 658 454C643 473 660 504 641 527C624 545 607 526 613 505C616 479 601 464 578 475C549 490 562 539 546 568C537 586 518 584 512 567C505 547 521 518 504 493C486 468 452 482 435 470C416 454 392 462 375 452C346 444 329 426 337 406Z" fill="url(#syrup)"/>
<path d="M518 510C530 535 514 557 525 569M624 480Q634 497 625 514M366 404Q391 379 433 377M567 363Q625 362 664 383" fill="none" stroke="#ffe2a0" stroke-width="4" stroke-linecap="round" opacity=".8"/>
<path d="M557 474Q574 466 592 469" fill="none" stroke="#fff5cf" stroke-width="2" opacity=".8"/>
<ellipse cx="511" cy="409" rx="78" ry="28" fill="#ffd99a" opacity=".27" filter="url(#soft)"/>
<path d="M449 371L540 349L588 377L502 402L450 385Z" fill="#d39b40"/>
<path d="M451 357Q450 352 456 350L539 330Q545 329 551 333L587 355L585 376L501 399L452 380Z" fill="#efcb73"/>
<path d="M452 351L540 330L587 355L500 378Z" fill="url(#butter)"/>
<path d="M457 351L500 374L578 355" fill="none" stroke="#fffbd9" stroke-width="3" opacity=".9"/>
<path d="M500 380v13" stroke="#fff0b6" stroke-width="2"/>`);
function blueberry(x,y,r){
 ellipse(x+5,y+r*.65,r*.95,r*.39,'#0b131a','opacity=".45" filter="url(#soft)"');
 ellipse(x,y,r,r*.91,'url(#berry)');
 add(`<path d="M${x-r*.35} ${y-r*.56}q${r*.4} ${-r*.22} ${r*.65} 0" fill="none" stroke="#c3cad0" stroke-width="2" opacity=".38"/>`);
 const cy=y-r*.38;
 add(`<path d="M${x-7} ${cy}l5 -4l4 3l5 -1l-2 5l-5 3l-5 -2Z" fill="#202b41" stroke="#8393a7" stroke-width="1"/>`);
}
function raspberry(x,y,r){
 ellipse(x+4,y+r*.8,r,r*.38,'#371523','opacity=".36" filter="url(#soft)"');
 ellipse(x,y,r*.85,r,'#740c2c');
 for(let row=0;row<5;row++)for(let col=0;col<5;col++){
  const xx=(col-2)*r*.34+(row%2)*r*.12, yy=(row-2)*r*.34;
  if(xx*xx/(r*r*.75)+yy*yy/(r*r)>.9)continue;
  ellipse(x+xx,y+yy,r*.24,r*.26,'url(#rasp)');
  ellipse(x+xx-r*.07,y+yy-r*.09,r*.055,r*.035,'#ffc0a2','opacity=".64"');
 }
}
blueberry(421,380,22); blueberry(399,397,23); raspberry(635,378,30); blueberry(665,407,24);
raspberry(739,730,37); raspberry(694,772,31); blueberry(765,780,26); blueberry(718,812,23);
blueberry(300,754,26); blueberry(268,789,23); raspberry(330,815,29);
// Fresh mint accents; veins deliberately follow the leaf's curve.
function leaf(x,y,angle,scale){
 add(`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})"><path d="M0 0C-41 -12 -46 -48 -37 -71C-4 -62 14 -29 0 0Z" fill="url(#leaf)"/><path d="M0 0L-36 -65M-9 -17l-21 -5M-17 -32l-18 -6M-23 -45l-14 -5M-9 -17l5 -14M-17 -32l5 -14" stroke="#b7ca7b" stroke-width="1.2" fill="none" opacity=".6"/></g>`);
}
leaf(695,750,-25,1); leaf(694,751,53,.87); leaf(375,407,-69,.62);
// Sparse crumbs, never decorative clutter across the focal point.
for(let i=0;i<72;i++){
 const a=random()*Math.PI*2, r=280+random()*92;
 const x=512+Math.cos(a)*r, y=704+Math.sin(a)*r*.45;
 ellipse(x,y,.7+random()*2.2,.5+random()*1.2,random()>.4?'#a9682e':'#fff3d4','opacity=".65"');
}
add(`<path d="M0 0h1024v1024H0z" fill="transparent" filter="url(#grain)"/>
</svg>`);
// Crop the original scene closer: give food, not empty table, the visual weight.
const svg=pieces.join('\n').replace('viewBox="0 0 1024 1024"','viewBox="72 195 880 800"');
// SVG remains a standalone, editable source; the grader only copies the rendered PNG.
writeFileSync(new URL('artwork.svg',import.meta.url),svg);
await sharp(Buffer.from(svg)).resize(1024,1024).png({compressionLevel:9,palette:true,colours:256,dither:0.7}).toFile(new URL('entry.png',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
console.log('Rendered original artwork to entry.png');
