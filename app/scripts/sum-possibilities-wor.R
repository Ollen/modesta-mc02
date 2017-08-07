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
  
  return (c(total, total / ncol(comb.list)))
}

do.call(p.sum_wr, input)