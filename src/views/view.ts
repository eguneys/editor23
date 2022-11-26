import { Vec2 } from 'blah'

export type ViewCtor = { make?: (...args: any[]) => View, new(...args: any[]): View }

export abstract class View {

  static ctors: Map<string, ViewCtor> = new Map()

  constructor() {
    View.ctors.set(this.constructor.name, this.constructor as ViewCtor)
  }

  get_parent<T extends View>(ctor: { new(...args: any[]): T }): T | undefined {
    let { parent } = this
    while (parent) {
      if (parent.constructor.name === ctor.name) {
        return parent as T
      }
      parent = parent.parent
    }
    return undefined
  }

  parent?: View
  children!: Array<View>

  position!: Vec2
  width?: number
  height?: number
}

export abstract class HasContentView extends View {

  content!: View


}
