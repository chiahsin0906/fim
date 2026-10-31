'use strict';
(() => {
const $ = id => document.getElementById(id);
const v = id => $(id).value;
const subject = id => $(id).textContent;
const items = [
 ['fimEating','A','Eating','feeding','Feeding'],
 ['fimGrooming','B','Grooming','light','Light hygiene'],
 ['fimBathing','C','Bathing','heavy','Heavy hygiene'],
 ['fimDressUpper','D','Dressing-Upper Body'],
 ['fimDressLower','E','Dressing-Lower Body'],
 ['fimToileting','F','Toileting','toileting','Toileting'],
 ['fimBladder','G','Bladder Management'],
 ['fimBowel','H','Bowel Management'],
 ['fimBedChair','I','Bed/Chair/Wheelchair','bedchair','Bed, Chair, Wheelchair'],
 ['fimToilet','J','Toilet','toilet','Toilet'],
 ['fimTub','K','Tub/Shower','tub','Tub. Shower'],
 ['fimWalk','L','Walk/Wheelchair'],
 ['fimStairs','M','Stairs'],
 ['fimComprehension','N','Comprehension'],
 ['fimExpression','O','Expression'],
 ['fimSocial','P','Social Interaction'],
 ['fimProblem','Q','Problem Solving'],
 ['fimMemory','R','Memory']
];
const fimChineseOptions = {"fimEating": ["完全管灌", "需胃管灌食，少部分可從嘴巴吃東西", "需由別人餵食", "幫忙固定碗筷、湯匙或夾好飯菜於碗中", "需在一旁監看、提醒（如：吃慢一點、慢慢吞）", "先備好食物及湯匙等，自行進食不需幫忙", "自行打開水瓶、倒水、咀嚼、吞嚥"], "fimGrooming": ["完全由他人協助盥洗", "幾乎由他人代勞（如：四項中只完成1項）", "完成一半（如：四項中只完成2項）", "幫忙抓握牙刷、毛巾或梳子", "要在一旁提醒（如：提醒刷牙方式）", "需備好牙刷、毛巾、梳子，不需幫忙梳洗", "自己刷牙、洗臉、梳頭、漱口"], "fimBathing": ["完全由他人協助沐浴", "70～80%由他人幫忙", "50%由他人幫忙", "偶而需要家屬協助", "需他人監看提醒（如：提醒要洗背部）", "可使用輔具自己洗澡", "獨立洗澡及擦拭身體"], "fimDressUpper": ["完全由他人幫忙穿脫衣服", "上肢可配合穿脫衣服動作，其餘皆由他人幫忙", "可自行穿健側袖子、由他人扣鈕子", "小部份由別人幫忙（如：只需幫忙扣鈕子）", "需在旁監看提醒（如：提醒穿衣服方式）", "別人準備衣服、排放整齊，可自行完成穿脫", "獨立拿衣服及穿脫衣服、扣鈕子"], "fimDressLower": ["完全由他人幫忙穿脫褲子", "下肢可配合穿脫褲子的動作，其餘皆由他人幫忙", "可自行穿健側褲子、由他人扣鈕子", "小部份由別人幫忙（如：只需幫忙扣鈕子）", "在旁監看提醒（如：提醒穿褲子方式）", "別人準備褲子、排放整齊，可自行完成穿脫", "獨立拿褲子及穿脫褲子、扣鈕子"], "fimToileting": ["完全他人幫忙", "需幫忙清潔及整理衣服", "需幫忙整理衣服（如：幫忙穿褲子）", "需幫忙清潔（如：廁後幫忙擦屁股）", "需監看提醒（如：提醒移位方法）", "需扶手等輔具，可自行上廁所", "自己上廁所、整理衣服、清潔"], "fimBladder": ["失禁或使用尿袋", "幾乎每天失禁", "偶而失禁、晚上要用尿布", "需幫忙導尿", "需提醒定期排尿", "使用尿套可自行排尿", "完全自行解尿"], "fimBowel": ["失禁或使用尿布", "幾乎每天失禁", "偶而失禁、晚上要用尿布", "需幫忙解便", "需提醒定期解便", "使用指挖或軟便劑、緩瀉劑等自行排便", "完全自行排便"], "fimBedChair": ["完全他人幫忙", "移位時有用腳撐，其餘皆由他人幫忙", "移位時可用腳撐，但要較多別人幫忙支撐", "需他人給予些許協助提供安全感", "需監看提醒（如：提醒移位方法）", "使用滑動板或特殊坐墊可自行移動", "可自行移到輪椅或椅子"], "fimToilet": ["完全他人幫忙", "70～80%由他人幫忙", "50%由他人幫忙", "小部份由他人幫忙（如：只需幫忙扶起身）", "需監看提醒（如：提醒移位方法）", "利用扶手欄杆，可自行上下馬桶坐墊", "自行上下馬桶坐墊"], "fimTub": ["完全他人幫忙", "70～80%由他人幫忙", "50%由他人幫忙", "小部份由他人幫忙（如：只需幫忙轉位浴缸）", "需監看提醒（如：提醒小心滑倒）", "需欄杆或升降座等，自己進出不需幫忙", "自己安全進出浴室、浴缸"], "fimWalk": ["無法走路", "勉強移動幾步", "幫忙腳步的移動可於室內行走15公尺", "幫忙給予支撐走15～50公尺", "需監看、提醒（如：提醒勿彎腰駝背）", "用拐杖、助行器或輪椅等可自己移動50公尺", "自己可行走50公尺"], "fimStairs": ["完全他人幫忙或無法上下樓梯", "70～80%由他人協助", "50%由他人幫忙", "部份由他人幫忙無力的腳上下樓梯", "需監看提醒（如：提醒移位方法）", "用拐杖或扶手可上下12～14個階梯", "自己上下12～14個階梯（100%）"], "fimComprehension": ["無法理解、聽不懂", "偶而猜對", "重複二次以上示範", "有時需要示範一次", "有時需要提醒、重複命令一次", "需助聽器或眼鏡", "可以了解講話、手勢或寫字"], "fimExpression": ["無法表達需要", "只能點頭搖頭表示", "需給予選項選擇", "問問題要提示才會接著表達", "需一問兩答重複或停頓", "需用圖片等溝通輔具幫助表達意見", "可用講話、手勢或寫字表達"], "fimSocial": ["無法與人相處", "在熟悉環境下需安撫", "在陌生環境下需安撫", "偶而需要安撫", "在陌生環境下需陪伴、需提醒控制脾氣", "在氣氛良好環境中可與他人相處、偶會發脾氣但可控制", "與他人和平共處、不易生氣"], "fimProblem": ["完全無法處理問題", "需大部分幫忙處理問題", "需少部分幫忙處理問題", "偶而需要幫忙處理問題", "在陌生環境下給予提示去處理問題", "複雜的問題給予提示可以修正", "自己處理問題"], "fimMemory": ["無法辨識或不記得人、事、物", "偶而想起人、事、物", "需要起個頭才會記得", "偶而忘記要做的事", "在陌生或有壓力環境下需給提示", "需要提醒該做的事", "記得家人及常看到的人、事、物"]};
const headings = {0:['Self-care','6 項'],6:['Sphincter control','2 項'],8:['Transfers','3 項 · Day4'],11:['Locomotion','2 項'],13:['Cognition','5 項']};
const descriptions=['完整病程','Functional status','ADL','Transfer ability','Motor function','Locomotion'];
const levels=['','dependent','maximal assistance','moderate assistance','minimal assistance','under supervision','independent','independent'];
const state={outputType:'progress',physicalMissing:[],physicalText:'',selected:0,view:'preview',auto:[],manual:Array(6).fill(null),base:Array(6).fill(null),scores:{},derived:{},complete:false,validDate:false,validDiagnosis:false};
let toastTimer;
function score(raw){if(raw===''||raw===null||raw===undefined)return null;const num=Number(raw);return Number.isInteger(num)&&num>=1&&num<=7 ? num : null;}
function assistance(num){return levels[num]||'';}
function validDate(raw){if(!/^\d{4}-\d{2}-\d{2}$/.test(raw))return false;const d=new Date(raw+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===raw;}
function fmtDate(raw){return raw.replaceAll('-','/');}
function plusDays(raw,n){if(!validDate(raw))return '[日期未填]';const date=new Date(raw+'T00:00:00Z');date.setUTCDate(date.getUTCDate()+n);return fmtDate(date.toISOString().slice(0,10));}
function today(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`;}
const tubeOptions={fimEating:['eatingNG','NG'],fimBladder:['bladderFoley','Foley']};
function makeFields(){
 $('fimFields').innerHTML=items.map((item,index)=>{
 const [id,letter,label,target,targetLabel]=item;
 const head=headings[index]?`<div class="fim-group-title"><b>${headings[index][0]}</b><span>${headings[index][1]}</span></div>`:'';
 const description=target ? `${index<6?'ADL':'Day4'} ${targetLabel}：未評估` : '';
 const tube=tubeOptions[id];const tubeControl=tube?`<label class="tube-option" for="${tube[0]}"><input type="checkbox" id="${tube[0]}" aria-label="${label} ${tube[1]}"><span>${tube[1]}</span></label>`:'';
 return `${head}<div class="fim-row"><div class="fim-item-heading"><label for="${id}"><span class="letter">${letter}.</span>${label}</label>${tubeControl}</div><select id="${id}" aria-describedby="${id}-map ${id}-error" aria-label="${label} FIM 分數"><option value="">請選擇分數</option>${fimChineseOptions[id].map((text,i)=>`<option value="${i+1}">${i+1} 分｜${text}</option>`).join('')}</select><output id="${id}-map" class="mapped${target?' linked':''}">${description}</output><span class="fim-error" id="${id}-error" hidden>請輸入 1–7 的整數</span></div>`;
 }).join('');
 $('dayTabs').innerHTML=[...descriptions.map((name,i)=>`<button type="button" role="tab" id="day-${i}" data-day="${i}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" class="${i===0?'active':''}" title="${name}">Day${i+1}</button>`),'<button type="button" role="tab" id="day-6" data-day="6" aria-selected="false" tabindex="-1">全部</button>'].join('');
}
function buildNotes(){
 const date=v('noteDate');const dx=v('diagnosis').trim()||'[主要診斷未填]';
 const head=(offset)=>offset===0?`${plusDays(date,offset+1)}                                          <Progress note>\n\n# ${dx}\n`:`${plusDays(date,offset+1)}                                   <Progress note>\n\n# ${dx}\n`;
 const d=id=>state.derived[id]||'[未評估]';
 return [
 `${head(0)}\nS: ${v('s1')}\n\nO:\nConsciousness: ${v('consciousness')}\nHEENT: ${v('heent')}\nChest: ${v('chest')}\nHeart: ${v('heart')}\nAbdomen: ${v('abdomen')}\nExtremities: ${v('extremities')}\n\nA/P:\n\n${v('ap1')}\n`.trim(),
 `${head(1)}\nS: ${subject('sf')}\n\nO:\nRolling up R/L: ${v('rollingR')} / ${v('rollingL')}\nSitting up: ${v('sittingup')}\nSitting balance: S/D: ${v('sittingbalS')}/ ${v('sittingbalD')}\nStanding up: ${v('standingup')}\nStanding balance: S/D: ${v('standingbalS')}/${v('standingbalD')}\n\nA: stable\n\nP: keep functional status training`,
 `${head(2)}\nS: ${subject('sadl')}\n\nO:\nFeeding: ${d('feeding')}\nLight hygiene: ${d('light')}\nHeavy hygiene: ${d('heavy')}\nToileting: ${d('toileting')}\n\nA: stable\n\nP: keep ADL training`,
 `${head(3)}\nS: ${subject('stransfer')}\n\nO:\nBed, Chair, Wheelchair: ${d('bedchair')}\nToilet: ${d('toilet')}\nTub. Shower: ${d('tub')}\n\nA: stable\n\nP: keep transfer ability training`,
 `${head(4)}\nS: ${subject('smotor')}\n\nO:\nMotor: Brunnstrom's stage: ${v('brunnstrom')}\nSpasticity: MAS ${v('mas')}\n\nA: stable\n\nP: keep motor function training`,
 `${head(5)}\nS: ${subject('sloco')}\n\nO:  \nWalk/Wheelchair: ${v('walk')}\nStairs: ${v('stairs')}\n\n\nA: stable\n\nP: Keep locomotion training`
 ];
}
function sync(){
 for(const [id,[checkbox]] of Object.entries(tubeOptions)){const active=$(checkbox).checked;$(id).disabled=active;if(active)$(id).value='1';}
 let count=0;state.derived={};
 items.forEach(([id,,label,target,targetLabel],index)=>{
 const raw=v(id);const n=score(raw);state.scores[id]=n;if(n!==null)count++;
 const invalid=raw!==''&&n===null;
 $(id).classList.toggle('invalid',invalid);$(id).setAttribute('aria-invalid',String(invalid));$(id+'-error').hidden=!invalid;
 if(target){state.derived[target]=assistance(n);$(id+'-map').textContent=`${index<6?'ADL':'Day4'} ${targetLabel}：${assistance(n)||'未評估'}`;}
 });
 const motor=items.slice(0,13).map(x=>state.scores[x[0]]);const cog=items.slice(13).map(x=>state.scores[x[0]]);
 const subtotal=xs=>xs.every(x=>x!==null)?xs.reduce((a,b)=>a+b,0):'—';
 $('motorScore').textContent=String(subtotal(motor));$('cognitiveScore').textContent=String(subtotal(cog));
 state.complete=count===18;$('totalScore').textContent=state.complete?String(subtotal(motor)+subtotal(cog)):'—';
 $('completion').textContent=`已填 ${count} / 18 項${state.complete?' · 評估完成':''}`;
 state.validDate=validDate(v('noteDate'));state.validDiagnosis=!!v('diagnosis').trim();
 $('noteDate').setAttribute('aria-invalid',String(!state.validDate));
 $('dateRange').textContent=state.validDate?`${plusDays(v('noteDate'),1)} – ${plusDays(v('noteDate'),6)}`:'請選擇有效日期';
 for(const [summary,targets] of [['adlSummary',['feeding','light','heavy','toileting']],['transferSummary',['bedchair','toilet','tub']]]){
 $(summary).innerHTML=targets.map(target=>{const item=items.find(x=>x[3]===target);return `<div><b>${item[4]}</b><span>${state.derived[target]||'未評估'}</span></div>`;}).join('');
 }
 state.auto=buildNotes();renderOutput();renderPhysical();
}
const physicalFields=[['consciousness','Consciousness'],['heent','HEENT'],['chest','Chest'],['heart','Heart'],['abdomen','Abdomen'],['extremities','Extremities']];
const functionalFields=[['rollingR','Rolling up R',levels.slice(1,7)],['rollingL','Rolling up L',levels.slice(1,7)],['sittingup','Sitting up',levels.slice(1,7)],['sittingbalS','Sitting balance Static',['good','fair','poor']],['sittingbalD','Sitting balance Dynamic',['good','fair','poor']],['standingup','Standing up',levels.slice(1,7)],['standingbalS','Standing balance Static',['good','fair','poor']],['standingbalD','Standing balance Dynamic',['good','fair','poor']],['walk','Ambulation']];
// Literal prefixes preserve the spaces in the supplied clinical format.
const physicalFIMPrefixes=[
 'Self-Care         A. Eating                    ',
 '                  B. Grooming                  ',
 '                  C. Bathing                   ',
 '                  D. Dressing-Upper Body       ',
 '                  E. Dressing-Lower Body       ',
 '                  F. Toileting                 ',
 'Sphincter Control G. Bladder Management        ',
 '                  H. Bowel Management          ',
 'Transfers         I. Bed, Chair, Wheelchair    ',
 '                  J. Toilet                    ',
 '                  K. Tub. Shower               ',
 'Locomotion        L. Walk/Wheelchair           ',
 '                  M. Stairs                    ',
 'Communication     N. Comprehension             ',
 '                  O. Expression                ',
 'Social Cognition  P. Social Interaction        ',
 '                  Q. Problem Solving           ',
 '                  R. Memory                    '
];
function buildPhysical(){
 const missing=[];
 for(const [id,label,choices] of [...physicalFields,...functionalFields]){
  const text=String(v(id)||'').trim();
  if(!text||choices&&!choices.includes(text))missing.push({id,label,reason:text?'請選擇有效選項':'未填'});
 }
 for(const [id,letter,label,target,targetLabel] of items){
  if(state.scores[id]===null)missing.push({id,label:`FIM ${letter}. ${label}${target&&['feeding','light','heavy','toileting'].includes(target)?' → ADL '+targetLabel:''}`,reason:v(id)===''?'未填':'需為 1–7 的整數'});
 }
 const missingIds=new Set(missing.map(x=>x.id));
 const text=id=>missingIds.has(id)?'[未填]':String(v(id)||'').trim();
 const adl=id=>state.derived[id]||'[未評估]';
 const subtotal=list=>list.every(([id])=>state.scores[id]!==null)?list.reduce((sum,[id])=>sum+state.scores[id],0):'未完成';
 const motor=subtotal(items.slice(0,13)),cognitive=subtotal(items.slice(13));
 const fimRows=items.map(([id],i)=>physicalFIMPrefixes[i]+(state.scores[id]===null?'[未填]':state.scores[id]+(tubeOptions[id]&&$(tubeOptions[id][0]).checked?', '+tubeOptions[id][1]:'')));
 fimRows.splice(13,0,'Motor Subtotal Score                         '+motor+'/91');
 fimRows.push('Cognitive Subtotal Score                     '+cognitive+'/35');
 fimRows.push('TOTAL FIM score                              '+(state.complete?motor+cognitive:'未完成')+'/126');
 const value='<Physical examination>\n'+physicalFields.map(([id,label])=>label+': '+text(id)).join('\n')+
  '\n\n< Functional status>\n'+
  `Rolling up R/L: ${text('rollingR')} /  ${text('rollingL')}\n`+
  `Sitting up: ${text('sittingup')}\n`+
  `Sitting balance: S/D: ${text('sittingbalS')}/${text('sittingbalD')}\n`+
  `Standing up: ${text('standingup')}\n`+
  `Standing balance: S/D: ${text('standingbalS')} / ${text('standingbalD')}\n`+
  `Ambulation: ${text('walk')}\n\n\n`+
  '<Activities of Daily living, ADL>\n'+
  `Feeding: ${adl('feeding')}\nLight hygiene: ${adl('light')}\nHeavy hygiene: ${adl('heavy')}\nToileting: ${adl('toileting')}\n\n`+
  '<Functional Independence Measure, FIM>\n'+fimRows.join('\n');
 return {text:value,missing};
}
function renderPhysical(){
 const result=buildPhysical();state.physicalText=result.text;state.physicalMissing=result.missing;
 $('physicalPreview').textContent=result.text;$('physicalCopyText').value=result.text;
 $('physicalPreview').hidden=false;$('physicalCopyText').hidden=true;
 $('copyPhysical').disabled=result.missing.length>0;
 $('physicalValidation').hidden=result.missing.length===0;
 $('physicalStatus').textContent=`尚有 ${result.missing.length} 項待補齊，補齊後即可複製身體評估。`;
 $('physicalMissing').innerHTML=result.missing.map(x=>`<li>${x.label}（${x.reason}）</li>`).join('');
}
function setOutputType(type){
 if(!['progress','physical'].includes(type))return;
 state.outputType=type;
 $('progress-panel').hidden=type!=='progress';$('physical-panel').hidden=type!=='physical';
 for(const [id,active] of [['showProgress',type==='progress'],['showPhysical',type==='physical']]){
  $(id).classList.toggle('active',active);$(id).setAttribute('aria-selected',String(active));$(id).tabIndex=active?0:-1;
 }
 if(type==='physical')renderPhysical();
 if(currentPage==='notes')document.title=(type==='physical'?'身體評估':'病程內容')+'｜FIM 病程工作台';
}
async function copyPhysical(){
 sync();
 if(state.physicalMissing.length){showToast('請先補齊身體評估缺漏項目。');return;}
 const text=state.physicalText;
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(text);showToast('已複製身體評估');
 }catch{
  const selection=document.activeElement;const temp=document.createElement('textarea');temp.value=text;temp.style.position='fixed';temp.style.left='-9999px';document.body.appendChild(temp);temp.focus();temp.select();
  let ok=false;try{ok=document.execCommand('copy');}catch{}finally{temp.remove();selection?.focus();}
  if(ok)showToast('已複製身體評估');
  else{$('physicalPreview').hidden=true;$('physicalCopyText').hidden=false;$('physicalCopyText').focus();$('physicalCopyText').select();showToast('已選取身體評估全文；請按 Ctrl+C 或 ⌘C。');}
 }
}

function effective(i){return state.manual[i]!==null?state.manual[i]:state.auto[i];}
function stale(i){return state.manual[i]!==null&&state.base[i]!==state.auto[i];}
function selectedText(){return state.selected===6?state.auto.map((_,i)=>effective(i)).join('\n\n\n'):effective(state.selected);}
function baseReady(){return state.complete&&state.validDate&&state.validDiagnosis;}
function copyReady(all){return baseReady()&&(all||state.selected===6?state.auto.every((_,i)=>!stale(i)&&!!effective(i).trim()):!stale(state.selected)&&!!effective(state.selected).trim());}
function renderOutput(){
 const all=state.selected===6;const dirty=!all&&state.manual[state.selected]!==null;const outdated=all?state.auto.some((_,i)=>stale(i)):stale(state.selected);
 if(all)state.view='preview';
 $('outputSubtitle').textContent=all?'Day1–Day6 · 全部病程':`Day${state.selected+1} · ${descriptions[state.selected]}`;
 document.querySelectorAll('[data-day]').forEach(button=>{const active=Number(button.dataset.day)===state.selected;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
 const text=selectedText();$('preview').textContent=text;if($('editor').value!==text)$('editor').value=text;
 const editing=state.view==='edit';$('preview').hidden=editing;$('editor').hidden=!editing;
 for(const [id,active] of [['viewPreview',!editing],['viewEdit',editing]]){$(id).classList.toggle('active',active);$(id).setAttribute('aria-selected',String(active));$(id).tabIndex=active?0:-1;}
 $('viewEdit').disabled=all;$('draftStatus').textContent=outdated?'待更新連動資料':dirty?'手動修改':all&&state.manual.some(x=>x!==null)?'含手動修改':'自動同步';
 const messages=[];if(!state.complete)messages.push('請完成 18 項 FIM 分數（1–7 整數）');if(!state.validDate)messages.push('請選擇有效的入院日期');if(!state.validDiagnosis)messages.push('請填寫主要診斷');if(all&&outdated)messages.push('手動修改的病程有待更新資料，請切換到該篇重新套用');
 $('validationBanner').hidden=messages.length===0;$('validationBanner').textContent=messages.join('；')+'，才能複製完成病程。';
 $('staleBanner').hidden=all||!outdated;$('manualBanner').hidden=all||!dirty||outdated;
 $('copyCurrent').textContent=all?'複製全部':'複製此篇';$('copyCurrent').disabled=!copyReady(false);$('copyAll').disabled=!copyReady(true);
}
function setDay(n){if(!Number.isInteger(n)||n<0||n>6)return;state.selected=n;renderOutput();}
function setView(view){if(state.selected===6&&view==='edit')return;state.view=view;renderOutput();if(view==='edit')$('editor').focus();}
function editNote(){const i=state.selected;if(i===6)return;const text=v('editor');if(text===state.auto[i]){state.manual[i]=null;state.base[i]=null;}else{if(state.manual[i]===null)state.base[i]=state.auto[i];state.manual[i]=text;}renderOutput();}
function restoreNote(){const i=state.selected;if(i===6)return;state.manual[i]=null;state.base[i]=null;renderOutput();}
function showToast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>{$('toast').hidden=true;},4000);}
async function copy(all){
 if(!copyReady(all)){showToast('請完成評估，並更新待套用的病程。');return;}
 const text=all?state.auto.map((_,i)=>effective(i)).join('\n\n\n'):selectedText();
 try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);showToast(all||state.selected===6?'已複製全部 6 篇病程':'已複製此篇病程');}
 catch{const selection=document.activeElement;const temp=document.createElement('textarea');temp.value=text;temp.setAttribute('aria-label','複製病程');temp.style.position='fixed';temp.style.left='-9999px';document.body.appendChild(temp);temp.focus();temp.select();let ok=false;try{ok=document.execCommand('copy');}catch{}finally{temp.remove();selection?.focus();}if(ok)showToast('已複製病程');else{setView('edit');if(state.selected===6){showToast('瀏覽器未允許複製，請選取預覽文字後按 Ctrl+C。');}else{$('editor').select();showToast('瀏覽器未允許複製，已選取全文；請按 Ctrl+C 或 ⌘C。');}}}
}
let currentPage=null;
const pagePositions={assessment:0,notes:0};
function showPage(moveFocus=true){
 const page=window.location.hash==='#notes'?'notes':'assessment';
 const changed=page!==currentPage;
 if(changed&&currentPage)pagePositions[currentPage]=window.scrollY;
 $('assessment-page').hidden=page!=='assessment';
 $('notes-page').hidden=page!=='notes';
 for(const name of ['assessment','notes']){
  const active=name===page;const link=$('nav-'+name);
  link.classList.toggle('active',active);
  if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 }
 document.title=(page==='notes'?(state.outputType==='physical'?'身體評估':'病程內容'):'FIM 評估與臨床資料')+'｜FIM 病程工作台';
 currentPage=page;
 if(changed&&moveFocus){
  $(page==='notes'?(state.outputType==='physical'?'physical-title':'notes-title'):'fim-title').focus({preventScroll:true});
  window.scrollTo({top:pagePositions[page],behavior:'instant'});
 }
}

