rhyper_100 <- function(N, m, n) {
  N = as.numeric(N)
  m = as.numeric(m)
  n = as.numeric(n)
  
  if (n >= 100) {
    freq.table <- table(rhyper(N, m, n, 100))
  } else {
    freq.table <- table(rhyper(N, m, n, 10))
  }
  
  df.table <- as.data.frame(freq.table)
  
  return (list(as.numeric(df.table$Var1), df.table$Freq))
}

do.call(rhyper_100, input)