import CoffeeController from './controllers/CoffeeController'

export default class Application {
  run() {
    console.log('Brewing...')

    const controller = new CoffeeController()
    controller.index()

    console.log('Coffee - Because bad mornings deserve a second chance!')
  }
}
