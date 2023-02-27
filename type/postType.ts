interface Posts {
  id: string | number
  name: string
  userName: string
  userImg: string
  img: string
  text: string
  timestamp: string
}
export interface Article {
  source: any
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

export interface NewsData {
  articles: Article[]
  status: string
  totalResults: number
}

// export interface HomeProps {
//   newsData: NewsData
//   randomUser: RandomUser
// }
export interface HomeProps {
  newsData: NewsData
  randomUserData: RandomUser
}

// random user data types
interface Name {
  title: string
  first: string
  last: string
}
interface Login {
  uuid: string
  username: string
  password: string
}
interface Picture {
  large: string
  medium: string
  thumbnail: string
}
interface Results {
  name: Name
  login: Login
  picture: Picture
}
interface D {
  info: any
  results: Results[]
}
export interface RandomUser {
  results: {
    results: Results[]
  }
}
export type PostTest = {
  id: string | number
  name: string
  username: string
  userImg: string
  image: string
  text: string
  timeStamp?: { seconds: number; nanoseconds: number }
}

export interface Post {
  id: string | number
  name: string
  userName: string
  userImg: string
  img: string
  text: string
  timestamp: { seconds: number; nanoseconds: number }
}

export type PostType = {
  id: string | number
  name: string
  userName: string
  userImg: string
  img: string
  text: string
  timestamp: { seconds: number; nanoseconds: number } | undefined
}
