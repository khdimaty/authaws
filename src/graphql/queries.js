/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
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
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
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
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getOption = `query GetOption($id: ID!) {
  getOption(id: $id) {
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
export const listOptions = `query ListOptions(
  $filter: ModelOptionFilterInput
  $limit: Int
  $nextToken: String
) {
  listOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      optionText
      question {
        id
        questionText
      }
    }
    nextToken
  }
}
`;
export const getReward = `query GetReward($id: ID!) {
  getReward(id: $id) {
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
export const listRewards = `query ListRewards(
  $filter: ModelRewardFilterInput
  $limit: Int
  $nextToken: String
) {
  listRewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      decription
      url
      myrewards {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMyreward = `query GetMyreward($id: ID!) {
  getMyreward(id: $id) {
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
export const listMyrewards = `query ListMyrewards(
  $filter: ModelMyrewardFilterInput
  $limit: Int
  $nextToken: String
) {
  listMyrewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        username
        email
        score
      }
      reward {
        id
        decription
        url
      }
    }
    nextToken
  }
}
`;
export const getMytask = `query GetMytask($id: ID!) {
  getMytask(id: $id) {
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
export const listMytasks = `query ListMytasks(
  $filter: ModelMytaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listMytasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        username
        email
        score
      }
      task {
        id
        name
        description
        type
        taskScore
      }
    }
    nextToken
  }
}
`;
