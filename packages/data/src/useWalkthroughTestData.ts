import testCase999 from "../walkthroughes/9.9.9.json";
import {
  QuestionData,
  QuestionMultipleChoiceData,
  WalkthroughItemTypeMultiChoice,
} from "./useWalkthroughData";

export function getMultiChoiceQuestion() {
  // find the first question that is a multi-choice question
  const questions: { [key: string]: QuestionData } = testCase999.questions;
  const questionKey = Object.keys(questions).find((questionId) => {
    const question = questions[questionId] as QuestionData;
    return question.walkthroughItemType === WalkthroughItemTypeMultiChoice;
  });
  return questionKey
    ? {
        questionKey,
        questionData: questions[questionKey] as QuestionMultipleChoiceData,
      }
    : null;
}

// export function getMultiChoiceMultipleQuestion() {
//   // find the first question that is a multi-choice multiple question
//   const questions: { [key: string]: QuestionData } = testCase999.questions;
//   const questionKey = Object.keys(questions).find((questionId) => {
//     const question = questions[questionId] as QuestionData;
//     return (
//       question.walkthroughItemType === WalkthroughItemTypeMultiChoiceMultiple
//     );
//   });
//   return questionKey
//     ? {
//         questionKey,
//         questionData: questions[
//           questionKey
//         ] as QuestionMultipleChoiceSelectMultipleData,
//       }
//     : null;
// }

export default function useWalkthroughTestData() {
  return testCase999;
}
