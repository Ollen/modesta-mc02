d_rbinom <- function(N, p) {
  N = as.numeric(N)
  p = as.numeric(p)
  
  data <- dbinom(0:10, N, p);
  label <- 0:10
  
  return (list(as.numeric(label), data))
}

do.call(d_rbinom, input)