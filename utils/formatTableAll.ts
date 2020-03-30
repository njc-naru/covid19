import dayjs from 'dayjs'

const headers = [
  { text: '日付', value: '日付' },
  { text: 'ステータス', value: 'ステータス' },
  { text: '受診都道府県', value: '受診都道府県' },
  { text: '年代・性別', value: '年代・性別' },
  { text: '備考', value: '備考' }
]

type DataType = {
  リリース日: Date
  ステータス: string | null
  受診都道府県: string | null
  '年代・性別': string | null
  備考: string | null
  [key: string]: any
}

type TableDataType = {
  日付: string
  受診都道府県: DataType['受診都道府県']
  ステータス: DataType['ステータス']
  '年代・性別': DataType['年代・性別']
  備考: DataType['備考']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      日付: dayjs(d['確定日']).format('MM/DD') ?? '不明',
      ステータス: d['ステータス'] ?? '',
      受診都道府県: d['受診都道府県'] ?? '不明',
      '年代・性別': d['年代・性別'] ?? '不明',
      備考: d['備考'] ?? '不明'
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
