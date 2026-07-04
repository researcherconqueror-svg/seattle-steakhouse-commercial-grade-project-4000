const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(path.join(__dirname, 'src/app'), (err, results) => {
  if (err) throw err;
  results.filter(f => f.endsWith('.tsx')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /\/\s*\n\s*priority\n\s*fetchPriority="high"\n\s*quality=\{60\}>/g;
    if (regex.test(content)) {
      console.log('Fixing', file);
      const fixed = content.replace(regex, 'priority\n            fetchPriority="high"\n            quality={60}\n          />');
      fs.writeFileSync(file, fixed, 'utf8');
    }
  });
});
