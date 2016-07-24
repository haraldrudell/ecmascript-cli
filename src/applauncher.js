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
import os from 'os'
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
    console.log(`\n\n\n=== ${this.getLocalIsoString()} ${appName}:${process.pid} starting on ${os.hostname()}`)

    if (o.constructor) {
      const i = new o.constructor(Object.assign({appName: appName}, o.options))
      if (o.method && typeof i[o.method] === 'function')
        process.nextTick(() => i[o.method]())
    }
  }

  getLocalIsoString() {
    // get current time 2016-06-23T15:04:52 in local time zone
    const nowMsZ = Date.now() // ms Unix epoch, UTC time zone
    const tzMinutesAddToLocalToZ = new Date().getTimezoneOffset() // min
    const msPerMinute = 60000
    const printsLocalTime =  nowMsZ - tzMinutesAddToLocalToZ * msPerMinute
    const localTime = new Date(printsLocalTime).toISOString().slice(0, -5) // drop period 3xms and Z

    // get -07 timezone offset
    let tzOffsetString = tzMinutesAddToLocalToZ > 0 ? '-' : '+'
    const tzPositiveMinutes = Math.abs(tzMinutesAddToLocalToZ)
    const tzMinutes = tzPositiveMinutes % 60
    const tzHours = String(tzPositiveMinutes / 60)
    tzOffsetString += tzHours.length < 2 ? '0' + tzHours : tzHours
    if (tzMinutes) {
      const tzMinutesString = String(tzMinutes)
      tzOffsetString += ':' + (tzMinutesString.length < 2 ? '0' + tzMinutesString : tzMinutesString)
    }

    return localTime + tzOffsetString
  }
}
