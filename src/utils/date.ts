import { TYPE, DAY_NAMES } from '../constants'

export const formatDateName = function (yyyymmddString: string): string {
  const dateParts = yyyymmddString.split('-')
  const year = +dateParts[0]
  const month = +dateParts[1]
  const day = +dateParts[2]
  const delimiterCount = (yyyymmddString.match(/-/g) || []).length;
  if (delimiterCount !== 2) return TYPE.UNDEFINED
  if(!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return TYPE.UNDEFINED
  const today = new Date( year, month - 1, day );
  const dayname = DAY_NAMES[today.getDay()];
  return dayname
};

export const formatDegree = (temperature: number): string => {
  return `${Math.round(temperature)}°C`
}
