/*
 * @Author: your name
 * @Date: 2020-05-18 18:04:43
 * @LastEditTime: 2020-06-08 20:41:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/components/plugins/ydui/index.js
 */ 

import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell'
import {Input} from 'vue-ydui/dist/lib.rem/input'
import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.rem/navbar'
import {Icons} from 'vue-ydui/dist/lib.rem/icons'
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button'
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.rem/flexbox'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'
import {SendCode} from 'vue-ydui/dist/lib.rem/sendcode'
// import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.rem/tabbar';
// import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.rem/scrolltab';
import {Layout} from 'vue-ydui/dist/lib.rem/layout';

const components = [
  CellGroup,
  CellItem,
  Input,
  NavBar,
  NavBarBackIcon,
  NavBarNextIcon,
  Icons,
  Button,
  ButtonGroup,
  FlexBox,
  FlexBoxItem,
  SendCode,
  // Slider,
  // SliderItem,
  TabBar,
  TabBarItem,
  // ScrollTab,
  // ScrollTabPanel
  Layout
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
