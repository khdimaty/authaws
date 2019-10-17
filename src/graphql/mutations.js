/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    mytasks {
      items {
        id
      }
      nextToken
    }
    myrewards {
      items {
        id
      }
      nextToken
    }
    score
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    email
    mytasks {
      items {
        id
      }
      nextToken
    }
    myrewards {
      items {
        id
      }
      nextToken
    }
    score
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    email
    mytasks {
      items {
        id
      }
      nextToken
    }
    myrewards {
      items {
        id
      }
      nextToken
    }
    score
  }
}
`;
export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    name
    description
    type
    taskScore
    questions {
      items {
        id
        questionText
      }
      nextToken
    }
    mytasks {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    name
    description
    type
    taskScore
    questions {
      items {
        id
        questionText
      }
      nextToken
    }
    mytasks {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    id
    name
    description
    type
    taskScore
    questions {
      items {
        id
        questionText
      }
      nextToken
    }
    mytasks {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    questionText
    options {
      items {
        id
        optionText
      }
      nextToken
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    questionText
    options {
      items {
        id
        optionText
      }
      nextToken
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
    id
    questionText
    options {
      items {
        id
        optionText
      }
      nextToken
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
export const createOption = `mutation CreateOption($input: CreateOptionInput!) {
  createOption(input: $input) {
    id
    optionText
    question {
      id
      questionText
      options {
        nextToken
      }
      task {
        id
        name
        description
        type
        taskScore
      }
    }
  }
}
`;
export const updateOption = `mutation UpdateOption($input: UpdateOptionInput!) {
  updateOption(input: $input) {
    id
    optionText
    question {
      id
      questionText
      options {
        nextToken
      }
      task {
        id
        name
        description
        type
        taskScore
      }
    }
  }
}
`;
export const deleteOption = `mutation DeleteOption($input: DeleteOptionInput!) {
  deleteOption(input: $input) {
    id
    optionText
    question {
      id
      questionText
      options {
        nextToken
      }
      task {
        id
        name
        description
        type
        taskScore
      }
    }
  }
}
`;
export const createReward = `mutation CreateReward($input: CreateRewardInput!) {
  createReward(input: $input) {
    id
    decription
    url
    myrewards {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const updateReward = `mutation UpdateReward($input: UpdateRewardInput!) {
  updateReward(input: $input) {
    id
    decription
    url
    myrewards {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const deleteReward = `mutation DeleteReward($input: DeleteRewardInput!) {
  deleteReward(input: $input) {
    id
    decription
    url
    myrewards {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const createMyreward = `mutation CreateMyreward($input: CreateMyrewardInput!) {
  createMyreward(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    reward {
      id
      decription
      url
      myrewards {
        nextToken
      }
    }
  }
}
`;
export const updateMyreward = `mutation UpdateMyreward($input: UpdateMyrewardInput!) {
  updateMyreward(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    reward {
      id
      decription
      url
      myrewards {
        nextToken
      }
    }
  }
}
`;
export const deleteMyreward = `mutation DeleteMyreward($input: DeleteMyrewardInput!) {
  deleteMyreward(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    reward {
      id
      decription
      url
      myrewards {
        nextToken
      }
    }
  }
}
`;
export const createMytask = `mutation CreateMytask($input: CreateMytaskInput!) {
  createMytask(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
export const updateMytask = `mutation UpdateMytask($input: UpdateMytaskInput!) {
  updateMytask(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
export const deleteMytask = `mutation DeleteMytask($input: DeleteMytaskInput!) {
  deleteMytask(input: $input) {
    id
    user {
      id
      username
      email
      mytasks {
        nextToken
      }
      myrewards {
        nextToken
      }
      score
    }
    task {
      id
      name
      description
      type
      taskScore
      questions {
        nextToken
      }
      mytasks {
        nextToken
      }
    }
  }
}
`;