function roving(container,activate){container.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const buttons=Array.from(container.querySelectorAll('[role="tab"]')).filter(x=>!x.disabled);const current=buttons.indexOf(document.activeElement);let next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(current+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;event.preventDefault();activate(buttons[next]);buttons[next].focus();});}
function snapshot(){return {scores:{...state.scores},motor:$('motorScore').textContent,cognitive:$('cognitiveScore').textContent,total:$('totalScore').textContent,completed:state.complete,adl:{feeding:state.derived.feeding,light:state.derived.light,heavy:state.derived.heavy,toileting:state.derived.toileting},transfer:{bedchair:state.derived.bedchair,toilet:state.derived.toilet,tub:state.derived.tub}};}
function registerTools(){
 if(!document.modelContext?.registerTool)return;
 const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 const schema={type:'object',properties:{scores:{type:'object',properties:Object.fromEntries(items.map(([id])=>[id,{type:['integer','null'],minimum:1,maximum:7}])),minProperties:1,additionalProperties:false}},required:['scores'],additionalProperties:false};
 const tools=[{name:'stage_fim_scores',title:'填入 FIM 分數',description:'批次填入 1–7 的 FIM 分數，更新可見總分、ADL 與 Day4 transfer；null 清空單項。保留手動修改的病程。',inputSchema:schema,annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||Object.keys(input).some(k=>k!=='scores')||!input.scores||Array.isArray(input.scores)||typeof input.scores!=='object'||!Object.keys(input.scores).length)throw new Error('請提供 scores 物件');for(const [id,num] of Object.entries(input.scores)){if(!items.some(item=>item[0]===id)||(num!==null&&(!Number.isInteger(num)||num<1||num>7)))throw new Error('分數必須是 1–7 的整數或 null');}for(const [id,num] of Object.entries(input.scores))$(id).value=num===null?'':String(num);sync();return snapshot();}},
 {name:'read_progress_notes',title:'讀取病程',description:'讀取目前頁面的 Day1–Day6 病程與 FIM 結果，包括手動修改和待更新狀態。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){if(input&&Object.keys(input).length)throw new Error('不接受額外參數');return {fim:snapshot(),readyToCopy:copyReady(true),notes:state.auto.map((_,i)=>({day:i+1,text:effective(i),manuallyEdited:state.manual[i]!==null,needsUpdate:stale(i)}))};}}];
 tools.forEach(tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}});
}
makeFields();$('noteDate').value=today();
items.forEach(([id])=>{const el=$(id);el.addEventListener('input',sync);el.addEventListener('change',sync);el.addEventListener('keydown',event=>{if(!event.ctrlKey&&!event.metaKey&&!event.altKey&&/^[1-7]$/.test(event.key)){event.preventDefault();el.value=event.key;sync();}});});
for(const [checkbox] of Object.values(tubeOptions))$(checkbox).addEventListener('change',sync);
$('noteDate').addEventListener('input',sync);
document.querySelectorAll('#clinical-panel input, #clinical-panel textarea, #clinical-panel select').forEach(el=>{
 el.addEventListener('input',sync);
 if(el.tagName==='SELECT')el.addEventListener('change',sync);
});
$('dayTabs').addEventListener('click',event=>{const button=event.target.closest('[data-day]');if(button)setDay(Number(button.dataset.day));});
$('viewPreview').addEventListener('click',()=>setView('preview'));$('viewEdit').addEventListener('click',()=>setView('edit'));$('editor').addEventListener('input',editNote);
$('copyCurrent').addEventListener('click',()=>copy(false));$('copyAll').addEventListener('click',()=>copy(true));
for(const id of ['regenerate','restore'])$(id).addEventListener('click',()=>$('replaceDialog').showModal());
$('cancelReplace').addEventListener('click',()=>$('replaceDialog').close());$('confirmReplace').addEventListener('click',()=>{restoreNote();$('replaceDialog').close();showToast('已套用最新輸入資料');});
$('showProgress').addEventListener('click',()=>setOutputType('progress'));$('showPhysical').addEventListener('click',()=>setOutputType('physical'));
$('open-physical').addEventListener('click',()=>setOutputType('physical'));$('open-notes').addEventListener('click',()=>setOutputType('progress'));
$('copyPhysical').addEventListener('click',copyPhysical);
roving($('outputTypeTabs'),button=>setOutputType(button.id==='showPhysical'?'physical':'progress'));
window.addEventListener('hashchange',()=>showPage());
roving($('dayTabs'),button=>setDay(Number(button.dataset.day)));roving(document.querySelector('.view-tabs'),button=>setView(button.id==='viewEdit'?'edit':'preview'));
window.addEventListener('beforeunload',event=>{if(items.some(([id])=>v(id)!=='')||state.manual.some(x=>x!==null)){event.preventDefault();event.returnValue='';}});
sync();showPage(false);registerTools();
})();
