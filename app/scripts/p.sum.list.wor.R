p.sum_wr <- function(n, d) {
  n = as.numeric(n)
  d = as.numeric(d)
  
  total <- 0
  comb.list <- combn(52,n)
  
  for (i in 1:ncol(comb.list)) {
    deck.value = comb.list[,i] %% 13
    deck.value = replace(deck.value, deck.value == 0, 13)
    
    if(sum(deck.value) == d) {
      total = total + 1
    }
  }
  
  return (total / ncol(comb.list))
}

p.sum_wr.list <- function(n) {
  n = as.numeric(n)
  probList <- c()
  
  for (i in 6:64) {
    probList = c(probList, p.sum_wr(n,i))
  }
  
  return(as.character(probList))
}

do.call(p.sum_wr.list, input)
