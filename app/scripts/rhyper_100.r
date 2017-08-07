rhyper_100 <- function(N, m, n) {
  N = as.numeric(N)
  m = as.numeric(m)
  n = as.numeric(n)
  
  freq.table <- table(rhyper(N, m, n, 100))
  df.table <- as.data.frame(freq.table)
  
  return (list(as.numeric(df.table$Var1), df.table$Freq))
}

do.call(rhyper_100, input)