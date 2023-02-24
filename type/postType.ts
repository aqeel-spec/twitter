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

export interface HomeProps {
  newsData: NewsData
}
