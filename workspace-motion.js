/* Shared Anime.js motion. All animation assets are bundled for offline use. */
const WorkspaceMotion = (() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 780px)');
  let manualReducedMotion = false;
  try { manualReducedMotion = localStorage.getItem('nita-reduced-motion') === '1'; } catch {}
  const isReduced = () => reducedMotion.matches || manualReducedMotion;
  const active = new Set();
  const running = new WeakMap();
  const pageNodes = new Set();
  const pendingReveals = new Map();
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const reveal = pendingReveals.get(entry.target);
      if (!reveal) return;
      revealObserver.unobserve(entry.target);
      pendingReveals.delete(entry.target);
      reveal();
    });
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0 });
  let previousPage = '';
  let previousMonth = 0;
  let navigationFocus = null;
  const cardSelector = '.stat-card, .doc-card, .person-card, .service-card, .dashboard-card, .knowledge-card, .help-topic-card';

  function stop(targets) {
    for (const target of Array.isArray(targets) ? targets : [targets]) {
      const previous = running.get(target);
      if (previous) { previous.cancel(); active.delete(previous); running.delete(target); }
    }
  }

  function animate(target, properties, duration = 260, done = () => {}, options = {}) {
    if (!target) return;
    stop(target);
    if (isReduced()) {
      const final = Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, Array.isArray(value) ? value.at(-1) : value]));
      anime.utils.set(target, final);
      done();
      return;
    }
    const animation = anime.animate(target, {
      ...properties, duration, ease: 'outCubic', ...options,
      onComplete: () => { active.delete(animation); running.delete(target); done(); }
    });
    active.add(animation);
    running.set(target, animation);
    return animation;
  }

  function enter(node, distance = 8, delay = 0, variant = 'rise', duration = 360) {
    node.dataset.motionEntering = 'true';
    const movement = variant === 'slide' ? { x: [distance, 0] } : variant === 'scale' ? { scale: [.96, 1], y: [distance, 0] } : { y: [distance, 0] };
    animate(node, { opacity: [0, 1], ...movement }, duration, () => {
      node.style.removeProperty('opacity');
      node.style.removeProperty('transform');
      delete node.dataset.motionEntering;
    }, { delay });
  }

  function revealOnScroll(node, reveal) {
    if (!isReduced() && node.getBoundingClientRect().top >= innerHeight - 24) {
      node.dataset.motionEntering = 'true';
      node.style.opacity = '0';
      pendingReveals.set(node, reveal);
      revealObserver.observe(node);
    } else reveal();
  }

  const profiles = {
    'Home': ['welcome', '.hero-banner, .nita-vision-card, .stat-card, .dashboard-two-col > .panel, .dashboard-lower > .panel, .ai-card, .promo-card, .nita-collaboration-card', 'rise'],
    'My Work': ['work', '.task-row, .policy-row, .metric-row', 'slide'],
    'Tasks': ['tasks', '.task-row', 'slide'],
    'Calendar': ['calendar', '.nita-calendar-toolbar, .nita-calendar-day, .nita-timed-event, .nita-agenda-day, .nita-schedule-event', 'rise'],
    'Documents': ['documents', '.doc-card', 'scale'],
    'Teams & Collaboration': ['people', '.person-card, .policy-row', 'rise'],
    'Service Requests': ['requests', '.data-table tbody tr, .service-card', 'slide'],
    'Approvals': ['approvals', '.data-table tbody tr', 'slide'],
    'Policies & Guidelines': ['policies', '.policy-row', 'slide'],
    'Knowledge Hub': ['knowledge', '.knowledge-card, .policy-row', 'rise'],
    'Performance': ['performance', '.metric-row', 'rise'],
    'Reports & Analytics': ['reports', '.policy-row', 'rise'],
    'Dashboards': ['dashboards', '.dashboard-card', 'scale'],
    'IT Support': ['support', '.service-card, .data-table tbody tr, .metric-row', 'rise'],
    'Facilities': ['facilities', '.service-card, .policy-row', 'rise'],
    'Help & Feedback': ['help', '.help-topic-card, .help-service-desk, .form-grid .field, .feedback-form .field, .metric-row', 'rise']
  };

  function page(main, name) {
    stop(Array.from(pageNodes));
    pageNodes.clear();
    revealObserver.disconnect();
    pendingReveals.clear();
    const changed = previousPage !== name || document.readyState === 'loading';
    previousPage = name;
    const [profile, selector, variant] = profiles[name] || ['page', '.surface', 'rise'];
    main.dataset.motionProfile = profile;
    const reveal = (node, distance, delay, type = 'rise') => {
      pageNodes.add(node);
      const settings = [distance, isReduced() ? 0 : delay, type, changed ? 420 : 260];
      revealOnScroll(node, () => enter(node, ...settings));
    };
    if (changed) {
      main.querySelectorAll('.page-header').forEach(node => reveal(node, 10, 0));
      main.querySelectorAll('.mini-stat, .nita-calendar-overview > div').forEach((node, index) => reveal(node, 10, Math.min(index * 35, 140), 'scale'));
      main.querySelectorAll('.surface, .nita-calendar-surface').forEach((node, index) => reveal(node, 8, Math.min(index * 30, 120)));
    }
    if (name === 'Home' && !changed) {
      const reply = main.querySelector('.chat-bubble:last-child');
      if (reply) reveal(reply, 8, 0);
      else { const intro = main.querySelector('.assistant-intro'); if (intro) reveal(intro, 8, 0); }
      return;
    }
    let direction = 1;
    if (name === 'Calendar') {
      const month = state.month.getTime();
      direction = previousMonth && month < previousMonth ? -1 : 1;
      previousMonth = month;
    }
    main.querySelectorAll(selector).forEach((node, index) => {
      const calendarCell = node.classList.contains('nita-calendar-day');
      const distance = changed ? 16 : 6;
      reveal(node, distance * direction, Math.min(index * (calendarCell ? 5 : 35), 210), name === 'Calendar' && !changed ? 'slide' : variant);
    });
    if (name === 'Home') main.querySelectorAll('.meeting-row, .priority-item').forEach((node, index) => reveal(node, 10, Math.min(100 + index * 25, 240), 'slide'));
    if (changed) drawCharts(main);
  }

  function drawCharts(main) {
    main.querySelectorAll('.progress-track > span, .bar-chart .bar').forEach((node, index) => {
      pageNodes.add(node);
      const property = node.classList.contains('bar') ? 'scaleY' : 'scaleX';
      revealOnScroll(node, () => {
        node.style.removeProperty('opacity');
        delete node.dataset.motionEntering;
        animate(node, { [property]: [0, 1] }, 700, () => node.style.removeProperty('transform'), { delay: Math.min(index * 28, 250), ease: 'outQuart' });
      });
    });
    main.querySelectorAll('.chart-area path[stroke="#25a65a"]').forEach(node => {
      pageNodes.add(node);
      revealOnScroll(node, () => {
        node.style.removeProperty('opacity');
        delete node.dataset.motionEntering;
        const length = node.getTotalLength();
        node.style.strokeDasharray = String(length);
        animate(node, { strokeDashoffset: [length, 0] }, 900, () => {
          node.style.removeProperty('stroke-dasharray');
          node.style.removeProperty('stroke-dashoffset');
        }, { delay: 80, ease: 'inOutCubic' });
      });
    });
  }

  function task(row, completed) {
    if (!row) return;
    const checkbox = row.querySelector('input');
    animate(checkbox, { scale: completed ? [1, 1.2, 1] : [1, .9, 1] }, 320, () => checkbox.style.removeProperty('transform'));
  }

  const isVisible = node => !node.classList.contains('hidden') && node.dataset.motionClosing !== 'true';
  function visibility(node, visible) {
    if (!node) return;
    document.querySelectorAll('[aria-controls]').forEach(button => {
      if (button.getAttribute('aria-controls') === node.id) {
        button.setAttribute('aria-expanded', String(visible));
        const caret = button.querySelector('.profile-chevron');
        if (caret && isVisible(node) !== visible) animate(caret, { rotate: visible ? 180 : 0 }, 220);
      }
    });
    if (visible) {
      if (isVisible(node)) return;
      delete node.dataset.motionClosing;
      node.inert = false;
      node.removeAttribute('aria-hidden');
      node.classList.remove('hidden');
      enter(node, node.id === 'navigation-scrim' ? 0 : -6);
    } else {
      if (!isVisible(node)) return;
      node.dataset.motionClosing = 'true';
      node.inert = true;
      node.setAttribute('aria-hidden', 'true');
      animate(node, node.id === 'navigation-scrim' ? { opacity: 0 } : { opacity: 0, y: -4 }, 160, () => {
        node.classList.add('hidden');
        node.style.removeProperty('opacity');
        node.style.removeProperty('transform');
        delete node.dataset.motionClosing;
      });
    }
  }

  function modalOpen(backdrop) {
    animate(backdrop, { opacity: [0, 1] }, 220, () => backdrop.style.removeProperty('opacity'));
    const modal = backdrop.querySelector('.modal');
    animate(modal, { opacity: [0, 1], y: [mobile.matches ? 36 : 14, 0], scale: [mobile.matches ? 1 : .98, 1] }, 380, () => {
      modal.style.removeProperty('opacity');
      modal.style.removeProperty('transform');
    });
  }

  function modalClose(backdrop) {
    if (!backdrop || backdrop.dataset.motionClosing === 'true') return;
    backdrop.dataset.motionClosing = 'true';
    backdrop.inert = true;
    animate(backdrop.querySelector('.modal'), { y: 8, scale: .99 }, 160);
    animate(backdrop, { opacity: 0 }, 180, () => backdrop.remove());
  }

  function dismissToast(node) {
    animate(node, { opacity: 0, y: 6 }, 180, () => node.remove());
  }

  function syncSidebarIcon() {
    const collapsed = document.body.classList.contains('sidebar-collapsed');
    const button = document.querySelector('#collapse-sidebar');
    const label = mobile.matches ? 'Close navigation' : collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-expanded', String(mobile.matches ? document.querySelector('#sidebar').classList.contains('mobile-open') : !collapsed));
    animate(button.querySelector('.sidebar-direction'), { rotate: collapsed && !mobile.matches ? 180 : 0 }, 260);
  }

  function toggleMobile(open, restoreFocus = true) {
    const sidebar = document.querySelector('#sidebar');
    if (!mobile.matches) return;
    const wasOpen = sidebar.classList.contains('mobile-open');
    const willOpen = open ?? !wasOpen;
    if (wasOpen === willOpen) return;
    if (willOpen) navigationFocus = document.activeElement;
    const from = new DOMMatrixReadOnly(getComputedStyle(sidebar).transform).m41;
    stop(sidebar);
    sidebar.style.removeProperty('transform');
    sidebar.classList.toggle('mobile-open', willOpen);
    sidebar.inert = !willOpen;
    document.querySelector('.workspace').inert = willOpen;
    document.querySelector('#mobile-tabbar').inert = willOpen;
    document.body.classList.toggle('mobile-nav-open', willOpen);
    visibility(document.querySelector('#navigation-scrim'), willOpen);
    const to = new DOMMatrixReadOnly(getComputedStyle(sidebar).transform).m41;
    animate(sidebar, { x: [from, to] }, 300, () => sidebar.style.removeProperty('transform'));
    document.querySelector('#mobile-menu').setAttribute('aria-expanded', String(sidebar.classList.contains('mobile-open')));
    document.querySelector('#mobile-menu').setAttribute('aria-label', sidebar.classList.contains('mobile-open') ? 'Close navigation' : 'Open navigation');
    document.querySelector('[data-mobile-navigation]')?.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) sidebar.querySelector('.nav-item.active, .nav-item')?.focus({ preventScroll: true });
    else if (restoreFocus && navigationFocus?.isConnected) navigationFocus.focus({ preventScroll: true });
    syncSidebarIcon();
  }

  function toggleSidebar() {
    if (mobile.matches) { toggleMobile(false); return; }
    const sidebar = document.querySelector('#sidebar');
    const workspace = document.querySelector('.workspace');
    const fromWidth = sidebar.getBoundingClientRect().width;
    const fromMargin = parseFloat(getComputedStyle(workspace).marginLeft);
    stop([sidebar, workspace]);
    sidebar.style.removeProperty('width');
    workspace.style.removeProperty('margin-left');
    document.body.classList.toggle('sidebar-collapsed');
    state.sidebarCollapsed = document.body.classList.contains('sidebar-collapsed');
    const toWidth = sidebar.getBoundingClientRect().width;
    const toMargin = parseFloat(getComputedStyle(workspace).marginLeft);
    animate(sidebar, { width: [fromWidth, toWidth] }, 320, () => sidebar.style.removeProperty('width'));
    animate(workspace, { marginLeft: [fromMargin, toMargin] }, 320, () => workspace.style.removeProperty('margin-left'));
    if (!state.sidebarCollapsed) sidebar.querySelectorAll('.nav-label, .nav-heading').forEach(node => {
      animate(node, { opacity: [0, 1] }, 260, () => node.style.removeProperty('opacity'));
    });
    syncSidebarIcon();
  }

  // Keep CSS breakpoints in control after animation and when resizing mid-motion.
  mobile.addEventListener('change', () => {
    const sidebar = document.querySelector('#sidebar');
    const workspace = document.querySelector('.workspace');
    stop([sidebar, workspace]);
    sidebar.style.removeProperty('width');
    sidebar.style.removeProperty('transform');
    workspace.style.removeProperty('margin-left');
    sidebar.classList.remove('mobile-open');
    sidebar.inert = mobile.matches;
    document.querySelector('.workspace').inert = false;
    document.querySelector('#mobile-tabbar').inert = false;
    document.body.classList.remove('mobile-nav-open');
    visibility(document.querySelector('#navigation-scrim'), false);
    document.querySelector('[data-mobile-navigation]')?.setAttribute('aria-expanded', 'false');
    document.querySelector('#mobile-menu').setAttribute('aria-expanded', 'false');
    document.querySelector('#mobile-menu').setAttribute('aria-label', 'Open navigation');
    if (mobile.matches) {
      document.body.classList.remove('sidebar-collapsed');
      state.sidebarCollapsed = false;
    }
    syncSidebarIcon();
  });
  function settleMotion() {
    Array.from(active).forEach(animation => animation.complete());
    active.clear();
    pendingReveals.forEach((reveal, node) => { revealObserver.unobserve(node); reveal(); });
    pendingReveals.clear();
    document.querySelectorAll(cardSelector).forEach(node => node.style.removeProperty('transform'));
  }
  function setReducedPreference(value) {
    manualReducedMotion = Boolean(value);
    try { localStorage.setItem('nita-reduced-motion', manualReducedMotion ? '1' : '0'); } catch {}
    if (isReduced()) settleMotion();
  }
  reducedMotion.addEventListener('change', () => { if (isReduced()) settleMotion(); });

  document.addEventListener('pointerover', event => {
    if (event.pointerType === 'touch' || isReduced()) return;
    const card = event.target.closest(cardSelector);
    if (card && !card.dataset.motionEntering && !card.contains(event.relatedTarget)) animate(card, { y: -3 }, 220);
  });
  document.addEventListener('pointerout', event => {
    const card = event.target.closest(cardSelector);
    if (card && !card.dataset.motionEntering && !card.contains(event.relatedTarget)) animate(card, { y: 0 }, 220, () => card.style.removeProperty('transform'));
  });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-mobile-navigation]')) toggleMobile();
    if (event.target.closest('#navigation-scrim')) toggleMobile(false);
  });
  document.addEventListener('keydown', event => {
    const sidebar = document.querySelector('#sidebar');
    if (event.key !== 'Tab' || !mobile.matches || !sidebar.classList.contains('mobile-open')) return;
    const controls = Array.from(sidebar.querySelectorAll('a[href], button')).filter(node => node.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#sidebar').inert = mobile.matches;
    document.querySelector('#mobile-menu').innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h12M4 18h16"/></svg>';
    syncSidebarIcon();
  });

  return { enter, page, task, visibility, isVisible, modalOpen, modalClose, dismissToast, toggleSidebar, toggleMobile, isReduced, setReducedPreference };
})();
