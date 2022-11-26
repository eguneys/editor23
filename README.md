# Editor 23

DropdownListItem
  Hitbox `${on_click}`
  

Dropdown
  Hitbox `${on_click}`
  Text `${active}` 2,2
  Icon drop -8,0,8,-0
  List `${drops}`
    DropdownListItem


NavigationBack
  Background
  Icon back 2,2,8,8
  VerticalBar 10,2,2,8
  Text `${route}` 14,2

Tab
  Background
  Text `${content}` 2,2

ScrollableView
  Background
  HorizontalBar -6,0,4,-2
    Thumb 2,2
  ClipView `${content}` 2,2,-8,-2


List
  ScrollableView
    `${items: Item0 Item1}`
    `${content}` `${.Item0}` 0,0,-0
    `${content}` `${.Item1}` =,v,-0

GameViewListItem
  MiniGameView 2,2,20,-2
  Text `${game_type}` >,=
  Text `${date}` =,v
  Text `${nb_points} points` =,v

Stats
  NavigationBack stats 1,1
  Tabs
    Tab `${nb_games_played} games played` -4,8,20,120
    Tab `last activity` <,=,=,=
    TabPanel 80,v+8,-4,-4
      FilterGroup
        Filter `${nb_all} all` 4,4,-4*0.25,80
        Filter `${nb_game_over} game over` ==
        Filter `${nb_game_completed} game completed` ==
        Filter `${nb_incompleted} game incompleted` ==
      List `${games}` =,v+12,-4,-4
          GameViewListItem
    TabPanel ==
      ScrollableView 4,4,-4,-4
        WrappedTextwithHyperlinks `${activity_text}`
  
  
Scene Stats
