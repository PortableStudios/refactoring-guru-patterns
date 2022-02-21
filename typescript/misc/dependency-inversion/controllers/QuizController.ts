import { Quiz } from '../models/Quiz'
import { render } from '../helpers/rendering'
import { index } from '../views/Quiz'
import { fetchAll } from '../services/Quiz'

export default class QuizController {
  async index() {
    render('Generating quiz...')

    // Fetch quiz
    const quiz: Quiz = await fetchAll()

    // Render view
    render(index(quiz))
  }
}
