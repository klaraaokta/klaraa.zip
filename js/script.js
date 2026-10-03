const SVG = p =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`
const SOC = [
  [
    'GitHub',
    'https://github.com/klaraaokta',
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
  ],
  [
    'Instagram',
    'https://www.instagram.com/seccraraa13/',
    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'
  ],
  [
    'Email',
    'mailto:email@contoh.com',
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
  ]
]
  .map(
    x =>
      `<a href="${x[1]}" target="_blank" rel="noopener" aria-label="${
        x[0]
      }" title="${x[0]}">${SVG(x[2])}</a>`
  )
  .join('')
const P = [
  ['index.html', 'Beranda'],
  ['proyek.html', 'Proyek'],
  ['playground.html', 'Playground'],
  ['tentang.html', 'Tentang'],
  ['blog.html', 'Blog'],
  ['kontak.html', 'Kontak']
]
const cur = location.pathname.split('/').pop() || 'index.html'
document.body.insertAdjacentHTML(
  'afterbegin',
  `<a class="skip" href="#main">Lewati ke konten</a><div id="load">Klara ✿</div><header><div class="wrap"><nav><a class="logo" href="index.html">Klara Oktaviana</a><ul id="menu">${P.map(
    p =>
      `<li><a href="${p[0]}" class="${p[0] == cur ? 'on' : ''}">${
        p[1]
      }</a></li>`
  ).join(
    ''
  )}</ul><button class="burger" id="bg" aria-label="Menu">☰</button></nav></div></header>`
)
document.body.insertAdjacentHTML(
  'beforeend',
  `<footer><div class="wrap"><div class="soc">${SOC}</div><p id="clock"></p><p><a href="tools.html">Tools yang saya pakai</a> · <button class="lk" id="share">Bagikan portofolio</button></p><p>© ${new Date().getFullYear()} Klara Oktaviana · Web Developer</p></div></footer><div id="pg"></div><div id="toast"></div><a class="fab" id="wa" href="https://wa.me/628XXXXXXXXXX?text=Halo%20Klara%2C%20saya%20melihat%20portofoliomu%20dan%20ingin%20berdiskusi." target="_blank" aria-label="WhatsApp">💬</a><button class="fab" id="up" aria-label="Ke atas">↑</button>`
)
bg.onclick = () => menu.classList.toggle('open')
addEventListener('load', () => setTimeout(() => load.classList.add('h'), 400))
addEventListener('scroll', () => up.classList.toggle('s', scrollY > 400))
up.onclick = () => scrollTo({ top: 0 })
const io = new IntersectionObserver(
  e =>
    e.forEach(x => {
      if (x.isIntersecting) {
        x.target.classList.add('in')
        x.target
          .querySelectorAll('[data-w]')
          .forEach(s => (s.style.width = s.dataset.w + '%'))
        x.target.querySelectorAll('[data-n]').forEach(c => {
          let n = 0,
            to = +c.dataset.n,
            i = setInterval(() => {
              c.textContent = ++n + '+'
              if (n >= to) clearInterval(i)
            }, 150)
        })
        io.unobserve(x.target)
      }
    }),
  { threshold: 0.2 }
)
document.querySelectorAll('.rv').forEach(e => io.observe(e))
const ty = document.getElementById('typing')
if (ty) {
  const w = ['Web Developer', 'UI/UX Enthusiast', 'Clean Code Lover']
  let a = 0,
    b = 0,
    d = 0
  ;(function f () {
    const s = w[a]
    ty.textContent = s.slice(0, Math.max(b, 0))
    b += d ? -1 : 1
    if (!d && b > s.length) {
      d = 1
      return setTimeout(f, 1200)
    }
    if (d && b < 0) {
      d = 0
      a = (a + 1) % w.length
    }
    setTimeout(f, d ? 40 : 90)
  })()
}
/* filter + pencarian proyek */
const applyFilter = () => {
  const f = document.querySelector('.filters .on')?.dataset.f || 'all'
  const k = (document.getElementById('q')?.value || '').toLowerCase()
  let n = 0
  document.querySelectorAll('.pr').forEach(c => {
    const ok =
      (f == 'all' || (c.dataset.c || '').split(' ').includes(f)) &&
      c.textContent.toLowerCase().includes(k)
    c.classList.toggle('hide', !ok)
    if (ok) n++
  })
  document.getElementById('empty')?.classList.toggle('hide', n > 0)
}
document.querySelectorAll('.filters button').forEach(
  btn =>
    (btn.onclick = () => {
      document
        .querySelectorAll('.filters button')
        .forEach(x => x.classList.remove('on'))
      btn.classList.add('on')
      applyFilter()
    })
)
document.getElementById('q')?.addEventListener('input', applyFilter)
/* pop-up proyek: gambar utuh, klik gambar = layar penuh */
const m = document.getElementById('modal')
if (m) {
  const slides = m.querySelector('.slides'),
    snav = m.querySelector('.snav'),
    lb = document.getElementById('lb'),
    lbi = lb.querySelector('img')
  window.sl = i => {
    slides.querySelectorAll('.sn').forEach((x, k) => x.classList.toggle('on', k == i))
    snav.querySelectorAll('button').forEach((x, k) => x.classList.toggle('on', k == i))
  }
  const closeLb = () => lb.classList.remove('open')
  const closeAll = () => {
    closeLb()
    m.classList.remove('open')
  }
  document.querySelectorAll('.pr').forEach(
    c =>
      (c.onclick = () => {
        mt.textContent = c.dataset.t
        md.textContent = c.dataset.d
        const imgs = (c.dataset.imgs || '').split(',').map(x => x.trim()).filter(Boolean)
        slides.textContent = ''
        snav.textContent = ''
        imgs.forEach((src, i) => {
          const im = new Image()
          im.className = 'sn'
          im.src = src
          im.alt = c.dataset.t + ' - gambar ' + (i + 1)
          im.onclick = () => {
            lbi.src = src
            lbi.alt = im.alt
            lb.classList.add('open')
          }
          slides.append(im)
          const b = document.createElement('button')
          b.className = 'tg'
          b.textContent = i + 1
          b.onclick = () => sl(i)
          snav.append(b)
        })
        snav.classList.toggle('hide', imgs.length < 2)
        const setLink = (el, url) => {
          el.href = url || '#'
          el.classList.toggle('hide', !url)
        }
        setLink(lv, c.dataset.live)
        setLink(gh, c.dataset.gh)
        cs.href = 'kasus.html?p=' + c.dataset.id
        m.classList.add('open')
        sl(0)
      })
  )
  m.onclick = e => {
    if (e.target == m || e.target.classList.contains('x')) closeAll()
  }
  lb.onclick = closeLb
  addEventListener('keydown', e => {
    if (e.key == 'Escape') lb.classList.contains('open') ? closeLb() : closeAll()
  })
}
/* === fitur global === */
document.querySelector('main')?.setAttribute('id', 'main')
const toast = m => {
  const t = document.getElementById('toast')
  t.textContent = m
  t.classList.add('s')
  setTimeout(() => t.classList.remove('s'), 2000)
}
window.toast = toast
addEventListener('scroll', () => {
  const h = document.documentElement
  pg.style.width =
    ((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0) + '%'
})
const tick = () => {
  clock.textContent =
    'Sekarang pukul ' +
    new Date()
      .toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit'
      })
      .replace('.', ':') +
    ' WIB · biasanya membalas dalam 1×24 jam'
}
tick()
setInterval(tick, 30000)
share.onclick = async () => {
  const d = {
    title: 'Portofolio Klara Oktaviana',
    url: location.origin + location.pathname.replace(/[^/]*$/, '')
  }
  try {
    if (navigator.share) await navigator.share(d)
    else {
      await navigator.clipboard.writeText(d.url)
      toast('Link portofolio tersalin')
    }
  } catch (e) {}
}
document
  .querySelectorAll('[data-copy]')
  .forEach(
    b =>
      (b.onclick = () =>
        navigator.clipboard
          .writeText(b.dataset.copy)
          .then(() => toast('Tersalin: ' + b.dataset.copy)))
  )
