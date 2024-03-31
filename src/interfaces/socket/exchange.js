
const asTable = require('as-table')
    , log = require('ololog').noLocate
    , ansi = require('ansicolor').nice
    , ccxt = require('ccxt')

let printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green)
}

let printUsage = function () {
    log('Usage: node', process.argv[1], 'exchange'.green)
    printSupportedExchanges()
}

let printTickers = async (id) => {

    // check if the exchange is supported by ccxt
    let exchangeFound = ccxt.exchanges.indexOf(id) > -1
    if (exchangeFound) {

        log('Instantiating', id.green, 'exchange')

        // instantiate the exchange by id
        let exchange = new ccxt[id]({ enableRateLimit: true })

        // load all markets from the exchange
        // let markets = await exchange.loadMarkets()
        // console.log(markets['ETH/BTC'].info.filters, '>>>')
        // process.exit(0)

        while (true) {

            // const tickers = await exchange.fetchTickers(["BTC/USDT", "ETH/USDT", "BNB/USDT", "USDT/BUSD", "SOL/USDT", "XRP/USDT", "ADA/USDT", "USDC/USDT", "LUNA/USDT", "AVAX/USDT"]);
            const tickers = await exchange.fetchTickers();

            log('--------------------------------------------------------')
            log(exchange.id.green, exchange.iso8601(exchange.milliseconds()))
            log('Fetched', Object.values(tickers).length.toString().green, 'tickers:')
            // log('Fetched', sortArr.length.toString().green, 'tickers:')
            log(asTable.configure({ delimiter: ' | '.dim, right: true })(
                // ccxt.sortBy(Object.values(tickers), 'quoteVolume', true)
                // .slice (0,20)
                Object.keys(tickers)
                    .map(v => sortArr.includes(v) && tickers[v])
                    //     if (sortArr.includes(v)) {
                    //         return tickers[v]
                    //     }
                    // })
                    .filter(Boolean)
                    .map(console.log)
                    .map(ticker => ({
                        symbol: ticker['symbol'],
                        price: ticker['last'].toFixed(8),
                        // datetime: ticker['datetime'],
                        '%': ticker.info.priceChangePercent,
                        'c': ticker.change

                        // ticker: JSON.stringify(tickers)
                    }))
            ))

        }

    } else {

        log('Exchange ' + id.red + ' not found')
        printSupportedExchanges()
    }
}

    ; (async function main() {

        if (process.argv.length > 2) {

            const id = process.argv[2]
            await printTickers(id)

        } else {

            printUsage()
        }

        process.exit()

    })()