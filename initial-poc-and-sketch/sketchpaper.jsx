import { useState, useRef, useEffect, useCallback } from "react";

// ── Fonts ─────────────────────────────────────────────────────────────────────
function injectFonts(){
  if(document.getElementById('skai-fonts')) return;
  const l=document.createElement('link'); l.id='skai-fonts'; l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Kalam:wght@400;700&family=Abril+Fatface&display=swap';
  document.head.appendChild(l);
}

// ── Solarized palette ─────────────────────────────────────────────────────────
const S={
  base3:'#fdf6e3',base2:'#eee8d5',base1:'#93a1a1',base0:'#839496',
  base00:'#657b83',base01:'#586e75',base02:'#073642',base03:'#002b36',
  yellow:'#b58900',orange:'#cb4b16',red:'#dc322f',magenta:'#d33682',
  violet:'#6c71c4',blue:'#268bd2',cyan:'#2aa198',green:'#859900',
};

// ── RNG ───────────────────────────────────────────────────────────────────────
function mkRng(seed){
  let s=((seed*1013904223)>>>0)^0xdeadbeef||1;
  return()=>{s^=s<<13;s^=s>>17;s^=s<<5;return(s>>>0)/0xffffffff;};
}

// ── Wobble: multi-harmonic, asymmetric envelope ───────────────────────────────
function wobble(x1,y1,x2,y2,amp,waves,rng,hum=0){
  const dist=Math.hypot(x2-x1,y2-y1); if(dist<1)return[[x1,y1],[x2,y2]];
  const dx=x2-x1,dy=y2-y1,nx=-dy/dist,ny=dx/dist;
  const nh=2+Math.floor(rng()*2);
  const H=[];
  for(let h=0;h<nh;h++) H.push({a:amp*(0.25+rng()*0.75)/(h+1),f:waves*(0.4+rng()*1.6)+h*rng()*0.7,p:rng()*Math.PI*2});
  const bp=0.15+rng()*0.7;
  const env=t=>Math.min(1,Math.pow(Math.max(t,0.001)/bp,.55))*Math.min(1,Math.pow(Math.max(1-t,0.001)/(1-bp),.55));
  const ed=amp*0.12+hum*0.9, ex=(rng()-.5)*ed,ey=(rng()-.5)*ed;
  const hasTr=hum>0&&rng()<hum*0.5, trAt=rng(),trLen=.03+rng()*.09,trAmp=(1+rng()*2)*hum;
  const hasHe=hum>0&&rng()<hum*0.35, heAt=.2+rng()*.6,heAmp=(.5+rng()*1.5)*hum;
  const over=hum>0&&rng()<hum*0.28?(rng()*1.8*hum):0;
  const segs=Math.max(6,Math.floor(dist/5));
  const pts=[[x1+(rng()-.5)*amp*.1,y1+(rng()-.5)*amp*.1]];
  for(let i=1;i<segs;i++){
    const t=i/segs,e=env(t);
    let w=0; for(const h of H) w+=Math.sin(t*Math.PI*2*h.f+h.p)*h.a*e;
    w+=(rng()-.5)*amp*.05;
    let jx=0,jy=0;
    if(hasTr){const td=Math.abs(t-trAt);if(td<trLen)jx=(rng()-.5)*trAmp*(1-td/trLen);}
    if(hasHe){const hd=Math.abs(t-heAt);if(hd<.05)jy=(rng()-.5)*heAmp*(1-hd/.05);}
    pts.push([x1+t*dx+nx*(w+jy)+jx,y1+t*dy+ny*(w+jy)+jx]);
  }
  if(over>0){pts.push([x2+ex+(dx/dist)*over,y2+ey+(dy/dist)*over]);pts.push([x2+ex*.3,y2+ey*.3]);}
  else pts.push([x2+ex,y2+ey]);
  return pts;
}

function cpath(ctx,pts){
  if(pts.length<2)return;
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
  if(pts.length===2){ctx.lineTo(pts[1][0],pts[1][1]);}
  else{
    for(let i=1;i<pts.length-1;i++){const mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;ctx.quadraticCurveTo(pts[i][0],pts[i][1],mx,my);}
    ctx.lineTo(pts[pts.length-1][0],pts[pts.length-1][1]);
  }
  ctx.stroke();
}

// ── Stroke renderers ──────────────────────────────────────────────────────────
function pencilS(ctx,pts,col,rng,h=0){
  ctx.save();ctx.lineCap="round";ctx.lineJoin="round";
  for(let p=0;p<3;p++){ctx.strokeStyle=col;ctx.lineWidth=.45+rng()*.5;ctx.globalAlpha=.2+rng()*.22;cpath(ctx,pts.map(([x,y])=>[x+(rng()-.5)*.6,y+(rng()-.5)*.6]));}
  ctx.restore();
}
function ballpointS(ctx,pts,col,rng,h=0){
  ctx.save();
  ctx.fillStyle=col;ctx.globalAlpha=.12+rng()*.14;ctx.beginPath();ctx.arc(pts[0][0],pts[0][1],.7+rng()*.8,0,Math.PI*2);ctx.fill();
  ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle=col;
  const sp=h>0&&rng()<h*.4,sat=rng(),ss=(h*.8+rng()*1.2);
  for(let i=0;i<pts.length-1;i++){
    const t=(i+.5)/Math.max(pts.length-1,1),p=.3+.7*Math.sin(t*Math.PI),ex=sp&&Math.abs(t-sat)<.05?ss:0;
    ctx.lineWidth=.45+p*1.0+(rng()-.5)*.2+ex*.25;ctx.globalAlpha=.5+p*.45+(rng()-.5)*.05;
    ctx.beginPath();ctx.moveTo(pts[i][0],pts[i][1]);ctx.lineTo(pts[i+1][0],pts[i+1][1]);ctx.stroke();
  }
  ctx.restore();
}
function inkS(ctx,pts,col,rng,h=0){
  ctx.save();ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle=col;
  const sk=h>0&&rng()<h*.1,sk0=rng(),skl=.04+rng()*.04;
  for(let i=0;i<pts.length-1;i++){
    const t=i/Math.max(pts.length-1,1);
    if(sk&&t>sk0&&t<sk0+skl)continue;
    const f=Math.max(.4,1-t*.25);
    ctx.lineWidth=.8+f*1.0+(rng()-.5)*.3;ctx.globalAlpha=.8+f*.18;
    ctx.beginPath();ctx.moveTo(pts[i][0],pts[i][1]);ctx.lineTo(pts[i+1][0],pts[i+1][1]);ctx.stroke();
  }
  ctx.restore();
}
function bpS(ctx,pts,col,rng){
  // Blueprint = technical drafting: consistent 1.1px, high opacity, minimal variation
  ctx.save();ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle=col;
  // single pass — clean, confident line
  ctx.lineWidth=1.0+(rng()-.5)*.08;ctx.globalAlpha=.88+rng()*.1;
  cpath(ctx,pts);
  // faint second pass for slight ink depth
  ctx.lineWidth=.3;ctx.globalAlpha=.15+rng()*.1;
  cpath(ctx,pts);
  ctx.restore();
}
function glob(ctx,pts,col,rng,h){
  if(h<.1||rng()>h*.25)return;
  const i=Math.floor(rng()*pts.length);
  ctx.save();ctx.fillStyle=col;ctx.globalAlpha=.08+rng()*.14;
  ctx.beginPath();ctx.arc(pts[i][0],pts[i][1],.6+rng()*1.1*h,0,Math.PI*2);ctx.fill();ctx.restore();
}
function doS(ctx,pts,col,tool,paper,rng,h=0){
  if(paper==="blueprint")bpS(ctx,pts,col,rng);
  else if(tool==="pencil"){pencilS(ctx,pts,col,rng,h);if(h>0)glob(ctx,pts,col,rng,h);}
  else if(tool==="ink"){inkS(ctx,pts,col,rng,h);if(h>0)glob(ctx,pts,col,rng,h);}
  else{ballpointS(ctx,pts,col,rng,h);if(h>0)glob(ctx,pts,col,rng,h);}
}
function HL(ctx,x1,y1,x2,y2,cfg){
  const h=cfg.humanness||0,pts=wobble(x1,y1,x2,y2,cfg.amplitude,cfg.waves,cfg.rng,h);
  doS(ctx,pts,cfg.color,cfg.tool,cfg.paper,cfg.rng,h);
}

