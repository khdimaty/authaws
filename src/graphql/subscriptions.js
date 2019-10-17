/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
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
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
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
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
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
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateOption = `subscription OnCreateOption {
  onCreateOption {
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
export const onUpdateOption = `subscription OnUpdateOption {
  onUpdateOption {
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
export const onDeleteOption = `subscription OnDeleteOption {
  onDeleteOption {
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
export const onCreateReward = `subscription OnCreateReward {
  onCreateReward {
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
export const onUpdateReward = `subscription OnUpdateReward {
  onUpdateReward {
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
export const onDeleteReward = `subscription OnDeleteReward {
  onDeleteReward {
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
export const onCreateMyreward = `subscription OnCreateMyreward {
  onCreateMyreward {
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
export const onUpdateMyreward = `subscription OnUpdateMyreward {
  onUpdateMyreward {
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
export const onDeleteMyreward = `subscription OnDeleteMyreward {
  onDeleteMyreward {
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
export const onCreateMytask = `subscription OnCreateMytask {
  onCreateMytask {
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
export const onUpdateMytask = `subscription OnUpdateMytask {
  onUpdateMytask {
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
export const onDeleteMytask = `subscription OnDeleteMytask {
  onDeleteMytask {
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
