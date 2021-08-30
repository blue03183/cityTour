export interface DATA {
  response: {
    result: {
      status: 'success' | 'failure',
      message?: string
    }
  },
  params: {
    city_name: string;
    search_type: 'travelling' | 'travel_schedule' | 'recent_regist' | 'recent_search'
  }
}