// ── Element bounds ────────────────────────────────────────────────────────────
function eBounds(el){
  switch(el.type){
    case"rect":  return{x:el.x,y:el.y,w:el.w,h:el.h};
    case"circle":return{x:el.cx-el.r,y:el.cy-el.r,w:el.r*2,h:el.r*2};
    case"line": case"arrow": case"dashed": case"dim":
      return{x:Math.min(el.x1,el.x2),y:Math.min(el.y1,el.y2),w:Math.abs(el.x2-el.x1)||4,h:Math.abs(el.y2-el.y1)||4};
    case"text":  return{x:el.x,y:el.y-12,w:(el.content||"").length*(el.size||11)*.6,h:el.size||11};
    default:     if(el.x!==undefined)return{x:el.x,y:el.y,w:el.w||60,h:el.h||60};return{x:0,y:0,w:1,h:1};
  }
}
function hitTest(el,mx,my){
  const p=9;
  if(el.type==="rect")  return mx>=el.x-p&&mx<=el.x+el.w+p&&my>=el.y-p&&my<=el.y+el.h+p;
  if(el.type==="circle")return Math.hypot(mx-el.cx,my-el.cy)<=el.r+p;
  if(["line","arrow","dashed","dim"].includes(el.type)){
    const dx=el.x2-el.x1,dy=el.y2-el.y1,l2=dx*dx+dy*dy;
    if(l2===0)return Math.hypot(mx-el.x1,my-el.y1)<p;
    const t=Math.max(0,Math.min(1,((mx-el.x1)*dx+(my-el.y1)*dy)/l2));
    return Math.hypot(mx-(el.x1+t*dx),my-(el.y1+t*dy))<p;
  }
  if(el.type==="text"){const b=eBounds(el);return mx>=b.x-2&&mx<=b.x+b.w+2&&my>=b.y-2&&my<=b.y+b.h+2;}
  if(el.x!==undefined){const b=eBounds(el);return mx>=b.x-p&&mx<=b.x+b.w+p&&my>=b.y-p&&my<=b.y+b.h+p;}
  return false;
}
function boxIntersect(el,bx,by,bw,bh,touch){
  const b=eBounds(el);
  return touch?(b.x<bx+bw&&b.x+b.w>bx&&b.y<by+bh&&b.y+b.h>by):(b.x>=bx&&b.y>=by&&b.x+b.w<=bx+bw&&b.y+b.h<=by+bh);
}
function moveEl(el,dx,dy){
  if(el.type==="rect")  return{...el,x:el.x+dx,y:el.y+dy};
  if(el.type==="circle")return{...el,cx:el.cx+dx,cy:el.cy+dy};
  if(["line","arrow","dashed","dim"].includes(el.type))return{...el,x1:el.x1+dx,y1:el.y1+dy,x2:el.x2+dx,y2:el.y2+dy};
  if(el.type==="text")  return{...el,x:el.x+dx,y:el.y+dy};
  if(el.x!==undefined)  return{...el,x:el.x+dx,y:el.y+dy};
  return el;
}

// ── Resolve color ─────────────────────────────────────────────────────────────
function rCol(el,cfg,txt=false){
  if(txt&&el.textColor)return el.textColor;
  if(el.color)return el.color;
  return cfg.inkColor;
}

// ── Render element ────────────────────────────────────────────────────────────
function renderEl(ctx,el,idx,cfg,sel){
  const rng=mkRng(idx*997+42),col=rCol(el,cfg),c={...cfg,rng,color:col};
  const dl=(x1,y1,x2,y2)=>HL(ctx,x1,y1,x2,y2,c);

  if(sel){
    ctx.save();ctx.strokeStyle="#268bd2";ctx.lineWidth=1;ctx.globalAlpha=.65;ctx.setLineDash([4,3]);
    const b=eBounds(el);ctx.strokeRect(b.x-7,b.y-7,b.w+14,b.h+14);ctx.setLineDash([]);ctx.restore();
  }

  switch(el.type){
    case"line": dl(el.x1,el.y1,el.x2,el.y2); break;
    case"rect":{
      const{x,y,w,h}=el,o=()=>(rng()-.5)*cfg.amplitude*.3;
      dl(x+o(),y+o(),x+w+o(),y+o());dl(x+w+o(),y+o(),x+w+o(),y+h+o());
      dl(x+w+o(),y+h+o(),x+o(),y+h+o());dl(x+o(),y+h+o(),x+o(),y+o());
      if(el.label)renderEl(ctx,{type:"text",x:x+5,y:y+h/2+4,content:el.label,size:9,color:el.textColor||col},idx+500,cfg,false);
      break;
    }
    case"circle":{
      const{cx,cy,r}=el,n=Math.max(20,Math.floor(r*1.8)),pts=[];
      for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2-Math.PI/2,wr=r+(rng()-.5)*cfg.amplitude*.7;pts.push([cx+Math.cos(a)*wr,cy+Math.sin(a)*wr]);}
      doS(ctx,pts,col,cfg.tool,cfg.paper,rng,cfg.humanness||0); break;
    }
    case"arc":{
      const{x,y,r,startAngle=0,sweep=Math.PI/2}=el,pts=[];
      for(let i=0;i<=14;i++){const a=startAngle+(i/14)*sweep;pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r]);}
      doS(ctx,pts,col,cfg.tool,cfg.paper,rng,cfg.humanness||0); break;
    }
    case"arrow":{
      const{x1,y1,x2,y2}=el,a=Math.atan2(y2-y1,x2-x1),s=9,sp=.42;
      dl(x1,y1,x2,y2);dl(x2,y2,x2-s*Math.cos(a-sp),y2-s*Math.sin(a-sp));dl(x2,y2,x2-s*Math.cos(a+sp),y2-s*Math.sin(a+sp)); break;
    }
    case"text":{
      const{x,y,content="",size=11}=el,tc=rCol(el,cfg,true);
      ctx.save();ctx.font=`${size}px 'Courier New',monospace`;ctx.fillStyle=tc;
      let cx2=x;
      for(let i=0;i<content.length;i++){
        const cw=ctx.measureText(content[i]).width,jy=(rng()-.5)*cfg.amplitude*.4,rot=(rng()-.5)*cfg.amplitude*.01;
        ctx.save();ctx.globalAlpha=.88+rng()*.12;ctx.translate(cx2,y+jy);ctx.rotate(rot);ctx.fillText(content[i],0,0);ctx.restore();cx2+=cw;
      }
      ctx.restore(); break;
    }
    case"dashed":{ctx.save();ctx.setLineDash([6,4]);dl(el.x1,el.y1,el.x2,el.y2);ctx.setLineDash([]);ctx.restore(); break;}
    case"dim":{
      const{x1,y1,x2,y2,label="",offset=0}=el;
      const ang=Math.atan2(y2-y1,x2-x1),px=Math.cos(ang+Math.PI/2),py=Math.sin(ang+Math.PI/2);
      const ox2=px*offset,oy2=py*offset,tn=5;
      const dpts=wobble(x1+ox2,y1+oy2,x2+ox2,y2+oy2,cfg.amplitude*.3,cfg.waves*.5,rng);
      doS(ctx,dpts,col,cfg.tool,cfg.paper,rng);
      dl(x1+ox2-px*tn,y1+oy2-py*tn,x1+ox2+px*tn,y1+oy2+py*tn);
      dl(x2+ox2-px*tn,y2+oy2-py*tn,x2+ox2+px*tn,y2+oy2+py*tn);
      if(offset!==0){ctx.save();ctx.setLineDash([3,4]);HL(ctx,x1,y1,x1+ox2,y1+oy2,{...c});HL(ctx,x2,y2,x2+ox2,y2+oy2,{...c});ctx.setLineDash([]);ctx.restore();}
      if(label){
        const isV=Math.abs(x1-x2)<Math.abs(y1-y2),lx=(x1+x2)/2+ox2+px*8,ly=(y1+y2)/2+oy2+py*8;
        if(isV){ctx.save();ctx.translate(lx,ly);ctx.rotate(-Math.PI/2);renderEl(ctx,{type:"text",x:-label.length*3,y:0,content:label,size:8,color:col},idx+600,cfg,false);ctx.restore();}
        else renderEl(ctx,{type:"text",x:lx-label.length*3,y:ly+4,content:label,size:8,color:col},idx+600,cfg,false);
      }
      break;
    }
    case"window":{
      const{x,y,w,d=8,wall="h"}=el;
      if(wall==="h"){dl(x,y,x+w,y);dl(x,y+d,x+w,y+d);dl(x,y,x,y+d);dl(x+w,y,x+w,y+d);dl(x+2,y+d*.35,x+w-2,y+d*.35);dl(x+2,y+d*.65,x+w-2,y+d*.65);}
      else{dl(x,y,x,y+w);dl(x+d,y,x+d,y+w);dl(x,y,x+d,y);dl(x,y+w,x+d,y+w);dl(x+d*.35,y+2,x+d*.35,y+w-2);dl(x+d*.65,y+2,x+d*.65,y+w-2);}
      break;
    }
    case"door-symbol":{
      const{x,y,w=36,swing="right",wall="h"}=el,pts2=[];
      if(wall==="h"){
        dl(x,y,x+w,y);
        if(swing==="right"){for(let i=0;i<=10;i++){const a=-(i/10)*Math.PI/2;pts2.push([x+w+Math.cos(a)*w,y+Math.sin(a)*w]);}}
        else{for(let i=0;i<=10;i++){const a=Math.PI+(i/10)*Math.PI/2;pts2.push([x+Math.cos(a)*w,y+Math.sin(a)*w]);}}
      }else{
        dl(x,y,x,y+w);
        for(let i=0;i<=10;i++){const a=-(i/10)*Math.PI/2+Math.PI/2;pts2.push([x+Math.sin(a)*w,y+w+Math.cos(a)*w]);}
      }
      doS(ctx,pts2,col,cfg.tool,cfg.paper,rng); break;
    }
    case"door-slide":{
      const{x,y,w=60,d=8,wall="h"}=el,p1=w*.55;
      if(wall==="h"){
        dl(x,y,x+w,y);dl(x,y+d,x+w,y+d);
        dl(x,y,x+p1,y);dl(x,y+d,x+p1,y+d);dl(x,y,x,y+d);dl(x+p1,y,x+p1,y+d);
        dl(x+w-p1,y+1,x+w,y+1);dl(x+w-p1,y+d-1,x+w,y+d-1);dl(x+w-p1,y+1,x+w-p1,y+d-1);dl(x+w,y+1,x+w,y+d-1);
      }else{
        dl(x,y,x,y+w);dl(x+d,y,x+d,y+w);
        dl(x,y,x+d,y);dl(x,y+p1,x+d,y+p1);dl(x+1,y+w-p1,x+d-1,y+w-p1);dl(x+1,y+w,x+d-1,y+w);
      }
      break;
    }
    case"stair":{
      const{x,y,w,h,steps=8,dir="up"}=el,sh=h/steps;
      dl(x,y,x,y+h);dl(x+w,y,x+w,y+h);
      for(let i=0;i<=steps;i++)dl(x,y+i*sh,x+w,y+i*sh);
      const ax=x+w/2;
      if(dir==="up"){dl(ax,y+h-4,ax,y+4);dl(ax,y+4,ax-4,y+10);dl(ax,y+4,ax+4,y+10);}
      else{dl(ax,y+4,ax,y+h-4);dl(ax,y+h-4,ax-4,y+h-10);dl(ax,y+h-4,ax+4,y+h-10);}
      break;
    }
    case"opening":{
      const{x,y,w,wall="h"}=el;
      ctx.save();ctx.setLineDash([3,3]);
      if(wall==="h"){dl(x,y,x+w,y);dl(x,y-4,x,y+4);dl(x+w,y-4,x+w,y+4);}
      else{dl(x,y,x,y+w);dl(x-4,y,x+4,y);dl(x-4,y+w,x+4,y+w);}
      ctx.setLineDash([]);ctx.restore(); break;
    }
    case"column":{
      const{x,y,s=12}=el;
      dl(x,y,x+s,y);dl(x+s,y,x+s,y+s);dl(x+s,y+s,x,y+s);dl(x,y+s,x,y);
      dl(x,y,x+s,y+s);dl(x+s,y,x,y+s); break;
    }
  }
}

