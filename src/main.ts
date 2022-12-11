import main_app_layout  from './app.blayout'
import core_layout from './core.layout?raw'
import gen from './gen'

import { View } from './views/view'

export class App extends View { }
View.register(App)



/*

App -> Scene -> (Dropdown [drops, selected_index])


app(drops, selected_index) {
  let app = new App()
  let scene = new Scene()
  let dropdown = dropdown(drops, selected_index)



  return app
}


dropdown(drops, selected_index) {
  let dropdown = new Dropdown(drops, selected_index)
  let children = [
    new Hitbox(dropdown.on_click)
    new Text(dropdown.active)
    new Icon('drop')
    list(dropdownlistitem, drops)
    dropdown.a_view_ref_to_show_when_is_open = list
  ]

  children.forEach(_ => _.parent = dropdown)
  dropdown.children = children

  return dropdown
}

list(cContent, items) {

  function nested() {
    let parent = new ScrollableView()
    let _items = []
    let i
    for (i = 0; i < items.length - 1; i += 2) {

      let i1 = items[i]
      let i2 = items[i+1]

      let _i1 = cContent(i1)
      let _i2 = cContent(i2)

      _items.push(_i1)
      _items.push(_i2)
    }
    if (i + 1 < items.length - 1) {
      let i = items[items.length - 1]
      let _i = cContent(i)
      _items.push(_i)
    }
  }


  let list = new List(items)
  let children = [
    return list

}


*/

function app() {


  main_app_layout('hello')

}


app()
