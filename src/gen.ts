import { View } from './views/view'
import { List } from './views/dropdown'

export type TemplateArgs = {
  [key: string]: string
}

export type WithPositionArgs = {
  x?: string,
  y?: string,
  w?: string,
  h?: string
}
export type TemplateArgsWithPosition = TemplateArgs & WithPositionArgs

export type Template = {
  name: string, 
  args: TemplateArgsWithPosition, 
  fn: (_: TemplateArgs) => View
}



const template_ctor = (Hitbox: string) => (args: TemplateArgsWithPosition) => {
  let ctor = View.ctors.get(Hitbox)!
  let res
  if (ctor.make) {
    res = ctor.make(args)
  } else {
    res = new ctor(args)
  }

  return res
}

function gen_template_args(rest: Array<string>): TemplateArgs {
  let res: TemplateArgs = {}

  rest.forEach(_ => {
    //_.match(/`${(\w)}`/)
    if (_[0].match(/\d|-|=|v|<|>/)) {
      let [x,y,w,h] = _.split(',')

      res.x = x
      res.y = y
      res.w = w
      res.h = h
    }
  })

  return res
}

function parse_args(args: Array<string | Template>, combine: Array<Template>): Array<Template >{

  if (args.length === 0) {
    return combine
  }

  let [head, ...rest] = args

  if (typeof head === 'string') {
    if (head[0] === head[0].toUpperCase()) {

      // `Dropdown `${drops}` `${selected_index}`
      // `Hitbox `${on_click}` `

      let [Hitbox, ..._rest] = head.split(' ')

      let template_args = gen_template_args(_rest)

      let res: Template = {
        name: Hitbox,
        args: template_args, 
        fn: template_ctor(Hitbox)
      }


        return parse_args(rest, [...combine, res])
    }
  }
  return []
}

function make_template(_: string, args: Array<string | Template>): Template {
  let templates = parse_args(args, [])

  let template_args: TemplateArgs = {}
  templates.forEach(({args: _args}) =>
                    Object.keys(_args).forEach(arg => template_args[arg] = _args[arg]))

  return {
    name: _,
    args: template_args, 
    fn: template_ctor(_)
  }
}


export default function gen(_: string) {

  let res = _.trim().split('\n\n').map(_ => {

    let res = _.split('\n')

    let templates: Array<{depth: number, c: string}> = []

    res.forEach(_ => {
      templates.push({ depth: _.search(/[^\s]/), c: _.trim() })
    })


    // 0 2 4 4 6 4 2


    //0 2 4 4 6

    function join(res: Array<{ depth: number, c: string | Template }>) {

      let [head, ...rest] = res.map(_ => _.c)

      let template = make_template(head as string, rest)

      return { depth: res[0].depth, c: template }
    }

    function g(acc: Array<{ depth: number, c: string | Template}>, res: Array<{ depth: number, c: string }>): { depth: number, c: string | Template } {

      if (acc.length === 0) {
        acc.push(res[0])
        return g(acc, res.slice(1))
      }

      if (res.length === 0) {
        while (acc.length > 1) {
          let last_depth = acc[acc.length - 1].depth
          let i = acc.findLastIndex(_ => _.depth < last_depth)
          acc.push(join(acc.splice(i)))
        }
        return acc[0]
      }

      let [next, ...rest] = res


      let ci = acc.findLastIndex(_ => _.depth <= next.depth)

      if (ci < acc.length - 1) {
        let combine = acc.splice(ci, acc.length - 1)
        acc.push(join(combine))
      }

      acc.push(next)

      return g(acc, rest)
    }

    return g([], templates)

    //  0
    //    2
    //      4
    //      4
    //        6
    //      4
    //    2
  })

  return gen_top_template(res.map(_ => _.c as Template))
}


function gen_top_template(res: Array<Template>): Template {
  let [head, ...rest] = res


  console.log(head.fn)

}
