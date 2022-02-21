import QuizController from './controllers/QuizController'
import { render } from './helpers/rendering'

export default class Application {
  run() {
    render('Welcome to the Quiz Master App!');

    const controller = new QuizController
    controller.index()
  }
}
