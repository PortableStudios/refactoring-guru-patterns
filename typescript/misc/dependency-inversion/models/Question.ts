interface BooleanQuestion {
  kind: 'boolean'
  questionText: string
  answer: boolean
}

interface MultiChoiceQuestion {
  kind: 'multichoice'
  questionText: string
  incorrectAnswers: string[]
  answer: string
}

type Question = BooleanQuestion | MultiChoiceQuestion

export { BooleanQuestion, MultiChoiceQuestion, Question }
