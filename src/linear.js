
// rref2x3
// solves linear 2x3 linear equations in row reduced escelon form
// [a b c]
// [d e f]
// solves to
// [1 0 (cd-af)/(bd-ae)]
// [0 1 (ce-bf)/(ae-db)]
export function rref2x3(a,b,c,d,e,f){
    return [
        (c*e-b*f)/(a*e-d*b),
        (c*d-a*f)/(b*d-a*e),
    ]
}
