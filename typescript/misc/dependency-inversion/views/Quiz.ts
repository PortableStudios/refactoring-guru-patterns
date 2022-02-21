import { Quiz } from '../models/Quiz'
import { shuffle } from '../helpers/math'
import { singleLineBreak, doubleLineBreak } from '../helpers/formatting'

const index = (quiz: Quiz): string => {
  const { questions } = quiz
  const results = questions.map((question) => {
    switch (question.kind) {
      case 'boolean':
        return question.questionText
      case 'multichoice':
        const { questionText, incorrectAnswers, answer } = question
        const possibleAnswers = shuffle([...incorrectAnswers, answer])
        return [questionText, ...possibleAnswers].join(singleLineBreak)
      default:
        const _exhaustiveCheck: never = question;
        return _exhaustiveCheck;
    }
  })
  return results.join(doubleLineBreak)
}

export { index }
