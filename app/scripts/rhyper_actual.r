rhyper_actual <- function(nn, m, n, k=5) {
  nn = as.numeric(nn)
  m = as.numeric(m)
  n = as.numeric(n)
  k = as.numeric(k)
  
  rhyper.list <- rhyper(nn, m, n, k)
  freq.table <- table(rhyper.list)
  df.table <- as.data.frame(freq.table)
  
  return(list(df.table$rhyper.list, df.table$Freq, df.table$Freq / (m + k), rhyper.list))
}

do.call(rhyper_actual, input)