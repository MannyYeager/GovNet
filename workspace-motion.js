/* Shared Anime.js motion. All animation assets are bundled for offline use. */
const WorkspaceMotion = (() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 780px)');
  const active = new Set();
  const running = new WeakMap();
  const cardSelector = '.stat-card, .doc-card, .person-card, .service-card, .dashboard-card, .knowledge-card';

  function stop(targets) {
    for (const target of Array.isArray(targets) ? targets : [targets]) {
      const previous = running.get(target);
      if (previous) { previous.cancel(); active.delete(previous); running.delete(target); }
    }
  }

  function animate(target, properties, duration = 260, done = () => {}) {
    if (!target) return;
    stop(target);
    if (reducedMotion.matches) {
      const final = Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, Array.isArray(value) ? value.at(-1) : value]));
      anime.utils.set(target, final);
      done();
      return;
    }
    const animation = anime.animate(target, {
      ...properties, duration, ease: 'outCubic',
      onComplete: () => { active.delete(animation); running.delete(target); done(); }
    });
    active.add(animation);
    running.set(target, animation);
    return animation;
  }

  function enter(node, distance = 8) {
    animate(node, { opacity: [0, 1], y: [distance, 0] }, 260, () => {
      node.style.removeProperty('opacity');
      node.style.removeProperty('transform');
    });
  }

  function page(main) {
    // Animate whole sections rather than every calendar cell or table row.
    Array.from(main.children).forEach(node => enter(node));
  }

  const isVisible = node => !node.classList.contains('hidden') && node.dataset.motionClosing !== 'true';
  function visibility(node, visible) {
    if (!node) return;
    document.querySelectorAll('[aria-controls]').forEach(button => {
      if (button.getAttribute('aria-controls') === node.id) button.setAttribute('aria-expanded', String(visible));
    });
    if (visible) {
      if (isVisible(node)) return;
      delete node.dataset.motionClosing;
      node.inert = false;
      node.removeAttribute('aria-hidden');
      node.classList.remove('hidden');
      enter(node, -6);
    } else {
      if (!isVisible(node)) return;
      node.dataset.motionClosing = 'true';
      node.inert = true;
      node.setAttribute('aria-hidden', 'true');
      animate(node, { opacity: 0, y: -4 }, 160, () => {
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
    animate(modal, { opacity: [0, 1], y: [14, 0], scale: [.98, 1] }, 300, () => {
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

  function toggleMobile(open) {
    const sidebar = document.querySelector('#sidebar');
    if (!mobile.matches) return;
    const from = new DOMMatrixReadOnly(getComputedStyle(sidebar).transform).m41;
    stop(sidebar);
    sidebar.style.removeProperty('transform');
    sidebar.classList.toggle('mobile-open', open ?? !sidebar.classList.contains('mobile-open'));
    const to = new DOMMatrixReadOnly(getComputedStyle(sidebar).transform).m41;
    animate(sidebar, { x: [from, to] }, 300, () => sidebar.style.removeProperty('transform'));
    document.querySelector('#mobile-menu').setAttribute('aria-expanded', String(sidebar.classList.contains('mobile-open')));
    document.querySelector('#mobile-menu').setAttribute('aria-label', sidebar.classList.contains('mobile-open') ? 'Close navigation' : 'Open navigation');
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
    document.querySelector('#mobile-menu').setAttribute('aria-expanded', 'false');
    document.querySelector('#mobile-menu').setAttribute('aria-label', 'Open navigation');
    if (mobile.matches) {
      document.body.classList.remove('sidebar-collapsed');
      state.sidebarCollapsed = false;
    }
    syncSidebarIcon();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      Array.from(active).forEach(animation => animation.complete());
      active.clear();
      document.querySelectorAll(cardSelector).forEach(node => node.style.removeProperty('transform'));
    }
  });

  document.addEventListener('pointerover', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches) return;
    const card = event.target.closest(cardSelector);
    if (card && !card.contains(event.relatedTarget)) animate(card, { y: -2 }, 220);
  });
  document.addEventListener('pointerout', event => {
    const card = event.target.closest(cardSelector);
    if (card && !card.contains(event.relatedTarget)) animate(card, { y: 0 }, 220, () => card.style.removeProperty('transform'));
  });
  document.addEventListener('DOMContentLoaded', syncSidebarIcon);

  return { enter, page, visibility, isVisible, modalOpen, modalClose, dismissToast, toggleSidebar, toggleMobile };
})();
