d_rnbinom <- function(N, p, s){
  N = as.numeric(N)
  p = as.numeric(p)
  s = as.numeric(s)
  
  freq.table <-  table(rnbinom(N,s, p))
  df.table <- as.data.frame(freq.table)
  
  return (list(df.table$Var1, df.table$Freq, df.table$Freq / N))
}

do.call(d_rnbinom, input)