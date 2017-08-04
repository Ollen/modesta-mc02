options(warn=-1)
args = commandArgs(T)
library(jsonlite, quiet=T)

run <- function() {
  result = list()
  for (i in 1:10) {
    drawn.cards = sample(1:52, 5, replace=T)
    result[[i]] = drawn.cards
  }
  
  return (toJSON(result, pretty=T))
}

suppressWarnings(
  run()
)