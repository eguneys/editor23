import { View } from './view'

export class DropdownListItem extends View {

  on_click() {
    this.get_parent(Dropdown).selected_index = this.get_parent(List).index_of(this)
  }

}

export class Dropdown extends View {

  get active() {
    return this.drops[this.selected_index]
  }

  drops: Array<string>
  selected_index: number
  
  on_click() {
  }


}
