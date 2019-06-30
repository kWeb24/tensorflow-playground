# Tensorflow playground

## This is develop branch

This project is for learning tensorflow, neural networks and genetic algorighms. It's simple life game concept rendered with Phaser 3 and Matterjs.

**For fast-start scroll down to 'How to start' section**

Live demo will come when the project leave early stage since it's too much effor to update it daily.

But hey, here's the screenshot!

![Screenshot](https://github.com/kWeb24/tensorflow-playground/raw/develop/public/assets/screenshot.png)

## Goals for now

- [ ] Add custom genome with properties like speed, visibility distance etc.
- [ ] Create more variety in enviroment (dangers, hostile animals etc)
- [ ] Make save/load network and genome state
- [ ] Add bounding box as network input so the bunnies know why they're stuck

## What is done

- [x] Working neural network that learns to gather food
- [x] Genetic algorithm that evolves network by generations
- [x] Rendering and physics
- [x] Create creature lifecycle. Remove fixed generation length, make bunnies die and reproduce.

## Known issues

- [ ] Population is really unstable at it's early stage
- [ ] Game loop performance issue

## Enviroment lifecycle

Still in progress but that's target features for this branch now.

- 200 food sources is created
- 25 bunnies is born each with `50/100` energy
  - The 'living' cost is `0.001` energy per tick
  - Movement cost is `0.1` energy per tick
- When bunny energy reach `0` bunny dies
  - Body creates `1` food source
- When bunny eat food it gets `10` energy
- When bunny energy reach `70/100` it is in reproduction age
- Reproduction cost is `30` energy that is passed to the new bunny
- In each epoch `5` foods grow up
- Bunnies dies after `n` ticks (aging)
- When bunnies population reach `0` simulation will reset

## Network Description

Since this project purpose is only learning basic NN and GA concepts this network will evolve over time.

### Network architecture

The network consist three layers:

- Input layer with two nodes
  - First node get distance from bunny to closest food source
  - Second node get relative angle (for bunny bearing) towards food source
- Hidden layer with four nodes
  - All input nodes are connected with all hidden nodes
  - All hidden nodes are conntected to all output nodes
- Output layer with two nodes
  - First node with 0-1 output for left 'engine'
  - Second node with 0-1 output for second 'engine'

## How to start

First of all, you need some kind of local web server since Phaser requires it for assets loading. If you don't have one [Laragon](https://laragon.org/) is a good choice.

- Enter main directory and install dependencies with `npm i`
- Type `npm run watch` for build and watching files
- Open public directory in web browser
- Enjoy

## License

[MIT License](https://opensource.org/licenses/mit-license.html)

Copyright 2017 [Kamil Weber](http://kamilweber.pl/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
