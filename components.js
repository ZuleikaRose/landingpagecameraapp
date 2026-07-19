/**
 * Shared UI utilities and data-driven renderers for the Cameo landing page.
 *
 * The page originally repeated near-identical markup for the nav links,
 * carousel slides, feature cards, pricing plans, reviews, footer link
 * columns and language options. Those repeated blocks are described here as
 * plain data and rendered through a small set of shared helpers so each
 * pattern lives in exactly one place.
 */
(function () {
  'use strict';

  /**
   * Tiny hyperscript-style element builder.
   * @param {string} tag
   * @param {Object|null} attrs - attributes; `class` and `html` are handled specially.
   * @param {...(Node|string)} children
   * @returns {HTMLElement}
   */
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const value = attrs[key];
        if (value == null || value === false) return;
        if (key === 'class') {
          node.className = value;
        } else if (key === 'html') {
          node.innerHTML = value;
        } else {
          node.setAttribute(key, value === true ? '' : value);
        }
      });
    }
    children.flat().forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  /** Font Awesome icon shorthand. */
  function icon(name, extraClass) {
    return el('i', {
      class: 'fa fa-' + name + (extraClass ? ' ' + extraClass : ''),
      'aria-hidden': 'true'
    });
  }

  /** Render an array of data items into the container matching `selector`. */
  function mount(selector, items, renderItem) {
    const container = document.querySelector(selector);
    if (!container) return;
    items.forEach(function (item, index) {
      container.appendChild(renderItem(item, index));
    });
  }

  /* ------------------------------------------------------------------ data */

  const navLinks = [
    { href: '#section-jumbotron', label: 'To the top' },
    { href: '#section-description', label: 'Description' },
    { href: '#section-trailer', label: 'Trailer' },
    { href: '#section-showcase', label: 'Showcase' },
    { href: '#section-features', label: 'Features' },
    { href: '#section-pricing', label: 'Pricing' },
    { href: '#section-reviews', label: 'Reviews' }
  ];

  const slides = [
    { img: 'showcase01.jpg', alt: 'Slide #1', title: 'At night', text: 'Use Cameo at night when going out with friends.' },
    { img: 'showcase02.jpg', alt: 'Slide #2', title: 'Outside', text: 'Use Cameo outside when hiking in the nature.' },
    { img: 'showcase03.jpg', alt: 'Slide #3', title: 'In the sun', text: 'Use Cameo even with strong and direct sun.' },
    { img: 'showcase04.jpg', alt: 'Slide #4', title: 'In the distance', text: 'Use Cameo to take clear photos of objects far away.' }
  ];

  const features = [
    { icon: 'paint-brush', title: 'Enhance your photos', text: 'Easily enhance your photos with a selection of editing tools, filters and effects.' },
    { icon: 'video-camera', title: 'Also made for video', text: 'With Cameo you get dedicated video effects like slow motion, timelapse and transitions.' },
    { icon: 'instagram', title: 'Share on Instagram', text: 'You can easily share your photos with your friends and the rest of the world on Instragram.' },
    { icon: 'mobile', title: 'Works on all devices', text: 'Cameo works on all platforms and all devices no matter the size of your screen.' }
  ];

  const enhance = { icon: 'paint-brush', label: 'Enhance your photos and videos' };
  const share = { icon: 'instagram', label: 'Share on Instagram' };
  const advanced = { icon: 'cogs', label: 'Advanced settings' };
  const cloud = { icon: 'cloud', label: 'Cloud storage' };

  const plans = [
    { color: 'success', name: 'Starter', price: 'Free', blurb: 'Perfect if you only take pictures for fun.', perks: [enhance, share] },
    { color: 'warning', name: 'Semi-pro', price: '$1.99 / month', blurb: "Perfect if you're a semi-pro photographer.", perks: [enhance, share, advanced] },
    { color: 'danger', name: 'Pro', price: '$4.99 / month', blurb: "Perfect if you're a pro photographer.", perks: [enhance, share, advanced, cloud] }
  ];

  const reviews = [
    { text: 'This is the best camera app I have ever tried. I highly recommend Cameo!', author: 'Marc Johnson', datetime: '2017-06-15T14:35', when: 'June 15 2017 14:35' },
    { text: 'I have never been able to take pictures in the darkness with good results before. Now I can with Cameo and I am so happy about that.', author: 'Hanna Eastwood', datetime: '2017-07-09T19:12', when: 'July 09 2017 19:12' },
    { text: 'I have tried many different camera apps on the market, but with Cameo I am able to use the editing tools, filters and effects that I want in a creative and easy way.', author: 'Anna Foster', datetime: '2017-09-01T11:19', when: 'September 01 2017 11:19' },
    { text: 'I use the cloud storage feature of Cameo to have a backup of all my photos and videos. I find that feature incredibly valuable.', author: 'Tim Stevens', datetime: '2017-08-12T08:43', when: 'August 12 2017 8:43' }
  ];

  const footerColumns = [
    { heading: 'Quick links', links: [
      { label: 'Home' }, { label: "What's new?" }, { label: 'Support' }, { label: 'My account' }, { label: 'Cancel subscription' }
    ] },
    { heading: 'Information', links: [
      { label: 'About us' }, { label: 'Jobs' }, { label: 'Press info' }, { label: 'Contact' }, { label: 'Partnership' }
    ] },
    { heading: 'Follow us', links: [
      { label: 'Facebook', icon: 'facebook' }, { label: 'Instagram', icon: 'instagram' }, { label: 'Twitter', icon: 'twitter' }, { label: 'YouTube', icon: 'youtube' }, { label: 'LinkedIn', icon: 'linkedin' }
    ] }
  ];

  const languages = ['English', 'German', 'French', 'Spanish'];

  /* --------------------------------------------------------------- renderers */

  mount('#navScrollspy', navLinks, function (link) {
    return el('li', { class: 'nav-item' },
      el('a', { class: 'nav-link', href: link.href }, link.label));
  });

  mount('#carousel-indicators', slides, function (slide, i) {
    return el('li', {
      'data-target': '#carousel',
      'data-slide-to': String(i),
      class: i === 0 ? 'active' : null
    });
  });

  mount('#carousel-slides', slides, function (slide, i) {
    return el('div', { class: 'carousel-item' + (i === 0 ? ' active' : '') },
      el('img', { src: slide.img, alt: slide.alt, class: 'd-block img-fluid' }),
      el('div', { class: 'carousel-caption' },
        el('h3', { class: 'display-4' }, slide.title),
        el('p', null, slide.text)));
  });

  mount('#features-row', features, function (feature) {
    return el('div', { class: 'col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-center mb-5' },
      el('div', { class: 'h1' }, icon(feature.icon, 'mb-4 text-info')),
      el('h3', { class: 'h4 mb-4 text-center' }, feature.title),
      el('p', null, feature.text),
      el('a', { href: '#', class: 'btn btn-sm btn-info mt-auto' }, 'Read more...'));
  });

  mount('#pricing-row', plans, function (plan) {
    const perks = plan.perks.map(function (perk) {
      return el('li', { class: 'list-group-item' }, icon('fw fa-' + perk.icon), ' ' + perk.label);
    });
    return el('div', { class: 'col-12 col-md-4 mb-4' },
      el('div', { class: 'card card-outline-' + plan.color },
        el('div', { class: 'card-header bg-' + plan.color + ' text-white text-center' },
          el('h2', null, plan.name),
          el('h4', null, plan.price)),
        el('div', { class: 'card-body' },
          el('p', { class: 'card-text' }, plan.blurb)),
        el('ul', { class: 'list-group' }, perks),
        el('div', { class: 'card-footer text-center' },
          el('a', { href: '#', class: 'btn btn-' + plan.color + ' btn-lg' }, 'Select plan'))));
  });

  mount('#reviews-row', reviews, function (review) {
    return el('div', { class: 'col-12 col-md-6 col-xl-3' },
      el('blockquote', { class: 'blockquote p-3' },
        el('p', null,
          icon('fw fa-quote-left text-secondary'),
          review.text,
          icon('fw fa-quote-right text-secondary')),
        el('footer', { class: 'blockquote-footer' },
          review.author + ' ',
          el('time', { datetime: review.datetime }, '(' + review.when + ')'))));
  });

  function renderFooterColumn(column) {
    const items = column.links.map(function (link) {
      const content = link.icon
        ? [icon('fw fa-' + link.icon), ' ' + link.label]
        : [link.label];
      return el('li', null, el('a', { href: '#' }, ...content));
    });
    return el('div', { class: 'col-12 col-sm-6 col-lg-3' },
      el('h6', null, column.heading),
      el('ul', { class: 'list-unstyled' }, items));
  }

  // The static "Our location" column stays last; generated columns are
  // inserted before it to preserve the original order.
  const footerContainer = document.querySelector('#footer-columns');
  const footerLocation = document.querySelector('#footer-location');
  if (footerContainer) {
    footerColumns.forEach(function (column) {
      footerContainer.insertBefore(renderFooterColumn(column), footerLocation);
    });
  }

  mount('#language-menu', languages, function (language) {
    return el('a', { href: '#', class: 'dropdown-item small px-1' }, language);
  });
})();
