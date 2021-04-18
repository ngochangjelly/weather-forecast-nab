import {locationListResponseTextQuery, weatherListResponse} from './weather'

// @ts-ignore
import { rest } from 'msw'
// @ts-ignore
import { setupServer } from 'msw/node'

const handlers = [
  // @ts-ignore
  rest.get('/api/location/search/*', (req, res, ctx) => {
    return res(ctx.json(locationListResponseTextQuery))
  }),
  // @ts-ignore
  rest.get('/api/location/*', (req, res, ctx) => {
    return res(ctx.json(weatherListResponse))
  })
];

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { server, rest };