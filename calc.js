// math calc thing

function tokenize(equ)
{
  let arr = []
  let num = ""
  let prev = null
  let hasDot = false

  for (let i = 0; i < equ.length; i++)
  {
    const ch = equ[i]

    if (ch === " ") continue

    if (/\d/.test(ch))
    {
      num += ch
      prev = "number"
      continue
    }

    if (ch === ".")
    {
      if (hasDot)
        throw new Error("bad number two dots")

      num += ch
      hasDot = true
      prev = "number"
      continue
    }

    if (num !== "")
    {
      arr.push(Number(num))
      num = ""
      hasDot = false
    }

    if ("+-*/()".includes(ch))
    {
      if (ch === "-" && (prev === null || prev === "op" || prev === "("))
        arr.push("NEG")
      else
        arr.push(ch)

      prev = ch === "(" ? "(" : "op"
    }
    else
      throw new Error("bad char: " + ch)
  }

  if (num !== "")
    arr.push(Number(num))

  return arr
}

function sh_yard(equ)
{
  let out = []
  let stack = []

  const prec = {
    "NEG": 3,
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1
  }

  for (let i = 0; i < equ.length; i++)
  {
    const tok = equ[i]

    if (typeof tok === "number")
      out.push(tok)

    else if ("+-*/".includes(tok) || tok === "NEG")
    {
      while (
        stack.length &&
        (stack.at(-1) in prec) &&
        (
          prec[stack.at(-1)] > prec[tok] ||
          (prec[stack.at(-1)] === prec[tok] && tok !== "NEG")
        )
      )
        out.push(stack.pop())

      stack.push(tok)
    }

    else if (tok === "(")
      stack.push(tok)

    else if (tok === ")")
    {
      while (stack.length && stack.at(-1) !== "(")
        out.push(stack.pop())

      if (!stack.length)
        throw new Error("mismatched parens")

      stack.pop()
    }
  }

  while (stack.length)
  {
    if (stack.at(-1) === "(")
      throw new Error("mismatched parens")

    out.push(stack.pop())
  }

  return out
}

function evalu(post)
{
  let stack = []

  for (const tok of post)
  {
    if (typeof tok === "number")
      stack.push(tok)

    else if (tok === "NEG")
      stack.push(-stack.pop())

    else
    {
      const b = stack.pop()
      const a = stack.pop()

      if (tok === "+") stack.push(a + b)
      else if (tok === "-") stack.push(a - b)
      else if (tok === "*") stack.push(a * b)
      else if (tok === "/") stack.push(a / b)
    }
  }

  if (stack.length !== 1)
    throw new Error("bad expr")

  return stack[0]
}

// run
let equ = "( -13.5 + 53 ) * 22 - 4 / 2.5"

const tokens = tokenize(equ)
const post = sh_yard(tokens)
const res = evalu(post)

console.log(res)
