<h1 align=center>
  ECMAScript command-line
</h1>
Written by <a href=http://haraldrudell.com >Harald Rudell</a>

><dl>
  <dt>One-liner install and run on Linux:</dt>
  <dd>git clone --depth 1 https://github.com/haraldrudell/ecmascript-cli.git && cd ecmascript-cli && npm install && npm start</dd>
</dl>

<h2>Benefits</h2>
- **Production-ready** using babel compile-time transpile to ECMAScript 5.1
- **Latest ECMAScript 2016/stage-0** all available features with source maps debugging
- **No-Wait File Watchers** for wait-free development implemented using [gulp 4](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md)
- **Instant Transpile** ie. no 6-second babel-node-like wait on code change

<h2>Features</h2>
- **Settings** configured in [YAML 1.2](http://www.yaml.org/spec/1.2/spec.html)
- **Options Parsing** for flexible command-line invocation
- **Proper Encapsulation** using classes and sound software enginneering practices

<h2>Development Process</h2>

* npm start
* npm run watch &
* npm run clean
* npm run build
```bash
$ npm run watch & # launch watchers in background
[1] 11841

> ecmascript-cli@0.0.0 watch node/ecmascript-cli
> gulp watch

[12:49:14] Using gulpfile ~/node/ecmascript-cli/gulpfile.js
[12:49:14] Starting 'watch'...

$ npm start # run the transpiled application

> ecmascript-cli@0.0.0 start /home/foxyboy/node/ecmascript-cli
> [ ! -f build/0-entrypoint.js ] && gulp transpile; node build/0-entrypoint.js




=== 2016-07-24T12:49:35-07 ecmascript-cli starting
app: ecmascript-cli
file: build/0-entrypoint.js
class: ClassName
yaml: { 'this value comes from': 'default.yaml' }
options: { args: 'update parseOptions' }

NIMP: TODO: add code here
Completed successfully
$
```

On code change:
```bash
# background file watchers transpile triggered by file save
[12:52:20] Starting 'transpile'...
[12:52:20] src/0-entrypoint.js
[12:52:20] Finished 'transpile' after 96 ms
npm start # use up-arrow, enter when ready to relaunch
```

To stop file watching:
```bash
killall gulp # shutdown background watchers
```

<h2>Example of transpile error:</h2>
* Describes the ECMAScript syntax error
* File name, line and column
* Location-marked code excerpt with syntax coloring

![Transpile error](doc/watch.png?raw=true "Title")
© 2016 <a href=http://haraldrudell.com >Harald Rudell</a> ISC [License](LICENSE)
