/**
 * Created by jjansen on 09-Mar-15 4:56 PM.
 * stackoverflow
 */
export const formatDateName = function (yyyymmddString: string): string {
  let dateParts = yyyymmddString.split('-')
  let year = +dateParts[0]
  let month = +dateParts[1]
  let day = +dateParts[2]
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date( year, month - 1, day );
  let dayname = dayNames[today.getDay()];
  return dayname
};

export const formatDegree = (temperature: number): string => {
  return `${Math.round(temperature)}°C`
}

