export default function gen(_: string) {


  let res = _.split('\n\n')

  return res.map(_ => {

    let res = _.split('\n')

    let views = []

    res.forEach(_ => {
      views.push({ depth: _.search(/[^\s]/), c: _.trim() })
    })


    // 0 2 4 4 6 4 2


    //0 2 4 4 6

    function join(res: Array<{ depth: number, c: string }>) {
      return res.map(_ => _.c).join(res[0].depth)
    }

    console.log('here')
    function g(acc, res) {

      console.log(acc, res)
      if (acc.length === 0) {
        acc.push(res[0])
        return g(acc, res.slice(1))
      }

      if (res.length === 0) {
        return { depth: acc[0].depth, c: join(acc)}
      }

      let [next, ...rest] = res

      let ci = acc.findLastIndex(_ => _.depth <= next.depth)

      if (ci < acc.length - 1) {
        let combine = acc.splice(ci, acc.length - 1)
        acc.push({ depth: combine[0].depth, c: join(combine)})
      }


      return g(acc, rest)
    }

    return g([], views)

    //  0
    //    2
    //      4
    //      4
    //        6
    //      4
    //    2



    return views
  })
}
