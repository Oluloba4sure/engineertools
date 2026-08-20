const app = {
  current: 'home',

  animateView(view) {
    const viewEl = document.getElementById('view-' + view);
    if (!viewEl) return;
    viewEl.style.opacity = '0';
    viewEl.style.transform = 'translateY(12px)';
    requestAnimationFrame(() => {
      viewEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      viewEl.style.opacity = '1';
      viewEl.style.transform = 'translateY(0)';
    });
  },

  showResults(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('results-visible'));
  },

  navigate(view) {
    document.querySelectorAll('.view').forEach(el => el.hidden = true);
    const target = document.getElementById('view-' + view);
    if (target) { target.hidden = false; }
    this.current = view;
    this.animateView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'home') {
      this.search(document.getElementById('search-input').value);
      const cardCount = document.querySelectorAll('.calc-card').length;
      const catCount = document.querySelectorAll('.category-block').length;
      const statEl = document.getElementById('stat-calculators');
      if (statEl) statEl.textContent = cardCount;
    }
    document.getElementById('nav-menu').classList.remove('open');
    document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
    const relatedMap = {
      'ohms-law': 'electrical-power,voltage-divider,led-resistor,resistor-color',
      'electrical-power': 'ohms-law,three-phase,voltage-divider,motor-speed',
      'battery-runtime': 'electrical-power,unit-converter',
      'motor-speed': 'gear-ratio,three-phase,electrical-power',
      'gear-ratio': 'motor-speed,unit-converter',
      'unit-converter': 'ohms-law,electrical-power,voltage-divider,three-phase',
      'resistor-color': 'ohms-law,voltage-divider,led-resistor,electrical-power',
      'voltage-divider': 'ohms-law,resistor-color,led-resistor,electrical-power',
      'capacitor': 'inductor,ohms-law,voltage-divider,resistor-color',
      'inductor': 'capacitor,ohms-law,voltage-divider,motor-speed',
      'transformer': 'ohms-law,voltage-divider,electrical-power,three-phase',
      'led-resistor': 'ohms-law,resistor-color,voltage-divider,electrical-power',
      'three-phase': 'electrical-power,motor-speed,unit-converter,voltage-divider',
      'beam-deflection': 'unit-converter,torque,gear-design,shaft-power',
      'torque': 'shaft-power,motor-speed,gear-design,gear-ratio',
      'shaft-power': 'torque,motor-speed,gear-ratio,gear-design',
      'gear-design': 'gear-ratio,motor-speed,torque,shaft-power',
      'hydraulic-jack': 'fluid-pressure,pump-head,unit-converter',
      'pump-head': 'fluid-pressure,hydraulic-jack,unit-converter',
      'fluid-pressure': 'pump-head,hydraulic-jack,unit-converter',
      'solar-sizing': 'battery-bank,inverter-sizing,energy-consumption,cable-sizing',
      'inverter-sizing': 'battery-bank,energy-consumption,generator-sizing,solar-sizing',
      'cable-sizing': 'electrical-power,three-phase,inverter-sizing,generator-sizing',
      'battery-bank': 'solar-sizing,inverter-sizing,energy-consumption',
      'energy-consumption': 'electrical-power,solar-sizing,battery-bank,generator-sizing',
      'generator-sizing': 'inverter-sizing,electrical-power,three-phase,energy-consumption'
    };
    const rel = relatedMap[view];
    if (rel) this.related(rel.split(','));
  },

  toggleNav() {
    const menu = document.getElementById('nav-menu');
    const btn = document.querySelector('.nav-toggle');
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  },

  search(query) {
    const term = (query || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.calc-card');
    let visible = 0;
    cards.forEach(card => {
      const text = (card.textContent + ' ' + (card.dataset.search || '')).toLowerCase();
      const match = text.includes(term);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.hidden = visible > 0;
  },

  showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg; el.hidden = false;
  },
  hideError(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  },
  val(id, allowZero) {
    const el = document.getElementById(id);
    const raw = el.value.trim();
    if (raw === '') return { ok: false, msg: 'Please enter a value.' };
    const v = parseFloat(raw);
    if (isNaN(v)) return { ok: false, msg: 'Please enter a valid number.' };
    if (!allowZero && v === 0) return { ok: false, msg: 'Value cannot be zero.' };
    if (v < 0) return { ok: false, msg: 'Value cannot be negative.' };
    return { ok: true, v };
  },
  setResult(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  calculateOhmsLaw() {
    this.hideError('ol-error');
    const V = this.val('ol-voltage', true);
    const I = this.val('ol-current', true);
    const R = this.val('ol-resistance', true);
    const errs = [];
    if (!V.ok) errs.push(V.msg);
    if (!I.ok) errs.push(I.msg);
    if (!R.ok) errs.push(R.msg);
    if (errs.length) { this.showError('ol-error', errs.join(' ')); return; }
    const known = [!!V.ok, !!I.ok, !!R.ok].filter(Boolean).length;
    if (known < 2) { this.showError('ol-error', 'Enter at least two values to calculate the third.'); return; }
    let v = V.ok ? V.v : null;
    let i = I.ok ? I.v : null;
    let r = R.ok ? R.v : null;
    if (v === null && i !== null && r !== null) v = i * r;
    if (i === null && v !== null && r !== null) { if (r === 0) { this.showError('ol-error', 'Resistance cannot be zero for current calculation.'); return; } i = v / r; }
    if (r === null && v !== null && i !== null) { if (i === 0) { this.showError('ol-error', 'Current cannot be zero for resistance calculation.'); return; } r = v / i; }
    const p = v * i;
    this.setResult('ol-r-voltage', v.toFixed(4) + ' V');
    this.setResult('ol-r-current', i.toFixed(4) + ' A');
    this.setResult('ol-r-resistance', r.toFixed(4) + ' Ω');
    this.setResult('ol-r-power', p.toFixed(4) + ' W');
    this.showResults('ol-results');
  },

  calculateElectricalPower() {
    this.hideError('ep-error');
    const pUnit = document.getElementById('ep-power-unit').value;
    const P = this.val('ep-power', true);
    const V = this.val('ep-voltage', true);
    const I = this.val('ep-current', true);
    const t = this.val('ep-time', true);
    const errs = [];
    if (!P.ok) errs.push(P.msg);
    if (!V.ok) errs.push(V.msg);
    if (!I.ok) errs.push(I.msg);
    if (!t.ok) errs.push(t.msg);
    if (errs.length) { this.showError('ep-error', errs.join(' ')); return; }
    const known = [!!P.ok, !!V.ok, !!I.ok].filter(Boolean).length;
    if (known < 2) { this.showError('ep-error', 'Enter at least two of Power, Voltage, and Current.'); return; }
    let p = P.ok ? P.v : null;
    let v = V.ok ? V.v : null;
    let i = I.ok ? I.v : null;
    let tVal = t.ok ? t.v : null;
    if (p === null && v !== null && i !== null) p = v * i;
    if (v === null && p !== null && i !== null) { if (i === 0) { this.showError('ep-error', 'Current cannot be zero.'); return; } v = p / i; }
    if (i === null && p !== null && v !== null) { if (v === 0) { this.showError('ep-error', 'Voltage cannot be zero.'); return; } i = p / v; }
    const scale = pUnit === 'kW' ? 1000 : 1;
    const pW = p * scale;
    let e = null;
    if (tVal !== null) e = pW * tVal;
    this.setResult('ep-r-power', (pUnit === 'kW' ? (p / 1000).toFixed(4) : p.toFixed(4)) + ' ' + pUnit);
    this.setResult('ep-r-voltage', v.toFixed(4) + ' V');
    this.setResult('ep-r-current', i.toFixed(4) + ' A');
    this.setResult('ep-r-energy', e !== null ? (e >= 1000 ? (e / 1000).toFixed(4) + ' kWh' : e.toFixed(4) + ' Wh') : '—');
    this.showResults('ep-results');
  },

  calculateBatteryRuntime() {
    this.hideError('br-error');
    const V = this.val('br-voltage', true);
    const Ah = this.val('br-capacity', true);
    const load = this.val('br-load', true);
    const eff = this.val('br-efficiency', true);
    const errs = [];
    if (!V.ok) errs.push(V.msg);
    if (!Ah.ok) errs.push(Ah.msg);
    if (!load.ok) errs.push(load.msg);
    if (!eff.ok) errs.push(eff.msg);
    if (errs.length) { this.showError('br-error', errs.join(' ')); return; }
    if (load === 0) { this.showError('br-error', 'Load power cannot be zero.'); return; }
    const eta = eff / 100;
    const runtime = (V.v * Ah.v * eta) / load.v;
    const h = Math.floor(runtime);
    const m = Math.round((runtime - h) * 60);
    const timeStr = h + 'h ' + m + 'm';
    this.setResult('br-r-runtime', timeStr + ' (approx ' + runtime.toFixed(2) + ' hours)');
    this.showResults('br-results');
  },

  calculateMotorSpeed() {
    this.hideError('ms-error');
    const f = this.val('ms-frequency', true);
    const P = this.val('ms-poles', true);
    const errs = [];
    if (!f.ok) errs.push(f.msg);
    if (!P.ok) errs.push(P.msg);
    if (errs.length) { this.showError('ms-error', errs.join(' ')); return; }
    if (P.v === 0) { this.showError('ms-error', 'Number of poles cannot be zero.'); return; }
    const ns = (120 * f.v) / P.v;
    this.setResult('ms-r-speed', ns.toFixed(2) + ' RPM');
    this.showResults('ms-results');
  },

  calculateGearRatio() {
    this.hideError('gr-error');
    const driver = this.val('gr-driver', true);
    const driven = this.val('gr-driven', true);
    const inputRpm = this.val('gr-input-rpm', true);
    const errs = [];
    if (!driver.ok) errs.push(driver.msg);
    if (!driven.ok) errs.push(driven.msg);
    if (!inputRpm.ok) errs.push(inputRpm.msg);
    if (errs.length) { this.showError('gr-error', errs.join(' ')); return; }
    if (driver.v === 0) { this.showError('gr-error', 'Driver teeth cannot be zero.'); return; }
    const ratio = driven.v / driver.v;
    const outputRpm = inputRpm.v / ratio;
    this.setResult('gr-r-ratio', ratio.toFixed(4) + ':1');
    this.setResult('gr-r-output', outputRpm.toFixed(2) + ' RPM');
    this.showResults('gr-results');
  },

  convert() {
    this.hideError('uc-error');
    const valEl = document.getElementById('uc-value');
    const from = document.getElementById('uc-from').value;
    const to = document.getElementById('uc-to').value;
    const raw = valEl.value.trim();
    if (raw === '' || isNaN(parseFloat(raw))) {
      this.setResult('uc-result', '—');
      return;
    }
    const v = parseFloat(raw);
    const cat = document.getElementById('uc-category').value;
    const factors = ucFactors[cat];
    if (!factors || !factors[from] || !factors[to]) return;
    let base = v * factors[from];
    let result = base / factors[to];
    if (cat === 'temperature') {
      if (from === 'c' && to === 'f') result = v * 9/5 + 32;
      else if (from === 'c' && to === 'k') result = v + 273.15;
      else if (from === 'f' && to === 'c') result = (v - 32) * 5/9;
      else if (from === 'f' && to === 'k') result = (v - 32) * 5/9 + 273.15;
      else if (from === 'k' && to === 'c') result = v - 273.15;
      else if (from === 'k' && to === 'f') result = (v - 273.15) * 9/5 + 32;
      else result = v;
    }
    const decimals = result === Math.round(result) ? 0 : 4;
    this.setResult('uc-result', result.toFixed(decimals) + ' ' + to.toUpperCase());
  },

  ucUpdateUnits() {
    const cat = document.getElementById('uc-category').value;
    const fromSel = document.getElementById('uc-from');
    const toSel = document.getElementById('uc-to');
    const units = ucUnits[cat] || [];
    fromSel.innerHTML = '';
    toSel.innerHTML = '';
    units.forEach(u => {
      fromSel.add(new Option(u.label, u.value));
      toSel.add(new Option(u.label, u.value));
    });
    if (units.length >= 2) { toSel.selectedIndex = 1; }
    this.convert();
    const list = document.getElementById('uc-units-list');
    list.innerHTML = units.map(u => '<li>' + u.label + ' (' + u.value.toUpperCase() + ')</li>').join('');
  },

  calculateResistorColor() {
    this.hideError('rc-error');
    const b1 = document.getElementById('rc-band1').value;
    const b2 = document.getElementById('rc-band2').value;
    const mult = document.getElementById('rc-multiplier').value;
    const tol = document.getElementById('rc-tolerance').value;
    const colorMap = { black:0, brown:1, red:2, orange:3, yellow:4, green:5, blue:6, violet:7, grey:8, white:9, gold:-1, silver:-2 };
    const tolMap = { brown:1, red:2, green:0.5, blue:0.25, violet:0.1, grey:0.05, gold:5, silver:10 };
    if (!b1 || !b2 || !mult || !tol) { this.showError('rc-error', 'Please select all four color bands.'); return; }
    const d1 = colorMap[b1];
    const d2 = colorMap[b2];
    const m = colorMap[mult];
    const t = tolMap[tol];
    if (d1 === undefined || d2 === undefined || m === undefined || t === undefined) { this.showError('rc-error', 'Invalid color selection.'); return; }
    const sig = d1 * 10 + d2;
    const value = sig * Math.pow(10, m);
    const min = value * (1 - t/100);
    const max = value * (1 + t/100);
    const formatted = this.formatResistance(value);
    this.setResult('rc-r-value', formatted);
    this.setResult('rc-r-tolerance', '±' + t + '%');
    this.setResult('rc-r-min', this.formatResistance(min));
    this.setResult('rc-r-max', this.formatResistance(max));
    this.setResult('rc-b1', b1.charAt(0).toUpperCase() + b1.slice(1));
    this.setResult('rc-b2', b2.charAt(0).toUpperCase() + b2.slice(1));
    this.setResult('rc-mult', mult.charAt(0).toUpperCase() + mult.slice(1));
    this.setResult('rc-tol', tol.charAt(0).toUpperCase() + tol.slice(1));
    const detail = document.getElementById('rc-calc-detail');
    if (detail) detail.textContent = '= (' + d1 + ' × 10 + ' + d2 + ') × 10^' + m + ' = ' + formatted + ' ±' + t + '%';
    this.showResults('rc-results');
    this.updateResistorVisual(b1, b2, mult, tol);
  },

  formatResistance(ohms) {
    if (ohms >= 1e9) return (ohms/1e9).toFixed(2) + ' GΩ';
    if (ohms >= 1e6) return (ohms/1e6).toFixed(2) + ' MΩ';
    if (ohms >= 1e3) return (ohms/1e3).toFixed(2) + ' kΩ';
    return ohms.toFixed(2) + ' Ω';
  },

  updateResistorVisual(b1, b2, mult, tol) {
    const bands = [b1, b2, mult, tol];
    const visuals = document.querySelectorAll('.resistor-band');
    visuals.forEach((el, idx) => {
      el.style.backgroundColor = bands[idx] || '#333';
      el.style.color = this.getContrastColor(bands[idx] || '#333');
    });
  },

  getContrastColor(hexOrName) {
    const map = { black:'#fff', brown:'#fff', red:'#fff', orange:'#fff', yellow:'#000', green:'#fff', blue:'#fff', violet:'#fff', grey:'#fff', white:'#000', gold:'#000', silver:'#000' };
    return map[hexOrName] || '#fff';
  },

  calculateVoltageDivider() {
    this.hideError('vd-error');
    const vin = this.val('vd-vin', true);
    const r1 = this.val('vd-r1', true);
    const r2 = this.val('vd-r2', true);
    const errs = [];
    if (!vin.ok) errs.push(vin.msg);
    if (!r1.ok) errs.push(r1.msg);
    if (!r2.ok) errs.push(r2.msg);
    if (errs.length) { this.showError('vd-error', errs.join(' ')); return; }
    const sum = r1.v + r2.v;
    if (sum === 0) { this.showError('vd-error', 'R1 + R2 cannot be zero.'); return; }
    const vout = vin.v * r2.v / sum;
    const vr1 = vin.v - vout;
    const vr2 = vout;
    this.setResult('vd-r-vout', vout.toFixed(4) + ' V');
    this.setResult('vd-r-vr1', vr1.toFixed(4) + ' V');
    this.setResult('vd-r-vr2', vr2.toFixed(4) + ' V');
    this.setResult('vd-r-sum', sum.toFixed(4) + ' Ω');
    this.showResults('vd-results');
  },

  calculateCapacitor() {
    this.hideError('cap-error');
    const activeReactance = document.getElementById('cap-reactance').classList.contains('active');
    const freq = activeReactance ? this.val('cap-frequency', true) : {ok: true, v: 0};
    const cap = activeReactance ? this.val('cap-capacitance', true) : this.val('cap-capacitance-rc', true);
    const res = activeReactance ? {ok: true, v: 0} : this.val('cap-resistance', true);
    const capUnit = activeReactance ? document.getElementById('cap-cap-unit').value : document.getElementById('cap-cap-unit-rc').value;
    const freqUnit = activeReactance ? document.getElementById('cap-freq-unit').value : 'Hz';
    const errs = [];
    if (activeReactance && !freq.ok) errs.push(freq.msg);
    if (!cap.ok) errs.push(cap.msg);
    if (!activeReactance && !res.ok) errs.push(res.msg);
    if (errs.length) { this.showError('cap-error', errs.join(' ')); return; }
    const fHz = freqUnit === 'kHz' ? freq.v * 1000 : freqUnit === 'MHz' ? freq.v * 1e6 : freq.v;
    const cF = capUnit === 'pF' ? cap.v * 1e-12 : capUnit === 'nF' ? cap.v * 1e-9 : capUnit === 'uF' ? cap.v * 1e-6 : capUnit === 'mF' ? cap.v * 1e-3 : cap.v;
    if (activeReactance) {
      if (cF === 0) { this.showError('cap-error', 'Capacitance cannot be zero.'); return; }
      const xc = 1 / (2 * Math.PI * fHz * cF);
      this.setResult('cap-r-xc', xc.toFixed(4) + ' Ω');
      this.setResult('cap-r-freq', fHz + ' Hz');
      this.setResult('cap-r-cap', cap.v + ' ' + capUnit);
      this.setResult('cap-r-tc', '—');
    } else {
      const tau = res.v * cF;
      this.setResult('cap-r-xc', '—');
      this.setResult('cap-r-freq', '—');
      this.setResult('cap-r-cap', cap.v + ' ' + capUnit);
      this.setResult('cap-r-tc', tau.toFixed(6) + ' s');
    }
    this.showResults('cap-results');
  },

  calculateInductor() {
    this.hideError('ind-error');
    const activeReactance = document.getElementById('ind-reactance').classList.contains('active');
    const freq = activeReactance ? this.val('ind-frequency', true) : {ok: true, v: 0};
    const ind = activeReactance ? this.val('ind-inductance', true) : this.val('ind-inductance-rl', true);
    const res = activeReactance ? {ok: true, v: 0} : this.val('ind-resistance', true);
    const indUnit = activeReactance ? document.getElementById('ind-ind-unit').value : document.getElementById('ind-ind-unit-rl').value;
    const freqUnit = activeReactance ? document.getElementById('ind-freq-unit').value : 'Hz';
    const errs = [];
    if (activeReactance && !freq.ok) errs.push(freq.msg);
    if (!ind.ok) errs.push(ind.msg);
    if (!activeReactance && !res.ok) errs.push(res.msg);
    if (errs.length) { this.showError('ind-error', errs.join(' ')); return; }
    const fHz = freqUnit === 'kHz' ? freq.v * 1000 : freqUnit === 'MHz' ? freq.v * 1e6 : freq.v;
    const lH = indUnit === 'uH' ? ind.v * 1e-6 : indUnit === 'mH' ? ind.v * 1e-3 : ind.v;
    if (activeReactance) {
      const xl = 2 * Math.PI * fHz * lH;
      this.setResult('ind-r-xl', xl.toFixed(4) + ' Ω');
      this.setResult('ind-r-freq', fHz + ' Hz');
      this.setResult('ind-r-ind', ind.v + ' ' + indUnit);
      this.setResult('ind-r-tc', '—');
    } else {
      const tau = lH / res.v;
      this.setResult('ind-r-xl', '—');
      this.setResult('ind-r-freq', '—');
      this.setResult('ind-r-ind', ind.v + ' ' + indUnit);
      this.setResult('ind-r-tc', tau.toFixed(6) + ' s');
    }
    this.showResults('ind-results');
  },

  calculateTransformer() {
    this.hideError('tr-error');
    const vp = this.val('tr-vp', true);
    const vs = this.val('tr-vs', true);
    const np = this.val('tr-np', true);
    const ns = this.val('tr-ns', true);
    const ip = this.val('tr-ip', true);
    const is_ = this.val('tr-is', true);
    const errs = [];
    if (!vp.ok) errs.push(vp.msg);
    if (!vs.ok) errs.push(vs.msg);
    if (!np.ok) errs.push(np.msg);
    if (!ns.ok) errs.push(ns.msg);
    if (!ip.ok) errs.push(ip.msg);
    if (!is_.ok) errs.push(is_.msg);
    if (errs.length) { this.showError('tr-error', errs.join(' ')); return; }
    const hasVp = vp.ok && vp.v !== 0;
    const hasVs = vs.ok && vs.v !== 0;
    const hasNp = np.ok && np.v !== 0;
    const hasNs = ns.ok && ns.v !== 0;
    const hasIp = ip.ok && ip.v !== 0;
    const hasIs = is_.ok && is_.v !== 0;
    const inputs = [hasVp, hasVs, hasNp, hasNs].filter(Boolean).length;
    if (inputs < 2) { this.showError('tr-error', 'Enter at least two known values.'); return; }
    let turnsRatio = null;
    let vpVal = vp.ok ? vp.v : null;
    let vsVal = vs.ok ? vs.v : null;
    let npVal = np.ok ? np.v : null;
    let nsVal = ns.ok ? ns.v : null;
    if (hasNp && hasNs) turnsRatio = npVal / nsVal;
    else if (hasVp && hasVs) turnsRatio = vpVal / vsVal;
    if (turnsRatio === null) { this.showError('tr-error', 'Cannot determine turns ratio from given values.'); return; }
    if (hasVp && hasNs && !hasVs) vsVal = vpVal / turnsRatio;
    if (hasVs && hasNp && !hasNs) nsVal = npVal / turnsRatio;
    if (hasVs && hasNs && !hasNp) npVal = nsVal * turnsRatio;
    if (hasVp && hasNp && !hasNs) nsVal = npVal / turnsRatio;
    if (hasNp && hasVs && !hasVp) vpVal = vsVal * turnsRatio;
    if (hasNs && hasVs && !hasVp) vpVal = vsVal * turnsRatio;
    let ipVal = ip.ok ? ip.v : null;
    let isVal = is_.ok ? is_.v : null;
    if (hasIp && !hasIs && vpVal !== null && vsVal !== null) isVal = (vpVal / vsVal) * ipVal;
    if (hasIs && !hasIp && vpVal !== null && vsVal !== null) ipVal = (vsVal / vpVal) * isVal;
    this.setResult('tr-r-vp', vpVal !== null ? vpVal.toFixed(4) + ' V' : '—');
    this.setResult('tr-r-vs', vsVal !== null ? vsVal.toFixed(4) + ' V' : '—');
    this.setResult('tr-r-np', npVal !== null ? npVal.toFixed(0) : '—');
    this.setResult('tr-r-ns', nsVal !== null ? nsVal.toFixed(0) : '—');
    this.setResult('tr-r-ratio', turnsRatio !== null ? turnsRatio.toFixed(4) + ':1' : '—');
    this.setResult('tr-r-ip', ipVal !== null ? ipVal.toFixed(4) + ' A' : '—');
    this.setResult('tr-r-is', isVal !== null ? isVal.toFixed(4) + ' A' : '—');
    this.showResults('tr-results');
  },

  calculateLEDResistor() {
    this.hideError('led-error');
    const vs = this.val('led-vs', true);
    const vf = this.val('led-vf', true);
    const i = this.val('led-current', true);
    const iUnit = document.getElementById('led-current-unit').value;
    const errs = [];
    if (!vs.ok) errs.push(vs.msg);
    if (!vf.ok) errs.push(vf.msg);
    if (!i.ok) errs.push(i.msg);
    if (errs.length) { this.showError('led-error', errs.join(' ')); return; }
    if (vf.v >= vs.v) { this.showError('led-error', 'Forward voltage must be less than supply voltage.'); return; }
    const iA = iUnit === 'mA' ? i.v / 1000 : i.v;
    if (iA === 0) { this.showError('led-error', 'Current cannot be zero.'); return; }
    const r = (vs.v - vf.v) / iA;
    const p = (vs.v - vf.v) * iA;
    const standard = this.nextStandardResistor(r);
    const recommendedPower = p * 1.5;
    this.setResult('led-r-r', r.toFixed(2) + ' Ω');
    this.setResult('led-r-std', standard + ' Ω');
    this.setResult('led-r-p', p.toFixed(4) + ' W');
    this.setResult('led-r-rec', recommendedPower.toFixed(2) + ' W');
    this.showResults('led-results');
  },

  nextStandardResistor(value) {
    const series = [10,12,15,18,22,27,33,39,47,56,68,82];
    const decades = [1,10,100,1000,10000,100000,1000000];
    for (const d of decades) {
      for (const s of series) {
        const std = s * d;
        if (std >= value) return std;
      }
    }
    return Math.ceil(value);
  },

  calculateThreePhase() {
    this.hideError('tp-error');
    const mode = document.getElementById('tp-mode').value;
    const vl = this.val('tp-vl', true);
    const il = this.val('tp-il', true);
    const pf = this.val('tp-pf', true);
    const pUnit = document.getElementById('tp-p-unit').value;
    const sUnit = document.getElementById('tp-s-unit').value;
    const qUnit = document.getElementById('tp-q-unit').value;
    const errs = [];
    if (!vl.ok) errs.push(vl.msg);
    if (!il.ok) errs.push(il.msg);
    if (!pf.ok) errs.push(pf.msg);
    if (errs.length) { this.showError('tp-error', errs.join(' ')); return; }
    if (pf.v > 1) { this.showError('tp-error', 'Power factor must be between 0 and 1.'); return; }
    const sqrt3 = Math.sqrt(3);
    const s = sqrt3 * vl.v * il.v;
    const p = s * pf.v;
    const q = Math.sqrt(s*s - p*p);
    this.setResult('tp-r-p', this.formatPower(p, pUnit));
    this.setResult('tp-r-s', this.formatPower(s, sUnit));
    this.setResult('tp-r-q', this.formatReactivePower(q, qUnit));
    this.setResult('tp-r-pf', pf.v.toFixed(4));
    this.showResults('tp-results');
  },

  formatPower(w, unit) {
    if (unit === 'kW') return (w/1000).toFixed(4) + ' kW';
    if (unit === 'MW') return (w/1e6).toFixed(4) + ' MW';
    return w.toFixed(4) + ' W';
  },

  formatReactivePower(w, unit) {
    if (unit === 'var') return w.toFixed(4) + ' var';
    if (unit === 'kvar') return (w/1000).toFixed(4) + ' kvar';
    return (w/1000).toFixed(4) + ' kvar';
  },

  // ===== VERSION 3 CALCULATORS =====

  updateBeamVisual() {
    const type = document.getElementById('bd-type').value;
    const diagram = document.getElementById('bd-diagram');
    const loadGroup = document.getElementById('bd-load-group');
    const udlGroup = document.getElementById('bd-udl-group');
    const isUdl = type === 'ss-udl' || type === 'cant-udl';
    loadGroup.hidden = isUdl;
    udlGroup.hidden = !isUdl;
    if (type === 'ss-point') {
      diagram.textContent = 'Support ▲────────────▲\n        ↓ P';
    } else if (type === 'ss-udl') {
      diagram.textContent = 'Support ▲────────────▲\n        w ↓↓↓↓↓';
    } else if (type === 'cant-point') {
      diagram.textContent = 'Wall │───────────────\n     ↓ P';
    } else {
      diagram.textContent = 'Wall │───────────────\n     w ↓↓↓↓↓';
    }
  },

  calculateBeamDeflection() {
    this.hideError('bd-error');
    const type = document.getElementById('bd-type').value;
    const L = this.val('bd-length', true);
    const E = this.val('bd-e', true);
    const I = this.val('bd-i', true);
    const isUdl = type === 'ss-udl' || type === 'cant-udl';
    const load = isUdl ? this.val('bd-udl', true) : this.val('bd-load', true);
    const errs = [];
    if (!L.ok) errs.push(L.msg);
    if (!E.ok) errs.push(E.msg);
    if (!I.ok) errs.push(I.msg);
    if (!load.ok) errs.push(load.msg);
    if (errs.length) { this.showError('bd-error', errs.join(' ')); return; }
    if (E.v === 0) { this.showError('bd-error', "Young's modulus cannot be zero."); return; }
    if (I.v === 0) { this.showError('bd-error', 'Second moment of area cannot be zero.'); return; }
    const Lm = document.getElementById('bd-length-unit').value === 'mm' ? L.v / 1000 : L.v;
    const loadUnit = isUdl ? document.getElementById('bd-udl-unit').value : document.getElementById('bd-load-unit').value;
    const loadN = isUdl ? (loadUnit === 'kN/m' ? load.v * 1000 : load.v) : (loadUnit === 'kN' ? load.v * 1000 : load.v);
    const eUnit = document.getElementById('bd-e-unit').value;
    const ePa = eUnit === 'GPa' ? E.v * 1e9 : eUnit === 'MPa' ? E.v * 1e6 : E.v;
    const iUnit = document.getElementById('bd-i-unit').value;
    const iM4 = iUnit === 'mm4' ? I.v * 1e-12 : I.v;
    let delta, formula;
    if (type === 'ss-point') {
      delta = (loadN * Math.pow(Lm, 3)) / (48 * ePa * iM4);
      formula = 'δmax = PL³ / 48EI';
    } else if (type === 'ss-udl') {
      delta = (5 * loadN * Math.pow(Lm, 4)) / (384 * ePa * iM4);
      formula = 'δmax = 5wL⁴ / 384EI';
    } else if (type === 'cant-point') {
      delta = (loadN * Math.pow(Lm, 3)) / (3 * ePa * iM4);
      formula = 'δmax = PL³ / 3EI';
    } else {
      delta = (loadN * Math.pow(Lm, 4)) / (8 * ePa * iM4);
      formula = 'δmax = wL⁴ / 8EI';
    }
    const deltaMm = delta * 1000;
    this.setResult('bd-r-deflection', deltaMm.toFixed(4) + ' mm (' + delta.toExponential(4) + ' m)');
    this.setResult('bd-r-formula', formula);
    this.setResult('bd-r-steps', 'Substituting values: ' + formula + ' = ' + delta.toExponential(4) + ' m = ' + deltaMm.toFixed(4) + ' mm');
    this.showResults('bd-results');
  },

  calculateTorque() {
    this.hideError('tq-error');
    const F = this.val('tq-force', true);
    const r = this.val('tq-arm', true);
    const angle = this.val('tq-angle', true);
    const errs = [];
    if (!F.ok) errs.push(F.msg);
    if (!r.ok) errs.push(r.msg);
    if (!angle.ok) errs.push(angle.msg);
    if (errs.length) { this.showError('tq-error', errs.join(' ')); return; }
    if (angle.v < 0 || angle.v > 180) { this.showError('tq-error', 'Angle must be between 0 and 180 degrees.'); return; }
    const fUnit = document.getElementById('tq-force-unit').value;
    const rUnit = document.getElementById('tq-arm-unit').value;
    const fN = fUnit === 'kN' ? F.v * 1000 : F.v;
    const rM = rUnit === 'mm' ? r.v / 1000 : rUnit === 'cm' ? r.v / 100 : r.v;
    const theta = angle.v * Math.PI / 180;
    const tau = rM * fN * Math.sin(theta);
    this.setResult('tq-r-nm', tau.toFixed(4) + ' N·m');
    this.setResult('tq-r-nmm', (tau * 1000).toFixed(2) + ' N·mm');
    this.setResult('tq-r-knm', (tau / 1000).toFixed(6) + ' kN·m');
    this.setResult('tq-r-steps', 'τ = ' + rM.toFixed(4) + ' m × ' + fN.toFixed(2) + ' N × sin(' + angle.v + '°) = ' + tau.toFixed(4) + ' N·m');
    this.showResults('tq-results');
  },

  calculateShaftPower() {
    this.hideError('sp-error');
    const T = this.val('sp-torque', true);
    const N = this.val('sp-rpm', true);
    const errs = [];
    if (!T.ok) errs.push(T.msg);
    if (!N.ok) errs.push(N.msg);
    if (errs.length) { this.showError('sp-error', errs.join(' ')); return; }
    const p = (2 * Math.PI * N.v * T.v) / 60;
    this.setResult('sp-r-w', p.toFixed(2) + ' W');
    this.setResult('sp-r-kw', (p / 1000).toFixed(4) + ' kW');
    this.setResult('sp-r-hp', (p / 746).toFixed(4) + ' hp');
    this.setResult('sp-r-steps', 'P = 2π × ' + N.v + ' × ' + T.v + ' / 60 = ' + p.toFixed(2) + ' W');
    this.showResults('sp-results');
  },

  calculateGearDesign() {
    this.hideError('gd-error');
    const z1 = this.val('gd-z1', true);
    const z2 = this.val('gd-z2', true);
    const rpm = this.val('gd-rpm', true);
    const mod = this.val('gd-module', true);
    const errs = [];
    if (!z1.ok) errs.push(z1.msg);
    if (!z2.ok) errs.push(z2.msg);
    if (!rpm.ok) errs.push(rpm.msg);
    if (!mod.ok) errs.push(mod.msg);
    if (errs.length) { this.showError('gd-error', errs.join(' ')); return; }
    if (z1.v === 0) { this.showError('gd-error', 'Driver teeth cannot be zero.'); return; }
    if (z2.v === 0) { this.showError('gd-error', 'Driven teeth cannot be zero.'); return; }
    const ratio = z2.v / z1.v;
    const outRpm = rpm.v * z1.v / z2.v;
    const d1 = mod.v * z1.v;
    const d2 = mod.v * z2.v;
    const center = (d1 + d2) / 2;
    this.setResult('gd-r-ratio', ratio.toFixed(4) + ':1');
    this.setResult('gd-r-output', outRpm.toFixed(2) + ' RPM');
    this.setResult('gd-r-d1', d1.toFixed(2) + ' mm');
    this.setResult('gd-r-d2', d2.toFixed(2) + ' mm');
    this.setResult('gd-r-center', center.toFixed(2) + ' mm');
    this.showResults('gd-results');
  },

  calculateHydraulicJack() {
    this.hideError('hj-error');
    const F1 = this.val('hj-force', true);
    const d1 = this.val('hj-d1', true);
    const d2 = this.val('hj-d2', true);
    const errs = [];
    if (!F1.ok) errs.push(F1.msg);
    if (!d1.ok) errs.push(d1.msg);
    if (!d2.ok) errs.push(d2.msg);
    if (errs.length) { this.showError('hj-error', errs.join(' ')); return; }
    if (d1.v === 0) { this.showError('hj-error', 'Small piston diameter cannot be zero.'); return; }
    const d1m = d1.v / 1000;
    const d2m = d2.v / 1000;
    const a1 = Math.PI * d1m * d1m / 4;
    const a2 = Math.PI * d2m * d2m / 4;
    const pressure = F1.v / a1;
    const ratio = a2 / a1;
    const f2 = F1.v * ratio;
    this.setResult('hj-r-a1', (a1 * 1e6).toFixed(4) + ' mm²');
    this.setResult('hj-r-a2', (a2 * 1e6).toFixed(4) + ' mm²');
    this.setResult('hj-r-pressure', pressure.toFixed(2) + ' Pa (' + (pressure / 1000).toFixed(2) + ' kPa)');
    this.setResult('hj-r-ratio', ratio.toFixed(2) + ':1');
    this.setResult('hj-r-f2', f2.toFixed(2) + ' N (' + (f2 / 1000).toFixed(2) + ' kN)');
    this.showResults('hj-results');
  },

  calculatePumpHead() {
    this.hideError('ph-error');
    const P = this.val('ph-pressure', true);
    const rho = this.val('ph-density', true);
    const errs = [];
    if (!P.ok) errs.push(P.msg);
    if (!rho.ok) errs.push(rho.msg);
    if (errs.length) { this.showError('ph-error', errs.join(' ')); return; }
    if (rho.v === 0) { this.showError('ph-error', 'Fluid density cannot be zero.'); return; }
    const pUnit = document.getElementById('ph-pressure-unit').value;
    const pPa = pUnit === 'kPa' ? P.v * 1000 : pUnit === 'MPa' ? P.v * 1e6 : pUnit === 'bar' ? P.v * 1e5 : P.v;
    const g = 9.81;
    const head = pPa / (rho.v * g);
    const staticH = document.getElementById('ph-static').value.trim() === '' ? 0 : parseFloat(document.getElementById('ph-static').value);
    const frictionH = document.getElementById('ph-friction').value.trim() === '' ? 0 : parseFloat(document.getElementById('ph-friction').value);
    const velocityH = document.getElementById('ph-velocity').value.trim() === '' ? 0 : parseFloat(document.getElementById('ph-velocity').value);
    const total = head + staticH + frictionH + velocityH;
    this.setResult('ph-r-head', head.toFixed(2) + ' m');
    this.setResult('ph-r-total', total.toFixed(2) + ' m');
    this.setResult('ph-r-steps', 'H = ' + pPa.toFixed(0) + ' Pa / (' + rho.v + ' × 9.81) = ' + head.toFixed(2) + ' m. Total = ' + head.toFixed(2) + ' + ' + staticH + ' + ' + frictionH + ' + ' + velocityH + ' = ' + total.toFixed(2) + ' m');
    this.showResults('ph-results');
  },

  calculateFluidPressure() {
    this.hideError('fp-error');
    const isHydro = document.getElementById('fp-hydro').classList.contains('active');
    let pPa;
    if (isHydro) {
      const rho = this.val('fp-density', true);
      const h = this.val('fp-depth', true);
      const errs = [];
      if (!rho.ok) errs.push(rho.msg);
      if (!h.ok) errs.push(h.msg);
      if (errs.length) { this.showError('fp-error', errs.join(' ')); return; }
      const hUnit = document.getElementById('fp-depth-unit').value;
      const hM = hUnit === 'cm' ? h.v / 100 : hUnit === 'mm' ? h.v / 1000 : h.v;
      pPa = rho.v * 9.81 * hM;
      this.setResult('fp-r-steps', 'P = ' + rho.v + ' × 9.81 × ' + hM + ' = ' + pPa.toFixed(2) + ' Pa');
    } else {
      const F = this.val('fp-force-val', true);
      const A = this.val('fp-area', true);
      const errs = [];
      if (!F.ok) errs.push(F.msg);
      if (!A.ok) errs.push(A.msg);
      if (errs.length) { this.showError('fp-error', errs.join(' ')); return; }
      if (A.v === 0) { this.showError('fp-error', 'Area cannot be zero.'); return; }
      pPa = F.v / A.v;
      this.setResult('fp-r-steps', 'P = ' + F.v + ' / ' + A.v + ' = ' + pPa.toFixed(2) + ' Pa');
    }
    const unit = document.getElementById('fp-result-unit').value;
    const conversions = { Pa: 1, kPa: 1000, MPa: 1e6, bar: 1e5, psi: 6894.757, atm: 101325 };
    const result = pPa / conversions[unit];
    this.setResult('fp-r-pressure', result.toFixed(4) + ' ' + unit);
    this.setResult('fp-r-pa', pPa.toFixed(2) + ' Pa');
    this.setResult('fp-r-kpa', (pPa / 1000).toFixed(4) + ' kPa');
    this.setResult('fp-r-bar', (pPa / 1e5).toFixed(6) + ' bar');
    this.setResult('fp-r-psi', (pPa / 6894.757).toFixed(4) + ' psi');
    this.showResults('fp-results');
  },

  // ===== VERSION 4 CALCULATORS =====

  ssPanelPreset() {
    const preset = document.getElementById('ss-panel-preset').value;
    const panelInput = document.getElementById('ss-panel');
    if (preset === 'custom') {
      panelInput.value = '';
      panelInput.disabled = false;
    } else {
      panelInput.value = preset;
      panelInput.disabled = true;
    }
  },

  calculateSolarSizing() {
    this.hideError('ss-error');
    const E = this.val('ss-energy', true);
    const H = this.val('ss-sun', true);
    const eff = this.val('ss-efficiency', true);
    const panel = this.val('ss-panel', true);
    const errs = [];
    if (!E.ok) errs.push(E.msg);
    if (!H.ok) errs.push(H.msg);
    if (!eff.ok) errs.push(eff.msg);
    if (!panel.ok) errs.push(panel.msg);
    if (errs.length) { this.showError('ss-error', errs.join(' ')); return; }
    if (H.v === 0) { this.showError('ss-error', 'Peak sun hours cannot be zero.'); return; }
    if (eff.v === 0) { this.showError('ss-error', 'System efficiency cannot be zero.'); return; }
    if (panel.v === 0) { this.showError('ss-error', 'Panel rating cannot be zero.'); return; }
    const eUnit = document.getElementById('ss-energy-unit').value;
    const eWh = eUnit === 'kWh' ? E.v * 1000 : E.v;
    const eta = eff.v / 100;
    const pvW = eWh / (H.v * eta);
    const panels = Math.ceil(pvW / panel.v);
    const installedW = panels * panel.v;
    const productionWh = installedW * H.v * eta;
    this.setResult('ss-r-energy', (eUnit === 'kWh' ? E.v : E.v / 1000).toFixed(2) + ' ' + (eUnit === 'kWh' ? 'kWh/day' : 'Wh/day'));
    this.setResult('ss-r-pv', (pvW >= 1000 ? (pvW / 1000).toFixed(2) + ' kW' : pvW.toFixed(0) + ' W'));
    this.setResult('ss-r-panels', panels + ' panels');
    this.setResult('ss-r-installed', (installedW >= 1000 ? (installedW / 1000).toFixed(2) + ' kW' : installedW.toFixed(0) + ' W'));
    this.setResult('ss-r-production', (productionWh >= 1000 ? (productionWh / 1000).toFixed(2) + ' kWh/day' : productionWh.toFixed(0) + ' Wh/day'));
    this.setResult('ss-r-steps', 'PV = ' + eWh.toFixed(0) + ' Wh / (' + H.v + ' × ' + eta + ') = ' + pvW.toFixed(0) + ' W. Panels = ceil(' + pvW.toFixed(0) + ' / ' + panel.v + ') = ' + panels + '.');
    this.showResults('ss-results');
  },

  // Reusable appliance/load entry component
  addApplianceRow(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'appliance-card';
    let fields = '';
    if (type === 'inverter' || type === 'generator') {
      fields = `
        <div class="input-group"><label>Appliance Name</label><input type="text" class="app-name" placeholder="e.g. Refrigerator"></div>
        <div class="input-group"><label>Quantity</label><input type="number" class="app-qty" step="1" min="1" placeholder="1"></div>
        <div class="input-group"><label>Running Power (W)</label><input type="number" class="app-running" step="any" min="0" placeholder="150"></div>
        <div class="input-group"><label>Surge Power (W)</label><input type="number" class="app-surge" step="any" min="0" placeholder="600"></div>`;
    } else if (type === 'energy') {
      fields = `
        <div class="input-group"><label>Appliance Name</label><input type="text" class="app-name" placeholder="e.g. Refrigerator"></div>
        <div class="input-group"><label>Quantity</label><input type="number" class="app-qty" step="1" min="1" placeholder="1"></div>
        <div class="input-group"><label>Power (W)</label><input type="number" class="app-running" step="any" min="0" placeholder="150"></div>
        <div class="input-group"><label>Hours/day</label><input type="number" class="app-hours" step="any" min="0" placeholder="24"></div>
        <div class="input-group"><label>Days/month</label><input type="number" class="app-days" step="any" min="0" placeholder="30"></div>`;
    }
    row.innerHTML = fields + `<div class="calc-actions"><button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">Remove</button></div>`;
    container.appendChild(row);
  },

  clearApplianceList(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
  },

  collectApplianceData(containerId, type) {
    const container = document.getElementById(containerId);
    const rows = container.querySelectorAll('.appliance-card');
    const items = [];
    rows.forEach(row => {
      const name = row.querySelector('.app-name') ? row.querySelector('.app-name').value.trim() : 'Appliance';
      const qty = parseFloat(row.querySelector('.app-qty').value) || 0;
      const running = parseFloat(row.querySelector('.app-running').value) || 0;
      const surge = row.querySelector('.app-surge') ? (parseFloat(row.querySelector('.app-surge').value) || 0) : 0;
      const hours = row.querySelector('.app-hours') ? (parseFloat(row.querySelector('.app-hours').value) || 0) : 0;
      const days = row.querySelector('.app-days') ? (parseFloat(row.querySelector('.app-days').value) || 0) : 0;
      items.push({ name, qty, running, surge, hours, days });
    });
    return items;
  },

  calculateInverterSizing() {
    this.hideError('inv-error');
    const margin = this.val('inv-margin', true);
    if (!margin.ok) { this.showError('inv-error', margin.msg); return; }
    const items = this.collectApplianceData('inv-appliances', 'inverter');
    if (items.length === 0) { this.showError('inv-error', 'Add at least one appliance.'); return; }
    let totalRunning = 0;
    let totalSurge = 0;
    items.forEach(it => {
      totalRunning += it.running * it.qty;
      totalSurge += it.surge * it.qty;
    });
    if (totalRunning === 0) { this.showError('inv-error', 'Total running load cannot be zero.'); return; }
    const factor = 1 + margin.v / 100;
    const recommendedW = totalRunning * factor;
    const surgeCap = Math.max(totalSurge, recommendedW);
    const stdSizes = [1, 1.5, 2, 3, 5, 7.5, 10];
    const recommendedKva = recommendedW / 1000;
    let std = stdSizes.find(s => s >= recommendedKva) || 10;
    this.setResult('inv-r-running', totalRunning.toFixed(0) + ' W (' + (totalRunning / 1000).toFixed(2) + ' kW)');
    this.setResult('inv-r-surge', totalSurge.toFixed(0) + ' W');
    this.setResult('inv-r-continuous', recommendedW.toFixed(0) + ' W (' + recommendedKva.toFixed(2) + ' kW)');
    this.setResult('inv-r-rating', std + ' kVA (approx ' + (std * 0.8).toFixed(1) + ' kW at PF 0.8)');
    this.setResult('inv-r-surge-cap', surgeCap.toFixed(0) + ' W (' + (surgeCap / 1000).toFixed(2) + ' kW)');
    this.showResults('inv-results');
  },

  calculateCableSizing() {
    this.hideError('cs-error');
    const P = this.val('cs-power', true);
    const V = this.val('cs-voltage', true);
    const L = this.val('cs-length', true);
    const pf = this.val('cs-pf', true);
    const vdPct = this.val('cs-vd', true);
    const errs = [];
    if (!P.ok) errs.push(P.msg);
    if (!V.ok) errs.push(V.msg);
    if (!L.ok) errs.push(L.msg);
    if (!pf.ok) errs.push(pf.msg);
    if (!vdPct.ok) errs.push(vdPct.msg);
    if (errs.length) { this.showError('cs-error', errs.join(' ')); return; }
    if (V.v === 0) { this.showError('cs-error', 'Voltage cannot be zero.'); return; }
    if (pf.v === 0) { this.showError('cs-error', 'Power factor cannot be zero.'); return; }
    if (vdPct.v === 0) { this.showError('cs-error', 'Allowable voltage drop cannot be zero.'); return; }
    const pUnit = document.getElementById('cs-power-unit').value;
    const pW = pUnit === 'kW' ? P.v * 1000 : P.v;
    const phase = document.getElementById('cs-phase').value;
    const material = document.getElementById('cs-material').value;
    const rho = material === 'copper' ? 1.68e-8 : 2.82e-8;
    const current = phase === 'single' ? pW / (V.v * pf.v) : pW / (Math.sqrt(3) * V.v * pf.v);
    const vdMax = V.v * vdPct.v / 100;
    const stdSizes = [1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    let minAreaM2 = (2 * current * rho * L.v) / vdMax;
    let minAreaMm2 = minAreaM2 * 1e6;
    let chosen = stdSizes.find(s => s >= minAreaMm2) || 120;
    const vdrop = (2 * current * rho * L.v) / (chosen * 1e-6);
    const vdActualPct = (vdrop / V.v) * 100;
    this.setResult('cs-r-current', current.toFixed(2) + ' A');
    this.setResult('cs-r-area', minAreaMm2.toFixed(2) + ' mm²');
    this.setResult('cs-r-size', chosen + ' mm²');
    this.setResult('cs-r-vdrop', vdrop.toFixed(2) + ' V');
    this.setResult('cs-r-vd-pct', vdActualPct.toFixed(2) + '%');
    this.setResult('cs-r-material', material.charAt(0).toUpperCase() + material.slice(1));
    this.setResult('cs-r-steps', 'I = ' + pW.toFixed(0) + ' / (' + (phase === 'single' ? V.v + ' × ' + pf.v : '√3 × ' + V.v + ' × ' + pf.v) + ') = ' + current.toFixed(2) + ' A. Min area = ' + minAreaMm2.toFixed(2) + ' mm². Selected: ' + chosen + ' mm².');
    this.showResults('cs-results');
  },

  bbTypeChange() {
    const type = document.getElementById('bb-type').value;
    const dodMap = { 'lead-acid': 50, 'agm': 60, 'gel': 70, 'lithium': 80, 'lifepo4': 90 };
    if (dodMap[type]) {
      document.getElementById('bb-dod').value = dodMap[type];
    }
  },

  calculateBatteryBank() {
    this.hideError('bb-error');
    const E = this.val('bb-energy', true);
    const days = this.val('bb-autonomy', true);
    const V = this.val('bb-voltage', true);
    const dod = this.val('bb-dod', true);
    const eff = this.val('bb-efficiency', true);
    const errs = [];
    if (!E.ok) errs.push(E.msg);
    if (!days.ok) errs.push(days.msg);
    if (!V.ok) errs.push(V.msg);
    if (!dod.ok) errs.push(dod.msg);
    if (!eff.ok) errs.push(eff.msg);
    if (errs.length) { this.showError('bb-error', errs.join(' ')); return; }
    if (V.v === 0) { this.showError('bb-error', 'System voltage cannot be zero.'); return; }
    if (dod.v === 0) { this.showError('bb-error', 'Depth of discharge cannot be zero.'); return; }
    if (eff.v === 0) { this.showError('bb-error', 'System efficiency cannot be zero.'); return; }
    const eUnit = document.getElementById('bb-energy-unit').value;
    const eWh = eUnit === 'kWh' ? E.v * 1000 : E.v;
    const dodDec = dod.v / 100;
    const effDec = eff.v / 100;
    const battEnergy = (eWh * days.v) / (dodDec * effDec);
    const ah = battEnergy / V.v;
    this.setResult('bb-r-energy', battEnergy.toFixed(0) + ' Wh (' + (battEnergy / 1000).toFixed(2) + ' kWh)');
    this.setResult('bb-r-ah', ah.toFixed(0) + ' Ah');
    this.setResult('bb-r-voltage', V.v + ' V');
    const battV = document.getElementById('bb-batt-voltage').value;
    const battAh = document.getElementById('bb-batt-ah').value.trim();
    if (battV && battAh !== '' && parseFloat(battAh) > 0) {
      const bv = parseFloat(battV);
      const ba = parseFloat(battAh);
      const series = Math.ceil(V.v / bv);
      const parallel = Math.ceil(ah / ba);
      const totalAh = series * parallel * ba;
      this.setResult('bb-r-series', series + ' batteries in series');
      this.setResult('bb-r-parallel', parallel + ' parallel string(s)');
      this.setResult('bb-r-total', totalAh.toFixed(0) + ' Ah (' + (totalAh * V.v / 1000).toFixed(1) + ' kWh)');
    } else {
      this.setResult('bb-r-series', '— (battery specs not provided)');
      this.setResult('bb-r-parallel', '— (battery specs not provided)');
      this.setResult('bb-r-total', '— (battery specs not provided)');
    }
    this.setResult('bb-r-steps', 'Battery Energy = (' + eWh.toFixed(0) + ' × ' + days.v + ') / (' + dodDec + ' × ' + effDec + ') = ' + battEnergy.toFixed(0) + ' Wh. Capacity = ' + battEnergy.toFixed(0) + ' / ' + V.v + ' = ' + ah.toFixed(0) + ' Ah.');
    this.showResults('bb-results');
  },

  calculateEnergyConsumption() {
    this.hideError('ec-error');
    const items = this.collectApplianceData('ec-appliances', 'energy');
    if (items.length === 0) { this.showError('ec-error', 'Add at least one appliance.'); return; }
    let totalLoad = 0;
    let totalDaily = 0;
    let totalMonthly = 0;
    const chartData = [];
    items.forEach(it => {
      const load = it.running * it.qty;
      const dailyWh = load * it.hours;
      const monthlyWh = dailyWh * it.days;
      totalLoad += load;
      totalDaily += dailyWh;
      totalMonthly += monthlyWh;
      chartData.push({ name: it.name, monthlyKwh: monthlyWh / 1000 });
    });
    const tariffRaw = document.getElementById('ec-tariff').value.trim();
    const tariff = tariffRaw === '' ? 0 : parseFloat(tariffRaw);
    const monthlyKwh = totalMonthly / 1000;
    const cost = monthlyKwh * tariff;
    this.setResult('ec-r-load', totalLoad.toFixed(0) + ' W (' + (totalLoad / 1000).toFixed(2) + ' kW)');
    this.setResult('ec-r-daily', (totalDaily / 1000).toFixed(2) + ' kWh/day');
    this.setResult('ec-r-monthly', monthlyKwh.toFixed(2) + ' kWh/month');
    this.setResult('ec-r-cost', tariff > 0 ? cost.toFixed(2) + ' (currency units)' : '— (no tariff entered)');
    this.setResult('ec-r-steps', 'Total monthly energy = ' + monthlyKwh.toFixed(2) + ' kWh. ' + (tariff > 0 ? 'Cost = ' + monthlyKwh.toFixed(2) + ' × ' + tariff + ' = ' + cost.toFixed(2) : 'Enter a tariff to estimate cost.'));
    // Build simple CSS bar chart
    const chart = document.getElementById('ec-chart');
    const max = Math.max(...chartData.map(d => d.monthlyKwh), 1);
    chart.innerHTML = '<h3>Monthly Energy by Appliance (kWh)</h3>' + chartData.map(d => `
      <div class="bar-row">
        <span class="bar-label">${d.name}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${(d.monthlyKwh / max * 100).toFixed(1)}%"></div></div>
        <span class="bar-value">${d.monthlyKwh.toFixed(1)}</span>
      </div>`).join('');
    this.showResults('ec-results');
  },

  calculateGeneratorSizing() {
    this.hideError('gs-error');
    const margin = this.val('gs-margin', true);
    if (!margin.ok) { this.showError('gs-error', margin.msg); return; }
    const items = this.collectApplianceData('gs-loads', 'generator');
    if (items.length === 0) { this.showError('gs-error', 'Add at least one load.'); return; }
    let totalRunning = 0;
    let totalSurge = 0;
    items.forEach(it => {
      totalRunning += it.running * it.qty;
      totalSurge += it.surge * it.qty;
    });
    if (totalRunning === 0) { this.showError('gs-error', 'Total running load cannot be zero.'); return; }
    const factor = 1 + margin.v / 100;
    const apparentVA = totalRunning / 0.8;
    const recommendedVA = Math.max(totalRunning, totalSurge) * factor;
    const stdSizes = [1, 2, 3, 5, 7.5, 10, 15, 20, 30, 50];
    const recommendedKva = recommendedVA / 1000;
    let std = stdSizes.find(s => s >= recommendedKva) || 50;
    this.setResult('gs-r-running', totalRunning.toFixed(0) + ' W (' + (totalRunning / 1000).toFixed(2) + ' kW)');
    this.setResult('gs-r-starting', totalSurge.toFixed(0) + ' W (' + (totalSurge / 1000).toFixed(2) + ' kW)');
    this.setResult('gs-r-apparent', (apparentVA / 1000).toFixed(2) + ' kVA (at PF 0.8)');
    this.setResult('gs-r-recommended', recommendedKva.toFixed(2) + ' kVA');
    this.setResult('gs-r-standard', std + ' kVA');
    this.setResult('gs-r-steps', 'Running = ' + totalRunning.toFixed(0) + ' W. Surge = ' + totalSurge.toFixed(0) + ' W. Recommended = max(' + totalRunning.toFixed(0) + ', ' + totalSurge.toFixed(0) + ') × ' + factor + ' = ' + recommendedVA.toFixed(0) + ' VA = ' + recommendedKva.toFixed(2) + ' kVA. Standard: ' + std + ' kVA.');
    this.showResults('gs-results');
  },

  related(ids) {
    const container = document.getElementById('related-' + this.current);
    if (!container) return;
    const names = { 'ohms-law':"Ohm's Law", 'electrical-power':'Electrical Power', 'battery-runtime':'Battery Runtime', 'motor-speed':'Motor Speed', 'gear-ratio':'Gear Ratio', 'unit-converter':'Engineering Unit Converter', 'resistor-color':'Resistor Color Code', 'voltage-divider':'Voltage Divider', 'capacitor':'Capacitor', 'inductor':'Inductor', 'transformer':'Transformer', 'led-resistor':'LED Resistor', 'three-phase':'Three-Phase Power', 'beam-deflection':'Beam Deflection', 'torque':'Torque', 'shaft-power':'Shaft Power', 'gear-design':'Gear Design', 'hydraulic-jack':'Hydraulic Jack', 'pump-head':'Pump Head', 'fluid-pressure':'Fluid Pressure', 'solar-sizing':'Solar Panel Sizing', 'inverter-sizing':'Inverter Sizing', 'cable-sizing':'Cable Sizing', 'battery-bank':'Battery Bank Sizing', 'energy-consumption':'Energy Consumption', 'generator-sizing':'Generator Sizing' };
    container.innerHTML = ids.map(id => '<a href="#" onclick="app.navigate(\'' + id + '\'); return false;">' + (names[id] || id) + '</a>').join(' · ');
  },

  switchTab(btn, panelId) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  },

  reset(view) {
    if (view === 'ohms-law') {
      ['ol-voltage','ol-current','ol-resistance'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('ol-results').hidden = true;
      this.hideError('ol-error');
    } else if (view === 'electrical-power') {
      ['ep-power','ep-voltage','ep-current','ep-time'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('ep-results').hidden = true;
      this.hideError('ep-error');
    } else if (view === 'battery-runtime') {
      ['br-voltage','br-capacity','br-load','br-efficiency'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('br-results').hidden = true;
      this.hideError('br-error');
    } else if (view === 'motor-speed') {
      ['ms-frequency','ms-poles'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('ms-results').hidden = true;
      this.hideError('ms-error');
    } else if (view === 'gear-ratio') {
      ['gr-driver','gr-driven','gr-input-rpm'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('gr-results').hidden = true;
      this.hideError('gr-error');
    } else if (view === 'unit-converter') {
      document.getElementById('uc-value').value = '';
      this.convert();
      this.hideError('uc-error');
    } else if (view === 'resistor-color') {
      ['rc-band1','rc-band2','rc-multiplier','rc-tolerance'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('rc-results').hidden = true;
      this.hideError('rc-error');
    } else if (view === 'voltage-divider') {
      ['vd-vin','vd-r1','vd-r2'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('vd-results').hidden = true;
      this.hideError('vd-error');
    } else if (view === 'capacitor') {
      ['cap-frequency','cap-capacitance','cap-resistance','cap-capacitance-rc'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      ['cap-freq-unit','cap-cap-unit','cap-cap-unit-rc'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
      document.getElementById('cap-results').hidden = true;
      this.hideError('cap-error');
    } else if (view === 'inductor') {
      ['ind-frequency','ind-inductance','ind-resistance','ind-inductance-rl'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      ['ind-freq-unit','ind-ind-unit','ind-ind-unit-rl'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
      document.getElementById('ind-results').hidden = true;
      this.hideError('ind-error');
    } else if (view === 'transformer') {
      ['tr-vp','tr-vs','tr-np','tr-ns','tr-ip','tr-is'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('tr-results').hidden = true;
      this.hideError('tr-error');
    } else if (view === 'led-resistor') {
      ['led-vs','led-vf','led-current'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('led-results').hidden = true;
      this.hideError('led-error');
    } else if (view === 'three-phase') {
      ['tp-vl','tp-il','tp-pf'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('tp-results').hidden = true;
      this.hideError('tp-error');
    } else if (view === 'beam-deflection') {
      ['bd-length','bd-load','bd-udl','bd-e','bd-i'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      ['bd-length-unit','bd-load-unit','bd-udl-unit','bd-e-unit','bd-i-unit'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
      document.getElementById('bd-results').hidden = true;
      this.hideError('bd-error');
      this.updateBeamVisual();
    } else if (view === 'torque') {
      ['tq-force','tq-arm','tq-angle'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('tq-results').hidden = true;
      this.hideError('tq-error');
    } else if (view === 'shaft-power') {
      ['sp-torque','sp-rpm'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('sp-results').hidden = true;
      this.hideError('sp-error');
    } else if (view === 'gear-design') {
      ['gd-z1','gd-z2','gd-rpm','gd-module','gd-pressure'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('gd-results').hidden = true;
      this.hideError('gd-error');
    } else if (view === 'hydraulic-jack') {
      ['hj-force','hj-d1','hj-d2'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('hj-results').hidden = true;
      this.hideError('hj-error');
    } else if (view === 'pump-head') {
      ['ph-pressure','ph-density','ph-static','ph-friction','ph-velocity'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('ph-results').hidden = true;
      this.hideError('ph-error');
    } else if (view === 'fluid-pressure') {
      ['fp-density','fp-depth','fp-force-val','fp-area'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('fp-results').hidden = true;
      this.hideError('fp-error');
    } else if (view === 'solar-sizing') {
      ['ss-energy','ss-sun','ss-efficiency','ss-panel'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('ss-panel-preset').selectedIndex = 6;
      document.getElementById('ss-results').hidden = true;
      this.hideError('ss-error');
    } else if (view === 'inverter-sizing') {
      document.getElementById('inv-margin').value = '20';
      this.clearApplianceList('inv-appliances');
      this.addApplianceRow('inv-appliances', 'inverter');
      document.getElementById('inv-results').hidden = true;
      this.hideError('inv-error');
    } else if (view === 'cable-sizing') {
      ['cs-power','cs-voltage','cs-length','cs-pf','cs-vd'].forEach(id => document.getElementById(id).value = '');
      ['cs-power-unit','cs-phase','cs-material'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
      document.getElementById('cs-results').hidden = true;
      this.hideError('cs-error');
    } else if (view === 'battery-bank') {
      ['bb-energy','bb-autonomy','bb-voltage','bb-dod','bb-efficiency','bb-batt-ah'].forEach(id => document.getElementById(id).value = '');
      ['bb-energy-unit','bb-type','bb-batt-voltage'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
      document.getElementById('bb-results').hidden = true;
      this.hideError('bb-error');
      this.bbTypeChange();
    } else if (view === 'energy-consumption') {
      document.getElementById('ec-tariff').value = '';
      this.clearApplianceList('ec-appliances');
      this.addApplianceRow('ec-appliances', 'energy');
      document.getElementById('ec-results').hidden = true;
      this.hideError('ec-error');
    } else if (view === 'generator-sizing') {
      document.getElementById('gs-margin').value = '20';
      this.clearApplianceList('gs-loads');
      this.addApplianceRow('gs-loads', 'generator');
      document.getElementById('gs-results').hidden = true;
      this.hideError('gs-error');
    }
  }
};

const ucUnits = {
  length: [
    { label: 'Millimeter', value: 'mm' },
    { label: 'Centimeter', value: 'cm' },
    { label: 'Meter', value: 'm' },
    { label: 'Kilometer', value: 'km' },
    { label: 'Inch', value: 'in' },
    { label: 'Foot', value: 'ft' }
  ],
  pressure: [
    { label: 'Pascal', value: 'pa' },
    { label: 'Kilopascal', value: 'kpa' },
    { label: 'Megapascal', value: 'mpa' },
    { label: 'Bar', value: 'bar' },
    { label: 'PSI', value: 'psi' }
  ],
  power: [
    { label: 'Watt', value: 'w' },
    { label: 'Kilowatt', value: 'kw' },
    { label: 'Megawatt', value: 'mw' },
    { label: 'Horsepower', value: 'hp' }
  ],
  energy: [
    { label: 'Joule', value: 'j' },
    { label: 'Kilojoule', value: 'kj' },
    { label: 'Watt-hour', value: 'wh' },
    { label: 'Kilowatt-hour', value: 'kwh' }
  ],
  temperature: [
    { label: 'Celsius', value: 'c' },
    { label: 'Fahrenheit', value: 'f' },
    { label: 'Kelvin', value: 'k' }
  ]
};

const ucFactors = {
  length: { mm: 1, cm: 10, m: 1000, km: 1000000, in: 25.4, ft: 304.8 },
  pressure: { pa: 1, kpa: 1000, mpa: 1000000, bar: 100000, psi: 6894.757 },
  power: { w: 1, kw: 1000, mw: 1000000, hp: 745.699872 },
  energy: { j: 1, kj: 1000, wh: 3600, kwh: 3600000 },
  temperature: {}
};

document.getElementById('year').textContent = new Date().getFullYear();
app.ucUpdateUnits();
