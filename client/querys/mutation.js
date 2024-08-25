import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation SignUp($register: SignUp) {
    signUp(register: $register) {
      _id
      email
      name
      username
    }
  }
`;

export const LOGIN = gql`
  mutation SignIn($login: SignIn!) {
    signIn(login: $login) {
      token
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($getPostByIdId: ID!) {
    getPostById(id: $getPostByIdId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const COMMENT_POST = gql`
  mutation CommentPost($postId: ID!, $content: String!) {
    commentPost(postId: $postId, content: $content) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($followingId: ID!) {
    followUser(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($followingId: ID!) {
    unfollowUser(followingId: $followingId)
  }
`;