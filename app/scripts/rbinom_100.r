rbinom_100 <- function(N, p) {
    N = as.numeric(N)
    p = as.numeric(p)
    
    freq.table <- table(rbinom(N,100,p))
    df.table <- as.data.frame(freq.table)
  
    return (list(as.numeric(df.table$Var1), df.table$Freq))
}

do.call(rbinom_100, input)