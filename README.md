# Battleship

This is an online implementation of the beloved Battleship board game.

The game allows for a human vs CPU game where each player takes a turn attacking the other's board.

The AI utulizes a stack of moves in order to make smarter moves. At first, the AI randomly attacks the opponents board.
Once the AI hits one of the opponent's ships, a stack of moves is created for it. The CPU cycles through the stack until 
the ship is sunk. (Looks like right->left->down->up. If a move connects, it is added back to the stack in the form of coordinates.)

Technologies:

#JavaScript

#CSS

#HTML

#Webpack

#Jest (testing)

#ESLint

#babel-jest

![battleship](https://github.com/NMGVox/Battleship/assets/87345234/cafb76d0-1dcc-430d-a465-b72bbc568cfe)

[DEMO](https://nmgvox.github.io/Battleship/ "Battleship Demo")
