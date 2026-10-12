const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + process.cwd() + '/apex.html');
  await p.evaluate(() => document.fonts.ready);
  const h = await p.evaluate(() => [...document.querySelectorAll('.page')].map(pg => { const top = pg.getBoundingClientRect().top; const kids = [...pg.children].filter(k => k.tagName !== 'FOOTER'); const last = Math.max(...kids.map(k => k.getBoundingClientRect().bottom)) - top; const ft = pg.querySelector('footer').getBoundingClientRect().top - top; return {contentBottom: Math.round(last), footerTop: Math.round(ft)}; }));
  console.log(JSON.stringify(h));
  await p.pdf({ path: 'ONYX_Apex.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
