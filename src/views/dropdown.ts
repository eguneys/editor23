import { HasContentView, View } from './view'

export class Scene extends HasContentView {
}

export class Icon extends View {
  constructor(readonly icon: string) {
    super()
  }
}

export class Text extends View {
  constructor(readonly text: string) {
    super()
  }
}

export class Hitbox extends View {

  constructor(readonly hook: () => void) { 
    super()
  }



}

export class ScrollableView extends HasContentView {

}

export class ScrollBar extends View {

}

export class ScrollThumb extends View {

}

export class ClipView extends HasContentView {
}

export class List<T extends View, CT> extends View {


  constructor(readonly items: Array<CT>) {
    super()
  }

  index_of(item: CT): number {
    return this.items.indexOf(item)
  }

}

export class DropdownListItem extends View {

  on_click() {
    this.get_parent(Dropdown)!.selected_index = this.get_parent(List)!.index_of(this.item)
  }
  
  constructor(readonly item: string) {
    super()
  }

}

export class Dropdown extends View {

  static make = (
    drops: Array<string>,
    selected_index: number) => {
      let res = new Dropdown()

      res.drops = drops
      res.selected_index = selected_index
      return res
    }


  get active() {
    return this.drops[this.selected_index]
  }

  drops!: Array<string>
  selected_index!: number
  is_open: boolean = false
  
  on_click() {
  }


}
