d_rnbinom <- function(N, p, s) {
  N = as.numeric(N)
  p = as.numeric(p)
  s = as.numeric(s)
  
  data <- dnbinom(0:N, s, p)
  label <- 0:N
  
  return (list(as.numeric(label), data))
}

do.call(d_rnbinom, input)