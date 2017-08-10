d_rnbinom <- function(N, p, s){
  N = as.numeric(N)
  p = as.numeric(p)
  s = as.numeric(s)
  
  rnbinom.list <- rnbinom(N,s, p)
  freq.table <-  table(rnbinom.list)
  df.table <- as.data.frame(freq.table)
  
  return (list(df.table$rnbinom.list, df.table$Freq, df.table$Freq / N, rnbinom.list))
}

do.call(d_rnbinom, input)