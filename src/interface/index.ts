export type TabsType = {
  id: number
  title: string
}

export interface BannerType {
  id: number;
  title: string;
  image: string;
  url: string;
  status: string;
}

export interface CategorysType {
  id: number;
  title: string;
}
export interface ClassificationType {
  id: number;
  title: string;
}

export interface DappType {
  id: number;
  classification_id: number;
  categorys_id: number;
  image: string;
  title: string;
  introduction: string;
  url: string;
  twitter: string;
  discord: string;
  telegram: string;
  switch: number;
  weigh: number;
  createtime: number;
  updatetime: number;
}

export interface BlogType {
  id: number;
  title: string;
  introduction: string;
  image: string;
  releasetime: number;
}

export interface BlogDetailType {
  detail: BlogDetail;
  previous: PreviousType | null;
  next: PreviousType | null;
}

interface PreviousType {
  id: number;
  title: string;
}

interface BlogDetail {
  id: number;
  publisher: string;
  content: string;
  avatar: string;
  title: string;
  introduction: string;
  image: string;
  releasetime: number;
}

export interface HelpListType {
  id: number;
  title: string;
  image: string;
  list: HelpChildList[];
}

interface HelpChildList {
  id: number;
  title: string;
}

export interface HelpDetailType {
  detail: HelpDetail;
  previous: PreviousType;
  next: PreviousType;
}

interface HelpDetail {
  id: number;
  help_id: number;
  title: string;
  content: string;
  weigh: number;
  createtime: number;
  updatetime: number;
}

export interface NoticeType {
  id: number;
  title: string;
  introduction: string;
  is: string;
  url: string;
  is_read?: any;
}

export interface NoticeDetailType {
  id: number;
  title: string;
  introduction: string;
  content: string;
  is: string;
  url: string;
  weigh: number;
  createtime: number;
  updatetime: number;
}

export interface BgdType {
  id: number;
  title: string;
  introduction: string;
  is: string;
  url?: any;
  image: string;
}

export interface TntroduceListType {
  id: number;
  title: string;
  introduction: string;
  is: string;
  url: string;
  image: string;
  status: string;
}

export interface ChartDataType {
  symbol: string;
  baseCoin: string;
  lastPr: string;
  risefall: string;
  linechart: LinechartType[];
}

export interface LinechartType {
  id: number;
  symbol: string;
  open: string;
  high: string;
  low: string;
  closing: string;
  baseVolume: string;
  quoteVolume: string;
  usdtVolume: string;
  createtime: number;
}

export interface CurrencyItemType {
  symbol: string;
  image: string;
  baseCoin: string;
  lastPr: string;
  risefall: string;
}

export interface TickersType {
  symbol: string;
  image: string;
  type: string;
  baseCoin: string;
  quoteCoin: string;
  lastPr: string;
  baseVolume: string;
  risefall: string;
  ts?: any;
}

export interface TickerssListType {
  symbol: string;
  image: string;
  type: string;
  baseCoin: string;
  quoteCoin: string;
  lastPr: string;
  baseVolume: string;
  risefall: string;
  ts: string;
}