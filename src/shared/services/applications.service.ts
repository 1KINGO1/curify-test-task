import { ApplicationSchema } from '@/shared/schemas/application.schema'
import { URLS } from '@/shared/constants/urls'

class ApplicationsService {
  async createApplication(body: ApplicationSchema) {
    const response = await fetch(URLS.POST_APPLICATION, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  }
}

export const applicationsService = new ApplicationsService()
