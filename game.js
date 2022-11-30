import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

kaboom({
    background: [27, 141, 247]
})

loadSprite("blob", "assets/blob.png")
loadSprite("sun", "assets/sun.png")
loadSprite("coin", "assets/coin.png")
loadSprite("block", "assets/block.png")
// Player
function jump(player)
{
    onKeyPress("space", () => {
        if (player.isGrounded())
            player.jump(825)
    })
}

function add_player()
{
    const player = add([
        sprite("blob"),
        pos(80, 40),
        scale(0.15),
        area(),
        body(),
    ])

    return player
}

function movement(player)
{
    onKeyDown("a", () => {
        player.move(-300, 0)
        player.flipX(true)
    })

    onKeyDown("d", () => {
        player.move(300, 0)
        player.flipX(false)
    })
}

function on_coin_collision(player)
{
    player.onCollide("coin", (coin) => {
        destroy(coin)
        
        const coins = get("coin")
        if (coins.length <= 0){
            go("win")
        }
    })
}
// Level 1
function add_level_1()
{
    addLevel([
    "   $    $   ",
    "  aaaaaaaa  ",
    "            ",
    " $          ",
    "aaaa      aa",
    ],{
    width: 64,
    height: 64,
    pos: vec2(300, 200),

    "$": () => [
        sprite("coin"),
        scale(0.05),
        area(),
        solid(),
        "coin",
    ],

    "a": () => [
        sprite("block"),
        scale(0.1),
        area(),
        solid(),
    ],
    })
}

function add_game_floor1()
{
    const floor = add([
        rect(width(), 48),
        outline(4),
        area(),
        pos(0, height() - 48),
        solid(),
        color(3, 252, 94),
    ])

    return floor
}

function add_sun(){
    const sun = add([
        sprite("sun"),
        scale(0.25),
        pos(25, 80),
    ])

    return sun
}

let main_game = scene("main_game", () => {
    const player = add_player()
    const floor = add_game_floor1()
    const sun = add_sun()

    jump(player)
    movement(player)
    on_coin_collision(player)

    add_level_1()
})

let won_screen = scene("win", () => {
    const txt = add([
        text("You won!"),
        pos(center()),
        scale(1.5),
        origin("center")
    ])
})

go("main_game")