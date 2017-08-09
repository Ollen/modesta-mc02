d_rbinom <- function(N, p){
  N = as.numeric(N)
  p = as.numeric(p)
  
  freq.table <-  table(rbinom(N,N,p))
  df.table <- as.data.frame(freq.table)
  
  return (list(as.numeric(df.table$Var1), df.table$Freq, df.table$Freq / N))
}


do.call(d_rbinom, input)