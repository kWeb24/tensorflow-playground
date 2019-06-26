# Tensorflow playground

**This is WIP readme**

This project is for learning tensorflow, neural networks and genetic algorighms. It's simple life game concept rendered with Phaser 3 and Matterjs.

**For fast-start scroll down to 'How to start' section**

## Goals for now

- [x] Create working neural network that learns to gather food
- [x] Create genetic algorithm that evolves network by generations
- [ ] Create creature lifecycle. Remove fixed generation length, make bunnies die and reproduce.
- [ ] Add custom genome with properties like speed, visibility distance etc.
- [ ] Create more variety in enviroment (dangers, hostile animals etc)

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
- Open web public directory in web browser
- Enjoy

## License

[MIT License](https://opensource.org/licenses/mit-license.html)

Copyright 2017 [Kamil Weber](http://kamilweber.pl/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
