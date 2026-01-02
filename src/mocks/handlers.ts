import { http, HttpResponse } from 'msw'

export const handlers = [
  // asynchronously by making GET request to a given endpoint. URL https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/:number .
  http.get('https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/:number', async ({ params }) => {
    const { number } = params
    console.log('is this mocking', number)
    return HttpResponse.json({
      valid: number === "123456789"
    })
  }),
  // is made form values should be sent to an API using POST method. URL https://fe-hometask-api.qa.vault.tryvault.com/profile-details . Example of request:
  http.post('https://fe-hometask-api.qa.vault.tryvault.com/profile-details', ({ request, params}) => {
    console.log(request.method, request.url, params)
    return HttpResponse.json()
  }),
]
