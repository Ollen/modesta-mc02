d_rbinom <- function(N, p) {
  N = as.numeric(N)
  p = as.numeric(p)
  
  data <- dbinom(0:N, N, p);
  label <- 0:N
  
  return (list(as.numeric(label), data))
}

do.call(d_rbinom, input)