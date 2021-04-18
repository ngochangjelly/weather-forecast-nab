import { formatDateName, formatDegree } from './date'

it('return correct date name of the week', () => {
  const input = '2021-04-17'
  const expectedOutput = 'Saturday'
  const output = formatDateName(input)
  expect(output).toBe(expectedOutput)
})

it('wrong input datestring should return undefined 1', () => {
  const input = '2021-0417'
  const expectedOutput = 'undefined'
  const output = formatDateName(input)
  expect(output).toBe(expectedOutput)
})

it('wrong input datestring should return undefined 2', () => {
  const input = 'aaa-04-17'
  const expectedOutput = 'undefined'
  const output = formatDateName(input)
  expect(output).toBe(expectedOutput)
})

it('return correct degree format', () => {
  const input = 17
  const expectedOutput = '17°C'
  const output = formatDegree(input)
  expect(output).toBe(expectedOutput)
})
