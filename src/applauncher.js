/*
applauncher.js
Starts a Node.js ECMAScript 2016 application

© 2016-present Harald Rudell <c@haraldrudell.com> (http://haraldrudell.com)
All rights reserved.

This source code is licensed under the ISC-style license found in the
LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import path from 'path'
import readline from 'readline'

export class AppLauncher {
  /*
  o.constructor: optional function
  o.options: optional argument to constructor
  o.appName: optional string
  o.method: optional string method invoked on instance on NextTick
  */
  constructor(o) {
    if (!o) o = false
    const appName = o.appName  && String(o.appName) ||
      o.constructor && String(o.constructor).toLowerCase() ||
      'nameless'
    console.log(`\n\n\n=== ${this.getLocalIsoString()} ${appName} starting`)
    if (o.constructor) {
      const i = new o.constructor(Object.assign({appName: appName}, o.options))
      if (o.method) {
        const m = i[o.method]
        if (typeof m === 'function') process.nextTick(m.bind(i))
      }
    }
  }

  getLocalIsoString() {
    var nowMsZ = Date.now() // ms
    var tzMinutesAddToLocalToZ = new Date().getTimezoneOffset() // min

    // get 2016-06-23T15:04:52
    var printsLocalTime =  nowMsZ - tzMinutesAddToLocalToZ * 6e4
    var result = new Date(printsLocalTime).toISOString()
    result = result.slice(0, -5) // drop period 3xms and Z

    // get -07 timezone offset
    var tzOffsetString = tzMinutesAddToLocalToZ > 0 ? '-' : '+'
    var tzPositiveMinutes = Math.abs(tzMinutesAddToLocalToZ)
    var tzMinutes = tzPositiveMinutes % 60
    var tzHours = String(tzPositiveMinutes / 60)
    tzOffsetString += tzHours.length < 2 ? '0' + tzHours : tzHours
    if (tzMinutes) {
      tzMinutes = String(tzMinutes)
      tzOffsetString += ':' + (tzMinutes.length < 2 ? '0' + tzMinutes : tzMinutes)
    }

    return result + tzOffsetString
  }
}
