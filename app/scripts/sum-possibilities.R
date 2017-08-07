
k.max <- function(p,n,s) {
  return (floor((p - n) / s))
}

comb <- function(n,k) {
  numer <- factorial(n)
  denom <- factorial(k) * factorial(n-k)
  return (numer/denom)
}

p.sum <- function(p,n,s) {
  p = as.numeric(p)
  n = as.numeric(n)
  s = as.numeric(s)

  k = k.max(p,n,s)
  p0 = 1 / (s^n)
  
  sum = 0
  for(i in 0:k) {
    p1 <-  (-1)^i
    p2 <- comb(n,i)
    p3 <- comb(p-(s*i)-1,p-(s*i)-n)
    sum = sum + (p1 * p2 * p3)
  }
  return (c(sum * (4)^n, p0 * sum))
}

do.call(p.sum, input)



