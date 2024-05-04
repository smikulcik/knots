
// knot data
export const trefoil = [
  {
    x: 250,
    y: 230,
    a: {
      a: -10, // angle in degrees
      m1: 35, // outbound magnitude
      m2: -150, // inbound magnitude 
      n: { i: 1, x: 'a' }
    },
    b: {
      a: 260, // angle in degrees
      m1: 150, // outbound magnitude
      m2: -35, // inbound magnitude 
      n: { i: 1, x: 'b' }
    },
    top: 'a'
  },
  {
    x: 360,
    y: 230,
    a: {
      a: 10, // angle in degrees
      m1: 150, // outbound magnitude
      m2: -35, // inbound magnitude 
      n: { i: 2, x: 'a' }
    },
    b: {
      a: 100, // angle in degrees
      m1: 35, // outbound magnitude
      m2: -150, // inbound magnitude 
      n: { i: 2, x: 'b' }
    },
    top: 'b'
  },
  {
    x: 300,
    y: 325,
    a: {
      a: 225, // angle in degrees
      m1: 35, // outbound magnitude
      m2: -130, // inbound magnitude 
      n: { i: 0, x: 'b' }
    },
    b: {
      a: 135, // angle in degrees
      m1: 130, // outbound magnitude
      m2: -35, // inbound magnitude 
      n: { i: 0, x: 'a' }
    },
    top: 'a'
  }
]

export const k3_1  = [
  {
      "x": 250,
      "y": 230,
      "a": {
          "n": {
              "i": 1,
              "x": "a"
          },
          "c1": {
              "x": 284.4682713554273,
              "y": 223.92231378165744
          },
          "c2": {
              "x": 102.27883704816881,
              "y": 256.04722665003953
          }
      },
      "b": {
          "n": {
              "i": 1,
              "x": "b"
          },
          "c1": {
              "x": 223.95277334996044,
              "y": 82.27883704816881
          },
          "c2": {
              "x": 256.07768621834254,
              "y": 264.4682713554273
          }
      },
      "top": "a"
  },
  {
      "x": 360,
      "y": 230,
      "a": {
          "n": {
              "i": 2,
              "x": "a"
          },
          "c1": {
              "x": 507.72116295183116,
              "y": 256.04722665003953
          },
          "c2": {
              "x": 325.5317286445727,
              "y": 223.92231378165744
          }
      },
      "b": {
          "n": {
              "i": 2,
              "x": "b"
          },
          "c1": {
              "x": 353.92231378165746,
              "y": 264.4682713554273
          },
          "c2": {
              "x": 386.04722665003953,
              "y": 82.27883704816881
          }
      },
      "top": "b"
  },
  {
      "x": 300,
      "y": 325,
      "a": {
          "n": {
              "i": 0,
              "x": "b"
          },
          "c1": {
              "x": 275.2512626584708,
              "y": 300.25126265847086
          },
          "c2": {
              "x": 391.9238815542512,
              "y": 416.9238815542512
          }
      },
      "b": {
          "n": {
              "i": 0,
              "x": "a"
          },
          "c1": {
              "x": 208.07611844574882,
              "y": 416.9238815542512
          },
          "c2": {
              "x": 324.74873734152914,
              "y": 300.25126265847086
          }
      },
      "top": "a"
  }
]

export const k4_1 = [
  {
    "x":100,"y":100,
    "a":{
      "n":{"i":1,"x":"a"},
      "c1":{"x":114.14213562373095,"y":85.85786437626905},
      "c2":{"x":29.289321881345245,"y":170.71067811865476}
    },
    "b":{
      "n":{"i":2,"x":"b"},
      "c1":{"x":29.28932188134523,"y":29.28932188134526},
      "c2":{"x":114.14213562373095,"y":114.14213562373095}
    },
    "top":"a"
  },{
    "x":150,"y":100,
    "a":{
      "n":{"i":3,"x":"a"},
      "c1":{"x":157.07106781186548,"y":107.07106781186548},
      "c2":{"x":135.85786437626905,"y":85.85786437626905}
    },
    "b":{
      "n":{"i":0,"x":"b"},
      "c1":{"x":135.85786437626905,"y":114.14213562373095},
      "c2":{"x":164.14213562373095,"y":85.85786437626905}
    },
    "top":"b"
  },{
    "x":200,"y":75,
    "a":{
      "n":{"i":1,"x":"b"},
      "c1":{"x":180.07610603816508,"y":76.74311485495318},
      "c2":{"x":249.8097349045873,"y":70.64221286261707}
    },
    "b":{
      "n":{"i":3,"x":"b"},
      "c1":{"x":201.7364817766693,"y":84.84807753012208},
      "c2":{"x":187.84462756331487,"y":6.063457289145433}
    },
    "top":"b"
  },{
    "x":200,"y":125,
    "a":{
      "n":{"i":2,"x":"a"},
      "c1":{"x":259.77168188550473,"y":130.2293445648595},
      "c2":{"x":190.03805301908255,"y":124.12844257252341}
    },
    "b":{
      "n":{"i":0,"x":"a"},
      "c1":{"x":187.84462756331487,"y":193.93654271085455},
      "c2":{"x":201.7364817766693,"y":115.15192246987792}
    },
    "top":"a"
  }
]

export const unknot = [ // this doesn't render well. it comes out as just a line
  {
    x: 200,
    y: 200,
    a: {
      a: 0,
      m1: 50,
      m2: 50,
      n: { i: 0, x: 'a' }
    }
  }
]
export const figure8 = [
  {
    x: 100,
    y: 100,
    a: {
      a: -45,
      m1: 20,
      m2: -100,
      n: { i: 1, x: 'a' }
    },
    b: {
      a: 225,
      m1: 100,
      m2: -20,
      n: { i: 2, x: 'b' }
    },
    top: 'a'
  },
  {
    x: 150,
    y: 100,
    a: {
      a: 45,
      m1: 10,
      m2: -20,
      n: { i: 3, x: 'a' }
    },
    b: {
      a: 135,
      m1: 20,
      m2: -20,
      n: { i: 0, x: 'b' }
    },
    top: 'b'
  },
  {
    x: 200,
    y: 75,
    a: {
      a: 175,
      m1: 20,
      m2: -50,
      n: { i: 1, x: 'b' }
    },
    b: {
      a: 80,
      m1: 10,
      m2: -70,
      n: { i: 3, x: 'b' }
    },
    top: 'b'
  },
  {
    x: 200,
    y: 125,
    a: {
      a: 5,
      m1: 60,
      m2: -10,
      n: { i: 2, x: 'a' }
    },
    b: {
      a: 100,
      m1: 70,
      m2: -10,
      n: { i: 0, x: 'a' }
    },
    top: 'a'
  }
]

