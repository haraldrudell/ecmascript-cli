/*
© 2016-present Harald Rudell <c@haraldrudell.com> (http://haraldrudell.com)
All rights reserved.

This source code is licensed under the ISC-style license found in the
LICENSE file in the root directory of this source tree.

This babel-polyfill import below must be the first thing executed on launch or some ECMASript 2016/stage-0 won't work
 */
import 'babel-polyfill'
import yaml from 'js-yaml'
import fs0 from 'fs'
import path from 'path'
import bluebird from 'bluebird'
import {parseOptions} from './optionsparser'
import util from 'util'
const fs = bluebird.promisifyAll(fs0)

class ClassName {
  constructor(o) { // don't declare functions in constructor. Don't you do it.
    if (!o) o = false
    this.appName = String(o.appName || 'nameless')
    this.yamlfile = String(o.settings || './default.yaml')
    process.nextTick(this.init, this) // invoke member init with a clean stack
  }

  async run() {
    console.log(`app: ${this.appName}
file: ${path.relative(process.cwd(), __filename)}
class: ${this.constructor.name}
yaml: ${util.format(this.settings)}
options: ${util.format(this.options)}
`)
    console.log('NIMP: TODO: add code here')
    console.log('Completed successfully')
  }

  init(instance) {
    if (this) {
      Promise.all([ // do all in parallel
        new Promise(r => r(parseOptions(process.argv))), // promisify
        fs.readFileAsync(this.yamlfile, 'utf8')
          .then(utf8 => yaml.safeLoad(utf8)),
      ]).then(resolutions => {
        this.options = resolutions[0]
        this.settings = resolutions[1]
        this.run()
      }).catch(this.errorHandler)
    } else { // recover this after stack-less constructor invocation
      instance.errorHandler = instance.errorHandler.bind(instance)
      instance.init() // one extra stack frame to retrieve this
    }
  }

  errorHandler(e) { // if anything fails anywhere anytime, that mess gets right here
    if (!(e instanceof Error)) e = new Error('value: ' + util.format(e))
    console.error(new Error('errorHandler received error: ' + e.message).stack)

    // for now throw
    process.nextTick(e => {throw e}, e) // nextTick escapes promise
  }
}

if (require.main === module) {
  new (require('./applauncher').AppLauncher)({
    constructor: ClassName,
    appName: 'ecmascript-cli',
    options: {
    },
  })
}
