/* Local UI enhancements: detailed icons, sample weather, and a usable calendar. */
(() => {
  Object.assign(ICONS, {
    home: '<path d="m3 10 9-7 9 7M5 9v11h14V9M16 4V3h3v4M10 20v-7h4v7"/><path d="M7 11h1M16 11h1"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a22 22 0 0 0 18 0M10 12v3h4v-3M7 17h2"/>',
    check: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 9 1.5 1.5L11 8M13 9h4m-10 6 1.5 1.5L11 14M13 15h4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M7 14h1m3 0h1m3 0h1M7 17h1m3 0h1m3 0h1"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5"/>',
    users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a5 5 0 0 1 10 0v3M7 14l2 3 2-3M16 4a3 3 0 0 1 0 6M16 14a5 5 0 0 1 5 5v2M5 21h8"/>',
    clipboard: '<rect x="5" y="5" width="14" height="16" rx="2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m8 12 1 1 2-2M13 12h3M8 17h8"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11zM12 5l5 2v4M8 12l3 3 5-6"/>',
    book: '<path d="M12 5v16M3 4h4a7 7 0 0 1 5 2 7 7 0 0 1 5-2h4v15h-4a7 7 0 0 0-5 2 7 7 0 0 0-5-2H3zM6 8h3M6 12h3M15 8h3M15 12h3"/>',
    chart: '<path d="M3 3v18h18M6 16l4-5 4 2 6-7M16 6h4v4"/><path d="M7 20v-1M12 20v-1M17 20v-1"/>',
    bars: '<path d="M3 21h18"/><rect x="4" y="12" width="3" height="6" rx=".5"/><rect x="10.5" y="7" width="3" height="11" rx=".5"/><rect x="17" y="3" width="3" height="15" rx=".5"/>',
    gauge: '<path d="M20.4 17a9 9 0 1 0-16.8 0M6 17h12M12 4v2M5 8l2 1M19 8l-2 1"/><circle cx="12" cy="14" r="2"/><path d="m13.5 12.5 3-4"/>',
    headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2M5 12V9M19 12V9M21 18v1a3 3 0 0 1-3 3h-4"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M11 21h3"/>',
    building: '<path d="M3 21h18M5 21V5l7-2 7 2v16M10 21v-5h4v5M8 7h1m6 0h1M8 10h1m6 0h1M8 13h1m6 0h1"/>',
    wallet: '<path d="M20 8V5a2 2 0 0 0-2-2H6a3 3 0 0 0-3 3v13a2 2 0 0 0 2 2h15V8H6a2 2 0 0 1 0-4h11"/><path d="M20 12h-5a2 2 0 0 0 0 4h5M16 14h.01"/>',
    server: '<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><circle cx="7" cy="7" r=".7"/><circle cx="7" cy="17" r=".7"/><path d="M11 6h6M11 8h4M11 16h6M11 18h4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.3"/><path d="M12 16v2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 6-3 7-3 9h18c0-2-3-3-3-9M10 21h4M12 2V1M8 9v3"/>',
    apps: [3,10,17].flatMap(x => [3,10,17].map(y => `<rect x="${x}" y="${y}" width="4" height="4" rx="1"/>`)).join(''),
    cloud: '<path d="M6 18a4 4 0 0 1-.6-8A6 6 0 0 1 17 8a5 5 0 0 1 1 10z"/>',
    partly: '<circle cx="8" cy="8" r="3.5"/><path d="M8 1v1M1 8h1M3 3l1 1M13 3l-1 1M15 8h1"/><path d="M8 20a4 4 0 0 1-.5-8A5 5 0 0 1 17 11a4.5 4.5 0 0 1 1 9z"/>',
    rain: '<path d="M6 15a4 4 0 0 1-.6-8A6 6 0 0 1 17 5a5 5 0 0 1 1 10M8 18l-1 3M13 18l-1 3M18 18l-1 3"/>',
    wind: '<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 16h5a3 3 0 1 1-3 3"/>',
    droplet: '<path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12zM8 15a4 4 0 0 0 4 4"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12"/><rect x="3" y="4.5" width="2" height="3" rx=".5"/><rect x="3" y="10.5" width="2" height="3" rx=".5"/><rect x="3" y="16.5" width="2" height="3" rx=".5"/>',
    week: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M9 10v11M15 10v11M5 14h2M11 17h2M17 13h2"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    video: '<rect x="3" y="5" width="12" height="14" rx="2"/><path d="m15 10 6-4v12l-6-4"/>',
    quote: '<path d="M10 5H4v7h4c0 3-1 4-3 5v2c4-1 6-4 6-8V5zM21 5h-6v7h4c0 3-1 4-3 5v2c4-1 6-4 6-8V5z"/>'
  });

  const today = new Date();
  const dateKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const parseDate = key => new Date(`${key}T12:00:00`);
  const shiftDate = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate()+days, 12);
  const formatDate = (date, options) => date.toLocaleDateString('en-GH', options);
  const categories = {meeting:{label:'Meetings',color:'green',icon:'users'},project:{label:'Projects',color:'blue',icon:'briefcase'},training:{label:'Learning',color:'amber',icon:'book'}};
  const initialEvents = [
    ...meetings.map((meeting, index) => ({id:`sample-${index}`,date:dateKey(today),title:meeting.title,start:meeting.time,end:meeting.end,location:meeting.where,category:'meeting',notes:'Sample NITA staff meeting. Prepare your updates and supporting documents.',sample:true})),
    {id:'sample-policy',date:dateKey(shiftDate(today,2)),title:'Policy working group',start:'09:30',end:'11:00',location:'Conference Room A',category:'project',notes:'Review the latest digital government policy draft.',sample:true},
    {id:'sample-training',date:dateKey(shiftDate(today,4)),title:'Cybersecurity awareness session',start:'15:00',end:'16:30',location:'Learning Centre, NITA HQ',category:'training',notes:'Staff learning session on secure digital working practices.',sample:true},
    {id:'sample-review',date:dateKey(shiftDate(today,9)),title:'Procurement programme review',start:'11:00',end:'12:00',location:'Boardroom, NITA HQ',category:'project',notes:'Review programme milestones and upcoming procurement needs.',sample:true}
  ];
  const validEvent = event => event && typeof event.id==='string' && typeof event.title==='string' && typeof event.location==='string' && typeof event.notes==='string' && /^\d{4}-\d{2}-\d{2}$/.test(event.date) && /^\d{2}:\d{2}$/.test(event.start) && /^\d{2}:\d{2}$/.test(event.end) && event.end>event.start && categories[event.category];
  let savedEvents;
  try { savedEvents = JSON.parse(localStorage.getItem('nita-calendar-v1')); } catch { savedEvents = null; }
  state.calendarEvents = Array.isArray(savedEvents) ? savedEvents.filter(validEvent) : initialEvents;
  state.calendarSelected = dateKey(today);
  state.calendarView = 'month';
  state.calendarCategory = 'all';
  state.month = new Date(today.getFullYear(),today.getMonth(),1);
  state.weatherCity = 'Accra';
  state.weatherPeriod = 'hourly';
  state.weatherOpen = false;
  state.quoteIndex = 0;

  const weatherCities = {
    Accra:{temp:29,condition:'Partly cloudy',symbol:'partly',high:31,low:25,humidity:76,wind:14,rain:20,hourly:[['Now',29,'partly'],['12 PM',30,'sun'],['3 PM',31,'partly'],['6 PM',27,'cloud']],daily:[['Today',31,25,'partly'],['Tomorrow',30,25,'rain'],['Next day',31,24,'sun']]},
    Kumasi:{temp:27,condition:'Cloudy',symbol:'cloud',high:29,low:23,humidity:82,wind:8,rain:45,hourly:[['Now',27,'cloud'],['12 PM',28,'partly'],['3 PM',29,'rain'],['6 PM',25,'cloud']],daily:[['Today',29,23,'cloud'],['Tomorrow',28,22,'rain'],['Next day',30,23,'partly']]},
    Tamale:{temp:32,condition:'Sunny',symbol:'sun',high:34,low:25,humidity:54,wind:11,rain:10,hourly:[['Now',32,'sun'],['12 PM',33,'sun'],['3 PM',34,'partly'],['6 PM',29,'sun']],daily:[['Today',34,25,'sun'],['Tomorrow',33,25,'partly'],['Next day',34,24,'sun']]}
  };
  function weatherPanel() {
    const weather = weatherCities[state.weatherCity];
    return `<section class="weather-panel" id="weather-panel" aria-labelledby="weather-title"><div class="weather-panel-head"><h2 id="weather-title">${icon('partly',19)} Weather</h2><label class="weather-location">${icon('pin',13)}<select id="weather-city" aria-label="Weather location">${Object.keys(weatherCities).map(city=>`<option ${city===state.weatherCity?'selected':''}>${city}</option>`).join('')}</select></label></div><div class="weather-current"><div><span class="weather-date">${formatDate(today,{weekday:'short',day:'numeric',month:'short'})}</span><div class="weather-temperature">${weather.temp}<span>°C</span></div><p>${weather.condition} <span>H:${weather.high}° L:${weather.low}°</span></p></div><span class="weather-large-icon ${weather.symbol}">${icon(weather.symbol,62)}</span></div><div class="weather-metrics"><span>${icon('droplet',14)}<b>${weather.humidity}%</b><small>Humidity</small></span><span>${icon('wind',14)}<b>${weather.wind} km/h</b><small>Wind</small></span><span>${icon('rain',14)}<b>${weather.rain}%</b><small>Rain chance</small></span></div><div class="weather-tabs" aria-label="Forecast period">${[['hourly','Today'],['daily','3 days']].map(([value,label])=>`<button type="button" data-weather-period="${value}" class="${state.weatherPeriod===value?'active':''}" aria-pressed="${state.weatherPeriod===value}">${label}</button>`).join('')}</div><div class="weather-forecast" aria-live="polite">${(state.weatherPeriod==='hourly'?weather.hourly:weather.daily).map(item=>state.weatherPeriod==='hourly'?`<div><small>${item[0]}</small><span class="weather-small-icon ${item[2]}">${icon(item[2],23)}</span><strong>${item[1]}°</strong></div>`:`<div><small>${item[0]}</small><span class="weather-small-icon ${item[3]}">${icon(item[3],23)}</span><strong>${item[1]}° <em>${item[2]}°</em></strong></div>`).join('')}</div><small class="weather-sample">Sample forecast · Ghana</small></section>`;
  }
  function renderHeaderWeather() {
    const weather=weatherCities[state.weatherCity];
    const existingDetail=el('#header-weather-detail');
    if(existingDetail&&!state.weatherOpen){
      el('[data-weather-toggle]').setAttribute('aria-expanded','false');
      WorkspaceMotion.visibility(existingDetail,false);
      return;
    }
    el('#header-weather').innerHTML=`<button type="button" class="header-weather-button" data-weather-toggle aria-expanded="${state.weatherOpen}" aria-controls="header-weather-detail" aria-label="${state.weatherCity}, ${weather.temp} degrees Celsius. Show sample forecast"><span class="header-weather-symbol ${weather.symbol}">${icon(weather.symbol,28)}</span><span class="header-weather-copy"><strong>${weather.temp}°C</strong><small>${state.weatherCity}</small></span><span class="header-weather-chevron" aria-hidden="true">⌄</span></button><div class="header-weather-detail hidden" id="header-weather-detail">${weatherPanel()}</div>`;
    WorkspaceMotion.visibility(el('#header-weather-detail'),state.weatherOpen);
  }
  const nitaQuotes = [
    {text:'A secure, inclusive, and interoperable Digital Ghana where technology empowers citizens, drives innovation, and accelerates development.',label:'Our Vision'},
    {text:'Stronger together through active unity',label:'Collaboration'}
  ];
  function quoteCard() {
    const quote=nitaQuotes[state.quoteIndex];
    return `<article class="quote-card nita-vision-card"><div class="nita-quote-label">${icon('quote',18)} NITA inspiration</div><blockquote>${esc(quote.text)}</blockquote><div class="nita-quote-bottom"><div class="tricolor"></div><a href="https://www.nita.gov.gh/about" target="_blank" rel="noopener noreferrer">NITA Ghana <span>· ${quote.label}</span></a><div class="nita-quote-controls"><span aria-live="polite">${state.quoteIndex+1} / ${nitaQuotes.length}</span><button data-quote-step="-1" aria-label="Previous NITA quote">${icon('left',14)}</button><button data-quote-step="1" aria-label="Next NITA quote">${icon('chevron',14)}</button></div></div></article>`;
  }
  function collaborationCard() {
    return `<section class="nita-collaboration-card"><span class="nita-quote-label">${icon('users',18)} Our shared purpose</span><blockquote>“${nitaQuotes[1].text}”</blockquote><p>Every team, every contribution, one Digital Ghana.</p><div class="nita-collaboration-footer"><div class="tricolor"></div><a href="https://www.nita.gov.gh/about" target="_blank" rel="noopener noreferrer">NITA · Collaboration ${icon('arrow',13)}</a></div></section>`;
  }
  const originalDashboard = dashboard;
  dashboard = function() {
    return originalDashboard().replace(/<article class="quote-card">[\s\S]*?<\/article>/,quoteCard()).replace('<h3>Empowered People.<br>Efficient Government.</h3>','<h3><span>Empowered People.</span><span>Efficient Government.</span></h3>').replace('</article></aside></div>',`</article>${collaborationCard()}</aside></div>`);
  };

  const sortedEvents = () => state.calendarEvents.filter(event=>state.calendarCategory==='all'||event.category===state.calendarCategory).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
  const eventsOn = date => sortedEvents().filter(event=>event.date===date);
  const weekStart = date => shiftDate(date,-((date.getDay()+6)%7));
  const eventButton = event => `<button type="button" class="nita-calendar-event ${categories[event.category].color}" data-calendar-action="event" data-event-id="${esc(event.id)}" title="${esc(event.start+' '+event.title)}"><time>${event.start}</time><span>${esc(event.title)}</span></button>`;
  function monthView() {
    const start=weekStart(state.month);
    const dayCount=new Date(state.month.getFullYear(),state.month.getMonth()+1,0).getDate();
    const cellCount=Math.ceil((((state.month.getDay()+6)%7)+dayCount)/7)*7;
    return `<div class="nita-month-scroll"><div class="nita-month-grid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day=>`<div class="nita-weekday ${day==='Sat'||day==='Sun'?'weekend':''}">${day}</div>`).join('')}${Array.from({length:cellCount},(_,index)=>{
      const date=shiftDate(start,index), key=dateKey(date), events=eventsOn(key);
      return `<div class="nita-calendar-day ${date.getMonth()!==state.month.getMonth()?'outside':''} ${key===state.calendarSelected?'selected':''} ${date.getDay()===0||date.getDay()===6?'weekend':''}"><div class="nita-day-top"><button type="button" class="nita-day-number ${key===dateKey(today)?'is-today':''}" data-calendar-action="select" data-date="${key}" aria-label="${formatDate(date,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}, ${events.length} events" aria-pressed="${key===state.calendarSelected}">${date.getDate()}</button><button type="button" class="nita-day-add" data-calendar-action="new" data-date="${key}" aria-label="Add event on ${formatDate(date,{day:'numeric',month:'long'})}">${icon('plus',12)}</button></div><div class="nita-day-events">${events.slice(0,2).map(eventButton).join('')}${events.length>2?`<button type="button" class="nita-more-events" data-calendar-action="day-details" data-date="${key}">+${events.length-2} more</button>`:''}</div></div>`;
    }).join('')}</div></div>`;
  }
  function packedEvents(events) {
    const groups=[];
    for(const event of events) {
      let group=groups[groups.length-1];
      if(!group||event.start>=group.end) { group={end:event.end,columns:[],items:[]};groups.push(group); }
      let column=group.columns.findIndex(end=>end<=event.start);
      if(column===-1)column=group.columns.length;
      group.columns[column]=event.end;
      if(event.end>group.end)group.end=event.end;
      group.items.push({event,column});
    }
    return groups.flatMap(group=>group.items.map(item=>({...item,columnCount:group.columns.length})));
  }
  function weekView() {
    const start=weekStart(parseDate(state.calendarSelected));
    const weekDays=Array.from({length:7},(_,index)=>shiftDate(start,index));
    const events=weekDays.flatMap(date=>eventsOn(dateKey(date)));
    const minutes = time => Number(time.slice(0,2))*60+Number(time.slice(3));
    const firstHour=Math.min(8,...events.map(event=>Math.floor(minutes(event.start)/60)));
    const lastHour=Math.max(18,...events.map(event=>Math.ceil(minutes(event.end)/60)));
    const height=(lastHour-firstHour)*58;
    const clock=new Date(),now=clock.getUTCHours()*60+clock.getUTCMinutes();
    return `<div class="nita-week-scroll"><div class="nita-week-grid"><div class="nita-week-time-head">GMT</div>${weekDays.map(date=>`<button type="button" class="nita-week-head ${dateKey(date)===dateKey(today)?'is-today':''} ${dateKey(date)===state.calendarSelected?'selected':''}" data-calendar-action="select" data-date="${dateKey(date)}" aria-pressed="${dateKey(date)===state.calendarSelected}"><span>${formatDate(date,{weekday:'short'})}</span><strong>${date.getDate()}</strong></button>`).join('')}<div class="nita-time-gutter" style="height:${height}px">${Array.from({length:lastHour-firstHour},(_,index)=>`<span style="top:${index*58}px">${String(firstHour+index).padStart(2,'0')}:00</span>`).join('')}</div>${weekDays.map(date=>`<div class="nita-week-column" style="height:${height}px">${packedEvents(eventsOn(dateKey(date))).map(({event,column,columnCount})=>`<button type="button" class="nita-timed-event ${categories[event.category].color}" style="top:${(minutes(event.start)-firstHour*60)*58/60}px;height:${Math.max(18,(minutes(event.end)-minutes(event.start))*58/60-3)}px;left:calc(${column*100/columnCount}% + 3px);width:calc(${100/columnCount}% - 6px);right:auto" data-calendar-action="event" data-event-id="${esc(event.id)}" title="${esc(event.start+' – '+event.end+' '+event.title)}"><time>${event.start} – ${event.end}</time><strong>${esc(event.title)}</strong><small>${esc(event.location)}</small></button>`).join('')}${dateKey(date)===dateKey(today)&&now>=firstHour*60&&now<lastHour*60?`<div class="nita-now-line" style="top:${(now-firstHour*60)*58/60}px" aria-label="Current time, ${String(clock.getUTCHours()).padStart(2,'0')}:${String(clock.getUTCMinutes()).padStart(2,'0')} GMT"><i></i></div>`:''}</div>`).join('')}</div></div>`;
  }
  function scheduleEvent(event) {
    return `<button type="button" class="nita-schedule-event" data-calendar-action="event" data-event-id="${esc(event.id)}"><span class="nita-schedule-time">${event.start}<small>${event.end}</small></span><i class="nita-category-dot ${categories[event.category].color}"></i><span class="nita-schedule-copy"><strong>${esc(event.title)}</strong><small>${icon(event.location.toLowerCase().includes('online')?'video':'pin',12)} ${esc(event.location||'Location to be confirmed')}</small></span>${icon('chevron',13)}</button>`;
  }
  function agendaView() {
    const prefix=dateKey(state.month).slice(0,7), events=sortedEvents().filter(event=>event.date.startsWith(prefix));
    const days=[...new Set(events.map(event=>event.date))];
    return `<div class="nita-agenda">${days.length?days.map(day=>`<section class="nita-agenda-day"><div class="nita-agenda-date"><strong>${formatDate(parseDate(day),{day:'numeric'})}</strong><span>${formatDate(parseDate(day),{weekday:'short',month:'short'})}</span></div><div>${events.filter(event=>event.date===day).map(scheduleEvent).join('')}</div></section>`).join(''):'<div class="nita-calendar-empty">'+icon('calendar',36)+'<strong>Your month is clear</strong><p>Add an event or choose another month.</p><button class="primary-button" data-calendar-action="new">'+icon('plus',15)+' Add event</button></div>'}</div>`;
  }
  const eventMinutes = event => {
    const minutes = value => Number(value.slice(0,2))*60+Number(value.slice(3));
    return minutes(event.end)-minutes(event.start);
  };
  const durationLabel = minutes => `${Math.floor(minutes/60)}h${minutes%60?' '+minutes%60+'m':''}`;
  function calendarOverview() {
    const start=state.calendarView==='week'?weekStart(parseDate(state.calendarSelected)):state.month;
    const end=state.calendarView==='week'?shiftDate(start,6):new Date(state.month.getFullYear(),state.month.getMonth()+1,0);
    const events=sortedEvents().filter(event=>event.date>=dateKey(start)&&event.date<=dateKey(end));
    const clock=new Date(), now=`${String(clock.getUTCHours()).padStart(2,'0')}:${String(clock.getUTCMinutes()).padStart(2,'0')}`;
    const next=events.find(event=>event.date>dateKey(today)||(event.date===dateKey(today)&&event.end>now));
    return `<div class="nita-calendar-overview"><div><span class="nita-overview-icon">${icon('calendar',20)}</span><span><small>${state.calendarView==='week'?'This week':'This month'}</small><strong>${events.length} <em>${events.length===1?'event':'events'} planned</em></strong></span></div><div><span class="nita-overview-icon">${icon('clock',20)}</span><span><small>Scheduled time</small><strong>${durationLabel(events.reduce((total,event)=>total+eventMinutes(event),0))}<em> in this view</em></strong></span></div><div><span class="nita-overview-icon">${icon('arrow',20)}</span><span><small>${next?.date===dateKey(today)&&next.start<=now?'Happening now':'Next on your schedule'}</small><strong class="nita-next-title">${next?esc(next.title):'No upcoming events'}</strong><span class="nita-next-time">${next?formatDate(parseDate(next.date),{day:'numeric',month:'short'})+' · '+next.start:'A little room to plan ahead'}</span></span></div></div>`;
  }
  calendarPage = function() {
    const selected=parseDate(state.calendarSelected), selectedEvents=eventsOn(state.calendarSelected), start=weekStart(selected), end=shiftDate(start,6);
    const title=state.calendarView==='week'?`${formatDate(start,{day:'numeric',month:'short'})} – ${formatDate(end,{day:'numeric',month:'short',year:'numeric'})}`:formatDate(state.month,{month:'long',year:'numeric'});
    const clock=new Date(), now=`${String(clock.getUTCHours()).padStart(2,'0')}:${String(clock.getUTCMinutes()).padStart(2,'0')}`;
    const upcoming=sortedEvents().filter(event=>event.date>dateKey(today)||(event.date===dateKey(today)&&event.start>now)).slice(0,3);
    return `${heading('Calendar','A clear view of your meetings, projects, and learning sessions.',`<button type="button" class="primary-button" data-calendar-action="new">${icon('plus',16)} Create event</button>`)}${calendarOverview()}
      <div class="nita-calendar-layout">
        <section class="panel nita-calendar-surface" aria-label="Calendar">
          <div class="nita-calendar-toolbar">
            <div class="nita-calendar-navigation"><div class="nita-month-heading"><h2>${title}</h2><span>Choose a day to see its schedule</span></div><button class="nita-calendar-arrow" data-calendar-action="prev" aria-label="Previous ${state.calendarView==='week'?'week':'month'}">${icon('left',16)}</button><button class="nita-calendar-arrow" data-calendar-action="next" aria-label="Next ${state.calendarView==='week'?'week':'month'}">${icon('chevron',16)}</button><button class="nita-today-button" data-calendar-action="today">Today</button></div>
            <div class="nita-calendar-views" aria-label="Calendar view">${[['month','calendar','Month'],['week','week','Week'],['agenda','list','Agenda']].map(([view,symbol,label])=>`<button data-calendar-action="view" data-view="${view}" class="${state.calendarView===view?'active':''}" aria-pressed="${state.calendarView===view}">${icon(symbol,14)} ${label}</button>`).join('')}</div>
          </div>
          ${state.calendarView==='month'?monthView():state.calendarView==='week'?weekView():agendaView()}
          <div class="nita-calendar-legend">${Object.values(categories).map(category=>`<span><i class="nita-category-dot ${category.color}"></i>${category.label}</span>`).join('')}<small>Ghana time · GMT</small></div>
        </section>
        <aside class="nita-calendar-sidebar">
          <section class="panel nita-day-schedule">
            <div class="nita-schedule-heading"><span class="nita-date-tile"><small>${formatDate(selected,{month:'short'})}</small><strong>${selected.getDate()}</strong></span><div><span class="nita-selected-day-label">${state.calendarSelected===dateKey(today)?'Today':'Selected day'}</span><h2>${formatDate(selected,{weekday:'long'})}</h2><p>${selectedEvents.length} ${selectedEvents.length===1?'event':'events'} · ${durationLabel(selectedEvents.reduce((total,event)=>total+eventMinutes(event),0))} scheduled</p></div><div class="nita-day-navigation"><button data-calendar-action="prev-day" aria-label="Previous day">${icon('left',13)}</button><button data-calendar-action="next-day" aria-label="Next day">${icon('chevron',13)}</button></div></div>
            ${selectedEvents.length?selectedEvents.map(scheduleEvent).join(''):`<div class="nita-calendar-empty compact">${icon('sun',30)}<strong>A little room to focus</strong><p>No events scheduled for this day.</p></div>`}
            <button class="nita-add-day" data-calendar-action="new">${icon('plus',14)} Add to this day</button>
          </section>
          <section class="panel nita-calendar-filter"><div class="nita-filter-heading"><h2>My calendars</h2><span>Filter your view</span></div>${[['all','All events','calendar'],...Object.entries(categories).map(([key,category])=>[key,category.label,category.icon])].map(([key,label,symbol])=>`<button type="button" data-calendar-action="category" data-category="${key}" class="${state.calendarCategory===key?'active':''}" aria-pressed="${state.calendarCategory===key}"><span class="nita-category-icon ${categories[key]?.color||'green'}">${icon(symbol,17)}</span>${label}<span class="nita-calendar-count">${key==='all'?state.calendarEvents.length:state.calendarEvents.filter(event=>event.category===key).length}</span></button>`).join('')}<label class="nita-month-jump" for="calendar-month-jump">Jump to month<input type="month" id="calendar-month-jump" value="${dateKey(state.month).slice(0,7)}" aria-label="Jump to month"></label></section>
          <section class="panel nita-upcoming"><h2>${icon('clock',16)} Coming up</h2>${upcoming.length?upcoming.map(event=>`<button data-calendar-action="event" data-event-id="${esc(event.id)}"><span>${formatDate(parseDate(event.date),{weekday:'short',day:'numeric',month:'short'})} · ${event.start}</span><strong>${esc(event.title)}</strong></button>`).join(''):'<p>No upcoming events in this calendar.</p>'}<small>Sample meetings · Your events save locally</small></section>
        </aside>
      </div>`;
  };

  function eventForm(event,selectedDate=state.calendarSelected) {
    const value=(key,fallback='')=>esc(event?.[key]??fallback);
    const body=`<form id="modal-form" data-form="nita-calendar-event" data-event-id="${value('id')}" class="form-grid"><div class="field full"><label for="calendar-event-title">Event title</label><input id="calendar-event-title" name="title" placeholder="e.g. Digital services team review" value="${value('title')}" maxlength="180" required></div><div class="field"><label for="calendar-event-date">Date</label><input id="calendar-event-date" type="date" name="date" value="${value('date',selectedDate)}" required></div><div class="field"><label for="calendar-event-category">Calendar</label><select id="calendar-event-category" name="category">${Object.entries(categories).map(([key,category])=>`<option value="${key}" ${key===(event?.category||'meeting')?'selected':''}>${category.label}</option>`).join('')}</select></div><div class="field"><label for="calendar-event-start">Start time</label><input id="calendar-event-start" type="time" name="start" value="${value('start','09:00')}" required></div><div class="field"><label for="calendar-event-end">End time</label><input id="calendar-event-end" type="time" name="end" value="${value('end','10:00')}" required></div><div class="field full"><label for="calendar-event-location">Location or meeting link</label><input id="calendar-event-location" name="location" placeholder="Room, office, or online meeting" value="${value('location')}" maxlength="240"></div><div class="field full"><label for="calendar-event-notes">Notes</label><textarea id="calendar-event-notes" name="notes" placeholder="Agenda, preparation, or other details" maxlength="2000">${value('notes')}</textarea></div><p class="nita-form-hint field full">${icon('lock',13)} Events are saved in this browser. Times use Ghana time (GMT).</p></form>`;
    showModal(event?'Edit event':'Create an event','Keep your team’s plans in one place.',body,`<button class="secondary-button" data-action="modal-close">Cancel</button><button type="submit" form="modal-form" class="primary-button">${icon('check',15)} ${event?'Save changes':'Add event'}</button>`);
  }
  function eventDetail(id) {
    const event=state.calendarEvents.find(item=>item.id===id); if(!event)return;
    showModal(esc(event.title),categories[event.category].label,`<div class="nita-event-details"><div>${icon('calendar',19)}<span><strong>${formatDate(parseDate(event.date),{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</strong><small>${event.start} – ${event.end} · GMT</small></span></div><div>${icon('pin',19)}<span>${esc(event.location||'Location to be confirmed')}</span></div>${event.notes?`<div>${icon('file',19)}<span class="nita-event-notes">${esc(event.notes)}</span></div>`:''}<p class="nita-event-origin">${event.sample?'Sample NITA event':'Your local calendar event'}</p></div>`,`<button class="secondary-button" data-action="modal-close">Close</button><button class="primary-button" data-calendar-action="edit" data-event-id="${esc(event.id)}">${icon('edit',15)} Edit event</button>`);
  }
  const originalOpenModal=openModal;
  openModal=function(kind,extra={}) { if(kind==='meeting')return eventForm(); return originalOpenModal(kind,extra); };
  const originalFormSubmitted=formSubmitted;
  formSubmitted=function(form) {
    if(form.dataset.form!=='nita-calendar-event')return originalFormSubmitted(form);
    const data=Object.fromEntries(new FormData(form).entries());
    const end=form.elements.end, title=form.elements.title;
    end.setCustomValidity(data.end<=data.start?'End time must be after the start time.':'');
    title.setCustomValidity(data.title.trim()?'':'Enter an event title.');
    if(!form.reportValidity())return;
    const existing=state.calendarEvents.find(event=>event.id===form.dataset.eventId);
    const event={...existing,...data,title:data.title.trim(),location:data.location.trim(),notes:data.notes.trim(),id:existing?.id||`event-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,sample:existing?.sample||false};
    if(existing)state.calendarEvents=state.calendarEvents.map(item=>item.id===event.id?event:item);else state.calendarEvents.push(event);
    let persisted=true;try{localStorage.setItem('nita-calendar-v1',JSON.stringify(state.calendarEvents));}catch{persisted=false;}
    state.calendarSelected=event.date;
    const selected=parseDate(event.date);state.month=new Date(selected.getFullYear(),selected.getMonth(),1);state.calendarCategory='all';
    closeModal();render();toast(persisted?(existing?'Event updated.':'Event added to your calendar.'):'Event saved for this session. Browser storage is unavailable.');
  };
  document.addEventListener('input',event=>{
    if(event.target.closest('[data-form="nita-calendar-event"]')) {
      event.target.setCustomValidity?.('');
      if(event.target.name==='start')el('#calendar-event-end')?.setCustomValidity('');
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='weather-city'){state.weatherCity=event.target.value;renderHeaderWeather();el('#weather-city').focus();}
    if(event.target.id==='calendar-month-jump'&&/^\d{4}-\d{2}$/.test(event.target.value)) {
      const selected=parseDate(event.target.value+'-01');
      state.calendarSelected=dateKey(selected);state.month=new Date(selected.getFullYear(),selected.getMonth(),1);render();el('#calendar-month-jump').focus();
    }
  });
  document.addEventListener('click',event=>{
    const weatherToggle=event.target.closest('[data-weather-toggle]');
    if(weatherToggle){state.weatherOpen=!state.weatherOpen;renderHeaderWeather();el('[data-weather-toggle]').focus();return;}
    if(state.weatherOpen&&!event.target.closest('#header-weather')) { state.weatherOpen=false;renderHeaderWeather(); }
    const forecast=event.target.closest('[data-weather-period]');
    if(forecast){state.weatherPeriod=forecast.dataset.weatherPeriod;renderHeaderWeather();el(`[data-weather-period="${state.weatherPeriod}"]`).focus();return;}
    const quote=event.target.closest('[data-quote-step]');
    if(quote){state.quoteIndex=(state.quoteIndex+Number(quote.dataset.quoteStep)+nitaQuotes.length)%nitaQuotes.length;el('.nita-vision-card').outerHTML=quoteCard();WorkspaceMotion.enter(el('.nita-vision-card'));el(`[data-quote-step="${quote.dataset.quoteStep}"]`).focus();return;}
    const button=event.target.closest('[data-calendar-action]');if(!button)return;
    const {calendarAction:action,eventId,date,view,category}=button.dataset;
    if(action==='new'){eventForm(null,date||state.calendarSelected);return;}
    if(action==='event'){eventDetail(eventId);return;}
    if(action==='edit'){eventForm(state.calendarEvents.find(item=>item.id===eventId));return;}
    if(action==='day-details'){
      state.calendarSelected=date;render();
      showModal(formatDate(parseDate(date),{weekday:'long',day:'numeric',month:'long'}),'Day’s schedule',eventsOn(date).map(scheduleEvent).join(''),'<button class="secondary-button" data-action="modal-close">Close</button>');return;
    }
    if(action==='select'){state.calendarSelected=date;const selected=parseDate(date);state.month=new Date(selected.getFullYear(),selected.getMonth(),1);}
    if(action==='view')state.calendarView=view;
    if(action==='category')state.calendarCategory=category;
    if(action==='today'){state.calendarSelected=dateKey(today);state.month=new Date(today.getFullYear(),today.getMonth(),1);}
    if(action==='prev-day'||action==='next-day') {
      const selected=shiftDate(parseDate(state.calendarSelected),action==='prev-day'?-1:1);
      state.calendarSelected=dateKey(selected);state.month=new Date(selected.getFullYear(),selected.getMonth(),1);
    }
    if(action==='prev'||action==='next'){
      const direction=action==='prev'?-1:1;
      const selected=state.calendarView==='week'?shiftDate(parseDate(state.calendarSelected),direction*7):new Date(state.month.getFullYear(),state.month.getMonth()+direction,1,12);
      state.calendarSelected=dateKey(selected);state.month=new Date(selected.getFullYear(),selected.getMonth(),1);
    }
    render();
    const selector=action==='select'?`[data-calendar-action="select"][data-date="${state.calendarSelected}"]`:action==='view'?`[data-calendar-action="view"][data-view="${state.calendarView}"]`:action==='category'?`[data-calendar-action="category"][data-category="${state.calendarCategory}"]`:`[data-calendar-action="${action}"]`;
    el(selector)?.focus({preventScroll:true});
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&state.weatherOpen){state.weatherOpen=false;renderHeaderWeather();el('[data-weather-toggle]').focus();}
  });

  el('#notifications-button .top-icon').innerHTML=icon('bell',20);
  el('#apps-button .top-icon').innerHTML=icon('apps',20);
  el('#help-button .top-icon').innerHTML=icon('help',20);
  renderHeaderWeather();
  render();
})();

