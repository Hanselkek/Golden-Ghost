import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

kaboom({
    background: [27, 141, 247]
})

loadSprite("blob", "assets/blob.png")
loadSprite("sun", "assets/sun.png")

function jump(player)
{
    onKeyPress("space", () => {
        if (player.isGrounded())
            player.jump()
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

function add_game_floor()
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
    const floor = add_game_floor()
    const sun = add_sun()

    jump(player)
})

go("main_game")