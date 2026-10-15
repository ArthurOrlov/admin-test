export interface Block {
  id: string
  heading: string
  text: string
}

export interface SiteContent {
  title: string
  subtitle: string
  blocks: Block[]
}