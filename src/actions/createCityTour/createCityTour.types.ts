export interface DATA {
  response: {
    result: {
      status: 'success' | 'failure',
      message?: string
    }
  },
  params: {
    city_name: string;
    tour_sdate: string;
    tour_edate: string;
  }
}