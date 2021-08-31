export interface Data {
  response: {
    result: {
      status: 'success' | 'failure',
      citys?: TourInfo[];
      message?: string
    }
  },
  params: {
    city_name: string;
    search_type: 'travelling' | 'travel_schedule' | 'recent_regist' | 'recent_search'
  }
}

export interface TourInfo {
  city_name: string;
  wdate: string;
  sdate: string;
  edate: string;
}