// ── Element centering ─────────────────────────────────────────────────────────
function centerOf(elements,W,H,pad=28){
  if(!elements.length)return{ox:0,oy:0,sc:1};
  let mx=Infinity,my=Infinity,Mx=-Infinity,My=-Infinity;
  elements.forEach(el=>{const b=eBounds(el);mx=Math.min(mx,b.x);my=Math.min(my,b.y);Mx=Math.max(Mx,b.x+b.w);My=Math.max(My,b.y+b.h);});
  const cw=Mx-mx,ch=My-my,sc=Math.min((W-pad*2)/cw,(H-pad*2)/ch,1);
  return{ox:(W-cw*sc)/2-mx*sc,oy:(H-ch*sc)/2-my*sc,sc};
}

// ── Draw board (eternity canvas behind paper) ─────────────────────────────────
function drawBoard(ctx,W,H,paper,pan){
  // Board = same paper extending to infinity behind the paper sheet
  const bgs={cream:"#f0ead8",white:"#f0f0f0",yellow:"#f5efbf",blueprint:"#162d58"};
  const gcs={cream:"#a8c4d8",white:"#b5cde2",yellow:"#c8b470",blueprint:"rgba(160,200,255,.15)"};
  ctx.fillStyle=bgs[paper]||bgs.cream;
  ctx.fillRect(0,0,W,H);
  // infinite grid aligned with pan so it tiles seamlessly with the paper grid
  const step=20,gc=gcs[paper]||gcs.cream;
  const ox=((pan.x%step)+step)%step, oy=((pan.y%step)+step)%step;
  ctx.strokeStyle=gc;ctx.lineWidth=.35;ctx.globalAlpha=.35;
  for(let x=ox-step;x<W+step;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=oy-step;y<H+step;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.lineWidth=.6;ctx.globalAlpha=.15;
  for(let x=ox-step*5;x<W+step*5;x+=step*5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=oy-step*5;y<H+step*5;y+=step*5){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.globalAlpha=1;
}

// ── Draw paper ────────────────────────────────────────────────────────────────
function drawPaper(ctx,W,H,paper){
  if(paper==="blueprint"){
    const g=ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,"#1a3a6b");g.addColorStop(.5,"#1e4278");g.addColorStop(1,"#16305e");
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(let i=0;i<300;i++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*.015})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2,Math.random()*2);}
    ctx.strokeStyle="rgba(180,210,255,.1)";ctx.lineWidth=.35;
    for(let x=0;x<=W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<=H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    ctx.strokeStyle="rgba(180,210,255,.18)";ctx.lineWidth=.55;
    for(let x=0;x<=W;x+=100){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<=H;y+=100){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    return;
  }
  const bgs={cream:"#f7f0e6",white:"#fafafa",yellow:"#fef9d3"};
  const gcs={cream:"#a8c4d8",white:"#b5cde2",yellow:"#c8b470"};
  ctx.fillStyle=bgs[paper]||bgs.cream;ctx.fillRect(0,0,W,H);
  for(let i=0;i<600;i++){const v=Math.random();ctx.fillStyle=v>.5?`rgba(255,255,255,${(v-.5)*.05})`:`rgba(0,0,0,${(.5-v)*.05})`;ctx.fillRect(Math.random()*W,Math.random()*H,Math.random()*2,Math.random()*2);}
  const s=20,gc=gcs[paper]||gcs.cream;
  ctx.strokeStyle=gc;ctx.lineWidth=.35;ctx.globalAlpha=.35;
  for(let x=0;x<=W;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<=H;y+=s){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.lineWidth=.6;ctx.globalAlpha=.15;
  for(let x=0;x<=W;x+=s*5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<=H;y+=s*5){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.globalAlpha=1;
}

// ── Blueprint overlay: period title block ─────────────────────────────────────
function drawBlueprintOverlay(ctx,W,H,title="PLANRITNING"){
  const wc="rgba(200,225,255,.75)",wl="rgba(200,225,255,.5)";
  // double border
  ctx.strokeStyle=wc;ctx.lineWidth=.9;ctx.strokeRect(10,10,W-20,H-20);
  ctx.strokeStyle=wl;ctx.lineWidth=.4;ctx.strokeRect(14,14,W-28,H-28);
  // center title
  ctx.font="bold 11px Georgia,serif";ctx.fillStyle=wc;ctx.textAlign="center";
  ctx.fillText(title,W/2,26);
  ctx.lineWidth=.4;ctx.strokeStyle=wl;
  ctx.beginPath();ctx.moveTo(W/2-70,30);ctx.lineTo(W/2+70,30);ctx.stroke();
  // title block bottom-right
  const tw=180,th=72,tx=W-10-tw,ty=H-10-th;
  ctx.strokeStyle=wc;ctx.lineWidth=.6;ctx.strokeRect(tx,ty,tw,th);
  ctx.lineWidth=.4;ctx.strokeStyle=wl;
  ctx.beginPath();ctx.moveTo(tx,ty+22);ctx.lineTo(tx+tw,ty+22);ctx.stroke();
  ctx.moveTo(tx,ty+44);ctx.lineTo(tx+tw,ty+44);ctx.stroke();
  ctx.moveTo(tx+90,ty+22);ctx.lineTo(tx+90,ty+th);ctx.stroke();
  ctx.font="bold 8px Georgia,serif";ctx.fillStyle=wc;ctx.textAlign="center";
  ctx.fillText(title,tx+tw/2,ty+15);
  ctx.font="7px Georgia,serif";ctx.textAlign="left";ctx.fillStyle=wl;
  ctx.fillText("ÄGARE: Villa Ekvägen 12",tx+4,ty+35);
  ctx.fillText("DATUM: 15 Januari 1902",tx+4,ty+57);
  ctx.fillText("SKALA: 1:100",tx+94,ty+35);
  ctx.fillText("ARK.NR: A-001",tx+94,ty+57);
  // north arrow
  const nx=W-10-tw-22,ny=H-44;
  ctx.strokeStyle=wl;ctx.lineWidth=.8;
  ctx.beginPath();ctx.moveTo(nx,ny-12);ctx.lineTo(nx,ny+12);ctx.stroke();
  ctx.beginPath();ctx.moveTo(nx-7,ny);ctx.lineTo(nx+7,ny);ctx.stroke();
  ctx.font="bold 7px Georgia";ctx.textAlign="center";ctx.fillStyle=wc;
  ctx.fillText("N",nx,ny-15);
  // scale bar
  const sb=4,sbw=80,sbx=14+10,sby=H-10-8;
  ctx.strokeStyle=wl;ctx.lineWidth=.6;
  ctx.strokeRect(sbx,sby-sb,sbw,sb);
  for(let i=0;i<=4;i++){ctx.beginPath();ctx.moveTo(sbx+i*sbw/4,sby-sb);ctx.lineTo(sbx+i*sbw/4,sby+2);ctx.stroke();}
  ctx.font="6px Georgia";ctx.textAlign="left";ctx.fillStyle=wl;
  ctx.fillText("0        5        10       15m",sbx,sby+10);
}

// ── Presets ───────────────────────────────────────────────────────────────────
const FLOOR=[
  {type:"line",x1:40,y1:30,x2:500,y2:30,color:"#111"},
  {type:"line",x1:500,y1:30,x2:500,y2:375,color:"#111"},
  {type:"line",x1:40,y1:375,x2:500,y2:375,color:"#111"},
  {type:"line",x1:40,y1:30,x2:40,y2:375,color:"#111"},
  {type:"line",x1:40,y1:215,x2:310,y2:215,color:"#222"},
  {type:"line",x1:230,y1:30,x2:230,y2:215,color:"#222"},
  {type:"line",x1:230,y1:215,x2:230,y2:375,color:"#222"},
  {type:"line",x1:360,y1:215,x2:360,y2:375,color:"#222"},
  {type:"line",x1:360,y1:298,x2:500,y2:298,color:"#222"},
  {type:"line",x1:230,y1:298,x2:360,y2:298,color:"#222"},
  // doors
  {type:"arc",x:230,y:215,r:30,startAngle:0,sweep:1.57,color:"#8b1a1a"},
  {type:"arc",x:40,y:215,r:26,startAngle:-1.57,sweep:1.57,color:"#8b1a1a"},
  {type:"arc",x:360,y:298,r:26,startAngle:3.14,sweep:1.57,color:"#8b1a1a"},
  // windows
  {type:"window",x:68,y:30,w:55,d:7,wall:"h",color:"#1a3a8c"},
  {type:"window",x:150,y:30,w:45,d:7,wall:"h",color:"#1a3a8c"},
  {type:"window",x:248,y:30,w:50,d:7,wall:"h",color:"#1a3a8c"},
  {type:"window",x:40,y:238,w:50,d:7,wall:"v",color:"#1a3a8c"},
  {type:"window",x:82,y:375,w:60,d:7,wall:"h",color:"#1a3a8c"},
  // room labels
  {type:"text",x:58,y:128,content:"SOVRUM",size:10,color:"#111"},
  {type:"text",x:248,y:112,content:"KÖK",size:10,color:"#111"},
  {type:"text",x:58,y:290,content:"VARDAGSRUM",size:10,color:"#111"},
  {type:"text",x:248,y:260,content:"HALL",size:10,color:"#111"},
  {type:"text",x:372,y:256,content:"BADRUM",size:10,color:"#111"},
  // dimensions (offset = push outside walls)
  {type:"dim",x1:40,y1:30,x2:500,y2:30,label:"14.0m",color:"#1a3a8c",offset:-26},
  {type:"dim",x1:40,y1:375,x2:40,y2:30,label:"10.6m",color:"#1a3a8c",offset:-28},
  // furniture
  {type:"rect",x:52,y:44,w:95,h:63,color:"#1a3a8c",textColor:"#111",label:"SÄNG 160"},
  {type:"rect",x:158,y:44,w:58,h:42,color:"#1a3a8c",textColor:"#111",label:"SKRIVBORD"},
  {type:"rect",x:52,y:228,w:138,h:46,color:"#1a3a8c",textColor:"#111",label:"SOFFA"},
  {type:"rect",x:52,y:288,w:80,h:40,color:"#1a3a8c",textColor:"#111",label:"SOFFBORD"},
  {type:"rect",x:244,y:38,w:105,h:62,color:"#1a3a8c",textColor:"#111",label:"MATBORD"},
  {type:"rect",x:244,y:118,w:80,h:30,color:"#1a3a8c",textColor:"#111",label:"KÖK BÄNK"},
  {type:"circle",cx:432,cy:332,r:22,color:"#1a4a20"},
  {type:"text",x:422,y:337,content:"WC",size:9,color:"#1a4a20"},
  {type:"rect",x:364,y:218,w:58,h:42,color:"#1a4a20",textColor:"#1a4a20",label:"DUSCH"},
  {type:"dashed",x1:40,y1:375,x2:40,y2:360,color:"#666"},
  {type:"text",x:44,y:371,content:"ENTRÉ",size:7,color:"#666"},
  {type:"line",x1:40,y1:387,x2:500,y2:387,color:"#111"},
  {type:"text",x:40,y:398,content:"PLANRITNING  Villa Ekvägen 12  --  Plan 1  --  skala 1:100",size:7.5,color:"#111"},
];

const bpCol=c=>({
  "#111":"#d8eaff","#222":"#b0d0f0","#8b1a1a":"#ff9999",
  "#1a3a8c":"#88d0ff","#1a4a20":"#aaefcd","#666":"#88aacc",
  "#333":"#c0d8f0","#555":"#a0b8d0",
}[c]||"#d8eaff");
const bpFloor=els=>els.map(el=>({...el,color:bpCol(el.color||"#111"),textColor:"#e0f0ff"}));

const PRESETS={
  // ── 1. Napkin sketch — quick pencil, very wobbly, no dims, casual ───────────
  "napkin sketch":{paper:"yellow",tool:"pencil",inkColor:"#222",amplitude:2.8,waves:1.5,humanness:.55,elements:[
    // rough house outline
    {type:"line",x1:60,y1:80,x2:420,y2:80,color:"#333"},
    {type:"line",x1:420,y1:80,x2:420,y2:330,color:"#333"},
    {type:"line",x1:60,y1:330,x2:420,y2:330,color:"#333"},
    {type:"line",x1:60,y1:80,x2:60,y2:330,color:"#333"},
    // rough dividers
    {type:"line",x1:60,y1:200,x2:270,y2:200,color:"#444"},
    {type:"line",x1:200,y1:80,x2:200,y2:200,color:"#444"},
    {type:"line",x1:200,y1:200,x2:200,y2:330,color:"#444"},
    {type:"line",x1:320,y1:200,x2:320,y2:330,color:"#444"},
    // simple door arcs
    {type:"arc",x:200,y:200,r:28,startAngle:0,sweep:1.57,color:"#555"},
    {type:"arc",x:60,y:200,r:22,startAngle:-1.57,sweep:1.57,color:"#555"},
    // room names, scrawly
    {type:"text",x:80,y:148,content:"sovrum",size:12,color:"#333"},
    {type:"text",x:218,y:130,content:"kök",size:12,color:"#333"},
    {type:"text",x:80,y:278,content:"vardagsrum",size:12,color:"#333"},
    {type:"text",x:218,y:270,content:"hall",size:12,color:"#333"},
    {type:"text",x:332,y:270,content:"wc",size:12,color:"#333"},
    // rough furniture blobs
    {type:"rect",x:72,y:94,w:80,h:55,color:"#555",textColor:"#333",label:"säng"},
    {type:"rect",x:72,y:215,w:120,h:40,color:"#555",textColor:"#333",label:"soffa"},
    {type:"rect",x:215,y:88,w:90,h:55,color:"#555",textColor:"#333",label:"bord"},
    // title scrawl
    {type:"text",x:60,y:358,content:"Villa Ekvägen — snabbskiss",size:9,color:"#666"},
  ]},

  // ── 2. Plan drawing — ballpoint, careful, dims, windows ─────────────────────
  "plan drawing":{paper:"cream",tool:"ballpoint",inkColor:"#111",amplitude:.7,waves:.8,humanness:.15,elements:FLOOR},

  // ── 3. Blueprint — sekelskiftes villa, straight technical lines ───────────────
  "blueprint":{paper:"blueprint",tool:"ballpoint",inkColor:"#d8eaff",amplitude:.15,waves:.3,humanness:.04,elements:bpFloor(FLOOR)},

  // ── 4. Villa Älvsborg — more rooms, bigger house ─────────────────────────────
  "villa":{paper:"cream",tool:"ballpoint",inkColor:"#111",amplitude:.6,waves:.8,humanness:.12,elements:[
    // outer walls
    {type:"line",x1:30,y1:25,x2:510,y2:25,color:"#111"},
    {type:"line",x1:510,y1:25,x2:510,y2:390,color:"#111"},
    {type:"line",x1:30,y1:390,x2:510,y2:390,color:"#111"},
    {type:"line",x1:30,y1:25,x2:30,y2:390,color:"#111"},
    // inner walls
    {type:"line",x1:30,y1:200,x2:200,y2:200,color:"#222"},
    {type:"line",x1:200,y1:25,x2:200,y2:200,color:"#222"},
    {type:"line",x1:200,y1:200,x2:200,y2:390,color:"#222"},
    {type:"line",x1:330,y1:25,x2:330,y2:390,color:"#222"},
    {type:"line",x1:200,y1:300,x2:330,y2:300,color:"#222"},
    {type:"line",x1:330,y1:200,x2:510,y2:200,color:"#222"},
    {type:"line",x1:420,y1:200,x2:420,y2:390,color:"#222"},
    // doors
    {type:"arc",x:200,y:200,r:28,startAngle:0,sweep:1.57,color:"#8b1a1a"},
    {type:"arc",x:30,y:200,r:24,startAngle:-1.57,sweep:1.57,color:"#8b1a1a"},
    {type:"arc",x:200,y:300,r:24,startAngle:3.14,sweep:-1.57,color:"#8b1a1a"},
    {type:"arc",x:330,y:300,r:22,startAngle:3.14,sweep:1.57,color:"#8b1a1a"},
    {type:"arc",x:420,y:200,r:22,startAngle:1.57,sweep:1.57,color:"#8b1a1a"},
    // windows
    {type:"window",x:60,y:25,w:60,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:150,y:25,w:40,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:220,y:25,w:55,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:350,y:25,w:55,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:440,y:25,w:45,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:30,y:80,w:50,d:7,wall:"v",color:"#1a3a8c"},
    {type:"window",x:510,y:80,w:50,d:7,wall:"v",color:"#1a3a8c"},
    // rooms
    {type:"text",x:50,y:118,content:"SOVRUM 1",size:9,color:"#111"},
    {type:"text",x:218,y:100,content:"SOVRUM 2",size:9,color:"#111"},
    {type:"text",x:348,y:100,content:"VARDAGSRUM",size:9,color:"#111"},
    {type:"text",x:50,y:308,content:"KÖK",size:9,color:"#111"},
    {type:"text",x:218,y:258,content:"HALL",size:9,color:"#111"},
    {type:"text",x:340,y:258,content:"BADRUM",size:9,color:"#111"},
    {type:"text",x:435,y:308,content:"WC",size:9,color:"#111"},
    // dims
    {type:"dim",x1:30,y1:25,x2:510,y2:25,label:"16.0m",color:"#1a3a8c",offset:-24},
    {type:"dim",x1:30,y1:390,x2:30,y2:25,label:"12.0m",color:"#1a3a8c",offset:-26},
    // furniture
    {type:"rect",x:42,y:38,w:90,h:58,color:"#1a3a8c",textColor:"#111",label:"SÄNG"},
    {type:"rect",x:215,y:38,w:88,h:58,color:"#1a3a8c",textColor:"#111",label:"SÄNG"},
    {type:"rect",x:345,y:120,w:130,h:50,color:"#1a3a8c",textColor:"#111",label:"SOFFA"},
    {type:"rect",x:345,y:50,w:90,h:58,color:"#1a3a8c",textColor:"#111",label:"MATBORD"},
    {type:"rect",x:42,y:215,w:110,h:55,color:"#1a3a8c",textColor:"#111",label:"KÖK BÄNK"},
    {type:"circle",cx:455,cy:340,r:20,color:"#1a4a20"},
    {type:"rect",x:338,y:212,w:50,h:40,color:"#1a4a20",textColor:"#1a4a20",label:"DUSCH"},
    {type:"line",x1:30,y1:404,x2:510,y2:404,color:"#111"},
    {type:"text",x:30,y:415,content:"PLANRITNING  Villa Älvsborg  --  Plan 1  --  skala 1:100",size:7,color:"#111"},
  ]},

  // ── 5. Blueprint villa ────────────────────────────────────────────────────────
  "bp villa":{paper:"blueprint",tool:"ballpoint",inkColor:"#d8eaff",amplitude:.12,waves:.25,humanness:.03,elements:bpFloor([
    {type:"line",x1:30,y1:25,x2:510,y2:25,color:"#111"},
    {type:"line",x1:510,y1:25,x2:510,y2:390,color:"#111"},
    {type:"line",x1:30,y1:390,x2:510,y2:390,color:"#111"},
    {type:"line",x1:30,y1:25,x2:30,y2:390,color:"#111"},
    {type:"line",x1:30,y1:200,x2:200,y2:200,color:"#222"},
    {type:"line",x1:200,y1:25,x2:200,y2:200,color:"#222"},
    {type:"line",x1:200,y1:200,x2:200,y2:390,color:"#222"},
    {type:"line",x1:330,y1:25,x2:330,y2:390,color:"#222"},
    {type:"line",x1:200,y1:300,x2:330,y2:300,color:"#222"},
    {type:"line",x1:330,y1:200,x2:510,y2:200,color:"#222"},
    {type:"line",x1:420,y1:200,x2:420,y2:390,color:"#222"},
    {type:"arc",x:200,y:200,r:28,startAngle:0,sweep:1.57,color:"#8b1a1a"},
    {type:"arc",x:30,y:200,r:24,startAngle:-1.57,sweep:1.57,color:"#8b1a1a"},
    {type:"arc",x:200,y:300,r:24,startAngle:3.14,sweep:-1.57,color:"#8b1a1a"},
    {type:"arc",x:420,y:200,r:22,startAngle:1.57,sweep:1.57,color:"#8b1a1a"},
    {type:"window",x:60,y:25,w:60,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:150,y:25,w:40,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:220,y:25,w:55,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:350,y:25,w:55,d:7,wall:"h",color:"#1a3a8c"},
    {type:"window",x:30,y:80,w:50,d:7,wall:"v",color:"#1a3a8c"},
    {type:"text",x:50,y:118,content:"SOVRUM 1",size:9,color:"#111"},
    {type:"text",x:218,y:100,content:"SOVRUM 2",size:9,color:"#111"},
    {type:"text",x:348,y:100,content:"VARDAGSRUM",size:9,color:"#111"},
    {type:"text",x:50,y:308,content:"KÖK",size:9,color:"#111"},
    {type:"text",x:218,y:258,content:"HALL",size:9,color:"#111"},
    {type:"text",x:340,y:258,content:"BADRUM",size:9,color:"#111"},
    {type:"dim",x1:30,y1:25,x2:510,y2:25,label:"16.0m",color:"#1a3a8c",offset:-24},
    {type:"dim",x1:30,y1:390,x2:30,y2:25,label:"12.0m",color:"#1a3a8c",offset:-26},
    {type:"line",x1:30,y1:404,x2:510,y2:404,color:"#111"},
    {type:"text",x:30,y:415,content:"RITNING  Villa Älvsborg  --  Plan 1  --  skala 1:100",size:7,color:"#111"},
  ])},

  // ── 6. Arch / tech diagram ────────────────────────────────────────────────────
  "arch":{paper:"white",tool:"ballpoint",inkColor:"#111",amplitude:.7,waves:.9,humanness:.14,elements:[
    {type:"rect",x:60,y:50,w:110,h:65,color:"#1a3a8c",textColor:"#111",label:"CPU"},
    {type:"rect",x:230,y:50,w:110,h:65,color:"#1a3a8c",textColor:"#111",label:"MEMORY"},
    {type:"rect",x:145,y:195,w:110,h:65,color:"#1a3a8c",textColor:"#111",label:"I/O BUS"},
    {type:"circle",cx:415,cy:222,r:40,color:"#1a4a20"},
    {type:"text",x:397,y:227,content:"GPU",size:14,color:"#1a4a20"},
    {type:"arrow",x1:170,y1:115,x2:205,y2:195,color:"#8b1a1a"},
    {type:"arrow",x1:285,y1:115,x2:255,y2:195,color:"#8b1a1a"},
    {type:"arrow",x1:325,y1:227,x2:375,y2:227,color:"#8b1a1a"},
    {type:"line",x1:50,y1:320,x2:480,y2:320,color:"#111"},
    {type:"text",x:50,y:338,content:"fig.1  system overview  rev 2.1",size:9,color:"#111"},
  ]},

  // ── 7. Elements reference ────────────────────────────────────────────────────
  "elements":{paper:"cream",tool:"ballpoint",inkColor:"#111",amplitude:.7,waves:.8,humanness:.15,elements:[
    {type:"text",x:30,y:20,content:"ARCHITECTURAL ELEMENTS — plan view",size:9,color:"#111"},
    {type:"line",x1:30,y1:24,x2:460,y2:24,color:"#111"},
    {type:"window",x:55,y:55,w:60,d:9,wall:"h",color:"#1a3a8c"},{type:"text",x:57,y:82,content:"window h",size:8,color:"#555"},
    {type:"window",x:155,y:45,w:60,d:9,wall:"v",color:"#1a3a8c"},{type:"text",x:150,y:125,content:"window v",size:8,color:"#555"},
    {type:"door-symbol",x:242,y:55,w:36,swing:"right",wall:"h",color:"#8b1a1a"},{type:"text",x:242,y:108,content:"door",size:8,color:"#555"},
    {type:"door-slide",x:45,y:145,w:65,d:9,wall:"h",color:"#4a2a8b"},{type:"text",x:47,y:171,content:"sliding",size:8,color:"#555"},
    {type:"stair",x:155,y:140,w:55,h:75,steps:6,dir:"up",color:"#111"},{type:"text",x:155,y:230,content:"stair",size:8,color:"#555"},
    {type:"column",x:250,y:148,s:16,color:"#111"},{type:"text",x:243,y:176,content:"column",size:8,color:"#555"},
    {type:"opening",x:295,y:158,w:45,wall:"h",color:"#555"},{type:"text",x:293,y:178,content:"opening",size:8,color:"#555"},
    {type:"dim",x1:45,y1:295,x2:220,y2:295,label:"6.0m",color:"#1a3a8c",offset:-14},
    {type:"line",x1:45,y1:298,x2:220,y2:298,color:"#111"},{type:"line",x1:220,y1:298,x2:220,y2:378,color:"#111"},
    {type:"line",x1:45,y1:378,x2:220,y2:378,color:"#111"},{type:"line",x1:45,y1:298,x2:45,y2:378,color:"#111"},
    {type:"window",x:80,y:298,w:50,d:7,wall:"h",color:"#1a3a8c"},
    {type:"door-symbol",x:45,y:358,w:28,swing:"right",wall:"v",color:"#8b1a1a"},
    {type:"column",x:45,y:298,s:9,color:"#111"},{type:"column",x:211,y:298,s:9,color:"#111"},
    {type:"text",x:90,y:345,content:"rum  10m²",size:9,color:"#111"},
  ]},
};

// ── Future features ───────────────────────────────────────────────────────────
const FEATURES=[
  {icon:"🎙",title:"Voice measurement input",desc:"Walk around with phone, speak measurements — '4.8 meter vänster vägg' — a voice agent transcribes to live manifest. Pairs with Bluetooth laser distance meters."},
  {icon:"🏗",title:"SketchUp / IFC import",desc:"Import .skp or IFC files. Each floor becomes a SketchPaper manifest layer. Geometry simplified to lines, rects, arcs — walls, doors, windows as semantic objects."},
  {icon:"🧊",title:"3D view (Three.js)",desc:"Extrude the 2D manifest into a live Three.js scene. Walls become prisms, furniture labelled boxes, doors animate open. Share as a URL."},
  {icon:"🖼",title:"AI photo → manifest",desc:"Drop a photo of any hand-drawn or printed floor plan. Claude Vision extracts walls, rooms, furniture and converts to SketchPaper JSON. Edit and export for Bygglov."},
  {icon:"📐",title:"PDF / DWG export",desc:"Export scaled PDF or DXF/DWG for building permit (Bygglov) submissions to Swedish municipalities and Boverket."},
  {icon:"📏",title:"Real-scale snap + thick walls",desc:"Enter '4.8m × 5.6m' to snap to real grid. Wall thickness mode: walls rendered as double lines with fill. Auto dimension lines at chosen scale (1:50, 1:100, 1:200)."},
  {icon:"🤖",title:"Agent-driven design",desc:"Describe in text — 'lägenhet 45kvm, 2 rum, balkong mot söder' — and a Claude Code agent generates a full manifest. Refine with follow-up prompts."},
  {icon:"🔌",title:"MCP Skill API",desc:"Expose SketchAI as an MCP server. Any Claude Code agent can call draw_element(), load_manifest(), export_pdf() as tool calls. Build drawing pipelines in your own agents."},
  {icon:"🎨",title:"Layers",desc:"Separate layers for walls, furniture, electrical, plumbing, annotations. Toggle, lock, export per-layer. Critical for multi-discipline coordination."},
  {icon:"🔗",title:"Shareable links & collab",desc:"Save to URL, real-time multi-cursor collaboration. Figma for floor plans — Swedish handwritten style."},
  {icon:"🏠",title:"Handskiss vs technisk ritning",desc:"Two render modes: Handskiss (rough pencil, simple X windows, single-line walls) and Teknisk (precise ballpoint, double-line windows, thick walls with fill). Same manifest, different feel."},
];

function InfoModal({onClose}){
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,20,10,.8)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:S.base3,border:`1px solid ${S.base2}`,borderRadius:8,width:"100%",maxWidth:640,maxHeight:"84vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,.7)"}}>
        <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${S.base2}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div style={{fontSize:16,color:S.blue,fontFamily:"'Abril Fatface',serif",letterSpacing:1}}>SketchAI</div>
            <div style={{fontSize:8,color:S.base1,marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>Manifest-driven hand-drawn renderer · Roadmap</div>
          </div>
          <button onClick={onClose} style={{background:"transparent",border:`1px solid ${S.base2}`,color:S.base00,borderRadius:3,width:26,height:26,cursor:"pointer",fontSize:16}}>×</button>
        </div>
        <div style={{overflow:"auto",padding:"12px 20px 18px"}}>
          {FEATURES.map((f,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:13,paddingBottom:13,borderBottom:i<FEATURES.length-1?`1px solid ${S.base2}`:"none"}}>
              <div style={{fontSize:22,width:30,flexShrink:0,marginTop:1}}>{f.icon}</div>
              <div>
                <div style={{fontSize:9,color:S.blue,letterSpacing:1,marginBottom:3,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>{f.title}</div>
                <div style={{fontSize:9,color:S.base00,lineHeight:1.7,fontFamily:"'Kalam',cursive"}}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"8px 20px",borderTop:`1px solid ${S.base2}`,fontSize:7.5,color:S.base1,fontFamily:"'JetBrains Mono',monospace"}}>
          SKETCHAI v1.0 · OPEN FORMAT · MIT LICENSE · PURE CANVAS 2D API
        </div>
      </div>
    </div>
  );
}

function Slider({label,value,min,max,step,onChange}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
      <span style={{fontSize:8,color:S.base1,width:70,letterSpacing:.5,flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(parseFloat(e.target.value))} style={{flex:1,accentColor:S.blue,height:3,cursor:"pointer"}}/>
      <span style={{fontSize:8,color:S.blue,width:28,textAlign:"right",fontFamily:"'JetBrains Mono',monospace"}}>{value.toFixed(1)}</span>
    </div>
  );
}

const PAPER_OPTS=[
  {k:"cream",label:"Cream",bg:"#f7f0e6"},{k:"white",label:"White",bg:"#f5f5f5"},
  {k:"yellow",label:"Yellow",bg:"#fef9d3"},{k:"blueprint",label:"Blueprint",bg:"#1e4278"},
];
const CANVAS_PRESETS=[{label:"A4↔",w:595,h:420},{label:"A4↕",w:420,h:595},{label:"A3↔",w:700,h:495},{label:"16:9",w:640,h:360}];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(injectFonts,[]);

  const[manifest,setManifest]=useState(PRESETS["plan drawing"]);
  const[text,setText]=useState(JSON.stringify(PRESETS["plan drawing"],null,2));
  const[error,setError]=useState(null);
  const[renderKey,setRenderKey]=useState(0);
  const[activePreset,setActivePreset]=useState("plan drawing");
  const[elements,setElements]=useState(PRESETS["plan drawing"].elements);
  const[sel,setSel]=useState(new Set());
  const[showInfo,setShowInfo]=useState(false);
  const[paperW,setPaperW]=useState(540);
  const[paperH,setPaperH]=useState(420);
  const[zoom,setZoom]=useState(1);
  const[pan,setPan]=useState({x:80,y:60});
  const didInitCenter=useRef(false);

  const canvasRef=useRef(null);
  const boardRef=useRef(null);
  const centRef=useRef({ox:0,oy:0,sc:1});
  const interRef=useRef({mode:"none"});
  const panningRef=useRef({active:false,sx:0,sy:0,sp:{x:0,y:0}});

  const[bw,setBw]=useState(900);
  const[bh,setBh]=useState(600);

  useEffect(()=>{
    const el=boardRef.current; if(!el) return;
    const ro=new ResizeObserver(()=>{
      const cw=el.clientWidth||900, ch=el.clientHeight||600;
      setBw(cw); setBh(ch);
      if(!didInitCenter.current){
        didInitCenter.current=true;
        // fit on first mount
        const pad=60,z=Math.min((cw-pad*2)/paperW,(ch-pad*2)/paperH,.95);
        setZoom(z);
        setPan({x:(cw-paperW*z)/2, y:(ch-paperH*z)/2});
      }
    });
    ro.observe(el);
    return()=>ro.disconnect();
  },[paperW,paperH]);

  useEffect(()=>setElements(manifest.elements||[]),[manifest]);

  const applyText=useCallback(t=>{try{const m=JSON.parse(t);setManifest(m);setError(null);}catch(e){setError(e.message.slice(0,80));}},[]);
  const patch=p=>{const m={...manifest,...p};setManifest(m);setText(JSON.stringify(m,null,2));setActivePreset(null);};
  const loadPreset=k=>{const m=PRESETS[k];setManifest(m);setText(JSON.stringify(m,null,2));setElements(m.elements||[]);setSel(new Set());setError(null);setActivePreset(k);setRenderKey(r=>r+1);};

  // ── Coordinate: screen px → element space ─────────────────────────────────
  const getPos=useCallback(e=>{
    const r=canvasRef.current.getBoundingClientRect();
    const sx=e.clientX-r.left, sy=e.clientY-r.top;
    // undo pan+zoom → paper space
    const px=(sx-pan.x)/zoom, py=(sy-pan.y)/zoom;
    // undo element centering
    const{ox,oy,sc}=centRef.current;
    return[(px-ox)/sc,(py-oy)/sc];
  },[pan,zoom]);

  // ── Scroll: zoom around cursor ────────────────────────────────────────────
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return;
    const onWheel=e=>{
      e.preventDefault();
      const factor=e.deltaY<0?1.12:.89;
      const r=cv.getBoundingClientRect();
      const mx=e.clientX-r.left, my=e.clientY-r.top;
      setZoom(prevZ=>{
        const nz=Math.max(.1,Math.min(10,prevZ*factor));
        // keep world point under cursor fixed
        setPan(p=>({x:mx-(mx-p.x)*(nz/prevZ),y:my-(my-p.y)*(nz/prevZ)}));
        return nz;
      });
    };
    cv.addEventListener("wheel",onWheel,{passive:false});
    return()=>cv.removeEventListener("wheel",onWheel);
  },[]);

  // ── Middle mouse / ctrl = pan ─────────────────────────────────────────────
  const onBoardDown=useCallback(e=>{
    if(e.button===1||(e.button===0&&e.ctrlKey)){
      e.preventDefault();
      panningRef.current={active:true,sx:e.clientX,sy:e.clientY,sp:{...pan}};
    }
  },[pan]);
  const onBoardMove=useCallback(e=>{
    const p=panningRef.current; if(!p.active) return;
    // 1:1 pixel delta — no scaling needed
    setPan({x:p.sp.x+(e.clientX-p.sx),y:p.sp.y+(e.clientY-p.sy)});
  },[]);
  const onBoardUp=useCallback(()=>{panningRef.current.active=false;},[]);

  // ── Element drag / box select ─────────────────────────────────────────────
  const onMouseDown=useCallback(e=>{
    if(e.button===1||(e.button===0&&e.ctrlKey)) return;
    const[mx,my]=getPos(e),shift=e.shiftKey;
    let hi=-1;
    for(let i=elements.length-1;i>=0;i--){if(hitTest(elements[i],mx,my)){hi=i;break;}}
    if(hi!==-1){
      let snap=null;
      if(shift) setSel(prev=>{const s=new Set(prev);s.has(hi)?s.delete(hi):s.add(hi);return s;});
      else{snap=new Set([hi]);setSel(snap);}
      interRef.current={mode:"move",idx:hi,sx:mx,sy:my,snapshot:[...elements],selSnap:snap};
    }else{
      if(!shift)setSel(new Set());
      interRef.current={mode:"box",sx:mx,sy:my,cx:mx,cy:my,shift};
    }
    e.preventDefault();
  },[elements,getPos]);

  const onMouseMove=useCallback(e=>{
    const d=interRef.current; if(d.mode==="none") return;
    const[mx,my]=getPos(e);
    if(d.mode==="move"&&d.snapshot){
      const dx=mx-d.sx,dy=my-d.sy;
      setElements(prev=>{
        const next=[...prev];
        const s=d.selSnap||new Set([d.idx]);
        s.forEach(i=>{if(d.snapshot[i]!==undefined)next[i]=moveEl(d.snapshot[i],dx,dy);});
        return next;
      });
    }else if(d.mode==="box"){d.cx=mx;d.cy=my;setRenderKey(r=>r+.001);}
  },[getPos]);

  const onMouseUp=useCallback(e=>{
    const d=interRef.current;
    if(d.mode==="box"){
      const bx=Math.min(d.sx,d.cx),by=Math.min(d.sy,d.cy),bw2=Math.abs(d.cx-d.sx),bh2=Math.abs(d.cy-d.sy);
      if(bw2>4||bh2>4){
        const hit=new Set();
        elements.forEach((el,i)=>{if(boxIntersect(el,bx,by,bw2,bh2,d.shift))hit.add(i);});
        setSel(prev=>d.shift?new Set([...prev,...hit]):hit);
      }
    }
    interRef.current.mode="none";
  },[elements]);

  // cursor
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return;
    const f=e=>{const[mx,my]=getPos(e);cv.style.cursor=elements.some(el=>hitTest(el,mx,my))?"grab":"crosshair";};
    cv.addEventListener("mousemove",f); return()=>cv.removeEventListener("mousemove",f);
  },[elements,getPos]);

  // keyboard
  useEffect(()=>{
    const f=e=>{
      if(e.key==="Escape")setSel(new Set());
      if(e.key==="Delete"&&sel.size>0){setElements(prev=>prev.filter((_,i)=>!sel.has(i)));setSel(new Set());}
    };
    window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f);
  },[sel]);

  // fit / reset
  const fitContent=useCallback(()=>{
    const pad=50,z=Math.min((bw-pad*2)/paperW,(bh-pad*2)/paperH,2.5);
    setZoom(z);setPan({x:(bw-paperW*z)/2,y:(bh-paperH*z)/2});
  },[bw,bh,paperW,paperH]);
  const resetView=useCallback(()=>{setZoom(1);setPan({x:(bw-paperW)/2,y:(bh-paperH)/2});},[bw,bh,paperW,paperH]);

  // print
  const handlePrint=()=>{
    const cv=canvasRef.current;if(!cv)return;
    const url=cv.toDataURL("image/png");
    const w=window.open("","_blank");
    w.document.write(`<html><head><title>SketchAI</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;}img{max-width:100%;}@media print{body{min-height:auto;}}</style></head><body><img src="${url}" onload="window.print()"/></body></html>`);
    w.document.close();
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const CW=bw,CH=bh;

    // 1. Board background
    const isBP=manifest.paper==="blueprint";
    drawBoard(ctx,CW,CH,manifest.paper||"cream",pan);

    // 2. Paper transform
    ctx.save();
    ctx.translate(pan.x,pan.y);
    ctx.scale(zoom,zoom);

    // paper has no shadow — it blends into the infinite board behind it
    // just clip and draw texture
    ctx.save();ctx.beginPath();ctx.rect(0,0,paperW,paperH);ctx.clip();
    drawPaper(ctx,paperW,paperH,manifest.paper||"cream");

    // 4. Elements
    const c=centerOf(elements,paperW,paperH,32);
    centRef.current={ox:c.ox,oy:c.oy,sc:c.sc};
    ctx.save();ctx.translate(c.ox,c.oy);ctx.scale(c.sc,c.sc);
    const cfg={tool:manifest.tool||"ballpoint",inkColor:manifest.inkColor||"#111",amplitude:manifest.amplitude??0.8,waves:manifest.waves??0.9,paper:manifest.paper||"cream",humanness:manifest.humanness??0.18};
    elements.forEach((el,i)=>renderEl(ctx,el,i,cfg,sel.has(i)));

    // box select overlay
    const d=interRef.current;
    if(d.mode==="box"&&(Math.abs(d.cx-d.sx)>3||Math.abs(d.cy-d.sy)>3)){
      const bx=Math.min(d.sx,d.cx),by=Math.min(d.sy,d.cy),bw2=Math.abs(d.cx-d.sx),bh2=Math.abs(d.cy-d.sy);
      ctx.strokeStyle=d.shift?"#b58900":"#268bd2";ctx.fillStyle=d.shift?"rgba(181,137,0,.06)":"rgba(38,139,210,.06)";
      ctx.lineWidth=1/c.sc;ctx.globalAlpha=.8;ctx.setLineDash([4/c.sc,3/c.sc]);
      ctx.fillRect(bx,by,bw2,bh2);ctx.strokeRect(bx,by,bw2,bh2);ctx.setLineDash([]);
    }
    ctx.restore(); // end element centering
    ctx.restore(); // end paper clip

    // subtle paper edge
    ctx.save();
    ctx.strokeStyle=isBP?"rgba(100,160,255,.25)":"rgba(0,0,0,.08)";
    ctx.lineWidth=1/zoom;
    ctx.strokeRect(0,0,paperW,paperH);
    ctx.restore();

    // 5. Blueprint overlay (title block etc) — drawn in paper space after clip
    if(isBP){
      ctx.save();ctx.beginPath();ctx.rect(0,0,paperW,paperH);ctx.clip();
      drawBlueprintOverlay(ctx,paperW,paperH,"PLANRITNING");
      ctx.restore();
    }

    ctx.restore(); // end paper transform
  },[elements,manifest,renderKey,sel,bw,bh,paperW,paperH,zoom,pan]);

  // ── UI ──────────────────────────────────────────────────────────────────────
  const isBP=manifest.paper==="blueprint";
  const sb={background:S.base3,border:`1px solid ${S.base2}`};
  const lc=S.base1,tc=S.base00,ac=S.blue;

  const PBtn=({active,onClick,children,title})=>(
    <button onClick={onClick} title={title} style={{background:active?S.blue:"transparent",border:`1px solid ${active?S.blue:S.base2}`,color:active?"#fff":tc,borderRadius:3,padding:"2px 8px",fontSize:8,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:.5,transition:"all .1s"}}>
      {children}
    </button>
  );

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"'Kalam',cursive",overflow:"hidden"}}>
      {showInfo&&<InfoModal onClose={()=>setShowInfo(false)}/>}

      {/* ── TOP BAR ────────────────────────────────────────────────────── */}
      <div style={{background:S.base3,borderBottom:`1px solid ${S.base2}`,padding:"0 16px",height:44,display:"flex",alignItems:"center",gap:16,flexShrink:0,zIndex:10}}>
        {/* Brand */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginRight:8}}>
          <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill={S.blue} opacity=".15"/><line x1="4" y1="18" x2="18" y2="4" stroke={S.blue} strokeWidth="1.5" strokeLinecap="round"/><circle cx="16" cy="5" r="2.5" fill={S.blue}/><circle cx="6" cy="17" r="1.5" fill={S.orange}/></svg>
          <span style={{fontFamily:"'Abril Fatface',serif",fontSize:18,color:S.blue,letterSpacing:.5}}>SketchAI</span>
          <span style={{fontSize:8,color:S.base1,fontFamily:"'JetBrains Mono',monospace",marginTop:4}}>v1.0</span>
        </div>

        {/* Demo switcher */}
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span style={{fontSize:8,color:lc,fontFamily:"'JetBrains Mono',monospace",marginRight:2}}>DEMO:</span>
          {Object.keys(PRESETS).map(k=>(
            <PBtn key={k} active={activePreset===k} onClick={()=>loadPreset(k)}>{k}</PBtn>
          ))}
        </div>

        <div style={{flex:1}}/>

        {/* Actions */}
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <PBtn onClick={handlePrint} title="Print">⎙ Print</PBtn>
          <PBtn onClick={()=>setRenderKey(r=>r+1)} title="Redraw with new randomness">↺ Redraw</PBtn>
          <button onClick={()=>setShowInfo(true)} style={{background:S.blue,color:"#fff",border:"none",borderRadius:3,padding:"3px 10px",fontSize:8,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:.5}}>Roadmap ✦</button>
        </div>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>

        {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
        <div style={{width:274,flexShrink:0,display:"flex",flexDirection:"column",...sb,overflowY:"auto"}}>

          {/* Paper */}
          <div style={{padding:"10px 12px 8px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Paper</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {PAPER_OPTS.map(({k,label,bg})=>(
                <button key={k} onClick={()=>patch({paper:k})} style={{background:(manifest.paper||"cream")===k?S.blue:bg,color:(manifest.paper||"cream")===k?"#fff":tc,border:`1px solid ${(manifest.paper||"cream")===k?S.blue:S.base2}`,borderRadius:3,padding:"3px 9px",fontSize:8,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"}}>{label}</button>
              ))}
            </div>
          </div>

          {/* Tool */}
          <div style={{padding:"8px 12px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Tool</div>
            <div style={{display:"flex",gap:4}}>
              {["pencil","ballpoint","ink"].map(t=><PBtn key={t} active={manifest.tool===t} onClick={()=>patch({tool:t})}>{t}</PBtn>)}
            </div>
          </div>

          {/* Wobble */}
          <div style={{padding:"8px 12px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:8,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Wobble & Human Touch</div>
            <Slider label="AMPLITUDE" value={manifest.amplitude??0.8} min={0} max={6} step={.1} onChange={v=>patch({amplitude:v})}/>
            <Slider label="WAVES" value={manifest.waves??0.9} min={0} max={4} step={.1} onChange={v=>patch({waves:v})}/>
            <Slider label="HUMANNESS" value={manifest.humanness??0.18} min={0} max={1} step={.01} onChange={v=>patch({humanness:v})}/>
            <div style={{fontSize:8,color:lc,marginTop:4,lineHeight:1.7,fontFamily:"'Kalam',cursive"}}>humanness → tremors · pressure spikes · ink globs · overshoots · skips</div>
          </div>

          {/* Canvas size */}
          <div style={{padding:"8px 12px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Paper size</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>
              {CANVAS_PRESETS.map(({label,w,h})=>(
                <PBtn key={label} active={paperW===w&&paperH===h} onClick={()=>{setPaperW(w);setPaperH(h);}}>{label}</PBtn>
              ))}
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:8,color:lc,fontFamily:"'JetBrains Mono',monospace"}}>W</span>
              <input type="number" value={paperW} min={200} max={1400} step={10} onChange={e=>setPaperW(+e.target.value)} style={{width:52,background:S.base2,border:`1px solid ${S.base2}`,color:tc,borderRadius:3,padding:"2px 5px",fontSize:8,fontFamily:"'JetBrains Mono',monospace"}}/>
              <span style={{fontSize:8,color:lc,fontFamily:"'JetBrains Mono',monospace"}}>H</span>
              <input type="number" value={paperH} min={200} max={1400} step={10} onChange={e=>setPaperH(+e.target.value)} style={{width:52,background:S.base2,border:`1px solid ${S.base2}`,color:tc,borderRadius:3,padding:"2px 5px",fontSize:8,fontFamily:"'JetBrains Mono',monospace"}}/>
            </div>
          </div>

          {/* Selection info */}
          <div style={{padding:"8px 12px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:5,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Selection</div>
            <div style={{fontSize:8,color:lc,lineHeight:1.85,fontFamily:"'JetBrains Mono',monospace"}}>
              <span style={{color:ac}}>click</span> select · <span style={{color:ac}}>shift+click</span> add<br/>
              <span style={{color:ac}}>drag</span> box(inside) · <span style={{color:ac}}>shift+drag</span> box(touch)<br/>
              <span style={{color:ac}}>del</span> remove · <span style={{color:ac}}>esc</span> deselect<br/>
              <span style={{color:ac}}>scroll</span> zoom · <span style={{color:ac}}>mid/ctrl</span> pan
            </div>
            {sel.size>0&&<div style={{marginTop:5,fontSize:8,color:S.cyan,fontFamily:"'JetBrains Mono',monospace"}}>{sel.size} selected</div>}
          </div>

          {/* Arch elements reference */}
          <div style={{padding:"8px 12px",borderBottom:`1px solid ${S.base2}`}}>
            <div style={{fontSize:8,color:lc,letterSpacing:1.5,marginBottom:5,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>Element types</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
              {["line","rect","circle","arc","arrow","text","dashed","dim","window","door-symbol","door-slide","stair","opening","column"].map(t=>(
                <div key={t} style={{background:S.base2,border:`1px solid ${S.base2}`,color:tc,borderRadius:3,padding:"2px 6px",fontSize:7,cursor:"default",fontFamily:"'JetBrains Mono',monospace"}}>{t}</div>
              ))}
            </div>
          </div>

          {/* JSON editor */}
          {error&&<div style={{margin:"4px 12px",background:"#fdf6e3",border:`1px solid ${S.red}`,color:S.red,padding:"4px 8px",borderRadius:3,fontSize:8,fontFamily:"'JetBrains Mono',monospace"}}>⚠ {error}</div>}
          <textarea value={text} onChange={e=>{setText(e.target.value);applyText(e.target.value);}} style={{flex:1,margin:"6px 12px 10px",background:S.base02,color:"#839496",border:`1px solid ${S.base2}`,borderRadius:4,padding:"8px",fontSize:8.5,lineHeight:1.7,fontFamily:"'JetBrains Mono',monospace",resize:"none",outline:"none",minHeight:120}}/>
        </div>

        {/* ── BOARD (eternity canvas) ──────────────────────────────────── */}
        <div ref={boardRef} style={{flex:1,position:"relative",overflow:"hidden",background:isBP?"#162d58":"#f0ead8"}}
          onMouseDown={onBoardDown} onMouseMove={onBoardMove} onMouseUp={onBoardUp} onMouseLeave={onBoardUp}>

          <canvas ref={canvasRef} width={bw} height={bh}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",cursor:"crosshair",userSelect:"none"}}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            onTouchStart={e=>{const t=e.touches[0];onMouseDown({clientX:t.clientX,clientY:t.clientY,shiftKey:false,button:0,ctrlKey:false,preventDefault:()=>e.preventDefault()});}}
            onTouchMove={e=>{const t=e.touches[0];onMouseMove({clientX:t.clientX,clientY:t.clientY});}}
            onTouchEnd={onMouseUp}
          />

          {/* Zoom controls */}
          <div style={{position:"absolute",bottom:14,right:16,display:"flex",gap:5,alignItems:"center",zIndex:5}}>
            <button onClick={resetView} style={{background:"rgba(0,0,0,.35)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)",borderRadius:3,padding:"3px 8px",fontSize:8,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"}}>1:1</button>
            <button onClick={fitContent} style={{background:"rgba(0,0,0,.35)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)",borderRadius:3,padding:"3px 8px",fontSize:8,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"}}>⊡ fit</button>
            <span style={{fontSize:8,color:"rgba(255,255,255,.4)",minWidth:32,textAlign:"right",fontFamily:"'JetBrains Mono',monospace"}}>{Math.round(zoom*100)}%</span>
            <button onClick={()=>{const cv=canvasRef.current;if(!cv)return;const r=cv.getBoundingClientRect();const mx=bw/2,my=bh/2;setZoom(z=>{const nz=Math.min(10,+(z*1.2).toFixed(2));setPan(p=>({x:mx-(mx-p.x)*(nz/z),y:my-(my-p.y)*(nz/z)}));return nz;});}} style={{background:"rgba(0,0,0,.35)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)",borderRadius:3,width:22,height:22,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace"}}>+</button>
            <button onClick={()=>{const mx=bw/2,my=bh/2;setZoom(z=>{const nz=Math.max(.1,+(z*.83).toFixed(2));setPan(p=>({x:mx-(mx-p.x)*(nz/z),y:my-(my-p.y)*(nz/z)}));return nz;});}} style={{background:"rgba(0,0,0,.35)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.6)",borderRadius:3,width:22,height:22,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace"}}>−</button>
          </div>
        </div>
      </div>
    </div>
  );
}
