import axios from 'axios'
import { deserialiseBoolean } from '../helpers/serialisation'

// START HERE:
//
// This fetchAll function is the only thing that is exposed to the controller and it's currently coupled in a few ways.
// 1. It's concretely tied into the functions that are making the API calls directly
// 2. The logic for both the sorting, filtering and mapping into a Quiz are all in the one function
// How should we start approaching refactoring this code?
//
// Firstly, remember that it isn't refactoring if you're changing the behaviour, so first, write some tests for this class to ensure that you aren't changing the behaviour.
// Start by writing some Jest tests to see how you go - you may want to try mocking some of function calls
//
// Refactor the code so that the data fetching and the sorting logic are not dependent on each other.
//
// Introduce a new data source - you can just make some functions that return some new questions for the moment without needing to connect a real database
//
// Make sure that you can swap in and out the old and new data sources, without needing to change any further implementation details


// This function gets a random mix of 40 questions, sorts them into categories
// and then returns them in category alphabetical order
const fetchAll = async () => {
  const promises = [
    fetchGeneralKnowledge(),
    fetchScienceComputers(),
    fetchHistory(),
    fetchMythology(),
  ]
  const results = await Promise.all(promises)
  const questions = results
    .reduce((acc, value) => [...acc, ...value.results], [])
    .sort((a: any, b: any) => {
      if (a.category[0] < b.category[0]) { return -1 }
      if (a.category[0] > b.category[0]) { return 1 }
      return 0
    })
    .map((question: any) => {
      if (question.type === 'boolean')
        { return { kind: 'boolean', questionText: question.question, answer: deserialiseBoolean(question.correct_answer) } }
      if (question.type === 'multiple')
        { return { kind: 'multichoice', questionText: question.question, incorrectAnswers: question.incorrect_answers, answer: question.correct_answer } }
      return
    })
    .filter(Boolean)

  return { questions }
}

const fetchGeneralKnowledge = async () =>
  await axios
    .get("https://opentdb.com/api.php?amount=10&category=9")
    .then(result => result.data)

const fetchScienceComputers = async () =>
  await axios
    .get("https://opentdb.com/api.php?amount=10&category=18")
    .then(result => result.data)

const fetchHistory = async () =>
  await axios
    .get("https://opentdb.com/api.php?amount=10&category=23")
    .then(result => result.data)

const fetchMythology = async () =>
  await axios
    .get("https://opentdb.com/api.php?amount=10&category=20")
    .then(result => result.data)

export { fetchAll }