document.querySelectorAll('img').forEach(i => (i.loading = 'lazy'))
if (
  matchMedia('(hover:hover) and (pointer:fine)').matches &&
  !matchMedia('(prefers-reduced-motion:reduce)').matches
) {
  const c = document.createElement('div')
  c.id = 'cur'
  document.body.append(c)
  addEventListener('mousemove', e => {
    c.style.transform = `translate(${e.clientX - 6}px,${e.clientY - 6}px)`
  })
  document.querySelectorAll('.pr,.fp').forEach(k => {
    k.onmousemove = e => {
      const r = k.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5
      k.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${
        -y * 6
      }deg)`
    }
    k.onmouseleave = () => (k.style.transform = '')
  })
}
const kk = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
let ki = 0
addEventListener('keydown', e => {
  ki = e.keyCode == kk[ki] ? ki + 1 : 0
  if (ki == kk.length) {
    ki = 0
    for (let i = 0; i < 30; i++) {
      const f = document.createElement('span')
      f.className = 'pt'
      f.textContent = '🌸'
      f.style.left = Math.random() * 100 + 'vw'
      f.style.animationDuration = 3 + Math.random() * 3 + 's'
      document.body.append(f)
      setTimeout(() => f.remove(), 6000)
    }
  }
})
const hs = document.querySelector('.hero-grid>div')
if (hs)
  hs.insertAdjacentHTML(
    'beforeend',
    '<div class="soc" style="margin-top:22px">' + SOC + '</div>'
  )
/* deretan teknologi: jalan otomatis, bisa digeser manual */
const mq = document.querySelector('.marq')
if (mq) {
  let p = false,
    x = 0
  const isMobile = () => innerWidth <= 700
  const half = () => mq.querySelector('.track').scrollWidth / 2
  ;['touchstart', 'pointerdown', 'mouseenter', 'wheel'].forEach(e =>
    mq.addEventListener(e, () => (p = true), { passive: true })
  )
  ;['touchend', 'pointerup', 'mouseleave'].forEach(e =>
    mq.addEventListener(e, () => setTimeout(() => (p = false), 1500))
  )
  ;(function f () {
    if (
      !isMobile() ||
      p ||
      matchMedia('(prefers-reduced-motion:reduce)').matches
    )
      x = mq.scrollLeft
    else {
      x += 0.6
      if (x >= half()) x -= half()
      mq.scrollLeft = x
    }
    requestAnimationFrame(f)
  })()
}
