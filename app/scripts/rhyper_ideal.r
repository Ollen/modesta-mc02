rhyper_ideal <- function(N, m, n) {
  N = as.numeric(N)
  m = as.numeric(m)
  n = as.numeric(n)
  
  data <- dhyper(1:N, m, n, N)
  label <- 1:N
  
  return (list(as.numeric(label), data))
}

do.call(rhyper_ideal, input)
