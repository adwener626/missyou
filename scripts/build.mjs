import {cp, mkdir, rm, stat} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true}); await mkdir('dist/src',{recursive:true});
for(const f of ['index.html','src/main.js','src/styles.css']){await cp(f,`dist/${f}`)}
for(const f of ['dist/index.html','dist/src/main.js','dist/src/styles.css']){if((await stat(f)).size<100)throw new Error(`${f} is unexpectedly empty`)}
console.log('Static production bundle created in dist/');
