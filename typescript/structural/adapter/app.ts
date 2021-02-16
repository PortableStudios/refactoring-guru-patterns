// This application is responsible for printing out news articles to the console
// in a nice, readable format.

import NewsController from './controllers/NewsController'

class Application {
  run() {
    console.log('Booting...')
    console.log('Reticulating splines...')

    const controller = new NewsController()
    controller.index()

    console.log('Have a nice day!')
  }
}

export default Application
