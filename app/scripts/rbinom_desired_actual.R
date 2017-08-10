d_rbinom <- function(N, p){
  N = as.numeric(N)
  p = as.numeric(p)
  
  rbinom.list <- rbinom(N,N,p)
  freq.table <-  table(rbinom.list)
  df.table <- as.data.frame(freq.table)
  
  return (list(df.table$rbinom.list, df.table$Freq, df.table$Freq / N, rbinom.list))
}


do.call(d_rbinom, input)