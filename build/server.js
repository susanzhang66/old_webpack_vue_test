/*
 * @Author: your name
 * @Date: 2020-05-29 20:31:59
 * @LastEditTime: 2020-05-29 21:45:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/server.js
 */ 
/**
 * Mock server
 */
require('dotenv').config()
const path = require('path')
const express = require('express')
const klaw = require('klaw')
const _ = require('lodash')
const bodyParser = require('body-parser')

const methodFlag = ['$get', '$post'] // 请求方法
const mockDir = path.join(process.cwd(), 'mocks')

const routers = {

}
const mockFiles = []

let err

klaw(mockDir) 
  .on('data', (file) => {
    if (path.extname(file.path) !== '.js') return
    mockFiles.push(file.path)
  })
  .on('end', () => {
    mockFiles.forEach((file) => {
      try {
        const router = require(file) // require mock文件夹下的文件
        Object.assign(routers, router)
      } catch (error) {
        err = error
        console.log(err)
      }
    })
    server(routers)
  })

function server (routers) {
  const app = express()

  const allowCrossDomain = function (req, res, next) {
    // 允许跨域
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
  }
  app.use(allowCrossDomain)
  // 处理请求体
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  Object.keys(routers).forEach(function (api) {
    const routeHander = routers[api]
    const routerInst = new express.Router()

    if (_.isFunction(routeHander)) {
      routerInst.use(api, routeHander)
    } else if (_.isObject(routeHander)) {
      // 如果存在$get/$post
      if (methodFlag.some(it => {
        return routeHander[it]
      })) {
        methodFlag.forEach(it => {
          const method = it.toLocaleLowerCase().replace('$', '')
          if (routeHander[it]) {
            if (_.isFunction(routeHander[it])) {
              routerInst[method](api, routeHander[it])
            } else if (routeHander[it]) {
              routerInst[method](api, (req, res, next) => {
                responseTo(res, api, method, routeHander[it])
                next()
              })
            }
          }
        })
      }
    }
    app.use('/', routerInst)
  })

  if (err) {
    app.use((req, res, next) => {
      return next(err)
    })
  }

  app.listen(process.env.PROXY_TARGET, () => {
    console.log(`Proxy at http://localhost:${process.env.PROXY_TARGET}`)
  })
}

function responseTo (res, api, method, data) {
  console.log(`${api}  ${method}`)
  res.json(data)
}