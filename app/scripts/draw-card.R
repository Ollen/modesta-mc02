draw.card <- function(N, n, replace) {
    result = list()
    for (i in 1:N) {
        drawn.cards = sample(1:52, n, replace=as.logical(replace))
        result[[i]] = drawn.cards
    }

    return (result)
}

do.call(draw.card, input)