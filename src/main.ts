import core_layout from './core.layout?raw'
import gen from './gen'




function app() {

  let head_layout = `
App
  Scene
    Dropdown \`\${drops}\` \`\${selected_index}\`

`

  let _ = gen(head_layout + core_layout)


  console.log(_)


}


app()
