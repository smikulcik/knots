
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

