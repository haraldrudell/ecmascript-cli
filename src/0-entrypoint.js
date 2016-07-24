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
  constructor(o) {
    if (!o) o = false
    this.appName = o.appName
    this.yamlfile = o.settings || './default.yaml'
    this.run().catch(e => process.nextTick(e => {throw e}, e)) // nextTick escapes promise
  }

  async run() {
    this.loadOptions()
    await this.loadYaml()
    console.log(`app: ${this.appName}
file: ${path.relative(process.cwd(), __filename)}
class: ${this.constructor.name}
yaml: ${util.format(this.settings)}
options: ${util.format(this.options)}
`)
    console.log('NIMP: TODO: add code here')
    console.log('Completed successfully')
  }

  loadOptions() {
    const options = parseOptions(process.argv)
    this.options = options
  }

  loadYaml() {
    return fs.readFileAsync(this.yamlfile, 'utf8')
      .then(utf8 => this.settings = yaml.safeLoad(utf8))
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
