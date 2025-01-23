import dayjs from 'dayjs'
export const formatterDate = (date: string) => {
  const formatDate = dayjs(date).format('DD/MM/YYYY')
  return formatDate
}
